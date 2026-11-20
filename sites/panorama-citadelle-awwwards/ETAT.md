# ETAT, Le Panorama (awwwards), fin de la phase 2 (construction-2)

## Fait (phase 1)
- Concept « Le tour d'horizon », système, 5 pages statiques, données, photos : voir DESIGN.md.

## Fait (phase 2)
- Module pilote `src/motion/horizon.ts` (l'heure 8 h à 23 h : défilement, pointeur, repos), appelé par `src/motion/setup.ts` ; `startCarte()` souligne la section lue dans l'index de la carte (aussi en mouvement réduit).
- `Regle.astro` : props `pilote` (soleil confié au module, `.regle__astre`) et `etiquette` (heure affichée au-dessus du soleil, hero seulement).
- Intro du hero, balayage latéral des images, titres `data-split="lines"` (accueil, histoire équipe, catégories de la carte), règles tracées cran par cran, vue du hero en scrub.
- Rideau : ligne d'horizon et soleil dans le panneau (Base.astro + setup.ts).
- Hovers réécrits (site.css § Phase 2) : aplat balayé (CTA, liens texte), trait (nav, index) ; `:focus-visible`, `:active`, `@media (hover: hover)` ; pied KYW souligné au survol.
- Règle du hero déplacée en haut de la vue (voile ardoise au-dessus, l'ancien voile du bas retiré) : le soleil est dans le premier écran.
- Corrections : pied du site en `<section aria-label>` (plus de second `<footer>`), liens du pied en vert sauge (contraste), 404 sans débordement (`.perdu { overflow-x: clip }`), en-tête tenu à 320 px, `favicon-32.png` et `apple-touch-icon.png`.
- Build OK. Contrôles Playwright (port 4467) : 0 erreur console ni requête échouée ; navigation accueil vers carte (rideau caché à l'arrivée, titres visibles) ; repos visible ; `scrollWidth` = largeur à 320/360/390 sur 5 pages ; 0 texte caché en mouvement réduit.

## Reste (phase 3)
- Shoot complet (agent captures), `report.json` : `idleMotion`, `settledMs` (le repos ne bouge que le soleil et l'étiquette, ~600 à 1 000 px par 1,5 s, sous le seuil de 1 %), `hover.noHoverChange`, axe, contraste des heures de la règle sur la photo, LCP.
- Points 35, 36, 45 de DESIGN.md à prouver par report.json ; RAPPORT.md (jury, 42 à 63).
- Facultatif : `--t-mega` vers ~15vw (le h1 occupe ~75 % de la largeur à 1440), vérifier la ligne unique à 390.

## Décisions
- Pas de loader, pas de GL, pas de menu hamburger (mesuré), pas de follower de curseur.
- Le soleil du hero commence à 8 h environ (haut de page = début de journée), la marque statique 20 h ne sert qu'au repli.
- Pièges : `.regle__h` et `.regle__etiquette` portent un `translate` CSS : ne les animer qu'en opacité ; `serve.mjs dist --port <n>` sert le dépôt `dist/` entier, URL `/panorama-citadelle/awwwards/`.
