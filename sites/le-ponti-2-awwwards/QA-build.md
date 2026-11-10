# QA build : le-ponti-2 / awwwards

Build : `scripts/build-site.mjs sites/le-ponti-2-awwwards` OK (5 pages), sortie `dist/le-ponti-2/awwwards/`.
Serveur local : `dist` sur `http://127.0.0.1:4502/le-ponti-2/awwwards/` (arrêté après les captures).
Captures : `/home/user/KYW-test-restaurant/.shots-le-ponti-2-awwwards-build/`

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/le-ponti-2/awwwards/`) | `/home/user/KYW-test-restaurant/.shots-le-ponti-2-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-le-ponti-2-awwwards-build/home/planche.png` |
| Carte (`/le-ponti-2/awwwards/carte/`) | `/home/user/KYW-test-restaurant/.shots-le-ponti-2-awwwards-build/le-ponti-2-item/` | `/home/user/KYW-test-restaurant/.shots-le-ponti-2-awwwards-build/le-ponti-2-item/planche.png` |
| 404 (`/__shoot-missing-page-*`) | `/home/user/KYW-test-restaurant/.shots-le-ponti-2-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-le-ponti-2-awwwards-build/404/planche.png` |

Rapports : `<dossier>/report.json` dans chaque dossier.

## Chiffres (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (a11y) | 1 : `label-content-name-mismatch` (serious, 3 nœuds) | 0 | 2 : `document-title` (serious), `html-has-lang` (serious) |
| Contraste à vérifier (contrastNeedsReview) | 13 | 7 | 0 |
| CLS desktop | 0.001 | 0 | 0 |
| CLS mobile | 0.001 | 0 | 0 |
| LCP desktop | 120 ms (img) | 144 ms (h1) | 28 ms (pre) |
| LCP mobile (4x CPU, slow 4G) | 2328 ms (img) | 2188 ms (p) | 216 ms (pre) |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments cachés hors écran (offenders) desktop | 0 | 0 | 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS scroll mobile (pire trame) | 60 (17 ms) | 60 (17 ms) | 61 (17 ms) |
| Chargement load desktop | 199 ms | 130 ms | 26 ms |
| WebGL | absent (desktop et mobile) | absent | n/a |
| H1 | « Le Ponti 2 » | « La carte » | aucun |
| Clavier : arrêts de focus | 12 | 12 | 1 (sortie de page) |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : blocage | non | non | non |
| Lien d'évitement en premier | non | non | non |
| Réduction de mouvement (reduced) | hiddenText, moving | hiddenText, moving | n/a |

Remarques : le FPS desktop est mesuré sur GPU logiciel (plancher, non représentatif). Le lien d'évitement n'est pas le premier arrêt clavier sur l'accueil et la carte (`skipLinkFirst: false`) alors qu'un lien « Aller au contenu » existe en premier arrêt dans les listes de focus.

Captures d'interaction (accueil) : survol sur 7 cibles (`h-01` à `h-07`, repos et survol), focus clavier `k-01` à `k-04`, transition `d-90-transition-a/b/c`, `d-91-after-nav`, `d-92-back`, réduction de mouvement `r-01`, `r-02`.

## Audit (audit.mjs)

Résultat : **0 FAIL, 5 WARN**.

- WARN `/le-ponti-2/awwwards/` : phrase répétée 2x « Du mardi au dimanche, midi et soir. »
- WARN `/le-ponti-2/awwwards/` : phrase répétée 2x « Le lundi, le pont est levé. »
- WARN `site` : page 404 sans `<h1>`
- WARN `site` : pas de `robots.txt`
- WARN `site` : pas de `sitemap`

Poids : page la plus lourde `/le-ponti-2/awwwards/` ~664 Ko (HTML 5, JS 61 gz, CSS 6 gz, polices 126, images 467).
