# ETAT : L'Essentiel, portfolio (gabarit comptoir), fin de la phase 2 (construction-2)

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

## Fait en phase 2 (construction-2)
- Motion : moteur et `motion/setup.ts` du gabarit intacts et vérifiés avec ces données (loader, hero fondu desktop, filets, dressage 220 %, 0 à 5 médaillons posés au scrub, scène 900/900 en 1440, aucune erreur console sur 7 pages x 7 largeurs).
- Signature : anneau laiton (`[data-anneau]`, `pathLength=100`) qui se ferme autour de l'assiette pendant tout le scrub ; survol ou focus d'un médaillon, d'une légende ou d'un item de liste met en avant les trois (`.is-avant`, légende soulignée laiton).
- Interactions : pastille Réserver masquée sur le pied de page (desktop, IntersectionObserver) et absente de `/reservation/` (`.pastille--ici`) ; filet laiton sur la ligne de carte survolée ; état actif des boutons ; `scroll-padding-top`.
- États du formulaire : `:user-invalid` (trait de 2 px rouge brique `#a3321f` + libellé), survol laiton, `:disabled`, message `role=status` après validation (ouverture du calendrier ou lien si fenêtre bloquée).
- Mobile : défaut corrigé, la nav à 5 liens débordait de 82 px (442 > 360) : le lien « Réserver » est masqué sous 768 px (la barre basse le porte), 4 liens tiennent à 320. Formulaire : colonnes `minmax(0,1fr)`, 1 colonne sous 480 px (date et heure débordaient à 320-360). Dressage mobile : la barre basse recouvrait la liste (liste à 828 px, barre à 783) ; stage 38 svh, liste en 2 colonnes, marge basse 5 rem, liste finit à 764 px.
- Reduced motion (1440) : tout visible (5 médaillons, 0 élément masqué, anneau complet, hero opacité 1, loader masqué).
- Contrôles réels : clic Playwright sur chacun des 5 liens d'en-tête en 1440 (elementFromPoint = `<a>`, URL change) ; fenêtre du bas de page 1440 : bande KYW, mention « Maquette KYW » et logo visibles, pastille masquée ; soumission du formulaire ouvre le popup et affiche le statut.
- Build passe (`scripts/build-site.mjs`, 7 pages). Aucun shoot complet (agent captures).

## Reste (phase 3)
- QA navigateur, shoot, axe, contraste (laiton `#9a7a35` sur blanc 3,9:1 : filets et focus seulement ; le rouge `#a3321f` d'erreur fait environ 6,9:1), OG, RAPPORT.md, `pnpm index`, commit de `dist/`.
- Non fait volontairement : curseur suiveur (`data-cursor`) non utilisé, Comptoir vise un seul geste animé. Liste du dressage en mobile : « illustratif » passe à la ligne à côté du nom (acceptable, à juger sur capture).
- Vérifier sur la capture mobile 390 que la scène épinglée tient avec la barre basse (mesure : OK à 390 x 844 ; non mesuré en 667 de haut).

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

## Phase 3 (QA) terminée
- Pages carte, maison, chambres, reservation capturées (1440 et 390) : saines. Meta description de /reservation/ raccourcie (148 car.). Build final passe. RAPPORT.md écrit. Rien ne reste hors points ouverts du RAPPORT.

## Passe 2 de relecture (relecteur-site, 07/11/2026)
- Fait : REVUE-2.md (verdict A_CORRIGER : 0 F0, 1 F1, 2 F2, 7 F3). Corrections F1-1, F1-2, F2-1, F2-3, F2-4, F2-5 vérifiées ; F2-2 partielle.
- Reste : F1-3 (h1 du hero coupé dès 1536 px, `base.css:79`), F2-6 (défilement horizontal de l'accueil à 768 et 820 px, `.dressage__scene`), F2-2bis (13 surtitres), F3-1 à F3-7.
- Pièges : mesurer le h1 par `Range` et non par `scrollWidth` ; tester 768 et 820 px ; `scripts/q.sh` pour toute boucle de largeurs (> 120 s : arrière-plan).
