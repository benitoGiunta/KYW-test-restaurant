// Données d'Épices & Nous. Source : data/restaurants/epices-et-nous/{donnees.json,dossier.md} (relevé du 20/11/2026).
// Hypothèses : (1) aucune coordonnée GPS ni e-mail connue : geo et email à null, le composant ne rend rien ;
// (2) pas de photo de l'équipe : aucun portrait, Denis et Sophie ne sont nommés que par le texte ;
// (3) menu 52 € : relevé du site actuel, susceptible de changer avec la saison ; (4) Michelin et Gault&Millau cités en texte
// seulement (aucun logo), à confirmer ; (5) le plat signature « ris de veau façon carbonara » vient du dossier, la carte
// du jour affiche « Ris de veau » croustillant laqué : les deux sont donnés tels quels. Aucun plat inventé.
export const site = {
  nom: 'Épices & Nous',
  baseline: 'Là où la passion de la cuisine se mêle à l’art de recevoir',
  description: 'Épices & Nous, restaurant de Denis et Sophie Delvigne à Erpent (Namur) : cuisine française de saison relevée d’épices, menu trois services à 52 €.',
  typeCuisine: 'Française traditionnelle revisitée, touches d’épices',
  depuis: 1999,
  adresse: { rue: 'Chaussée de Marche', numero: '561', cp: '5101', commune: 'Erpent (Namur)', pays: 'BE' },
  geo: null as null | { lat: number; lon: number },
  telephone: '+32 81 31 32 24',
  telephoneHref: 'tel:+3281313224',
  telephoneLisible: '081 31 32 24',
  email: null as null | string,
  reservationUrl: 'https://www.epicesetnous.com/reservations',
  siteActuel: 'https://www.epicesetnous.com',
  planUrl: 'https://www.google.com/maps/search/?api=1&query=Chaussée+de+Marche+561+5101+Erpent',
  facebook: 'https://www.facebook.com/epices.et.nous/',
  credit: 'Photos : Épices & Nous',
} as const;

export const reseaux = [{ nom: 'Facebook', url: site.facebook }];

export const jours = [
  { nom: 'Lundi', court: 'Lun', ferme: true },
  { nom: 'Mardi', court: 'Mar', ferme: false },
  { nom: 'Mercredi', court: 'Mer', ferme: false },
  { nom: 'Jeudi', court: 'Jeu', ferme: false },
  { nom: 'Vendredi', court: 'Ven', ferme: false },
  { nom: 'Samedi', court: 'Sam', ferme: false, soirSeul: true },
  { nom: 'Dimanche', court: 'Dim', ferme: true },
] as const;

export const services = [
  { nom: 'Midi', debut: '12:00', fin: '13:45', libelle: '12 h à 13 h 45' },
  { nom: 'Soir', debut: '19:00', fin: '20:30', libelle: '19 h à 20 h 30' },
] as const;
export const joursSchema = ['Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

export interface Plat { nom: string; description: string | null; prix: number; placeholder?: boolean }
export interface Categorie { id: string; titre: string; note?: string; plats: Plat[] }

export const carte: Categorie[] = [
  { id: 'entrees', titre: 'Entrées', plats: [
    { nom: 'Pomme de terre Macaire', description: 'Aux petits lardons, reblochon fermier et rosaces de contrefilet Holstein épicé, fumé, maturé', prix: 20.5 },
    { nom: 'Velouté de champignons des bois', description: 'Filet de plie poché, lamelles de truffes et petits croûtons bien dorés', prix: 22.5 },
    { nom: 'Saint-Jacques de Dieppe', description: 'Noix snackées, céleri, lard confit et bouillon de moules, châtaigne', prix: 25.5 },
    { nom: 'Lentilles vertes du Puy', description: 'Salade tiède, Morteau, escalope de foie gras de canard poêlée', prix: 25.5 },
  ] },
  { id: 'plats', titre: 'Plats', plats: [
    { nom: 'Filet de biche du Pays', description: 'Rôti, légumes d’automne, airelles, sauce poivrade et mousseline de céleri rave', prix: 45.75 },
    { nom: 'Ris de veau', description: 'Croustillant, laquage miel, soja, gingembre confit, légumes racines et mousseline de céleri rave', prix: 45.75 },
    { nom: 'Aloyau de bœuf', description: 'Du Pays, cuit au sautoir, quelques légumes du moment, frites et sauce au choix', prix: 33.5 },
    { nom: 'Coucou de Malines', description: 'Suprême en cuisson douce puis coloré vivement, chiconnette caramélisée, sauce fine Champagne et pomme Dauphine', prix: 33.5 },
    { nom: 'Daurade royale', description: 'Filet cuit sur peau, tombée d’épinards, scampis grillés, riz basmati et fumet de poissons légèrement crémé au curry rouge', prix: 33.5 },
  ] },
  { id: 'desserts', titre: 'Desserts', note: 'Glaces et sorbets : 3 € la boule.', plats: [
    { nom: 'Assiette de fromages', description: 'Fromages d’ici et d’ailleurs', prix: 17 },
    { nom: 'Gâteau de Mamy', description: 'Chocolat noir et petits beurre écrasés, crème anglaise à la vanille', prix: 13 },
    { nom: 'Marquise au chocolat', description: 'Crème anglaise liqueur Advocaat', prix: 13 },
    { nom: 'Nougatine glacée', description: 'Coulis de fruits rouges', prix: 13 },
    { nom: 'Macaron farci', description: 'Glace au caramel à la fleur de sel', prix: 14 },
    { nom: 'Dame blanche ou Brésilienne', description: null, prix: 13 },
    { nom: 'Café glacé', description: null, prix: 13 },
  ] },
];

export const boules = {
  sorbets: 'Citron vert, framboise, mangue, noix de coco, ananas, chocolat amer, clémentine Corse, citron vert et basilic, abricot et romarin',
  glaces: 'Vanille de Madagascar, caramel à la fleur de sel, café, praliné, pistache, vanille et grué de cacao',
  prix: 3,
};

export const menu = {
  nom: 'Menu trois services',
  prix: 52,
  regle: 'Sans les boissons, servi par table entière, sans changement possible.',
  fromage: 'Assiette de fromages : 9 € à la place du dessert, 17 € en plus.',
  etapes: [
    { titre: 'Entrées', choix: ['Tartare de saumon aux éclats de grenade, huile d’olive d’Uzès, petite salade et grissini', 'Salade tiède de lentilles vertes du Puy, Morteau, scampi grillé, foie gras poêlé, huile de noisette'] },
    { titre: 'Plats', choix: ['Filet de daurade royale cuit sur peau, mousseline de butternut aux épices, châtaignes, Saint-Jacques de Dieppe crue marinée, beurre blanc au miso', 'Noisettes de biche cuites au sautoir, garnitures automnales, poivrade adoucie au chocolat, mousseline de céleri rave'] },
    { titre: 'Desserts', choix: ['Tartelette chocolat, châtaignes, glace vanille du Mexique', 'Pomme caramélisée, sabayon au miel d’acacia, crumble'] },
  ],
};

export const signature = { nom: 'Ris de veau façon carbonara', detail: 'dés croustillants, lardons, pâtes fraîches, jaune d’œuf, tuile fromagère' };

/** Les deux voix : Denis en cuisine, Sophie en salle. Rôles issus du site actuel (page « On parle de nous »). */
export const equipe = [
  { prenom: 'Denis', nom: 'Delvigne', voix: 'cuisine', role: 'Cuisinier, co-fondateur', texte: 'Il cuisine des produits frais et locaux au rythme des saisons. Le nom de la maison vient de sa passion pour les épices.' },
  { prenom: 'Sophie', nom: 'Delvigne', voix: 'salle', role: 'Accueil et salle, co-fondatrice', texte: 'Elle tient la salle et l’accueil : une salle avant moderne et lumineuse, une verrière feutrée, une terrasse dès que la météo le permet.' },
] as const;

export const histoire = [
  'Depuis 1999, Denis et Sophie Delvigne accueillent leurs convives à Erpent, sur la chaussée de Marche.',
  'Formés à l’école hôtelière de la Citadelle, ils ne venaient pas du milieu de la restauration. Le nom de la maison reflète la passion de Denis pour les épices, et leur goût commun de la convivialité.',
  'La cuisine est française, traditionnelle et revisitée, faite de produits frais et locaux et de suggestions de saison : biche, Saint-Jacques de Dieppe, lentilles du Puy, daurade royale, selon l’arrivage.',
];

export const reperes = [
  { cle: 'Depuis', valeur: '1999' },
  { cle: 'Guide Michelin', valeur: 'Restaurant recommandé à Namur' },
  { cle: 'Gault&Millau', valeur: '13,5 sur 20' },
];

export const espaces = [
  { nom: 'La salle avant', texte: 'Moderne, lumineuse et dynamique.', photo: 'salleAvant' },
  { nom: 'La verrière', texte: 'À l’arrière, plus douce et feutrée.', photo: 'verriere' },
  { nom: 'La terrasse', texte: 'Dès que la météo le permet.', photo: 'facade' },
] as const;
