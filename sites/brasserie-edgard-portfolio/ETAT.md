# ETAT — brasserie-edgard-portfolio (phase 1 sur 3, construction-1)

## Fait
- Gabarit Guinguette choisi (matrice dans DESIGN.md), copié, renommé, `pnpm install` ok.
- Contenu réel : `src/data/site.ts`, `carte.json` (71 plats), `suggestions.json`.
- Photos WebP (public/photos et photos/s carrés), logos SVG copiés, favicon, OG.
- 7 pages : accueil, carte, lunch, groupes, salle, reservation, 404 ; en-tête à 6 liens.
- Build ok : `dist/brasserie-edgard/portfolio/`. `gabarits/UTILISATION.md` mis à jour.

## Reste (phases 2 et 3)
- Motion et QA navigateur non faits (hero, table, marquee hérités, non testés).
- Section `[data-avis]` retirée : vérifier que `avis()` de motion/setup.ts reste sans effet.
- Mobile : débordements, 71 plats sur /carte/, extrait 4 colonnes de l'accueil.
- Logo Edgard (public/photos/logo.svg, logo-blanc.svg) non intégré à l'en-tête.
- Contrôles du prompt : clics réels sur l'en-tête, capture du bas de page, `.footer` en relative.
- sloplint, audit, `pnpm index`, commit, push non faits (commit refusé par le classifieur de permissions).

## Décisions / hypothèses
- Horaires 10 h à 22 h 30 tous les jours ; « cuisine fermée de 15 h à 18 h » en semaine, « cuisine continue » le week-end (lecture du dossier).
- Aucun avis, histoire ni équipe : rien d'inventé ; note TripAligner non reprise (source non vérifiée).
- Canard recoloré en bleu nuit ; corail inchangé (contraste du gabarit préservé).
