# QA revue 1 : terrasses-de-crupet / awwwards

Faits bruts (captures, rapports, audit). Aucune analyse de design.

## Build
- Commande : `node scripts/build-site.mjs sites/terrasses-de-crupet-awwwards` : exit 0, 5 pages construites, sitemap-index.xml créé.
- Sortie : `dist/terrasses-de-crupet/awwwards/`.

## Captures et planches
Dossier racine : `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-awwwards-revue1/`

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/terrasses-de-crupet/awwwards/`) | `.../home/` | `.../home/planche.png` |
| Carte (`/terrasses-de-crupet/awwwards/carte/`) | `.../terrasses-de-crupet-item/` | `.../terrasses-de-crupet-item/planche.png` |
| Page 404 (sonde `__shoot-missing-page-*`) | `.../404/` | `.../404/planche.png` |

- Le crawl a trouvé 4 pages, dont `/a-propos/` (la plus lourde, ~518 KB). Cette page n'a pas été capturée : `shoot.mjs` a produit 3 dossiers seulement.
- Planches : `planche.py` ignore `--colonnes` et `--largeur` (il lit `4` et `480` comme fichiers). Les planches sont donc en largeur par défaut : 1920 px, 19 images chacune, 5280 px de haut.

## Chiffres par page (`summary.json`, `report.json`)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Débordement horizontal | non | non | non |
| Cibles tactiles trop petites | 0 | 0 | 1 |
| Axe : violations | 0 | 0 | 1 (serious, color-contrast) |
| Axe : contrastNeedsReview | 5 | 10 | 0 |
| LCP bureau (ms, élément) | 56 (img) | 48 (h2) | 32 (p) |
| LCP mobile (ms, élément) | 1952 (img) | 812 (p.lede) | 220 (p) |
| CLS bureau | 0 | 0 | 0 |
| CLS mobile | 0 | 0.001 | 0 |
| FPS bureau / mobile | 60 / 60 | 60 / 60 | 60 / 60 |
| Premier écran stabilisé (ms) | 2387 | 2243 | 2162 |
| Focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Pas de changement au survol | 0 | 1 | 2 |
| Mouvement en réduit (movingReduced) | non | non | non |
| Texte caché en réduit | 0 | 0 | 0 |
| Arrêts clavier | 12 | 12 | 3 (dont « focus left the page ») |
| Premier arrêt clavier = lien d'évitement | non (champ `skipLinkFirst` = false ; premier arrêt : « Aller au contenu ») | idem | non |
| Mouvement permanent au repos | oui | non | non |

Détail axe, 404 : `color-contrast`, 2 nœuds : `.kyw-footer__note` et un `span`, `#6b787d` sur `#fbfaf8`, 4,36:1 (seuil 4,5:1).

Notes du rapport : le FPS bureau tourne en rendu logiciel (plancher, pas une mesure matérielle) ; le mobile tourne avec ralentissement CPU x4.

## Audit (`audit.mjs`)
- 0 FAIL, 2 WARN :
  - WARN site : pas de robots.txt
  - WARN site : pas de sitemap (le build indique pourtant `sitemap-index.xml` créé dans `dist/`)
- Poids de la page la plus lourde (`/a-propos/`) : ~518 KB ; HTML 4, JS 61 (gz), CSS 4 (gz), polices 98, images 351.

## Journaux
- `.logs/terrasses-de-crupet-awwwards-revue1-build.log`, `-shoot.log`, `-audit.log`, `-planche-*.log`.
- Serveur 4502 arrêté après les captures.
