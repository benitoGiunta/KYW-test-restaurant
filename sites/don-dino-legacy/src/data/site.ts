import carteBrute from './carte.json';

export const NBSP = ' ';
export const resto = {
  nom: 'Don Dino',
  baseline: 'Spécialités italiennes et bonne ambiance, patron en salle.',
  adresse: { rue: 'Chaussée de Marche 826', cp: '5100', commune: 'Naninne (Namur)' },
  tel: '+32 81 74 15 60',
  telHref: 'tel:+3281741560',
  facebook: 'https://www.facebook.com/dondinonaninne/',
  itineraire: 'https://www.google.com/maps/dir/?api=1&destination=50.424481,4.9315063',
  visiteVirtuelle: 'https://dondino.be/fr/visite-virtuelle',
  siteActuel: 'https://dondino.be',
  reservationEnLigne: 'https://dondino.be/fr/reservations',
  recrutement: 'https://dondino.be/fr/jobs',
  geo: { lat: 50.424481, lon: 4.9315063 },
};

const midi = ['12:00', '14:30'];
const soir = ['18:00', '22:30'];
const soirTard = ['18:00', '23:30'];
export const horaires = [
  { jour: 'Lundi', midi, soir },
  { jour: 'Mardi', midi, soir },
  { jour: 'Mercredi', midi, soir },
  { jour: 'Jeudi', midi, soir },
  { jour: 'Vendredi', midi, soir: soirTard },
  { jour: 'Samedi', midi, soir: soirTard },
  { jour: 'Dimanche', midi, soir },
];

export const fmtPrix = (n: number) => `${n.toFixed(2).replace('.', ',')}${NBSP}€`;
export const slugify = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/œ/g, 'oe').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export type Plat = { nom: string; description: string | null; prix: number };
export const carte = (carteBrute as { categorie: string; plats: Plat[] }[]).map((c) => ({
  ...c,
  plats: c.plats.map((p) => ({ ...p, description: p.description ? p.description.replace(/,(?=\S)/g, ', ') : p.description })),
  slug: slugify(c.categorie),
  min: Math.min(...c.plats.map((p) => p.prix)),
  max: Math.max(...c.plats.map((p) => p.prix)),
}));
export const nbPlats = carte.reduce((n, c) => n + c.plats.length, 0);
export const cat = (nom: string) => carte.find((c) => c.categorie === nom)!;

export const equipements = ['Parking extérieur privé', 'Parking à vélos', 'Accès pour personnes à mobilité réduite', 'Terrasse', 'Bar', 'Climatisation', 'Idéal pour les familles'];
export const paiements = ['Mastercard', 'Visa', 'Carte de débit', 'Espèces'];

export const nav = [
  { href: 'carte/', label: 'Carte' },
  { href: 'reservations/', label: 'Réservations' },
  { href: 'groupes/', label: 'Groupes et privatisation' },
  { href: 'a-propos/', label: 'À propos' },
  { href: 'contact/', label: 'Contact' },
];
