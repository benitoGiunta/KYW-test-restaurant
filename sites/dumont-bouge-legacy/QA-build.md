# QA build — dumont-bouge / legacy (passe build, phase test)

Faits seulement. Build : `scripts/q.sh dumont-bouge-legacy-build-build` exit 0, 7 pages construites en 1,42 s (`dist/dumont-bouge/legacy/`).
Serveur local : port 4503, arrêté après les captures.

## Captures et planches

Le shoot a produit 3 dossiers de pages (`--crawl --nav`). L'audit a crawlé 6 pages (voir plus bas).

| Page | Dossier de captures | Planche |
|---|---|---|
| `/dumont-bouge/legacy/` (accueil) | `/home/user/KYW-test-restaurant/.shots-dumont-bouge-legacy-build/home/` | `/home/user/KYW-test-restaurant/.shots-dumont-bouge-legacy-build/home/planche.png` |
| `/dumont-bouge/legacy/boulangerie/` (page item) | `/home/user/KYW-test-restaurant/.shots-dumont-bouge-legacy-build/dumont-bouge-item/` | `/home/user/KYW-test-restaurant/.shots-dumont-bouge-legacy-build/dumont-bouge-item/planche.png` |
| URL inexistante (page 404 : `/__shoot-missing-page-…`) | `/home/user/KYW-test-restaurant/.shots-dumont-bouge-legacy-build/404/` | `/home/user/KYW-test-restaurant/.shots-dumont-bouge-legacy-build/404/planche.png` |

Les pages `/menu/`, `/patisserie/`, `/emporter/` et `/reservations/` ne figurent pas dans le dossier de captures (non capturées par le shoot) ; l'audit les a crawlées.

## Chiffres par page (report.json)

### Accueil (`home`)
- Erreurs console : 0 ; requêtes en échec : 0
- Axe : 0 violation
- Desktop : LCP 464 ms (élément `img`), CLS 0,001, débordement horizontal non, éléments hors cadre 0, cibles tactiles petites 2 (« Tomascastelazo 100x18 », « Irvan Ary Maulana 114x18 »), FPS défilement 60
- Mobile (throttled) : LCP 2008 ms (élément `div.hero__brush`), CLS 0, débordement non, cibles petites 2 (mêmes libellés)
- Clavier : 0 focus invisible, 0 focus sans indicateur visible, lien d'évitement en premier : non (« Aller au contenu » présent dans la séquence de tabulation, pas en premier au sens du contrôle), piège : non
- Survol : vérifié ; changements de couleur sur les boutons (`react: color`)

### Page item (`dumont-bouge-item`, `/boulangerie/`)
- Erreurs console : 0 ; requêtes en échec : 0
- Axe : 0 violation
- Desktop : LCP 444 ms, CLS 0,001, débordement non, éléments hors cadre 0, cibles petites 2
- Mobile (throttled) : LCP 3532 ms, débordement non, éléments hors cadre 0
- Clavier : 0 focus invisible, 0 focus sans indicateur visible, piège : non

### 404
- Erreurs console : 0 ; requêtes en échec : 0
- Axe : 1 violation **serious**, `color-contrast` (2 nœuds) : `.kyw-footer__note` et un `span`, `#6b787d` sur `#fbfaf8`, ratio 4,36:1 (seuil 4,5:1)
- Desktop : LCP 56 ms, CLS 0, débordement non, cibles petites 1
- Mobile : LCP 264 ms, CLS 0, débordement non
- Clavier : 0 focus invisible, 0 focus sans indicateur visible, piège : non ; le focus quitte la page après « Réalisé par » (`body: focus left the page`)

## Audit (`audit.mjs`, `.logs/dumont-bouge-legacy-build-audit.log`)
- Pages crawlées : 6 (`/dumont-bouge/legacy/`, `/boulangerie/`, `/menu/`, `/patisserie/`, `/emporter/`, `/reservations/`)
- Lignes FAIL : **0**
- Lignes WARN : **78**. Détail : polices TTF/OTF livrées (format woff2 suggéré) et police de 1499 Ko (variable, subset) sur `/menu/` et `/reservations/` ; le reste des WARN est dans le journal.
- Page la plus lourde : `/dumont-bouge/legacy/`, environ 2218 Ko (HTML 4, JS 1 gz, CSS 6 gz, polices 1499 Ko, images 709 Ko)

## Notes
- Aucun fichier source modifié, aucun commit.
- Le `report.json` contient aussi des champs `reduced` et `notes` non résumés ici.
