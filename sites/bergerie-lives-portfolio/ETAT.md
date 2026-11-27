# ETAT : bergerie-lives portfolio (phase 2 sur 3 faite, 27/11/2026)

## Fait
- Gabarit velours copié, requalifié en maison d'hôtes / domaine de mariage (le dossier dit : pas un restaurant).
- DESIGN.md (matrice, décision, sections, art direction). `src/data/site.ts` entièrement réécrit.
- Pages : accueil, chambres, mariage, seminaires, le-domaine, contact, 404 (anciennes pages menu/carte/histoire/privatisation/reservation retirées).
- 25 photos WebP dans `public/photos/` (+ `facade-960`), `og.jpg`, `favicon.svg` ; accent rose poudré.
- Build OK : `dist/bergerie-lives/portfolio/` (7 pages, 6,2 Mo).

## Phase 2 faite (motion, signature, états, mobile, reduced motion)
- Signature « le rideau se lève sur la journée » : filet rose sous l'en-tête + monogramme BL qui se remplit du bas (`--progres` écrit par `signature()` dans `src/motion/setup.ts`, ScrollTrigger sur `documentElement`) ; masqué et non écrit en reduced motion ; pseudo-éléments scopés `.header .header__cercle` (le cercle du pied de page reste simple).
- Interactions : `data-magnetic` sur les deux boutons primaires de l'accueil ; curseur « Voir » sur la galerie N&B (existant) ; états `:active`, `::selection`, `scroll-margin-top` (ancres sous l'en-tête collant, plus haut en mobile), onglet actif souligné, flèches gauche/droite testées.
- Correctif Velours : voile des onglets (`.onglets::before`) passé derrière les photos par erreur de z-index ; photos à -2, voile à -1 avec dégradé latéral : texte lisible sur la véranda et le jardin.
- Reduced motion : rideaux, filet, monogramme, zooms masqués ; aucun `[data-reveal]` caché ; pages lisibles.
- Mesures (Playwright maison, 7 pages x 1440 / 390 / reduced) : 0 débordement horizontal, 0 erreur console (un 404 ressource vu une fois sur mobile /seminaires/, non reproduit, tous les assets référencés existent), mention KYW et logo KYW visibles en bas de chaque page, 12 clics réels d'en-tête OK (elementFromPoint = a, URL change), onglets au clavier OK.
- Build OK (`scripts/q.sh`) : `dist/bergerie-lives/portfolio/` (7 pages).

## Reste (phase 3)
- Shoot/audit complets par l'agent captures ; lire `QA-<étape>.md` (contraste du rose sur sapin, hero mobile, galeries, axe).
- `RAPPORT.md` (non écrit), `pnpm index` et `gabarits/UTILISATION.md` (ligne velours : bergerie-lives) : non faits, gabarits/ interdit en phase test, à faire par la session mère. Défaut Velours (z-index voile des onglets, `.chapitre__photo` sans `overflow: clip`) à reporter dans `gabarits/velours/`.
- Non fait : lightbox de la galerie (le curseur « Voir » n'ouvre rien ; à renommer ou retirer si la revue le juge trompeur).

## Décisions et hypothèses
- Hypothèse : requalification en LodgingBusiness ; aucun horaire ni réservation en ligne : bouton « Programmer une visite » vers /contact/ (téléphone et e-mail prouvés par le site actuel).
- Placeholders (marqués « illustratif » ou « à compléter » à l'écran) : offre « Événement privé » (texte), formules de séminaire, tarifs chambres, capacité (150 ou 250, non confirmée).
- Non affichés car non prouvés : avis, Booking, réseaux, GPS (lien carte par recherche d'adresse), nombre de chambres.
- « Chambres sur place » et « véranda » pour séminaires : déduits du site actuel (chambres + salles), à confirmer.
- Prénoms des propriétaires non affichés (contradiction Martin / Christophe) ; la presse est citée par titre d'article.
