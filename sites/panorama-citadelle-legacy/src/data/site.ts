// Faits du Panorama. Source : data/restaurants/panorama-citadelle (dossier.md, donnees.json, site-actuel/).
export const resto = {
  nom: 'Le Panorama',
  baseline: 'Une expérience culinaire au sommet de la Citadelle',
  adresse: ['Route Merveilleuse 82', '5000 Namur'],
  tel: '081 84 11 34',
  telHref: 'tel:081841134',
  groupes: 'groupes@panoramanamur.be',
  facebook: 'https://www.facebook.com/PanoramaNamur',
  instagram: 'https://www.instagram.com/panoramanamur',
  maps: 'https://www.google.be/maps?q=Rte Merveilleuse 82 \n5000 Namur',
  reservation: 'https://www.panoramanamur.be/reservation-contact/',
  geo: { lat: 50.45712, lon: 4.85948 },
};
export const nav = [
  { href: '', label: 'Accueil' },
  { href: 'le-panorama/', label: 'Le Panorama' },
  { href: 'la-carte/', label: 'La carte' },
  { href: 'reservation-contact/', label: 'Réservation et contact' },
];
// Horaires : 8 h 00 à 23 h 00 tous les jours (bandeau du site) ; petits-déjeuners 8 h 00 à 10 h 30 (PDF) ; brasserie 11 h 00 à 23 h 00 (page contact). À confirmer.
export const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
export const heures = '8 h 00 à 23 h 00';
export const petitsDej = [
  { nom: 'Le Pano Express', prix: '12,00 €', desc: 'Boisson chaude, jus d’orange pressé, viennoiserie au choix' },
  { nom: 'Le Pano traditionnel', prix: '15,00 €', desc: 'Boisson chaude, jus d’orange, viennoiserie, pain beurre, assiette jambon fromage, confiture, Nutella' },
  { nom: 'Le Pano Healthy', prix: '15,00 €', desc: 'Boisson chaude, jus d’orange, yaourt muesli, pain, beurre, confiture, fruits frais' },
  { nom: 'Le Pano Gourmand', prix: '25,00 €', desc: 'Le Pano traditionnel, œuf au choix et bacon, yaourt muesli, fruits frais' },
];
export const fetes = { nom: 'Menu des fêtes 2026', prix: '110 € par personne', desc: 'Boissons non comprises. Coupe de champagne, trois mises en bouche, entrée, plat et dessert au choix, café ou infusion.' };
export const pdfs = [
  { href: 'cartes/carte-automne-2026.pdf', label: 'La carte d’automne 2026' },
  { href: 'cartes/carte-vins-janvier-2026.pdf', label: 'La carte des vins, janvier 2026' },
  { href: 'cartes/petits-dejeuners.pdf', label: 'Les petits-déjeuners' },
  { href: 'cartes/menu-des-fetes-2026.pdf', label: 'Le menu des fêtes 2026' },
];
// Photographies du client (public/photos/<nom>-800.webp et -1600.webp). Légendes d’après le champ « sujet » de photos/index.json.
export const photos = {
  vue: { n: '02-vue-meuse', w: 1600, h: 1065, alt: 'Vue panoramique sur la Meuse et la ville de Namur depuis la Citadelle', cap: 'La Meuse et la ville de Namur depuis la terrasse' },
  platanes: { n: '03-terrasse-platanes', w: 1600, h: 1065, alt: 'Terrasse de gravier sous des platanes taillés, pavillon vitré en fond', cap: 'La terrasse sous les platanes, devant le pavillon vitré' },
  guirlandes: { n: '06-terrasse-guirlandes', w: 1600, h: 1065, alt: 'Tables de terrasse sous des guirlandes lumineuses, vue sur la Meuse', cap: 'Tables de terrasse sous les guirlandes lumineuses' },
  salle: { n: '01-salle-principale', w: 1600, h: 1065, alt: 'Salle principale aux murs de pierre et au plafond de lattes de bois, tables dressées', cap: 'La salle, murs de pierre et plafond de lattes de bois' },
  bar: { n: '09-bar-salle', w: 1600, h: 1065, alt: 'Bar en marbre noir et tabourets verts, côté salle', cap: 'Le bar en marbre noir' },
  cave: { n: '13-entree-cave-vitree', w: 1600, h: 1065, alt: 'Entrée du restaurant et cave à vin vitrée', cap: 'L’entrée et la cave à vin vitrée' },
  table: { n: '11-table-longue-vitres', w: 1600, h: 1065, alt: 'Longue table dressée devant les baies vitrées sur la ville', cap: 'Une longue table devant les baies vitrées' },
  pano: { n: '15-biere-pano', w: 1600, h: 1599, alt: 'Verre de bière blanche Pano sur fond clair', cap: 'La Pano, bière blanche brassée avec La Houppe' },
  facade: { n: '07-facade-pavillon', w: 1600, h: 1287, alt: 'Pavillon vitré du Panorama et terrasse de gravier sous un ciel bleu', cap: 'Le pavillon vitré sur la Route Merveilleuse' },
};
