# ETAT : Bienvenue chez vous, variante awwwards (fin de la phase 3 sur 3)

## Fait
- Brief, trois concepts notés, Concept Card, système (palette, typo, grille, plan de composition), DESIGN.md avec checklist 1 à 18 (voir ses preuves).
- Scaffold Astro 5 : engine verbatim (`src/engine/*`, sans lignes GL), `engine.css`, `tokens.css` (valeurs du concept), `site.css`, `Base.astro` (head complet, JSON-LD Restaurant, noindex, skip link, rideau, KywFooter), `Header`, `Footer`, `Photo`.
- Contenu : `src/data/site.ts` (restaurant, horaires, formules, accords, plats, traiteur, mercredis, histoire), 22 photos du client dans `src/assets/photos/` (≤ 400 Ko), polices Gambetta + Switzer dans `public/fonts/`.
- Pages : `/`, `/carte/`, `/histoire/`, `/reservation/`, `404` ; mise en page statique complète (sans `.motion`, aucun `data-reveal` posé).
- Build : `scripts/q.sh bcv-build pnpm build:site sites/bienvenue-chez-vous-awwwards` passe (5 pages, `dist/bienvenue-chez-vous/awwwards/`).
- Mesures Playwright (hero 1440, 1280, 1024, 390 ; `scrollWidth` des 4 pages à 1440 et 390 ; `left` des `.display` = gutter ou plus) : aucun débordement, h1 et CTA dans le cadre.

## Fait en phase 2 (27/11/2026)
- Module pilote `src/motion/escales.ts` (fil rouge du rail en scrub, escales `.is-lit`, assiettes en `clip-path` cercle, escale qui tourne autour de l'assiette du hero au repos, pointeur), appelé par `src/motion/setup.ts`.
- Transition de page : cercle rouge depuis le point de clic, refermé sur la première escale (0,7 s par sens).
- Reveals : h1 `data-split="lines" data-intro` (5 pages), h2 `data-split="lines"`, `entete__intro`/`hero__lede` `data-reveal="up" data-intro`, formules, statement et repères `data-reveal="up"` (aucun bloc à lien révélé).
- Hovers par rôle sous `(hover: hover)` + `:focus-visible` + `:active` (site.css § Phase 2) ; lien du pied KYW souligné au survol.
- Menu mobile `<dialog>` (Header.astro) ; liste traiteur distinguée (`.index--traiteur`) ; favicon PNG 32 et `apple-touch-icon` 180 (Base.astro).
- Contrôles Playwright (script de scratchpad) : 0 erreur console ni requête échouée ; `scrollWidth` 390 sur les 5 pages ; 6 escales allumées sur 6 au défilement ; 0 texte caché après défilement ; navigation par clic avec rideau ; menu (ouverture, Échap, focus rendu, lien) ; réduit sans `.motion`, sans Lenis, sans fil, 0 élément caché. Captures ciblées dans `.shots/p2/` (non commitées).
- Build : `scripts/q.sh bcv-p2-build pnpm build:site sites/bienvenue-chez-vous-awwwards` passe.

## Reste (phase 3)
- QA navigateur complète (agent captures puis lecture de `QA-*.md`) : `idleMotion`, `hover.noHoverChange`, `reduced.*`, contraste, clavier, cibles (points 35, 36, 39, 44, 45, 47).
- OG recomposée (`og.mjs` ou HTML de scratchpad), sloplint/jury en `self`, RAPPORT.md (compléments fictifs listés), points 42 à 63, `pnpm index`.
- Aucune publication (`scripts/publier.sh` hors périmètre).

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
- Phase 2 : la rotation de `.bague__tour` passe par `gsap.set(…, { rotation, svgOrigin: '100 100' })` ; ne pas poser de transform CSS dessus. L'assiette du hero porte x/y (pointeur) et scale/rotation (intro) : pas de `clearProps` sur elle.
- Le menu mobile ferme le dialog au clic d'un lien (sinon il reste dans la couche supérieure au-dessus du rideau).
- Push de la phase 2 : l'autostash a laissé `stash@{0}` (versions locales de `pnpm-lock.yaml` et `dist/index.html` d'agents frères, conflits résolus vers HEAD) ; ne pas le supprimer sans vérifier.

## Phase 3 (27/11/2026)
- Corrigé : cibles tactiles `.lien` (24 px), meta description histoire (157). Build passe, shoots ciblés home et 404.html propres.
- Reste : jury (critique neuf), OG recomposée, revue à l'œil des contrastes, capture histoire/reservation. Voir RAPPORT.md.
