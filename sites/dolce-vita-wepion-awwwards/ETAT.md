# ETAT · dolce-vita-wepion-awwwards · fin de phase 2 (construction-2), 01/11/2026

## Fait (phase 1)
- Concept « Il neon » (verbe : allumer), système, contenu réel, 5 pages statiques, build : voir DESIGN.md (points 1 à 18).

## Fait (phase 2)
- Pilote `src/motion/neon.ts` : allumage des tubes par paliers (intro du hero et des têtes de page, pied au défilement), bourdonnement de repos, hoquets, tubes grillés de la 404 qui tentent de repartir, influence du pointeur (tension au toucher), mesures `--tete-h` / `--sommaire-h` pour les éléments collants de la carte.
- `--halo` déclaré sur `*` (tokens.css) pour que `--lum` local compte ; segments en `color-mix` allumé/éteint ; secours CSS si le module ne démarre pas (tout s'allume à 2,5 s).
- Menu mobile `src/motion/menu.ts` (popover + aria-expanded, focus, piège, retour, Lenis suspendu, lignes qui s'allument).
- Transition `src/motion/setup.ts` (la salle s'éteint en deux battements 0,32 s, sort du noir 0,6 s).
- États : animation CSS `allumer` au survol (sous `hover: hover`) et au focus, `:active`, liens KYW soulignés au survol, mouvement réduit tout allumé sans animation.
- Reveals `data-split` / `data-reveal` sur titres de section, devise, faits, photos hors premier écran.
- Favicon PNG 32 et apple-touch-icon 180 (Base.astro).
- Build OK (`scripts/q.sh aw2-build …`). Tests Playwright maison (`.shots/aw2-test.mjs`, `.logs/aw2-test.log`) : allumage, pointeur, navigation, menu 390, réduit, 0 erreur console ni requête échouée. Repos : diff 0 à 0,15 % par 0,5 s.
- DESIGN.md : § Mouvement livré + checklist 19 à 47.

## Reste (phase 3)
- Shoot complet et audit (agent captures), jury ; points 35, 36, 45 (et confirmation 39, 44, 47) par `report.json`.
- Vérifier que `idleMotion` est détecté avec une respiration aussi douce (0,15 %) ; si non, augmenter l'amplitude du souffle (`neon.ts`, ligne `const souffle`) en surveillant `settledMs`.
- Contraste : le tube à mi-allumage n'existe que pendant ~1 s ; vérifier que l'audit ne le compte pas.
- `pnpm index`, RAPPORT.md, publication.

## Décisions / pièges
- Pas de loader, pas de GL, pas de suiveur de curseur ni de magnétisme (rien ne glisse dans ce concept).
- Une var() se résout là où la propriété est déclarée : `--halo` sur `:root` ignorait le `--lum` des enfants (leçon ajoutée).
- `gabarits/` non touché.
