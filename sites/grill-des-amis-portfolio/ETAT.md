# ETAT, Le Grill des amiS, portfolio (construction, phase 1 sur 3)

## Fait
- Gabarit Braise copié (matrice dans DESIGN.md), package renommé `grill-des-amis-portfolio`, build OK (`pnpm build:site`, 6 pages, `dist/grill-des-amis/portfolio/`, 3 Mo).
- `src/data/site.ts` entièrement remplacé : carte complète (10 catégories, 66 lignes), 3 menus, horaires, adresse, téléphone, histoire en 4 paragraphes, 3 avis illustratifs, 17 photos avec alt, traiteur, colophon.
- Pages : accueil, carte (filtre Entrées / Au feu / Boissons), histoire (« La maison »), réservation, traiteur (ex-privatisation), 404. Header et footer mis à jour.
- Photos WebP dans `public/photos/`, OG, favicon GS, couches de la scène de cuisson (`public/couches/`, générées par un script ponctuel hors dépôt : photo 02 étendue en carré 2400, masques SVG flous).
- Contrôles : aucune trace de l'ancien restaurant dans `dist`, pas de tiret cadratin, `noindex` et mention « Maquette KYW » présents.

## Reste (phases 2 et 3)
- QA navigateur : captures desktop et mobile, reduced motion, clic réel des liens d'en-tête, bas de page avec pied KYW, audit.
- Scène de cuisson : l'assiette de fond est un masque polygonal grossier (bord droit et poignée de la casserole à reprendre), la teinte de recouvrement du fond est visible ; vérifier le rendu au scrub, ajuster les masques ou la photo.
- Vérifier les alt des photos 04, 11, 12, 15 (décrits sans les avoir inspectées une à une) et le recadrage du hero (grill) en mobile.
- Régler le rythme des températures (`data-temp`) sur la page carte (10 catégories) et le contraste du texte à 110-150 °C.
- Page « viandes » dédiée non créée (maturation traitée dans « La maison »).
- RAPPORT.md (placeholders, audit) à écrire en phase 3.

## Décisions et hypothèses
- Placeholders : e-mail, 3 avis (source « avis illustratif »), rôle d'Elise, identité des deux personnes de la photo des patrons, privatisation, températures de cuisson.
- Mardi, mercredi, dimanche fermés (déduit, à confirmer). Menu Viandard à 69 € (le prix de 59 € « jeudredi soir » du PDF est ignoré, source ambiguë).
- Aucun réseau social, aucune note tierce (Google, Tripadvisor) ni récompense affichés : non vérifiables.
- Réservation : lien vers legrilldesamis.be/reserver et téléphone ; le formulaire de démonstration redirige sans envoi.
