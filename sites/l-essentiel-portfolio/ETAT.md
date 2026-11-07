# ETAT : L'Essentiel, portfolio (gabarit comptoir), fin de la phase 1 (construction-1)

## Fait
- Gabarit choisi : comptoir (matrice et raisons dans DESIGN.md) ; copie dans `sites/l-essentiel-portfolio/`, `package.json` renommé.
- `src/data/site.ts` entièrement remplacé par les données de `data/restaurants/l-essentiel/` (carte du 7/11/2026, menus, accords, horaires
  mer-sam 12-14 / 19-21 h 30, fermetures annuelles, chambres et tarifs, distinctions sourcées). Interfaces étendues : `fermetures`,
  `carteNotes`, `accords`, `chambres`, `tarifsChambres` ; `bonCadeau` supprimé, `avis` vide.
- Photos : 25 WebP dans `public/photos/` (script de recadrage dans le scratchpad, non versionné : `sharp`, hero façade 4:5, salles
  portrait 1000 x 1500, composants du dressage 300 px) ; `og.jpg` (façade) ; favicon « e » laiton.
- Pages statiques : `/` (hero, phrase, dressage, carte, maison, salles, distinctions, chambres, réserver), `/menu/`, `/carte/`, `/maison/`,
  `/chambres/`, `/reservation/`, `/404`. Navigation : La carte, Menus, La maison, Chambres, Réserver (pastille).
- Build : `node scripts/build-site.mjs sites/l-essentiel-portfolio` passe (7 pages, dist 2,2 Mo, noindex, kyw-signature et mention
  « Maquette KYW » vérifiés sur chaque page, aucun asset manquant, aucun tiret cadratin).

## Reste (phases 2 et 3)
- Phase 2 : motion (le moteur et `motion/setup.ts` du gabarit sont intacts : vérifier que le dressage, le hero et le loader marchent avec
  ces données), mesures de débordement 320/360/390/1024/1280/1440, nav à 5 liens + pastille en desktop et en mobile, hauteur de la scène
  de dressage, `.assiette-photo` à 36 rem, `.bandeau` en mobile.
- Phase 3 : QA navigateur, shoot, axe, contraste (laiton `#9a7a35` sur blanc 3,9:1 : filets et focus seulement), liens, clic réel sur chaque
  lien d'en-tête, bas de page en fenêtre 1440 (leçon intégrée), OG, RAPPORT.md, `pnpm index`, commit de `dist/`.
- Vérifier le texte du loader (`Loader.astro`) et tout libellé fixe du moteur qui citerait encore l'ancien restaurant (grep « Potes » vide dans `src/` et `dist/` : OK).

## Décisions et hypothèses
- Chef : « Raphaël Adam » ne vient que de Rankeat (fiche signalée générée par IA) : non nommé. Aucun portrait, aucune biographie.
- Avis : aucun extrait prouvé, section retirée (pas d'avis d'exemple). Note Google dite « plus de 1 000 avis » (1 039 ou 1 052 selon la source).
- Étoile Michelin : date discordante, aucune année affichée. Gault&Millau : 16,5/20, édition 2024, source DH.
- Horaires : fin du service du soir à 21 h 30 (site du restaurant ; Rankeat dit 21 h).
- Bon cadeau : retiré (seule une image de slider l'évoque). Réservation : le formulaire de démonstration ouvre le calendrier du site du
  restaurant ; 1 à 10 couverts, au-delà de six menu uniquement (dossier).
- Chambres : photos non attribuées à une chambre (alt neutre) ; tarifs repris du site actuel, mentionnés comme à confirmer.
- Dressage : composants hors « Mignon de biche » = `placeholder: true`, marqués « illustratif ». Seul placeholder visible du site avec
  la mention « personne illustrative » absente (Bénédicte est citée par le site actuel).

## Pièges
- `gabarits/comptoir/` non modifié (protégé). `UTILISATION.md` mis à jour. Leçon ajoutée à `agents/lecons/construction.md`.
- Les originaux des photos (`data/restaurants/l-essentiel/photos/`) ont des plats en bandeaux 1490 x 435 : ne jamais les servir en plein cadre.
