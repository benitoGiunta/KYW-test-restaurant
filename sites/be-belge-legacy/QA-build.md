# QA build — be-belge / legacy

Passe : build · Phase : test · Rôle : captures (faits uniquement, aucune analyse de design)

## Build

- `scripts/q.sh be-belge-legacy-build-build node scripts/build-site.mjs sites/be-belge-legacy` : exit 0, 7 pages construites, sortie dans `dist/be-belge/legacy/`.
- Journal : `.logs/be-belge-legacy-build-build.log`.

## Serveur de contrôle

- `serve.mjs dist --port 4503`, URL `http://127.0.0.1:4503/be-belge/legacy/`.
- Première tentative de capture : serveur non démarré (ERR_CONNECTION_REFUSED sur les deux pages). Relancé en détaché, réponse HTTP 200, capture refaite. Le serveur est arrêté en fin de passe.

## Captures

Dossier : `/home/user/KYW-test-restaurant/.shots-be-belge-legacy-build/`

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/be-belge/legacy/` | `.shots-be-belge-legacy-build/home/` (40 fichiers) | `.shots-be-belge-legacy-build/home/planche.png` |
| Menu `/be-belge/legacy/menu/` (nav) | `.shots-be-belge-legacy-build/be-belge-item/` (40 fichiers) | `.shots-be-belge-legacy-build/be-belge-item/planche.png` |
| 404 (URL inexistante) | `.shots-be-belge-legacy-build/404/` (28 fichiers) | `.shots-be-belge-legacy-build/404/planche.png` |

Les planches font 1920 x 5280 px, 19 images chacune (4 colonnes à 480 px). `scripts/planche.py` affiche « ignoré 4 » et « ignoré 480 » en sortie : ce sont les valeurs des options `--colonnes` et `--largeur` lues comme fichiers, sans effet sur le résultat.

Le crawl (`audit.mjs`) a trouvé 6 pages (accueil, menu, carte, banquets-et-receptions, photos, reservation). `shoot.mjs --crawl --nav` n'en a capturé que 3 (accueil, menu, 404).

## Mesures (report.json)

| Page | LCP desktop | LCP mobile | CLS desktop | CLS mobile | Débordement X | Éléments hors cadre |
|---|---|---|---|---|---|---|
| Accueil | 500 ms (img) | 1196 ms (img) | 0,013 | 0,002 | non / non | 0 / 0 |
| Menu | 404 ms | 780 ms | 0,013 | 0,003 | non / non | 0 / 0 |
| 404 | 36 ms | 224 ms | 0 | 0 | non / non | 0 / 0 |

- Erreurs console : accueil 1 (desktop : `Failed to load resource ... 404 (Not Found)`), menu 0, 404 0.
- Requêtes en échec : 0 sur les trois pages.
- Axe :
  - accueil : 0 violation, 7 « needs review » sur le contraste ;
  - menu : 0 violation ;
  - 404 : 1 violation `color-contrast` (impact serious, 2 nœuds).
- Clavier :
  - arrêts de tabulation : 12 (accueil), 12 (menu), 3 (404) ;
  - focus non visible : 0 ;
  - focus invisible : 0 ;
  - piège de focus (stuck) : non sur les trois ;
  - lien d'évitement en premier : non sur les trois.
- Survol :
  - sans changement visuel : 2 (accueil), 5 (menu), 2 (404) ;
  - signalé « couleur seule » : 4 (accueil), 2 (menu), 0 (404) ;
  - élément recouvert : 0 partout ;
  - curseur suiveur : absent.
- Cibles tactiles petites (< 24 px) : desktop 8 (accueil), 4 (menu), 1 (404) ; mobile 0, 0, 1.
- Éléments cachés (WebGL masqué) : liste vide sur l'accueil desktop.
- Mouvement : `idleMotion` false sur l'accueil.

## Audit (`audit.mjs`)

- Journal : `.logs/be-belge-legacy-build-audit.log`.
- Résultat : **0 FAIL, 47 WARN**.
- Pages les plus lourdes : `/be-belge/legacy/photos/`, environ 2095 Ko (images 1982 Ko, fontes 103 Ko).
- WARN visibles dans la sortie (les 20 dernières lignes) :
  - `/photos/` et `/reservation/` : twitter:card, og:title, og:description, og:image, lien canonique, favicon manquants (selon la page) ;
  - site : pas de robots.txt, pas de sitemap ;
  - police TTF/OTF livrée sur les 6 pages (`ieVq2YZ...ttf`, à remplacer par woff2).
