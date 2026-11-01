# QA build — partage / legacy (passe build)

Source : `sites/partage-legacy/`, build `dist/partage/legacy/`, serveur local `127.0.0.1:4503` (arrêté après usage).
Journaux : `.logs/partage-legacy-build-build.log`, `.logs/partage-legacy-build-shoot.log`, `.logs/partage-legacy-build-audit.log`.

## Build

- `scripts/build-site.mjs sites/partage-legacy` : exit 0, 4 pages générées (`/`, `/carte/`, `/bon-cadeau/`, `/politique-de-confidentialite/`), sitemap-index.xml créé.

## Captures et planches

| Dossier | Page | Planche | Captures |
|---|---|---|---|
| `.shots-partage-legacy-build/home/` | `/partage/legacy/` | `.shots-partage-legacy-build/home/planche.png` | 13 d-* (bureau), 2 r-* (réduit), 14 h-* (survol), 4 k-* (focus clavier), 6 m-* (mobile) |
| `.shots-partage-legacy-build/partage-item/` | `/partage/legacy/carte/` | `.shots-partage-legacy-build/partage-item/planche.png` | 13 d-*, 2 r-*, 14 h-*, 4 k-*, 6 m-* |
| `.shots-partage-legacy-build/404/` | page 404 (URL inexistante) | `.shots-partage-legacy-build/404/planche.png` | 8 d-*, 2 r-*, 6 m-* |

Le shoot a couvert 3 dossiers (home, carte, 404). Les pages `/bon-cadeau/` et `/politique-de-confidentialite/` ne sont pas dans les captures (l'audit les a crawlées). Chaque dossier contient un `report.json`. Un `summary.json` est à la racine du dossier de captures.

Remarque : `scripts/planche.py` lit `--colonnes` et `--largeur` par appariement positionnel. Les planches font 1920 px de large (4 × 480). Les arguments `4` et `480` sont signalés « ignorés » dans le journal, sans effet.

## Chiffres (summary.json et report.json)

| Page | Erreurs console | Requêtes en échec | Axe (sérieux) | LCP desktop | LCP mobile | CLS desktop | CLS mobile | Débordement X (desk / mob) | Cibles tactiles < 24 px (desk / mob) | Focus invisible | Focus sans indicateur visible | Survol sans changement (sur les cibles testées) | Éléments à couleur seule |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| home | 0 | 0 | 1 : `label-content-name-mismatch` (`.nav__logo`) | 480 ms (img) | 1328 ms | 0.001 | 0 | non / non | 6 / 6 | 0 | 0 | 2 | 5 |
| partage-item (`/carte/`) | 0 | 0 | 1 : `label-content-name-mismatch` (`.nav__logo`) | 472 ms (img) | 900 ms | 0.001 | 0 | non / non | 6 / 6 | 0 | 0 | 3 | 4 |
| 404 | 0 | 0 | 2 : `document-title`, `html-has-lang` | 52 ms (pre) | 224 ms | 0 | 0 | non / non | 0 / 0 | 0 | 0 | 0 | 0 |

Autres valeurs (home / carte / 404) :
- FPS défilement desktop : 60 / 60 / 61 ; FPS mobile : 61 / 61 / 60.
- Temps de stabilisation du hero : 3730 ms / 3381 ms / 2192 ms.
- Mouvement en `prefers-reduced-motion` : aucun texte caché, aucun mouvement (home et carte).
- Mouvement d'inactivité : aucun.
- Contrastes à vérifier (axe `needs-review`) : home 15, carte 3, 404 0.
- Clavier : aucun focus bloqué. Le premier arrêt est « Aller au contenu » sur home et carte, donc `skipLinkFirst` vaut false (le lien d'évitement est bien présent et premier). Sur la 404, le focus sort de la page (« body: focus left the page »).

Mention du champ `skipLinkFirst` : valeur false sur les trois pages dans summary.json. Le premier arrêt du parcours clavier est pourtant « Aller au contenu ». Le champ est à interpréter avec prudence.

## Audit (`audit.mjs`)

- 4 pages crawlées depuis `http://127.0.0.1:4503/partage/legacy/`. Page la plus lourde : `/partage/legacy/`, environ 780 KB. HTML 5, JS 1 (gz), CSS 6 (gz), polices 103, images 664.
- **FAIL : 0**
- **WARN : 15**
  - `missing og:image` sur les 4 pages (`/`, `/carte/`, `/bon-cadeau/`, `/politique-de-confidentialite/`) : 4 lignes.
  - `missing twitter:card` sur les 4 pages : 4 lignes.
  - `ttf/otf font shipped` (`ieVq2YZDLWuGJpnzaiwFXS9tYvBRzyFLlZg_f_Ncs2Za4Q.ttf`, à passer en woff2) sur les 4 pages : 4 lignes.
  - Site : `404 page has no <h1>` ; `no robots.txt` ; `no sitemap` : 3 lignes.

## Fichiers non modifiés

Aucun fichier source modifié, aucun commit. Les modifications présentes dans `git status` (`pnpm-lock.yaml`, `sites/partage-awwwards/...`, `dist/partage/awwwards/`, `sites/partage-portfolio/QA-build.md`) appartiennent à d'autres passes et ne sont pas touchées ici.
