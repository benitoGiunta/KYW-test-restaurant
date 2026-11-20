# ETAT — Le D'Arville, portfolio, phase 1 sur 3 (construction-1)

## Fait
- Gabarit Velours choisi (matrice dans DESIGN.md), copié sans `node_modules`/`dist`, package renommé `site-le-d-arville-portfolio`.
- `src/data/site.ts` entièrement remplacé (carte complète, 3 menus, horaires, coordonnées, Barabas, 6 chiffres avec preuve, placeholders flaggés).
- 22 photos converties en WebP (script scratchpad `darv-photos.mjs`) dans `public/photos/` ; favicon, og.jpg.
- Pages : accueil, menu (carte), carte (menus), histoire (la maison), barabas, evenements, reservation, 404 ; en-tête 5 liens, pied de page mis à jour ; tokens (accent orange `#d98b4a`) et CSS ajoutées en fin de `base.css`.
- `pnpm build:site sites/le-d-arville-portfolio` passe (8 pages) via q.sh ; noindex et mention KYW présents.

## Reste
- Phase 2 : motion/QA navigateur (aucun serveur lancé en phase 1), mini-script clics réels de l'en-tête (5 liens + Réserver, risque de retour à la ligne en 1440), capture du bas de page.
- Photos 12/14 portrait : vérifier les recadrages de la galerie ; hauteur des items.
- RAPPORT.md non écrit (phase 3). `pnpm index`, commit, `dist/` : non faits.
- `gabarits/UTILISATION.md` : ajouter `| velours | le-d-arville |` (consigne figée, non touché).

## Décisions
- Hypothèses : heures 12:00-14:30 / 19:00-21:30 illustratives ; jours = site officiel ; G&M 15/20 (16/20 Trouve Ton Resto non retenu) ; Tripadvisor sans lien.
- Aucune citation d'avis inventée : bloc citation = plat de la carte. Michelin, Delta d'Or non affichés (non confirmés).
- Portrait du chef non nommé en alt (identité de la photo à confirmer) ; texte « Estelle et Olivier » sur preuve du site.
- Route `/privatisation/` remplacée par `/evenements/` ; `/histoire/` conservée pour « La maison ».
- Pièges : `.illu` doit rester visible ; `Chiffre` du gabarit a changé de clés (menus, prix, hotes, ouverture, barabas, domaine).
