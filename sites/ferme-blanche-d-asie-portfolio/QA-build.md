# QA build : ferme-blanche-d-asie-portfolio

Passe : build · Date : 2026-11-09 · Serveur : `dist/` sur 127.0.0.1:4501 (arrêté après usage)

## Build

- `scripts/q.sh … node scripts/build-site.mjs sites/ferme-blanche-d-asie-portfolio` : exit 0.
- Sortie : `dist/ferme-blanche-d-asie/portfolio/`, 6 pages construites (404, carte, index, maison, reservation, salles).
- Journal : `.logs/ferme-blanche-d-asie-portfolio-build-build.log`.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/ferme-blanche-d-asie/portfolio/`) | `.shots-ferme-blanche-d-asie-portfolio-build/home/` | `.shots-ferme-blanche-d-asie-portfolio-build/home/planche.png` (14 à 19 vignettes, 1920 × 5280) |
| Carte (`/ferme-blanche-d-asie/portfolio/carte/`, H1 « La carte ») | `.shots-ferme-blanche-d-asie-portfolio-build/ferme-blanche-d-asie-item/` | `.shots-ferme-blanche-d-asie-portfolio-build/ferme-blanche-d-asie-item/planche.png` (1920 × 5280) |
| 404 | `.shots-ferme-blanche-d-asie-portfolio-build/404/` | `.shots-ferme-blanche-d-asie-portfolio-build/404/planche.png` (1920 × 4224) |

- `shoot.mjs --crawl --nav` : 3 dossiers de pages créés. Le shoot signale « 3 pages shot ». Journal : `.logs/ferme-blanche-d-asie-portfolio-build-shoot.log`.
- `audit.mjs` a crawlé 5 pages (accueil, carte, salles, reservation, 404). Les dossiers de captures ne couvrent que 3 gabarits, et les pages `salles` et `reservation` n'ont pas de dossier.
- `planche.py` : les options `--colonnes 4 --largeur 480` sont lues comme des fichiers (« ignoré 4 », « ignoré 480 »). La planche sort néanmoins en 4 colonnes de 480 px.

## Chiffres par page (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 2 (`document-title`, `html-has-lang`, impact serious) |
| Contraste à vérifier (axe) | 156 | 229 | 0 |
| LCP bureau (ms) | 160 (`span.loader__name`) | 112 (`img`) | 36 (`pre`) |
| LCP mobile (ms) | 1192 (`h1.hero__nom`) | 2236 (`img`) | 220 (`pre`) |
| CLS bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments en débordement bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| H1 bureau / mobile | 1 / 1 (« La Ferme Blanche d’Asie ») | 1 / 1 (« La carte ») | 0 / 0 |
| Chargement bureau (ms) / mobile (ms) | 218 / 2966 | n.d. | n.d. |
| FPS au défilement bureau / mobile | 60 / 59 | 60 / 60 | 61 / 61 |
| Clavier : focus invisible / focus absent | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : arrêts de tabulation | 12 | 12 | 1 |
| Clavier : focus bloqué | non | non | non |
| Survol (cibles / sans réaction) | 7 / 1 | 7 / 1 | n.d. |
| Mouvement en préférence réduite | non | non | non |

Notes :
- Le LCP mobile de l'accueil (1192 ms) et de la carte (2236 ms) vient de mesures à ralentissement CPU 4x sur 4G lente.
- Chargement (`loadMs`) non relevé pour la carte et le 404 dans cette passe ; seul l'accueil a été extrait (bureau 218 ms, mobile 2966 ms).

## Audit (audit.mjs)

- FAIL : 0
- WARN : 10
  - 7 × « sentence repeated 2x » : horaires « 12:00 à 14:30, 18:00 à 23:00 » (accueil, réservation, variantes de l'horaire) et « Mise en bouche : salade de bœuf et avocat » (salles).
  - 1 × « 404 page has no <h1> ».
  - 1 × « no robots.txt ».
  - 1 × « no sitemap ». Le build a pourtant créé `sitemap-index.xml` dans `dist` (journal du build) : le contrôle ne le retrouve pas à la racine du site servi.
- Poids le plus lourd : `/ferme-blanche-d-asie/portfolio/`, environ 1998 Ko (images 1926 Ko, polices 54 Ko, JS 7 Ko gz, CSS 7 Ko gz).

## Journaux

Tous dans `.logs/` : `ferme-blanche-d-asie-portfolio-build-{build,shoot,audit,planche-404,planche-ferme-blanche-d-asie-item,planche-home}.log`, et `serve-portfolio.log`.
