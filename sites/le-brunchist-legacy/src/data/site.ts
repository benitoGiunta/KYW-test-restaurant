// Données de Le Brunchist : data/restaurants/le-brunchist/{dossier.md, donnees.json}.
// Le site d'origine (lebrunchist.com) est protégé par une vérification anti-robot : aucune copie, carte ni photo du client.
// `placeholder: true` = illustratif (composition d'un plat, photo provisoire), jamais un fait.
const b = import.meta.env.BASE_URL;
export const base = b.endsWith('/') ? b : `${b}/`;

const NB = ' ';

export const resto = {
  nom: 'Le Brunchist',
  siteActuel: 'https://lebrunchist.com',
  adresse: { rue: 'Place d’Armes', numero: '8', cp: '5000', ville: 'Namur' },
  telephone: '+32 474 06 92 27',
  telHref: 'tel:+32474069227',
  telAffiche: '0474 06 92 27',
  facebook: 'https://www.facebook.com/Lebrunchist',
  instagram: 'https://www.instagram.com/lebrunchist/',
  itineraire: 'https://www.google.com/maps/search/?api=1&query=Place+d%27Armes+8+5000+Namur',
};

// Horaires relevés par Namur CentreVille (sources contradictoires : voir ETAT.md), à confirmer.
export const horaires = [
  { jour: 'Lundi', ouvert: false },
  { jour: 'Mardi', ouvert: false },
  { jour: 'Mercredi', ouvert: true },
  { jour: 'Jeudi', ouvert: true },
  { jour: 'Vendredi', ouvert: true },
  { jour: 'Samedi', ouvert: true },
  { jour: 'Dimanche', ouvert: true },
].map((h) => ({ ...h, de: '9 h 30', a: '15 h 30', iso: ['09:30', '15:30'] }));

type Plat = { nom: string; desc: string; placeholder: true };
const p = (nom: string, desc: string): Plat => ({ nom, desc, placeholder: true });

// Noms cités par des sources tierces (dossier.md § Offre) ; compositions illustratives ; aucun prix connu.
export const carte = [
  { id: 'sale', nom: 'Salé', plats: [
    p('Eggs benedict', 'Œufs pochés, sauce hollandaise'),
    p('Toast à l’avocat', 'Avocat sur pain grillé, œuf poché'),
    p('Œufs brouillés', 'Servis avec du pain grillé'),
    p('Tartines', 'Garniture à confirmer'),
    p('Filet américain', 'Cru de bœuf, assaisonné'),
  ] },
  { id: 'sucre', nom: 'Sucré', plats: [
    p('Granola maison', 'Granola fait maison, yaourt, fruits'),
    p('Granola bowl', 'Bol de granola, fruits de saison'),
    p('Pancakes', 'Pile de pancakes, garniture à confirmer'),
  ] },
  { id: 'boissons', nom: 'Boissons', plats: [
    p('Café de spécialité', 'Filtre ou espresso'),
    p('Latte', 'Espresso et lait'),
    p('Matcha', 'Thé vert en poudre, lait'),
    p('Jus frais', 'Pressé sur place'),
  ] },
];

export const presse = [
  { media: 'ELLE.be', titre: 'Les meilleurs brunchs à tester à Namur', date: '26 janvier 2025', url: 'https://www.elle.be/fr/442321-les-meilleurs-brunchs-a-tester-a-namur.html' },
  { media: 'Namur.top', titre: 'Le Brunchist, le meilleur brunch de Namur', date: '19 mars 2023', url: 'https://namur.top/le-brunchist-le-meilleur-brunch-de-namur/' },
];

// Extraits d'avis Google relevés sur Restaurant Guru (dossier.md § Réputation), mot pour mot, à vérifier.
export const avis = [
  { texte: 'Best egg topped Avocado toast ever.', auteur: 'David' },
  { texte: 'Very cozy, good fresh foods […]', auteur: 'Wendy S.' },
];

export const photos = {
  hero: { src: 'photos/matcha-latte.webp', w: 1600, h: 900, alt: 'Un latte matcha avec un motif de feuille dans la mousse, vu d’en haut, sur une table en bois', credit: 'Irvan Ary Maulana', licence: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Matcha_tea_latte_with_rosetta_latte_art.jpg', data: 'La photo du café : une boisson servie au comptoir, vue d’en haut' },
  carte: { src: 'photos/croissant-amandes.webp', w: 1600, h: 1205, alt: 'Un croissant aux amandes saupoudré de sucre sur une assiette, sur une table de café', credit: 'Andy Li', licence: 'CC0', url: 'https://commons.wikimedia.org/wiki/File:Almond_croissant_-_Workshop_Coffee_Lab_2025-06-27.jpg', data: 'Un plat de la carte, de près, sur la vaisselle du café' },
  lieu: { src: 'photos/coin-lecture.webp', w: 1600, h: 1143, alt: 'Un fauteuil fleuri, un lampadaire et un coffre ancien dans une pièce aux lambris bleus', credit: 'Øyvind Holmstad', licence: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Reading_corner.jpg', data: 'Un coin de la salle, mobilier et vaisselle d’époque' },
};

export const nbsp = NB;
