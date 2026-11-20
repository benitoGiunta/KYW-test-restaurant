# ETAT, don-dino-portfolio (phase 1 sur 3)

## Fait
- Gabarit guinguette copié (sans dist, node_modules, rapports), package renommé, build OK (`pnpm build:site`, 6 pages, 2,2 Mo).
- Contenu : `src/data/site.ts` + `src/data/carte.json` (115 plats, prix formatés, généré de donnees.json). Horaires 7j/7, adresse, GPS, téléphone, réservation = https://dondino.be/fr/reservations, Facebook.
- Photos : 11 WebP + 11 carrés `s/` dans `public/photos/` (taille limitée à la source réelle), OG, favicon. Logo copié en `public/photos/logo.png` (non utilisé).
- Pages : accueil, carte, maison (histoire + patron), terrasse et groupes, réservation, 404. Page emporter supprimée, nav mise à jour.
- Palette rouge/vert (tokens.css), objets pizza / chope / basilic.
- DESIGN.md (matrice, décisions, adéquation 78 %).

## Reste (phases 2 et 3)
- QA navigateur : débordements 320-390 px, tirages 358/424/500 px (sources faibles), table à 11 tirages (positions en % à vérifier, un trou possible), mesure LCP, contraste rouge/vert.
- Animations : rien touché au moteur ; vérifier loader (objet pizza) et `heroObjets`.
- Logo manuscrit : envisager une police script pour le nom (ou le logo en masque) ; utiliser `logo.png`.
- RAPPORT.md, sloplint, shoot/audit, `pnpm index`, commit.
- `gabarits/UTILISATION.md` : ajouter « guinguette | don-dino » (protégé en phase construction : à faire par la session mère).

## Décisions et hypothèses
- Slogan = baseline réelle du site actuel ; citation « Les meilleures de la région, paraît-il ! » attribuée au site de la maison.
- Aucun avis réel : 4 avis d'exemple marqués. Google 4,3 non affiché (1033 ou 350 avis, à confirmer).
- Desserts et boissons : 6 lignes `placeholder: true`, marquées sur la page carte.
- Photo « salle-pizza » (homme à la pizza) non légendée par un nom (identité non confirmée).
- Placeholders : email (jamais affiché), avis d'exemple, desserts et boissons.
- « carbonnara » conservé tel que dans la carte du client.
