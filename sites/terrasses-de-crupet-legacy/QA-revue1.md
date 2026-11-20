# QA revue 1 : terrasses-de-crupet / legacy (phase test, rôle captures)

Build : `sites/terrasses-de-crupet-legacy` → `dist/terrasses-de-crupet/legacy/` (exit 0).
Serveur local : port 4503 (arrêté après les captures).
Pages capturées : 2 (`home`, `404`). Le crawl n'a trouvé qu'une page ; `--nav` n'a trouvé aucun lien cliquable.

## Captures

| Page | Dossier de captures | Planche |
|------|---------------------|---------|
| home (`/terrasses-de-crupet/legacy/`) | `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-legacy-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-legacy-revue1/home/planche.png` (14 images) |
| 404 | `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-legacy-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-legacy-revue1/404/planche.png` (19 images) |

Rapports : `.../home/report.json` et `.../404/report.json` (même dossier racine). Résumé : `.../summary.json`.
Note : `scripts/planche.py` a traité `--colonnes 4 --largeur 480` comme des fichiers (ignorés) ; les planches sont produites sans ces options.

## Chiffres (report.json)

| Mesure | home | 404 |
|--------|------|-----|
| Erreurs console | 0 | 0 |
| Requêtes en échec | 0 | 0 |
| Violations axe | 0 | 1 règle `color-contrast` (serious), 2 nœuds |
| Axe : contrastes à vérifier | 3 | 0 |
| CLS desktop / mobile | 0.01 / 0.001 | 0 / 0 |
| LCP desktop (élément) | 364 ms (img) | 40 ms |
| LCP mobile (élément) | 776 ms (h1#h-hero) | 232 ms (p) |
| loadMs desktop / mobile | 629 / 3032 | 23 / 411 |
| FPS scroll desktop / worst frame | 61 / 17 ms | 60 / 17 ms |
| FPS scroll mobile | 61 | 61 |
| Débordement horizontal mobile | non | non |
| Éléments hors écran mobile (offenders) | 0 | 0 |
| Cibles tactiles petites desktop / mobile | 6 / 1 | 1 / 1 |
| Clavier : lien d'évitement en premier | false | false |
| Clavier : focus non visible / invisible | 0 / 0 | 0 / 0 |
| Clavier : focus bloqué | non | non |
| Hover : sans changement / couleur seule | 3 / 5 (sur 8 cibles) | 2 / 0 (sur 2 cibles) |
| Mouvement réduit : texte caché / écran animé | 0 / non | 0 / non |

Note mesure : desktop FPS en rendu logiciel (plancher, pas une mesure matérielle).

## Audit (`audit.mjs`, 1 page crawlée)

Résultat : **0 FAIL, 8 WARN**.

WARN :
- `/terrasses-de-crupet/legacy/` : `twitter:card` absent.
- site : pas de `robots.txt`.
- site : pas de `sitemap`.
- `/terrasses-de-crupet/legacy/` : 5 fichiers TTF/OTF livrés (préférer woff2).

Poids de la page la plus lourde : ~1405 Ko (html 6, JS 1 gz, CSS 5 gz, polices 291, images 1102).

## Lignes FAIL

Aucune.

Pas d'analyse de design dans ce fichier : faits uniquement. Aucun fichier source modifié, aucun commit.
