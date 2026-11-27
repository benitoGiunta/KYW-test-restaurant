# QA build — bienvenue-chez-vous / awwwards

Passe : build · Phase : test · Rôle : captures. Faits seulement, sans analyse de design.

Build : `scripts/q.sh bienvenue-chez-vous-awwwards-build-build` — exit 0, 5 pages construites, sortie dans `dist/bienvenue-chez-vous/awwwards/`.
Serveur local : `dist` sur le port 4502, arrêté après les captures.

## Pages capturées

Le crawl de l'audit trouve 4 pages (`/`, `/carte/`, `/histoire/`, `/reservation/`). Le shoot a produit 3 dossiers de captures (`home`, `404`, `bienvenue-chez-vous-item`). `histoire` et `reservation` ne sont pas capturées.

| Page | Dossier de captures | Planche |
|---|---|---|
| `/` (home) | `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-awwwards-build/home/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-awwwards-build/404/planche.png` |
| `/carte/` | `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-awwwards-build/bienvenue-chez-vous-item/` | `/home/user/KYW-test-restaurant/.shots-bienvenue-chez-vous-awwwards-build/bienvenue-chez-vous-item/planche.png` |

Les planches sont en 4 colonnes, 480 px de large, 19 images chacune.

## Chiffres (report.json)

| Indicateur | home `/` | 404 | `/carte/` |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 1 (color-contrast, serious, 2 nœuds) | 0 |
| Contrast à revoir (axe) | 28 | 0 | 40 |
| CLS bureau / mobile | 0,001 / 0,01 | 0 / 0 | 0 / 0,004 |
| LCP bureau / mobile (ms) | 120 / 1096 | 40 / 244 | 396 / 2408 |
| Chargement load bureau / mobile (ms) | 156 / 2185 | n. d. | n. d. |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments cachés (offenders) bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites bureau / mobile | 8 / 8 | 1 / 1 | 8 / 8 |
| Clavier : skip link en premier | non | non | non |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus bloqué | non | non | non |

Notes :
- La violation axe 404 est `color-contrast` (serious), 2 nœuds.
- Le chargement `load` de la 404 n'est pas relevé dans le report.
- Le `loaderMs` de la home est null (pas de loader).

## Audit (`audit.mjs`)

Journal : `.logs/bienvenue-chez-vous-awwwards-build-audit.log`.
- Résultat : 0 FAIL, 4 WARN.
- WARN `/histoire/` : meta description de 172 caractères (cible 50 à 160).
- WARN `/reservation/` : phrase répétée 5 fois, « 12 h à 13 h 30, 19 h 30 à 21 h ».
- WARN site : pas de robots.txt.
- WARN site : pas de sitemap (le build en crée pourtant un : `sitemap-index.xml` dans `dist/`, non détecté par l'audit).
- Poids de la page `/` : environ 1046 Ko (HTML 5, JS 6 gz, CSS 6 gz, polices 77, images 952).

## Autres points relevés

- Le FPS bureau est mesuré en headless sur GPU logiciel (plancher, pas une mesure réelle).
- Le shoot a été relancé une fois : la première commande, refusée par le hook de sobriété (`curl -s -o`), n'a pas démarré le serveur. Le serveur a été relancé ensuite.
