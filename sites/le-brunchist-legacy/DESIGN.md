# Design : Le Brunchist (variante legacy)

**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 1 page (/) + 404
- **Before** · lebrunchist.com bloqué par une vérification anti-robot : rien à relever (10 FAIL sur la page de blocage, sans objet)
- **Keeps** · nom, adresse, téléphone `tel:`, horaires, liens Facebook et Instagram, plats cités par les sources
- **Files** · créés : tout `sites/le-brunchist-legacy/` ; supprimés : aucun
- **Shape** · Split Studio (draw 97d21a), genre editorial, job : venir (appeler ou s'y rendre)
- **Theme** · Vellum, dealt 1/3, seed restaurant-namur-brunch-specialty-40dd·ed6fbcfe·2026-11-20·r0, colourway parchment. Écartés : Squeeze (vert forêt, fruits : trop fraîcheur de marché, la vaisselle vintage et le café le contredisent) ; Solstice (crème et vermillon : le brunch chaleureux générique, c'est le voisin probable)
- **Chrome** · nav : barre à bords alignés (marque, trois ancres, Appeler) ; pied : mast
- **Hero** · Stage : tête sur 5 colonnes, photo sur 7
- **Signature** · le livre du jour : la semaine d'ouverture en registre sur le champ ultramarine, sous une tête gothique
- **Sections** · Stage, Carte (Switcher salé / sucré / boissons), On en parle (bande, rangées), Lieu (split), Horaires et adresse (bande ultramarine), mast
- **Material** · photographies provisoires de la bibliothèque (Wikimedia Commons), aucune du client
- **Comp** · 2 built, c1 chosen (`comp.md`)
- **Sweep** · phase 3

## Échanges avec le draw
Le draw donnait barre de recherche, barre de réservation collante, « prochains créneaux » en boutons, carte midi/soir : la matière refuse (aucun outil de réservation connu, café de jour, pas de soir). Remplacés par : barre à bords alignés, appel et itinéraire, Switcher salé/sucré/boissons. Conservés : Split Studio, Stage, mast. Test miroir : un voisin avec « café-brunch, appel unique » aurait Settled + crème ; ici gothique + champ ultramarine.

## Tokens
Source de vérité : `src/styles/tokens.css` (Vellum). Papier `oklch(94% 0.024 82)`, encre `oklch(23% 0.025 55)`, pigment ultramarine `oklch(43% 0.17 268)`. Polices : Grenze Gotisch 600 (h1, h2, marque, jamais sous 30 px), Grenze 400 (citations), Hanken Grotesk 400/500/600 (tout le reste, h3 compris). Rayon 2 px, aucune ombre, filets 1 px et double filet 4 px.

## Composants
- **Carte** : Switcher (`role="tablist"`, tous les panneaux visibles sans script, onglets masqués sans `.js`), rangées nom à gauche, description à droite, double filet au-dessus, survol en `--color-accent-soft`. Prix absents (inconnus) : mention `.fill`. Compositions illustratives (`data-placeholder`).
- **Horaires** : Schedule en `<dl>` avec `<time>`, jours fermés en `--color-muted` (atténué, jamais barré), double filet, sur champ ultramarine. Jour courant : phase 2.
- **Pied** : mast (marque en tête gothique, trois colonnes : liens, adresse et horaires, réseaux), crédits photo `data-credits`, puis `<KywFooter>`.
- **Photo** : `<figure>` + `[data-slot][data-alt][data-credits][data-placeholder]`, `width`/`height`, hero `fetchpriority="high"`, autres `lazy`, légende hors du slot.

## Sur-utilisation
- [x] 1. Skill Hallmark lue (SKILL.md, redesign.md, layout.md, design-md.md, vellum.md) · preuve : stamp de page.css:1
- [x] 2. deal, draw, scaffold lancés · preuve : `.hallmark/log.json` (entrée le-brunchist-legacy), journaux `.logs/bl-deal.log`, `bl-draw.log`, `bl-scaffold.log`
- [x] 3. sloplint --render lancé sur une copie à chemins relatifs · preuve : `.logs/bl-sl.log` ; FAIL restants uniquement ceux du paquet `kyw-footer` (48, jamais modifié)
- [x] 4. Photos de la bibliothèque, créditées, `data-alt` = ce que la vraie photo devra montrer · preuve : `src/data/site.ts` `photos`
- [ ] 5. Références non lues en entier faute de budget : `anatomy.md`, `imagery.md`, `craft.md`, `gates.md` § 1 à 4 et `patterns.md` consultés par extraits seulement ; à relire en phase 2.

## Phase 2 : mouvement, états, mobile
- **Motion** : Vellum est `still` (vellum.md § Motion). Aucun reveal, aucun parallax, aucune boucle : le point 22 est sans objet, le contenu est visible sans script. Seuls mouvements : lavis de ligne et soulignement au survol, bouton enfoncé de 1 px (`:active`), fondu de 120 ms du panneau de la carte, fondu de 220 ms du menu `<dialog>` (sortie 120 ms). Réduit : `base.css` ramène toute durée à 0,01 ms et le défilement doux n'existe que sous `no-preference`.
- **Signature** : la ligne du jour du livre des horaires (heure de Namur, `Intl`) est posée par script en papier sur le champ ultramarine, avec « Aujourd’hui » ; sans script, le registre reste complet et neutre.
- **Nav** : barre à bords alignés ; l'action Appeler passe en contour (le primaire plein est celui du hero, jamais deux pleins côte à côte). Sous 60 rem : bouton « Menu » qui ouvre un `<dialog>` modal (Échap, Fermer, lien, fond), premier focus sur « Carte », défilement du corps bloqué. Sans script : les trois liens restent visibles sous la barre. Section courante soulignée en encre (IntersectionObserver). `scroll-padding-top` = hauteur de barre + 16 px.
- **Formulaire** : aucun. Aucun outil de réservation connu, action = appeler ou s'y rendre (ETAT phase 1) ; rien à poster, donc 29 est vérifié par absence.
- **Switcher** : flèches, Début, Fin ; panneaux focusables (`tabindex="0"`) ; tous visibles sans script.
- **Mobile** : 60 rem et 40 rem, `dvh`, safe-area dans les gouttières du conteneur et du menu, cibles 44 px sur pointeur grossier, aucun débordement à 320, 375, 1440, 1920 (mesuré).
- **Hero review** (auto-notation `self`, aucun sous-agent disponible en session d'agent) : `hero-review: fix · 1 finding · 1 resolved` : la photo tenait 53 % de la hauteur du premier écran à 1440x900 (règle : 60 %) ; cadre carré plafonné à 68 dvh, 68 % mesuré. Titre de 7 mots, contenu centré, un primaire plein et un contour.
- **Comp** : `comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800)`. Masse : texte à gauche sur 5 colonnes, photo à droite sur 7, repro fidèle. Intervalle : la comp serrait titre et chapeau, le site a un chapeau et deux actions plus aérés. Entrée : la photo entre sans animation, comme la comp. Plus grand écart : titre en 4 lignes (colonne `12ch`) contre 3 dans la comp ; gardé, le gothique à 84 px garde sa masse.

## Sur-utilisation (phase 2)
- [x] 2. Pas de `transition: all` ni d'animation de géométrie · preuve : `grep` 0 occurrence, page.css (transitions listées, `opacity`/`transform`/couleurs)
- [x] 6. `:focus-visible` partout, instantané, 3:1 · preuve : base.css:6, page.css:26, :103, :108, :146
- [x] 7. Fallback reduced motion sur chaque animation ; contenu visible sans script · preuve : base.css:25 ; test sans JS (panneaux `block`, liens visibles)
- [x] 17. Hero en `dvh` · preuve : page.css `.hero` (`calc(100dvh - var(--nav-h))`), `.frame--hero` 68dvh
- [x] 19. Sticky non superposés · preuve : un seul sticky (`.nav`, `--z-sticky-nav`), `navTop` 0 mesuré après défilement
- [x] 20. Radios-onglets gardés · preuve : sans objet, onglets `role="tab"` sur boutons masqués sans `.js`
- [x] 21. Vidéo de fond · preuve : sans objet, aucune vidéo
- [x] 22. Reveal sous `.js` seulement · preuve : sans objet, thème still, aucun reveal
- [x] 23. États d'input · preuve : sans objet, aucun champ
- [x] 24. Tooltip et auto-rotation · preuve : sans objet, ni l'un ni l'autre
- [x] 29. Aucun faux envoi · preuve : aucun formulaire
- [x] 30. SVG décoratifs `aria-hidden` · preuve : aucun SVG en balise ; grain en `background-image` CSS
- [x] 48. Hover : un signal, conteneur, pas de rebond, pas de toast · preuve : page.css `@media (hover: hover)`
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52 px · preuve : page.css `.btn` (48), `.btn--sm` 44 en `pointer: coarse`, onglets 48, lignes du menu 64
- [x] 56. Un primaire rempli · preuve : hero `.btn` seul plein, nav en contour, `.btn--clair` sur la bande (answered F4)
- [x] 58. Une recette de conteneur, un pattern de scroll · preuve : pas de pilule, aucune chorégraphie de scroll
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` · preuve : base.css:3-5
- [x] 72. Responsive · preuve : captures `.shots/bl2/` 375 et 320 sans débordement, `dvh`, safe-area (base.css `.container`, page.css `.menu__in`)
- [ ] 5. (phase 1) références non lues en entier : toujours consultées par extraits (microinteractions.md, vellum.md § Motion, review-hero.md lus en phase 2) ; à clore en phase 3.
