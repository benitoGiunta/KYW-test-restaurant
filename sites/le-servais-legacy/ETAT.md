# ETAT · Le Servais, variante legacy · fin de phase 1 (construction-1)

## Fait
- Concept et DESIGN.md (Overprint, deal 1/3, draw 4e6e56), AUDIT.md, comp.md (2 comps, c1 choisie).
- Paquet Astro complet, build OK : `dist/le-servais/legacy/` (7 pages : accueil, carte, groupes-privatisation, evenements, carte-cadeau, contact, 404). KywFooter, noindex et mention présents sur chaque page.
- Données : `src/data/site.ts` (carte entière formatée depuis donnees.json, horaires, formules, spécialités).
- Photos du client en WebP (comptoir, terrasse, spaghetti, petit-déjeuner, Verrière), logo disque LS.
- sloplint `src --genre playful` : 0 FAIL, 0 WARN (sans `--render`).

## Reste (phases 2 et 3)
- Phase 2 : menu popover mobile (nav actuelle : liens masqués sous 48 rem), un reveal, jour courant et état « ouvert » dans Horaires, formulaire de contact éventuel, marquee si voulu, favicon dédié, test des trois questions de reproduction, QA navigateur 1440, 1280, 1024, 390, 320, `sloplint --render`.
- Phase 3 : sweep, waive 59 à revérifier au rendu, RAPPORT.md, entrée de journal finale.

## Décisions et hypothèses
- Téléphone : 081 73 65 52 (site, Namur Tourisme) ; restaurants.json donne +32 492 93 87 96 : à confirmer.
- « Margarita 25 € » : prix ambigu du PDF, marqué « prix à confirmer ».
- Photo de la Verrière (`05-salle-veranda`) : origine à confirmer, utilisée seulement sur la page Groupes avec `data-placeholder="true"` et légende « photo d'illustration ».
- Événements : Chalet du Servais « du 27 novembre au 31 décembre » et recrutement relevés sur les affiches de la capture du site (année non affichée) ; Halloween (passé) écarté ; événements d'exemple Wix écartés.
- Carte cadeau : lien vers la page d'origine leservais.be/carte-cadeau ; montants et validité en slot `.fill` (un seul slot).
- Aucun avis, note, équipe ou date d'ouverture publiés (Tripadvisor 4,0 sur 1 avis ignoré : un seul avis).
- Gabarits/ non touchés. `.hallmark/` de ce site et `$LOG` sont gitignorés : `git add -f`.
- Pas d'animation, pas de QA navigateur (hors captures des comps).
