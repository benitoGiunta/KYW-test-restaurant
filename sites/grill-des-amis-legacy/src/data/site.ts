// Données réelles : data/restaurants/grill-des-amis (donnees.json, dossier.md, site-actuel/). Rien d'inventé.
import carteBrute from './carte.json';

export const resto = {
  nom: 'Le Grill des amiS',
  baseline: 'Le spécialiste viandes, maturation et grillades à Namur',
  rue: 'Rue Saint-Joseph 10',
  ville: '5000 Namur',
  tel: '081/61 72 60',
  telHref: 'tel:+3281617260',
  reserver: 'https://www.legrilldesamis.be/reserver',
  site: 'https://www.legrilldesamis.be',
  plan: 'https://www.google.com/maps/search/?api=1&query=Rue+Saint-Joseph+10+5000+Namur',
  devise: 'Cuisine et grillades pour le plaisir de nos clients, nos amis.',
};

/** Typographie française : apostrophes, insécable avant « : ; ! ? € % », dans les guillemets « ». */
export const t = (s: string | null | undefined): string =>
  (s ?? '')
    .replace(/'/g, '’')
    .replace(/(\d)\s?€/g, '$1 €')
    .replace(/\s([:;!?%])/g, ' $1')
    .replace(/«\s?/g, '« ')
    .replace(/\s?»/g, ' »');

export const nav = [
  { href: 'carte/', label: 'La carte' },
  { href: 'viandes/', label: 'Spécial viandes' },
  { href: 'a-propos/', label: 'À propos' },
  { href: 'traiteur/', label: 'Traiteur' },
  { href: 'contact/', label: 'Contact' },
];

// Lundi, jeudi, vendredi, samedi : site actuel (pied de page). Mardi, mercredi, dimanche fermés : déduit, à confirmer.
const service = { midi: '12 h 00 à 14 h 00', soir: '18 h 00 à 21 h 30' };
export const horaires = [
  { jour: 1, nom: 'Lundi', ouvert: true, ...service },
  { jour: 2, nom: 'Mardi', ouvert: false },
  { jour: 3, nom: 'Mercredi', ouvert: false },
  { jour: 4, nom: 'Jeudi', ouvert: true, ...service },
  { jour: 5, nom: 'Vendredi', ouvert: true, ...service },
  { jour: 6, nom: 'Samedi', ouvert: true, ...service },
  { jour: 0, nom: 'Dimanche', ouvert: false },
] as { jour: number; nom: string; ouvert: boolean; midi?: string; soir?: string }[];

export type Plat = { nom: string; description: string | null; prix: string };
export type Categorie = { categorie: string; plats: Plat[] };
export const carte = carteBrute as Categorie[];
const cat = (n: string) => carte.find((c) => c.categorie === n)!;

/** La carte regroupée en cinq parties (index de la page carte). */
export const parties = [
  { id: 'entrees', titre: 'Entrées', blocs: [cat('Les entrées'), cat('À partager (entrées)')] },
  { id: 'plats', titre: 'Plats', blocs: [cat('Les plats')] },
  { id: 'grillades', titre: 'Grillades au feu de bois', blocs: [cat('Les grillades au feu de bois'), cat('À partager (grillades)'), cat('Les sauces maison et suppléments')] },
  { id: 'bambins', titre: 'Bambins', blocs: [cat('Les bambins')] },
  { id: 'boissons', titre: 'Boissons', blocs: [cat('Apéros'), cat('Cocktails'), cat('Softs et bières')] },
];

export const midi = [
  { nom: 'Lunch', prix: '15,50€', description: 'Braisade de volaille, légumes chauds et frites, ou escalope de porc Duroc panée, sauce au choix et frites' },
  { nom: 'Steak du midi (± 250 g)', prix: '17€', description: null },
];
export const viandard = { nom: 'Le Menu Viandard', prix: '69€/pers.', description: 'Cinq viandes choisies par le chef, en trois services, dès deux personnes, pour la table entière. Dernière commande à 13 h 15 et à 20 h.' };

export const credits = 'Photographies : Le Grill des amiS (site d’origine).';
