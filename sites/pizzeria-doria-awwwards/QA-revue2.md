# QA revue 2 : pizzeria-doria, variante awwwards

Faits bruts issus du build, des captures (`shoot.mjs --crawl --nav`) et de l'audit (`audit.mjs`). Aucune analyse de design.

Build : `pnpm build:site sites/pizzeria-doria-awwwards` via `scripts/build-site.mjs`, exit 0, 5 pages construites, sortie `dist/pizzeria-doria/awwwards/`.

Serveur de contrôle : `serve.mjs dist --port 4502`, URL `http://127.0.0.1:4502/pizzeria-doria/awwwards/`.

## Pages capturées

Le crawl de l'audit liste 4 pages. La capture a produit 3 dossiers ; aucun dossier n'a été produit pour `/histoire/`.

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/pizzeria-doria/awwwards/` | `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-awwwards-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-awwwards-revue2/home/planche.png` |
| Carte `/carte/` (dossier `pizzeria-doria-item`) | `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-awwwards-revue2/pizzeria-doria-item/` | `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-awwwards-revue2/pizzeria-doria-item/planche.png` |
| 404 (`/__shoot-missing-page-…`) | `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-awwwards-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-awwwards-revue2/404/planche.png` |

Chaque dossier contient 13 captures desktop (`d-*`), 6 mobiles (`m-*`), hover, focus clavier et `report.json`.

## Chiffres par page (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (total / serious) | 0 / 0 | 0 / 0 | 1 / 1 (`color-contrast`, 2 nœuds) |
| Contrast à vérifier (needs review) | 7 | 3 | 0 |
| LCP desktop | 64 ms (img) | 64 ms (p.entete__lead) | 44 ms (p) |
| LCP mobile | 1228 ms (img) | 1052 ms (p.entete__lead) | 216 ms (p) |
| CLS desktop | 0 | 0,002 | 0 |
| CLS mobile | 0 | 0 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 |
| FPS scroll desktop (pire frame) | 60 (17 ms) | 60 (17 ms) | 60 (17 ms) |
| Chargement desktop / mobile | 112 ms / 2080 ms | 91 ms / 1912 ms | 27 ms / 404 ms |
| WebGL desktop / mobile | non / non | non / non | non / non |
| Focus clavier : invisible / non visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : arrêts de tabulation / bloqué | 12 / non | 12 / non | 3 / non |
| Survol : couleur seule / recouvert / sans changement / cibles | 3 / 0 / 1 / 7 | 1 / 0 / 2 / 7 | 0 / 0 / 2 / 2 |
| Mouvement réduit : éléments en mouvement / texte caché | 0 / 0 | 0 / 0 | 0 / 0 |
| Mouvement au repos (desktop) | non | non | non |

Détail de la violation axe sur la 404 : `color-contrast`, impact serious, 2 nœuds.

## Audit (audit.mjs)

Sortie complète : `/home/user/KYW-test-restaurant/.logs/pizzeria-doria-awwwards-revue2-audit.log`.

- FAIL : 0.
- WARN : 4.
  - `/pizzeria-doria/awwwards/` : phrase répétée 2 fois : « Photos : Pizzeria Doria et photos libres illustratives (Unsplash). »
  - `/pizzeria-doria/awwwards/histoire/` : même phrase répétée 2 fois.
  - `site` : pas de `robots.txt`.
  - `site` : pas de sitemap.
- Page la plus lourde : `/pizzeria-doria/awwwards/`, environ 662 Ko (html 5, JS 61 gz, CSS 6 gz, fonts 66, images 524).

## Journaux

- Build : `/home/user/KYW-test-restaurant/.logs/pizzeria-doria-awwwards-revue2-build.log`
- Captures : `/home/user/KYW-test-restaurant/.logs/pizzeria-doria-awwwards-revue2-shoot.log`
- Audit : `/home/user/KYW-test-restaurant/.logs/pizzeria-doria-awwwards-revue2-audit.log`

## Notes de procédure

- Le premier lancement du serveur est mort avec la commande qui l'a lancé ; il a été relancé détaché (`nohup setsid`). Un premier passage de capture, fait serveur arrêté, a produit des `shootFailed` (ERR_CONNECTION_REFUSED) ; il a été refait serveur actif, et seul le second passage est retenu ici.
- Le serveur a été arrêté après les captures.
- Aucun fichier source modifié, aucun commit.
