# QA build : chez-guillaume / awwwards

Passe : build. Faits seulement, extraits des `report.json` et du journal d'audit. Pas d'analyse de design.

Build : `sites/chez-guillaume-awwwards` → `dist/chez-guillaume/awwwards/` (5 pages, sans erreur, journal `.logs/chez-guillaume-awwwards-build-build.log`).
Serveur de test : port 4502, arrêté après les captures.

## Pages

### home (`/chez-guillaume/awwwards/`)
- Captures : `/home/user/KYW-test-restaurant/.shots-chez-guillaume-awwwards-build/home/`
- Planche : `/home/user/KYW-test-restaurant/.shots-chez-guillaume-awwwards-build/home/planche.png`
- Erreurs console : 0 ; requêtes en échec : 0
- Axe : 0 violation (sérieuses : 0) ; 29 contrastes « à vérifier »
- LCP desktop 76 ms (img) ; LCP mobile 1168 ms (img) ; CLS desktop 0 ; CLS mobile 0,01
- Débordement horizontal : non (desktop et mobile) ; éléments débordants : 0
- Cibles tactiles petites : 0 (desktop et mobile) ; texte caché (réduit) : 0
- Clavier : 12 arrêts de tabulation ; focus non visible : 0 ; focus invisible : 0 ; piège : non ; lien d'évitement en premier : non
- Survol : 7 cibles ; sans changement : 1 ; changement de couleur seulement : 2 ; recouvertes : 0
- FPS défilement desktop : 60 ; FPS mobile : 60 ; mouvement sans interaction : non

### chez-guillaume-item (`/chez-guillaume/awwwards/carte/`)
- Captures : `/home/user/KYW-test-restaurant/.shots-chez-guillaume-awwwards-build/chez-guillaume-item/`
- Planche : `/home/user/KYW-test-restaurant/.shots-chez-guillaume-awwwards-build/chez-guillaume-item/planche.png`
- Erreurs console : 0 ; requêtes en échec : 0
- Axe : 0 violation (sérieuses : 0) ; 17 contrastes « à vérifier »
- LCP desktop 72 ms (h1#titre) ; LCP mobile 1108 ms (p.texte) ; CLS desktop 0 ; CLS mobile 0
- Débordement horizontal : non ; éléments débordants : 0
- Cibles tactiles petites : 0 ; texte caché (réduit) : 0
- Clavier : 12 arrêts ; focus non visible : 0 ; focus invisible : 0 ; piège : non ; lien d'évitement en premier : non
- Survol : 7 cibles ; sans changement : 2 ; changement de couleur seulement : 0 ; recouvertes : 0
- FPS défilement desktop : 60 ; FPS mobile : 60 ; mouvement sans interaction : non

### 404 (`/__shoot-missing-page-…`)
- Captures : `/home/user/KYW-test-restaurant/.shots-chez-guillaume-awwwards-build/404/`
- Planche : `/home/user/KYW-test-restaurant/.shots-chez-guillaume-awwwards-build/404/planche.png`
- Erreurs console : 0 ; requêtes en échec : 0
- Axe : 2 violations sérieuses : `document-title` (balise title absente), `html-has-lang` (attribut lang absent) ; 0 contraste « à vérifier » listé dans le rapport
- LCP desktop 32 ms (pre) ; LCP mobile 208 ms (pre) ; CLS 0 partout
- Débordement horizontal : non ; éléments débordants : 0
- Cibles tactiles petites : 0 ; texte caché (réduit) : 0
- Titre de page : vide ; h1 : absent
- Clavier : 1 arrêt (« focus left the page ») ; pas de survol testé (0 cible)
- FPS défilement desktop : 60 ; FPS mobile : 60

## Audit (`audit.mjs`, 4 pages explorées)

Journal : `.logs/chez-guillaume-awwwards-build-audit.log`

- FAIL : 0
- WARN : 5
  1. `/chez-guillaume/awwwards/carte/` : phrase répétée 2 fois « 29 € 2 services 39 € 3 services »
  2. `/chez-guillaume/awwwards/carte/` : phrase répétée 2 fois « Dessert Riz au lait, compotée de coing, prune en pickles »
  3. site : la page 404 n'a pas de `<h1>`
  4. site : pas de `robots.txt`
  5. site : pas de `sitemap`
- Page la plus lourde : `/chez-guillaume/awwwards/`, environ 402 KB (html 5, JS 62 gz, CSS 7 gz, polices 64, images 264)

## Captures : remarques de méthode

- `shoot.mjs --crawl --nav` : la capture de navigation n'a trouvé aucun lien cliquable hors de la page testée (« tried none found ») sur la page 404. Le FPS desktop est mesuré sur GPU logiciel (plancher, pas mesure réelle).
- `planche.py` : les options `--colonnes 4 --largeur 480` ne sont pas reconnues par le script et sont lues comme fichiers (« ignoré »). La planche est produite avec les valeurs par défaut (1920 px de large, 4 colonnes). Les trois planches couvrent toutes les images `d-*` et `m-*` de leur dossier.
- Le `report.json` de la page 404 n'a pas de champ `hover` exploitable (0 cible).
