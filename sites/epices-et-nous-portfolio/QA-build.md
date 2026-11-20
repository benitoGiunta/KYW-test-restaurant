# QA build : epices-et-nous / portfolio (passe build, phase test)

Faits seulement, extraits des `report.json` et de l'audit. Serveur : `dist/` servi sur `http://127.0.0.1:4501/epices-et-nous/portfolio/` (arrêté ensuite). Build : exit 0, 7 pages construites.

## Dossiers de captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil | `/home/user/KYW-test-restaurant/.shots-epices-et-nous-portfolio-build/home/` | `/home/user/KYW-test-restaurant/.shots-epices-et-nous-portfolio-build/home/planche.png` |
| Menu (`/menu/`, nommée `epices-et-nous-item`) | `/home/user/KYW-test-restaurant/.shots-epices-et-nous-portfolio-build/epices-et-nous-item/` | `/home/user/KYW-test-restaurant/.shots-epices-et-nous-portfolio-build/epices-et-nous-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-epices-et-nous-portfolio-build/404/` | `/home/user/KYW-test-restaurant/.shots-epices-et-nous-portfolio-build/404/planche.png` |

Chaque planche fait 1920 x 5280 px et réunit 19 images (13 desktop `d-*`, 6 mobile `m-*`). Le script `planche.py` a traité `--colonnes 4` et `--largeur 480` comme des noms de fichiers (messages « ignoré » dans le journal) ; la largeur 1920 = 4 x 480 montre que la disposition par défaut a été appliquée.

## Chiffres par page (`report.json`)

| Indicateur | Accueil | Menu | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations (sérieuses) | 0 | 0 | 1 (`color-contrast`, serious) |
| Axe : contrastes à vérifier | 25 | 11 | 0 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop (ms) | 88 | 48 | 32 |
| LCP mobile, ralenti (ms) | 1320 | 1188 | 228 |
| FPS défilement desktop / mobile | 60 / 60 | 60 / 60 | 61 / 60 |
| Pire frame mobile (ms) | 17 | 17 | n. d. |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 |
| Éléments cachés (texte masqué, mouvement réduit) | 0, moving false | 0, moving false | 0, moving false |
| Parcours clavier (arrêts de focus) | 12 | 12 | 3 |
| Hauteur page desktop / mobile (px) | 7535 / 7269 | n. d. | n. d. |

Le FPS desktop tourne en headless sur GPU logiciel : c'est un plancher, pas une mesure. Le LCP mobile est mesuré en ralenti 4x CPU, slow 4G.

## Audit (`audit.mjs`, 6 pages crawlées)

- FAIL : 0
- WARN : 6
  - Phrase répétée 2 fois : « La terrasse ouvre dès que la météo le permet. » (accueil)
  - Phrase répétée 2 fois : « du mardi au samedi, 19:00 à 20:30 » (accueil)
  - Phrase répétée 2 fois : « du mardi au vendredi, 12:00 à 13:45 » (accueil)
  - Phrase répétée 4 fois : « 12:00 à 13:45, 19:00 à 20:30 » (`/reservation/`)
  - Pas de `robots.txt` (site)
  - Pas de `sitemap` (site) : le build a produit `sitemap-index.xml` dans `dist/`, que l'audit ne reconnaît pas
- Poids de la page la plus lourde (accueil) : ~644 Ko ; HTML 5, JS 7 (gz), CSS 7 (gz), polices 109, images 517.

## Journaux

- Build : `/home/user/KYW-test-restaurant/.logs/epices-et-nous-portfolio-build-build.log`
- Captures : `/home/user/KYW-test-restaurant/.logs/epices-et-nous-portfolio-build-shoot.log`
- Audit : `/home/user/KYW-test-restaurant/.logs/epices-et-nous-portfolio-build-audit.log`
