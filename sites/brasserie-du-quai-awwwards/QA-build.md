# QA build : brasserie-du-quai · awwwards

Passe : build. Source : `sites/brasserie-du-quai-awwwards/`. Sortie : `dist/brasserie-du-quai/awwwards/`.
Serveur de test : `http://127.0.0.1:4502/brasserie-du-quai/awwwards/` (arrêté après les captures).

## Build

- `scripts/q.sh brasserie-du-quai-awwwards-build-build node scripts/build-site.mjs sites/brasserie-du-quai-awwwards` : exit 0.
- Astro : 5 pages construites en 2,72 s, sitemap généré.
- Journal : `.logs/brasserie-du-quai-awwwards-build-build.log`.

## Captures et planches

Le shoot a produit 3 dossiers de pages (`--crawl --nav`). Le dossier `brasserie-du-quai-item` contient en réalité la page `/carte/`.

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/brasserie-du-quai/awwwards/` | `.shots-brasserie-du-quai-awwwards-build/home/` | `.shots-brasserie-du-quai-awwwards-build/home/planche.png` |
| Carte `/carte/` | `.shots-brasserie-du-quai-awwwards-build/brasserie-du-quai-item/` | `.shots-brasserie-du-quai-awwwards-build/brasserie-du-quai-item/planche.png` |
| 404 | `.shots-brasserie-du-quai-awwwards-build/404/` | `.shots-brasserie-du-quai-awwwards-build/404/planche.png` |

Planches : `planche.py --colonnes 4 --largeur 480`, largeur 1920 px. `planche.py` affiche « ignoré 4 / ignoré 480 » : il traite les valeurs de ses options comme des images. Les planches sont produites correctement.

Rapports détaillés : `report.json` dans chaque dossier.

## Chiffres des report.json

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe, violations sérieuses | 1 (`color-contrast`) | 1 (`color-contrast`) | 2 (`document-title`, `html-has-lang`) |
| Axe, contrastes à vérifier | 11 | 18 | 0 |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop (ms) | 188 | 208 | 72 |
| LCP mobile (ms, throttle) | 1316 (élément `img`) | 1008 | 256 |
| FPS scroll desktop / mobile | 59 / 58 | 60 / 52 | 61 / 59 |
| Débordement horizontal (`overflowX`) | false | false | false |
| Texte caché en mouvement réduit (`hiddenText`) | 0 | 0 | 0 |
| Éléments graphiques cachés (`glHidden`) | [] | [] | [] |
| Focus clavier non visible / invisible | 0 / 0 | 0 / 0 | 0 / 0 |
| Arrêts de tabulation | 12 | 12 | 1 |
| Cibles tactiles < 24 px (desktop) | 7 | 6 | 0 |
| Mouvement au repos (`idleMotion`) | true | true | false |

Détails utiles :
- Accueil : violation `color-contrast` sur `.quai__reflet > .quai__ligne:nth-child(2)`, 2,47:1 pour 3:1 requis (`#556465` sur `#16282b`). Premier arrêt clavier : « Aller au contenu ».
- Survol (accueil) : 4 cibles testées ; réactions `pixels`, `moves`, `moves`, `color`.
- Carte : violation `color-contrast` (une occurrence), 6 cibles survolées.
- 404 : `kbStops` = 1 ; aucun `h1` (WARN audit). Titre du document et attribut `lang` absents (violations axe).
- Le champ `skipLinkFirst` du journal shoot vaut `false` pour les 3 pages, alors que le premier arrêt clavier de l'accueil et de la carte est le lien « Aller au contenu ». Champ non vérifié.

## Audit (`audit.mjs`)

- Journal : `.logs/brasserie-du-quai-awwwards-build-audit.log`.
- Pages explorées : 4 (`/`, `/carte/`, `/histoire/`, `/reservation/`). Poids de la page la plus lourde : environ 758 Ko.
- **FAIL : 0.**
- **WARN : 10.**
  - `/` : titre de 73 caractères (limite 70).
  - Phrase répétée 2 fois : « Le banc d’écailler vous accueille du jeudi au lundi inclus. » sur `/` et `/carte/`, et sur `/reservation/`.
  - `/histoire/` : « Sélection du Guide Michelin Belgique 2026 (nouvel onglet) . » répétée 2 fois.
  - `/reservation/` : « Midi : 12 h à 14 h 30 » et « Au pied du pont du Luxembourg, sur les berges de la Meuse. » répétées 2 fois.
  - Site : page 404 sans `<h1>`.
  - Site : pas de `robots.txt`.
  - Site : pas de `sitemap`. (Le build a pourtant généré `sitemap-index.xml` : le contrôle de l'audit ne le détecte pas à cette adresse.)
