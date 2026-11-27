# QA revue 2 : mon-epi / legacy (rôle captures, phase test)

Faits uniquement, sans analyse de design. Build, capture et audit faits sur `dist/mon-epi/legacy/` servi en local (`127.0.0.1:4503`, serveur arrêté ensuite).

## Build

- `scripts/q.sh mon-epi-legacy-revue2-build node scripts/build-site.mjs sites/mon-epi-legacy` : exit 0, 6 pages construites, sitemap créé.
- Journal : `/home/user/KYW-test-restaurant/.logs/mon-epi-legacy-revue2-build.log`

## Captures

- Commande : `shoot.mjs --crawl --nav` (journal `/home/user/KYW-test-restaurant/.logs/mon-epi-legacy-revue2-shoot.log`). Le journal annonce « 3 pages shot ».
- Dossiers produits :
  - `/home/user/KYW-test-restaurant/.shots-mon-epi-legacy-revue2/home/` (page /, 13 captures desktop, 6 mobile, planche `/home/user/KYW-test-restaurant/.shots-mon-epi-legacy-revue2/home/planche.png`)
  - `/home/user/KYW-test-restaurant/.shots-mon-epi-legacy-revue2/mon-epi-item/` (page /a-propos/, 13 desktop, 6 mobile, planche `/home/user/KYW-test-restaurant/.shots-mon-epi-legacy-revue2/mon-epi-item/planche.png`)
  - `/home/user/KYW-test-restaurant/.shots-mon-epi-legacy-revue2/404/` (page 404, 13 desktop, 6 mobile, planche `/home/user/KYW-test-restaurant/.shots-mon-epi-legacy-revue2/404/planche.png`)
- Synthèse : `/home/user/KYW-test-restaurant/.shots-mon-epi-legacy-revue2/summary.json`
- Écart à noter : l'audit crawle 5 pages (/, /a-propos/, /produits/, /galerie/, /contact/), la capture n'en a produit que 3. Les pages produits, galerie et contact n'ont pas de dossier de capture.
- Planches : `planche.py` s'exécute et produit 1920 px de large (4 colonnes × 480 px) avec 19 images par planche. Il affiche aussi des lignes « ignoré 4 » et « ignoré 480 » : les valeurs des options sont prises pour des fichiers. Sans effet sur la sortie.

## Chiffres par page (report.json et summary.json)

| Page | Erreurs console | Requêtes en échec | Violations axe (sérieuses) | CLS desktop / mobile | LCP desktop / mobile (ms) | Débordement | Cibles tactiles petites | Texte caché (reduced) | FPS desktop / mobile | Focus invisible / sans focus visible | Hover sans changement | Éléments couleur seule |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| home (/) | 0 | 0 | 0 | 0 / 0 | 396 / 696 | non | 0 | 0 | 60 / 60 | 0 / 0 | 0 | 3 |
| mon-epi-item (/a-propos/) | 0 | 0 | 0 | 0 / 0 | 492 / 1004 | non | 0 | 0 | 61 / 61 | 1 / 0 | 0 | 2 |
| 404 | 0 | 0 | 1 règle (color-contrast, 2 nœuds) | 0 / 0 | 48 / 228 | non | 1 | 0 | 60 / 60 | 0 / 0 | 2 | 0 |

- Hauteur page : home 5230 px desktop / 6302 px mobile ; a-propos 4135 / 4044 ; 404 900 / 844.
- Premier écran stable (settledMs) : home 3071 ms ; a-propos 2957 ms ; 404 2171 ms.
- Chargement (loadMs) desktop / mobile : home 736 / 1455 ; a-propos 755 / 1422 ; 404 34 / 409.
- Clavier, parcours Tab : home 12 arrêts, a-propos 12 arrêts, 404 3 arrêts. Champ `stuck` : false partout. Champ `skipLinkFirst` : false partout (le premier arrêt est le lien « Aller au contenu » sur home et a-propos).
- Mouvement réduit : `movingReduced` false partout, `idleMotion` false partout.

## Détail axe (404)

- `color-contrast` (serious), 2 nœuds : `.kyw-footer__note` et un `span`, `#6b787d` sur `#fbfaf8`, ratio 4.36:1 (seuil 4.5:1).

## Audit (audit.mjs)

- Résultat : **0 FAIL, 37 WARN**. Crawl de 5 pages.
- Répartition des WARN :
  - 20 × « ttf/otf font shipped » (polices .ttf/.otf livrées au lieu de woff2) sur /produits/, /galerie/, /contact/ (4 fichiers par page) ;
  - 5 × « fonts 376 KB (fewer weights, variable font, subset) », une par page ;
  - 5 × « missing og:image » ;
  - 5 × « missing twitter:card » ;
  - 1 × « site no sitemap » ;
  - 1 × « site no robots.txt ».
- Alourdissement de la page la plus lourde : /galerie/, ~1313 KB (HTML 3, JS 1 gz, CSS 5 gz, fonts 376 KB, images 927 KB).
- Journal : `/home/user/KYW-test-restaurant/.logs/mon-epi-legacy-revue2-audit.log`

## Fichiers

- Aucun fichier source modifié, aucun commit.
- Serveur local arrêté (PID consigné dans `/home/user/KYW-test-restaurant/.logs/serve-legacy.pid`, processus terminé).
