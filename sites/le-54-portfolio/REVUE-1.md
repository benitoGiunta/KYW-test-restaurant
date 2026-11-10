# Revue portfolio · Le 54 · passe 1
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une table gastronomique en bleu nuit et or, qui s'ouvre comme un rideau sur une salle noir et blanc, avec un filet doré qui se tend au défilement et le menu raconté en grands chiffres (4, 48, 3, 2010).

Méthode : build et dist déjà frais (aucun fichier de `src/` ou `public/` plus récent que `dist/.../index.html`, 03:50) ; QA-revue1.md réutilisé (3 pages sur 7, « 404 » = réponse brute du serveur, ses « pas de robots.txt/sitemap » sont faux : présents dans dist). Mesures personnelles : axe-core de node_modules complet, console, requêtes, débordement, balises, cibles < 24 px sur 7 pages x 1440/390 px (journal `.logs/rev54p1-mesure.log`), planches de fenêtre sur les 7 pages (desktop + mobile), Tab x14, reduced-motion, liens. Port propre 4761.

Scores /10 :
- Design 7 : palette bleu nuit et or tenue, Boska en grand corps, hero lisible (`home` d-01), mobile pensé (nom 19 vw, boutons pleins) ; mais les pages intérieures se ressemblent (hero + liste) et la même photo de salle revient 3 fois.
- Usabilité 7 : 0 erreur console, 0 requête en échec, tous les liens internes 200, Tab visible (outline 2 px) avec lien d'évitement en premier, réservation = 2 numéros `tel:` + formulaire client ; le nom du lien-logo disparaît sous 26 rem sans nom accessible.
- Créativité 6 : le rideau, le filet qui se tend et le « 54 » rempli sont propres au lieu ; les chiffres géants 4 / 48 / 3 forcent un peu la donnée (voir F2-3).
- Contenu 6 : tout vient du dossier, 0 invention non marquée, vouvoiement et typographie corrects ; mais lundi présenté ouvert sans réserve, répétitions (horaires 2 à 3 fois par page, allergies 3 fois sur /menu/), « du Le 54 » dans 4 descriptions.
- Technique 7 : build OK, 7 pages, 1,6 Mo au total, aucune image > 300 Ko, LCP mobile 1,2 à 1,4 s et CLS 0 (QA), scrollWidth = fenêtre partout ; axe : 1 serious (mobile) + 1 moderate (toutes pages).

## Findings
Totaux : F0 0 · F1 2 · F2 6 · F3 6.

### F1 (majeurs)
- **F1-1 Lien-logo sans nom accessible à 390 px (axe `link-name`, serious, 7 pages).** `styles/base.css:283` met `.header__nom { display: none }` sous 26 rem ; `components/Header.astro:20` ne garde que le cercle `aria-hidden` « 54 ». Preuve : axe à 390 px sur les 7 pages (`<a class="header__brand">` « does not have accessible text »). Correction : `aria-label="Le 54, accueil"` sur le lien (sans virgule inutile si `label-content-name-mismatch` apparaît : mettre « Le 54 accueil » ou garder le texte visible dans un `sr-only` au lieu de `display: none`).
- **F1-2 Lundi affiché ouvert sans réserve (T-faux possible).** `donnees.json` : lundi « à confirmer » (La-carte.be le dit fermé) ; `site.ts` porte `aConfirmer` mais le résumé calculé `horairesResume()` (`site.ts` fin de fichier, rendu dans `Footer.astro:22` et dans la clôture de `index.astro`) écrit « Tous les jours sauf mardi et mercredi, 18:30 à 21:00 » et « … sauf mardi, mercredi et samedi, 12:00 à 14:00 » sans aucune marque, sur les 7 pages ; le JSON-LD (identique sur toutes les pages) liste aussi le lundi. Seule `/reservation/` signale « à confirmer ». Correction : marquer « à confirmer » (lundi et plages) dans le résumé du pied de page et de la clôture, ou sortir le lundi du résumé (« Jeudi à dimanche » + « Lundi : à confirmer ») ; ne pas déclarer le lundi dans le JSON-LD tant que non confirmé.

### F2 (mineurs)
- **F2-1 « du Le 54 » dans 4 méta descriptions** : `pages/menu.astro:12` (« Le menu du moment du Le 54 »), `pages/salle.astro:8` (« La salle du Le 54 »), `pages/carte.astro:7` (« Les menus du Le 54 »), `pages/reservation.astro` (« au Le 54 »). Faute de contraction (leçon déjà connue sur la variante legacy). Correction : « de la maison Le 54 » / « chez Le 54 ».
- **F2-2 `landmark-no-duplicate-contentinfo` (axe, moderate, 7 pages x 2 largeurs)** : deux `<footer>` de premier niveau (`Footer.astro:9` classe `footer` + `kyw-footer`). Correction : le pied du site en `<div>`/`<section aria-label>` ou `role="presentation"`, en gardant un seul `contentinfo` (celui de kyw-footer), sans toucher au paquet.
- **F2-3 Chiffres monumentaux forcés** : « 4 services » (h2 de la home et « 4 » en filigrane sur /menu/) alors que le menu est à 3 ou 4 services (le 48 € est le 3 services) ; « 3 Collignon » ; chiffres de rang « 3 » (/histoire/) et « 4 » (/menu/) lus par les lecteurs d'écran en tête du `h1` (« 3 La maison », « 4 Le menu », `HeroPage.astro:12`). Les nombres sont prouvés, mais ils sont décoratifs là où ils n'apportent rien. Correction : ne pas mettre le chiffre dans le `h1` (aria-hidden sur le filigrane), titre de chapitre « 3 ou 4 services » plutôt que « 4 ».
- **F2-4 Répétitions** : audit `audit.mjs` (3 phrases répétées) confirmé ; sur la home les horaires apparaissent dans la clôture puis dans le pied (idem /reservation/ 3 fois) ; sur /menu/ le wagyu est décrit dans le plat (« Supplément de 40 € ») puis dans l'encadré suppléments, et la consigne allergies est dite 3 fois (ligne « Allergies et intolérances », « Réservation souhaitée. Allergies… »). /salle/ recopie les phrases « La salle / La cuisine / Venir » de la home. Correction : une occurrence par page, sauf pied de page.
- **F2-5 Citation tronquée présentée comme complète** : `site.ts` `citation.texte` = « Pas une seule fois nous avons été déçu. » ; l'avis d'origine (donnees.json) est « … pas une seule fois nous avons été déçu,... » (phrase coupée par la source, majuscule ajoutée, point final ajouté). Correction : citer la phrase avec ellipse (« …pas une seule fois nous avons été déçu… ») ou la phrase entière de l'avis.
- **F2-6 Même photo répétée** : la salle noir et blanc (hero) sert au hero, au chapitre « Venir » de /salle/ et à l'onglet de la home ; `geste-dressage` (mains) apparaît sur home, /salle/, /histoire/ (4 emplacements). Preuve : listes d'images par page. Avec 15 photos, répartir davantage (langoustine, assiette blanche, bols non utilisés sur /histoire/ ni /salle/).

### F3 (finitions)
- F3-1 Heures au format « 18:30 à 21:00 » ; en français : « 18 h 30 à 21 h » (`horaireTexte`, `horairesResume`).
- F3-2 « Accès pmr » : `styles/base.css:264` `.horaires dt { text-transform: lowercase }` s'applique aussi à la liste d'infos de /salle/ ; le sigle PMR doit rester en capitales.
- F3-3 « garniture estivale » (carte copiée du site client) en novembre : l'illustrer ou le marquer (la carte change « fréquemment », donc probablement dépassée).
- F3-4 404 : h1 « Rideau » est une trouvaille de ton mais peu explicite ; « Page introuvable » existe dans `<title>` seulement. Préférer un h1 clair et garder « Rideau » en sur-titre.
- F3-5 Photos de la page /menu/ (tartare, velouté, dessert) sans légende ni lien avec les plats listés (veau tonnato, wagyu, cochon de lait) : suggère des plats qui ne sont pas au menu affiché ; ajouter « illustration » ou une légende neutre.
- F3-6 Hero des pages intérieures : 100 à 150 px de vide entre l'intro et la liste (`menu` d-0, `carte` d-0) ; resserrer.

### Faux positifs du QA à ne pas corriger
- « Débordement desktop `img` » : `scrollWidth` = 1440 sur les 7 pages ; seul un `span` décoratif dépasse sans créer de défilement. Mobile : la galerie défile horizontalement par conception (bande focusable, ETAT.md).
- « Préférence mouvement réduit respectée : non » : reduced-motion émulé, pas de classe `motion`, pas de loader, seuls 2 `img alt=""` d'onglets inactifs à l'opacité 0 (décoratifs).
- « 404 sans title ni lang » : `/404.html` réel a `lang="fr"`, `<title>Page introuvable | Le 54</title>` et un `h1` ; « pas de robots.txt / sitemap » : présents.
- « Lien d'évitement en premier : non » : premier arrêt Tab = « Aller au contenu ».

## Critères de PUBLIABLE
Build OK ; 0 erreur console ; 0 lien mort (liens internes 200, externes non testés réseau mais URL identiques au dossier) ; 0 fait faux prouvé (mais F1-2 à lever) ; 0 invention non marquée ; 0 débordement ; 0 axe critique (1 serious : F1-1) ; mention « Maquette KYW, certaines données sont illustratives », logo KYW (1 `.kyw-footer__logo`) et `noindex, nofollow` sur les 7 pages. Passe suivante : F1-1, F1-2 et F2-1, F2-2 à corriger ; le reste au choix.

## Ce qui est bien (à ne pas casser)
1. L'accueil mobile : hero plein écran lisible, nom du restaurant en grand, bouton « Réserver une table » pleine largeur, `LE 54` en Boska.
2. Le pied de page et la mention KYW : un seul logo, bandeau clair du paquet, lisible sur fond sombre, mention présente sur toutes les pages.
3. La page /carte/ : trois prix en grands chiffres, « à confirmer » visible sur le 4 services (62 € G&M) et le 2 services, honnêteté sur les sources.
