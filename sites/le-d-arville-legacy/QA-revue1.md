# QA revue 1 : le-d-arville / legacy (phase test, rôle captures)

Faits seulement. Serveur local `dist/` sur 127.0.0.1:4503, arrêté après usage. Build `sites/le-d-arville-legacy` : exit 0, 9 pages construites.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/le-d-arville/legacy/`) | `/home/user/KYW-test-restaurant/.shots-le-d-arville-legacy-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-legacy-revue1/home/planche.png` |
| Carte (`/le-d-arville/legacy/carte/`) | `/home/user/KYW-test-restaurant/.shots-le-d-arville-legacy-revue1/le-d-arville-item/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-legacy-revue1/le-d-arville-item/planche.png` |
| 404 (URL inexistante) | `/home/user/KYW-test-restaurant/.shots-le-d-arville-legacy-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-legacy-revue1/404/planche.png` |

Écarts constatés :
- `shoot.mjs --crawl` a annoncé 3 pages photographiées ; l'audit a crawlé 8 pages (accueil, carte, photos, chambres, séminaires, chèque-cadeau, traiteur-noël, réservation). Les pages photos, chambres, séminaires, chèque-cadeau, traiteur-noël et réservation n'ont pas de dossier de captures.
- `planche.py` : les options `--colonnes 4 --largeur 480` ont été lues comme fichiers (« ignoré 4 », « ignoré 480 »). Les planches font 1920 x 5280 px, 19 images chacune.

## Report.json (chiffres utiles)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (total) | 0 | 0 | 1 règle (`color-contrast`, sérieux, 2 nœuds) |
| Contraste à vérifier (axe) | 2 | 0 | 0 |
| CLS bureau / mobile | 0.001 / 0.004 | 0.003 / 0.003 | 0 / 0 |
| LCP bureau (ms, élément) | 460 (img) | 432 (p) | 32 (p) |
| LCP mobile (ms, élément) | 932 (img) | 740 (p) | 232 (p) |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Petites cibles bureau / mobile | 0 / 0 | 0 / 0 | 1 / 1 |
| Éléments hors zone (offenders) bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : arrêts de focus | 12 | 12 | 3 |
| Clavier : focus invisible | 1 | 1 | 0 |
| Clavier : focus absent | 0 | 0 | 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus bloqué | non | non | non |
| Mouvement réduit : écran encore en mouvement | non | non | non |
| Texte caché (mouvement réduit) | 0 | 0 | 0 |
| FPS défilement bureau / mobile | 60 / 61 | 60 / 60 | 61 / 61 |

Détail des violations axe sur la 404 : `.kyw-footer__note` et un `span`, couleur `#6b787d` sur `#fbfaf8`, contraste 4.36:1 (seuil 4.5:1).

Note des rapports : les FPS bureau tournent en rendu logiciel headless (plancher, pas une mesure réelle) ; le mobile est en ralentissement CPU x4 et 4G lente.

## Audit (`audit.mjs`)

- FAIL : 0
- WARN : 10
  - Site : pas de `robots.txt`, pas de `sitemap`.
  - Police en TTF (`ieVq2YZDLWuGJpnzaiwFXS9tYvBRzyFLlZg_f_Ncs2Za4Q.ttf`) sur les 8 pages crawlées ; l'audit demande du woff2.
- Poids de la page la plus lourde : `/le-d-arville/legacy/photos/`, environ 2939 KB (images 2825 KB, polices 103 KB, CSS 6 KB gzip, JS 1 KB gzip).
