# QA build — maison-des-desserts-awwwards (passe build, phase test)

Build : `scripts/build-site.mjs sites/maison-des-desserts-awwwards` → `dist/maison-des-desserts/awwwards/` (exit 0, 5 pages, sitemap créé).
Serveur : `serve.mjs dist --port 4502`, arrêté après les captures.
Captures : `.shots-maison-des-desserts-awwwards-build/` (3 dossiers de page : `home`, `maison-des-desserts-item`, `404`).
Audit : 4 pages explorées (dont `/reservation/`, non capturée par shoot).

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| home (`/maison-des-desserts/awwwards/`) | `.shots-maison-des-desserts-awwwards-build/home/` | `.shots-maison-des-desserts-awwwards-build/home/planche.png` |
| carte (`/maison-des-desserts/awwwards/carte/`) | `.shots-maison-des-desserts-awwwards-build/maison-des-desserts-item/` | `.shots-maison-des-desserts-awwwards-build/maison-des-desserts-item/planche.png` |
| 404 | `.shots-maison-des-desserts-awwwards-build/404/` | `.shots-maison-des-desserts-awwwards-build/404/planche.png` |

Résumé global : `.shots-maison-des-desserts-awwwards-build/summary.json`.
Note : `planche.py` ignore `--colonnes` et `--largeur` (les valeurs sont lues comme des images) ; les planches sont donc en 3 colonnes de 640 px (1920 px de large), 19 images chacune.

## Chiffres par page (report.json / summary.json)

| Mesure | home | carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe, violations sérieuses | 0 | 0 | 1 (`color-contrast`, 2 nœuds : `.kyw-footer__note` et `span`, #6b787d sur #fbfaf8, 4,36:1 pour 4,5:1 requis) |
| LCP desktop (ms) | 80 | 176 | 36 |
| CLS desktop | 0,002 | 0,002 | 0 |
| LCP mobile (ms, 4x CPU, slow 4G) | 1708 | 1908 | 216 |
| CLS mobile | 0,067 | 0,004 | 0 |
| FPS desktop / mobile (plancher headless) | 60 / 60 | 60 / 60 | 60 / 61 |
| Débordement horizontal (desktop / mobile) | non / non | non / non | non / non |
| Éléments hors de la largeur (desktop / mobile) | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites (desktop / mobile) | 3 / 4 | 2 / 3 | 1 / 1 |
| Texte caché réduit (reduced motion) | 0 | 0 | 0 |
| Mouvement en reduced motion | non | non | non |
| Mouvement au repos | non | non | non |
| Survol sans changement visuel (`noHoverChange`) | 1 | 2 | 2 |
| Survol changeant seulement la couleur (`colorOnly`) | 3 | 1 | 0 |
| Clavier : focus non visible / focus invisible / piégé | 0 / 0 / non | 0 / 0 / non | 0 / 0 / non |
| Clavier : `skipLinkFirst` (drapeau) | false | false | false |

Clavier, premiers arrêts observés : home → « Aller au contenu », « La Maison des Desserts », « La carte », « L’histoire », « Réservation », « Appeler »… ; carte → mêmes premiers liens puis les créneaux horaires (« 8 h 30 Le petit déjeuner », « 9 h Desserts… », etc.) ; 404 → « la page d’accueil », « Réalisé par », puis sortie du document.

Titres : home « La Maison des Desserts | Pâtisserie, boulangerie et salon de thé à Namur » ; carte « La carte | La Maison des Desserts » ; 404 « Page introuvable · KYW ».

## Audit (`audit.mjs`)

Lignes FAIL : **0**.
Lignes WARN : **9**.

- `/maison-des-desserts/awwwards/` : titre de 72 caractères (limite 70).
- `/maison-des-desserts/awwwards/reservation/` : phrase répétée 2 fois, « Mardi 8 h à 18 h », « Mercredi 8 h à 18 h », « Jeudi 8 h à 18 h », « Vendredi 8 h à 18 h », « Samedi 8 h à 18 h » (5 WARN), et « Photos : La Maison des Desserts. » (1 WARN).
- site : pas de `robots.txt`.
- site : pas de `sitemap`.

Poids de la page la plus lourde : ~750 Ko (html 5, JS 62 gz, CSS 6 gz, polices 67, images 610).

## Points non couverts

- `/maison-des-desserts/awwwards/reservation/` : audité mais non capturé (shoot a visité 3 pages seulement).
- Les FPS desktop sont ceux d'un GPU logiciel headless (plancher, non représentatif).
