# QA build : le-royal / awwwards (passe build)

Build : `scripts/build-site.mjs sites/le-royal-awwwards` exit 0, 5 pages, `dist/le-royal/awwwards/`.
Serveur : `.claude/skills/awwwards/scripts/serve.mjs dist --port 4502`, arrêté après captures.
Captures : `shoot.mjs --crawl --nav` sur `http://127.0.0.1:4502/le-royal/awwwards/`. Le crawl a retenu 3 dossiers (sur 5 pages buildées).

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/le-royal/awwwards/` | `/home/user/KYW-test-restaurant/.shots-le-royal-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-le-royal-awwwards-build/home/planche.png` |
| Carte `/le-royal/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-le-royal-awwwards-build/le-royal-item/` | `/home/user/KYW-test-restaurant/.shots-le-royal-awwwards-build/le-royal-item/planche.png` |
| 404 (page introuvable) | `/home/user/KYW-test-restaurant/.shots-le-royal-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-le-royal-awwwards-build/404/planche.png` |

Remarque sur les planches : `scripts/planche.py` lit mal `--colonnes` et `--largeur` (les valeurs `4` et `480` sont traitées comme des fichiers, « ignoré »). Les planches sont produites, de largeur 1920 px, mais les paramètres demandés ne sont pas appliqués.

## Chiffres (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (serious) | 1 : `label-content-name-mismatch` | 1 : `label-content-name-mismatch` | 2 : `document-title`, `html-has-lang` |
| LCP desktop | 180 ms (img) | 80 ms (h1.display) | 40 ms (pre) |
| LCP mobile | 2304 ms (img, throttled) | 876 ms (h1.display, throttled) | 216 ms (pre, throttled) |
| CLS desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Cibles tactiles petites desktop / mobile | 3 / 3 | 2 / 2 | 0 / 0 |
| Éléments cachés (offenders) desktop | 0 | 0 | 0 |
| Texte caché (reduced) | 0 | 0 | 0 |
| Mouvement en reduced-motion | non | non | non |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : lien d'évitement en premier | non | non | non |
| Clavier : focus bloqué | non | non | non |
| Clavier : arrêts de tabulation | 12 | 12 | 1 |

## Audit (`audit.mjs`)

- FAIL : 0
- WARN : 4
  - `/le-royal/awwwards/` : phrase répétée 2 fois, « Réserver une table Appeler le 081 22 01 33 »
  - 404 : pas de `<h1>`
  - site : pas de `robots.txt`
  - site : pas de `sitemap` (note : le build a pourtant émis `sitemap-index.xml`, à vérifier)
- Poids de la page la plus lourde (`/le-royal/awwwards/`) : ~927 KB, HTML 5, JS 60 (gz), CSS 5 (gz), polices 66, images 791.

Journaux : `.logs/le-royal-awwwards-build-build.log`, `.logs/le-royal-awwwards-build-shoot.log`, `.logs/le-royal-awwwards-build-audit.log`.
