# QA revue 1 : mon-epi-legacy (faits)

Build : `scripts/build-site.mjs sites/mon-epi-legacy` : exit 0, 6 pages, `dist/mon-epi/legacy/`.
Serveur : `serve.mjs dist --port 4503`, arrêté (PID 15719 terminé).
Crawl : 5 pages (`/mon-epi/legacy/`, `/a-propos/`, `/produits/`, `/galerie/`, `/contact/`). Captures : 3 dossiers (accueil, `a-propos` comme gabarit « mon-epi-item », 404).

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/mon-epi/legacy/` | `/home/user/KYW-test-restaurant/.shots-mon-epi-legacy-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-mon-epi-legacy-revue1/home/planche.png` |
| Gabarit item `/a-propos/` | `/home/user/KYW-test-restaurant/.shots-mon-epi-legacy-revue1/mon-epi-item/` | `/home/user/KYW-test-restaurant/.shots-mon-epi-legacy-revue1/mon-epi-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-mon-epi-legacy-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-mon-epi-legacy-revue1/404/planche.png` |

Rapport JSON par dossier : `report.json` dans chaque dossier.

## Chiffres (report.json)

| Mesure | Accueil | A propos (item) | 404 |
|---|---|---|---|
| Erreurs console | 1 (404 ressource, desktop) | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe violations | `label-content-name-mismatch` (serious, 1 nœud) | `label-content-name-mismatch` (serious, 1 nœud) | `color-contrast` (serious, 2 nœuds) |
| Contraste à revoir | 0 | 0 | 0 |
| CLS mobile / desktop | 0,112 / 0,004 | 0,035 / 0 | 0 / 0 |
| LCP mobile / desktop (ms) | 720 (img) / 360 (img) | 1100 (img) / 464 (img) | 228 (p) / 36 (p) |
| Débordement horizontal mobile / desktop | non / non | non / non | non / non |
| Cibles trop petites mobile / desktop | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil » 128x20) |
| Éléments cachés (reduced motion) | 0 | 0 | 0 |
| Clavier : arrêts de focus | 12 | 12 | 3 (le focus quitte la page à la 3e) |
| Clavier : arrêts non visibles | 0 | 0 | 0 |

Notes du rapport : FPS desktop mesurés sur GPU logiciel (plancher seulement) ; `reduced.moving` false sur les trois pages.

## Audit (audit.mjs)

- 0 FAIL, 42 WARN.
- Types de WARN : polices TTF/OTF livrées (format woff2 suggéré) sur produits, galerie, contact ; « fonts 376 KB » (variable, sous-ensemble) sur a-propos, produits, galerie, contact.
- Poids le plus lourd : `/mon-epi/legacy/galerie/`, ~1264 KB (HTML 3, JS 1 gz, CSS 5 gz, polices 376, images 880).
