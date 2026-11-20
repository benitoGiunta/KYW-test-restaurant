# QA revue1 — brasserie-edgard (awwwards)

Faits seulement (rôle captures). Build, captures et audit lancés sur `dist/brasserie-edgard/awwwards/` servi en local (port 4502). Aucun fichier source modifié, aucun commit.

Build : `sites/brasserie-edgard-awwwards` → `dist/brasserie-edgard/awwwards/`, rc 0, 5 pages construites.

## Pages capturées

Dossiers de captures : `/home/user/KYW-test-restaurant/.shots-brasserie-edgard-awwwards-revue1/`

| Page (URL testée) | Dossier de captures | Planche |
|---|---|---|
| `/brasserie-edgard/awwwards/` (accueil) | `.shots-brasserie-edgard-awwwards-revue1/home/` | `.shots-brasserie-edgard-awwwards-revue1/home/planche.png` |
| `/brasserie-edgard/awwwards/carte/` | `.shots-brasserie-edgard-awwwards-revue1/brasserie-edgard-item/` | `.shots-brasserie-edgard-awwwards-revue1/brasserie-edgard-item/planche.png` |
| `/__shoot-missing-page-…` (404 de test) | `.shots-brasserie-edgard-awwwards-revue1/404/` | `.shots-brasserie-edgard-awwwards-revue1/404/planche.png` |

Les planches font 1920 × 5280 px, 19 images chacune. Le crawl de `shoot.mjs` a produit 3 dossiers ; l'audit en a crawlé 4 (dont la page 404 de test).

## Chiffres des report.json

| Indicateur | Accueil | Carte (item) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 1 (`color-contrast`, impact serious, 2 nœuds) |
| Axe « contrast needs review » | 25 | 13 | 0 |
| CLS bureau / mobile | 0,006 / 0 | 0 / 0 | 0 / 0 |
| LCP bureau (ms, élément) | 76 (`p.hero__lede`) | 92 (`p.entete__texte`) | 56 (`p`) |
| LCP mobile (ms, élément) | 1224 (`p.hero__lede`) | 2008 (`img`) | 236 (`p`) |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles < seuil bureau / mobile | 0 / 0 | 0 / 0 | 1 / 1 («la page d'accueil», 128×20) |
| Éléments cachés (glHidden) bureau | [] | [] | [] |
| WebGL actif bureau | non | non | non |
| Texte caché en mouvement réduit | 0 | 0 | 0 |
| Mouvement en mouvement réduit | non | non | non |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus bloqué (stuck) | non | non | non |
| Clavier : premier arrêt = lien « Aller au contenu » | oui | oui | non (premier arrêt : « la page d'accueil ») |
| Clavier : sortie du focus hors page (fin de parcours) | non | non | oui (« body: focus left the page ») |
| Survol : cibles / sans changement / changement couleur seul / recouvertes | 7 / 0 / 1 / 0 | 7 / 0 / 3 / 0 | 2 / 2 / 0 / 0 |
| Curseur suiveur | non | non | non |

Note : `skipLinkFirst` vaut `false` sur les trois pages alors que le premier arrêt clavier est le lien « Aller au contenu » sur l'accueil et la carte. Le champ du rapport ne reflète donc pas ce qui est observé dans `keyboard.stops`.

## Audit (`audit.mjs`)

- Résultat : **0 FAIL, 2 WARN**.
- WARN `site` : « no robots.txt ».
- WARN `site` : « no sitemap ».
- Crawl : 4 pages. Page la plus lourde : `/brasserie-edgard/awwwards/`, environ 1014 Ko (html 7, JS 62 gz, CSS 6 gz, polices 50, images 888).

Journaux : `.logs/brasserie-edgard-awwwards-revue1-build.log`, `.logs/brasserie-edgard-awwwards-revue1-shoot.log`, `.logs/brasserie-edgard-awwwards-revue1-audit.log`.
