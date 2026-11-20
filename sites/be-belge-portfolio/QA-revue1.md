# QA revue 1 : be-belge, variante portfolio (phase test, rôle captures)

Build : `sites/be-belge-portfolio` → `dist/be-belge/portfolio/` (exit 0, 7 pages Astro).
Serveur local : `dist` sur 127.0.0.1:4501, arrêté après contrôle.

## Captures et planches

Dossier : `/home/user/KYW-test-restaurant/.shots-be-belge-portfolio-revue1/`

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/be-belge/portfolio/` | `.shots-be-belge-portfolio-revue1/home/` (report.json + d-*.png, m-*.png, h-*.png) | `.shots-be-belge-portfolio-revue1/home/planche.png` |
| Menu `/be-belge/portfolio/menu/` | `.shots-be-belge-portfolio-revue1/be-belge-item/` | `.shots-be-belge-portfolio-revue1/be-belge-item/planche.png` |
| 404 (page inexistante) | `.shots-be-belge-portfolio-revue1/404/` | `.shots-be-belge-portfolio-revue1/404/planche.png` |

Couverture : le shoot a produit 3 dossiers de pages (accueil, menu, 404). L'audit a crawlé 6 pages (dont `/reservation/`, `/carte/`, `/maison/`, `/privatisation/` selon les avertissements). Les pages autres que l'accueil, le menu et le 404 n'ont pas de capture dans cette passe.

Planches : `planche.py` a bien produit 1920 x 5280 px (4 colonnes, 480 px) et 19 images par planche. Il affiche aussi « ignoré 4 » et « ignoré 480 » : ses options `--colonnes` et `--largeur` ne sont pas lues correctement, les valeurs sont traitées comme fichiers, sans effet sur le résultat.

## Chiffres par page (report.json)

| Mesure | Accueil | Menu | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (21 contrast needs-review) | 0 (3 contrast needs-review) | 1 serious : color-contrast x2 (`.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4.36:1, seuil 4.5:1) |
| LCP desktop | 116 ms (img) | 84 ms (p) | 36 ms (p) |
| LCP mobile | 1300 ms (p.hero__accroche) | 1136 ms (p) | 256 ms (p) |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments cachés (texte masqué, reduced) | 0 | 0 | 0 |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 |
| Fluidité scroll mobile (fps) | 60 | 60 | 61 |
| Chargement mobile (ms) | 4408 | 2347 | 419 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus bloqué | non | non | « body : focus left the page » |
| Lien d'évitement en premier | false (il apparaît en premier dans la liste des arrêts) | false | false |
| Survol sans changement | 2 au total (shoot) | voir report | 2 (h-01 et h-02) |

Note : pour le menu, le shoot ne donne pas de décompte séparé ; les chiffres par page sont ceux du report.json.

## Audit SEO et métadonnées (audit.mjs)

- FAIL : 0
- WARN : 5
  - `/be-belge/portfolio/` : phrase répétée 2 fois : « mercredi, jeudi, vendredi et dimanche, 12:00 à 13:30 »
  - `/be-belge/portfolio/` : phrase répétée 2 fois : « jeudi, vendredi et samedi, 19:00 à 20:30 »
  - `/be-belge/portfolio/reservation/` : phrase répétée 2 fois : « 12:00 à 13:30, 19:00 à 20:30 »
  - site : pas de robots.txt
  - site : pas de sitemap (le build a pourtant créé `sitemap-index.xml` dans `sites/be-belge-portfolio/dist`, à vérifier à l'URL servie)
- 6 pages crawlées, page la plus lourde `/be-belge/portfolio/` : ~1585 Ko (HTML 5, JS 6 gz, CSS 6 gz, polices 109, images 1459).

## Pièges relevés

- Le shoot a crawlé 3 pages seulement alors que l'audit en voit 6 : la couverture de capture est incomplète.
- `planche.py` : options ignorées (voir ci-dessus), planches produites quand même.
