# QA build : el-greco-legacy (passe build, phase test)

Faits seulement. Build : `dist/el-greco/legacy/`. Serveur de test : `http://127.0.0.1:4503/el-greco/legacy/` (arrêté après la passe).

## Build

- `scripts/build-site.mjs sites/el-greco-legacy` : exit 0, 6 pages construites en 2,35 s, sitemap créé.
- Journal : `/home/user/KYW-test-restaurant/.logs/el-greco-legacy-build-build.log`

## Captures et planches

Captures : `shoot.mjs --crawl --nav` a produit 3 dossiers (2 pages + la 404). L'audit a crawlé 5 pages (voir plus bas) : les pages `about-us`, `carte-des-boissons` et `contact` n'ont pas de dossier de captures.

| Page | Dossier de captures | Planche | Fichiers |
|---|---|---|---|
| Accueil `/el-greco/legacy/` | `/home/user/KYW-test-restaurant/.shots-el-greco-legacy-build/home/` | `/home/user/KYW-test-restaurant/.shots-el-greco-legacy-build/home/planche.png` | 40 (d-, h-, k-, m-, r-, report.json) |
| `/el-greco/legacy/our-menu/` | `/home/user/KYW-test-restaurant/.shots-el-greco-legacy-build/el-greco-item/` | `/home/user/KYW-test-restaurant/.shots-el-greco-legacy-build/el-greco-item/planche.png` | 40 |
| 404 (`/__shoot-missing-page-…`) | `/home/user/KYW-test-restaurant/.shots-el-greco-legacy-build/404/` | `/home/user/KYW-test-restaurant/.shots-el-greco-legacy-build/404/planche.png` | 28 (pas de capture de hover ni de clavier) |

Chaque planche : 1920 x 5280 px, 19 images (colonnes 4, largeur 480).

## Mesures report.json

| Indicateur | Accueil | our-menu | 404 |
|---|---|---|---|
| Erreurs console | 1 : « Failed to load resource: 404 » (desktop) | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations | 0 | 0 | 1 (color-contrast, serious, 2 nœuds : `.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4,36:1 au lieu de 4,5:1) |
| Axe : contrastNeedsReview | 0 | 0 | 0 |
| CLS desktop / mobile | 0,008 / 0,007 | 0,016 / 0,002 | 0 / 0 |
| LCP desktop / mobile (ms) | 464 / 844 | 520 / 740 | 40 / 236 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors écran (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Éléments GL cachés desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 6 / 0 | 3 / 1 | 1 / 1 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus bloqué | non | non | non |
| Clavier : arrêts de tabulation | 12 | 12 | 3 |
| settledMs desktop / mobile (ms) | 3160 / 3707 | 3040 / 3620 | 2191 / 2417 |

Notes : aucune requête en échec ; FPS de défilement desktop 59 sur l'accueil (rendu logiciel, valeur plancher). Non mesuré dans cette passe : le détail de l'erreur 404 console de l'accueil (URL non reportée).

## Audit (audit.mjs)

- Commande : `audit.mjs http://127.0.0.1:4503/el-greco/legacy/`
- Résultat : 5 pages crawlées, **0 FAIL, 90 WARN**.
- Page la plus lourde : `/el-greco/legacy/about-us/`, ~700 Ko (HTML 2, JS 1 gz, CSS 5 gz, polices 521, images 170).
- Journal : `/home/user/KYW-test-restaurant/.logs/el-greco-legacy-build-audit.log`

## Fichiers de journal

- `/home/user/KYW-test-restaurant/.logs/el-greco-legacy-build-shoot.log`
- `/home/user/KYW-test-restaurant/.logs/serve-legacy.log`
