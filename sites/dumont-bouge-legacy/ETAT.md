# ETAT · Dumont Bouge legacy · phase 1 (construction-1)

## Fait
- Audit (AUDIT.md, `.hallmark/before.*`), deal/draw/scaffold (Garden, accent rose du client), DESIGN.md (Picks, tokens, composants), comp.md (reporté).
- Paquet Astro : 6 routes (/, /boulangerie, /patisserie, /emporter, /menu, /reservations) + 404 ; composants Nav, Footer (mast), Photo, Carte, Horaires, Cloture ; données `src/data/site.ts` + `carte.json` (211 lignes copiées de donnees.json).
- Build passe (`pnpm build:site sites/dumont-bouge-legacy`) ; KywFooter, noindex et mention « Maquette KYW » présents sur les 7 routes ; aucun tiret cadratin rendu.

## Reste (phases 2 et 3)
- Comp c1/c2 et choix écrit ; sloplint --render sur serveur (le rendu depuis file:// casse les chemins base) ; capture et lecture du héros à 1280x800, mobile 375.
- Nav mobile (liens masqués sous 60 rem : ajouter un menu ou une rangée), jour courant dans les horaires, formulaire (états, validation), reveal unique, bouton actif.
- Vérifier le brush (texture 487 px étirée, `mix-blend-mode: multiply`) et le contraste du texte sur la bande ; REFLEX sloplint 59 (écart de sections), 77/78 à lire au rendu ; sloplint 44c sur /reservations.
- Photos : les pains et le latte sont des placeholders de bibliothèque (crédités au pied) ; le tea-room et le brunch n'ont aucune photo client. Image 06 (tarte aux framboises) écartée : image de vidéo avec barres noires et interface.
- RAPPORT.md, Sweep du DESIGN.md.

## Décisions et hypothèses
- Formule « Dumont » à 13,80 € (carte du site, embeds/menu.html) et non 13,50 € (donnees.json `menus`, ancienne valeur).
- Adresse : Chaussée de Louvain 343, 5004 Bouge ; second point Namur affiché avec ses horaires. E-mail : celui du site (srl-dumontbouge@outlook.com), pas l'e-mail personnel de restaurants.json.
- Héros Poster gardé malgré le tirage Ledge ; nav gardée (pas de slab).
- Pas d'avis, d'histoire, d'équipe, ni de métrique : absents des données, non inventés. Un slot `.fill` (prix des gâteaux).
- Les iframes de carte sont reconstruites en natif ; recherche et onglets du site d'origine non reproduits (noté dans le stamp, `dropped`).
