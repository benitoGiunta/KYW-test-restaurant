# ETAT · dumont-bouge · awwwards · fin de la phase 2 (construction-2)

## Fait (phase 1)
- Concept A « Sept à dix-huit », système, contenu, 5 pages statiques, images, build : voir DESIGN.md (points 1 à 18).

## Fait (phase 2)
- Pilote `src/motion/journee.ts` : heure 7 h à 18 h tirée du défilement, distribuée à la règle fixe (marge droite au bureau, filet de 4 px en bas sous 62 rem), au pinceau du hero (déroulé à l'intro, dérive de repos, pointeur), aux heures de l'index (trait déroulé), aux chiffres (comptés une fois), aux photos `[data-deroule]` (clip de gauche à droite). 404 épinglée « 18 h 01 » (`heure` passé à Base).
- `idle.ts` (recette motion.md), `menu.ts` (menu plein écran sous 40 rem : focus piégé, Échap, retour du focus), `setup.ts` (rideau inchangé, ≤ 1 s par sens).
- Reveals : `data-split="lines"` sur les h2 display, `data-intro` sur h1 et chapeaux des pages intérieures et h1 de la 404 ; hero sans intro sur « Dumont » ni la photo (LCP).
- Hovers : deux traitements (remplissage déroulé, trait déroulé), `(hover: hover)` + `:focus-visible`, `:active`, liens soulignés au repos ; lien du pied KYW souligné.
- Finitions : favicon PNG 32 et apple-touch-icon 180.
- Build OK (`scripts/q.sh db-aww2-build`) ; vérif navigateur : 0 erreur, 0 débordement à 390 sur 5 pages, réduit sans texte caché (DESIGN.md points 19 à 47).

## Reste (phase 3)
- Shoot complet (agent captures), lire `report.json` : hover (35), `idleMotion` (36 : si non détecté, augmenter l'amplitude du pinceau dans `journee.ts`), contraste (45), cibles (47), LCP, axe.
- Vérifier à l'œil : étiquette de la règle (texte vertical sur la piste) à 1024 et 1440 ; panneau du menu à 360 ; intro de « Bouge » au premier frame (petit risque de flash avant le `gsap.set`).
- og.png composée, sloplint, RAPPORT.md, `pnpm index`, commit de `dist/index.html`.

## Décisions
- Pas de loader, pas de GL, pas de curseur personnalisé, aucun épinglage (la règle porte la progression sans pin).
- Photos révélées par un clip gauche à droite propre au pilote (`data-deroule`) plutôt que `data-reveal="clip"` (vertical) de l'engine, pour rester dans le verbe « dérouler ».
- La règle est masquée en mouvement réduit et sans JS (les heures portent le concept partout ailleurs).
