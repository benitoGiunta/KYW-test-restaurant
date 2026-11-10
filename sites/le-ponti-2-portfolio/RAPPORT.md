# RAPPORT : le-ponti-2 / portfolio (gabarit guinguette)

## QA (phase 3)
- Source : QA-build.md (agent captures) : 0 erreur console, 0 requête en échec, 0 FAIL audit (13 WARN : répétitions d'horaires, 404/robots/sitemap = faux positifs connus), axe 0 sérieuse sur accueil et carte, aucun débordement, cibles tactiles OK, CLS < 0,02.
- Défaut corrigé : sur mobile (390), les prix « 18,50 € » passaient sur deux lignes dans la pastille. Espace insécable avant « € » (carte.astro, index.astro). Vérifié par mesure : sur 99 prix à 390 px, seul « 12 € par personne » reste sur deux lignes (voulu, déjà traité en phase 2).
- Non corrigé, à noter : LCP mobile throttled 3,7 s sur l'accueil (image hero, 700 Ko d'images au total) ; 26 + 16 contrastes « à vérifier » d'axe (incomplets, pas des violations) ; barre d'onglets mobile défilante (dernier onglet coupé, défilement horizontal voulu).
- Build final : OK (scripts/q.sh), `dist/le-ponti-2/portfolio/`.

## Placeholders
- Aucune donnée `placeholder: true` (les deux occurrences du grep sont des commentaires) ; aucun avis, récompense ou chiffre inventé ; section avis remplacée.
- Logo client non intégré (nom en police display) ; « Ouvert, arrivée jusqu'à 14:30 » à valider.

## Points ouverts
- Test tactile du glisser sur mobile non fait ; Lighthouse et sloplint non lancés (pas d'agent).

## Leçons structurelles
- Gabarit guinguette : `.table__rail` écrasé par `.rail` (voir agents/lecons/construction.md) ; à corriger dans gabarits/ par l'agent responsable.
- Prix en pastille : mettre une espace insécable avant « € » à l'affichage.
