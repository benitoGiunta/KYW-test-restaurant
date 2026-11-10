# QA build : makimono / portfolio (passe build, rôle captures)

Source : `dist/makimono/portfolio/` servi sur `http://127.0.0.1:4501/makimono/portfolio/` (serveur arrêté après les captures). Aucun fichier source modifié, aucun commit.

## Pages capturées

| Page | Dossier de captures | Planche |
|---|---|---|
| home (`/makimono/portfolio/`) | `/home/user/KYW-test-restaurant/.shots-makimono-portfolio-build/home/` | `/home/user/KYW-test-restaurant/.shots-makimono-portfolio-build/home/planche.png` |
| makimono-item (`/makimono/portfolio/carte/`) | `/home/user/KYW-test-restaurant/.shots-makimono-portfolio-build/makimono-item/` | `/home/user/KYW-test-restaurant/.shots-makimono-portfolio-build/makimono-item/planche.png` |
| 404 (`/__shoot-missing-page-*`, page 404 servie) | `/home/user/KYW-test-restaurant/.shots-makimono-portfolio-build/404/` | `/home/user/KYW-test-restaurant/.shots-makimono-portfolio-build/404/planche.png` |

Synthèse des captures : `/home/user/KYW-test-restaurant/.shots-makimono-portfolio-build/summary.json`

## Chiffres par page (report.json)

| Mesure | home | makimono-item | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 1 règle : `color-contrast` x20 (sérieux) | 0 | 2 règles : `document-title` x1, `html-has-lang` x1 (sérieux) |
| LCP desktop (ms) | 136 | 100 | 32 |
| CLS desktop | 0.019 | 0 | 0 |
| LCP mobile (ms) | 1108 | 1104 | 232 |
| CLS mobile | 0.001 | 0 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Focus clavier sans indicateur visible | 0 | 0 | 0 |
| Focus clavier invisible | 0 | 0 | 0 |
| Focus clavier bloqué | non | non | non (sortie de page) |
| Cibles au survol | 6 (0 sans changement) | 7 (0 sans changement, 1 changement colore seul) | 0 |
| FPS mobile (scroll) | 60 (frame max 17 ms) | 60 (frame max 17 ms) | 60 (frame max 17 ms) |

Notes du rapport : FPS desktop mesurés sur GPU logiciel headless (plancher, pas une mesure matérielle) ; `--nav` n'a trouvé aucun lien cliquable sur la page 404.

## Audit (`audit.mjs`)

- Pages explorées : 5 (crawl depuis l'accueil)
- Page la plus lourde : `/makimono/portfolio/`, ~1332 KB (html 7, JS 61 gz, CSS 7 gz, polices 88, images 1169)
- Résultat : **0 FAIL, 3 WARN**
- Journal : `/home/user/KYW-test-restaurant/.logs/makimono-portfolio-build-audit.log`

## Captures et journaux

- Journal de build : `/home/user/KYW-test-restaurant/.logs/makimono-portfolio-build-build.log`
- Journal des captures : `/home/user/KYW-test-restaurant/.logs/makimono-portfolio-build-shoot.log`
- Journal serveur : `/home/user/KYW-test-restaurant/.logs/serve-portfolio.log`
