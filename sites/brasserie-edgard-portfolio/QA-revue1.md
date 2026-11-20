# QA revue 1 — brasserie-edgard / portfolio

Passe : revue1 · Phase : test · Rôle : captures (faits uniquement, pas d'analyse de design).

Build : `scripts/q.sh brasserie-edgard-portfolio-revue1-build` : exit 0, 7 pages (404, carte, groupes, index, lunch, reservation, salle), sortie dans `dist/brasserie-edgard/portfolio/`.
Serveur : `dist/` sur http://127.0.0.1:4501 (arrêté après les captures).

## Captures

Le shoot (`--crawl --nav`) a produit 3 dossiers de pages. L'audit a crawlé 6 pages (voir plus bas).

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/brasserie-edgard/portfolio/` | `/home/user/KYW-test-restaurant/.shots-brasserie-edgard-portfolio-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-brasserie-edgard-portfolio-revue1/home/planche.png` |
| Carte `/brasserie-edgard/portfolio/carte/` | `/home/user/KYW-test-restaurant/.shots-brasserie-edgard-portfolio-revue1/brasserie-edgard-item/` | `/home/user/KYW-test-restaurant/.shots-brasserie-edgard-portfolio-revue1/brasserie-edgard-item/planche.png` |
| 404 (URL inexistante) | `/home/user/KYW-test-restaurant/.shots-brasserie-edgard-portfolio-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-brasserie-edgard-portfolio-revue1/404/planche.png` |

Chaque planche : 1920 x 5280 px, 19 images (planche.py, 4 colonnes, 480 px de large).

## Chiffres (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations | 0 | 0 | 1 (color-contrast, serious, 2 nœuds) |
| Axe : à vérifier (contrast needs review) | 23 | 14 | 0 |
| Desktop LCP (ms) / CLS | 140 / 0,003 | 156 / 0,003 | 64 / 0 |
| Mobile LCP (ms) / CLS | 3416 / 0,006 | 1196 / 0 | 264 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil » 128x20) |
| Éléments cachés WebGL desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : arrêts de focus | 12 | 12 | 3 |
| Clavier : focus non visible / invisible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus bloqué | non | non | non |
| Réduit (reduced motion) : texte caché / mouvement | 0 / non | 0 / non | 0 / non |

Détail de la seule violation axe (404) : `.kyw-footer__note` et `span` en `#6b787d` sur `#fbfaf8`, ratio 4,36:1 (seuil 4,5:1).

## Audit (audit.mjs)

Résultat : **0 FAIL, 13 WARN**. 6 pages crawlées : accueil, carte, lunch, groupes, salle, reservation.
Poids de la page la plus lourde : accueil, environ 924 Ko (html 7, JS 20 gz, CSS 7 gz, polices 69, images 821).

WARN :
- Phrase répétée (« Horaires du jour Service du soir du lundi au dimanche Chaussée de Wate… ») : accueil, carte, lunch, groupes, salle, reservation (x6).
- « Du lundi au vendredi, le midi. » répétée 2 fois : accueil, carte, lunch (x3 pages).
- « 10:00 à 22:30 cuisine fermée de 15 h à 18 h » répétée 5 fois : accueil, reservation (x2 pages).
- Site : pas de robots.txt.
- Site : pas de sitemap.
