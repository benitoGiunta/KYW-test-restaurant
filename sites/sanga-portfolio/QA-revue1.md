# QA revue 1 — sanga / portfolio (captures)

Build : `scripts/build-site.mjs sites/sanga-portfolio` exit 0 (sortie `dist/sanga/portfolio/`).
Serveur local : `dist` sur `http://127.0.0.1:4501/sanga/portfolio/`, arrêté après les captures.
Journaux complets : `.logs/sanga-portfolio-revue1-*.log`.

## Captures et planches

| Page | Dossier de captures | Planche | Fichiers |
|---|---|---|---|
| `/sanga/portfolio/` (accueil) | `.shots-sanga-portfolio-revue1/home/` | `.shots-sanga-portfolio-revue1/home/planche.png` | 40 |
| `/sanga/portfolio/carte/` | `.shots-sanga-portfolio-revue1/sanga-item/` | `.shots-sanga-portfolio-revue1/sanga-item/planche.png` | 36 |
| page 404 (URL inexistante) | `.shots-sanga-portfolio-revue1/404/` | `.shots-sanga-portfolio-revue1/404/planche.png` | 17 |

Note : la planche a été générée avec `scripts/planche.py` ; ce script ne lit pas les options `--colonnes` et `--largeur` (elles sont prises pour des fichiers, d'où les lignes « ignoré 4 » et « ignoré 480» dans le journal). Les planches sont produites malgré tout, sans réglage de colonnes ni de largeur.

Le shoot annonce 3 pages ; l'audit en crawle 4 (`/`, `/carte/`, `/commander/`, 404). Aucun dossier de capture pour `/commander/` et `/maison/`.

## Chiffres des report.json

| Mesure | accueil | carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 | 0 | 2 (`document-title`, `html-has-lang`) |
| Axe « contrast needs review » | 146 | 148 | 0 |
| LCP bureau (ms) | 128 (`h1.hero__nom`) | 172 (`img`) | 52 (`pre`) |
| LCP mobile (ms) | 1288 (`h1.hero__nom`) | 1428 (`img`) | 272 (`pre`) |
| CLS bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments qui débordent (bureau / mobile) | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites (bureau / mobile) | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS défilement bureau | 60 (pire frame 17 ms) | 60 (pire frame 17 ms) | 60 (pire frame 17 ms) |
| Titre `<title>` | « Sanga \| Ramen à Namur » | « La carte \| Sanga » | vide |
| `h1` bureau / mobile | « Sanga » / « Sanga » | « La carte » / « La carte » | aucun / aucun |
| Survol : cibles testées | 7 (2 couleur seule, curseur suiveur oui) | 5 (1 sans changement, curseur suiveur oui) | 0 |
| Mouvement idle | oui | non | non |
| Mouvement réduit (`prefers-reduced-motion`) | pas de mouvement, 0 texte caché | idem | idem |
| Clavier : pile de focus sans focus visible / invisible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : piège de focus | non | non | non |

Clavier, détail :
- accueil : premier arrêt « Aller au contenu » ; `skipLinkFirst` = false dans le report ; 12 arrêts relevés.
- carte : premier arrêt « Aller au contenu » ; `skipLinkFirst` = false ; 12 arrêts relevés.
- 404 : un seul arrêt « (body: focus left the page) ».

## Audit (`scripts/audit.mjs`)

- 0 FAIL, 5 WARN.
- WARN `/sanga/portfolio/` : phrase répétée 2 fois « 12:00 à 14:00, 18:00 à 22:00 ».
- WARN `/sanga/portfolio/commander/` : même phrase répétée 2 fois.
- WARN `site` : la page 404 n'a pas de `<h1>`.
- WARN `site` : pas de `robots.txt`.
- WARN `site` : pas de `sitemap`.
- Poids de la page la plus lourde (`/sanga/portfolio/`) : ~583 KB ; HTML 5, JS 61 (gz), CSS 7 (gz), polices 54, images 456.

Note : l'audit signale un `sitemap` absent, alors que le build annonce `sitemap-index.xml` créé dans `sites/sanga-portfolio/dist`. Vérification non faite (hors périmètre de cette passe, à contrôler dans `dist/sanga/portfolio/`).
