# QA revue 2 — tariki / awwwards (faits, sans analyse de design)

Build : `sites/tariki-awwwards` → `dist/tariki/awwwards/` (exit 0, 5 pages construites).
Serveur : `dist/` sur 127.0.0.1:4502, base `/tariki/awwwards/`.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/tariki/awwwards/`) | `/home/user/KYW-test-restaurant/.shots-tariki-awwwards-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-tariki-awwwards-revue2/home/planche.png` |
| Carte (`/tariki/awwwards/carte/`) | `/home/user/KYW-test-restaurant/.shots-tariki-awwwards-revue2/tariki-item/` | `/home/user/KYW-test-restaurant/.shots-tariki-awwwards-revue2/tariki-item/planche.png` |
| 404 (page introuvable) | `/home/user/KYW-test-restaurant/.shots-tariki-awwwards-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-tariki-awwwards-revue2/404/planche.png` |

Note : `planche.py` lit `--colonnes` et `--largeur` comme des fichiers (`ignoré 4`, `ignoré 480`) ; les planches
sont sorties avec la mise en page par défaut (1920 × 5280 px, 19 images chacune).
Note : la capture n'a pas couvert `/tariki/awwwards/reservation/` (présent dans le crawl de l'audit, non capturé).

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations | 0 | 0 | 1 (color-contrast, serious, 2 nœuds) |
| Axe : contrastNeedsReview | 16 | 8 | 0 |
| Bureau : CLS | 0 | 0 | 0 |
| Bureau : LCP (ms) | 148 | 156 | 52 |
| Mobile : CLS | 0 | 0 | 0 |
| Mobile : LCP (ms) | 2000 | 1984 | 228 |
| Mobile : FPS scroll | 57 | 59 | 60 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments hors écran (offenders) bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites bureau / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil 128x20 ») |
| Éléments WebGL masqués | 0 | 0 | 0 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : piège de focus (stuck) | non | non | non |
| Clavier : arrêts de tabulation | 12 | 12 | 3 |

Remarque : le FPS bureau est mesuré en headless sur GPU logiciel (valeur plancher, indiquée par le rapport).

## Audit (audit.mjs)

Pages crawlées : 4 (accueil, carte, réservation, 404).

Lignes FAIL : aucune (0 FAIL).

Lignes WARN : 4 au total.
- `/tariki/awwwards/` : phrase répétée 4 fois « 11 h 30 à 14 h »
- `/tariki/awwwards/reservation/` : phrase répétée 4 fois « 11 h 30 à 14 h »
- `site` : pas de robots.txt
- `site` : pas de sitemap

Journal complet : `/home/user/KYW-test-restaurant/.logs/tariki-awwwards-revue2-audit.log`.
