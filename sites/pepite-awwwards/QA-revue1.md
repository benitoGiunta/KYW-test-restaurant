# QA revue 1 : pepite-awwwards (faits)

Build : `scripts/build-site.mjs sites/pepite-awwwards`, exit 0, 5 pages, sortie `dist/pepite/awwwards/`.
Serveur : `serve.mjs dist --port 4502`, URL `http://127.0.0.1:4502/pepite/awwwards/`.
Captures : `shoot.mjs --crawl --nav`, 3 dossiers de pages. Journal : `.logs/pepite-awwwards-revue1-shoot.log`.
Audit : `audit.mjs`, journal `.logs/pepite-awwwards-revue1-audit.log`.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/pepite/awwwards/`) | `/home/user/KYW-test-restaurant/.shots-pepite-awwwards-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-pepite-awwwards-revue1/home/planche.png` (1920 x 5280, 19 images) |
| Fiche (`pepite-item`) | `/home/user/KYW-test-restaurant/.shots-pepite-awwwards-revue1/pepite-item/` | `/home/user/KYW-test-restaurant/.shots-pepite-awwwards-revue1/pepite-item/planche.png` (1920 x 5280, 19 images) |
| 404 | `/home/user/KYW-test-restaurant/.shots-pepite-awwwards-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-pepite-awwwards-revue1/404/planche.png` (1920 x 4224, 14 images) |

Note sur `scripts/planche.py` : les options `--colonnes 4 --largeur 480` ne sont pas lues (leurs valeurs sont traitées comme des fichiers, « ignoré 4 », « ignoré 480 »). Les planches ont été produites avec les valeurs par défaut du script (largeur 1920).

## Chiffres (report.json)

| Mesure | Accueil | Fiche | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 2 (`document-title`, `html-has-lang`, serious, 1 nœud chacune) |
| Contraste à vérifier (axe) | 15 | 11 | 0 |
| LCP desktop (ms, élément) | 104 (`p.lead`) | 532 (`p.lead`) | 48 (`pre`) |
| LCP mobile (ms, élément) | 1088 (`p.lead`) | 2232 (`p.lead`) | 228 (`pre`) |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Load desktop / mobile (ms) | 162 / 2257 | 146 / 2057 | 45 / 211 |
| Settled desktop / mobile (ms) | 2549 / 4532 | 2387 / 4176 | 2196 / 2225 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS scroll desktop (pire trame ms) | 60 (17) | non relevé | 60 (17) |
| FPS scroll mobile (pire trame ms) | 58 (33) | non relevé | non relevé |
| WebGL desktop / mobile (glOn) | non / non | non / non | non / non |
| Clavier : arrêts de tabulation | 12 | 12 | 1 (« focus left the page ») |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : bloqué (stuck) | non | non | non |
| Clavier : `skipLinkFirst` (champ brut) | false | false | false |
| Texte caché en mouvement réduit | 0 | 0 | 0 |
| Mouvement réduit (moving) | false | false | false |

Remarques de mesure (issues des `notes` du report) : FPS desktop mesuré en headless sur GPU logiciel ; mobile à ralentissement CPU x4 et 4G lente.

Survol (hover) : relevé dans les report.json (`hover.targets`, 2 cibles et plus par page) ; le détail n'est pas repris ici.

## Audit (audit.mjs)

- FAIL : 0
- WARN : 3
  - 404 : « page has no <h1> »
  - site : « no robots.txt »
  - site : « no sitemap » (le journal de build indique pourtant `sitemap-index.xml` créé dans `dist`)
- 4 pages crawlées ; page la plus lourde `/pepite/awwwards/` : ~629 KB (html 5, JS 60 gz, CSS 6 gz, fonts 91, images 466).

## Serveur

Le serveur `serve.mjs` (PID 28365, port 4502) est arrêté en fin de passe.
