// Contenu de La Brasserie du Quai (variante awwwards). Source : data/restaurants/brasserie-du-quai/donnees.json
// et dossier.md (site actuel brasserieduquai.be, relevé du 01/11/2026).
// Hypothèses (listées dans DESIGN.md et ETAT.md) :
//  1. Jours de fermeture inconnus : affichés « à confirmer » ; JSON-LD limité à lundi, jeudi, vendredi, samedi.
//  2. Lien de réservation = page Réservation du site actuel (module Zenchef probable).
//  3. Année d'ouverture inconnue : jamais écrite. Nom de famille de Pierre-Alexandre non affiché.
//  4. Notes Google/Tripadvisor et Gault&Millau non affichés ; seule la sélection Michelin 2026 est citée.

const nb = ' ';

export const site = {
  nom: 'La Brasserie du Quai',
  nomCourt: 'Brasserie du Quai',
  baseline: 'Brasserie et écailler sur la Meuse, Namur',
  description:
    'Brasserie et banc d’écailler au pied du pont du Luxembourg, à Namur : baies vitrées et terrasse chauffée sur la Meuse, huîtres du jeudi au lundi.',
  typeCuisine: ['Brasserie', 'Fruits de mer', 'Cuisine belge'],
  adresse: { rue: 'Rue du Quai', numero: '9', cp: '5000', commune: 'Namur', pays: 'BE' },
  adresseLisible: `9 rue du Quai, 5000${nb}Namur`,
  situation: 'Au pied du pont du Luxembourg, sur les berges de la Meuse',
  geo: { lat: 50.4656346, lon: 4.8794989 },
  carteUrl: 'https://www.google.com/maps/search/?api=1&query=50.4656346,4.8794989',
  telephone: '+32 81 65 70 03',
  telephoneHref: 'tel:+3281657003',
  telephoneLisible: `081${nb}65${nb}70${nb}03`,
  email: 'info@brasserieduquai.be',
  reservationUrl: 'https://www.brasserieduquai.be/reservation/',
  bce: '0564.802.096',
  reseaux: [
    { nom: 'Instagram', url: 'https://www.instagram.com/brasserieduquai/' },
    { nom: 'Facebook', url: 'https://www.facebook.com/brasserieduquai/' },
  ],
  michelin: { titre: 'Sélection du Guide Michelin Belgique 2026', url: 'https://guide.michelin.com/en/namur/namur/restaurant/brasserie-du-quai' },
};

/** Horaires saisonniers (site actuel, page Réservation). Les jours de fermeture ne sont pas publiés. */
export const saisons = [
  { nom: 'De novembre à avril', midi: ['12:00', '14:30'], soir: ['18:00', '21:30'] },
  { nom: 'De mai à octobre', midi: ['12:00', '14:30'], soir: ['18:00', '22:00'] },
] as const;
export const ecailler = 'Le banc d’écailler vous accueille du jeudi au lundi inclus.';
export const fermeture = { texte: 'Jours de fermeture hebdomadaire : à confirmer', placeholder: true };
/** JSON-LD : jours cités « à confirmer » dans donnees.json (hypothèse 1). */
export const joursLd = ['Monday', 'Thursday', 'Friday', 'Saturday'];

/** « 12:00 » → « 12 h », « 14:30 » → « 14 h 30 » (espaces insécables). */
export const heure = (h: string) => {
  const [H, M] = h.split(':');
  return `${Number(H)}${nb}h${M === '00' ? '' : nb + M}`;
};
/** 15 → « 15 € », 19.2 → « 19,20 € ». */
export const euros = (n: number) =>
  `${Number.isInteger(n) ? n : n.toFixed(2).replace('.', ',')}${nb}€`;

export const faits = [
  { titre: 'Les baies vitrées', texte: 'De grandes baies vitrées ouvrent la salle sur la Meuse.' },
  { titre: 'La terrasse', texte: 'Chauffée et à l’abri du vent, elle se prolonge tard dans la saison.' },
  { titre: 'L’écailler', texte: 'Du jeudi au lundi inclus, huîtres et plateaux ouverts devant vous.' },
];

/** Six classiques cités au dossier (spécialités), prix de la carte. */
export const classiques = [
  { nom: 'Croquettes de crevettes grises « maison »', prix: '11 € la pièce', photo: null },
  { nom: 'Bisque de homard en cappuccino', prix: `19${nb}€`, photo: null },
  { nom: 'Notre belle sole « meunière »', prix: 'prix du jour', photo: 'sole' },
  { nom: 'Américain préparé haché minute', prix: `26${nb}€`, photo: null },
  { nom: 'Vol-au-vent « Royal », truffe et ris de veau', prix: `34${nb}€`, photo: 'volaille' },
  { nom: 'Le Plateau du Quai (2 pers.)', prix: `165${nb}€`, photo: 'huitres' },
] as const;

export const equipe = [
  { nom: 'Martin et Rémy', role: 'En cuisine depuis juillet 2026, après la retraite du chef de longue date.' },
  { nom: 'Pierre-Alexandre', role: 'En salle, avec son équipe.' },
];

export const histoire = [
  'C’est au pied du pont du Luxembourg, sur les berges de la Meuse, que s’est posée la Brasserie du Quai.',
  'Une brasserie au sens propre : une carte large, des produits frais, des suggestions de saison qui changent chaque semaine, des croquettes et des fondus faits maison, des frites cuites à la graisse de bœuf.',
  'Du jeudi au lundi, le banc d’écailler ouvre les Normandes, les Fines de Claire et les Gillardeaux. Depuis juillet 2026, Martin et Rémy ont repris la cuisine ; la maison garde ses classiques.',
];
