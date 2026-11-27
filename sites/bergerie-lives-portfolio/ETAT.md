# ETAT : bergerie-lives portfolio (phase 1 sur 3, 27/11/2026)

## Fait
- Gabarit velours copié, requalifié en maison d'hôtes / domaine de mariage (le dossier dit : pas un restaurant).
- DESIGN.md (matrice, décision, sections, art direction). `src/data/site.ts` entièrement réécrit.
- Pages : accueil, chambres, mariage, seminaires, le-domaine, contact, 404 (anciennes pages menu/carte/histoire/privatisation/reservation retirées).
- 25 photos WebP dans `public/photos/` (+ `facade-960`), `og.jpg`, `favicon.svg` ; accent rose poudré.
- Build OK : `dist/bergerie-lives/portfolio/` (7 pages, 6,2 Mo).

## Reste (phases 2 et 3)
- Motion/QA navigateur : shoot, audit, clic réel sur l'en-tête, capture du pied de page en 1440, mobile, reduced motion.
- Vérifier texte de la citation (paraphrase du site actuel), contraste du rose sur sapin, hero mobile, galeries.
- `RAPPORT.md` (non écrit), `pnpm index` et `gabarits/UTILISATION.md` (ligne velours : bergerie-lives) : non faits, gabarits/ interdit en phase test, à faire par la session mère.
- Mise à jour des commentaires du moteur (loader utilise site.nom : à vérifier au shoot).

## Décisions et hypothèses
- Hypothèse : requalification en LodgingBusiness ; aucun horaire ni réservation en ligne : bouton « Programmer une visite » vers /contact/ (téléphone et e-mail prouvés par le site actuel).
- Placeholders (marqués « illustratif » ou « à compléter » à l'écran) : offre « Événement privé » (texte), formules de séminaire, tarifs chambres, capacité (150 ou 250, non confirmée).
- Non affichés car non prouvés : avis, Booking, réseaux, GPS (lien carte par recherche d'adresse), nombre de chambres.
- « Chambres sur place » et « véranda » pour séminaires : déduits du site actuel (chambres + salles), à confirmer.
- Prénoms des propriétaires non affichés (contradiction Martin / Christophe) ; la presse est citée par titre d'article.
