**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 7 pages (/, /vitrine-du-restaurant/, /menu/, /notre-terrasse-arriere/, /evenement-privee/, /a-propos-de-nous/, /contact/) + 404
- **Before** · Floor 32 FAIL, Reflex 18 (Webador rendu) · hero centré, têtes à 32 px, carte en PDF seulement ; les photos, le ton et la phrase « même les demi-fous » restent
- **Keeps** · les 7 routes, le formulaire de contact (3 champs), `mailto`, liens Instagram et Facebook, lien Google Maps, PDF de la carte, textes du client (reformulés seulement pour 58)
- **Files** · create : tout le paquet `sites/li-micougni-legacy/` ; delete : none
- **Shape** · Photographic (08, kept), empreinte Heading petit/plaque · Body bandes photo et rangs · Divider bord d'image et double filet · Button lien/plein · Image pleine · Reveal aucun ; draw ead5b8 : Split Studio / Stage / pastille / letter close, échangés pour Photographic / Poster (posture d'origine) ; pastille et letter close gardés
- **Theme** · Vellum, dealt 1/3 (seed restaurant-namur-local-seasonal-2d5e·8bc329a7·2026-11-10·r0), colourway oxblood reversed : le bordeaux est le lettrage du logo et l'or son cercle. Écartés : Squeeze (vert forêt sans rapport avec le logo, Bento), Ink (teal, grotesque froid, catalogue).
- **Chrome** · nav : pastille flottante (logo, six liens, Réserver) ; pied : letter close (« même les demi-fous ») + coordonnées
- **Hero** · Poster : salle en plein écran, plaque à gauche en bas (titre, une phrase, deux actions)
- **Signature** · la plaque oxblood sur la salle, et le coq orange du client en tuile de 48 px
- **Sections** · Hero · Ardoises (Rows) · Grillades (Split 7/5) · Énoncé (fibre) · Terrasse (Split 4/8 + Rows de liens) · Horaires (Schedule) · Pied
- **Material** · real : carte complète, adresse, téléphone, mailto, réseaux, 30 couverts, horaires du site (mardi 17 h à dimanche 17 h) · pictures : 16 photos du client · absent : avis, presse, GPS, équipe
- **Comp** · hero réel seulement (voir comp.md)
- **Sweep** · editorial, render 7 routes : 0 REFLEX ouvert, 2 FAIL `kept` (faux positifs : liens absolus du site d origine et champs Webador, consignés `dropped` au stamp), 5 WAIVED (71, 77 x3, 83), 10 NOTE (58) ; 44d et 72 corrigés

## Approche
Macrostructure : Photographic (08). Empreinte `Heading plaque|Body bandes photo et rangs|Divider bord d'image + double filet|Button lien et plein|Image pleine|Reveal aucun`. Posture : multipage, toutes les routes gardées, hero Poster (accueil) et Banner (menu), calme, aucune chorégraphie. Dérogations : faux envoi du formulaire neutralisé par `data-endpoint=""` (70) ; la vitrine devient une galerie de plats du client ; champ anti-spam et bandeau cookies supprimés (`dropped`). Test miroir : un voisin bistrot aurait un menu et une photo ; ici la combinaison oxblood + gothique + coq orange + « demi-fous » est propre à Li Micougni.

## Thème
Vellum oxblood reversed. Tokens lus dans `src/styles/tokens.css` : paper `oklch(27% 0.09 20)`, ink `oklch(94% 0.02 80)`, accent or `oklch(84% 0.11 85)`, rule `oklch(44% 0.08 20)`. Display Grenze Gotisch 600 (jamais sous 30 px), Grenze 400 pour les énoncés, Hanken Grotesk pour tout le reste. Rayon 2 px, pas d'ombre, double filet sous les listes. Couleur de marque : orange du logo présent seulement dans l'image du logo.

## Composants
- **Carte** : Rows (nom col. 1 à 5, description, prix à droite en `tabular-nums`, couleur or), une `<article>` par rubrique dans une seule `<section>`, titre de rubrique en colonnes 1 à 4. Pas de tuiles, pas de carte dans carte. Sur téléphone : nom et prix sur la première ligne.
- **Horaires** : Schedule en `<dl>`, lundi fermé en `--color-muted` non barré ; mercredi à samedi : slot `.fill` « heures à confirmer ». Dits une fois dans la section, une ligne courte dans le pied (adresse seulement) ; jour courant en phase 2.
- **Pied** : letter close, 200 à 400 px : sentence-signature en Grenze, coordonnées, six liens, `data-credits`, puis KywFooter.
- **Nav (phase 2)** : pastille sticky (hauteur 0, top 16 px), « Réserver » en contour or ; sous 70rem menu en `popover` natif (bouton Menu/Fermer, Échap, clic extérieur, focus rendu au bouton), CTA plein dans le menu sous 40rem.
- **Mouvement (phase 2)** : caractère calm. Signature : la plaque du hero se déploie (clip-path 720 ms) puis titre et actions se fondent ; un seul reveal (fondu + 16 px) sous le pli ; jour courant des horaires (« Aujourd’hui »).
- **Carte (phase 2)** : rail sticky d'ancres vers les 11 rubriques, rubrique courante en `aria-current`.
- **Photo** : `<figure data-slot data-alt>`, `srcset`, `width`/`height`, hero `fetchpriority="high"`, le reste lazy, légende = un fait (sujet du dossier).

## Sur-utilisation
- [x] 1. Floor lié (sloplint statique 0 FAIL) · preuve : `.logs/lm-legacy-lint.log`
- [x] 2. Deal/draw/scaffold/stamp en tête de CSS · preuve : `src/styles/page.css:1`
- [x] 3. Audit avant · preuve : `AUDIT.md`, `.hallmark/before.txt`
- [x] 4. Thème tiré et justifié, écartés nommés · preuve : bloc Picks
- [x] 5. Données réelles, fictif signalé (`.fill`, 2 par page au plus) · preuve : `src/data/site.ts`, `menu.astro`
- [x] 6. Photos du client, WebP, `width`/`height` · preuve : `public/photos/`, `Fig.astro`
- [x] 7. Noindex, mention KYW, signature sur les 8 pages · preuve : grep de `dist/li-micougni/legacy/`
- [ ] 8. Render sloplint `--render` par page, comp c2 · hero rendu fait en phase 2 (0 FAIL, 0 WARN), pages et jury en phase 3 ; c2 non construite (voir comp.md)
- [x] 2. Pas de `transition: all` ni d'animation de géométrie (10a) · preuve : grep sur `src/`, seules `opacity`, `translate`, `clip-path`, couleurs sont animées (`page.css`, blocs plate-in, reveal, menu)
- [x] 6. `:focus-visible` partout, instantané, 3:1 (26a, 15) · preuve : `base.css:8` (2 px or), `.btn:focus-visible` 3 px, champs en anneau inset (`page.css` .field), `.row--link:has(a:focus-visible)`
- [x] 7. Fallback reduced motion sur chaque animation ; contenu visible sans script (27, 62) · preuve : `page.css` fin de feuille `@media (prefers-reduced-motion)`, test Playwright : reveal 0 marqué en mouvement réduit, `.cat` opacité 1 sans JS
- [x] 17. Hero en `svh` (6a) · preuve : `.hero { min-height: 100svh }`, `.banner { 62svh }`, aucun `vh` ni `100vw` (grep)
- [x] 19. Sticky non superposés (56) · preuve : nav `top: 16px` (hauteur 0, z 300), rail de la carte `top: 94px` (z 200) ; mesuré à 390 : rail 94, pastille 16
- [x] 20. Radios-onglets gardés (53) · preuve : sans objet, aucun radio-onglet ; la carte est une liste d'ancres avec rail (`nav.rail`), pas un tablist
- [x] 21. Vidéo de fond (28a, 28b) · preuve : sans objet, aucune vidéo
- [x] 22. Reveal sous `.js` seulement (62) · preuve : `.js [data-reveal]:not(.is-in)` ; `data-reveal` posé par le script, 11 blocs sous le pli sur l'accueil, 0 visible caché
- [x] 23. États d'input (39a) · preuve : `page.css` .field (hover, focus anneau inset, `aria-invalid`, disabled par opacité + pointillé + fond), capture `lm-legacy-p2-form`
- [x] 24. Tooltip et auto-rotation (17, 18) · preuve : sans objet, aucun tooltip ni rotation
- [x] 29. Aucun faux envoi (70) · preuve : `contact.astro` : « Rien n’a été envoyé : ce formulaire n’est pas encore relié », orientation vers `tel:` et `mailto:`, jamais de succès
- [x] 30. SVG décoratifs `aria-hidden` (33) · preuve : aucun `<svg>`/`<canvas>` dans `src/`
- [x] 48. Hover : un signal, conteneur, pas sur non-interactif, pas de rebond, pas de toast (11, 12, 16) · preuve : survol des `.row` non liés supprimé, `row--link` fond seul, tout sous `(hover: hover)`, easing `--ease-out` sans rebond
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52 px (26b, 39b) · preuve : `.btn` 48, burger 44, rail 44, champs 48 ; `:active` sur btn, burger, rail, liens de nav et rangs liés
- [x] 56. Un primaire rempli (F4) · preuve : « Réserver » de la pastille passé en contour or ; un seul plein par vue (plaque, ou envoi du formulaire)
- [x] 58. Une recette de conteneur, pilule limitée aux contrôles (F7) ; un pattern de scroll (F8) · preuve : rayon 2 px partout ; seul mouvement au scroll : le reveal unique
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` (F16) · preuve : `base.css:4,5,8`
- [x] 72. Responsive (breakpoints rem, capacités, rangs restackés, `svh`, safe-area) · preuve : 60rem et 40rem, `(hover: hover)`, `(pointer: coarse)` en fin de `page.css`, `viewport-fit=cover` ; mesuré : 0 débordement de 320 à 1440 sur 7 pages, h1 sans coupure, aucun bouton replié

## Checklist phase 3 (points restants)
- [x] 1, 18 Tokens : `grep -v '^\s*--' page.css base.css | grep -c '#[0-9a-f]\{3,6\}\|rgb('` = 0
- [x] 4 `overflow-x: clip` dans base.css, aucun `100vw` (0 occurrence)
- [x] 9, 10, 28 Labels en police de corps, aucun tiret cadratin dans `src/` (grep vide) ; h1 d'accueil sans « Découvrez » (19)
- [x] 12, 13, 34, 42, 46 Hero, une plaque, fold 1280/1440/1920 sans FAIL 44 (`sloplint --render`, 7 routes)
- [x] 16 `sloplint --render` : 0 FAIL hors `kept`, 0 REFLEX ouvert, rendu tourné (35 captures)
- [x] 27, 67 Aucun repli de bouton ni contenu caché à 375 (mesuré en phase 2, capture contact 375 revue)
- [x] 35, 36, 37, 38, 39, 41 Voir stamp en tête de page.css (waive 8, 6b) ; thème Vellum, pas de glow
- [x] 44, 52, 53 Mur de photos : vitrine 66 %, waive 83 motivé ; pas de compteur ni frame d'appareil
- [x] 55 à 66, 68 à 71 Finish : guillemets et insécables, `balance`/`pretty`, horaires tabulaires, `lang`, `<title>` et description par page (build) ; `finish-review: self · 0 finding ouvert · gap : aucun relevé`
- [ ] Non prouvé à l'oeil : gates jugées 9, 11, 16, 23, 29, 38iii, 44 (3 largeurs), 46b, 47c, 54, 58, 62 à 70, 77 à 85 : auto-notation `self`, aucun sous-agent disponible
