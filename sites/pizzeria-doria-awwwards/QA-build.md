# QA build — pizzeria-doria / awwwards

Build : `node scripts/build-site.mjs sites/pizzeria-doria-awwwards` → exit 0 (5 pages, journal `.logs/pizzeria-doria-awwwards-build-build.log`).
Serveur : `serve.mjs dist --port 4502`, URL `http://127.0.0.1:4502/pizzeria-doria/awwwards/`, arrêté après les captures.
Captures : `shoot.mjs --crawl --nav` (journal `.logs/pizzeria-doria-awwwards-build-shoot.log`), résumé `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-awwwards-build/summary.json`.

## Pages capturées

| Page | Dossier de captures | Planche |
|---|---|---|
| accueil `/pizzeria-doria/awwwards/` | `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-awwwards-build/home/planche.png` |
| fiche `pizzeria-doria-item` | `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-awwwards-build/pizzeria-doria-item/` | `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-awwwards-build/pizzeria-doria-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-awwwards-build/404/planche.png` |

Planches : 1920 × 5280 px, 19 images chacune (4 colonnes, 480 px). Le script `planche.py` affiche deux lignes `ignoré` (valeurs 4 et 480 des options) sans effet sur le rendu.

Fichiers par dossier : accueil 13 `d-*`, 14 `h-*`, 4 `k-*`, 6 `m-*`, 2 `r-*` ; fiche 13 `d-*`, 14 `h-*`, 4 `k-*`, 6 `m-*`, 2 `r-*` ; 404 13 `d-*`, 4 `h-*`, 2 `k-*`, 6 `m-*`, 2 `r-*`.

Écart : `shoot.mjs` a capturé 3 pages (accueil, fiche, 404) ; `audit.mjs` a crawlé 4 pages, dont `/pizzeria-doria/awwwards/reservation/`, que la capture ne couvre pas.

## Mesures par page (report.json)

| Mesure | Accueil | Fiche | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 1 (`color-contrast`, impact serious, 2 nœuds) |
| Contraste à vérifier (axe) | 0 | 0 | 0 |
| LCP desktop (ms) | 68 | 88 | 32 |
| LCP mobile (ms) | 1232 | 1044 | 220 |
| CLS desktop | 0 | 0,002 | 0 |
| CLS mobile | 0 | non mesuré dans report.json | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil 128x20 ») |
| Éléments cachés WebGL (glHidden) desktop | 0 | 0 | 0 |
| Clavier : arrêts de focus | 12 | 12 | 3 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus bloqué | 0 | 0 | 0 |

Accueil : titre « Pizzeria Doria | Pizzas dans l’ancienne salle des coffres, Malonne » ; h1 « PIZZERIA DORIA ». Défilement desktop mesuré à 60 FPS (pire trame 17 ms).

## Audit (`audit.mjs`)

Résultat : **0 FAIL, 12 WARN** (4 pages crawlées ; poids le plus lourd : accueil, environ 662 Ko).

WARN :
- 10 × « sentence repeated 2x » sur les horaires (accueil et `/reservation/`, lignes lundi, jeudi, vendredi, samedi, dimanche).
- 1 × `site` : pas de `robots.txt`.
- 1 × `site` : pas de `sitemap`.
