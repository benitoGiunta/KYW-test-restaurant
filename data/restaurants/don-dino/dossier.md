# Dossier client : Don Dino (Naninne, Namur)

Recherche du 20/11/2026. Sources : site actuel dondino.be (capture et HTML du 20/11/2026), carte PDF du site, Rankeat (JSON-LD), `data/restaurants.json` (BCE 0544462087, dénomination GADO). Un fait non trouvé est `inconnu`.

## Site actuel
- https://dondino.be, aucune redirection ; 0 erreur console, 39 requêtes (infos.json). Éditeur : OYÉ-OYÉ by Petit Futé (crédit pied de page). Technos détectées : astro, react, ogl, next (détection brute, à confirmer).
- Structure : accueil (bandeau « Visite virtuelle de notre restaurant ! », accroche « Les pizzas de Don Dino ? Les meilleures de la région paraît-il ! », carte, itinéraire, équipements, contact), Menu et Pizzas, Réservations, Groupes et Privatisation, À propos (Concept, Histoire, Équipe, Presse, Visite virtuelle), Recrutement, Contact. Trilingue FR/EN/NL. Bannière cookies (accepter, personnaliser, continuer sans accepter) et avertissement « version de navigateur partiellement supportée ».
- Réservation : « demande en ligne » (formulaire Devis & Réservation) ou téléphone +32 81 74 15 60 (dondino.be/fr/reservations). Pas de TheFork ni Zenchef.
- Carte : un seul PDF de 8 pages (`site-actuel/carte.pdf`), avec des encarts publicitaires de commerçants locaux intercalés (isolation, vélos, toiture, terrassement…). Pas de desserts ni de boissons dans le PDF.
- Points faibles : contenu très succinct (histoire en une phrase, presse sans titres), carte non lisible comme HTML, photos peu nombreuses. Points forts : horaires 7j/7 clairs, équipements listés, visite virtuelle, trilingue.
- Pages internes sauvegardées dans `site-actuel/pages/` (HTML, sans captures d'écran : pages quasi sans contenu). Palette et polices : non analysées au-delà de la capture `desktop-haut.png` (logo vert et rouge, façon drapeau italien).

## Photos
13 fichiers dans `photos/` (index.json) : 8 plats et pâtes, bar, pizzaïolo au four, salle, un homme tenant une pizza, logo. Bonnes (qualité 4-5) : moules gratinées, toast tomates-mozzarella, pizza sur planche, spaghetti, bar, pizzaïolo, pizza jambon cru (4412 px). Moyennes : pizza anchois (566 px), salle (640 px), escalope (714 px). Faibles : pâtes fraîches type vidéo (226 px), homme avec pizza (510 px). Les mentions de taille dans les URL du CDN sont les tailles d'origine : les fichiers ont été redimensionnés à 2000 px de large, donc les trois derniers sont agrandis. Personnes non nommées sans preuve.

## Identité
- Nom public : Don Dino (BCE : GADO). Baseline du site : « Brasserie-restaurant-pizzeria. Spécialités italiennes et bonne ambiance ! Nous sommes ouvert 7 jours/7 midi et soir. Patron en salle. »
- Ouverture : depuis 2014 (dondino.be/fr/histoire). Patron : Placido Scalisi, dit « Dino », « Il Condottiere », « né dans une cuisine, meneur d'homme et ténor à ses heures » (/fr/equipe). « Accueil sicilien du jovial Dino le patron, toujours de bonne humeur » (/fr/a-propos).
- Concept (site) : « une belle carte pour tous les goûts avec un éventail très large de spécialités italiennes et de cuisine française », cuisine familiale et traditionnelle, « 20 pizzas différentes (à partir de 9.30 €) » (la carte PDF en liste 26, de 10,50 à 17,80 €, écart à confirmer), suggestions saisonnières, vins français et italiens, brasserie pizzeria spacieuse, terrasse, ambiance italienne.

## Offre et carte
Carte complète dans `donnees.json` (carte) : 115 plats en 12 catégories (potages, entrées froides et chaudes, pâtes, gratinés, pizzas, salades, poissons, veau, bœuf, sauces, agneau), prix de 1,00 à 35,70 €. Exemples (PDF) : Margherita 10,50 €, pizza Dino (tomate, mozzarella, jambon, champignons, œuf, salami) 14,30 €, Pescatora 17,80 €, lasagne maison 15,40 €, Osso bucco 27,80 €, Mixed grilled 35,70 € par couvert (min. 2). Coquilles du PDF corrigées (« carbonnara » conservé tel quel dans les noms). Aucun menu, formule ni menu du jour trouvé. Desserts et boissons : inconnus.

## Pratique
- Adresse : Chaussée de Marche 826, 5100 Naninne (Namur) ; GPS 50.424481, 4.9315063 (lien itinéraire du site). Parking extérieur privé, parking vélos, accès PMR.
- Téléphone : +32 81 74 15 60. E-mail : inconnu. Paiements : Mastercard, Visa, carte de débit, cash.
- Horaires (site) : lundi à jeudi et dimanche 12:00-14:30 et 18:00-22:30 ; vendredi et samedi 12:00-14:30 et 18:00-23:30.
- Ambiance affichée : terrasse, bar, climatisation, décontracté, streetwear, idéal pour les familles. Groupes et privatisation : anniversaires, fêtes, mariages, cocktails, sur devis (/fr/espace-evenementiel). Take-away et livraison : inconnu. Langues : FR, EN, NL. Recrutement : page /fr/jobs.

## Réputation
Google : 4,3/5 sur 1033 avis d'après le JSON-LD de Rankeat (rankeat.fr/restaurants/don-dino-namur), alors que le texte de la page affiche 350 avis : à confirmer. TripAdvisor, TheFork : non consultables, `null`. Extraits d'avis : aucun lu directement. Un agrégateur (Wanderlog, via WebSearch, fiche non rattachée à l'adresse avec certitude) évoque une cuisine fraîche, un bon rapport qualité-prix, et une attente longue un soir (à confirmer, non repris comme citation).

## Réseaux
Facebook : https://www.facebook.com/dondinonaninne/ (abonnés, fréquence, dernier post : inconnus). Instagram, TikTok : aucun lien trouvé.

## Presse
Section « Ils parlent de nous / Dans la presse » sans article ; logos Petit Futé et L'Avenir (lavenir.net) présents dans les images du site, titres et dates inconnus (à confirmer). Michelin, Gault&Millau : non trouvés.

## Concurrence
Non recherchée dans le budget de ce passage : inconnu.

## Ce qui manque
Desserts et boissons ; extraits d'avis ; presse réelle ; Instagram ; e-mail ; couverts ; fournisseurs ; récompenses ; take-away ; photos de la terrasse et de la façade ; concurrents à Namur.

## Matière à site
1. Le restaurant Don Dino existe depuis 2014, à Naninne sur les hauteurs de Namur, en direction de Marche.
2. Brasserie-restaurant-pizzeria, spécialités italiennes et cuisine française.
3. Ouvert 7 jours sur 7, midi et soir, avec le patron en salle.
4. Placido Scalisi, dit « Dino », patron au tempérament de ténor, accueille avec un accent sicilien et bonne humeur.
5. Des pizzas dès 10,50 € (Margherita) jusqu'à 17,80 € (Pescatora), selon la carte PDF.
6. Pâtes, lasagne maison, escalopes, poissons, viandes grillées et sauces à la carte.
7. Une brasserie pizzeria spacieuse, avec un bar et une terrasse pour les beaux jours.
8. Parking extérieur privé, parking à vélos et accès pour personnes à mobilité réduite.
9. Groupes, anniversaires, fêtes et privatisation du restaurant sur devis.
10. Réservation en ligne par formulaire ou au +32 81 74 15 60 ; vendredi et samedi, service du soir jusqu'à 23:30.

Trous à combler avec données fictives marquées : desserts, boissons, vins, avis, presse, couverts, e-mail, Instagram, photos terrasse et façade.
