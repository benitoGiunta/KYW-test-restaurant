// Contenu de Sanga. Sources : data/restaurants/sanga/donnees.json et dossier.md (site sanganamur.be, 10/11/2026).
// Hypothèses (voir RAPPORT.md) : la lecture du nom 山河 (montagnes et rivières) est celle des deux caractères du logo,
// pas une déclaration du client ; aucune histoire, équipe, e-mail ni réseau social n'est connu : rien n'est inventé,
// les blocs correspondants sont absents. Les textes de plats sont ceux du site client, dédoublonnés et sans fautes d'usage.
export const nbsp = ' ';
/** 6.5 → « 6,50 € » (espace insécable). */
export const eur = (n: number) => `${n.toFixed(2).replace('.', ',')}${nbsp}€`;

export const site = {
  nom: 'Sanga',
  kanji: '山河',
  baseline: 'Le premier restaurant de ramen à Namur',
  typeCuisine: 'Ramen japonais',
  description: 'Sanga, ramen, udon, soba et donburi japonais à Namur, rue Saint-Loup : bouillon miso, shio ou shoyu, sur place, à emporter ou en livraison.',
  adresse: { rue: 'Rue Saint-Loup', numero: '8', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.4642086, lon: 4.8635682 },
  telephone: '+3281241038',
  telephoneLisible: '081 24 10 38',
  telephoneHref: 'tel:+3281241038',
  email: null as string | null,
  commandeUrl: 'https://www.sanganamur.be',
  planUrl: 'https://www.google.com/maps/search/?api=1&query=Rue+Saint-Loup+8%2C+5000+Namur',
  reseaux: [] as { nom: string; url: string }[],
  credit: 'Photos du restaurant, origine à confirmer',
  avisGoogle: { note: '4,6', nombre: '892', source: 'Rankeat, 4 mars 2026' },
};

/** Deux services, du mardi au dimanche ; fermé le lundi. */
export const services = [
  { cle: 'midi', nom: 'Midi', debut: '12:00', fin: '14:00', libelle: `12${nbsp}h à 14${nbsp}h` },
  { cle: 'soir', nom: 'Soir', debut: '18:00', fin: '22:00', libelle: `18${nbsp}h à 22${nbsp}h` },
] as const;
export const jours = [
  { nom: 'Lundi', ferme: true },
  { nom: 'Mardi', ferme: false }, { nom: 'Mercredi', ferme: false }, { nom: 'Jeudi', ferme: false },
  { nom: 'Vendredi', ferme: false }, { nom: 'Samedi', ferme: false }, { nom: 'Dimanche', ferme: false },
] as const;
export const joursSchema = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

export const bouillons = [
  { nom: 'Miso', sens: 'pâte de soja fermentée', ton: 'miso' },
  { nom: 'Shio', sens: 'sel', ton: 'shio' },
  { nom: 'Shoyu', sens: 'sauce soja', ton: 'shoyu' },
] as const;

export type Plat = { nom: string; description?: string; prix: number; photo?: 'udon' | 'ramen' | 'gyoza' | 'teriyaki'; placeholder?: boolean };
export type Categorie = { cle: string; titre: string; note?: string; plats: Plat[] };

export const carte: Categorie[] = [
  { cle: 'entrees', titre: 'Entrées', plats: [
    { nom: 'Edamame', prix: 6 },
    { nom: 'Gyoza grillés', prix: 6, photo: 'gyoza' },
    { nom: 'Tori-kara', description: 'Poulet frit.', prix: 7.2 },
    { nom: 'Tori-kara, sauce Amazu', prix: 8 },
  ] },
  { cle: 'ramen', titre: 'Ramen', note: 'Chaque ramen se choisit en bouillon miso, shio ou shoyu.', plats: [
    { nom: 'Ramen simple', prix: 13.8 },
    { nom: 'Ramen au poulet', description: 'Poulet, pousses de bambou, algues, oignons verts et légumes de saison, 5 pièces.', prix: 15.5 },
    { nom: 'Chashu ramen', description: 'Chashu, demi-œuf mollet, pousses de bambou, algues, oignons verts et légumes de saison, 5 pièces.', prix: 15.8, photo: 'ramen' },
    { nom: 'Negikara ramen', prix: 16.5 },
    { nom: 'Ramen au canard', prix: 16.8 },
  ] },
  { cle: 'udon', titre: 'Udon et soba', plats: [
    { nom: 'Kitsune udon ou soba', prix: 12.5 },
    { nom: 'Soba végétarien', prix: 12.5 },
    { nom: 'Udon tempura scampi', description: 'Sauce bouillon de poisson, 3 pièces.', prix: 15.8, photo: 'udon' },
    { nom: 'Udon au canard', description: 'Grand bol de soupe aux nouilles udon, canard rosé, algues et oignons verts.', prix: 17.8 },
  ] },
  { cle: 'donburi', titre: 'Donburi', note: 'Bol de riz garni, servi avec une salade et une soupe (miso pour le chashu-don).', plats: [
    { nom: 'Chashu-don', description: 'Chashu dans une sauce.', prix: 16.5 },
    { nom: 'Karaage-don', description: 'Poulet frit dans une sauce.', prix: 16.8 },
    { nom: 'Katsudon', description: 'Porc pané aux œufs.', prix: 16.8 },
    { nom: 'Teriyaki-don', description: 'Poulet et oignons verts, sauce teriyaki.', prix: 17.8, photo: 'teriyaki' },
    { nom: 'Unagidon', description: 'Anguille (unagi), sauce sucrée à base de soja.', prix: 18.8 },
    { nom: 'Yakiniku-don', description: 'Bœuf grillé, sauce soja à la japonaise.', prix: 18.8 },
  ] },
  { cle: 'divers', titre: 'Divers', plats: [
    { nom: 'Œuf', prix: 1.5 }, { nom: 'Riz', prix: 2 }, { nom: 'Wakame', prix: 3.5 },
    { nom: 'Rôti de porc', prix: 3.8 }, { nom: 'Poulpe mariné', prix: 5.2 },
  ] },
  { cle: 'boissons', titre: 'Boissons', plats: [
    { nom: 'Coca-Cola 33 cl', prix: 2.5 }, { nom: 'Coca-Cola Zero 33 cl', prix: 2.5 },
    { nom: 'Thé froid 50 cl', prix: 4.2 }, { nom: 'Thé au lychee 33 cl', prix: 4.2 }, { nom: 'Thé au melon 33 cl', prix: 4.2 },
    { nom: 'Iki', prix: 4.5 }, { nom: 'Limonade japonaise 20 cl', prix: 4.5 },
    { nom: 'Asahi', prix: 4.8 }, { nom: 'Kirin', prix: 4.8 },
  ] },
];

/** Avis réels repris de data/restaurants/sanga/donnees.json (extraits, source et date). */
export const avis = [
  { texte: 'Un vrai régal ! Autant à emporter que sur place ! (orthographe rectifiée)', source: 'client Takeaway.com', date: '1er novembre 2026' },
  { texte: 'Excellent et délai respecté […]', source: 'client Takeaway.com', date: '16 août 2026' },
  { texte: 'Ce fut vraiment une bonne surprise !', source: 'blog Une fille sans chichis', date: 'avril 2018' },
];

export const livraison = {
  zones: [
    { cp: '5000, 5001, 5002, 5003, 5004', minimum: 25 },
    { cp: '5100, 5020', minimum: 35 },
  ],
  paiement: ['Bancontact', 'Maestro', 'MasterCard', 'Visa', 'Espèces à la livraison'],
};
