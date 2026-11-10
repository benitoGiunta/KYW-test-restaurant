# QA revue 2 : le-servais-legacy (captures)

Build : `sites/le-servais-legacy` → `dist/le-servais/legacy/` (exit 0, 7 pages construites).
Serveur local : `dist` sur http://127.0.0.1:4503/le-servais/legacy/ (PID 8858, arrêté en fin de passe).
Audit : `.logs/le-servais-legacy-revue2-audit.log`. Captures : `.logs/le-servais-legacy-revue2-shoot.log`.

## Pages capturées

| Page | URL | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | /le-servais/legacy/ | /home/user/KYW-test-restaurant/.shots-le-servais-legacy-revue2/home/ | /home/user/KYW-test-restaurant/.shots-le-servais-legacy-revue2/home/planche.png |
| Carte | /le-servais/legacy/carte/ | /home/user/KYW-test-restaurant/.shots-le-servais-legacy-revue2/le-servais-item/ | /home/user/KYW-test-restaurant/.shots-le-servais-legacy-revue2/le-servais-item/planche.png |
| 404 | /404.html | /home/user/KYW-test-restaurant/.shots-le-servais-legacy-revue2/404/ | /home/user/KYW-test-restaurant/.shots-le-servais-legacy-revue2/404/planche.png |

Le dossier `le-servais-item/` correspond à la page carte (`/carte/`, nommée ainsi par le script de capture).

## Chiffres par page (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 | 0 | 2 (`document-title`, `html-has-lang`) |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop (ms) | 212 | 164 | 44 |
| LCP mobile, throttlé (ms) | 1628 | 1260 | 224 |
| Débordement horizontal (desktop / mobile) | non / non | non / non | non / non |
| Cibles tactiles trop petites | 0 | 0 | 0 |
| Texte caché réduit | 0 | 0 | 0 |
| Éléments GL cachés | 0 | 0 | 0 |
| Clavier : stops de focus | 12 | 12 | 0 (focus quitte la page) |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : piège de focus | non | non | non |
| Survol : cibles testées | 7 | 7 | 0 |
| Survol : sans changement | 1 | 1 | 0 |
| Survol : changement de couleur seul | 6 | 6 | 0 |
| Survol : éléments recouverts | 0 | 0 | 0 |
| Mouvement idle détecté | non | non | – |

Notes : FPS scroll accueil 60 (desktop) et 61 (mobile). Les mesures desktop FPS sont celles d'un rendu logiciel headless.

## Audit (`audit.mjs`)

Résultat : **0 FAIL, 10 WARN** (6 pages explorées par l'audit, 3 capturées).

WARN :
- Répétition de phrase, /le-servais/legacy/ : « 9 h 00 à 1 h 00 » (5x) ; « 9 h 00 à 2 h 00 » (2x)
- Répétition de phrase, /carte/ : « 11 h 30 à 22 h 00, vendredi et samedi jusqu’à minuit » (2x) ; « 9 h 00 à 1 h 00 » (5x) ; « 9 h 00 à 2 h 00 » (2x)
- Répétition de phrase, /contact/ : « 9 h 00 à 1 h 00 » (5x) ; « 9 h 00 à 2 h 00 » (2x)
- site : la page 404 n'a pas de `<h1>`
- site : pas de `robots.txt`
- site : pas de sitemap (le `sitemap-index.xml` est pourtant généré au build, voir le log de build)

Poids de la page la plus lourde : /le-servais/legacy/, environ 651 KB (5 HTML, 1 JS gz, 5 CSS gz, 90 polices, 550 images).
