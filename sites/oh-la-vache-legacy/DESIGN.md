**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 1 page (/) + 404
- **Before** · Floor 97 FAIL (WordPress/Enfold, Facebook SDK) · Reflex 28 · l'enseigne et la carte complète restent
- **Keeps** · tel:, mailto, Facebook, Instagram, une seule route · la copie du client (7 j/7, grill, fondues-pierrades-raclettes) · toute la carte et ses prix · la façade et l'enseigne vache
- **Files** · create: tout le paquet · delete: none · dropped: #event (page événements vide)
- **Shape** · Photographic (08, kept, one-page), swap du draw 79bce8 (Bento Grid) : la posture d'origine est une façade plein écran, la carte longue refuse les tuiles
- **Theme** · Atelier, dealt 1/3 (limewash, encre brun, Sentient light, filets, ardoise froide), seed restaurant-namur-grill-steak-c171·e9115b44·2026-11-27·r0. Écartés : Squeeze (vert forêt, étranger à la marque noir et blanc), Vellum (gothique, trop de façade d'abbaye)
- **Chrome** · nav : floating pill (draw) · footer : mast (draw)
- **Hero** · Poster (swap du draw, Index) : la réservation passe par le téléphone, pas par des créneaux ; plaque de papier en bas à gauche
- **Signature** · la façade et son enseigne vache posées comme un tirage sous une plaque de papier
- **Sections** · Hero · Horaires et adresse (draw : première après le hero) · Présentation et terrasse · Carte (onglets par service) · Salle en bande sans titre (draw) · Photos accrochées · Réservation à côté d'une photo (draw) · Mast
- **Material** · real : 7 j/7, horaires, carte de 226 lignes, adresse 581, téléphone · pictures : 17 photos client (smartphone, 2020) · absent : avis, histoire, équipe, presse, événements
- **Comp** · 2 built, no key, c1 chosen (voir comp.md)
- **Sweep** · phase 3

## Approche
Macrostructure 08 Photographic, empreinte Heading plaque | Body bandes photo / Rows | Divider bord d'image et filets | Button lien et contour | Image client plein cadre | Reveal aucun. Posture : mêmes routes (une page), hero Poster, calme, aucun pattern de scroll. Dérogations : slideshow auto supprimé (18), capitales supprimées (54), lien Facebook corrigé vers `restoohlavache`, adresse 581. Test miroir : un voisin avec un grill obtiendrait rarement ce couple Atelier plus enseigne vache en tirage ; décision changée : plaque papier à gauche, pas de tuiles.

## Thème
Atelier, `tokens.css` fait foi (paper oklch 94,5 % 0,010 76, ink brun 19 %, slate accent 41 % 0,075 248). Sentient 300 (têtes), Hanken Grotesk 400 (corps). Le fond WebGL « air » du thème n'est pas repris (legacy sans WebGL).

## Composants
- **Carte** : Switcher `role="tablist"` (Menus, Grill et à partager, Entrées, Plats, Desserts et cafés, Boissons), premier panneau visible sans script, panneaux masqués seulement par la classe `is-on`. Rows : titre de catégorie colonnes 1 à 4, lignes colonnes 5 à 12, prix à droite `tabular-nums`, filets, pas de tuiles, pas de carte dans carte.
- **Horaires** : Schedule en `<dl>` et `<time>`, filet d'encre en tête, aucun jour fermé, jour courant en phase 2.
- **Pied** : mast (nom en grand, adresse, téléphone, réseaux, crédits `data-credits`), puis KywFooter.
- **Photo** : `<div data-slot data-alt>`, WebP `width`/`height`, hero `fetchpriority="high"`, autres lazy.

## Sur-utilisation
- [x] 1. Audit lancé avec sloplint --before · preuve : `.hallmark/before.txt`
- [x] 2. deal, draw, scaffold, stamp · preuve : `src/styles/page.css:1-9`
- [x] 3. Comp avant build · preuve : `.hallmark/comps/c1`, `c2`, `comp.md`
- [x] 4. sloplint src sans FAIL réel · preuve : `.logs/olv-lint2.log` (FAIL 34 faux positif, base.css porte la règle)
- [ ] 5. sloplint --render sur le build : phase 3 (hero rendu en phase 2 : `.logs/olv-p2-sloplint2.log`, seul FAIL 34 = faux positif)

Phase 2 (construction-2) :
- [x] 2. Pas de `transition: all` ni d'animation de géométrie (10a) · preuve : grep 0 occurrence dans `src/styles/*.css` ; transitions sur `transform`, `opacity`, couleurs
- [x] 6. `:focus-visible` partout, instantané, 3:1 (26a, 15) · preuve : `base.css:8`, relevé Tab 1280 (9 arrêts, `outline solid 2px`) `.logs/olv-p2-test2.log`
- [x] 7. Fallback reduced motion sur chaque animation ; contenu visible sans script (27, 62) · preuve : `page.css` bloc « reveal » (`prefers-reduced-motion`), `base.css:25`, test sans JS : 6 reveals à opacité 1, 6 panneaux visibles, onglets masqués ; reduced motion : opacité 1
- [x] 17. Hero en `dvh` (6a) · preuve : `page.css` `.hero { min-height: 100dvh }`
- [x] 19. Sticky non superposés (56) · preuve : un seul élément fixe, `.nav` à `--z-sticky-nav` ; `scroll-padding-top` 96 px (clic « La carte » : titre à 168 px du haut)
- [x] 20. Radios-onglets gardés (53) · preuve : onglets en `<button role="tab">`, panneaux masqués sous `.js` seulement (`page.css`, `.js .panel`)
- [ ] 21. Vidéo de fond (28a, 28b) : sans objet, aucune vidéo
- [x] 22. Reveal sous `.js` seulement (62) · preuve : `.js [data-reveal]` dans `page.css` ; un seul reveal (hero au chargement, tirage et photos accrochées à l'entrée dans l'écran, une fois)
- [ ] 23. États d'input (39a) : sans objet, aucun champ ; la réservation reste le `tel:` d'origine (waive 26b déjà posé)
- [x] 24. Tooltip et auto-rotation (17, 18) · preuve : aucun tooltip, aucune rotation ni boucle
- [ ] 29. Aucun faux envoi (70) : sans objet, aucun formulaire
- [x] 30. SVG décoratifs `aria-hidden` (33) · preuve : `Nav.astro`, icône du menu `aria-hidden="true" focusable="false"`
- [x] 48. Hover : un signal, conteneur, pas sur non-interactif, pas de rebond, pas de toast (11, 12, 16) · preuve : `@media (hover: hover)` sur boutons, liens, nav, onglets ; aucun hover sur photos ni plaques
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52 px (26b, 39b) · preuve : `.btn` 48 px, burger 44 px, onglets 44 px, liens et marque 44 px sous `(pointer: coarse)` (relevé 375 : seuls restent le lien KywFooter et « Plats » 35 px de large)
- [x] 56. Un primaire rempli (F4) · preuve : `.btn--primary` du hero seul rempli ; nav en contour
- [x] 58. Une recette de conteneur (plaque de papier, filet intérieur), pilule limitée à la nav (F7) ; aucun pattern de scroll (F8) · preuve : `page.css` `.hero__plate`, `.card`, `.menu`
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` (F16) · preuve : `base.css:4-6`, `page.css` `.mast ::selection` et `.mast { scrollbar-color }`
- [x] 72. Responsive (breakpoints rem, capacités, `dvh`) · preuve : 60rem et 40rem, `(hover: hover)`, `(pointer: coarse)` ; `scrollWidth = innerWidth` à 375, 768, 1280, 1920
