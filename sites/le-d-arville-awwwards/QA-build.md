# QA build : le-d-arville / awwwards (passe build, phase test)

Build : `dist/le-d-arville/awwwards/` (5 pages construites, sitemap créé). Serveur local `dist` sur le port 4502, arrêté après les captures.
Audit : 4 pages explorées ; captures faites sur 3 pages seulement (voir « Pages non capturées »).

## Pages et captures

| Page | URL testée | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | `/le-d-arville/awwwards/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-awwwards-build/home/planche.png` |
| La carte | `/le-d-arville/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-awwwards-build/le-d-arville-item/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-awwwards-build/le-d-arville-item/planche.png` |
| 404 | `/__shoot-missing-page-*` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-le-d-arville-awwwards-build/404/planche.png` |

Chaque dossier contient 13 captures desktop (`d-*`) et 6 mobiles (`m-*`), plus `report.json`. Synthèse : `/home/user/KYW-test-restaurant/.shots-le-d-arville-awwwards-build/summary.json`.

## Chiffres par page (report.json)

| Indicateur | Accueil | La carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 | 0 | 1 : `color-contrast` (`.kyw-footer__note` et `span`, #6b787d sur #fbfaf8, 4,36:1, seuil 4,5:1) |
| Axe « needs review » (contraste) | 8 | 2 | 0 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop (ms) | 524 | 88 | 40 |
| LCP mobile (ms, throttle) | 2924 | 948 | 212 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles petites (summary.json) | 5 | 3 | 1 |
| Focus clavier invisible | 0 | 0 | 0 |
| Focus sans indicateur visible | 0 | 0 | 0 |
| Arrêts clavier | 12 | 12 | 3 |
| Saut de lien d'évitement en premier | non | non | non |
| Hover sans changement | 1 (`D’Arville`) | 2 (`D’Arville`, `La carte`) | 2 |
| Hover couleur seule | 1 (adresse) | 1 (adresse) | 0 |
| Éléments recouverts au hover | 0 | 1 (`le site du restaurant`) | 0 |
| Texte caché réduit (reduced motion) | 1 | 1 | 0 |
| Mouvement en reduced motion | non | non | non |
| FPS scroll desktop (headless) | 60 | 60 | 61 |
| Titre H1 | LE D’ARVILLE | LA CARTE | Page introuvable |

Notes du rapport : FPS desktop mesuré en headless sur GPU logiciel (plancher, pas une mesure matérielle) ; mobile à 4x de ralentissement CPU, slow 4G.

## Audit (audit.mjs)

- Résultat : **0 FAIL, 6 WARN**.
- WARN :
  - `/le-d-arville/awwwards/` : meta description de 180 caractères (cible 50-160).
  - `/le-d-arville/awwwards/carte/` : phrase répétée 2 fois « Pour commencer Quatre mises en bouche ».
  - `/le-d-arville/awwwards/carte/` : phrase répétée 2 fois « Pour finir Dessert de la carte ».
  - `/le-d-arville/awwwards/reservation/` : phrase répétée 2 fois « Rue d’Arville 94 5100 Wierde (Namur) ».
  - site : pas de `robots.txt`.
  - site : pas de `sitemap`.
- Poids de la page la plus lourde : `/le-d-arville/awwwards/`, environ 2508 Ko (images 2301 Ko, JS 61 Ko gz, CSS 6 Ko gz, polices 134 Ko).

## Pages non capturées

- `/le-d-arville/awwwards/reservation/` : présente dans l'audit (4 pages explorées) mais absente des captures (shoot : accueil, carte, 404 seulement).

## Anomalies relevées

- Page 404 : une violation axe sérieuse (contraste du pied de page, `#6b787d` sur `#fbfaf8`).
- Accueil : le lien « D’Arville » ne change rien au survol.
- Carte : le lien « le site du restaurant » est recouvert au survol.
