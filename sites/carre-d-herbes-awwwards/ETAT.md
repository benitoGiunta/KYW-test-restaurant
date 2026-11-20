# ETAT carre-d-herbes-awwwards
## Phase 1 (construction-1)
Fait : DESIGN.md, scaffold Astro, engine, tokens, composants, 5 pages statiques, polices, 16 photos. Décisions : pas de loader, pas de GL, pas de mailto, Gault&Millau 13,5/20 douteux (RAPPORT.md).

## Phase 2 (construction-2, 20/11/2026)
Fait :
- Reveals : h1 `data-split="lines" data-intro`, h2 `data-split="lines"`, photos non prioritaires `reveal` (prop de `Photo.astro` : `scale` pour les ronds, `clip` pour les carrés) ; `fallbackFormat="webp"` ajouté.
- Pilote `src/motion/assiettes.ts` : intro du hero (carré tracé, assiette posée en tournant), repos (orbite du carré, pointeur), tournette au défilement (`data-tournette`), signature « Compter les assiettes » (ronds posés à 60 ms).
- Interactions par rôle en fin de `site.css` (bloc « Phase 2 »), survols sous `(hover: hover)`, focus et `:active`.
- Menu mobile `src/motion/menu.ts` + bouton dans `Header.astro` (carré qui devient rond).
- Pied du site en `<section>` (le paquet KYW porte le `<footer>`), favicon PNG 32 et apple-touch-icon 180, `.split-line` pour capitales accentuées, lien KYW souligné au survol.
- Build OK. Contrôle ciblé (script de scratchpad) : 0 erreur JS, aucun débordement à 320/360/390 sur 5 pages, menu conforme, réduit sans texte caché.
Reste (phase 3) : shoot complet et `report.json` (points 35, 36, 41, 45), OG recomposée, RAPPORT.md, apostrophes droites des pages Astro, points 42 à 63, `pnpm index`.
Pièges : au bureau, le « s » de « d'herbes » touche le bord du disque à 1440 (titre au-dessus, voulu en phase 1, à juger en phase 3) ; le h1 du hero porte `data-intro` (exigé par phase-2) : surveiller le LCP en phase 3.
