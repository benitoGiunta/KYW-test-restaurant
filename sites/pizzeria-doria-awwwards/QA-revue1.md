# QA revue 1 — pizzeria-doria, variante awwwards (faits)

Build : `scripts/q.sh pizzeria-doria-awwwards-revue1-build` → exit 0, 5 pages, `dist/pizzeria-doria/awwwards/`.
Serveur local : `http://127.0.0.1:4502/pizzeria-doria/awwwards/` (arrêté après les captures).
Captures : `.shots-pizzeria-doria-awwwards-revue1/`. Audit : `.logs/pizzeria-doria-awwwards-revue1-audit.log`.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/pizzeria-doria/awwwards/` | `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-awwwards-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-awwwards-revue1/home/planche.png` |
| Carte `/pizzeria-doria/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-awwwards-revue1/pizzeria-doria-item/` | `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-awwwards-revue1/pizzeria-doria-item/planche.png` |
| 404 (URL inexistante, volontaire) | `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-awwwards-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-awwwards-revue1/404/planche.png` |

Note : `planche.py` ignore les options `--colonnes` et `--largeur` (il les lit comme fichiers, avertissement « ignoré »). Les planches font 1920 px de large, 19 images.

## Mesures (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe violations (toutes) | 0 | 0 | 1 (color-contrast, serious, 2 nœuds) |
| Axe contrast à vérifier | 7 | 3 | 0 |
| CLS desktop / mobile | 0 / 0 | 0.002 / 0 | 0 / 0 |
| LCP desktop (ms) | 80 (img) | 68 (p.entete__lead) | 40 (p) |
| LCP mobile (ms) | 1228 (img) | 1040 (p.entete__lead) | 232 (p) |
| Chargement desktop / mobile (ms) | 130 / 2127 | 95 / 1934 | 27 / 410 |
| FPS scroll desktop / mobile | 60 / 60 | 60 / 60 | 60 / 60 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 («la page d'accueil» 128×20) |
| Éléments hors champ (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Éléments cachés (hiddenText réduit) | 0 | 0 | 0 |
| WebGL (glOn / glHidden) | false / [] | false / [] | false / [] |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : piège (stuck) | non | non | non |
| Lien d'évitement en premier | non | non | non |
| Survol sans changement | 1 | 2 | 2 |
| Survol couleur seule | 3 | 1 | 0 |
| Mouvement idle | non | non | non |

## Audit (`audit.mjs`)

- Lignes FAIL : aucune (0 FAIL).
- Nombre de WARN : 12.
- Poids : page la plus lourde `/pizzeria-doria/awwwards/` ~662 KB ; HTML 5, JS 61 (gz), CSS 6 (gz), polices 66, images 524.
- Crawl : 4 pages trouvées depuis l'accueil ; 3 captures effectuées (accueil, carte, 404).
