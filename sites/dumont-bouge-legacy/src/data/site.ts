// Faits : data/restaurants/dumont-bouge/donnees.json et dossier.md (recherche-client du 27/11/2026). Rien d'inventé ici.
import carteBrute from './carte.json';

export const NBSP = ' ';
const apos = (s: string) => s.replace(/\s[—–]\s/g, ', ').replace(/(\p{L})'(\p{L})/gu, '$1’$2').replace(/ ([:;!?€»])/g, `${NBSP}$1`).replace(/« /g, `«${NBSP}`);
export const t = (s: string | null | undefined) => (s ? apos(s) : '');
/** « 07:00 » devient « 7 h 00 » (insécable). */
export const h = (s: string) => s.replace(/^0/, '').replace(':', `${NBSP}h${NBSP}`);

export const resto = {
  nom: 'Dumont Bouge',
  baseline: 'Pâtisserie, boulangerie, restauration, tea-room',
  siteOrigine: 'https://www.dumontbouge.com',
  reservationOrigine: 'https://www.dumontbouge.com/reservations',
  tel: '081 22 96 02',
  telHref: 'tel:+3281229602',
  email: 'srl-dumontbouge@outlook.com',
  facebook: 'https://www.facebook.com/profile.php?id=61572819565373',
  instagram: 'https://www.instagram.com/dumontbouge/',
  bouge: { nom: 'Bouge', rue: 'Chaussée de Louvain 343', ville: '5004 Bouge (Namur)' },
  namur: { nom: 'Namur', rue: 'Rue de Marchovelette 9', ville: '5000 Namur' },
  petitDej: ['07:00', '11:00'],
  brunch: ['11:30', '15:00'],
};

export const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
export const horaires = {
  bouge: jours.map((j) => ({ jour: j, ouvert: true, de: '07:00', a: '18:00' })),
  namur: jours.map((j, i) => (i === 6 ? { jour: j, ouvert: false, de: '', a: '' } : { jour: j, ouvert: true, de: '07:00', a: '17:00' })),
};

// Routes du site d'origine gardées (slugs ASCII) : /boulangerie, /pâtisserie, /emporter, /menu, /reservations.
export const nav = [
  { href: 'boulangerie/', label: 'Boulangerie', id: 'boulangerie' },
  { href: 'patisserie/', label: 'Pâtisserie', id: 'patisserie' },
  { href: 'emporter/', label: 'Sandwicherie', id: 'emporter' },
  { href: 'menu/', label: 'Tea-room', id: 'menu' },
];

type Plat = { nom: string; description: string | null; prix: string | null; placeholder: boolean };
export type Categorie = { categorie: string; plats: Plat[] };
export const carte = carteBrute as Categorie[];
/** Libellé court d'une catégorie : « Tea-room · Brunch · Nos croques (gratinés) (11h30 – 15h00) » donne « Nos croques (gratinés) ». */
export const titreCat = (c: Categorie) => t(c.categorie.split(' · ').pop()!.replace(/\s*\([^)]*\d+h\d+[^)]*\)\s*$/, ''));
export const cat = (i: number) => carte[i];
export const prixNum = (p: string | null) => (p ? parseFloat(p.replace(/[^\d,]/g, '').replace(',', '.')) : NaN);

export const photos = {
  facade: { src: 'photos/facade.webp', w: 1800, h: 1350, alt: 'La façade de Dumont Bouge, chaussée de Louvain, avec son parvis pavé et sa terrasse couverte' },
  vitrine: { src: 'photos/vitrine.webp', w: 1600, h: 1200, alt: 'La vitrine des tartes et pâtisseries aux fruits rouges' },
  salade: { src: 'photos/salade-chevre.webp', w: 1100, h: 1467, alt: 'Assiette de toasts de chèvre, jambon cru et crudités' },
  plateau: { src: 'photos/plateau-mini-sandwichs.webp', w: 1400, h: 1867, alt: 'Plateau de mini-sandwichs' },
  pains: { src: 'photos/pains-torchon.webp', w: 1400, h: 903, alt: 'Des petits pains farinés réunis dans un torchon rayé', placeholder: true, credit: ['Tomascastelazo', 'https://commons.wikimedia.org/wiki/File:Home_made_sour_dough_bread.jpg'] },
  latte: { src: 'photos/latte-matcha.webp', w: 1400, h: 787, alt: 'Un latte au matcha dans une tasse noire sur une table en bois, vu du dessus', placeholder: true, credit: ['Irvan Ary Maulana', 'https://commons.wikimedia.org/wiki/File:Matcha_tea_latte_with_rosetta_latte_art.jpg'] },
};
