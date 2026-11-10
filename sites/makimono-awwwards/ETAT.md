# ETAT : Makimono awwwards, après la phase 2 (construction-2)

## Fait
- Phase 1 : concept « Le déroulé », système, 5 pages statiques (voir DESIGN.md).
- Phase 2 : pilote `src/motion/deroule.ts` (`--p` sur l'en-tête et `#reste`, reflet au pointeur, `startIdle`), intro des titres par la chasse (62 vers 125), hero qui se roule au scroll, transition rideau de nori à bord cylindrique (`setup.ts`), menu mobile `<dialog>` (`src/motion/menu.ts`, `Header.astro`), révélations `data-split`/`data-reveal`, hovers sous `(hover: hover)` + `:focus-visible` + `:active`, `<details>` de protéine qui se déroule, favicon PNG 32 et `apple-touch-icon` 180, nom de marque visible au téléphone.
- Contrôles Playwright (script `mkaw2-check.mjs` du scratchpad) : 0 débordement à 1440 et 390 sur 5 pages, 0 erreur console ni requête échouée, `p` 0 puis 1, menu (0 sortie de Tab, Échap, focus rendu), réduit sans texte caché.
- Build OK (`scripts/q.sh build pnpm build:site sites/makimono-awwwards`), `dist/makimono/awwwards/` commité.
- DESIGN.md : § Mouvement livré, checklist 19 à 47 (35 en attente, 36 et 45 partiels).

## Reste (phase 3)
- QA complète (shoot, audit, axe, LCP mobile, `hover.noHoverChange`, `idleAt`, `reduced.*`, contraste), points 35, 36, 45 et 42 à 63, RAPPORT.md, `pnpm index`.
- Vérifier que le reflet de repos (démarre 2,5 s après la dernière action) ne rend pas `settledMs` nul ; sinon allonger `REPOS_MS`.

## Décisions
- Pas de loader, pas de GL, pas de curseur suiveur, pas d'aperçu au curseur sur l'index (aucune photo par roll).
- Bouton plein sur riz : survol texte riz sur rose foncé (contraste), nori sur rose clair dans les bandes nori.

## Pièges
- `--t-mega` calé pour « MAKIMONO » à 125 % : la chasse animée ne dépasse jamais 125 %, ne pas l'augmenter.
- `sites/makimono-legacy/` et `sites/makimono-portfolio/` appartiennent à d'autres agents : ne pas les ajouter.
