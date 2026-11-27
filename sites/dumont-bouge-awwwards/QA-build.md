# QA build : dumont-bouge / awwwards (passe build, phase test)

Build : `scripts/q.sh dumont-bouge-awwwards-build-build` : exit 0, sortie dans `dist/dumont-bouge/awwwards/` (5 pages, 1,98 s).
Serveur local : port 4502, arrêté après les captures (PID 14807).

## Captures et planches

| Page | Dossier de captures | Planche | Nombre de PNG |
|---|---|---|---|
| Accueil `/dumont-bouge/awwwards/` | `/home/user/KYW-test-restaurant/.shots-dumont-bouge-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-dumont-bouge-awwwards-build/home/planche.png` | 39 |
| Carte `/dumont-bouge/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-dumont-bouge-awwwards-build/dumont-bouge-item/` | `/home/user/KYW-test-restaurant/.shots-dumont-bouge-awwwards-build/dumont-bouge-item/planche.png` | 39 |
| 404 (page introuvable, crawlée) | `/home/user/KYW-test-restaurant/.shots-dumont-bouge-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-dumont-bouge-awwwards-build/404/planche.png` | 27 |

Les rapports détaillés sont dans `report.json` de chaque dossier.

## Chiffres par page (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (toutes gravités) | 0 | 0 | 1 (`color-contrast`, sérieux, 2 nœuds : `.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4,36:1 pour 4,5:1 requis) |
| Contraste à vérifier (axe needs-review) | 24 | 14 | 0 |
| CLS bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP bureau (ms) | 156 | 196 | 48 |
| LCP mobile (ms) | 1836 | 2472 | 272 |
| Chargement load bureau / mobile (ms) | 120 / 4243 | 167 / 2434 | 27 / 441 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments cachés (glHidden) bureau | aucun | aucun | aucun |
| Cibles tactiles trop petites bureau / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil », 128x20) |
| FPS de défilement bureau / mobile (worst frame ms) | 60 (17) / 61 (17) | 60 (17) / 60 (17) | 60 (17) / 59 (50) |
| Clavier : arrêts de focus | 12 | 12 | 3 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus invisible / sans focus visible / bloqué | 0 / 0 / non | 0 / 0 / non | 0 / 0 / non |
| Survol : cibles testées / ayant changé | 7 / 0 | 7 / 0 | 2 / 0 |
| Mouvement réduit : texte caché / mouvement | 0 / non | 0 / non | 0 / non |
| Titre h1 mobile | « Dumont Bouge » | « La carte » | « Page introuvable » |

Notes du rapport : le FPS bureau tourne en rendu logiciel headless (plancher, pas une mesure matérielle) ; le mobile est à 4x de ralentissement CPU, slow 4G.

## Audit (`audit.mjs`)

Résultat : **0 FAIL, 7 WARN**, 4 pages crawlées, page la plus lourde `/dumont-bouge/awwwards/` (~1123 KB ; HTML 5, JS 61 gz, CSS 6 gz, polices 40, images 1011).

WARN :
1. `/dumont-bouge/awwwards/carte/` : saut de niveau de titre h2 vers h4.
2. `/dumont-bouge/awwwards/carte/` : phrase répétée 2x « sauce : poivre vert, béarnaise ou Sambre-et-Meuse +3,50 €. »
3. `/dumont-bouge/awwwards/carte/` : phrase répétée 2x « Banane, chocolat chaud, chantilly 12,00 € »
4. `/dumont-bouge/awwwards/carte/` : phrase répétée 2x « Mikado Glace vanille, chantilly, chocolat chaud. »
5. `/dumont-bouge/awwwards/carte/` : phrase répétée 2x « Dumont Glace vanille, caramel au beurre salé, chantilly. »
6. site : pas de `robots.txt`
7. site : pas de `sitemap`

Journal de l'audit : `/home/user/KYW-test-restaurant/.logs/dumont-bouge-awwwards-build-audit.log`.
