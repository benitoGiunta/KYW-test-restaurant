# ETAT — bienvenue-chez-vous-portfolio, passe construction-2 (phase 2 sur 3)

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

## Phase 2 (construction-2) — fait
- Signature adaptée : « sourire » (arc SVG rouge sous le nom du hero, tracé en 0,9 s après les mots ; plein au premier rendu en mobile, reduced motion, sans JS). Rappel du dessert-smiley, ton plus chaleureux que le rideau seul.
- Motion : parallaxe du hero (photo +8 %, scrub, desktop seulement) ; « escales » du menu (le numéro de la ligne au centre s'allume en rose pâle, 1 seule active à la fois) ; rideaux, compteurs, citation, onglets du gabarit conservés.
- États et tactile : retour d'appui (`:active`, tap-highlight rouge), `.btn:disabled`, cibles 44 px sous `pointer: coarse` (liens, guides, pied, bouton Réserver petit), galerie en scroll-snap.
- Pied de page : « Lundi et dimanche » (le `capitalize` donnait « Et »), colonne `minmax(0, 1fr)`.
- Textes de tête et commentaires CSS/TS : « vert sapin / cuivre » remplacés par bordeaux / rouge.
- Vérifié en navigateur (Chromium, serveur arrêté) : clics réels sur les 4 liens d'en-tête des 6 pages (elementFromPoint = `<a>`, URL change) ; bas de page 1440 (bandeau KYW + mention Maquette visibles) ; aucune erreur console ; pas de débordement horizontal en 1440 et 390 ; reduced motion (pas de loader, compteur « 4 », pan de rideau masqué, sourire plein) ; mobile 390 sans cible < 40 px ; menu mobile ouvert OK.
- Build OK : `dist/bienvenue-chez-vous/portfolio/` (7 pages).

## Reste (phase 3)
- Shoot/audit complets par l'agent captures (non fait ici, par consigne) ; lire QA-<étape>.md.
- Contrastes réels, recadrages « attention » des photos (menu 2/3, onglets 16/9), 404 réelle.
- RAPPORT.md, `pnpm index`, commit de `dist/index.html`, `gabarits/UTILISATION.md` (« velours | bienvenue-chez-vous »).
- Mercredis à prix réduit / box 109 € / téléphone : toujours « à confirmer ».
- Pièges : `scripts/build-site.mjs` écrit dans `dist/` du dépôt (serveur sur `dist/` à relancer après build) ; un heredoc contenant du JS multiligne a déclenché le contrôle `rm` du shell : écrire les scripts de contrôle avec Write.

## Phase 3 (QA) — fait
- Audit 0 FAIL ; shoot 3 pages sans erreur ; correction du voile de la bande « À emporter » (base.css l.149) ; build OK ; RAPPORT.md écrit.
- Reste : `gabarits/UTILISATION.md` (session mère). Le build final est déjà commité avec dist/.

## Publication (2026-11-27, agent publication, phase test)
- Fait : build OK des 3 variantes (scripts/build-site.mjs), pnpm index, commit et push sur claude/laughing-wozniak-vxc1fo (3d3affd5 et fa2c83a7).
- Vérifié en local (serve.mjs port 4620) : kyw-footer présent sur chaque page, index liste les 3 variantes.
- Non fait : aucun push sur publication (réservé à scripts/publier.sh, session de correction).
- Piège : rebase conflictuel sur dist/index.html (généré) ; résolu en régénérant par pnpm index.
