# QA build — incorrect / legacy (rôle captures, passe build)

Serveur : `dist/` servi sur `http://127.0.0.1:4503/incorrect/legacy/` (arrêté après la passe).
Build : `scripts/build-site.mjs sites/incorrect-legacy` exit 0, sortie `dist/incorrect/legacy/`, 2 pages générées (`/index.html`, `/404.html`).

## Captures et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil (`/incorrect/legacy/`) | `/home/user/KYW-test-restaurant/.shots-incorrect-legacy-build/home/` | `/home/user/KYW-test-restaurant/.shots-incorrect-legacy-build/home/planche.png` (14 images) |
| Page absente (`__shoot-missing-page-…`, 404) | `/home/user/KYW-test-restaurant/.shots-incorrect-legacy-build/404/` | `/home/user/KYW-test-restaurant/.shots-incorrect-legacy-build/404/planche.png` (14 images) |

Résumé global : `/home/user/KYW-test-restaurant/.shots-incorrect-legacy-build/summary.json`.
Note : `planche.py` ne reconnaît pas `--colonnes` ni `--largeur` (ses valeurs passent pour des fichiers, d'où « ignoré 4 » et « ignoré 480 » dans les journaux) ; les planches ont été produites avec les réglages par défaut (1920 px de large).
Note : `shoot.mjs --nav` n'a trouvé aucun lien vers une autre page à cliquer ; `audit.mjs` n'a crawlé que la page d'accueil.

## Chiffres par page (report.json)

| Mesure | Accueil | Page absente |
|---|---|---|
| Erreurs console | 0 | 0 |
| Requêtes en échec | 0 | 0 |
| Débordement horizontal (bureau / mobile) | non / non | non / non |
| Cibles tactiles trop petites | 0 | 0 |
| Texte caché (réduit) | 0 | 0 |
| Mouvement en réduit | non | non |
| LCP bureau / mobile (ms) | 360 / 824 | 44 / 220 |
| CLS bureau / mobile | 0,009 / 0,027 | 0 / 0 |
| FPS défilement bureau / mobile | 60 / 61 | 61 / 61 |
| Hauteur de page bureau / mobile (px) | 5227 / 7096 | 900 / 2121 |
| Stabilisation du premier écran (ms) | 2935 | 2187 |
| Violations axe (sérieuses) | 1 : `color-contrast` ×2 | 2 : `document-title` ×1, `html-has-lang` ×1 |
| Clavier : lien d'évitement en premier | non | non |
| Clavier : focus invisible / sans focus visible | 2 / 0 | 0 / 0 |
| Clavier : focus bloqué | non | non |
| Survol : cibles / sans changement / couleur seule / recouvertes | 4 / 0 / 3 / 0 | 0 / 0 / 0 / 0 |
| Curseur suiveur | non | non |
| Mouvement permanent sans interaction | non | non |

Détails relevés :
- Accueil, contraste axe : `.bill__t` sur `.bill__c.pass-1:nth-child(1)` et `:nth-child(3)`, `#120f0c` sur `#008892`, 4,49:1 (seuil 4,5:1).
- Accueil, titre `<title>` : « INCORЯECT, pizzeria à Namur » ; `<h1>` : « LA PIZZERIA ROCK-N-ROLL D’ALEX ET ESTELLE ».
- Accueil, LCP élément : `img` sur les deux profils.
- Accueil, focus invisible : 2 éléments (détail dans `report.json`, clé `keyboard.invisibleFocus`).
- Page absente, `<title>` vide et `<h1>` absent ; `lcpElement` : `pre`.
- Page absente, clavier : un seul arrêt « (body: focus left the page) ».
- Les deux pages : aucune erreur console, aucune requête en échec, aucun débordement.

## Audit (audit.mjs)

- Résultat : **0 FAIL**, **11 WARN**.
- WARN :
  - site : 404 sans `<h1>` ;
  - site : pas de `robots.txt` ;
  - site : pas de `sitemap` ;
  - `/incorrect/legacy/` : 7 fichiers de police en `.ttf` (au lieu de `.woff2`) ;
  - `/incorrect/legacy/` : polices de 511 Ko (graisses réduites, police variable, sous-ensemble).
- Page la plus lourde : `/incorrect/legacy/`, environ 906 Ko ; HTML 6, JS 1 (gz), CSS 5 (gz), polices 511 Ko, images 383 Ko.
- Journal complet : `/home/user/KYW-test-restaurant/.logs/incorrect-legacy-build-audit.log`.

## Journaux

- `/home/user/KYW-test-restaurant/.logs/incorrect-legacy-build-build.log`
- `/home/user/KYW-test-restaurant/.logs/incorrect-legacy-build-shoot.log`
- `/home/user/KYW-test-restaurant/.logs/incorrect-legacy-build-audit.log`
- `/home/user/KYW-test-restaurant/.logs/serve-legacy.log`
