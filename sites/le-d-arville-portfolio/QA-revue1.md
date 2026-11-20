# QA revue 1 — le-d-arville / portfolio (captures)

Build : `scripts/build-site.mjs sites/le-d-arville-portfolio` : exit 0, 8 pages, sitemap-index.xml créé (`.logs/le-d-arville-portfolio-revue1-build.log`).
Serveur : `serve.mjs dist --port 4501`, PID arrêté après captures. URL : `http://127.0.0.1:4501/le-d-arville/portfolio/`.
Captures : `shoot.mjs --crawl --nav` ; journal `.logs/le-d-arville-portfolio-revue1-shoot.log` ; résumé `.shots-le-d-arville-portfolio-revue1/summary.json`.
Audit : `audit.mjs` ; journal `.logs/le-d-arville-portfolio-revue1-audit.log`.

Note : l'audit indique 7 pages crawlées ; la capture n'a produit que 3 dossiers de page (`home`, `le-d-arville-item`, `404`). Le journal de capture indique « 3 pages shot ». Les pages /menu/, /carte/, /reservation/ etc. ne sont pas capturées dans ce passage.

## Pages capturées

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/le-d-arville/portfolio/` | `.shots-le-d-arville-portfolio-revue1/home/` | `.shots-le-d-arville-portfolio-revue1/home/planche.png` |
| Menu `/le-d-arville/portfolio/menu/` (libellé shoot : le-d-arville-item) | `.shots-le-d-arville-portfolio-revue1/le-d-arville-item/` | `.shots-le-d-arville-portfolio-revue1/le-d-arville-item/planche.png` |
| 404 (`/__shoot-missing-page-…`) | `.shots-le-d-arville-portfolio-revue1/404/` | `.shots-le-d-arville-portfolio-revue1/404/planche.png` |

Planches : 1920 x 8526 px, 19 images chacune (`planche.py … --colonnes=4 --largeur=480` ; la première passe avec `--colonnes 4` séparé n'a pas pris les options et a été refaite).

## Chiffres (report.json)

| Mesure | Accueil | Menu | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 1 (color-contrast, impact serious, 2 nœuds) |
| Axe contrastNeedsReview | 22 | 4 | 0 |
| LCP desktop (ms) | 132 (img) | 48 | 52 |
| CLS desktop | 0 | 0 | 0 |
| LCP mobile (ms, throttled) | 1380 | 1196 | 268 |
| CLS mobile | 0 | 0 | 0 |
| FPS scroll desktop / mobile | 60 / 60 | 60 / 60 | 60 / 60 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors règle (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Petites cibles tactiles desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil 128x20 ») |
| Mouvement réduit : écran encore mobile à 1,5 s | non | non | non |
| Arrêts clavier (keyboard stops) | 12 | 12 | 3 |

## Audit (audit.mjs)

- FAIL : 0
- WARN : 5
  1. `/le-d-arville/portfolio/` : phrase répétée 2x « du jeudi au samedi, 19:00 à 21:30 »
  2. `/le-d-arville/portfolio/` : phrase répétée 2x « du vendredi au dimanche, 12:00 à 14:30 »
  3. `/le-d-arville/portfolio/reservation/` : phrase répétée 2x « 12:00 à 14:30, 19:00 à 21:30 »
  4. site : pas de robots.txt
  5. site : pas de sitemap (l'audit ne voit pas `sitemap-index.xml` produit par le build)

## Lignes FAIL

Aucune.
