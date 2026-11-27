# QA build : bergerie-lives / awwwards (rôle captures, passe build, phase test)

Faits seulement. Build : `scripts/build-site.mjs`, exit 0 (5 pages, 1,85 s). Serveur local `serve.mjs dist --port 4502`, arrêté ensuite.

## Captures et planches

| Page | Dossier de captures | Planche | Contenu |
|---|---|---|---|
| Accueil | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-awwwards-build/home/` | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-awwwards-build/home/planche.png` | 41 fichiers (desktop, mobile, hover, focus clavier, transition) |
| Fiche « Le domaine » | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-awwwards-build/bergerie-lives-item/` | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-awwwards-build/bergerie-lives-item/planche.png` | captures du crawl |
| 404 | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-awwwards-build/404/` | `/home/user/KYW-test-restaurant/.shots-bergerie-lives-awwwards-build/404/planche.png` | page d'erreur |

Remarque : `planche.py` a traité `--colonnes 4 --largeur 480` comme des fichiers source (« ignoré ») ; les trois planches ont été produites avec les réglages par défaut, 1920 x 5280 px, 19 images chacune.

## Chiffres par page (report.json)

| Mesure | Accueil | Le domaine | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 | 0 | 1 règle `color-contrast` (serious), 2 nœuds |
| Contraste à vérifier (axe) | 19 | 18 | 0 |
| CLS desktop / mobile | 0,01 / 0,017 | 0 / 0,003 | 0 / 0 |
| LCP desktop / mobile (ms) | 92 / 2664 | 132 / 1000 | 40 / 276 |
| LCP élément desktop / mobile | img / img | img / p | p / p |
| Débordement horizontal desktop / mobile | non / non | non / non | non / non |
| Éléments cachés (offenders) desktop / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Cibles tactiles petites desktop / mobile | 2 / 2 | 1 / 1 | 1 / 1 |
| FPS défilement desktop / mobile | 60 / 60 | 60 / 60 | 60 / 60 |
| Trame la plus lente desktop / mobile (ms) | 17 / 17 | 17 / 17 | 33 / 33 |
| Chargement (load) desktop / mobile (ms) | 165 / 3184 | 93 / 2581 | 24 / 434 |
| Stabilisation écran desktop / mobile (ms) | 2614 / 5385 | 2341 / 4628 | 2208 / 2455 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier : focus bloqué | non | non | (focus sort du document) |
| Lien d'évitement en premier | non | non | non |
| Survol : changement de couleur seul / sans changement | 1 / 1 | 0 / 2 | 0 / 2 |
| Survol : cibles recouvertes | 0 | 0 | 0 |
| Mouvement réduit : écran encore animé / texte masqué | non / 0 | non / 0 | non / 0 |

Détail des violations de la 404 (`a11y.violations[0].nodes`) :
- `.kyw-footer__note` : `#6b787d` sur `#fbfaf8`, 4,36:1 (exigé 4,5:1)
- `span` : `#6b787d` sur `#fbfaf8`, 4,36:1 (exigé 4,5:1)

Ordre de tabulation de l'accueil : « Aller au contenu », « La Bergerie de Lives », « Le domaine », « Histoire », « Visiter », « Appeler », « Visiter le domaine », téléphone, « Parcourir le domaine », puis les cartes Chambres, Mariages, Séminaires. Le lien d'évitement n'est pas le premier arrêt (`skipLinkFirst: false`) ; les rapports ne signalent pas de focus invisible.

Notes des rapports : le FPS desktop est mesuré sur rendu logiciel headless (plancher, pas une mesure matérielle) ; le mobile est à ralentissement CPU x4 en 4G lente (`mobile.throttled: true`).

## Audit (audit.mjs)

- FAIL : 0
- WARN : 2
  - site : no robots.txt
  - site : no sitemap (l'audit regarde la racine `127.0.0.1:4502/`, le sitemap est généré sous `/bergerie-lives/awwwards/`, voir `sites/bergerie-lives-awwwards/dist` au build)
- Pages crawlées : 4 ; page la plus lourde : `/bergerie-lives/awwwards/`, ~2012 Ko (HTML 5, JS 60 gz, CSS 5 gz, polices 60, images 1880)

## Journaux

`/home/user/KYW-test-restaurant/.logs/bergerie-lives-awwwards-build-build.log`, `...-shoot.log`, `...-audit.log`, `...-planche-*.log`.
