# ETAT, phase 1 sur 3 (construction-1), le-servais portfolio

## Fait
- Gabarit Journée copié, choix argumenté dans DESIGN.md (matrice). Package renommé `le-servais-portfolio`.
- `src/data/site.ts` entièrement réécrit depuis donnees.json : six moments (9h, 11h30, 16h, 18h, 20h, 23h), carte complète par rubriques, horaires réels du bar (fermeture après minuit), horaires de cuisine, formules de groupes, privatisation, presse. Seul élément `placeholder` : la photo de la Verrière (origine à confirmer). Téléphone marqué « à confirmer » (081 73 65 52 du site ; restaurants.json donne un autre numéro).
- Pages : accueil, carte, petit-dejeuner, groupes, maison, reservation, 404. Nav : Accueil, La carte, Petit-déj, Groupes, Réserver ; la maison est dans le pied de page.
- Moteur : frise et disque recalés sur 9h à 23h (base.css, Frise.astro, tokens.css, CIELS de journee.ts) ; badge ouvert/fermé corrigé pour une fermeture après minuit (`fin()` et débordement de la veille dans `journee.ts`) ; nuit en turquoise sombre.
- 12 recadrages WebP dans public/photos (script du scratchpad `servais-photos.mjs`), favicon, OG.
- Build OK : `pnpm build:site sites/le-servais-portfolio` écrit `dist/le-servais/portfolio/` (7 pages). Mention « Maquette KYW… » et noindex présents.

## Reste (phases 2 et 3)
- **À supprimer à la main (refusé par le garde-fou)** : les anciennes photos des Potes au Feu encore dans `sites/le-servais-portfolio/public/photos/` (bar-cocktails, chef-*, cuisine-*, dessert-*, equipe-trio, plat-*, portrait-*, salle-*, service-*) ainsi que `logo.png` et `logo-pictogramme.svg` : elles sont servies dans `dist/` sans être référencées. Garder uniquement : bar-comptoir, bar-detail, terrasse, terrasse-large, spaghetti, spaghetti-carre, biere-main, petit-dejeuner, tasse-turquoise, jus-croissant, veranda, veranda-carre (.webp). Puis rebuild.
- Phase 2 : QA navigateur (shoot, audit, clics réels de l'en-tête, bas de page en 1440), animations à vérifier avec le nouveau contenu (médaillons à 2 éléments, `.medaillons` grille inline, hero à 2 mots « Le / Servais » sur `t-mega`, nav de 5 liens en mobile, `photo--4x5` sur le comptoir paysage à 20h : recadrage), état ouvert testé par `page.clock.install`, contrastes de la nuit turquoise, voile du ciel `nuit` dans `journee.ts` (rgba changé), alt, `og.jpg`.
- Option : police condensée majuscule (identité du site actuel), photos libres (cocktail, bar) marquées placeholder si le dossier visuel paraît répétitif.
- Phase 3 : sloplint, RAPPORT.md, `pnpm index`, `gabarits/UTILISATION.md` (ajouter `journee | le-servais` : gabarits/ protégé, non fait en phase 1), commit de `dist/le-servais/`.

## Décisions et hypothèses
- Journée plutôt que Nocturne (listé dans sa fiche) : photos de jour majoritaires, horaires 9h à 1h.
- « 3+1 » écrit tel quel, sans expliquer la mécanique (non prouvée). Boulet liégeois affiché à 16,50 € (1 pièce) et 20,50 € (2 pièces). Bière à 33 cl pour « dernier verre ».
- Margarita à partager (25 €, ligne ambiguë du PDF) non reprise. Pas d'avis cité : un résumé d'avis Tripadvisor (1 avis, 4,0/5) est présenté comme résumé, sans guillemets.
- Itinéraire OpenStreetMap par recherche d'adresse (pas de GPS). JSON-LD sans `geo`.
- Aucun défaut du gabarit à reporter (gabarits/ non touché) ; le gabarit suppose des horaires sans fermeture après minuit : correctif fait dans le site, à reporter dans gabarits/journee si autorisé.
