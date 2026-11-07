# ETAT : l-essentiel-awwwards, construction-1 (phase 1)

## Fait
- Scaffold Astro (engine verbatim copié de le-royal-awwwards, sans GL), polices Boska + Hanken, tokens, site.css, Base/Header/Footer.
- Contenu `src/data/site.ts` (hypothèses en tête), photos redimensionnées (≤ 2000 px) dans `src/assets/photos/`.
- Pages : accueil, `/carte/`, `/histoire/` (avec chambres), `/reservation/`, 404. Build OK (`scripts/q.sh build pnpm build:site sites/l-essentiel-awwwards`), favicon, apple-touch-icon, og.png.
- Mesures hero (h1, CTA, média) à 4 tailles, aucune requête échouée, pas de débordement horizontal.

## Reste
- Phase 2 : animations (le retrait biffé au scroll, rideau noir de transition, apparitions `data-reveal`/`data-split`, aperçu de photo au survol de la carte, état de repos), badge « ouvert ce soir » calculé depuis les horaires.
- Phase 3 : QA navigateur, axe, LCP, RAPPORT.md, sloplint, OG revue, « XVIIe » en exposant, grands vides entre sections de l'accueil à resserrer après capture, vérifier lazy-loading des bandes.
- Pas encore de commit de `dist/` ni de `pnpm index` (à faire en phase 3 après QA).

## Décisions
- Concept A « Le retrait ». `/histoire/` nommée « La maison » dans la nav, chambres incluses (pas de page dédiée).
- Placeholders : baseline « Dépouiller pour garder l'essentiel » (`placeholder: true`), mots biffés (microcopie). Chef Raphaël Adam affiché « information à confirmer ». Note Google affichée avec réserve (1 052 vs 1 039 avis). Année de l'étoile Michelin omise (sources discordantes). Aucun prix à la carte inventé.
- Pas d'iframe ni de formulaire : liens `tel:`, `mailto:`, calendrier du client, plan OpenStreetMap.
