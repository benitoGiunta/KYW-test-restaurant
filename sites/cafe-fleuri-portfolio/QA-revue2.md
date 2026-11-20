# QA revue 2 — cafe-fleuri / portfolio (captures, phase test)

Build : `scripts/q.sh cafe-fleuri-portfolio-revue2-build` → exit 0, 6 pages (404, brunch, carte, histoire, index, reservation).
Serveur : `dist/` sur http://127.0.0.1:4501/ (PID 904, arrêté après les captures).

## Captures et planches

Dossiers de captures : `/home/user/KYW-test-restaurant/.shots-cafe-fleuri-portfolio-revue2/<page>/`

| Page | URL | Dossier | Planche |
|---|---|---|---|
| Accueil | /cafe-fleuri/portfolio/ | `.shots-cafe-fleuri-portfolio-revue2/home/` | `.shots-cafe-fleuri-portfolio-revue2/home/planche.png` |
| Carte (cafe-fleuri-item) | /cafe-fleuri/portfolio/carte/ | `.shots-cafe-fleuri-portfolio-revue2/cafe-fleuri-item/` | `.shots-cafe-fleuri-portfolio-revue2/cafe-fleuri-item/planche.png` |
| Page absente (404) | /__shoot-missing-page-… | `.shots-cafe-fleuri-portfolio-revue2/404/` | `.shots-cafe-fleuri-portfolio-revue2/404/planche.png` |

Le shoot indique 3 pages capturées ; l'audit crawle 5 pages (les pages brunch, histoire et réservation ne figurent pas dans les dossiers de captures). Le fichier `summary.json` est dans `.shots-cafe-fleuri-portfolio-revue2/summary.json`.

## Chiffres par page (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 1 (color-contrast, serious, 2 nœuds : `.kyw-footer__note` et `span`, #6b787d sur #fbfaf8, 4,36:1, seuil 4,5:1) |
| Contraste à vérifier (axe) | 36 | 19 | 0 |
| LCP desktop (ms) | 112 (img) | 72 (p.lead) | 44 (p) |
| LCP mobile (ms) | 1300 (img) | 1196 (p.lead) | 220 (p) |
| CLS desktop | 0,004 | 0,002 | 0 |
| CLS mobile | 0,011 | 0,014 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 |
| Chargement load desktop / mobile (ms) | 255 / 2651 | 120 / 2242 | 41 / 409 |
| FPS défilement desktop (pire trame) | 60 (17 ms) | 60 (17 ms) | 60 (17 ms) |
| FPS défilement mobile (summary) | 46 | — | — |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus bloqué | non | non | non |
| Clavier : arrêts de tabulation | 12 | 12 | 3 |
| Survol : couleur seule / sans changement au survol | 0 / 0 | 0 / 0 | 0 / 2 (liens « la page d'accueil », « Réalisé par ») |
| Survol : cibles recouvertes | 0 | 0 | 0 |

Le rapport signale que les FPS desktop sont mesurés sur GPU logiciel headless (plancher, pas une mesure matérielle) et que les chiffres mobiles (4x CPU, slow 4G) sont ceux à retenir.

## Audit (`audit.mjs`)

Journal : `.logs/cafe-fleuri-portfolio-revue2-audit.log`. Résultat : **0 FAIL, 7 WARN**.

WARN :
- `/cafe-fleuri/portfolio/carte/` : phrase répétée 2x, « Café et boissons chaudes exemple 3 € »
- `/cafe-fleuri/portfolio/carte/` : phrase répétée 2x, « Pancakes au saumon gravlax mascarpone, aneth et citron »
- `/cafe-fleuri/portfolio/carte/` : phrase répétée 2x, « Limonade maison exemple 4,50 € framboise »
- `/cafe-fleuri/portfolio/carte/` : phrase répétée 2x, « Thé glacé maison exemple 4,50 € pêche »
- `/cafe-fleuri/portfolio/carte/` : phrase répétée 2x, « Prix relevé dans un guide ancien, à confirmer. »
- site : pas de robots.txt
- site : pas de sitemap (l'audit ne voit pas le sitemap-index.xml généré par le build)

Poids de la page la plus lourde : `/cafe-fleuri/portfolio/histoire/`, ~712 KB (images 528 KB).

Note : le build journalise la création de `sitemap-index.xml` dans `sites/cafe-fleuri-portfolio/dist` ; le WARN « no sitemap » de l'audit n'a pas été vérifié au-delà de ce constat.
