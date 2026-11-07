# Revue portfolio · INCORЯECT (Incorrect, Namur) · passe 1
Verdict : A_CORRIGER (0 F0, 1 F1, 7 F2, 6 F3)

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une affiche de concert punk collée au mur (aplats rouge, jaune acide et vert sapin, bords en dents de scie, ombres dures, titres XXL en capitales étirées) où la carte est un mur de cartes-tickets et le Dwight Schrute est dessiné couche par couche.

Preuves : build OK (6 pages, QA-revue1.md), serveur de contrôle sur le port 4617 (PID noté, arrêté), captures de l'agent captures (home, carte) relues par planche, puis script maison (axe-core complet de `node_modules`, contraste canvas, débordement, 1440 et 390 px, 6 pages) et captures `fullPage` histoire, à emporter, réservation, 404 (planches `scratchpad/inc-p1/planche-D.png` et `planche-M.png`). Le QA ne couvre que 3 pages sur 6 et sa « 404 » est la réponse brute de `serve.mjs` ; `/404.html` mesurée à part (title, h1, lang, noindex OK).

## Scores /10
- Design 8 : direction forte et tenue de bout en bout (palette, dents de scie, polices Archivo étirée), mais `histoire` laisse la moitié droite vide autour de deux polaroïds sans photo.
- Usabilité 6 : navigation, menu, réservation et pastille « ouvert » fonctionnent, mais la carte (page centrale) perd des cartes hors écran à toutes les largeurs (F1-1) et la page à emporter casse à 768 px.
- Créativité 8,5 : le plat dessiné en cinq couches avec prix qui claque, la pastille calculée à l'heure de Namur et les transitions d'affiche sont spécifiques à ce restaurant.
- Contenu 7 : prix et plats conformes à `donnees.json` (62 lignes lues à l'œil, 0 écart relevé), mentions et pied conformes ; reste « ou par téléphone » non prouvé et trois formats d'heures.
- Technique 6 : 0 erreur console, 0 requête en échec, 0 lien mort (6 pages et `og.jpg` en 200, 0 lien hors `base`), images ≤ 211 Ko, mais débordements masqués par `overflow-x: clip`, axe complet à 3 règles en échec, CLS desktop 0,067.

## Findings (par gravité)

### F1 (majeur)
**F1-1 · `carte/` · « Ce qu'il y a dedans » déborde et sort de l'écran à toutes les largeurs.**
Preuve : `.formules` (`src/styles/base.css:254`, `repeat(3, 1fr)`) contient 4 cartes dont un chiffre géant (« 48 h », « Bodson », « Kimchi », « Oui »). Mesure à 1440 px : `scrollWidth` 2500 pour 1392 de large utile, cartes en 24-502, 526-1556, 1580-2525 (la 3e « Fait maison » est entièrement hors écran, la 4e repart à la ligne) ; à 1920 : même 2500 ; à 390 : 532 pour 342, capture `rail-390.png` : « Bodso… » et « Kimch… » coupés, texte « Le kimchi et le beurre au kimchi sortent de la c… » tronqué. `scrollLeft` reste à 0 (rien ne défile). Ni `shoot.mjs` ni l'audit ne le voient (`html` en `overflow-x: clip`, scrollWidth de page = viewport).
Correction : `grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr))` ou `repeat(2, minmax(0, 1fr))` avec 4 cartes, `min-width: 0` sur `.formule`, chiffre en `clamp()` plafonné à la largeur de carte (`font-size: min(var(--t-prix), 14cqi)` ou `overflow-wrap: anywhere`), puis re-mesurer les positions (pas `scrollWidth` de page) à 390, 768, 1024, 1440, 1920. Même piège que `agents/lecons/construction.md` (`minmax(0, 1fr)`).

### F2 (mineur)
**F2-1 · `a-emporter/` · titre « COMMANDER » coupé en « COMM / ANDER » à 1440 px** (section verte, capture `crop-ae.png`). Un mot ne se coupe pas : réduire le `font-size` du titre pour qu'il tienne (`clamp` borné par `vw`) et retirer tout `overflow-wrap: anywhere` sur `.display--mega`.
**F2-2 · cartes plats (`a-emporter/` à 1440, même composant que `carte/`) : « 4 FROMASTIQUES » dépasse la carte à droite et « SIROP » de la description est mangé par le bord** (`crop-ae.png`). Correction : `min-width: 0`, `overflow-wrap: break-word` sur le titre de carte, taille de titre plafonnée à la largeur de la carte.
**F2-3 · Tablette 768 px.** `a-emporter/` : la rangée « Choisissez / Appelez / Passez la porte » dépasse de 270 px (3e carte hors écran, capture `t-ae-768.png`) ; `reservation/` : encart « Rue Haute Marcelle » dépasse de 129 px ; `carte/` : Suppléments dépassent de 14 px. Passer à 1 colonne sous 900 px ou `minmax(0, 1fr)` sur `.etapes` et le plan.
**F2-4 · Axe complet (relancé par page, le QA ne voit que `serious` sur `home`) :**
- `color-contrast` serious, `/` : couches inactives de « Ça s'empile » à `opacity: .32` (`base.css:152`), texte crème 2,2 à 2,4:1 (« Pain au levain », « maison, grillé », numéros 01 à 05) à 1440 et à 390 ; état transitoire du scrub mais lisible comme tel au chargement et pour tout lecteur sans JS de scroll. Remonter à `opacity: .6` minimum (≥ 4,5:1) ou souligner l'actif autrement.
- `color-contrast` : flèche « → » jaune sur rouge `#ff4b2b` à 2,66:1 (`base.css:192`, `.horaires__jour .fleche`), 5 occurrences sur `/` et `reservation/` ; mettre en encre ou `aria-hidden` + encre.
- `aria-prohibited-attr` serious sur les 6 pages (1 à 5 nœuds) : SplitText pose `aria-label` sur des `<p>`/`<strong>` (définition, prix 14,50 €, « À table ! », paragraphes d'histoire) ; option `aria: 'none'` / `role` valide, ou `aria-label` sur un `<span role="text">`.
- `landmark-no-duplicate-contentinfo` moderate, 6 pages : `<footer class="footer">` du site (`Footer.astro:11`) et `kyw-footer` sont deux `contentinfo` de premier niveau ; le pied du site peut devenir `<div role="region" aria-label="Coordonnées">`.
**F2-5 · Performance : CLS desktop home 0,067** (`report.json`, seuil du prompt 0,05) ; heroSettledMs `null` (mouvement du hero jamais « posé »). Nommer la source par `PerformanceObserver('layout-shift')` avec `sources` sous CPU x4 et corriger (probablement bascule de police ou entrée du plat).
**F2-6 · Contenu non prouvé : « ou par téléphone ».** `reservation/` (chapeau « En ligne via Barestho, ou par téléphone »), meta description de `reservation/` et étape « Réservez » de la home (« En ligne via Barestho, ou par téléphone au 081 13 85 61 ») affirment une procédure absente de `donnees.json` et `dossier.md` (seuls Barestho et le numéro y figurent) et non marquée « illustratif » (leçon commun.md sur les procédures). Retirer, ou marquer « (illustratif) » comme la vente à emporter.
**F2-7 · `histoire/` « Le duo » : deux polaroïds jaunes vides avec la lettre A et la lettre E, moitié droite de l'écran vide à 1440** (`planche-D.png`). Aucune photo d'équipe n'existe (vignettes 162 px inexploitables), donc soit réduire la section et la fusionner avec le texte, soit l'indiquer comme emplacement illustratif ; en l'état elle ressemble à une image manquante.

### F3 (finition)
- F3-1 · Trois formats d'heures sur la même page : « 18 h 30 à 21 h 30 » (bandeau), « 18h30 » (cartes), « 18:30 à 21:30 » (pied) ; choisir « 18 h 30 » partout.
- F3-2 · Détails ajoutés aux couches du Dwight Schrute sans source : « maison, grillé », « la base, bien rose » (`dossier.md` ne parle ni de grillé ni de rose) ; « Estelle fait sourire » vient de la fiche « matière à site », pas d'une source citée.
- F3-3 · Libellé accessible du plat de la home : « Dwight Schrute, le Dwight Schrute dessiné en cinq couches » (répétition, `title` du SVG) ; écrire « Illustration du Dwight Schrute en cinq couches ».
- F3-4 · Données de carte reprises telles quelles : « Rouge du moment au verre » affiche description « 6 / 6,50 / 7,50 » et prix « 6 € » (ambigu), « (version végé 20,50) » sans « € », apostrophes droites (`'Nduja`, `d'olive`) mêlées aux apostrophes typographiques du reste ; normaliser dans `src/data/carte.json`.
- F3-5 · Chiffres 01 à 05 (couches) et 01 à 08 (galerie) décoratifs, et « Vente à emporter : Oui » en gros chiffre de carte-stat : remplissage de type « stat » sans information.
- F3-6 · JSON-LD `Restaurant` sans `openingHoursSpecification` (le prompt § C attend adresse et horaires structurés) ; les horaires étant « à confirmer », ajouter les créneaux avec une note, ou justifier l'absence.

## Ce qui est bien (à ne pas casser à la révision)
1. L'identité : palette rouge/jaune/vert, dents de scie, ombres dures, logo au R inversé conservé ; aucun signe de design générique (pas de crème-terracotta, pas de glassmorphism, pas d'eyebrow systématique).
2. Le plat dessiné et la pastille « Ouvert à 12h00 » / carte « Aujourd'hui » calculées à l'heure de Namur : du contenu spécifique, pas du filler ; le titre de la 404 (« Affiche arrachée ») est sur le ton.
3. Hygiène : `noindex, nofollow` et mention « Maquette KYW, certaines données sont illustratives » sur les 6 pages, un seul logo KYW, `lang="fr"`, un `h1` par page, 0 erreur console, liens et `og.jpg` en 200, aucun lien hors `base`, mouvement réduit propre, mobile pensé (carte en pile, menu).

## Corrections hors périmètre (faux positifs écartés)
WARN audit « phrase d'horaires répétée » (bandeau + menu mobile dupliqués), « pas de robots/sitemap » (présents dans `dist/`), « 404 sans h1/title/lang » (réponse brute du serveur ; la vraie `404.html` a title, lang et h1). Contraste « à vérifier » : 0 hors les cas F2-4 (script canvas, 6 pages × 2 largeurs).
