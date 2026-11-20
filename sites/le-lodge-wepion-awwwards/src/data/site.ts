// Contenu du Lodge Wépion (variante awwwards). Sources : data/restaurants/le-lodge-wepion/{donnees.json,dossier.md}, relevé du 20/11/2026.
// HYPOTHÈSES (voir aussi RAPPORT.md) :
//  - Le restaurant de Wépion est fermé depuis l'incendie du 21/05/2026 ; la maquette le dit, sans faux horaires ni fausse date de réouverture.
//  - Le numéro d'appel et de réservation du relais (0496 92 55 13) vient de la fenêtre du site client : à confirmer. Ligne de Wépion : +32 81 40 08 91.
//  - Horaires du relais d'Erpent : inconnus, donc non affichés. Horaires de Wépion : ceux du site client, avant l'incendie (Trouve Ton Resto en donne d'autres).
//  - Ouverture 2008 et 160 couverts : source tierce (Trouve Ton Resto), à confirmer.
//  - Aucun avis, note, distinction ni citation affichés. Aucun élément `placeholder: true` : tout vient du dossier.
export const site = {
  nom: 'Le Lodge Wépion',
  nomCourt: 'Le Lodge',
  typeCuisine: 'Brasserie de bord de Meuse, restaurant, tea-room',
  description: 'Brasserie, restaurant et tea-room au bord de la Meuse à Wépion, fermé depuis l’incendie du 21 mai 2026. L’équipe vous reçoit à Erpent, au Wine & More.',
  email: 'le.lodge@hotmail.com',
  facebook: 'https://www.facebook.com/lodgewepion',
  instagram: 'https://www.instagram.com/restaurant_le_lodge/',
  reservationUrl: 'https://lelodge.reservation.barestho.com/',
  credit: 'Photos : Le Lodge Wépion, avant l’incendie',
  geo: { lat: 50.4234855, lon: 4.8742231 },
  gerant: 'Grégory Jorion',
  // Constantes issues du dossier (aucune date relative en dur)
  fermetureDepuis: '21 mai 2026',
  reouverture: 'envisagée fin 2026, voire début 2027, sans date confirmée',
} as const;

export const wepion = {
  nom: 'Wépion',
  etat: 'Fermé depuis l’incendie du 21 mai 2026',
  rue: 'Chaussée de Dinant',
  numero: '931',
  cp: '5100',
  commune: 'Wépion (Namur)',
  pays: 'BE',
  telephone: '+32 81 40 08 91',
  telephoneHref: 'tel:+3281400891',
  planUrl: 'https://www.google.com/maps/search/?api=1&query=50.4234855,4.8742231',
} as const;

export const relais = {
  nom: 'Erpent',
  lieu: 'Wine & More',
  etat: 'Service 6 jours sur 7 depuis le 15 septembre 2026',
  rue: 'Chaussée de Marche',
  numero: '496',
  commune: 'Erpent (Namur)',
  telephone: '0496 92 55 13',
  telephoneHref: 'tel:+32496925513',
  planUrl: 'https://www.google.com/maps/search/?api=1&query=Wine+%26+More+Chauss%C3%A9e+de+Marche+496+Erpent',
} as const;

// Horaires de Wépion avant l'incendie (site du client). Le relais n'en publie aucun ici.
export const horairesWepion = [
  ['Lundi', '11 h 30 à 22 h 30'], ['Mardi', '11 h 30 à 22 h 30'], ['Mercredi', '11 h 30 à 22 h 30'], ['Jeudi', '11 h 30 à 22 h 30'],
  ['Vendredi', '11 h 30 à 22 h 30'], ['Samedi', '11 h 30 à 22 h 30'], ['Dimanche', '11 h 30 à 22 h 30'],
] as const;

export const reseaux = [
  { nom: 'Facebook', url: site.facebook },
  { nom: 'Instagram', url: site.instagram },
] as const;

export const chronologie = [
  { quand: '2008', texte: 'Ouverture du Lodge à Wépion, selon une source tierce (à confirmer). Capacité annoncée : 160 couverts.' },
  { quand: '21 mai 2026', texte: 'Un incendie part des cuisines vers 23 h 30 et ravage le restaurant. L’Avenir et La DH en rendent compte.' },
  { quand: 'Juin 2026', texte: 'L’équipe reprend le service à l’Aquaplane de Profondeville, jusqu’au 15 septembre.' },
  { quand: '15 septembre 2026', texte: 'L’équipe s’installe au Wine & More, à Erpent, six jours sur sept.' },
  { quand: 'Fin 2026 ou début 2027', texte: 'Retour à Wépion envisagé par le gérant, sans date confirmée.' },
] as const;

export const presse = [
  { media: 'L’Avenir', date: '22 mai 2026', titre: 'Le restaurant Le Lodge ravagé par un incendie ce jeudi soir à Wépion', url: 'https://www.lavenir.net/regions/namur/namur/2026/05/22/namur-le-restaurant-le-lodge-ravage-par-un-incendie-ce-jeudi-soir-J3P57GI63FEPDOVLUCB6FA7UUM/' },
  { media: 'La DH', date: '26 mai 2026', titre: 'Incendie au restaurant Le Lodge à Wépion : pas de réouverture avant la fin de l’année', url: 'https://www.dhnet.be/regions/namur/2026/05/26/incendie-au-restaurant-le-lodge-a-wepion-pas-de-reouverture-avant-la-fin-de-lannee-SHRIHXPV4JATRPP5M57NM4DREU/' },
] as const;

// Plats mis en avant sur l'accueil (noms exacts de la carte, prix de la carte)
export const reperes = [
  { nom: 'Le tartare de bœuf à l’italienne', note: 'Parmesan, tartufata, sésame, pepperoni, huile au pesto', prix: '24 €', photo: 'viande' },
  { nom: 'Les boulettes maison', note: 'Sauce tomate ou liégeoise, porc qualité Ardenne, frites', prix: '20 €', photo: 'panee' },
  { nom: 'Le vol-au-vent maison', note: 'Quenelles de volaille, champignons', prix: '22 €', photo: 'feuillete' },
  { nom: 'Croquettes de crevettes grises', note: 'Persil frit et citron, une pièce', prix: '15 €', photo: 'bol' },
  { nom: 'Pâtes artisanales Mil’pat', note: 'Quatre plats à la carte', prix: '20 à 24 €', photo: 'bol' },
  { nom: 'La coupe de fraises de Wépion', note: 'Coulis de fraises, à la carte des desserts', prix: '12 €', photo: 'dessert' },
] as const;
