// Faits du restaurant : tout vient de data/restaurants/bayti/ (donnees.json, dossier.md, site-actuel/). Rien d'inventé.
import carteBrute from './carte.json';
import photosBrut from './photos.json';

export const resto = {
  nom: 'Bayti',
  baseline: 'Deux mondes, une table.',
  tel: '0492 07 25 76',
  telHref: 'tel:+32492072576',
  email: 'info@bayti.be',
  reserver: 'https://bayti.reservation.barestho.com/',
  facebook: 'https://www.facebook.com/profile.php?id=100067102638326',
  instagram: 'https://www.instagram.com/bayti.be/',
  avisGoogle: 'https://share.google/vdLU84YExVQMsUxZL',
  siteOrigine: 'https://www.bayti.be',
  geo: { lat: 50.4624432, lon: 4.8678736 },
  restaurant: { nom: 'Bayti', rue: 'Rue du Pont 15', cp: '5000', ville: 'Namur', heures: '18 h 00 à 21 h 00', moment: 'le soir, sur place', prix: '45 €' },
  comptoir: { nom: 'Bayti Le Comptoir', rue: 'Rue du Pont 6', cp: '5000', ville: 'Namur', heures: '11 h 00 à 19 h 00', moment: 'de jour, à emporter', prix: '28 €' },
};

// Routes du site d'origine gardées : /, /notre-histoire, /menu (carte traiteur), /carte-restaurant, /avis, /galerie, /bayti-chez-vous.
export const nav = [
  { href: 'notre-histoire/', label: 'Notre histoire', id: 'histoire' },
  { href: 'menu/', label: 'Carte traiteur', id: 'menu' },
  { href: 'carte-restaurant/', label: 'Carte restaurant', id: 'restaurant' },
  { href: 'avis/', label: 'Avis', id: 'avis' },
  { href: 'galerie/', label: 'Galerie', id: 'galerie' },
  { href: 'bayti-chez-vous/', label: 'Bayti chez vous', id: 'chezvous' },
];

// 0 = dimanche. Horaires « Mar à Sam » du site d'origine ; fermeture dimanche et lundi déduite, à confirmer.
export const jours = [
  { jour: 1, nom: 'Lundi', ferme: true },
  { jour: 2, nom: 'Mardi' }, { jour: 3, nom: 'Mercredi' }, { jour: 4, nom: 'Jeudi' }, { jour: 5, nom: 'Vendredi' }, { jour: 6, nom: 'Samedi' },
  { jour: 0, nom: 'Dimanche', ferme: true },
];

export type Plat = { nom: string; description?: string; prix: string | null; regimes?: string[]; note?: string; placeholder?: boolean };
export type Rubrique = { categorie: string; plats: Plat[] };
const carte = carteBrute as Rubrique[];
export const menuRestaurant = carte[0].plats;
export const rubriquesTraiteur = carte.slice(1).map((r) => ({ ...r, titre: r.categorie.replace(/^Traiteur \/ à emporter · /, '') }));
export const menuDecouverte = {
  prix: '28 €', unite: 'par personne',
  contenu: ['Houmous bayti', 'muhammara de Damas', 'labneh à l’ail', 'feuilles de vigne', 'rakakat au fromage', 'rouleaux de Jérusalem', 'jawaneh de poulet', 'pain libanais', 'sauce à l’ail au summak'],
};

export type PhotoMeta = { w: number; h: number; ws: number[]; sujet: string };
export const photos = photosBrut as Record<string, PhotoMeta>;

export const avis = {
  texte: 'Un véritable petit coin du Moyen-Orient au cœur de Namur. Chaque mezzé est un voyage divin pour les papilles des saveurs authentiques, variées et parfaitement équilibrées. Chaque plat est préparé avec soin et tout est succulent du début à la fin. Le restaurant dégage une atmosphère chaleureuse et accueillante dès qu’on franchit la porte. Une très belle découverte, et sans aucun doute une adresse où nous reviendrons avec grand plaisir !',
  auteur: 'Brenda C.',
  note: '4,9 / 5 sur Google, basée sur +150 avis',
};
