# ETAT bayti-awwwards, fin de la phase 1 (construction-1)

## Fait
- Brief, 3 concepts notés, Concept Card, système (palette, typo, grille, plan, mobile), checklist 1 à 18 : `DESIGN.md`.
- Concept retenu : « Rue du Pont » (n° 6 le jour, n° 15 le soir), verbe « longer », sans loader ni GL.
- Scaffold Astro 5, engine verbatim (GL et loader retirés : `Loader.astro` supprimé, `runLoader` sort si `#loader` absent), `tokens.css`, `engine.css`, `site.css`, polices (Zodiak 700 et italique, Switzer 400 et 600).
- Contenu : `src/data/site.ts` + `carte.json` (carte réelle du client, 8 services du soir, 39 plats du comptoir) ; aucun placeholder, aucun avis ni équipe inventés.
- Pages : `/`, `/carte/`, `/histoire/`, `/reservation/`, 404 dessinée ; composants `Header`, `Footer` (pied « Rue du Pont, Namur. »), `Rue`, `Photo` ; 22 photos du client optimisées dans `src/assets/photos/`.
- Build passe (`pnpm build:site sites/bayti-awwwards`), `dist/bayti/awwwards/` écrit (404.html, og.png, sitemap), `pnpm index` fait.
- Mesures hero à 4 largeurs (1440, 1280, 1024, 390) : pas de débordement horizontal.

## Reste (phases 2 et 3)
- Mouvement : signature « le fil de la rue » et glissement de ton jour, carreau, nuit (`[data-tone]` + ScrollTrigger scrub), `data-reveal`/`data-split`, transition de page (rideau `#curtain` persistant déjà posé), états de repos, hovers (rôles dans DESIGN.md), `src/motion/setup.ts` vide.
- QA navigateur : captures desktop et mobile, contrastes axe (muted sur jour, safran sur carreau), focus, reduced motion, LCP, vérifier la carte en 390 px, hero à 1440 (la photo passe sous la flottaison, voulu).
- Vérifier : `og.png` (rendu du hero à 1,5 s, à contrôler visuellement), plan Google Maps en lien, JSON-LD (deux horaires qui se chevauchent).
- RAPPORT.md (phase 3), cases 9 et 15 de la checklist à finir de prouver.

## Décisions et pièges
- Les photos du client sont sur carrelage vert profond (pas pâle) : trois tons (jour clair, carreau vert, nuit noire) plutôt que jour/nuit simples.
- Horaires déduits (mardi à samedi), « à confirmer » dans le dossier ; ne pas ajouter de plats ni de prix de menu du soir par plat (seulement 45 € l'ensemble).
- Orthographes sources conservées : « Rakatat » (menu du soir), « Rakakat » (emporter), « Mutabla ».
- Pas de page par plat ; réservation par lien Barestho, `tel:`, `mailto:` seulement.
- Chemins de polices dans `tokens.css` en dur `/bayti/awwwards/fonts/` (Vite ne réécrit pas les `url()` des @font-face).
