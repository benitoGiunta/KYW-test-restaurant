# QA revue 1 — le-royal / legacy (captures)

Build : `sites/le-royal-legacy` → `dist/le-royal/legacy/` (exit 0). Serveur statique local port 4503 (arrêté après usage).
Pages capturées : 2 (`home`, `404`). Crawl : 1 page (`/le-royal/legacy/`). `--nav` : aucun lien de navigation cliqué.

## Dossiers et planches

| Page | Dossier de captures | Planche |
|---|---|---|
| home (`/le-royal/legacy/`) | `/home/user/KYW-test-restaurant/.shots-le-royal-legacy-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-le-royal-legacy-revue1/home/planche.png` |
| 404 | `/home/user/KYW-test-restaurant/.shots-le-royal-legacy-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-le-royal-legacy-revue1/404/planche.png` |

Journal planche : `scripts/planche.py` affiche « ignoré 4 » et « ignoré 480 » (les valeurs de `--colonnes` et `--largeur` sont lues comme fichiers, sans effet sur la planche, 14 images incluses dans chaque cas). Planche 404 : 42 Ko, home : 1,5 Mo.

## Chiffres (report.json)

| Mesure | home | 404 |
|---|---|---|
| axe : violations | 0 | 2 (serious : `document-title`, `html-has-lang`) |
| axe : contrastNeedsReview | 0 | 0 |
| Erreurs console | 0 | 0 |
| Requêtes en échec | 0 | 0 |
| LCP desktop / mobile (ms) | 396 / 1016 | 40 / 216 |
| CLS desktop / mobile | 0,001 / 0,128 | 0 / 0 |
| Chargement desktop / mobile (ms) | 638 / 1943 | 31 / 202 |
| Débordement horizontal desktop / mobile | non / non | non / non |
| Éléments cibles trop petits desktop / mobile | 0 / 0 | 0 / 0 |
| Offenders desktop / mobile | 0 / 0 | 0 / 0 |
| FPS scroll desktop / mobile | 60 / 61 | 61 / 60 |
| h1 | « Le Royal Namur » | aucun |
| Clavier : arrêts de focus | 12 | 1 (« focus left the page ») |
| Clavier : focus invisible / sans focus visible | 0 / 0 | 0 / 0 |
| Clavier : piège (stuck) | non | non |
| Clavier : skipLinkFirst | false (1er arrêt : « Aller au contenu ») | false |
| Hover : cibles testées | 7 (h-01 à h-07), couvertes 0 | 0 |
| Mouvement réduit : texte masqué / mouvement | 0 / non | 0 / non |

Home : `glOn` = false (WebGL inactif en desktop) ; `notes` : « desktop FPS runs headless on a software GPU » et « mobile runs at 4x CPU slow ».

## Audit (audit.mjs)

- **FAIL : 0**
- **WARN : 8**
  1. 404 : page sans `<h1>`
  2. site : pas de `robots.txt`
  3. site : pas de `sitemap`
  4-7. `/le-royal/legacy/` : 4 fichiers TTF/OTF embarqués (`ttf/otf font shipped`, noms `k3k6o8…ttf`, `k3k6o8…ttf`, `tss5ApVB…ttf`, `OpNJno4c….ttf`), à convertir en woff2
  8. `/le-royal/legacy/` : fonts 376 Ko (moins de graisses, variable, sous-ensemble)
- Page la plus lourde : `/le-royal/legacy/`, ~1061 Ko (html 7, JS 1 gz, CSS 5 gz, fonts 376, images 673).

