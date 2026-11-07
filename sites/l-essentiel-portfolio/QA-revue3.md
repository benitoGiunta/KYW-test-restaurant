# QA revue 3 — l-essentiel / portfolio (faits mesurés)

Build : `sites/l-essentiel-portfolio` → `dist/l-essentiel/portfolio/` (7 pages construites, exit 0).
Serveur local : `http://127.0.0.1:4501/l-essentiel/portfolio/` (arrêté après les mesures).

## Captures et planches

| Page | Dossier de captures | Planche | URL testée |
|---|---|---|---|
| Accueil | `/home/user/KYW-test-restaurant/.shots-l-essentiel-portfolio-revue3/home/` | `/home/user/KYW-test-restaurant/.shots-l-essentiel-portfolio-revue3/home/planche.png` | `/l-essentiel/portfolio/` |
| Page article (menu) | `/home/user/KYW-test-restaurant/.shots-l-essentiel-portfolio-revue3/l-essentiel-item/` | `/home/user/KYW-test-restaurant/.shots-l-essentiel-portfolio-revue3/l-essentiel-item/planche.png` | `/l-essentiel/portfolio/menu/` |
| 404 | `/home/user/KYW-test-restaurant/.shots-l-essentiel-portfolio-revue3/404/` | `/home/user/KYW-test-restaurant/.shots-l-essentiel-portfolio-revue3/404/planche.png` | URL inexistante |

Résumé des captures : `/home/user/KYW-test-restaurant/.shots-l-essentiel-portfolio-revue3/summary.json`.
Note : `shoot.mjs --crawl --nav` n'a retenu que 3 pages (la navigation n'a trouvé aucun lien cliquable) ; l'audit en a crawlé 6.

## Mesures par page (report.json / summary.json)

| Mesure | Accueil | Menu (article) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (total) | 0 | 0 | 2 |
| Violations axe sérieuses | 0 | 0 | 2 (`document-title`, `html-has-lang`) |
| Axe contrast « à vérifier » | 15 | 2 | 0 |
| LCP desktop (ms) | 2284 (img) | 140 (span.nom) | 32 (pre) |
| LCP mobile (ms) | 2080 (img) | 2152 (span.nom) | 224 (pre) |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal | non | non | non |
| Cibles tactiles < seuil (mobile/desktop) | 0 | 0 | 0 |
| FPS desktop / mobile (scroll) | 60 / 60 | 60 / 60 | 61 / 61 |
| Focus clavier : arrêts / sans focus visible / focus invisible | 12 / 0 / 0 | 12 / 0 / 0 | 1 / 0 / 0 |
| Lien d'évitement en premier | non | non | non |
| Survol sans changement | 0 | 1 (`a « La carte »`) | 0 |
| Survol : couleur seule | 3 | 1 | 0 |
| Mouvement / texte caché en réduction de mouvement | non / 0 | non / 0 | non / 0 |

## Audit (`audit.mjs`) — 0 FAIL, 9 WARN

WARN :
- « 12 h à 14 h, 19 h à 21 h 30 » répété 4 fois : `/l-essentiel/portfolio/`, `/menu/`, `/carte/`, `/maison/`, `/chambres/`
- même phrase répétée 8 fois : `/reservation/`
- 404 sans `<h1>`
- pas de `robots.txt`
- pas de `sitemap`

Poids : page la plus lourde `/l-essentiel/portfolio/maison/` ~638 KB (images 565 KB, polices 58 KB, JS 6 KB gz, CSS 6 KB gz).

## Lignes FAIL

Aucune.
