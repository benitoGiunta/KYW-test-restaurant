# QA revue 1 : le-lodge-wepion (portfolio)

Phase : test · Rôle : captures · Build et serveur local : `dist/le-lodge-wepion/portfolio/`, port 4501 (serveur arrêté après la session).

## Statut

- Build : OK (7 pages, exit 0).
- Captures : **incomplètes**. `shoot.mjs` a crawlé 6 pages mais n'a produit un dossier complet que pour `home`. Le navigateur s'est fermé pendant `le-lodge-wepion-item` (carte) et `404` (« Target page, context or browser has been closed »). Pages sans capture : `carte`, `histoire`, `reservation`, `tearoom`, `terrasse`.
- Audit : OK, 0 FAIL, 14 WARN.

## Pages

| Page | Dossier de captures | Planche | Remarque |
|---|---|---|---|
| home (`/le-lodge-wepion/portfolio/`) | `.shots-le-lodge-wepion-portfolio-revue1/home/` | `.shots-le-lodge-wepion-portfolio-revue1/home/planche.png` | complet, report.json présent |
| carte (`le-lodge-wepion-item`) | `.shots-le-lodge-wepion-portfolio-revue1/le-lodge-wepion-item/` (5 PNG desktop) | `.shots-le-lodge-wepion-portfolio-revue1/le-lodge-wepion-item/planche.png` | partiel, pas de report.json, pas de captures mobile |
| 404 | `.shots-le-lodge-wepion-portfolio-revue1/404/` | aucune | vide hormis summary.json, pas de report.json |
| histoire, reservation, tearoom, terrasse | aucun | aucune | non capturées |

Anomalie planche : `scripts/planche.py` lit `--colonnes` et `--largeur` comme des fichiers (la valeur `4` et `480` sont traitées comme images). Les planches ont donc été générées avec les valeurs par défaut (3 colonnes, 640 px) : la planche home fait 1920 × 5280 px, 19 images.

## Chiffres (home, report.json)

- Erreurs console : 0. Requêtes en échec : 0.
- axe : 0 violation, 0 serious, 22 contrastNeedsReview (à vérifier).
- CLS : desktop 0,004 ; mobile 0,01.
- LCP : desktop 112 ms ; mobile 1192 ms.
- Hauteur de page : desktop 7987 px ; mobile 8381 px.
- Scroll FPS : desktop 60 (worst frame 17 ms) ; mobile 60 (worst frame 17 ms). Desktop mesuré en rendu logiciel, donc plancher.
- Clavier : 12 arrêts de tabulation. Premiers : lien « Aller au contenu », bouton « PAUSE ».
- Mouvement réduit : texte masqué 0 ; animation active : false.
- Survol : 5 éléments avec retour au survol mesuré.
- Débordement horizontal : non renseigné dans le report.json (pas de champ de mesure).
- Éléments cachés : 0 (`reduced.hiddenText`).

## Audit (audit.mjs, http://127.0.0.1:4501/le-lodge-wepion/portfolio/)

- FAIL : 0.
- WARN : 14.
  - 12 × « sentence repeated 2x » sur les 6 pages : « Fermé à Wépion Accueil provisoire au Wine & More, Erpent Réouverture à » et « Fermé depuis l'incendie du 21 mai 2026. » (une fois par page).
  - 1 × « no robots.txt » (site).
  - 1 × « no sitemap » (site ; Astro a pourtant écrit `sitemap-index.xml` dans le build, à vérifier à la racine publiée).
- Poids de la page la plus lourde : environ 551 Ko (HTML 7, JS 20 gz, CSS 7 gz, polices 69, images 447).

## Journaux

- Build : `.logs/le-lodge-wepion-portfolio-revue1-build.log`
- Captures : `.logs/le-lodge-wepion-portfolio-revue1-shoot.log`
- Audit : `.logs/le-lodge-wepion-portfolio-revue1-audit.log`
- Serveur : `.logs/serve-portfolio.log`
