**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 4 pages (/, /la-carte/, /fetes-patronales/, /contact/)
- **Before** · sloplint `--before` (HTML seul, rendu impossible : le HTML sauvegardé charge des ressources distantes et bloque) : 146 FAIL (dont 62 `.et_animated` caché au repos, CSS Divi), 66 REFLEX, 9 WARN ; le motif d’éventails, les photos et l’ordre des sections restent
- **Keeps** · réservation Zenchef, `tel:`, `mailto:`, lien Maps, lien Facebook, flipbook des fêtes, quatre routes, copie de l’à propos, horaires, carte complète (94 lignes)
- **Files** · create : tout `sites/champs-elysees-legacy/` · edit : aucun · delete : aucun
- **Shape** · Photographic (kept), empreinte `Sentient 300 | Hanken Grotesk | Hairline rules | Hairline outline button | Full-bleed photograph and matted print | No reveal` ; draw ffbbdc : Letter écarté (aucun texte à la première personne prouvé), Counter écarté (aucune disponibilité réelle à afficher, Zenchef reste externe)
- **Theme** · Atelier, dealt 1/3, seed `restaurant-namur-brasserie-bistro-0e55·e343fe38·2026-11-20·r0` ; écartés : Vellum (blackletter contraire à l’esprit art déco bistro), Bloom (grille d’outil générative, interdit la couche terracotta que le client emploie en touche) ; signal vert forêt du logo lu sur les captures (`#2a4934`, `#2a532e`), jamais de mémoire
- **Chrome** · nav : bandeau d’infos au-dessus d’une barre (forme « banner over bar », le bandeau défile hors écran par `position: sticky; top: -34px`, la barre reste, aucun JS) ; menu `<dialog>`-like par Popover API sous 60rem · footer : mast
- **Hero** · Poster (kept) : photo de salle pleine largeur, plaque de carte coton en bas à gauche, une phrase, deux actions
- **Signature** · la salle dressée sous la plaque de carte, un seul signal vert
- **Sections** · Hero · À propos (Split) · La carte (Rows) · Galerie (Bento) · Fêtes patronales (Band) · Heures d’ouverture (Schedule) · Réservations et adresse (Facts) · Footer (mast)
- **Material** · real : adresse, horaires du site, carte, fêtes, 1984 · pictures : 12 photos et logo client · absent : avis, note, équipe en cuisine
- **Comp** · c1 retenu (voir `comp.md`)
- **Sweep** · phase 3 : sloplint 0 FAIL, 0 REFLEX ouvert (waived 8, 83, 77, 71), 7 WARN confirmés (23 bandeau vert déclaré, 28a faux positif, kept non comparé), finish review `self` (pas de sous-agent), build + footer + noindex sur 5 pages

## Approche

Macrostructure **08 Photographic** (le site d’origine ouvre sur un grand visuel), one-page gardée plus trois routes. Posture : Poster, calme, aucun pattern de scroll (phase 2 : nav rétractable et un reveal au plus). Dérogations : carrousel Swiper non repris (18) ; `vh` remplacé par `dvh` (6a) ; formulaire sans envoi (`data-endpoint=""`, 70) ; galerie avant les fêtes pour finir sur heures, adresse et réservation (`waive 8` sur la séquence) ; hero resserré de 8 mots à 6 (58). Test miroir : un voisin avec « bistro, photos de salle » aurait un hero texte sur photo ; la différence ici tient à la plaque de carte coton à lisérés et à la carte en rubriques au lieu d’un PDF.

## Thème

Atelier : matière portée par les photos de salle en lumière chaude, papier chaux, encre brune, Sentient 300, filets. Seule modification de la matière : le signal vert forêt (`oklch(38% 0.075 152)`) remplace l’ardoise, tiré du logo du client.

## Tokens

Voir `src/styles/tokens.css` (palette Atelier, `--color-accent` vert forêt, échelle partagée) et `base.css`.

## Composants

- **Carte** : Rows (nom col. 1 à 5 en Sentient 400, variantes de portion en lignes, prix tabulaires à droite, filets, pas de bordure ni d’ombre) ; rubriques dans l’ordre du PDF, « À manger » puis « À boire ». Switcher midi / soir non applicable (la carte n’a pas deux services). Réf. `layout.md` § 5.5.
- **Horaires** : Schedule, tableau sous filet d’encre, jour fermé sans objet (7 j sur 7), `<time>`, dits une fois ; jour courant en phase 2.
- **Pied** : mast (logo, adresse, liens, crédits), `data-credits`, puis KywFooter.
- **Photo** : `<figure data-slot data-alt>`, `width`/`height`, `sizes`, hero `fetchpriority="high"`, les autres `lazy`.
- **Plaque** : carte coton à liséré intérieur, `--shadow-card`.

## Sur-utilisation

- [x] 1. Hallmark audit lu, SKILL.md et redesign.md lus · preuve : AUDIT.md
- [x] 2. deal / draw / scaffold exécutés avec `--log` · preuve : `.logs/legacy-deal.log`, `legacy-draw.log`, `legacy-scaffold.log`
- [x] 3. Stamp et critique en tête de CSS · preuve : `src/styles/page.css:1-7`
- [x] 4. Deux comps construits et choisis · preuve : `comp.md`, `.hallmark/comps/c1.png`, `c2.png`
- [x] 5. Aucun tiret cadratin, noindex, KywFooter sur les 4 routes · preuve : grep du build (4/4)
- [x] 6. sloplint `--render --stage hero --url` sur le serveur de dev : 0 FAIL (FAIL 34 de `Base.astro` = faux positif de l'import CSS, doublé par `<style is:global>` et prouvé par `scrollWidth` 1280/1280 et 375/375) · preuve : `.logs/ce2-sloplint-hero.log`
- [x] 2. Pas de `transition: all` ni d'animation de géométrie (10a) · preuve : grep 0 ; transitions `background-color`, `color`, `transform`, `opacity` listées (`page.css:20-24`, reveal galerie)
- [x] 6b. `:focus-visible` partout, instantané, 3:1 (26a, 15) · preuve : `base.css:13` (outline 2px `--color-focus`), inset sur les champs
- [x] 7. Fallback reduced motion sur chaque animation, contenu visible sans script (27, 62) · preuve : fin de `page.css` (`prefers-reduced-motion: reduce`), `.js .bento .photo` seulement, test `reducedMotion` opacité 1
- [x] 17. Hero en `svh` (6a) · preuve : `.hero { min-height: clamp(560px, calc(100svh …), 1000px) }`
- [x] 19. Sticky non superposés (56) · preuve : nav `top: -34px` (z 300), tête de rubrique `top: nav-h + 24px` (z 200), jamais deux `top: 0`
- [x] 20. Radios-onglets gardés (53) · non applicable : aucun switcher (une seule carte)
- [x] 21. Vidéo de fond (28a, 28b) · non applicable : aucune vidéo
- [x] 22. Reveal sous `.js` seulement (62) · preuve : `.js .bento .photo`, script `index.astro` (IntersectionObserver, une fois)
- [x] 23. États d'input (39a) · preuve : `.form input` hover, focus inset, invalid, disabled par bordure pointillée + couleur + curseur
- [x] 24. Tooltip et auto-rotation (17, 18) · non applicable : ni l'un ni l'autre
- [x] 29. Aucun faux envoi (70) · preuve : message « Rien n’a été envoyé : ce formulaire n’est pas encore relié », test navigateur
- [x] 30. SVG décoratifs `aria-hidden` (33) · non applicable : aucun SVG
- [x] 48. Hover : un signal, conteneur, pas sur non-interactif, pas de rebond, pas de toast (11, 12, 16) · preuve : `@media (hover: hover)` sur `.btn`, liens de nav, champs ; photos sans hover
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52 px (26b, 39b) · preuve : `.btn:active` (1px), `.btn:disabled`, `.btn` 52 px, `.nav__cta` et `.nav__toggle` 44 px, cases 44 px
- [x] 56. Un primaire (F4) · recette unique : bouton contour fin, hover encre (empreinte « Hairline outline button ») ; aucun bouton rempli
- [x] 58. Une recette de conteneur (plaque, tirage passe-partout), un seul reveal (galerie), aucun pattern de scroll (F8)
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` (F16) · preuve : `base.css:8-9`
- [x] 72. Responsive : breakpoints 60rem et 40rem, `(hover: hover)`, `(pointer: coarse)`, gouttière 16 px, hero téléphone empilé, menu plein écran

## Phase 2 : mouvement et interactions

- **Motion** · calme (caractère Atelier : fondu, déploiement unique en `--ease-out`). Un reveal : les cinq tirages de la galerie se posent un à un (opacité + 16 px, 420 ms, 80 ms d'écart, IntersectionObserver, une fois). Aucun scroll pattern, aucun auto-défilement. `scroll-behavior: smooth` seulement sous `no-preference`.
- **Nav** · bandeau qui défile hors écran, barre collante de 76 px ; sous 60rem : Réserver + Menu, menu en Popover plein écran (liens en Sentient 25 px, 64 px de haut, fermeture au clic), repli sans Popover : liens sur deux lignes.
- **Horaires** · jour courant (heure de Bruxelles) marqué par `aria-current="date"` et « aujourd’hui », ligne d'état d'ouverture calculée depuis le tableau ; sans script le tableau seul.
- **Contact** · validation au blur puis à l'input, aide d'une ligne réservée, `aria-invalid` + `aria-describedby`, placeholder = format, message de non-envoi ; la réservation de l'accueil reste le lien Zenchef.
- **Hero** · review `self` (aucun sous-agent disponible, `review-hero.md` non lu) : 3 findings (strip de papier sous le hero à 1920 : resolved ; plaque plus haute que la comp : resolved ; accent 6 % : partial, bandeau 4,2 %, le reste est la banquette teal de la photo). Comp reproduite à 1280x800 : plaque en bas à gauche, mêmes verres libres ; plus grand écart = hauteur de la plaque (lien secondaire ajouté), réduit en retirant 24 px de remplissage haut.
- **Figure** · `margin: 0` sur `.photo` (le hero avait 40 px de marge UA : le tirage n'était pas plein cadre en phase 1).

## Phase 3 : sweep et QA

- [x] 16. `sloplint --render` : 0 FAIL, 0 REFLEX ouvert, rendu tourné sur 4 URL · preuve : `.logs/champs-sloplint.log` (waive 8, 83, 77, 71 en tête de `page.css`)
- [x] 25. Contraste et anneau de focus 3:1 · preuve : `.nav__banner :focus-visible { outline-color: var(--color-accent-ink) }` (FAIL 26a levé au sweep)
- [x] 37. Échelle d'espacement · preuve : `.foot__credits a` et `.nav__banner a` en `--space-sm` et `--space-2xs` (24a/24b levés)
- [x] 42. Titres de rubrique de la carte à `--text-section` (78) · preuve : `.rubrique h2`
- [x] 46. Clôture horaires, adresse, réservation (85) · preuve : captures `.shots-champs-elysees-legacy-build/home/`
- [x] 62. Invariants de page, aucun débordement 1440 et 375, 0 erreur console · preuve : `QA-build.md`, `.shots-champs-elysees-legacy-qa3/report.json`
- [ ] Gates jugées restantes (9, 11, 16, 29, 54, 58, 63 à 70, 80 à 82, 84, 85) : relues sur les planches, pas de contre-indication ; CLS mobile de la carte 0,102 (polices externes `swap`) non traité
