# QA build : mon-epi / awwwards (passe build, phase test)

Build : `scripts/build-site.mjs sites/mon-epi-awwwards` : exit 0, 5 pages construites, sitemap créé (`dist/mon-epi/awwwards/`).
Serveur local : `serve.mjs dist --port 4502`, arrêté après les captures. Journaux : `.logs/mon-epi-awwwards-build-*.log`.

## Pages capturées

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/mon-epi/awwwards/` | `/home/user/KYW-test-restaurant/.shots-mon-epi-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-mon-epi-awwwards-build/home/planche.png` |
| Carte `/mon-epi/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-mon-epi-awwwards-build/mon-epi-item/` | `/home/user/KYW-test-restaurant/.shots-mon-epi-awwwards-build/mon-epi-item/planche.png` |
| Page inexistante (404, sonde) | `/home/user/KYW-test-restaurant/.shots-mon-epi-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-mon-epi-awwwards-build/404/planche.png` |

Chaque dossier contient `report.json`, les captures `r-*` (repos), `h-*` (survol repos/actif), `k-*` (focus clavier), `d-*` / `m-*` (bureau / mobile).
Remarque : `planche.py` affiche « ignoré 4 » et « ignoré 480 » : les options `--colonnes 4 --largeur 480` sont lues comme des fichiers ; le rendu reste 4 colonnes de 480 px (1920 px de large, 19 images par planche).

## Chiffres (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe graves | 0 | 0 | 1 (champ `a11y.serious` = 1, règle non détaillée dans le rapport) |
| Contraste à vérifier (axe) | 16 | 52 | 0 |
| CLS bureau / mobile | 0 / 0 | 0,014 / 0,004 | 0 / 0 |
| LCP bureau / mobile (ms) | 96 / 928 | 104 / 876 | 40 / 240 |
| Load bureau / mobile (ms) | 146 / 1814 | 74 / 1686 | 20 / 421 |
| FPS défilement bureau / mobile | 60 / 60 | 57 / 60 | 60 / 61 |
| Texte caché (mode réduit) | 0 | 0 | 0 |
| Arrêts clavier (focus) | 12 | 12 | 3 |
| Cibles de survol testées / sans changement hors couleur | 5 / 3 | 6 / 2 | 2 / 0 |

Débordement horizontal et éléments cachés : le rapport ne contient pas de champ dédié à ces mesures ; non mesurés ici.
Les FPS bureau sont rendus sur GPU logiciel (plancher, pas une mesure matérielle).

Pour le 404, les arrêts clavier sont : lien « à la page d'accueil », lien « Réalisé par », puis sortie du document.

## Audit (`audit.mjs`)

- 4 pages explorées, poids le plus lourd : `/mon-epi/awwwards/`, environ 775 Ko (html 5, JS 61 gz, CSS 5 gz, polices 54, images 649).
- **0 FAIL**, **3 WARN** :
  1. `/mon-epi/awwwards/` : titre de 71 caractères (seuil 70).
  2. site : pas de `robots.txt`.
  3. site : pas de sitemap (alors que le build indique `sitemap-index.xml` créé ; à vérifier côté URL servie).

## Suite

Aucun fichier source modifié, aucun commit. Serveur 4502 arrêté.
