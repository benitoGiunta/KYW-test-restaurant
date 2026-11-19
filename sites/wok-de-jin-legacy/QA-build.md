# QA build : wok-de-jin-legacy (passe build, phase test)

Build : `sites/wok-de-jin-legacy` → `dist/wok-de-jin/legacy/` (exit 0, 3 pages).
Serveur de prévisualisation : `http://127.0.0.1:4503/wok-de-jin/legacy/` (arrêté après les captures).

## Pages

| Page | URL testée | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | `/wok-de-jin/legacy/` | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-legacy-build/home/` | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-legacy-build/home/planche.png` |
| Réveillon | `/wok-de-jin/legacy/reveillon/` | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-legacy-build/wok-de-jin-item/` | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-legacy-build/wok-de-jin-item/planche.png` |
| 404 (page générée par le script de capture) | `/__shoot-missing-page-…` | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-legacy-build/404/` | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-legacy-build/404/planche.png` |

Chaque planche fait 1920 × 5280 px, 19 images. Le script `planche.py` n'a pas reconnu les options `--colonnes` et `--largeur` : elles ont été lues comme des fichiers (« ignoré 4 », « ignoré 480 »), la mise en page est celle par défaut.

## Chiffres (report.json)

| Mesure | Accueil | Réveillon | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (serious 0) | 0 (serious 0) | 1 (`color-contrast`, serious, 2 nœuds) |
| Contraste à vérifier (axe) | 7 | 3 | 0 |
| LCP bureau | 464 ms (img) | 432 ms | 44 ms |
| CLS bureau | 0,046 | 0,002 | 0 |
| LCP mobile | 796 ms (h1#h-hero) | 764 ms | 236 ms |
| CLS mobile | 0,03 | 0 | non mesuré dans le résumé |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments débordants bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites bureau / mobile | 0 / 0 | 1 / 0 | 1 / 1 |
| Éléments WebGL cachés | 0 | 0 | 0 |
| Focus clavier : arrêts / sans focus visible | 12 / 0 | 12 / 0 | 3 / 0 |
| Focus invisible (liste) | `a « Découvrir la soirée »` | — | vide |
| Mouvement en réduit | non | non | non |
| FPS défilement bureau / mobile | 61 / 60 | — | — |

Détails :
- Cible petite, réveillon bureau : `081 30 68 88 95x20`.
- Cible petite, 404 mobile : `la page d'accueil 128x20`.
- Violation axe 404 : `color-contrast` (serious), 2 nœuds.
- Accueil : `keyboard.invisibleFocus` vide ; `skipLinkFirst` = false.

## Audit (`audit.mjs`)

- FAIL : 0
- WARN : 13
  - `twitter:card` absent (accueil, réveillon) : 2
  - phrase répétée 6× sur l'accueil (« 12 h 00 à 14 h 00 et 18 h 00 à 22 h 30 ») : 1
  - `robots.txt` absent : 1
  - `sitemap` absent : 1
  - fontes TTF/OTF livrées, à convertir en woff2 : 8 (4 par page)

Journal complet : `/home/user/KYW-test-restaurant/.logs/wok-de-jin-legacy-build-audit.log`.

## Fichiers

Aucun fichier source modifié. Aucun commit. Le build a réécrit `dist/wok-de-jin/legacy/` (passe build) ; ce dossier est à commiter par l'étape suivante si elle le demande.
