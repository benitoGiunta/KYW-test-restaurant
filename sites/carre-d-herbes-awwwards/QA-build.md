# QA build : carre-d-herbes / awwwards

Passe build, phase test. Faits uniquement, extraits des `report.json` et de l'audit. Build : exit 0, `dist/carre-d-herbes/awwwards/`. Serveur (port 4502) arrêté après les captures.

## Pages et captures

| Page | URL testée | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | `/carre-d-herbes/awwwards/` | `/home/user/KYW-test-restaurant/.shots-carre-d-herbes-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-carre-d-herbes-awwwards-build/home/planche.png` |
| La carte | `/carre-d-herbes/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-carre-d-herbes-awwwards-build/carre-d-herbes-item/` | `/home/user/KYW-test-restaurant/.shots-carre-d-herbes-awwwards-build/carre-d-herbes-item/planche.png` |
| 404 (page manquante) | `/__shoot-missing-page-…` | `/home/user/KYW-test-restaurant/.shots-carre-d-herbes-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-carre-d-herbes-awwwards-build/404/planche.png` |

Les 3 planches font 1920 x 5280 px, 19 images chacune. `scripts/planche.py` a ignoré les options `--colonnes 4 --largeur 480` (il les lit comme fichiers) : la largeur et le nombre de colonnes sont ceux par défaut du script.

Rapports : `report.json` dans chaque dossier ci-dessus. Résumé de capture : `.shots-carre-d-herbes-awwwards-build/summary.json`.

## Chiffres par page

| Mesure | Accueil | La carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (serious) | 0 | 0 | 1 règle `color-contrast` (serious, 2 nœuds : `.kyw-footer__note`, #6b787d sur #fbfaf8, 4,36:1) |
| Axe : contrast needs review | 8 | 7 | non relevé |
| CLS desktop | 0 | 0,015 | 0 |
| CLS mobile | 0,008 | 0,055 | 0 |
| LCP desktop (ms) | 80 | 60 | 64 |
| LCP mobile (ms) | 1500 (`img.rond`) | 1052 (`p.carte-tete__texte`) | 248 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors écran (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites (mobile) | 8 | 6 | 1 |
| Cibles tactiles petites (desktop, liste) | 7 | 5 | 1 |
| FPS défilement mobile | 60 | 60 | 60 |
| Arrêts de tabulation clavier | 12 | 12 | 3 |
| Mouvement en mouvement sans animation réduite (`reduced.moving`) | false | false | false |
| Texte masqué (reduced) | 0 | 0 | 0 |

Détail des cibles tactiles petites (accueil, desktop) : « L'histoire de la maison » 180x19, « La carte et les menus » 168x19, « La carte » 53x16, « Histoire » 52x16, « Réserver » 61x16, « Plan » 30x16, « Facebook » 66x16.

Note du rapport : le FPS desktop tourne en headless sur GPU logiciel ; seul le FPS mobile compte.

## Audit (`audit.mjs`, racine du site)

- 4 pages explorées (`/carre-d-herbes/awwwards/` et pages liées).
- Poids de la page la plus lourde : `/carre-d-herbes/awwwards/`, environ 1826 Ko ; HTML 5, JS 60 (gz), CSS 6 (gz), polices 134, images 1621.
- **FAIL : 0**
- **WARN : 2**
  - `site` : no robots.txt
  - `site` : no sitemap

Remarque : Astro a écrit `sitemap-index.xml` dans `sites/carre-d-herbes-awwwards/dist` (build), mais l'audit ne le trouve pas à la racine publiée `dist/carre-d-herbes/awwwards/`.

## Lignes FAIL

Aucune ligne FAIL dans l'audit. Violation axe « serious » relevée uniquement sur la page 404 (voir tableau).
