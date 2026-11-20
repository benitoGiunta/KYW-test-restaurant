# ETAT, Le Panorama (awwwards), fin de la phase 1 (construction-1)

## Fait
- Brief, 3 concepts notés, Concept Card, système (palette, typo, grille, plan de composition) et checklist 1 à 18 : DESIGN.md.
- Scaffold Astro 5, engine copié de l'engine de référence (sans GL), tokens.css/engine.css/site.css, Base.astro (head complet, JSON-LD Restaurant, noindex, KywFooter), polices Fontshare (Clash Grotesk, Switzer), favicon SVG, og.png (capture du hero).
- Contenu : `src/data/site.ts`, `src/data/plats.ts` (généré depuis donnees.json : 44 plats, 4 petits-déjeuners, menu des fêtes), `src/lib/photos.ts` (16 photos du client).
- Pages : accueil (7 sections), carte (index sticky, 11 catégories + petits-déjeuners + fêtes), histoire, réservation, 404. Mise en page statique complète sans `.motion`.
- Build OK (`pnpm build:site`), `dist/panorama-citadelle/awwwards/` écrit. Mesures 1440x900, 1280x720, 1024x768, 390x844 : pas de débordement horizontal, h1 et CTA dans le premier écran, aucun `.display` sous le gutter.

## Reste (phases 2 et 3)
- Motion : soleil de la règle lié au scroll et dérive au repos, révélations par clip-path (verbe « balayer »), hovers CTA et plats, aperçu image sur l'index de la carte, rideau déjà posé (setup.ts minimal).
- QA navigateur : captures desktop/mobile/reduced motion, axe, focus clavier, LCP, contrôle de l'OG (faite avant la mise en page finale du hero), contrastes réels.
- Pas de `<Loader />` ni de GL (décision de concept). `reveal.ts`, `interactions.ts`, `loader.ts` de l'engine présents mais non branchés ; ne pas utiliser `data-split`/`data-reveal` avant d'écrire l'animation (ils masquent le contenu sous `.motion`).
- Le h1 d'accueil n'occupe que ~75 % de la largeur à 1440 : on peut monter `--t-mega` à ~15vw (vérifier la ligne unique à 390).
- RAPPORT.md à compléter en phase 3 (jury, points 42 à 63).

## Décisions
- Concept « Le tour d'horizon » retenu, règle 8 h à 23 h comme signature ; fond gravier froid, accent vert Meuse, sauge des tabourets en nuit.
- Pas de loader, pas de GL, pas de menu hamburger (3 liens tiennent à 390 px).
- Horaires affichés « à confirmer » plutôt que tranchés ; aucun avis, aucune distinction, aucun contenu fictif.
- Pièges : `pnpm build:site` dure ~2 min à froid (images AVIF), 2 s ensuite ; og.png capturé dans public/ exige un rebuild pour entrer dans dist/.
