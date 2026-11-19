# QA build : pizzeria-doria / portfolio (passe build, phase test)

Faits seulement. Serveur local `dist/` sur http://127.0.0.1:4501/pizzeria-doria/portfolio/ (arrêté après la passe).
Build : `scripts/build-site.mjs sites/pizzeria-doria-portfolio` exit 0, 7 pages construites, sortie `dist/pizzeria-doria/portfolio/`.

## Captures et planches

| Page (URL) | Dossier de captures | Planche |
|---|---|---|
| home (/pizzeria-doria/portfolio/) | /home/user/KYW-test-restaurant/.shots-pizzeria-doria-portfolio-build/home/ | /home/user/KYW-test-restaurant/.shots-pizzeria-doria-portfolio-build/home/planche.png |
| 404 (page inexistante) | /home/user/KYW-test-restaurant/.shots-pizzeria-doria-portfolio-build/404/ | /home/user/KYW-test-restaurant/.shots-pizzeria-doria-portfolio-build/404/planche.png |
| carte (/pizzeria-doria/portfolio/carte/) | /home/user/KYW-test-restaurant/.shots-pizzeria-doria-portfolio-build/pizzeria-doria-item/ | /home/user/KYW-test-restaurant/.shots-pizzeria-doria-portfolio-build/pizzeria-doria-item/planche.png |

Notes : `shoot.mjs --crawl` a produit 3 dossiers (home, 404, pizzeria-doria-item = carte). Les pages vins, histoire, emporter et reservation ont été crawlées par l'audit mais n'ont pas de dossier de captures. Le script `planche.py` affiche « ignoré 4 » et « ignoré 480 » : ses arguments `--colonnes`/`--largeur` sont pris comme fichiers ; les planches sont produites quand même.

## Chiffres des report.json

| Mesure | home | 404 | carte |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations sérieuses | 0 | 1 (color-contrast, 2 nœuds : `.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4,36:1 pour 4,5:1 requis) | 0 |
| Axe : contrastes à revoir | 27 | 0 | 18 |
| LCP desktop (ms) / élément | 104 / p.hero__slogan | 48 / p | 104 / h1 |
| LCP mobile (ms) / élément | 1120 / p.hero__slogan | 232 / p | 1120 / p.lead |
| CLS desktop / mobile | 0,022 / 0,007 | 0 / 0 | 0,005 / 0,003 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 1 / 1 (« la page d'accueil » 128x20) | 0 / 0 |
| Chargement (loadMs) desktop / mobile | 158 / 3160 | 46 / 410 | 114 / 2169 |
| Clavier : éléments sans focus visible | 0 | 0 | 0 |
| Clavier : focus invisible | 0 | 0 | 0 |
| Clavier : focus bloqué | non | non | non |
| Premier arrêt du focus = lien d'évitement | non (1er arrêt : « Aller au contenu ») | non (1er arrêt : « la page d'accueil ») | non (1er arrêt : « Aller au contenu ») |

Clavier, 404 : arrêts = « la page d'accueil », « Réalisé par », puis « body: focus left the page ».
Captures shoot-summary : `colorOnly` = 3 sur la page carte ; `idleMotion` = true sur les 3 pages ; `movingReduced` = false sur les pages relevées ; FPS desktop 60 et mobile 60 (sur home et carte).

## Audit (audit.mjs, 6 pages crawlées)

- FAIL : 0
- WARN : 20 (sur 6 pages + site)
  - « sentence repeated 2x » sur carte, vins, histoire, emporter, reservation : répétition des horaires « 12:00 à 13:30, 18:00 à 21:30 » et « 12:00 à 13:30, 18:00 à 22:00 » ; et « Horaires du jour Fermé le mardi et le mercredi Rue Fond de Malonne 66, » sur vins, histoire, emporter, reservation (4 répétitions sur reservation).
  - site : pas de robots.txt ; pas de sitemap (le build a pourtant écrit sitemap-index.xml).
- Poids de la page la plus lourde : /pizzeria-doria/portfolio/, environ 607 Ko ; HTML 7, JS 74 (gz), CSS 7 (gz), polices 69, images 450.
