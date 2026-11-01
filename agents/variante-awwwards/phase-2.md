Phase 2 sur 3 de la variante awwwards (construction-2) : mouvement, moment signature, continuité, hovers et focus, mobile, mouvement réduit, finitions, build. À lire après commun.md.

# Phase 2 : mouvement et interactions

Lis `$SITE/ETAT.md` et `$SITE/DESIGN.md` (Concept Card, langage de mouvement, rôles de hover, état de repos, plan mobile) : ne refais pas la phase 1. Lis ensuite dans `$SKILL/references/` : `motion.md` (recettes, tableau Timing, « Micro-interactions », « Idle state », « Pitfalls »), `patterns.md` (module pilote, hero sticky, repli statique par section, copies décoratives, passage loader vers UI, cadre qui s'écarte, index comme concept, transitions du concept), `engine.md` (API `data-*`, API script, cycle de vie), `astro.md` (adaptateur, scripts via `onPage`, pièges), `webgl.md` seulement si GL. Pas de shoot complet : l'agent « captures » le fait après toi ; tout au plus `shoot.mjs <url d'une page> --out $SITE/.shots/<page>` (via `scripts/q.sh`, depuis `$REPO`).

## 1. Ordre de travail

1. **Reveals déclaratifs** de l'engine : `data-split="lines|words|chars"`, `data-reveal="up|fade|clip|scale"`, `data-intro`, `data-delay`, `data-parallax`, `data-magnetic`, `data-cursor`. Texte toujours du vrai texte (SplitText).
2. **Micro-interactions par rôle** (DESIGN.md) : CTA, nav, liens de plats/images, liens texte (soulignés au repos), utilitaires ; 2 ou 3 traitements au total, dans le verbe du concept, jamais un simple changement de couleur sur un lien principal. `:hover` sous `@media (hover: hover)`, même état sur `:focus-visible`, visible en mouvement réduit ; `:active` présent. Curseur natif toujours visible, follower facultatif ; rien ne dépend du hover au toucher.
3. **Moment signature** (recettes motion.md : passage loader vers hero, clip-path depuis le point de clic, élément partagé, liste index avec aperçu au curseur, marquee à vélocité, pan horizontal épinglé, chapitres épinglés, timeline scrubbée, axe variable, compteur sur chiffres vrais, menu plein écran accessible).
4. **Module pilote** `src/motion/<concept>.ts` (patterns.md § 1) : une variable (scroll, heure, pointeur, chapitre) distribuée à tout ce qui porte le concept, influence du pointeur, `startIdle()` comme entrée de repos, appelé une fois depuis `src/motion/setup.ts`. Tout code de page dans `onPage()`, nettoyages rendus, aucun code DOM au niveau module.
5. **Continuité** : loader seulement si le concept l'a gagné (`setLoaderFormat` convertit 0 à 100 en unité du concept, `setLoaderExit` passe au hero, progression + sortie ≤ 2,6 s ; sinon supprime composant et `role="status"`) ; transition de page dérivée de la physique du concept (`setTransition`, ≤ 1 s par sens) ; intro de hero `data-intro`. Le premier frame après le loader est le meilleur du site ; ces moments expriment le concept, pas les défauts de l'engine.
6. **État de repos** : un objet du concept bouge quand le visiteur ne fait rien, piloté par `gsap.ticker`, en pause hors écran, à zéro en mouvement réduit ; jamais une forme flottante sans sens. Immobilité seulement si décidée et motivée dans DESIGN.md (seule justification de `idleMotion: false`).
7. **Mobile 390 px** : chaque section composée (type re-réglé, lignes de grille `auto`, pas de trou de hero, strips en `overflow-x` + `scroll-snap`), signature sous forme adaptée, aucune copy « survolez ». **Menu mobile** : bouton « Menu » avec `aria-expanded`, overlay plein écran, focus piégé, Échap ferme, focus rendu au bouton. Cibles ≥ 24 px, 44 px pour « Réserver » et « Appeler ».
8. **Mouvement réduit** : pas de Lenis, pas de GL, pas de scrub, pas de théâtre de loader, tout le contenu visible ; repli statique par section (`html:not(.motion)`, `html:not(.gl-on)`) qui a l'air dessiné.
9. **Finitions** : couleur de `::selection`, anneau de focus dans l'accent et visible partout, favicon SVG issu du concept (`public/favicon.svg`, PNG 32 px et `apple-touch-icon` 180 px si possible), pied de page comme composition finale.

## 2. Règles de mouvement

- Une famille d'easing (`ease.*` de l'engine), durées du tableau Timing, grands objets plus lents que petits, stagger 20 à 80 ms.
- **Une seule horloge** : tout par `gsap.ticker` ; aucun `addEventListener('scroll')` ni `requestAnimationFrame` maison.
- **Jamais de CSS `transform`** sur un élément animé par GSAP (curtain, loader, cibles de reveal, éléments du pilote) : `translate`/`rotate`/`scale` ou `gsap.set`.
- Épinglé ou scrubbé : `start: 'top top'`, `pin: true`, `invalidateOnRefresh: true`, ou hero sticky de patterns.md § 2.
- Copies décoratives de texte hors des titres et liens, `aria-hidden="true"`.
- Aucun `filter: blur()` animé sur grande surface, pas de `box-shadow` au scroll, `will-change` seulement pendant l'animation.
- GL (si Concept Card le justifie) : un canvas, DPR ≤ 2, `<img>` conservé sous le plane, scrim DOM sous le texte, rien n'existe que dans le canvas, FPS ≥ 55, repli statique en mouvement réduit ; l'élément LCP n'est jamais le canvas.

## 3. Pièges

- `transition:persist` sur `#gl`, `#curtain`, `#cursor` ; `transition:animate="none"` sur `<html>`.
- Les attributs de `<html>` sont remplacés à la navigation : l'adaptateur restaure `.js`, `.motion`, `.gl-on` dans `astro:after-swap` ; toute classe posée par ton pilote (`is-dark`, `frame-away`) doit y être restaurée aussi.
- Le loader est dans le HTML de chaque page : l'adaptateur le retire après chaque swap ; ne le réaffiche jamais sur navigation interne.
- Lenis signale 1 sur une page qui ne défile pas (l'engine normalise à 0) : 404 et réservation courtes épinglent leur état (`data-state`) si le pilote lit la progression.
- Fond qui change (scroll, heure, chapitre) : toute la couleur de texte suit par une variable globale sur `<html>` ; vérifie la fin de chaque page.
- UI fixe sur photo : `mix-blend-mode: difference` avec texte blanc ou scrim DOM ; coins vides ou cadre qui s'écarte au scroll vers le bas (patterns.md § 6).
- Une intro qui ne finit jamais est un bug (`settledMs` doit être non null).
- Lien du pied KYW sans retour hover : dans ton CSS, `.kyw-footer__link:hover, .kyw-footer__link:focus-visible { text-decoration: underline }`, sans toucher au paquet.

## 4. Build et checklist

`cd $REPO && scripts/q.sh build pnpm build:site sites/$SLUG-awwwards` doit passer. Ajoute à DESIGN.md § Sur-utilisation, avec preuve :
19. Menu mobile accessible (`aria-expanded`, plein écran, focus piégé, Échap, retour du focus).
20. Engine verbatim, `astro.ts`, `transition:persist` sur `#gl`/`#curtain`/`#cursor`, `transition:animate="none"` sur `<html>`. 21. Une horloge (grep : aucun listener scroll ni rAF maison). 22. Code de page dans `onPage()` avec nettoyage. 23. Aucune CSS `transform` sur élément GSAP. 24. Module pilote avec `startIdle` et pointeur. 25. Loader décidé ; s'il existe, unité du concept, sortie vers le hero, `loaderMs` ≤ 2600 desktop et mobile. 26. Transition du concept ≤ 1 s par sens (`d-90..92`). 27. Intro `data-intro`, premier frame = meilleur frame. 28. Épinglages conformes. 29. Repli statique dessiné (`r-*`). 30. Copies décoratives `aria-hidden`, pas de titre dupliqué.
31. Une famille d'easing, Timing, stagger 20 à 80 ms. 32. Un traitement par rôle, 2 ou 3 au total, dans le verbe. 33. Hover sous `(hover: hover)`, aussi sur `:focus-visible`, visible en réduit. 34. Liens texte soulignés au repos. 35. `hover.noHoverChange` vide ; `colorOnly`, `pixels`, `masked` lus à l'œil ; `covered` traité. 36. `desktop.idleMotion: true` avec `idleAt`, ou immobilité écrite. 37. Curseur natif visible, rien ne dépend du hover au toucher. 38. Pas de blur animé, de `box-shadow` au scroll, `will-change` temporaire. 39. Réduit : ni Lenis, ni GL, ni scrub, ni loader ; `reduced.hiddenText` = 0, `reduced.moving` = false.
40. GL justifié dans la Concept Card, sinon lignes `// GL` supprimées (« sans objet, décision écrite »). 41. Si GL : un canvas, DPR ≤ 2, `<img>` sous le plane, scrim, `glHidden` vide, FPS ≥ 55, repli réduit.
44. Skip link en premier, focus visible partout dans le style du système. 45. Contraste AA partout (photo, fond animé, chaque état, fin de page). 46. Texte réel, rien que dans un canvas. 47. Cibles ≥ 24 px (44 px « Réserver », « Appeler »).

Les points 35, 36, 39, 41, 44, 45, 47 se prouvent par les champs de `report.json` en phase 3 ; coche ici ce que le code prouve. Mets ETAT.md à jour, commite.
