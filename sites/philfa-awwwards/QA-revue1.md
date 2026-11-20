# QA revue 1 : philfa / awwwards (captures, faits)

Build : `dist/philfa/awwwards/` (5 pages, exit 0). Serveur local port 4502, arrêté après les captures.
Captures : 3 pages (home, philfa-item = /carte/, 404 volontaire). Chaque dossier contient 13 `d-*` (bureau), 6 `m-*` (mobile), `h-*` (survol), `k-*` (clavier).

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/philfa/awwwards/` | `/home/user/KYW-test-restaurant/.shots-philfa-awwwards-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-philfa-awwwards-revue1/home/planche.png` (1920x5280) |
| Carte `/philfa/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-philfa-awwwards-revue1/philfa-item/` | `/home/user/KYW-test-restaurant/.shots-philfa-awwwards-revue1/philfa-item/planche.png` (1920x5280) |
| 404 | `/home/user/KYW-test-restaurant/.shots-philfa-awwwards-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-philfa-awwwards-revue1/404/planche.png` (1920x5280) |

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations | 0 | 0 | 1 (`color-contrast`, serious, 2 nœuds) |
| Axe : contrastNeedsReview | 22 | 12 | 0 |
| LCP bureau / mobile (ms) | 240 / 1232 | 432 / 1168 | 40 / 220 |
| LCP élément bureau / mobile | span.phil-mot / span.phil-mot | p.chapo / p.prix | p / p |
| CLS bureau / mobile | 0 / 0.002 | 0 / 0.002 | 0 / 0 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Cibles tactiles < seuil bureau / mobile | 0 / 0 | 0 / 0 | 1 / 1 (lien « la page d'accueil », 128x20) |
| Éléments WebGL cachés (mobile) | 0 | 0 | 0 |
| Texte caché | null | null | null |
| FPS défilement bureau / mobile | 60 / 59 | 60 / 60 | 61 / 61 |
| Chargement load bureau / mobile (ms) | 96 / 2886 | 70 / 2520 | 28 / 404 |
| Clavier : arrêts de focus | 12 | 12 | 3 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |

Note du rapport : les FPS bureau sont mesurés sur GPU logiciel headless (plancher, non représentatif). Les chiffres mobiles sont à 4x de ralentissement CPU, slow 4G.

## Audit (audit.mjs)

- FAIL : 0
- WARN : 2 (« no robots.txt », « no sitemap » au niveau du site servi)
- Pages explorées : 4, poids le plus lourd `/philfa/awwwards/` : ~1817 Ko (HTML 5, JS 60 gz, CSS 7 gz, polices 217, images 1528)

## Fait à signaler

- Le seul écart axe est sur la page 404 (contraste, serious, 2 nœuds).
- Le lien d'évitement (« Aller au contenu ») existe mais n'est pas le premier arrêt de focus selon `keyboard.skipLinkFirst` (false sur les 2 pages explorées).
