**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 6 routes gardées (/, /boulangerie, /patisserie, /emporter, /menu, /reservations) + 404
- **Before** · Floor 422 FAIL (noir et blanc purs surtout), Reflex 129 : un site Wix sombre et rose, façade plein écran, vignettes égales, cartes en iframes ; la façade, le rose, la serif fine, les cartes et leurs prix, les horaires et le téléphone restent
- **Keeps** · 6/6 routes (slugs ASCII, /pâtisserie devient /patisserie) · tel:+3281229602 · formulaire personnes, date, heure (+ nom, téléphone) · lien vers le formulaire Wix d'origine · Facebook, Instagram · les quatre cartes (211 lignes, 23 catégories)
- **Files** · create: sites/dumont-bouge-legacy/** · delete: none
- **Shape** · Photographic (gardée), genre editorial, job: book, l'action dans la nav, le héros, la clôture et une barre mobile
- **Theme** · Garden, dealt 3/3 (avoine, encre, Vollkorn, filets, daylight), accent déplacé du vert feuille au rose du client (#E91E77 lu dans `page.html`, oklch 61 0,234 3), polices du client (Cormorant Garamond, EB Garamond) ; écarte Vellum (blackletter, étranger à la serif fine du client) et Squeeze (vert forêt saturé, registre playful)
- **Chrome** · nav: three-part (phase 2 : téléphone et deux liens à gauche du logo centré, deux liens et Réserver à droite ; quatre vraies destinations, différente des trois derniers logs : edge-aligned, masthead ; sticky ; popover sous 60 rem) · footer: mast
- **Hero** · Poster (gardé) : façade plein cadre, coup de pinceau rose, bande charbon ; Banner (texte et photo) sur les pages de carte, Counter sur /reservations
- **Signature** · le coup de pinceau rose du client posé sur la façade, au-dessus de la bande charbon
- **Sections** · Hero (Poster) · Quatre maisons (Index, quatre lignes) · Vitrine (photo pleine largeur, légende) · Tea-room (Switcher petit-déjeuner / brunch sur fond paper-2) · Présentation (statement sur charbon) · Horaires et adresse (Schedule, deux colonnes Bouge / Namur)
- **Material** · real : nom, adresse, téléphone, e-mail, horaires, 211 lignes de carte et leurs prix, formules, mention d'allergie, phrase de présentation · pictures : client 4 (façade, vitrine, salade, plateau) + logo + texture ; library 2 (pains, latte, placeholder, crédités) · absent : avis, note, histoire, équipe, prix des gâteaux, photos du tea-room et du brunch
- **Comp** · 0 built, no key · c1/c2 non construits en phase 2 (budget de réponses), réponses écrites dans comp.md · à faire en phase 3 si le temps le permet
- **Hero review** · self (pas d'outil Agent) · fix · 2 findings · 2 resolved : grille du héros (le pinceau et la bande se plaçaient en deux colonnes), pinceau à cheval sur la bande (traînée sombre et frange rose sur le h1) ; partial : le trait couvre l'entrée de la façade au téléphone
- **Sweep** · phase 3

*Le draw (cc056f) proposait Split Studio, hero Ledge, nav slab, footer mast, barre de réservation sticky. Pris : footer mast, barre de réservation (mobile). Écartés : Ledge (l'original ouvre sur la façade plein écran : Poster gardé), nav slab (nav gardée), Split Studio (macrostructure photographique gardée). Test miroir : un voisin avec « boulangerie rose » n'obtiendrait pas la façade sous un pinceau rose et la bande charbon.*

# Design : Dumont Bouge, variante legacy

## System
- Genre : editorial · Shape : Photographic · Theme : Garden, accent client · Axes : light/roman-serif/chromatic-pink · posture : committed

## Tokens
`src/styles/tokens.css` fait foi (scaffold `theme.mjs scaffold garden --redesign full`, valeurs recolorées depuis les fichiers du client).
```css
:root {
  --color-paper: oklch(98% 0.011 85);   /* #FCF8F0 du client (cartes) */
  --color-paper-2: oklch(95.7% 0.018 81); --color-paper-3: oklch(92.5% 0.027 75);
  --color-ink: oklch(27% 0.008 20);     /* #282626 du client (bande de l'accueil) */
  --color-brand: oklch(61.1% 0.234 2.6); /* #E91E77, traits et aplats seulement */
  --color-accent: oklch(52% 0.215 2.6);  /* boutons et liens : 5,9:1 avec le texte crème */
  --color-accent-deep: oklch(44% 0.19 2.6);
  --font-display: "Cormorant Garamond"; --font-body: "Hanken Grotesk"; --font-outlier: "EB Garamond";
}
```
Le rose pur (#E91E77) ne porte que des traits et aplats ; tout texte et bouton passe par `--color-accent` (contraste mesuré par construction, à vérifier en phase 2).

## Composants
- **Carte** (`Carte.astro`) : Rows (nom à gauche, description en muted, prix à droite `tabular-nums`) ; les sandwichs Dagobert classiques portent cinq prix par format : table à entêtes de colonnes (1/3, 1/2, 3/4, pistolet, sandwich), défilement horizontal au téléphone. Gâteaux sans prix : « à la commande » et un slot `.fill` (prix à confirmer). Aucune tuile icône, filets et pas de bordure + ombre.
- **Switcher** (accueil) : petit-déjeuner / brunch, `role="tablist"`, premier panneau visible sans script.
- **Horaires** (`Horaires.astro`) : Schedule, `<dl>` et `<time>`, jour fermé (dimanche à Namur) en `--color-muted`, deux colonnes Bouge et Namur ; dits une fois, en clôture ; le jour courant viendra en phase 2.
- **Pied** : mast (nom, baseline, liens, réseaux, crédits `data-credits`), puis `KywFooter`.
- **Photo** (`Photo.astro`) : `<figure>`, `width`/`height`, héros `fetchpriority="high"`, autres lazy ; placeholders (`data-placeholder`, `data-slot`, `data-alt`) crédités au pied.

## Sur-utilisation
- [x] 1. Hallmark SKILL.md, redesign.md, gates et layout lus (grep ciblés) · preuve : AUDIT.md, stamp de page.css
- [x] 2. Audit `sloplint --before` · preuve : .hallmark/before.txt
- [x] 3. deal/draw/scaffold, trois thèmes pesés · preuve : DESIGN.md § Picks, .hallmark/log.json
- [x] 4. Couleur de marque lue dans les fichiers du client (page.html, embeds) · preuve : tokens.css:12
- [ ] 5. Comp c1/c2 · non construits (phase 3) · preuve : comp.md (réponses Masse, Intervalle, Entrée)
- [x] 6. Pages statiques, build, pied KYW et noindex sur les 7 routes · preuve : grep dist/
- [x] 7. Sloplint --render --stage hero sur serveur (`--url`) · preuve : .logs/legacy2-sloplint.log (FAIL 34 faux positif : base.css:2 porte `html, body { overflow-x: clip }`, scrollWidth = largeur sur les 6 routes à 375 ; WARN 25 mesure 28ch du statement, phrase unique en display)

### Phase 2 (construction-2)
Motion : Garden dit « état seulement, pas de reveal ni de stagger » (themes/garden.md § Motion) : aucun reveal au scroll, donc 22 et F8 sans objet ; la seule animation est le coup de pinceau qui se pose une fois à l'arrivée (`brush-in`, clip-path, 700 ms, `--ease-out`), signature du site. Menu : popover (`#menu`) sous 60 rem, bouton `popovertarget`, ouverture 220 ms ease-out, fermeture 140 ms ease-in, Escape et clic extérieur natifs.
- [x] 2. Pas de `transition: all` ni d'animation de géométrie (10a) · preuve : page.css `.btn` (transition listée), `grep "transition: all"` vide
- [x] 6. `:focus-visible` partout, instantané (`transition: none`), 3:1 (26a, 15) · preuve : page.css `.btn:focus-visible`, `.field input:focus-visible`, `.hero__band, .statement { --color-focus: var(--color-accent-2) }` sur fond charbon
- [x] 7. Fallback reduced motion sur chaque animation ; contenu visible sans script (27, 62) · preuve : page.css fin (`.hero__brush { animation: none }`), base.css règle globale ; aucun contenu caché au repos (pas de reveal), premier onglet visible sans script, `.js` n'est plus requis
- [x] 17. Hero en `dvh`/`svh` (6a) · preuve : page.css `.hero { min-height: calc(100dvh - var(--nav-h)) }`, `100svh` à 40 rem
- [x] 19. Sticky non superposés (56) · preuve : nav `--z-sticky-nav` 300, barre mobile `--z-sticky` 200 en bas, `.split__head` sticky sous la nav (`top: nav-h + 24px`), `scroll-padding-top` = nav-h + 16px
- [x] 20. Radios-onglets gardés (53) · preuve : onglets en `<button role="tab">` + JS, premier panneau visible sans script, flèches/Début/Fin (scripts/page.js bloc 1, testé : ArrowRight active Brunch)
- [x] 21. Vidéo de fond (28a, 28b) · sans objet : aucune vidéo
- [x] 22. Reveal sous `.js` seulement (62) · sans objet : pas de reveal (Garden)
- [x] 23. États d'input (39a) · preuve : page.css `.field input/select` : bordure constante 1 px, ring en `outline` inset (`outline-offset: -3px`), hover, invalide (`aria-invalid`, couleur + texte), disabled par trois canaux (fond, bordure pointillée, curseur)
- [x] 24. Tooltip et auto-rotation (17, 18) · sans objet : ni tooltip ni boucle
- [x] 29. Aucun faux envoi (70) · preuve : `data-endpoint=""`, `novalidate`, message « Rien n’a été envoyé : ce formulaire n’est pas encore relié. » testé à la soumission valide (capture/mesure playwright : 5 champs invalides au clic à vide, 0 après saisie)
- [x] 30. SVG décoratifs `aria-hidden` (33) · aucun SVG ; icône du menu en CSS `aria-hidden`, pinceau `aria-hidden`
- [x] 48. Hover : un signal, conteneur, pas sur non-interactif, pas de rebond, pas de toast (11, 12, 16) · preuve : page.css bloc `@media (hover: hover)`
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52 px (26b, 39b) · preuve : `.btn` 48 px (44 en nav et barre), inputs 48 px, `.btn:active`, `.btn:disabled`, `(pointer: coarse)` 44 px sur liens
- [x] 56. Un primaire rempli (F4) · une seule recette `.btn--primary` ; ghost « Appeler » seulement dans la barre mobile
- [x] 58. Une recette de conteneur (F7) · filets et aplats, pilule limitée aux boutons ; un seul pattern de scroll : aucun (F8 sans objet)
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` (F16) · preuve : base.css:4-6
- [x] 72. Responsive · preuve : breakpoints 60rem et 40rem, `(hover: hover)`, `(pointer: coarse)`, tables restackées (défilement avec `tabindex`), `dvh`/`svh`, safe-area (`viewport-fit=cover`, gouttières `max(var(--gutter), env(...))`, barre mobile), scrollWidth − largeur = 0 sur les 6 routes à 375
- [x] 42. Nav de forme différente des 3 derniers logs · three-part (log : edge-aligned, masthead)
