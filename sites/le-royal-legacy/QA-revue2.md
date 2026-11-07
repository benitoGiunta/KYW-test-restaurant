# QA revue 2 — le-royal-legacy (captures)

Build : `dist/le-royal/legacy/` (OK, exit 0). Serveur local 127.0.0.1:4503 (PID 5506), arrêté.
Journaux : `.logs/le-royal-legacy-revue2-*.log`.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/le-royal/legacy/` | `/home/user/KYW-test-restaurant/.shots-le-royal-legacy-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-le-royal-legacy-revue2/home/planche.png` |
| 404 (sonde `__shoot-missing-page`) | `/home/user/KYW-test-restaurant/.shots-le-royal-legacy-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-le-royal-legacy-revue2/404/planche.png` |

Note : `--crawl` n'a trouvé qu'une page ; `--nav` n'a pu cliquer aucun lien (« tried none found »).
Note outil : `scripts/planche.py` interprète `--colonnes` et `--largeur` comme des fichiers (`ignoré 4`, `ignoré 480`) ; les planches ont été produites quand même (14 images chacune, 1920 × 4224 px).

## Chiffres (report.json)

| Mesure | Accueil | 404 |
|---|---|---|
| Erreurs console | 0 | 0 |
| Requêtes en échec | 0 | 0 |
| Violations axe (sérieuses) | 0 | 2 (`document-title`, `html-has-lang`) |
| CLS desktop / mobile | 0 / 0 | 0 / 0 |
| LCP desktop / mobile (ms) | 104 / 1436 | 32 / 216 |
| Débordement horizontal desktop / mobile | non / non | non / non |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 |
| Éléments cachés (texte réduit) | 0 | 0 |
| Mouvement en réduit | non | non |
| FPS défilement desktop / mobile | 60 / 61 (pire trame 17 ms) | — |
| Stabilisation du premier écran desktop / mobile (ms) | 2438 / 4014 | — |
| Clavier : pile de focus | 12 arrêts, pas de focus invisible, pas de piège, pas de skip link en premier | focus quitte la page |
| Survol | 7 cibles ; 2 sans changement ; 5 changent seulement la couleur ; 0 recouvert | 0 cible |

Titre accueil : « Le Royal Namur, brasserie Place du Théâtre ». H1 : « Le Royal Namur ».

## Audit (`audit.mjs`)

Résultat : 0 FAIL, 3 WARN.
- WARN site : page 404 sans `<h1>`
- WARN site : pas de robots.txt
- WARN site : pas de sitemap

Page la plus lourde : `/le-royal/legacy/`, ~686 KB ; HTML 7, JS 1 (gz), CSS 4 (gz), polices 63, images 610.

## État du dépôt (hors périmètre)

`git status` montre déjà modifiés avant ce passage : `data/suivi.html`, `dist/suivi/index.html`. Non touchés, non commités.
