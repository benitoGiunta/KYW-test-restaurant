**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 4 pages (/, /menu/, /vins/, /contact/) + 404
- **Before** · Floor 217 FAIL (CSS WordPress), Reflex 36 · une page de 14 sections à modale, belle matière (carte, horaires, coffres) mal composée
- **Keeps** · tous les liens (tel, mailto, Facebook, Tripadvisor, pizzy.be, PDF à emporter), les 4 routes, toute la carte (181 lignes), les horaires, les 3 avis Tripadvisor verbatim · à vérifier : avis datés de 2023
- **Files** · create: sites/pizzeria-doria-legacy/** · delete: none
- **Shape** · Photographic + Index (macrostructure 08, empreinte `Gabarito 800|Rows|filet de rang|bouton pêche et contour|photo plein cadre|aucun reveal`), one-page gardée ; draw 6f9b68 (Split Studio) échangé contre la forme d’origine
- **Theme** · Squeeze, dealt 2/3 (vert forêt, encre blanc chaud, Gabarito 800 sur Manrope) · écartés : Vellum (parchemin, trop sage pour une pizzeria de famille), Atelier (calcaire et serif, parfumerie)
- **Chrome** · nav : slab (barre vert profond, marque et trois liens, Réserver) · footer : index columns
- **Hero** · Ledge : photo pleine largeur, plaque verte au pied avec titre, phrase, deux actions
- **Signature** · le mur de casiers : les horaires en tuiles de coffre (jour fermé en contour, jamais barré) au pied de la salle des coffres
- **Sections** · Hero · Suggestions et à emporter (carte blanche unique) · Midis (Rows) · Carte (prix 7,50 € en figure) · Histoire · Avis · Salle des coffres · Fin (réservation, horaires, emploi)
- **Material** · real : tout le dossier · pictures : 4 photos client (coffres, friture, roquette, bouchons) dont 2 utilisées, 4 Unsplash illustratives (`data-placeholder`) · absent : note Google, abonnés
- **Comp** · non construite (voir comp.md)
- **Sweep** · phase 3

# Approche

Macrostructure 08 Photographic mêlée à l’Index de la carte. Posture : routes gardées, calme, pas de scroll chorégraphié (une seule animation possible en phase 2, un reveal). Dérogations : modale supprimée (fond masquant, 18), carrousel absent, `vh` en `dvh` (6a), pas de formulaire. Test miroir : un voisin avec « pizzeria familiale » obtiendrait vert + pêche, mais pas le mur de casiers ni la salle des coffres ; la décision changée est de ne pas ouvrir sur la carte.

# Thème

Squeeze, `dealt 2/3, seed restaurant-namur-pizzeria-italian-b962·335f4bf6·2026-11-19·r0`. Il porte la matière de l’original : le vert sapin de l’affiche de novembre et le vert du logo (tricolore). Pas de couleur de marque imposée (logo noir, filet vert-blanc-rouge, fourni tel quel dans le pied).

# Tokens

Source de vérité : `src/styles/tokens.css` (paper oklch 41/47/34 % sur teinte 154, ink blanc chaud, accent pêche 83 % teinte 56, carte blanc crème). Polices : Gabarito 800, Manrope 500 et 700 (trois graisses). Rayons 24 et 16. Rangs : filet 1px entre lignes de carte uniquement.

# Composants

- **Carte** : Rows (`Rows.astro`), titre colonnes 1 à 5, description au milieu, prix Gabarito à droite en `tabular-nums` ; sur téléphone nom et prix sur la première ligne, description dessous (F25) ; navigation par ancres en pastilles (Index), tout est visible sans script ; jamais de tuile à icône ni de carte dans une carte.
- **Horaires** : Schedule en `<dl>` de sept tuiles « casiers » (`Fin.astro`), `<time>` par plage, mardi et mercredi en contour et `--color-muted`, jamais barrés ; dits une fois (en fin de page et sur chaque page via Fin), pas d’horloge. Jour courant marqué par script (fuseau Europe/Brussels, bordure pêche et « aujourd’hui », sans dire « ouvert »).
- **Pied** : index columns (logo carré fourni, le site, nous joindre, nous suivre, paiement et TVA), `data-credits`, ni « Tous droits réservés » ni newsletter, puis KywFooter.
- **Photo** : `<figure data-slot data-alt>` avec dimensions, `srcset`, hero `fetchpriority="high"`, autres `lazy`, `data-placeholder` pour le stock.

# Sur-utilisation

- [x] 1. Hallmark SKILL.md et redesign.md lus · preuve : AUDIT.md, DESIGN.md
- [x] 2. sloplint --before lancé · preuve : .hallmark/before.txt
- [x] 3. deal, draw, scaffold, stamp · preuve : src/styles/page.css:1-7, tokens.css
- [ ] 4. comps c1 et c2 construites · non faites en phase 1 (comp.md, ETAT.md)
- [x] 5. build statique des 4 routes + 404 · preuve : dist/pizzeria-doria/legacy/
- [x] 6. noindex, mention KYW et signature sur 5 pages · preuve : grep de dist
- [x] 7. sloplint --render (hero) via --url sur le serveur de dev · preuve : .logs/doria-sloplint.log (3 FAIL 34 et 50 faux positifs : base.css porte overflow-x: clip et overflow-wrap, sloplint ne suit pas @import)

## Phase 2 (construction-2)

- [x] 2. Pas de `transition: all` ni d'animation de géométrie (10a) · preuve : page.css, transitions listées `translate`, `opacity`, `background-color`, `color` seulement
- [x] 6. `:focus-visible` partout, instantané, 3:1 (26a, 15) · preuve : base.css:9 (outline 2px `--color-focus`, offset 2px), `.card :focus-visible`, summary offset -4px
- [x] 7. Fallback reduced motion et contenu visible sans script (27, 62) · preuve : page.css `.js [data-reveal]`, bloc `prefers-reduced-motion`, test navigateur : sans JS opacité 1, reduce opacité 1 et transition 1e-05s
- [x] 17. Hero en `svh` (6a) · preuve : page.css `.hero` (`100svh`), `padding-top: 40svh`, aucune unité `vh` restante
- [x] 19. Sticky non superposés (56) · preuve : un seul sticky (`.slab`, `top: 0`, `--z-sticky-nav`), le titre de carte non sticky sous 60rem ; `scroll-padding-top` 96px (base.css)
- [x] 20. Radios-onglets gardés (53) · n/a : aucun switcher, la carte est une page à ancres
- [x] 21. Vidéo de fond (28a, 28b) · n/a : photo plein cadre (`<picture>` paysage et portrait, `fetchpriority="high"`)
- [x] 22. Reveal sous `.js` seulement (62) · preuve : Base.astro (classe `js` en tête), page.css `.js [data-reveal] > *`, filet de sécurité 4 s
- [x] 23. États d'input (39a) · n/a : aucun champ (voir Décisions : le téléphone est la réservation) ; états du bouton : hover, focus-visible, active, disabled (trois canaux : couleur, bordure pointillée, curseur)
- [x] 24. Tooltip et auto-rotation (17, 18) · n/a : aucun
- [x] 29. Aucun faux envoi (70) · preuve : aucun formulaire ; « Réserver » = `tel:` du site d'origine
- [x] 30. SVG décoratifs (33) · n/a : aucun SVG
- [x] 48. Hover : un signal, conteneur, pas sur non-interactif, pas de rebond, pas de toast (11, 12, 16) · preuve : page.css bloc `@media (hover: hover)`, easing `--ease-out` sans rebond
- [x] 49. `:active`, `:disabled`, cibles 44 à 52px (26b, 39b) · preuve : `.btn` 48px, `.slab__burger` 44px, `@media (pointer: coarse)` pour pied, contact et adresse
- [x] 56. Une seule recette de primaire rempli (F4) · preuve : `.btn--primary` seul rempli (pêche), jamais deux côte à côte ; les secondaires sont en contour
- [x] 58. Une recette de conteneur ; un pattern de scroll (F8) · preuve : tuiles et cartes uniquement, un reveal sans chorégraphie scroll
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` (F16) · preuve : base.css:3-9
- [x] 72. Responsive · preuve : breakpoints 60rem et 40rem, `(hover: hover)`, `(pointer: coarse)`, scrollWidth = viewport sur 4 routes à 375 et 1440, nav en popover sous 60rem (Échap, clic dehors, retour du focus au bouton), `@supports not selector(:popover-open)` : nav toujours visible

Hero review : `hero-review: fix · 2 findings · 2 resolved` (auto-notation self : pas d'outil Agent en session d'agent). Findings : plaque verticale qui masquait la pizza à 1280x800 (resolved : plaque pleine largeur sur deux colonnes, titre en `--text-display-s`) ; lien d'adresse sur deux lignes à 375 (resolved : ville hors du lien).
Nav : forme `slab` (barre pleine, marque à gauche, liens et Réserver à droite), sticky 72px.
