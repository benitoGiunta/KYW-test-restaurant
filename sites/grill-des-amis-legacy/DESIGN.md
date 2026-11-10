# Design : Le Grill des amiS (variante legacy)

**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full : contenu et wiring gardés, système et composition neufs
- **Before** · `.hallmark/site-actuel/`, `AUDIT.md`
- **Keeps** · routes réserver, carte, à propos, traiteur, contact, spécial viandes ; liens `tel:` et réservation Wix ; losange GS ; photos du client ; devise
- **Files** · `src/styles/{tokens,base,page}.css`, `src/layouts/Base.astro`, `src/components/{Nav,Fig,Plats,Horaires,Footer}.astro`, `src/data/{site.ts,carte.json}`, 8 pages
- **Shape** · Photographic (08, gardée : l'original ouvrait sur une photo plein écran). Tirage 5306cc proposait Feature Stack, Stage, slab, letter close : slab et letter close pris, Feature Stack et Stage refusés (macrostructure et posture gardées), `waive 8`
- **Theme** · Darkroom, dealt 1/3 (seed restaurant-namur-steakhouse-grill-694e·8a7750ac·2026-11-10·r0), colourway rouge. Écartés : Vellum (parchemin clair, gothique, étranger à la salle noire), Midnight (bleu nuit, la marque est rouge et or)
- **Chrome** · nav slab (barre pleine largeur, logo, cinq liens, Réserver) · pied letter close (« Pour le plaisir de nos amis. », Elise et Gaëtan, adresse, liens) puis KywFooter
- **Hero** · Poster (gardé) : grill et pince plein cadre, plaque basse à gauche sur la zone la plus sombre
- **Signature** · la pièce saisie à la pince au-dessus du feu, sous un titre en capitales fines
- **Sections** · Hero · Grid (trois temps) · Rows (carte) · Showcase (verres) · Band (réservation et horaires) · Pied
- **Material** · real : adresse, téléphone, horaires, carte complète, copie du client, 13 photos · absent : avis, réseaux, e-mail, année d'ouverture, presse
- **Comp** · 2 built, no key, c1 choisie (`comp.md`)
- **Sweep** · phase 3

## Approche

Macrostructure Photographic (08), empreinte `Sofia 200|Barlow|Filets 1 px|Bouton plein rouge|Photo plein cadre|Aucun reveal`. Posture : Poster, calme, aucune chorégraphie de scroll. Dérogations : médaillons du hero retirés (18), marquee retiré, témoignages Wix retirés (46a), formulaire d'inscription retiré (85), galeries /terrasse et /plats repliées. Test miroir : un voisin avec le même site aurait une steakhouse noire et or en Poster ; la décision différente est le rouge de marque contre l'ambre du thème et les photos gardées en couleur.

## Thème

Darkroom, colourway rouge : fond noir chaud (`--color-paper` oklch 12,5 % 0,008 55), encre blanche cassée, signal `oklch(62% 0.19 32)`, `--color-accent-deep` `oklch(44% 0.16 32)`. Sofia Sans Extra Condensed 200 en capitales (titres, prix), Barlow (texte). Rayon 0, filets 1 px, grain sur deux bandes au plus. Couleur de marque : le rouge vif du losange client est lu sur les captures, le colourway rouge du thème s'en approche sans le copier. Écart au thème : les photos restent en couleur (le rouge des verres et du feu est l'identité), `filter: none` dans `page.css`.

## Composants

- **Carte** : Rows (nom à gauche, prix à droite en `tabular-nums`, description sous le nom), index sticky par ancres (le midi, entrées, plats, grillades, bambins, boissons), filets de 1 px, jamais de tuiles. Nom et prix visibles au téléphone. Référence : `layout.md` § 5.5.
- **Horaires** : Schedule en `<dl>`, `<time>`, jours fermés en `--color-muted` non barrés, jour courant par la surface `--color-paper-3`, dits une fois par page, dans le Band.
- **Pied** : letter close, un seul logo KYW dans le paquet, adresse, téléphone, liens, `data-credits`.
- **Photo** : `<figure data-slot data-alt>` avec `width`/`height`, hero `fetchpriority="high"`, autres lazy.

## Sur-utilisation

- [x] 1. Audit lancé avant la refonte · preuve : `AUDIT.md`, `.hallmark/before.txt` non produit (HTML Wix non exécuté), captures lues
- [x] 2. Floor lu en entier · preuve : stamp `src/styles/page.css:1`
- [x] 3. Deal puis draw tirés dans le journal partagé · preuve : `.hallmark/log.json` (draw 5306cc)
- [x] 4. Scaffold du thème, tokens uniques · preuve : `src/styles/tokens.css`
- [x] 5. Stamp, critique, waivers dans les 40 premières lignes · preuve : `src/styles/page.css:1-20`
- [x] 6. Deux comps avant build, choix écrit · preuve : `comp.md`
- [x] 7. sloplint avec rendu, 0 FAIL · preuve : `.logs/gda-sloplint.log` (accueil : 0 FAIL, 0 REFLEX)
- [x] 8. REFLEX des pages intérieures · preuve : `.logs/gda-l2-slop-pages.log` (6 pages : 0 FAIL, 0 REFLEX, 0 WARN ; waive 77 et 71 écrits dans `page.css:9-10`, 44c et 79 ne se déclenchent plus)
- [x] 2. Pas de `transition: all` ni d'animation de géométrie (10a) · preuve : `page.css` (transitions listées : background-color, color, border-color, opacity, translate ; animation `settle` en `scale`)
- [x] 6. `:focus-visible` partout, instantané, 3:1 (26a, 15) · preuve : `page.css` `:focus-visible` et `.btn:focus-visible` (outline 2 px `--color-focus`, aucune transition sur l'outline), arrêts clavier mesurés `solid 2px` (`.logs/gda-l2-check.log`)
- [x] 7. Fallback reduced motion sur chaque animation ; contenu visible sans script (27, 62) · preuve : `page.css` fin de fichier (`settle` et `.slab__panel` en `animation: none; transition: none`), mesure `reduced hero anim=none` ; aucun contenu masqué au repos, `popover` natif, premier panneau de la carte sans script
- [x] 17. Hero en `dvh` (6a) · preuve : `.hero { min-height: calc(100dvh - var(--bar-h)) }` ; 320x568 : hero 504 px, boutons finissent à 468 px
- [x] 19. Sticky non superposés (56) · preuve : nav `--z-sticky-nav` (300) à `top: 0`, index de la carte `--z-sticky` à `top: calc(var(--bar-h) - 1px)`, `scroll-padding-top` de la carte `bar-h + 7rem`
- [x] 20. Radios-onglets gardés (53) · n/a : aucun onglet sur ce site
- [x] 21. Vidéo de fond (28a, 28b) · n/a : aucune vidéo
- [x] 22. Reveal sous `.js` seulement (62) · n/a : aucun reveal (Darkroom, empreinte « Aucun reveal »)
- [x] 23. États d'input (39a) · n/a : aucun champ (la réservation est le lien Wix d'origine) ; états du bouton : normal, hover, focus-visible, active, disabled (`.btn:disabled, .btn[aria-disabled]`)
- [x] 24. Tooltip et auto-rotation (17, 18) · n/a : aucun tooltip, aucune boucle
- [x] 29. Aucun faux envoi (70) · n/a : aucun formulaire, `Réserver` pointe vers `https://www.legrilldesamis.be/reserver` et `tel:`
- [x] 30. SVG décoratifs `aria-hidden` (33) · preuve : `grep -c "<svg" src` = 0 (le grain est un data-URI en `::after`)
- [x] 48. Hover : un signal, conteneur, pas sur non-interactif, pas de rebond, pas de toast (11, 12, 16) · preuve : `page.css` hover sous `@media (hover: hover)` sur liens, boutons et index seulement ; easing `--ease-out`, aucun toast
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52 px (26b, 39b) · preuve : `.btn:active`, `.slab__toggle:active` ; mesure 320 à 1440 px sur 8 pages : plus petit contrôle 44 px, aucun bouton replié
- [x] 56. Un primaire rempli (F4) · preuve : nav et « Voir la carte » en contour, un seul plein par écran (hero) ; `grep btn--primary src/pages`
- [x] 58. Une recette de conteneur, pilule limitée (F7) ; un pattern de scroll (F8) · preuve : rayon 0 partout, aucune chorégraphie de scroll
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` (F16) · preuve : `base.css` (caret et scrollbar), `page.css` `::selection` rouge sur papier
- [x] 72. Responsive · preuve : breakpoints 60rem et 40rem, `(hover: hover)` et `(pointer: coarse)`, `overflow-x: clip` sur html et body, aucun débordement à 320, 375, 768, 1024, 1440 sur 8 pages (`.logs/gda-l2-check.log`)

## Phase 2 : interactions

- **Nav mobile** : `<button popovertarget>` et `<nav popover>` sous 60rem, ouverture par transition `opacity` + `translate` (`@starting-style`), Échap et clic extérieur ferment, le focus revient au bouton, `aria-expanded` suivi par l'événement `toggle`, fermeture automatique si la fenêtre repasse au bureau. « Réserver » reste dans la barre (contour, 44 px).
- **Mouvement** : caractère still. Un seul geste, le réglage lent de la photo du hero (`scale` 1,06 à 1 en 1,8 s), désactivé en mouvement réduit. Défilement doux seulement hors mouvement réduit.
- **États** : jour courant des horaires par surface, filet rouge et mot « aujourd’hui » (pas la couleur seule) ; index de la carte avec entrée courante `aria-current="true"` (IntersectionObserver, sans effet si le script manque).
