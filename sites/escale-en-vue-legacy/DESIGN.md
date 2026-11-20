**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full : contenu et wiring gardés (téléphone, e-mail, Facebook, Instagram, carte Google), système et composition neufs.
- **Before** · `.hallmark/before.txt` (229 FAIL, 86 REFLEX, 21 WARN, surtout du CSS Divi) ; `AUDIT.md`.
- **Keeps** · one-page, nom « Escale en Vue ! », baseline, horaires 2026, adresse de Dave, téléphone `tel:+32493467971`, `mailto:info@escale-en-vue.be`, Facebook, Instagram, lien itinéraire `maps.app.goo.gl/ZLBSuP111Ss6wFLc9`. Dropped : « Sample Page », double « Accueil », flux de cinq posts Facebook (remplacé par les liens), bandeau « en construction », carrousel automatique (la planchette et les photos portent le lieu).
- **Files** · `src/pages/index.astro`, `404.astro`, `src/components/*.astro`, `src/styles/{tokens,base,page}.css`, `src/data/site.ts`.
- **Shape** · Feature Stack (draw 99e2b7), one-page, job : book, action : appeler (réservation par téléphone seulement).
- **Theme** · Squeeze, dealt 1/3, seed `restaurant-namur-seasonal-terrace-028c·65042563·2026-11-20·r0`. Écartés : Solstice (crème et brun, déjà quatre fois au journal partagé, et le site d'origine n'est pas chaud), Atelier (calcaire et ombre, trop froid pour une terrasse d'été). Squeeze : vert forêt saturé, comme la photo de héro et le logo vert d'origine, et un horaire en tuiles de jours (Range du thème).
- **Chrome** · nav : pilule flottante (nom, trois ancres, bouton « Réserver » en `tel:`) · pied : colophon block (nom, adresse, horaires en lien, réseaux, crédits) puis KywFooter.
- **Hero** · Stage (swap documenté : le draw donnait Poster, la meilleure photo source fait 1024 px, trop petite pour un plein cadre à 1920) : titre en trois lignes sur les colonnes 1 à 7, planchette portrait sur 8 à 12.
- **Signature** · quatre tuiles de jours en Gabarito 800 sur la bande verte claire : le jeudi au dimanche en un coup d'œil.
- **Sections** · Hero (planchette) · Horaires (tuiles, bande `--color-paper-2`) · Carte (Rows + fiche blanche + bandeau trappistes) · Lieu (mur de pierre, adresse) · Pied.
- **Material** · real : nom, horaires 2026, adresse, téléphone, plats cités sur Facebook (parmigiana, tagliatelles, poulet mariné), bières trappistes, produits locaux, végé · pictures : planchette, trappistes, mur de pierre, client (aucune photo de bibliothèque) · absent : prix, histoire, équipe, avis, abonnés (rien d'inventé, aucun `.fill`, aucun placeholder).
- **Comp** · 2 comps, c1 retenu (`comp.md`).
- **Sweep** · phase 3.

## Draw : échanges
- Poster, devient Stage (photo source 1024 px).
- « Prochaines heures libres en boutons » refusé : aucune réservation en ligne ; le bouton appelle.
- « Carte en Switcher midi et soir » refusé : aucune carte publiée ; Rows par offre, sans prix.
- Band et Figures évités, suivi. Photos : toutes celles du client, pas de `theme.mjs photos`.
- Test miroir : un voisin avec le même site (terrasse, bière, vue) n'obtiendrait pas un vert forêt drenched avec horaires en gros chiffres ; la combinaison tient.

## Tokens
Générés par le scaffold dans `src/styles/tokens.css` (jamais depuis le thème) : papier `oklch(41% 0.100 154)` + deux pas (`paper-2` 47 %, `paper-3` 34 %), encre `oklch(99% 0.005 90)`, muted `oklch(90% 0.030 150)`, filet `oklch(55% 0.100 154)`, accent pêche `oklch(83% 0.115 56)` (hover `accent-2` `oklch(74% 0.150 46)`, encre `oklch(30% 0.070 40)`), focus `oklch(88% 0.14 85)`, carte `oklch(97% 0.012 85)`. Polices : Gabarito (display, 800) et Manrope (500, 700), auto-hébergées dans `public/fonts/` (variables, sous-ensemble latin). Rayons 24 / 16 / 999. Échelle d'espacement et de texte du scaffold ; conteneur 1440, gouttière 64.

## Composants
- **Nav** : pilule `paper-3`, liens en pilules `paper-2` au survol, un seul bouton primaire pêche ; sous 40 rem les liens disparaissent (menu Popover en phase 2). Réf. `layout.md` § 7.
- **Hero** : Stage, un titre de six mots, une phrase de onze, deux actions, ligne de saison après les actions (note 58). Réf. `layout.md` § 6.
- **Horaires** : Schedule en `<ol>` de tuiles `paper-3` sur bande `paper-2`, `<time>` pour chaque borne, jours fermés dits en une ligne `--color-muted` (jamais barrés), pas d'icône. Dits une fois ici ; le pied renvoie par un lien. Jour courant : phase 2 (surface seule). Réf. `layout.md` § 5.16.
- **Carte** : Rows (titre col. 1, détail à droite, disponibilité en label), aucun prix publié donc aucune colonne de prix ; fiche blanche unique du thème (« alternative végé », appel) ; bandeau trappistes 16/7 avec légende-fait. Pas de tuile icône, pas de carte dans carte.
- **Lieu** : photo portrait sur 4 colonnes, texte sur 6, `<address>` en Manrope 700, bouton itinéraire et lien Facebook.
- **Pied** : colophon block, 3 colonnes, adresse, téléphone, mail, réseaux, `data-credits`, jamais de « Tous droits réservés ».
- **Photos** : `<figure>` + `data-slot`, `width`/`height`, hero `fetchpriority="high"`, autres `lazy`, `object-position`.

## Sur-utilisation
- [x] 1. Audit lancé (sloplint `--before`) · preuve : `.hallmark/before.txt`, `AUDIT.md`
- [x] 2. SKILL.md, redesign, anatomy book, gates lus · preuve : choix du hero, de la carte, de la fin
- [x] 3. Approche conservée nommée et dérogations · preuve : Keeps, Draw : échanges
- [x] 4. deal, draw, scaffold, stamp · preuve : `src/styles/page.css:1`, journal partagé
- [x] 5. Deux comps construits et un choisi · preuve : `comp.md`, `.hallmark/comps/c1.png`
- [x] 6. Pas de tiret cadratin ni demi-cadratin · preuve : contrôle Python sur `src/` et `dist/`
- [x] 7. Données : rien d'inventé, aucun prix · preuve : `src/data/site.ts` relu contre `dossier.md`
- [x] 8. sloplint source `--genre playful` · preuve : 0 FAIL, 0 WARN (après fusion des deux boutons primaires)
- [x] 9. sloplint `--render`, QA navigateur, motion, nav mobile : phase 2 et 3 · preuve phase 3 : QA captures (axe 0, erreurs 0, overflow false, LCP mobile 1544 ms, CLS 0), voir RAPPORT.md
- [x] 2. Pas de `transition: all` ni d'animation de géométrie (10a) · preuve : `grep "transition: all"` = 0 ; transitions listées en `background-color`, `border-color`, `box-shadow`, `opacity`, `transform` (`page.css`)
- [x] 6. `:focus-visible` partout, instantané, 3:1 (26a, 15) · preuve : `base.css:8` (focus `--color-focus` 5,78:1 sur le papier), `.carte__fiche .btn:focus-visible` en encre sur la fiche ; tab 1 = skip link, tab 2 = logo (Playwright)
- [x] 7. Reduced motion sur chaque animation, contenu visible sans script (27, 62) · preuve : `base.css` (règle globale) et `page.css` (menu, tuiles) ; Playwright `javaScriptEnabled: false` : titres et tuiles à opacité 1, menu qui s'ouvre sans script (Popover natif) ; `reducedMotion: reduce` : menu ouvert sans glissement, `scroll-behavior: auto`
- [x] 17. Hero en `dvh` (6a) · preuve : `page.css` `.hero__photo [data-slot] { max-height: calc(100dvh - 9rem) }`, aucun `vh`
- [x] 19. Sticky non superposés (56) · preuve : un seul élément fixe, `.nav` à `--z-sticky-nav` ; `scroll-padding-top: 7rem`, la section ancrée tombe à 112 px sous le haut à 375
- [x] 20. Radios-onglets gardés (53) · sans objet : aucun switcher (la carte est en Rows, aucune carte publiée)
- [x] 21. Vidéo de fond (28a, 28b) · sans objet : aucune vidéo
- [x] 22. Reveal sous `.js` seulement (62) · aucun reveal : Squeeze déclare « No reveal, no parallax, no loop » (`themes/squeeze.md` § Motion) ; le prompt limite à UN reveal, zéro respecte la limite et le thème
- [x] 23. États d'input (39a) · sans objet : aucun champ, la réservation est un `tel:` (le site d'origine n'avait pas de formulaire de réservation)
- [x] 24. Tooltip et auto-rotation (17, 18) · aucun tooltip, aucune rotation (carrousel d'origine supprimé en phase 1)
- [x] 29. Aucun faux envoi (70) · aucun formulaire ; `tel:` et `mailto:` conservés
- [x] 30. SVG décoratifs `aria-hidden` (33) · preuve : `Nav.astro` (icône du menu, `aria-hidden` + `focusable="false"`), logo du pied en masque CSS sur un `<span aria-hidden>`
- [x] 48. Hover : un signal, conteneur, rien sur les non-interactifs, pas de rebond ni de toast (11, 12, 16) · preuve : hover sous `@media (hover: hover)` sur boutons, liens de nav et lignes du menu seulement ; tuiles, lignes de carte et photos ne réagissent pas
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52 px (26b, 39b) · preuve : `.btn:active` (1 px), `.btn:disabled, [aria-disabled]` (3 canaux : couleur, curseur, barré) ; mesures à 1280 et 320 : boutons 45 à 48 px, aucun replié (« Appeler 0493 46 79 71 » à 320 : 48 px après réduction du padding de la fiche)
- [x] 56. Un primaire rempli (F4) · une recette pêche partout, jamais deux pleins côte à côte (le bouton de la nav et celui du hero sont à 600 px d'écart)
- [x] 58. Une recette de conteneur ; un pattern de scroll (F7, F8) · pilule limitée à la nav, aux tags et aux contrôles ; aucune chorégraphie de scroll (l'original n'était pas animé au scroll)
- [x] 63. `::selection`, `caret-color`, `scrollbar-color`, `accent-color` (F16) · preuve : `base.css:3-7`
- [x] 72. Responsive · deux breakpoints rem (60rem : menu Popover ; 40rem : nav compacte, fiche), `(hover: hover)`, `(pointer: coarse)` à 44 px, `dvh`, safe-area dans `--gutter` et `top` de la nav, aucun débordement de 320 à 1280 (`scrollWidth` = largeur)
- [x] 9. sloplint `--render --stage hero` · preuve : 0 FAIL, 0 WARN, 1 NOTE 58 (99 mots sur l'écran de la carte à 1440, contenu fixe)

## Phase 2 : composants et motion (construction-2)
- **Motion character** : brisk, état seulement (thème Squeeze) : pression 1 px à `--dur-micro`, anneau pêche à `--dur-short` sur ce qui est « choisi » (lien de section actif, jour courant). Aucun reveal, aucune boucle.
- **Nav** : pilule (inchangée) ; sous 60 rem les liens passent dans un menu `popover` (ouvre à `--dur-short` `--ease-out`, ferme à `--ease-in`, entrées en fondu décalé de 30 ms, Escape et clic extérieur natifs, focus rendu au bouton, fermeture au clic sur un lien) ; le bouton « Réserver » reste dans la pilule à toutes les largeurs ; lien actif par IntersectionObserver (`aria-current`) ; liens en `base + #ancre`, donc valides aussi depuis la 404.
- **Signature** : le jour courant porte un anneau pêche et la pastille « Aujourd’hui », seulement entre le 19 juin et le 6 septembre 2026 (fuseau Europe/Brussels, bornes dans `saison`) ; hors saison rien n'est affiché (on ne promet pas une ouverture inconnue).
- **Logo du client** : placé dans le pied en masque `currentColor` (pêche), décoratif.
