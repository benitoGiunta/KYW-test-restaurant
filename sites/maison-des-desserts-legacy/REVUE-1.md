# Revue legacy · La Maison des Desserts · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : un éditorial sobre sur fond crème, titres en serif fin, photos réelles de la façade, de la salle et des pâtisseries, avec la carte complète lisible en HTML et un seul appel à l'action (Boutique en ligne, bleu nuit).

Scores /10
- Design 6 : composition propre et cohérente (`home-1440-full.png`, `pl-f1440.png`), mais très peu de couleur ni de matière pour une pâtisserie, et des photos petites ; rien de mémorable.
- Usabilité 8 : carte avec index sticky, 142 plats et prix identiques aux données (comparaison par script, 0 écart), menu mobile, onglets, lightbox et formulaires fonctionnels, focus visible (outline 2 px sur 14 Tab), 0 débordement à 390 et 1440.
- Créativité 5 : mise en page éditoriale correcte mais attendue ; la seule idée propre est l'état d'ouverture et le jour courant dans les horaires.
- Contenu 7 : faits conformes (adresse, téléphone, e-mail, horaires, FAQ, dates de commande) ; deux phrases non prouvées (C1) et un titre de panneau peu pertinent (C3).
- Technique 7 : build à jour (dist 04:29, src 04:25), 0 erreur console, 0 requête en échec, axe 0 sur 6 pages x 2 largeurs, mais aucun JSON-LD et des URL de canonical/OG relatives.

## Méthode et limites
- `QA-revue1.md` n'existe pas pour le legacy et le shoot de l'agent captures a échoué (`.shots-maison-des-desserts-legacy-revue1/summary.json` : trois `shootFailed`, « browser closed »). Mesures refaites par scripts maison sur mon propre serveur (port 4561, PID 3935, arrêté en fin de tâche) : 6 pages x 1440 et 390 px, axe-core de `node_modules`, console, requêtes, débordement, cibles, métas, horloges simulées, clavier, menu, formulaire, lightbox, reduced motion, sans JavaScript. Captures et planches dans `.shots-maison-des-desserts-legacy-revue1/m/`.
- Non refaits (hors budget de sobriété) : sloplint (auto-notation du constructeur : 0 REFLEX, FAIL 34 faux positif, non vérifiée par moi), LCP/CLS sous ralentissement (QA-build : LCP mobile 976 ms, CLS 0,045 sur l'accueil, sous les seuils), liens externes (Instagram, Facebook, boutique : URL identiques à `donnees.json`, non appelées), succès d'envoi des formulaires (mon script n'a pas rempli le champ téléphone ; la validation en erreur (5 champs invalides) fonctionne et le message « Rien n’a été envoyé » est lu dans `site.js:98`).
- Contrôles passés : build OK ; 7 URL internes en 200 ; 0 ancre cassée dans la carte ; `lang="fr"`, un seul `h1` par page, `noindex`, mention « Maquette KYW, certaines données sont illustratives » et pied KYW sur les 6 pages ; 0 `img` sans `alt`, alts conformes au champ `sujet` de `photos/index.json` ; aucune image > 300 Ko ; texte caché en reduced motion : 0 ; sans JavaScript : 0.

## Findings (par gravité)

### F1 majeurs
- **S1 · JSON-LD absent** (`src/layouts/Base.astro`). `grep -c 'application/ld+json'` = 0 sur `index`, `contact` et les 4 autres pages. Le prompt (§ C) exige un JSON-LD `Restaurant` avec adresse et horaires. Correction : ajouter dans `Base.astro` un bloc `Restaurant` ou `Bakery` (nom, adresse Rue Haute Marcelle 17, 5000 Namur, `telephone` +3281227451, `openingHoursSpecification` mardi à samedi 08:00-18:00, `geo` 50.4669 / 4.8675, `sameAs` Instagram et Facebook) ; le dossier relève que le site actuel porte déjà des données `Bakery`.
- **C1 · T-invente, deux phrases non prouvées** (`src/data/site.ts:26-27`, rendu sur `/` panneaux « Pâtisserie » et « Chocolaterie »). « signature de la troisième génération » : le dossier dit seulement que la troisième génération dirige la maison. « spécialité namuroise de la maison » : `donnees.json` dit « spécialité de la maison » (biétrumés), pas namuroise. Aucune des deux n'est marquée `placeholder`. Correction : « Pâtisseries et macarons faits maison. » et « Chocolats belges et biétrumés, spécialité de la maison. ».

### F2 moyens
- **B1 · Fête du 1er janvier : état d'ouverture faux** (`src/scripts/site.js:52`). `Intl.DateTimeFormat('fr-BE', {day:'numeric', month:'numeric'})` rend `"01"` et `"01"` (vérifié dans Node et dans Chromium) ; le test `parts.day === '1' && parts.month === '1'` échoue. Horloge simulée au 2027-01-01 10:00 (Europe/Brussels) : la page contact affiche « Ouvert maintenant, jusqu’à 18 h 00 » alors que l'accueil annonce « Fermé les 25 décembre et 1er janvier ». Le 25 décembre est bien traité. Correction : comparer `Number(parts.day)` et `Number(parts.month)`. Les 10 autres horloges testées sont justes (vendredi 07:00 « Ouvre aujourd’hui à 8 h 00 », 12:00 ouvert, 18:00 fermé, samedi 17:59 ouvert, dimanche et lundi fermés).
- **C2 · Index de la carte : deux entrées « La cuisine » identiques** (`pl-carte1440.png`, index à gauche ; mêmes H2 `La cuisine` x 2 dans le contenu). Les deux services sont différents (12 h à 15 h, 11 h 30 à 17 h 30) et le visiteur ne sait pas où il va. Correction : intituler `La cuisine de midi` et `La cuisine de l’après-midi` (ou reprendre la plage horaire dans le titre) dans `src/data/carte.json` et dans l'index.
- **C3 · Panneau « Chocolaterie » de l'accueil hors sujet** (`home-1440-full.png`, section « Trois métiers »). Le détail « À la carte » liste des bûches de Noël, gâteaux de l'An et gâteaux glacés (rubrique « fetes », câblage de la phase 1) au lieu de chocolats, pralines, biétrumés, macarons, qui figurent pourtant dans la carte des fêtes. Correction : pointer le panneau vers les lignes Pralines, Biétrumés, Macarons de Paris (et garder les bûches pour la carte).
- **M1 · `canonical` et `og:image` relatifs** (`Base.astro`). Extrait : `<link rel="canonical" href="/maison-des-desserts/legacy/">`, `og:image content="/maison-des-desserts/legacy/photos/01-facade-vitrine-noel-800.webp"`. Les robots de partage ne résolvent pas un chemin relatif en image d'aperçu ; le sitemap, lui, est absolu (`https://kyw-test-restaurant.vercel.app/…`). Correction : préfixer par l'origine de `site` de `astro.config.mjs`. La 404 porte en plus `canonical = …/404/` (page inexistante) : retirer le canonical de la 404.
- **N1 · Menu mobile non « plein cadre »** (`menu-390.png`). Le panneau couvre la nav et les liens, mais l'index du hero (« Cuisine de midi », « Pâtisseries… »), la photo et le début de page restent visibles dessous, sans voile : lecture brouillée. Correction : `nav[popover]` en `inset: 0` avec fond opaque (ou `::backdrop` opaque). Les liens font 56 px, Échap ferme, `aria-expanded` OK.

### F3 finitions
- Cibles de 21 px de haut à 1440 (aucune à 390) : « Voir à la carte » et le téléphone sur `/`, téléphone, e-mail, Instagram et Facebook sur `/contact` (mesure `getBoundingClientRect`, hauteur 21, largeur 70 à 125 px). Passer à `min-block-size: 24px` en `display: inline-block` (WCAG 2.5.8).
- Décor d'éditorial : petit filet suivi d'une légende, en « eyebrow » (« —— trois générations, une même maison » avant le texte d'histoire) et sur les légendes de photos (« —— vitrine de Noël ») : le filet ne dit rien et se répète ; le supprimer ou le réserver à un seul endroit.
- Lettrine « L » de l'histoire séparée de « a chocolaterie » par un grand blanc à 1440 et à 390 (`home-390-full.png`, 2e bande) : resserrer le `float`/`margin` de la lettrine et lui donner `aria-hidden` si elle est doublée.
- Hero mobile : la photo de la façade, seule image du premier écran à 1440, est sous la ligne de flottaison à 390 (après le texte et l'index). Acceptable, mais la photo est le meilleur atout du site : la remonter au-dessus de l'index de la carte.
- `/jobs` : le cadre « Être prévenu » laisse un grand vide entre l'indication et le bouton, et la moitié droite de la page est vide (`pl-f1440.png`, 4e vignette). Resserrer.
- Typographie : « Jobs » (anglicisme, repris du site du client), « avec passion » (reprise du site actuel, mot creux) : à garder si le client y tient, à signaler sinon.
- Dates : accueil « depuis 1993 » (hero) et « née en 1946 » (histoire) sont toutes deux dans le dossier, mais celui-ci relève l'incohérence 1946 / 1987 / 1993 et la reprise de 1974 « à confirmer » ; hypothèse du constructeur à faire valider par le client.
- Polices tierces non préchargées (Fontshare pour Sentient, Google Fonts pour Hanken Grotesk 400 seul) : elles se chargent ici (`document.fonts` : Sentient 300 et 400 loaded), mais en cas d'échec le repli est Georgia et system-ui ; ajouter `preload` ou auto-héberger (déjà noté dans RAPPORT).

## Ce qui est bien (à ne pas casser à la révision)
1. La carte : 142 plats et prix fidèles aux données, index sticky, prix qui passent à la ligne, PDF d'origine proposé en bas (`pl-carte1440.png`).
2. Accessibilité et robustesse : axe 0 sur 12 combinaisons page x largeur, skip link en premier arrêt, focus visible, reduced motion et sans JavaScript sans texte caché, formulaires honnêtes (« Rien n’a été envoyé… »).
3. Sobriété du ton : vouvoiement, ponctuation française (espaces avant `:` `;` `?`), pas de tiret cadratin, pas d'avis ni de chiffre inventés, photos légendées selon le champ `sujet`.

## Décompte
F0 : 0 · F1 : 2 · F2 : 5 · F3 : 8 (avec S1, C1 ; B1, C2, C3, M1, N1).
