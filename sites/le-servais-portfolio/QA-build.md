# QA build : le-servais-portfolio

Passe : build · Rôle : captures · Build : `sites/le-servais-portfolio` → `dist/le-servais/portfolio/` (exit 0, 7 pages)
Serveur local : `http://127.0.0.1:4501/le-servais/portfolio/` (arrêté après les captures)
Journaux : `.logs/le-servais-portfolio-build-*.log`

## Captures et planches

| Page | URL | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | `/le-servais/portfolio/` | `/home/user/KYW-test-restaurant/.shots-le-servais-portfolio-build/home/` | `/home/user/KYW-test-restaurant/.shots-le-servais-portfolio-build/home/planche.png` |
| Carte (item crawlé) | `/le-servais/portfolio/carte/` | `/home/user/KYW-test-restaurant/.shots-le-servais-portfolio-build/le-servais-item/` | `/home/user/KYW-test-restaurant/.shots-le-servais-portfolio-build/le-servais-item/planche.png` |
| 404 | `/__shoot-missing-page-*` | `/home/user/KYW-test-restaurant/.shots-le-servais-portfolio-build/404/` | `/home/user/KYW-test-restaurant/.shots-le-servais-portfolio-build/404/planche.png` |

Index des captures : `/home/user/KYW-test-restaurant/.shots-le-servais-portfolio-build/summary.json`.

## Chiffres par page (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console (`errors`) | 0 | 0 | 0 |
| Requêtes en échec (`failed`) | 0 | 0 | 0 |
| Axe : violations | color-contrast (serious, 2 nœuds) | color-contrast (serious, 2 nœuds) | document-title (serious, html) |
| Axe : `serious` / `contrastNeedsReview` | 1 / 38 | 1 / 28 | 2 / 0 |
| LCP desktop (ms, élément) | 144 (img) | 144 (p.lead) | 40 (pre) |
| LCP mobile throttlé (ms, élément) | 1352 (h1#titre.hero__nom) | 1236 (p.lead) | 236 (pre) |
| CLS desktop / mobile | 0.001 / 0.006 | 0.002 / 0.01 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments cachés (`reduced.hiddenText`) | 0 | 0 | 0 |
| Clavier : arrêts de tabulation | 12 | 12 | 1 (« body: focus left the page ») |
| Clavier : focus sans indicateur visible / focus invisible / bloqué | 0 / 0 / non | 0 / 0 / non | 0 / 0 / non |
| Clavier : `skipLinkFirst` | false | false | false |
| FPS défilement desktop / mobile | 59 / 40 | 60 / 44 | 61 / 61 |
| Titre de page | « Le Servais | Bar-brasserie à Namur » | « La carte | Le Servais » | vide |
| Survol (cibles testées) | 7 | 7 | — |

Détail color-contrast (accueil et carte) : `.kyw-footer__note`, #55646a sur #081c1f, 2.85:1.
Détail document-title (404) : balise `<title>` absente ou vide.

## Audit (`audit.mjs`)

- Résultat : **0 FAIL, 3 WARN**
- WARN site : 404 sans `<h1>`
- WARN site : pas de `robots.txt`
- WARN site : pas de `sitemap`
- Poids de la page la plus lourde (`/le-servais/portfolio/`) : ~1223 KB ; HTML 7, JS 9 (gz), CSS 7 (gz), polices 110, images 1090.
