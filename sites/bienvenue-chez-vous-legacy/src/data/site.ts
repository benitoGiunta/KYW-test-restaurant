// Données du restaurant : data/restaurants/bienvenue-chez-vous/ (donnees.json, dossier.md, site-actuel/textes).
// Rien d'inventé : les champs marqués « confirmer » viennent de sources tierces.
const NB = ' ';
/** Espace insécable avant « : ; ! ? » et « € », guillemets français. */
export const fr = (s: string) => s.replace(/ ([:;!?€»])/g, `${NB}$1`).replace(/« /g, `«${NB}`);
export const eur = (n: number | string) => `${n}${NB}€`;

export const site = {
  nom: 'Bienvenue chez vous',
  baseline: 'Fine cuisine et créativité',
  chef: 'Cédric Delsaut',
  depuis: 2002,
  adresse: { rue: 'Rue Pépin 33', ville: '5000 Namur' },
  tel: '+32 477 29 96 83',
  telHref: 'tel:+32477299683',
  email: 'info@restaurantbienvenuechezvous.be',
  facebook: 'https://www.facebook.com/profile.php?id=100036275366364',
  instagram: 'https://instagram.com/resto_bienvenuechezvous_namur',
  tiktok: 'https://www.tiktok.com/@bienvenuechezvousnamur',
  siteOrigine: 'https://www.restobienvenuechezvous.com',
};

export const nav = [
  { href: '', label: 'Accueil' },
  { href: 'presentation/', label: 'Présentation' },
  { href: 'resto/', label: 'Resto' },
  { href: 'boutique/', label: 'Boutique' },
  { href: 'traiteur/', label: 'Traiteur' },
  { href: 'contact/', label: 'Contact' },
];

const midi = '12 h 00 à 13 h 30';
const soir = '19 h 30 à 21 h 00';
export const jours = [
  { jour: 'Lundi', ouvert: false },
  { jour: 'Mardi', ouvert: true, midi, soir },
  { jour: 'Mercredi', ouvert: true, midi, soir },
  { jour: 'Jeudi', ouvert: true, midi, soir },
  { jour: 'Vendredi', ouvert: true, midi, soir },
  { jour: 'Samedi', ouvert: true, midi, soir },
  { jour: 'Dimanche', ouvert: false },
];

export type Photo = { w: number; h: number; alt: string; credit?: string };
// alt : d'après le champ « sujet » de photos/index.json, jamais une légende déduite du nom de fichier.
export const photos: Record<string, Photo> = {
  'dessert-smiley': { w: 2000, h: 1500, alt: 'Dessert smiley rose posé sur des fraises coupées et des feuilles de bloody dock' },
  carpaccio: { w: 1500, h: 1258, alt: 'Carpaccio de noix de Saint-Jacques, crème verte et salicorne' },
  asperges: { w: 1500, h: 1471, alt: 'Asperges, sauce verte et algues' },
  canard: { w: 1500, h: 1075, alt: 'Magret en tranches, betterave rose et framboise' },
  'foie-gras': { w: 1500, h: 1125, alt: 'Assiette gris perle, truffe noire et sauce brune' },
  crustace: { w: 1500, h: 1125, alt: 'Crustacé, fleurs comestibles et tuile en dentelle' },
  tomates: { w: 1500, h: 1125, alt: 'Tomates multicolores, sorbet et fleurs comestibles' },
  'saint-jacques': { w: 1500, h: 1369, alt: 'Saint-Jacques snackées sur sauce verte' },
  saumon: { w: 1500, h: 1125, alt: 'Saumon, jus vert et perles, assiette blanche' },
  poisson: { w: 1500, h: 1401, alt: 'Poisson, févettes, asperges et capucines' },
  huitres: { w: 1500, h: 1214, alt: 'Huîtres garnies de perles végétales et de fleurs comestibles' },
  facade: { w: 1500, h: 1207, alt: 'Façade de la maison de maître, rue Pépin (le restaurant est au premier étage, à confirmer)' },
  enseigne: { w: 1024, h: 683, alt: 'Enseigne rouge Bienvenue chez vous, fine cuisine et créativité' },
  bouchees: { w: 1500, h: 1556, alt: 'Plateau de douze verrines de bouchées' },
  emporter: { w: 1500, h: 1125, alt: 'Plat à emporter en bol kraft, légumes et asperges' },
  boites: { w: 1500, h: 1500, alt: 'Barquettes à emporter, lapins jaunes et lard' },
  salade: { w: 1500, h: 1246, alt: 'Salade composée colorée, sorbet vert et feta' },
};

export type Ligne = { nom: string; detail: string; prix: string };
// Formules relevées sur la page « Délice des Saveurs » du site d'origine.
export const repas: Record<'midi' | 'soir', Ligne[]> = {
  midi: [
    { nom: 'Trois escales', detail: 'Grignotages, trois escales, douceurs. Hors jours fériés.', prix: eur(49) },
    { nom: 'Quatre escales', detail: 'Grignotages, quatre escales, douceurs. Sur réservation.', prix: eur(69) },
    { nom: 'Voyage Signature', detail: 'Le parcours complet du chef. Sur réservation.', prix: eur(94) },
  ],
  soir: [
    { nom: 'Quatre escales', detail: 'Grignotages, quatre escales, douceurs. Sur réservation.', prix: eur(69) },
    { nom: 'Cinq escales', detail: 'Grignotages, cinq escales, douceurs. Sur réservation.', prix: eur(79) },
    { nom: 'Voyage Signature', detail: 'Le parcours complet du chef. Sur réservation.', prix: eur(94) },
  ],
};
export const accords = [
  { lettre: 'A', nom: 'L’Accord', detail: 'Harmonie de vins, ou préparations maison sans alcool.' },
  { lettre: 'B', nom: 'Le Confort', detail: 'Apéritif, accord, eau, café, thé.' },
  { lettre: 'C', nom: 'Le Confort +', detail: 'Le Confort, avec un digestif.' },
];
export const supplements = [
  { formule: 'Trois escales (midi)', a: null, b: '+ 30 €', c: '+ 40 €' },
  { formule: 'Quatre escales', a: '+ 29 €', b: '+ 44 €', c: '+ 54 €' },
  { formule: 'Cinq escales (soir)', a: '+ 35 €', b: '+ 49 €', c: '+ 59 €' },
  { formule: 'Voyage Signature', a: '+ 40 €', b: '+ 54 €', c: '+ 64 €' },
];
// Un exemple de repas, repris tel quel du site d'origine (le menu change avec la saison).
export const exemple = [
  { nom: 'Grignotages', detail: 'Un avant-goût du voyage.' },
  { nom: 'Les Saint-Jacques de Vincent', detail: 'Textures, fraîcheur et notes grillées, en direct de petits bateaux à Port-en-Bessin (La Coquille qui Claque).' },
  { nom: 'L’œuf parfait', detail: 'Bœuf Angus séché, potiron et noisettes.' },
  { nom: 'Filet pur de veau', detail: 'Légèrement saumuré, coques et végétaux marins.' },
  { nom: 'Dessert du moment', detail: 'En finesse, léger, frais, peu sucré.' },
  { nom: 'Biscuit, chocolat, fantaisie', detail: 'Nos incontournables douceurs.' },
];
