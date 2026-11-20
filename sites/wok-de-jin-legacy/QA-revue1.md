# QA revue 1 : wok-de-jin, variante legacy

Faits seulement, mesurés sur le build local (`dist/wok-de-jin/legacy/`, servi sur `http://127.0.0.1:4503/wok-de-jin/legacy/`). Pas d'analyse de design.

## Pages capturées

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/wok-de-jin/legacy/` | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-legacy-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-legacy-revue1/home/planche.png` |
| Réveillon `/wok-de-jin/legacy/reveillon/` | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-legacy-revue1/wok-de-jin-item/` | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-legacy-revue1/wok-de-jin-item/planche.png` |
| Page 404 (URL inexistante, crawl) | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-legacy-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-legacy-revue1/404/planche.png` |

Rapports : `<dossier>/report.json`. Journaux du build, des captures et de l'audit : `/home/user/KYW-test-restaurant/.logs/wok-de-jin-legacy-revue1-*.log`.

## Chiffres par page

| Mesure | Accueil | Réveillon | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 2 nœuds `color-contrast` (serious) : `.kyw-footer__note` et `span`, #6b787d sur #fbfaf8, 4,36:1 (seuil 4,5:1) |
| axe contrastNeedsReview | 7 | 3 | 0 |
| LCP desktop | 408 ms (img) | 356 ms | 48 ms |
| CLS desktop | 0,046 | 0,002 | 0 |
| LCP mobile | 848 ms (h1#h-hero) | 752 ms | 224 ms |
| CLS mobile | 0,03 | 0 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Offenders (desktop / mobile) | 0 / 0 | 0 / 0 | 0 / 0 |
| Petites cibles desktop / mobile | 0 / 0 | 1 / 0 | 1 / 1 |
| Petites cibles (détail) | aucune | `081 30 68 88 95x20` (mobile) | `la page d'accueil` 128x20 |
| FPS défilement desktop | 61 | 61 | 60 |
| Clavier : arrêts de tabulation | 12 | 12 | 3 |
| Éléments cachés (`glHidden`) | 0 | 0 | 0 |

Le 404 est capturé à l'URL `/__shoot-missing-page-*`. Ses mesures ne concernent que la page d'erreur.

## Audit (`audit.mjs`)

Résultat : **0 FAIL, 11 WARN**.

WARN :
- Phrase répétée 6 fois sur `/wok-de-jin/legacy/` : « 12 h 00 à 14 h 00 et 18 h 00 à 22 h 30 ».
- Site : pas de `robots.txt`.
- Site : pas de `sitemap`. Le build a pourtant généré `sitemap-index.xml` (ligne du journal de build).
- Polices `ttf/otf` livrées (on n'utilise pas woff2) : 4 sur `/wok-de-jin/legacy/`, 4 sur `/wok-de-jin/legacy/reveillon/`.

Poids de la page la plus lourde : `/wok-de-jin/legacy/`, environ 1367 Ko (HTML 5, JS 1, CSS 6 fichiers gzip, polices 234 Ko, images 1122 Ko).

## Points signalés

- Seule violation axe : contraste du pied de page sur la page 404 (4,36:1 pour 4,5:1 requis). Le pied de page est le composant `kyw-footer`.
- Le contraste est listé en « needs review » sur l'accueil (7) et sur le réveillon (3).
- Aucune erreur console ni requête en échec sur les trois pages.
