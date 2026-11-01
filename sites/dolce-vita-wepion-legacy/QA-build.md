# QA build — dolce-vita-wepion-legacy (passe build, rôle captures)

Build : `scripts/build-site.mjs sites/dolce-vita-wepion-legacy` → exit 0, sortie `dist/dolce-vita-wepion/legacy/` (5 pages construites).
Serveur de test : `http://127.0.0.1:4503/dolce-vita-wepion/legacy/` (arrêté après les captures).
Journaux : `.logs/dolce-vita-wepion-legacy-build-*.log`.

## Captures et planches

Le crawl de `shoot.mjs --crawl --nav` a produit 3 dossiers (pages de chaque type), et non les 4 pages listées par l'audit.

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/` | `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-legacy-build/home/` | `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-legacy-build/home/planche.png` |
| Carte `/carte/` (type item) | `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-legacy-build/dolce-vita-wepion-item/` | `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-legacy-build/dolce-vita-wepion-item/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-legacy-build/404/` | `/home/user/KYW-test-restaurant/.shots-dolce-vita-wepion-legacy-build/404/planche.png` |

Rapports par page : `report.json` dans chacun des dossiers ci-dessus. Résumé du crawl : `.shots-dolce-vita-wepion-legacy-build/summary.json`.

## Chiffres par page (extraits des report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console (`errors`) | 0 | 0 | 0 |
| Requêtes en échec (`failed`) | 0 | 0 | 0 |
| Axe, violations graves | 1 (`label-content-name-mismatch`, `.nav__brand`) | 1 (même règle, `.nav__brand`) | 2 (`document-title`, `html-has-lang`, sur `html`) |
| Axe, contraste à vérifier | 23 | 6 | 0 |
| LCP desktop / mobile (ms) | 452 / 976 (élément `h1#h1`) | 412 / 840 (élément `h1#h1`) | 40 / 260 (élément `pre`) |
| CLS desktop / mobile | 0.001 / 0.001 | 0.002 / 0.001 | 0 / 0 |
| Chargement load desktop / mobile (ms) | 712 / 1747 | 691 / 1670 | 37 / 235 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles trop petites desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Éléments hors champ (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| FPS au défilement desktop / mobile | 61 / 61 | 60 / 60 | 60 / 60 |
| Mouvement au repos (`idleMotion`) | non | non | non |
| Éléments cachés (`glHidden` / `mHidden`) | aucun | aucun | aucun |
| Survol : cibles testées / couleur seule / masquées / sans changement | 5 / 5 / 0 / 0 | 7 / 4 / 0 / 3 | 0 / 0 / 0 / 0 |
| Clavier : ordre de focus | 12 arrêts, lien d'évitement absent en premier (`skipLinkFirst: false`), 0 focus invisible | 12 arrêts, lien d'évitement absent en premier, 0 focus invisible, `stuck: false` | 1 arrêt : « focus left the page » |

Remarques factuelles du rapport : FPS desktop mesurés sur GPU logiciel headless (plancher, pas une mesure matérielle) ; mobile à ralentissement CPU 4x et 4G lente.

## Audit (`audit.mjs`)

- Journal : `.logs/dolce-vita-wepion-legacy-build-audit.log`
- Résultat : **0 FAIL, 45 WARN**
- 4 pages crawlées ; page la plus lourde : `/dolce-vita-wepion/legacy/la-dolce-vita/` (~1448 KB ; HTML 5, JS 1 gz, CSS 6 gz, polices 291, images 1145).
- WARN relevés dans la fin du journal : polices `ttf/otf` livrées (format woff2 suggéré), par exemple sur `/infos/`.
- Le détail complet des 45 WARN est dans le journal ; non relu ligne à ligne.

## Anomalies de contrôle

- Le crawl n'a pas capturé les pages `/infos/` et `/la-dolce-vita/` (captures absentes), alors que l'audit les a parcourues.
- La page 404 n'a pas de `<title>` ni d'attribut `lang` (axe, sérieux).
- Les deux pages capturées ont la même violation axe grave sur `.nav__brand` (nom accessible différent du texte visible).
