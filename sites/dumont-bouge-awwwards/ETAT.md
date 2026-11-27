# ETAT · dumont-bouge · awwwards · fin de la phase 1 (construction-1)

## Fait
- Brief, 3 concepts notés, Concept Card, système (palette, typo, grille, plan) : DESIGN.md ; checklist 1 à 18 prouvée (9 partielle).
- Scaffold Astro 5 (package.json, astro.config.mjs), engine copié verbatim de le-royal-awwwards (`src/engine/`, `engine.css`), sans GL, ni loader.
- Contenu : `src/data/site.ts`, `src/data/carte.json` (211 lignes, 4 chapitres, 23 rubriques, généré depuis donnees.json), `src/lib/photos.ts`.
- Pages : `/`, `/carte/`, `/histoire/`, `/reservation/`, `404.html` ; Header, Footer (pied « 7 h à 18 h » + KywFooter), Base (head complet, JSON-LD, noindex, rideau).
- Images : 4 photos du client en `astro:assets` (AVIF/WebP), logo, pinceau (masque), favicon SVG, `og.png` simple.
- Build : `pnpm build:site sites/dumont-bouge-awwwards` passe (5 pages) ; mesures 1440/1280/1024/390/360 : aucun débordement horizontal, display à ≥ gutter.

## Reste
- Phase 2 : signature (pinceau déroulé + règle 7 h à 18 h au scroll), reveals `data-split`/`data-reveal` (rien posé en phase 1), hovers (CTA, nav, plats), état « ouvert » calculé depuis les horaires, repos du pinceau (idle), transition de page affinée (rideau simple en place), `scroll-snap` à vérifier.
- Phase 3 : QA navigateur (captures, axe, LCP, clavier, reduced motion), og.png composée avec texte (`og.mjs`), sloplint, points 42 à 63, `pnpm index`, commit de `dist/index.html`.
- Décider : compléter les photos manquantes (pain, tea-room) en placeholder marqué ou composition typo.

## Décisions
- Concept A « Sept à dix-huit » ; pas de loader, pas de GL (justifié dans DESIGN.md).
- Une seule famille (Bricolage Grotesque variable, un fichier).
- Pas de `data-reveal` en phase 1 : la page est complète sans `.motion`.
- Pas de `pnpm index` en phase 1 (site non fini).
