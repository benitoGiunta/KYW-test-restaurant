# QA revue 1 : le-brunchist / awwwards (captures)

Build : `pnpm build:site` OK (exit 0), sortie `dist/le-brunchist/awwwards/`. Serveur local 127.0.0.1:4502 arrêté après capture.
Journaux : `.logs/le-brunchist-awwwards-revue1-*.log`.

## Captures par page

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/le-brunchist/awwwards/` | `/home/user/KYW-test-restaurant/.shots-le-brunchist-awwwards-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-le-brunchist-awwwards-revue1/home/planche.png` |
| Carte `/carte/` | `/home/user/KYW-test-restaurant/.shots-le-brunchist-awwwards-revue1/le-brunchist-item/` | `/home/user/KYW-test-restaurant/.shots-le-brunchist-awwwards-revue1/le-brunchist-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-le-brunchist-awwwards-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-le-brunchist-awwwards-revue1/404/planche.png` |

Remarques : la planche a été faite sans `--colonnes` ni `--largeur` (`planche.py` a ignoré ces deux options et affiché « ignoré »), soit 1920 x 5280 px, 19 images chacune. Aucun fichier `m-*.png` n'a été produit. L'audit a crawlé 4 pages, alors que la capture n'en a dossiers que pour 3 (accueil, carte, 404) : la quatrième page n'a pas de dossier de captures.

## Chiffres (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (total / serious) | 0 / 0 | 0 / 0 | 1 / 1 (`color-contrast`) |
| Contraste à vérifier (axe) | 4 | 2 | 0 |
| CLS bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP bureau (ms) | 112 (span) | 164 (div.split-line) | 36 (p) |
| LCP mobile (ms) | 952 (p.hero__lede) | 952 (p.note) | 236 (p) |
| Chargement load bureau / mobile (ms) | 96 / 1830 | 94 / 1767 | 18 / 419 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments en débordement bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites bureau / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil 128x20 ») |
| FPS défilement bureau / mobile | 60 / 60 | 60 / 60 | 61 / 60 |
| Clavier : arrêts de tabulation | 12 | 12 | 3 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus bloqué | non | non | non |

Le FPS bureau est mesuré en headless sur GPU logiciel (plancher, pas une mesure réelle). Le LCP mobile est mesuré en throttling 4x CPU et 4G lente.

## Audit (`audit.mjs`)

- FAIL : 0
- WARN : 8
  - Accueil : phrase répétée 5 fois « 9 h 30 à 15 h 30 ».
  - Réservation : phrases répétées 2 fois pour chaque jour (mercredi à dimanche, « 9 h 30 à 15 h 30 »), 5 WARN.
  - Site : pas de `robots.txt`, pas de `sitemap`.
- Pages crawlées : 4. Poids de la page la plus lourde (accueil) : environ 135 Ko, 61 JS (gz), 6 CSS (gz), 54 polices, 11 images.

## Lignes FAIL

Aucune.
