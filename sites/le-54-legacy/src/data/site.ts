// Données du Le 54 : tout vient de data/restaurants/le-54 (donnees.json, dossier.md, site-actuel/).
// Heures « 12:00 » ; espace insécable   avant « : ; ! ? € ».
export const resto = {
  nom: 'Le 54',
  lieu: 'Dave',
  site: 'https://www.le54dave.be',
  rue: 'Rue de Longeau 54',
  ville: '5100 Dave (Namur)',
  tel1: { affiche: '+32 81 58 04 40', href: 'tel:+3281580440' },
  tel2: { affiche: '+32 496 35 10 75', href: 'tel:+32496351075' },
  email: 'restaurantle54@gmail.com',
  bce: 'BE 437 634 306',
  facebook: 'https://www.facebook.com/Restaurant-LE-54--146193728765518/',
  instagram: 'https://www.instagram.com/le54dave/',
  carte: 'https://www.openstreetmap.org/?mlat=50.41887&mlon=4.88509#map=17/50.41887/4.88509',
};

export const nav = [
  { href: 'lacarte', label: 'Menus' },
  { href: 'a-propos', label: 'À propos' },
  { href: 'galerie', label: 'Photos' },
  { href: 'contact', label: 'Contact' },
];

// jour : 0 = dimanche (Date.getDay). Plages 12:00-14:00 et 18:30-21:00 recoupées par Trouve Ton Resto et Gault&Millau (à confirmer).
export const horaires = [
  { jour: 1, nom: 'Lundi', midi: '12:00 à 14:00', soir: '18:30 à 21:00', aConfirmer: true },
  { jour: 2, nom: 'Mardi', midi: null, soir: null },
  { jour: 3, nom: 'Mercredi', midi: null, soir: null },
  { jour: 4, nom: 'Jeudi', midi: '12:00 à 14:00', soir: '18:30 à 21:00' },
  { jour: 5, nom: 'Vendredi', midi: '12:00 à 14:00', soir: '18:30 à 21:00' },
  { jour: 6, nom: 'Samedi', midi: null, soir: '18:30 à 21:00' },
  { jour: 0, nom: 'Dimanche', midi: '12:00 à 14:00', soir: '18:30 à 21:00' },
];
export const dernieresCommandes = 'Dernières commandes à 13:00 pour le service de midi et à 20:00 pour celui du soir. Ouvert les jours fériés.';

// Menu du moment, tel que sur le site actuel (/lacarte). Aucun prix de plat hors suppléments cités.
export const menu = [
  { titre: 'Fin tranchée de veau, sauce tonnato', ligne: 'Veau cuit en basse température, œufs de truite, câpres.', ou: 'Et/ou crevettes nobashi en raviole au curry et juste raidie, crème de dashi.' },
  { titre: 'Bœuf wagyu A5', ligne: 'Véritable bœuf wagyu A5 (100 g), sel au charbon.', prix: 'Supplément 40 €' },
  { titre: 'Cochon de lait ou zarzuela', ligne: 'Cochon de lait légèrement saumuré, garniture estivale, pimentos, pommes de terre confites à l’huile d’olive.', ou: 'Ou zarzuela à notre façon, poissons et coquillages selon arrivage, légumes du sud.', options: ['Royale avec ½ homard : + 25 €, min. 2 personnes', 'Impériale avec ½ langouste : + 35 €, min. 2 personnes'] },
  { titre: 'Plaisir sucré', ligne: null },
];
export const menus = [
  { nom: '3 services', prix: '48 €' },
  { nom: '4 services', prix: '65 €' },
];
export const notesCarte = {
  modif: 'Toute modification est susceptible d’entraîner un supplément.',
  allergies: 'Nous comprenons vos allergies et intolérances et ferons le nécessaire pour adapter nos plats si celles-ci sont mentionnées lors de la réservation. Si vous nous prévenez seulement à la commande, il est possible que nous n’ayons pas le temps ou les ingrédients nécessaires à une alternative qui vous satisfasse.',
};

export const pratique = ['Parking aisé en face', 'Terrasse', 'Accessible aux personnes à mobilité réduite', 'Visa, MasterCard', 'Chiens admis', 'Réservation souhaitée'];

// Légende (étiquette murale) et alt de chaque photo : le champ `sujet` de photos/index.json fait foi.
export const legendes: Record<string, { alt: string; label: string }> = {
  'salle-noir-blanc': { alt: 'Salle du restaurant en noir et blanc, tables nappées et verres dressés', label: 'La salle' },
  'salle-sombre': { alt: 'Salle à manger, parquet et tables nappées', label: 'La salle à manger' },
  'plat-langoustine': { alt: 'Assiette de langoustine, herbes et émulsion', label: 'Langoustine' },
  'plat-betterave': { alt: 'Assiette de betteraves et de légumes en fleurs', label: 'Betteraves' },
  'plat-saint-jacques': { alt: 'Noix de Saint-Jacques dans un bol bleu, crème et ciboulette', label: 'Noix de Saint-Jacques' },
  'dressage-sauce': { alt: 'Service d’une sauce sur un plat de légumes', label: 'Le service de la sauce' },
  'plat-bol-bleu': { alt: 'Plat servi dans un bol bleu, en salle', label: 'Bol bleu' },
  'geste-dressage': { alt: 'Mains dressant des assiettes en cuisine', label: 'Le dressage' },
  'bols-truffe': { alt: 'Bols bleus garnis de purée et de copeaux', label: 'Bols bleus' },
  'plat-bol-noir': { alt: 'Plat dans un bol noir, sauce versée à table', label: 'Sauce versée à table' },
  'assiette-blanche': { alt: 'Petite assiette dressée sur une grande assiette blanche', label: 'Assiette blanche' },
  'tartare': { alt: 'Tartare dressé sur une assiette blanche', label: 'Tartare' },
  'soupe-homard': { alt: 'Velouté mousseux, pièce rouge et herbes', label: 'Velouté' },
  'dessert-amandes': { alt: 'Dessert glacé aux amandes effilées', label: 'Dessert aux amandes' },
};
export const galerie = ['salle-noir-blanc', 'plat-langoustine', 'dressage-sauce', 'plat-saint-jacques', 'plat-betterave', 'geste-dressage', 'bols-truffe', 'soupe-homard', 'plat-bol-noir', 'tartare', 'plat-bol-bleu', 'dessert-amandes', 'assiette-blanche', 'salle-sombre'];
