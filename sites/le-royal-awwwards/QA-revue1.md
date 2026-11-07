# QA revue 1 : le-royal / awwwards (captures et audit)

Build : `scripts/q.sh le-royal-awwwards-revue1-build`, exit 0 (journal `.logs/le-royal-awwwards-revue1-build.log`).
Serveur local : `dist/` sur `http://127.0.0.1:4502/le-royal/awwwards/`, arrêté après usage.
Captures : `.shots-le-royal-awwwards-revue1/` (journal `.logs/le-royal-awwwards-revue1-shoot.log`).
Audit : `.logs/le-royal-awwwards-revue1-audit.log`.

Limite de périmètre : la capture n'a porté que sur 3 dossiers. La page `a-propos` et la page `reservation` existent dans le build mais n'ont pas été capturées. La page 404 a été obtenue avec une URL hors du chemin du site (`/__shoot-missing-page-…`), donc elle reflète la réponse de repli du serveur local et non `404.astro`.

## Pages capturées

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/le-royal/awwwards/`) | `/home/user/KYW-test-restaurant/.shots-le-royal-awwwards-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-le-royal-awwwards-revue1/home/planche.png` |
| Carte (`/le-royal/awwwards/carte/`) | `/home/user/KYW-test-restaurant/.shots-le-royal-awwwards-revue1/le-royal-item/` | `/home/user/KYW-test-restaurant/.shots-le-royal-awwwards-revue1/le-royal-item/planche.png` |
| 404 (URL hors site, repli serveur) | `/home/user/KYW-test-restaurant/.shots-le-royal-awwwards-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-le-royal-awwwards-revue1/404/planche.png` |

Rapport par page : `report.json` dans chaque dossier. Synthèse : `.shots-le-royal-awwwards-revue1/summary.json`.

## Chiffres par page (source : report.json)

| Mesure | Accueil | Carte | 404 (repli) |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 | 0 | 2 (`document-title`, `html-has-lang`) |
| Contraste à vérifier (axe) | 6 | 3 | 0 |
| LCP desktop (ms, élément) | 112 (img) | 60 (h1.display) | 44 (pre) |
| LCP mobile (ms, élément) | 2348 (img) | 892 (h1.display) | 204 (pre) |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS scroll desktop / mobile | 60 / 60 | 60 / 60 | 61 / 60 |
| Débordement horizontal | non (desktop et mobile) | non (desktop et mobile) | non (desktop et mobile) |
| Éléments hors cadre (offenders) | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites | 0 / 0 | 0 / 0 | 0 |
| Texte caché (hiddenText, réduit) | 0 | 0 | 0 |
| Éléments WebGL cachés | 0 | 0 | 0 |
| Clavier : arrêts de focus | 12 | 12 (liste tronquée à 12) | 1 (focus quitte la page) |
| Clavier : focus invisible / absent | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier (`skipLinkFirst`) | false | false | false |
| Clavier : focus bloqué | non | non | non |
| Mouvement réduit (`moving`) | false | false | false |

Notes :
- Les FPS desktop sont mesurés en headless sur GPU logiciel, selon le rapport : c'est un plancher, pas une mesure matérielle.
- Mobile : LCP et FPS mesurés sous ralentissement 4x CPU et 4G lente, selon le rapport.
- Accueil : 7 cibles de survol testées. Le rapport indique, pour `Appeler le 081 22 01 33`, un changement au survol (couleur, décoration de texte, couleur de bordure, transformation).

## Audit (`audit.mjs`, 4 pages explorées depuis la racine locale)

- Bilan : **0 FAIL, 3 WARN**.
- WARN `404 page has no <h1>` : « design it: a way back, in the site voice ».
- WARN `no robots.txt`.
- WARN `no sitemap`.
- Poids de la page la plus lourde : `/le-royal/awwwards/` environ 927 KB (html 5, JS 60 gz, CSS 5 gz, fonts 66, images 791, unités selon l'audit).
- Les deux WARN robots/sitemap sont mesurés à la racine du serveur local (`dist/`) : il faut vérifier s'ils valent pour le site déployé sous `/le-royal/awwwards/`.

## Violations axe relevées

- Accueil : aucune violation.
- Carte : aucune violation.
- 404 (repli serveur) : `document-title` (html sans `<title>`) et `html-has-lang` (html sans `lang`), impact sérieux, chacun sur 1 nœud `html`. Ces deux violations concernent la réponse de repli du serveur local et non forcément `404.astro`.
