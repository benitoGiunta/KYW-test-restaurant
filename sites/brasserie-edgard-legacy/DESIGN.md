**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 6 routes (/, /la-carte/, /lunch-et-suggestions/, /menu-groupe/, /galerie/, /contact/) plus 404
- **Before** · 121 FAIL, 73 REFLEX, 42 WARN (`.hallmark/before.txt`) : hero de 2011 px, sections à 0 px d'écart, pied sur une newsletter, 4 graisses ; la carte et le menu groupe restent
- **Keeps** · les 56 liens (Barestho, Facebook, Tripadvisor, tel:, mailto:, ancres #entrees à #desserts), le formulaire groupe (11 champs, mêmes `name`), la newsletter, toute la carte (71 plats), le lunch, les suggestions, les menus de groupe, la façade en plein écran
- **Files** · create: tout `sites/brasserie-edgard-legacy/` · edit: aucun autre dossier · delete: none
- **Shape** · Photographic (08), gardée de l'original (photo plein écran d'abord) ; le tirage Letter est écarté car la page n'est pas une lettre
- **Theme** · Atelier, dealt 2/3 (seed restaurant-namur-belgian-brasserie-5a9e·5694bca8·2026-11-20·r0) ; écartés : Vellum (gothique, trop musée pour une brasserie), Ink (catalogue noir et blanc, froid face aux bois et aux lumières chaudes)
- **Chrome** · nav : edge-aligned, logo à gauche, cinq liens, une action de réservation à droite (tirage « search-led bar » écarté : aucune recherche à faire) · footer : letter close
- **Hero** · Poster : façade plein cadre, plaque de papier en bande basse sur la chaussée (titre | une phrase et réserver) ; sous 60 rem, photo puis plaque qui la chevauche de 64 px
- **Stamp phase 2** · `hero-review: fix · 3 findings · 3 resolved` (auto-notation `self`, pas d'outil Agent en session) · `comp: 2 built, no key · c1 chosen · reproduced (checked at 1280x800)` · nav : edge-aligned, différente des derniers tirages
- **Signature** · la façade de nuit en plein écran, avec le nom et la réservation sur une plaque de papier
- **Sections** · Hero · Rows (carte) · Figures (lunch, bande) · Showcase 8+4 (salle) · Statement (groupes) · Schedule + adresse · Split (réservation et terrasse) · Footer
- **Material** · real : carte, prix, horaires, adresse, téléphone, 31 photos du client, logo · pictures : le client uniquement, aucune photo de bibliothèque · absent : avis, notes, histoire, équipe, boissons (aucun inventé)
- **Comp** · c1 (plaque sur photo plein cadre) choisie contre c2 (texte et photo en Stage)
- **Sweep** · phase 3

# Design : Brasserie Edgard (Mr Edgard), variante legacy

Système verrouillé. Les pages le partagent et ne diffèrent que par la composition.

## Approche

- **Macrostructure** : Photographic (08). Empreinte `Heading petit sur plaque | Body bandes photo et Range | Divider arête de l'image | Button lien typographique | Image plein cadre | Reveal aucun`.
- **Posture** : multi-pages, routes d'origine gardées (Accueil, La carte, Lunch et suggestions, Menu groupe, Galerie, Contact) ; hero Poster ; calme ; aucun pattern de scroll (phase 2 : un seul reveal).
- **Dérogations** : slider auto d'origine remplacé par une photo fixe (18) ; `vh` remplacé par `dvh` (6a) ; formulaires sans envoi, `data-endpoint=""` (70) ; menus dupliqués du HTML d'origine dédoublonnés ; « Cuisine fermé » corrigé (la cuisine est fermée de 15 h à 18 h) ; prix sans « € » complétés ; `waive 8` (séquence conservée, compositions neuves).
- **Test miroir** : un voisin avec la même brasserie obtiendrait une plaque de papier sur façade, rows, figures. Décision changée : l'ordre met le lunch (figures) avant les photos de salle, et la salle est un showcase 8+4 sans titre ; les adresses et horaires forment une bande à part.
- **Reformulations** : « Lunch & Suggestions » devient « Lunch et suggestions » ; « Heures d'ouverture » devient « Horaires » ; « Réservez votre table » devient « Réserver une table ». Les textes de conditions et de consentement du formulaire sont repris tels quels.

## Thème

Atelier (light/roman-serif/cool, restrained). Dealt 2/3, seed restaurant-namur-belgian-brasserie-5a9e·5694bca8·2026-11-20·r0. Choisi pour la matière : papier chaud, encre brun profond, Sentient léger, signal ardoise unique. Le signal ardoise (oklch 41 % 0,075 248) rejoint le bleu foncé du logo (#233D4D, lu dans `photos/00-logo.svg`) et le bleu du ciel de la photo d'origine. Le bouton rose-rouge (#DC0044) appartient au widget Barestho, pas à la marque : non repris.

## System
- Genre: editorial
- Shape of the first page: Photographic (08)
- Theme: Atelier
- Axes: light/roman-serif/cool · posture: restrained

## Tokens
`src/styles/tokens.css` est la source. Rôles :
```css
:root {
  --color-paper: oklch(94.5% 0.010 76);  --color-paper-2: oklch(91.8% 0.013 74);  --color-paper-3: oklch(88% 0.015 72);
  --color-ink: oklch(19% 0.024 52);  --color-ink-2: oklch(31% 0.018 54);  --color-muted: oklch(47% 0.014 60);  --color-rule: oklch(81% 0.011 70);
  --color-accent: oklch(41% 0.075 248);  --color-accent-ink: oklch(96% 0.008 76);  --color-focus: oklch(50% 0.095 248);
  --font-display: "Sentient", Georgia, serif;  --font-body: "Hanken Grotesk", system-ui, sans-serif;
  --radius-card: 0;  --radius-pill: 3px;  --rule-hair: 1px;  --shadow-card: voir tokens.css;
}
```

## Controls
- Primary: encre pleine · rayon 3 px · 52 px (`.btn--solid`)
- Secondary: contour encre 1 px, survol plein encre · même rayon et même hauteur (`.btn`) ; lien souligné ardoise (`.link`)

## Motion
- Character: still ; un seul reveal (opacité et 8 px, 420 ms, `ease-out`, uniquement figures du lunch et du groupe, photos de la salle ; posé sous `.js`) ; jour courant des horaires par script (heure de Bruxelles) ; sous reduced motion tout s'arrête (base.css et page.css).

## Composants

- **Carte** : Rows (`layout.md` § 5.5), nom en Sentient 400 sur les colonnes 1 à 5, description dessous en `--color-muted`, prix à droite en `tabular-nums` (F6) ; filets seuls, pas d'ombre sur les lignes (F24) ; nom et prix visibles à 375 px (F25). Accueil : cinq plats de la carte (`selection` dans `site.ts`) ; page carte : une section par catégorie, ancres d'origine.
- **Horaires** : Schedule (`layout.md` § 5.16), `<dl>` en sept lignes, cuisine fermée dite en `--color-muted` (jamais barrée), pas d'icône ; jour courant par étape de surface posé en phase 2 (`data-day` déjà présent) ; dits une fois sur la page (accueil, contact), le pied ne les répète pas.
- **Lunch et groupes** : Figures, vrais prix seulement (14,50 €, 21,50 €, 34 €, 39 €, 49 €).
- **Pied** : letter close, une phrase de congé en Sentient 300, adresse, téléphone, e-mail, Facebook, Tripadvisor, crédit des photos (`data-credits`), puis `KywFooter`. Ni « tous droits réservés », ni newsletter en pied (85).
- **Photo** : `<figure>` + `div[data-slot][data-alt]`, `width`/`height`, `sizes`, `object-position`, hero `fetchpriority="high"`, les autres `loading="lazy"`, légende = un fait tiré du champ `sujet`.
- **Nav** : une ligne de 80 px (72 sous 60 rem), réservation à droite ; sous 60 rem, logo, « Réserver » et bouton « Menu » sur une seule ligne, liens dans un `popover` (Échap, clic extérieur et focus gérés par le navigateur, `aria-expanded` et libellé suivis par script, scrim en token).

## Sur-utilisation (Hallmark)
- [x] 1. Audit `sloplint --before` sur les 6 pages d'origine · preuve : `.hallmark/before.txt`, `AUDIT.md`
- [x] 2. Références lues : SKILL.md, redesign.md, macrostructure 08, layout § 5 à 7, anatomy § book, thème Atelier, design-md.md · preuve : ce fichier
- [x] 3. Deal, draw, scaffold, stamp · preuve : `src/styles/page.css:1-8`, entrée de `.hallmark/log.json`
- [x] 4. Deux comps du premier écran, choix écrit · preuve : `comp.md`, `.hallmark/comps/planche.png`
- [x] 5. Floor statique : tokens seulement, pas de `transition: all`, `overflow-x: clip`, `minmax(0, 1fr)`, `:focus-visible`, fallback reduced-motion · preuve : `base.css`, `page.css`
- [x] 6. Aucun chiffre, avis ni témoignage inventé · preuve : `grep -c` des données dans `AUDIT.md` (avis 4,3/461 non repris)
- [x] 7. Noindex, mention KYW et `KywFooter` sur les 7 pages · preuve : grep sur `dist/brasserie-edgard/legacy/**/*.html`
- [ ] 8. `sloplint --render` et jugées gates : phase 3 (FAIL 34 sur `Base.astro` attendu : la règle vit dans `base.css`, à prouver par `scrollWidth`)
- [ ] 9. Contraste mesuré : phase 3 (mobile 375 et états des contrôles faits en phase 2, voir 72 et 49)
- [x] 2. Pas de `transition: all` ni d'animation de géométrie (10a) · preuve : `grep -c "transition: all" src/styles/*.css` = 0 ; transitions sur couleur, fond, transform, opacity (`page.css:21,27,42,166,201`)
- [x] 6. `:focus-visible` partout, instantané, 3:1 (26a, 15) · preuve : `base.css:8`, champs `page.css:169`, cases `page.css:175`
- [x] 7. Fallback reduced motion sur chaque animation ; contenu visible sans script (27, 62) · preuve : `base.css:25`, `page.css:204` ; mesure Playwright : opacité du reveal = 1 en `reducedMotion: reduce` et avec JS coupé
- [x] 17. Hero en `dvh`/`svh` (6a) · preuve : `page.css:60` (`dvh`), mobile `min(52svh, 24rem)`
- [x] 19. Sticky non superposés (56) · preuve : un seul sticky (`.nav`, `--z-sticky-nav`), `scroll-padding-top` ajusté sous 60 rem
- [x] 20. Radios-onglets gardés (53) · sans objet : aucun onglet sur ce site
- [x] 21. Vidéo de fond conforme (28a, 28b) · sans objet : aucune vidéo
- [x] 22. Reveal sous `.js` seulement (62) · preuve : `page.css:201`, `Base.astro` (`.js` posé dans le head)
- [x] 23. États d'input (39a) · preuve : `page.css:166-171` (repos, survol, focus en outline inset, invalide, disabled par couleur, fond et curseur) ; capture mobile du formulaire en erreur
- [x] 24. Tooltip et auto-rotation (17, 18) · sans objet : ni l'un ni l'autre (slider d'origine remplacé par une photo fixe)
- [x] 29. Aucun faux envoi (70) · preuve : `Base.astro` (message « Rien n’a été envoyé… »), `data-endpoint=""`, mesure : soumission vide = « 7 champs sont à corriger. », focus sur le premier champ
- [x] 30. SVG décoratifs `aria-hidden` (33) · preuve : barres du bouton Menu en `aria-hidden` ; logo en `<img alt>`
- [x] 48. Hover : un signal, conteneur, rien sur non-interactif, pas de rebond, pas de toast (11, 12, 16) · preuve : `page.css:28-36` sous `(hover: hover)`, aucun hover sur photos ni lignes
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52 px (26b, 39b) · preuve : `page.css:37-41`, mesure Playwright 375 et 1440 : aucun contrôle sous 40 px hors lien « Réalisé par » du paquet footer (24 px, non modifiable)
- [x] 56. Un primaire rempli par page (F4) · preuve : `.btn--solid` unique par écran (hero ; formulaire ; réservation)
- [x] 58. Une recette de conteneur ; un pattern de scroll (F7, F8) · preuve : plaque, adresse = même carte papier ; aucun pattern de scroll
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` (F16) · preuve : `base.css:4-6`
- [x] 72. Responsive · preuve : breakpoints 60 rem et 40 rem, `(hover: hover)`, `scrollWidth` = `clientWidth` (375 et 1440) sur les 6 pages, nav sur une ligne (73 px) à 375, safe-area dans `.container` (`base.css:17`, `viewport-fit=cover`)
