# ETAT : Makimono awwwards, après la phase 1 (construction-1)

## Fait
- Concept « Le déroulé » (makimono = rouleau), trois concepts notés, Concept Card, palette nori / riz / rose de gingembre, Archivo variable (l'axe de chasse = état du rouleau), plan de composition : `DESIGN.md` (checklist 1 à 18 cochée avec preuves, 5 et 9 partiels).
- Scaffold, engine copié de le-royal (verbatim du socle), `Base.astro` (head complet, JSON-LD Restaurant, noindex, KywFooter), `Header` (rouleau fixe), `Footer`, `Photo`, `Maki`, `Ligne`.
- Contenu : `src/data/site.ts` + `src/data/carte.json` (généré depuis donnees.json : 21 rolls dont 13 au choix de la protéine, nigiri, poké, Create.Your.Roll et Bowl, accompagnements, desserts, boissons).
- 5 pages statiques : `/`, `/carte/`, `/a-propos/`, `/reservation/`, `404`. Build OK (`pnpm build:site sites/makimono-awwwards`), `dist/makimono/awwwards/` commité.
- Mesures 1440, 1280, 1024, 390 : aucun débordement, h1 et CTA dans le gutter, `.display` à gauche = gutter.
- favicon SVG, `og.png` rendue depuis le hero.

## Reste (phases 2 et 3)
- Phase 2 : signature « le déroulé » (rouleaux haut et bas liés à `--p`, reflet au repos), transition de page (rideau nori déjà branché dans `src/motion/setup.ts`), révélations (`data-reveal`, `data-split`) sur titres, sélecteur de protéine animé sur la carte, aperçu au curseur sur l'index, hover vérifiés en navigateur, `prefers-reduced-motion`.
- Phase 3 : QA navigateur (shoot, audit, axe, LCP mobile), sloplint/jury en auto-notation, points 42 à 63 de la checklist, `pnpm index`, commit final.
- Au pied, `Maki.astro` n'est utilisé que dans l'en-tête ; envisager un second usage (loader non prévu).
- Panneau « Ouvrir le plan » : lien OpenStreetMap (pas d'iframe).

## Décisions
- Pas de loader ni de GL (voir Concept Card). Page `/a-propos/` titrée « La maison » (aucune histoire connue, rien d'inventé).
- Aucun avis ni note affichés ; aucun placeholder ; téléphone du site client.
- Les prix « dès » viennent de `carte.json` ; Korean Futo marqué « Prix à confirmer ».
- Étoile du chef et V de la carte : non reportés plat par plat (marqueurs non transcrits dans les données).

## Pièges
- Fullpage screenshot : défiler avant capture (images lazy).
- `--t-mega` calé à 12,4 vw pour « MAKIMONO » (7,3 em en chasse 125 %) : ne pas l'augmenter sans remesurer.
- `sites/makimono-legacy/` (non suivi) appartient à un autre agent : ne pas l'ajouter.
