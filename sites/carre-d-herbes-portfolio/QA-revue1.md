# QA revue 1 — carre-d-herbes / portfolio

Build : `sites/carre-d-herbes-portfolio` → `dist/carre-d-herbes/portfolio/` (exit 0, 7 pages).
Serveur local : `dist/` sur 127.0.0.1:4501, arrêté après capture.
Journaux : `.logs/carre-d-herbes-portfolio-revue1-{build,shoot,audit,planche-*}.log`.

## Captures et planches

Dossiers de captures (`shoot.mjs --crawl --nav`, 3 pages capturées) :

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil | `/home/user/KYW-test-restaurant/.shots-carre-d-herbes-portfolio-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-carre-d-herbes-portfolio-revue1/home/planche.png` |
| Carte/menu (`/menu/`) | `/home/user/KYW-test-restaurant/.shots-carre-d-herbes-portfolio-revue1/carre-d-herbes-item/` | `/home/user/KYW-test-restaurant/.shots-carre-d-herbes-portfolio-revue1/carre-d-herbes-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-carre-d-herbes-portfolio-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-carre-d-herbes-portfolio-revue1/404/planche.png` |

Synthèse : `/home/user/KYW-test-restaurant/.shots-carre-d-herbes-portfolio-revue1/summary.json`.

Note : `scripts/planche.py` n'a pas reconnu `--colonnes` ni `--largeur` (les valeurs ont été lues comme fichiers, « ignoré 4 », « ignoré 480 »). Les planches ont été produites avec les réglages par défaut : 19 images, 1920 × 5280 px.

Note : `shoot.mjs` a capturé 3 pages (accueil, menu, 404) ; `audit.mjs` a exploré 6 pages (dont `/reservation/`).

## Chiffres par page (report.json)

| Mesure | Accueil | Menu (`carre-d-herbes-item`) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations | 0 | 0 | 1 (`color-contrast`, 2 nœuds : `.kyw-footer__note` et `span`, #6b787d sur #fbfaf8, 4,36:1, seuil 4,5:1) |
| Axe : à vérifier (contraste) | 19 | 4 | 0 |
| LCP desktop | 88 ms | 72 ms | 56 ms |
| LCP mobile (4x CPU, 4G lente) | 1364 ms (`p.hero__accroche`) | 2364 ms | 248 ms |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal (desktop / mobile) | non / non | non / non | non / non |
| Éléments débordants | 0 | 0 | 0 |
| Cibles trop petites (desktop / mobile) | 0 / 0 | 0 / 0 | 1 / 1 (`la page d'accueil`, 128 × 20) |
| Éléments WebGL cachés | 0 | 0 | 0 |
| Texte caché / réduit (reduced motion) | 0 | 0 | 0 |
| Mouvement en reduced motion | non | non | non |
| FPS scroll desktop / mobile | 60 / 60 | 60 / 60 | 60 / 60 (desktop headless, plancher) |
| Lien d'évitement en premier | non | non | non |
| Focus clavier : arrêts / sans focus visible / focus invisible / bloqué | 12 / 0 / 0 / non | 12 / 0 / 0 / non | 3 / 0 / 0 / non |
| Survol sans changement | 0 | 0 | 2 |
| Information par couleur seule | 3 | 0 | 0 |
| Mouvement au repos | non | non | non |
| Stabilisation du héros | 5089 ms | 4763 ms | 2202 ms |

Notes de mesure du rapport : FPS desktop headless sur GPU logiciel (plancher, pas une mesure réelle) ; LCP et CLS mobile sont les valeurs retenues.

## Audit (audit.mjs)

- FAIL : 0
- WARN : 5
  - `/carre-d-herbes/portfolio/` : phrase répétée 2 fois, « du jeudi au samedi, 19:00 à minuit »
  - `/carre-d-herbes/portfolio/` : phrase répétée 2 fois, « du jeudi au dimanche, 12:00 à 16:00 »
  - `/carre-d-herbes/portfolio/reservation/` : phrase répétée 3 fois, « 12:00 à 16:00, 19:00 à minuit »
  - site : pas de `robots.txt`
  - site : pas de sitemap (le build a pourtant créé `sitemap-index.xml` dans `sites/carre-d-herbes-portfolio/dist`)
- Page la plus lourde : `/carre-d-herbes/portfolio/`, environ 1537 Ko (html 5, JS 7 gz, CSS 7 gz, polices 109, images 1409).

Aucune modification de fichier source, aucun commit.
