# QA revue 1 — tariki / portfolio (phase test, rôle captures)

Build : `scripts/q.sh tariki-portfolio-revue1-build` → exit 0, 5 pages, `dist/tariki/portfolio/`.
Serveur de test : `http://127.0.0.1:4501/tariki/portfolio/` (arrêté après les captures).

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/tariki/portfolio/` | `/home/user/KYW-test-restaurant/.shots-tariki-portfolio-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-tariki-portfolio-revue1/home/planche.png` |
| Carte `/carte/` | `/home/user/KYW-test-restaurant/.shots-tariki-portfolio-revue1/tariki-item/` | `/home/user/KYW-test-restaurant/.shots-tariki-portfolio-revue1/tariki-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-tariki-portfolio-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-tariki-portfolio-revue1/404/planche.png` |

Remarque : `shoot.mjs --crawl` n'a produit que ces trois dossiers (le dossier `tariki-item` contient la page carte). Aucune capture de `/histoire/` ni de `/reservation/` dans `shoot`. L'audit a crawlé 4 pages (dont ces deux-là).

## Chiffres par page (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console / requêtes en échec | 0 / 0 | 0 / 0 | 0 / 0 |
| axe : violations / serious | 0 / 0 | 0 / 0 | 1 / 1 (`color-contrast`, 2 nœuds) |
| axe : contrastNeedsReview | 16 | 10 | 0 |
| LCP desktop (ms) / élément | 160 / `p.hero__lead` | 88 / `p.hero__lead` | 36 / `p` |
| CLS desktop | 0.001 | 0.001 | 0 |
| LCP mobile (ms) / élément | 1220 / `p.hero__lead` | 1080 / `p.hero__lead` | 220 / `p` |
| CLS mobile | 0 | 0 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 |
| Texte caché (reduced-motion) | 0 | 0 | 0 |
| Mouvement en reduced-motion | non | non | non |
| Clavier : arrêts de tabulation | 12 | 12 | 3 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus bloqué | non | non | non |
| Mobile scroll FPS / pire frame (ms) | 37 / 83 | 46 / 50 | 61 / 17 |
| Mobile loadMs | 3285 | 2317 | 405 |

Détail axe, 404 : `.kyw-footer__note` et un `span` : `#6b787d` sur `#fbfaf8`, 4,36:1 (seuil 4,5:1).

Remarques : FPS desktop mesurés en rendu logiciel headless (plancher, non représentatif).

## Audit (`audit.mjs`)

Résultat : **0 FAIL, 7 WARN**, 4 pages crawlées. Poids de la page la plus lourde : `/tariki/portfolio/`, ~487 KB ; HTML 5, JS 9 (gz), CSS 7 (gz), polices 63, images 403.

WARN :
- `/tariki/portfolio/` : phrase répétée 8 fois « 11 h 30 à 14 h, 18 h à 21 h »
- `/tariki/portfolio/carte/` : même phrase répétée 4 fois
- `/tariki/portfolio/histoire/` : « Tariki veut dire « mon chemin ». » répétée 2 fois
- `/tariki/portfolio/histoire/` : « 11 h 30 à 14 h, 18 h à 21 h » répétée 4 fois
- `/tariki/portfolio/reservation/` : « 11 h 30 à 14 h, 18 h à 21 h » répétée 4 fois
- site : pas de `robots.txt`
- site : pas de `sitemap`

## Fichiers modifiés

Aucun fichier source modifié, aucun commit. Seuls ont été créés : `.logs/tariki-portfolio-revue1-*.log`, `.shots-tariki-portfolio-revue1/`, et le présent fichier.
