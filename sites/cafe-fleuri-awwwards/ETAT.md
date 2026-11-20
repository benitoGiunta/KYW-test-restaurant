# ETAT : Café Fleuri awwwards, après la phase 2 (construction-2)

## Fait
- Phase 1 : concept « Le trop-plein », pages, système, build (voir DESIGN.md).
- Phase 2 : pilote `src/motion/debordement.ts` (défilement + pointeur + dérive idle), `idle.ts`, `menu.ts`, `setup.ts` ; signature d'accueil (« Fleuri » franchit la rue en ressort, assiettes qui se posent) ; assiettes à cheval sur la rue dans les têtes de /carte/, /histoire/, /reservation/ ; bande de mots (velocity marquee) sur l'accueil ; « 38 » du pied en scrub ; pastille du mardi en ressort ; reveals `data-split`/`data-reveal` ; menu plein écran téléphone ; hovers sous `(hover: hover)` + `:focus-visible` + `:active` ; lien du pied KYW souligné au survol.
- Contrôle Playwright ciblé (1440 et 390) : 0 erreur console, pas de débordement horizontal, aucun texte sur une assiette, dérive au repos sur 4 pages, menu (focus piégé, Échap, retour du focus), réduit sans Lenis ni texte caché, transition 913 ms.
- Build OK : `scripts/q.sh awwwards2-build2 pnpm build:site sites/cafe-fleuri-awwwards`. DESIGN.md § phase 2 (points 19 à 47).

## Reste (phase 3)
- Shoot complet (agent captures), lire report.json : `idleMotion`, `hover.*`, `reduced.*`, `settledMs`, contraste, axe, clavier ; cocher 29, 35, 36, 39, 41 à 47 avec preuve.
- Juger en capture : repli réduit, fin de chaque page (pied), 404 (immobile, voulu), page-tete de /carte/ (grand vide sous le lead à 1440 avant l'index).
- À 390, la note de l'énoncé (« Petit lieu cocooning… ») passe sur le trait de la rue (phase 1), à recadrer si gênant.
- Jury (self), RAPPORT.md, `pnpm index`, commit final.

## Décisions et pièges
- Assiette : `.plate-pose` (position, entrée tweenée, `mix-blend-mode`) contient `.plate` (cible du pilote, propriété `translate`) ; jamais de tween sur `.plate`.
- « Fleuri » : intro sur `.l2` (x), pilote sur `.l2__in` (`translate`) : deux éléments, aucun conflit.
- Menu courant (`aria-current`) souligné en blanc : l'encre prune sur framboise ne passait pas le contraste.
- Serveur de test phase 2 : port 4437 (4417 déjà pris par le serveur de la phase 1), tué en fin de tâche.
