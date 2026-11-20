# QA revue 2 — le-brunchist / portfolio (phase test, rôle captures)

Faits uniquement. Build, captures et audit exécutés sur `dist/le-brunchist/portfolio/` servi en local (port 4501, serveur arrêté après les captures). Aucun fichier source modifié, aucun commit.

## Étapes

- Build : `sites/le-brunchist-portfolio` → `dist/le-brunchist/portfolio/`, exit 0, 6 pages construites.
- Captures (`shoot.mjs --crawl --nav`) : 3 dossiers de pages, exit 0.
- Audit (`audit.mjs`) : 5 pages explorées, **0 FAIL, 6 WARN**.
- Journaux : `.logs/le-brunchist-portfolio-revue2-{build,shoot,audit,planche-*}.log`.

## Pages et captures

| Page | URL testée | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | `/le-brunchist/portfolio/` | `/home/user/KYW-test-restaurant/.shots-le-brunchist-portfolio-revue2/home/` (13 bureau `d-*`, 6 mobile `m-*`, `report.json`) | `/home/user/KYW-test-restaurant/.shots-le-brunchist-portfolio-revue2/home/planche.png` (1920 × 5280, 19 vignettes) |
| Carte | `/le-brunchist/portfolio/carte/` | `/home/user/KYW-test-restaurant/.shots-le-brunchist-portfolio-revue2/le-brunchist-item/` (13 `d-*`, 6 `m-*`, `report.json`) | `/home/user/KYW-test-restaurant/.shots-le-brunchist-portfolio-revue2/le-brunchist-item/planche.png` (1920 × 5280, 19 vignettes) |
| 404 | `/__shoot-missing-page-…` (page inexistante) | `/home/user/KYW-test-restaurant/.shots-le-brunchist-portfolio-revue2/404/` (13 `d-*`, 6 `m-*`, `report.json`) | `/home/user/KYW-test-restaurant/.shots-le-brunchist-portfolio-revue2/404/planche.png` (1920 × 5280, 19 vignettes) |

Résumé des captures : `/home/user/KYW-test-restaurant/.shots-le-brunchist-portfolio-revue2/summary.json`.

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations sérieuses | 0 | 0 | 1 (`color-contrast`, 2 nœuds : `.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4,36:1 pour 4,5:1 requis) |
| Axe : à vérifier (contraste) | 34 | 30 | 0 |
| CLS bureau / mobile | 0,002 / 0 | 0,002 / 0,014 | 0 / 0 |
| LCP bureau / mobile | 76 ms / 1 336 ms | 84 ms / 1 160 ms | 32 ms / 228 ms |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments en débordement (offenders) bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites bureau / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil », 128 × 20) |
| FPS défilement bureau / mobile | 60 / 46 | 60 / 57 | 61 / 61 |
| Texte caché (mouvement réduit) | 0 | 0 | 0 |
| Mouvement en mouvement réduit | non | non | non |
| Clavier : arrêts de tabulation | 12 | 12 | 3 |
| Clavier : focus non visible / invisible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus bloqué | non | non | non |
| Survol : cibles sans réaction | 0 / 7 | 0 / 7 | 2 / 2 |

## Audit (audit.mjs)

- Résultat : **0 FAIL, 6 WARN**.
- WARN :
  1. `/le-brunchist/portfolio/` — phrase répétée 2 fois : « Jus frais pressé prix illustratif 5 € ».
  2. `/le-brunchist/portfolio/` — phrase répétée 2 fois : « Œufs brouillés prix illustratif 10 € ».
  3. `/le-brunchist/portfolio/carte/` — phrase répétée 2 fois : « Jus frais pressé prix illustratif 5 € ».
  4. `/le-brunchist/portfolio/carte/` — phrase répétée 2 fois : « Œufs brouillés prix illustratif 10 € ».
  5. `site` — pas de `robots.txt`.
  6. `site` — pas de sitemap.
- Poids de la page la plus lourde (`/le-brunchist/portfolio/`) : environ 573 Ko ; HTML 6, JS 63 (gz), CSS 7 (gz), polices 110, images 387.
- Pages explorées : 5 (l'audit) ; pages capturées : 3 (le shoot, dont la 404).

## Lignes FAIL

Aucune.
