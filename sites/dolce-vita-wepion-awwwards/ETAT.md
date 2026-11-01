# ETAT · dolce-vita-wepion-awwwards · fin de phase 1 (construction-1), 01/11/2026

## Fait
- Brief, trois concepts notés, Concept Card « Il neon » (verbe : allumer), système complet : DESIGN.md (checklist 1 à 18 cochée avec preuves).
- Scaffold Astro 5 : package.json, astro.config.mjs, tsconfig.json ; engine copié de chez-guillaume-awwwards (sans GL), `src/lib/url.ts`, `src/components/Photo.astro`.
- Polices : Sacramento + Archivo variable (2 fichiers, 2 préchargés). Favicon tube SVG, `public/og.png` (hero, og.mjs).
- Contenu : `src/data/site.ts` (hypothèses en tête), `src/data/carte.ts` (86 plats réels générés depuis donnees.json), `src/lib/photos.ts` (14 photos, alt d'après `sujet`).
- Composants : `Neon.astro` (signature, segments `data-i`, `grilles` pour la 404), `Header.astro` (nav + menu Popover sans JS), `Footer.astro` (pied final + KywFooter).
- Pages statiques complètes : `/`, `/carte/`, `/histoire/`, `/reservation/` (tel, mailto, formulaire mailto, horaires, plan en lien), `404`.
- Build OK (`scripts/q.sh aw-build pnpm build:site sites/dolce-vita-wepion-awwwards`) ; noindex et mention KYW présents dans le HTML rendu.
- Mesures Playwright hero 1440/1280/1024/390/320 et `scrollWidth` des 5 pages : sans débordement (`.logs/aw-mesure.log`).
- RAPPORT.md (données douteuses, rédactionnel KYW).

## Reste (phases 2 et 3)
- Phase 2 : allumage du néon par `--lum` (paliers irréguliers, timeline GSAP absolue) sur chaque `[data-neon]`, bourdonnement de repos sur le ticker (pause hors écran, coupé en reduced motion), reveals légers, hovers « s'allumer » déjà en CSS à brancher sur l'easing, transition (rideau en place dans `src/motion/setup.ts`), Lenis.
- Vérifier visuellement : photos lazy du mur « À table » et de la section geste (non chargées dans la capture pleine page, normal en lazy), hauteur collante `.chapitre__tete` (top 8,5 rem) contre en-tête + sommaire réels (variable `--tete-h` non posée).
- 404 : vérifier le rendu des segments grillés (`.is-grille`) en capture directe de `404.html`.
- Phase 3 : QA navigateur (shoot, audit, jury), points 42 à 63 de la checklist, `pnpm index`, publication.

## Décisions
- Pas de loader (l'allumage du hero est le premier moment), pas de WebGL (halo en `text-shadow` piloté par variable).
- Hero : néon sur 8 colonnes plafonné à 16,5vw (24vw au téléphone), photo de façade de nuit en colonnes 9 à 12 sur toute la hauteur.
- Au téléphone, le CTA « Réserver » du hero est masqué (doublon du bouton Appeler du menu) ; « Voir la carte » reste.
- Aucun avis affiché ; prix en `tabular-nums`, rose du halo.
- `gabarits/` non touché.
