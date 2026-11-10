# QA revue 2 : le-servais-portfolio (captures)

Build : `node scripts/build-site.mjs sites/le-servais-portfolio`, exit 0, sortie `dist/le-servais/portfolio/`.
Serveur local : `http://127.0.0.1:4501/le-servais/portfolio/` (arrêté après les mesures).
Captures : `shoot.mjs --crawl --nav` ; 6 pages découvertes par le crawl, 3 pages capturées (home, le-servais-item, 404).
Audit : `audit.mjs` sur la même URL : **0 FAIL, 3 WARN**.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| home (/le-servais/portfolio/) | /home/user/KYW-test-restaurant/.shots-le-servais-portfolio-revue2/home | /home/user/KYW-test-restaurant/.shots-le-servais-portfolio-revue2/home/planche.png |
| le-servais-item (/le-servais/portfolio/carte/) | /home/user/KYW-test-restaurant/.shots-le-servais-portfolio-revue2/le-servais-item | /home/user/KYW-test-restaurant/.shots-le-servais-portfolio-revue2/le-servais-item/planche.png |
| 404 | /home/user/KYW-test-restaurant/.shots-le-servais-portfolio-revue2/404 | /home/user/KYW-test-restaurant/.shots-le-servais-portfolio-revue2/404/planche.png |

Les planches sont produites avec `python3 scripts/planche.py <planche> <d-*.png> <m-*.png>` ; le script a signalé « ignoré » pour `4` et `480` (options `--colonnes`/`--largeur` lues comme fichiers), la largeur obtenue est 1920 px (4 × 480).

## Chiffres (report.json)

| Mesure | home | le-servais-item | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (serious) | 0 | 0 | 2 (`document-title`, `html-has-lang`, 1 nœud chacune) |
| contrastNeedsReview (axe) | 38 | 30 | 0 |
| LCP desktop (ms) | 144 | 128 | 56 |
| CLS desktop | 0.001 | 0.002 | 0 |
| LCP mobile throttled (ms) | 1300 | 1132 | 220 |
| CLS mobile | 0.006 | 0.016 | 0 |
| Load desktop / mobile (ms) | 240 / 4041 | 169 / 2222 | 61 / 207 |
| FPS scroll desktop / mobile | 60 / 38 | 60 / 47 | 61 / 61 |
| Débordement horizontal mobile | non | non | non |
| Éléments hors-écran mobiles (offenders) | 0 | 0 | 0 |
| Cibles tactiles petites (mobile) | 0 | 0 | 0 |
| Texte caché en réduit-mouvement | 0 | 0 | 0 |
| Mouvement en réduit-mouvement | non | non | non |
| WebGL (mobile) actif / masqué | non / [] | non / [] | non / [] |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : piège de focus | non | non | non |
| Survol : cibles testées / avec réaction | 7 / 7 (5 « moves », 2 « pixels ») | 7 / 7 (5 « moves », 2 « pixels ») | 0 / 0 |

Notes : `skipLinkFirst` vaut `false` sur les trois pages ; le premier arrêt clavier de la home est le lien « Aller au contenu ». Les FPS desktop sont ceux d'un rendu logiciel headless (plancher, pas une mesure).

## Audit (audit.mjs)

- FAIL : 0
- WARN : 3
  - 404 : page sans `<h1>`
  - site : pas de `robots.txt`
  - site : pas de `sitemap` (le build a produit `sitemap-index.xml` dans `sites/le-servais-portfolio/dist`, non détecté par l'audit)
