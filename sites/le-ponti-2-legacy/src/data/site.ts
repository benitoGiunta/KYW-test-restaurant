// Contenu du site : data/restaurants/le-ponti-2/ (donnees.json, dossier.md, site-actuel/). Rien d'inventé.
import carteJson from './carte.json';

export interface Plat { nom: string; description: string | null; prix: string | null; placeholder: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
const carte = carteJson as Categorie[];

const NB = ' ';
export const prix = (p: string | null) => (p ? p.replace(/\s€/g, `${NB}€`) : '');
export const slug = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// « Pâtes (spaghetti, penne ou tagliatelle au choix) » devient un titre et une note.
export function titre(c: string) {
  const m = c.match(/^(.*?)\s*\((.*)\)\s*$/);
  return m ? { nom: m[1], note: m[2] } : { nom: c, note: '' };
}
const premier = (p: string | null) => { const m = p?.match(/\d+/); return m ? Number(m[0]) : null; };

export interface Rubrique { id: string; nom: string; lead: string; cats: string[]; photo?: 'pizza' | 'escalope' }
// Neuf rubriques de lecture, regroupant les quinze rubriques de la carte d'origine.
export const rubriques: Rubrique[] = [
  { id: 'entrees', nom: 'Entrées', lead: 'froides ou chaudes', cats: ['Entrées froides', 'Entrées chaudes (en plat : supplément de 7 €)'] },
  { id: 'pates', nom: 'Pâtes', lead: 'spaghetti, penne ou tagliatelle', cats: ['Pâtes (spaghetti, penne ou tagliatelle au choix)'] },
  { id: 'salades', nom: 'Salades', lead: 'grandes salades', cats: ['Grandes salades'] },
  { id: 'pizzas', nom: 'Pizzas', lead: 'la Margherita à la Maison', cats: ['Pizzas', 'Suppléments pizzas'], photo: 'pizza' },
  { id: 'escalopes', nom: 'Escalopes de veau', lead: 'panées ou non panées', cats: ['Escalopes de veau panées (crudités et penne ou frites)', 'Escalopes de veau non panées (crudités et penne ou frites)'], photo: 'escalope' },
  { id: 'viandes', nom: 'Viandes', lead: 'à la carte', cats: ['Viandes'] },
  { id: 'desserts', nom: 'Desserts', lead: 'douceurs maison, coupes et glaces', cats: ['Douceurs maison', 'Coupes & glaces'] },
  { id: 'cocktails', nom: 'Cocktails', lead: 'signatures, classiques, sans alcool', cats: ['Cocktails signatures', 'Cocktails classiques', 'Cocktails sans alcool'] },
  { id: 'digestifs', nom: 'Digestifs', lead: 'à l’italienne', cats: ['Digestifs'] },
];
export const platsDe = (r: Rubrique) => r.cats.map((n) => carte.find((c) => c.categorie === n)!).filter(Boolean);
export function stats(r: Rubrique) {
  const plats = platsDe(r).flatMap((c) => c.plats);
  const v = plats.map((p) => premier(p.prix)).filter((n): n is number => n !== null);
  return { n: plats.length, min: v.length ? Math.min(...v) : null, max: v.length ? Math.max(...v) : null };
}

export const resto = {
  nom: 'Le Ponti 2',
  baseline: 'Restaurant italien, esprit familial.',
  description: 'Le Ponti 2, restaurant italien et pizzeria à Jambes (Namur) : vingt pizzas, pâtes, escalopes de veau et desserts maison, midi et soir du mardi au dimanche.',
  site: 'https://www.leponti2.be',
  adresse: { rue: 'Avenue du Bourgmestre Jean Materne 87', ville: '5100 Jambes (Namur)' },
  geo: { lat: 50.4573956, lon: 4.8702847 },
  tel: { affiche: '081 30 40 75', href: 'tel:+3281304075' },
  email: 'Leponti2@hotmail.be',
  reservation: 'https://leponti2.reservation.barestho.com/?lng=fr',
  facebook: 'https://www.facebook.com/leponti2/',
  itineraire: 'https://www.google.com/maps/dir/?api=1&destination=50.4573956,4.8702847',
  terrasse: 'Terrasse lorsque la météo le permet.',
};

// Horaires du site d'origine : mardi à dimanche 11:30-14:30 et 18:00-21:30, lundi fermé.
export const jours = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
export const horaires = [
  { jour: 'Lundi', n: 1, ferme: true },
  ...['Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((j, i) => ({ jour: j, n: (i + 2) % 7, ferme: false })),
].map((h) => ({ ...h, midi: h.ferme ? '' : ['11:30', '14:30'], soir: h.ferme ? '' : ['18:00', '21:30'] }));
export const h = (t: string) => t.replace(':', `${NB}h${NB}`);

export const menu3 = {
  nom: 'Menu 3 services',
  prix: `40${NB}€`,
  services: [
    { n: 'Entrée', t: 'Scampis à l’ail (5 pièces) ou croquettes au fromage.' },
    { n: 'Plat', t: 'Steak, frites, salade, crème au poivre concassé, ou pizza au choix, ou escalopes de veau à la carte (+ 7 €).' },
    { n: 'Dessert', t: 'Tiramisu aux fruits rouges ou mousse au chocolat.' },
  ],
};

export const nav = [
  { href: '', label: 'Accueil', id: 'accueil' },
  { href: 'menu/', label: 'La carte', id: 'menu' },
  { href: 'contact/', label: 'Contact', id: 'contact' },
];
