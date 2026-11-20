# QA revue1 : le-brunchist-legacy (captures, faits)

Serveur local `dist/` sur port 4503, arrêté après usage. Build : `sites/le-brunchist-legacy` OK (2 pages).
Journaux : `.logs/le-brunchist-legacy-revue1-{build,shoot,audit,planche-home,planche-404}.log`.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| `/le-brunchist/legacy/` (home) | `/home/user/KYW-test-restaurant/.shots-le-brunchist-legacy-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-le-brunchist-legacy-revue1/home/planche.png` (14 images) |
| `/__shoot-missing-page-…` (404) | `/home/user/KYW-test-restaurant/.shots-le-brunchist-legacy-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-le-brunchist-legacy-revue1/404/planche.png` (19 images) |

Note : `planche.py` a reçu `--colonnes 4 --largeur 480` comme fichiers (options ignorées, « ignoré 4 », « ignoré 480 ») ; les planches ont été produites avec les largeurs par défaut.

## Chiffres (report.json)

| Mesure | home | 404 |
|---|---|---|
| Erreurs console | 0 | 0 |
| Requêtes en échec | 0 | 0 |
| axe violations | 0 (contrastNeedsReview 11) | 1 serious : `color-contrast` (`.kyw-footer__note` et `span`, #6b787d sur #fbfaf8, 4,36:1, requis 4,5:1), 2 nœuds |
| CLS desktop / mobile | 0,004 / 0,002 | 0 / 0 |
| LCP desktop / mobile (ms) | 372 (img) / 1340 (img) | 40 / 212 |
| Chargement load desktop / mobile (ms) | 648 / 2166 | 26 / 398 |
| FPS scroll desktop / mobile | 60 (pire frame 33 ms) / 61 (pire frame 17 ms) | 60 / 60 |
| Débordement horizontal desktop / mobile | non / non | non / non |
| Éléments hors zone (offenders) desktop / mobile | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 8 / 7 | 1 / 1 |
| Clavier : focus invisible / sans focus visible / bloqué | 0 / 0 / non | 0 / 0 / non |
| Lien d'évitement en premier | non | non |

Cibles tactiles petites (home desktop) : « Carte » 40x21, « Le lieu » 46x21, « Horaires » 61x21, numéro de téléphone 102x21, Facebook 70x21, Instagram 71x21, « Irvan Ary Maulana » 114x18, « Andy Li » 46x18. Home mobile : 7 cibles petites au total (liste non détaillée ici).

Éléments cachés (glHidden) : 0 sur home (glOn false, idleMotion false). Page 404 : nav clavier de 3 arrêts, focus quitte la page (« body: focus left the page »).

Note : la page 404 n'a pas d'arrêt `skipLink` ; `skipLinkFirst` vaut false sur les deux pages.

## Audit (audit.mjs)

Résultat : **0 FAIL, 8 WARN**. Pages crawlées : 1 (aucun lien interne cliquable sur home, `--nav`).

WARN :
1. `/le-brunchist/legacy/` : phrase répétée 5 fois : « 9 h 30 à 15 h 30 »
2. `site` : pas de robots.txt
3. `site` : pas de sitemap
4. à 5 reprises, `/le-brunchist/legacy/` : police ttf/otf embarquée (à convertir en woff2)

Poids : page la plus lourde ~818 Ko (html 5, JS 1 gz, CSS 5 gz, polices 298, images 508).
