# Dossier client : Le Lodge Wépion

Recherche du 20/11/2026. Règle : rien d'inventé, `inconnu` ou `(à confirmer)` sinon. Données structurées : `donnees.json`.

## Situation à connaître avant toute refonte
- Le restaurant de Wépion est **fermé depuis l'incendie du 21/05/2026** (cuisines, vers 23h30 ; L'Avenir 22/05, DH 26/05). Réouverture à Wépion « fin d'année voire début 2027 » (gérant, DH 26/05, à confirmer).
- Repli : Aquaplane de Profondeville jusqu'au 15/09/2026 (DH 10/06), puis équipe « au Wine & More, 6J/7 », Chaussée de Marche 496, Erpent, dès le 15 septembre ; réservations 0496 92 55 13 ou Barestho (bandeau et fenêtre modale de lodgewepion.be, relevé du 20/11/2026). Wine & More est un autre établissement (chef Carl Gillain, resto.be) : le lien exact avec le Lodge est à confirmer.
- La maquette doit donc dire la fermeture temporaire et l'adresse provisoire sans faux horaires.

## Site actuel
- https://www.lodgewepion.be (Webflow), one-page : hero (poster vidéo), présentation, vue sur la Meuse, tea-room, réservation, contact ; pages : `/`, `/cookies`. Navigation : Carte, Tea room, Réserver, Contact. Titre : « Le Lodge Wépion | Restaurant Et Brasserie En Bord De Meuse ». 0 erreur console (capture-site).
- Fenêtre modale d'annonce Wine & More à l'ouverture, bandeau « Retrouvez l'équipe du Lodge au Wine & More, 6J/7 ! », bouton flottant « Réserver » (Barestho). Palette sombre (noir, blanc cassé, vert-gris du bandeau), serif élégante pour les titres, logo « LE LODGE » blanc.
- Carte : diaporama Google Slides intégré (texte récupéré des étiquettes d'accessibilité SVG, 36 blocs) : voir `site-actuel/carte-texte.txt`. Carte saisonnière (asperges, fraises de Wépion).
- Points faibles : pas de page dédiée à l'incendie, e-mail hotmail, carte non indexable, texte SEO générique. Points forts : photos 2024 soignées, réservation toujours visible.
- Pied de page : © Le Lodge, BE0824633424. Capture : `site-actuel/` (desktop, mobile, page.html).

## Photos
13 fichiers dans `photos/` (index.json) : 10 exploitables (façades jour et nuit, deux salles, terrasse sur la Meuse, desserts, plats), logo SVG blanc `00-logo-blanc.svg`. Écartées/signalées : `11-photo-enseigne-beau-rivage` (personne devant une enseigne « Le Beau Rivage », ne pas utiliser), affiche Wine & More (texte). Les fichiers sources s'appellent « beau rivage-NN » (nom de shooting, à confirmer). Facebook et Instagram non consultés.

## Identité
- Nom public : Le Lodge Wépion (site) ; raison sociale GREMAT, BCE 0824633424. Dirigé par Grégory Jorion (site, DH). Type : brasserie, restaurant, tea-room au bord de la Meuse. Baseline : inconnue.
- Ouverture : 04/01/2008, 160 couverts (Trouve Ton Resto, à confirmer). Environ 17 ETP et 30 étudiants/flexi-jobbers (L'Avenir 26/05/2026).

## Offre et carte
88 lignes de carte dans `donnees.json` : à partager, entrées, salades (22 à 26 €), viandes (20 à 41 €), tartares (22 à 24 €), burgers (21 à 22 €), poissons (26 à 36 €), pâtes Mil'pat (20 à 24 €), suggestions, bambins (12 €), glaces Pagotini, desserts (10 à 14 €), crêpes et gaufres (8 à 12 €), boissons (extraits). « Une table = une addition ». Produits locaux cités : Poteaupré (Chimay), porc qualité Ardenne, truite d'Annevoie, canard Ferme de la Sauvenière, sirop de sureau de Wépion. Cafés Delahaut, bières Chimay et Brasserie de Namur (La Houppe).

## Pratique
- Wépion (fermé) : Chaussée de Dinant 931, 5100 Wépion ; GPS 50.4234855, 4.8742231 (lien Google Maps du site) ; +32 81 40 08 91 ; le.lodge@hotmail.com ; réservation Barestho https://lelodge.reservation.barestho.com/.
- Horaires site : lundi à dimanche 11:30-22:30 ; Trouve Ton Resto : 12:00-15:00 et 18:00-21:30 (contradiction, à confirmer). Tea-room l'après-midi (site). Parking, transports, privatisation, livraison, langues : inconnus (emporter : boîte à emporter 1 € sur la carte).

## Réputation
Google : non affiché par le site (null). Indications tierces non vérifiées : Tripadvisor 3,5/5, Sluurpy 3,7/5, Restaurant Guru 4,8/5, nonoresto 8/10 (WebSearch, non reprises). Extraits (Trouve Ton Resto, sans date) : « Service très agréable, très bien situé au bord de l'eau! Les spaghettis carbonara sont délicieux! » ; « l'onglet de bœuf est tout simplement excellent » ; « Cadre agréable et cosy pour passer un bon moment, accueil chaleureux, carte assez variée ». Critiques tierces : bruit, constance du service (résumé WebSearch, à confirmer).

## Réseaux
Facebook https://www.facebook.com/lodgewepion ; Instagram https://www.instagram.com/restaurant_le_lodge/ (liens du site). Abonnés et dernier post : inconnus.

## Presse
L'Avenir 22/05/2026 (incendie), DH 26/05/2026 (pas de réouverture avant fin d'année), DH 10/06/2026 (Aquaplane) ; URL dans `donnees.json`. Guides et récompenses : aucune trouvée.

## Concurrence
Non documentée (aucune source fiable trouvée dans le budget) : inconnu.

## Ce qui manque
Voir `manques` de `donnees.json` (baseline, Google, abonnés, date de réouverture, carte et horaires actuels au Wine & More, concurrents).

## Matière à site
1. Le Lodge est une brasserie, restaurant et tea-room au bord de la Meuse, à Wépion (site).
2. Sa terrasse et sa salle donnent sur la Meuse et les rochers (photos du site).
3. Le restaurant a ouvert en 2008 et compte 160 couverts (Trouve Ton Resto, à confirmer).
4. La carte propose trois tartares : nature, à l'italienne et asiatique (carte).
5. Les boulettes maison se servent sauce tomate ou liégeoise, avec du porc qualité Ardenne (carte).
6. Les pâtes sont artisanales, de chez Mil'pat (carte).
7. L'après-midi, la brasserie devient tea-room : crêpes, gaufres et glaces (site).
8. Les fraises de Wépion sont en dessert en saison (carte).
9. Une table = une addition (carte).
10. Depuis l'incendie de mai 2026, l'équipe est accueillie au Wine & More à Erpent, en attendant la réouverture à Wépion (site, DH).

Trous à combler en données fictives marquées illustratives : note et avis Google, horaires du lieu provisoire, baseline, parking et accès, concurrents.
