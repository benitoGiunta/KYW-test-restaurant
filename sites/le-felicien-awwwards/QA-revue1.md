# QA revue 1 : captures, planches et audit (le-felicien-awwwards)

Build : `dist/le-felicien/awwwards/` (5 pages, exit 0). Serveur local port 4502, arrêté après usage.
Captures : `/home/user/KYW-test-restaurant/.shots-le-felicien-awwwards-revue1/`
Logs : `/home/user/KYW-test-restaurant/.logs/le-felicien-awwwards-revue1-{build,shoot,audit}.log`

## Pages

| Page | URL testée | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | `/le-felicien/awwwards/` | `.shots-le-felicien-awwwards-revue1/home/` | `.shots-le-felicien-awwwards-revue1/home/planche.png` (19 images) |
| Carte | `/le-felicien/awwwards/carte/` | `.shots-le-felicien-awwwards-revue1/le-felicien-item/` | `.shots-le-felicien-awwwards-revue1/le-felicien-item/planche.png` (19 images) |
| 404 | `/__shoot-missing-page-…` | `.shots-le-felicien-awwwards-revue1/404/` | `.shots-le-felicien-awwwards-revue1/404/planche.png` (14 images) |

Note : `planche.py` a traité `--colonnes 4 --largeur 480` comme des fichiers (« ignoré ») ; les planches sont sorties en 1920 px de large, sans ces options.
Note : l'audit indique 4 pages crawlées, le shoot a produit 3 dossiers ; la 4e URL n'est pas identifiée dans les journaux.

## Chiffres (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (serious 0, contraste à vérifier 8) | 0 (serious 0, contraste à vérifier 11) | 2 serious : `document-title`, `html-has-lang` |
| LCP desktop / mobile (ms) | 136 / 1212 | 108 / 1160 | 36 / 224 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cible (petites cibles) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS défilement desktop / mobile | 60 / 60 | 60 / 60 | 60 / 61 |
| Settled hero desktop / mobile (ms) | 2527 / 4451 | 2349 / 4198 | 2190 / 2195 |
| Mouvement inactif (idleMotion) | oui | non | non |
| Clavier : arrêts de tabulation | 12 | 12 | 1 |
| Clavier : focus non visible | 0 | 0 | 0 |
| Clavier : focus invisible | 1 (INPUT) | 1 (INPUT) | 0 |
| Lien d'évitement en premier | non | non | non |
| Survol : cibles | 7 | 7 | 0 |
| Survol : pas de changement | 0 | 0 | 0 |
| Survol : changement de couleur seul | 0 | 2 (`081 39 53 23`, « Réserver une table ») | 0 |
| Survol : cibles recouvertes | 0 | 0 | 0 |
| Mouvement réduit : écran en mouvement | non | non | non |
| Texte caché en mouvement réduit | 0 | 0 | 0 |

Titres h1 relevés : accueil « LE FÉLICIEN », carte « LA CARTE », 404 aucun.
Titre de page : accueil « Le Félicien | Brasserie à Suarlée, Namur », carte « La carte d’automne | Le Félicien », 404 vide.

Mesures GL : `glOn` false sur les trois pages, `glHidden` vide.

## Audit (`audit.mjs`)

Lignes FAIL : aucune (0 FAIL).
Nombre de WARN : 3.
- `404 page has no <h1>`
- `no robots.txt`
- `no sitemap`

Poids indiqué : page la plus lourde `/le-felicien/awwwards/` environ 293 KB ; HTML 5, JS 64 (gz), CSS 6 (gz), polices 80, images 138.

## Points à vérifier dans les captures (faits seulement)

- 404 : axe signale `document-title` et `html-has-lang` ; le rapport n'a ni titre ni h1.
- Accueil : `invisibleFocus` sur un champ `INPUT` (même élément sur la carte).
- Carte : deux cibles n'ont qu'un changement de couleur au survol.
- Mobile : LCP accueil 1212 ms, carte 1160 ms ; settled hero mobile 4198 à 4451 ms.

Aucun fichier source modifié. Aucun commit.
