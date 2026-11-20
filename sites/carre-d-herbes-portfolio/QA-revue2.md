# QA revue 2 — carre-d-herbes / portfolio

Build : `scripts/build-site.mjs sites/carre-d-herbes-portfolio` (exit 0, 7 pages).
Serveur : port 4501 occupé (EADDRINUSE) ; serveur lancé sur **4512** (`dist/`). Arrêté après capture.
Captures : `.shots-carre-d-herbes-portfolio-revue2/` (pages : `home`, `carre-d-herbes-item` = /menu/, `404`).

## Planches

- home : `/home/user/KYW-test-restaurant/.shots-carre-d-herbes-portfolio-revue2/home/planche.png` (19 images)
- carre-d-herbes-item : `/home/user/KYW-test-restaurant/.shots-carre-d-herbes-portfolio-revue2/carre-d-herbes-item/planche.png` (19 images)
- 404 : `/home/user/KYW-test-restaurant/.shots-carre-d-herbes-portfolio-revue2/404/planche.png` (19 images)

Rapports : `.../<page>/report.json` ; résumé : `.../summary.json`.

## Chiffres par page

| Mesure | home (/) | carre-d-herbes-item (/menu/) | 404 (URL inexistante) |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 1 (color-contrast, serious, 2 nœuds) |
| Contraste à vérifier (axe) | 19 | 3 | 0 |
| LCP desktop (ms) | 116 | 128 | 40 |
| LCP mobile (ms, throttled) | 1388 | 2384 | 244 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments débordants (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 |
| Éléments GL cachés | 0 | 0 | 0 |
| Clavier : focus bloqué (stuck) | non | non | non |
| Clavier : focus invisible | 0 | 0 | 0 |
| Clavier : sans focus visible | 0 | 0 | 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : arrêts de tabulation | 12 | 12 | 3 |
| Survol : changement couleur seul | 3 | 0 | 0 |
| Survol : pas de changement | 0 | 0 | 2 |
| Mouvement en reduced-motion | non | non | non |
| Texte caché en reduced-motion | 0 | 0 | 0 |

Titre home : « Carré d'herbes | Cuisine sincère et raffinée à Wépion (Namur) » ; navigation vers `/menu/` vérifiée.

## Audit (`audit.mjs`, site entier)

Résultat : **0 FAIL, 5 WARN**. Page la plus lourde : `/carre-d-herbes/portfolio/`, ~1537 KB (html 5, JS 7 gz, CSS 7 gz, polices 109, images 1409).

WARN :
1. `/carre-d-herbes/portfolio/` : phrase répétée 2x « du jeudi au samedi, 19:00 à minuit »
2. `/carre-d-herbes/portfolio/` : phrase répétée 2x « du jeudi au dimanche, 12:00 à 16:00 »
3. `/carre-d-herbes/portfolio/reservation/` : phrase répétée 3x « 12:00 à 16:00, 19:00 à minuit »
4. site : pas de robots.txt
5. site : pas de sitemap

Note : la page 404 est une URL de test volontairement absente ; sa violation axe concerne le rendu de la page d'erreur.
