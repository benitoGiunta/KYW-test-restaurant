**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full : contenu et wiring gardés, système et composition neufs.
- **Before** · AUDIT.md : one-page vert foncé, mono en capitales justifiées, marquees, polaroïds.
- **Keeps** · one-page, ordre maison, pâte, carte, réservation ; liens Barestho, tel, Instagram, Facebook, PDF de la carte ; ton rock ; les 3 photos clientes ; logo R inversé (SVG client).
- **Files** · `src/layouts/Base.astro`, `src/components/*`, `src/pages/{index,404}.astro`, `src/styles/{tokens,base,page}.css`, `src/data/{donnees.json,site.ts}`.
- **Shape** · Narrative Workflow (draw 2dda11), empreinte `Heading|Body|Rows|Button|Image|none`, one-page conservée.
- **Theme** · Overprint, dealt 2/3 (seed restaurant-namur-rock-n-roll-pizzeria-fb55·ab3eef39·2026-11-07·r0). Écartés : Darkroom (capitales hairline 200 en contradiction avec les capitales lourdes d'origine, ambre étranger à la marque), Midnight (bleu nuit, la marque est verte, ton trop feutré). Overprint : capitales larges lourdes comme l'original, teal et orange proches du vert et du saumon du client, ton affiche de concert.
- **Chrome** · nav : edge-aligned (logo au bord gauche, ancres et un seul bouton au bord droit ; Popover sous 60rem, forme changée en phase 2 pour s'écarter des trois derniers logs : slab, banner, ruled bar) (draw proposait une barre de recherche, refusée : aucune recherche sur une page) · footer : colophon block.
- **Hero** · Stage (le draw proposait Index, refusé : la carte n'ouvrait pas l'original ; Poster refusé : sources de 1687 px). Titre sur 6 colonnes, photo de table passée par la couche teal.
- **Signature** · la photo de table imprimée en duotone teal, et la figure « 48 h » sur la facture.
- **Sections** · Nav · Hero · Maison (texte + tableau des fournisseurs) · Pâte (photo, texte, trois chiffres) · Carte (Switcher par rubrique) · Venir (bande d'encre : photo salle, adresse, horaires, réservation) · Pied.
- **Material** · réel : carte, prix, adresse, téléphone, Barestho, 48 h, fournisseurs du site, 3 photos · pictures : photos clientes (aucun stock) · absent : avis, note, horaires fiables, e-mail.
- **Comp** · 2 built, c1 chosen (`comp.md`).
- **Sweep** · phase 3.
- **Stamps phase 2** · hero-review: self (pas d'outil Agent, aucun sous-agent frais possible) · 1 FAIL 40 (contraste « Fermé » sur l'encre) et 1 REFLEX 79 (169 px de vide sous le hero à 1440) · 2 resolved · comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800).

## Thème (tokens.css)
Overprint, newsprint : papier `--color-paper` 91,5 %, encre 17 %, passe 1 teal `--color-accent`, passe 2 orange `--color-accent-2`, moiré `--color-mix` non utilisé (aucune superposition peinte en phase 1). Anybody 900 à 140 % en capitales, Archivo 400 et 600, Archivo Narrow 600 pour les labels. Rayon 0, ni ombre ni dégradé. Photos en niveaux de gris, multipliées sur une passe.

## Composants
- **Carte** : Switcher en 4 rubriques (Pizzas, À grignoter, Desserts, À boire) en `role="tablist"`. Le draw proposait midi et soir : refusé, la carte n'a pas ce découpage. Chaque plat est une ligne : nom (Archivo 600), description dessous, prix tabulaire à droite en Anybody ; filets, pas de bordure ni d'ombre. Sans script, tous les panneaux sont visibles et la liste d'onglets est masquée.
- **Horaires** : `<dl>` de trois lignes (mardi à vendredi, samedi, dimanche et lundi), jour fermé en `--color-muted` sans barre, texte « à confirmer » en `.fill` car les sources se contredisent ; dits une fois, dans Venir.
- **Pied** : colophon block (logo masqué en grand, phrase de marque, liens Instagram, Facebook, téléphone, carte PDF, crédit photos), puis `<KywFooter />`.
- **Photo** : `<figure data-slot data-alt>`, `width` et `height`, `srcset` 800 et 1600, hero `fetchpriority="high"`, les autres `loading="lazy"`, légende = ce que la photo montre.
- Nav, bouton, formulaire, reveal : états et motion en phase 2 (états de base posés : survol, actif, focus).

## Sur-utilisation
- [x] 1. Hallmark audit lancé · preuve : AUDIT.md (sloplint --before non lancé, CSS externe)
- [x] 2. Macrostructure et posture nommées · preuve : Picks
- [x] 3. Deal, draw, scaffold, stamp · preuve : page.css:1-3, `.hallmark/log.json`
- [x] 4. Comp avant build · preuve : comp.md, `.hallmark/comps/c1.png`
- [x] 5. Floor tokens seulement (1) · preuve : sloplint page.css, 0 FAIL
- [x] 6. Aucun tiret cadratin (19) · preuve : contrôle Python sur `src/`
- [x] 7. Noindex et KywFooter sur chaque page · preuve : grep dist, index.html et 404.html
- [ ] 8. sloplint --render · en attente (phase 3) ; WARN 23 sur `.hero__photo::before` : c'est la passe 1 du thème, volontaire

## Phase 2 : motion, états, mobile (construction-2)
- **Motion** : still (Overprint, « nothing reveals, floats or loops »). Aucun reveal (le thème l'interdit : l'instruction « un reveal par page » cède au thème), aucune boucle, aucune transition : le survol tire le primaire de la passe 1 à la passe 2 d'un coup, `:active` assombrit d'un cran d'encre. `scroll-behavior: smooth` seulement sous `prefers-reduced-motion: no-preference`.
- **Nav** : edge-aligned, 72 px, sticky `--z-sticky-nav`, `--nav-h` unique, lien actif par `aria-current` (IntersectionObserver, posé après DOMContentLoaded). Sous 60rem : `<nav popover>` unique (même liste qu'au bureau, pas de doublon) avec bouton « Menu / Fermer » (`popovertarget`), Échap et clic dehors natifs, fermeture au clic sur un lien ; sous 40rem, « Réserver en ligne » passe dans le menu (le hero porte déjà le primaire). Repli sans Popover : liste sur une ligne.
- **Boutons** : huit états sur `.btn` (repos, survol sous `@media (hover: hover)`, focus 2 px, actif, désactivé par couleur + contour + curseur, `aria-disabled`), 44 px en nav, 48 px ailleurs, `white-space: nowrap` (49a). Un seul primaire plein par recette (teal), jamais deux côte à côte.
- **Réservation** : l'original renvoie vers Barestho, ce lien EST la réservation (conservé tel quel, « (Barestho) » en texte masqué). Aucun formulaire, donc rien à valider ni de faux envoi. Pas d'état « ouvert » : les horaires sont « à confirmer », un badge calculé dessus serait une invention.
- **Switcher de carte** : tablist natif au clavier (flèches, Début, Fin), états survol/actif/sélectionné, sans script tous les panneaux visibles, 2×2 au téléphone.
- **Responsive** : hero `min-height: min(100svh - nav, 52rem)`, photo 1:1 au bureau (plafonnée en `svh`) ; grilles de texte en `minmax(0, 1fr)` (le `nowrap` de l'adresse élargissait la piste) ; `overflow-x: clip` html et body ; `pointer: coarse` : cibles 44 à 48 px ; mesuré sans débordement à 320, 360, 375, 390, 768, 960, 961, 1024, 1280, 1440, 1920.
- **Finitions** : `::selection`, `caret-color`, `scrollbar-color` thémés ; logo masqué en `role="img"` ; la passe teal du hero couvre toute la photo (la bande grise du bas était un défaut).

## Sur-utilisation (phase 2)
- [x] 2. Pas de `transition: all` ni d'animation de géométrie (10a) · preuve : `grep transition page.css` = 0
- [x] 6. `:focus-visible` partout, instantané, 3:1 (26a, 15) · preuve : base.css:5, Tab sur 9 éléments = 2 px `--color-focus`
- [x] 7. Reduced motion et contenu sans script (27, 62) · preuve : aucune animation ; test `javaScriptEnabled: false` : 0 panneau caché, menu Popover natif
- [x] 17. Hero en `svh` (6a) · preuve : page.css `.hero { min-height: min(calc(100svh - var(--nav-h)), 52rem) }`
- [x] 19. Sticky non superposés (56) · preuve : un seul sticky (nav), `scroll-padding-top` 96 px, nav top 0 et section à 96 px après clic
- [x] 20. Radios-onglets gardés (53) · preuve : sans objet, onglets ARIA gardés par `.is-ready`
- [x] 21. Vidéo de fond (28a, 28b) · sans objet, aucune vidéo
- [x] 22. Reveal sous `.js` seulement (62) · sans objet, aucun reveal (thème still)
- [x] 23. États d'input (39a) · sans objet, aucun champ ; états `.btn` posés
- [x] 24. Tooltip et auto-rotation (17, 18) · sans objet, aucun
- [x] 29. Aucun faux envoi (70) · réservation = lien Barestho
- [x] 30. SVG décoratifs `aria-hidden` (33) · aucun svg dans `src/`, logo en `role="img"` avec label
- [x] 48. Hover : un signal, conteneur, pas de rebond ni toast (11, 12, 16) · page.css:`@media (hover: hover)`
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52 px (26b, 39b) · page.css `.btn`, `.tabs__b`
- [x] 56. Un primaire rempli (F4) · teal seul
- [x] 58. Une recette de conteneur, un pattern de scroll (F7, F8) · rayon 0 partout, aucun scroll pattern
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` (F16) · base.css:4-5
- [x] 72. Responsive · mesures ci-dessus
- [ ] 8. sloplint --render · hero stage : 0 FAIL, 8 WARN (23 volontaire, 28a lazy hors LCP, 49 sans objet depuis `nowrap`) ; passe complète en phase 3
