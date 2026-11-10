# QA revue 1 — li-micougni / awwwards (rôle captures)

Faits uniquement, extraits des `report.json` et de l'audit. Build : `dist/li-micougni/awwwards/` (exit 0, 5 pages).
Serveur local de test : `http://127.0.0.1:4502/li-micougni/awwwards/` (arrêté après les captures).

## Captures et planches par page

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/li-micougni/awwwards/`) | `/home/user/KYW-test-restaurant/.shots-li-micougni-awwwards-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-li-micougni-awwwards-revue1/home/planche.png` |
| Carte (`/carte/`, nommée `li-micougni-item`) | `/home/user/KYW-test-restaurant/.shots-li-micougni-awwwards-revue1/li-micougni-item/` | `/home/user/KYW-test-restaurant/.shots-li-micougni-awwwards-revue1/li-micougni-item/planche.png` |
| 404 (page générée par le crawl) | `/home/user/KYW-test-restaurant/.shots-li-micougni-awwwards-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-li-micougni-awwwards-revue1/404/planche.png` |

Rapport de capture global : `/home/user/KYW-test-restaurant/.shots-li-micougni-awwwards-revue1/summary.json`.
Note : `planche.py` a ignoré les options `--colonnes 4 --largeur 480` (lues comme des fichiers) ; les planches sont sorties à 1920 px de large, valeurs par défaut.

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (serious 0) | 0 (serious 0) | 2 (serious 2 : `document-title`, `html-has-lang`) |
| Axe contrastNeedsReview | 40 | 52 | 0 |
| LCP desktop / mobile (ms) | 92 / 2480 | 188 / 2236 | 48 / 256 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Chargement load desktop / mobile (ms) | 156 / 2752 | 232 / 2207 | 34 / 245 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS scroll desktop / mobile | 60 / 60 | voir report.json | voir report.json |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : bloqué (stuck) | non | non | non |
| Clavier : premier arrêt = lien d'évitement | non (1er arrêt : « Aller au contenu ») | non (1er arrêt : « Aller au contenu ») | non (focus sorti de la page) |
| Mouvement réduit : texte masqué / mouvement | 0 / non | 0 / non | 0 / non |
| Survol : couleur seule / recouvert / sans changement | 0 / 0 / 0 | 0 / 0 / 0 | 0 / 0 / 0 |
| Curseur suiveur détecté | non | non | non |

Notes du rapport : les FPS desktop sont ceux d'un GPU logiciel headless (plancher, pas une mesure matérielle) ; les FPS et vitals mobiles sont en throttling CPU 4x et 4G lente.

## Audit (`audit.mjs`)

- Résultat : 0 FAIL, 3 WARN (journal : `/home/user/KYW-test-restaurant/.logs/li-micougni-awwwards-revue1-audit.log`).
- Poids de la page la plus lourde : `/li-micougni/awwwards/`, environ 1089 KB (HTML 5, JS 60 gz, CSS 6 gz, polices 72, images 946).
- Crawl : 4 pages.

## Journaux

- Build : `/home/user/KYW-test-restaurant/.logs/li-micougni-awwwards-revue1-build.log`
- Capture : `/home/user/KYW-test-restaurant/.logs/li-micougni-awwwards-revue1-shoot.log`
- Serveur : `/home/user/KYW-test-restaurant/.logs/serve-awwwards.log`
