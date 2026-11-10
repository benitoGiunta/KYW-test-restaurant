# QA revue 2 — sanga / portfolio

Build : `scripts/build-site.mjs sites/sanga-portfolio` (exit 0, sortie `dist/sanga/portfolio/`).
Serveur local : `serve.mjs dist --port 4501`, URL `http://127.0.0.1:4501/sanga/portfolio/`.
Captures : `shoot.mjs --crawl --nav` ; audit : `audit.mjs`. Journaux dans `.logs/sanga-portfolio-revue2-*.log`.

## Pages et captures

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/sanga/portfolio/`) | `/home/user/KYW-test-restaurant/.shots-sanga-portfolio-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-sanga-portfolio-revue2/home/planche.png` |
| La carte (`/sanga/portfolio/carte/`) | `/home/user/KYW-test-restaurant/.shots-sanga-portfolio-revue2/sanga-item/` | `/home/user/KYW-test-restaurant/.shots-sanga-portfolio-revue2/sanga-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-sanga-portfolio-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-sanga-portfolio-revue2/404/planche.png` |

Résumé global des captures : `/home/user/KYW-test-restaurant/.shots-sanga-portfolio-revue2/summary.json`.
La planche a été produite avec les valeurs par défaut de `planche.py` (4 colonnes, 480 px) : les options `--colonnes` et `--largeur` n'ont pas été reconnues et sont sorties en « ignoré ». Résultat : 1920 px de large.
Le shoot n'a pas trouvé de lien de navigation vers une autre page sur la 404 (`--nav` : aucun lien cliquable).

## Chiffres par page (report.json)

| Mesure | Accueil | La carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 | 0 | 2 (`document-title`, `html-has-lang`) |
| Contraste à vérifier (axe) | 141 | 142 | — |
| LCP desktop | 192 ms | 192 ms | 52 ms |
| CLS desktop | 0 | 0 | 0 |
| LCP mobile (4x CPU, 4G lente) | 1276 ms | 1424 ms | 232 ms |
| CLS mobile | 0 | 0 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS scroll desktop / mobile | 60 / 60 | 60 / 60 | 60 / 60 |
| Texte caché (mouvement réduit) | 0 | 0 | 0 |
| Mouvement réduit | non | non | non |
| Focus clavier sans indicateur visible | 0 | 0 | aucun |
| Focus invisible | 0 | 0 | aucun |
| Lien d'évitement en premier | non | non | non |
| Survol sans changement | 0 | 1 | 0 |
| Contraste seul porteur d'information (couleur) | 2 | 1 | 0 |
| Mouvement au repos | oui | non | non |

Notes :
- Le FPS desktop est mesuré en headless sur GPU logiciel (plancher, non représentatif). Le FPS mobile est à 4x de ralentissement CPU.
- Sur la carte, le parcours clavier se termine par `(body: focus left the page)` après « Réalisé par ».
- Sur la 404, le parcours clavier ne contient aucun arrêt (`(body: focus left the page)` seul).

## Audit (audit.mjs)

- 4 pages explorées depuis `/sanga/portfolio/` (le shoot a produit 3 dossiers : accueil, carte, 404).
- Page la plus lourde : `/sanga/portfolio/`, environ 583 KB (html 5, JS 61 gz, CSS 7 gz, polices 54, images 456).
- Résultat : **0 FAIL**, **5 WARN**.
- Détail des WARN : non relevé dans cette passe (sortie tronquée par `q.sh`, voir `.logs/sanga-portfolio-revue2-audit.log`).
