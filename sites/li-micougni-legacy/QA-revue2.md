# QA revue 2 : li-micougni-legacy

Faits seulement, extraits des `report.json` et de l'audit. Serveur local `dist/` (port 4503), build `sites/li-micougni-legacy`, build sans erreur.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/li-micougni/legacy/`) | `/home/user/KYW-test-restaurant/.shots-li-micougni-legacy-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-li-micougni-legacy-revue2/home/planche.png` |
| Vitrine (`/li-micougni/legacy/vitrine-du-restaurant/`) | `/home/user/KYW-test-restaurant/.shots-li-micougni-legacy-revue2/li-micougni-item/` | `/home/user/KYW-test-restaurant/.shots-li-micougni-legacy-revue2/li-micougni-item/planche.png` |
| Page 404 (sonde `__shoot-missing-page-*`) | `/home/user/KYW-test-restaurant/.shots-li-micougni-legacy-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-li-micougni-legacy-revue2/404/planche.png` |

Le crawl de `shoot.mjs` a produit 3 dossiers ; l'audit a parcouru 7 pages (Accueil, Vitrine, Menu, Terrasse arrière, Évènement privé, À propos, Contact).

## Chiffres par page

| Mesure | Accueil | Vitrine | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 2 (graves : `document-title`, `html-has-lang`) |
| Contraste axe à vérifier | 3 | 0 | 0 |
| CLS desktop / mobile | 0,034 / 0,024 | 0,003 / 0,002 | 0 / 0 |
| LCP desktop / mobile (ms) | 764 / 1556 | 368 / 4144 | 52 / 216 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments débordants | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites | 0 | 0 | 0 |
| Éléments cachés (GL) | 0 | 0 | n.d. |
| Clavier : arrêts de tabulation | 12 | n.d. | n.d. |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : piège de focus | non | non | non |
| Survol : cibles testées / changement de couleur seul | 7 / 6 | n.d. | n.d. |

Accueil, FPS de défilement desktop : 61 (pire trame 17 ms, environnement headless). Mobile : 61 (pire trame 17 ms, 4x CPU).

## Audit (`audit.mjs`)

- FAIL : 0
- WARN : 50, dont 50 « ttf/otf font shipped (use woff2) » sur les pages Terrasse arrière, Évènement privé, À propos et Contact.
- Page la plus lourde : `/li-micougni/legacy/vitrine-du-restaurant/`, environ 1001 Ko.

## Rapport brut

Fichiers `report.json` : `.shots-li-micougni-legacy-revue2/home/report.json`, `.shots-li-micougni-legacy-revue2/li-micougni-item/report.json`, `.shots-li-micougni-legacy-revue2/404/report.json`. Journaux : `.logs/li-micougni-legacy-revue2-*.log`.
