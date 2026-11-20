// Données réelles : data/restaurants/epices-et-nous (donnees.json, dossier.md, site-actuel/pages).   = espace insécable (remplacé au build du fichier).
export const resto = {
  nom: 'Épices & Nous',
  adresse: ['Chaussée de Marche 561', '5101 Erpent (Namur)'],
  tel: '+32 81 31 32 24',
  telHref: 'tel:+3281313224',
  reservation: 'https://www.epicesetnous.com/reservations',
  siteActuel: 'https://www.epicesetnous.com',
  facebook: 'https://www.facebook.com/epices.et.nous/',
  michelin: 'https://guide.michelin.com/be/fr/namur/erpent/restaurant/epices-et-nous',
  gm: 'https://www.gaultmillau.be/fr/restaurants/epices-et-nous-namur-erpent',
};

export const horaires = [
  { jour: 'Lundi', h: null, n: [1] },
  { jour: 'Mardi à vendredi', h: ['12:00 à 13:45', '19:00 à 20:30'], n: [2, 3, 4, 5] },
  { jour: 'Samedi', h: ['19:00 à 20:30'], n: [6] },
  { jour: 'Dimanche', h: null, n: [0] },
];

export type Photo = { n: string; ws: number[]; w: number; h: number };
// w et h : dimensions de la plus grande variante WebP.
export const photos: Record<string, Photo> = {
  table: { n: 'table', ws: [800, 1600], w: 1600, h: 1065 },
  salle: { n: 'salle-avant', ws: [600, 1000], w: 1000, h: 1501 },
  verriere: { n: 'verriere', ws: [600, 1000], w: 1000, h: 1451 },
  facade: { n: 'facade', ws: [600, 1000], w: 1000, h: 1368 },
  saumon: { n: 'saumon', ws: [600, 1000], w: 1000, h: 1502 },
  girolles: { n: 'girolles', ws: [600, 1000], w: 1000, h: 1502 },
  viande: { n: 'viande', ws: [600, 1000], w: 1000, h: 1502 },
  biche: { n: 'biche', ws: [800, 1400], w: 1400, h: 932 },
  cuisine: { n: 'cuisine', ws: [600, 1000], w: 1000, h: 995 },
  pass: { n: 'pass', ws: [800, 1400], w: 1400, h: 932 },
  sauce: { n: 'sauce', ws: [600, 1000], w: 1000, h: 1502 },
  scampis: { n: 'scampis', ws: [800, 1400], w: 1400, h: 932 },
};

export const alts: Record<string, string> = {
  table: 'Table dressée, verres et serviette, ambiance sombre',
  salle: 'Salle avant, tables dressées et luminaire',
  verriere: 'Verrière : table dressée sous la verrière, tableau au mur',
  facade: 'Façade du restaurant, enseigne Épices & Nous',
  saumon: 'Filet de saumon sur peau, girolles, poêle',
  girolles: 'Girolles et jeunes pousses sur toast',
  viande: 'Viande, carottes et purées sur ardoise noire, vue verticale',
  biche: 'Viande rouge tranchée, carottes, purées de couleur sur ardoise',
  cuisine: 'Mains tranchant un saumon frais en cuisine',
  pass: 'Passe de cuisine, ustensiles dans un pot inox',
  sauce: 'Sauce beurre blanc versée sur scampis, linguine et légumes',
  scampis: 'Deux plats longs de scampis et linguine',
};

export const carte = [
  { cat: 'Entrées', photo: 'girolles', plats: [
    ['Pomme de terre Macaire', 'Pomme de terre Macaire aux petits lardons, reblochon fermier et rosaces de contrefilet Holstein épicé, fumé, maturé', '20,50'],
    ['Velouté de champignons des bois', 'Filet de plie poché, lamelles de truffes et petits croûtons bien dorés', '22,50'],
    ['Saint-Jacques de Dieppe', 'Noix de Saint-Jacques de Dieppe snackées, céleri, lard confit et bouillon de moules, châtaigne', '25,50'],
    ['Lentilles vertes du Puy', 'Salade tiède de lentilles vertes du Puy, Morteau, escalope de foie gras de canard poêlée', '25,50'],
  ] },
  { cat: 'Plats', photo: 'scampis', plats: [
    ['Filet de biche du Pays', 'Filet de biche rôti, légumes d’automne, airelles, sauce poivrade et mousseline de céleri rave', '45,75'],
    ['Aloyau de bœuf', 'Aloyau de bœuf du Pays cuit au sautoir, quelques légumes du moment, frites et sauce au choix', '33,50'],
    ['Ris de veau', 'Croustillant de ris de veau, laquage miel, soja, gingembre confit, légumes racines et mousseline de céleri rave', '45,75'],
    ['Coucou de Malines', 'Suprême de coucou de Malines cuisson douce puis coloré vivement, chiconnette caramélisée, sauce fine Champagne et pomme Dauphine', '33,50'],
    ['Daurade royale', 'Filet de daurade royale cuit sur peau, tombée d’épinards, scampis grillés, riz basmati et fumet de poissons légèrement crémé au curry rouge', '33,50'],
  ] },
  { cat: 'Desserts', photo: null, plats: [
    ['Assiette de fromages', 'Fromages d’ici et d’ailleurs', '17'],
    ['Gâteau de Mamy', 'Chocolat noir et petits beurre écrasés, crème anglaise à la vanille', '13'],
    ['Marquise au chocolat', 'Crème anglaise liqueur Advocaat', '13'],
    ['Nougatine glacée', 'Coulis de fruits rouges', '13'],
    ['Macaron farci', 'Glace au caramel à la fleur de sel', '14'],
    ['Dame blanche ou Brésilienne', null, '13'],
    ['Café glacé', null, '13'],
    ['Sorbets, la boule', 'Citron vert, framboise, mangue, noix de coco, ananas, chocolat amer, clémentine Corse, citron vert-basilic, abricot-romarin', '3'],
    ['Glaces, la boule', 'Vanille de Madagascar, caramel à la fleur de sel, café, praliné, pistache, vanille-grué de cacao', '3'],
  ] },
];

export const menu = {
  prix: '52',
  notes: ['Sans les boissons', 'Servi par table entière', 'Nous ne faisons pas de changement dans notre menu'],
  services: [
    { cat: 'Entrées du menu', plats: [
      ['Saumon', 'Tartare de saumon aux éclats de grenade à l’huile d’olive d’Uzès, petite salade et grissini'],
      ['Foie gras poêlé', 'Salade tiède de lentilles vertes du Puy, Morteau, scampi grillé, escalope de foie gras de canard poêlée et huile de noisette'],
    ] },
    { cat: 'Plats du menu', plats: [
      ['Daurade royale', 'Filet de daurade royale cuit sur peau, mousseline de butternut aux épices, châtaignes, noix de Saint-Jacques de Dieppe crue marinée et beurre blanc au miso'],
      ['Biche', 'Noisettes de biche cuites au sautoir, garnitures automnales, poivrade adoucie au chocolat, mousseline de céleri rave'],
    ] },
    { cat: 'Desserts du menu', plats: [
      ['Assiette de fromages', 'En remplacement du dessert : 9 €. En plus du dessert : 17 €'],
      ['Chocolat, châtaigne', 'Tartelette chocolat, châtaignes, crème glacée à la vanille du Mexique'],
      ['Pomme', 'Pomme caramélisée, sabayon au miel d’acacia, crumble'],
    ] },
  ],
};

export const actus = [
  ['4 mai, date illustrative', 'Plaisir de mai', '« En mai, fais ce qu’il te plaît » et viens découvrir notre carte du mois ! La carte de mai, c’est du plaisir et le plaisir de vous retrouver !'],
  ['26 mars, date illustrative', 'Fermeture exceptionnelle', 'Du 2 avril au 5 mai inclus, pour raison médicale. Nous serons ouverts après cette date et bien entendu avant : réservez dès maintenant.'],
  ['14 déc. 2025', 'Traiteur réveillon de Noël', 'Vos plats traiteur Épices & Nous à la maison pour le réveillon de Noël : venez chercher vos plats chez nous.'],
  ['3 déc. 2025', 'Carte de saison', 'À partir du 3 décembre, notre carte de saison et notre menu. Prenez le temps de les découvrir.'],
  ['17 sept. 2025', 'Nouvelle carte pour la reprise', 'Découvrez en quelques images notre nouvelle carte. Réservez votre table dès aujourd’hui pour découvrir les merveilles de saison.'],
  ['27 août 2025', 'Nouveau site', 'Pour le 1er septembre, nous lançons notre nouveau site avec un système de réservation revu et une présentation en ligne de notre carte.'],
];

// Accueil : seules les actualités datées d’une année (les autres restent sur /actualites/, avec la mention).
export const actusDatees = actus.filter(([d]) => d.includes('20'));
