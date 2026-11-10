# QA revue 2 — le-54 / portfolio (faits)

Build : `scripts/q.sh le-54-portfolio-revue2-build` (exit 0, 7 pages, sortie `dist/le-54/portfolio/`).
Serveur local : `http://127.0.0.1:4501/le-54/portfolio/` (arrêté après les captures).
Captures : `.shots-le-54-portfolio-revue2/` (sous-dossiers `home/`, `le-54-item/`, `404/`, résumé `summary.json`).
Journaux : `.logs/le-54-portfolio-revue2-*.log`.

Remarque : `shoot.mjs --crawl --nav` a capturé 3 pages (home, le-54-item = /menu/, 404). L'audit a parcouru 6 pages (voir plus bas).

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/le-54/portfolio/` | `.shots-le-54-portfolio-revue2/home/` | `.shots-le-54-portfolio-revue2/home/planche.png` |
| Menu `/le-54/portfolio/menu/` | `.shots-le-54-portfolio-revue2/le-54-item/` | `.shots-le-54-portfolio-revue2/le-54-item/planche.png` |
| 404 (page inexistante) | `.shots-le-54-portfolio-revue2/404/` | `.shots-le-54-portfolio-revue2/404/planche.png` |

## Mesures par page (summary.json / report.json)

| Mesure | Accueil | Menu | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 | 0 | 2 (`document-title`, `html-has-lang`) |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop (ms) | 148 | 96 | 36 |
| LCP mobile (ms, throttled) | 1404 | 1188 | 252 |
| FPS desktop / mobile | 60 / 60 | 60 / 60 | 60 / 60 |
| Débordement horizontal | desktop : oui (élément `img`) ; mobile : non | non | non |
| Cibles tactiles trop petites | 0 | 0 | 0 |
| Éléments de texte cachés réduits | 0 | 0 | 0 |
| Focus clavier non visible | 0 | 0 | 0 |
| Focus invisible | 0 | 0 | 0 |
| Clavier : piège / focus bloqué | non | non | non (focus quitte la page) |
| Lien d'évitement en premier | non | non | non |
| Hover sans changement | 0 | 0 | 0 |
| Retour couleur seule (`colorOnly`) | 1 | 0 | 0 |
| Mouvement au repos (`idleMotion`) | non | non | non |
| Notes axe `contrastNeedsReview` / violations totales | (report.json : 18 violations listées) | (3 listées) | (0 listée) |

Notes des rapports : desktop FPS mesuré en headless sur GPU logiciel (plancher, pas une mesure matérielle) ; mobile au ralentissement CPU 4x et 4G lente.

## Audit (`audit.mjs`)

Sortie : `0 FAIL, 6 WARN` ; 6 pages explorées ; page la plus lourde `/le-54/portfolio/` (~650 KB).

- WARN `/le-54/portfolio/` : phrase répétée 2 fois « Jeudi, vendredi, samedi et dimanche, 18 h 30 à 21 h »
- WARN `/le-54/portfolio/` : phrase répétée 2 fois « Jeudi, vendredi et dimanche, 12 h à 14 h »
- WARN `/le-54/portfolio/reservation/` : phrase répétée 3 fois « 12 h à 14 h, 18 h 30 à 21 h »
- WARN `site` : la page 404 n'a pas de `<h1>`
- WARN `site` : pas de `robots.txt`
- WARN `site` : pas de `sitemap`

Décompte : 0 FAIL, 6 WARN.
