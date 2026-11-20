# QA build — brasserie-edgard / awwwards

Build : `scripts/q.sh brasserie-edgard-awwwards-build-build` exit 0, 5 pages construites → `dist/brasserie-edgard/awwwards/`.
Serveur local : `http://127.0.0.1:4502/brasserie-edgard/awwwards/` (arrêté après les captures).
Captures : `shoot.mjs --crawl --nav`, 3 dossiers de pages. Journal : `.logs/brasserie-edgard-awwwards-build-shoot.log`.

## Pages

| Page | URL testée | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | `/brasserie-edgard/awwwards/` | `/home/user/KYW-test-restaurant/.shots-brasserie-edgard-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-brasserie-edgard-awwwards-build/home/planche.png` |
| Carte | `/brasserie-edgard/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-brasserie-edgard-awwwards-build/brasserie-edgard-item/` | `/home/user/KYW-test-restaurant/.shots-brasserie-edgard-awwwards-build/brasserie-edgard-item/planche.png` |
| 404 | `/__shoot-missing-page-…` | `/home/user/KYW-test-restaurant/.shots-brasserie-edgard-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-brasserie-edgard-awwwards-build/404/planche.png` |

Planches : `planche.py` a ignoré `--colonnes 4 --largeur 480` (lus comme fichiers : « ignoré 4 », « ignoré 480 »). Les planches ont été produites avec les réglages par défaut : 1920 × 5280 px, 19 images chacune.

## Chiffres (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe : violations (toutes) | 0 | 0 | 1 (`color-contrast`, serious, 2 nœuds) |
| Axe : contraste à vérifier | 25 | 13 | 0 |
| CLS desktop / mobile | 0.006 / 0 | 0 / 0 | 0 / 0 |
| LCP desktop / mobile (ms) | 88 (`p.hero__lede`) / 1096 (`p.hero__lede`) | 140 (`p.entete__texte`) / 2036 (`img`) | 40 (`p`) / 232 (`p`) |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles petites desktop / mobile | 4 / 4 | 3 / 3 | 1 / 1 |
| FPS scroll desktop / mobile (worst frame ms) | 60 (33) / 60 (17) | 60 (33) / 60 (17) | 60 (17) / 60 (17) |
| Load desktop / mobile (ms) | 144 / 1974 | 118 / 1986 | 37 / 419 |
| Éléments hors écran (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : arrêts de focus | 12 | 12 | 3 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus bloqué | non | non | non |
| Survol : éléments couverts | 0 | 0 | 0 |
| Survol : sans changement visible | 1 (h-05 « Brasserie Edgard, accueil ») | 3 (h-03, h-04 « La carte », h-07 téléphone) | 2 (h-01, h-02) |
| Mouvement réduit : éléments en mouvement / texte masqué | non / 0 | non / 0 | non / 0 |

Notes du rapport : FPS desktop mesuré sur GPU logiciel (plancher, non représentatif). Mobile en ralentissement CPU 4x, slow 4G.

## Audit (audit.mjs)

- FAIL : 0
- WARN : 4
  - `/brasserie-edgard/awwwards/` meta description de 171 caractères (cible 50-160)
  - `/brasserie-edgard/awwwards/carte/` meta description de 180 caractères (cible 50-160)
  - site : pas de robots.txt
  - site : pas de sitemap (audit ; le build a pourtant produit un `sitemap-index.xml`)
- Crawl : 4 pages. Page la plus lourde : `/brasserie-edgard/awwwards/`, ~1014 Ko (html 7, JS 62 gz, CSS 6 gz, polices 50, images 888).

## Fichiers non modifiés

Aucun fichier source modifié, aucun commit. Seuls `QA-build.md` (nouveau) et les dossiers `.shots-*`, `.logs/` ont été créés.
