# QA revue 1 — huile-sur-le-feu / legacy (captures, planches, audit)

Build : `scripts/q.sh huile-sur-le-feu-legacy-revue1-build node scripts/build-site.mjs sites/huile-sur-le-feu-legacy` : exit 0, sortie `dist/huile-sur-le-feu/legacy/`, 6 pages.
Serveur : `serve.mjs dist --port 4503`, PID 29537, arrêté après les captures.
Captures : `scripts/q.sh huile-sur-le-feu-legacy-revue1-shoot ...` : exit 0, 3 dossiers de pages.
Audit : `scripts/q.sh huile-sur-le-feu-legacy-revue1-audit ...` : exit 0. Journal : `.logs/huile-sur-le-feu-legacy-revue1-audit.log`.

## Pages

| Page | Dossier de captures | Planche |
|---|---|---|
| Accueil `/huile-sur-le-feu/legacy/` | `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-legacy-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-legacy-revue1/home/planche.png` |
| Restaurant `/huile-sur-le-feu/legacy/restaurant/` | `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-legacy-revue1/huile-sur-le-feu-item/` | `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-legacy-revue1/huile-sur-le-feu-item/planche.png` |
| URL inconnue (404 servi par le serveur) `/__shoot-missing-page-1794326470083` | `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-legacy-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-huile-sur-le-feu-legacy-revue1/404/planche.png` |

## Chiffres par page (report.json)

| Mesure | Accueil | Restaurant | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe | 0 (0 sérieuse) | 0 (0 sérieuse) | 2 (2 sérieuses) |
| Contraste à vérifier (axe) | 4 | 0 | 0 |
| LCP bureau / mobile (ms) | 520 / 892 | 580 / 892 | 44 / 224 |
| CLS bureau / mobile | 0,055 / 0,001 | 0,002 / 0,006 | 0 / 0 |
| Débordement horizontal bureau / mobile | non / non | non / non | non / non |
| Cibles tactiles petites bureau / mobile | 8 / 0 | 8 / 0 | 0 / 0 |
| Éléments en débordement bureau / mobile | 0 / 0 | 0 / 0 | 0 / 0 |
| Éléments cachés (WebGL masqué) bureau / mobile | aucun / aucun | aucun / aucun | aucun / aucun |
| Clavier : arrêts de tabulation | 12 | 12 | 1 |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 | 0 / 0 |
| Lien d'évitement en premier | non | non | non |
| Focus bloqué | non | non | non |
| H1 | « La Méditerranée dans votre assiette » | « Le restaurant » | aucun |

Détails utiles :
- Accueil : cibles petites bureau = « Voir toute la carte » 131x21, « Voir la boutique » 115x21, « Découvrir la maison » 145x21, « Itinéraire » 65x21, « Accueil » 52x21, « Le restaurant » 95x21, « La carte » 58x21, « La boutique » 84x21.
- Restaurant : 8 cibles petites bureau (même famille de liens de navigation, non relevées en détail).
- 404 : violations axe `document-title` et `html-has-lang` (sérieuses, 1 nœud chacune, sur `html`). Le 404 testé est la réponse de `serve.mjs` à une URL inconnue ; le fichier `dist/404.html` du site n'a pas été vérifié séparément.

## Audit (`audit.mjs`)

- Résultat : 0 FAIL, 38 WARN.
- Poids de la page la plus lourde : `/huile-sur-le-feu/legacy/restaurant/`, environ 931 Ko (HTML 4, JS 1 gz, CSS 5 gz, polices 266, images 655).
- Lignes FAIL : aucune.

## Limites

Captures et audit faits sur le serveur local `127.0.0.1:4503`. Aucun fichier source modifié, aucun commit.
