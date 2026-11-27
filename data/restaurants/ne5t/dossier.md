# NE5T Hôtel & Spa, restaurant Intuition (Namur) : dossier de recherche

Recherche du 27/11/2026. Sources : site ne5t.com capturé et lu (pages accueil, restaurant-intuition, notre-histoire, spa, infos-et-tarifs, contact, revue-de-presse), une recherche web. Un fait non trouvé est écrit `inconnu`.

## Site actuel
- https://ne5t.com, titre de page absent dans le HTML rendu ; description : « Séjournez au NE5T Hôtel à Namur : hôtel de charme avec spa, restaurant et cadre d'exception à la Maison Gersdorff » (ne5t.com).
- Pas de redirection. Capture dans `site-actuel/` (desktop, mobile, page.html) et sources texte de 6 pages internes dans `site-actuel/pages/`.
- Structure : site multi-pages WordPress (thème gdlr), accueil long, FR et EN. Menu : Home, Notre histoire, Les environs, Presse, Nos suites et duplex (Suite Cosy, Suite Ne5t, Suite Terrasse, Suite Blanche, Duplex Madeleine, Duplex Vauban), Packages, Infos pratiques, Notre Spa, Notre Restaurant, Séminaire, Réservation, Tarifs, Contact.
- Hero : photo plein écran de la façade de nuit avec bassin, logo blanc « NE5T Hôtel & Spa Restaurant » en haut à gauche, navigation en capitales condensées blanches, bouton flottant doré « Réserver une table » (Zenchef) en bas à droite (desktop-haut.png).
- Technos présentes dans le HTML : WordPress, thème ne5t_theme_4_1_1, MasterSlider, WooCommerce, WPML, Contact Form 7, Instagram Feed, jQuery, Zenchef. Détections three, ogl, next, astro, vue : faux positifs probables (non vérifié).
- Points faibles : shortcode `[gdlr_button …]` visible dans le code du bandeau ; polices multiples (Open Sans, Montserrat, Oswald, Domine, Merriweather) ; widget Zenchef alors que le restaurant dit réserver par téléphone seulement ; 4 erreurs console ; bloc de notation tiers (HotelsCombined) en pied de page.
- Palette observée : bleu nuit, pierre et ambre chaud de la photo, texte blanc ; logo doré « Intuition » sur la page restaurant.

## Photos
- 24 photos exploitables + logo dans `photos/` (index.json), toutes issues de ne5t.com : façade, spa, suites, plats, service. Plusieurs plats et ambiances restaurant en 800 px de large, deux vignettes de 440 px (qualité 2 à 3).
- Écartées : logos de tiers, scans de presse, photo de chantier, montage avant/après, visuels à bandes noires.
- Facebook, Instagram, TripAdvisor non consultés (une tentative non faite : sources connues pour être bloquées, voir leçons).

## Identité
- Nom : NE5T Hôtel & Spa ; restaurant « Intuition » (logo « Intuition, complicité gourmande ») ; spa « WellNE5T » ; hôtel « CosyNe5t » ; lieu « Maison Gersdorff » (#MaisonGersdorff) (ne5t.com).
- Baseline restaurant : « Une gastronomie décomplexée… », « Une seule invitation : suivre notre intuition » (ne5t.com).
- Histoire : ancienne ferme en carré surplombant la Meuse, à deux pas de la citadelle ; près de dix ans de rénovations pierre par pierre ; propriétaire Benoît Gersdorff ; intérieurs imaginés par son épouse Christine avec l'architecte d'intérieur Pierre Brahy ; quatre suites et deux duplex ; spa de 250 m² ouvert aux clients extérieurs, deux esthéticiennes, gamme de soins Thémaé, piscine intérieure et extérieure (ne5t.com/notre-histoire/). Année d'ouverture : inconnu.
- Cuisine : le chef Nico (prénom seul) cuisine au fil des arrivages, « franche, sincère et intuitive » ; Manu s'occupe du vin et du rhum (ne5t.com/restaurant-intuition/). L'accueil « Citadelle de Namur » est la localisation donnée par le site.
- Privatisation du restaurant : 45 couverts (ne5t.com).

## Offre et carte
Menu du mois, renouvelé chaque mois (relevé le 27/11/2026) :
- Pour éveiller vos sens : bouchées apéritives.
- Première impression : œuf bio à 63°, crevettes grises, mousseline, épinards ; et/ou Saint-Jacques, purée de topinambours, chips de légumes, salicornes, écume de corail, bœuf épicé.
- Deuxième impression : pêche du jour, siphon de pomme de terre, épinards, pata negra, coquillages, beurre blanc ; ou biche, pommes dauphine, jus corsé aux airelles, écume au foie gras, tombée de chou au lard de Belgasconne.
- Pause affinée : fromage affiné de la Petite Ferme, 14 € (+9 € à la place du dessert).
- Dessert : brioche façon pain perdu, glace vanille, caramel, siphon à la noisette du Piémont ; ou Dame Blanche.
- Formules par personne : 3 services 60 € (vins 40 €) ; 4 services 75 € (vins 50 €) ; lunch carte blanche jeudi, vendredi, samedi midi 50 € (2 verres, eau, café : 15 €).
- Repas en suite : à réserver 24 h avant, supplément 15 %.
- Menu Éphémère du 15/07/26 au 02/08/26 annoncé en bandeau (contenu non relevé, période passée).
- Spa : 3 h à 35 € (résidents) ou 70 € (non-résidents), formules 90 à 195 €, massages 95 à 145 €, soins 50 à 95 € (ne5t.com/spa/). Petit-déjeuner 26 € (résident) / 30 € ; chambres de 260 € à 400 € « à titre indicatif » (ne5t.com/infos-et-tarifs/).

## Pratique
- Adresse (site) : Avenue Vauban 46, 5000 Namur. **Contradiction** : restaurants.json donne Allée de Menton 26 (siège BCE, L'Essentiel Group) : à confirmer.
- Téléphone +32 (0)81 58 88 88 ; e-mail info@ne5t.com (ne5t.com).
- Restaurant : ouvert du mercredi soir au dimanche midi ; lunch jeudi, vendredi, samedi midi ; réservation par téléphone uniquement ; allergies à signaler à la réservation. Heures exactes : inconnu.
- Spa : 7j/7 de 9h30 à 20h30 ; réservation par téléphone de 9h à 18h ou demande en ligne (réponse sous 24 h).
- Accès : la page Contact décrit les accès routiers et la gare de Namur (TGV Thalys cité). Parking : inconnu.
- Chambres : réservation RoomRaccoon (booking.roomraccoon.com/ne5t/fr/). Séminaire : page dédiée.

## Réputation
- Google, TripAdvisor, TheFork : `null` (non affichés par le site). Un listing tiers repéré par recherche annonce 4,8 sur 333 avis pour l'hôtel (non vérifié, à confirmer). Le site affiche « 9.5 Excellent » via HotelsCombined (module tiers, hôtel et non restaurant).
- Extraits d'avis : aucun récupéré.

## Réseaux
- Facebook : facebook.com/ne5t.hotel.spa ; Instagram : instagram.com/maisongersdorff ; TripAdvisor : fiche Hotel_Review-g188663-d3592392. Abonnés, fréquence, dernier post : inconnu.

## Presse
- Page « revue-de-presse » : logos de DH, L'Avenir, La Meuse, RTL, 7Dimanche, KMO, Déco, Namur Congress. Titres et dates : inconnu. Distinctions Gault&Millau ou Michelin : non trouvées.

## Concurrence
- Non recherchée (hors budget de la phase de test).

## Ce qui manque
Voir `donnees.json` > `manques` : adresse à trancher, GPS, heures exactes, avis, presse détaillée, distinctions, année d'ouverture, noms complets de l'équipe, concurrents.

## Matière à site
1. Une ancienne ferme en carré, surplombant la Meuse à deux pas de la citadelle de Namur, devenue hôtel et spa.
2. Près de dix ans de rénovations, pierre par pierre, certaines numérotées pour être reposées à l'identique.
3. Quatre suites et deux duplex, chacun avec son style, du design contemporain à l'ambiance chaulée et bois vieilli.
4. Intuition, une table confidentielle au cœur de l'hôtel, pour une gastronomie décomplexée.
5. Le menu change chaque mois, au rythme des saisons et des arrivages.
6. Le jeudi, le vendredi et le samedi midi, un lunch carte blanche selon l'intuition du chef, à 50 €.
7. Manu partage sa passion du vin et du rhum et vous laisse aussi choisir votre flacon en cave.
8. Le repas peut être servi dans votre suite, à réserver au moins 24 h à l'avance.
9. WellNE5T : 250 m² de spa, piscine intérieure chauffée à 33°, hammam, sauna infrarouge, tisanerie, ouvert 7j/7 de 9h30 à 20h30.
10. Privatisation du restaurant pour 45 couverts, proposition sur mesure.

Trous à combler avec des données fictives marquées « illustratif » : avis clients, notes, presse, distinctions, GPS, heures précises du service, plats à la carte hors menu du mois.
