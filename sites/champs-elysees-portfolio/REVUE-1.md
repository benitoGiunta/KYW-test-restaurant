# Revue portfolio · Champs Elysées · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un bistro de quartier présenté comme une table que l'on bouscule (photos « tirages » déplaçables sur fond vert, pictogrammes au trait flottant dans le hero), crème, orange et vert forêt, serif Zodiak et sans Satoshi, avec une bande d'état « ouvert / fermé » calculée en haut de page.

Préambule de méthode : `QA-revue1.md` n'existe pas et `.shots-champs-elysees-portfolio-revue1/summary.json` est en `shootFailed` (Chromium fermé, 3 pages sur 3), de même que `audit.log` (2 FAIL, page non chargée). Je n'ai pas relancé de shoot complet : j'ai repris le `dist/` (21:04, postérieur à `src/`, aucun fichier de `src/` ou `public/` plus récent) et mesuré avec mes scripts (axe-core de `node_modules`, 6 pages x 1440 et 390 px, `404.html` réel). Captures : planches `ce1-A-desktop-tops.png`, `ce1-B-mobile-tops.png`, `ce1-C-home-desktop-full.png`, `ce1-E-home-mobile.png`, `ce1-D-hero-desktop.png`, `ce1-hero7s.png` (scratchpad de la session). Les planches du constructeur (`.shots-champs-elysees-portfolio-build/`) n'ont pas servi.

Scores /10
- Design 7,5 : palette crème, orange et vert cohérente, hiérarchie serif claire, cartes de menu bien tenues (`ce1-A`, `ce1-C`) ; le hero se brouille quand les pictogrammes dérivent sur le slogan (`ce1-home-1440-top.png`).
- Usabilité 7 : réservation à deux clics, tel et Zenchef partout, clavier correct (lien d'évitement en premier, focus 2 à 3 px visible sur 16 arrêts) ; mais « Contact » coupé dans la barre mobile, formulaire qui perd ses saisies, 45 arrêts Tab sur l'accueil.
- Créativité 8 : la table à tirages est une vraie signature (glisser mesuré : +258 px, bouton « Remettre la table » visible ; flèches : +22 px) et le bandeau d'état est calculé en `Europe/Brussels`.
- Contenu 7 : 94 plats sur 94 et tous les prix conformes à `donnees.json` (script), adresse, téléphone, horaires, e-mail, Zenchef, Facebook, La DH conformes ; trois formulations hors dossier (F2-3, F2-4) et typographie française non soignée (F3-1).
- Technique 8 : build OK, 0 erreur console, 0 requête en échec, 0 débordement (`scrollWidth` = fenêtre sur 12 cas), 0 violation axe sérieuse ou critique, 0 contraste sous le seuil sur 12 cas (canvas), LCP mobile CPU x4 + 4G : 2508 ms sur l'accueil (deux passes), 1104 à 1136 ms sur la carte, CLS 0,009 et 0,0002.

## Findings (par gravité)
Aucun F0, aucun F1. Build OK ; mention « Maquette KYW, certaines données sont illustratives », un seul `.kyw-footer__logo` et `noindex, nofollow` présents sur les 6 pages ; `lang="fr"`, un seul `h1` par page, favicon, OG, `404.html` dessinée (h1 « Cette table n'existe pas »), JSON-LD `Restaurant` avec adresse et 7 `OpeningHoursSpecification`.

**F2-1 · Barre de navigation mobile : « Contact » coupé.** `src/styles/base.css:259` (`.nav` fixe, `overflow-x: auto`). Mesuré à 390 px : `scrollWidth` 455 pour `clientWidth` 362 ; liens Accueil 19-91, Carte 95-156, La maison 159-250, Terrasse et fêtes 253-384, Contact 387-464 pour un cadre de 12 à 378 px (`ce1-B-mobile-tops.png` : « Terrasse et fêtes » touche le bord, « Contact » invisible). Correction : abréger (« Fêtes »), réduire les marges ou passer sur deux rangées pour que les 5 liens tiennent à 360 et 390 px.

**F2-2 · Formulaire de réservation : les saisies sont jetées.** `src/pages/reservation.astro:74-75` : `preventDefault()` puis `window.open(form.action)` ouvre `https://bookings.zenchef.com/results?rid=377536&pid=1001` sans nom, date, heure ni couverts (six champs, dont trois `required`, sans effet). Le texte « Formulaire de démonstration sans envoi » le dit, mais l'utilisateur remplit pour rien. Correction : retirer le formulaire au profit des deux boutons « Réserver sur Zenchef » et « Appeler », ou n'afficher que ce qui est transmis (couverts et date n'existent pas dans l'URL du dossier : ne rien inventer).

**F2-3 · `<title>` d'accueil : « Bistronomie ».** `src/layouts/Base.astro:19` : « Champs Elysées | Bistronomie à Jambes (Namur) ». Le dossier dit « Bistro convivial » et « brasserie moderne » ; « Bistronomie » ne figure nulle part dans `data/restaurants/champs-elysees/` (grep) et promet une gastronomie que la carte (croquettes, boulettes, vol-au-vent) ne tient pas. Correction : « Champs Elysées | Bistro convivial à Jambes (Namur) ».

**F2-4 · Texte terrasse hors dossier et note interne visible.** `src/data/site.ts:929`, page `/terrasse/` : « on y prend l'apéritif, le spritz ou le repas complet » (le dossier ne dit que « terrasse sur l'avenue » ; la photo montre un spritz) et « Le nombre de places n'est pas communiqué. », phrase de dossier devenue texte public. Correction : « Une terrasse donne sur l'avenue Albert Ier. » et supprimer la seconde phrase (aussi dans `site.ts:925` si repris ailleurs).

**F2-5 · Deux `<footer>` de premier niveau.** axe, 12 cas sur 12 : `landmark-no-duplicate-contentinfo` (moderate, `.footer` + `kyw-footer`). Même défaut récurrent des revues précédentes. Correction : passer le pied du site en `<div role="presentation">` ou le garder unique en laissant `kyw-footer` hors `<footer>` (sans toucher au paquet : enrober côté site).

**F2-6 · LCP mobile à la limite sur l'accueil.** 2508 ms (deux passes identiques, CPU x4 + 4G), élément `IMG` ; seuil 2500 ms. Correction : `fetchpriority="high"` et dimension réelle sur l'image candidate (lire `ce1` avec le sélecteur de l'élément LCP : photo de la section « La maison »), ou la retirer de la première hauteur mobile.

**F2-7 · Cibles tactiles sous 24 px.** « Lire l'article » 72 x 21 px et « Voir la carte » 76 x 20 px (`src/pages/index.astro:134` et `:139`, liens dans `<cite>`), à 1440 et 390 px. Correction : `display: inline-block; min-height: 24px; padding-block: .25rem`.

**F3-1 · Typographie française.** Aucune espace insécable sur le site (0 U+00A0 dans `index.html` et `histoire/index.html`) : « (« Momo ») » (`site.ts:799`), « Namur : Teresa… », « : environ 120 couverts » ; apostrophes droites partout sauf la carte (accueil 13 droites pour 1 typographique, histoire 10 pour 0). Correction : U+00A0 dans les « » et avant « : ; ? ! », U+2019 dans les textes de `site.ts` et des `.astro`.

**F3-2 · Pictogrammes qui passent sur le texte du hero (1440).** Au bout de 3,2 s, le pot de frites coupe le « b » de « bistro », la bouteille « sur 7 », la fourchette l'adresse (`ce1-home-1440-top.png`) ; à 7 s la dérive les a écartés (`ce1-hero7s.png`). Mesure : 7 chevauchements de boîtes avec `.hero__titre` et `.hero__adresse`. Correction : zones d'exclusion autour du slogan et de l'adresse pour le mouvement au repos, ou `z-index` sous le texte.

**F3-3 · 45 arrêts Tab sur l'accueil.** 9 boutons de pictogrammes (« Parasol dessiné au trait, déplaçable aux flèches ») et 12 tirages sont tous focalisables, devant le menu et les horaires. Correction : `tabindex="-1"` sur les pictogrammes du hero (décoratifs), ou un lien « Passer la table » après le titre de la scène.

**F3-4 · Répétition de la même phrase.** Le bandeau d'état (« Ouvert du lundi au dimanche · Avenue Albert Ier 149, 5100 Jambes (Namur) · Réservation en ligne via Zenchef ») est répété 2 fois par page et reprend l'adresse du hero et du pied (WARN `audit` « sentence repeated » sur 5 pages dans `QA-build.md`) ; le slogan « ouvert 7 jours sur 7 » redit aussi « Ouvert du lundi au dimanche ». Correction : garder dans le bandeau l'état et le prochain service seulement.

**F3-5 · axe `region` (moderate) sur `.marquee`.** Le bandeau est hors landmark sur 12 cas sur 12. Correction : le placer dans `<header>` ou lui donner `role="region"` avec son `aria-label` (« État du restaurant » existe déjà).

Points à confirmer et non retenus : code postal 5100 (le dossier signale 5000/5100 « à confirmer », hypothèse du constructeur notée dans ETAT.md) ; mot décoratif « PRESSE » à opacité 0,25 laissé en reduced motion (filigrane, pas du texte à lire) ; « Contact » mène à la page Réserver (titre « Réserver et nous contacter », cohérent).

## Ce qui est bien (à ne pas casser à la révision)
1. La table à tirages : 12 photos déplaçables à la souris (+258 px mesuré), aux flèches, avec « Remettre la table » ; rail horizontal propre à 390 px, aucune photo recouverte (12 sur 12 atteignables à 1440).
2. Les faits : 94 plats et tous les prix identiques à `donnees.json`, 7 horaires, téléphone, e-mail, Zenchef, Facebook, article de La DH et citation de Teresa sourcés, aucun avis ni chiffre inventé ; bandeau d'état juste (vendredi 22 h : « Fermé aujourd'hui, prochain service samedi à 11:00 »).
3. La robustesse : 0 erreur console, 0 débordement, 0 contraste sous seuil, focus visible partout, reduced motion sans texte caché, CLS < 0,01, JSON-LD complet, 404 conçue.
