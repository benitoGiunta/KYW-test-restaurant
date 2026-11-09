# QA revue 2 — ferme-blanche-d-asie / awwwards

Faits seulement, extraits des `report.json` et du journal d'audit. Build, serveur local (port 4502) et captures faits le 2026-11-09.

## Build

- `scripts/build-site.mjs sites/ferme-blanche-d-asie-awwwards` : exit 0, 5 pages construites, sortie `dist/ferme-blanche-d-asie/awwwards/`.
- Journal : `/home/user/KYW-test-restaurant/.logs/ferme-blanche-d-asie-awwwards-revue2-build.log`

## Pages capturées

Le `shoot.mjs --crawl --nav` a produit 3 dossiers (le journal indique « 3 pages shot »). L'audit a crawlé 4 pages, dont `/ferme-blanche-d-asie/awwwards/reservation/`, qui n'a pas de dossier de captures.

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/ferme-blanche-d-asie/awwwards/` | `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-awwwards-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-awwwards-revue2/home/planche.png` |
| Carte `/ferme-blanche-d-asie/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-awwwards-revue2/ferme-blanche-d-asie-item/` | `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-awwwards-revue2/ferme-blanche-d-asie-item/planche.png` |
| Page 404 (sonde `__shoot-missing-page-*`) | `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-awwwards-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-ferme-blanche-d-asie-awwwards-revue2/404/planche.png` |

Les planches sont en 4 colonnes, 480 px de large par vignette. Le message « ignoré 4 / ignoré 480 » de `planche.py` vient de son analyse des options (valeurs de `--colonnes` et `--largeur` lues comme fichiers) ; les planches sont produites malgré cela.

## Chiffres par page

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (0 grave) | 0 (0 grave) | 2 (2 graves : `document-title`, `html-has-lang`) |
| Contraste à vérifier (axe) | 18 | 19 | 0 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop (ms, élément) | 128 (text) | 52 (`h1#titre.display`) | 32 (`pre`) |
| LCP mobile (ms, élément) | 1100 (text) | 1012 (`p.page-chapo`) | 236 (`pre`) |
| Chargement load desktop / mobile (ms) | 138 / 2152 | 83 / 1655 | 16 / 223 |
| Stabilisation desktop / mobile (ms) | 2431 / 4244 | 2242 / 3652 | 2212 / 2178 |
| FPS scroll desktop / mobile (worst frame ms) | 60 (17) / 60 (17) | 60 (17) / 60 (17) | 61 (17) / 60 (17) |
| Hauteur page desktop / mobile (px) | 8058 / 6570 | 6720 / 7724 | 900 / 2121 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments débordants desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Éléments cachés (GL) desktop | 0 | 0 | 0 |
| Titres h1 desktop | 1 | 1 | 0 |
| Clavier : arrêts de tabulation | 12 | 12 | 1 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus bloqué | non | non | non |
| Survol : cibles / sans changement / couleur seule / recouvertes | 7 / 0 / 0 / 0 | 7 / 1 / 1 / 0 | 0 / 0 / 0 / 0 |
| Mouvement réduit : texte caché / animation active | 0 / non | 0 / non | 0 / non |

Détail des survols (carte) :
- sans changement : `h-05 a "La carte"`
- couleur seule : `h-03 a "Réserver une table"`

Navigation testée (`--nav`) :
- Accueil : vers `/ferme-blanche-d-asie/awwwards/carte/` (titre « La carte | La Ferme Blanche d’Asie »).
- Carte : vers `/ferme-blanche-d-asie/awwwards/` (titre « La Ferme Blanche d’Asie | Restaurant asiatique à Malonne »).
- 404 : aucun lien cliquable trouvé.

Notes du rapport : les FPS desktop tournent en headless sur GPU logiciel ; les FPS mobile et les vitals mobile sont mesurés à 4x de ralentissement CPU, slow 4G.

## Audit (`audit.mjs`)

- Résultat : **0 FAIL, 8 WARN**.
- Journal : `/home/user/KYW-test-restaurant/.logs/ferme-blanche-d-asie-awwwards-revue2-audit.log`

Lignes WARN :
1. `/ferme-blanche-d-asie/awwwards/carte/` : phrase répétée 2 fois, « Mise en bouche : salade de bœuf et avocat. »
2. `/ferme-blanche-d-asie/awwwards/reservation/` : phrase répétée 2 fois, « Appeler le 081 44 64 89 »
3. `/ferme-blanche-d-asie/awwwards/reservation/` : phrase répétée 2 fois, « Du lundi au vendredi 12 h à 14 h 30 18 h à 23 h »
4. `/ferme-blanche-d-asie/awwwards/reservation/` : phrase répétée 2 fois, « Samedi 12 h à 14 h 30 18 h à minuit »
5. `/ferme-blanche-d-asie/awwwards/reservation/` : phrase répétée 2 fois, « Dimanche 12 h à 15 h 30 18 h à 23 h »
6. site : la page 404 n'a pas de `<h1>`
7. site : pas de `robots.txt`
8. site : pas de sitemap (le build a pourtant créé un `sitemap-index.xml` dans `sites/ferme-blanche-d-asie-awwwards/dist`, voir le journal de build)

Résumé de l'audit : 4 pages crawlées ; page la plus lourde `/ferme-blanche-d-asie/awwwards/` à environ 1100 KB (html 5, JS 60 gz, CSS 6 gz, polices 55, images 974).

## Serveur

- `serve.mjs dist --port 4502` lancé, PID 9500, arrêté après les captures et l'audit.
- Journal : `/home/user/KYW-test-restaurant/.logs/serve-awwwards.log`
