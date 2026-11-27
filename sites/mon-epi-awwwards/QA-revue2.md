# QA revue 2 — mon-epi / awwwards (captures, planches, audit)

Build : `scripts/q.sh mon-epi-awwwards-revue2-build` exit 0 (5 pages construites, `dist/mon-epi/awwwards/`).
Serveur : `.claude/skills/awwwards/scripts/serve.mjs dist --port 4502`, arrêté après les captures.
Journaux : `.logs/mon-epi-awwwards-revue2-*.log`.

## Captures et planches

| Page | Dossier de captures | Planche | Fichiers |
|---|---|---|---|
| Accueil `/mon-epi/awwwards/` | `/home/user/KYW-test-restaurant/.shots-mon-epi-awwwards-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-mon-epi-awwwards-revue2/home/planche.png` | 37 fichiers, dont 6 `m-*` |
| Carte `/mon-epi/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-mon-epi-awwwards-revue2/mon-epi-item/` | `/home/user/KYW-test-restaurant/.shots-mon-epi-awwwards-revue2/mon-epi-item/planche.png` | 6 `m-*` |
| 404 (`/__shoot-missing-page-…`) | `/home/user/KYW-test-restaurant/.shots-mon-epi-awwwards-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-mon-epi-awwwards-revue2/404/planche.png` | 6 `m-*` |

Chaque planche fait 1920 x 5280 px et réunit 19 images. Les options `--colonnes 4 --largeur 480` n'ont pas été lues par `planche.py` (les valeurs sont prises pour des fichiers et ignorées, avertissement « ignoré 4 » / « ignoré 480 »). La largeur obtenue (1920 = 4 x 480) correspond quand même à ces options.

## Chiffres des report.json

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (serious 0 ; 16 contrastes à vérifier) | 0 (serious 0 ; 52 contrastes à vérifier) | 1 (serious 1 : `color-contrast`, `.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4,36:1 pour 4,5:1 requis) |
| CLS desktop | 0 | 0,014 | 0 |
| CLS mobile (throttled) | 0 | 0,004 | 0 |
| LCP desktop (élément) | 72 ms (img) | 148 ms (div.split-line) | 40 ms (p) |
| LCP mobile (élément) | 976 ms (img) | 896 ms (p) | 232 ms (p) |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments cachés (glHidden) desktop | 0 | 0 | 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil » 128x20) |
| Focus clavier sans indicateur visible | 0 | 0 | 0 |
| Focus clavier invisible | 0 | 0 | 0 |
| Focus bloqué (stuck) | non | non | non |
| Lien d'évitement en premier | non | non | non |
| Survols testés (hover) | 5 | 4 | 2 |
| Mouvement en réduit (reduced motion) | non | non | non |
| FPS de défilement desktop (plancher, GPU logiciel) | 60 (pire trame 17 ms) | 60 (pire trame 17 ms) | n.d. |

Temps de chargement : accueil 97 ms desktop, 1 840 ms mobile (chargement) ; carte 102 ms desktop, 1 736 ms mobile.
Poids de l'accueil : ~775 KB (html 5, JS 61 gz, CSS 6 gz, polices 54, images 649).
Notes du rapport : le FPS desktop tourne en GPU logiciel (plancher, pas une mesure matérielle) ; les chiffres mobiles à 4x de ralentissement CPU et 4G lente sont ceux à retenir.

## Audit (`audit.mjs`)

- FAIL : 0
- WARN : 2
  - `site` : no robots.txt
  - `site` : no sitemap (le build a pourtant écrit `sitemap-index.xml` dans `sites/mon-epi-awwwards/dist`)
- Pages explorées : 4 ; page la plus lourde `/mon-epi/awwwards/`.

## Fait à noter

- Le shoot a été lancé avant le démarrage du serveur 4502 (appel d'amorce refusé par le hook de sobriété). Le serveur a été relancé ensuite ; le shoot a terminé sans erreur (3 pages, 404 inclus).
- Aucun fichier source modifié, aucun commit.
