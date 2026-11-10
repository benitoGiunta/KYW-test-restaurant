// Données Sanga : data/restaurants/sanga/ (dossier.md, donnees.json, site-actuel/). Rien d'inventé.
// Reformulations (casse de phrase, fautes, doublons) : chaque ligne changée est notée ci-dessous.
// Hallmark · reworded "Goût du ramen au choix Bouillon au choix : Miso taste, Shio taste, Shoyu taste." to "Bouillon au choix : miso, shio ou shoyu" · 54
// Hallmark · reworded "demi œuf mollet, … des algues, des oignons verts" to "demi-œuf mollet, … algues, oignons verts" · 19
// Hallmark · reworded "Composé de poulet frits de la viande dans une sauce" to "Poulet frit dans une sauce" · 19
// Hallmark · reworded "servi avec du salade et de la soupe" to "servi avec salade et soupe" · 19
// Hallmark · reworded "Boeuf grillé à la sauce soja à la japonaise" to "Bœuf grillé à la sauce soja japonaise" · 19
// Hallmark · reworded "Biéres japonaise" to "Bières japonaises" · 19

export const base: string = import.meta.env.BASE_URL;
const nb = ' ';
export const eur = (n: number) => n.toFixed(2).replace('.', ',') + nb + '€';

export const resto = {
  nom: 'Sanga',
  kanji: '山河',
  denomination: 'Xin Sheng',
  bce: 'BE1016961856',
  baseline: 'Le premier restaurant de ramen à Namur',
  accroche: 'Nous servons d’authentiques soupes de nouilles japonaises dans une ambiance chaleureuse.',
  accueil: `Irashaimase${nb}! Bienvenue${nb}!`,
  adresse: { rue: 'Rue Saint-Loup 8', cp: '5000', ville: 'Namur' },
  telAffiche: '081 24 10 38',
  telHref: 'tel:081241038',
  siteActuel: 'https://www.sanganamur.be',
  commander: 'https://www.sanganamur.be/_myorder_orderandeat_redirect.php?preflang=fr',
  maps: 'https://www.google.com/maps/place/Rue+Saint+Loup+8%2C+5000+Namur',
  cgv: 'https://www.sanganamur.be/terms-and-conditions/',
  vie_privee: 'https://www.sanganamur.be/privacy-policy/',
  geo: { lat: 50.4642, lon: 4.8636 },
};

const cat = (s: string) => `${resto.siteActuel}/product-category/${s}/`;

export interface Plat { nom: string; desc?: string; prix: number }
export interface Rubrique { id: string; titre: string; lien: string; plats: Plat[] }

export const bouillons = ['Miso', 'Shio', 'Shoyu'];

export const ramen: Rubrique = {
  id: 'ramen', titre: 'Ramen', lien: cat('ramen'),
  plats: [
    { nom: 'Ramen simple', prix: 13.8 },
    { nom: 'Ramen au poulet', desc: 'Poulet, pousses de bambou, algues, oignons verts et légumes de saison, 5 pièces.', prix: 15.5 },
    { nom: 'Chashu ramen', desc: 'Chashu, demi-œuf mollet, pousses de bambou, algues, oignons verts et légumes de saison, 5 pièces.', prix: 15.8 },
    { nom: 'Negikara ramen', prix: 16.5 },
    { nom: 'Ramen au canard', prix: 16.8 },
  ],
};

export const udon: Rubrique = {
  id: 'udon-soba', titre: 'Udon et soba', lien: cat('udon-soba'),
  plats: [
    { nom: 'Kitsune udon ou soba', prix: 12.5 },
    { nom: 'Soba végétarien', prix: 12.5 },
    { nom: 'Udon tempura scampi', desc: 'Sauce bouillon de poisson, 3 pièces.', prix: 15.8 },
    { nom: 'Udon au canard', desc: 'Grand bol de soupe aux nouilles udon, canard rosé, algues et oignons verts.', prix: 17.8 },
  ],
};

export const donburi: Rubrique = {
  id: 'donburi', titre: 'Donburi', lien: cat('donburi'),
  plats: [
    { nom: 'Chashu-don', desc: 'Chashu dans une sauce, servi avec salade et miso.', prix: 16.5 },
    { nom: 'Karaage-don', desc: 'Poulet frit dans une sauce, servi avec salade et miso.', prix: 16.8 },
    { nom: 'Katsudon', desc: 'Porc pané aux œufs, servi avec salade et miso.', prix: 16.8 },
    { nom: 'Teriyaki-don', desc: 'Poulet et oignons verts dans une sauce, servi avec salade et miso.', prix: 17.8 },
    { nom: 'Unagidon', desc: 'Anguille unagi dans une sauce sucrée au soja, servi avec salade et soupe.', prix: 18.8 },
    { nom: 'Yakiniku-don', desc: 'Bœuf grillé à la sauce soja japonaise, servi avec salade et soupe.', prix: 18.8 },
  ],
};

export const entrees: Rubrique = {
  id: 'entrees', titre: 'Entrées', lien: cat('entree'),
  plats: [
    { nom: 'Edamame', prix: 6 },
    { nom: 'Gyoza grillés', prix: 6 },
    { nom: 'Tori-kara', desc: 'Poulet frit.', prix: 7.2 },
    { nom: 'Tori-kara, sauce amazu', prix: 8 },
  ],
};

export const divers: Rubrique = {
  id: 'divers', titre: 'Divers', lien: cat('divers'),
  plats: [
    { nom: 'Œuf', prix: 1.5 },
    { nom: 'Riz', prix: 2 },
    { nom: 'Wakame', prix: 3.5 },
    { nom: 'Rôti de porc', prix: 3.8 },
    { nom: 'Poulpe mariné', prix: 5.2 },
  ],
};

export const boissons: Rubrique = {
  id: 'boissons', titre: 'Boissons', lien: cat('bieres-japonaise'),
  plats: [
    { nom: 'Coca-Cola 33 cl', prix: 2.5 },
    { nom: 'Coca-Cola Zero 33 cl', prix: 2.5 },
    { nom: 'Thé froid 50 cl', prix: 4.2 },
    { nom: 'Thé au lychee 33 cl', prix: 4.2 },
    { nom: 'Thé au melon 33 cl', prix: 4.2 },
    { nom: 'Iki', prix: 4.5 },
    { nom: 'Limonade japonaise 20 cl', prix: 4.5 },
    { nom: 'Asahi', prix: 4.8 },
    { nom: 'Kirin', prix: 4.8 },
  ],
};

export const livraison = {
  paliers: [
    { min: 25, codes: ['5000', '5001', '5002', '5003', '5004'] },
    { min: 35, codes: ['5020', '5100'] },
  ],
  note: 'Dans un rayon de 6 km autour de Namur, la livraison démarre dès 35 €.'.replace('35 €', `35${nb}€`),
  paiements: ['Bancontact', 'Maestro', 'Mastercard', 'Visa', 'Espèces à la livraison'],
};

// Horaires du site : lundi fermé ; mardi à dimanche midi et soir.
export const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
export const creneaux = [
  { de: '12:00', a: '14:00' },
  { de: '18:00', a: '22:00' },
];
