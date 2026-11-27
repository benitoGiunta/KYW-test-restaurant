**Hallmark · v2.0.0 · variante legacy KYW**
- Redesign : full ; Before : data/restaurants/novobel/site-actuel/ (Wix) ; Keeps : routes /, /services, /projects, /jobs, /blog, `tel:`, `mailto:`, Facebook, textes des services et des projets.
- Files : src/styles/{tokens,base,page}.css, src/data/site.ts, src/layouts/Base.astro, src/components/*, src/pages/*.
- Shape : Feature Stack (draw a6c482, macrostructure d'origine assimilée à 08 multipage Wix : hero poster, services, projets, devis).
- Theme : Atelier (dealt 3/3). Écartés : Vellum (gothique, trop cérémonieux pour un chantier), Squeeze (vert forêt, tuiles rondes, ton fruits). Atelier gagne : limewash, brun d'ombre, signal ardoise, intérieurs en lumière du jour.
- Chrome : nav slab (barre papier, marque à gauche, devis à droite) ; Hero : Poster ; Signature : carte de coton posée sur la photo, filet encre sous chaque tête.
- Sections : à propos, métiers (Rows), photo pleine largeur sans tête, projets (Index), livraison (photo + texte), devis. Échanges avec le draw : « horaires et adresse en section propre » et « carte en Switcher midi/soir » sans objet (pas de carte, pas d'horaires) ; fin sur devis puis mast.
- Material : photographs du site d'origine (stock probable) ; Comp : voir comp.md ; Sweep : phase 3.

## Approche
Même macrostructure (hero poster, services, projets, appel), mêmes routes, posture calme, aucune chorégraphie de scroll. Dérogations : filtre Wix et chat Wix abandonnés ; gabarit hero + cartes recomposé (waive 8). Test miroir : un voisin « rénovation à Namur » aurait un hero sombre jaune ; ici papier clair, carte de coton, filets : changé.

## Thème
Atelier, `tokens.css` (papier oklch 94,5 %, encre brune, accent ardoise). La marque d'origine (anthracite, jaune acide) n'est pas reprise : le jaune acide ne tient pas le contraste sur papier ; l'anthracite devient l'encre (mast sombre).

## Composants
- Hero : Poster, photo en haut de page (`fetchpriority="high"`), carte papier 40 rem.
- Métiers et projets : Rows (numéro, titre, texte, nombre de logements à droite en `tabular-nums`), jamais de tuiles.
- Offres : tableau Timetable sous filet encre, lien mailto par ligne.
- Horaires : sans objet (aucune donnée) ; slot `.fill` dans le mast.
- Pied : mast (nom, phrase, adresse, tél., e-mail, Facebook, navigation, crédit photos) puis KywFooter.
- Photo : `<figure data-slot data-alt>`, `width`/`height`, lazy sauf le hero.
- Nav : slab ; sous 60rem, bouton + `<nav popover>` (page.css `.slab__panel`), « Devis gratuit » (ghost) dans le panneau ; lien courant souligné par `aria-current`.
- Formulaire de devis : `DevisForm.astro` (nom, e-mail, téléphone facultatif, select des 5 métiers, message), `data-endpoint=""`, mailto et tel conservés dessous.
- Reveal : un mécanisme `[data-reveal]` (rangées, projets, étapes) ; signature : le filet encre sous chaque h2 se trace (scaleX) ; la carte du hero se pose (translateY 14px).

## Sur-utilisation
- [x] 1. Hallmark SKILL.md lu (Floor 16 points) · preuve : src/styles/page.css:1-5
- [x] 2. deal/draw/scaffold via .hallmark/log.json · preuve : .logs/nvb-deal.log, nvb-draw.log, nvb-scaf.log
- [x] 3. Données réelles seulement · preuve : src/data/site.ts (textes du site d'origine, 28 = 4+14+6+4 lus dans les descriptions)
- [x] 4. noindex + mention KYW sur les 6 pages · preuve : grep dist/novobel/legacy (6/6)
- [ ] 5. audit --before, comps c1/c2 : non faits (stamp corrigé en `comp: not built · c1 decided`, page.css:3) ; sloplint --render --stage hero fait en phase 2 (0 FAIL)
- [x] 2. Pas de `transition: all` ni d'animation de géométrie (10a) · preuve : grep `transition: all` = 0 dans src/styles/page.css ; transform/opacity/couleurs seulement
- [x] 6. `:focus-visible` partout, instantané, 3:1 (26a, 15) · preuve : base.css:`:focus-visible` outline 2px, `.mast :focus-visible`, `.field …:focus-visible` (inset)
- [x] 7. Fallback reduced motion et contenu visible sans script (27, 62) · preuve : page.css fin (`prefers-reduced-motion`), mesuré : reduce hidden=0, sans JS hidden=0
- [x] 17. Hero en `svh` (6a) · preuve : page.css `.poster { min-height: min(46rem, 100svh) }`
- [x] 19. Sticky non superposés (56) · preuve : `.slab` z 300, `.steps__photo` z 200 top 6rem, scroll-padding-top 96px
- [x] 20. Radios-onglets : sans objet (pas de carte)
- [x] 21. Vidéo de fond : sans objet (aucune vidéo)
- [x] 22. Reveal sous `.js` seulement (62) · preuve : page.css `.js [data-reveal]:not(.is-in)`
- [x] 23. États d'input (39a) · preuve : page.css `.field` (hover, focus inset, aria-invalid, disabled en 3 canaux), hauteurs mesurées 48/48/48
- [x] 24. Tooltip et auto-rotation : sans objet
- [x] 29. Aucun faux envoi (70) · preuve : mesuré, message « Rien n’a été envoyé : ce formulaire n’est pas encore relié. »
- [x] 30. SVG décoratifs : sans objet (aucun svg/canvas dans src)
- [x] 48. Hover : un signal, conteneur, pas de rebond, pas de toast · preuve : page.css bloc `@media (hover: hover)`, `.index a`
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52 px · preuve : `.btn` 48px, liens de nav 44px mesurés
- [x] 56. Un primaire rempli (F4) · preuve : nav « Devis gratuit » passé en ghost ; un seul `.btn--primary` par écran
- [x] 58. Une recette de conteneur ; un pattern de scroll (F8) · preuve : cartes à 2px, aucun scroll-driven ; un reveal
- [x] 63. `::selection`, `caret-color`, `scrollbar-color`, `accent-color` · preuve : base.css:3-5
- [x] 72. Responsive (breakpoints 60rem/40rem, hover/pointer, tables restackées, safe-area) · preuve : page.css fin ; 375 et 1280 : aucun débordement horizontal sur 5 pages (mesuré)

## Phase 3 (QA)
- [x] 73. sloplint --render (/, /services/) : 0 FAIL, 0 REFLEX, render tourné · preuve : .logs/qa-sloplint.log
- [x] 74. axe sur 6 pages : 0 violation · preuve : scratchpad ax.mjs (nav aria-label, footer double contentinfo corrigés)
- [ ] Cases restantes des 72 : voir cases cochées ci-dessus ; gates jugées lues sur .hallmark/shots (pas de sous-agent frais : finish review `self`).
