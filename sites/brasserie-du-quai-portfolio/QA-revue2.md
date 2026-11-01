# QA revue 2 : brasserie-du-quai, variante portfolio

Faits seulement. Build, captures, audit et planches réalisés le 01/11/2026 sur `http://127.0.0.1:4501/brasserie-du-quai/portfolio/` (build `dist/brasserie-du-quai/portfolio/`).

## Build

- `scripts/q.sh brasserie-du-quai-portfolio-revue2-build node scripts/build-site.mjs sites/brasserie-du-quai-portfolio` : exit 0, 7 pages, sitemap créé.
- Journal : `.logs/brasserie-du-quai-portfolio-revue2-build.log`

## Captures

Commande : `shoot.mjs --crawl --nav --out .shots-brasserie-du-quai-portfolio-revue2` (journal `.logs/brasserie-du-quai-portfolio-revue2-shoot.log`, exit 0).

Le crawl de `shoot.mjs` a produit 3 dossiers de page (`pickPages`), et non les 7 pages du site :

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil | `.shots-brasserie-du-quai-portfolio-revue2/home/` (37 fichiers) | `.shots-brasserie-du-quai-portfolio-revue2/home/planche.png` |
| Fiche type (carte) | `.shots-brasserie-du-quai-portfolio-revue2/brasserie-du-quai-item/` (37 fichiers) | `.shots-brasserie-du-quai-portfolio-revue2/brasserie-du-quai-item/planche.png` |
| 404 | `.shots-brasserie-du-quai-portfolio-revue2/404/` (16 fichiers) | `.shots-brasserie-du-quai-portfolio-revue2/404/planche.png` |

Les planches ont été générées par `python3 scripts/planche.py <dossier>/planche.png <dossier>/d-*.png <dossier>/m-*.png --colonnes 4 --largeur 480` (exit 0 pour les trois).

Pages non capturées par le crawl de `shoot.mjs` : `/carte/`, `/ecailler/`, `/histoire/`, `/reservation/`, `/terrasse/`. Ce sont celles que `audit.mjs` a parcourues (voir plus bas).

Note `--nav` : sur la page 404, aucun lien vers une autre page n'a pu être cliqué (`notes` du report : « tried none found »). Sur les deux autres pages, `nav.href` est renseigné.

## Chiffres par page (report.json et summary.json)

| Indicateur | Accueil | Fiche (carte) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 | 0 | 2 (`document-title`, `html-has-lang`) |
| Contraste à vérifier (axe) | 29 | 0 | non renseigné dans le résumé |
| LCP desktop | 164 ms (`span.nom__l1`) | 140 ms (`h1#t-carte`) | 60 ms (`pre`) |
| CLS desktop | 0,003 | 0,002 | 0 |
| LCP mobile (throttled) | 1192 ms (`span.nom__w`) | 1100 ms (`p.lead`) | 228 ms (`pre`) |
| CLS mobile | 0,004 | 0 | 0 |
| Débordement horizontal (desktop / mobile) | non / non | non / non | non / non |
| Éléments cachés (`glHidden`) | 0 | 0 | 0 |
| Cibles tactiles petites (desktop / mobile) | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS scroll desktop / mobile | 57 / 59 | 60 / 60 | 60 / 60 |
| Clavier : focus sans contour visible | 0 | 0 | 0 |
| Clavier : focus invisible | 0 | 0 | 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Survol sans changement | 0 | 2 | 0 |
| Survol, changement de couleur seul | 1 | 0 | 0 |
| Mouvement au repos | oui | oui | non |
| Titre de la page | présent | présent | absent (vide) |

Notes :
- Les FPS desktop sont mesurés sur GPU logiciel headless (plancher, pas une mesure matérielle). Le rapport le signale lui-même.
- Mobile : CPU ralenti x4, 4G lente.
- Accueil : `settledMs` desktop 4250 ms ; mobile `settledMs` null.

## Audit (`audit.mjs`)

Commande : `scripts/q.sh brasserie-du-quai-portfolio-revue2-audit node .claude/skills/awwwards/scripts/audit.mjs http://127.0.0.1:4501/brasserie-du-quai/portfolio/` (exit 0, journal `.logs/brasserie-du-quai-portfolio-revue2-audit.log`).

- Résultat : **0 FAIL, 5 WARN**. 6 pages parcourues.
- WARN, `/brasserie-du-quai/portfolio/terrasse/` : phrase répétée 2 fois, « 12:00 à 14:30, 18:00 à 21:30 ».
- WARN, `/brasserie-du-quai/portfolio/histoire/` : phrase répétée 3 fois, « Tripadvisor, avis résumé (résumé, pas une citation mot à mot) ».
- WARN, site : la page 404 n'a pas de `<h1>`.
- WARN, site : pas de `robots.txt`.
- WARN, site : pas de `sitemap`.
- Page la plus lourde : `/brasserie-du-quai/portfolio/histoire/`, environ 646 Ko (HTML 5, JS 7 gz, CSS 6 gz, polices 41, images 586).

Note : `audit.mjs` signale l'absence de `sitemap` et de `robots.txt`, alors que le build a créé `sitemap-index.xml` dans `sites/brasserie-du-quai-portfolio/dist`. Le contrôle ne les trouve pas à l'URL testée ; ce point n'a pas été vérifié plus loin.

## Divers

- Serveur `serve.mjs` sur le port 4501 : arrêté (PIDs 9433 et 26689 ; le PID 4572 n'existait plus).
- Fichiers modifiés par le build : `dist/` (régénéré, non commité). Aucun fichier source modifié. Aucun commit.
- Journaux : `.logs/brasserie-du-quai-portfolio-revue2-*.log`, `.logs/serve-portfolio.log`.
