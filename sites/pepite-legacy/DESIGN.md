# Design : Pépite, cave à manger (variante legacy)

**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 2 pages (/, /404), one-page conservée (ancres : carte, vins, lieu, presse, horaires)
- **Before** · Floor 4 FAIL (15 occurrences) · Reflex 10 · texte monospace centré étroit, sections minces, scroll horizontal mobile ; le serif, le cuivre et les photos de la cave restent en esprit
- **Keeps** · réservation Tablebooker (restaurantId 50470946), commande des vins (Google Form), `tel:0476/620182`, plan Google Maps, Facebook, Instagram, menu de la semaine, horaires, extraits de presse
- **Files** · create : tout le paquet `sites/pepite-legacy/` ; delete : none
- **Shape** · Photographic (08), kept ; empreinte `Small|Full-bleed bands and rows|Image edge|Typographic link|Full-bleed|None`. Draw 44631c proposait Marquee Hero, hero Ledge, nav masthead, footer colophon block : swap = hero Poster (l'original ouvre sur la photo) ; nav et footer pris.
- **Theme** · Spore (cellar), dealt 1/3 (seed `restaurant-namur-mediterranean-moroccan-257f·6d790e86·2026-11-10·r0`). Écartés : Loom (papier écru froid, le lieu se vit aux bougies), Solstice (crème et vermillon, déjà proche de la signature d'autres sites du journal).
- **Chrome** · nav : masthead (liens à gauche, wordmark au centre, « Réserver » à droite) ; pied : colophon block (wordmark, adresse, contacts, crédits)
- **Hero** · Poster : photo cliente des bouteilles plein cadre, texte nu à droite sur dégradé (comp c2)
- **Signature** · les étiquettes de vins vues en pleine largeur, et le menu de la semaine lu comme un tableau de cinq rangées
- **Sections** · Hero (Poster) · Carte (tête 1 à 4, Rows 5 à 12) · Vins (bande paper-3, trois noms en grand) · Lieu (portrait et citation) · Presse (Rows) · Horaires et réservation (Schedule) · Pied (colophon)
- **Material** · real : donnees.json, dossier.md, page.html · pictures : 2 des 8 photos clientes (bouteilles, cave voûtée) · absent : photos de plats, carte des vins, équipe actuelle, nombre d'avis, abonnés
- **Comp** · voir `comp.md` (c2)
- **Sweep** · phase 3

## Approche
- **Macrostructure** : 08 Photographic, one-page. Posture : Poster, calme (aucune animation, un seul reveal éventuel en phase 2). Routes : `/` et `/404`.
- **Dérogations** : carrousel de photos supprimé (18) ; pluie de reveals supprimée (craft.md § 5) ; faux envoi de réservation sans objet (iframe Tablebooker remplacée par un lien) ; `waive 8` ; sections Events 2018 et News dropped (dates figées) ; scans de presse remplacés par extraits typés.
- **Test miroir** : un voisin avec le même site (cave, photos chaudes) aurait un hero sombre centré et des cartes de vins. Ici : texte nu à droite sur les bouteilles, carte en rangées numérotées, trois sélections en grands mots sur une bande. Décision changée par rapport au draw : hero Poster au lieu de Ledge.

## Thème (tokens.css)
Spore cellar : `--color-paper` noir café, `--color-ink` parchemin, `--color-accent` rose huître (le cuivre d'origine devient ce rose chaud, aucun cuivre inventé). Young Serif pour titres, prix et jours ; Instrument Sans pour le reste, plus de monospace. Rayons 14 px et pilules, filets de 1 px, pas d'ombre. Couleur de marque : aucune imposée, le logo capturé est noir et blanc, à redessiner.

## Composants
- **Carte** : Rows, numéro en col. 1, titre et détail en col. 2, tête (prix 58 € du menu en `tabular-nums`, jours, verre) sur 1 à 4 ; aucun prix par plat (non fournis) ; fromages 12 € en pied de liste (F6, F25).
- **Vins** : bande `--color-paper-3`, statement, trois sélections en Young Serif, lien « Commander en ligne » (bouton contour), Gin Djîn 45 €.
- **Horaires** : Schedule en `dl`, `<time>`, jours fermés en `--color-muted` non barrés, jour courant par `aria-current="date"` en phase 2, dits une fois (69), à la fin avec la réservation.
- **Pied** : colophon block, 200 à 400 px, adresse, téléphone, e-mail, réseaux, `data-credits`, puis `KywFooter`.
- **Photo** : `<figure>`/`<img width height>`, hero `fetchpriority="high"`, la portrait `loading="lazy"`, légende = fait de `photos/index.json`.

## Sur-utilisation
- [x] 1. Floor 16 points · preuve : `sloplint src` 0 FAIL, 0 REFLEX ; rendu en phase 2
- [x] 2. Stamp, critique et waivers en tête de page.css · preuve : src/styles/page.css:1-7
- [x] 3. deal, draw, scaffold lancés et journalisés · preuve : `.hallmark/log.json`
- [x] 4. Audit `--before` · preuve : AUDIT.md, .hallmark/before.txt
- [x] 5. Comp avant build · preuve : comp.md, .hallmark/comps/c1.png et c2.png
- [x] 6. Noindex, mention KYW, KywFooter sur `/` et `/404` · preuve : grep de dist/pepite/legacy/*.html
- [x] 7. Rendu `sloplint --render --url` : 0 FAIL, 0 REFLEX, 1 WARN (28a, waive) · preuve : .logs/pepite-l2-sloplint2.log ; contraste et 375 px à confirmer par l’agent captures

### Phase 2 (construction-2)
- [x] 2. Pas de `transition: all` ni d'animation de géométrie (10a) · preuve : `grep` de src/styles : aucun `transition: all` ; transitions limitées à `background-color`, `color`, `transform`, `opacity` (page.css:20-60)
- [x] 6. `:focus-visible` partout, instantané, 3:1 (26a, 15) · preuve : base.css `:focus-visible` outline 2 px `--color-focus` ; `.btn:focus-visible` sans transition ; contrôle Tab : outline solid 2px
- [x] 7. Fallback reduced motion sur chaque animation, contenu visible sans script (27, 62) · preuve : page.css fin de fichier (`prefers-reduced-motion`), test rendu : opacité 1 sur les 5 rangées en reduced-motion et JS désactivé
- [x] 17. Hero en `svh`/`dvh` (6a) · preuve : page.css `.hero` (`100svh` puis `100dvh`), aucun `vh`
- [x] 19. Sticky non superposés (56) · preuve : un seul sticky (`.nav`, `--z-sticky-nav`), `scroll-padding-top` = hauteur de nav + 16 px (base.css)
- [x] 20. Radios-onglets gardés (53) · sans objet : aucun switcher (liste de cinq rangées)
- [x] 21. Vidéo de fond (28a, 28b) · sans objet : aucune vidéo ; 28a `waive` sur la photo de Lieu (hors LCP)
- [x] 22. Reveal sous `.js` seulement (62) · preuve : `.js [data-reveal]` (page.css), une seule instance sur les rangées de la carte
- [x] 23. États d'input (39a) · sans objet : aucun champ ; états des boutons posés (`:disabled`, `[aria-disabled]`)
- [x] 24. Tooltip et auto-rotation (17, 18) · sans objet : aucun tooltip, carrousel supprimé en phase 1
- [x] 29. Aucun faux envoi (70) · aucun formulaire : la réservation est le lien Tablebooker d'origine, conservé tel quel
- [x] 30. SVG décoratifs `aria-hidden` (33) · aucun `<svg>` inline ; icône du menu en pseudo-éléments sous `aria-hidden="true"`
- [x] 48. Hover : un signal, conteneur, pas de rebond, pas de toast (11, 12, 16) · preuve : tous les `:hover` sous `@media (hover: hover)`, aucun easing à rebond
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52 px (26b, 39b) · preuve : `.btn` 48 px, nav 44 px ; mesure à 375 : seuls le logo (corrigé à 44) et le lien « Réalisé par » du paquet KYW (non modifiable) sont plus bas
- [x] 56. Un primaire rempli (F4) · preuve : `.btn` rempli au hero et à Horaires (écrans distincts), « Réserver » de la nav et « Commander en ligne » en contour
- [x] 58. Une recette de conteneur, pilule limitée aux contrôles (F7) ; un pattern de scroll, aucun (F8) · preuve : pilules sur boutons seulement ; `waive 8` de phase 1
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` (F16) · preuve : base.css:3-5
- [x] 72. Responsive · preuve : breakpoints 60rem et 40rem, `(hover: hover)` et `(pointer: coarse)`, horaires restackés sous 40rem, `overflow-x: clip` html et body, scrollWidth = largeur à 375, 961, 1024, 1280, 1920 ; menu en popover sous 60rem

Menu : `<nav popover>` unique (pas de doublon de liens), bouton `popovertarget` avec `aria-expanded` mis à jour, fermeture au clic d'un lien et à l'Escape ; sans script le bouton ouvre et ferme encore le popover.
Nav : forme « masthead » (3 derniers logs : banner, floating pill, edge-aligned). Grain : `.grained` (texture.md § 1), éclats clairs à 0,07 sur Vins et Horaires. Hero-review : `self`, pas d'outil Agent.

