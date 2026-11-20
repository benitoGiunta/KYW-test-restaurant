# QA revue 1 — cafe-fleuri (awwwards)

Faits seulement, extraits des `report.json` et de l'audit. Build : `dist/cafe-fleuri/awwwards/`, serveur local `http://127.0.0.1:4502/cafe-fleuri/awwwards/`.

Build : exit 0, 5 pages construites.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/cafe-fleuri/awwwards/`) | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-awwwards-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-awwwards-revue1/home/planche.png` |
| Carte (`/cafe-fleuri/awwwards/carte/`) | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-awwwards-revue1/cafe-fleuri-item/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-awwwards-revue1/cafe-fleuri-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-awwwards-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-awwwards-revue1/404/planche.png` |

Le crawl a visité 3 pages (accueil, carte, 404 de contrôle) ; l'audit en a crawlé 4.

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (0 serious) | 0 (0 serious) | 1 (`color-contrast`, serious) |
| Contraste à revoir (axe) | 23 | 10 | 0 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus bloqué | non | non | non |
| Clavier : arrêts de tabulation | 12 | 12 | 3 |
| LCP desktop | 76 ms | 156 ms | 40 ms |
| LCP mobile (throttled) | 900 ms | 2108 ms | 224 ms |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments débordants desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 1 / 1 | 0 / 0 | 1 / 1 |
| FPS défilement desktop / mobile | 60 / 60 | 60 / 60 | 60 / 61 |
| Éléments WebGL cachés | 0 | 0 | 0 |

Cibles petites relevées : accueil desktop « A 156x22 », accueil mobile « A 142x21 », 404 « 1 » (non détaillé dans le rapport agrégé).

## Audit (audit.mjs)

- FAIL : 0
- WARN : 2 (« no robots.txt », « no sitemap » sur le site)
- 4 pages crawlées, poids le plus lourd : `/cafe-fleuri/awwwards/` ~151 KB (html 4, JS 61 gz, CSS 5 gz, fonts 71, images 11)

## Notes

- La 404 testée est une URL inexistante générée par le crawl (`__shoot-missing-page-…`).
- Aucun fichier source modifié. `dist/` a été régénéré par le build. Rien n'est commité.
