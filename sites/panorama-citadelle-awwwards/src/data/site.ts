// Contenu du Panorama (variante awwwards « Le tour d'horizon »). Sources : data/restaurants/panorama-citadelle/ (donnees.json, dossier.md).
// HYPOTHÈSES (voir RAPPORT.md) :
//  - Horaires : le site client annonce « tous les jours de 8 h à 23 h » (accueil) et « brasserie 11 h à 23 h » (page contact). Les deux sont
//    montrés, étiquetés « à confirmer » : on ne tranche pas. Petit-déjeuner 8 h à 10 h 30 (carte des petits-déjeuners).
//  - Aucun avis, note ni distinction n'est affiché (Google inconnu, Tripadvisor contradictoire, Gault&Millau non repris).
//  - Aucun contenu fictif : tout vient du dossier. Le portrait 18 n'est pas nommé (identité « à confirmer »).
export { categories, menus } from './plats';

export const restaurant = {
  nom: 'Le Panorama',
  baseline: 'Une expérience culinaire au sommet de la Citadelle',
  description:
    'Le Panorama, brasserie au sommet de la Citadelle de Namur : vue à 360° sur la Meuse, carte signée Yves Mattagne, tarte flambée au four à bois.',
  cuisine: ['Brasserie', 'Cuisine du monde', 'Produits locaux'],
  adresse: { rue: 'Route Merveilleuse', numero: '82', cp: '5000', commune: 'Namur', complement: 'Citadelle' },
  geo: { lat: 50.4571199, lon: 4.8594819 },
  telephone: '+32 81 84 11 34',
  telephoneLisible: '081 84 11 34',
  telephoneHref: 'tel:+3281841134',
  emailGroupes: 'groupes@panoramanamur.be',
  reservationUrl: 'https://www.panoramanamur.be/reservation-contact/',
  siteClient: 'https://www.panoramanamur.be',
  plan: 'https://www.openstreetmap.org/?mlat=50.45712&mlon=4.85948#map=17/50.45712/4.85948',
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/PanoramaNamur' },
    { nom: 'Instagram', url: 'https://www.instagram.com/panoramanamur' },
  ],
  credit: 'photos : Le Panorama',
} as const;

/** Les jours, de lundi à dimanche. Horaires identiques selon l'accueil du site client (à confirmer). */
export const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'] as const;
export const ouverture = { de: 8, a: 23 } as const;
/** Moments de la journée portés par la règle de l'horizon (début et fin en heures décimales). */
export const moments = [
  { id: 'matin', de: 8, a: 10.5, libelle: 'Petits-déjeuners', detail: '8 h à 10 h 30' },
  { id: 'brasserie', de: 11, a: 23, libelle: 'Brasserie', detail: '11 h à 23 h, à confirmer' },
] as const;

/** Les lieux, du haut vers le bas : l'index de l'accueil. */
export const lieux = [
  { id: 'terrasse', nom: 'La terrasse', photo: 'platanes', texte: 'Plusieurs niveaux de gravier sous des platanes taillés, 400 places annoncées. La terrasse ne se réserve pas.' },
  { id: 'salle', nom: 'La salle', photo: 'salle', texte: 'Mur de pierre, plafond de lattes de bois et 120 places de plus à l’intérieur, devant les baies vitrées.' },
  { id: 'bar', nom: 'Le bar', photo: 'bar', texte: 'Un comptoir en marbre noir, des tabourets verts, et un second bar en terrasse.' },
  { id: 'cave', nom: 'La cave', photo: 'cave', texte: 'Une cave à vin vitrée à l’entrée : les bouteilles se voient avant de s’asseoir.' },
] as const;

export const histoire = [
  'Le Panorama occupe le sommet de la Citadelle de Namur, Route Merveilleuse 82. Le restaurant a été rénové et rouvert en 2022 ; les journaux locaux ne s’accordent pas entre début mai et juin, nous ne tranchons pas.',
  'Il est exploité par François Delpire-Crets et Frédéric Massart. La salle compte 120 places, la terrasse sur plusieurs niveaux 400 annoncées, avec un bar en marbre, une cuisine ouverte et un four à bois.',
  'La carte est signée par le chef Yves Mattagne, doublement étoilé à La Villa Lorraine. Les tartes flambées ont été apprises aux cuisiniers par le chef alsacien Patrice Bluntzer, de l’auberge Saint-Martin à Kintzheim.',
] as const;

export const equipe = [
  { nom: 'Yves Mattagne', role: 'Chef, il signe la carte' },
  { nom: 'François Delpire-Crets', role: 'Gérant' },
  { nom: 'Frédéric Massart', role: 'Gérant' },
  { nom: 'Patrice Bluntzer', role: 'Chef alsacien, a formé les cuisiniers à la tarte flambée' },
] as const;

/** Faits d'accueil, chacun sourcé dans dossier.md. */
export const faits = {
  telepherique: 'À une centaine de mètres du téléphérique de la Citadelle.',
  groupes: 'Groupes dès 7 personnes : écrire à groupes@panoramanamur.be.',
  terrasse: 'Pas de réservation pour la terrasse.',
  gluten: 'Pain sans gluten sur demande.',
} as const;
