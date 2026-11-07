# ETAT : incorrect awwwards, fin de la phase 2 (construction-2)

## Fait (phase 1)
- Concept « Le demi-tour » (le Я), DESIGN.md, scaffold, engine verbatim sans GL, 5 pages, contenu réel, favicon, og.png.

## Fait (phase 2)
- `src/motion/demitour.ts` (pilote : entrée, survol et focus, vitesse de défilement, pointeur, repos `startIdle`), `src/motion/menu.ts` (menu `<dialog>`), `src/motion/setup.ts` (transition à deux volets et R, intro de la photo du hero).
- Reveals `data-split` sur tous les titres d'affichage, `data-reveal` sur chiffres et fiches, parallaxe d'image dans son cadre (`Photo parallax`), `data-magnetic` sur le CTA du hero, `data-endroit` sur le CTA de la 404.
- Hovers réécrits sous `@media (hover: hover)` + `:focus-visible` + `:active`, `::selection` dans l'accent, lien du pied KYW souligné au survol.
- Menu mobile sous 40 rem ; hero mobile recalé (débordement de 20 px à 320 px corrigé, mot-poster réglé sur la largeur utile).
- Vérifié en navigateur (port 4471) : 0 erreur console ou requête, transition aller-retour, menu (ouverture, Échap, retour du focus, navigation), réduit (rien de caché, pas de Lenis), `scrollWidth` 320/360/390 sur les 5 pages = largeur.
- Build passe (`scripts/q.sh awwp2-build pnpm build:site sites/incorrect-awwwards`).

## Reste (phase 3)
- QA complète (agent captures) : `idleMotion`/`settledMs` (repos ± 26° sur le h1, à régler si `settledMs` null), `hover.*`, contrastes, cibles, LCP, clavier.
- RAPPORT.md, points 35, 45 et 42 à 63 de la checklist, sloplint et jury en auto-notation.
- Si le jury juge le Я trop serré contre le R voisin pendant la rotation : baisser `transformPerspective` ou l'amplitude du repos.

## Décisions
- Pas de loader, pas de GL, pas de curseur suiveur. Un seul r retourné par mot de titre. Le Я du h1 se balance au repos ; les autres titres font un demi-tour à l'entrée seulement.
- Horaires « à confirmer », aucun placeholder (inchangé).

## Pièges
- GSAP absorbe la propriété CSS individuelle `scale: -1 1` du `.r` dans son `transform` et écrit `scale: none` en ligne : le Я reste correct, ne pas ajouter de `transform` CSS sur `.r`.
- Un `<dialog>` modal reste dans la couche supérieure au-dessus du rideau : `menu.ts` le ferme au clic sur un lien, avant la transition.
- Le port 4417 était pris par un autre agent : serveur propre sur 4471.
