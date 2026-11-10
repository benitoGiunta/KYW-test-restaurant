# Revue portfolio · Makimono · passe 1
Verdict : A_CORRIGER (0 F0, 3 F1, 8 F2, 4 F3)

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une affiche de rue rose, saumon et encre aux titres géants, aux cartes à ombre dure et au plat dessiné, dont la signature est une scène épinglée « Ça s'empile » qui monte un roll étape par étape jusqu'à son prix (10,10 €).

Base de la revue : `QA-revue1.md` et `.shots/` absents (l'agent captures n'a rien déposé ; seul `QA-build.md`, antérieur à la correction de contraste, existe). `dist/` (11:30) est plus récent que `src/` : pas de rebuild. Serveur propre sur le port 4741 (PID 7967, arrêté en fin de tâche). Mesures faites par scripts maison (Playwright, axe-core de `node_modules`, contraste canvas 1x1, positions de grille) sur 6 pages x 2 largeurs (1440 et 390), plus mesures ciblées à 1024, 1280, 1920 ; 80 images de captures lues par planches.

Scores /10 :
- Design 7 : identité forte et cohérente (affiche, ombres dures, zigzags, plat dessiné), mais trois zones cassent à l'écran (horaires, signature sur portable, étapes mobiles).
- Usabilité 5 : les horaires (info n°1) sont coupés (Jeudi) à 1024 et 1440, et deux des trois étapes de commande sont inaccessibles sur mobile.
- Créativité 8 : la pile « Ça s'empile » avec prix calculé et la pastille « ouvert » en direct sont propres à ce restaurant, pas un gabarit générique.
- Contenu 6 : prix et noms exacts (64 plats confrontés à `donnees.json`, 1 écart annoncé), mais deux « avis » sont des métadonnées déguisées en citations et deux procédures téléphoniques ne sont pas prouvées.
- Technique 7 : 0 erreur console, 0 requête en échec, LCP mobile 1,06 à 1,10 s, CLS 0,001 ; mais `overflow: clip` sur `.affiche` et `body` masque deux débordements de grille que ni shoot ni audit ne voient.

## Findings

### F1 (majeurs)

**F1-1 · Cartes d'horaires : la grille dépasse la fenêtre, Jeudi coupé (accueil et /venir/, 1024 à 1440 px).**
Preuve : `.horaires` = `repeat(4, 1fr)` (`src/styles/base.css:184`) ; colonnes mesurées à 385 px x 4 + gouttières = 1612 px dans un conteneur de 1392 px ; 4e carte de 1251 à 1636 px dans une fenêtre de 1440 (à 1024 : 1027 à 1338 px). Capture `mk1-s-1440-home-horaires.png` : « JEU » tronquée à droite. `overflow: clip` de `.affiche` masque le dépassement (scrollWidth = 1440, donc invisible à shoot et audit). Les heures en `--t-xl` passent en trois lignes (« 12h00 / → / 14h30 / 18h00 / → / 22h00 »), flèches seules sur leur ligne.
Correction : `repeat(4, minmax(0, 1fr))` ; réduire `.horaires__jour dd` (clamp lié à la largeur de carte) pour tenir « 12h00 → 14h30 » sur une ligne ; remesurer `getBoundingClientRect().right` de chaque carte à 768, 1024, 1280, 1440, 1920.

**F1-2 · Mobile 390 : « En trois gestes » est une grille de 3 colonnes de 1007 px dans 342 px ; « Commandez » et « Dégustez » sont coupées et inaccessibles (accueil et /commander/).**
Preuve : `src/pages/index.astro:104` et `src/pages/commander.astro:24` : `<ol data-cercles style="grid-column: 1 / -1; grid-template-columns: repeat(3, 1fr)">` en style inline, sans repli en une colonne (la règle `@media (max-width: 767px) { .etapes … }` de `base.css:208` ne vise pas cet `ol`). Mesure : `ol` 1007 px, enfants 24-336, 360-703, 727-1031 pour une fenêtre de 390 ; `scrollTo(300, …)` laisse `scrollX = 0`. Captures `mk1-s-390-commander-steps.png` (carte 2 entamée au bord) et planche `mk1-P-home390.png`.
Correction : déplacer la grille en CSS (`repeat(3, minmax(0, 1fr))` dès 768 px, `1fr` en dessous), retirer le style inline ; remesurer à 390, 768, 1024.

**F1-3 · Signature « Ça s'empile » tronquée sur portable : 3 étapes sur 5 visibles à 1440 x 900, 1440 x 780 et 1280 x 720 (4 sur 5 à 1920 x 1080).**
Preuve : scène épinglée `height: calc(100svh - 56px)` (`base.css:149`) ; pendant l'épinglage, l'étape 05 « La sauce » démarre à y = 1012 px (fenêtre 900), l'étape 04 est coupée en bas, la légende « (total calculé avec les prix de la carte, exemple) » aussi ; mêmes mesures sous reduced-motion. Capture `mk1-s-1440-empile-mid.png`. Cause : titres de liste en `--t-xl` qui passent sur deux lignes (« LA / PROTÉINE », « LES / FILLINGS »), la colonne texte étant moitié d'écran. Seul 768 x 1024 montre 5/5.
Correction : taille de liste bornée aussi par la hauteur (`min(…vw, …svh)`), titres sur une ligne (`white-space: nowrap`), et prix + légende dans la fenêtre ; vérifier 5/5 visibles à 1280 x 720, 1440 x 780, 1440 x 900, 1920 x 1080.

### F2 (mineurs)

**F2-1 · « Avis » : deux des trois citations sont des notes de Restaurant Guru mises entre guillemets.** `src/data/site.ts:127-128` : « Nourriture 5 sur 5, service 5 sur 5, ambiance 4 sur 5. Commande à emporter, dîner, 20 à 30 € par personne. » (donnees.json : `Food: 5 Service: 5 Atmosphere: 4, à emporter, dîner, 20-30 €`), c'est une grille de notes, pas un propos de client. Auteur « Geys_70 » alors que la donnée dit « Geys_ 70 ». Correction : afficher ces deux lignes comme notes (sans « »), garder « Exceptionnel. » en citation, copier l'identifiant exact.

**F2-2 · Procédure téléphonique non prouvée (T-invente).** `site.ts:121` « …ou par téléphone » et `venir.astro:28` « pour une table, appelez le +32 483 03 88 47 ». Le dossier dit : aucun outil de réservation trouvé, TripAdvisor « mieux vaut réserver » ; rien ne dit que le restaurant prend les réservations ou commandes par téléphone. Correction : « Pas d'outil de réservation en ligne trouvé. Téléphone : … » ou marquer « illustratif ». Le numéro lui-même reste à confirmer (+32 495 90 82 74 dans restaurants.json), déjà noté en placeholder.

**F2-3 · Note interne visible sur une carte : Korean Futo.** Carte et mobile : « Prix 11.00 € sur la page photo et 10.50 € sur la page tarifs (à confirmer) » puis « 10,50 à 11,00 € » (`carte.json`). « Page photo / page tarifs » n'a aucun sens pour un client et le point décimal diffère du reste (virgule). Correction : un seul prix marqué « à confirmer » (ou fourchette) sans la phrase de travail.

**F2-4 · « dès X € » sur 13 rolls de la carte (et 2 sur l'accueil) sans dire de quoi dépend le prix.** Les données portent « au choix de la protéine (prix par protéine) » (ex. California Classic : 7,60 à 9,90 €) ; aucune ligne de la page /carte/ ne le dit (le mot « protéine » n'y figure que dans le texte d'accueil de Create.Your.Roll). Correction : phrase d'en-tête « Prix selon la protéine choisie, le plus bas affiché » et, si la place le permet, la liste des protéines par roll.

**F2-5 · Majuscules et accords repris du PDF dans la carte.** « oignons Frits », « coco Râpé », « tofu Frit », « cream Cheese », « saumon Snacké façon Teriyaki », « tranche de Saumon par Dessus », « tempura Flakes », « jeunes Oignons », « Piments Mexicain » (composer), « Graines de Sésames » (15 lignes de la carte concernées). Correction : normaliser en minuscules (garder les noms propres de plats), « piments mexicains », « graines de sésame » ; script de normalisation dans `carte.json`.

**F2-6 · Titres de page coupés en plein mot à 1440 px.** « COMP / OSEZ » (/composer/) et « COMM / ANDER » (/commander/) ; à 1920 « Composez » passe sur 3 lignes. Captures `mk1-f-composer-1440-00.png`, `mk1-f-commander-1440-00.png`. Correction : bloc de titre plus large (ou taille bornée par la largeur du mot) ; aucune coupe sans trait d'union.

**F2-7 · Sous-titres de « Ça s'empile » lus à l'envers.** Les petits textes (« maki, california ou spring », « saumon snacké », « avocat et mangue ») se placent plus près du titre suivant que du leur : « maki, california ou spring » surmonte « LA PROTÉINE » (`mk1-s-1440-empile-mid.png`). Correction : réduire l'écart titre-sous-titre, agrandir celui entre étapes.

**F2-8 · Contraste : 14 nœuds axe sur l'accueil à 1440 (10 à 390).** Étapes « éteintes » de la pile en #59615a / #606861 sur #17261f : 2,46 à 2,73:1 (numéros, titres, sous-titres, `li[data-empile-item]`). Texte lu au défilement, pas décoratif. Correction : état éteint ≥ 4,5:1 pour le texte (≥ 3:1 pour les gros titres) en jouant sur la taille ou le poids plutôt que sur l'opacité.

### F3 (finition)

**F3-1 · axe `aria-prohibited-attr` (sérieux) : 3 nœuds sur l'accueil, 1 sur chaque autre page.** `aria-label` posé sur `<p>` et `<strong>` par SplitText (`.definition`, `strong[data-empile-prix]`, `.footer__adieu` ; `Footer.astro:15`). Correction : option `aria: false` de SplitText ou `role="text"`/`aria-hidden` sur les lettres avec texte lisible.

**F3-2 · axe `landmark-no-duplicate-contentinfo` (modéré) sur les 6 pages** : pied du site + `kyw-footer` en deux `<footer>` de premier niveau. Correction : convertir le pied du site en `<div>`/`<section aria-label>` ou le premier en `role="presentation"`-équivalent.

**F3-3 · /venir/ « La salle » : phrase doublon et photo.** « terrasse sur la rue. Façade vitrée et terrasse sur la rue Saint-Loup. » (venir) ; la photo sous le titre « La salle » est la façade, la photo de salle est plus bas (planche `mk1-P-venir390.png`). Correction : une seule phrase, photos permutées. Pied de page : « Itadaki / masu ! » affiché en deux mots (le `aria-label` dit « Itadakimasu » ; `Footer.astro:15`), et sur mobile la carte « Aujourd'hui » passe avant Lundi (ordre Mar, Lun, Mer…, `base.css:196`).

**F3-4 · Accueil : « Douze recettes signatures et plus »** alors que la carte en liste 21. Correction : nombre calculé depuis `carte.json`. Le texte SVG « Commander · Commander » du disque et une flèche « → » ont été mesurés à 1,78:1 par script (crème sur rose) ; non confirmé visuellement pour la flèche (encre sur les cartes) : à vérifier au passage de correction.

## Ce qui est bien (à ne pas casser)
1. Contenu factuel solide : adresse, horaires, téléphone du site actuel, e-mail, liens Deliverect et Ordering Club, 64 plats et prix identiques à `donnees.json` (seul Korean Futo diverge, annoncé), exemple 10,10 € recalculé et exact (4,00 + 3,50 + 2 x 0,80 + 0,50 + 0,50), placeholders marqués « illustratif » ou « exemple ».
2. Technique saine : `lang="fr"`, un seul `h1` par page, `noindex, nofollow` et mention « Maquette KYW, certaines données sont illustratives » sur les 6 pages, un seul logo KYW, JSON-LD `Restaurant` avec adresse, coordonnées et `openingHoursSpecification`, title/description/OG uniques, 404 conçue (`/404.html`, 200 sur robots, sitemap, favicon, og.jpg), 9 liens internes et externes cohérents avec le dossier, LCP mobile 1,06 s / 1,10 s, CLS 0,001, images ≤ 256 Ko.
3. Interactions : menu mobile (tap, `aria-expanded`, Échap), anneau de focus de 3 px sur 14 Tab (rose sur fond sombre), reduced-motion sans texte masqué ni animation infinie, pastille « ouvert » et badge « Aujourd'hui » pilotés par l'heure.

## Hypothèses et limites
- La pile à 1920 x 1080 : 4/5 mesurée (étape 5 partiellement sous la fenêtre), pas de capture.
- Liens externes (Deliverect, Ordering Club, Facebook, Instagram, Maps) non testés par réseau, comparés au dossier seulement.
- Pas de sloplint (variante portfolio) ; auto-notation `self`, aucun critique externe disponible.
