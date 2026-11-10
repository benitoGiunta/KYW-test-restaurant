# ETAT variante legacy · huile-sur-le-feu · fin de la phase 3 (construction-3)

## Fait (phase 1, inchangé)
- Audit, approche, deal (thème de marque), scaffold, comps (c1 retenu), DESIGN.md, six pages statiques (`/`, `/restaurant/`, `/menu/`, `/boutique/`, `/contact/`, 404), données `carte.json`, `photos.json`, `site.ts`.

## Fait (phase 2)
- Nav : edge-aligned sur barre bordeaux, bouton « Menu » + panneau Popover sous 60rem (`Nav.astro`, `page.css` § Nav), « Réserver » toujours dans la barre, logo 44 px de haut, skip link conservé.
- États : `.btn` (hover sous `(hover: hover)`, focus-visible, active, disabled), `.menu-btn`, liens, rail de catégories ; aucun formulaire (réservation = lien Barestho conservé), donc ni validation ni faux envoi.
- Horaires : jour courant par script (`aria-current="date"`, mention « Aujourd’hui »). Carte : catégorie courante marquée au scroll (`menu.astro`).
- Mouvement calme : « le feu prend » au chargement du hero (photo qui se pose + halo, une fois), un reveal (tuiles, photos, rangées d'index) sous `.js [data-reveal]`, tout coupé en `prefers-reduced-motion`.
- Responsive : 60rem, 40rem, 22rem ; 6 pages sans débordement à 375 et 320 ; cibles tactiles ≥ 44 px (hors lien « Réalisé par » du pied KYW, jamais modifié) ; `(pointer: coarse)` pour pied et rail.
- Hero review en auto-notation (`hero-review: self · fix · 1 finding · 1 resolved` : plafond 60rem), comp reproduite (`comp.md`), checklist DESIGN.md cochée (2, 6, 7, 17 à 24, 29, 30, 34, 48, 49, 56, 58, 63, 72).
- Build `scripts/q.sh build pnpm build:site sites/huile-sur-le-feu-legacy` passe ; grep sur les six HTML : noindex, kyw-signature, mention, 0 tiret.
- Sloplint `--stage hero --url` : 0 FAIL réel, ANSWERED F4, NOTE 58 (94 mots à 1440 sous y = 500, sous le plafond de 80 : à regarder en phase 3). FAIL 34 sur `Base.astro` = faux positif de scan `src` (voir DESIGN.md case 34).

## Reste (phase 3)
- QA captures (agent « captures ») : six pages à 375, 1440 ; vérifier le fondu du rail de catégories et le panneau du menu ouvert sur /menu.
- Sloplint final (page entière, `dist` aplati comme en phase 1 : FAIL 76 et REFLEX 72 du paquet footer), jury, `RAPPORT.md`, Picks « Sweep », `pnpm index`, commit de `dist/index.html`.
- Option : la tuile « huile » du Bento ne contient que du texte sur fond bordeaux (4 lignes à 375) ; juger sur captures desktop.

## Décisions et hypothèses
- Pas de switcher midi/soir ni de formulaire : la carte ne distingue pas les services et la réservation est externe (hypothèse conservée de la phase 1).
- Le reveal ne touche ni le hero ni les rangées de carte (lecture directe) ; les éléments déjà visibles au chargement sont montrés sans transition.
- Pas d'outil Agent : hero review notée `self`.
- Données à vérifier avec le client (inchangé) : 2005 (Yelp 2002, Kompass 2007), authenticité des photos, doublons de plats, horaires, partenariat Oliviers & Co.

## Pièges
- Le dev server a été lancé avec `nohup pnpm exec astro dev` ; barre « dev toolbar » d'Astro visible en bas des captures dev (pas dans le build).
- Un `<nav popover>` doit être remis en `display: block` hors `:popover-open` sur desktop (`.site-nav[popover]:not(:popover-open)`), sinon la nav disparaît.

## Phase 3 (QA)
- Corrigé : contraste `.schedule__today`, cibles tactiles 44 px (pointer: coarse), balises og/twitter. Build passe. RAPPORT.md écrit.
- Non fait : sloplint final, finish review, jury, log theme.mjs (voir RAPPORT.md).

## Revue 1 (relecteur-site, 10/11/2026)
- Verdict A_CORRIGER : 0 F0, 0 F1, 5 F2, 7 F3 (voir REVUE-1.md). À traiter : og:image, JSON-LD horaires, cibles 24 px hors tactile, repère `region` du pied, photo dupliquée sur la boutique ; puis F3 (CLS 0,055, espaces avant « : », alt du hero, canonical 404, tuile vide).
- Pièges : ne pas transformer le pied du site en `<footer>` (doublon contentinfo avec kyw-footer).
