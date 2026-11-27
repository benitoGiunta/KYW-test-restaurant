# QA build : oh-la-vache-awwwards (passe build, phase test)

Build : `node scripts/build-site.mjs sites/oh-la-vache-awwwards` : exit 0, 5 pages construites, sortie `dist/oh-la-vache/awwwards/`.
Serveur de test : `serve.mjs dist --port 4502`, arrêté après les captures.
Captures : `shoot.mjs --crawl --nav` : 3 dossiers de pages. Audit : 4 pages crawlées (voir plus bas).

## Pages et captures

| Page | URL testée | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | `/oh-la-vache/awwwards/` | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-awwwards-build/home/planche.png` |
| La carte | `/oh-la-vache/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-awwwards-build/oh-la-vache-item/` | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-awwwards-build/oh-la-vache-item/planche.png` |
| 404 | `/__shoot-missing-page-*` | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-oh-la-vache-awwwards-build/404/planche.png` |

Résumé global : `/home/user/KYW-test-restaurant/.shots-oh-la-vache-awwwards-build/summary.json`.
Planches : 1920 x 5280 px, 19 images chacune, 4 colonnes, largeur 480 px.

## Chiffres par page (report.json)

| Mesure | Accueil | La carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Débordement horizontal (desktop / mobile) | non / non | non / non | non / non |
| LCP desktop (ms) | 108 | 112 | 48 |
| LCP mobile (ms) | 1184 | 1016 | 240 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Premier écran stabilisé (ms) | 2551 | 2380 | 2266 |
| FPS desktop / mobile (scroll) | 60 / 60 | 60 / 60 | 60 / 60 |
| Cibles tactiles trop petites | 1 | 1 | 1 |
| Violations axe sérieuses | 2 | 1 | 1 |
| Texte caché (réduit) | 0 | 0 | 0 |
| Mouvement réduit | false | false | false |
| Focus clavier invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Pas de changement au survol | 1 | 1 | 2 |
| Information par couleur seule | 0 | 1 | 0 |
| Mouvement au repos | oui | non | non |

Détail :
- Accueil, axe : `color-contrast` x5 (ex. `.tete__marque > .tete__nom` #ffffff sur #f7f6f2, 1.08:1 ; `.tete__horloge` idem ; `.nl[href$="carte/"]`), `scrollable-region-focusable` x1.
- La carte, axe : `color-contrast` x5 (ex. `.tete__nom` et `.tete__horloge` en #ffffff sur #f7f6f2, 1.08:1 ; `.nl[aria-current="page"]`).
- 404, axe : `color-contrast` x2 sur `.kyw-footer__note` et un `span` (#6b787d sur #fbfaf8, 4.36:1, seuil 4.5:1).
- Cible trop petite, accueil : « Ouvrir le plan » 111 x 22 px (desktop), 100 x 19 px (mobile). Idem sur la carte.
- Clavier, accueil : ordre de tabulation commençant par « Aller au contenu », puis les liens de la navigation et de la réservation. Pas de piège (`stuck` false).
- Clavier, carte : même logique, « Ouvrir le plan » et « 0494 29 44 72 » en fin de liste.
- Clavier, 404 : deux arrêts (« la page d'accueil », « Réalisé par »), puis le focus quitte la page.

## Audit (audit.mjs)

- Résultat : 0 FAIL, 4 WARN.
- WARN : meta description de `/oh-la-vache/awwwards/` = 179 caractères (cible 50 à 160).
- WARN : meta description de `/oh-la-vache/awwwards/carte/` = 175 caractères (cible 50 à 160).
- WARN : pas de `robots.txt` (site).
- WARN : pas de `sitemap` (site). À noter : le build a écrit `sitemap-index.xml` dans `sites/oh-la-vache-awwwards/dist` ; l'audit ne le trouve pas à la racine servie.
- Page la plus lourde : `/oh-la-vache/awwwards/`, environ 1223 Ko (HTML 5, JS 61 gz, CSS 6 gz, polices 40, images 1111).

## Écarts et points à vérifier

- L'audit annonce 4 pages crawlées ; les captures ne couvrent que 3 dossiers (accueil, carte, 404). La 4e page n'est pas identifiée dans le journal de l'audit (`.logs/oh-la-vache-awwwards-build-audit.log`).
- Le champ `skipLinkFirst` vaut `false` sur les trois pages, alors que la liste de tabulation commence par « Aller au contenu ». Le champ est reporté tel quel.
- Les FPS desktop sont mesurés en headless sur GPU logiciel : valeur plancher, non représentative.
