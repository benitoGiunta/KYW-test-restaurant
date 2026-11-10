# QA build : sanga / portfolio

Passe : build. Source : `dist/sanga/portfolio/` servi sur `http://127.0.0.1:4501/sanga/portfolio/` (serveur arrêté après mesure).
Chemins relatifs à la racine du dépôt.

## Pages capturées

| Page | Dossier de captures | Planche | Captures |
|---|---|---|---|
| Accueil (`/sanga/portfolio/`) | `.shots-sanga-portfolio-build/home/` | `.shots-sanga-portfolio-build/home/planche.png` | 19 |
| Fiche carte (`/sanga/portfolio/carte/`) | `.shots-sanga-portfolio-build/sanga-item/` | `.shots-sanga-portfolio-build/sanga-item/planche.png` | 19 |
| 404 (`/404.html`) | `.shots-sanga-portfolio-build/404/` | `.shots-sanga-portfolio-build/404/planche.png` | 14 |

Résumé de capture : `.shots-sanga-portfolio-build/summary.json`. Crawl audit : 4 pages.

## Chiffres par page

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (0 serious, 146 contrastNeedsReview) | 0 (0 serious, 148 contrastNeedsReview) | 2 serious : `document-title` (1 nœud), `html-has-lang` (1 nœud) |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / non relevé |
| LCP desktop (ms) | 176 (`h1.hero__nom`) | 128 (`img`) | 48 (`pre`) |
| LCP mobile (ms) | 1272 (`h1.hero__nom`) | 1452 (`img`) | 244 |
| loadMs desktop / mobile | 262 / 4123 | non relevé | non relevé |
| Hauteur desktop / mobile (px) | 11588 / 6628 | non relevé | non relevé |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Éléments hors-cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Texte caché (reduced motion) | 0 | 0 | 0 |
| FPS scroll desktop (pire trame) | 60 (17 ms) | 60 (17 ms) | non relevé |
| Clavier : arrêts de tabulation | 12 | non relevé | absent du rapport |
| Clavier : focus invisible / sans focus visible | 0 / 0 | non relevé | absent du rapport |
| Clavier : piège de focus (`stuck`) | non | non | absent du rapport |
| Clavier : lien d'évitement en premier (`skipLinkFirst`) | false | non relevé | absent du rapport |
| Survol (cibles testées) | 7 (2 changent seulement la couleur) | non relevé | non relevé |

Notes : le premier arrêt clavier de l'accueil est le lien « Aller au contenu » ; le champ `skipLinkFirst` vaut `false` dans le rapport, à vérifier dans la mesure avant de conclure. Le FPS desktop est mesuré sur rendu logiciel headless (indicatif). Le mobile est mesuré avec ralentissement CPU x4 et 4G lente.

## Audit (`audit.mjs`)

- Pages crawlées : 4.
- Page la plus lourde : `/sanga/portfolio/`, environ 583 KB (html 5, JS 61 Ko gzip, CSS 7 Ko gzip, polices 54, images 456).
- FAIL : 0.
- WARN : 5.

Journaux : `.logs/sanga-portfolio-build-build.log`, `.logs/sanga-portfolio-build-shoot.log`, `.logs/sanga-portfolio-build-audit.log`.
