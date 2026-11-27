# QA build : bayti / legacy (passe build, phase test)

Build : `sites/bayti-legacy` → `dist/bayti/legacy/` (8 pages, 0 erreur, `scripts/build-site.mjs`).
Serveur local : `serve.mjs dist --port 4503` (arrêté après les captures). URL testée : `http://127.0.0.1:4503/bayti/legacy/`.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| accueil (`/bayti/legacy/`) | `/home/user/KYW-test-restaurant/.shots-bayti-legacy-build/home/` | `/home/user/KYW-test-restaurant/.shots-bayti-legacy-build/home/planche.png` |
| notre-histoire (`bayti-item`) | `/home/user/KYW-test-restaurant/.shots-bayti-legacy-build/bayti-item/` | `/home/user/KYW-test-restaurant/.shots-bayti-legacy-build/bayti-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-bayti-legacy-build/404/` | `/home/user/KYW-test-restaurant/.shots-bayti-legacy-build/404/planche.png` |

- Chaque dossier contient `report.json` et 19 images (d-*, h-*, k-*, m-*, planche).
- `shoot.mjs --crawl --nav` a capturé 3 pages (accueil, notre-histoire, 404). L'audit a crawlé 7 pages (accueil, notre-histoire, menu, carte-restaurant, avis, galerie, bayti-chez-vous) : les 4 dernières n'ont pas de captures.
- Planches : `scripts/planche.py` a traité `--colonnes 4 --largeur 480` comme des fichiers (journal : « ignoré 4 », « ignoré 480 »). Les planches ont été produites avec la largeur par défaut, 1920 px de large, 19 images chacune.

## Chiffres par page (report.json)

| Mesure | accueil | notre-histoire | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 1 (color-contrast, serious, 2 nœuds) |
| Axe « contrast à revoir » | 0 | 0 | 0 |
| CLS bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP bureau (ms, élément) | 80 (img) | 56 (img) | 40 (p) |
| LCP mobile (ms, élément) | 2016 (img) | 1252 (img) | 276 (p) |
| Chargement bureau / mobile (ms) | 47 / 2150 | 39 / 1239 | 29 / 433 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Cibles trop petites bureau / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil 128x20 ») |
| Éléments hors cadre (offenders) bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS au scroll bureau / mobile (pire frame ms) | 60 (17) / 60 (17) | 60 (17) / 61 (17) | 61 (17) / 60 (17) |
| WebGL actif bureau | non | non | non |
| Clavier : arrêts de tabulation | 12 | 12 | 3 |
| Clavier : focus bloqué | non | non | non |
| Clavier : focus non visible / invisible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Mouvement réduit : animation active / texte caché | non / 0 | non / 0 | non / 0 |

Détail axe (404) : `color-contrast`, impact serious, 2 nœuds.

## Audit (`audit.mjs`, `.logs/bayti-legacy-build-audit.log`)

- Résultat : **0 FAIL, 11 WARN**.
- WARN :
  1. accueil : `twitter:card` manquant
  2. accueil : phrase répétée 5 fois « 11 h 00 à 19 h 00 Comptoir 18 h 00 à 21 h 00 Restaurant »
  3. notre-histoire : `twitter:card` manquant
  4. menu : `twitter:card` manquant
  5. carte-restaurant : `twitter:card` manquant
  6. avis : `twitter:card` manquant
  7. galerie : `twitter:card` manquant
  8. bayti-chez-vous : `twitter:card` manquant
  9. site : pas de `robots.txt`
  10. site : pas de `sitemap` (à vérifier : `sitemap-index.xml` et `sitemap-0.xml` existent dans `dist/bayti/legacy/`)
  11. galerie : poids de page d'environ 4265 Ko (seuil visé < 3 Mo) ; 4197 Ko d'images

## Notes

- Fichiers modifiés hors de ce travail, présents dans `git status` et non touchés par cette passe : `data/suivi.html`, `dist/suivi/index.html`. Aucun commit fait.
- Aucun fichier source modifié.
