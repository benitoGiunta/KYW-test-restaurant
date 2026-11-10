# ETAT · le-ponti-2 · awwwards · fin de phase 1

## Fait
- Concept « Le pont à trois arches », DESIGN.md (brief, concepts notés, Concept Card, système, checklist 1 à 18).
- Scaffold Astro, engine verbatim (sans GL, sans loader), Base, Header, Footer (KywFooter), Pont, Photo, Marque.
- Contenu : `src/data/site.ts`, `src/data/carte.ts` (99 lignes générées depuis donnees.json, textes inchangés).
- Pages : `/`, `/carte/`, `/a-propos/`, `/reservation/`, 404. Favicon, og.png composé, photos dans `src/assets/photos/`.
- Build OK (`pnpm build:site sites/le-ponti-2-awwwards`) ; mesures Playwright à 1440, 1280, 1024, 390 : aucun débordement horizontal, hero et CTA dans le premier écran.

## Reste
- Phase 2 : motion (arches qui s'ouvrent, rideau en arche, `setupMotion` vide, reveals `data-*`, hovers, repos du pont), pas de `data-split` posé.
- Phase 3 : QA navigateur, captures mobiles de la carte et des autres pages (seules l'accueil desktop et les mesures ont été vues), axe, audit, RAPPORT.md, OG revérifiée, `pnpm index`.
- La photo de façade (lazy) apparaissait vide sur une capture pleine page sans défilement : faux défaut connu, à revérifier après défilement.
- Aucun commit de `dist/index.html` fait (pnpm index en fin de phase 3).

## Décisions
- Pas de loader, pas de GL (restaurant). Pas d'équipe ni d'histoire inventée : page « La maison » = faits du dossier. Lundi « le pont est levé » = copy du concept, vrai (fermé le lundi).
- Facebook seul réseau. Photos 03 (texte incrusté) et logos non utilisés ; marque d'en-tête redessinée en SVG d'après le logo.
- Contexte à confirmer : « Jambes » est de l'autre rive de la Meuse (non affirmé dans le site).
