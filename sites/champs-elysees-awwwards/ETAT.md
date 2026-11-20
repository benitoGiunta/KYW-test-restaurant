# ETAT, champs-elysees-awwwards, construction-1 (20/11/2026)
## Fait
- Concept « Le jour sans pause » (DESIGN.md : brief, 3 concepts, Concept Card, système, checklist 1 à 18).
- Scaffold Astro 5 + engine verbatim (sans GL, sans loader) + tokens/engine/site.css, polices Bricolage et Hanken, favicon, robots, og.png (capture du hero).
- Contenu réel : `src/data/site.ts` (coordonnées, horaires, histoire, équipe réelle) et `src/data/carte.ts` (94 lignes de donnees.json). Aucun `placeholder`.
- 5 pages statiques : `/`, `/carte/`, `/histoire/`, `/reservation/`, 404 ; pied de maison `Pied.astro` + `KywFooter`.
- Build OK (`scripts/q.sh build pnpm build:site sites/champs-elysees-awwwards`), dist/champs-elysees/awwwards/ écrit. Mesures du hero faites aux 4 tailles : pas de débordement, CTA visibles.
## Reste (phases 2 et 3)
- Phase 2 : `setupMotion` (rideau de transition, sol qui suit l'heure via `setBackground`/sections, trait des heures), `data-split`/`data-reveal`/`data-intro` sur titres et blocs, hovers affinés, état de repos, rail de la carte actif au scroll.
- Phase 3 : QA navigateur (captures, axe, clavier, reduced motion, LCP mobile), RAPPORT.md, points 42 à 63, `pnpm index`, commit de dist/.
## Décisions et pièges
- Adresse 5100 Jambes (restaurants.json) contre 5000 (site client) : non corrigé, à noter dans RAPPORT.md. Horaires : site client ; Rankeat diffère.
- Pas de GL, pas de loader. Pas d'avis, notes ni presse inventés ; citation de Teresa et faits tirés de La DH 04/08/2024 (dossier.md) sourcés dans la page.
- Photo 08 montre des moules alors que la carte PDF n'en a pas : alt et légendes neutres, aucune promesse de moules.
- Mascotte 14 en PNG palette transparent : à vérifier sur sol nuit en phase 3. `.hero h1 .l2` à 0,3 em d'indent pour ne pas toucher la photo à 1440.
- Les en-têtes `sec__hour` sont des heures (concept), pas une numérotation décorative.
