**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full, une page conservée (`/`) plus `404`
- **Before** · 66 FAIL, 53 REFLEX, 5 WARN (`.hallmark/before.txt`)
- **Keeps** · one-page, hero avec réservation, routes, liens Barestho, bon cadeau, PDF carte et menu, `tel:`, Facebook, Instagram ; e-mail gmail personnel `dropped` (non repris par le dossier)
- **Files** · `src/layouts/Base.astro`, `src/components/{Nav,Photo}.astro`, `src/pages/{index,404}.astro`, `src/data/site.ts`, `src/styles/{page,tokens,base}.css`
- **Shape** · Catalogue (draw 2b8db8, macrostructure 08 one-page conservée), hero Counter
- **Theme** · Hedgerow, dealt 2/3 (seed restaurant-namur-french-brasserie-5952·3e52d83a·2026-11-20·r0) ; écartés : Vellum (blackletter, trop savant pour une brasserie), Solstice (crème et vermillon, étranger au logo olive et or). Hedgerow retenu : papier vert profond lisible comme le vert olive du logo, Prata pour les noms. Écart : teinte du papier ramenée de 158 à 125 (olive), signal chartreuse remplacé par l'or du logo (oklch 84 0.16 85), couleurs lues sur `13-logo-restaurant.png`.
- **Chrome** · nav : bandeau (horaires, téléphone) sur barre collante (marque, ancres, Réserver) ; pied : colonnes d'index
- **Hero** · Counter : titre, phrase, deux actions, photo 01 à droite, comptoir du menu du moment (35 €, 41 €, 6 semaines)
- **Signature** · le prix du menu du moment en Prata, premier chiffre en or
- **Sections** · Hero · Infos (Schedule) · Menu (Switcher menu du moment et carte) · Salle (photo pleine largeur sans titre) · Maison (terrasse et faits) · Réserver (bande crème) · Pied
- **Material** · réel : carte, menu du moment, horaires, adresse, 55 et 20 places, patrons, G&M 12/20 · photos : celles du client (7 sur 12) · absent : plats photographiés, avis, note, baseline
- **Comp** · voir `comp.md` : 2 built, no key · c1 chosen · reproduced (checked at 1280x800, hero réel capturé, comps HTML non produits)
- **Hero review** · self (pas d'outil Agent) : fix · 2 findings · 2 resolved (photo mobile avant le titre, marge par défaut de `figure` qui rétrécissait la photo)
- **Sweep** · phase 3

## Approche
Macrostructure 08 (one-page de restaurant), empreinte `Heading|Body|Divider|Button|Image|Reveal` sans reveal. Posture : calme, une seule page, aucun pattern de scroll. Dérogations : widget flottant Barestho remplacé par le bouton Réserver de la nav et du hero ; `vh` évité (`dvh` non nécessaire). Test miroir : une brasserie voisine n'aurait pas ce papier olive, l'or du logo et le comptoir de prix ; décision changée par rapport au tirage : carte en Switcher plutôt qu'en deux pages.

## Thème (tokens.css)
Papier `oklch(25% 0.05 125)`, encre crème, signal or `oklch(84% 0.16 85)`, bande crème pour la réservation. Prata (titres), Manrope (texte). Carré, plat, filets de 1 px, filet or de 1,5 px sur les listes clés, boutons en pilule.

## Composants
- Carte : Rows (nom colonne 1, prix à droite en chiffres tabulaires), catégories en Prata, filet or ; nom et prix visibles à 375 px (prix sous le nom).
- Switcher : `role="tablist"`, menu du moment ouvert, sans script les deux panneaux sont visibles.
- Horaires : Schedule en `<dl>` avec `<time>`, jours fermés en `--color-muted` non barrés ; jour courant : phase 2.
- Pied : colonnes d'index (adresse, contact, réseaux), pas de « Tous droits réservés » ; puis KywFooter.
- Photo : `<figure data-slot data-alt>`, `width`/`height`, `srcset`, hero `fetchpriority="high"`, autres `lazy`.

## Sur-utilisation
- [x] 1. Audit sloplint before et AUDIT.md · preuve : `.hallmark/before.txt`
- [x] 2. Approche et macrostructure conservées · preuve : § Approche
- [x] 3. deal, draw, scaffold, stamp · preuve : `src/styles/page.css:1-6`
- [ ] 4. Comp avant build · raison : comps HTML jamais produits (c1 construit directement) ; réponses Masse, Intervalle, Entrée écrites dans `comp.md`
- [x] 5. Build statique, pages et composants · preuve : `pnpm build:site` vert, `dist/philfa/legacy/`
- [x] 6. sloplint src · preuve : 2 FAIL (34 faux positif base.css, 39a corrigé)
- [x] 2. Pas de `transition: all` ni d'animation de géométrie (10a) · preuve : grep `transition: all` vide ; transitions `opacity`, `background-color`, `color`, `border-color` seulement (`page.css`, blocs Boutons, Switcher, Phase 2)
- [x] 6. `:focus-visible` partout, instantané, 3:1 (26a, 15) · preuve : `base.css:6` (outline 2 px `--color-focus`), `page.css` `.band.cream :focus-visible` (papier sur bande claire) ; capture `philfa-s-focus1280`
- [x] 7. Fallback reduced motion ; contenu visible sans script (27, 62) · preuve : `base.css` `@media (prefers-reduced-motion: reduce)` ; sans script : onglets masqués, deux panneaux visibles, menu en Popover natif (test Playwright JS coupé)
- [x] 17. Hero sans `vh` (6a) · preuve : grep `vh` : aucune unité `vh` ; hauteurs en px
- [x] 19. Sticky non superposés (56) · preuve : un seul sticky (`.nav`, `--z-sticky-nav`), `html { scroll-padding-top: 112px }`, ancre testée à 375 et 768
- [x] 20. Radios-onglets gardés (53) · preuve : onglets `role="tab"` en boutons, aucun `position: absolute` ; tablist masquée sans script, flèches, Début, Fin
- [x] 21. Vidéo de fond (28a, 28b) · preuve : sans objet, aucune vidéo
- [x] 22. Reveal sous `.js` (62) · preuve : sans objet, aucun reveal (thème Hedgerow still : « no scroll reveal », `themes/hedgerow.md` § Motion)
- [x] 23. États d'input (39a) · preuve : sans objet, aucun champ ; réservation = lien Barestho conservé (`resto.reservation`)
- [x] 24. Tooltip et auto-rotation (17, 18) · preuve : sans objet, aucun
- [x] 29. Aucun faux envoi (70) · preuve : aucun formulaire, aucun message de succès
- [x] 30. SVG décoratifs `aria-hidden` (33) · preuve : aucun SVG
- [x] 48. Hover : un signal, conteneur, pas de rebond, pas de toast (11, 12, 16) · preuve : `page.css` bloc `@media (hover: hover)`, easing `--ease-out` sans rebond ; carte non survolée
- [x] 49. `:active`, `:disabled`, cibles 44 à 52 px (26b, 39b) · preuve : `.btn` 48, `.btn--sm` 44, onglets 44, bouton Menu 44 (mesuré à 375) ; `:active` après le bloc hover ; `.btn:disabled`
- [x] 56. Un primaire rempli (F4) · preuve : onglet actif passé en teinte (ni rempli ni deuxième primaire) ; `philfa-s-carte375`
- [x] 58. Une recette de conteneur ; un pattern de scroll (F7, F8) · preuve : conteneurs carrés, pilule limitée aux boutons et onglets ; aucun pattern de scroll
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` (F16) · preuve : `base.css:3-5`
- [x] 72. Responsive (breakpoints rem, capacités, tables restackées, safe-area) · preuve : 60rem et 40rem, `(hover: hover)`, `(pointer: coarse)`, `scrollWidth` 375/768/1280 = largeur ; `--gutter` 16 px au téléphone ; reste : `env(safe-area-inset-*)` non ajouté (pas de barre fixe en bas)

## Motion (phase 2)
Caractère : still (thème Hedgerow). Seuls changements d'état en `--dur-short` `--ease-out` ; ouverture du menu mobile en fondu d'opacité (Popover, `@starting-style`). Signature : prix du menu du moment en Prata, premier chiffre en or, aucun mouvement. Jour courant dans les horaires (script, fuseau Europe/Brussels, `aria-current="date"` + filet or).
