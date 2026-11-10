# QA build — makimono / awwwards (passe build, rôle captures)

Source : `dist/makimono/awwwards/` servi sur `http://127.0.0.1:4502/makimono/awwwards/` (build `scripts/build-site.mjs`, sortie 0).
Captures : `shoot.mjs --crawl --nav`, 3 pages capturées. Audit : `audit.mjs`, 4 pages explorées.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/makimono/awwwards/` | `/home/user/KYW-test-restaurant/.shots-makimono-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-makimono-awwwards-build/home/planche.png` |
| Fiche carte `/makimono/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-makimono-awwwards-build/makimono-item/` | `/home/user/KYW-test-restaurant/.shots-makimono-awwwards-build/makimono-item/planche.png` |
| 404 (sonde de page manquante) | `/home/user/KYW-test-restaurant/.shots-makimono-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-makimono-awwwards-build/404/planche.png` |

Journaux : `.logs/makimono-awwwards-build-build.log`, `.logs/makimono-awwwards-build-shoot.log`, `.logs/makimono-awwwards-build-audit.log`.

## Chiffres par page (report.json / summary.json)

| Mesure | Accueil | Fiche carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 | 0 | 2 (`document-title`, `html-has-lang`, 1 nœud chacune) |
| LCP desktop | 180 ms (img) | 104 ms (h1.display) | 44 ms (pre) |
| LCP mobile | 1548 ms (img) | 1084 ms (p.lede) | 252 ms (pre) |
| CLS desktop | 0 | 0 | 0 |
| CLS mobile | 0.003 | 0 | 0 |
| Débordement horizontal | non | non | non |
| Cibles tactiles petites | 0 | 0 | 0 |
| Texte caché (réduit) | 0 | 0 | 0 |
| FPS desktop / mobile | 60 / 60 | 60 / 60 | 60 / 61 |
| Fin d'animation hero (ms) | 4156 | 3831 | 2186 |
| Mouvement avec réduction | non | non | non |
| Focus clavier non visible | 0 | 0 | 0 |
| Focus invisible | 0 | 0 | 0 |
| Survol sans changement | 0 | 0 | 0 |
| Information par couleur seule | 2 | 2 | 0 |
| Lien d'évitement premier arrêt clavier | non | non | non |
| Arrêts clavier (tabulation) | 12 | 12 | 1 |

Notes du rapport : le FPS desktop est mesuré en rendu logiciel headless (plancher, pas une mesure matérielle) ; le 404 n'a aucun lien de navigation à cliquer (`--nav` : aucun lien trouvé).

## Audit (audit.mjs)

- FAIL : 0
- WARN : 20 (répétitions de phrases d'horaires, ex. « lundi 12 h à 14 h 30 · 18 h à 22 h » répétée 2x sur `/makimono/awwwards/`)
- Poids de la page la plus lourde : ~971 KB (HTML 7, JS 60 gz, CSS 7 gz, polices 88, images 809)

## Fichiers non modifiés

Aucun fichier source modifié, aucun commit. Serveur arrêté (PID 23164).
