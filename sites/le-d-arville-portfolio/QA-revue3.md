# QA revue 3 : le-d-arville / portfolio (phase test, rôle captures)

Faits seulement. Build, serveur statique (port 4501) et captures faites le 2026-11-20. Serveur arrêté après les captures.

## Build

- `scripts/build-site.mjs sites/le-d-arville-portfolio` : exit 0, 8 pages, sortie `dist/le-d-arville/portfolio/`.
- Journal : `/home/user/KYW-test-restaurant/.logs/le-d-arville-portfolio-revue3-build.log`

## Pages capturées

Dossiers de captures et planches (4 colonnes, 480 px) :

| Page | Dossier de captures | Planche |
|---|---|---|
| `/le-d-arville/portfolio/` (accueil) | `/home/user/KYW-test-restaurant/.shots-le-d-arville-portfolio-revue3/home/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-portfolio-revue3/home/planche.png` |
| `/le-d-arville/portfolio/menu/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-portfolio-revue3/le-d-arville-item/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-portfolio-revue3/le-d-arville-item/planche.png` |
| Page 404 (`/__shoot-missing-page-…`) | `/home/user/KYW-test-restaurant/.shots-le-d-arville-portfolio-revue3/404/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-portfolio-revue3/404/planche.png` |

Chaque dossier contient `report.json`. Le crawl a trouvé 7 pages. Le rapport de capture ne porte que 3 dossiers (accueil, menu, 404).

Note sur le script `scripts/planche.py` : les messages « ignoré 4 » et « ignoré 480 » sont sans effet. Le parseur prend les valeurs de `--colonnes` et `--largeur` comme des images. Les planches sortent bien à 1920 px de large (4 × 480).

## Chiffres par page (report.json)

| Mesure | Accueil | Menu | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 1 (`color-contrast`, serious, 2 nœuds) |
| Contraste à revoir (axe) | 22 | 3 | 0 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop (ms) | 88 (img) | 52 (p) | 40 (p) |
| LCP mobile (ms) | 1388 (p.hero__accroche) | 1192 (p) | 228 (p) |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors écran (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil » 128×20) |
| Texte caché (hiddenText) | 0 | 0 | 0 |
| Focus clavier invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Lien d'évitement en premier | non | non | non |
| Focus bloqué | non | non | non |
| Arrêts de tabulation | 12 | 12 | 3 |
| Changement au survol refusé (noHoverChange) | 0 | 0 | 2 |
| FPS défilement desktop / mobile | 60 / 60 | 60 / 60 | 61 / 61 |

Mesures brutes : `jq` sur les `report.json` listés ci-dessus. Les FPS desktop sont ceux d'un rendu logiciel headless.

## Audit (`audit.mjs`, racine du site)

- 7 pages explorées, 0 FAIL, 5 WARN.
- WARN :
  - `/le-d-arville/portfolio/` : phrase répétée 2 fois, « du jeudi au samedi, 19:00 à 21:30 ».
  - `/le-d-arville/portfolio/` : phrase répétée 2 fois, « du vendredi au dimanche, 12:00 à 14:30 ».
  - `/le-d-arville/portfolio/reservation/` : phrase répétée 2 fois, « 12:00 à 14:30, 19:00 à 21:30 ».
  - site : pas de `robots.txt`.
  - site : pas de `sitemap`.
- Poids de la page la plus lourde : `/le-d-arville/portfolio/`, environ 1384 Ko (images 1257 Ko).

## Journaux

- Build : `/home/user/KYW-test-restaurant/.logs/le-d-arville-portfolio-revue3-build.log`
- Captures : `/home/user/KYW-test-restaurant/.logs/le-d-arville-portfolio-revue3-shoot.log`
- Audit : `/home/user/KYW-test-restaurant/.logs/le-d-arville-portfolio-revue3-audit.log`
