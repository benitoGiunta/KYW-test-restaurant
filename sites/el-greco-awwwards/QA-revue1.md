# QA revue 1 : el-greco-awwwards (captures, faits)

Build : `scripts/q.sh el-greco-awwwards-revue1-build` (exit 0, 5 pages construites, `dist/el-greco/awwwards/`).
Serveur : `node .claude/skills/awwwards/scripts/serve.mjs dist --port 4502` (arrêté après les captures).
Journaux : `.logs/el-greco-awwwards-revue1-*.log`.

## Captures et planches

Dossier de captures : `/home/user/KYW-test-restaurant/.shots-el-greco-awwwards-revue1/`

| Page | URL testée | Dossier | Planche |
|---|---|---|---|
| Accueil | http://127.0.0.1:4502/el-greco/awwwards/ | `.shots-el-greco-awwwards-revue1/home/` | `.shots-el-greco-awwwards-revue1/home/planche.png` |
| Carte | http://127.0.0.1:4502/el-greco/awwwards/carte/ | `.shots-el-greco-awwwards-revue1/el-greco-item/` | `.shots-el-greco-awwwards-revue1/el-greco-item/planche.png` |
| 404 (page crawlée absente) | http://127.0.0.1:4502/__shoot-missing-page-… | `.shots-el-greco-awwwards-revue1/404/` | `.shots-el-greco-awwwards-revue1/404/planche.png` |

Note : `scripts/planche.py` a ignoré les options `--colonnes 4 --largeur 480` (traitées comme des fichiers, « No such file »). Les planches sont sorties en 1920 x 5280 px, 19 images chacune, sans ces options.
Note : le shoot a été relancé une fois (première exécution interrompue manuellement pendant la capture de la page carte, puis relancée complète). Le résultat présenté ici vient de la relance.

## Chiffres par page (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (serious) | 0 | 0 | 1 (`color-contrast`, 2 nœuds) |
| Axe contrastNeedsReview | 11 | 63 | 0 |
| CLS bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP bureau (ms) | 60 (`p.hero__phrase`) | 44 (`p.entete__phrase`) | 40 (`p`) |
| LCP mobile throttle (ms) | 924 (`img`) | 1464 (`p.entete__phrase`) | 224 (`p`) |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) | 0 | 0 | 0 |
| Cibles tactiles petites bureau / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil », 128x20) |
| Focus non visible / focus invisible | 0 / 0 | 0 / 0 | 0 / 0 |
| Lien d'évitement en premier focus | non | non | non |
| Focus bloqué | non | non | non |
| Texte masqué (reduced motion) | 0 | 0 | 0 |
| Animation hors mouvement réduit | non | non | non |
| FPS défilement bureau (pire trame) | 60 (17 ms) | 60 (17 ms) | 60 (17 ms) |
| FPS défilement mobile (pire trame) | 59 (67 ms) | 60 (17 ms) | n.d. |
| Hover : cibles réagissant | oui (ex. « Appeler », move) | oui (ex. « Entrées froides », color/borderColor) | oui (ex. « la page d'accueil », react none) |

Notes des rapports : le FPS bureau tourne en headless sur GPU logiciel (plancher, pas une mesure matérielle) ; le mobile tourne en ralentissement CPU x4 et 4G lente.

## Audit (`audit.mjs`)

- Résultat : **0 FAIL, 2 WARN**, 4 pages crawlées.
- WARN site : « no robots.txt ».
- WARN site : « no sitemap » (le build a pourtant créé `sitemap-index.xml` dans `dist/`, à vérifier côté chemin servi).
- Poids de la page la plus lourde : environ 379 Ko (html 4, JS 61 gz, CSS 6 gz, polices 88, images 220).

## Lignes FAIL

Aucune ligne FAIL dans l'audit.

## Anomalies relevées

- Page 404 : une violation axe `color-contrast` de gravité serious (2 nœuds).
- Page 404 : une cible tactile de 128x20 px (« la page d'accueil »), sous le seuil.
