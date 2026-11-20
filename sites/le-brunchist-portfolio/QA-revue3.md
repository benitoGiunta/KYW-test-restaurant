# QA revue 3 : le-brunchist (portfolio)

Phase test. Build, captures, planches et audit faits par scripts/q.sh. Aucun fichier source modifié, aucun commit.
Journaux complets : `.logs/le-brunchist-portfolio-revue3-*.log`.

## Build

- `node scripts/build-site.mjs sites/le-brunchist-portfolio` : exit 0, 6 pages construites, sortie dans `dist/le-brunchist/portfolio/`.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/le-brunchist/portfolio/`) | `/home/user/KYW-test-restaurant/.shots-le-brunchist-portfolio-revue3/home/` | `/home/user/KYW-test-restaurant/.shots-le-brunchist-portfolio-revue3/home/planche.png` |
| Carte (`/le-brunchist/portfolio/carte/`) | `/home/user/KYW-test-restaurant/.shots-le-brunchist-portfolio-revue3/le-brunchist-item/` | `/home/user/KYW-test-restaurant/.shots-le-brunchist-portfolio-revue3/le-brunchist-item/planche.png` |
| 404 (`__shoot-missing-page`) | `/home/user/KYW-test-restaurant/.shots-le-brunchist-portfolio-revue3/404/` | `/home/user/KYW-test-restaurant/.shots-le-brunchist-portfolio-revue3/404/planche.png` |

Chaque dossier contient 13 captures bureau (`d-*`), 6 captures mobile (`m-*`) et `report.json`. Les planches font 1920 px de large, 4 colonnes, 19 images.

## Chiffres par page (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 1 (serious : color-contrast, `.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4,36:1 pour 4,5:1 requis) |
| Points axe à revoir (contrast needs review) | 34 | 30 | 0 |
| LCP bureau | 208 ms (h1#titre.hero__nom) | 140 ms (span) | 40 ms (p) |
| LCP mobile | 1288 ms (h1#titre.hero__nom) | 1164 ms (span) | 228 ms (p) |
| CLS bureau | 0 | 0,001 | 0 |
| CLS mobile | 0 | 0,015 | 0 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments cachés (reduced.hiddenText) | 0 | 0 | 0 |
| FPS défilement bureau (pire trame) | 60 (17 ms) | 60 (17 ms) | 60 (17 ms) |
| FPS défilement mobile (pire trame) | 48 (50 ms) | 58 (33 ms) | 60 (17 ms) |
| Chargement bureau / mobile (load, ms) | 167 / 2688 | 95 / 2204 | 26 / 410 |
| Première mise en page stable bureau / mobile (ms) | 4507 / 4836 | 4392 / 6674 | 2215 / 2399 |
| Mouvement avec mouvement réduit | non | non | non |
| Survol (cibles testées) | 7 | 7 | 2 |
| Parcours clavier : arrêts | 12 | 12 | 3 |
| Premier arrêt clavier | « Aller au contenu » | « Aller au contenu » | « la page d'accueil » |
| Focus bloqué | non | non | non |

Notes : sur le 404, les arrêts clavier sont « la page d'accueil », « Réalisé par », puis « focus left the page » (3 arrêts). Le rapport signale que les FPS bureau sont mesurés sur un GPU logiciel headless (plancher, pas une mesure matérielle).

## Audit (audit.mjs)

- Pages explorées : 5 (`http://127.0.0.1:4501/le-brunchist/portfolio/`), journal de 6 lignes.
- Lignes FAIL : 0 (`0 FAIL, 2 WARN`).
- WARN (2) :
  - `WARN site no robots.txt`
  - `WARN site no sitemap` (le build a pourtant écrit `sitemap-index.xml` dans `sites/le-brunchist-portfolio/dist`)
- Page la plus lourde : `/le-brunchist/portfolio/`, environ 573 Ko (HTML 6, JS 63 gz, CSS 7 gz, polices 110, images 387).

## Serveur

- Serveur statique `dist` sur le port 4501 : démarré pour les captures, arrêté après l'audit (processus tué, port libre).
