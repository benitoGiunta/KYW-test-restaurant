# ETAT : ne5t portfolio, phase 2 sur 3 (construction-2) faite ; phase 1 ci-dessous

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

## Phase 2 (construction-2) : fait
- Signature ambre (`src/motion/setup.ts`, `base.css`) : filet de lecture sous l'en-tête (`--progres` écrit sur `.header` seul, ScrollTrigger `end: max`) ;
  monogramme « N5 » qui se remplit (`.is-passe`) une fois le hero d'accueil ou l'en-tête de page dépassé ; façade du hero qui se pose
  (échelle 1,08 vers 1, 2,2 s) puis dérive de 7 % au défilement (picture `top: -10%; height: 120%`). Desktop uniquement ; mobile et reduced motion : statique.
- Onglets : correctif z-index de Velours (photos en -2 sous le voile, voile latéral + `brightness(1.25)`), un bouton d'action par panneau
  (Privatiser / Repas en suite / Le spa et les suites ; champ `lien` ajouté à `Offre`), hauteur de panneau stable (735 px aux trois onglets),
  rotation en une seule traversée puis arrêt, un clic ou une flèche l'arrête pour de bon (WCAG 2.2.2).
- Finitions : « Lundi et mardi » (plus de capitalize), `.horaires` empilé sous 480 px (débordement 350 px à 320 sur /sejour/ corrigé),
  cibles 44 px en tactile (Réserver, liens isolés du pied, de la clôture et de la réservation), états survol des lignes de menu, formules et chips de suites,
  `color-scheme: dark`, libellé de curseur de la galerie « La maison ».
- Mesures (Playwright, scripts dans le scratchpad, captures dans `.shots/ne5t-p2/`, non un shoot complet) : clics réels sur les 7 liens d'en-tête
  des 7 pages = 49 navigations OK, `elementFromPoint` = `<a>` ; aucun débordement à 320 et 390 sur 7 pages ; compteurs finaux 4 / 60 / 6 / 45 ;
  mention KYW et logo visibles en bas de page 1440 ; reduced motion : pas de rideau, citation à opacité 1, aucun `data-reveal` caché, filet absent ;
  console sans erreur (hors 404 attendue de l'URL inexistante). Build : 8 pages OK (`scripts/q.sh ne5t-build`).

## Reste (phase 3)
- Shoot complet par l'agent captures puis lecture de `QA-<étape>.md` ; contrôle visuel des 7 pages à 1440 et 390 (seuls accueil, menu bas, séjour mobile ont été vus ici).
- RAPPORT.md (placeholders, shoot/audit), sloplint (`sloplint src --genre editorial --url <page>`), LCP (mesure en série, hero dérivé en `transform`).
- Pas vérifié : heure d'ouverture en direct (horaires exacts inconnus : pas de badge « ouvert »), pied de page KYW `kyw-footer__link` de 24 px de haut (paquet partagé, non modifié).
- `gabarits/UTILISATION.md` (ligne Velours : ajouter `ne5t`) et défauts Velours (z-index onglets, `capitalize`, `.horaires`) à reporter dans `gabarits/velours/` : intouchable ici.
- `pnpm index` et `pnpm-lock.yaml` : non faits (phase 3 ou session mère).

## Reste de la phase 1 (historique)
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
