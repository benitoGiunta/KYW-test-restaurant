**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 3 pages (/, /menu/, /contact/) plus 404
- **Before** · 191 FAIL, 76 REFLEX (thème Divi/WordPress) ; la carte HTML et la palette crème et bordeaux restent
- **Keeps** · routes, lien Barestho, tel:, mailto:, Facebook, toutes les données de la carte et les horaires
- **Files** · create : tout le paquet sites/le-ponti-2-legacy ; delete : aucun. Dropped : sélecteur de langue FR/EN/NL (pas de contenu EN/NL fourni), bouton Barestho flottant (la réservation est dans l'en-tête et chaque section), 6 planches PNG de la carte (doublon de la carte HTML), bannière cookies Complianz (hors maquette)
- **Shape** · Catalogue, tirage 781aef, multipage conservé
- **Theme** · Solstice, dealt 3/3, seed restaurant-namur-italian-trattoria-472d·32280e9c·2026-11-10·r0. Écartés : Vellum (gothique, trop savant pour une trattoria), Spore (sombre, la table dressée claire du client en pâtirait)
- **Chrome** · nav : masthead en trois parties (liens, nom en Yeseva, téléphone et Réserver) · footer : index columns
- **Hero** · Ledge : champ photo pleine largeur, titre et action au pied
- **Signature** · le prix du menu 3 services, 40 €, en très grand sur la bande brune
- **Sections** · Hero · Façade (photo sans titre) · Catalogue de la carte (9 rubriques) · Menu 3 services (bande) · Horaires et adresse · Footer
- **Material** · real : photos du client (4), carte de 99 lignes, horaires, adresse · absent : histoire, équipe, avis, vins
- **Comp** · 2 construites, c1 retenue (comp.md)
- **Sweep** · phase 3

## Approche
Macrostructure Catalogue (11), empreinte Display serif|Sans|Filet noir 2 px|Pilule pleine|Pleine largeur|Aucun reveal. Posture calme, hero Ledge (tirage), réservation en tête de page. Dérogations : hero « texte et photo côte à côte » devient champ pleine largeur (Ledge) ; un seul pattern de scroll, aucun en phase 1. Test miroir : un voisin avec le même site ne combinerait pas Solstice cuit au bordeaux, un catalogue de neuf rubriques chiffrées et le prix du menu en signature ; changé : l'accent vermillon du thème devient le bordeaux du client (#701f2b, site-actuel/page.html).

## Thème
Solstice, long-light. Papier crème, encre brune, filets or, Yeseva One, Archivo, Archivo Narrow. Accent : bordeaux du client à la place du vermillon, jamais un second chaud ; l'or ne colore jamais un texte. Photos du client sans filtre sépia (`[data-slot] > img { filter: none }`), leur chaleur est la bonne.

```css
--color-paper: oklch(94% 0.03 80); --color-ink: oklch(27% 0.05 50);
--color-accent: oklch(34% 0.10 15); --color-gold: oklch(74% 0.14 75);
--font-display: "Yeseva One"; --font-body: "Archivo"; --font-outlier: "Archivo Narrow";
```
(source : src/styles/tokens.css)

## Composants
- **Carte** : sur l'accueil, grille de neuf cartes uniformes (filet noir, chiffre ou photo, nom, nombre de plats, fourchette de prix calculée des données) ; sur /menu/ Rows (nom et description à gauche, prix `tabular-nums` à droite, filets), index d'ancres, jamais de tuiles icône.
- **Horaires** : Schedule en `<dl>` avec `<time>`, lundi fermé en `--color-muted`, dit dans un puits (bordure 2 px, filet or, ombre dure) ; jour courant marqué par ui.js (fond papier-3, `aria-current="date"`) et ligne d'état « Ouvert maintenant » ou « Fermé » à l'heure de Bruxelles, d'après les horaires habituels.
- **Pied** : index columns (nom en Yeseva, adresse, contact, plan du site), crédits `data-credits`, puis KywFooter ; horaires non répétés.
- **Photo** : `<figure>` avec `data-slot` et `data-alt`, `width`/`height`, hero `fetchpriority="high"`, autres lazy, légende = un fait.
- **Boutons** : pilule bordeaux (Archivo Narrow 600) et lien souligné ; états hover, active, focus-visible.

## Sur-utilisation
- [x] 1. Hallmark SKILL.md, redesign.md, gates, patterns, layout, anatomy, genre, thème lus · preuve : cette phase
- [x] 2. deal, draw, scaffold, stamp · preuve : src/styles/page.css:1-3, .hallmark/log.json
- [x] 3. audit sloplint --before · preuve : .hallmark/before.txt
- [x] 4. deux comps avant build · preuve : .hallmark/comps/o1, o2
- [x] 5. sloplint --render sur /, /menu/, /contact/ · preuve : 0 FAIL, 0 REFLEX (/menu/ : 1 NOTE)
- [x] 2. Pas de `transition: all` ni d'animation de géométrie (10a) · preuve : grep `transition: all` vide ; transitions listées sur `transform`, `opacity`, couleurs (src/styles/page.css:14-16, fin de fichier)
- [x] 6. `:focus-visible` partout, instantané, 3:1 (26a, 15) · preuve : src/styles/base.css:7 (bordeaux sur crème), `.band :focus-visible` en or (page.css, fin)
- [x] 7. Fallback reduced motion sur chaque animation ; contenu visible sans script (27, 62) · preuve : mesure Playwright, reduced : opacités 1 ; sans JS : opacités 1, liens de nav visibles
- [x] 17. Hero en `dvh` (6a) · preuve : page.css `.hero__field .fig__frame` (`100dvh`), aucun `vh`
- [x] 19. Sticky non superposés (56) · preuve : nav `top: 0` z 300, index de la carte `top: var(--nav-h)` z 200 ; sur /menu/ l'index est à 82 px sous la nav, `scroll-padding-top` = nav + index
- [x] 20. Radios-onglets gardés (53) · preuve : non applicable, aucun switcher (carte en une page, index d'ancres)
- [x] 21. Vidéo de fond (28a, 28b) · preuve : non applicable, aucune vidéo
- [x] 22. Reveal sous `.js` seulement (62) · preuve : `.js.reveal-on [data-reveal]` (la classe `reveal-on` n'est posée que par ui.js, hors mouvement réduit) ; sloplint hero 0 FAIL
- [x] 23. États d'input (39a) · preuve : non applicable, aucun champ (réservation = lien Barestho conservé) ; états des boutons : hover, active, focus-visible, disabled
- [x] 24. Tooltip et auto-rotation (17, 18) · preuve : aucun tooltip, aucune boucle
- [x] 29. Aucun faux envoi (70) · preuve : aucun formulaire ; réservation = lien externe existant
- [x] 30. SVG décoratifs `aria-hidden` (33) · preuve : aucun SVG ; icône du menu en CSS (`.nav__bars`, `aria-hidden`)
- [x] 48. Hover : un signal, conteneur, pas de rebond, pas de toast (11, 12, 16) · preuve : carte `.cat` souligne le titre seulement, ease-out sans rebond ; tous les survols sous `@media (hover: hover)`
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52 px (26b, 39b) · preuve : `.btn`, `.nav__toggle`, `.menu__close` min-height 44 px, mesuré 44 à 375 et 320
- [x] 56. Un primaire rempli (F4) · preuve : une pilule bordeaux par vue ; le bouton de la nav et celui du hero sont la même recette ; en bande, le primaire passe en papier
- [x] 58. Une recette de conteneur, pilule pour contrôles seulement (F7) ; aucun pattern de scroll (F8) · preuve : cartes à filet, puits à ombre dure, pilule = boutons
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` (F16) · preuve : base.css:3-6, page.css (fin) ; scrollbar de l'index thémée
- [x] 72. Responsive (breakpoints rem, capacités, `dvh`, safe-area) · preuve : 60rem et 40rem, `(hover: hover)`, `(pointer: coarse)`, `env(safe-area-inset-top)` dans le menu ; mesures 1280, 375, 320 : scrollWidth = clientWidth sur les 3 pages
- [ ] 7 bis. balayage final, review finish · phase 3


## Phase 2 : décisions
- Nav masthead collante sous `.js` (z 300). Sous 60rem : barre de 64 px (nom, Réserver, Menu), menu en `<dialog>` modal (Échap, clic sur le fond, lien ou Fermer le ferment ; focus rendu au bouton). Sans JS ou sans `showModal`, les liens restent en seconde ligne.
- Un seul reveal : les neuf cartes de l'accueil (fondu et 14 px, 420 ms, ease-out, décalage de 70 ms par colonne). Caractère de motion : calm.
- Index de la carte collant sous la nav, rubrique en cours soulignée (IntersectionObserver), défilement horizontal en bande sur téléphone.
- Pas de formulaire, pas de switcher, pas de vidéo : la réservation reste le lien Barestho de l'original.
- Hero review : auto-notation (pas d'outil Agent en session d'agent). sloplint hero : 0 FAIL, 1 NOTE (lead de 19 mots, texte du client fixe). hero-review: self · ship · 0 findings.
- Comp : Masse : le champ photo prend 40 % du premier écran au lieu des 44 % de la comp (la nav de 82 px s'y ajoute) ; Intervalle : 64 px entre le champ et le titre comme dans la comp, titre en Yeseva plus gras que le serif de la comp ; Entrée : titre et phrase au pied, actions sous la phrase (la comp n'avait pas d'action). comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800).
