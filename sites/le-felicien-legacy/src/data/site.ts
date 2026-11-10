import carteData from './carte.json';

const NB = ' ';

export const resto = {
  nom: 'Le Félicien',
  genre: 'brasserie',
  baseline: 'Une brasserie pour tous',
  site: 'https://www.lefelicien.be',
  rue: 'Avenue d’Ecolys, 2 bte 3',
  ville: '5020 Suarlée (Namur)',
  tel: '081 39 53 23',
  telHref: 'tel:+3281395323',
  email: 'info@lefelicien.be',
  emailEvt: 'evenement@lefelicien.be',
  reservation: 'https://reservations.lefelicien.be/',
  pdf: 'http://www.lefelicien.be/sites/default/files/2026-11/Le%20Fe%CC%81licien%20%E2%80%94%20Carte%20Automne%202026.pdf',
  facebook: 'https://www.facebook.com/lefelicienrestaurant/',
  instagram: 'https://www.instagram.com/le.felicien/',
  jobs: 'https://recrutement.lefelicien.be/',
  carte: 'https://www.openstreetmap.org/?mlat=50.485&mlon=4.7953#map=17/50.485/4.7953',
  geo: { lat: 50.485, lon: 4.7953 },
};

export const nav = [
  { href: 'la-carte/', label: 'La carte', id: 'carte' },
  { href: 'suggestions-de-la-semaine/', label: 'Suggestions de la semaine', id: 'suggestions' },
  { href: 'contact/', label: 'Contact et réservation', id: 'contact' },
];

const midi = `12${NB}h${NB}–${NB}14${NB}h`;
const soir = `18${NB}h${NB}–${NB}21${NB}h${NB}30`;
const soirTard = `18${NB}h${NB}–${NB}22${NB}h`;

/** jour : numéro JS (0 = dimanche). Horaires de la cuisine, page Contact du site d’origine. */
export const horaires = [
  { jour: 1, nom: 'Lundi', midi, soir },
  { jour: 2, nom: 'Mardi', midi, soir },
  { jour: 3, nom: 'Mercredi', midi, soir },
  { jour: 4, nom: 'Jeudi', midi, soir },
  { jour: 5, nom: 'Vendredi', midi, soir: soirTard },
  { jour: 6, nom: 'Samedi', midi, soir: soirTard },
  { jour: 0, nom: 'Dimanche', midi, soir },
];
export const horairesNote = 'Veille de jour férié : service du soir jusqu’à 22 h. Pendant les ventes Rops : petite restauration de 14 h à 18 h.'.replace(/ (h|€)/g, `${NB}$1`).replace(/(\d) h/g, `$1${NB}h`);

export const carte = carteData as { groupe: string; sous: string | null; plats: { nom: string; desc: string | null; prix: string | null }[] }[];
export const groupes = [...new Set(carte.map((c) => c.groupe))].map((g) => ({
  nom: g,
  id: g.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]+/g, '-').replace(/^-|-$/g, ''),
  parties: carte.filter((c) => c.groupe === g),
}));
export const plat = (nom: string) => {
  for (const c of carte) for (const p of c.plats) if (p.nom === nom) return p;
  throw new Error(`Plat inconnu dans carte.json : ${nom}`);
};
/** Les six classiques mis en avant sur l’accueil (noms exacts de la carte). */
export const classiques = [
  'Croquette au fromage', 'Boulets à la liégeoise maison', 'Vol-au-vent maison', 'Le Féliburger', 'Os à moelle rôti au four', 'Ris de veau grillé',
].map(plat);

export const suggestions = {
  prixMenu: `25${NB}€`,
  prixPlat: `18${NB}€`,
  entrees: ['Brick d’effiloché de canard, pickles de chou-fleur safrané et sa crème fouettée à la ciboulette', 'Toast au saumon fumé et œufs brouillés aux fines herbes'],
  plats: ['Noisette de marcassin rôtie aux quatre épices, sauce au vin rouge, airelles cuisinées et croquettes de pommes de terre', 'Dos de lieu en croûte d’emmental, chicons braisés, crème de champignons et purée'],
};

export const evenements = { prix: `27${NB}€` };

export const photos = {
  hero: { src: 'pates-brasserie', w: 1800, h: 914, alt: 'Assiette de pâtes et légumes sur un comptoir, arrière-plan flou' },
  carte: { src: 'illustration-carte', w: 1000, h: 1414, alt: 'Illustration dessinée de la salle, couverture de la carte d’automne 2026' },
  salle: { src: 'salle-bar', w: 1600, h: 1067, alt: 'Photo libre d’illustration : clients attablés dans un bar animé, lumières chaudes' },
};
