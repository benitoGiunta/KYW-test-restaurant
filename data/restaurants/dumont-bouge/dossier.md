# Dossier Dumont Bouge (recherche-client, 27/11/2026)

Sources : site officiel dumontbouge.com (capturé le 27/11/2026, pages et iframes de carte), companyweb.be (via WebSearch). TripAdvisor, Facebook, Google Maps non consultés (règle commune : avis et abonnés `null`).

## Site actuel
- Wix (Thunderbolt), 0 erreur console. Détections three/ogl/next/react/elementor/bootstrap = faux positifs probables (Wix). Titre de page : « Accueil | Dumont Bouge ».
- Pages : accueil, /boulangerie, /pâtisserie, /emporter (Sandwicherie, titre « Dagobert »), /menu (Tea-room, titre « Dumont »), /reservations. Navigation : 4 boutons noirs + « Réserver une table » + téléphone.
- Accueil : photo de façade plein écran, bandeau rose en coup de pinceau, fond gris foncé avec texte de présentation, vignettes Pâtisserie / Restauration / Sandwicherie. Polices : serif fine pour titres (type Cormorant) ; cartes en Fraunces + Work Sans.
- Chaque carte est une iframe HTML sur mesure (filesusr.com) avec recherche et onglets ; sauvegardée dans `site-actuel/embeds/`.
- Points faibles : logo coupé dans l'en-tête, cartes au style incohérent avec le site, peu de photos, gâteaux sans prix, mobile peu soigné. Points forts : carte complète avec prix, horaires et téléphone en pied de page, identité rose.

## Photos
4 photos correctes (façade, vitrine de pâtisseries, salade de chèvre chaud, plateau de mini-sandwichs), logo PNG 4000 px, une image de vidéo (qualité 2) et une texture rose. Rien du tea-room intérieur ni du brunch : prévoir des photos libres marquées placeholder. Détail dans `photos/index.json`.

## Identité
- Nom public : Dumont Bouge (site) ; enseigne « Dumont » (companyweb). Baseline sur le logo : « Pâtisserie-Boulangerie-Restauration-Tearoom ».
- « Dumont Bouge est bien plus qu'un salon de thé, c'est un lieu de rencontre et de partage. Nous sommes passionnés par l'art de la dégustation, offrant une grande variété gustative. » (site)
- SRL, BCE 0778903268, constituée le 21/12/2021, environ 6,9 ETP (companyweb, à confirmer). Ne pas confondre avec la Pâtisserie Dumont de la chaussée de Dinant 459 (autre établissement).
- Fondateurs, chef, histoire : inconnu.

## Offre et carte
211 lignes dans `donnees.json` (23 catégories) : 13 pains, 14 gâteaux (sans prix, « à la commande »), sandwichs Dagobert (15 classiques à prix par format, 11 spéciaux à 6,00-7,90 €), salades, paninis, formules petit-déjeuner (13,50 € et 14,50 €, 7h-11h), boissons (chaudes, thés « Teatower », softs, bières et vins, apéritifs), brunch 11h30-15h (croques, salades, croquettes, toasts, pâtes, méli-mélo), desserts (coupes, gaufres de Bruxelles, crêpes). Pied de carte : « Allergie alimentaire ? Nous répondons à vos questions. Un paiement par table, merci. » ; sandwichs, salades et paninis « préparés à la commande ».

## Pratique
- Adresse principale : Chaussée de Louvain 343, 5004 Bouge (restaurants.json disait « 5004 Namur »). Second point de vente listé : Rue de Marchovelette 9, 5000 Namur.
- Téléphone 081 22 96 02. E-mail public du site : srl-dumontbouge@outlook.com (l'e-mail de restaurants.json est personnel, non repris).
- Horaires Bouge : lundi-dimanche 7h-18h. Namur : lundi-samedi 7h-17h, dimanche fermé.
- Réservation : formulaire Wix (personnes, date, heure) et téléphone. Terrasse couverte et parvis avec panneaux de parking visibles sur la façade (capacité inconnue). Commande de gâteaux par téléphone (« Commandez vos gâteaux dès maintenant au 081 22 96 02 »). Livraison : inconnu.

## Réputation, réseaux, presse, concurrence
- Avis Google / TripAdvisor : inconnu. Aucun extrait d'avis.
- Facebook : facebook.com/profile.php?id=61572819565373 ; Instagram : instagram.com/dumontbouge/ (abonnés et dernier post inconnus).
- Presse, récompenses : rien trouvé.
- Concurrence proche (WebSearch, DH 2024) : Carrément Bon, chaussée de Louvain 382 à Bouge, élu parmi les 5 boulangers-pâtissiers préférés des Wallons 2024 ; Pâtisserie Dumont, chaussée de Dinant 459 (ouverte depuis 1958, autre maison) ; Boulangerie Legrand, Namur (à confirmer).

## Ce qui manque
Voir `manques` dans `donnees.json`.

## Matière à site
1. Dumont Bouge est à la fois boulangerie, pâtisserie, sandwicherie et tea-room.
2. Le pain est pétri et cuit chaque matin à partir de farines sélectionnées.
3. La carte compte 13 pains, du Petit Blanc à 2,50 € au Soleil aux graines à 3,80 €.
4. Les gâteaux sont préparés à la main : Saint Honoré, Truffe chocolat, Javanais, Misérable, le fraisier en saison.
5. Les sandwichs, salades et paninis sont préparés à la commande.
6. Les Dagobert se commandent en 1/3, 1/2, 3/4 de baguette, pistolet ou sandwich.
7. Le petit-déjeuner se sert de 7h à 11h, le brunch de 11h30 à 15h.
8. Le tea-room propose gaufres de Bruxelles, crêpes et coupes glacées.
9. La maison ouvre tous les jours à Bouge, de 7h à 18h.
10. On réserve une table en ligne ou au 081 22 96 02.

Trous à combler avec des données fictives marquées : avis, histoire et équipe, prix des gâteaux, photos du tea-room et du brunch, GPS.
