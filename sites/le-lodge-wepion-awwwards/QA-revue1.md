# QA revue 1 — le-lodge-wepion-awwwards (captures, audit)

Build : `pnpm build:site` non concerné ; `scripts/build-site.mjs sites/le-lodge-wepion-awwwards` exit 0 (journal `.logs/le-lodge-wepion-awwwards-revue1-build.log`), 5 pages construites, dist dans `dist/le-lodge-wepion/awwwards/`.
Serveur : `serve.mjs dist --port 4502`, arrêté après usage.

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/le-lodge-wepion/awwwards/` | `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-awwwards-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-awwwards-revue1/home/planche.png` |
| Carte `/le-lodge-wepion/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-awwwards-revue1/le-lodge-wepion-item/` | `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-awwwards-revue1/le-lodge-wepion-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-awwwards-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-le-lodge-wepion-awwwards-revue1/404/planche.png` |

Note : `shoot.mjs` a capturé 3 pages sur les 4 explorées par l'audit (pas de dossier pour la quatrième page). Les planches ont été produites en 4 colonnes de 480 px (1920 px de large), mais `scripts/planche.py` traite `--colonnes` et `--largeur` comme des images (messages « ignoré 4 », « ignoré 480 » dans le journal) : sans effet sur le résultat.

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations | 0 | 0 | 1 (color-contrast, serious, 2 nœuds) |
| Axe : contrastes à vérifier | 13 | 7 | 0 |
| CLS bureau / mobile | 0,002 / 0,005 | 0 / 0,002 | 0 / 0 |
| LCP bureau / mobile (ms) | 72 / 1284 | 116 / 960 | 36 / 244 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Éléments cachés (hiddenText) | 0 | 0 | 0 |
| Cibles tactiles < 24 px bureau / mobile | 1 / 5 | 0 / 2 | 1 / 1 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier, blocage | non (skipLinkFirst false), pas de blocage | idem | idem |
| Clavier : arrêts de tabulation | 12 | 12 | 3 |
| FPS défilement bureau | 60 (pire trame 17 ms) | — | — |

Détail utile :
- Accueil, cibles < 24 px bureau : « Ouvrir le plan » (519×23). Mobile : « Ouvrir le plan » (350×23 et 98×23), « Voir toute la carte » (131×23), « Crêpes et gaufres » (130×23), « Réserver en ligne » (127×23).
- Carte, mobile : 2 cibles < 24 px (détail dans `le-lodge-wepion-item/report.json`, clé `mobile.smallTargets`).
- 404, axe color-contrast : `.kyw-footer__note` et un `span`, #6b787d sur #fbfaf8, 4,36:1 (seuil 4,5:1).
- Accueil : mouvement au repos détecté (`desktop.idleMotion` = true, `idleAt` = top) ; mode réduit : `moving` = false sur les trois pages.
- Accueil bureau : hauteur 8690 px, chargement 114 ms ; mobile étranglé : chargement 2121 ms, règlement 4190 ms.

## Audit (audit.mjs)

- 4 pages explorées depuis `http://127.0.0.1:4502/le-lodge-wepion/awwwards/`.
- FAIL : 0.
- WARN : 2 (`no robots.txt`, `no sitemap` ; le sitemap est pourtant généré dans `dist/`, à vérifier au niveau du serveur de test).
- Page la plus lourde : `/le-lodge-wepion/awwwards/`, ~513 Ko ; HTML 7, JS 61 (gz), CSS 6 (gz), polices 61, images 380.

Journal complet de l'audit : `/home/user/KYW-test-restaurant/.logs/le-lodge-wepion-awwwards-revue1-audit.log`.
