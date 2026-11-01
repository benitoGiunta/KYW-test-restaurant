Phase 2 sur 3 de la variante legacy (construction-2) : hero review, contrôles et états, nav, formulaire, reveal, responsive, mouvement réduit, finitions, build. À lire après commun.md.

# Phase 2 : interactions, états, hero review

Lis `$OUT/ETAT.md`, `DESIGN.md` (Picks, Approche, Composants) et `comp.md` : ne refais pas la phase 1. Références (`$SKILL/references/`) : `interaction-and-states.md` (huit états, formulaire), `microinteractions.md` (nav mobile, switcher de carte, disclosure des horaires, § Motion character, § Menu), `responsive.md`, `patterns.md` (contrôles en huit états, rail et switcher, formulaire qui ne poste nulle part, reveal qui survit sans script, boucle en pause, skip link), `scroll-choreography.md` SEULEMENT si l'original était animé au scroll. Pas de capture complète : l'agent « captures » la fera après toi.

Serveur de dev, en arrière-plan, PID noté, `kill <PID>` en fin : `cd $ROOT && KYW_BASE=/$SLUG/legacy/ pnpm exec astro dev --root sites/$SLUG-legacy --port 4321` ; route `http://localhost:4321/$SLUG/legacy/` (base appliquée en dev). sloplint ne rend pas l'`index.html` Astro sur disque : tier render par `--url`, statique sur `src`. Captures `--url` : `.hallmark/shots/localhost-4321-<slug>-legacy-*.png`. Polices de repli sur une capture (réseau via proxy) : recapture, pas un finding.

## 1. Hero review (gates.md § 6)

```bash
cd $OUT && ENV /home/user/KYW-test-restaurant/scripts/q.sh sloplint node $SKILL/scripts/sloplint.mjs src --genre <genre> --render --stage hero --url http://localhost:4321/$SLUG/legacy/
```

Puis un **sous-agent frais** avec pour seule consigne « Lis `$SKILL/references/review-hero.md` et suis-le », et : les quatre `.hallmark/shots/*-hero-*.png`, les deux premières lignes du stamp, les lignes Material et Signature des Picks, `$SKILL/references/themes/<slug>.jpg`, et « redesign : le contenu est fixe, ce qui est sous le premier écran est l'ancien site ». N'ouvre pas `review-hero.md` toi-même. Agis sur son premier mot (`ship` ou `fix`), recapture `--stage hero`, note chaque finding `resolved | partial | unresolved`, stamp : `hero-review: fix · n findings · n resolved`.

Comp (`comp.md`) : réponds par écrit aux trois questions de reproduction (Masse, Intervalle, Entrée), capture 1280x800 côte à côte avec la comp, plus grand écart et ce que tu en as fait ; stamp `comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800)`.

## 2. Composants interactifs (DESIGN.md § Composants, référence citée)

- **Bouton** : une seule recette de primaire rempli par page (F4, F15), jamais deux remplis côte à côte ; secondaire outlined ou typographique ; 44 à 52px (39b) ; huit états (`interaction-and-states.md` § The eight states), `:active` et `:disabled` (26b) ; `transition` listée, `transform`/`opacity` seulement, jamais `transition: all` ni animation de `width`/`height`/`top`/`left` (10a) ; label = verbe de l'action (« Réserver une table », jamais « En savoir plus », 19) ; ne replie jamais de 320 à 1920 (49a) ; `type` explicite sur chaque `<button>`.
- **Nav** : une ligne 56 à 80px ; forme nommée dans le stamp (edge-aligned, masthead, slab, pill, banner-over-bar), différente des 3 derniers logs de `$LOG` (42) ; « Réserver » dans la nav (anatomy.md § book) ; liens en casse de phrase, non trackés (67) ; sous 60rem, menu `<dialog>` ou Popover (`microinteractions.md` § Menu) ; logo lié à l'accueil avec `aria-label` ; sticky à `--z-sticky-nav` au-dessus de `--z-sticky`, jamais deux sticky `top: 0` superposés, `scroll-padding-top` ajusté (56) ; skip link (`patterns.md` § A way past the nav).
- **Formulaire de réservation** (`patterns.md` § A form that posts nowhere yet) : `data-endpoint=""`, `novalidate`, validation au blur puis à l'input, message « Rien n'a été envoyé : ce formulaire n'est pas encore relié » (70), jamais « Réservé ! » ; label visible au-dessus de chaque champ, placeholder = format (« 19:30 »), `name`, `autocomplete`, `type`/`inputmode` justes, `aria-describedby` + `aria-invalid`, aide `min-height: 1lh` (F14) ; bordure constante, ring en `outline` inset, disabled par trois canaux (39a) ; inputs à la hauteur du bouton ; `<select>` natif pour les couverts. Si l'original renvoyait vers un service externe (Zenchef, TheFork, `tel:`), ce lien EST la réservation, conservé tel quel.
- **Switcher de carte** : `role="tablist"`, premier panneau visible sans script ; radios-onglets CSS jamais en `position: absolute; top: 0` sans garde JS (53). Disclosure des horaires si utile.
- **Reveal et motion** : un seul reveal par page, visible sans script (`.js [data-reveal]`, 62 : aucun contenu caché au repos dépendant du script), fallback `prefers-reduced-motion: reduce` sur chaque animation (27), caractère de motion du thème (still, severe, brisk, calm) ; aucun easing à rebond (12) ; boucle ou auto-rotation : pause hover/focus et bouton pause visible au-delà de 5 s (18) ; vidéo de fond `autoplay muted loop playsinline` + `poster`, jamais lazy sur le LCP (28a, 28b) ; un seul pattern de chorégraphie scroll (F8), sur la structure, jamais le corps de texte.
- **Hover et focus** : un signal par élément, sur le conteneur, jamais sur l'image, aucun hover sur un non-interactif (11), aucun toast pour un effet visible (16) ; `:focus-visible` instantané, 3:1, sur chaque interactif (26a, 15) ; tooltip : focus 0 ms, hover 800 à 1000 ms (17).

## 3. Responsive et finitions

- `responsive.md` : deux breakpoints en `rem` (60rem, 40rem), `@media (hover: hover)` et `(pointer: coarse)`, tables restackées au téléphone, hero en `dvh`/`svh` jamais `vh` (6a), `width: 100%`, jamais `100vw`, safe-area dans `--gutter`, 16px de gouttière au téléphone ; nom et prix visibles à 375 (F25) ; aucun contenu que le téléphone ne reçoit pas.
- `overflow-x: clip` sur `html` ET `body` (34) ; pistes d'images `minmax(0, 1fr)`, titres display `overflow-wrap: break-word; min-width: 0` (50).
- Surfaces navigateur thémées : `::selection`, `caret-color`, `scrollbar-color` (F16).
- `<svg>`/`<canvas>` décoratifs en `aria-hidden="true"` ou labellisés (33).

## 4. Build et checklist

`cd $ROOT && scripts/q.sh build pnpm build:site sites/$SLUG-legacy` doit passer. Ajoute à DESIGN.md § Sur-utilisation (numéros de la liste complète, preuve fichier:ligne ou capture) :
2. Pas de `transition: all` ni d'animation de géométrie (10a). 6. `:focus-visible` partout, instantané, 3:1 (26a, 15). 7. Fallback reduced motion sur chaque animation ; contenu visible sans script (27, 62). 17. Hero en `dvh`/`svh` (6a). 19. Sticky non superposés (56). 20. Radios-onglets gardés (53). 21. Vidéo de fond conforme (28a, 28b). 22. Reveal sous `.js` seulement (62). 23. États d'input (39a). 24. Tooltip et auto-rotation (17, 18). 29. Aucun faux envoi (70). 30. SVG décoratifs `aria-hidden` (33).
48. Hover : un signal, conteneur, pas sur non-interactif, pas de rebond, pas de toast (11, 12, 16). 49. `:active`, `:disabled`, contrôles 44 à 52px (26b, 39b).
56. Un primaire rempli (F4). 58. Une recette de conteneur, pilule limitée aux contrôles/tags (F7) ; un pattern de scroll (F8). 63. `::selection`, `caret-color`, `scrollbar-color` (F16).
72. Responsive (breakpoints rem, capacités, tables restackées, `dvh`, safe-area).

Mets ETAT.md à jour, commite, arrête le serveur.
