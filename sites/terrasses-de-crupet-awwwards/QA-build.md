# QA build : terrasses-de-crupet / awwwards (phase test, rôle captures)

Build : `scripts/q.sh terrasses-de-crupet-awwwards-build-build` : exit 0, 5 pages construites, sortie `dist/terrasses-de-crupet/awwwards/`.
Serveur local : port 4502, arrêté après les captures.

## Dossiers de captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/terrasses-de-crupet/awwwards/` | `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-awwwards-build/home/planche.png` |
| Carte `/terrasses-de-crupet/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-awwwards-build/terrasses-de-crupet-item/` | `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-awwwards-build/terrasses-de-crupet-item/planche.png` |
| 404 (page inconnue) | `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-terrasses-de-crupet-awwwards-build/404/planche.png` |

Chaque planche regroupe les captures `d-*` et `m-*` (4 colonnes, 480 px). Le shoot indique 3 pages capturées, avec `report.json` par dossier. Le crawl n'a donc pas trouvé toutes les pages : la réservation et `/a-propos/` ne sont pas dans les dossiers (voir audit : `/reservation/` et `/a-propos/` ont été crawlées par l'audit).

## Chiffres par page (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 1 (`label-content-name-mismatch`, serious, nœud `.brand`) ; 5 contrastes à revoir | 1 (`label-content-name-mismatch`, serious, nœud `.brand`) ; 10 contrastes à revoir | 1 (`color-contrast`, serious, 2 nœuds : `.kyw-footer__note` et `span`, #6b787d sur #fbfaf8, 4,36:1, seuil 4,5:1) |
| CLS bureau / mobile | 0 / 0 | 0 / 0,001 | 0 / 0 |
| LCP bureau (ms, élément) | 72 (img) | 104 (h2#h-a-partager.display) | 40 (p) |
| LCP mobile (ms, élément) | 1952 (img) | 820 (p.lede) | 208 (p) |
| Chargement / stabilisation bureau (ms) | 104 / 2469 | 76 / 2268 | 21 / 2173 |
| Chargement / stabilisation mobile (ms, throttle) | 3179 / 5246 | 2103 / 4114 | 405 / 2368 |
| Débordement horizontal (bureau / mobile) | non / non | non / non | non / non |
| Éléments hors écran (offenders) | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites (bureau / mobile) | 0 / 4 | 0 / 4 | 0 / 1 |
| FPS défilement (bureau / mobile) | 60 / 60 | 60 / 60 | 61 / 61 |
| Texte masqué en mouvement réduit | 0 | 0 | 0 |
| Clavier : arrêts de focus | 12 | 12 | 3 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Hover : cibles sans changement | non renseigné dans le résumé | non renseigné | h-01, h-02 sans changement |
| Titre `<h1>` | « Les Terrasses de Crupet » | « La carte » | « Page introuvable » |

Remarques de mesure fournies par le script : le FPS bureau tourne en headless sur GPU logiciel (plancher, pas une mesure) ; le mobile tourne avec ralentissement CPU x4 et 4G lente.

## Audit (`audit.mjs`)

- Pages crawlées : 4 (`/`, `/a-propos/`, `/reservation/`, `/carte/`).
- Résultat : **0 FAIL, 5 WARN**.
- WARN :
  1. `/` : méta description de 174 caractères (cible 50-160).
  2. `/reservation/` : méta description de 171 caractères.
  3. `/reservation/` : phrase répétée 2 fois : « Rue Basse 13 5330 Crupet (Assesse) ».
  4. site : pas de `robots.txt`.
  5. site : pas de sitemap.
- Page la plus lourde : `/a-propos/`, environ 518 Ko (HTML 4, JS 61 Ko gzip, CSS 4 Ko gzip, polices 98, images 351).

## Lignes FAIL

Aucune.
