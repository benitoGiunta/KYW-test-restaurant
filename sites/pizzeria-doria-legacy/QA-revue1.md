# QA revue 1 : pizzeria-doria, variante legacy

Faits extraits des captures et de l'audit (build du jour, serveur statique sur `dist/`, port 4503). Aucune analyse de design.

Build : `sites/pizzeria-doria-legacy` → `dist/pizzeria-doria/legacy/` (5 pages, code de sortie 0).

## Captures par page

Dossiers : `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-legacy-revue1/<page>/`
Planches (contact-sheets) : `/home/user/KYW-test-restaurant/.shots-pizzeria-doria-legacy-revue1/<page>/planche.png`

| Page | URL | Dossier | Planche |
|---|---|---|---|
| accueil | /pizzeria-doria/legacy/ | `.shots-pizzeria-doria-legacy-revue1/home/` | `.shots-pizzeria-doria-legacy-revue1/home/planche.png` |
| menu (item) | /pizzeria-doria/legacy/menu/ | `.shots-pizzeria-doria-legacy-revue1/pizzeria-doria-item/` | `.shots-pizzeria-doria-legacy-revue1/pizzeria-doria-item/planche.png` |
| 404 | URL inexistante | `.shots-pizzeria-doria-legacy-revue1/404/` | `.shots-pizzeria-doria-legacy-revue1/404/planche.png` |

Remarque : les planches ont été produites avec `scripts/planche.py` ; `--colonnes` et `--largeur` n'ont pas été pris en compte (le script lit ses options de façon positionnelle et les traite comme des images : « ignoré 4 », « ignoré 480 »). Les planches font donc 1920 px de large, 19 vignettes chacune.

Sortie du crawl : 4 pages trouvées ; 3 pages capturées (la page `/menu/` est capturée sous le nom `pizzeria-doria-item`). Résumé : `.shots-pizzeria-doria-legacy-revue1/summary.json`.

## Chiffres par page (report.json)

| Indicateur | accueil | menu | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| LCP desktop (ms) | 464 (img) | 464 (h1#menu-titre) | 56 (p) |
| CLS desktop | 0 | 0 | 0 |
| LCP mobile (ms) | 764 (h1#hero-titre) | 756 (p.lead) | 228 (p) |
| CLS mobile | 0 | 0 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 1 (mobile) |
| Axe : violations sérieuses | 1 : label-content-name-mismatch (`.slab__marque`) | 1 : label-content-name-mismatch | 2 : color-contrast |
| Axe : à vérifier (contraste) | 0 | 0 | 0 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus bloqué | non | non | non |
| Clavier : arrêts de tabulation | 12 (dont « Aller au contenu » en 1er) | 12 (dont « Aller au contenu » en 1er) | 3 (dont « focus left the page ») |
| Notes du rapport | 4 | 4 | 4 |

Autres chiffres relevés (rapport accueil et menu) : hauteur desktop 6540 px ; état héros stabilisé à 3642 ms (accueil) et 2964 ms (menu) ; FPS de défilement 61 ; mouvement au repos : non ; éléments contrôlés « couleur seule » : 3 (accueil), 5 (menu), 0 (404) ; survol sans changement : 2 (accueil), 0 (menu), 2 (404).

Dossier de captures : `d-*` (bureau), `m-*` (mobile), `h-*` (survol), `k-*` (focus clavier), `r-*` (mouvement réduit), `d-90-*` (transitions).

## Audit (`audit.mjs`)

Journal : `/home/user/KYW-test-restaurant/.logs/pizzeria-doria-legacy-revue1-audit.log`

- Lignes FAIL : aucune (0 FAIL).
- Nombre de WARN : 45.
- Poids de la page la plus lourde (`/pizzeria-doria/legacy/`) : ~584 KB ; HTML 6, JS 1 (gz), CSS 5 (gz), polices 286, images 286.

## Pièges rencontrés

- Premier essai de capture : serveur arrêté à la fin du shell (lancement en arrière-plan sans attache) ; `shoot.mjs` a échoué en `ERR_CONNECTION_REFUSED`. Relancé dans la même commande que la capture et l'audit ; les captures présentes sont celles du second essai.
- `curl` direct refusé par le hook de sobriété : passer par `scripts/q.sh`.
- Un serveur `serve.mjs` sur le port 4811 (PID 24001) tourne déjà ; il n'appartient pas à cette passe et n'a pas été arrêté.
- Le serveur 4503 lancé pour cette passe a été arrêté.

Aucun fichier source modifié, aucun commit.
