# QA revue 2 — l-essentiel / portfolio (captures)

Build : `sites/l-essentiel-portfolio` → `dist/l-essentiel/portfolio/` (exit 0, 7 pages Astro).
Serveur local : `dist` sur 127.0.0.1:4501, arrêté après usage.
Journaux : `.logs/l-essentiel-portfolio-revue2-{build,shoot,audit}.log`.

## Pages captées

Le crawl (`--crawl --nav`) a relevé 6 pages ; `shoot.mjs` n'a produit que 3 dossiers de captures (`summary.json`).

| Page | Dossier de captures | Planche |
|---|---|---|
| home (`/l-essentiel/portfolio/`) | `/home/user/KYW-test-restaurant/.shots-l-essentiel-portfolio-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-l-essentiel-portfolio-revue2/home/planche.png` |
| l-essentiel-item (`/menu/`) | `/home/user/KYW-test-restaurant/.shots-l-essentiel-portfolio-revue2/l-essentiel-item/` | `/home/user/KYW-test-restaurant/.shots-l-essentiel-portfolio-revue2/l-essentiel-item/planche.png` |
| 404 (`/__shoot-missing-page-…`) | `/home/user/KYW-test-restaurant/.shots-l-essentiel-portfolio-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-l-essentiel-portfolio-revue2/404/planche.png` |

Rapport par page : `<dossier>/report.json` ; synthèse : `.shots-l-essentiel-portfolio-revue2/summary.json`.

## Chiffres par page

| Mesure | home | l-essentiel-item (menu) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Débordement horizontal (desktop / mobile) | non / non | non / non | non / non |
| Éléments cachés (texte réduit) | 0 | 0 | 0 |
| Mouvement en réduit | non | non | non |
| Cibles tactiles trop petites (desktop / mobile) | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop | 2324 ms (img) | 144 ms (span.nom) | 36 ms (pre) |
| LCP mobile | 2084 ms (img) | 2168 ms (span.nom) | 236 ms (pre) |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS scroll mobile | 60 | 60 | 61 |
| FPS desktop (headless, plancher) | 60 | 60 | 61 |
| Axe : violations sérieuses | 0 | 0 | 2 |
| Axe : détail | — | — | `document-title` (1), `html-has-lang` (1) |
| Clavier : focus sans indicateur visible | 0 | 0 | 0 |
| Clavier : focus invisible | 0 | 0 | 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : piège de focus | non | non | non (focus sorti de la page) |
| Survol sans changement | 0 | 1 | 0 |
| Survol changement de couleur seule | 3 | 1 | 0 |
| Animation hors réduit (idle) | non | non | — |

Notes : les FPS desktop sont ceux d'un Chromium headless sur GPU logiciel (plancher, pas une mesure matérielle). Les chiffres mobile sont ceux qui comptent (ralentissement CPU 4x, 4G lente).

## Audit (`audit.mjs`)

- Pages crawlées : 6 ; page la plus lourde : `/l-essentiel/portfolio/maison/` (~638 KB ; 4 HTML, 6 JS gz, 6 CSS gz, 58 polices, 565 images).
- Lignes FAIL : aucune (0 FAIL).
- Nombre de WARN : 9. Dont « no sitemap » (le sitemap est pourtant généré par le build dans `dist/`).

## Points relevés pour la suite

- Page 404 : `document-title` et `html-has-lang` en violation sérieuse (axe).
- Home : survol à changement de couleur seule sur 3 cibles.
- Menu : survol sans changement sur 1 cible ; survol couleur seule sur 1 cible.
- Planches : `planche.py` a signalé « ignoré 4 » (argument `--colonnes 4` lu comme fichier) pour chaque dossier ; les planches ont été produites malgré cet avertissement.
