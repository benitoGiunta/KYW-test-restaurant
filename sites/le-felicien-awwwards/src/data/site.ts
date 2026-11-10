// Contenu du Félicien. Sources : data/restaurants/le-felicien/{donnees.json,dossier.md}.
// Hypothèses : aucune photo récente ni de salle (une seule photo de plat de 2020, l'illustration de la couverture de la carte) ;
// pas de parking ni de note d'avis connus : rien n'est affiché. Aucun complément fictif (placeholder: false partout).
// Capacité (300 ou 400 couverts) non affichée : donnée à confirmer.
import carteJson from './carte.json';

const N = ' ';
export const site = {
  nom: 'Le Félicien',
  baseline: 'Une brasserie pour tous',
  typeCuisine: 'Brasserie classique belge et française',
  description: 'Brasserie à Suarlée, Namur : croquettes, boulets à la liégeoise, vol-au-vent et frites fraîches. Midi et soir, sept jours sur sept.',
  adresse: { rue: 'Avenue d’Ecolys', numero: '2 bte 3', cp: '5020', commune: 'Suarlée', ville: 'Namur', pays: 'BE' },
  geo: { lat: 50.485, lon: 4.7953 },
  planUrl: 'https://www.google.com/maps/search/?api=1&query=50.485,4.7953',
  telephone: '+3281395323',
  telephoneHref: 'tel:+3281395323',
  telephoneLisible: `081${N}39${N}53${N}23`,
  email: 'info@lefelicien.be',
  emailEvenements: 'evenement@lefelicien.be',
  reservationUrl: 'https://reservations.lefelicien.be/',
  siteClient: 'https://www.lefelicien.be',
  facebook: 'https://www.facebook.com/lefelicienrestaurant/',
  instagram: 'https://www.instagram.com/le.felicien/',
  credit: 'Photos et illustration : Le Félicien',
  placeholder: false,
};

export type Service = { jours: string; schema: string[]; midi: string; soir: string; o1: string; c1: string; o2: string; c2: string };
export const services: Service[] = [
  { jours: 'Lundi au jeudi et dimanche', schema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Sunday'], midi: `12${N}h à 14${N}h`, soir: `18${N}h à 21${N}h30`, o1: '12:00', c1: '14:00', o2: '18:00', c2: '21:30' },
  { jours: 'Vendredi et samedi', schema: ['Friday', 'Saturday'], midi: `12${N}h à 14${N}h`, soir: `18${N}h à 22${N}h`, o1: '12:00', c1: '14:00', o2: '18:00', c2: '22:00' },
];
export const horairesNote = `Horaires de la cuisine. Veille de jour férié : le soir jusqu’à 22${N}h. Pendant les ventes Rops : petite restauration de 14${N}h à 18${N}h.`;

// Échelle de la règle : 0 à 40 €.
export const ECHELLE_MAX = 40;
export const ancres = [
  { prix: 10, label: 'La soupe à l’oignon, le menu bambin', court: `10${N}€` },
  { prix: 18, label: 'Le plat du midi, du mardi au vendredi', court: `18${N}€` },
  { prix: 25, label: 'Entrée et plat, le midi', court: `25${N}€` },
  { prix: 38, label: 'L’entrecôte de 350 g', court: `38${N}€` },
];

export type Rang = { titre: string; phrase: string; min: number; max: number; texte: string };
export const pourTous: Rang[] = [
  { titre: 'Le midi, en semaine', phrase: 'Suggestions de la semaine, du mardi au vendredi : entrée et plat, ou plat seul.', min: 18, max: 25, texte: `18${N}à${N}25${N}€` },
  { titre: 'Les bambins', phrase: 'Boulettes, vol-au-vent, brochette de bœuf ou rigatoni, toujours avec des frites ou des pâtes.', min: 10, max: 15, texte: `10${N}à${N}15${N}€` },
  { titre: 'Sans viande', phrase: 'Bowl de falafels, cannelloni ricotta-épinards, veggie burger (version vegan sur demande).', min: 17, max: 23, texte: `17${N}à${N}23${N}€` },
  { titre: 'La grande faim', phrase: 'Filet mignon, brochette, entrecôte de bœuf irlandais, ris de veau aux morilles.', min: 29, max: 38, texte: `29${N}à${N}38${N}€` },
  { titre: 'Au bar', phrase: 'Bières à la pression, cocktails, coupe de champagne, softs.', min: 3.2, max: 15, texte: `3,2${N}à${N}15${N}€` },
  { titre: 'Les groupes', phrase: 'Dîners, banquets et réceptions au premier étage, menus hors boissons.', min: 27, max: 27, texte: `dès 27${N}€` },
];

export const classiques = [
  { nom: 'Croquette au fromage', note: 'mesclun et garnitures, deux pièces', prix: `10${N}€` },
  { nom: 'Boulets à la liégeoise maison', note: 'frites', prix: `19${N}€` },
  { nom: 'Vol-au-vent maison', note: 'boulettes de veau, feuilleté, frites', prix: `24${N}€` },
  { nom: 'Os à moelle rôti au four', note: 'persillade, oignons frits, focaccia grillée', prix: `18${N}€` },
];

export const histoire = [
  { quand: 'Fin 2019', texte: 'Le Félicien ouvre au cœur du Business Village Ecolys, à Suarlée.' },
  { quand: '22 janvier 2026', texte: 'La brasserie rouvre ses portes, sous la direction de Maximilien de Sauvage.' },
  { quand: 'Novembre 2026', texte: 'Première carte d’automne de cette nouvelle équipe.' },
];
export const equipe = [
  { nom: 'Sébastien Deprost', role: 'Chef de cuisine' },
  { nom: 'Sébastien Gilles', role: 'Maître d’hôtel' },
  { nom: 'Maximilien de Sauvage', role: 'À l’initiative de la relance et du développement' },
];

export type Plat = { nom: string; description: string | null; prix: number; detail: string | null };
export type Bloc = { groupe: string; titre: string; plats: Plat[] };
export const carte = carteJson as Bloc[];
export const groupes = [...new Set(carte.map((b) => b.groupe))];
export const slug = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const eur = (n: number) => `${String(n).replace('.', ',')}${N}€`;
