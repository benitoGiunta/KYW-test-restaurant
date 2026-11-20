// Faits : data/restaurants/maison-des-desserts/donnees.json, dossier.md, site actuel. Rien d'inventé.
import carteJson from './carte.json';
import photosJson from './photos.json';
export const nom = 'La Maison des Desserts';
export const baseline = 'Pâtisserie artisanale au cœur de Namur';
export const adresse = { rue: 'Rue Haute Marcelle 17', ville: '5000 Namur' };
export const tel = { aff: '081 22 74 51', href: 'tel:+3281227451' };
export const mail = 'info@mddnam.be';
export const shop = 'https://shop.lamaisondesdesserts.be';
export const social = {
  instagram: 'https://www.instagram.com/lamaisondesdesserts/',
  facebook: 'https://www.facebook.com/p/La-maison-des-desserts-100089286496824/',
};
export const horaires: { jour: string; h: string | null }[] = [
  { jour: 'Lundi', h: null }, { jour: 'Mardi', h: '8 h 00 à 18 h 00' }, { jour: 'Mercredi', h: '8 h 00 à 18 h 00' },
  { jour: 'Jeudi', h: '8 h 00 à 18 h 00' }, { jour: 'Vendredi', h: '8 h 00 à 18 h 00' }, { jour: 'Samedi', h: '8 h 00 à 18 h 00' },
  { jour: 'Dimanche', h: null },
];
export const histoire = [
  'La chocolaterie naît en 1946, rue de Fer, à Namur. Pâtissier-chocolatier de métier, la famille reprend la tradition artisanale avec passion.',
  'En 1993, la maison ouvre son salon de thé et sa pâtisserie dans le quartier Saint-Loup, au cœur du vieux Namur, dans une bâtisse du 17e siècle.',
  'Aujourd’hui, la troisième génération dirige la maison : pâtisseries, chocolats, macarons et petite restauration.',
];
export const metiers: { nom: string; texte: string; ancre: string; lignes?: string[] }[] = [
  { nom: 'Boulangerie', texte: 'Pains artisanaux et viennoiseries.', ancre: 'boulangerie' },
  { nom: 'Pâtisserie', texte: 'Pâtisseries et macarons faits maison.', ancre: 'patisseries' },
  { nom: 'Chocolaterie', texte: 'Chocolats belges et biétrumés, spécialité de la maison.', ancre: 'fetes', lignes: ['Pralines artisanales', 'Biétrumés', 'Macarons de Paris'] },
];
export const faq = [
  { q: 'Quels modes de paiement acceptez-vous ?', r: 'Bancontact et carte de crédit (Visa, Mastercard).' },
  { q: 'Quand puis-je récupérer ma commande ?', r: 'À la date choisie, entre 8 h 00 et 18 h 00.' },
  { q: 'Où récupérer ma commande ?', r: 'En boutique, rue Haute Marcelle 17, 5000 Namur.' },
];
export const fetes = [
  { q: 'Commandes de Noël', d: 'jusqu’au 22 décembre, 18 h 00' },
  { q: 'Commandes du Nouvel An', d: 'jusqu’au 29 décembre, 18 h 00' },
  { q: 'Fermé', d: 'les 25 décembre et 1er janvier' },
];
export const carte = carteJson as { id: string; titre: string; note: string | null; plats: { nom: string; description: string | null; prix: string | null }[] }[];
export type Photo = { k: string; w: number; h: number; w2: number; h2: number; sujet: string };
export const photos = photosJson as Record<string, Photo>;
export const credit = 'Photographies : La Maison des Desserts (galerie et pages du site de la maison)';
