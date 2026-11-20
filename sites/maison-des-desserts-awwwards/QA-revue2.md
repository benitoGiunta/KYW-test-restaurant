# QA revue 2 : maison-des-desserts-awwwards (faits)

Build : `sites/maison-des-desserts-awwwards` → `dist/maison-des-desserts/awwwards/` (exit 0, 5 pages).
Serveur local : `http://127.0.0.1:4502/maison-des-desserts/awwwards/` (arrêté après les mesures).
Journaux : `.logs/maison-des-desserts-awwwards-revue2-*.log`.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| home (accueil) | `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-awwwards-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-awwwards-revue2/home/planche.png` |
| maison-des-desserts-item (carte) | `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-awwwards-revue2/maison-des-desserts-item/` | `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-awwwards-revue2/maison-des-desserts-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-awwwards-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-awwwards-revue2/404/planche.png` |

Synthèse : `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-awwwards-revue2/summary.json`.
Rapports par page : `<dossier>/report.json`.

## Chiffres par page

| Mesure | home | maison-des-desserts-item | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Débordement horizontal (desktop / mobile) | non / non | non / non | non / non |
| LCP desktop (ms) | 76 | 156 | 44 |
| CLS desktop | 0.002 | 0.002 | 0 |
| LCP mobile (ms, throttled) | 1696 | 1980 | 232 |
| CLS mobile | 0.061 | 0.004 | 0 |
| FPS desktop / mobile | 60 / 60 | 60 / 60 | 60 / 61 |
| Violations axe (toutes gravités) | 0 | 0 | 1 (color-contrast) |
| Violations axe sérieuses | 0 | 0 | 1 |
| Contrastes à vérifier (axe, needs review) | 32 | 215 | 0 |
| Cibles tactiles trop petites | 0 | 0 | 1 (« la page d'accueil », 128x20) |
| Texte caché réduit | 0 | 0 | 0 |
| Focus clavier invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Lien d'évitement en premier | non | non | non |
| Arrêts clavier / bloqué | 12 / non | 12 / non | 3 / non |
| Survol sans changement | 0 | 1 | 2 |
| Survol « couleur seule » | 3 | 1 | 0 |
| Animation au repos | oui | non | non |

Desktop : `loadMs` 130 (home), 122 (carte), 28 (404). Mobile `settledMs` : 3977 ms sur la carte.

## Audit (`audit.mjs`)

- Pages explorées : 4 (`pages crawled`).
- Poids le plus lourd : `/maison-des-desserts/awwwards/`, environ 750 KB.
- Résultat : **0 FAIL, 2 WARN**.
- WARN : `site` : pas de `robots.txt`.
- WARN : `site` : pas de `sitemap`.
