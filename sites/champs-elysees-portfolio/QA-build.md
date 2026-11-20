# QA build — champs-elysees / portfolio

Faits seulement (sorties de `shoot.mjs --crawl --nav` et `audit.mjs`), serveur local `dist/` sur le port 4501, chemin `/champs-elysees/portfolio/`.

Build : `scripts/q.sh champs-elysees-portfolio-build-build` exit 0 (6 pages, sitemap créé). Journal : `.logs/champs-elysees-portfolio-build-build.log`.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/champs-elysees/portfolio/` | `/home/user/KYW-test-restaurant/.shots-champs-elysees-portfolio-build/home/` | `/home/user/KYW-test-restaurant/.shots-champs-elysees-portfolio-build/home/planche.png` |
| Carte `/carte/` (dossier `champs-elysees-item`) | `/home/user/KYW-test-restaurant/.shots-champs-elysees-portfolio-build/champs-elysees-item/` | `/home/user/KYW-test-restaurant/.shots-champs-elysees-portfolio-build/champs-elysees-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-champs-elysees-portfolio-build/404/` | `/home/user/KYW-test-restaurant/.shots-champs-elysees-portfolio-build/404/planche.png` |

Note : `shoot.mjs` n'a produit que 3 dossiers de pages (accueil, carte, 404). Les pages histoire, terrasse et réservation ne sont pas capturées, mais figurent dans l'audit.
Note : les planches ont été faites avec `scripts/planche.py` sans effet de `--colonnes 4 --largeur 480` (le script a lu `4` et `480` comme fichiers et les a ignorés). Chaque planche fait 1920 x 5280 px, 19 images.

## Chiffres par page (report.json)

| Donnée | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations sérieuses | 0 | 0 | 1 (color-contrast, 2 nœuds : `.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4,36:1 pour 4,5:1 requis) |
| Axe : contrast à vérifier | 24 | 16 | 0 |
| LCP desktop (ms) | 96 | 100 | 44 |
| LCP mobile (ms) | 2488 (img) | 1144 (p.lead) | 240 |
| CLS desktop | 0,01 | 0,004 | 0 |
| CLS mobile | 0,006 | 0,002 | 0 |
| Débordement horizontal (desktop / mobile) | non / non | non / non | non / non |
| Éléments cachés (texte masqué, GL) | 0 | 0 | 0 |
| Cibles tactiles petites (desktop / mobile) | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil 128x20 ») |
| FPS scroll desktop / mobile | 58 / 60 | 60 / 60 | 60 / 60 |
| Clavier : arrêts de focus | 12 | 12 | 3 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : piège de focus / lien d'évitement en premier | non / non | non / non | non / non |
| Mouvement réduit : texte masqué / animation active | 0 / non | 0 / non | 0 / non |

Titres h1 : « Plaisir et partage » (accueil), « La carte » (carte), « Page introuvable » (404).

## Audit (audit.mjs)

- 5 pages explorées : `/`, `/carte/`, `/histoire/`, `/terrasse/`, `/reservation/`.
- FAIL : 0.
- WARN : 7.
  - 5 WARN « sentence repeated 2x » : « Horaires du jour Ouvert du lundi au dimanche Avenue Albert Ier 149, 51 » sur chacune des 5 pages.
  - 1 WARN « no robots.txt ».
  - 1 WARN « no sitemap » (le build a pourtant créé `sitemap-index.xml` dans `dist/`, l'audit ne le détecte pas à cette adresse).
- Poids de la page la plus lourde (`/`) : ~499 KB ; HTML 7, JS 20 (gz), CSS 6 (gz), polices 69, images 397.

## Serveur

Arrêté (PID 13095, `.logs/serve-portfolio.pid`). Journal : `.logs/serve-portfolio.log`.
