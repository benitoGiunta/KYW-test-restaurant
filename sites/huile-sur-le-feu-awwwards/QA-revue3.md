# QA revue 3 : huile-sur-le-feu / awwwards

Passe : revue3 · Rôle : captures · Build : `scripts/build-site.mjs` (exit 0, 5 pages, `dist/huile-sur-le-feu/awwwards/`)
Serveur : `serve.mjs dist --port 4502` (arrêté après la passe). Crawl `--crawl --nav` : 3 pages photographiées, audit : 4 pages crawlées.

## Dossiers de captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/huile-sur-le-feu/awwwards/` | `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-awwwards-revue3/home/` (report.json, d-*.png, m-*.png) | `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-awwwards-revue3/home/planche.png` (1920 x 5280, 19 images) |
| Carte `/huile-sur-le-feu/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-awwwards-revue3/huile-sur-le-feu-item/` | `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-awwwards-revue3/huile-sur-le-feu-item/planche.png` (1920 x 5280, 19 images) |
| 404 (`__shoot-missing-page-*`) | `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-awwwards-revue3/404/` | `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-awwwards-revue3/404/planche.png` (1920 x 4224, 14 images) |

Résumé global : `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-awwwards-revue3/summary.json`.

Note sur les planches : `scripts/planche.py` a signalé « ignoré 4 » et « ignoré 480 » (les valeurs de `--colonnes 4 --largeur 480` ont été lues comme fichiers). Les planches sortent quand même en 1920 px de large (4 colonnes x 480 px), donc la mise en page demandée est appliquée.

## Chiffres des report.json

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console (`errors`) | 0 | 0 | 0 |
| Requêtes en échec (`failed`) | 0 | 0 | 0 |
| Violations axe (serious) | 0 | 0 | 2 (`document-title`, `html-has-lang`, 1 nœud chacune) |
| Contraste à vérifier (axe) | 7 | 4 | 0 |
| LCP desktop | 576 ms (`p.hero__baseline`) | 164 ms (`div.split-line`) | 48 ms (`pre`) |
| LCP mobile (throttled) | 2356 ms (`img`) | 1152 ms (`p.hero__baseline`) | 220 ms (`pre`) |
| CLS desktop | 0.001 | 0 | 0 |
| CLS mobile | 0 | 0.009 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (`offenders`) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Hauteur de page desktop / mobile (px) | 7930 / 6936 | 9874 / 8577 | 900 / 2121 |
| FPS scroll desktop / mobile | 60 / 60 | 60 / 53 | 60 / 60 |
| Texte caché en réduit (`reduced.hiddenText`) | 0 | 0 | 0 |
| Mouvement en réduit (`reduced.moving`) | false | false | false |
| Clavier : lien d'évitement en premier (`skipLinkFirst`) | false | false | false |
| Clavier : focus non visible / invisible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus bloqué (`stuck`) | false | false | false |
| Titre de page desktop | « L'Huile sur le Feu | Cuisine méditerranéenne, Namur » | idem carte | (absent : violation axe) |

Le chargement LCP mobile de l'accueil (2356 ms) est le chiffre le plus élevé de la passe. Le LCP desktop de l'accueil porte sur `p.hero__baseline`, pas sur une image.

Notes d'outil (extraites du report) : FPS desktop tournent en rendu logiciel headless ; mobile en ralentissement CPU x4 et 4G lente.

Parcours clavier (accueil) : 12 arrêts de tabulation, dans l'ordre : lien « Aller au contenu », logo, « La carte », « L'histoire », « Réserver », « Appeler », « Réserver une table », « Appeler le 081 24 19 03 », « Voir toute la carte », « Ouvrir le plan », « 081 24 19 03 », « Réserver en ligne ».

Survol (accueil, 7 cibles) : réaction à l'effet de survol sur les 7 liens primaires (5 avec changement de propriétés CSS « moves », 2 avec changement de pixels « pixels » : « La carte » et « Appeler »).

## Audit (`audit.mjs`)

Résultat : **0 FAIL, 3 WARN**. Journal : `/home/user/KYW-test-restaurant/.logs/huile-sur-le-feu-awwwards-revue3-audit.log`.

Lignes WARN :
- `site` : 404 page has no `<h1>` (design it: a way back, in the site voice)
- `site` : no robots.txt
- `site` : no sitemap

Poids de la page la plus lourde : `/huile-sur-le-feu/awwwards/`, environ 1027 Ko (HTML 5, JS 61 gz, CSS 6 gz, polices 132, images 823).

## Journaux

- Build : `/home/user/KYW-test-restaurant/.logs/huile-sur-le-feu-awwwards-revue3-build.log`
- Captures : `/home/user/KYW-test-restaurant/.logs/huile-sur-le-feu-awwwards-revue3-shoot.log`
- Audit : `/home/user/KYW-test-restaurant/.logs/huile-sur-le-feu-awwwards-revue3-audit.log`
- Serveur : `/home/user/KYW-test-restaurant/.logs/serve-awwwards.log` (PID arrêté : 28491)

Aucun fichier source modifié. Aucun commit.
