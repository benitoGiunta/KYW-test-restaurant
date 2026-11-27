**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full, contenu et wiring gardés, système et composition changés.
- **Before** · Wix, 97 FAIL, 22 REFLEX, 7 WARN (`AUDIT.md`).
- **Keeps** · six routes (/, presentation, resto, boutique, traiteur, contact), nav, hero plein cadre sur le dessert smiley, voix du chef, liens réseaux et `tel:`.
- **Files** · `src/styles/{tokens,base,page}.css`, `src/components/`, `src/pages/`, `src/data/site.ts`.
- **Shape** · Photographic (08), kept. Empreinte : Serif|Sans|Hairline rule|Pill button|Square print|No reveal. Draw abf07f proposait Conversational FAQ, Ledge, nav search-led, footer index columns : refusé pour la forme et le hero (une macrostructure à garder), gardé pour le footer en colonnes (six vraies routes), le Switcher midi/soir et les horaires en section propre. Mirror test : un voisin n'aurait pas ce rouge enseigne sur crème avec un switcher midi/soir ; changé : plaque papier basse à gauche, pas de réservation en Counter.
- **Theme** · Solstice, dealt 1/3 (seed restaurant-namur-creative-french-1745·2c3713b5·2026-11-27·r0). Écartés : Vellum (gothique, trop médiéval pour une table moderne), Hum (jaune et jouet, la maison est raffinée).
- **Chrome** · nav : slab (dalle d'encre pleine largeur, nom Yeseva doré, six liens, une pilule cerclée « Réserver » ; sous 60rem menu Popover) · footer : colonnes d'index. Phase 2 : la forme edge-aligned de la phase 1 figurait dans les 3 derniers logs (gate 42), remplacée par slab.
- **Hero** · Poster : le dessert plein cadre, plaque papier basse à gauche, légende en bas à droite.
- **Signature** · le dessert smiley du client, seul à occuper le premier écran.
- **Sections** · Hero · Faits (quatre tables) · Bande photo · Repas (Switcher) · Citation du chef (bande brune) · Autres portes (liste) · Horaires et lieu · Réservation · Pied.
- **Material** · real : photos, prix des formules, voix du chef · pictures : 18 photos du client, aucune de bibliothèque · absent : avis, note, métriques.
- **Comp** · 2 built, no key · c1 chosen · reproduced (checked at 1280x800).
- **Hero review** · self (pas d'outil Agent en session) · fix · 3 findings · 3 resolved : (1) h1 en accent display (WARN 23) passé en encre, l'accent reste au seul bouton, resolved ; (2) mobile 375 : la plaque couvrait le sourire du dessert, hero à 92vw de photo au-dessus de la plaque, resolved ; (3) nav mobile débordait de 24 px (marque + Réserver + menu), marque 1rem et « Réserver » reporté dans le menu sous 22rem, resolved.
- **Sweep** · phase 3 : 1 FAIL (34, faux positif connu, règle présente dans base.css et page.css), 0 REFLEX ouvert, 5 WAIVED (8, 77 x3, 81), finish review en auto-notation (self).

## Tokens (extrait de `src/styles/tokens.css`)
Papier `--color-paper` crème chaud, encre brune `--color-ink`, signal `--color-accent` vermillon (hue 24, proche du rouge de l'enseigne, lu sur la photo de l'enseigne), or `--color-gold` pour les filets seulement. Display : Yeseva One (poids 400, une couleur). Corps : Archivo. Petits textes : Archivo Narrow 600, casse de phrase. Rayon 0 sauf pilules. Ombre dure `--shadow-card`.

## Approche
Macrostructure 08 Photographic, multi-pages gardé, calme (pas de reveal ; une seule entrée de la plaque du hero au chargement, CSS pur). Dérogations : diaporamas « press to zoom » supprimés (photos fixes, ≤ un tiers du poids sous le hero) ; `vh` en `dvh` ; pas de faux envoi (aucun formulaire) ; plus de pied « © 2013 ».

## Composants
- **Carte** : Rows (titre col. 1 à 5, détail, prix à droite en `tabular-nums`) ; Switcher midi/soir `role="tablist"`, les deux panneaux visibles sans script (`Carte.astro`).
- **Horaires** : Schedule en `<dl>` et `<time>`, jours fermés en `--color-muted`, sans icône (`Horaires.astro`).
- **Pied** : colonnes d'index (adresse, site, réseaux), `data-credits`, puis `KywFooter`.
- **Photo** : `<figure>` + `data-slot`, `width`/`height`, hero `fetchpriority="high"`, légende = sujet du fichier `photos/index.json`.

## Phase 2 : comp et motion
- **Comp, trois questions.** Masse : la plaque de papier occupe ~35 % de la largeur, ancrée bas gauche, le dessert garde le reste ; reproduit (capture 1440x900). Intervalle : 64 px de gouttière, plaque à 40 px du bas, identique à la comp. Entrée : la plaque se pose (opacité + 20 px, 420 ms, ease-out, une fois). Plus grand écart : la nav, passée de papier à dalle d'encre (gate 42) ; la comp montrait une barre claire, la plaque claire sur photo gagne en contraste, retenu.
- **Motion** : calme. Une seule entrée (plaque, légende), pas de reveal au scroll, pas de boucle ; reduced-motion global dans `base.css`, mesuré à 1e-05 s.
- **Sepia** : filtre `sepia(0.28)` gardé, les fraises et feuilles restent saturées sur capture (décision de la phase 2).
- **Signature** : flèche vermillon qui glisse sur les « Aussi chez nous » (hover, focus, toujours visible au tactile).

## Sur-utilisation
- [x] 1. Hallmark audit lancé : sloplint --before · preuve : `.hallmark/before.txt`
- [x] 2. Macrostructure du site d'origine lue (08 Photographic) · preuve : section Approche
- [x] 3. Deal / draw / scaffold / stamp · preuve : `src/styles/page.css:1-5`, `.hallmark/log.json`
- [x] 4. Comp avant build (deux comps) · preuve : `comp.md`
- [x] 5. Build statique, six routes + 404 · preuve : `dist/bienvenue-chez-vous/legacy/`
- [x] 6. noindex, mention et KywFooter sur chaque page · preuve : grep des 7 routes, 1 occurrence chacune
- [ ] 7. sloplint --render sur le build · reporté à la phase 2 (ni QA ni animations en phase 1)
- [x] 2. Pas de `transition: all` ni d'animation de géométrie · preuve : grep `transition: all` 0 occurrence ; transitions listées (`page.css`, `.btn`, `.nav__menu`, `.doors__t::after`)
- [x] 6. `:focus-visible` partout, instantané · preuve : `base.css:6`, `page.css` `.nav :focus-visible` (or sur encre) ; contour 2 px mesuré au clavier
- [x] 7. Reduced motion et sans script · preuve : `base.css` bloc `prefers-reduced-motion`, mesure 1e-05 s ; sans JS : 2 panneaux et liens de nav visibles (capture script)
- [x] 17. Hero en `dvh` · preuve : `page.css` `.hero`, `.bleed` en `svh`
- [x] 19. Sticky non superposés · preuve : un seul sticky (`.nav`, `--z-sticky-nav`), `scroll-padding-top: 5.5rem`
- [x] 20. Radios-onglets : sans objet, le switcher est en `role=tablist` avec panneaux visibles sans script · preuve : `Carte.astro`
- [x] 21. Vidéo de fond : sans objet, aucune vidéo
- [x] 22. Reveal : sans objet, aucun reveal ; l'entrée de la plaque est une animation CSS à fond `backwards`, rien de caché au repos
- [x] 23. États d'input : sans objet, aucun champ (tel: est la réservation)
- [x] 24. Tooltip et auto-rotation : sans objet
- [x] 29. Aucun faux envoi : aucun formulaire · preuve : `answered` en tête de `page.css`
- [x] 30. SVG décoratifs : seul le pictogramme du menu, `aria-hidden` · preuve : `Nav.astro`
- [x] 48. Hover : un signal par élément, conteneur, sous `(hover: hover)`, pas de rebond · preuve : `page.css`
- [x] 49. `:active`, `:disabled`, contrôles 44 à 56 px · preuve : `.btn` 48, `.nav__toggle` 48, liens à 44 sous `(pointer: coarse)`
- [x] 56. Un primaire rempli par recette (vermillon) ; nav cerclée · preuve : `.btn--accent` / `.btn--line`
- [x] 58. Une recette de conteneur (plaque, lignes), pilule limitée aux boutons ; aucun pattern de scroll · preuve : `page.css`
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` · preuve : `base.css`, `page.css` fin
- [x] 72. Responsive : breakpoints 60rem et 40rem (+ 22rem pour la nav), hero `dvh`, aucun débordement 320/375/1280 sur 6 routes (script), tables restackées · preuve : `.logs/bcv-p2-check.log`
- [x] 7b. sloplint --render hero : 1 FAIL (34, faux positif connu : la règle est dans `base.css` importé), WARN 49 (libellé « Appeler le … » : `nowrap` posé en CSS sur `.btn--lg`, sloplint lit le gabarit) · preuve : `.logs/bcv-p2-sloplint.log`
- [x] 16. sloplint --render : 0 REFLEX ouvert, render tourné · preuve : .logs/bcv-sloplint3.log (FAIL 34 faux positif documenté)
- [x] 25. Gates jugées 6b, 9, 11, 23, 54, 58, 63 à 70, 77 à 85 relues sur la planche d'accueil (desktop et mobile) · preuve : .shots-bienvenue-chez-vous-legacy-build/home/planche.png ; 77 et 81 waived, 39b et 49b corrigés (page.css, Reservation.astro)
