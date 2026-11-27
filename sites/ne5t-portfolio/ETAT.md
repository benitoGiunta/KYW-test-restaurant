# ETAT : ne5t portfolio, phase 1 sur 3 (construction-1)

## Fait
- Gabarit Velours copié dans `sites/ne5t-portfolio/` (package renommé `ne5t-portfolio`), `pnpm install` OK.
- `DESIGN.md` : matrice de choix, sections, art direction, adéquation 82 %.
- `src/data/site.ts` entièrement réécrit depuis `data/restaurants/ne5t/` (carte du mois, 3 formules, horaires par service,
  spa, six hébergements, presse, devise). Pas de geo ni d'heures (inconnues) : JSON-LD sans `geo` ni `openingHoursSpecification`.
- Pages : `/`, `/menu/`, `/carte/` (formules), `/histoire/` (La maison), `/sejour/` (Suites et spa, nouvelle), `/privatisation/`
  (privatiser et repas en suite), `/reservation/` (téléphone, chambres via RoomRaccoon), `404`.
- Palette bleu nuit / ambre dans `tokens.css`, `base.css`, `Base.astro` (theme-color), favicon N5, OG, 23 photos WebP dans `public/photos/`.
- Build : `scripts/q.sh ne5t-build node scripts/build-site.mjs sites/ne5t-portfolio` OK, 8 pages, `dist/ne5t/portfolio/`.
  Contrôles grep : aucun reste « Potes / Michelin / Zenchef », noindex et mention KYW présents, titres uniques.

## Reste (phases 2 et 3)
- Phase 2 : animations et réglages du moteur (rideaux, compteurs, onglets : vérifier que `data-compteur` ne casse pas sur 60/45), QA navigateur
  (aucune capture lue ici), vérifier le hero (nom « NE5T Intuition » en deux mots, mobile 390), la galerie (ordre des hauteurs), le
  triptyque 2:3 sur plats recadrés depuis des paysages (06, 07), contrastes `.illu`, clics réels d'en-tête (6 liens, nav plus longue).
- Rédiger RAPPORT.md (placeholders, shoot/audit), sloplint.
- Le chapeau « Revue de presse de la maison » renvoie à ne5t.com/revue-de-presse/ : confirmer que les cinq noms sont lisibles.
- `gabarits/UTILISATION.md` : ajouter `ne5t` à la ligne Velours (non fait : `gabarits/` intouchable dans ce run).
- `pnpm index`, commit de `dist/index.html` et de `pnpm-lock.yaml` : non faits en phase 1.

## Décisions et hypothèses
- Adresse : Avenue Vauban 46 (site client) contre Allée de Menton 26 (BCE) : le site client prime ; à confirmer par le client.
- Marque affichée « NE5T Intuition » ; `nomLong` « NE5T Hôtel & Spa, restaurant Intuition » en schema.org et pied de page.
- Placeholders : texte de l'offre « Privatisation » (`textePlaceholder: true`, exemples d'occasions illustratifs, badge visible) ;
  heures exactes (badge « à confirmer » sur la page Réservation) ; lundi et mardi « fermé (à confirmer) ».
- « Nico » et « Manu » : prénoms seuls prouvés ; photos de service sans légende nominative (alt neutre) ; hypothèse que 09 et 11
  illustrent leur rôle (cuisine, vin) sans les identifier.
- Menu du mois daté du 27/11/2026 sur la page ; pas de numéros de services ; fromage 14 € avec supplément 9 € à la place du dessert.
- Aucune note, avis ni distinction affichés. Citation = devise de la maison tirée du site client.
- Zenchef non repris : le restaurant dit réserver par téléphone uniquement.
- Photos 08 (440 px) et 16 (bandeau 420 px) écartées, logo non repris.
