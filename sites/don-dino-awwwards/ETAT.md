# ETAT : Don Dino, variante awwwards, phase 1 (construction-1)

## Fait
- Concept « Quatorze services » choisi sur trois (DESIGN.md : brief, concepts notés, Concept Card, système, checklist 1 à 18).
- Scaffold Astro 5, engine copié d'un site livré (huile-sur-le-feu, vérifié identique à engine.md), tokens, engine.css, polices (Big Shoulders Display 800, Work Sans), favicon, OG provisoire.
- `src/data/site.ts` (coordonnées, horaires, accès, aucun placeholder), `src/data/carte.ts` (115 plats réels générés depuis donnees.json), `src/lib/photos.ts` (11 photos du client).
- Pages : accueil, carte, histoire, réservation, 404, toutes statiques et sans `.motion`. Rideau et menu mobile en place (`motion/setup.ts`, `menu.ts`).
- Build OK (`scripts/q.sh build pnpm build:site sites/don-dino-awwwards`), `dist/don-dino/awwwards/` écrit, `pnpm index` passé. Hero mesuré aux 4 viewports, pas de défilement horizontal à 1440, 1280, 1024, 390 (page d'accueil).

## Reste (phases 2 et 3)
- Animations : cascade des 14 cases (`.sem`), reveals `data-split` / `data-reveal`, hovers, curseur facultatif ; `motion/` ne contient que rideau et menu.
- Point 9 de la checklist : OG composée avec `og.mjs` (l'actuelle est faite avec sharp, police de repli), vérifier favicon.
- Point 16 : la paire asymétrique est utilisée deux fois sur l'accueil.
- QA navigateur (captures, axe, clavier, LCP), contrôle des polices préchargées, mobile 390 non capturé (seulement mesuré), `carte.astro` : bandeau d'index sticky à tester au toucher.
- RAPPORT.md (phase 3) : listes des écarts de données ci-dessous.

## Décisions et pièges
- Aucun placeholder : desserts, boissons, avis, presse, e-mail absents (donc pas de mailto ni de formulaire).
- Écarts de données à signaler : « 20 pizzas dès 9,30 € » (site) contre 26 pizzas de 10,50 à 17,80 € (carte PDF, retenue) ; note Google 4,3 avec 1033 ou 350 avis (non affichée) ; orthographes du PDF conservées (« carbonnara »).
- La photo 09 (homme en chemise blanche) n'est pas identifiée : jamais nommée Dino. Photo 05 (image de vidéo, 226 px) et logo non utilisés.
- Hero : titre en `--t-mega` 9,6 vw (au-delà, le CTA sortait de la flottaison). Semaine : `.sem__jour { min-width: 0 }` indispensable (débordement de 6 px sinon).
- Scripts temporaires dans `.logs/` (gitignorés) : dd-mesure.mjs (mesure du hero), dd-ico.mjs.
