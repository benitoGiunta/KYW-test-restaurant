# ETAT : le-ponti-2 portfolio (phase 1 sur 3)

## Fait
- Gabarit guinguette copié et adapté ; DESIGN.md (matrice, décisions) ; `src/data/site.ts` + `carte.json` (99 lignes réelles).
- Pages : accueil, carte, la maison (`/histoire/`), terrasse, réservation, 404 ; À emporter supprimée.
- Palette bordeaux/or/canard (tokens.css + règles `.section--corail`, `.btn` hover en `--c-on-corail`), objets `pizza` et `pont`, favicon, og.jpg, photos recadrées.
- Build OK : `pnpm build:site sites/le-ponti-2-portfolio` (6 pages) ; noindex et mention « Maquette KYW » présents.

## Reste (phases 2 et 3)
- QA navigateur : hero 1440/1280/390 (objets sur titre, CTA visibles), table (12 tirages, rail mobile), contraste bordeaux, `.hcarte`, marquee.
- Vérifier : état ouvert/fermé (lundi fermé, midi et soir), formulaire, liens, `scrollWidth` 320/360/390, clics réels de l'en-tête, bas de page + footer KYW.
- Motion : rien touché au moteur ; contrôler `data-avis` avec le mot « Ponti » et les cartes de la carte réelle.
- `pnpm index`, `dist/` commité, RAPPORT.md, UTILISATION.md (guinguette : le-ponti-2 ajouté), logo client non intégré (logo.webp en public, inutilisé).

## Décisions / hypothèses
- `/histoire/` conservé comme route « La maison » (faits seulement). Titre du hero « À table, en famille », slogan = baseline réelle.
- Adresse « Jambes (Namur) » en commune ; téléphone +32 81 30 40 75 ; e-mail du site affiché sur Réserver.
- `gabarits/` non modifié. Aucun serveur lancé.
