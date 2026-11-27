# QA revue 1 : novobel, variante portfolio (captures, faits)

Build : `sites/novobel-portfolio` → `dist/novobel/portfolio/` (exit 0, 7 pages, journal `.logs/novobel-portfolio-revue1-build.log`).
Serveur local : `dist/` sur http://127.0.0.1:4501/ (arrêté après usage).
Captures : `.shots-novobel-portfolio-revue1/` (3 dossiers de pages, chacun avec `report.json`).

## Pages capturées

| Page | URL | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | /novobel/portfolio/ | `/home/user/KYW-test-restaurant/.shots-novobel-portfolio-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-novobel-portfolio-revue1/home/planche.png` |
| Service (item) | /novobel/portfolio/services/ | `/home/user/KYW-test-restaurant/.shots-novobel-portfolio-revue1/novobel-item/` | `/home/user/KYW-test-restaurant/.shots-novobel-portfolio-revue1/novobel-item/planche.png` |
| Page absente (404) | /__shoot-missing-page-… | `/home/user/KYW-test-restaurant/.shots-novobel-portfolio-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-novobel-portfolio-revue1/404/planche.png` |

Remarque : le crawl de l'audit recense 6 pages (accueil, services, projets, maison, carriere, contact), mais le shoot n'a produit de captures que pour 3 dossiers. Projets, maison, carrière et contact ne sont pas capturés.

## Chiffres par page (report.json)

| Indicateur | Accueil | Service | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (total / serious) | 0 / 0 | 0 / 0 | 1 / 1 (`color-contrast`, 2 nœuds) |
| Contraste à revoir (axe) | 17 | 15 | 0 |
| CLS desktop | 0 | 0 | 0 |
| LCP desktop (ms) | 72 | 68 | 40 |
| LCP mobile (ms) | 1192 | 1156 | 248 |
| CLS mobile | 0 | 0 | 0 |
| FPS scroll desktop / mobile | 60 / 60 | 60 / 59 | 60 / 60 |
| Débordement horizontal mobile | non | non | non |
| Cibles tactiles mobiles trop petites | 0 | 0 | 1 (« la page d'accueil » 128x20) |
| Éléments cachés (GL) | aucun | aucun | aucun |
| Clavier : arrêts de tabulation | 12 | 12 | 3 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : piégé (stuck) | non | non | non |
| Clavier : lien d'évitement en premier | non | non | non |

Lecture des chiffres : les FPS desktop sont ceux d'un rendu logiciel headless (plancher, pas une mesure matérielle) ; les chiffres mobiles sont ceux de la mesure à 4x de ralentissement CPU et 4G lente.

## Audit (audit.mjs)

- Résultat : **0 FAIL, 8 WARN**.
- WARN répété sur les 6 pages crawlées : « sentence repeated 6x » pour « Rénovation complète · Gros œuvre · Finitions · Installations technique » (accueil, services, projets, maison, carriere, contact).
- WARN site : pas de `robots.txt`.
- WARN site : pas de sitemap (le build produit pourtant un `sitemap-index.xml` dans `sites/novobel-portfolio/dist`, à vérifier au chemin servi).
- Poids de la page la plus lourde (services) : ~628 Ko ; HTML 4, JS 61 (gz), CSS 6 (gz), polices 111, images 446.

## Problèmes relevés (faits)

1. Page 404 : une violation axe `color-contrast` (serious), 2 nœuds.
2. Page 404 : une cible tactile de 128x20 px sous le seuil.
3. Clavier, sur les 3 pages : le lien d'évitement n'est pas le premier arrêt de tabulation (`skipLinkFirst: false`).
4. Contraste à revoir (axe, non bloquant) : 17 nœuds sur l'accueil, 15 sur le service.
5. Audit : phrase identique répétée 6 fois sur les 6 pages ; absence de robots.txt.

## Anomalie de l'outil (planche.py)

`scripts/planche.py` ne lit pas `--colonnes` et `--largeur` comme options séparées : `4` et `480` sont pris pour des fichiers image (« ignoré 4 », « ignoré 480 »). Les planches sont produites quand même (19 images, 1920 px de large, 5280 px de haut, soit 4 colonnes de 480 px) ; les messages « ignoré » sont du bruit dans le journal, sans effet sur la sortie.
