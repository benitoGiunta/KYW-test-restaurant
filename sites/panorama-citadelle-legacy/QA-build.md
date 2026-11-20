# QA build : panorama-citadelle / legacy (passe build, phase test)

Faits uniquement. Serveur local `dist/` sur http://127.0.0.1:4503/panorama-citadelle/legacy/ (arrêté après usage).
Build : exit 0, 5 pages générées (404, index, la-carte, le-panorama, reservation-contact).

## Captures et planches

| Dossier de captures | Planche | Rapport |
|---|---|---|
| /home/user/KYW-test-restaurant/.shots-panorama-citadelle-legacy-build/home/ | /home/user/KYW-test-restaurant/.shots-panorama-citadelle-legacy-build/home/planche.png | /home/user/KYW-test-restaurant/.shots-panorama-citadelle-legacy-build/home/report.json |
| /home/user/KYW-test-restaurant/.shots-panorama-citadelle-legacy-build/404/ | /home/user/KYW-test-restaurant/.shots-panorama-citadelle-legacy-build/404/planche.png | /home/user/KYW-test-restaurant/.shots-panorama-citadelle-legacy-build/404/report.json |
| /home/user/KYW-test-restaurant/.shots-panorama-citadelle-legacy-build/panorama-citadelle-item/ | /home/user/KYW-test-restaurant/.shots-panorama-citadelle-legacy-build/panorama-citadelle-item/planche.png | /home/user/KYW-test-restaurant/.shots-panorama-citadelle-legacy-build/panorama-citadelle-item/report.json |

Non capturées : /la-carte/, /le-panorama/, /reservation-contact/ (crawlées par audit.mjs, pas par shoot.mjs). Le shoot a produit 3 dossiers seulement.
Planches : 1920 x 5280 px, 19 images chacune. planche.py n'a pas reconnu `--colonnes` / `--largeur` (lignes « ignoré » dans le journal, sans effet sur le fichier).

## Chiffres par page (report.json)

| Donnée | home | 404 | panorama-citadelle-item |
|---|---|---|---|
| Erreurs console | 1 (404 ressource, desktop) | 0 | 0 |
| Requêtes en échec | non renseigné dans report.json | idem | idem |
| Axe violations | 2 : color-contrast (1 nœud : #c9212e sur #f3debe, 4.27:1, seuil 4.5:1), label-content-name-mismatch (1, serious) | 1 : color-contrast (2 nœuds) | 1 : label-content-name-mismatch (1, serious) |
| Contraste à vérifier (needs review) | 6 | 0 | 2 |
| CLS desktop / mobile | 0.012 / 0.002 | 0 / 0 | 0.005 / 0.003 |
| LCP desktop / mobile (ms) | 504 (img) / 980 (img) | 44 (p) / 256 (p) | 444 (img) / 740 (p) |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors cadre (offenders) | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS scroll desktop / mobile | 60 / 60 | 60 / 61 | 61 / 61 |
| Cibles tactiles < 24 px (desktop / mobile) | 2 / 3 (emails, téléphone, « Le Panorama ») | 1 / 1 (« la page d'accueil » 128x20) | 0 / 1 (« Le Panorama » 133x20) |
| Clavier : arrêts de focus | 12 | 3 | 12 |
| Hover : cibles / sans changement visuel / couleur seule | 7 / 1 / 5 | 2 / 2 / 0 | 7 / 2 / 5 |

## Audit (audit.mjs, 4 pages crawlées : /, /le-panorama/, /la-carte/, /reservation-contact/)

- FAIL : 0
- WARN : 32 au total, dont 2 au niveau du site (pas de sitemap, pas de robots.txt) et 30 par page :
  - polices .ttf/.otf livrées (use woff2) : 4 par page sur /, /le-panorama/, /la-carte/, /reservation-contact/ (16 WARN) ;
  - « fonts 376 KB (fewer weights, variable font, subset) » : 4 pages ;
  - « no favicon link » : 4 pages ;
  - « missing twitter:card » : 4 pages ;
  - « sentence repeated 7x : "8 h 00 à 23 h 00" » : /reservation-contact/ et /.
- Page la plus lourde : /le-panorama/, ~1415 KB (html 4, JS 1 gz, CSS 5 gz, fonts 376, images 1030).
