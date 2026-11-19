**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 2 routes (/, /la-carte/) + 404
- **Before** · Floor 6 gates en FAIL (509 FAIL au total, CSS Wix), Reflex 113 ; l'identité flamme ocre et calligraphie, le récit, les horaires et la carte courte restent
- **Keeps** · liens `la-carte`, `#reservation`, `mailto:info@tarikirestaurant.be`, Instagram, téléphone · la copie du client (hors gates 19, 54, 58, 63, 69) · l'ocre du logo (212 168 100, lu dans `04-logo-fond-noir.png`) · les routes
- **Files** · create : tout `sites/tariki-legacy/` · edit : aucun fichier d'un autre site · delete : none
- **Shape** · Narrative Workflow (draw d3deb4) · une page et `/la-carte/` · job : book, action : bouton « Réserver » dans la nav et le hero (la barre collante du draw vient en phase 2)
- **Theme** · Darkroom, dealt 1/3, seed `restaurant-namur-levantine-grill-6e35·548fa9c8·2026-11-19·r0` ; l'ambre devient l'ocre du logo. Écartés : Vellum (parchemin clair et bleu outremer : contredit le noir et le feu), Bloom (papier chaud clair, caoutchouc : matière sans rapport)
- **Chrome** · nav : pill (barre flottante à coins droits : nom, arabe, trois liens, Réserver ; sous 60 rem bouton Menu en Popover) ; barre de réservation collante en bas au téléphone · footer : lettre (baseline en signature, adresse, contact, liens, crédits) puis KywFooter
- **Hero** · Counter (le tirage proposait Index ; la réservation ouvrait l'original, échange nommé) : titre sur 9 colonnes, plaque crème du logo sur 3, phrase, deux actions
- **Signature** · la plaque crème du logo posée sur les braises, seule photo en couleur de la page
- **Sections** · Hero · La carte (Switcher midi/soir, Rows) · Notre histoire (Steps : quatre étapes de la route) · Récit (statement + photo carrée) · Salle (photo pleine largeur sans titre) · Nouveau chapitre (band, statement) · Horaires et réservation (Schedule + formulaire) · Footer (lettre)
- **Material** · real : toute la copie, la carte (soir : version de `/la-carte`), horaires, téléphone, e-mail, Instagram · pictures : braises, feu, arcades du client (trois visuels d'ambiance, deux marqués illustratifs), logo · absent : avis, notes, équipe, GPS, photos de plats et de salle
- **Comp** · 2 built, no key · c1 chosen · reproduced (checked at 1280x800) (voir `comp.md`)
- **Hero review** · hero-review: self · 1 finding · 1 resolved (à 1920 le hero s'arrêtait à 880 px sur une bande vide : `min-height: min(100dvh, 1080px)`) ; sloplint hero : 0 FAIL, 0 WARN, 2 WAIVED (44c)
- **Sweep** · phase 3

## Approche

Macrostructure d'origine : one-page Wix en séquence « hero logo, deux affiches, histoire centrée, réservation » (08 ou équivalent one-page) ; empreinte `Heading|Body|Divider|Button|Image|Reveal` conservée : `Display condensed 200|Short text + rows|Hairline|Outlined and filled button|Photo + logo plate|One reveal (phase 2)`.

Posture : hero Counter (la réservation ouvrait), calme, aucun pattern de scroll en phase 1 (un reveal en phase 2). Dérogations : affiches de carte (images) → carte en texte (Rows) ; module Wix de réservation → formulaire sans envoi (`data-endpoint=""`, 70) en phase 2 ; vidéo sans poster supprimée ; `vh` → `dvh` (6a) ; un tiers de photos (83).

Test miroir : un voisin avec « restaurant levantin au feu de bois à Namur » obtiendrait Vellum ou Bloom et un hero centré ; ici Darkroom porte l'ocre du logo, la plaque crème sur les braises et la route en quatre étapes. Changement décidé : l'ambre du thème est remplacé par l'ocre de la marque, et le hero passe d'Index à Counter.

## Tokens (depuis `src/styles/tokens.css`)

Ground `--color-paper oklch(12.5% 0.008 55)` avec puits `-2` et `-3` ; encre `--color-ink oklch(92% 0.012 78)` ; accent de marque `--color-accent oklch(76% 0.1 80)` (ocre du logo) et `--color-accent-deep` ; crème de la plaque `--color-cream oklch(93.5% 0.04 88)` (celle du logo d'origine) ; rayon 0 partout ; grain `--grain-well` sur les puits. Polices : Sofia Sans Extra Condensed (200 sur titres, 400 sur items et contrôles) et Barlow (corps 17 px), plus Amiri 400 pour le seul mot arabe (rôle outlier).

## Composants

- **Carte** : Rows (nom en colonnes 1 à 5 en display 400, description en 6 à 10, prix à droite en `tabular-nums`), filets entre lignes, pas de bordure + ombre ; Switcher Midi / Soir (`role="tablist"`, sans script les deux panneaux se lisent l'un sous l'autre, avec script le premier est visible) ; sur l'accueil le soir montre « Au feu de bois » et « Accompagnements » puis un lien vers `/la-carte/` ; nom et prix restent sur la même ligne au téléphone.
- **Horaires** : Schedule en `<dl>` (`dt` jour en display, `dd` créneaux), dimanche fermé en `--color-muted` non barré, jour courant par un cran de surface (`data-jour`, script de 2 lignes), pas d'icône, dits une fois, dans la dernière section.
- **Pied** : lettre (baseline en signature 200, adresse, téléphone, e-mail, Instagram, lien carte, `data-credits`), 250 à 350 px, sans « Tous droits réservés » ni newsletter, puis KywFooter.
- **Photo** : `<figure data-slot data-alt>` avec `width` et `height`, `object-position`, hero `fetchpriority="high"`, autres `lazy`, WebP ; braises en couleur (le seul feu), feu et arcades en noir et blanc par la règle du thème ; légendes qui disent ce qu'est le visuel.
- **Bouton** : un primaire ocre rempli (nav, hero, formulaire, barre : une recette), secondaire outlined, `btn--quiet` pour Menu ; 44 à 52 px ; huit états (repos, hover sous `(hover: hover)`, focus-visible instantané, `:active` 1 px, disabled en pointillé + muet + `not-allowed`, sélectionné pour les onglets) ; transitions listées (couleurs, `transform`).
- **Nav** : forme pill, 64 px, sticky `--z-sticky-nav` (300) au-dessus de la barre de réservation (`--z-sticky` 200, en bas : aucune superposition) ; menu `<nav popover>` (ouverture 220 ms ease-out, fermeture 140 ms ease-in, `@starting-style`), ferme au clic sur un lien ; skip link conservé.
- **Formulaire** : `data-endpoint=""`, `novalidate`, label au-dessus, placeholders de format (19:30, +32 492 00 00 00), `select` natif pour adultes et enfants, validation au blur puis à l'input, aide `min-height: 1lh` qui devient message d'erreur, dimanche fermé refusé (donnée réelle), message « Rien n'a été envoyé : ce formulaire n'est pas encore relié. », jamais « Réservé ».
- **Motion (Darkroom, still)** : un seul reveal, les photos feu et arcades s'élèvent de 8 px une fois (`.js [data-reveal]`, visible sans script et sous mouvement réduit) ; le hero ne bouge pas ; l'onglet par défaut dépend du jour et de l'heure (midi du mercredi au samedi avant 14 h, sinon soir).

## Sur-utilisation

- [x] 1. Hallmark SKILL.md, redesign.md, deal, draw, scaffold, stamp, comp lancés · preuve : `.hallmark/log.json`, `src/styles/page.css:1`, `comp.md`
- [x] 2. Audit avant avec sloplint `--before` · preuve : `.hallmark/before.txt`, `AUDIT.md`
- [x] 3. Couleur de marque lue dans les fichiers du client · preuve : `04-logo-fond-noir.png` (pixels ocre 212 168 100) → `tokens.css:--color-accent`
- [x] 4. Aucun tiret cadratin dans la copie, apostrophes typographiques · preuve : `grep '[—–]' src` ne trouve que les citations « avant » des commentaires `reworded`
- [x] 5. Pied KYW, noindex et mention sur les 3 pages · preuve : grep de `dist/tariki/legacy/**/*.html` (kyw-signature, robots noindex, Maquette KYW)
- [x] 6. sloplint statique sur `src` · preuve : 0 FAIL, 1 REFLEX (26b `:disabled`, phase 2), WARN 23 corrigé · `.logs/tariki-sloplint-src.log`
- [x] 2. Pas de `transition: all` ni d'animation de géométrie · preuve : `page.css` (transitions listées, `transform`, `translate`, `opacity`)
- [x] 6. `:focus-visible` partout, instantané (`transition: none`), 3:1 · preuve : `base.css:6`, `page.css` `.btn`, `.tab`, champs en outline inset
- [x] 7. Fallback reduced motion sur chaque animation ; contenu visible sans script · preuve : `page.css` bloc reveal, `base.css:25`, mesure Playwright (reveal opacity 1 sans script et en `reduce`, barre absente sans script)
- [x] 17. Hero en `dvh` · preuve : `page.css` `.hero { min-height: min(100dvh, 1080px) }`
- [x] 19. Sticky non superposés · preuve : nav haut 300, barre bas 200, barre masquée devant `#reservation` et le pied (mesure : `bar on at reservation false`)
- [x] 20. Radios-onglets gardés · preuve : onglets en `role="tablist"` + boutons, sans script les deux panneaux se lisent (aucune radio)
- [x] 21. Vidéo de fond conforme · preuve : aucune vidéo (n/a)
- [x] 22. Reveal sous `.js` seulement · preuve : `.js [data-reveal]`
- [x] 23. États d'input (39a) · preuve : `page.css` bloc Formulaire (bordure constante, outline inset, aria-invalid, disabled en pointillé)
- [x] 24. Tooltip et auto-rotation · preuve : aucun tooltip, aucune rotation (n/a)
- [x] 29. Aucun faux envoi (70) · preuve : `Base.astro` script formulaire, mesure `valid status`
- [x] 30. SVG décoratifs `aria-hidden` · preuve : aucun svg inline (grain en data-URI CSS)
- [x] 48. Hover : un signal, conteneur, pas de rebond, pas de toast · preuve : `page.css` (couleur ou bordure sous `(hover: hover)`)
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52 px · preuve : `page.css` `.btn`, mesure nav 44 x 83 et 44 x 106 à 375 ; sloplint 49b résolu (libellé du lien raccourci)
- [x] 56. Un primaire rempli · preuve : une recette `btn--primary`, secondaires outlined
- [x] 58. Une recette de conteneur, un pattern de scroll (aucun) · preuve : rayon 0 partout, filets
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` · preuve : `base.css:3-5`, `page.css` `accent-color`
- [x] 72. Responsive · preuve : breakpoints 60rem et 40rem, `dvh`, `safe-area` dans la barre, `scrollWidth` 375/375 en haut et en bas de page
