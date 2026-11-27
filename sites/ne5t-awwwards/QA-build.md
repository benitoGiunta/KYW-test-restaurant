# QA build : ne5t / awwwards (phase test, passe build)

Faits uniquement. Build : `scripts/q.sh ne5t-awwwards-build-build` (exit 0, 5 pages, `dist/ne5t/awwwards/`). Serveur local port 4502, arrêté après les captures. Journaux complets dans `.logs/ne5t-awwwards-build-*.log`.

## Captures et planches

Captures : `/home/user/KYW-test-restaurant/.shots-ne5t-awwwards-build/<page>/` (report.json, d-*.png desktop, m-*.png mobile, h-*/k-* hover et clavier).

| Page | Dossier de captures | Planche |
|---|---|---|
| / (accueil) | `/home/user/KYW-test-restaurant/.shots-ne5t-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-ne5t-awwwards-build/home/planche.png` |
| /carte/ | `/home/user/KYW-test-restaurant/.shots-ne5t-awwwards-build/ne5t-item/` | `/home/user/KYW-test-restaurant/.shots-ne5t-awwwards-build/ne5t-item/planche.png` |
| page 404 (témoin) | `/home/user/KYW-test-restaurant/.shots-ne5t-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-ne5t-awwwards-build/404/planche.png` |

Chaque planche : 1920 x 5280 px, 19 images (13 desktop, 6 mobile).

Limites observées :
- `shoot.mjs --crawl --nav` a capturé 3 dossiers ; le crawl de l'audit trouve 4 pages. `/histoire/` et `/reservation/` n'ont pas de dossier de captures.
- `scripts/planche.py` ne lit pas `--colonnes` ni `--largeur` : ces options sont traitées comme des fichiers (« ignoré 4 », « ignoré 480 »). La planche est produite à sa largeur par défaut.

## Chiffres des report.json (desktop / mobile)

| Mesure | / | /carte/ | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 | 0 | 1 (color-contrast x2 : `.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4,36:1 pour 4,5:1 requis) |
| Axe « needs review » (contraste) | 6 | 4 | 0 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop (ms) | 768 | 84 | 52 |
| LCP mobile (ms) | 3124 | 2584 | 236 |
| Débordement horizontal | non / non | non / non | non / non |
| Éléments débordants | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 8 / 8 | 7 / 8 | 1 / 1 |
| Éléments WebGL cachés | 0 | 0 | 0 |
| FPS scroll desktop / mobile | 60 / 41 | 60 / 52 | 60 / 60 |
| Temps de chargement desktop (ms) | 138 | n.d. | n.d. |
| Temps stabilisé desktop / mobile (ms) | 2621 / 4707 | 2440 / n.d. | 2232 / n.d. |

Cibles petites sur `/` (desktop) : « A » 162x23, « info@ne5t.com » 96x18, « La carte » 52x18, « La maison » 65x18, « Réserver » 58x18, liens réseaux (Facebook, Instagram, TripAdvisor) 63 à 73 x 18.

Clavier (`/` et `/carte/`) : 12 arrêts de tabulation, `skipLinkFirst` = false, `noVisibleFocus` = 0, `invisibleFocus` = 0, `stuck` absent. Le premier arrêt est le lien « Aller au contenu ». Page 404 : 3 arrêts.

Survol : `noHoverChange` = 3 (`/`), 4 (`/carte/`), 2 (404) ; `colorOnly` = 0 partout ; `covered` = 0 ; cibles testées : 7 / 7 / 2.

Mouvement : `idleMotion` = false partout ; `movingReduced` = false ; `reduced.hiddenText` = 1 sur `/` et `/carte/` (texte caché en mode mouvement réduit), 0 sur 404.

Note du rapport : les FPS desktop tournent en rendu logiciel headless (plancher, non mesure matérielle) ; les chiffres mobiles (4x ralentissement CPU, 4G lente) sont ceux qui comptent.

## Audit SEO / métadonnées (audit.mjs)

- Résultat : **0 FAIL, 12 WARN**. 4 pages explorées.
- WARN :
  - `/` : meta description de 172 caractères (cible 50 à 160) ; phrases répétées 2x : « Le restaurant se réserve par téléphone. », « Photos : NE5T Hôtel & Spa ».
  - `/carte/` : phrases répétées 2x : « Le restaurant se réserve par téléphone. », « Au choix : « ou » ».
  - `/histoire/` : phrases répétées 2x : « Le restaurant se réserve par téléphone. », « Photos : NE5T Hôtel & Spa ».
  - `/reservation/` : meta description de 182 caractères ; phrase répétée 3x : « Le restaurant se réserve par téléphone. » ; phrase répétée 2x : « NE5T Hôtel & Spa Avenue Vauban 46 5000 Namur ».
  - site : pas de `robots.txt` ; pas de `sitemap`.

Le sitemap est pourtant généré par le build (`sitemap-index.xml` dans `sites/ne5t-awwwards/dist`) : l'audit ne le trouve pas à l'URL de test servie.
