# QA revue 1 : le-ponti-2 / awwwards

Source : `dist/le-ponti-2/awwwards/`, servi sur `http://127.0.0.1:4502/le-ponti-2/awwwards/` (serveur arrêté après les captures).
Build : `scripts/q.sh le-ponti-2-awwwards-revue1-build` : exit 0, 5 pages construites.
Captures : `scripts/q.sh le-ponti-2-awwwards-revue1-shoot` : exit 0, 3 pages capturées (crawl + navigation). Journal : `.logs/le-ponti-2-awwwards-revue1-shoot.log`.
Audit : `scripts/q.sh le-ponti-2-awwwards-revue1-audit` : exit 0. Journal : `.logs/le-ponti-2-awwwards-revue1-audit.log`.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/le-ponti-2/awwwards/` | `/home/user/KYW-test-restaurant/.shots-le-ponti-2-awwwards-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-le-ponti-2-awwwards-revue1/home/planche.png` |
| La carte `/le-ponti-2/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-le-ponti-2-awwwards-revue1/le-ponti-2-item/` | `/home/user/KYW-test-restaurant/.shots-le-ponti-2-awwwards-revue1/le-ponti-2-item/planche.png` |
| Page 404 | `/home/user/KYW-test-restaurant/.shots-le-ponti-2-awwwards-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-le-ponti-2-awwwards-revue1/404/planche.png` |

Note : `scripts/planche.py` ignore les options `--colonnes` et `--largeur` (traitées comme des fichiers, « ignoré 4 », « ignoré 480 ») ; les planches sont produites en largeur 1920 px avec 19, 19 et 14 images.

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 | 0 | 2 (`document-title`, `html-has-lang`) |
| Contraste à vérifier (axe) | 13 | 7 | 0 |
| LCP desktop | 192 ms (img) | 112 ms (h1) | 36 ms (pre) |
| LCP mobile (ralenti) | 2272 ms (img) | 2176 ms (p) | 220 ms (pre) |
| CLS desktop | 0.001 | 0 | 0 |
| CLS mobile | 0.001 | 0 | 0 |
| FPS scroll desktop (logiciel) | 60 | 60 | 60 |
| FPS scroll mobile | 60 | 60 | 61 |
| Débordement horizontal | non | non | non |
| Cibles tactiles trop petites | 0 | 0 | 0 |
| Texte caché en mouvement réduit | 0 | 0 | 0 |
| Focus clavier invisible | 0 | 0 | 0 |
| Focus sans indicateur visible | 0 | 0 | 0 |
| Focus bloqué | non | non | non |
| Arrêts de tabulation | 12 | 12 | 1 |
| Lien d'évitement en premier (`keyboard.skipLinkFirst`) | false | false | false |
| Survol sans changement | 1 | 3 | 0 |
| Mouvement permanent au repos | oui | non | non |
| Stabilisation du premier écran (desktop) | 2628 ms | 2422 ms | 2193 ms |
| Chargement load (desktop / mobile) | 182 / 3431 ms | 153 / 1955 ms | 29 / 212 ms |
| Hauteur de page (desktop / mobile) | 5258 / 4635 px | 12244 / 12774 px | 900 / 2121 px |

Notes de la mesure : FPS desktop mesurés en rendu logiciel (plancher, non représentatif). Mobile en ralentissement CPU x4 et 4G lente.

## Audit (`audit.mjs`)

- 0 FAIL, 3 WARN.
- WARN site : la page 404 n'a pas de `<h1>`.
- WARN site : pas de `robots.txt`.
- WARN site : pas de `sitemap`.
- Audit : 4 pages crawlées ; page la plus lourde `/le-ponti-2/awwwards/` ~664 KB (html 5, JS 61 gz, CSS 6 gz, polices 126, images 467).
- Note : le crawl des captures (`shoot.mjs --crawl`) n'a retenu que 3 pages (accueil, carte, 404) ; l'audit en compte 4.

## Anomalies relevées (faits)

- Page 404 : 2 violations axe sérieuses (`document-title`, `html-has-lang`) et 0 `<h1>` (WARN audit).
- Accueil : 13 contrastes à vérifier par axe (non classés en violation).
- Accueil : `idleMotion` vrai (mouvement permanent au repos) ; pas de `settledMs` en mobile (`null`, encore en mouvement au plafond).
- `keyboard.skipLinkFirst` vaut false sur les trois pages, alors que la liste des arrêts commence par « Aller au contenu » (le champ ne doit pas être lu seul).

Fichiers sources non modifiés, aucun commit. Serveur 4502 arrêté.
