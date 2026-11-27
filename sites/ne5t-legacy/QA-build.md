# QA build : ne5t / legacy

Faits seuls, extraits des `report.json` et de l'audit. Serveur local : `dist/` servi sur 127.0.0.1:4503, racine `/ne5t/legacy/`.

## Build

- `scripts/build-site.mjs sites/ne5t-legacy` : exit 0, 7 pages construites en 1,31 s, sitemap créé. Sortie : `dist/ne5t/legacy/`.
- Journal : `.logs/ne5t-legacy-build-build.log`.

## Captures

Dossiers de captures et planches (planche de 4 colonnes, 480 px de large) :

| Page | Dossier | Planche |
|---|---|---|
| accueil `/ne5t/legacy/` | `.shots-ne5t-legacy-build/home/` | `.shots-ne5t-legacy-build/home/planche.png` |
| fiche `/ne5t/legacy/restaurant/` | `.shots-ne5t-legacy-build/ne5t-item/` | `.shots-ne5t-legacy-build/ne5t-item/planche.png` |
| 404 | `.shots-ne5t-legacy-build/404/` | `.shots-ne5t-legacy-build/404/planche.png` |

`shoot.mjs --crawl --nav` n'a capturé que ces 3 pages (`summary.json` dans le dossier de captures). L'audit en a crawlé 6 : `/`, `/histoire/`, `/infos/`, `/restaurant/`, `/spa/`, `/suites/`. Les pages `histoire`, `infos`, `spa` et `suites` n'ont pas de captures.

Les planches ont été produites avec 2 arguments parasites (`4` et `480`, valeurs de `--colonnes` et `--largeur`) : `scripts/planche.py` les prend pour des images et les ignore (« ignoré »). Les planches sont quand même produites, 19 images chacune, largeur 1920 px.

## Chiffres par page

| Mesure | accueil | fiche restaurant | 404 |
|---|---|---|---|
| Erreurs console | 1 (`[desktop] Failed to load resource: 404`, URL non indiquée dans le rapport) | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Axe, sérieux | 1 : `label-content-name-mismatch` sur `.nav__cta` (1 nœud) | 1 : même violation sur `.nav__cta` | 1 : `color-contrast` x2, `.kyw-footer__note` et un `span` (#6b787d sur #fbfaf8, 4,36:1, seuil 4,5:1) |
| Axe, à vérifier (contraste) | 11 | 0 | 0 |
| LCP desktop | 548 ms (img) | 424 ms (img) | 36 ms (p) |
| LCP mobile (throttle) | 1 840 ms (h1#titre) | 1 644 ms (img) | 244 ms (p) |
| CLS desktop | 0 | 0,001 | 0 |
| CLS mobile | 0,029 | 0,001 | 0 |
| FPS desktop / mobile | 61 / 61 | 60 / 61 | 60 / 60 (rendu logiciel headless) |
| Débordement horizontal | non | non | non |
| Cibles tactiles petites (desktop / mobile) | 2 / 2 | 0 / 0 | 1 / 0 |
| Texte caché, réduction de mouvement | 0 | 0 | 0 |
| Mouvement au repos | non | non | non |
| Hero stabilisé (ms) | 3 662 | 3 151 | 2 191 |
| Hover sans changement | 1 | 1 | 2 |
| Hover, changement de couleur seul | 6 | 6 | 0 |
| Focus clavier : focus invisible / absent | 0 / 0 | 0 / 0 | 0 / 0 |
| Clavier bloqué | non | non | non |
| Lien d'évitement en premier (drapeau `skipLinkFirst`) | non | non | non |

Détail clavier :
- Accueil et fiche : les premiers arrêts sont « Aller au contenu », puis le logo, puis la navigation.
- 404 : arrêts « la page d'accueil », « Réalisé par », puis sortie de la page (« focus left the page »). Pas de lien d'évitement.

Détail des cibles tactiles petites (desktop) de l'accueil : « Voir le menu complet » 156x20, « Découvrir le spa » 117x20, « Voir les suites et duplex » 171x20, un numéro de téléphone.

Notes du rapport : les FPS desktop viennent d'un GPU logiciel headless, donc un plancher et non une mesure matérielle. Mobile tourne à 4x de ralentissement CPU en 4G lente.

## Audit (`audit.mjs`)

- Journal : `.logs/ne5t-legacy-build-audit.log`.
- Résultat : **0 FAIL, 68 WARN**.
- Les WARN sont : 11 par page sur 6 pages (66), plus 2 WARN « site ». Les WARN visibles sont tous de type `ttf/otf font shipped` (polices en `.ttf` au lieu de `.woff2`), sur `/histoire/` et `/infos/` en particulier.
- Page la plus lourde : `/ne5t/legacy/histoire/`, environ 876 Ko. Détail : HTML 3, JS 1 (gz), CSS 5 (gz), polices 291, images 576.
- Une première passe d'audit, lancée pendant que le serveur n'était pas encore en route, a donné 2 FAIL (`ERR_CONNECTION_REFUSED`). Elle est remplacée par la passe ci-dessus, faite sur le serveur démarré.

## Nettoyage

- Serveur 4503 arrêté (PID 17481, sortie 144 à l'arrêt).
- Aucun fichier source modifié, aucun commit.
