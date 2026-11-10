# QA revue 1 — le-servais / awwwards

Faits relevés après `build:site` (exit 0, 5 pages) et capture sur `http://127.0.0.1:4502/le-servais/awwwards/`
(serveur arrêté après contrôle). Aucune analyse de design : chiffres et constats uniquement.

## Pages capturées

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil | `/home/user/KYW-test-restaurant/.shots-le-servais-awwwards-revue1/home/` (40 fichiers) | `/home/user/KYW-test-restaurant/.shots-le-servais-awwwards-revue1/home/planche.png` |
| Carte (`/carte/`) | `/home/user/KYW-test-restaurant/.shots-le-servais-awwwards-revue1/le-servais-item/` (40 fichiers) | `/home/user/KYW-test-restaurant/.shots-le-servais-awwwards-revue1/le-servais-item/planche.png` |
| Page 404 (URL inconnue) | `/home/user/KYW-test-restaurant/.shots-le-servais-awwwards-revue1/404/` (17 fichiers) | `/home/user/KYW-test-restaurant/.shots-le-servais-awwwards-revue1/404/planche.png` |

Les planches ont été générées une par dossier avec `scripts/planche.py` (les options `--colonnes 4 --largeur 480` ont
été passées ; le script affiche « ignoré 4 / ignoré 480 » car il lit ces valeurs comme des fichiers, sans effet sur le
résultat : 1920 px de large).

## Chiffres par page (`report.json`)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 2 sérieuses : `document-title` (html), `html-has-lang` (html) |
| Contraste à vérifier (axe) | 17 | 226 | 0 |
| LCP desktop | 100 ms (img) | 128 ms (h1#titre-carte) | 36 ms (pre) |
| LCP mobile | 1120 ms (h1#titre-hero) | 1076 ms (h1#titre-carte) | 244 ms (pre) |
| CLS desktop / mobile | 0 / 0 | 0.001 / 0.004 | 0 / 0 |
| Chargement desktop / mobile | 223 ms / 2712 ms | 158 ms / 1984 ms | 25 ms / 230 ms |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments WebGL masqués | aucun | aucun | aucun |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS au défilement desktop | 60 (pire trame 17 ms) | 60 (pire trame 17 ms) | 60 (pire trame 17 ms) |
| Clavier : focus sans indicateur visible | 0 | 0 | 0 |
| Clavier : focus invisible / blocage | 0 / non | 0 / non | focus sorti de la page (`body`) |
| Réduction de mouvement : texte masqué / animation | 0 / non | 0 / non | 0 / non |

Captures : l'accueil compte 6 séquences de défilement desktop, 6 mobile, 7 paires de survol (`h-*`), 4 focus clavier (`k-*`)
et 2 captures réduites (`r-*`). Le dossier 404 ne contient ni séquence de survol ni séquence mobile.

## Audit (`audit.mjs`)

Ligne de synthèse : **0 FAIL, 3 WARN**.

- WARN site : la page 404 n'a pas de `<h1>`.
- WARN site : pas de `robots.txt`.
- WARN site : pas de `sitemap`.

Lignes FAIL : aucune.

Journaux complets : `/home/user/KYW-test-restaurant/.logs/le-servais-awwwards-revue1-shoot.log`,
`/home/user/KYW-test-restaurant/.logs/le-servais-awwwards-revue1-audit.log`.
