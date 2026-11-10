# QA revue 1 : le-ponti-2 / portfolio (captures)

Build : `sites/le-ponti-2-portfolio` → `dist/le-ponti-2/portfolio/` (code de sortie 0, 6 pages).
Serveur local : `dist` sur `http://127.0.0.1:4501/le-ponti-2/portfolio/`, arrêté après les captures.
Journaux : `.logs/le-ponti-2-portfolio-revue1-{build,shoot,audit}.log`.

## Couverture des captures

Le crawl `shoot.mjs --crawl --nav` a produit 3 dossiers (sur 5 pages crawlées par l'audit) :

| Page | Dossier de captures | Planche |
|---|---|---|
| `/le-ponti-2/portfolio/` (accueil) | `/home/user/KYW-test-restaurant/.shots-le-ponti-2-portfolio-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-le-ponti-2-portfolio-revue1/home/planche.png` (19 images) |
| `/le-ponti-2/portfolio/carte/` | `/home/user/KYW-test-restaurant/.shots-le-ponti-2-portfolio-revue1/le-ponti-2-item/` | `/home/user/KYW-test-restaurant/.shots-le-ponti-2-portfolio-revue1/le-ponti-2-item/planche.png` (19 images) |
| URL inexistante (`__shoot-missing-page-…`, page 404) | `/home/user/KYW-test-restaurant/.shots-le-ponti-2-portfolio-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-le-ponti-2-portfolio-revue1/404/planche.png` (14 images) |

Non capturées par le crawl : `/histoire/`, `/terrasse/`, `/reservation/` (présentes dans l'audit, sans dossier de captures).

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 (0) | 0 (0) | 2 : `document-title`, `html-has-lang` |
| Contraste à vérifier (axe) | 26 | 16 | 0 |
| LCP desktop (ms) | 136 | 128 | 40 |
| LCP mobile, throttlé (ms) | 3624 | 1128 | 216 |
| CLS desktop | 0.019 | 0.004 | 0 |
| CLS mobile | 0.007 | 0 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors écran (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Éléments WebGL cachés | 0 | 0 | n.d. |
| FPS scroll mobile | 60 | 61 | 61 |
| Clavier : arrêts de focus | 12 | 12 | 1 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : piège de focus | non | non | non |

Notes : le FPS desktop est mesuré sur GPU logiciel (plancher, pas une mesure matérielle). Le LCP mobile de l'accueil (`img`, 3624 ms) est le plus élevé ; l'élément LCP desktop de l'accueil est `p.hero__slogan`.

Poids : page la plus lourde `/le-ponti-2/portfolio/`, environ 805 KB (html 7, JS 20 gz, CSS 7 gz, polices 69, images 702).

## Audit (audit.mjs)

- FAIL : **0**
- WARN : **13**
  - 10 × « sentence repeated » (texte répété sur les 5 pages) : bloc « Horaires du jour Midi et soir, du mardi au dimanche Avenue du Bourgmes » (2 occurrences par page) et « 11:30 à 14:30, 18:00 à 21:30 » (6 à 12 occurrences par page).
  - 3 × site : la page 404 n'a pas de `<h1>` ; pas de `robots.txt` ; pas de `sitemap`.
- Crawl : 5 pages (`/`, `/carte/`, `/histoire/`, `/terrasse/`, `/reservation/`).
