import photos from './photos.json';
const N = ' ';
export const resto = {
  nom: 'Li Micougni',
  description: 'Restaurant au cœur de Namur : ardoises à partager, grillades au charbon de bois, produits locaux de saison et terrasse dans une cour privée.',
  adresse: { rue: 'Rue des Brasseurs 110', ville: `5000${N}Namur` },
  itineraire: 'https://maps.google.com/maps?q=Rue%20des%20Brasseurs%20110%2C%205000%20Namur%2C%20Belgique',
  tel: { href: 'tel:+32470597596', affiche: `+32${N}470${N}59${N}75${N}96` },
  email: 'limicougni@gmail.com',
  instagram: 'https://instagram.com/limicougninamur',
  facebook: 'https://facebook.com/61585258150821/',
  site: 'https://www.limicougni.com',
  carte: { href: 'carte-li-micougni.pdf', label: 'Carte Li Micougni Septembre Janvier' },
};
export const nav = [
  { href: 'vitrine-du-restaurant/', label: 'Vitrine' },
  { href: 'menu/', label: 'Menu' },
  { href: 'notre-terrasse-arriere/', label: `Terrasse${N}arrière` },
  { href: 'evenement-privee/', label: `Évènement${N}privé` },
  { href: 'a-propos-de-nous/', label: `À${N}propos` },
  { href: 'contact/', label: 'Contact' },
];
// Horaires : seule phrase du site d'origine (FAQ) ; mercredi à samedi non publiés : slot .fill
export const jours = [
  { jour: 'Lundi', days: '1', val: 'Fermé', ferme: true },
  { jour: 'Mardi', days: '2', val: `À partir de 17${N}h${N}00` },
  { jour: `Du mercredi au samedi`, days: '3,4,5,6', fill: `heures à confirmer` },
  { jour: 'Dimanche', days: '0', val: `Jusqu’à 17${N}h${N}00` },
];
export type PhotoId = keyof typeof photos;
export const alts: Record<string, string> = {
  salle: 'La salle vue en large, banquettes rouges, tables en bois et fauteuils bruns',
  grill: 'Le grill au charbon de bois, braises sous la hotte, dans la cour',
  ardoise: 'Une ardoise de charcuteries et de fromages, olives et raisins',
  terrasse: 'La terrasse arrière dans la cour privée, tables sous un parasol',
  'salle-tables': 'La salle, tables en bois et fauteuils sous des suspensions',
  'salle-fenetres': 'La salle côté fenêtres, fleurs sur une table',
  polaroids: 'Un tableau de polaroïds et un vase fleuri',
  'ardoise-logo': 'Détail d’une ardoise gravée au logo Li Micougni',
  rouget: 'Un rouget, sauce verte et légumes',
  viande: 'Une viande en sauce, carotte-patate douce et endive',
  poisson: 'Un poisson, sauce crémeuse et pommes de terre',
  saumon: 'Saumon fumé, mascarpone et gressin',
  'roast-beef': 'Un plat en bol, viande et fromage frais',
  veloute: 'Un velouté, croûtons et œuf',
  chevre: 'La salade au chèvre servie à l’assiette',
  salade: 'La salade au chèvre chaud, en cuisine',
};
