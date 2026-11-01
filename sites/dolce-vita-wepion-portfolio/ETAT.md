# ETAT : dolce-vita-wepion-portfolio (phase 3 sur 3 faite)

## Fait
- Gabarit forno copié, adapté : palette, contenu (`src/data/site.ts` + `src/data/carte.json` tiré de donnees.json), 7 pages (accueil, carte, pizze, histoire, à emporter, réservation, 404), photos WebP dans `public/photos/`, favicon, OG.
- Build OK : `scripts/q.sh dvw-build node scripts/build-site.mjs sites/dolce-vita-wepion-portfolio` -> `dist/dolce-vita-wepion/portfolio/` (7 pages).
- DESIGN.md (matrice, décisions). `gabarits/UTILISATION.md` mis à jour.

## Phase 2 (faite)
- Signature : la levée garde sa mécanique (--p scrubée) ; ajout d'un filet tomate `.levee__rail` (scaleX(--p)) sous l'en-tête, masqué sans motion (html:not(.motion)).
- Les gens : puces de liste retirées, cartes sans photo en vert forêt avec initiale tomate et « Photo à fournir » (accueil et histoire, `<Fragment>` obligatoire dans un ternaire Astro) ; piste focalisable (`tabindex=0`, aria-label) ; flèches en `aria-disabled` aux bouts et masquées (`hidden`) quand rien ne déborde (1440 : 2 cartes tiennent ; 390 : flèches actives, mesuré scrollLeft 0 -> 220).
- Compte à rebours testé par `page.clock.install` (Europe/Brussels) : mar. 12:30 -> mer. 18:00 (1 j 5 h 29) ; mer. 12:30 -> mer. 18:00 ; sam. 12:30 -> sam. 18:00 ; dim. 13:00 -> « C'est ouvert jusqu'à 14:00 » ; lun. 14:30 -> lun. 18:00 ; mer. 19:00 -> ouvert jusqu'à 22:00. Tous conformes aux horaires.
- Clics réels sur les 5 liens de l'en-tête, 6 pages en 1440 : 0 échec ; bas de page : bande KYW, mention « Maquette KYW, certaines données sont illustratives » et un seul logo visibles (accueil, carte, pizze, histoire, à emporter, réservation).
- Débordement horizontal : scrollWidth = clientWidth à 1440, 1280, 1024, 390, 320 sur les 6 pages ; 0 erreur console ; seuls les `<img>` à parallaxe dépassent (attendu, rognés par leur figure).
- Reduced motion (1440) : levée en état final statique, marquee à une piste, signatures et mur visibles, rien de caché. Mobile 390 : hero, levée, signatures, mur, gens, bande, avis, pied relus par planche, RAS.
- Commentaires d'en-tête de base.css et setup.ts corrigés.
- Build OK (`scripts/q.sh dvwp2-build node scripts/build-site.mjs sites/dolce-vita-wepion-portfolio`). Serveur de test (PID 7096) arrêté.

## Reste (phase 3)
- Shoot complet et audit par l'agent « captures » ; sloplint (`sloplint src --genre editorial` depuis le dossier du site) ; RAPPORT.md ; `pnpm index` ; commit de `dist/` et push.
- Marquee en reduced motion : une piste statique rognée à droite (« SC… ») : acceptable, à signaler si la revue le relève.
- Photos 09, 10, 11 importées mais non affichées ; logo crème (qualité 3) non utilisé ; portraits à fournir.
- Page histoire : non revérifiée en détail sur les cartes de l'équipe après le changement de style (même balisage que l'accueil).

## Décisions et hypothèses
- Forno choisi (25/30). Les autres FICHE ne sont pas toutes relues.
- Vert forêt à la place du brun : les noms de jetons (`--four`, `--tomate`) sont conservés (contrat du moteur).
- Photos : vignettes rondes seulement pour Antipasto Dolce Vita (planche), Margherita, Moelleux (sujet de photo concordant) ; escalope, burrata et pâtes aux palourdes non rattachées à un plat de la carte (le nom de fichier ne vaut pas légende). Photos 09, 10, 11 importées mais non affichées à ce stade.
- Avis : 3 extraits Google réels du site client, auteurs en initiale comme affichés. Aucune note ni nombre d'avis publiés.
- Pas de GPS : plan par recherche d'adresse OpenStreetMap, pas de `geo` en JSON-LD. E-mail réel du dossier.
- Fermeture exceptionnelle du 26 au 29 octobre non reprise (date passée, aucune date en dur).
- Description « Crème brûlée : Meilleures qu'en vacances » et « Le plaisir d'abord » (nuggets) repris tels que dans la carte du client. Descriptions parasites (« À table », « Les pizzas ») neutralisées.
- Aucune donnée `placeholder: true` : tout est sourcé. Manques assumés : portraits, GPS, abonnés, presse.

## Pièges
- `gabarits/` non touché. Défaut gabarit connu à reporter : le gabarit suppose un nom en deux lignes (ici « La Dolce » / « Vita », le titre de la levée est « Vita »).

## Phase 3 (faite)
- QA : captures ciblées pizze, histoire, à emporter, réservation (1440, 390) RAS ; inventions « par téléphone » et « carte de fidélité » retirées ; build OK ; RAPPORT.md écrit. Reste : `pnpm index`, commit, push (publication).
