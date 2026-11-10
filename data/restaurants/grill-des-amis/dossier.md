# Dossier recherche : Le Grill des amiS (Namur)

Recherche du 10/11/2026. Règle : rien d'inventé, `inconnu` = non trouvé, `(à confirmer)` = source douteuse.

## Site actuel
- https://www.legrilldesamis.be (legrilldesamis.com redirige en 301, d'après data/restaurants.json). Wix Studio, responsive, © 2026 « un site ByCM Management » (pied de page). Captures : `site-actuel/` et `site-actuel/pages/<page>/`.
- Structure accueil : bandeau noir (logo losange GS + nom, boutons « actualités » et « spécial viandes », « Se connecter », panier), hero photo de salle avec boutons Réservations / Téléphoner et trois médaillons (décor, terrasse, plats), À propos « notre A.D.N. », « Le spécialiste » grillades sur fond orangé, bandeau défilant « RESTAURANT VIANDARD », « Actuellement » (suggestions), Actualités, Avis, pied (horaires, adresse, téléphone).
- Navigation : Réserver, Carte, À propos, Traiteur, Contact, Actualités ; pages Événements, Spécial viandes, Terrasse, Plats (galeries).
- Palette observée : rouge vif saturé, noir, orangé/ocre, or ; polices condensées (type Oswald/Bebas) pour les titres, serif pour le logo ; médaillons bordeaux « Spécialiste viandes », « Terrasse du restaurant ».
- Technos réellement présentes : Wix (+ Bookings, Events, Blog, Stores). La détection wordpress/elementor/next/react/three est un faux positif (Wix).
- Réservation : page /reserver (Wix Bookings) et lien tel:+3281617260 (legrilldesamis.be).
- Carte : images en carrousel (page /carte, « mise à jour 14 octobre 2026 ») + PDF téléchargeable `site-actuel/carte.pdf` (7 pages, texte extrait par pdftotext).
- Points faibles : voir `donnees.json` > site_actuel_analyse (témoignages en texte d'exemple Wix, carte non HTML, coquille « Jeudredi », « Votre texte de paragraphe » dans le PDF, horaires ambigus).

## Photos
21 fichiers dans `photos/` (17 photos + 4 logos/médaillons), listés dans `photos/index.json`. Sources : médias Wix du site (originaux 1080 px à 5568 px, réduits à 2400 px). Plusieurs photos de viande du site portent le bandeau « GS Le Grill des amiS » incrusté par le client : ne retenues que celles sans incrustation. Photos libres placeholder inutiles (qualité 3 à 5). Photo d'équipe (15) : identité à confirmer.

## Identité
- Nom public : « Le Grill des amiS » (graphie du logo, S final majuscule). BCE 0767625831, dénomination LE GRILL DES AMIS (restaurants.json).
- Baseline : « Le spécialiste viandes, maturation et grillades à Namur » ; devise : « Cuisine et Grillades pour le plaisir de nos clients, nos amis » (signée Elise & Gaëtan, /about).
- Histoire : année d'ouverture inconnue. Gaëtan (chef) choisit et découpe les viandes ; « passionné de vin » ; nom Gaëtan Batteux sur la carte PDF (citation « La cuisine est un art, l'art est science et la science est patience »).
- ADN (site, /about) : produits frais, sauces préparées sur place, frites maison, suggestions renouvelées chaque semaine, poissons, volailles, accords mets et vins, accueil.
- Viandes (/viandes) : achat de grosses pièces brutes auprès de fournisseurs sélectionnés, découpe sur place, maturation dans « les 2 chambres du restaurant » (post du 15 mai). Mention de Rungis (entrecôte du moment) et « Black Angus », « Duroc d'Olive », « agneau des Pyrénées », « porc ibérique » sur la carte.
- Traiteur (/traiteur) : menus sur mesure (3 services à buffets barbecue premium), service clé en main, barbecues livrés chez le client.

## Offre et carte
Carte complète en `donnees.json` (10 catégories, transcrite du PDF). Repères (carte PDF, 14/10/2026) : entrées 18 à 20 €, plats 21 à 30 €, grillades 27 à 40 €, Menu Viandard 69 €/pers. (5 viandes, dès 2 personnes, table entière), lunch 15,50 €, steak du midi 17 €, bambins 14 €, cocktails 12 €. Budget 25 à 40 €/pers. (Rankeat, à confirmer). Nouvelle carte annoncée le 15 mai (post /blog).

## Pratique
- Adresse : Rue Saint-Joseph 10, 5000 Namur (site, pied de page). GPS 50.4662832, 4.8644955 (Rankeat, à confirmer).
- Téléphone : 081/61 72 60 (site). E-mail : non affiché sur le site (restaurants.json donne legrilldesamis@gmail.com, source BCE : non repris).
- Horaires (site, pied de page) : « Lundi, jeudi / Vendredi & Samedi de 12h à 14h & de 18 à 21h30 ». Rankeat concorde (lundi, jeudi, vendredi, samedi ; fin de service 14h30 et 21h30/22h : à confirmer). Mardi, mercredi, dimanche : fermés (déduit, à confirmer).
- Terrasse : médaillon « Terrasse du restaurant, intérieur climatisé » (site). Parking, accès, couverts, privatisation : inconnu.

## Réputation
Aucun avis réel affiché par le site (les témoignages sont le texte d'exemple Wix : à ne pas reprendre). Tiers non vérifiables en direct, à ne pas afficher : Google 4,5 sur 316 avis (Rankeat), Restaurant Guru 4,6 sur 423, Tripadvisor 4,0 sur ~21 (WebSearch, à confirmer). Un avis Rankeat du 2 décembre 2025 est très négatif (« Il n'y a pas de nerfs dans l'entrecôte, monsieur ! », 1/5) ; résumés tiers : viande appréciée, service sympathique ; critiques : cuisson, salle étroite (à confirmer).

## Réseaux
Aucun lien Facebook, Instagram ni TikTok sur le site. Rankeat n'en liste pas. Abonnés : inconnu.

## Presse
Aucune trouvée. Récompenses : aucune trouvée.

## Concurrence
Non recherchée dans ce passage (3 noms à documenter si besoin) : inconnu.

## Ce qui manque
Voir `donnees.json` > manques (année d'ouverture, e-mail, réseaux, vrais avis, horaires mardi/mercredi/dimanche, couverts, presse, menus de fêtes).

## Matière à site
1. Au Grill des Amis, on achète les grosses pièces brutes, on les découpe et on les fait maturer sur place à Namur (/viandes).
2. Le restaurant dispose de deux chambres de maturation (post du 15 mai).
3. Les grillades sont cuites au feu de bois (carte PDF).
4. La carte propose entrecôte du moment selon l'arrivage de Rungis, hampe, onglet, côte de porc Duroc d'Olive maturée 14 jours, pluma de porc ibérique.
5. Le Menu Viandard : 5 viandes choisies par le chef, en 3 services, dès 2 personnes, 69 €/personne.
6. Sauces préparées sur place, frites maison, croquettes maison.
7. Un lunch à 15,50 € et un steak du midi à 17 € (carte du 14 octobre 2026).
8. Gaëtan est passionné de vin et soigne les accords mets et vins.
9. Le Dgin' A Co Soif : gin maison citron vert et main de Bouddha, bouteille à emporter 50 €.
10. Service traiteur : menus sur mesure et barbecues premium livrés chez le client.

Trous à combler avec des données fictives marquées « illustratif » : avis clients, année d'ouverture, e-mail, réseaux sociaux, nombre de couverts, presse.
