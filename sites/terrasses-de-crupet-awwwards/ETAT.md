# ETAT : Les Terrasses de Crupet, awwwards, fin de la phase 1 (construction-1)

## Fait
- Brief, 3 concepts notés, Concept Card, système (palette, typo, grille, plan de composition) et checklist 1 à 18 dans `DESIGN.md`. Concept retenu : « Les miroirs ronds » (verbe ouvrir).
- Scaffold Astro 5 : engine verbatim (sans lignes GL), `tokens.css`, `engine.css`, `base.css`, `Base.astro` (head complet, JSON-LD Restaurant, noindex, skip link, curtain, cursor, KywFooter).
- Contenu : `src/data/site.ts` (coordonnées réelles, horaires, carte convertie de `donnees.json` en `carte.json` avec prix numériques), `photos.ts` (22 photos du client, alt décrits, crédit).
- Pages : `/`, `/carte/`, `/a-propos/` (« Le lieu »), `/reservation/`, `404`. Build OK (`scripts/q.sh tdc-build pnpm build:site sites/terrasses-de-crupet-awwwards`), `dist/terrasses-de-crupet/awwwards/` écrit, 404.html présent.
- Mesures Playwright du hero et des `.display` (4 tailles × 4 pages) : gutter respecté, aucun débordement horizontal en mouvement réduit.
- Polices Young Serif + DM Sans, favicon SVG, og.png provisoire.

## Reste (phases 2 et 3)
- Phase 2 : animations. Ouverture d'iris des hublots (clip-path circulaire, `data-reveal="scale"` en place), repos du hero (respiration), hovers (CTA remplissage, nav soulignement faits en CSS), curseur `data-cursor`, transitions de page (curtain), aperçu image au survol des plats de la carte (patron index prévu, pas fait), `prefers-reduced-motion` testé.
- Phase 3 : QA navigateur (captures 4 tailles, axe, LCP, CLS), OG composée avec `og.mjs`, RAPPORT.md, `pnpm index`, commit de `dist/`, items 19+ de la checklist.
- Contrôler en QA : le hublot de la page Le lieu en transition (mesuré à -7 px pendant l'animation seulement), contraste du bouton `btn` sur fond `stone`, hauteur du bandeau collant de la carte au téléphone.

## Décisions et pièges
- Pas de loader, pas de WebGL (justifié dans la Concept Card). `Loader` retiré, `setupMotion` vide.
- Adresse de Crupet retenue ; e-mail du site client (`resto@…`), pas celui de `restaurants.json`.
- Aucune histoire, équipe, avis, GPS inventés : page « Le lieu » factuelle ; parking et accès renvoient au téléphone (formulation à valider : le dossier dit « inconnu »).
- Les mesures sous mouvement actif lisent des positions transitoires (scale du reveal) : mesurer avec `reducedMotion: 'reduce'`.
- Rien commité dans `dist/index.html` (pas de `pnpm index` en phase 1). Pas de `[publier]` dans les commits.
