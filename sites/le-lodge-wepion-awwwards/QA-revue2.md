# QA revue 2 — le-lodge-wepion / awwwards

Build : `sites/le-lodge-wepion-awwwards` → `dist/le-lodge-wepion/awwwards/` (exit 0, 5 pages construites).
Serveur de test : `dist` sur http://127.0.0.1:4502/ (arrêté après les captures).

## Captures et planches

| Page | URL | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | /le-lodge-wepion/awwwards/ | `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-awwwards-revue2/home/` | `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-awwwards-revue2/home/planche.png` |
| Carte (item) | /le-lodge-wepion/awwwards/carte/ | `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-awwwards-revue2/le-lodge-wepion-item/` | `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-awwwards-revue2/le-lodge-wepion-item/planche.png` |
| 404 (page manquante) | /__shoot-missing-page-… | `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-awwwards-revue2/404/` | `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-awwwards-revue2/404/planche.png` |

Le shoot a produit 3 dossiers de pages. L'audit a crawlé 4 pages (voir plus bas) : la 4e n'a pas de dossier de captures.

## Chiffres par page (report.json)

| Mesure | Accueil | Carte (item) | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (total) | 0 | 0 | 1 |
| Violations axe graves | 0 | 0 | 1 (`color-contrast`, serious, 2 nœuds) |
| Contraste à vérifier (axe, needs review) | 13 | 7 | 0 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments cachés (offenders) bureau / mobile | 0 / 0 | 0 | 0 / 0 |
| LCP bureau (ms, élément) | 68 (img) | 56 (p) | 48 (p) |
| LCP mobile (ms, élément) | 1296 (img) | 924 (p) | 236 (p) |
| CLS bureau | 0.002 | 0 | 0 |
| CLS mobile | 0.005 | 0.002 | 0 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus bloqué | non | non | non |
| Clavier : arrêts de tabulation | 12 | 12 | 3 |

## Audit (`audit.mjs`)

- Résultat : **0 FAIL, 2 WARN**, rc 0. 4 pages crawlées.
- WARN site : `no robots.txt`
- WARN site : `no sitemap` (le build a pourtant écrit `sitemap-index.xml` dans `dist`, voir journal de build)
- Poids de la page la plus lourde (`/le-lodge-wepion/awwwards/`) : ~513 KB ; HTML 7, JS 61 (gz), CSS 6 (gz), polices 61, images 380.

## Journaux

- Build : `/home/user/KYW-test-restaurant/.logs/le-lodge-wepion-awwwards-revue2-build.log`
- Shoot : `/home/user/KYW-test-restaurant/.logs/le-lodge-wepion-awwwards-revue2-shoot.log`
- Audit : `/home/user/KYW-test-restaurant/.logs/le-lodge-wepion-awwwards-revue2-audit.log`
