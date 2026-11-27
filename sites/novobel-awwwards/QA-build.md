# QA build : novobel / awwwards

Passe : build · Phase : test · Serveur local : `dist/` servi sur http://127.0.0.1:4502/novobel/awwwards/ (arrêté après les captures).

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/novobel/awwwards/`) | `/home/user/KYW-test-restaurant/.shots-novobel-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-novobel-awwwards-build/home/planche.png` |
| Projets (`/novobel/awwwards/projets/`) | `/home/user/KYW-test-restaurant/.shots-novobel-awwwards-build/novobel-item/` | `/home/user/KYW-test-restaurant/.shots-novobel-awwwards-build/novobel-item/planche.png` |
| Page 404 (URL inexistante, test) | `/home/user/KYW-test-restaurant/.shots-novobel-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-novobel-awwwards-build/404/planche.png` |

Note : `planche.py` a ignoré les options `--colonnes 4 --largeur 480` (lues comme des fichiers, « ignoré 4 », « ignoré 480 »). Les planches ont été produites en 1920 × 5280 px, 19 images chacune.

## Chiffres des rapports (report.json)

| Mesure | Accueil | Projets | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Débordement horizontal (bureau / mobile) | non / non | non / non | non / non |
| LCP bureau (ms) | 132 | 48 | 48 |
| LCP mobile (ms) | 1148 | 1980 | 256 |
| CLS bureau | 0 | 0.002 | 0 |
| CLS mobile | 0 | 0.003 | — |
| Violations axe (sévérité serious) | 0 | 0 | 1 (color-contrast, 2 nœuds) |
| Points « contrastNeedsReview » axe | 32 | 15 | 0 |
| Éléments cibles tactiles petites (bureau) | 8 | 7 | 1 |
| Éléments de texte masqués (mode réduit) | 0 | 0 | 0 |
| Hauteur mobile (px) | 6054 | 5024 | 844 |
| Arrêts clavier (Tab) | 12 | 12 | 3 |

Cibles petites signalées à l'accueil : « Tous les projets » (125×20), « Faire connaissance » (153×20), « Ouvrir le plan » (88×16), « info@novobel.com » (120×16), « Facebook » (64×16), « Projets » (47×16), « À propos » (59×16), « Contact » (52×16).

## Audit (audit.mjs)

- FAIL : 0
- WARN : 3
  - `/novobel/awwwards/projets/` : phrase répétée 4 fois, « Image d’illustration, non liée à ce projet »
  - site : pas de `robots.txt`
  - site : pas de `sitemap` (le build produit pourtant `sitemap-index.xml` dans `sites/novobel-awwwards/dist`)
- Pages explorées par l'audit : 4 ; page la plus lourde : `/novobel/awwwards/a-propos/` (~442 Ko ; HTML 4, JS 60 Ko gz, CSS 6 Ko gz, polices 48, images 324).

## Journal des commandes

- Build : `dist/novobel/awwwards/`, 5 pages construites, sans erreur.
- Captures : `.logs/novobel-awwwards-build-shoot.log`. Le premier essai a échoué (ERR_CONNECTION_REFUSED) car le serveur n'avait pas démarré ; relancé après redémarrage du serveur.
- Audit : `.logs/novobel-awwwards-build-audit.log`.
