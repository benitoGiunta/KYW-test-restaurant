# QA build : ferme-blanche-d-asie-legacy

Passe : build · Rôle : captures · Serveur : `dist/` servi sur http://127.0.0.1:4503/ (arrêté après la passe).
URL de base : `/ferme-blanche-d-asie/legacy/`. Build : `scripts/build-site.mjs`, exit 0, 6 pages construites (`404`, `contact`, `index`, `menu`, `photos`, `reserve`).

Journaux : `/home/user/KYW-test-restaurant/.logs/ferme-blanche-d-asie-legacy-build-build.log`, `…-shoot.log`, `…-audit.log`.
Captures : `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-legacy-build/` (`summary.json` à la racine).

## Pages capturées

| Page | Dossier de captures | Planche | Fichiers |
|---|---|---|---|
| Accueil `/ferme-blanche-d-asie/legacy/` | `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-legacy-build/home/` | `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-legacy-build/home/planche.png` | 40 |
| Carte `/ferme-blanche-d-asie/legacy/menu` | `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-legacy-build/ferme-blanche-d-asie-item/` | `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-legacy-build/ferme-blanche-d-asie-item/planche.png` | 40 |
| 404 (URL inconnue) | `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-legacy-build/404/` | `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-legacy-build/404/planche.png` | 17 |

Le crawl a découvert 5 pages (audit). Les captures du dossier ne couvrent que les trois types ci-dessus (`--crawl --nav`).

## Chiffres par page (report.json)

| Indicateur | Accueil | Carte (menu) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (total / serious) | 0 / 0 | 0 / 0 | 2 / 2 (`document-title`, `html-has-lang`, 1 nœud chacune) |
| Contrast needs review (axe) | 45 | 0 | 0 |
| LCP desktop (ms, élément) | 208 (img) | 124 (p.lead) | 40 (pre) |
| LCP mobile (ms, élément) | 1024 (h1#titre) | 828 (span.plat__desc) | 248 (pre) |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments débordants (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 8 / 0 | 8 / 0 | 0 / 0 |
| FPS scroll desktop / mobile (headless) | 60 / 61 | 60 / 60 | 61 / 61 |
| Éléments WebGL actifs | non | non | non |
| Texte caché (prefers-reduced-motion) | 0 | 0 | 0 |
| Mouvement en reduced-motion | non | non | non |
| Mouvement au repos (idleMotion) | non | non | non |
| Titre `<h1>` (desktop) | 1 | 1 | 0 |
| Clavier : arrêts de tabulation | 12 | 12 | 1 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : bloqué (stuck) | non | non | non |
| Survol : cibles testées | 7 | 7 | 0 |
| Survol : types de réaction (react) | color ×5, none ×1, moves ×1 | non relevé | — |
| Survol `noHoverChange` / `colorOnly` (summary.json) | 1 / 5 | non relevé | — |

Notes :
- Le rapport précise que les FPS desktop sont mesurés en headless sur GPU logiciel (plancher, pas une mesure matérielle) ; les mesures mobiles sont faites à 4x de ralentissement CPU, 4G lente.
- Le 404 n'a pas de `<h1>` (signalé aussi par l'audit).

## Audit (audit.mjs)

- Résultat : **0 FAIL, 7 WARN**.
- WARN répétitions de phrase (4) :
  - `/ferme-blanche-d-asie/legacy/` : « 12 h 00 à 14 h 30 et 18 h 00 à 23 h 00 » répétée 5 fois
  - `/ferme-blanche-d-asie/legacy/reserve` : même phrase, 5 fois
  - `/ferme-blanche-d-asie/legacy/contact` : « Ouvert tous les jours, midi et soir. » 2 fois ; même horaire, 5 fois
- WARN site (3) : 404 sans `<h1>` ; pas de `robots.txt` ; pas de `sitemap`.
- Poids : page la plus lourde `/ferme-blanche-d-asie/legacy/photos`, environ 2164 Ko (images 2099 Ko, 56 polices, 1 JS et 5 CSS gzippés).
