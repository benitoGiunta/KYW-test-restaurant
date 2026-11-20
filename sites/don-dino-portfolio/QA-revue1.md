# QA revue 1 — don-dino / portfolio (rôle captures, phase test)

Build : `sites/don-dino-portfolio` → `dist/don-dino/portfolio/` (exit 0, 6 pages).
Serveur local : `dist` sur port 4501, URL `http://127.0.0.1:4501/don-dino/portfolio/` (arrêté après les captures).
Captures : `/home/user/KYW-test-restaurant/.shots-don-dino-portfolio-revue1/` (3 dossiers, `summary.json` à la racine).
Audit : `/home/user/KYW-test-restaurant/.logs/don-dino-portfolio-revue1-audit.log`.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/don-dino/portfolio/` | `/home/user/KYW-test-restaurant/.shots-don-dino-portfolio-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-don-dino-portfolio-revue1/home/planche.png` |
| Carte `/don-dino/portfolio/carte/` (dossier `don-dino-item`) | `/home/user/KYW-test-restaurant/.shots-don-dino-portfolio-revue1/don-dino-item/` | `/home/user/KYW-test-restaurant/.shots-don-dino-portfolio-revue1/don-dino-item/planche.png` |
| Page 404 (`/__shoot-missing-page-…`) | `/home/user/KYW-test-restaurant/.shots-don-dino-portfolio-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-don-dino-portfolio-revue1/404/planche.png` |

Chaque planche : 19 images, 4 colonnes, 480 px de large (1920 x 5280 px).

## Chiffres (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (toutes gravités) | 0 | 0 | 1 règle (`color-contrast`, serious, 2 nœuds) |
| Contrastes à vérifier (axe needs review) | 27 | 17 | 0 |
| LCP desktop (ms) | 200 | 148 | 44 |
| CLS desktop | 0.007 | 0.011 | 0 |
| LCP mobile (ms, throttled) | 2832 | 1144 | 236 |
| CLS mobile | 0.006 | 0.003 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors-jeu (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil », 128x20) |
| Éléments GL cachés | 0 | 0 | 0 |
| Texte caché (réduction mouvement) | 0 | 0 | 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : piège de focus (stuck) | non | non | non |
| Clavier : arrêts de tabulation | 12 | 12 | 3 |
| FPS scroll desktop (headless) / mobile | 57 / 59 | — / — | — |

Audit (`audit.mjs`, 5 pages crawlées, poids le plus lourd ~656 KB sur l'accueil) : **0 FAIL, 17 WARN**.

## WARN de l'audit (17)

- 15 WARN « sentence repeated » (horaires répétés), 3 par page sur accueil, carte, histoire, terrasse, réservation :
  « Horaires du jour Service du soir du lundi au dimanche Chaussée de Marc » (x2),
  « 12:00 à 14:30, 18:00 à 22:30 » (4 à 10 occurrences),
  « 12:00 à 14:30, 18:00 à 23:30 » (2 à 4 occurrences).
- 2 WARN au niveau du site : « no robots.txt », « no sitemap » (le build a pourtant produit `sitemap-index.xml` dans `sites/don-dino-portfolio/dist`).

## Notes d'outil (faits)

- `scripts/planche.py` lit `--colonnes` et `--largeur` comme des fichiers : trois lignes « ignoré » (`4`, `480`) apparaissent dans le journal, sans effet sur la planche produite.
- `shoot.mjs` a dépassé le délai de 120 s (exécution en arrière-plan, ~5 min pour 3 pages).
