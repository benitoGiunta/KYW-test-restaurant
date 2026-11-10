# QA build — li-micougni / awwwards

Passe : build. Serveur local `dist/` sur port 4502 (arrêté en fin de passe). Aucun fichier source modifié, aucun commit.

## Build

- `scripts/q.sh li-micougni-awwwards-build-build node scripts/build-site.mjs sites/li-micougni-awwwards` : exit 0, 5 pages, sortie `dist/li-micougni/awwwards/`.
- Journal : `.logs/li-micougni-awwwards-build-build.log`.

## Pages

Dossiers de captures : `/home/user/KYW-test-restaurant/.shots-li-micougni-awwwards-build/<page>/`
Planches (contact sheets) : `/home/user/KYW-test-restaurant/.shots-li-micougni-awwwards-build/<page>/planche.png`

Le crawl a retenu 3 pages sur 4 crawlées (`--crawl --nav`). Le dossier `li-micougni-item` correspond en réalité à `/li-micougni/awwwards/carte/`.

| Page | URL testée | Dossier captures | Planche |
|---|---|---|---|
| home | /li-micougni/awwwards/ | `.shots-li-micougni-awwwards-build/home/` (19 PNG) | `.shots-li-micougni-awwwards-build/home/planche.png` (1920x5280) |
| li-micougni-item | /li-micougni/awwwards/carte/ | `.shots-li-micougni-awwwards-build/li-micougni-item/` (19 PNG) | `.shots-li-micougni-awwwards-build/li-micougni-item/planche.png` (1920x5280) |
| 404 | /__shoot-missing-page-… (page absente) | `.shots-li-micougni-awwwards-build/404/` (14 PNG) | `.shots-li-micougni-awwwards-build/404/planche.png` (1920x4224) |

Note outil : `scripts/planche.py` lit `--colonnes` et `--largeur` comme des fichiers (`ignoré 4`, `ignoré 480`). Les planches ont été produites avec la mise en page par défaut (largeur 1920). Corriger le parseur des options.

## Chiffres par page (report.json)

| Mesure | home | carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe, violations | 1 (serious) : `label-content-name-mismatch` sur `.entete__marque` | 1 (serious) : même règle, même nœud | 2 (serious) : `document-title` et `html-has-lang` sur `html` |
| Axe, contrastNeedsReview | 40 | 52 | 0 |
| LCP desktop (ms) | 104 (img) | 112 (p.page-tete__note) | 56 (pre) |
| LCP mobile (ms) | 2416 (img) | 2212 (img) | 276 (pre) |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal d / m | non / non | non / non | non / non |
| Cibles tactiles petites d / m | 0 / 0 | 0 / 0 | 0 / 0 |
| Éléments hors écran (offenders) d / m | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS scroll d / m | 60 / 60 | 60 / 60 | 60 / 61 |
| Load desktop / mobile (ms) | 145 / 2637 | 152 / 2182 | 33 / 261 |
| Clavier : arrêts de tabulation | 12 | 12 | 1 (focus quitte la page) |
| Clavier : noVisibleFocus / invisibleFocus | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : bloqué (stuck) | non | non | non |
| Clavier : skipLinkFirst (valeur brute) | false | false | false |
| Hover : noHoverChange (summary) | 0 | n.d. | n.d. |
| WebGL (glOn / glHidden) | false / [] | false / [] | false / [] |

Notes du rapport : la mesure desktop FPS est faite sur GPU logiciel headless ; la mesure mobile est faite avec ralentissement CPU x4 et 4G lente.

## Audit (`audit.mjs`)

Commande : `scripts/q.sh li-micougni-awwwards-build-audit node .claude/skills/awwwards/scripts/audit.mjs http://127.0.0.1:4502/li-micougni/awwwards/`
Exit 1. Journal : `.logs/li-micougni-awwwards-build-audit.log`.

Lignes FAIL (4) :
- `/li-micougni/awwwards/carte/` : `<h2>` dupliqué ("Suppléments Suppléments").
- `/li-micougni/awwwards/carte/` : `<h2>` dupliqué ("Desserts Desserts").
- `/li-micougni/awwwards/histoire/` : `<h1>` dupliqué ("Histoire Histoire").
- `/li-micougni/awwwards/reservation/` : `<h1>` dupliqué ("Réserver Réserver").

Nombre de WARN : 4.
- Titre de `/li-micougni/awwwards/` de 73 caractères (seuil 70).
- Page 404 sans `<h1>`.
- Pas de `robots.txt`.
- Pas de `sitemap`.

Résumé audit : 4 pages crawlées, page la plus lourde `/li-micougni/awwwards/` (~1089 KB ; HTML 5, JS 60 gz, CSS 6 gz, polices 72, images 946).

Remarque : les pages `/carte/`, `/histoire/` et `/reservation/` figurent dans les FAIL de l'audit mais n'ont pas été capturées par `shoot.mjs` ; seuls `home`, `carte` et la 404 ont des dossiers de captures.
