# ETAT : Le D’Arville, variante awwwards (fin de phase 1 sur 3)

## Fait
- Brief, 3 concepts, Concept Card, système (palette, typo, grille, plan), checklist 1 à 18 : `DESIGN.md`.
- Scaffold Astro 5, engine verbatim (sans lignes GL), `tokens.css`, `engine.css`, `site.css`, `motion/setup.ts` (rideau de brique), `Base.astro`, `Header`, `Pied`, `Photo`, `lib/photos.ts`, `lib/url.ts`, `data/site.ts`.
- Pages : accueil, carte, histoire, réservation, 404. Mise en page statique complète. 19 photos du client (≤ 1800 px, AVIF/WebP via `astro:assets`).
- Build OK : `scripts/q.sh build pnpm build:site sites/le-d-arville-awwwards` (5 pages, dist/le-d-arville/awwwards/). Mesures hero 1440, 1280, 1024, 390 : aucun débordement, `.display` à gauche ≥ gutter.

## Reste (phases 2 et 3)
- Signature : marqueur 0 m → 200 m sur le sentier (driver scroll, `onPage`), repos qui respire, mouvement du rideau déjà posé ; révélations `data-split`/`data-reveal` (non posées dans les pages), hovers de plats avec aperçu photo, magnétisme éventuel.
- QA navigateur : captures, audit, axe, clavier, reduced motion, LCP/CLS, 404 réelle.
- `og.png` à recomposer (provisoire, police système) ; `::selection` ; RAPPORT.md à compléter après QA ; `pnpm index` et commit `[publier]` en fin de restaurant seulement.

## Décisions
- Pas de loader, pas de GL (justifiés dans la Concept Card). Pas de Zenchef : lien vers la réservation du client + `tel:` + `mailto:`.
- Heures non publiées : jamais écrites. Aucune note, distinction ni avis affichés (voir RAPPORT.md).
- Aucun contenu fictif inséré (`placeholder` inutilisé).
