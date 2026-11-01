# QA revue 1 : chez-guillaume / awwwards

Faits seulement (captures, mesures, audit). Build : `dist/chez-guillaume/awwwards/`, serveur local `127.0.0.1:4502` (arrêté après la capture).

## Captures et planches

| Page | URL testée | Dossier de captures | Planche |
|---|---|---|---|
| Accueil | `/chez-guillaume/awwwards/` | `/home/user/KYW-test-restaurant/.shots-chez-guillaume-awwwards-revue1/home/` | `/home/user/KYW-test-restaurant/.shots-chez-guillaume-awwwards-revue1/home/planche.png` |
| Carte | `/chez-guillaume/awwwards/carte/` | `/home/user/KYW-test-restaurant/.shots-chez-guillaume-awwwards-revue1/chez-guillaume-item/` | `/home/user/KYW-test-restaurant/.shots-chez-guillaume-awwwards-revue1/chez-guillaume-item/planche.png` |
| 404 | `/__shoot-missing-page-1793561474084` | `/home/user/KYW-test-restaurant/.shots-chez-guillaume-awwwards-revue1/404/` | `/home/user/KYW-test-restaurant/.shots-chez-guillaume-awwwards-revue1/404/planche.png` |

Synthèse globale : `/home/user/KYW-test-restaurant/.shots-chez-guillaume-awwwards-revue1/summary.json`.

## Chiffres par page

| Mesure | Accueil | Carte | 404 |
|---|---|---|---|
| Erreurs console | 0 | 0 | 0 |
| Requêtes en échec | 0 | 0 | 0 |
| Violations axe (sérieuses) | 0 | 0 | 2 (`document-title` x1, `html-has-lang` x1) |
| axe contraste à vérifier | 29 | 17 | 0 |
| LCP desktop (ms) | 84 (img) | 80 (h1#titre) | 32 (pre) |
| LCP mobile (ms) | 1196 (img) | 1160 (p.texte) | 228 (pre) |
| CLS desktop | 0 | 0 | 0 |
| CLS mobile | 0.02 | 0 | 0 |
| FPS desktop (scroll) | 60 | 60 | 61 |
| FPS mobile (scroll) | 60 | 60 | 61 |
| Chargement load desktop / mobile (ms) | 136 / 2310 | 123 / 2110 | n. d. |
| Premier écran stable desktop / mobile (ms) | 2460 / null (encore en mouvement au plafond) | 2313 / 4122 | 2153 / n. d. |
| Débordement horizontal | non | non | non |
| Cibles tactiles trop petites | 0 | 0 | 0 |
| Éléments de texte cachés en mouvement réduit | 0 | 0 | 0 |
| Mouvement en mouvement réduit | non | non | non |
| Mouvement permanent au repos (desktop) | oui | non | non |
| Clavier : arrêts de focus | 12 | 12 | 1 (le focus quitte la page) |
| Clavier : focus sans indicateur visible | 0 | 0 | 0 |
| Clavier : focus invisible | 0 | 0 | 0 |
| Clavier : piège de focus | non | non | non |
| Lien d'évitement en premier | non | non | non |
| Survol sans changement | 0 | 0 | 0 |
| Survol par couleur seule | 2 | 1 | 0 |
| Survol couvert | 0 | 0 | 0 |
| Suiveur de curseur | non | non | non |

Détail des survols « couleur seule » : accueil `h-02` « Appeler le 081 26 25 65 » et `h-04` « Lire la carte complète, brunch et bar co… » (seule `textDecorationColor` change) ; carte `h-06` « 081 26 25 65 ».

Titres : accueil `Chez Guillaume | Restaurant et comedy club à Namur`, carte `La carte | Chez Guillaume`, 404 sans `<title>` ni `lang`. H1 : accueil « CHEZ GUILLAUME », carte « LA CARTE », 404 aucun.

Notes des rapports : desktop FPS mesurés en headless sur GPU logiciel ; mobile à 4x de ralentissement CPU, slow 4G.

## Audit (`audit.mjs`)

Résultat : **0 FAIL, 5 WARN**. Pages explorées : 4. Poids de la page la plus lourde : environ 402 KB (HTML 5, JS 62 gz, CSS 7 gz, polices 64, images 264).

WARN :
1. `/chez-guillaume/awwwards/carte/` : phrase répétée 2 fois « 29 € 2 services 39 € 3 services »
2. `/chez-guillaume/awwwards/carte/` : phrase répétée 2 fois « Dessert Riz au lait, compotée de coing, prune en pickles »
3. site : la page 404 n'a pas de `<h1>`
4. site : pas de `robots.txt`
5. site : pas de sitemap

Aucune ligne FAIL.

## Notes d'outil

- `scripts/planche.py` lit `--colonnes` et `--largeur` comme des images : il imprime « ignoré 4 » et « ignoré 480 » pour chaque planche. Les planches sont produites correctement (4 colonnes, 480 px de large : 1920 px de large au total).
