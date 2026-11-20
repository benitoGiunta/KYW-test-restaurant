// Contenu de La Maison des Desserts (data/restaurants/maison-des-desserts/donnees.json et dossier.md).
// Hypothèses : (1) pas de réservation de table publiée : les CTA sont l'appel, l'e-mail et la boutique en ligne du client ;
// (2) histoire limitée aux faits du site (1946 chocolaterie rue de Fer, 1993 salon de thé, bâtisse du 17e siècle, 3e génération) ;
// la date 1987 du bandeau d'accueil et la reprise de 1974 (DH, à confirmer) ne sont pas reprises ; (3) aucun fait fictif : aucun `placeholder` à ce jour.
export const site = {
  nom: 'La Maison des Desserts',
  baseline: 'Boulangerie, pâtisserie et chocolaterie, salon de thé à Namur',
  description: 'Boulangerie, pâtisserie et chocolaterie sous le même toit, salon de thé au cœur du vieux Namur, rue Haute Marcelle. Ouvert du mardi au samedi de 8 h à 18 h.',
  typeCuisine: ['Pâtisserie', 'Boulangerie', 'Chocolaterie', 'Salon de thé'],
  adresse: { rue: 'Rue Haute Marcelle', numero: '17', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.4669, lon: 4.8675 },
  telephoneLisible: '081 22 74 51',
  telephoneHref: 'tel:+3281227451',
  email: 'info@mddnam.be',
  siteClient: 'https://lamaisondesdesserts.be',
  boutiqueUrl: 'https://shop.lamaisondesdesserts.be',
  planUrl: 'https://www.openstreetmap.org/?mlat=50.4669&mlon=4.8675#map=18/50.4669/4.8675',
  facebook: 'https://www.facebook.com/p/La-maison-des-desserts-100089286496824/',
  instagram: 'https://www.instagram.com/lamaisondesdesserts/',
  credit: 'Photos : La Maison des Desserts',
  ouverture: '08:00',
  fermeture: '18:00',
} as const;

export const reseaux = [
  { nom: 'Instagram', url: site.instagram },
  { nom: 'Facebook', url: site.facebook },
  { nom: 'Boutique en ligne', url: site.boutiqueUrl },
];

export const jours = [
  { nom: 'Lundi', ferme: true }, { nom: 'Mardi', ferme: false }, { nom: 'Mercredi', ferme: false },
  { nom: 'Jeudi', ferme: false }, { nom: 'Vendredi', ferme: false }, { nom: 'Samedi', ferme: false }, { nom: 'Dimanche', ferme: true },
];
export const joursSchema = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

/** La journée de la maison : chaque ligne est un horaire publié par le site ou la carte. */
export const journee = [
  { h: '8 h', t: 'La maison ouvre', d: 'Pains, viennoiseries et pâtisseries au comptoir, du mardi au samedi.' },
  { h: '8 h 30', t: 'Le petit déjeuner', d: 'Servi jusqu’à 10 h 30.' },
  { h: '9 h', t: 'Les suggestions sucrées', d: 'Desserts et boissons du moment, jusqu’à 17 h 30.' },
  { h: '11 h 30', t: 'La cuisine démarre', d: 'Croques, burgers, salades et quiches, jusqu’à 17 h 30 pour une partie de la carte.' },
  { h: '12 h', t: 'Le plat du midi', d: 'Suggestions d’automne sur ardoise et plats chauds, jusqu’à 15 h.' },
  { h: '18 h', t: 'La maison ferme', d: 'Les commandes de fêtes se retirent avant la fermeture.' },
] as const;

export const fetes = {
  titre: 'Fêtes de fin d’année 2026-2027',
  ouvert: '20, 21, 27 et 28 décembre',
  ferme: '25 décembre et 1er janvier',
  note: 'Le 20 décembre, la maison ferme à 17 h.',
  commandes: 'Commandes de Noël jusqu’au 22 décembre à 18 h, commandes du Nouvel An jusqu’au 29 décembre à 18 h.',
};

export const histoire = [
  { annee: '1946', texte: 'La chocolaterie naît rue de Fer, à Namur.' },
  { annee: '1993', texte: 'Le salon de thé et la pâtisserie ouvrent rue Haute Marcelle, dans le quartier Saint-Loup, au cœur du vieux Namur.' },
  { annee: 'Aujourd’hui', texte: 'La troisième génération dirige la maison. Boulangerie, pâtisserie et chocolaterie travaillent sous le même toit, dans une bâtisse du 17e siècle.' },
];

export const specialites = [
  'Pâtisseries et entremets', 'Macarons de Paris', 'Biétrumés, chocolats belges', 'Pralines artisanales et pralines Namuco',
  'Cougnous', 'Crêpes, gaufres, glaces et vacherins', 'Bûches et gâteaux de fêtes',
];
