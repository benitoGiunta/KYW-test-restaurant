# QA build : le-brunchist / awwwards

Passe build, phase test. Build sur `dist/le-brunchist/awwwards/` (exit 0). Serveur local port 4502, arrêté après usage. Captures faites par `shoot.mjs --crawl --nav` (3 pages shootées) ; audit par `audit.mjs` (4 pages crawlées, dont `/reservation/`, non shootée).

Journaux : `.logs/le-brunchist-awwwards-build-build.log`, `.logs/le-brunchist-awwwards-build-shoot.log`, `.logs/le-brunchist-awwwards-build-audit.log`.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| `/` (accueil) | `/home/user/KYW-test-restaurant/.shots-le-brunchist-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-le-brunchist-awwwards-build/home/planche.png` |
| `/carte/` | `/home/user/KYW-test-restaurant/.shots-le-brunchist-awwwards-build/le-brunchist-item/` | `/home/user/KYW-test-restaurant/.shots-le-brunchist-awwwards-build/le-brunchist-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-le-brunchist-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-le-brunchist-awwwards-build/404/planche.png` |

Les planches ont été générées avec `scripts/planche.py` (4 colonnes, 480 px de large, 1920 x 5280 px chacune).

## Chiffres des report.json

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 1 (`color-contrast`, serious, 1 nœud : `.ligne:nth-child(1) > .gomme`, #a87e24 sur #f2b52c, 2,01:1 pour 3:1 requis) | 0 | 1 (`color-contrast`, serious, 2 nœuds) |
| axe contrastNeedsReview | 5 | 2 | 0 |
| CLS bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP bureau (ms) | 56 | 168 | 52 |
| LCP mobile (ms, throttled) | 936 | 952 | 252 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Cibles tactiles petites bureau / mobile | 4 / 4 | 4 / 4 | 1 / 1 |
| Texte caché (reduced.hiddenText) | 0 | 0 | 0 |
| Animation en mouvement (reduced.moving) | false | false | false |
| Tabulations (keyboard.stops) | 12 | 12 | 3 |
| Focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Lien d'évitement en premier | non | non | non |
| Chargement bureau / mobile (ms) | 103 / 1834 | 115 / 1854 | 26 / 425 |
| FPS défilement bureau / mobile | 60 / 60 | 60 / 60 | 60 / 60 |

Cibles tactiles petites (identiques bureau et mobile sur l'accueil et la carte) : « Lire l'histoire du lieu » (163 x 21 bureau, 147 x 20 mobile), « Ouvrir le plan » (109 x 21 / 98 x 20), Facebook (63 x 17), Instagram (65 x 17). Sur la carte : « Appeler le Brunchist » (167 x 21 / 151 x 20) au lieu de « Lire l'histoire ». Sur la 404 : « la page d'accueil » (128 x 20).

Notes du rapport : le FPS bureau tourne en rendu logiciel headless (plancher, pas une mesure matérielle) ; le mobile tourne à 4x de ralentissement CPU en 4G lente.

## Audit (audit.mjs)

Résumé : 4 pages crawlées, page la plus lourde environ 135 Ko (html 4, JS 61 gz, CSS 6 gz, polices 54, images 11). **1 FAIL, 8 WARN.**

FAIL :
- `site` : og:image `https://kyw-test-restaurant.vercel.app/le-brunchist/awwwards/og.png` ne charge pas (créer une image 1200 x 630).

WARN : 8 au total
- `/le-brunchist/awwwards/` : phrase répétée 5 fois « 9 h 30 à 15 h 30 ».
- `/le-brunchist/awwwards/reservation/` : phrases répétées 2 fois pour mercredi, jeudi, vendredi, samedi, dimanche (5 WARN).
- `site` : pas de robots.txt.
- `site` : pas de sitemap.
