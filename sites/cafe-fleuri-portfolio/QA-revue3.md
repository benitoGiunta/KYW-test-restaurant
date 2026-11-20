# QA revue 3 — cafe-fleuri-portfolio (faits)

Build : `scripts/build-site.mjs sites/cafe-fleuri-portfolio` → exit 0, 6 pages, dist/cafe-fleuri/portfolio/.
Serveur local : `serve.mjs dist --port 4501` (arrêté après les captures).
Captures : `shoot.mjs --crawl --nav` → 3 dossiers de pages (summary.json). Audit : `audit.mjs` sur 5 pages crawlées.

## Captures par page

| Page | Dossier captures | Planche |
|---|---|---|
| Accueil (`/cafe-fleuri/portfolio/`) | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-portfolio-revue3/home/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-portfolio-revue3/home/planche.png` |
| Carte (`/cafe-fleuri/portfolio/carte/`) | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-portfolio-revue3/cafe-fleuri-item/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-portfolio-revue3/cafe-fleuri-item/planche.png` |
| 404 (`/__shoot-missing-page-…`) | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-portfolio-revue3/404/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-portfolio-revue3/404/planche.png` |

Pages non capturées par `shoot.mjs --crawl` : brunch, histoire, reservation (présentes dans l'audit, pas dans les captures).

Remarque planche : `scripts/planche.py` a traité `--colonnes 4 --largeur 480` comme des fichiers (« ignoré 4 », « ignoré 480 »). Les 3 planches ont été produites (1920 × 5280 px, 19 images chacune) avec les options par défaut.

## Chiffres (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 | 0 | 1 (`color-contrast`, 2 nœuds : `.kyw-footer__note` et `span`, #6b787d sur #fbfaf8, 4,36:1, seuil 4,5:1) |
| Axe « needs review » (contraste) | 36 | 19 | 0 |
| LCP desktop (ms) | 92 | 80 | 40 |
| CLS desktop | 0,004 | 0,002 | 0 |
| LCP mobile (ms, throttled) | 1300 | 1180 | 248 |
| CLS mobile | 0,011 | 0,014 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments débordants | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil », 128×20) |
| Clavier : arrêts de focus | 12 | 12 | 3 |
| Clavier : focus non visible / invisible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus bloqué | non | non | non |
| Lien d'évitement en premier | non | non | non |
| Survol sans changement | 0 / 7 | 0 / 7 | 2 / 2 |
| Mouvement en réduit (texte caché / animation) | 0 / non | 0 / non | 0 / non |
| FPS scroll desktop / mobile | 60 / 43 | 60 / 51 | 60 / — |
| Titre (`<title>`) | « Café Fleuri \| Café-brunch à Namur » | « La carte \| Café Fleuri » | « Page introuvable · KYW » |

Notes du rapport : le FPS desktop est mesuré sur GPU logiciel headless ; le mobile est à 4× de ralentissement CPU.

Page la plus lourde (audit) : `/cafe-fleuri/portfolio/histoire/`, ~712 KB (html 4, JS 62 gz, CSS 7 gz, polices 110, images 528).

## Audit (audit.mjs)

- FAIL : 0
- WARN : 3
  - `/cafe-fleuri/portfolio/carte/` : phrase répétée 2 fois « Prix relevé dans un guide ancien, à confirmer. »
  - site : pas de robots.txt
  - site : pas de sitemap

Résultat final de l'audit : 0 FAIL, 3 WARN (5 pages crawlées).

## Non fait

- Aucun fichier source modifié, aucun commit.
- Les captures des pages brunch, histoire et reservation n'ont pas été produites par `shoot.mjs --crawl --nav`.
