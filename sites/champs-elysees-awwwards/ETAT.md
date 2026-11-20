# ETAT, champs-elysees-awwwards, construction-2 (20/11/2026)
## Fait (phase 1)
- Concept « Le jour sans pause », Concept Card, système, 5 pages statiques, contenu réel, build (voir DESIGN.md, checklist 1 à 18).
## Fait (phase 2)
- Module pilote `src/motion/jour.ts` (heure de la page : horloge fixe `#horloge`, trait des heures `--draw`, `theme-color`, pointeur, `startIdle` = trotteuse), `setup.ts` (transition « store du soir »), `menu.ts` (menu mobile plein écran accessible).
- Reveals : h1 `data-split="lines" data-intro` partout, h2 display et énoncés `data-split`, cadres photo `data-reveal="clip"` (pas le hero), barres de la semaine, plaque 404.
- Hovers par rôle sous `(hover: hover)` + `:focus-visible` + `:active` ; `::selection` orange ; favicon PNG 32 et apple-touch-icon 180 (`public/`) ; lien du pied KYW souligné au survol.
- Corrections trouvées en route : hero mobile (heure posée sur le h1 : `grid-row` 2 et 3 au téléphone), placements de grille en style en ligne remplacés par classes (`pair__t--duo`, `col-a`, `foot__a`…), numéro de téléphone de la réservation sur une ligne, pied du site en `<section aria-label>` (le paquet KYW porte le seul `<footer>`), logo sans `aria-label`.
- Test Playwright maison (`.logs/champs-aw2-test.log`) : 0 erreur console ou requête, aucun texte caché après intro, horloge 11 h en haut, 20 h à mi-page, 22 h et retirée au pied, rail de la carte actif, menu (aria-expanded, piège, Échap, retour du focus, navigation), `scrollWidth` 390 sur 4 pages, réduit sans Lenis ni texte caché ni trotteuse.
- Build OK : `scripts/q.sh build pnpm build:site sites/champs-elysees-awwwards`.
## Reste (phase 3)
- Shoot complet (agent captures), axe, clavier, contraste sur les 4 sols, `idleMotion` (la trotteuse démarre après 1,2 s sans entrée : vérifier que le shoot la voit ; sinon agrandir le secteur ou réduire `IDLE_AFTER`), LCP mobile, `loaderMs` sans objet.
- Checklist 35, 36, 39, 44, 45, 47 par report.json ; points 42 à 63 ; RAPPORT.md ; `pnpm index` ; commit de dist.
## Décisions et pièges
- Horloge masquée sous 761 px (pas de colonne des heures au téléphone) : la signature mobile est le trait horizontal qui se prolonge sous chaque heure.
- Rail de la carte plafonné à `100dvh - 10rem` pour ne pas passer sous l'horloge.
- Menu : liens animés en `opacity` (jamais `autoAlpha`, qui rend le lien non focalisable au moment du `focus()`).
- Déclencheur du pied : `onEnter`/`onLeaveBack` (avec `end: 'max'`, `isActive` retombe à faux tout en bas de page).
- Hypothèses de phase 1 inchangées (code postal 5100 contre 5000, horaires du site client, photo 08).
- L'arbre git contient des fichiers non fusionnés d'autres agents (`data/suivi.html`, `dist/suivi/index.html`) : non touchés.
