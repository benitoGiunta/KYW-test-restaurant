**Hallmark · v2.0.0 · variante legacy KYW**
- Redesign : full, contenu et routes gardés, système et composition neufs.
- Before : leservais.be (Wix), captures du 10/11/2026, `AUDIT.md`.
- Keeps : routes (accueil, groupes-privatisation, événements, carte-cadeau, contact), liens PDF cuisine et bar, `book.leservais.be`, réseaux, adresse « au départ du téléphérique », horaires, turquoise.
- Files : `src/styles/{tokens,base,page}.css`, `src/data/site.ts`, `src/components/*`, `src/pages/*`.
- Shape : accueil Counter sur structure Wix conservée ; 5 pages intérieures.
- Theme : Overprint (dealt 1/3, seed restaurant-namur-brasserie-cocktail-d06f·59136cc0·2026-11-10·r0). Écartés : Squeeze (vert forêt, éloigné du turquoise de marque), Halftone (crème et vermillon, pas de turquoise).
- Chrome : barre d'encre flottante, disque LS, un seul bouton plein par vue.
- Hero : Counter (titre, une phrase, réserver à côté de la photo du comptoir teintée turquoise).
- Signature : surimpression, un carré orange qui croise la photo turquoise (le moss se forme au croisement).
- Sections : hero, offres (bande d'encre), spécialités (lignes), groupes, lieu, horaires.
- Material : photographies du client, imprimées en une encre (niveaux de gris + multiply).
- Comp : 2 construites, c1 choisie (`comp.md`).
- Sweep : phase 3.
- Échanges avec le draw (4e6e56) : Marquee Hero remplacé par Counter statique (l'original n'avait pas de bandeau) ; « prochains créneaux en boutons » remplacé par la bande d'offres (aucune donnée de créneaux) ; « salle en pleine page sans titre » écarté (une seule photo du lieu, 1158 px de large).

# Système

## Approche
Macrostructure : accueil en une page + pages (empreinte Heading|Body|Divider|Button|Image|Reveal : grandes capitales, lignes sous filet, bouton plein, photo teintée, un reveal en phase 2). Posture : calme, un pattern de scroll au plus. Dérogations : carrousel d'affiches auto remplacé par la page Événements en lignes (18) ; photos de stock Wix écartées (83) ; `vh` en `dvh` (6a). Test miroir : un voisin avec le même site aurait une photo plein cadre et un titre centré ; ici titre en deux lignes à gauche, photo à droite et carré orange, le plan d'accueil commence par les offres (décision changée : bande d'encre juste après le hero).

## Thème
Overprint, papier journal gris, encre quasi noire, Anybody 900 large sur Archivo, deux encres : turquoise (la marque) et orange.

## Tokens
```css
--color-paper: oklch(91.5% 0.014 92); --color-ink: oklch(17% 0.008 60); --color-accent: oklch(65% 0.12 212);
--color-accent-2: oklch(71% 0.19 50); --color-focus: oklch(44% 0.1 220); --color-mix: oklch(35.5% 0.121 142);
--font-display: "Anybody"; --font-body: "Archivo"; --font-outlier: "Archivo Narrow";
--radius-card: 0; --radius-pill: 0; --rule-hair: 1px; --rule-bar: 4px; --display-stretch: 140%;
```
Le turquoise de marque (#1b7f87) est plus sombre que l'accent du thème : l'accent reste celui du thème (65 % de clarté) pour porter du texte d'encre ; le #1b7f87 n'apparaît plus qu'en photo.

## Controls
- Primaire : plein turquoise, texte encre, rayon 0, 48 px, bord 4 px d'encre.
- Secondaire : contour d'encre, même gabarit, rempli d'encre au survol.

## Motion
Caractère calme. Un seul reveal (`[data-reveal]`, opacity + translateY 1rem, 420 ms ease-out, une fois, IntersectionObserver, sous `.js.reveal-on` posé par le script) et une signature : le carré orange vient « en repérage » sur la photo turquoise (translate 24 % vers 0, 900 ms, une fois, au chargement). Aucun rebond, aucune boucle. Reduced motion : pas de `reveal-on`, pas d'animation, tout visible tout de suite.

## Composants
- Carte : Rows (nom large en colonne, prix à droite, filet 4 px au-dessus, filets fins entre lignes) ; page carte avec lien de saut par rubrique, tout visible sans script ; PDF cuisine et bar en liens.
- Horaires : Schedule en `dl`, `time` par ligne, jour courant en phase 2, dits une fois (section finale) et rappelés sur la page contact et carte.
- Pied : colophon (nom en grand, adresse et contacts, routes, réseaux) sur l'encre, puis KywFooter.
- Photo : `<figure data-slot data-alt data-credits>`, `width`/`height`, `srcset`, hero `fetchpriority="high"`, les autres lazy.
- Nav : slab (bande d'encre pleine largeur, filet turquoise 4 px, 76 px), sticky à `--z-sticky-nav`, Réserver dans la barre ; sous 60 rem les liens passent dans un `<div popover>` plein écran (`Menu` / `Fermer`, Échap et clic extérieur, ouvre en 220 ms ease-out, ferme en 143 ms ease-in) ; sous 30 rem le nom s'efface, le disque LS reste (lien d'accueil à `aria-label`). Sans support de Popover, les liens restent visibles dans la barre.
- Bouton : un primaire plein turquoise par vue, 48 px, huit états (repos, hover fond orange, focus-visible 3 px, active 1 px, disabled en trait pointillé gris, un `type="button"` par `<button>`).
- Horaires : script `Europe/Brussels`, ligne du jour en encre avec « · aujourd’hui » et statut « Ouvert maintenant, jusqu’à 1 h 00 » ou « Fermé pour le moment, ouverture à 9 h 00 » (gère la fermeture après minuit) ; sans script le tableau reste complet.
- Formulaire : aucun, la réservation est externe (book.leservais.be) et reste le lien tel quel ; pas de faux envoi.
- Switcher de carte : non retenu, la carte est une page à liens de saut, tout visible sans script.
- Favicon : `public/favicon.svg` (carré turquoise, carré orange, croisement moss).

## Sur-utilisation
- [x] 1. Hallmark Floor lié · preuve : sloplint src 0 FAIL, 0 WARN
- [x] 2. Deal puis draw tirés contre `$LOG` · preuve : `.hallmark/log.json`
- [x] 3. Stamp en première ligne de page.css · preuve : src/styles/page.css:1
- [x] 4. Comp avant build · preuve : .hallmark/comps/c1.png, c2.png
- [x] 5. Aucun tiret cadratin, insécable avant € · preuve : contrôle Python sur src/
- [ ] 6. Rendu navigateur (`--render`) · hero 0 FAIL 0 REFLEX ; pages carte et contact : 3 REFLEX chacune (44c, 77, 79, tests de hero appliqués à des en-têtes de page), à trancher en phase 3
- [x] 2a. Pas de `transition: all` ni d'animation de géométrie (10a) · preuve : grep 0, page.css:31, 40-60, 95-101
- [x] 6a. `:focus-visible` partout, 3:1 (26a, 15) · preuve : base.css:7, page.css:31, 49, 201
- [x] 7. Fallback reduced motion sur chaque animation, contenu visible sans script (27, 62) · preuve : page.css:96, 101, base.css:26 ; contrôle Playwright (opacité 1 sans JS et en reduced)
- [x] 17. Hero en `svh` (6a) · preuve : page.css:82
- [x] 19. Sticky non superposés (56) · preuve : un seul sticky, `.nav` page.css:40
- [x] 20. Radios-onglets : aucun (28 et 53 sans objet) · preuve : carte à liens de saut
- [x] 21. Vidéo de fond : aucune (sans objet)
- [x] 22. Reveal sous `.js.reveal-on` seulement · preuve : page.css:99
- [x] 23. États d'input : aucun champ (sans objet)
- [x] 24. Tooltip et auto-rotation : aucun
- [x] 29. Aucun faux envoi : aucun formulaire
- [x] 30. SVG décoratifs : aucun SVG inline
- [x] 48. Hover un signal par élément, sur le conteneur, pas de rebond ni de toast · preuve : page.css:34-36, 47, 58
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52 px · preuve : page.css:30-32, sloplint 39b levé (48 px)
- [x] 56. Un primaire plein par vue (F4) · preuve : Hero.astro, menu (calque au-dessus de la barre)
- [x] 58. Une recette de conteneur, pas de pilule ; un seul pattern de scroll (reveal) · preuve : `--radius-pill: 0`
- [x] 63. `::selection`, `caret-color`, `scrollbar-color`, `accent-color` · preuve : base.css:3-6
- [x] 72. Responsive : breakpoints 60 et 40 rem, `(hover: hover)`, `(pointer: coarse)`, `overflow-x: clip`, aucun débordement de 320 à 1440 sur 7 routes (mesuré) · preuve : page.css, journal c2-check
