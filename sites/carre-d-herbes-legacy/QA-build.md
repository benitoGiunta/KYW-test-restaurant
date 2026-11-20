# QA build : carre-d-herbes / legacy (phase test, passe build)

Serveur local : `dist/` sur http://127.0.0.1:4503/ (arrêté après les captures).
Build : exit 0, 9 pages construites (`scripts/q.sh carre-d-herbes-legacy-build-build`, journal `.logs/carre-d-herbes-legacy-build-build.log`).

## Pages et captures

Le crawl de l'audit a trouvé 8 pages ; la capture (`shoot.mjs --crawl --nav`) n'en a produit que 3.

| Page | URL testée | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | /carre-d-herbes/legacy/ | `.shots-carre-d-herbes-legacy-build/home/` | `.shots-carre-d-herbes-legacy-build/home/planche.png` |
| Le restaurant | /carre-d-herbes/legacy/le-restaurant/ | `.shots-carre-d-herbes-legacy-build/carre-d-herbes-item/` | `.shots-carre-d-herbes-legacy-build/carre-d-herbes-item/planche.png` |
| 404 | /__shoot-missing-page-… | `.shots-carre-d-herbes-legacy-build/404/` | `.shots-carre-d-herbes-legacy-build/404/planche.png` |

Résumé global : `.shots-carre-d-herbes-legacy-build/summary.json`.

## Chiffres (report.json)

| Mesure | Accueil | Le restaurant | 404 |
|---|---|---|---|
| Erreurs console | 1 (404 ressource, desktop) | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| LCP desktop / mobile (ms) | 484 (img) / 1576 (h1) | 472 (img) / 720 (p) | 44 (p) / 232 (p) |
| CLS desktop / mobile | 0.001 / 0.001 | 0.007 / 0.019 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non |  non / non |
| Cibles trop petites (desktop / mobile) | 1 / 0 | 1 / 0 | 1 / 1 |
| Éléments cachés (texte réduit) | 0 | 0 | 0 |
| Axe : violations / sérieuses | 0 / 0 (4 contrastes à vérifier) | 0 / 0 | 1 / 1 (color-contrast, `.kyw-footer__note` et `span`, #6b787d sur #fbfaf8, 4,36:1 pour 4,5:1 requis) |
| FPS scroll desktop / mobile | 60 / 61 | 61 / 60 | 60 / 60 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus invisible / bloqué | 0 / non | 0 / non | 0 / non |
| Survol : couleur seule / sans changement | 5 / 2 | 3 / 3 | 0 / 2 |
| Mouvement réduit : texte caché / animation | 0 / non | 0 / non | 0 / non |
| Mouvement idle | non | non | non |

Cibles trop petites : accueil et le restaurant, le numéro de téléphone desktop (90x17 px) ; 404, « la page d'accueil » (128x20 px, desktop et mobile).

Survol, accueil : couleur seule sur « Réserver au 081 34 48 19 », « Voir les menus », « 081 34 48 19 », « Le restaurant », « Réserver » ; pas de changement sur « Carré d'herbes » et « 081 34 48 19 » (h-04, h-06).
Survol, le restaurant : couleur seule sur « Voir les menus », « Réserver », « 081 34 48 19 » ; pas de changement sur « Carré d'herbes », « Le restaurant », « 081 34 48 19 ».
Survol, 404 : pas de changement sur « la page d'accueil » et « Réalisé par ».

Clavier, 404 : l'ordre de tabulation sort de la page après « Réalisé par » (focus sur le body).

## Audit (audit.mjs)

- Pages crawlées : 8. Page la plus lourde : /carre-d-herbes/legacy/, environ 1400 Ko (HTML 4, JS 1 gz, CSS 5 gz, polices 376, images 1014).
- Lignes FAIL : aucune (0 FAIL).
- WARN : 79 (journal `.logs/carre-d-herbes-legacy-build-audit.log`).
