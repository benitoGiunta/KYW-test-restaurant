# QA revue 2 — be-belge / legacy (faits)

Build : `scripts/q.sh be-belge-legacy-revue2-build` → exit 0, 7 pages, `dist/be-belge/legacy/`.
Serveur local : port 4503, arrêté après les captures.
Captures : `.shots-be-belge-legacy-revue2/` (dossiers `home`, `be-belge-item`, `404`, chacun avec `report.json`, `d-*.png`, `m-*.png`, `k-*.png`). Résumé : `.shots-be-belge-legacy-revue2/summary.json`.
Crawl audit : 6 pages détectées (accueil, menu, carte, banquets, photos, réservation). Captures faites sur 3 pages seulement (accueil, `menu/`, 404).

## Planches

- Accueil : `/home/user/KYW-test-restaurant/.shots-be-belge-legacy-revue2/home/planche.png`
- Menu (be-belge-item) : `/home/user/KYW-test-restaurant/.shots-be-belge-legacy-revue2/be-belge-item/planche.png`
- 404 : `/home/user/KYW-test-restaurant/.shots-be-belge-legacy-revue2/404/planche.png`

Remarque : `scripts/planche.py` traite `--colonnes 4 --largeur 480` comme des fichiers (`ignoré 4`, `ignoré 480`) ; les planches ont été produites (1920 px de large, 19 images chacune).

## Chiffres par page

| Page | Erreurs console | Requêtes en échec | Axe (violations) | CLS desktop / mobile | LCP desktop / mobile | Débordement H (desk / mob) | Cibles trop petites | Clavier (arrêts / bloqué / skip link 1er) |
|---|---|---|---|---|---|---|---|---|
| Accueil `/be-belge/legacy/` | 0 | 0 | 0 | 0.012 / 0.002 | 392 ms (img) / 1224 ms (img) | non / non | 0 | 12 / non / non |
| Menu `/menu/` | 0 | 0 | 0 | 0.013 / 0.003 | 364 ms (h1) / 708 ms (p.lead) | non / non | 0 | 12 / non / non |
| 404 | 0 | 0 | 1 règle, `color-contrast` serious, 2 nœuds | 0 / 0 | 48 ms (p) / 212 ms (p) | non / non | 1 (« la page d'accueil » 128x20) | 3 / non / non |

Autres mesures (summary.json) :
- Accueil : FPS desktop 60, mobile 61 ; héros stabilisé à 3106 ms ; `contrastNeedsReview` 6 ; `noHoverChange` 2 ; `colorOnly` 4 ; mouvement non réduit : `movingReduced` false ; `idleMotion` false.
- Menu : FPS desktop 61, mobile 60 ; héros stabilisé à 2881 ms ; `contrastNeedsReview` 0 ; `noHoverChange` 5 ; `colorOnly` 2.
- 404 : FPS desktop 60, mobile 61 ; héros stabilisé à 2194 ms ; `contrastNeedsReview` 0 ; `noHoverChange` 2 ; `colorOnly` 0.
- Focus : `noVisibleFocus` 0 et `invisibleFocus` 0 sur les trois pages ; `stuck` false partout.
- Lien d'évitement (skip link) : `skipLinkFirst` false sur les trois pages.
- Réduction de mouvement : `movingReduced` false et `hiddenTextReduced` 0 sur les trois pages.

## Audit (`audit.mjs`)

- Pages crawlées : 6 ; page la plus lourde : `/be-belge/legacy/photos/`, environ 2096 KB (images 1982 KB, polices 103 KB, CSS 6 fichiers gzip, JS 1 fichier gzip, HTML 4).
- FAIL : 0
- WARN : 17. Exemples : « no canonical link » sur `/be-belge/legacy/` et `/menu/` ; « sentence repeated » (phrases répétées 2 à 3 fois, par exemple « Dernier menu publié, proposé du 13 août au 6 septembre 2026. »).
- Journal complet : `/home/user/KYW-test-restaurant/.logs/be-belge-legacy-revue2-audit.log`.

## Lignes FAIL

Aucune.

## Fichiers

Aucun fichier source modifié. Aucun commit.
