# Design : Carré d’herbes (variante legacy)

**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full : contenu et wiring restent, système et composition changent.
- **Before** · `.hallmark/before.txt` : 804 FAIL, 216 REFLEX, 82 WARN sur 14 pages (les FAIL 2a « dégradé violet » viennent des presets WordPress sur `:root`, pas du design).
- **Keeps** · 9 routes de contenu (accueil, le restaurant, menus, fêtes 2026, actualités, contact, comment réserver, bon cadeau, 404), `tel:` 081 34 48 19, lien Facebook, adresse, horaires, texte des menus et des prix, avis de Stéphane Materne, citation de Théodore Zeldin.
- **Files** · `src/data/site.ts`, `src/styles/{tokens,base,page}.css`, `src/layouts/Base.astro`, `src/components/{Nav,Footer,Photo,Horaires,Etapes}.astro`, `src/pages/*.astro`.
- **Shape** · Photographic (macrostructure 08, empreinte `Heading|Body|Divider|Button|Image|Reveal`), multipage. Le draw (f665ca) donnait Narrative Workflow, hero Ledge, nav pilule flottante, pied colophon : pied gardé, hero Poster et nav barre bord à bord conservés de l’original (swap nommé), séquence « réservation, menu, horaires » respectée.
- **Theme** · Solstice, dealt 1/3, seed `restaurant-namur-refined-seasonal-57d8·72123ad0·2026-11-20·r0`, lumière long-light. Écartés : Squeeze (joueur, étal de fruits, trop cheerful pour une table de gastronomie), Vellum (gothique, marque l’ancien et le sacré, pas une maison moderne).
- **Chrome** · nav : barre bord à bord, marque en Yeseva, téléphone et pilule « Comment réserver » ; pied : bloc colophon encre.
- **Hero** · Poster : la tuile de dentelle plein cadre (photo du client, 13), titre sur le côté ombré à gauche, téléphone et menus en actions.
- **Signature** · l’assiette à la tuile de dentelle, plein cadre, avec le numéro de téléphone comme action unique de réservation.
- **Sections** · Hero · Menus (Rows) · Chef (5/7) · Citation (bande encre) · Nom du lieu (5/7 + parc) · Actualités (Rows) · Réserver + horaires (Schedule).
- **Material** · real : photos du client (13 retenues sur 25), carte, horaires, avis ; absent : GPS (pas de carte), e-mail, note Google, nombre d’avis. Aucune donnée fictive dans cette phase.
- **Comp** · deux comps du premier écran (c1 texte en bas à gauche, c2 texte en haut à gauche), c1 retenu.
- **Sweep** · phase 3.

## Approche

Macrostructure **08 Photographic**, posture **Poster** : le plat plein cadre ouvre, la carte vient aussitôt après, le calme prime (aucune chorégraphie de scroll prévue ; un seul reveal éventuel en phase 2). Dérogations : bandeau cookies supprimé (aucun cookie posé) ; pages de menus séparées (lunch, 3, 4, 5, Noël, emporter) fusionnées en un Switcher sur `/nos-menus/` et un bloc dans `/fetes-2026/` (liste plate de routes, toutes les infos gardées) ; sous-menu « Qu’est-ce qu’on mange ? » aplati ; carrousel absent. Test miroir : un voisin avec « cuisine raffinée, Wépion » obtiendrait aussi le plat plein cadre, mais pas cette combinaison de crème, Yeseva, bande encre portant la citation de Zeldin et Schedule en pied ; décision changée pour s’éloigner : le téléphone remplace le bouton de réservation en ligne (il n’y en a pas).

## Thème

Solstice : papier crème, encre brune, Yeseva One / Archivo / Archivo Narrow, filets or, un seul vermillon sur les actions.

## Tokens

`src/styles/tokens.css` fait foi (scaffold Solstice, aucune modification). Rôles : `--color-paper` crème, `--color-paper-2` bande claire, `--color-ink` brun, `--color-accent` vermillon (boutons, focus), `--color-gold` filets et soulignement actif, `--font-display` Yeseva One, `--font-body` Archivo, `--font-outlier` Archivo Narrow (boutons, petites mentions). `--container` 1440 px, `--section-gap-s` 120 px (80 px sous 860 px).

## Composants

- **Carte** (menus) : Rows (titre col. 1 à 5, description 6 à 10, prix à droite en `tabular-nums`) sur l’accueil ; page `/nos-menus/` : Switcher `role="tablist"` Lunch / 3 / 4 / 5 assiettes (3 par défaut, tous les panneaux visibles sans script), étapes en lignes à filets, prix du menu et accord mets-vins en tête. Pas de tuiles, pas d’icônes, filets et non bordures + ombre.
- **Horaires** : Schedule `<dl>` avec `<time>`, jours fermés en `--color-muted` (jamais barrés), dernière prise de commande en petite mention, pas d’icône d’horloge ; dits sur l’accueil et le contact, pas dans le pied.
- **Pied** : colophon encre (adresse, téléphone, liens du site, Facebook, crédits photo `data-credits`), puis `KywFooter`. Pas de « Tous droits réservés », pas de newsletter.
- **Photo** : `<figure>` avec `width`/`height`, `loading="lazy"` sauf le hero (`fetchpriority="high"`), légende = un fait.
- **Boutons** : un primaire vermillon rempli par page (`.btn`), secondaire en contour (`.btn--line`, nav) ou lien souligné (`.btn-2`) ; huit états (défaut, hover sous `(hover: hover)`, focus-visible, active, disabled, busy, sélectionné pour les onglets, erreur pour les champs) ; 48 px, labels verbes. Réf. `interaction-and-states.md`.
- **Nav** : barre bord à bord 76 px (64 px au téléphone), « Réserver » en contour, liens en casse de phrase ; sous 67,5 rem (6 liens, téléphone et bouton ne tiennent pas plus bas), bouton « Menu » + `<div popover>` (Échap, clic extérieur, `aria-expanded` synchronisé) ; skip link ; sticky unique à `--z-sticky-nav`.
- **Formulaire** (`/reservations/`) : `data-endpoint=""`, `novalidate`, validation au blur puis à l’input, un message d’aide d’une ligne par champ, `select` natif pour les couverts, message « Rien n’a été envoyé : ce formulaire n’est pas encore relié ».
- **Switcher** : `role="tablist"`, flèches, Début et Fin ; sans script les quatre panneaux sont visibles.
- **Motion** (calme) : signature d’ouverture en CSS pur (l’assiette se pose en 1,6 s par l’échelle seule, titre, texte, actions montent en 700 ms décalés) ; un reveal de scroll par page sur les blocs sous le premier écran (`.js [data-reveal]`, opacité et 16 px) ; mouvement réduit : rien ne bouge, tout est visible.

## Sur-utilisation

- [x] 1. Hallmark lu avant de construire (SKILL.md, design-md.md, thème Solstice et sa photo, genre editorial) · preuve : stamp `src/styles/page.css:1-3`
- [x] 2. Deal/draw/scaffold, thème choisi sur l’image, deux écartés nommés · preuve : section Picks ci-dessus, `.hallmark/log.json`
- [x] 3. Audit `sloplint --before` sur l’original · preuve : `.hallmark/before.txt`, `AUDIT.md`
- [x] 4. Stamp et critique en tête de `page.css` · preuve : `src/styles/page.css:1-7`
- [x] 5. Deux comps du premier écran, un choisi · preuve : `.hallmark/comps/c1.html`, `c2.html`, `comp.md`
- [x] 6. Pas de tiret cadratin, apostrophes typographiques, insécables avant € et signes doubles · preuve : grep `—|–` vide sur `src/`
- [ ] 7. `sloplint --render` propre · raison : build statique seulement en phase 1, rendu à lancer en phase 2 ; `sloplint src` : 0 FAIL réel (FAIL 34 de `Base.astro` = faux positif, `overflow-x: clip` est dans `base.css:2`)
- [ ] 8. Contraste et fold mesurés · raison : phase 2
- [x] 2. Pas de `transition: all` ni d'animation de géométrie · preuve : grep `transition: all` vide ; `transform`/`opacity`/couleurs seulement (`page.css` boutons, nav, reveal)
- [x] 6. `:focus-visible` partout, instantané, 3:1 · preuve : `base.css` (global), `page.css` `.btn`, `.hero`, `.colophon`, `.form` (anneau inset)
- [x] 7. Fallback reduced motion sur chaque animation, contenu visible sans script · preuve : `page.css` bloc final `prefers-reduced-motion` ; mesure Playwright : reduced = 0 `data-reveal`, animation none ; JS coupé = 4 panneaux et sections opacité 1
- [x] 17. Hero en `svh`/`dvh` · preuve : `page.css` `.hero` (`100dvh`, `100svh` au téléphone)
- [x] 19. Sticky non superposés · preuve : un seul sticky (`.nav`), `scroll-padding-top: 6rem` (`base.css`)
- [ ] 20. Radios-onglets gardés · sans objet : onglets `button` + `role=tab`, pas de radios
- [ ] 21. Vidéo de fond · sans objet : aucune vidéo
- [x] 22. Reveal sous `.js` seulement · preuve : `page.css` `.js [data-reveal]`, étiquette posée par `Base.astro`
- [x] 23. États d'input · preuve : `page.css` `.form` (bordure constante, anneau outline inset, `aria-invalid`, disabled par fond + pointillé + curseur)
- [ ] 24. Tooltip et auto-rotation · sans objet : ni tooltip ni boucle
- [x] 29. Aucun faux envoi · preuve : `reservations.astro` script, mesure : message « Rien n’a été envoyé »
- [x] 30. SVG décoratifs · preuve : aucun `<svg>` dans `src/`
- [x] 48. Hover un signal, conteneur, pas de rebond, pas de toast · preuve : tout hover sous `@media (hover: hover)`, aucun easing à rebond
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52 px · preuve : `page.css` `.btn` ; mesure à 375 : aucun contrôle de moins de 44 px (hors lien du pied KYW, paquet partagé, 24 px)
- [x] 56. Un primaire rempli · preuve : nav en contour, hero ou formulaire seul rempli
- [x] 58. Une recette de conteneur, un pattern de scroll · preuve : filets, pas de cartes ; un seul reveal
- [x] 63. `::selection`, `caret-color`, `scrollbar-color`, `accent-color` · preuve : `base.css:2-9`
- [x] 72. Responsive · preuve : breakpoints 67,5 / 60 / 40 rem, `(hover: hover)`, `(pointer: coarse)`, safe-area dans `.container`, aucun débordement horizontal à 375, 768, 1000, 1100, 1440 sur 8 pages (mesure Playwright)
- [~] 7 (suite). `sloplint --render --stage hero` : 4 FAIL au premier passage (24a, 34 skip, 40 contraste du pied, 49b) corrigés ; reste FAIL 34 sur Base.astro = faux positif (clip dans `base.css`), prouvé par `scrollWidth`. Revue de hero par sous-agent impossible (pas d'outil Agent) : `hero-review: self · 2 findings · 2 resolved` (scrim mobile renforcé, marque sans retour à la ligne).
- [ ] 8. Contraste et fold mesurés · fold : hero et CTA visibles à 1280x800 et 375x812 ; contraste complet laissé à l'agent captures
