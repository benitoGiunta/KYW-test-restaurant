# QA build : bergerie-lives / portfolio

Passe : build · Phase : test · Source : `dist/bergerie-lives/portfolio/` servi sur `http://127.0.0.1:4501/bergerie-lives/portfolio/` (serveur arrêté après les captures).

Build : `scripts/q.sh bergerie-lives-portfolio-build-build` : exit 0, 7 pages construites (404, chambres, contact, index, le-domaine, mariage, seminaires).

Captures : `.shots-bergerie-lives-portfolio-build/` (3 dossiers de pages crawlées : `home`, `404`, `bergerie-lives-item`, chacun avec `report.json`).
Planches : `.shots-bergerie-lives-portfolio-build/home/planche.png`, `.shots-bergerie-lives-portfolio-build/404/planche.png`, `.shots-bergerie-lives-portfolio-build/bergerie-lives-item/planche.png` (19 images chacune).

## Par page

| Page | Dossier captures | Planche |
|---|---|---|
| Accueil `/bergerie-lives/portfolio/` | `.shots-bergerie-lives-portfolio-build/home/` | `.shots-bergerie-lives-portfolio-build/home/planche.png` |
| Chambres `/bergerie-lives/portfolio/chambres/` | `.shots-bergerie-lives-portfolio-build/bergerie-lives-item/` | `.shots-bergerie-lives-portfolio-build/bergerie-lives-item/planche.png` |
| 404 (URL inexistante) | `.shots-bergerie-lives-portfolio-build/404/` | `.shots-bergerie-lives-portfolio-build/404/planche.png` |

## Chiffres (report.json)

| Mesure | Accueil | Chambres | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 1 (color-contrast, serious) |
| Contraste à vérifier (axe) | 21 | 4 | 0 |
| FPS scroll bureau / pire frame ms | 60 / 17 | 60 / 17 | 60 / 17 |
| LCP bureau (ms) | 128 | 80 | 36 |
| LCP mobile (ms, throttled) | 1388 | 1168 | 264 |
| CLS bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments hors écran (offenders) bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites (bureau) | 0 | 0 | 1 (« la page d'accueil » 128x20) |
| Clavier : focus invisible / sans focus visible / bloqué | 0 / 0 / non | 0 / 0 / non | 0 / 0 / non |
| Lien d'évitement en premier arrêt (champ `skipLinkFirst`) | false | false | false |
| Survol : couleur seule / recouvert / sans changement | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 2 |
| Mouvement réduit : texte caché / animation active | 0 / non | 0 / non | 0 / non |

Note : le champ `skipLinkFirst` vaut `false` sur les trois pages ; la liste des arrêts clavier de l'accueil commence pourtant par « Aller au contenu » (12 arrêts). Fait brut, sans interprétation.

## Audit (`audit.mjs`)

Résultat : 0 FAIL, 4 WARN, 6 pages crawlées (journal : `.logs/bergerie-lives-portfolio-build-audit.log`).
- WARN `/bergerie-lives/portfolio/chambres/` : phrase répétée 2 fois « Des chambres d'hôtes au coeur du domaine, avec petit déjeuner bio et a… ».
- WARN `/bergerie-lives/portfolio/chambres/` : phrase répétée 2 fois « Un petit déjeuner varié et bio, servi en chambre ou en salle. ».
- WARN site : pas de `robots.txt`.
- WARN site : pas de `sitemap`.
- Poids de la page la plus lourde (`/bergerie-lives/portfolio/`) : ~2271 KB (HTML 5, JS 6 gz, CSS 6 gz, polices 109, images 2144).

Le build écrit `sitemap-index.xml` dans `sites/bergerie-lives-portfolio/dist` (fait du journal de build) ; l'audit signale quand même « no sitemap » (chemin de recherche de l'audit non vérifié).

## Divers

- `scripts/planche.py` : les options `--colonnes 4 --largeur 480` ne sont pas reconnues (lecture des options par `zip` sur `sys.argv`) ; les valeurs `4` et `480` sont prises pour des fichiers (« ignoré ») et les planches sortent avec la disposition par défaut (1920 x 5280 px).
- Le shoot a capturé 3 dossiers (accueil, chambres = `bergerie-lives-item`, 404) ; l'audit a crawlé 6 pages.
