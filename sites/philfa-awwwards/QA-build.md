# QA build : philfa / awwwards (phase test, passe build)

Source : `dist/philfa/awwwards/` (build exit 0, 5 pages construites). Serveur local `http://127.0.0.1:4502/philfa/awwwards/`, arrêté après contrôle.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/philfa/awwwards/` | `/home/user/KYW-test-restaurant/.shots-philfa-awwwards-build/home/` (40 fichiers) | `/home/user/KYW-test-restaurant/.shots-philfa-awwwards-build/home/planche.png` |
| Carte `/philfa/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-philfa-awwwards-build/philfa-item/` (40 fichiers) | `/home/user/KYW-test-restaurant/.shots-philfa-awwwards-build/philfa-item/planche.png` |
| 404 (page inconnue) | `/home/user/KYW-test-restaurant/.shots-philfa-awwwards-build/404/` (28 fichiers) | `/home/user/KYW-test-restaurant/.shots-philfa-awwwards-build/404/planche.png` |

Note : `planche.py` a affiché « ignoré 4 » et « ignoré 480 » (ses options `--colonnes`/`--largeur` sont lues de travers) ; les planches sont produites en 1920 px de large, 4 colonnes de 480 px, 19 vignettes chacune.

## Chiffres par page (report.json)

| Donnée | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (toutes gravités) | 0 | 0 | 1 règle : `color-contrast` (serious), 2 nœuds |
| Axe « contrast needs review » | 22 | 12 | 0 |
| CLS desktop / mobile | 0 / 0 | 0 / 0.002 | 0 / 0 |
| LCP desktop (ms) | 828 | 420 | 44 |
| LCP mobile (ms) | 3496 | 1168 | 220 |
| Chargement desktop / mobile (ms) | 121 / 2951 | 76 / 2556 | 29 / 405 |
| FPS scroll desktop / mobile | 60 / 55 | 60 / 60 | 60 / 61 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles petites desktop / mobile | 2 / 2 | 2 / 2 | 1 / 1 |
| Éléments cachés contenant du texte (reduced motion) | 0 | 0 | 0 |
| Focus clavier : pièges / focus invisibles / focus sans indicateur | non / 0 / 0 | non / 0 / 0 | non / 0 / 0 |

Détails utiles :
- Accueil : cibles petites (`Lire l’histoire de la maison` 209x19 desktop, `Ouvrir le plan` 112x19 desktop ; 185x17 et 99x17 mobile). LCP mobile sur `span.phil-mot`.
- Carte : cibles petites `page de réservation` 126x15 et `Ouvrir le plan` 112x19 (desktop) ; LCP mobile sur `p.prix` ; CLS mobile 0.002.
- 404 : violation `color-contrast` : `.kyw-footer__note` et un `span`, `#6b787d` sur `#fbfaf8`, 4.36:1 (seuil 4.5:1).
- Les FPS desktop sont mesurés en headless sur GPU logiciel : plancher, non mesure matérielle. Le mobile est à 4x de ralentissement CPU, 4G lente.

## Audit (audit.mjs)

- 4 pages explorées depuis la racine, 0 FAIL, 4 WARN.
- WARN `/philfa/awwwards/` : meta description de 172 caractères (cible 50 à 160).
- WARN `/philfa/awwwards/carte/` : meta description de 185 caractères (cible 50 à 160).
- WARN `site` : pas de `robots.txt`.
- WARN `site` : pas de `sitemap`.
- Poids de la page la plus lourde : environ 1817 Ko (HTML 5, JS 60 gz, CSS 7 gz, polices 217, images 1528).

## Anomalies d'outillage

- Le premier lancement du serveur n'a pas tourné (la commande a été bloquée par le hook de sobriété sur un `curl` hors enveloppe) ; relancé ensuite, puis le shoot et l'audit ont fonctionné.
- Le shoot a dépassé 120 s et a continué en arrière-plan ; il a terminé sans erreur.
