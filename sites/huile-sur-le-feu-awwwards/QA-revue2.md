# QA revue 2 : huile-sur-le-feu, variante awwwards

Passe : revue2 · Rôle : captures · Build : `dist/huile-sur-le-feu/awwwards/` servi sur `http://127.0.0.1:4502/huile-sur-le-feu/awwwards/` (serveur arrêté après la passe).

Faits seulement, extraits des `report.json` et de l'audit. Aucune analyse de design.

## Pages et captures

| Page | URL testée | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | `/huile-sur-le-feu/awwwards/` | `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-awwwards-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-awwwards-revue2/home/planche.png` (19 images) |
| Carte (item) | `/huile-sur-le-feu/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-awwwards-revue2/huile-sur-le-feu-item/` | `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-awwwards-revue2/huile-sur-le-feu-item/planche.png` (19 images) |
| 404 | `/__shoot-missing-page-…` | `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-awwwards-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-awwwards-revue2/404/planche.png` (14 images) |

Rapports complets : `.shots-huile-sur-le-feu-awwwards-revue2/<page>/report.json`. Résumé de capture : `.shots-huile-sur-le-feu-awwwards-revue2/summary.json`.

## Chiffres par page

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 2 (`document-title`, `html-has-lang`, sérieux) |
| LCP desktop | 204 ms | 192 ms | 48 ms |
| CLS desktop | 0,001 | 0 | 0 |
| LCP mobile (throttled) | 2 376 ms (élément `img`) | 1 176 ms | 240 ms |
| CLS mobile | 0 | 0,009 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Éléments cachés WebGL (desktop) | 0 | 0 | 0 |
| FPS défilement desktop / mobile | 60 / 60 | 60 / 46 | 60 / 60 |
| Texte caché en mouvement réduit | 0 | 0 | 0 |
| Clavier : focus invisible / sans focus visible / bloqué | 0 / 0 / non | 0 / 0 / non | 0 / 0 / non |
| Lien d'évitement en premier | non | non | non |

Notes :
- Accueil : hover testé (captures h-01 à h-07 ; cibles « moves » ou changement de couleur).
- Carte : hover testé ; la cible « Les menus » ne change rien en pixels (`react: pixels`, aucune propriété modifiée).
- 404 : le lien de navigation n'a pas pu être cliqué (aucun lien trouvé). Le clavier sort de la page au premier Tab (« body: focus left the page »).
- Les FPS desktop viennent d'un GPU logiciel headless : plancher, pas une mesure matérielle.

## Audit (`audit.mjs`)

- Ligne de synthèse : `0 FAIL, 3 WARN`.
- FAIL : aucun.
- WARN : 3 (détail dans le journal `/home/user/KYW-test-restaurant/.logs/huile-sur-le-feu-awwwards-revue2-audit.log`).
- Poids de la page la plus lourde : `/huile-sur-le-feu/awwwards/`, environ 1 027 Ko (HTML 5, JS 61 Ko gz, CSS 6 Ko gz, polices 132, images 823).
- Pages crawlées : 4.

## Journal de la passe

- Build : exit 0, 5 pages construites en 2,10 s, sitemap créé.
- Capture (`shoot.mjs --crawl --nav`) : exit 0, 3 pages capturées, 94 PNG.
- Planches : 3 générées. `planche.py` affiche « ignoré 4 » et « ignoré 480 » : ses options `--colonnes` / `--largeur` sont lues comme des fichiers d'entrée. Les planches sont quand même produites à 4 colonnes et 480 px de large (largeur 1920 px).
