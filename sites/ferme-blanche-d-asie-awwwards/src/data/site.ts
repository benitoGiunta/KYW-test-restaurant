// Contenu de La Ferme Blanche d'Asie (variante awwwards « Le plateau tournant »).
// Source : data/restaurants/ferme-blanche-d-asie/donnees.json et dossier.md (recherche du 09/11/2026).
// Hypothèses : aucune donnée fictive. Histoire, fondateurs, chef, année d'ouverture, baseline : inconnus, donc absents.
// Écarts à signaler (voir RAPPORT.md) : nom de plat tronqué « Potage crème nid d », fourchettes de prix du dossier
// différentes de celles de la carte copiée, avis Resto.be « à confirmer ».
import carteJson from './carte.json';

export const site = {
  nom: 'La Ferme Blanche d’Asie',
  nomCourt: 'Ferme Blanche d’Asie',
  description:
    'Restaurant asiatique à Malonne, près de Namur : dim sum, canard laqué, scampis, menu découverte à 29 €. Ouvert tous les jours, midi et soir, parking privé.',
  adresse: { rue: 'Allée de la Maison Blanche', numero: '20', cp: '5020', commune: 'Malonne', ville: 'Namur', pays: 'BE' },
  geo: { lat: 50.4510732, lon: 4.817696 },
  telephone: '+3281446489',
  telephoneLisible: '081 44 64 89',
  telephoneHref: 'tel:+3281446489',
  email: 'lafermeblanchedasie@gmail.com',
  facebook: 'https://fr-fr.facebook.com/lafermeblanchedasie/',
  planUrl: 'https://www.google.com/maps/search/?api=1&query=50.4510732,4.817696',
  siteActuel: 'https://www.lafermeblanchedasie.be',
  typeCuisine: ['Asiatique', 'Chinoise'],
  credit: 'Photos : La Ferme Blanche d’Asie',
  paiements: 'Espèces, Visa, Mastercard, Maestro, Bancontact',
  langues: 'français et chinois',
  emporter: '-10 % sur les plats à emporter',
};

// Horaires (site actuel). Les créneaux « 00:00 » ferment à minuit.
export const services = [
  { jours: 'Du lundi au vendredi', midi: '12 h à 14 h 30', soir: '18 h à 23 h', schema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], o1: '12:00', c1: '14:30', o2: '18:00', c2: '23:00' },
  { jours: 'Samedi', midi: '12 h à 14 h 30', soir: '18 h à minuit', schema: ['Saturday'], o1: '12:00', c1: '14:30', o2: '18:00', c2: '23:59' },
  { jours: 'Dimanche', midi: '12 h à 15 h 30', soir: '18 h à 23 h', schema: ['Sunday'], o1: '12:00', c1: '15:30', o2: '18:00', c2: '23:00' },
];

export type Plat = { num: number | null; nom: string; description: string | null; prix: number };
export const carte = carteJson as { categorie: string; plats: Plat[] }[];
export const nbPlats = carte.reduce((n, c) => n + c.plats.length, 0) + 1; // + le menu découverte

export const menus = [
  { nom: 'Menu découverte', detail: '5 services, à partir de 2 personnes', prix: 29, par: 'par personne', texte: 'Bœuf aux oignons, canard aux fruits frais, poulet sauce coriandre, filet de perche sauce coriandre et scampis à l’ail.' },
  { nom: 'Menu de Noël', detail: 'Fêtes de fin d’année', prix: 45, par: 'par personne', texte: 'Mise en bouche : salade de bœuf et avocat. Potage au choix : piquant, nid d’hirondelle, tomate ou raviolis chinois. Entrée : scampis sautés aux tomates. Assortiment de plateaux : calamars au curry jaune, dorade royale au beurre à l’ail, bœuf aux oignons, canard sirop d’érable, poulet basilic. Dessert au choix.' },
  { nom: 'Menu du réveillon', detail: 'Nouvel an, acompte de 20 € par personne à la réservation', prix: 65, par: 'par personne', texte: 'Mise en bouche : salade de bœuf et avocat. Potage aux légumes et scampis de rizière. Entrée : tomate farcie au poulet thaï. Plat au choix : ribs de porc à l’ail, canard laqué aux cèpes umami, scampis façon du chef, fondue de dorade au curry et lait de coco (à réserver à l’avance) ou nouilles royales. Dessert : flan au matcha.' },
];

export const salles = [
  { nom: 'La salle principale', texte: 'Tables dressées sous les lustres, carrelage ivoire et motifs de grecques.' },
  { nom: 'La salle à poutres', texte: 'Poutres sombres, lanternes et tables dressées avec verres.' },
  { nom: 'La salle à table ronde', texte: 'Table ronde à plateau tournant, rideaux et lustre.' },
  { nom: 'La salle V.I.P.', texte: '26 personnes au maximum, toilette privée, accès à la terrasse.' },
  { nom: 'La grande salle privée', texte: 'Environ 300 personnes pour les réceptions.' },
];

export const avis = [
  { texte: 'Cadre sympathique et épuré. Service impeccable', source: 'Resto.be' },
  { texte: 'Très bon chinois, carte variée, grand parking et surtout commande via une tablette ce qui permet de déterminer le rythme et de prendre son temps... ou pas pour les pressés.', source: 'Trouve Ton Resto' },
];
export const notes = { resto: '9,1/10 sur 201 avis (Resto.be, à confirmer)', ttr: '4,4/5 sur 6 avis (Trouve Ton Resto)' };

export const eur = (n: number) => n.toLocaleString('fr-BE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\s/g, ' ') + ' €';
export const eur0 = (n: number) => `${n} €`;
