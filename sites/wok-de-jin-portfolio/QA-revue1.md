# QA revue 1 — wok-de-jin / portfolio (captures)

Build : `scripts/q.sh wok-de-jin-portfolio-revue1-build` → exit 0, `dist/wok-de-jin/portfolio/` (7 pages).
Serveur : `.claude/skills/awwwards/scripts/serve.mjs dist --port 4501`, arrêté après usage.
Journaux : `.logs/wok-de-jin-portfolio-revue1-{build,shoot,audit,planche-*}.log`.

## Couverture

- Captures (`shoot.mjs --crawl --nav`) : 3 pages — `home`, `wok-de-jin-item` (= `/tarifs/`), `404`.
  Les pages `/maison/`, `/reveillon/`, `/emporter/`, `/reservation/` ne sont pas dans les dossiers de captures.
- Audit (`audit.mjs`) : 6 pages crawlées (`/`, `/tarifs/`, `/maison/`, `/reveillon/`, `/emporter/`, `/reservation/`). Le 404 n'est pas dans l'audit.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| home (`/wok-de-jin/portfolio/`) | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-portfolio-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-portfolio-revue1/home/planche.png` |
| tarifs (`/wok-de-jin/portfolio/tarifs/`) | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-portfolio-revue1/wok-de-jin-item/` | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-portfolio-revue1/wok-de-jin-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-portfolio-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-wok-de-jin-portfolio-revue1/404/planche.png` |

Chaque planche : 4 colonnes, 480 px de large, 19 images (d-*, m-*). Les messages « ignoré 4 / ignoré 480 » du script sont sans effet (valeurs d'options lues comme fichiers, sortie correcte).

## Chiffres par page (report.json)

| Mesure | home | tarifs | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations serious | 0 | 0 | 1 (color-contrast, 2 nœuds : `.kyw-footer__note` et `span`, #6b787d sur #fbfaf8, 4,36:1, seuil 4,5:1) |
| Axe : contrastNeedsReview | 25 | 17 | 0 |
| LCP desktop (ms) | 80 | 60 | 36 |
| LCP mobile (ms) | 1080 | 1088 | 216 |
| CLS desktop | 0,036 | 0,009 | 0 |
| CLS mobile | 0,008 | 0 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil » 128×20) |
| Éléments cachés (glHidden / offenders) | 0 / 0 | 0 / 0 | 0 / 0 |
| Texte caché réduit (reduced.hiddenText) | 0 | 0 | 0 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : piège (stuck) / lien d'évitement en premier | non / non | non / non | non / non |
| Survol sans changement (hover) | 0 / 7 cibles | 0 / 7 cibles | 2 / 2 cibles |
| Mouvement réduit (reduced.moving) | false | false | false |

Remarque de mesure (report.json) : le FPS desktop tourne en headless sur GPU logiciel ; le FPS mobile est à 4x de ralentissement CPU.

## Audit (audit.mjs), 6 pages

Résultat : **0 FAIL, 14 WARN**. Pages : `/`, `/tarifs/`, `/maison/`, `/reveillon/`, `/emporter/`, `/reservation/`.

WARN par page (2 WARN chacune, sauf `/reservation/` et `/` pour la répétition x12) :
- « sentence repeated 2x : Horaires du jour Midi et soir, fermé le mardi Avenue du Bourgmestre Je » — sur les 6 pages.
- « sentence repeated 12x » (`/` et `/reservation/`) ou « repeated 6x » (`/tarifs/`, `/maison/`, `/reveillon/`, `/emporter/`) : « 12:00 à 14:00, 18:00 à 22:30 ».
- Site : « no robots.txt », « no sitemap » (WARN site, une fois chacun).

Poids de la page la plus lourde (`/`) : environ 894 Ko (HTML 7, JS 20 gz, CSS 7 gz, polices 69, images 791).

## Lignes FAIL

Aucune (0 FAIL).
