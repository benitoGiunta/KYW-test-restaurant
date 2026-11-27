# QA revue 2 — ne5t-awwwards (faits)

Build : `dist/ne5t/awwwards/`, 5 pages construites (build OK, exit 0). Serveur local port 4502 (arrêté après usage).
Captures : `/home/user/KYW-test-restaurant/.shots-ne5t-awwwards-revue2/` (un dossier par page, `report.json` dans chacun).
Journaux : `.logs/ne5t-awwwards-revue2-{build,shoot,audit,ping}.log`.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/ne5t/awwwards/` | `.shots-ne5t-awwwards-revue2/home/` | `.shots-ne5t-awwwards-revue2/home/planche.png` |
| Carte `/ne5t/awwwards/carte/` | `.shots-ne5t-awwwards-revue2/ne5t-item/` | `.shots-ne5t-awwwards-revue2/ne5t-item/planche.png` |
| 404 (page inexistante) | `.shots-ne5t-awwwards-revue2/404/` | `.shots-ne5t-awwwards-revue2/404/planche.png` |

Le shoot a aussi suivi les liens de navigation (`--crawl --nav`) ; l'audit compte 4 pages explorées.

## Chiffres par page

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (6 contraste à vérifier) | 0 (4 contraste à vérifier) | 1 sérieuse : `color-contrast`, 2 nœuds (`.kyw-footer__note`, `span`), #6b787d sur #fbfaf8, 4,36:1 (requis 4,5:1) |
| CLS bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP bureau (ms) | 152 | 60 | 40 |
| LCP mobile (ms) | 1120 (`p.souple`) | 1104 (`img`) | 220 |
| Chargement load bureau / mobile (ms) | 137 / 2477 | 114 / 2457 | 28 / 413 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Cibles tactiles petites bureau / mobile | `A 162x23` / `A 145x20` | aucune / aucune | `la page d'accueil 128x20` / idem |
| FPS défilement bureau / mobile | 60 / 50 | 60 / 54 | 60 / 61 |
| WebGL (actif / éléments masqués) | non / aucun | non / aucun | non / aucun |
| Clavier : focus invisible / sans focus visible | aucun / aucun | aucun / aucun | aucun / aucun |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : arrêts de tabulation / bloqué | 12 / non | 12 / non | 3 / non |
| Survol : éléments flags (`colorOnly`, `covered`, `cursorFollower`, `noHoverChange`, `targets`) | voir report.json | voir report.json | voir report.json |

Titres : accueil « Gastronomie décomplexée à Namur | Intuition, NE5T Hôtel & Spa » ; carte « La carte | Intuition, NE5T Hôtel & Spa » ; 404 « Page introuvable · KYW ».
H1 : accueil « Intuition » ; carte « La carte » ; 404 « Page introuvable ».

## Audit (`audit.mjs`)

- FAIL : 0
- WARN : 2
  - `no robots.txt`
  - `no sitemap` (le sitemap est généré dans `sites/ne5t-awwwards/dist`, l'audit lit la racine servie)
- Résultat : `0 FAIL, 2 WARN`. Poids de la page la plus lourde : ~959 KB (images 793, polices 94).

## Lignes FAIL

Aucune.

## Remarques de mesure (faits)

- Les FPS bureau sont mesurés en rendu logiciel headless : plancher, pas mesure matérielle.
- Le 404 n'est pas une page du site au sens du crawl : la violation de contraste y figure car le pied de page KYW est affiché.
- Les planches ont été générées par `scripts/planche.py` (colonnes 4, largeur 480) ; l'outil annonce 19 vignettes par dossier.
