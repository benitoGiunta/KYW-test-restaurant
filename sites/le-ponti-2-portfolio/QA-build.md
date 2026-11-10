# QA build : le-ponti-2 / portfolio

Faits uniquement (étape « captures », passe build). Serveur local `dist/` sur http://127.0.0.1:4501 (arrêté après usage).

## Build

- `scripts/q.sh le-ponti-2-portfolio-build-build node scripts/build-site.mjs sites/le-ponti-2-portfolio` : exit 0, 6 pages, `dist/le-ponti-2/portfolio/`.
- Journal : `.logs/le-ponti-2-portfolio-build-build.log`.

## Pages capturées

| Page | URL | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | /le-ponti-2/portfolio/ | `.shots-le-ponti-2-portfolio-build/home/` | `.shots-le-ponti-2-portfolio-build/home/planche.png` |
| Carte | /le-ponti-2/portfolio/carte/ | `.shots-le-ponti-2-portfolio-build/le-ponti-2-item/` | `.shots-le-ponti-2-portfolio-build/le-ponti-2-item/planche.png` |
| 404 (sonde) | /__shoot-missing-page-… | `.shots-le-ponti-2-portfolio-build/404/` | `.shots-le-ponti-2-portfolio-build/404/planche.png` |

Note planche : `scripts/planche.py` lit `--colonnes` et `--largeur` comme des images (« ignoré 4 », « ignoré 480 »), mais la largeur de sortie 1920 px = 4 × 480 indique que la mise en page demandée est appliquée.

## Chiffres (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 | 0 | 2 (`document-title`, `html-has-lang`) |
| Contraste à vérifier (axe) | 26 | 16 | 0 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Texte caché (reduced motion) | 0 | 0 | 0 |
| LCP bureau (ms) | 120 (`p.hero__slogan`) | 112 (`h1`) | 32 (`pre`) |
| LCP mobile (ms, throttled) | 3692 (`img`) | 1132 (`p.lead`) | 212 (`pre`) |
| CLS bureau / mobile | 0.019 / 0.007 | 0.004 / 0 | 0 / 0 |
| FPS défilement bureau / mobile | 57 / 60 | 60 / 60 | 61 / 60 |
| Pieds de focus clavier (arrêts) | 12 | 12 | « focus left the page » |
| Survols testés (cibles) | 7 cibles (h-01 à h-07) | 7 cibles (h-01 à h-07) | - |

Chargement : accueil 208 ms bureau / 3676 ms mobile ; carte 129 ms / 2210 ms.

## Audit (`scripts/q.sh le-ponti-2-portfolio-build-audit`)

- Journal : `.logs/le-ponti-2-portfolio-build-audit.log`.
- Lignes FAIL : aucune (0 FAIL).
- WARN : 13.
- Poids de la page la plus lourde : ~805 KB ; HTML 7, JS 20 (gz), CSS 7 (gz), polices 69, images 702.

## Journaux

- `.logs/le-ponti-2-portfolio-build-shoot.log`
- `.logs/serve-portfolio.log`
