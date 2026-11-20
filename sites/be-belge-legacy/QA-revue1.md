# QA revue 1 : be-belge / legacy (faits)

Build : `sites/be-belge-legacy` → `dist/be-belge/legacy/`, 7 pages, exit 0 (journal `.logs/be-belge-legacy-revue1-build.log`).
Serveur local : `dist` sur http://127.0.0.1:4503/be-belge/legacy/ (arrêté après les mesures).
Captures : `.shots-be-belge-legacy-revue1/` (shoot.mjs : « 3 pages shot », crawl : 6 pages trouvées ; le rapport de captures ne couvre que home, be-belge-item, 404).

## Planches et dossiers

| Page | Dossier de captures | Planche |
|---|---|---|
| home | `.shots-be-belge-legacy-revue1/home/` | `.shots-be-belge-legacy-revue1/home/planche.png` |
| be-belge-item (menu) | `.shots-be-belge-legacy-revue1/be-belge-item/` | `.shots-be-belge-legacy-revue1/be-belge-item/planche.png` |
| 404 | `.shots-be-belge-legacy-revue1/404/` | `.shots-be-belge-legacy-revue1/404/planche.png` |

Rapports bruts : `.shots-be-belge-legacy-revue1/<page>/report.json` ; synthèse : `.shots-be-belge-legacy-revue1/summary.json`.

## Chiffres par page (report.json)

| Mesure | home | be-belge-item (/menu/) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 | 0 | 1 : color-contrast, 2 nœuds (`.kyw-footer__note`, `span`, #6b787d sur #fbfaf8, 4,36:1, seuil 4,5:1) |
| Axe « needs review » contraste | 7 | 0 | 0 |
| CLS desktop / mobile | 0,013 / 0,002 | 0,013 / 0,003 | 0 / 0 |
| LCP desktop / mobile (ms) | 496 / 1324 | 416 / 772 | 36 / 220 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles < 24 px desktop / mobile | 8 / 0 | 4 / 0 | 1 / 1 |
| Éléments cachés (texte réduit) | 0 | 0 | 0 |
| Clavier : pile de focus | Aller au contenu, logo, Menu, Carte, Banquets, Photos, Réserver, téléphone, … | Aller au contenu, logo, Menu, Carte, …, « 3 services », … | « la page d'accueil », « Réalisé par », sortie du body |
| Focus non visible / invisible | 0 / 0 | 0 / 0 | 0 / 0 |
| Pas de changement au survol | 2 | 5 | 2 |
| Information par couleur seule | 4 | 2 | 0 |
| Lien d'évitement en premier (rapport) | false | false | false |
| FPS desktop / mobile | 60 / 61 | 61 / n.d. | 60 / n.d. |
| Mouvement après réduction / au repos | non / non | non / non | non / non |
| Cibles < 24 px (exemples) | « Voir le menu » 89x21, « Privatiser le restaurant » 163x21, « Toute la carte » 99x21 | « Itinéraire » 64x21, « 081 47 00 95 » 93x21, « info@… » 195x21 | « la page d'accueil » 128x20 |

Notes du rapport : les FPS desktop tournent en headless sur GPU logiciel ; les mesures mobiles sont faites à 4x de ralentissement CPU et 4G lente.

## Audit (`scripts/q.sh be-belge-legacy-revue1-audit`, journal `.logs/be-belge-legacy-revue1-audit.log`)

- FAIL : 0
- WARN : 23 (synthèse de l'audit : « 0 FAIL, 23 WARN »)
- Page la plus lourde : `/be-belge/legacy/photos/`, environ 2096 Ko (images 1982 Ko, polices 103 Ko).
