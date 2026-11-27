# ETAT — bienvenue-chez-vous-portfolio, passe construction-1 (phase 1 sur 3)

## Fait
- Gabarit Velours copié (sans node_modules/dist), choix argumenté dans DESIGN.md.
- `src/data/site.ts` réécrit depuis dossier.md et donnees.json (adresse, tél., horaires, 4 formules, carte relevée, citation,
  traiteur, distinctions, chiffres avec preuves). Type `Restaurant` adapté (sigle, mercredi, emporter, geo/URL de réservation retirés).
- 7 pages construites : accueil, `/menu/`, `/carte/` (formules), `/histoire/` (le chef), `/emporter/`, `/reservation/`, 404.
- Palette bordeaux / rouge d'enseigne (tokens.css + teintes en dur de base.css), favicon, og.jpg, 20 photos WebP (`public/photos/`,
  script de génération hors dépôt).
- Build OK : `dist/bienvenue-chez-vous/portfolio/` (7 pages). noindex et « Maquette KYW » présents.

## Reste (phases 2 et 3)
- QA navigateur : shoot/audit, clics d'en-tête (lesson z-index), bas de page 1440, mobile 390, contrastes réels.
- Vérifier le hero (smiley rose + scrim bordeaux), les recadrages « attention » des photos (menu 2/3, onglets 16/9), l'en-tête à 4 liens.
- Commentaires de tête de base.css/composants mentionnent encore « vert sapin / cuivre » (texte seulement).
- Motion : rien touché ; contrôler que le chiffre « 1 » et « 2002 » comptent proprement.
- Pas de RAPPORT.md ni de commit de dist/ index (`pnpm index` à faire en fin de chantier).

## Décisions et hypothèses
- Photos en couleur, pas de noir et blanc ; aucun portrait du chef (inexistant) : chapitre « 1 chef » posé sur la façade.
- Téléphone (Gault&Millau, Restaurant Guru) et horaires (guides) affichés avec mention « à confirmer » sur la page réservation ; e-mail non affiché.
- Pas de coordonnées GPS (inconnues) : itinéraire par recherche OpenStreetMap sur l'adresse ; JSON-LD sans `geo`.
- Mercredis à prix réduit : sans tarif (ambigu). Box Bienvenue 109 € signalée « à confirmer ».
- Tarifs Gault&Millau (103 €, 113 €) divergent du site : site retenu.
- `gabarits/UTILISATION.md` non mis à jour (interdit de toucher gabarits/ dans cette passe) : ajouter « velours | bienvenue-chez-vous ».
