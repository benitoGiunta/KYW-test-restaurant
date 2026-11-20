**Hallmark · v2.0.0 · variante legacy KYW**
- Redesign : full ; Before : `.hallmark/before.txt` (356 FAIL, 99 REFLEX, 57 WARN sur le site d’origine) ; Keeps : routes (/, /menu/, /carte/, /banquets-et-receptions/, /photos/, /reservation/), tel, mailto, Facebook, iframe Zenchef rid=382492, textes du client ; Files : `src/`, `public/photos/`.
- Shape : Bento Grid (draw 02b4d0) sur l’accueil, multipage conservé. Theme : Atelier (deal 3/3, seed `restaurant-namur-belgian-seasonal-7a42·e87afd81·2026-11-20·r0`) ; écartés : Vellum (blackletter, trop archaïque pour un menu du chef), Spore (sombre, les photos du client sont lumineuses).
- Chrome : barre flottante (le « pill » du draw, coins du thème) ; Hero : Counter ; Signature : le comptoir, trois faits réglés et le bouton de réservation sous le jardin ; Sections : Hero Counter, Statement, Bento, plein cadre sans titre, Switcher + Rows, Schedule + lieu, pied statement.
- Motion : calm (Atelier). Un reveal (fondu + 16 px, `IntersectionObserver`, sous `.js`), une signature au chargement (le comptoir : le filet se trace, puis trois faits et le bouton à 110 ms d’écart). Rien d’autre ne bouge.
- Material : photographies du client (9 sur 10 utilisables, la 10 a une bande blanche) ; Comp : c1 de 2 ; Sweep : phase 3.

# Approche
Macrostructure d’origine : one-page d’accueil à slider plein écran + 5 pages (Enfold/WordPress). Gardées : routes, posture calme (le slider WebGL est abandonné : dérogation, carrousel auto → un seul plein cadre, gate 18). Échanges avec le draw : « room as full-bleed with no head » pris ; Switcher midi/soir remplacé par Switcher des formules 3/4 services (la carte n’a pas de séparation midi/soir) ; boutons de créneaux libres non pris (aucun service de disponibilités, rien d’inventé). Test miroir : un voisin au même site n’aurait pas le prune du logo sur papier chaux ni un comptoir à trois faits ; décision changée : accent glissé de l’ardoise au prune.

# Thème
Atelier, tokens dans `src/styles/tokens.css`. Accent : prune `oklch(36% 0.09 325)` (hue lue sur la capture du logo d’origine), focus hue 325. Polices : Sentient 300/400 (titres), Hanken Grotesk 400 (texte).

# Composants
- Carte : Rows (`Rows.astro`), titre col. 1 à 5, description col. 6 à 11, supplément à droite en `tabular-nums`, filets, aucune tuile, aucune carte dans une carte ; au téléphone nom et prix sur la même ligne.
- Switcher : `Formules.astro`, `role="tablist"`, premier panneau visible sans script.
- Horaires : Schedule (`Horaires.astro`), `<dl>` + `<time>`, jours fermés en `--color-muted` jamais barrés, dits ici et au pied ; jour courant : phase 2.
- Pied : statement (phrase, quatre colonnes adresse, contact, horaires, réservation), `data-credits`, puis KywFooter.
- Photo : `Photo.astro`, `<figure>` + `srcset` 800/1600, `width`/`height`, hero `fetchpriority="high"`, légende = un fait.

# Sur-utilisation
- [x] 1. Audit lu avant de juger · preuve : AUDIT.md
- [x] 2. Deal, draw, scaffold, stamp · preuve : src/styles/page.css:1-5
- [x] 3. Pas de tuile icône, pas de carte dans carte · preuve : Rows.astro
- [x] 4. Contenu réel seulement, aucun fictif · preuve : src/data/site.ts
- [x] 5. Pas de tiret cadratin, apostrophes typographiques · preuve : contrôle Python sur src/
- [x] 2. Pas de `transition: all`, pas d'animation de géométrie · preuve : page.css `.btn`, `.sheet`, `.counter::before` (transform/opacity/couleurs seulement)
- [x] 6. `:focus-visible` partout, instantané, 3:1 · preuve : base.css:`:focus-visible`, page.css `.field input:focus-visible`, `.close :focus-visible`
- [x] 7. Reduced motion sur chaque animation, contenu visible sans script · preuve : base.css (bloc reduced), page.css fin de fichier ; contrôle navigateur : 0 `[data-reveal]` à opacité 0 sans JS et en reduced
- [x] 17. Hero en `dvh` · preuve : page.css `.hero__ph img { max-height: 44dvh }`
- [x] 19. Sticky non superposés · preuve : `.bar` seul sticky `top: 12px` (z 300) ; `.menu-page > .ph` sticky `top: 96px` en dessous
- [x] 20. Radios-onglets : sans objet, Switcher en `role=tablist` avec premier panneau visible sans script · preuve : Formules.astro
- [x] 21. Vidéo de fond : sans objet (aucune vidéo)
- [x] 22. Reveal sous `.js` seulement · preuve : page.css `.js [data-reveal]`
- [x] 23. États d'input : repos, hover, focus (outline inset), invalide, désactivé (trois canaux), placeholder = format · preuve : page.css `.field`
- [x] 24. Tooltip et auto-rotation : sans objet (aucun tooltip, aucune rotation)
- [x] 29. Aucun faux envoi · preuve : Contact.astro, `data-endpoint=""`, message « Rien n’a été envoyé : ce formulaire n’est pas encore relié »
- [x] 30. SVG décoratifs `aria-hidden` · preuve : Nav.astro (icône du menu)
- [x] 48. Hover : un signal, sur le conteneur, sous `@media (hover: hover)`, pas de rebond, pas de toast · preuve : page.css
- [x] 49. `:active` (décalage de 1 px) et `:disabled` (pointillé, couleur sourde) ; contrôles 44 à 52 px · preuve : page.css `.btn`, mesure mobile (seul `.mark` à 31 px, passé à 44)
- [x] 56. Un seul recipe de primaire rempli (prune), jamais côte à côte · preuve : index.astro, Footer.astro (inversé sur le noir)
- [x] 58. Une recette de conteneur (`.stock`), pilule limitée aux contrôles ; un seul reveal, pas de scroll-choreography · preuve : page.css
- [x] 63. `::selection`, `caret-color`, `scrollbar-color`, `accent-color` · preuve : base.css, page.css
- [x] 72. Responsive : 60rem et 40rem, `(hover: hover)`, `(pointer: coarse)`, safe-area dans `.container`, 16 px de gouttière au téléphone · preuve : page.css ; débordement horizontal 0 à 375 et 1280
