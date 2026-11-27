# QA build : mon-epi, variante portfolio

Passe : build · Phase : test · Rôle : captures · Serveur local : `dist/` sur http://127.0.0.1:4501/mon-epi/portfolio/ (arrêté après usage)

## Étapes

| Étape | Résultat |
|---|---|
| Build `scripts/build-site.mjs sites/mon-epi-portfolio` | exit 0, 7 pages, `dist/mon-epi/portfolio/` |
| Captures `shoot.mjs --crawl --nav` | exit 0, 3 pages capturées (`home`, `mon-epi-item`, `404`) |
| Audit `audit.mjs` | exit 0, 6 pages explorées, 0 FAIL, 4 WARN |
| Planches `planche.py` | 3 planches, 1920 x 5280 px, 19 images chacune |

## Pages

### Accueil (`/mon-epi/portfolio/`)
- Captures : `/home/user/KYW-test-restaurant/.shots-mon-epi-portfolio-build/home/`
- Planche : `/home/user/KYW-test-restaurant/.shots-mon-epi-portfolio-build/home/planche.png`
- Erreurs console : 0 · requêtes en échec : 0
- Axe : 0 violation (1 à revoir : 79 contrastes non calculables, `contrastNeedsReview`)
- CLS : desktop 0 · mobile 0
- LCP : desktop 76 ms (img) · mobile 2084 ms (img)
- Débordement horizontal : non (desktop et mobile)
- Éléments hors écran : 0 (desktop et mobile)
- Cibles tactiles trop petites : 0 (desktop et mobile)
- Clavier : 0 focus invisible, 0 focus sans indicateur visible, 0 piège, lien d'évitement en premier : non
- Survol : 3 cas couleur seule, 0 élément recouvert
- Mouvement réduit : 0 mouvement, 0 texte caché

### Fiche produit (`/mon-epi/portfolio/pains/`, capture `mon-epi-item`)
- Captures : `/home/user/KYW-test-restaurant/.shots-mon-epi-portfolio-build/mon-epi-item/`
- Planche : `/home/user/KYW-test-restaurant/.shots-mon-epi-portfolio-build/mon-epi-item/planche.png`
- Erreurs console : 0 · requêtes en échec : 0
- Axe : 0 violation (1 à revoir : 140 contrastes non calculables, `contrastNeedsReview`)
- CLS : desktop 0 · mobile 0
- LCP : desktop 160 ms (img) · mobile 1088 ms (p.lead)
- Débordement horizontal : non (desktop et mobile)
- Éléments hors écran : 0 (desktop et mobile)
- Cibles tactiles trop petites : 0 (desktop et mobile)
- Clavier : 0 focus invisible, 0 focus sans indicateur visible, 0 piège, lien d'évitement en premier : non
- Survol : 4 cas couleur seule, 0 élément recouvert
- Mouvement réduit : 0 mouvement, 0 texte caché

### Page 404
- Captures : `/home/user/KYW-test-restaurant/.shots-mon-epi-portfolio-build/404/`
- Planche : `/home/user/KYW-test-restaurant/.shots-mon-epi-portfolio-build/404/planche.png`
- Erreurs console : 0 · requêtes en échec : 0
- Axe : 1 violation, impact sérieux : `color-contrast` (2 nœuds) · 0 à revoir
- CLS : desktop 0 · mobile 0
- LCP : desktop 36 ms (p) · mobile 208 ms (p)
- Débordement horizontal : non (desktop et mobile)
- Éléments hors écran : 0 (desktop et mobile)
- Cibles tactiles trop petites : 1 (desktop et mobile) : « la page d'accueil » 128 x 20 px
- Clavier : 0 focus invisible, 0 focus sans indicateur visible, 0 piège, lien d'évitement en premier : non
- Survol : 0 cas couleur seule, 0 élément recouvert
- Mouvement réduit : 0 mouvement, 0 texte caché

## Audit (`audit.mjs`)

- FAIL : 0
- WARN : 4
  1. `/mon-epi/portfolio/points-de-vente/` : phrase répétée 4 fois « point de vente listé sur monepi.be »
  2. `/mon-epi/portfolio/points-de-vente/` : phrase répétée 4 fois « horaires et gamme à demander sur place »
  3. site : pas de `robots.txt`
  4. site : pas de `sitemap` (le build indique la création de `sitemap-index.xml` dans `sites/mon-epi-portfolio/dist`)
- Poids de la page la plus lourde (`/mon-epi/portfolio/`) : environ 963 Ko · HTML 18 · JS 61 (gz) · CSS 6 (gz) · polices 89 · images 789

## Notes

- Le journal de `planche.py` affiche « ignoré 4 » et « ignoré 480 » : les valeurs de `--colonnes` et `--largeur` sont lues comme des fichiers. Les planches sont produites avec 4 colonnes et 480 px de large.
- Aucun fichier source modifié, aucun commit.
