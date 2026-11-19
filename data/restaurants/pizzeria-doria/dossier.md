# Dossier Pizzeria Doria (recherche du 19/11/2026)

Sources : site actuel pizzeriadoria.be (accueil, /menu/, /vins/, /contact/, PDF à emporter), WebSearch du 19/11/2026 (agrégateurs, non vérifiables sur page), Nominatim (GPS), `data/restaurants.json`. Tripadvisor 403, Facebook page de connexion, Restaurant Guru 503, Nonoresto vide : avis et abonnés `null`.

## Site actuel
- WordPress/Elementor, hébergement PEPUP (pied de page « © 2024 – Propulsé par PEPUP »). One-page d'accueil : bandeau coordonnées et réseaux, hero pizza, bouton « Commander à emporter en ligne ou par téléphone », horaires, cornets de pâtes et paninis des midis, aperçu menu, « Une histoire de famille », « À propos », réservation, offre d'emploi. Pages /menu/ (6 onglets), /vins/, /contact/. Navigation : Accueil, Menu 2026, Les vins, Contact. Modale d'arrivée avec les suggestions de novembre 2026 (cèpes).
- Palette observée : noir, crème/or, vert-blanc-rouge du logo, vert sapin sur l'affiche des suggestions. Typographies : script calligraphique (logo, navigation) + sans-serif.
- Réservation : bouton « Réserver une table » (outil à confirmer) et téléphone ; commande à emporter via pizzy.be et PDF. Paiement Payconiq et cash.
- Points faibles : © 2024, onglet /menu/ titré « Menu 2025 », suggestions de /menu/ d'une autre saison, coquilles (« Décrouvrez », « à changé », « Disclamer », « CHAIRE », « Vin banc »), photos majoritairement Unsplash, prix aux formats mixtes. Points forts : horaires et téléphone en haut de page, carte complète avec prix, salle des coffres.
- Captures : `site-actuel/` (desktop haut, 4 frames, bas, pleine page, mobile), `site-actuel/pages/{menu,vins,contact}/`. `page.html` gitignoré.

## Photos
10 fichiers dans `photos/` (voir `photos/index.json`) : 4 photos du client (salle des coffres, friture de poisson, assiette roquette-balsamique, cadre de bouchons), 2 logos, 4 photos Unsplash du site marquées `stock: true` (placeholder illustratif). Moins de 4 photos de qualité professionnelle : les agents de production utiliseront des photos libres marquées illustratives pour les plats de pizza.

## Identité
- Pizzeria Doria, ouverte en octobre 2017, gérée par Rocco et Luigi (site, accueil). Changement d'adresse en mai 2023 vers une ancienne banque restaurée à Malonne, « salle des coffres » (site). Baseline du site : « Venez passer un moment chaleureux et convivial aux saveurs de l'Italie chez Doria. » (/contact/). Méta-description : « cuisine Basilicata » (à confirmer).
- BCE 1004184580, dénomination « Pizzeria D'orria ».

## Offre et carte
181 lignes dans `donnees.json` (apéritifs, bières, softs, salades et antipasti, 45 pizzas et pains, 15 pâtes, 6 viandes, desserts, cafés, digestifs, 22 vins en bouteille, verres et pichets). Pizzas de 7,50 € (marinara) à 18 € ; pâtes de 11 à 18,50 € (pâtes fraîches bio Eggusto +2,50 €) ; viandes 21 à 25 €. Fior di latte sans lactose sur demande. Suggestions de novembre 2026 : pizza aux cèpes 18 €, risotto aux cèpes 20 €, panna cotta 8 €. Cornets de pâtes 5 à 6 € et paninis 6 à 7,50 € les midis scolaires.

## Pratique
Rue Fond de Malonne 66, 5020 Malonne (Namur) ; GPS 50.44049, 4.79503 (Nominatim) ; +32 81 44 44 08 ; info@pizzeriadoria.be. Lundi et jeudi 12:00-13:30 / 18:00-21:30 ; vendredi et samedi 12:00-13:30 / 18:00-22:00 ; dimanche et jours fériés 18:00-21:30 ; mardi et mercredi fermé (site, cohérent avec le PDF). Parking, transports, privatisation : inconnus. Tripadvisor et Menuweb donnent « 95 » au lieu de 66 (à confirmer, le site fait foi).

## Réputation
Non affichée par le site. Agrégateurs (WebSearch 19/11/2026, à confirmer) : Restaurant Guru 4,8/5 (367), Nonoresto 9,2/10 (407), Tripadvisor 4,7/5 (22), Menuweb 4,8/5 (283), Google environ 4,6. Thèmes cités : pâte et garnitures, calzone, pizza burrata, osso buco, accueil des patrons, salle de l'ancienne banque ; critiques : service lent salle pleine, pizza parfois plus cuite aux heures de pointe. Aucun extrait cité tel quel.

## Réseaux, Presse, Concurrence
Facebook : facebook.com/pizzeriadoria (abonnés et dernier post inconnus). Instagram, TikTok : inconnus. Presse et récompenses : aucune trouvée. Concurrence : non vérifiée (à renseigner si besoin).

## Ce qui manque
Voir `donnees.json` → `manques`.

## Matière à site
1. Ouverte depuis octobre 2017, la Pizzeria Doria est gérée par Rocco et Luigi.
2. Depuis mai 2023, elle occupe une ancienne banque restaurée à Malonne.
3. On y mange dans la « salle des coffres », entourée de casiers de banque.
4. La carte propose 45 pizzas et pains, du marinara à 7,50 € à la pizza Maradona à 18 €.
5. Les pâtes fraîches et artisanales Eggusto sont disponibles en bio.
6. Le fior di latte sans lactose est disponible sur demande.
7. Les plats sont à consommer sur place ou à emporter, avec paiement Payconiq.
8. Les midis scolaires, des cornets de pâtes à 5 € et des paninis maison.
9. La carte des vins est italienne, avec une sélection de verres choisie par Luigi.
10. Côté bières : la Philomène de Malonne et les Vulpio de Wépion.

Trous à combler en fictif (marqués) : avis clients, nombre de couverts, concurrents, photos de plats de pizza (libres, illustratives).
