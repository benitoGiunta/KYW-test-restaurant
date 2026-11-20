# QA revue1 : panorama-citadelle, variante awwwards (faits)

Serveur local : `dist/` sur 127.0.0.1:4502, base `/panorama-citadelle/awwwards/` (arrêté après les captures).
Build : rc 0, 5 pages construites (journal `.logs/panorama-citadelle-awwwards-revue1-build.log`).

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil | /home/user/KYW-test-restaurant/.shots-panorama-citadelle-awwwards-revue1/home/ | /home/user/KYW-test-restaurant/.shots-panorama-citadelle-awwwards-revue1/home/planche.png |
| Carte (`/carte/`) | /home/user/KYW-test-restaurant/.shots-panorama-citadelle-awwwards-revue1/panorama-citadelle-item/ | /home/user/KYW-test-restaurant/.shots-panorama-citadelle-awwwards-revue1/panorama-citadelle-item/planche.png |
| 404 | /home/user/KYW-test-restaurant/.shots-panorama-citadelle-awwwards-revue1/404/ | /home/user/KYW-test-restaurant/.shots-panorama-citadelle-awwwards-revue1/404/planche.png |

Note : `planche.py` ne reconnaît pas les options `--colonnes` et `--largeur` (elles sont lues comme des fichiers et ignorées, avec un message « ignoré »). Les planches ont été produites avec la mise en page par défaut : 1920 x 5280 px, 19 images chacune.

## Chiffres par page (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations serious | 0 | 0 | 1 (color-contrast, 2 nœuds) |
| Axe : contrastNeedsReview | 32 | 23 | 0 |
| LCP desktop (ms) | 88 (img) | 180 (h1.display) | 44 (p) |
| LCP mobile (ms) | 2216 (img) | 976 (p.entete__texte) | 264 (p) |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors zone desktop (offenders) | 0 | 0 | 0 |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 1 / 1 (« la page d'accueil » 128x20) |
| Focus clavier : noVisibleFocus / invisibleFocus | 0 / 0 | 0 / 0 | 0 / 0 |
| Focus clavier : stuck | non | non | non (« body : focus left the page ») |
| Lien d'évitement (skipLinkFirst) | non | non | non |

Chargement accueil : loadMs desktop 173, mobile 3190.

Survol (hover) : pas de changement de couleur seul, pas de curseur suiveur sur les trois pages.

## Audit (audit.mjs, 4 pages crawlées)

- 0 FAIL, 3 WARN.
- WARN `/panorama-citadelle/awwwards/` : phrase répétée 2x « Réserver une table Appeler le 081 84 11 34 ».
- WARN site : pas de robots.txt.
- WARN site : pas de sitemap (au moment de l'audit, sur le serveur local).
- Poids de la page la plus lourde : ~1937 KB (images 1791 KB, polices 74 KB, JS 61 KB gz, CSS 6 KB gz).
