// Contenu de La Dolce Vita (Wépion), variante awwwards « Il neon ».
// Sources : data/restaurants/dolce-vita-wepion/{donnees.json, dossier.md, photos/index.json}, capture du 01/11/2026.
// Hypothèses (aucune question posée, décisions notées) :
// - Réservation par téléphone uniquement (site client, /infos/) : pas de lien externe, `reservationUrl` = null.
// - « Depuis 2017 » (site client) ; mois exact non confirmé, donc aucun mois affiché.
// - Le nom de famille d'Armando (Resto.be, « à confirmer ») n'est pas affiché.
// - Aucun avis, note, nombre d'avis ni distinction affichés (chiffres non vérifiés dans le dossier).
// - La traduction française de la devise est une traduction KYW (marquée comme telle dans la page).
// - Fermeture exceptionnelle du 26 au 29 octobre : passée à la date de la maquette, non affichée.
// - GPS non géocodé : le plan est un lien de recherche Google Maps sur l'adresse.

export interface Plat { nom: string; description: string | null; prix: number | number[]; placeholder?: boolean }
export interface Categorie { id: string; titre: string; plats: Plat[] }

export const restaurant = {
  nom: 'La Dolce Vita',
  sousTitre: 'Ristorante · Pizzeria',
  lieu: 'Wépion, Namur',
  baseline: 'À Wépion, l’Italie prend son temps.',
  devise: 'Se è dolce, la vita è più bella.',
  deviseFr: 'Si c’est doux, la vie est plus belle.',
  depuis: 2017,
  typeCuisine: ['Italienne', 'Pizzeria'],
  description:
    'La Dolce Vita, ristorante pizzeria chaussée de Dinant à Wépion depuis 2017 : antipasti, pasta, pizze, scaloppine et dolci maison, sur place et à emporter.',
  adresse: { rue: 'Chaussée de Dinant', numero: '1080', cp: '5100', commune: 'Wépion', ville: 'Namur', pays: 'BE' },
  telephone: '+3281855420',
  telephoneLisible: '081 85 54 20',
  mobile: '+32471060002',
  mobileLisible: '0471 06 00 02',
  email: 'dolcevitawepion@gmail.com',
  reservationUrl: null as string | null,
  planUrl: 'https://www.google.com/maps/search/?api=1&query=La+Dolce+Vita+Chauss%C3%A9e+de+Dinant+1080+5100+W%C3%A9pion',
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/ladolcevitaw/' },
    { nom: 'Instagram', url: 'https://www.instagram.com/dolcevitawepion/' },
  ],
  emporter: 'Livraison gratuite dès deux plats, de 18 h à 22 h.',
};

// Horaires du site client. `services` vide = fermé.
export const horaires = [
  { jour: 'Lundi', en: 'Monday', services: [['12:00', '14:00'], ['18:00', '22:00']] },
  { jour: 'Mardi', en: 'Tuesday', services: [] },
  { jour: 'Mercredi', en: 'Wednesday', services: [['18:00', '22:00']] },
  { jour: 'Jeudi', en: 'Thursday', services: [['12:00', '14:00'], ['18:00', '22:00']] },
  { jour: 'Vendredi', en: 'Friday', services: [['12:00', '14:00'], ['18:00', '22:00']] },
  { jour: 'Samedi', en: 'Saturday', services: [['18:00', '22:00']] },
  { jour: 'Dimanche', en: 'Sunday', services: [['12:00', '14:00'], ['18:00', '22:00']] },
] as { jour: string; en: string; services: [string, string][] }[];

const nb = ' ';
/** « 12:00 » → « 12 h », « 18:30 » → « 18 h 30 ». */
export const heure = (h: string) => {
  const [hh, mm] = h.split(':');
  return `${Number(hh)}${nb}h${mm === '00' ? '' : `${nb}${mm}`}`;
};
export const creneaux = (services: [string, string][]) =>
  services.length ? services.map(([a, b]) => `${heure(a)} à ${heure(b)}`).join(' · ') : 'Fermé';

/** Prix en euros, à la belge : 16,5 → « 16,50 € » ; [16.5, 22] → « 16,50 / 22 € ». */
export const prix = (p: number | number[]) => {
  const f = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2).replace('.', ','));
  return `${(Array.isArray(p) ? p : [p]).map(f).join(' / ')}${nb}€`;
};

export const equipe = [
  { nom: 'Armando', role: 'En cuisine', texte: 'Passé par de belles tables italiennes à Bruxelles, il tient la cuisine.' },
  { nom: 'Antigone', role: 'La salle', texte: 'Elle imagine l’atmosphère et la décoration de la salle, et vous y accueille.' },
];

// 60 à 120 mots, faits du dossier seulement.
export const histoire = [
  'La Dolce Vita ouvre en 2017 au 1080 de la chaussée de Dinant, à Wépion. Une maison de ristorante et de pizzeria, sur place ou à emporter.',
  'Armando, passé par de belles tables italiennes à Bruxelles, tient la cuisine. Antigone imagine l’atmosphère : bois blond, mur olive, banquettes sombres, branches de cerisier en fleur. Sur le mur végétal, un néon écrit le nom de la maison.',
  'Le tiramisu della casa, la crème brûlée, la mousse au chocolat et le nougat glacé sont faits ici. L’ardoise des suggestions, elle, change au fil du marché.',
];

export const notesCarte = [
  'Suppléments pizza : 1 € l’ingrédient, 3 € pour les spéciaux, 4 € la burrata.',
  'Accompagnement au choix : supplément de 3 €. Sauces : 3,50 €.',
  'Allergènes : renseignez-vous auprès de l’équipe en salle.',
  'À emporter : livraison gratuite dès deux plats, de 18 h à 22 h. Carte de fidélité sur demande.',
].map((s) => s.replace(/ (€|h)/g, `${nb}$1`).replace(/(\d) (\d)/g, `$1${nb}$2`));

export { carte } from './carte';
