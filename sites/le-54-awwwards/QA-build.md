# QA build : le-54 awwwards (rôle captures)

Source : `sites/le-54-awwwards/`, build dans `dist/le-54/awwwards/` (exit 0, 5 pages construites).
Serveur local : `dist/` sur 127.0.0.1:4502 (arrêté après les captures).
Journaux : `.logs/le-54-awwwards-build-*.log`.

## Captures et planches

| Page | Dossier de captures | Planche | Rapport |
|---|---|---|---|
| Accueil `/le-54/awwwards/` | `/home/user/KYW-test-restaurant/.shots-le-54-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-le-54-awwwards-build/home/planche.png` | `.../home/report.json` |
| Carte `/le-54/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-le-54-awwwards-build/le-54-item/` | `/home/user/KYW-test-restaurant/.shots-le-54-awwwards-build/le-54-item/planche.png` | `.../le-54-item/report.json` |
| Page 404 (URL inexistante, sondée par le crawl) | `/home/user/KYW-test-restaurant/.shots-le-54-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-le-54-awwwards-build/404/planche.png` | `.../404/report.json` |

Le crawl a relevé 4 pages (dont la 404 sondée). Le journal de capture indique 3 dossiers de pages, réservation comprise dans l'audit mais non capturée.

Note outil : `scripts/planche.py` lit ses options `--colonnes` et `--largeur` de façon incorrecte (elles sont prises pour des fichiers source, avec « ignoré 4 » et « ignoré 480 » dans le journal). Les planches ont été produites avec les valeurs par défaut (3 colonnes, 640 px), soit 1920 px de large.

## Chiffres des rapports

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 2 (serious : `document-title`, `html-has-lang`) |
| Contraste à vérifier (axe) | 9 | 8 | 0 |
| LCP desktop | 136 ms | 84 ms | 40 ms (élément `pre`) |
| LCP mobile (throttlé) | 1032 ms | 992 ms | 244 ms (élément `pre`) |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Titre (`<title>`) | « Le 54 \| Table gastronomique à Dave, Namur » | « La carte \| Le 54 » | vide |
| H1 | « Le 54 » | « La carte » | aucun |
| WebGL activé / masqué | non / aucun | non / aucun | non / aucun |
| FPS défilement desktop (pire trame) | 60 (50 ms) | 60 (17 ms) | 57 (100 ms) |
| Clavier : arrêts de focus | 12 | 12 | 1 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier, bloqué | non / non | non / non | non / non |
| Survol : cibles en couleur seule / recouvertes / sans changement | 0 / 0 / 0 | 1 / 0 / 0 | 0 / 0 / 0 |
| Mouvement en réduit : texte masqué / animation active | 0 / non | 0 / non | 0 / non |

Les lignes « ajustements » du rapport précisent que le FPS desktop tourne en rendu logiciel (plancher, non représentatif) et que le mobile est mesuré avec un ralentissement CPU x4 en 4G lente. Le chiffre fiable pour le mobile est donc le LCP et le FPS mobile indiqués dans le rapport.

## Audit (`audit.mjs`)

Sortie : `0 FAIL, 4 WARN`. Le poids de la page la plus lourde (`/le-54/awwwards/`) est d'environ 548 KB ; HTML 5, JS 61 (gz), CSS 6 (gz), polices 78, images 398.

Lignes WARN :
1. `/le-54/awwwards/reservation/` : phrase répétée 3 fois : « midi, 12 h à 14 h · soir, 18 h 30 à 21 h ».
2. `site` : la page 404 n'a pas de `<h1>`.
3. `site` : pas de `robots.txt`.
4. `site` : pas de `sitemap`.

Pas de ligne FAIL.

## Captures non capturées

La page `/le-54/awwwards/reservation/` apparaît dans l'audit (WARN n° 1) mais n'a pas de dossier de captures : le crawl n'a produit que 3 dossiers.
