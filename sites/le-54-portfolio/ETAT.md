# ETAT — le-54 portfolio (phase 1/3, construction)
## Fait
- Gabarit Velours copié dans `sites/le-54-portfolio/` ; choix argumenté dans DESIGN.md.
- `src/data/site.ts` réécrit depuis `data/restaurants/le-54/` ; palette bleu nuit / or tirée du logo (tokens, base.css, Base.astro, favicon, og.jpg).
- 7 pages construites et buildées (`pnpm build:site sites/le-54-portfolio` OK, `dist/le-54/portfolio/` : /, menu, carte (formules), histoire, salle, reservation, 404). noindex, mention Maquette KYW et logo KYW sur chaque page (contrôlé dans dist).
- Photos : 16 WebP (≤ 1800 px) dans `public/photos/`, N&B pour la galerie.
## Reste (phases 2 et 3)
- QA navigateur (desktop, mobile 390, reduced motion, clavier), clics réels en-tête, bas de page en fenêtre.
- Vérifier visuellement : hero très sombre, chiffre « 48 » et « 3 » sur photos, portraits `histoire` (3/4 grisaillé sur images paysage), cercle « 54 » de l'en-tête, citation courte, onglets (3 photos).
- Motion : à ajuster seulement si défaut constaté (les rideaux/compteurs sont ceux du gabarit).
- RAPPORT.md, commit de `dist/le-54/`, `pnpm index`.
## Décisions / hypothèses
- Lundi ouvert (site : fermé mardi, mercredi, samedi midi), marqué « à confirmer » ; plages 12-14 / 18:30-21 de Trouve Ton Resto, « à confirmer ».
- Menus : 3 services 48 €, 4 services 65 € (G&M 62 €, noté), 2 services 30 € (G&M seul), tous deux marqués « à confirmer ».
- 34 couverts (Trouve Ton Resto) affiché sans marque dans le texte de la salle, marqué « à confirmer » dans les infos pratiques : à harmoniser.
- Clé `chiffres.chefs` renommée `famille` (3 Collignon) ; `privatisation` renommé `maison`.
- Pas de formulaire de réservation en démonstration : téléphones + lien vers le formulaire du site actuel.
- `gabarits/UTILISATION.md` non modifié (consigne : ne jamais toucher à gabarits/) : y ajouter `velours | le-54`.
- `pnpm install --offline` échoue (pas de cache) mais le build passe avec les dépendances racine.
## Placeholders
Aucun `placeholder: true` ; éléments « à confirmer » listés ci-dessus.
