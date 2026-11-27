# QA revue 1 : bergerie-lives / legacy

Faits uniquement (captures, rapports, audit). Serveur local `dist/` sur port 4503, arrêté après usage.

## Captures par page

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/bergerie-lives/legacy/` | `.shots-bergerie-lives-legacy-revue1/home/` | `.shots-bergerie-lives-legacy-revue1/home/planche.png` |
| `/mariage-et-location/` | `.shots-bergerie-lives-legacy-revue1/bergerie-lives-item/` | `.shots-bergerie-lives-legacy-revue1/bergerie-lives-item/planche.png` |
| 404 | `.shots-bergerie-lives-legacy-revue1/404/` | `.shots-bergerie-lives-legacy-revue1/404/planche.png` |

Note : `/reservations/` est présente dans l'audit (3 pages crawlées) mais n'a pas de dossier de captures (le shoot a traité accueil, page item et 404).

## Chiffres par page (report.json)

| Mesure | Accueil | Mariage et location | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (0 serious, 1 contrastNeedsReview) | 0 (0 serious, 1 contrastNeedsReview) | 1 serious : `color-contrast` sur `.kyw-footer__note` et `span` (#6b787d sur #fbfaf8, 4.36:1, requis 4.5:1) |
| CLS desktop / mobile | 0.002 / 0 | 0.003 / 0.02 | 0 / 0 |
| LCP desktop / mobile (ms) | 564 / 1080 | 464 / 780 | 48 / 252 |
| Hauteur desktop / mobile (px) | 5885 / 6597 | 4317 / 4668 | 900 / 844 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 (lien « la page d'accueil », 128x20) |
| Éléments hors champ (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus invisible / sans focus visible / bloqué | 0 / 0 / non | 0 / 0 / non | 0 / 0 / non |
| Clavier : lien d'évitement en premier | oui | oui | non |

Notes des rapports : FPS desktop mesuré en headless (plancher, pas une mesure matérielle) ; mobile mesuré à 4x CPU slowdown, slow 4G.

## Audit (audit.mjs)

- 3 pages crawlées ; résultat : **0 FAIL, 17 WARN**.
- WARN site : absence de `robots.txt`, absence de `sitemap`.
- WARN polices (sur les 3 pages) : 4 fichiers `.ttf` livrés (format woff2 attendu) et « fonts 376 KB » (poids des polices).
- Total WARN : 2 (site) + 5 × 3 pages (polices) = 17.
- Page la plus lourde : accueil, ~2064 KB (5 HTML, 1 JS gz, 5 CSS gz, polices 376 KB, images 1677 KB).

## Ce qui reste hors périmètre de cette passe

- Pas de QA design (planches à lire par la revue suivante).
- Page `/reservations/` : pas de captures dans cette passe.
