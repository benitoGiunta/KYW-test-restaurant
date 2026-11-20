**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 6 routes (/, /carte/, /reservations/, /groupes/, /a-propos/, /contact/) + 404
- **Before** · Floor 395 FAIL, Reflex 415 · site blanc à split photo/texte, carte en PDF, bandeaux cookies et navigateur ; les horaires 7 j/7 et le logo manuscrit restent
- **Keeps** · liens externes (Facebook, itinéraire Google Maps, visite virtuelle, recrutement, demande en ligne), `tel:`, routes, tout le contenu réel de `donnees.json`
- **Files** · create : tout `sites/don-dino-legacy/` · delete : none
- **Shape** · Feature Stack (draw 16177b), macrostructure d'origine Photographic/Split, multi-pages gardé
- **Theme** · Squeeze, dealt 1/3, seed restaurant-namur-italian-pizzeria-a89d·07358e77·2026-11-20·r0. Écartés : Overprint (papier gris journal, ne porte ni la chaleur ni le vert du logo), Hum (crème jaune et papier déchiré, trop de matière pour une carte de 115 plats). Squeeze : le vert plein reprend le vert du logo, la pêche des contrôles tient la place du rouge.
- **Chrome** · nav : bord à bord, logo, pastilles et une action (échange du draw « search-led bar » : aucun champ de recherche à porter) · footer : colophon block puis KywFooter
- **Hero** · Index : le texte sur 5 colonnes, la liste de six pizzas avec prix sur 7 (signature)
- **Signature** · la liste de prix des pizzas, de 10,50 € à 17,80 €, posée en hero
- **Sections** · Hero (Index) · Horaires (Figure + Schedule) · Du four à la table (Stack, 3 photos) · La carte en douze rubriques (Rows) · La salle et le bar (Stack, 2 photos + tuile) · Réservation (carte blanche unique, adresse) · Footer
- **Material** · real : carte de 115 plats, horaires, adresse, téléphone, équipements, paiements, 13 photos · pictures : photos du client, logo masqué · absent : avis, presse (titres), desserts, boissons, e-mail
- **Comp** · c1 choisi (voir comp.md)
- **Sweep** · phase 3

## Tokens

Lus dans `src/styles/tokens.css` (scaffold Squeeze) : papier `--color-paper` vert 41 % ; `--color-paper-2` et `-3` ; encre `--color-ink` blanc chaud ; accent pêche `--color-accent` ; carte `--color-card`. Faces : Gabarito 800 (titres, prix), Manrope 500 et 700. Rayons 24 et 16 px.

## Approche

Macrostructure d'origine : split photo/texte avec photos au centre, nommée Photographic (empreinte `petit titre|texte court|aucun filet|bouton plein|photo pleine|aucun reveal`). Posture gardée : site calme, aucune chorégraphie de scroll en phase 1 (volet sticky en CSS pur seulement). Dérogations : bandeau cookies et avertissement navigateur supprimés (dropped), sélecteur FR/EN/NL supprimé (dropped, maquette en français), h1 de 11 à 7 mots (58, `reworded`), faux envoi du formulaire `data-endpoint=""` (70), gabarit « hero, cartes, CTA » évité (`waive 8`). Test miroir : un voisin pizzeria obtiendrait un hero photo + horaires ; ici le hero est une liste de prix sur vert plein, décision changée : la photo ne vient qu'au deuxième écran.

## Thème

Squeeze, vert forêt plein, encre blanc chaud, Gabarito et Manrope, tuiles un cran plus clair, un seul bloc blanc par page (carte de réservation).

## Composants

- **Carte** : Rows (nom en Gabarito à gauche, prix `tabular-nums` à droite, description en dessous), rubriques en colonne sticky à gauche sur /carte/ ; sur l'accueil six rubriques en lignes liées. Pas de Switcher midi/soir : aucune formule connue. Prix lisibles à 375 px.
- **Horaires** : Schedule en `<dl>` avec `<time>`, aucun jour fermé, jour courant par `data-today` (script en phase 2), dits une fois par page ; le pied ne les répète pas.
- **Pied** : colophon block (logo masqué, adresse, téléphone, réseaux, crédits `data-credits`), puis KywFooter.
- **Photo** : `<figure>` avec `data-slot`, `data-alt`, `width`, `height`, `srcset` 800/1600, lazy sauf hero ; légende = un fait.

## Sur-utilisation

- [x] 1. Lire SKILL.md, redesign.md, layout.md, macrostructure 16, genre playful, thème Squeeze · preuve : trace de lecture, session
- [x] 2. Audit `sloplint --before` · preuve : `.hallmark/before.txt`, AUDIT.md
- [x] 3. Deal, draw, scaffold, stamp · preuve : `src/styles/page.css:1-3`
- [x] 4. Comp avant build, deux variantes · preuve : `.hallmark/comps/c1.png`, `c2.png`, comp.md
- [x] 5. Données réelles seulement, trous marqués `data-placeholder` · preuve : `src/pages/a-propos/index.astro` (titres de presse)
- [x] 6. KywFooter dernier élément, noindex, 404 · preuve : build (6 pages, `grep kyw-signature` = 1 par page)
- [ ] 7. sloplint --render et jury : phase 3 (phase 2 : sloplint hero rendu, 0 FAIL, 4 NOTE de longueur sans suite)
- [x] 2. Pas de `transition: all` ni d'animation de géométrie (10a) · preuve : `page.css` (transitions listées : translate, background-color, box-shadow, opacity)
- [x] 6. `:focus-visible` partout, instantané, 3:1 (26a, 15) · preuve : `base.css:9`, champs `page.css` (ring `outline` inset sans transition, encre de carte sur fond clair), sloplint FAIL 15 résolu
- [x] 7. Reduced motion sur chaque animation, contenu visible sans script (27, 62) · preuve : `base.css` (règle globale 0,01 ms), aucun contenu caché au repos, test JS coupé : h1 visible, menu popover ouvert sans script
- [x] 17. Hero sans `vh` (6a) · preuve : grep `vh` = `100dvh` seul (menu)
- [x] 19. Sticky non superposés (56) · preuve : nav `--z-sticky-nav` ; `.stack__pane`, `.cat__head` sticky sous `--nav-h`, statiques sous 60rem
- [x] 20. Pas de radios-onglets : aucun switcher (aucune formule midi/soir connue) · preuve : DESIGN.md § Composants
- [x] 21. Pas de vidéo de fond · preuve : aucune balise `<video>`
- [x] 22. Pas de reveal : le thème Squeeze dit « no reveal, no parallax, no loop » (`waive` du reveal, l'attribut n'existe pas) · preuve : `themes/squeeze.md` § Motion
- [x] 23. États d'input (39a) · preuve : `page.css` `.field` (bordure 2 px constante, ring inset, invalid par bordure + texte, disabled par opacité + curseur + pointillé)
- [x] 24. Pas de tooltip ni d'auto-rotation (17, 18) · preuve : aucun
- [x] 29. Aucun faux envoi (70) · preuve : `Base.astro` script, message « Rien n’a été envoyé : ce formulaire n’est pas encore relié… » ; `data-endpoint=""`, `novalidate`
- [x] 30. SVG décoratifs `aria-hidden` (33) · preuve : `Nav.astro` (icône du menu)
- [x] 48. Hover : un signal sur le conteneur, rien sur les non-interactifs, pas de rebond ni de toast (11, 12, 16) · preuve : `.dish--link`, `.chip`, `.btn` sous `@media (hover: hover)` ; le hover de scale sur la photo de phase 1 a été retiré
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52 px (26b, 39b) · preuve : `.btn:active/:disabled/[aria-busy]`, `.chip` 44, nav 44, champs 52 ; vérifié à 1440, 375 et 320
- [x] 56. Un primaire rempli (F4) · preuve : une recette `.btn--primary` ; sur /reservations/ le primaire est la demande en ligne d'origine, le bouton d'envoi du formulaire factice et le bouton de nav passent en contour
- [x] 58. Une recette de conteneur (tuile et carte), pilule pour pastilles seulement (F7) ; aucun pattern de scroll (F8)
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` (F16) · preuve : `base.css:6-8`
- [x] 72. Responsive · preuve : breakpoints 60rem et 40rem (+ 75rem et 21rem pour la nav seulement), `(hover: hover)`, `(pointer: coarse)` pour les liens à 44 px, `env(safe-area-inset-*)` dans `.container` et le menu, aucun débordement horizontal à 1440, 1100, 961, 960, 768, 375, 320 (script `scrollWidth`)

## Phase 2 : motion, états, hero review

- hero-review: self (pas d'outil Agent en session d'agent, `review-hero.md` non suivi par un sous-agent) · fix · 1 finding · 1 resolved (nav du 375 sans gouttière : logo, « Réserver » et « Menu » dépassaient ; resserrés à 96 px, 16 px de padding)
- comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800)
- Masse : reproduite, texte sur 5 colonnes à gauche, carte de prix sur 7 à droite ; la carte est plus haute que la comp (6 pizzas avec description, 4 sans description dans c1).
- Intervalle : 96 px entre colonnes contre environ 48 dans la comp ; plus grand écart, gardé : le titre respire et la liste reste lue d'un bloc.
- Entrée : texte puis actions, puis la liste sous le titre au téléphone ; aucune animation d'entrée (caractère Squeeze).
- Nav : bord à bord (logo, pastilles, « Réserver ») ; sous 60rem, « Réserver » reste dans la barre et le reste passe dans un menu Popover (`popovertarget`, fonctionne sans script).
- Motion (Squeeze : état seulement) : pression de 1 px, pastille ou ligne choisie cernée en `--color-accent`, ligne de pizza qui passe d'un cran de vert, menu qui s'ouvre en 220 ms. Aucun reveal, parallax ni boucle.
- Interactions : les six pizzas du hero mènent à la ligne de la carte (`/carte/#pizzas-<nom>`, `:target` cerné) ; pastille de rubrique en cours sur /carte/ (IntersectionObserver, `aria-current="location"`), rangée défilante au téléphone ; jour courant des horaires (`data-today`, pastille « Aujourd’hui », fuseau Europe/Brussels).
- Formulaire : validation au blur puis à l'input, aide `min-height: 1lh`, `aria-invalid`, nombre de personnes en `<select>` de 1 à 12 (au-delà, page Groupes), aucun faux envoi.
