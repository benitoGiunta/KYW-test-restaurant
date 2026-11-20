# ETAT : carre-d-herbes · portfolio · phase 1 sur 3 (20/11/2026)

## Fait
- Gabarit velours choisi (matrice dans DESIGN.md), copié sans photos, `package.json` renommé, `pnpm install` OK.
- `src/data/site.ts` entièrement réécrit depuis dossier.md et donnees.json (aucun `placeholder`, rien d'inventé ; geo et e-mail absents).
- Pages : accueil, menu (plats du moment), carte (4 formules), histoire (La maison), fetes (ex-privatisation), reservation (téléphone), 404.
- 22 photos recadrées en WebP (`public/photos/`), og.jpg, favicon.
- Pied de page KYW, noindex, mention Maquette présents ; le pied du site est une `<section>` (pas de second `<footer>`).
- Build OK : `pnpm build:site sites/carre-d-herbes-portfolio` → `dist/carre-d-herbes/portfolio/` (7 pages).

## Reste (phases 2 et 3)
- QA navigateur : hero 1440 et mobile, galerie, triptyque (3 photos dont les deux de 600 px), onglets des fêtes, clic réel de l'en-tête, bas de page.
- Vérifier le contraste du voile sur le hero clair (photo de salle lumineuse) et le rendu du chiffre cuivre sur photos claires.
- Contrôler les débordements 320 à 390 px (nom « Carré d'herbes » en capitales dans l'en-tête, loader), U+00A0 avant « € » et dans « 13,5/20 ».
- Remplir RAPPORT.md (placeholders : aucun ; points ouverts : G&M 13,5 vs 14/20 à confirmer, Tripadvisor non repris, e-mail/GPS inconnus, photos des plats Facebook « usage à confirmer »).
- Animations : celles du gabarit sont en place, aucune ajoutée. `pnpm index`, commit, push (non fait dans cette phase).

## Décisions / hypothèses
- Distinction affichée : Gault&Millau 13,5/20 deux toques (fiche actuelle du dossier), sans le 14/20 non confirmé.
- Chiffres : 4 menus, 38 €, 28 ares, 10 places de parking (tous prouvés par le dossier).
- Citation : témoignage Stéphane Materne du site client, source indiquée.
- Fêtes 2026 présentées comme offres datées du dossier ; à retirer après le 31/12 (aucune date en dur dans les gabarits).
- `gabarits/UTILISATION.md` non modifié (dossier protégé) : ajouter carre-d-herbes à la ligne velours.
