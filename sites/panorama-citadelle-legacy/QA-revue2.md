# QA revue 2 — panorama-citadelle legacy (captures, faits)

Serveur local : `dist/` sur http://127.0.0.1:4503/panorama-citadelle/legacy/ (build `scripts/build-site.mjs`, 5 pages générées).
Dossier de captures : `/home/user/KYW-test-restaurant/.shots-panorama-citadelle-legacy-revue2/`

## Pages capturées (3 dossiers)

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil | `.shots-panorama-citadelle-legacy-revue2/home/` | `.shots-panorama-citadelle-legacy-revue2/home/planche.png` |
| Le Panorama (`le-panorama/`) | `.shots-panorama-citadelle-legacy-revue2/panorama-citadelle-item/` | `.shots-panorama-citadelle-legacy-revue2/panorama-citadelle-item/planche.png` |
| 404 | `.shots-panorama-citadelle-legacy-revue2/404/` | `.shots-panorama-citadelle-legacy-revue2/404/planche.png` |

Note : le shoot indique 3 pages capturées alors que l'audit crawle 4 pages (dont `la-carte/` et `reservation-contact/`, sans dossier de captures).
Planches : les options `--colonnes 4 --largeur 480` ne sont pas reconnues par `scripts/planche.py` (lues comme fichiers, « ignoré 4 », « ignoré 480 ») ; les planches sont sorties en 1920×5280, 19 images chacune.

## Chiffres par page (report.json / summary.json)

| Page | Erreurs console | Requêtes en échec | Axe (violations / sérieuses) | CLS desk / mob | LCP desk / mob (ms) | Débordement | Cibles petites | FPS desk / mob | Focus visible KO / invisible | Hover sans effet | Couleur seule |
|---|---|---|---|---|---|---|---|---|---|---|---|
| home | 0 | 0 | 0 / 0 | 0.012 / 0.002 | 520 / 988 (img) | non | 3 | 60 / 61 | 0 / 0 | 1 | 5 |
| panorama-citadelle-item | 0 | 0 | 0 / 0 | 0.005 / 0.003 | 472 / 764 (p) | non | 1 | 60 / 61 | 0 / 0 | 2 | 5 |
| 404 | 0 | 0 | 1 / 1 (color-contrast ×2) | — / 0 | — / 248 | non | 1 | 60 / 61 | 0 / 0 | 2 | 0 |

Autres champs (summary) : `hiddenTextReduced` 0 partout ; `movingReduced` false ; `skipLinkFirst` false ; `idleMotion` false ; `heroSettledMs` 3310 (home), 3103 (item), 2186 (404).
Cibles petites (report) : home — `groupes@panoramanamur.be` 226×19, `081 84 11 34 95` 95×19 (+1) ; item — aucune côté desktop, `Le Panorama` 133×20 côté mobile.
Axe 404 : color-contrast ×2 (violations), contrastNeedsReview non détaillé ici.
Contrôle clavier : `skipLinkFirst` false sur les 3 pages.

## Audit (`audit.mjs`)

- 4 pages crawlées : `/`, `/le-panorama/`, `/la-carte/`, `/reservation-contact/`.
- Page la plus lourde : `/le-panorama/`, ~1306 KB (html 4, JS 1 gz, CSS 5 gz, fonts 266 KB, images 1030 KB).
- **FAIL : 0**. **WARN : 16**, dont :
  - 2 × « sentence repeated 7x : "8 h 00 à 23 h 00" » (`/` et `/reservation-contact/`) ;
  - 2 × site : pas de robots.txt, pas de sitemap ;
  - 12 × « ttf/otf font shipped » (3 fichiers `.ttf` sur chacune des 4 pages, « use woff2 »).

## Lignes FAIL

Aucune.

## Limites

- Pas de capture de `la-carte/` ni de `reservation-contact/` (le crawl du shoot n'en a produit que 3 dossiers).
- Serveur statique (port 4503, PID 5407) arrêté par `kill` après les captures et l'audit.
