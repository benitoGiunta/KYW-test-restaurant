# QA revue 2 : partage / legacy (captures, planches, audit)

Build : `scripts/q.sh partage-legacy-revue2-build` (exit 0), sortie `dist/partage/legacy/`.
Serveur local : `.claude/skills/awwwards/scripts/serve.mjs dist --port 4503`, arrêté après les captures.
Journaux : `.logs/partage-legacy-revue2-*.log`.

## Captures et planches

| Page | Dossier de captures | Planche | URL réellement capturée |
|---|---|---|---|
| Accueil | `.shots-partage-legacy-revue2/home/` | `.shots-partage-legacy-revue2/home/planche.png` | `/partage/legacy/` |
| Carte (nommé `partage-item` par le script) | `.shots-partage-legacy-revue2/partage-item/` | `.shots-partage-legacy-revue2/partage-item/planche.png` | `/partage/legacy/carte/` |
| 404 | `.shots-partage-legacy-revue2/404/` | `.shots-partage-legacy-revue2/404/planche.png` | `/__shoot-missing-page-*` (page 404 servie) |

Notes :
- `shoot.mjs --crawl` n'a visité que 3 pages (accueil, carte, 404). Les pages `/partage/legacy/bon-cadeau/` et `/partage/legacy/politique-de-confidentialite/` ne sont pas capturées, alors que l'audit les a crawlées (4 pages).
- Les planches ont été produites avec les valeurs par défaut de `scripts/planche.py` (3 colonnes, 640 px) : le parseur d'options lit `4` et `480` comme des fichiers (« ignoré 4 », « ignoré 480 » dans le journal). Les options `--colonnes` et `--largeur` n'ont pas d'effet.

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (total / serious) | 0 / 0 | 0 / 0 | 2 / 2 |
| Violations axe, détail | - | - | `document-title` (1 nœud), `html-has-lang` (1 nœud) |
| axe contrastNeedsReview | 15 | 3 | 0 |
| LCP desktop (ms, élément) | 476 (img) | 456 (img) | 36 (pre) |
| LCP mobile (ms, élément) | 1272 (p.hero__phrase) | 908 (img) | 228 (pre) |
| CLS desktop / mobile | 0.001 / 0 | 0.002 / 0 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments débordants desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 2 / 2 | 2 / 2 | 0 / 0 |
| Clavier : focus invisible | 0 | 0 | 0 |
| Clavier : focus non visible | 0 | 0 | 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : blocages (stuck) | non | non | non |
| Clavier : arrêts de tabulation | 12 | 12 | 1 |
| Survol : changement de couleur seul | 5 | 5 | 0 |
| Survol : éléments couverts | 0 | 0 | 0 |
| Survol : sans changement | 0 | 2 | 0 |
| Mouvement réduit : texte caché | 0 | 0 | 0 |
| Mouvement réduit : animation active | non | non | non |
| H1 | « Partage » | « Menus et carte » | aucun |

Détail utile :
- Accueil, cibles petites : « 081 81 00 98 81x18 » et « Attablez-vous 86x18 ».
- Accueil, survol couleur seule : h-01 « Réserver une table », h-03 « Toute la carte », h-04 « Offrir un bon cadeau », h-05 « Choisir un jour et une heure », h-07 « Partage Charles Jeandrain ».
- Carte, survol sans changement : 2 cibles (non détaillées dans le rapport).
- Le rapport 404 indique : `--nav` n'a trouvé aucun lien cliquable pour cette page (non applicable).
- Les FPS desktop sont mesurés sur GPU logiciel headless : valeur plancher, non mesurée sur matériel réel. Les chiffres mobiles sont à 4x de ralentissement CPU, slow 4G.

## Audit (`audit.mjs` sur `/partage/legacy/`)

Résultat : 0 FAIL, 7 WARN.
- WARN site : page 404 sans `<h1>`.
- WARN site : pas de `robots.txt`.
- WARN site : pas de `sitemap` (à la racine du serveur testé).
- WARN par page (accueil, carte, bon-cadeau, politique-de-confidentialite) : police `ttf/otf` livrée (`ieVq2YZDLWuGJpnzaiwFXS9tYvBRzyFLlZg_f_Ncs2Za4Q.ttf`), à remplacer par du woff2. Ces 4 lignes comptent dans les 7 WARN.
- Crawl audit : 4 pages, poids de la page la plus lourde ~780 KB (images 664, polices 103).
