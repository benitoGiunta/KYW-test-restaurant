# ETAT : Grill des amiS, variante awwwards (fin de la phase 2)

## Fait (phase 1)
- DESIGN.md (concept « Du brut au feu »), scaffold, contenu réel (68 plats), 5 pages, head complet, photos, build. Voir DESIGN.md.

## Fait (phase 2)
- Pilote `src/motion/tranche.ts` (feu des gestes, tranche des photos, intro et repos du hero, rubriques de la carte) + `src/motion/idle.ts` ; `setup.ts` (transition lame corrigée : la lame est sortie du panneau pour rester visible à l'arrivée) ; menu en `expo` (plus de `steps`).
- Reveals déclaratifs : `data-split="lines"` sur les titres de section, la citation et le mot du pied ; `data-reveal="up"` sur blocs sans lien ; `data-tranche` sur 13 photos.
- Hovers réécrits sous `@media (hover: hover)` + `:focus-visible` + `:active` ; lien KYW souligné au survol ; `::selection` braise.
- En-tête à hauteur fixe `--tete-h` (4,5 rem), opaque sur la carte : la bande des rubriques colle dessous (avant : texte visible entre en-tête et bande).
- Contrôles Playwright (1440, 390, réduit) : aucune erreur console, `scrollWidth` = largeur sur les 5 pages, texte caché 0 après défilement, coupes toutes terminées, menu accessible, transition 1,14 s.
- Build OK (`.logs/awwwards2-build.log`).

## Reste (phase 3)
- Shoot complet et audit (agent captures), lecture `report.json` : `idleMotion`/`idleAt`, `hover.noHoverChange`, `reduced.*`, contraste, cibles, LCP.
- RAPPORT.md, DESIGN.md points 35, 36, 41 à 63, `og.png` à recomposer si voulu, `pnpm index`, commit final.

## Décisions et pièges
- Pas de loader, de GL, de curseur suiveur ni de magnétisme (contraire au verbe « trancher »). Pas d'aperçu au curseur des index : aucune photo par plat.
- Le haut de la photo des flammes est naturellement noir : ce n'est pas un trou de mise en page.
- Repos : si `settledMs` passe à null en phase 3, baisser l'opacité ou la vitesse de `.hero__lame` (tranche.ts, période 7 s).
- Horaires, photo des patrons, `.pied__col` en `nth-of-type` : voir phase 1 (inchangé).
