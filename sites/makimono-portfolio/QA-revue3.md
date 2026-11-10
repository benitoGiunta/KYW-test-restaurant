# QA revue 3 : makimono / portfolio

Build : `scripts/q.sh makimono-portfolio-revue3-build` (exit 0, sortie `dist/makimono/portfolio/`).
Captures : `.shots-makimono-portfolio-revue3/` (sous-dossiers `home/`, `makimono-item/`, `404/`).
Journaux : `.logs/makimono-portfolio-revue3-*.log`.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/makimono/portfolio/` | `.shots-makimono-portfolio-revue3/home/` | `.shots-makimono-portfolio-revue3/home/planche.png` |
| La carte `/makimono/portfolio/carte/` | `.shots-makimono-portfolio-revue3/makimono-item/` | `.shots-makimono-portfolio-revue3/makimono-item/planche.png` |
| 404 `/__shoot-missing-page-…` | `.shots-makimono-portfolio-revue3/404/` | `.shots-makimono-portfolio-revue3/404/planche.png` |

Note : le script `shoot.mjs` a produit 3 pages (summary), alors que `audit.mjs` annonce « 5 pages crawled ».
`scripts/planche.py` ne lit pas `--colonnes` ni `--largeur` (ces valeurs sont prises pour des fichiers et ignorées, les planches sont en 1920 px de large).

## Chiffres (report.json)

| Indicateur | Accueil | La carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations (toutes) | 0 | 0 | 2 (serious : `document-title`, `html-has-lang`) |
| Axe : contrastNeedsReview | 50 | 6 | 0 |
| LCP desktop (ms) / élément | 328 / `span.loader__name` | 100 / `span.loader__name` | 48 / `pre` |
| LCP mobile (ms) / élément | 1108 / `p.hero__baseline` | 1096 / `p.lead` | 216 / `pre` |
| CLS desktop / mobile | 0 / 0.001 | 0 / 0 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Load (ms) desktop / mobile | 293 / 2234 | 138 / 2119 | 46 / 207 |
| Loader (ms) desktop / mobile | 2315 / n.d. | 2174 / n.d. | n.d. |
| Stabilisation écran (ms) desktop / mobile | null / null | 3902 / 6075 | 2205 / 2208 |
| FPS scroll desktop / mobile | 60 / 60 | 60 / 60 | 60 / 61 |
| Clavier : cibles de focus | 12 | 12 | 0 (focus quitte la page) |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : piégé | non | non | non |
| Lien d'évitement en premier | non | non | non |
| Survol : cibles testées / sans changement | 6 / 0 | 7 / 0 | 0 / 0 |
| Mouvement réduit : écran encore mouvant après 1,5 s | non | non | non |
| Titre `<title>` | « Makimono \| Sushi et poké bowls créatifs à Namur » | « La carte \| Makimono » | vide |
| H1 | « MAKI MONO » | « LA CARTE » | aucun |

Note du script : desktop FPS mesuré en headless sur GPU logiciel (plancher, pas une mesure matérielle). Mobile en ralentissement CPU x4, slow 4G.
Note 404 : `--nav` n'a trouvé aucun lien à cliquer sur cette page.

## Audit (`audit.mjs`)

Résultat : 0 FAIL, 3 WARN.
- WARN site : la page 404 n'a pas de `<h1>`.
- WARN site : pas de `robots.txt`.
- WARN site : pas de sitemap.

Poids de la page la plus lourde : ~1333 KB (HTML 7, JS 61 gz, CSS 7 gz, polices 88, images 1169).

## Fichiers

Aucun fichier source modifié, aucun commit. Serveur de test (port 4501) arrêté.
