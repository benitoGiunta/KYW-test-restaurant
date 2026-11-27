# QA revue 1 — novobel (variante awwwards)

Faits seulement. Build : `scripts/q.sh novobel-awwwards-revue1-build` (exit 0, 5 pages, sortie `dist/novobel/awwwards/`). Serveur local `dist` port 4502, arrêté après les captures.

## Captures et planches

Captures : `/home/user/KYW-test-restaurant/.shots-novobel-awwwards-revue1/`

| Page | URL testée | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | `/novobel/awwwards/` | `/home/user/KYW-test-restaurant/.shots-novobel-awwwards-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-novobel-awwwards-revue1/home/planche.png` |
| Fiche projet | `/novobel/awwwards/projets/` | `/home/user/KYW-test-restaurant/.shots-novobel-awwwards-revue1/novobel-item/` | `/home/user/KYW-test-restaurant/.shots-novobel-awwwards-revue1/novobel-item/planche.png` |
| Page 404 (URL inexistante, contrôle) | `/__shoot-missing-page-…` | `/home/user/KYW-test-restaurant/.shots-novobel-awwwards-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-novobel-awwwards-revue1/404/planche.png` |

Rapport par page : `report.json` dans chaque dossier. Synthèse : `/home/user/KYW-test-restaurant/.shots-novobel-awwwards-revue1/summary.json`.
Journaux : `.logs/novobel-awwwards-revue1-shoot.log`, `.logs/novobel-awwwards-revue1-audit.log`.

Écart de périmètre : `shoot.mjs --crawl` a produit 3 dossiers (accueil, fiche projet, 404). `audit.mjs` a crawlé 4 pages, dont `/novobel/awwwards/a-propos/` (la plus lourde, ~442 KB), non capturée.

## Chiffres par page

| Mesure | Accueil | Fiche projet | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 1 sérieuse : `color-contrast` ×2 nœuds (`.kyw-footer__note`, `span`), #6b787d sur #fbfaf8, 4,36:1 (seuil 4,5) |
| axe « needs review » (contraste) | 32 | 15 | 0 |
| LCP desktop (ms, élément) | 64 (img) | 60 (p.entete__chapo) | 40 (p) |
| LCP mobile (ms, élément) | 1120 (img) | 1960 (img) | 252 (p) |
| CLS desktop | 0 | 0,001 | 0 |
| CLS mobile | 0 | 0,003 | 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles < seuil, mobile | 0 | 0 | 1 (« la page d'accueil » 128×20) |
| Cibles tactiles < seuil, desktop | 0 | 0 | 1 (même lien) |
| Éléments cachés (glHidden) desktop / mobile | 0 / 0 | non relevé / non relevé | 0 / 0 |
| FPS scroll desktop / mobile (headless) | 60 / 60 | 60 / 60 | 60 / 60 |
| Focus clavier invisible / absent | 0 / 0 | 0 / 0 | 0 / 0 |
| Ordre clavier (premiers arrêts) | « Aller au contenu », « NOVOBEL », « Projets », « À propos », « Nous contacter », … (12 arrêts) | « Aller au contenu », « NOVOBEL », … (12 arrêts) | « la page d'accueil », « Réalisé par », puis focus quitte la page (2 arrêts) |
| Survol sans changement | 0 | 0 | 2 (h-01 « la page d'accueil », h-02 « Réalisé par ») |
| Changement par couleur seule | 0 | 0 | 0 |
| Mouvement au repos (idleMotion) | true | — | — |
| Mouvement réduit (hiddenText / moving) | 0 / false | — | — |

Notes du rapport : le FPS desktop tourne en rendu logiciel headless (plancher, pas une mesure matérielle) ; les chiffres mobiles sont à 4x de ralentissement CPU et 4G lente.

## Audit (`audit.mjs`)

- Résultat : **0 FAIL, 2 WARN**.
- WARN site : « no robots.txt ».
- WARN site : « no sitemap » (le build a pourtant écrit `sitemap-index.xml` dans `sites/novobel-awwwards/dist`, cf. journal build).
- Pages crawlées : 4. Page la plus lourde : `/novobel/awwwards/a-propos/`, ~442 KB ; html 4, JS 60 (gz), CSS 6 (gz), fonts 48, images 324 (valeurs telles qu'affichées par l'audit).
- Aucun FAIL sur les pages crawlées.

## Points à reprendre (faits)

1. 404 : violation axe `color-contrast` sérieuse sur le texte de pied de page (`.kyw-footer__note`, `span`), 4,36:1.
2. 404 : une cible tactile de 128×20 px (« la page d'accueil ») sous le seuil en mobile et en desktop.
3. 404 : deux liens sans changement visible au survol.
4. Audit : robots.txt absent ; sitemap signalé absent alors que `sitemap-index.xml` est produit.
5. Fiche projet : LCP mobile 1960 ms, plus élevé que les autres pages.
