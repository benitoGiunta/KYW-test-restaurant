// Données de L’Essentiel : tout vient de data/restaurants/l-essentiel/ (donnees.json, dossier.md, site-actuel/).
// ` ` = espace insécable (remplacé au build par scripts de typographie : voir ETAT.md). Rien d’inventé ici ;
// ce qui est illustratif porte placeholder: true.

export const resto = {
  nom: 'L’Essentiel',
  rue: 'Rue Roger Clément 32',
  ville: '5020 Temploux (Namur)',
  tel: '+32 81 56 86 16',
  telHref: 'tel:+3281568616',
  email: 'info@lessentiel.be',
  emailHref: 'mailto:info@lessentiel.be',
  facebook: 'https://www.facebook.com/lessentiel.temploux/',
  instagram: 'https://www.instagram.com/l.essentiel.temploux/',
  mentions: 'https://www.lessentiel.be/lessentiel-mentions-legales/',
  reservationOrigine: 'https://www.lessentiel.be/reservation/',
  chambreContact: 'https://www.lessentiel.be/contact-2/',
  itineraire: 'https://www.google.com/maps/search/?api=1&query=50.4751615,4.7385286',
  michelin: 'https://guide.michelin.com/be/fr/namur/temploux/restaurant/l-essentiel210192',
  presseGM: 'https://www.dhnet.be/regions/namur/2023/11/27/gaultmillau-2024-meilleur-restaurant-de-belgique-jeune-chef-de-lannee-decouvrez-les-notes-des-namurois-2FS5OMOPTBHEHEGVEBQY3R4DWI/',
};

export const nav = [
  { href: '', label: 'Le restaurant', id: 'accueil' },
  { href: 'les-chambres/', label: 'Les chambres', id: 'chambres' },
  { href: 'carte-menus/', label: 'Carte et menus', id: 'carte' },
  { href: 'contact/', label: 'Contact', id: 'contact' },
  { href: 'recrutement/', label: 'Recrutement', id: 'recrutement' },
];
export const navAction = { href: 'reservation/', label: 'Réserver', id: 'reservation' };

const service = '12 h 00 à 14 h 00 et 19 h 00 à 21 h 30';
export const horaires = [
  { jour: 'Lundi', h: null },
  { jour: 'Mardi', h: null },
  { jour: 'Mercredi', h: service },
  { jour: 'Jeudi', h: service },
  { jour: 'Vendredi', h: service },
  { jour: 'Samedi', h: service },
  { jour: 'Dimanche', h: null },
];

export const fermetures = [
  { du: '20 décembre 2026', au: '5 janvier 2027', note: 'service traiteur pour Noël' },
  { du: '21 février 2027', au: '10 mars 2027' },
  { du: '2 mai 2027', au: '11 mai 2027' },
  { du: '17 juillet 2027', au: '3 août 2027' },
  { du: '12 septembre 2027', au: '21 septembre 2027' },
  { du: '7 novembre 2027', au: '11 novembre 2027' },
  { du: '19 décembre 2027', au: null, note: 'fin non précisée' },
];

export const menus = [
  { nom: 'Menu Affaire', prix: '50 €', detail: 'Entrée, plat, dessert selon l’inspiration du chef. Uniquement le midi en semaine, hors jours fériés.', plus: 'Avec les vins : 75 €' },
  { nom: 'Menu Plaisir', prix: '72 €', detail: 'Quatre services.', plus: 'Accord sans alcool « Aromatisée » 30 €|vins « Découverte » 38 € ou « Français » 48 €' },
  { nom: 'Menu Balade', prix: '90 €', detail: 'Six services. Le chariot de fromages affinés remplace le dessert (supplément de 14 €).', plus: 'Accord sans alcool « Aromatisée » 35 €|vins « Découverte » 45 € ou « Français » 58 €' },
  { nom: 'La carte, deux assiettes', prix: '90 €', detail: 'Une première et une deuxième assiette, à choisir à la carte.', plus: null },
];

export const carte = [
  { titre: 'Première assiette', plats: [
    'Émincé de noix de Saint-Jacques, choux chinois, épinards et shiitakés, gel de soja pimenté et dashi',
    'Carpaccio de dos de faon, betterave, tartare de langoustine, granité de foie gras et jus de viande perlé',
    'Croquettes de petits gris et pied de porc, lentilles vertes, jambonneau et jus de volaille émulsionné',
    'Légumes de saison tiédis, gelée de butternut, paleta et jus de cuisson',
    'Gras de cuisse de volaille ardennaise, ris de veau, topinambour, champignon de Paris, oignon caramélisé et jus truffé',
  ] },
  { titre: 'Deuxième assiette', plats: [
    'Filet de sole, condiment d’huître et lardon, poireau, laitue de mer, huile de ciboulette',
    'Turbot grillé, artichaut poivrade, sucrine et palet de bintje croustillant, sauce choron',
    'Homard bleu cuit dans sa carapace puis roulé au beurre, ris de veau meunière, épinard, fèves des marais et béarnaise des pinces (supplément selon le cours du marché)',
    'Mignon de biche du Pays, trompettes, choux de Bruxelles, airelles et coing, pomme Dauphine et sauce poivrade',
    'Suprême de poule faisane rôti sur le coffre, chicon, champignons des bois et potimarron, croquettes des cuisses et jus façon brabançonne',
  ] },
];
export const fromageDessert = [
  { nom: 'Découverte du chariot de fromages affinés', prix: '16 €', note: null },
  { nom: 'Plaisir sucré', prix: '14 €', note: 'Certains desserts demandent une attention particulière : à commander en début de repas.' },
];
export const noteCarte = [
  'Chaque menu est servi pour la table entière. Changement de menu : supplément de 25 €.',
  'Au-delà de six couverts, menu uniquement.',
  'Allergies à signaler à la réservation.',
];
export const releveCarte = 'Carte relevée le 7 novembre 2026, saison du gibier. Les plats changent avec elle.';

export const chambres = [
  { nom: 'Tilleul', type: 'Suite', detail: 'Bain et douche', prix: '150 €' },
  { nom: 'Ardoise', type: 'Chambre double', detail: 'Douche à l’italienne', prix: '120 €' },
  { nom: 'Rouille', type: 'Chambre double', detail: 'Douche à l’italienne, terrasse privative', prix: '120 €' },
  { nom: 'Réglisse', type: 'Chambre double', detail: 'Douche à l’italienne, terrasse privative', prix: '120 €' },
];
export const equipements = [
  'Lit double en 180 × 200',
  'Salle de bain privative avec douche à l’italienne (et bain pour la suite Tilleul)',
  'Peignoir et chaussons',
  'Sèche-cheveux',
  'Télévision',
  'Wi-Fi gratuit',
  'Terrasse privative (chambres Rouille et Réglisse)',
];
export const tarifsChambres = [
  { nom: 'Chambre double avec douche', detail: 'Rouille, Ardoise, Réglisse, pour 2 personnes', prix: '120 €' },
  { nom: 'Suite avec bain et douche', detail: 'Tilleul, pour 2 personnes', prix: '150 €' },
  { nom: 'Petit-déjeuner', detail: 'par personne', prix: '20 €' },
  { nom: 'Lit supplémentaire', detail: 'par personne', prix: '30 €' },
];

export const photos = {
  facade: { src: 'facade.webp', w: 1600, h: 1067, alt: 'Façade en brique avec l’enseigne manuscrite dorée sur un panneau noir' },
  rideaux: { src: 'salle-rideaux.webp', w: 1600, h: 1067, alt: 'Salle claire, tables rondes dressées, rideaux blancs' },
  brique: { src: 'salle-brique.webp', w: 1600, h: 1067, alt: 'Salle à manger, mur de brique et poutre, chaises cannées' },
  briqueChaises: { src: 'brique-chaises.webp', w: 900, h: 1349, alt: 'Chaises en bois et cuir contre un mur de brique, tables dressées' },
  arche: { src: 'salle-arche.webp', w: 900, h: 1349, alt: 'Arche et persiennes, marbre noir' },
  tulipes: { src: 'salle-tulipes.webp', w: 1800, h: 1201, alt: 'Longue table dressée, tulipes blanches au premier plan, persiennes sombres' },
  tableRonde: { src: 'table-ronde.webp', w: 900, h: 1349, alt: 'Table ronde en bois, chaises et rideaux' },
  tableDressee: { src: 'table-dressee.webp', w: 1417, h: 567, alt: 'Table dressée : verres, serviettes, assiette' },
  petitGris: { src: 'plat-petit-gris.webp', w: 1490, h: 435, alt: 'Petits gris, herbes et écume sur fond sombre' },
  poisson: { src: 'plat-poisson.webp', w: 1494, h: 433, alt: 'Poisson, jaune d’œuf ou beurre, fleur de bourrache' },
  biche: { src: 'plat-biche.webp', w: 1489, h: 433, alt: 'Viande rouge de type gibier et ses garnitures' },
  entree: { src: 'plat-entree.webp', w: 1492, h: 435, alt: 'Entrée : poisson, légumes, sauce brune et herbes' },
  dessert: { src: 'dessert.webp', w: 1492, h: 435, alt: 'Dessert : sphères vertes de pomme, fruits sur assiette claire' },
  chambre1: { src: 'chambre-1.webp', w: 1499, h: 431, alt: 'Chambre d’hôtes : lit, serviettes, bois ancien' },
  chambre2: { src: 'chambre-2.webp', w: 1498, h: 429, alt: 'Détail du lit et du linge blanc' },
  chambre3: { src: 'chambre-3.webp', w: 1500, h: 430, alt: 'Chambre, tête de lit en bois ancien éclairée' },
  chambre4: { src: 'chambre-4.webp', w: 1500, h: 431, alt: 'Poutre apparente et luminaire rond' },
  maison: { src: 'maison-hotes.webp', w: 700, h: 466, alt: 'Maison à colombages des chambres d’hôtes, jardin et ciel bleu' },
  coin: { src: 'coin-table.webp', w: 1501, h: 429, alt: 'Coin de salle en bois devant une fenêtre' },
};
