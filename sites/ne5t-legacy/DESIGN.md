# Design: NE5T Hôtel & Spa (restaurant Intuition), variante legacy

**Hallmark · v2.0.0 · variante legacy KYW**
- Redesign : full, contenu et wiring gardés, système et composition neufs
- Before : `.hallmark/before.txt` (62 FAIL, 17 REFLEX)
- Keeps : liens externes (RoomRaccoon, Facebook, Instagram, TripAdvisor, presse), `tel:`, `mailto:`, hero photo plein écran, réservation par téléphone
- Files : `src/styles/{tokens,base,page}.css`, `src/components/*`, `src/pages/*`, `src/data/site.ts`
- Shape : multi-pages à hero photographique (draw e74411 : Marquee Hero écarté, Poster gardé car posture d'origine)
- Theme : Spore, dealt 1/3. Écartés : Vellum (gothique, trop savant pour « décomplexée »), Refract (lumière du jour, contredit la façade de nuit)
- Chrome : nav en dalle (tirée), pied en phrase (tiré)
- Hero : Poster accueil et spa, Stage restaurant et suites, Corridor histoire, infos et 404
- Signature : la façade de nuit, bassin allumé, plein cadre
- Sections accueil : Hero, photo plein cadre sans titre, menu du mois (rangées), chiffre du spa (puits), suites (rangées), horaires et adresse, réservation + photo, pied
- Material : real = carte, formules, prix spa et chambres, horaires par jour, équipe ; pictures = 16 photos du client ; absent = avis, notes, presse détaillée, heures exactes
- Comp : c1 choisi (voir comp.md)
- Sweep : phase 3

## System
- Genre : atmospheric · Théme : Spore (colourway cellar) · Axes : dark/roman-serif/warm · posture : committed
- Dérogations : 13 routes d'origine fusionnées en 6 (accueil, restaurant, spa, suites, histoire, infos) ; environs, presse, packages, séminaire, réservation, tarifs, contact renvoient à Infos ou au site actuel.

## Tokens
Source de vérité : `src/styles/tokens.css` (paper oklch 15/19/24 %, ink parchemin, accent rose oklch 77 % 0.09 30, Young Serif + Instrument Sans).

## Composants
- Carte : rangées (`.row--carte`, catégorie col. 1 à 4, plats col. 5 à 12), prix Young Serif rose à droite, filets 1px, pas de tuiles.
- Formules : rangées nom, note, prix flush right.
- Horaires : Schedule en `<dl>`, jours fermés en `--color-muted`, jour courant en phase 2.
- Pied : statement (une phrase, plan, adresse, réseaux, `data-credits`) puis KywFooter.
- Photo : `<figure data-slot data-alt>`, width/height, hero `fetchpriority="high"`, autres lazy, alt = `sujet` de photos/index.json.
- Boutons : pilule rose pleine et pilule contour, 48px, huit états.

## Controls
- Primary : accent plein · pilule · 48px. Secondary : contour 1.5px ink-2 · même forme.

## Motion
- Caractère : calme. Signature (accueil, spa) : le soir tombe sur la façade, la photo se pose (scale 1,05 à 1, 3,2 s) pendant qu'un voile sombre se lève (`dusk`, 2,4 s) puis le titre, le chapeau et les boutons montent (`rise`, 640 ms, décalés de 140 ms). Un seul reveal : `[data-reveal]` (fondu + 14 px, 420 ms, rangées décalées de 50 ms) sous `.js`, révélé par IntersectionObserver. Aucun rebond, `transform`/`opacity` seulement. Mouvement réduit : tout visible, aucune animation. Pas de chorégraphie scroll (l'original n'en avait pas).
- Nav : dalle collante (`--z-sticky-nav`), `<nav popover>` unique : en ligne au bureau, panneau sous la barre sous 60rem (bouton « Menu », Échap et clic extérieur ferment, `aria-expanded` synchronisé). Lien d'évitement. Au téléphone le bouton Réserver garde « Réserver » (nom accessible complet par `aria-label`).
- Horaires : jour courant (fuseau Europe/Brussels) marqué `aria-current="date"` et « Aujourd'hui », en script ; sans script la liste reste complète.
- Pas de formulaire ni de switcher : la réservation est un appel (`tel:`), la carte est une liste unique sans onglets.

## Sur-utilisation (Hallmark)
- [x] 1. Deal, draw, scaffold, stamp · preuve : page.css:1-4, `.hallmark/log.json`
- [x] 2. Audit avant/après · preuve : AUDIT.md, `.hallmark/before.txt`
- [x] 3. Comp avant build · preuve : comp.md, `.hallmark/comps/`
- [x] 4. Sloplint sur page.css · preuve : 0 FAIL CSS ; 34 et 26a sur le HTML sont des faux positifs (CSS externe, règles dans base.css:2 et :focus-visible)
- [x] 5a. Sloplint `--render --stage hero` · preuve : 1 FAIL (34, faux positif : `overflow-x: clip` sur html et body dans base.css:2, `scrollWidth` = largeur de fenêtre sur 6 pages à 1280 et 375), WARN 49 faux positifs (`.btn { white-space: nowrap }`, page.css:31)
- [x] hero-review : self (pas d'outil Agent) : ship · 1 finding (libellé « Réserverau » collé, flex supprime l'espace) · 1 resolved (gap 0,3em, page.css:30)
- [x] comp : 2 built, no key · c1 chosen · reproduced (checked at 1280x800) : voir comp.md
- [x] 2. Pas de `transition: all` ni de géométrie animée · preuve : grep page.css (transform/opacity/couleurs)
- [x] 6. `:focus-visible` partout, instantané, 3:1 · preuve : base.css:9, page.css (btn, skip)
- [x] 7. Reduced motion et contenu visible sans script · preuve : page.css fin de fichier, base.css (règle globale), test : 0 élément masqué en `reduce`
- [x] 17. Hero en `dvh` · preuve : page.css `.hero--poster`
- [x] 19. Sticky non superposés (un seul : `.nav`, top 0) · preuve : test top=0 après défilement ; `scroll-padding-top` = hauteur nav + 16 px
- [x] 20. Radios-onglets : sans objet (aucun switcher)
- [x] 21. Vidéo de fond : sans objet (aucune vidéo)
- [x] 22. Reveal sous `.js` seulement, repli try/catch et `reduce` · preuve : Base.astro (script), page.css
- [x] 23. États d'input : sans objet (aucun champ)
- [x] 24. Tooltip et auto-rotation : sans objet
- [x] 29. Aucun faux envoi : aucun formulaire, réservation = `tel:` conservé
- [x] 30. SVG décoratifs : aucun `<svg>` en balise (grain en data URI CSS)
- [x] 48. Hover : un signal, sous `@media (hover: hover)`, sans rebond ni toast · preuve : page.css
- [x] 49. `:active` (bouton, bascule du menu), `:disabled`, contrôles 44 à 52 px, libellés verbes · preuve : page.css `.btn`, mesure mobile
- [x] 56. Un primaire rempli (rose), un contour · preuve : `.btn--primary`, `.btn--ghost`
- [x] 58. Un seul pattern de reveal par page, pas de scroll-timeline
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` · preuve : base.css:4,10
- [x] 72. Responsive : 60rem et 40rem, `(hover: hover)`, `(pointer: coarse)`, `dvh`, gouttière 16 px, pas de débordement à 375 (6 pages)
