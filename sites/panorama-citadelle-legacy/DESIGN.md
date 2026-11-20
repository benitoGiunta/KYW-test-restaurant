**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full, contenu et wiring gardés, système et composition neufs
- **Before** · AUDIT.md (site WordPress brun, héros photo + bandeau, cartes en PDF)
- **Keeps** · 4 routes (accueil, le-panorama, la-carte, reservation-contact), tel, mailto groupes, Facebook, Instagram, Maps, lien de réservation du site actuel, PDF des cartes
- **Files** · src/styles/{tokens,base,page}.css, src/layouts/Base.astro, src/components/*, src/pages/*, src/data/{site,carte}.ts
- **Shape** · Photographic (draw 263af1), job: book
- **Theme** · Solstice, dealt 2/3, seed restaurant-namur-brasserie-bistronomy-fb23·08cd4f7e·2026-11-20·r1 (re-deal 1 fois : le premier tirage Vellum, Ink, Sport ne portait ni brun chaud ni cuisine de brasserie). Écartés : Darkroom (noir et blanc, contredit des photos couleur de la vue), Brutal (affiche jaune, hors de la tonalité d'une table élégante).
- **Chrome** · nav : bandeau, wordmark, deux liens, un bouton Réserver · footer : colonnes d'index sur brun, adresse, contacts, réseaux, crédits
- **Hero** · Counter : titre en colonnes 1 à 5, vue sur la Meuse en 4:3, guichet adresse, téléphone, accès
- **Signature** · la vue sur la Meuse au guichet de réservation, première chose vue
- **Sections** · Hero, Split (lieu), Rows (carte), Band (chef, four à bois, Pano), Schedule (horaires), Split (réservation + photo)
- **Material** · real : 20 photos du client, carte transcrite, adresse, tel, groupes@, horaires du site · pictures : photos du client · absent : avis, notes, métriques, témoignages
- **Comp** · comp: 0 built, no key · c1 not built · reproduced (checked at 1440x900 on the built hero, voir comp.md)
- **Hero review** · hero-review: ship (self, pas d'outil Agent) · 0 findings · 0 resolved ; sloplint hero : 0 REFLEX ouvert, FAIL 34 faux positif connu
- **Nav** · forme banner : wordmark à gauche, deux liens, un Réserver ; sous 60rem les liens passent en menu popover (Accueil, Le Panorama, La carte), Réserver et Menu restent dans la barre
- **Motion** · character : still/calm. Solstice déclare « no reveal, no counter, no loop » : aucun reveal au scroll (waived par le thème). Signature de mouvement : le filet de 2 px du guichet se trace de gauche à droite à l'arrivée (420 ms x 2, transform scaleX, ease-out), reduced-motion : état final immédiat
- **Sweep** · phase 3 (RAPPORT, jury, journal)

## Approche
Macrostructure : multi-pages calme, quatre routes gardées. Posture : héros Counter (la réservation ouvrait le site), aucun mouvement en phase 1. Dérogations : widget Zenchef remplacé par le lien du site actuel (`dropped`), bandeau cookies et vidéo plein écran retirés (`dropped`), faux envoi du formulaire `data-endpoint=""` (70). Hypothèse : le tirage proposait « les prochains horaires libres en boutons » : refusé, aucune disponibilité réelle. Test miroir : un voisin au même site n'aurait pas un héros 4:3 avec guichet à trois cellules sur Solstice, brun encre et or.

## Thème
Solstice (crème, encre brune, Yeseva One, Archivo, filets or, ombres dures, vermillon). Le brun du site d'origine est repris en encre ; le vermillon remplace le beige-rose du logo comme unique signal.

## Tokens
Voir src/styles/tokens.css (palette, échelle d'espaces, `--text-*`, `--dur-*`). Aucune couleur en dur dans page.css.

## Composants
- **Carte** : Rows (nom à gauche, prix `tabular-nums` à droite, description en dessous), onze rubriques, index d'ancres en tête ; aucune tuile, aucun encadré ; filets 2 px ink et 1 px rule (F6, F24, F25).
- **Horaires** : Schedule en `dl` + `<time>`, sept jours, dits une fois par page ; jour courant : phase 2.
- **Pied** : colonnes d'index sur bande encre, adresse, téléphone, groupes, réseaux, `data-credits`, puis KywFooter.
- **Photo** : `Fig.astro`, `<figure data-slot data-alt>`, srcset 800/1600, width/height, hero `fetchpriority="high"`, légende = un fait.
- **Nav, bouton, formulaire, reveal** : états de base posés, comportement en phase 2.

## Sur-utilisation
- [x] 1. Audit et captures de l'original lus · preuve : AUDIT.md
- [x] 2. Deal, draw, scaffold, stamp · preuve : src/styles/page.css:1-9, .hallmark/log.json
- [x] 3. Fonts via Build hint, tokens seulement · preuve : Base.astro, page.css (aucun hex)
- [x] 4. sloplint --render sur le build · preuve : .logs/legacy-lint-x.log (1 FAIL 34 faux positif, @import non suivi ; REFLEX 44c, 59, 79 waived)
- [ ] 5. Comps c1/c2 · reporté en phase 2 (budget)
- [x] 2. Pas de `transition: all` ni d'animation de géométrie · preuve : page.css (transitions listées : background-color, border-color, color, transform, opacity, background-size) ; `grep "transition: all" page.css` vide
- [x] 5. Comp : hero construit relu à 1440x900 · preuve : comp.md (Masse, Intervalle, Entrée), `.hallmark/shots/*hero-1440x900.png`
- [x] 6. `:focus-visible` partout, instantané, 3:1 · preuve : base.css `:focus-visible` (2 px vermillon), champs en outline inset sans transition (FAIL 15 corrigé), `.band :focus-visible` et `.foot :focus-visible` en or
- [x] 7. Fallback reduced motion sur chaque animation, contenu visible sans script · preuve : base.css `@media (prefers-reduced-motion)` ; le filet `trace` finit à l'état final ; aucun contenu masqué au repos, jour courant et rail ajoutés par script seulement en plus
- [x] 17. Hero en `dvh` · preuve : page.css `.hero { min-height: calc(100dvh - 72px) }`
- [x] 19. Sticky non superposés · preuve : seul `.site-head` est sticky (`--z-sticky-nav`), rail de la carte non sticky, `scroll-padding-top` 96 px
- [ ] 20. Radios-onglets gardés · sans objet : aucun switcher (carte longue avec index d'ancres), pas de radios-onglets
- [ ] 21. Vidéo de fond · sans objet : vidéo plein écran retirée (`dropped`)
- [x] 22. Reveal sous `.js` seulement · aucun reveal (thème still) ; `.js` n'est posé que par Base.astro
- [x] 23. États d'input · preuve : page.css section Formulaire (bordure 1 px constante, hover couleur, anneau outline inset, invalide `--color-error` + message, disabled pointillé + opacité + curseur)
- [ ] 24. Tooltip et auto-rotation · sans objet : ni tooltip ni boucle
- [x] 29. Aucun faux envoi · preuve : reservation-contact.astro (`data-endpoint=""`, `novalidate`, « Rien n'a été envoyé : ce formulaire n'est pas encore relié »), contrôle navigateur : formulaire vide, e-mail invalide, valide, les trois cas donnent le bon message
- [x] 30. SVG décoratifs `aria-hidden` · aucun SVG dans la page
- [x] 48. Hover : un signal, conteneur, pas de rebond, pas de toast · preuve : tous les `:hover` sous `@media (hover: hover)`, aucun hover sur les rangées de carte (non interactives)
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52 px · preuve : `.btn` 48 px (mesuré), `.menu-btn` 48 px, cases 24 px dans un libellé de 44 px
- [x] 56. Un primaire rempli · preuve : sloplint F4 : 0 WARN (le bouton Menu est outlined, l'état ouvert reste clair)
- [x] 58. Une recette de conteneur, un pattern de scroll · aucune tuile ; le seul scroll est le rail horizontal de la carte au téléphone et la surbrillance de la rubrique courante
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` · preuve : base.css:4-6
- [x] 72. Responsive · preuve : breakpoints 60rem et 40rem, `(hover: hover)`, `(pointer: coarse)`, rail restacké au téléphone ; mesuré 320, 375, 768 : scrollWidth = innerWidth sur les 4 routes
