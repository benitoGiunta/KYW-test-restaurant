# QA build : le-lodge-wepion / portfolio (passe build, phase test)

Build : `dist/le-lodge-wepion/portfolio/`, 7 pages (journal `.logs/le-lodge-wepion-portfolio-build-build.log`, exit 0).
Serveur local : `dist` sur `http://127.0.0.1:4501/le-lodge-wepion/portfolio/` (arrêté après les captures).
Captures : `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-portfolio-build/`.

## Captures et planches par page

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/`) | `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-portfolio-build/home/` | `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-portfolio-build/home/planche.png` |
| Carte (`/carte/`, page item) | `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-portfolio-build/le-lodge-wepion-item/` | `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-portfolio-build/le-lodge-wepion-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-portfolio-build/404/` | `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-portfolio-build/404/planche.png` |

Remarques sur le contrôle : la capture a couvert 3 dossiers de pages (le crawl et la navigation ont porté sur les pages du site, dont `/carte/` capturée sous le nom `le-lodge-wepion-item`). Les planches sont de 1920 x 5280 px, 19 images chacune. `planche.py` affiche deux avertissements `ignoré 4` et `ignoré 480` : ses valeurs d'options `--colonnes 4 --largeur 480` sont lues comme fichiers images ; les options sont tout de même appliquées (largeur 1920 = 4 x 480).

## Chiffres par page (report.json)

| Mesure | Accueil | Carte (item) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 1 (serious : `color-contrast`, 2 nœuds `#6b787d` sur `#fbfaf8`, 4,36:1, requis 4,5:1 : `.kyw-footer__note` et un `span`) |
| Contrastes à vérifier (axe, needs review) | 22 | 12 | 0 |
| CLS desktop | 0,004 | 0,001 | 0 |
| LCP desktop (ms) | 124 | 68 | 48 |
| CLS mobile (throttled) | 0,01 | 0 | 0 |
| LCP mobile (ms) | 1160 | 1148 | 220 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments débordants desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 |
| Éléments GL cachés | 0 | 0 | 0 |
| Texte caché (reduced motion) | 0 | 0 | 0 |
| Mouvement en reduced motion | non | non | non |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus bloqué (stuck) | non | non | non ; focus sort de la page sur le lien « Réalisé par » (`body: focus left the page`) |
| Survol : zones couvertes (covered) | 2 | 1 | 0 |
| Survol : changement de couleur seul (colorOnly) | 1 | 2 | 0 |
| FPS défilement desktop (pire trame) | 60 (17 ms) | n.d. | n.d. |

Détail utile :
- Accueil, zones couvertes au survol : `button "Parasol dessiné au trait, déplaçable aux…"` et `button "Cornet de frites dessiné au trait, dépla…"`.
- Accueil, survol couleur seule : `button "Pause"`.
- Carte (item), survol couleur seule : 2 éléments ; survol couvert : 1 élément.
- Accueil, ordre de tabulation : lien d'évitement, PAUSE, logo, Accueil, Carte, Tea-room, Maison, Terrasse, Contact, RÉSERVER, téléphone, « En savoir plus ». Le lien d'évitement est le premier élément tabulable.
- Titre h1 : « Au bord de la Meuse » (accueil). Titre de page : « Le Lodge Wépion | Brasserie et tea-room au bord de la Meuse ».

## Audit (`audit.mjs`, `http://127.0.0.1:4501/le-lodge-wepion/portfolio/`)

- Résultat : **0 FAIL, 15 WARN** (journal `.logs/le-lodge-wepion-portfolio-build-audit.log`).
- WARN :
  - méta description de 171 caractères (cible 50 à 160), accueil ;
  - phrase répétée 2 fois « Fermé à Wépion Accueil provisoire au Wine & More, Erpent Réouverture à » : accueil, carte, tearoom, histoire, terrasse, reservation (6 pages x 1) ;
  - phrase répétée 2 fois « Fermé depuis l’incendie du 21 mai 2026. » : mêmes 6 pages ;
  - site sans `robots.txt` ;
  - site sans sitemap (le build indique pourtant `sitemap-index.xml` créé dans `sites/le-lodge-wepion-portfolio/dist` : à vérifier, le sitemap de l'audit est peut-être cherché à la racine du site).
- Pages crawlées : 6. Page la plus lourde : accueil, ~551 Ko (HTML 8, JS 20 gz, CSS 7 gz, polices 69, images 447).

## Notes de procédure

- Le hook de sobriété a refusé un `curl -s -o` nu ; le contrôle a été relancé via `scripts/q.sh`.
- La capture complète a dépassé 120 s et a tourné en arrière-plan ; elle s'est terminée avec le code 0.
- Aucun fichier source modifié, aucun commit.
