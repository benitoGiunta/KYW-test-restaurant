# QA revue 1 : escale-en-vue, variante portfolio (captures)

Rôle : captures · Phase : test · Source : `dist/escale-en-vue/portfolio/` servi sur `http://127.0.0.1:4501/escale-en-vue/portfolio/`

## Build

- `scripts/build-site.mjs sites/escale-en-vue-portfolio` : exit 0, 6 pages, `dist/escale-en-vue/portfolio/`.
- Journal : `/home/user/KYW-test-restaurant/.logs/escale-en-vue-portfolio-revue1-build.log`

## Captures et planches

Le crawl annonce 5 pages (`audit`), mais seuls 3 dossiers de captures ont été produits par `shoot.mjs --crawl --nav`.
Les pages `histoire`, `terrasse` et `reservation` n'ont pas de dossier de captures.

| Page | URL | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | `/escale-en-vue/portfolio/` | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-revue1/home/planche.png` |
| Carte (dossier `escale-en-vue-item`) | `/escale-en-vue/portfolio/carte/` | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-revue1/escale-en-vue-item/` | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-revue1/escale-en-vue-item/planche.png` |
| 404 | `/__shoot-missing-page-…` | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-revue1/404/planche.png` |

- Résumé : `/home/user/KYW-test-restaurant/.shots-escale-en-vue-portfolio-revue1/summary.json`
- Les planches ont été produites (1920 x 5280, 19 images chacune) mais `scripts/planche.py` a ignoré `--colonnes 4 --largeur 480` (ces options sont lues comme des fichiers : « ignoré 4 », « ignoré 480 »). La largeur de sortie est donc celle par défaut du script.

## Chiffres par page (report.json)

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (total) | 0 | 0 | 1 (serious : `color-contrast`, 2 nœuds) |
| Contraste à vérifier (needs review) | 28 | 19 | 0 |
| LCP desktop (ms) | 80 | 64 | 24 |
| CLS desktop | 0.063 | 0.015 | 0 |
| LCP mobile (ms, throttled) | 1116 | 1072 | 228 |
| CLS mobile | 0.003 | 0 | 0 |
| FPS scroll desktop (headless) | 60 | 60 | 61 |
| FPS scroll mobile | 60 | 60 | 61 |
| Débordement horizontal | non | non | non |
| Cibles tactiles petites | 0 | 0 | 1 |
| Texte caché (reduced motion) | 0 | 0 | 0 |
| Mouvement en reduced motion | non | non | non |
| Lien d'évitement en premier | non | non | non |
| Focus clavier sans indicateur visible | 0 | 0 | 0 |
| Focus clavier bloqué | non | non | non |
| Arrêts clavier | 12 | 12 | 3 |
| Survol sans changement | 0 | 0 | 2 |
| Survol changement couleur seule | 0 | 3 | 0 |
| Mouvement permanent au repos | oui | oui | non |
| Hauteur première page desktop / mobile (px) | 7924 / 6983 | 3561 / 5270 | 900 / 844 |

Notes : les FPS desktop sont mesurés en headless sur GPU logiciel (plancher, pas une mesure réelle). Le LCP mobile de l'accueil est sur `p.hero__slogan`, celui de la carte sur `p.lead`.

## Audit (`audit.mjs`)

- Journal : `/home/user/KYW-test-restaurant/.logs/escale-en-vue-portfolio-revue1-audit.log`
- Résultat : **0 FAIL, 7 WARN**
- WARN :
  - 5 × « sentence repeated 2x » : `Horaires du jour Ouvert du jeudi soir au dimanche après-midi Saison 20…` sur `/`, `/carte/`, `/histoire/`, `/terrasse/`, `/reservation/`
  - 1 × « no robots.txt » (site)
  - 1 × « no sitemap » (site)
- Le build a pourtant écrit `sitemap-index.xml` (`@astrojs/sitemap`) : à vérifier, l'audit ne le trouve peut-être pas à la racine servie.

## Constats factuels à traiter

- Accessibilité 404 : `color-contrast` serious, `.kyw-footer__note` et un `span` en `#6b787d` sur `#fbfaf8`, 4,36:1 (seuil 4,5:1).
- 404 : 1 cible tactile petite ; 2 éléments sans changement au survol.
- Carte : 3 éléments dont le survol ne change que la couleur.
- Pages sans capture : `histoire`, `terrasse`, `reservation` (crawlées, non photographiées).
- Logs : `/home/user/KYW-test-restaurant/.logs/serve-portfolio.log`.
