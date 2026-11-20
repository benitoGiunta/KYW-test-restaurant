# QA build : panorama-citadelle / awwwards (passe build, phase test)

Build : `scripts/q.sh` build-site, exit 0, 5 pages construites (sitemap créé). Serveur local : `dist/` sur 127.0.0.1:4502 (arrêté après contrôle).

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/panorama-citadelle/awwwards/` | `/home/user/KYW-test-restaurant/.shots-panorama-citadelle-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-panorama-citadelle-awwwards-build/home/planche.png` |
| Carte `/panorama-citadelle/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-panorama-citadelle-awwwards-build/panorama-citadelle-item/` | `/home/user/KYW-test-restaurant/.shots-panorama-citadelle-awwwards-build/panorama-citadelle-item/planche.png` |
| 404 (page inexistante) | `/home/user/KYW-test-restaurant/.shots-panorama-citadelle-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-panorama-citadelle-awwwards-build/404/planche.png` |

Planches générées sans les options `--colonnes/--largeur` : `planche.py` les lit comme des fichiers (1920 x 5280 px, 19 images chacune).

## Chiffres des report.json

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (total / serious) | 0 / 0 | 0 / 0 | 1 / 1 (color-contrast, `.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4.36:1, seuil 4.5:1, 2 nœuds) |
| Contrastes à vérifier (axe) | 32 | 23 | 0 |
| LCP desktop / mobile (ms) | 80 / 2224 | 76 / 992 | 40 / 252 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments en débordement (desktop / mobile) | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles < 24 px (desktop / mobile) | 8 / 8 | 6 / 6 | 1 / 1 |
| Éléments WebGL cachés | 0 | 0 | 0 |
| Clavier : lien « Aller au contenu » en premier | non | non | non (3 arrêts) |
| Clavier : arrêts de tabulation / focus invisible / piège | 12 / 0 / non | 12 / 0 / non | 3 / 0 / non |

Note du rapport : le FPS desktop est mesuré sur GPU logiciel (plancher, pas une mesure réelle) ; les chiffres mobiles (LCP, scrollFps) sont ceux qui comptent.

## Audit (audit.mjs)

- FAIL : 0
- WARN : 3
  - Accueil : phrase répétée 2 fois « Réserver une table Appeler le 081 84 11 34 »
  - Site : pas de robots.txt
  - Site : pas de sitemap (le sitemap-index.xml est pourtant produit par le build, à vérifier)
- 4 pages explorées par l'audit (le crawl de shoot en a capturé 3 : accueil, carte, 404).
- Page la plus lourde : accueil, ~1937 KB (HTML 6, JS 61 Ko gz, CSS 6 Ko gz, polices 74, images 1791).

## Points à traiter (faits)

- Contraste insuffisant (4.36:1) sur le pied de page KYW (`.kyw-footer__note`), visible sur la page 404.
- Cibles tactiles sous 24 px : 8 sur l'accueil, 6 sur la carte, 1 sur la 404.
