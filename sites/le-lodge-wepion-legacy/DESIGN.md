**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 3 routes (`/`, `/cookies/`, `404`)
- **Before** · Floor 3 FAIL types (26a, 34, 50), Reflex 7 · trois blocs alternés en cartes blanches ; la photo et le serif restent
- **Keeps** · 15 liens (Barestho, tel, mailto, Facebook, Instagram, Maps, cookies, ancres), la copie utile, les 8 photos de la galerie (7 reprises), le logo blanc, la one-page
- **Files** · create : tout `sites/le-lodge-wepion-legacy/` · delete : none
- **Shape** · Photographic gardé, enchaînement Feature Stack (draw 14de70) en page unique
- **Theme** · Solstice, dealt 1/3 (écartés : Squeeze, trop fruit, vert forêt ; Vellum, gothique froid) · accent déplacé de la vermillon teinte 24 à un rouge brique teinte 16 pour sortir du tell argile (65)
- **Chrome** · nav : bandeau puis barre sombre collante, logo blanc client · pied : colonnes d'index
- **Hero** · Poster (gardé) : façade de nuit, plaque papier avec titre, une phrase, réserver et carte ; draw proposait Counter, écarté car l'original ouvre par un poster
- **Signature** · la façade de nuit sur la Meuse et l'adresse provisoire sur une seule plaque
- **Sections** · Hero · Lieux (deux encarts) · Carte (Switcher, Rows) · Terrasse (photo) · Ce qui vient d'ici (Index) · Galerie (rail) · Tea-room (bande sombre, Rows) · Réservation · Pied
- **Material** · real : carte de 88 lignes, adresses, téléphones, incendie, produits cités · pictures : photos client, aucune de bibliothèque · absent : avis, note Google, horaires d'Erpent, date de réouverture
- **Comp** · c1 retenue (`comp.md`)
- **Sweep** · phase 3

## Approche
Macrostructure : 08 Photographic, empreinte `Heading petit sur plaque|Body court|Divider image|Button lien et pilule|Image plein cadre|Reveal aucun`. Posture : one-page gardée, hero Poster, calme, aucun pattern de scroll. Dérogations : vidéo poster remplacée par photo (28b), `vh` en `dvh` (6a), gabarit « hero, trois blocs alternés » : séquence gardée, composition neuve (`waive 8`), carrousel absent. Test miroir : un voisin avec la même brasserie n'aurait pas la plaque de fermeture ni l'Index des produits locaux ; changé par rapport au draw : hero Poster au lieu de Counter.

## Thème
Solstice (light/high-contrast-serif/warm), `dealt 1/3, seed restaurant-namur-riverside-brasserie-6504·4c07add0·2026-11-20·r0`. Choisi sur l'image : papier crème et brun chaud proches du corps crème et du pied sombre d'origine, serif forte comme les titres d'origine. Écartés : Squeeze (vert forêt, fruits : trop frais pour une brasserie), Vellum (gothique, trop ancien).

## Tokens (extrait de `src/styles/tokens.css`)
Papier `oklch(94% 0.03 80)`, encre `oklch(27% 0.05 50)`, accent `oklch(52% 0.20 16)`, or `oklch(74% 0.14 75)` (filets seulement). Titres Yeseva One 400, corps Archivo 400/500, petits textes Archivo Narrow 600. Rayon 0 sauf pilules ; ombre dure `10px 10px 0` papier-3 ; filets 1 px et 2 px. Conteneur 1440 px, gouttière 64 px.

## Composants
- **Carte** : Switcher en `role="tablist"` (Pour commencer, Les plats, Desserts, Boissons), premier panneau visible sans script (tous visibles sans JS, le script masque les autres) ; lignes en Rows : nom col. 1, prix à droite `tabular-nums`, description dessous en muted ; deux colonnes CSS équilibrées. Pas de tuiles, pas de carte dans carte. Réf. layout.md Rows.
- **Horaires** : Wépion avant l'incendie dit une fois (« Tous les jours, 11 h 30 à 22 h 30 ») dans le `dl` du lieu fermé ; sept jours identiques ne justifient pas un Schedule à sept lignes. Horaires d'Erpent : slot `.fill` « horaires à confirmer ».
- **Pied** : colonnes d'index (Erpent, Wépion, Écrire et réserver, Suivre), 4 colonnes puis 2 puis 1, `data-credits`, BCE ; ni « Tous droits réservés » ni newsletter ; puis `KywFooter`.
- **Photo** : `Fig.astro`, `width`/`height`, `srcset` 700 w et pleine taille, hero `fetchpriority="high"`, autres `lazy`, légende = fait du champ `sujet`. Photo 11 (enseigne « Beau Rivage ») non utilisée.
- **Réservation** : barre collante sur téléphone, pilule dans la barre au bureau, section de clôture.

## Sur-utilisation
- [x] 1. Sloplint avant/après · preuve : `.hallmark/before.txt` ; après, 0 FAIL propre au site (restent 76 kyw-signature, 72 et 59 du paquet pied, voir ETAT)
- [x] 2. Stamp en ligne 1, critique, waivers · preuve : `src/styles/page.css:1-9`
- [x] 3. Deal et draw journalisés · preuve : `.hallmark/log.json`, entrée 1
- [x] 4. Comp avant build · preuve : `comp.md`, `.hallmark/comps/`
- [x] 5. Tokens seulement, pas de couleur littérale · preuve : `page.css` (`color-mix` sur variables)
- [x] 6. Pas de tiret cadratin · preuve : `grep -c '—\|–' dist/le-lodge-wepion/legacy/index.html` = 0
- [ ] 7. Waive 8 · préciser : séquence gardée, composition neuve (phase 3)
- [ ] 8. QA navigateur complète · phase 3 (captures)
- [x] 2b. Pas de `transition: all` ni de géométrie animée · preuve : `grep -c 'transition: all' src/styles/*.css` = 0 ; animations en `transform`/`opacity` (`page.css`, bloc « Motion »)
- [x] 6. `:focus-visible` partout, 3:1 · preuve : `base.css:6` (accent), `.bar/.menu/.band-ink/.pied :focus-visible` en papier, `.btn:focus-visible` encre
- [x] 7b. Reduced motion et contenu visible sans script · preuve : `.js [data-reveal]` masqué seulement sous `prefers-reduced-motion: no-preference` ; mesuré : 9 reveals à opacity 1 en reduced, `animation-name: none` sur `.plate`
- [x] 17. Hero en `dvh` · preuve : `.hero { min-height: max(34rem, calc(100dvh - 130px)) }`
- [x] 19. Sticky non superposés · preuve : bandeau défilant, barre `top: 0` (`--z-sticky-nav`), barre de réservation fixée en bas sous 60rem
- [x] 20. Switcher gardé · preuve : `role=tablist`, flèches, Début et Fin (`Base.astro`), panneaux `tabindex=0`, tous visibles sans script
- [x] 21. Vidéo de fond : sans objet (photo, dérogation 28b de la phase 1)
- [x] 22. Reveal sous `.js` seulement · preuve : `page.css` bloc « Motion », 9 éléments `data-reveal`, `hiddenReveal = 0` après défilement
- [x] 23. États d'input : sans objet, pas de formulaire (réservation = lien Barestho conservé, `tel:` conservé)
- [x] 24. Tooltip et auto-rotation : aucun (rail à défilement manuel)
- [x] 29. Aucun faux envoi : aucun formulaire
- [x] 30. SVG décoratifs : aucun SVG inline (logo en `<img alt>`)
- [x] 48. Hover : un signal par contrôle, sous `@media (hover: hover)`, aucun hover sur non-interactif, sans rebond ni toast · preuve : `page.css` fin
- [x] 49. `:active`, `:disabled`, cibles 44 px · preuve : `.btn`, `.btn--ghost`, `.burger`, `.link`, `.seg button` ; mesure 375 : restent le pied KYW (« Réalisé par », paquet) et le lien tél. inline (44 px sous `pointer: coarse`)
- [x] 56. Un primaire rempli : rouge brique ; barre du bureau et bouton Menu en contour papier ; barre fixe du téléphone retirée (`is-off`) tant qu'un bouton de `main` est visible
- [x] 58. Une recette de conteneur, pilule limitée aux contrôles ; aucun pattern de scroll
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` · preuve : `base.css:5,6`, `.rail`
- [x] 72. Responsive : 60rem et 40rem, `dvh`, safe-area sur la barre fixe, tables restackées, `overflow-x: clip`; `scrollWidth - innerWidth` = 0 à 1440 et 375
