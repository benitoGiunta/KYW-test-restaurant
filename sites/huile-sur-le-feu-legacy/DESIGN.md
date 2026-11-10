**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 6 pages (/, /restaurant/, /menu/, /boutique/, /contact/, 404)
- **Before** · Floor 515 FAIL (dont 269 de gate 48) · Reflex 42 · tout en bordeaux nuit, capitales espacées, focus absent ; la carte, le flambage et la voix restent
- **Keeps** · routes, liens (Barestho, tel:, mailto:, Facebook, Instagram, Itinéraire), la carte complète, horaires, les photos, la couleur bordeaux et la flamme de la marque, la police Marcellus
- **Files** · create : tout `sites/huile-sur-le-feu-legacy/` · edit : aucun autre dossier · delete : aucun
- **Shape** · Photographic (08, kept) avec corps Bento (draw 47923d), genre editorial, job : réserver, l'action dans la nav, le hero et la fin
- **Theme** · brand (couleurs lues dans le CSS du site : #3f1420, #2a0d16, #aaab3d, #f08a32, #e32929 ; polices Marcellus + Nunito Sans), dealt 0/3, seed restaurant-namur-mediterranean-italian-b345·716cc7a0·2026-11-10·r0. Écartés : Vellum (blackletter ultramarine : mauvaise matière), Squeeze (marché de fruits vert forêt : ton enfantin), Atelier (calcaire luminous bleu ardoise : fait oublier le feu). Aucun ne porte le bordeaux, la marque est imposée, scaffold `--brand`.
- **Chrome** · nav : barre bordeaux, logo à gauche, cinq liens, un seul bouton flamme · footer : statement (une phrase, puis liens, réseaux, mentions) puis KywFooter
- **Hero** · Poster (kept) : 04 flambage plein cadre, texte bas gauche, titre 5 mots, une phrase de 11 mots, une action pleine et un lien
- **Signature** · le cadre flambé sous voile bordeaux avec l'unique bouton orange flamme
- **Sections** · Hero · Teaser carte (Rows) · Salle (photo pleine largeur, sans titre) · Bento 4 tuiles (huile, pâtes, boutique, histoire) · Horaires (Schedule) + réservation · Pied statement
- **Material** · real : adresse, horaires, tel, carte, menus, 2005, Pouilles, Oliviers & Co, 13 photos du client · pictures : photos client, aucune photothèque · absent : note, avis, presse, chiffres, logos
- **Comp** · 2 built, no key · c1 chosen (`comp.md`)
- **Hero review** · `hero-review: self · fix · 1 finding · 1 resolved` (pas d'outil Agent en session : auto-notation sur `review-hero.md` et les quatre captures `--stage hero` ; finding : à 1920 x 1080 le hero plafonné à 56rem laissait une bande crème de 100 px sous le pli, plafond porté à 60rem, recapturé)
- **Nav shape** · edge-aligned sur barre bordeaux (logo à gauche, cinq liens et « Réserver » à droite) ; sous 60rem, bouton « Menu » + panneau Popover ; différent des 3 derniers logs (slab, banner, floating pill)
- **Sweep** · phase 3

## Approche (conservée)
Macrostructure 08 Photographic, empreinte `Heading small on plate|Rows and Bento|Image edge|Typographic link|Full bleed client photo|None`. Posture : mêmes routes (/, /restaurant, /menu, /boutique, /contact) ; hero Poster ; calme (le site animé WebGL passe à un reveal au plus, phase 2). Dérogations : sélecteur de langue EN/IT/NL, bannière de cookies, /privacy, /cookies et widget Barestho en page abandonnés (`dropped`, maquette sans traduction ni mentions ; la réservation garde l'URL Barestho et le téléphone) ; gabarit hero + 3 atouts + CTA gardé en séquence, composition neuve (waive 8 non nécessaire, Bento) ; `vh` en `dvh` ; carte menu en rangées. Test miroir : un voisin avec le même site, même hero et bandes bordeaux ? Le papier crème à bande bordeaux et la tuile Bento sans photo en tête sont le choix propre ; changé : le hero ne centre pas (bas gauche) et l'histoire passe en tuile, pas en section.

## Thème
Brand sur papier clair (`--color-paper` crème huile), bandes drenchées bordeaux (`--color-paper-3`), olive pour le filet de citation, flamme orange pour l'action sur fond sombre, flamme rouge profond (`--color-accent`) pour l'action sur fond clair. Marcellus (marque) en titres, Hanken Grotesk en texte (Nunito Sans d'origine remplacée pour sortir du gabarit d'origine). Valeurs : `src/styles/tokens.css`.

## Composants
- **Carte** : Rows (nom col. 1, prix à droite `tabular-nums`, description dessous, filet), `Rows.astro` ; index de catégories collant sur /menu ; menus Gourmet et Enfants en deux tuiles (7 et 5), pas de carte dans carte. Switcher midi/soir refusé : la carte ne les distingue pas.
- **Horaires** : Schedule en `<dl>` sept jours, fermé en `--color-muted` (pas barré), pas d'icône ; jour courant en phase 2. Dits une fois, à la fin de chaque page.
- **Pied** : statement « Une huile choisie pour chaque plat. » (phrase du site /menu), colonnes liens, réseaux, mentions, crédit photo ; pas de « Tous droits réservés », pas de newsletter ; un `<div role="group">`, jamais un second `<footer>`.
- **Photo** : `Photo.astro`, `<div data-slot data-alt data-credits>` avec `width`/`height`, `srcset` 800w/native, `object-position`, hero `fetchpriority="high"`, autres `loading="lazy"`.
- **Nav** : `Nav.astro`, `<button popovertarget>` suivi de `<nav popover>` dans le DOM (ordre de tabulation), `@starting-style` + `allow-discrete` ; desktop : le popover est neutralisé (`position: static`), mobile : panneau plein largeur sous la barre (64 px), liens de 52 px ; un petit script ferme le panneau au clic et tient `aria-expanded`. Sans script le popover s'ouvre quand même (déclaratif).
- **Bouton** : une recette `.btn` (primaire accent) et sa variante `.btn--flame` sur fond sombre ; huit états : repos, `:hover` sous `(hover: hover)`, `:focus-visible` (outline 2 px, 3,4 à 7,9:1), `:active` (translateY 1 px), `:disabled`/`aria-disabled` par couleur, tiret et curseur ; loading sans objet (aucun envoi). Pas de formulaire : la réservation est le lien Barestho conservé (`dropped` : widget en page).
- **Horaires** : jour courant par script (fuseau Europe/Brussels), `aria-current="date"`, barre accent et mention « Aujourd’hui » ; sans script rien ne change.
- **Catégories de la carte** : index collant, catégorie visible marquée `aria-current` (IntersectionObserver), défilement du rail au téléphone, fondu du bord droit.
- **Mouvement** (calme) : signature « le feu prend » : la photo du flambage se pose (scale 1,06 à 1, 1,6 s) pendant qu'un halo flamme monte (opacité, 1,8 s), une fois, sans boucle ; un seul reveal (opacité + translation 16 px, 420 ms, décalage 70 ms par rang, sur tuiles, photos et rangées d'index) posé par script sous `.js [data-reveal]` ; tout est neutralisé sous `prefers-reduced-motion: reduce`.

## Sur-utilisation
- [x] 1. Tokens uniquement, aucune couleur ni police au-delà du bloc :root · preuve : sloplint page.css, 0 FAIL 48
- [x] 2. Pas de capitales espacées ni points médians, tirets cadratins nuls · preuve : scan Python des six pages, 0 tiret
- [x] 3. Hero ≤ 7 mots, une phrase, deux actions, visible à 1280 x 800 · preuve : `src/pages/index.astro:16-24`, sloplint sans 44b
- [x] 4. Pied KYW sur chaque page, `noindex` partout · preuve : grep `kyw-signature` et `noindex` sur les six HTML de dist
- [x] 5. Aucun chiffre ni avis inventé · preuve : `src/data/carte.json` issu de donnees.json ; aucune note, aucun avis
- [x] 2. Pas de `transition: all` ni d'animation de géométrie (10a) · preuve : grep 0 occurrence ; transitions listées en `transform`/`opacity`/couleurs, `page.css` § Controls et § Nav
- [x] 6. `:focus-visible` partout, instantané, 3:1 (26a, 15) · preuve : `base.css` (outline 2 px, aucune transition) ; contraste calculé : focus 3,85 sur papier, 3,37 sur papier 2, flamme 6,99 sur bordeaux ; Tab réel sur 9 arrêts, tous `solid 2px`
- [x] 7. Fallback reduced motion sur chaque animation, contenu visible sans script (27, 62) · preuve : `page.css` § Hero (`no-preference`) et § Reveal ; test Playwright : reduced = 0 tuile masquée, animation `none` ; sans JS = 0 masquée
- [x] 17. Hero en `dvh` (6a) · preuve : `.hero { min-height: min(calc(100dvh - var(--nav-h)), 60rem) }`
- [x] 19. Sticky non superposés (56) · preuve : seule la barre de catégories est collante (`--z-sticky`), l'en-tête est `position: relative` (`--z-sticky-nav`)
- [x] 20. Radios-onglets gardés (53) · preuve : sans objet, aucun switcher (carte non scindée midi/soir)
- [x] 21. Vidéo de fond (28) · preuve : sans objet, aucune vidéo
- [x] 22. Reveal sous `.js` seulement (62) · preuve : `page.css` `.js [data-reveal]`, attribut posé par le script de `Base.astro`
- [x] 23. États d'input (39a) · preuve : sans objet, aucun champ ; `.btn:disabled` défini par trois canaux
- [x] 24. Tooltip et auto-rotation (17, 18) · preuve : aucun tooltip, aucune rotation, aucune boucle
- [x] 29. Aucun faux envoi (70) · preuve : aucun formulaire ; réservation = lien Barestho conservé
- [x] 30. SVG décoratifs `aria-hidden` (33) · preuve : aucun SVG en ligne ; logo en `<img alt>`, halo et voile `aria-hidden`
- [x] 48. Hover : un signal, conteneur, pas de rebond, pas de toast (11, 12, 16) · preuve : `@media (hover: hover)` ; aucun hover sur tuile ou photo ; easing `--ease-out`
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52 px (26b, 39b) · preuve : `.btn` 52 px, nav 48 px, bouton Menu 44 px, logo 44 px ; test à 375 et 320 : plus petite cible 44 px (hors lien KYW)
- [x] 56. Un primaire rempli (F4) · preuve : sloplint ANSWERED F4 (`.btn--flame` sur sombre, `.btn` sur clair, jamais côte à côte)
- [x] 58. Une recette de conteneur, un pattern de scroll (F7, F8) · preuve : tuiles `.tile`, aucune pilule ; aucune chorégraphie scroll
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` (F16) · preuve : `base.css`
- [x] 34. `overflow-x: clip` sur html et body · preuve : `base.css:2` ; sloplint `src` signale FAIL 34 sur `Base.astro` parce que `page.css` est importé en frontmatter et que son `@import` n'est pas suivi (faux positif de scan, confirmé par `scrollWidth` = largeur de fenêtre sur 6 pages à 375 et 320)
- [x] 72. Responsive · preuve : breakpoints 60rem et 40rem (+ 22rem), `(hover: hover)` et `(pointer: coarse)`, 6 pages sans débordement à 375 et 320, safe-area par `viewport-fit=cover`, gouttière 16 px
- [ ] 8. Revue hero (auto-notation faite, voir Hero review), sloplint final, captures · phase 3
- [ ] 8. Revue hero, sloplint final, captures · phase 3
