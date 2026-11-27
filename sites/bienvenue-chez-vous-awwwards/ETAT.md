# ETAT : Bienvenue chez vous, variante awwwards (fin de la phase 1 sur 3)

## Fait
- Brief, trois concepts notés, Concept Card, système (palette, typo, grille, plan de composition), DESIGN.md avec checklist 1 à 18 (voir ses preuves).
- Scaffold Astro 5 : engine verbatim (`src/engine/*`, sans lignes GL), `engine.css`, `tokens.css` (valeurs du concept), `site.css`, `Base.astro` (head complet, JSON-LD Restaurant, noindex, skip link, rideau, KywFooter), `Header`, `Footer`, `Photo`.
- Contenu : `src/data/site.ts` (restaurant, horaires, formules, accords, plats, traiteur, mercredis, histoire), 22 photos du client dans `src/assets/photos/` (≤ 400 Ko), polices Gambetta + Switzer dans `public/fonts/`.
- Pages : `/`, `/carte/`, `/histoire/`, `/reservation/`, `404` ; mise en page statique complète (sans `.motion`, aucun `data-reveal` posé).
- Build : `scripts/q.sh bcv-build pnpm build:site sites/bienvenue-chez-vous-awwwards` passe (5 pages, `dist/bienvenue-chez-vous/awwwards/`).
- Mesures Playwright (hero 1440, 1280, 1024, 390 ; `scrollWidth` des 4 pages à 1440 et 390 ; `left` des `.display` = gutter ou plus) : aucun débordement, h1 et CTA dans le cadre.

## Reste (phases 2 et 3)
- Phase 2 : mouvement (révélations `data-reveal`/`data-split` sur les titres, signature escale + assiette qui s'ouvre, bague au repos, rideau rouge entre pages, hovers par rôle, aperçu rond au curseur sur la carte), `motion/` par page, `onPage()`.
- Phase 3 : QA navigateur (captures, axe, clavier, reduced motion, mobile 390), OG recomposée (`og.mjs`), sloplint/jury en `self`, RAPPORT.md, points 42 à 63, distinguer les deux listes index de la carte (point 16), `pnpm index`.
- Aucun commit de `dist/` publié : pas de `scripts/publier.sh` (hors périmètre).

## Décisions
- Concept A « Escales » ; pas de loader ni de GL (motivé dans DESIGN.md).
- Sombre (nuit de la salle) + rouge d'enseigne, pas de crème. Photos de plats rondes, le reste à angle droit.
- Pas de prix inventés : plats du mois sans prix, formules 49/69/79/94 € du site client, Box Tapas 199 € et Box 109 € (à confirmer, noté dans la page : « Prix à confirmer »). Mercredi : « Tarif communiqué à la réservation » (complément, `placeholder`).
- Compléments fictifs modestes (à lister dans RAPPORT.md) : phrases d'ambiance de la page Histoire (« ouvre lui-même les bouteilles », « Sonnez, puis montez »), « le chef répond entre deux services », « Dernières arrivées au début de chaque service », descriptions des deux boxes.
- Téléphone, horaires, e-mail : sources tierces, utilisés tels quels et à confirmer.
- Aucune photo du chef : l'équipe se réduit à son nom et à son rôle, sans portrait.

## Pièges
- `engine.css` pose `.motion [data-reveal] {visibility:hidden}` : en phase 2, tout élément révélé doit être couvert par `onPage()` sinon invisible.
- Les `url()` des `@font-face` sont codées en dur sous `/bienvenue-chez-vous/awwwards/fonts/`.
- `.mur` au téléphone sort volontairement du `.wrap` (marges négatives gauche et droite) : ne pas remettre `margin-inline` symétrique.
