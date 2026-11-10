# ETAT : Grill des amiS, variante awwwards (fin de la phase 1)

## Fait
- DESIGN.md : brief, trois concepts notés (retenu : « Du brut au feu »), Concept Card, système (palette, typo, grille, mouvement planifié, plans de composition, mobile), test de généricité, checklist 1 à 18 cochée avec preuves.
- Scaffold : package.json, astro.config.mjs, engine (copie du socle, sans GL), tokens.css, engine.css, site.css, lib/url.ts, lib/format.ts, lib/photos.ts, Photo.astro.
- Contenu : `src/data/site.ts` + `carte.json` (68 plats réels, 10 rubriques, transcrits de donnees.json). Aucun plat fictif, aucun avis, e-mail ni réseau.
- Pages statiques complètes : `/` (hero, quatre gestes, pièces du boucher, Viandard 69 €, salle et terrasse, midi, pied), `/carte/`, `/histoire/` (« La maison »), `/reservation/`, 404 « Pièce introuvable ».
- Head complet (titre, description 144 à 165 car. corrigée, canonical, OG, JSON-LD Restaurant, favicon losange, og.png), noindex, pied KYW.
- Photos : 14 photos du client en `src/assets/photos/` (≤ 1800 px, < 310 Ko) ; la photo 03 (salle) était couchée de 90° et a été redressée ; la 17 (cocktails) rognée du bandeau incrusté.
- Build : `pnpm build:site sites/grill-des-amis-awwwards` passe, `dist/grill-des-amis/awwwards/` écrit. Mesures Playwright à 1440, 1280, 1024, 390 : h1, CTA et média du hero disjoints, aucun débordement horizontal sur les 5 pages à 390 et 1440.

## Reste (phases 2 et 3)
- Phase 2 : la tranche (clip reveal pilotée par un driver unique dans « Du brut au feu », photo chambre bleue vers braise), `data-split`/`data-reveal` des titres et blocs, respiration du hero, aperçu curseur des index (carte), vignettes au toucher, hover `data-magnetic` éventuel, transition de page (lame bleue, déjà branchée dans `motion/setup.ts`), menu mobile à tester.
- Phase 3 : QA navigateur complète (shoot, audit, axe, clavier, LCP), RAPPORT.md, DESIGN.md points 42 à 63, `pnpm index`, commit final.
- À vérifier : `og.png` composée par `og.mjs` depuis le hero (reprendre après les animations) ; aucun test de focus clavier ni du `<dialog>` menu fait ; contrastes calculés à la main (tokens.css) mais non mesurés par axe.

## Décisions et pièges
- Pas de loader ni de GL (voir Concept Card). Pas de `mailto:` : l'e-mail du client est inconnu ; réservation par `tel:` et lien externe `https://www.legrilldesamis.be/reserver`.
- Horaires : lundi et jeudi au samedi, midi et soir ; mardi, mercredi, dimanche « fermé (à confirmer) » (données non confirmées). Les pieds des pages affichent les horaires sauf sur `/reservation/`.
- Mots larges à surveiller au changement de police ou de corps : « ENTRE AMIS » (pied, k = 4,9), « INTROUVABLE » (404, k = 5,1), « RÉSERVER » et « LA MAISON » (k = 4), « DES AMIS » (hero mobile, k = 3,75) ; ces diviseurs sont dans site.css.
- Photo des patrons (15) : légende « En salle, devant le mur d'ardoise » sans nom ; le site du client signe « Elise & Gaëtan » mais l'identité des personnes est à confirmer.
- `.pied__col` se cible par `nth-of-type` (2 et 3) parce que `.pied__cta` est le premier `div` du pied : toute insertion de `div` casse la grille.
