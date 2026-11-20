# QA revue 2 — cafe-fleuri / awwwards (faits)

Build : `scripts/q.sh cafe-fleuri-awwwards-revue2-build` → rc 0, `dist/cafe-fleuri/awwwards/`.
Serveur : `.claude/skills/awwwards/scripts/serve.mjs dist --port 4502`, arrêté après captures.
Captures : `.claude/skills/awwwards/scripts/shoot.mjs --crawl --nav` (journal `.logs/cafe-fleuri-awwwards-revue2-shoot.log`).
Audit : `.claude/skills/awwwards/scripts/audit.mjs` (journal `.logs/cafe-fleuri-awwwards-revue2-audit.log`).

## Pages

| Page | URL testée | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | `/cafe-fleuri/awwwards/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-awwwards-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-awwwards-revue2/home/planche.png` |
| Carte | `/cafe-fleuri/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-awwwards-revue2/cafe-fleuri-item/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-awwwards-revue2/cafe-fleuri-item/planche.png` |
| 404 | `/__shoot-missing-page-*` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-awwwards-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-awwwards-revue2/404/planche.png` |

Chaque planche : 19 images (d-*, m-*), 4 colonnes, 480 px de large (1920 × 5280 px).
Note sur `scripts/planche.py` : les valeurs de `--colonnes 4 --largeur 480` sont aussi lues comme images (« ignoré 4 », « ignoré 480 ») ; sans effet sur la sortie.

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations | 0 (0 serious) | 0 (0 serious) | 1 (`color-contrast`, serious, 2 nœuds) |
| Axe : contrastNeedsReview | 23 | 10 | 0 |
| CLS bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP bureau (ms) | 80 | 448 | 40 |
| LCP mobile (ms, 4x CPU, slow 4G) | 904 | 2112 | 232 |
| Chargement bureau / mobile (ms) | 128 / 1908 | 95 / 1738 | 27 / 413 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Cibles tactiles petites bureau | `A 156x22` | aucune | `la page d'accueil 128x20` |
| Cibles tactiles petites mobile | `A 142x21` | aucune | `la page d'accueil 128x20` |
| Éléments cachés (offenders) bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS défilement bureau / mobile | 60 / 60 | 60 / 60 | n.d. |
| Mouvement réduit : texte caché / animé | 0 / non | 0 / non | 0 / non |
| Survol : cibles testées | 6 | 5 | 2 |
| Survol : changement couleur seule | `Réserver une table`, `Appeler` | `Appeler` | aucun |
| Survol : sans changement | 0 | 0 | 2 (`la page d'accueil`, `Réalisé par`) |
| Clavier : arrêts de tabulation | 12 | 12 | 3 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus bloqué | non | non | non |
| Clavier : lien d'évitement en premier | non | non | non |

Les 404 n'ont que 3 arrêts clavier (dont « focus quitte la page »).

## Audit (audit.mjs, racine `/cafe-fleuri/awwwards/`)

- 4 pages explorées ; poids de la page la plus lourde : ~151 KB (HTML 4, JS 61 gz, CSS 5 gz, polices 71, images 11).
- FAIL : 0.
- WARN : 2
  - `site` : pas de `robots.txt`
  - `site` : pas de `sitemap`

## Notes du rapport

- Bureau : rendu GPU logiciel (headless), FPS indicatifs seulement.
- Mobile : 4x de ralentissement CPU, 4G lente ; `vitals` et `scrollFps` mobiles sont les chiffres retenus.
- Page 404 : FPS non relevés dans le rapport (`n.d.`).
