# QA revue 1 : dumont-bouge, variante awwwards

Faits seulement (captures, mesures, audit). Serveur local `dist/` sur 127.0.0.1:4502, arrêté après le run.

## Build

- `scripts/q.sh dumont-bouge-awwwards-revue1-build` : exit 0, 5 pages construites, sortie dans `dist/dumont-bouge/awwwards/`.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/dumont-bouge/awwwards/`) | `/home/user/KYW-test-restaurant/.shots-dumont-bouge-awwwards-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-dumont-bouge-awwwards-revue1/home/planche.png` |
| Carte (`/dumont-bouge/awwwards/carte/`) | `/home/user/KYW-test-restaurant/.shots-dumont-bouge-awwwards-revue1/dumont-bouge-item/` | `/home/user/KYW-test-restaurant/.shots-dumont-bouge-awwwards-revue1/dumont-bouge-item/planche.png` |
| 404 (URL inexistante) | `/home/user/KYW-test-restaurant/.shots-dumont-bouge-awwwards-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-dumont-bouge-awwwards-revue1/404/planche.png` |

Chaque planche regroupe 19 images (13 desktop `d-*`, 6 mobile `m-*`). Le premier passage de `shoot.mjs` a échoué (navigateur fermé, `shootFailed` sur les 3 pages, journal `.logs/dumont-bouge-awwwards-revue1-shoot.log`) ; le second passage (`.logs/dumont-bouge-awwwards-revue1-shoot2.log`) a abouti sans échec. `shoot.mjs` a fait 3 pages ; l'audit en a crawlé 4.

## Mesures par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 1 (`color-contrast`, sérieux, 2 nœuds) |
| Contraste à revoir (axe) | 24 | 14 | 0 |
| LCP desktop / mobile | 112 ms / 1888 ms | 140 ms / 2432 ms | 48 ms / 288 ms |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Chargement desktop / mobile | 197 ms / 4318 ms | 113 ms / 2385 ms | 33 ms / 421 ms |
| Débordement horizontal | non / non | non / non | non / non |
| Éléments hors gabarit (offenders) | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites | 0 / 0 | 0 / 0 | 1 / 1 (`la page d'accueil 128x20`) |
| FPS défilement desktop / mobile | 60 / 60 | 60 / 60 | 61 / 60 |
| Hover sans changement | 1 | 2 | 2 |
| Mouvement en réduit (reduced.moving) | non | non | non |
| Texte caché en réduit | 0 | 0 | 0 |
| Héros stabilisé (ms) | null | 2319 | 2250 |

Les FPS desktop sont mesurés en rendu logiciel headless (notes du rapport : plancher, pas une mesure matérielle).

## Clavier

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Arrêts de tabulation | 12 | 12 | 3 |
| Focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Lien d'évitement en premier (`skipLinkFirst`) | false | false | false |
| Focus bloqué | non | non | non |

Le premier arrêt de tabulation de l'accueil et de la carte est le lien « Aller au contenu ». Le champ `skipLinkFirst` vaut `false` sur les trois pages.

## Audit (`audit.mjs`)

Sortie : `0 FAIL, 6 WARN`. Lignes WARN :

- `/dumont-bouge/awwwards/carte/` : phrase répétée 2 fois, « sauce : poivre vert, béarnaise ou Sambre-et-Meuse +3,50 € » (1)
- `/dumont-bouge/awwwards/carte/` : phrase répétée 2 fois, « Banane, chocolat chaud, chantilly 12,00 € » (2)
- `/dumont-bouge/awwwards/carte/` : phrase répétée 2 fois, « Mikado Glace vanille, chantilly, chocolat chaud. » (3)
- `/dumont-bouge/awwwards/carte/` : phrase répétée 2 fois, « Dumont Glace vanille, caramel au beurre salé, chantilly. » (4)
- site : pas de `robots.txt` (5)
- site : pas de `sitemap` (6)

Poids : page la plus lourde `/dumont-bouge/awwwards/` ~1123 KB (HTML 5, JS 61 gz, CSS 6 gz, polices 40, images 1011).
