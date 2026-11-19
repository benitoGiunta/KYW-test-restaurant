# ETAT pizzeria-doria-awwwards, phase 1 (construction-1)

## Fait
- DESIGN.md : brief, 3 concepts notés (choix A « Casiers »), Concept Card, système (palette, typo, grille, mouvement planifié, composition), points 1 à 18 de la checklist.
- Site Astro complet en statique : `/`, `/carte/`, `/histoire/`, `/reservation/`, 404. Build OK (`scripts/q.sh build pnpm build:site sites/pizzeria-doria-awwwards` -> `dist/pizzeria-doria/awwwards/`).
- Contenu réel : `src/data/site.ts` + `carte.json` (181 lignes de donnees.json, 12 casiers), heures, coordonnées, suggestions de novembre 2026, midis d'école, équipe (prénoms seuls).
- Engine copié de le-royal-awwwards (`src/engine/*`, `engine.css`, `url.ts`, `Photo.astro`), sans GL ni loader. Transition de base à deux volets (`motion/setup.ts`).
- Polices Barlow Condensed 700, Barlow 400 et 600 ; favicon, apple-touch-icon, OG (`public/og.png`, capture du hero).
- Mesures : aucun débordement horizontal (1440, 1280, 1024, 390), `.display` à gauche = gouttière, 0 image vide, 0 requête échouée hors 404 volontaire.

## Reste (phases 2 et 3)
- Phase 2 : tiroir qui coulisse (animation de `<details>`, poignée), hovers en 3 rôles, révélations, transition de page « volets de coffre », état de repos, état « ouvert maintenant » calculé depuis `jours`, ouverture automatique du tiroir ciblé par `#ancre`, `scroll-margin` du header sticky à vérifier.
- Phase 3 : QA navigateur complète (shoot, audit, axe, clavier, reduced motion), RAPPORT.md, points 42 à 63, vérification du contraste réel, du LCP mobile.
- Hero : colonne droite sous la photo un peu vide en 1440×900, à juger en QA.
- Index du mur : numéros 01 à 05 puis 10 (numéro réel du casier des vins), à juger en QA.

## Décisions
- Hero = le lieu (salle des coffres), pas une pizza : le client n'a pas de photo de pizza.
- `<details>` natif pour les tiroirs : carte lisible sans JS, mais fermée sauf les pizzas ; l'impression et le SEO voient le contenu.
- Le logo (blanc sur transparent) est posé sur une plaque noire dans l'en-tête.
- Lien pizzy.be étiqueté « Commander à emporter », jamais « réserver ».
- Aucun loader, aucun GL (justifiés dans la Concept Card).
- Pièges : un `widths={480, 800}` sans crochets compile en JS mais casse le rendu ; `scripts/planche.py` doit passer par q.sh.
