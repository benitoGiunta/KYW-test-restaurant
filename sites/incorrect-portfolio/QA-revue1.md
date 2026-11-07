# QA revue 1 — incorrect-portfolio

Faits extraits par script (build, captures, audit). Aucune analyse de design.

Build : `scripts/q.sh incorrect-portfolio-revue1-build` exit 0 (6 pages, `dist/incorrect/portfolio/`).
Serveur de contrôle : `serve.mjs dist --port 4501`, arrêté après usage.
Captures : `shoot.mjs --crawl --nav` (exit 0). Dossiers de captures : 3 pages tournées sur 5 explorées (`home`, `incorrect-item`, `404`). Journal : `.logs/incorrect-portfolio-revue1-shoot.log`.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| `/incorrect/portfolio/` (home) | `/home/user/KYW-test-restaurant/.shots-incorrect-portfolio-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-incorrect-portfolio-revue1/home/planche.png` (1920 × 5280, 19 images) |
| `/incorrect/portfolio/carte/` (incorrect-item) | `/home/user/KYW-test-restaurant/.shots-incorrect-portfolio-revue1/incorrect-item/` | `/home/user/KYW-test-restaurant/.shots-incorrect-portfolio-revue1/incorrect-item/planche.png` (1920 × 5280, 19 images) |
| 404 (URL inconnue) | `/home/user/KYW-test-restaurant/.shots-incorrect-portfolio-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-incorrect-portfolio-revue1/404/planche.png` (1920 × 4224, 14 images) |

Synthèse : `/home/user/KYW-test-restaurant/.shots-incorrect-portfolio-revue1/summary.json`.

## Chiffres par page (report.json)

| Mesure | home | carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (serious) | 0 | 0 | 2 (`document-title` x1, `html-has-lang` x1) |
| Contraste à vérifier (axe) | 47 | 9 | — |
| CLS desktop / mobile | 0,067 / 0,003 | 0,001 / 0 | 0 / 0 |
| LCP desktop / mobile (ms) | 140 / 936 | 108 / 964 | 40 / 220 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments cachés (texte réduit) | 0 | 0 | 0 |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus non visible / invisible / bloqué | 0 / 0 / non | 0 / 0 / non | 0 / 0 / non |
| Mouvement réduit (texte caché / animations) | 0 / non | 0 / non | 0 / non |
| FPS défilement desktop / mobile | 60 / 60 | 60 / 60 | 61 / 61 |
| Hover sans changement | 0 | 0 | — (aucune cible) |

Notes :
- Home : LCP desktop mesuré sur `span.loader__name`, mobile sur `p.hero__baseline`. Stabilisation du hero non atteinte (`heroSettledMs` null).
- Carte : LCP mobile sur `p.lead`. Stabilisation après 3 875 ms (desktop), 6 118 ms (mobile).
- 404 : `title` vide, aucun `h1`. LCP sur `pre`.
- Audit de l'enveloppe : `.shots-incorrect-portfolio-revue1/home/report.json` affiche `idleMotion: true` (home) ; `false` sur carte et 404.

## Audit (`audit.mjs`, journal `.logs/incorrect-portfolio-revue1-audit.log`)

Résultat : **0 FAIL, 8 WARN**.

WARN :
1. `/incorrect/portfolio/` — phrase répétée 2× : « Mardi au samedi, 18 h 30 à 21 h 30 ; samedi midi aussi »
2. `/incorrect/portfolio/carte/` — même phrase répétée 2×
3. `/incorrect/portfolio/histoire/` — même phrase répétée 2×
4. `/incorrect/portfolio/a-emporter/` — même phrase répétée 2×
5. `/incorrect/portfolio/reservation/` — même phrase répétée 2×
6. `site` — la page 404 n'a pas de `<h1>`
7. `site` — pas de `robots.txt`
8. `site` — pas de `sitemap` (le build a pourtant produit `sitemap-index.xml` dans `sites/incorrect-portfolio/dist`)

Audit : 5 pages explorées (`crawl`), poids de la page la plus lourde ~876 KB (images 767 KB).

## Lignes FAIL

Aucune.
