# QA build : huile-sur-le-feu / legacy

Passe : build · Rôle : captures · Serveur : `dist/` servi sur `http://127.0.0.1:4503/huile-sur-le-feu/legacy/` (arrêté en fin de passe).

## Build

- `scripts/build-site.mjs sites/huile-sur-le-feu-legacy` : exit 0, 6 pages générées (404, boutique, contact, index, menu, restaurant), sitemap créé.
- Journal : `.logs/huile-sur-le-feu-legacy-build-build.log`.

## Captures (shoot.mjs --crawl --nav)

Le shoot indique « 3 pages shot » : captures faites pour 3 dossiers seulement. L'audit a crawlé 5 pages (voir plus bas). Les pages boutique, menu et contact n'ont pas de capture dans ce passage.

| Page | Dossier de captures | Planche |
|---|---|---|
| `/huile-sur-le-feu/legacy/` (accueil) | `.shots-huile-sur-le-feu-legacy-build/home/` | `.shots-huile-sur-le-feu-legacy-build/home/planche.png` |
| `/huile-sur-le-feu/legacy/restaurant/` | `.shots-huile-sur-le-feu-legacy-build/huile-sur-le-feu-item/` | `.shots-huile-sur-le-feu-legacy-build/huile-sur-le-feu-item/planche.png` |
| 404 (`/__shoot-missing-page-…`) | `.shots-huile-sur-le-feu-legacy-build/404/` | `.shots-huile-sur-le-feu-legacy-build/404/planche.png` |

Synthèse : `.shots-huile-sur-le-feu-legacy-build/summary.json`. Journal : `.logs/huile-sur-le-feu-legacy-build-shoot.log`.

## Chiffres par page (report.json)

| Page | Erreurs console | Requêtes en échec | LCP desktop / mobile (ms) | CLS desktop / mobile | Débordement X desktop / mobile | Petites cibles mobile | Axe sérieux | Focus invisible / sans focus visible | Hover sans changement | Couleur seule | Texte caché (reduced) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| accueil | 0 | 0 | 508 / 908 | 0,055 / 0,001 | non / non | 4 | 1 (color-contrast ×1) | 0 / 0 | 3 | 4 | 0 |
| restaurant | 0 | 0 | 560 / 896 | 0,001 / 0,006 | non / non | 2 | 1 (color-contrast ×1) | 0 / 0 | 3 | 4 | 0 |
| 404 | 0 | 0 | 40 / 236 | 0 / 0 | non / non | 0 | 2 (document-title ×1, html-has-lang ×1) | 0 / 0 | 0 | 0 | 0 |

Autres points relevés :
- Accueil, FPS scroll desktop 61, mobile 60 ; pire frame 17 ms. Pas de mouvement en idle, `movingReduced` false.
- Accueil, parcours clavier : 12 arrêts, le premier est le lien « Aller au contenu » ; le champ `skipLinkFirst` du rapport vaut false malgré cela (champ non vérifié). Pas de piège clavier (`stuck` false).
- Restaurant, parcours clavier : 12 arrêts, pas de focus invisible, pas de piège.
- 404 : parcours clavier sans lien à suivre (« body: focus left the page »), `--nav` n'a trouvé aucun lien cliquable.
- Petites cibles mobile (accueil) : « Voir toute la carte » 131×21, « Voir la boutique » 115×21, « Découvrir la maison » 145×21, « Itinéraire » 65×21.
- Petites cibles mobile (restaurant) : « Découvrir la boutique » 157×21, « Itinéraire » 65×21.
- Notes du rapport : FPS desktop mesuré sur GPU logiciel (plancher, non représentatif) ; les chiffres mobiles (4× ralentissement CPU, slow 4G) sont ceux qui comptent.

Journaux : `.shots-huile-sur-le-feu-legacy-build/<page>/report.json` (champs `errors`, `failed`, `desktop`, `mobile`, `a11y`, `keyboard`, `hover`, `reduced`).

## Audit (audit.mjs)

- 5 pages crawlées : `/`, `/boutique/`, `/contact/`, `/menu/`, `/restaurant/`.
- Résultat : **0 FAIL, 53 WARN** (54 lignes WARN dans le journal, dont une ligne de synthèse ; décompte par ligne `^WARN` = 53).
- Poids : page la plus lourde `/restaurant/`, ~931 KB ; HTML 4, JS 1 (gz), CSS 5 (gz), polices 266, images 655.
- Exemples de WARN : og:title, og:description, og:image et twitter:card absents sur `/` et `/restaurant/` ; phrase répétée 5× (« 12 h 00 à 14 h 30 18 h 00 à 21 h 15 ») sur `/`.
- Journal : `.logs/huile-sur-le-feu-legacy-build-audit.log`.
