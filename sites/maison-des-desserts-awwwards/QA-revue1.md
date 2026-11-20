# QA revue 1 : maison-des-desserts-awwwards (faits)

Build : `dist/maison-des-desserts/awwwards/` (5 pages, sans erreur).
Serveur local : `http://127.0.0.1:4502/maison-des-desserts/awwwards/` (arrêté après les mesures).
Journaux : `.logs/maison-des-desserts-awwwards-revue1-*.log`.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/maison-des-desserts/awwwards/`) | `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-awwwards-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-awwwards-revue1/home/planche.png` (19 images) |
| Carte (`/maison-des-desserts/awwwards/carte/`) | `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-awwwards-revue1/maison-des-desserts-item/` | `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-awwwards-revue1/maison-des-desserts-item/planche.png` (19 images) |
| 404 (`/__shoot-missing-page-…`) | `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-awwwards-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-maison-des-desserts-awwwards-revue1/404/planche.png` (19 images) |

Rapports bruts : `<dossier>/report.json` (un par page).
Note : `planche.py` affiche « ignoré 4 » et « ignoré 480 » (valeurs de `--colonnes` et `--largeur` lues comme fichiers) ; la planche est produite avec 4 colonnes et 480 px.

## Chiffres par page

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| LCP desktop (ms) | 96 | 132 | 36 |
| LCP mobile (ms, throttled) | 1680 | 1904 | 224 |
| CLS desktop | 0.002 | 0.002 | 0 |
| CLS mobile | 0.061 | 0.004 | 0 |
| FPS scroll desktop / mobile | 60 / 60 | 60 / 60 | 61 / 61 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors champ (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 |
| Violations axe (total / serious) | 0 / 0 | 0 / 0 | 1 / 1 |
| axe contrastNeedsReview | 32 | 210 | 0 |
| Clavier : arrêts de tabulation | 12 | 12 | 3 |
| Clavier : focus invisible / sans focus visible / lien d'évitement en premier / bloqué | aucun / aucun / non / non | aucun / aucun / non / non | aucun / aucun / non / non |
| Survol : cibles couvertes / sans changement au survol | 0 / 0 | 0 / 1 | 0 / 2 |
| Mouvement réduit : texte caché / animations actives | 0 / non | 0 / non | 0 / non |

Violation axe détaillée (404 uniquement) : `color-contrast`, impact serious, 2 nœuds.
Accueil et carte : aucune violation axe.

## Audit (`audit.mjs`)

- FAIL : 0
- WARN : 2
  - site : pas de `robots.txt`
  - site : pas de `sitemap` (le build a pourtant créé `sitemap-index.xml` dans `sites/maison-des-desserts-awwwards/dist`, non vérifié par l'audit)
- Crawl : 4 pages ; page la plus lourde `/maison-des-desserts/awwwards/` (~750 KB ; HTML 5, JS 62 gz, CSS 6 gz, polices 67, images 610).
