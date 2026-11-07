**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full (contenu et wiring gardés, système et composition neufs)
- **Before** · leroyalnamur.be (WordPress, one-page, thème Divi) : `.hallmark/before.txt` : 182 FAIL, 73 REFLEX, 12 WARN
- **Keeps** · one-page, ordre hero, à propos, carte, horaires/réservation/contact ; liens Zenchef, `tel:`, `mailto:`, PDF de la carte et du menu des fêtes, Facebook, Instagram ; rouge brique #963702 ; logo blanc et couronne du client ; copie « À propos » mot pour mot
- **Files** · `src/styles/{tokens,base,page}.css`, `src/layouts/Base.astro`, `src/components/*`, `src/pages/{index,404}.astro`, `src/data/site.ts`
- **Shape** · Split Studio (draw 296466), une page
- **Theme** · Solstice, dealt 1/3, seed `restaurant-namur-belgian-brasserie-9df7·ee802c3e·2026-11-07·r0` (papier crème, encre brune, Yeseva One sur Archivo). Écartés : Hedgerow (vert sombre, étranger à la brique du client), Atelier (froid, ardoise). Accent vermillon du thème remplacé par le brique du client (lu dans le CSS d'origine : `#963702`, soit oklch 46,6 % 0,139 42)
- **Chrome** · nav slab (barre brune pleine largeur, logo blanc, quatre liens, bouton « Réserver ») ; pied : phrase en statement, puis bloc colophon (adresse, contacts, réseaux, crédits), puis KywFooter
- **Hero** · Stage : texte sur 5 colonnes, façade sur 7 colonnes qui déborde à droite. Swap nommé du draw (Counter) et de l'original (Poster) : la façade ne fait que 1200 px de large, un plein cadre à 1920 serait flou
- **Signature** · la façade en brique à côté du titre « Le Royal Namur »
- **Sections** · Hero (Stage) · À propos (Split 6/5) · Carte (Rows avec Switcher à manger/à boire) · Moules jumbo et ardoise (Split inversé une fois) · Menu des fêtes (bande brune, prix 50 € et 65 €) · Une table au Royal (trois colonnes : horaires, contact, réservation) · Pied
- **Material** · real : adresse, téléphone, horaires 12 h 00 à 14 h 30 et 18 h 00 à 22 h 00 tous les jours, carte d'août 2026 avec prix, menu des fêtes, 4 photos du client · absent : avis, note Google, histoire, équipe, desserts de la carte, presse
- **Comp** · 2 built, no key · c1 chosen (`.hallmark/comps/c1.html`, voir `comp.md`)
- **Sweep** · 0 FAIL, 0 REFLEX ouvert (waive 8, 59, 77, 79), 1 WARN kept (site d'origine non relu), 5 NOTE ; render tourné sur `/` et `/404.html`

# Design : Le Royal Namur (variante legacy)

Système verrouillé de la variante. `src/styles/tokens.css` est la source de vérité.

## System
- Genre : editorial
- Shape of the first page : Split Studio, une page (macrostructure d'origine : one-page à ancres)
- Theme : Solstice (long-light), accent brique du client
- Axes : light/high-contrast-serif/warm · posture : restrained

## Approche
- **Macrostructure** conservée : one-page, empreinte `Overlapping|Two-column asymmetric|Hairline rule|Solid|Full-bleed|None`. Routes : `/` et `404` ; l'ancienne `/contact/` devient l'ancre `#contact` (dropped : page distincte, contenu repris dans « Une table au Royal »).
- **Posture** : calme, statique ; un seul pattern de scroll au plus (phase 2). Hero Stage au lieu de Poster (source 1200 px).
- **Dérogations** : `vh` remplacé par `dvh` (6a) ; carrousel Swiper d'origine remplacé par une lecture directe (18) ; bandeau de couronnes de l'original retiré (décor répété) ; `waive 8` : la séquence d'origine est gardée.
- **Test miroir** : un voisin avec le même site obtiendrait-il cette combinaison ? Non : brasserie à carte unique, Stage, carte en Rows à deux états, bande brune réservée au menu des fêtes. Décision changée contre le draw : hero Stage au lieu de Counter, pied en statement au lieu d'index columns (pas de plan de site réel).

## Tokens
```css
:root {
  --color-paper: oklch(94% 0.03 80);  --color-paper-2: oklch(97% 0.02 85);  --color-paper-3: oklch(89% 0.05 80);
  --color-ink: oklch(27% 0.05 50);  --color-ink-2: oklch(36% 0.05 50);  --color-muted: oklch(48% 0.06 55);  --color-rule: oklch(84% 0.06 78);
  --color-accent: oklch(46.6% 0.139 42);  --color-accent-ink: oklch(97% 0.02 85);  --color-focus: oklch(46.6% 0.139 42);
  --color-gold: oklch(74% 0.14 75);  --color-gold-2: oklch(84% 0.11 80);
  --font-display: "Yeseva One", ui-serif, Georgia, serif;  --font-body: "Archivo", ui-sans-serif, sans-serif;  --font-outlier: "Archivo Narrow", ui-sans-serif, sans-serif;
  --radius-card: 0;  --radius-pill: 999px;  --rule-hair: 1px;  --rule-bar: 2px;  --shadow-card: 10px 10px 0 var(--color-paper-3);
}
```
Échelle d'espacement, de texte, courbes et durées : celles du scaffold, dans `tokens.css`.

## Composants
- **Carte** : Rows (nom à gauche, prix Yeseva à droite `tabular-nums`, description en petit sous le nom), titre de catégorie sur filet brun de 2 px, filets de 1 px entre lignes ; Switcher à manger / à boire (`role="tablist"`, premier panneau visible sans script, titres de panneaux visibles sans script) ; colonne de tête collante sur 4 colonnes, lignes sur 8. Aucune tuile, aucune carte dans une carte. Nom et prix visibles au téléphone.
- **Horaires** : trois colonnes, `<dl>` de deux créneaux (midi, soir) avec `<time>`, dits une fois (la mention « tous les jours » remplace sept lignes identiques) ; fin de page avec adresse et réservation. Jour courant : sans objet (horaires identiques).
- **Pied** : statement « Rendez-vous Place du Théâtre. », puis colophon (couronne du client, adresse, contacts, réseaux), `data-credits`, puis `KywFooter`. Les horaires ne sont pas répétés (déjà dits au-dessus).
- **Photo** : `<div data-slot data-alt>` avec `<img srcset sizes width height>`, hero `fetchpriority="high"`, autres lazy, légende = un fait d'après `photos/index.json`.
- **Bouton** : pilule pleine brique, 48 px, texte Archivo Narrow 600 ; lien : souligné 2 px encre, brique au survol. Pas de formulaire : la réservation reste le lien Zenchef de l'original. États : hover seulement avec pointeur fin, `:active` (enfoncement de 1 px, fond encre), `:disabled` en opacité 0,5 et curseur interdit.

## Controls
- Primary : fond brique · pilule · 48 px
- Secondary : texte souligné encre · même hauteur de zone tactile

## Motion
- Character : still. Un seul reveal (opacité et 1 rem de translation, 420 ms `--ease-out`) sur les blocs sous le premier écran ; le hero ne bouge pas (signature = la façade, posée). Menu téléphone : fondu de 220 ms. En reduced motion tout est posé d'emblée.

## Exports
`tokens.css` dans ce projet.

## Sur-utilisation
- [x] 1. Hallmark SKILL.md, deal, draw, scaffold, theme lus et lancés · preuve : `agents` log `.hallmark/log.json` (entrée à la phase 3), `src/styles/tokens.css`
- [x] 2. Audit avant refonte (`sloplint --before`) · preuve : `AUDIT.md`, `.hallmark/before.txt`
- [x] 3. Stamp en première ligne de `page.css`, critique pré-émission, waiver 8 · preuve : `src/styles/page.css:1-5`
- [x] 4. Deux comps, choix écrit · preuve : `comp.md`, `.hallmark/comps/c1.html`, `c2.html`
- [x] 5. `sloplint src --genre editorial` : 0 FAIL, 0 WARN · preuve : `.logs/sloplint.log`
- [x] 6. Meta robots noindex, mention KYW via `KywFooter` sur `/` et `/404` · preuve : grep de `dist/le-royal/legacy/{index,404}.html`
- [x] 7. Aucun tiret cadratin ou demi-cadratin dans `src/` et `dist/index.html` · preuve : contrôle Python
- [x] 8. Nav : slab, une ligne 72 px (64 px au téléphone), Réserver dans la barre, menu `<dialog>` sous 60 rem (Échap, clic sur le fond, lien = fermeture, premier focus sur le premier lien), lien actif par IntersectionObserver, skip link · preuve : `src/components/Nav.astro`, `page.css` § Nav et § Menu téléphone, test Playwright (menu ouvert, fermé par lien et Échap)
- [x] 2. Pas de `transition: all` ni d'animation de géométrie (10a) · preuve : `grep 'transition: all' dist/` = 0 ; transitions listées sur `transform`, `opacity`, couleurs
- [x] 6. `:focus-visible` partout, instantané, 3:1 (26a, 15) · preuve : `base.css:6` (anneau brique 2 px), `page.css` (anneau or sur fonds bruns) ; test : anneau solide à la tabulation
- [x] 7. Fallback reduced motion sur chaque animation, contenu visible sans script (27, 62) · preuve : `page.css` fin de fichier (`prefers-reduced-motion`), `base.css` règle globale ; test `javaScriptEnabled: false` : panneaux visibles, 0 `data-reveal`
- [x] 17. Hero en `dvh` (6a) · preuve : `page.css` `.hero { min-height: clamp(34rem, calc(100dvh - 4.5rem), 54rem) }` ; aucun `100vh` ni `100vw`
- [x] 19. Sticky non superposés (56) · preuve : nav `--z-sticky-nav` seule en `top: 0` ; en-tête de la carte collé sous la nav (`top: calc(4.5rem + …)`, 4 rem au téléphone), `scroll-padding-top: 96px`
- [x] 20. Radios-onglets gardés (53) · preuve : sans objet, le Switcher est en `role="tablist"` et les deux panneaux s'affichent sans script (`html:not(.js) .tabs { display: none }`)
- [x] 21. Vidéo de fond (28a, 28b) · preuve : sans objet, aucune vidéo
- [x] 22. Reveal sous `.js` seulement (62) · preuve : `Base.astro` (script de fin de page : `data-reveal` posé sur ce qui est sous le premier écran, révélé à l'entrée ; rien en reduced motion), `page.css` `.js [data-reveal]`
- [x] 23. États d'input (39a) · preuve : sans objet, pas de formulaire : la réservation est le lien Zenchef de l'original (conservé), et `tel:`
- [x] 24. Tooltip et auto-rotation (17, 18) · preuve : sans objet (ni tooltip ni boucle)
- [x] 29. Aucun faux envoi (70) · preuve : aucun formulaire, aucun message de confirmation
- [x] 30. SVG décoratifs `aria-hidden` (33) · preuve : aucun SVG dans les pages (logo et couronne en `<img>`, `alt=""` pour la couronne et le logo de nav lié par `aria-label`)
- [x] 48. Hover : un signal, conteneur, pas sur non-interactif, pas de rebond, pas de toast (11, 12, 16) · preuve : `@media (hover: hover)` sur boutons, liens, onglets, liens de nav ; aucune ligne de carte en hover ; courbes `--ease-out`
- [x] 49. `:active`, `:disabled`, contrôles 44 à 52 px (26b, 39b) · preuve : `.btn:active`, `.tab:active`, `.nav__menu:active`, `.menu__fermer:active`, `.btn:disabled` ; mesure : Réserver 45 px, Menu 45 px au téléphone, 48 px ailleurs ; `(pointer: coarse)` donne 44 px aux liens
- [x] 56. Un primaire rempli (F4) · preuve : une seule recette (`.btn--accent`) ; le bouton de la nav et celui du hero ne sont jamais côte à côte
- [x] 58. Une recette de conteneur, pilule limitée aux contrôles (F7) ; un pattern de scroll (F8) · preuve : pilule sur `.btn`, `.tab`, `.nav__menu`, `.menu__fermer` seulement ; un seul reveal, aucune chorégraphie de scroll (l'original n'en avait pas)
- [x] 63. `::selection`, `caret-color`, `scrollbar-color` (F16) · preuve : `base.css:3-5`
- [x] 72. Responsive (breakpoints rem, capacités, safe-area) · preuve : 60 rem et 40 rem, `hover: hover` et `pointer: coarse`, `viewport-fit=cover` et `env(safe-area-inset-*)` dans le menu ; mesure à 375, 820 et 1280 : `scrollWidth` = largeur de fenêtre
- [x] 9. Phase 3 : sloplint `--render` (0 FAIL, 0 REFLEX ouvert, 4 waivers), journal `$LOG`, `RAPPORT.md`, revue auto-notée `self` · preuve : `.logs/sloplint.log`, `RAPPORT.md`
