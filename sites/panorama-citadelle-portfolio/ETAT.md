# ETAT, panorama-citadelle · portfolio · construction passe 1 sur 3

## Fait
- Gabarit `journee` choisi (matrice dans DESIGN.md), copié sans toucher à `gabarits/`.
- `src/data/site.ts` entièrement remplacé : carte d'automne 2026 (44 plats), 4 petits-déjeuners, menu des fêtes 110 €, horaires 8h-23h, histoire, équipe, presse, 16 photos (alt depuis `photos/index.json`), 6 moments.
- Pages : accueil (6 moments), carte (heure par heure + carte complète + formules), petit-déjeuner (remplace brunch), histoire (« La maison »), réservation, 404. Header, footer, Horaires adaptés.
- Photos WebP dans `public/photos/` (script sharp), `og.jpg` 1200x630.
- Build OK : `dist/panorama-citadelle/portfolio/` (6 pages), noindex, mention « Maquette KYW » et pied KYW présents.

## Reste (phases 2 et 3)
- Art direction : accent vert (tabourets), contrôle contraste, favicon/logo ; supprimer dans `journee.ts` la mention « brunch » (commentaire) ; nom de 2 mots « Le Panorama » dans le hero (vérifier la mise en page du `t-mega` sur 2 lignes).
- Animations, loader, frise, ciel : tester avec le contenu réel ; médaillons (3 au lieu de 3, ok) ; `photo--4x5` sur photos paysage (facade) : vérifier le recadrage.
- QA navigateur (mesures 1440/390, clic en-tête, bas de page), sloplint, RAPPORT.md, leçons.
- `pnpm index`, commit final, publication par la session de correction.

## Décisions / hypothèses
- Horaires : 8h-23h tous les jours (accueil du site) ; « brasserie 11h-23h » affiché « à confirmer » en seconde ligne.
- Page `/brunch/` supprimée (aucune donnée) ; remplacée par `/petit-dejeuner/`.
- E-mail : seul `groupes@panoramanamur.be` (groupes dès 7 personnes), non placeholder.
- Aucun avis client : bloc presse (titres et liens du dossier) à la place.
- Moment « 10h » = présentation du lieu, créé pour garder 6 moments à ciel distinct.
- Portrait 18 (chef) non utilisé : identité à confirmer. Photo 19 (four à bois) en alt neutre.
- Placeholders : 2 lignes du « dernier verre » (digestif 8 €, verre de vin 7 €, marqués « exemple »).
- `gabarits/UTILISATION.md` non mis à jour (gabarits/ protégé) : ajouter la ligne `journee | panorama-citadelle`.
- Pas de `pnpm index` ni de push dans cette phase.
