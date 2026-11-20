**Hallmark · v2.0.0 · variante legacy KYW**
- Redesign : full, site d'origine inaccessible, composition entièrement neuve.
- Before : aucun (403), voir AUDIT.md.
- Keeps : nom, adresse, trois brunchs, plats cités, mardi étudiants ; wiring : `tel:` seul.
- Files : `src/styles/{tokens,base,page}.css`, `src/data/site.ts`, `src/layouts/Base.astro`, `src/components/`, `src/pages/` (accueil, carte, venir, 404).
- Shape : Marquee Hero (draw fe3f07), hero Ledge, nav pilule flottante, pied bloc colophon, barre d'appel fixe (en place de la réservation en ligne, inexistante).
- Theme : Squeeze (deal 2/3, seed restaurant-namur-brunch-cafe-aab6·f106bf78·2026-11-20·r0). Écartés : Vellum (gothique, ton trop d'imprimerie pour un brunch), Solstice (déjà tiré trois fois dans le journal).
- Chrome : pilule `--color-paper-2`, deux liens + bouton Appeler. Hero : figure 21,95 € (illustratif), titre, une phrase, deux actions.
- Signature : le prix du brunch en un seul chiffre géant sur le vert.
- Sections : Hero, Trois brunchs (tuiles), salle (bande photo), Maison (bande profonde), Mardi (figure), Venir (horaires), Fin (carte blanche + photo).
- Material : vert forêt plat, encre blanc chaud, pêche sur les contrôles seulement. Comp : c1 de 2. Sweep : phase 3.
- Échanges avec le draw : « the room full-bleed » gardé (placeholder) ; « next free times as buttons » refusé (aucune réservation) ; Switcher midi/soir refusé (aucune donnée).

## Tokens
Générés par `theme.mjs scaffold squeeze` dans `src/styles/tokens.css` (papier `--color-paper` vert 41 % 154°, encre, accent pêche, carte `--color-card`, Gabarito 800 + Manrope 500/700).

## Composants
- Carte : Rows (titre col. 1 à 5, prix à droite `tabular-nums`) ; formules en rangs `data-placeholder`, brunchs et boissons sans prix (inconnus, rien rendu). Pas de Switcher.
- Horaires : Schedule en `<dl>`, sept jours identiques dits en un bloc « Tous les jours » ; illustratif et signalé. Jour courant et fermé : sans objet.
- Pied : colophon block (adresse, horaires, téléphone), puis KywFooter ; barre d'appel fixe.
- Phase 2 : nav pilule alignée sur le conteneur (largeur = conteneur moins gouttières), lien courant en pastille, logo `aria-label`. Barre d'appel : téléphone seulement (< 40rem), s'efface (translate, `inert`) quand un bouton Appeler de la page est à l'écran ; bouton Appeler de la nav et du hero masqués au téléphone (un seul primaire visible). Copier le numéro (page Venir) : pointeur fin et script seulement, états par le texte (« Numéro copié », « Copie refusée »), désactivé si le presse-papiers manque.
- Motion : caractère « cheerful and quick, state only » du thème Squeeze (« No reveal, no parallax, no loop ») : aucun reveal ni boucle ; seuls l'appui de 1 px, la barre qui s'efface, le soulignement du lien. Choix du thème contre le « un reveal par page » de la phase : la gate 22 est sans objet.
- Photo : `<figure data-slot data-alt data-placeholder>`, aucune photo, `hallmarkSlots` prêt.

## Sur-utilisation
- [x] 1. Tokens seuls pour couleurs et polices · preuve : sloplint src, 0 FAIL
- [x] 9. Aucun eyebrow ni capitales espacées · preuve : page.css
- [x] 15. Stamp en première ligne de page.css · preuve : page.css:1
- [x] 2. Pas de `transition: all` ni d'animation de géométrie (10a) · preuve : page.css:20 (`translate` seul), :123 (`translate`)
- [x] 6. `:focus-visible` partout, instantané, 3:1 (26a, 15) · preuve : base.css:6, page.css:32 ; 7 arrêts clavier mesurés (outline 2px solid)
- [x] 7. Reduced motion et contenu visible sans script (27, 62) · preuve : base.css:25 (durées 0,01 ms, mesure 1e-05 s) ; sans script : h1 opacité 1, barre visible, copie masquée
- [x] 17. Hero en `dvh` (6a) · preuve : page.css:53
- [x] 19. Sticky non superposés (56) · preuve : nav `--z-sticky-nav` en haut, barre `--z-sticky` en bas (jamais deux `top: 0`) ; `scroll-padding-top` base.css:4
- [ ] 20. Radios-onglets (53) · sans objet : aucun switcher (aucune donnée de service)
- [ ] 21. Vidéo de fond (28) · sans objet : aucune vidéo
- [ ] 22. Reveal sous `.js` (62) · sans objet : le thème interdit le reveal ; rien n'est caché au repos
- [x] 23. États d'input (39a) · preuve : seul contrôle de saisie, aucun champ ; bouton Copier : défaut, hover, focus, actif, désactivé (page.css:20-28)
- [ ] 24. Tooltip et auto-rotation (17, 18) · sans objet : aucun
- [x] 29. Aucun faux envoi (70) · preuve : aucun formulaire ; la réservation est le `tel:` conservé
- [x] 30. SVG décoratifs `aria-hidden` (33) · preuve : aucun SVG dans les pages (favicon seul)
- [x] 48. Hover : un signal, conteneur, pas de rebond, pas de toast (11, 12, 16) · preuve : hover sur boutons, pastilles, liens seulement ; tuiles non interactives sans hover
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52 px (26b, 39b) · preuve : page.css:21-28 ; mesure 375 px : seuls des liens du pied KYW < 44
- [x] 56. Un primaire rempli (F4) · preuve : sloplint 0 WARN (bouton de la carte blanche : même pêche, filet encre)
- [x] 58. Une recette de conteneur, un pattern de scroll (F7, F8) · preuve : tuiles et carte seulement ; aucun scroll piloté
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` (F16) · preuve : base.css:4-5
- [x] 72. Responsive · preuve : breakpoints 60rem et 40rem (+ 30rem pour la nav), `hover: hover`, `dvh`, safe-area (nav, conteneur, barre) ; scrollWidth = fenêtre à 320, 360, 375, 390, 768, 1024, 1280, 1920 sur 3 routes
- [x] 16. sloplint `--render` · preuve : hero stage 0 FAIL, 0 WARN, REFLEX 81 waived (page.css, photos du client à fournir) ; pages accueil, carte, venir : 0 FAIL, 0 REFLEX
