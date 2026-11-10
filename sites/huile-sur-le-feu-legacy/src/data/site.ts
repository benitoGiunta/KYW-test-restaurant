import carteData from './carte.json';
import photosData from './photos.json';

export const base: string = import.meta.env.BASE_URL;
/** Chemin interne : u('menu/') → `${base}/menu/`. Jamais de lien en dur (KYW_BASE). */
export const u = (p = ''): string => base.replace(/\/$/, '') + '/' + p;

export const NB = ' ';
export const heure = (h: number, m: number) => `${h}${NB}h${NB}${String(m).padStart(2, '0')}`;

export const resto = {
  nom: 'L’Huile sur le Feu',
  siteActuel: 'https://www.lhuilesurlefeu.be',
  adresse: { rue: 'Rue de Marchovelette', numero: '19', cp: '5000', ville: 'Namur' },
  geo: { lat: 50.4625484, lon: 4.8669053 },
  tel: '+32 81 24 19 03',
  telHref: 'tel:+3281241903',
  email: 'info@lhuilesurlefeu.be',
  facebook: 'https://www.facebook.com/lhuilesurlefeu/',
  instagram: 'https://www.instagram.com/lhuilesurlefeu/',
  reservation: 'https://lhuilesurlefeu.reservation.barestho.com/',
  itineraire: 'https://www.google.com/maps/dir/?api=1&destination=L%27Huile%20sur%20le%20Feu%20Rue%20de%20Marchovelette%2019%2C%205000%20Namur',
  societe: 'Sous l’Olivier srl',
  tva: 'BE0892' + NB + '858' + NB + '175',
};

// Horaires du site (mardi à samedi, midi et soir ; dimanche et lundi fermé).
const midi = `${heure(12, 0)} à ${heure(14, 30)}`;
const soir = `${heure(18, 0)} à ${heure(21, 15)}`;
export const jours: { jour: string; ouvert: boolean; midi?: string; soir?: string }[] = [
  { jour: 'Lundi', ouvert: false },
  { jour: 'Mardi', ouvert: true, midi, soir },
  { jour: 'Mercredi', ouvert: true, midi, soir },
  { jour: 'Jeudi', ouvert: true, midi, soir },
  { jour: 'Vendredi', ouvert: true, midi, soir },
  { jour: 'Samedi', ouvert: true, midi, soir },
  { jour: 'Dimanche', ouvert: false },
];

export const prix = (p: string | null) => {
  if (!p) return null;
  return p.replace(',00', '').replace(/\s*€/, NB + '€').replace(/ par personne/, NB + 'par personne');
};

export type Plat = { nom: string; description: string | null; prix: string | null; placeholder: boolean };
export const carte = carteData.carte as { categorie: string; plats: Plat[] }[];
export const menus = carteData.menus as { nom: string; prix: string; description: string }[];
export const slug = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const cat = (nom: string) => carte.find((c) => c.categorie === nom)!;

export const photos = photosData as Record<string, { file: string; w: number; h: number; sujet: string }>;
export const credit = 'Photos : L’Huile sur le Feu (site d’origine)';
