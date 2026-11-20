import photos from './photos.json';
import carteData from './carte.json';
import menusData from './menus.json';

export const resto = {
  nom: 'Les Terrasses de Crupet',
  baseline: 'Un moment hors du temps au cœur du village.',
  site: 'https://www.lesterrassesdecrupet.be',
  rue: 'Rue Basse 13',
  ville: '5330 Crupet (Assesse)',
  tel: { affiche: '083 655 111', href: 'tel:+3283655111' },
  email: 'resto@lesterrassesdecrupet.be',
  reserver: 'https://bookings.zenchef.com/results?rid=367820',
  facebook: 'https://www.facebook.com/profile.php?id=61559320650854',
  instagram: 'https://www.instagram.com/lesterrassesdecrupet/',
  carteAdresse: 'https://www.google.com/maps/search/?api=1&query=Rue+Basse+13+5330+Crupet',
};

export const nav = [
  { href: '#apropos', label: 'À propos' },
  { href: '#carte', label: 'La carte' },
  { href: '#horaires', label: 'Horaires' },
  { href: '#job', label: 'Job' },
  { href: '#contact', label: 'Contact' },
];

export const horaires = [
  { service: 'Midi', debut: '12:00', fin: '14:00', affiche: '12 h 00 à 14 h 00' },
  { service: 'Soir', debut: '18:00', fin: '22:00', affiche: '18 h 00 à 22 h 00' },
];

export const postes = ['Garçon de salle', 'Commis de cuisine', 'Plongeur', 'Extra'];

type Photo = { w: number; h: number; sujet: string };
export function photo(f: string) {
  const p = (photos as Record<string, Photo>)[f];
  return { src: f, w: p.w, h: p.h };
}

// Groupes du sélecteur : la carte du 15 octobre (année à confirmer), regroupée en six panneaux.
const par = (n: string) => (carteData as any[]).find((c) => c.categorie === n);
export const panneaux = [
  { id: 'partager', titre: 'À partager', note: 'Convivialité au cœur du village', blocs: [par('À partager')] },
  { id: 'entrees', titre: 'Entrées', note: 'Pour ouvrir l’appétit', blocs: [par('Entrées')] },
  { id: 'plats', titre: 'Plats', note: 'Générosité du terroir', blocs: [par('Plats')] },
  { id: 'enfants', titre: 'Enfants', note: 'Les petits diables à table', blocs: [par('Enfants')] },
  { id: 'desserts', titre: 'Desserts', note: 'La touche sucrée des gourmands', blocs: [par('Desserts')] },
  { id: 'boissons', titre: 'Boissons', note: 'Cocktails, bières, vins, cafés Delahaut', blocs: [par('Cocktails'), par('Bières'), par('Vins (sélection)'), par('Boissons chaudes')] },
];
export const fetes = menusData as { nom: string; prix: string; description: string }[];

// Typographie : apostrophe courbe, insécable avant « € ».
export const typo = (s: string | null | undefined) => (s ?? '').replace(/'/g, '’').replace(/ €/g, ' €');
