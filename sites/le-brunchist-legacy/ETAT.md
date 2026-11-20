# ETAT · le-brunchist · variante legacy · fin de la phase 1 (construction-1)

## Fait
- AUDIT.md (site d'origine illisible : anti-robot), DESIGN.md (Picks, thème Vellum, composants), comp.md (2 comps, c1 choisie).
- Paquet Astro complet : `src/data/site.ts`, `layouts/Base.astro`, 7 composants, `pages/index.astro` et `404.astro`, `styles/{tokens,base,page}.css` (stamp en tête).
- Contenu : uniquement des données du dossier ; plats cités par des sources tierces avec compositions illustratives (`data-placeholder`) ; aucun prix ; avis Google et titres de presse repris mot pour mot.
- Photos : 3 photos libres provisoires (matcha, croissant, coin de salle), WebP, créditées au pied. Non utilisées et supprimées : tabourets de bar, grains de café.
- Build : `pnpm build:site sites/le-brunchist-legacy` passe (`dist/le-brunchist/legacy/`). sloplint --render : seuls restent les FAIL 48 du paquet kyw-footer (jamais modifié) ; waivers 49b, 59 ; dismissed 42, 25 ; answered F4.
- Switcher de la carte : script minimal déjà en place (Base.astro).

## Reste (phases 2 et 3)
- Phase 2 : menu mobile (nav masquée sous 60 rem), jour courant des horaires, un reveal au plus, états des contrôles, QA navigateur, captures 375/1440/1920, Switcher au clavier.
- Phase 3 : sweep, juges, RAPPORT.md, commit `[publier]` final avec `pnpm index`.
- Relire `anatomy.md`, `imagery.md`, `craft.md`, `gates.md` § 1-4, `patterns.md` (lus par extraits seulement en phase 1).

## Décisions et hypothèses
- Site d'origine inconnu : one-page + 404 supposés.
- Pas de réservation (aucun outil connu) : action = Appeler (`tel:+32474069227`) et Itinéraire (lien Google Maps construit sur l'adresse).
- Swaps du draw : barre de recherche, barre de réservation, créneaux, carte midi/soir remplacés (voir DESIGN.md).
- Horaires mer.-dim. 9 h 30 à 15 h 30 (Namur CentreVille) ; sources contradictoires : à confirmer. Adresse Place d'Armes 8 (ancienne : Rue des Brasseurs 39) ; téléphone récent 0474 06 92 27.
- `.fill` (2) : prix, réservation. À vérifier : ouverture 2022 par Mélisande et Arnaud (ELLE.be), vaisselle vintage, terrasse, options végétales, deux extraits d'avis en anglais.

## Pièges
- sloplint doit tourner sur une copie aplatie (voir data/usage/test-1/lecons-proposees/le-brunchist.md) ; script du scratchpad `bl-lint.sh`.
- Grenze Gotisch : jamais sous 30 px ni en h3 ; éviter une tête commençant par I.
