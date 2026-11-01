# QA revue 1 : partage-portfolio

Faits seulement. Build, serveur statique (port 4501), captures `shoot.mjs --crawl --nav`, audit `audit.mjs`.
Journaux : `.logs/partage-portfolio-revue1-{build,shoot,audit,planche-*}.log`.

## Build

- `scripts/build-site.mjs sites/partage-portfolio` : exit 0, 7 pages, sortie `dist/partage/portfolio/`.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/partage/portfolio/` | `/home/user/KYW-test-restaurant/.shots-partage-portfolio-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-partage-portfolio-revue1/home/planche.png` (19 images) |
| Carte `/partage/portfolio/carte/` (dossier `partage-item`) | `/home/user/KYW-test-restaurant/.shots-partage-portfolio-revue1/partage-item/` | `/home/user/KYW-test-restaurant/.shots-partage-portfolio-revue1/partage-item/planche.png` (19 images) |
| 404 (`__shoot-missing-page-…`) | `/home/user/KYW-test-restaurant/.shots-partage-portfolio-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-partage-portfolio-revue1/404/planche.png` (14 images) |

- `shoot.mjs --crawl` ne capture qu'un exemplaire par type de page : 3 dossiers. L'audit a parcouru 6 pages (`/`, `/carte/`, `/formules/`, `/histoire/`, `/salle/`, `/reservation/`), sans captures pour les 4 dernières.
- `--nav` : sur la 404, aucun lien vers une autre page n'a pu être cliqué.
- Résumé : `/home/user/KYW-test-restaurant/.shots-partage-portfolio-revue1/summary.json`.

## Mesures par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 | 0 | 2 : `document-title`, `html-has-lang` (élément `html`) |
| Contraste à vérifier (axe) | 4 | 0 | non relevé |
| LCP desktop (ms) | 128 (span) | 120 (p.lead) | 48 (pre) |
| CLS desktop | 0 | 0 | 0 |
| LCP mobile (ms, throttlé) | 1080 (p.ardoise__accroche) | 1140 (p.lead) | 244 (pre) |
| CLS mobile | 0 | 0 | 0 |
| Débordement horizontal | non | non | non |
| Cibles tactiles trop petites | 0 | 0 | 0 |
| Texte caché réduit | 0 | 0 | non relevé |
| FPS desktop / mobile | 60 / 60 | 59 / 60 | 60 / 60 |
| Hauteur de page desktop (px) | 7294 | 11152 | 900 |
| Focus clavier invisible | 0 | 0 | 0 (focus quitte la page) |
| `<title>` | présent | présent | absent (vide) |
| `<h1>` | présent | présent | absent |

- Accueil, clavier : premiers arrêts « Aller au contenu », PARTAGE, LA CARTE, LUNCH ET GROUPES, LA SALLE, LA MAISON, RÉSERVER (×2), APPELER, BON CADEAU, Lunch et groupes →, « Jour précédent ». Skip link présent mais en premier arrêt : `skipLinkFirst` = false dans le rapport.
- Carte, clavier : premiers arrêts identiques, puis LE SOIR, LE MIDI. Pas de focus invisible ni bloqué.
- Accueil, survol : 7 cibles testées (h-01 à h-07), réaction relevée dans `report.json` (champ `hover`).
- Les FPS desktop sont ceux d'un rendu logiciel headless (indicatifs). Les mesures mobiles sont en throttling 4x CPU, slow 4G.

## Audit (audit.mjs)

- **0 FAIL, 18 WARN** (journal : 18 lignes `WARN`, 0 ligne `FAIL`).
- Accueil :
  - méta-description de 174 caractères (cible 50-160) ;
  - 8 phrases répétées 2 fois (carte des vins : « Prix au verre, puis à la bouteille entre parenthèses. », « Muscadet de Sèvre et Maine… », « Chardonnay Côtes d'Auxerre… », « Bianco di Custoza… », « Syrah « Les Vignes d'à Côté »… », « Terrasses du Larzac… », « Primitivo « Kerinos »… », « IGP Méditerranée… ») ;
  - 1 phrase répétée 2 fois : « Le soir du mardi au samedi, le midi du mercredi au samedi ».
- Carte, formules, salle, histoire, réservation : 1 phrase répétée 2 fois chacune (« Le soir du mardi au samedi, le midi du mercredi au samedi »).
- Site : 404 sans `<h1>` ; pas de `robots.txt` ; pas de `sitemap`.
- Poids de la page la plus lourde : `/partage/portfolio/salle/`, ~551 KB (HTML 4, JS 62 gz, CSS 6 gz, polices 111, images 369 ; unités non précisées par l'audit).

## Notes

- Les deux `ignoré 4` / `ignoré 480` des journaux `planche-*` viennent de `scripts/planche.py` qui prend les valeurs des options comme fichiers. Les planches sont produites avec les bonnes options (largeur 1920 px = 4 × 480).
- Aucun fichier source modifié, aucun commit. Le serveur 4501 est arrêté.
