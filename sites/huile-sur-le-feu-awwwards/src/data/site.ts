// Contenu de L'Huile sur le Feu (variante awwwards). Source : data/restaurants/huile-sur-le-feu/ (donnees.json, dossier.md).
// HYPOTHÈSES (aussi dans RAPPORT.md) :
// - L'ouverture en 2005 vient du site officiel ; Yelp (2002) et Kompass (2007) divergent : la date est présentée « selon le site ».
// - Aucun avis, note, distinction ni citation : aucun n'est affiché par le client. Rien n'est inventé dans ce fichier (aucun placeholder).
// - Le portrait d'homme (photo 05) n'est pas identifié : non utilisé. Photos du client, crédit « photos : L'Huile sur le Feu ».
// - Parking, terrasse, couverts, privatisation : inconnus, donc absents.
import type { CleHuile } from './carte';

export const site = {
  nom: 'L’Huile sur le Feu',
  nomCourt: 'L’Huile sur le Feu',
  baseline: 'La Méditerranée dans votre assiette',
  description: 'Cuisine méditerranéenne et pâtes fraîches à Namur : chaque plat reçoit l’huile d’olive choisie pour lui. Rue de Marchovelette 19, du mardi au samedi.',
  typeCuisine: 'Méditerranéenne, pâtes fraîches',
  adresse: { rue: 'Rue de Marchovelette', numero: '19', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.4625484, lon: 4.8669053 },
  telephone: '+32 81 24 19 03',
  telephoneHref: 'tel:+3281241903',
  telephoneLisible: '081 24 19 03',
  email: 'info@lhuilesurlefeu.be',
  reservationUrl: 'https://lhuilesurlefeu.reservation.barestho.com/',
  siteClient: 'https://www.lhuilesurlefeu.be',
  facebook: 'https://www.facebook.com/lhuilesurlefeu/',
  instagram: 'https://www.instagram.com/lhuilesurlefeu/',
  planUrl: 'https://www.openstreetmap.org/?mlat=50.4625484&mlon=4.8669053#map=18/50.4625484/4.8669053',
  credit: 'Photos : L’Huile sur le Feu',
  fondateur: 'Giuseppe Santamaria',
} as const;

export const services = [
  { nom: 'Midi', debut: '12:00', fin: '14:30', libelle: '12 h à 14 h 30' },
  { nom: 'Soir', debut: '18:00', fin: '21:15', libelle: '18 h à 21 h 15' },
] as const;
export const joursSchema = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;
export const jours = [
  { nom: 'Lundi', ferme: true }, { nom: 'Mardi', ferme: false }, { nom: 'Mercredi', ferme: false },
  { nom: 'Jeudi', ferme: false }, { nom: 'Vendredi', ferme: false }, { nom: 'Samedi', ferme: false }, { nom: 'Dimanche', ferme: true },
] as const;

/** Les huiles : l'accent de la page prend leur couleur (valeurs CSS dans tokens.css, `[data-huile]`). */
export interface Huile { cle: CleHuile; nom: string; accord: string }
export const huiles: Huile[] = [
  { cle: 'truffe', nom: 'Truffe blanche', accord: 'Demi-lunes aux champignons, carpaccio, cannelloni aux quatre fromages' },
  { cle: 'piment', nom: 'Piment', accord: 'Demi-lunes au chorizo' },
  { cle: 'mandarine', nom: 'Mandarine', accord: 'Coulant au chocolat, tatin aux pommes du Menu Gourmet' },
  { cle: 'menthe', nom: 'Menthe', accord: 'Salade de fruits frais' },
  { cle: 'ail', nom: 'Ail', accord: 'Tartare de bœuf coupé au couteau' },
  { cle: 'persil', nom: 'Persil plat', accord: 'Filet de sébaste du Menu Gourmet' },
];

export const menus = [
  { nom: 'Menu Gourmet', prix: 49.9, detail: [
    { etape: 'Entrée', texte: 'Toast aux champignons', huile: 'Huile d’olive à la truffe', cle: 'truffe' as CleHuile },
    { etape: 'Plat', texte: 'Filet de sébaste, fregola sarda, ratatouille', huile: 'Huile d’olive au persil plat', cle: 'persil' as CleHuile },
    { etape: 'Dessert', texte: 'Tatin aux pommes, glace fleur de lait', huile: 'Huile d’olive à la mandarine', cle: 'mandarine' as CleHuile },
  ] },
  { nom: 'Menu Enfants', prix: 25, detail: [
    { etape: 'Trois services', texte: 'Potage maison du jour, pâtes au choix à la carte, glace du moment au choix', huile: null, cle: null },
  ] },
] as const;

export const histoire = [
  'Giuseppe Santamaria a grandi dans les Pouilles, là où l’olivier fait partie du paysage autant que de la table.',
  'Il ouvre L’Huile sur le Feu rue de Marchovelette, à deux pas du centre de Namur (en 2005, selon le site de la maison).',
  'Ici, l’huile d’olive n’est pas la touche finale : c’est le point de départ d’un plat.',
  'Les huiles viennent d’Oliviers & Co et se retrouvent sur les étagères de la boutique, dans la même maison.',
] as const;

export const equipe = [{ nom: 'Giuseppe Santamaria', role: 'Fondateur', note: 'Son rôle exact en cuisine n’est pas précisé par la maison.' }] as const;

/** Photos du client : clé -> fichier (src/assets/photos), alt d'après le champ `sujet` de photos/index.json. */
export const reseaux = [
  { nom: 'Facebook', url: site.facebook },
  { nom: 'Instagram', url: site.instagram },
] as const;
