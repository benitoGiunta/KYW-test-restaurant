# QA revue 1 : le-felicien-legacy (captures)

Build : `sites/le-felicien-legacy` → `dist/le-felicien/legacy/` (exit 0, 5 pages construites).
Serveur local : `dist` sur le port 4503, arrêté après usage.
Racine des captures : `/home/user/KYW-test-restaurant/.shots-le-felicien-legacy-revue1/`
Journaux : `.logs/le-felicien-legacy-revue1-*.log`

## Pages et captures

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/le-felicien/legacy/` | `/home/user/KYW-test-restaurant/.shots-le-felicien-legacy-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-le-felicien-legacy-revue1/home/planche.png` |
| Fiche `/la-carte/` (le-felicien-item) | `/home/user/KYW-test-restaurant/.shots-le-felicien-legacy-revue1/le-felicien-item/` | `/home/user/KYW-test-restaurant/.shots-le-felicien-legacy-revue1/le-felicien-item/planche.png` |
| 404 (URL inexistante) | `/home/user/KYW-test-restaurant/.shots-le-felicien-legacy-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-le-felicien-legacy-revue1/404/planche.png` |

Remarque : `shoot.mjs --crawl --nav` a capturé 3 dossiers. L'audit (`audit.mjs`) annonce 4 pages crawlées, dont `/contact/`, qui n'a pas de dossier de captures.

## Chiffres par page (report.json / summary.json)

| Mesure | Accueil | Fiche la-carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 | 0 | 2 (`document-title` x1, `html-has-lang` x1) |
| LCP desktop (ms) | 480 | 384 | 72 |
| LCP mobile throttlé (ms) | 904 | 776 | 212 |
| CLS desktop | 0 | 0.001 | 0 |
| CLS mobile | 0.038 | 0.011 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Hauteur page desktop / mobile (px) | 5065 / 5958 | 2377 / 2791 | 900 / 2121 |
| Cibles tactiles trop petites | 0 | 0 | 0 |
| FPS défilement desktop / mobile | 61 / 61 | 61 / 61 | 60 / 61 |
| Mouvement au repos (idleMotion) | non | non | non |
| Texte caché réduit | 0 | 0 | 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus sans style visible | 0 | 0 | 0 |
| Clavier : focus invisible | 4 | 0 | 0 |
| Survol sans changement | 1 | 1 | 0 |
| Information par couleur seule | 6 | 6 | 0 |
| Mouvement en mode réduit | non | non | non |

## Audit (`audit.mjs`)

Résultat : **0 FAIL, 29 WARN** (4 pages crawlées, poids le plus lourd : accueil ~709 KB ; 376 KB de polices, 323 KB d'images).

## Anomalies factuelles

- Accueil : 4 focus clavier invisibles ; 1 survol sans changement ; 6 informations par couleur seule.
- Fiche la-carte : 1 survol sans changement ; 6 informations par couleur seule.
- 404 : 2 violations axe (titre de document et attribut `lang` de `html` absents).
- `planche.py` : les options `--colonnes 4 --largeur 480` ont été lues comme des fichiers (« ignoré ») ; les planches ont été produites avec les réglages par défaut (1920 px de large, 14 à 19 images).

Aucun fichier source modifié. Aucun commit.
