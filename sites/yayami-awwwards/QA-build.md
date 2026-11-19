# QA build : yayami-awwwards (rôle captures, passe build, phase test)

Build : `sites/yayami-awwwards` → `dist/yayami/awwwards/` (exit 0, 5 pages, journal `.logs/yayami-awwwards-build-build.log`).
Serveur : `dist` sur 127.0.0.1:4502, arrêté après les captures.
Captures : `.shots-yayami-awwwards-build/` (3 dossiers, 3 pages prises ; l'audit en compte 4, voir plus bas).
Journaux : `.logs/yayami-awwwards-build-shoot.log`, `.logs/yayami-awwwards-build-audit.log`.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/yayami/awwwards/` | `/home/user/KYW-test-restaurant/.shots-yayami-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-yayami-awwwards-build/home/planche.png` |
| Carte `/yayami/awwwards/carte/` (dossier `yayami-item`) | `/home/user/KYW-test-restaurant/.shots-yayami-awwwards-build/yayami-item/` | `/home/user/KYW-test-restaurant/.shots-yayami-awwwards-build/yayami-item/planche.png` |
| 404 (URL inexistante, `/__shoot-missing-page-…`) | `/home/user/KYW-test-restaurant/.shots-yayami-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-yayami-awwwards-build/404/planche.png` |

Chaque planche : 19 images, largeur 1920 px (4 colonnes de 480 px), hauteur 5280 px. Le script `planche.py` affiche des lignes « ignoré 4 / ignoré 480 » sur la sortie standard : ce sont les valeurs des options `--colonnes` et `--largeur`, lues comme fichiers. Les options sont bien appliquées (1920 = 4 × 480).

## Chiffres par page (report.json)

| Indicateur | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| LCP desktop (ms) | 68 (img) | 60 (h1.display) | 36 (p) |
| LCP mobile (ms) | 1060 (img) | 1036 (h1.display) | 224 (p) |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments hors écran (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles < 24 px desktop / mobile | 1 / 1 : « Ouvrir le plan » (107×22 / 102×21) | 1 / 1 : « Ouvrir le plan » (107×22 / 102×21) | 1 / 1 : « la page d'accueil » (128×20) |
| WebGL actif | non | non | non |
| FPS défilement desktop (headless, plancher) | 60 | 60 | 60 |
| Titre / H1 | « Yayami Sushi | Restaurant japonais à Namur, sushi à emporter » / « Yayami Sushi » | « La carte | Yayami Sushi » / « La carte » | « Page introuvable » |
| Chargement mobile (ms) | 1915 | 1982 | 405 |
| Mouvement en mode réduit | non | non | non |
| Texte masqué en mode réduit | 0 | 0 | 0 |
| Accessibilité axe : violations graves | 1 : `scrollable-region-focusable` | 0 | 1 : `color-contrast` |
| Accessibilité axe : contraste à vérifier | 16 | 16 | 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : arrêts de tabulation / focus bloqué | 12 / non | 12 / non | 3 / non |
| Survol : cibles / sans changement au survol / couvertes | 4 / 0 / 0 | 7 / 2 / 0 | 2 / 2 / 0 |
| Survol : couleur seule / suiveur de curseur | 0 / non | 0 / non | 0 / non |

Notes du rapport : le FPS desktop tourne en headless sur GPU logiciel (plancher, pas une mesure matérielle) ; les chiffres mobiles sont ceux à 4× de ralentissement CPU et slow 4G.

## Audit (`audit.mjs`)

Journal complet : `.logs/yayami-awwwards-build-audit.log` (7 lignes).

- **0 FAIL, 3 WARN.**
- WARN `/yayami/awwwards/carte/` : phrase répétée 2 fois : « 10 % de remise à l'emporter, livraison offerte dès 30 € ».
- WARN `site` : pas de `robots.txt`.
- WARN `site` : pas de sitemap.
- L'audit annonce « 4 pages crawled » ; trois dossiers de captures seulement (accueil, carte, 404). La liste des quatre URL n'est pas dans le journal ; la quatrième n'a pas été capturée.
- Le build a bien produit `sitemap-index.xml` dans `sites/yayami-awwwards/dist` ; l'audit ne le trouve pas à la racine servie (`/yayami/awwwards/`).

## Fichiers de captures

Chaque dossier contient `report.json`, les `d-*` (desktop), `m-*` (mobile), `h-*` (survol), `k-*` (focus clavier), `r-*` (mouvement réduit). Dossier `home` : 34 entrées ; `yayami-item` : 40 ; `404` : 28.

Aucun fichier source modifié, aucun commit.
