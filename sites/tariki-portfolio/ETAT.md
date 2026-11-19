# ETAT, tariki-portfolio, construction phase 1 sur 3

## Fait
- Gabarit braise copié et adapté (DESIGN.md : matrice, décisions, adéquation 72 %).
- `src/data/site.ts` : contenu complet du dossier (carte midi et soir avec prix, horaires, téléphone, e-mail, Instagram, chemin, presse). Données absentes passées à `null` ou retirées (geo, bon cadeau, équipe, avis, privatisation).
- 5 pages : accueil, carte, histoire (« Le chemin »), réservation, 404. Page privatisation supprimée. Build OK (`pnpm build:site sites/tariki-portfolio`, 5 pages, dist/tariki/portfolio/ = 2,8 Mo).
- Assets : 3 visuels du client en WebP, logo WebP, 4 couches du plat dessinées en SVG, favicon flamme, OG braises + logo.
- Accent doré du logo, pastille ouvert/fermé à l'heure de Bruxelles.

## Reste (phases 2 et 3)
- **À supprimer à la main (une suppression `rm` par glob a été refusée par la sécurité)** : les 25 photos héritées du gabarit (Les Potes au Feu, droits tiers) dans `sites/tariki-portfolio/public/photos/` ; ne garder que `braises.webp`, `feu-de-camp.webp`, `arcades.webp`, `logo.webp`. Elles ne sont référencées par aucune page mais partent dans `dist/` : ne pas publier avant. Reconstruire ensuite.
- QA navigateur (shoot, audit, clics réels de l'en-tête, bas de page en 1440, mention Maquette KYW) : non faite.
- Contraste de l'accent à 90 °C (`#7a5010` sur `#e6d5bf`, borderline : essayer `#6b4608`) et du texte sur braises.
- Vérifier la scène « cuisson » avec l'illustration (échelle, ordre des couches, `hero__voile`), le marquee de 5 pays (CSS `.marquee__item` sur `<p>`), `.salle__wall` à une seule figure, `.mains__grid` à deux éléments (mobile, 320/360/390).
- Animations : conservées telles quelles du gabarit, rien d'ajouté.
- `gabarits/UTILISATION.md` : ajouter `tariki` à la ligne braise (gabarits/ protégé, non modifié).
- Revoir si le logo (calligraphie arabe) doit apparaître dans le hero (mix-blend-mode: screen sur le fond sombre).

## Décisions et hypothèses
- Carte du soir = version de /la-carte (prix à confirmer). « Le début du voyage » (18 €) affiché avec la mention « À confirmer avec le restaurant ».
- Réservation : lien vers le module du site actuel (https://www.tarikirestaurant.be#reservation), formulaire de démonstration conservé.
- Adresse : rue de l'Ouvrage 2 (site) ; pas de coordonnées GPS ; lien d'itinéraire par recherche OpenStreetMap.
- Aucun avis, aucun nom d'équipe, aucune citation inventés. Placeholders marqués : photos feu de camp et arcades, 4 couches du plat et températures.
- Stock Picsum parcouru (6 planches) : aucune photo de nourriture, rien retenu.

## Pièges
- `.photos/` et `.logs/` créés à la racine (journaux et planches), non commités.
