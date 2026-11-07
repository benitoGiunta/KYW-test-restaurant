# QA revue 2 : le-royal / awwwards (captures et audit)

Build : `sites/le-royal-awwwards` → `dist/le-royal/awwwards/` (rc 0, 5 pages construites).
Serveur local : `serve.mjs dist --port 4502`, arrêté après les captures (PID 8045).
Captures : `shoot.mjs --crawl --nav`. Audit : `audit.mjs` sur la même URL.

## Pages et captures

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/le-royal/awwwards/`) | `/home/user/KYW-test-restaurant/.shots-le-royal-awwwards-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-le-royal-awwwards-revue2/home/planche.png` |
| Carte (`/le-royal/awwwards/carte/`) | `/home/user/KYW-test-restaurant/.shots-le-royal-awwwards-revue2/le-royal-item/` | `/home/user/KYW-test-restaurant/.shots-le-royal-awwwards-revue2/le-royal-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-le-royal-awwwards-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-le-royal-awwwards-revue2/404/planche.png` |

Note : l'audit indique « 4 pages crawled », le journal de captures indique « 3 pages shot ». La 4e page crawlée n'a pas de dossier de captures.

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (serious) | 0 | 0 | 2 (`document-title`, `html-has-lang`) |
| Contraste à vérifier (axe) | 6 | 3 | 0 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop (ms) | 80 (img) | 56 (h1.display) | 28 (pre) |
| LCP mobile (ms) | 2304 (img) | 976 (h1.display) | 212 (pre) |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS défilement desktop / mobile | 60 / 60 | 60 / 60 | 61 / 60 |
| Clavier : arrêts de focus (tabulation) | 12 | 12 | 1 (« focus left the page ») |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus bloqué | non | non | non |
| Survol : cibles sans changement / couleur seule / couvertes | 0 / 0 / 0 | 1 / 0 / 0 | 0 / 0 / 0 |
| Mouvement réduit : texte caché / animations actives | 0 / non | 0 / non | 0 / non |
| Présence de H1 desktop / mobile | 1 / 1 | 1 / 1 | 0 / 0 |
| Titre de page | « Le Royal Namur \| Brasserie face au Théâtre, Namur » | « La carte \| Le Royal Namur » | vide |

## Audit (audit.mjs)

Résultat : 0 FAIL, 3 WARN.

- WARN site : la page 404 n'a pas de `<h1>`.
- WARN site : pas de `robots.txt`.
- WARN site : pas de sitemap.

Poids de la page la plus lourde : `/le-royal/awwwards/`, environ 927 KB (HTML 5, JS 60 gz, CSS 5 gz, polices 66, images 791).

## Remarques de mesure

- Les FPS desktop sont mesurés en headless sur GPU logiciel : ce sont des planchers, pas des mesures matérielles (note du rapport).
- Le journal de captures contient des `errors: 0` par page ; aucune erreur de capture n'a été relevée.
- Aucun fichier source modifié, aucun commit.
