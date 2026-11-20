**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 5 pages (/, /our-menu/, /carte-des-boissons/, /about-us/, /contact/) + 404
- **Before** · Floor 264 FAIL cumulés (CSS WordPress), Reflex 62 · carte lisible, palette bleu et blanc, « Saveurs grecques » : restent ; hero centré, dégradés, blanc pur, avis vide : partent
- **Keeps** · les 5 routes, liens externes (Facebook, Instagram), `tel:` 081 20 07 47, `mailto:`, la copie « Depuis 1986… », toute la carte et ses prix, la palette bleu marine et blanc (l'ink-blue de Specimen)
- **Files** · create : tout `sites/el-greco-legacy/` · delete : none
- **Shape** · Catalogue (tirage c9eb51) à la place de Photographic (macrostructure d'origine) : l'original n'a aucune photo du restaurant, seulement du stock ; la carte porte donc la page. Posture calme gardée.
- **Theme** · Specimen, dealt 1/3 (seed restaurant-namur-greek-family-4640·a914d13e·2026-11-20·r0) : papier avoine, encre chaude, Bodoni Moda, un bleu encre qui reprend le bleu marine du client. Écartés : Vellum (gothique, trop nordique pour du grec), Ink (teal, perd le bleu du client).
- **Chrome** · nav : barre alignée à gauche, logo du client, liens, Réserver (tirage : barre de recherche, écartée, aucun contenu à chercher) · footer : statement (nom à l'échelle d'affiche, adresse, liens)
- **Hero** · Index : titre sur les colonnes 1 à 7, les six spécialités avec prix sur 9 à 12 (le tirage dit « saison ou date », absent des données). Original : Poster.
- **Signature** · « Saveurs grecques » à l'échelle d'affiche, traversé de repères bleu encre à la ligne de base et à la hauteur d'x
- **Sections** · Hero (index) · Split (histoire + photo) · Rows (accès menu et boissons) · Grid (trois avis) · Band + Schedule (horaires et adresse) · Footer. Pages internes : en-tête, Rows par rubrique, bande de réservation ink.
- **Material** · real : carte et prix, adresse, téléphone, e-mail, « Depuis 1986 », trois avis Trustindex mot pour mot · pictures : 2 photos de stock Pexels (coupole bleue, clocher), `placeholder`, duotone encre sur avoine · absent : photos du restaurant, équipe, note et nombre d'avis, horaires lundi à mercredi
- **Comp** · 2 built, no key · c1 chosen
- **Sweep** · phase 3

## Approche (conservée)
- Macrostructure d'origine : 08 Photographic (hero photo plein cadre + liste de spécialités). Empreinte kept : `Heading: display centré | Body: courts | Divider: filet | Button: bleu marine | Image: plein cadre | Reveal: slider`. Nouvelle : Catalogue, `Heading: Bodoni à l'échelle d'affiche | Body: Geist 17 px | Divider: filets 1 px et double filet | Button: rectangle encre | Image: une plaque duotone | Reveal: aucun`.
- Posture : mêmes cinq routes ; calme ; aucun pattern de scroll.
- Dérogations : hero Poster vers Index (pas de photo du lieu, la carte ouvre) ; slider auto retiré (18) ; `vh` jamais utilisé (6a) ; photo plein cadre retirée, une plaque par page (Specimen : une photo au plus, 83) ; `waive 8` (séquence gardée, composition neuve).
- Test miroir : un voisin Specimen en restauration ferait un hero Poster sur photo. Ici : index de prix au premier écran, repères sur le titre ; décision changée : le hero ne porte aucune photo.

## Thème (tokens.css, lu dans le fichier)
Papier `--color-paper` oklch(96,5 % 0,016 82), encre `--color-ink`, accent `--color-accent` oklch(45 % 0,18 262) (bleu encre, moins de 5 % de l'écran : liens, focus, repères). Titres Bodoni Moda 400, `opsz` 96, corps Geist 17 px (base 16 px minimum), chiffres en Geist Mono tabulaire. Surfaces : filets 1 px, double filet une fois par page (index du hero, pied), bande `--color-paper-2` pour les horaires, bande encre pour la réservation. Pas d'ombre, pas d'arrondi.

## Composants
- **Carte** : Rows, titre en `--text-title` colonne 1, prix à droite en mono tabulaire, description dessous en `--color-muted` ; rubriques ancrées (liens en tête de page) ; pas de tuile icône, pas de carte dans carte ; filets seuls ; nom et prix visibles à 375 px (grille `1fr auto`). Les pages carte lisent `src/data/carte.json` (issu de `donnees.json`, apostrophes et insécables corrigés).
- **Horaires** : Schedule en `<dl>` avec `<time>`, jour sans horaires en `--color-muted` (jamais barré), pas d'icône ; dits une fois par page (accueil et contact), mention « à confirmer » ; un `.fill` (lundi à mercredi).
- **Pied** : statement, nom à l'échelle d'affiche, adresse, e-mail, téléphone, liens, réseaux, `data-credits` ; horaires par un lien vers `/contact/#horaires` (dits une fois) ; puis `<KywFooter />`.
- **Photo** : `<figure data-slot data-alt data-placeholder>`, `width`/`height`, `srcset`, hero de page interne `fetchpriority="high"`, autres `lazy`, légende = un fait (« photographie de stock, pas le restaurant »).
- **Nav** (phase 2) : forme « edge-aligned bar » (différente des 3 derniers logs : floating pill, floating pill, slab), 80 px, sticky à `--z-sticky-nav`, logo lié à l'accueil (`aria-label`), liens en casse de phrase non trackés, « Réserver » à droite. Sous 60rem : `<nav popover>` ouvert par un bouton « Menu / Fermer » (popover natif : Échap, clic extérieur), liens de 56 px, ouverture 220 ms `opacity`/`transform`. Skip link gardé. Sans support du popover : liens en ligne (`@supports not selector(:popover-open)`).
- **Bouton** : un seul remplissage ink par page (primaire), secondaire contour 1 px ; 48 px (nav 44 px) ; états : repos, `:hover` (fond), `:focus-visible` (anneau 2 px, 3:1), `:active` (1 px vers le bas, primaire passe à l'accent), `:disabled` (trois canaux : fond, bordure en tirets, curseur), `transition` listée sur `background-color`/`color` ; tous les `<button>` ont un `type`.
- **Formulaire de réservation** (`contact/`) : `data-endpoint=""`, `novalidate`, `data-placeholder="true"` ; nom, téléphone, date, heure (placeholder « 19:30 »), couverts (`<select>` 1 à 10) ; label visible, `autocomplete`, `aria-describedby` + `aria-invalid`, aide `min-height: 1lh`, validation au blur puis à l'input ; envoi valide : « Rien n'a été envoyé : ce formulaire n'est pas encore relié. Pour réserver, appelez le 081 20 07 47 » ; avertissement visible « Formulaire de démonstration ». Le téléphone et l'e-mail restent la réservation d'origine. Le formulaire est un ajout (le site d'origine n'en avait pas), à confirmer avec le client.
- **Motion** : caractère « still » du thème Specimen (« nothing moves except state ») : aucun reveal, aucune boucle, rien à l'arrivée ; bougent seulement le soulignement des liens (épaisseur), le fond d'un bouton, la bordure d'un champ, le fond d'une ligne de carte cliquable (conteneur, un signal), l'ouverture du menu mobile. Aucun rebond. Fallback `prefers-reduced-motion` global (`base.css`), mesuré : `transition-duration` 1e-05 s.
- **Signature** : « Saveurs grecques » traversé de deux repères 1 px (ligne de base, hauteur d'x) tracés en `::before`/`::after` calés au pixel (`round()`), statiques, `aria-hidden` par nature (pseudo-éléments).
- **Photo** : légende sortie du slot (elle était masquée par `base.css`), sous la photo, en `figcaption`.

## Sur-utilisation
- [x] 1. Audit `sloplint --before` sur les 5 pages · preuve : `.hallmark/before.txt`, `AUDIT.md`
- [x] 2. Lecture de SKILL.md, redesign.md · preuve : trace de l'agent, picks ci-dessus
- [x] 3. Deal, draw (seed c9eb51), scaffold `--redesign full` · preuve : `src/styles/tokens.css`, `base.css`, stamp `page.css:1`
- [x] 4. Deux comps avant build · preuve : `.hallmark/comps/c1.html`, `c2.html`, `comp.md`
- [x] 5. Photos du client d'abord (stock Pexels fourni), pas d'imagegen · preuve : `public/photos/`
- [x] 6. `sloplint src` : 1 FAIL (34, faux positif : la règle est dans base.css via @import), REFLEX 26b traité (`:active`) · preuve : `.logs/legacy-lint.log`
- [x] 7. Rendu navigateur et motion · preuve : `sloplint --render --stage hero` (0 REFLEX, 0 WARN, 1 FAIL 34 faux positif), captures 1280/1440/1920/375 dans `.hallmark/shots/`, script de test `legacy2-test` (tests ci-dessous)
- [ ] 8. Reviews et sweep final · phase 3
- [x] 2. Pas de `transition: all` ni d'animation de géométrie (10a) · preuve : grep `transition: all` = 0 ; transitions sur `background-color`, `color`, `border-color`, `opacity`, `transform` (`page.css:20`, `:81`, `:131`)
- [x] 6. `:focus-visible` partout, instantané, 3:1 (26a, 15) · preuve : `base.css:6` (anneau 2 px `--color-focus`), `page.css:83` (ligne cliquable), `:134` (champs), `:150` (bande ink)
- [x] 7. Fallback reduced motion, contenu visible sans script (27, 62) · preuve : `base.css:25` ; mesure `reduced: btn transition=1e-05s` ; aucun contenu masqué au repos (aucun reveal)
- [x] 17. Hero en `svh` (6a) · preuve : `page.css:47` (`min-height: calc(100svh - var(--nav-h) - 1px)`), aucun `vh`
- [x] 19. Sticky non superposés (56) · preuve : un seul sticky (`.nav`, `page.css:27`), `scroll-padding-top` = `--nav-h` + 16 px (`base.css:3`), mesure `sticky nav top=0`
- [x] 20. Radios-onglets gardés (53) · preuve : sans objet, aucun switcher (deux pages de carte à rubriques ancrées)
- [x] 21. Vidéo de fond conforme (28a, 28b) · preuve : sans objet, aucune vidéo
- [x] 22. Reveal sous `.js` seulement (62) · preuve : sans objet, aucun reveal (Specimen : « nothing on arrival »)
- [x] 23. États d'input (39a) · preuve : `page.css:131-135` (repos, hover, focus-visible, `aria-invalid`, `:disabled` fond + tirets + curseur)
- [x] 24. Tooltip et auto-rotation (17, 18) · preuve : sans objet, aucun tooltip, aucune rotation (slider d'origine retiré en phase 1)
- [x] 29. Aucun faux envoi (70) · preuve : `contact.astro` (script) ; test : formulaire valide donne « Rien n'a été envoyé : ce formulaire n'est pas encore relié… », formulaire vide : 5 champs `aria-invalid`, focus sur « Nom »
- [x] 30. SVG décoratifs `aria-hidden` (33) · preuve : aucun `<svg>`/`<canvas>` (grep) ; repères en pseudo-éléments
- [x] 48. Hover : un signal, conteneur, pas sur non-interactif, pas de rebond, pas de toast (11, 12, 16) · preuve : `page.css:81` (fond de la ligne, `@media (hover: hover)`), capture `legacy2-hover1280`
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52 px (26b, 39b) · preuve : `page.css:193-198`, `.btn` 48 px, `.nav__menu`/`.nav__resa` 44 px, liens sous `(pointer: coarse)` à 44 px (`page.css:200`)
- [x] 56. Un primaire rempli (F4) · preuve : « Envoyer la demande » est le seul rempli du formulaire ; « Appeler le restaurant » passé en contour ; nav « Réserver » = même recette
- [x] 58. Une recette de conteneur (filets), pilule aucune, un pattern de scroll : aucun (F7, F8) · preuve : `--radius-card: 0`, aucun `animation-timeline`
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` (F16) · preuve : `base.css:3-5` (+ `accent-color`)
- [x] 72. Responsive (breakpoints rem, capacités, tables restackées, `svh`, safe-area) · preuve : `60rem` et `40rem` (`page.css`, `base.css:23-24`) ; `scrollWidth` 375 sur les 5 routes ; `@media (hover: hover)` et `(pointer: coarse)`. Safe-area : non ajoutée (aucun élément fixé au bord), à la phase 3 si une revue le demande.

## Revue du hero et comp (phase 2)
- hero-review: self (pas d'outil Agent en session d'agent, `review-hero.md` non ouvert) : ship après fix · 4 findings · 4 resolved. (1) 197 px de vide sous le hero à 1440 (REFLEX 79) : hero en `svh`, rembourrage symétrique, titre porté de 9vw à 11,5vw : resolved. (2) le chapeau collé au jambage du q : marge titre 24 px à 40 px : resolved. (3) repères à 76 % et 40 % hors de la ligne de base : 87 % et 42 % (lus à l'œil sur capture), puis en `em` arrondi : resolved. (4) double rebut du waiver 8 (raison sans mot de la page) : réécrit : resolved.
- comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800)
- Masse : comp, titre 713 x 269 px à 128 px, 3 lignes d'index ; construit, titre ~660 x 300 à 147 px, 6 lignes d'index, nav et deux boutons : la masse gauche reste dominante (titre env. 52 % de la largeur). Intervalle : comp, titre et index alignés en bas, 2 colonnes de vide ; construit, vide de 2 colonnes entre titre (colonnes 1 à 7) et index (9 à 12), centrés ensemble dans l'écran. Entrée : lecture du titre en premier, index de prix ensuite : identique. Plus grand écart : l'index passe de 3 à 6 lignes (le comp en montrait trois par économie) et le bloc est centré dans la hauteur de l'écran, pas posé en haut ; gardé, il répond au REFLEX 44c.

