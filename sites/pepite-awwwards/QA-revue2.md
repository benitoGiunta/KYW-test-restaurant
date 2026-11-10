# QA revue 2 — pepite / awwwards (captures)

Build : `sites/pepite-awwwards` → `dist/pepite/awwwards/` (5 pages, sans erreur).
Serveur local : `dist` sur `http://127.0.0.1:4502/pepite/awwwards/` (arrêté après les mesures).
Captures : `/home/user/KYW-test-restaurant/.shots-pepite-awwwards-revue2/`
Audit : `/home/user/KYW-test-restaurant/.logs/pepite-awwwards-revue2-audit.log`

Les chiffres FPS desktop viennent d'un navigateur headless sur GPU logiciel : ils sont un plancher, pas une mesure matérielle.

## Pages

| Page | URL testée | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | `/pepite/awwwards/` | `.shots-pepite-awwwards-revue2/home/` | `.shots-pepite-awwwards-revue2/home/planche.png` |
| Carte (fiche) | `/pepite/awwwards/carte/` | `.shots-pepite-awwwards-revue2/pepite-item/` | `.shots-pepite-awwwards-revue2/pepite-item/planche.png` |
| 404 | `/__shoot-missing-page-…` (page absente) | `.shots-pepite-awwwards-revue2/404/` | `.shots-pepite-awwwards-revue2/404/planche.png` |

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (serious 0 ; contrast à revoir : 13) | 0 (serious 0 ; contrast à revoir : 11) | 2 (serious 2) |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop / mobile (ms) | 148 / 1068 | 124 / 1064 | 68 / 224 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Éléments WebGL cachés desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS scroll desktop / mobile (pire frame ms) | 60 (17) / 59 (33) | 60 (17) / 57 (50) | non mesuré |
| Tabulations (arrêts clavier) | 12 | 12 | 1 |
| Clavier : champ `skipLinkFirst` (brut) | false | false | false |
| Clavier : focus invisible / sans focus visible / piège | 0 / 0 / non | 0 / 0 / non | 0 / 0 / non |

Violations axe de la 404 : `document-title` (serious, 1 nœud `html`) ; `html-has-lang` (serious, 1 nœud `html`).

## Audit (`audit.mjs`)

- Résultat : **0 FAIL, 3 WARN**.
- WARN site : la 404 n'a pas de `<h1>` ; pas de `robots.txt` ; pas de `sitemap`.
- Poids de la page la plus lourde (accueil) : ~629 KB ; HTML 5, JS 60 (gz), CSS 6 (gz), polices 91, images 466 (unités de l'audit).

## Notes

- Page `pepite-item` : le LCP mobile tombe sur `p.lead` (1064 ms) ; desktop sur `h3.etape__nom` (124 ms).
- Accueil : LCP sur `p.lead` (148 ms desktop, 1068 ms mobile sous throttling 4G x4 CPU).
- Planches : la commande `planche.py` a été lancée avec `--colonnes 4 --largeur 480` ; le script traite les valeurs d'options comme des fichiers (« ignoré 4 », « ignoré 480 ») et produit tout de même les planches avec ses réglages par défaut.
- Aucun fichier source modifié, aucun commit.
