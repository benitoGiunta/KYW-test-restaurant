// Données de L’Essentiel (Temploux, Namur). Source : data/restaurants/l-essentiel/ (donnees.json, dossier.md, photos/).
// HYPOTHÈSES (voir RAPPORT.md) :
//  - La baseline n’existe pas chez le client : « Dépouiller pour garder l’essentiel » est un complément `placeholder: true`.
//  - Le chef (Raphaël Adam) vient de Rankeat, source non validée : affiché avec la mention « à confirmer ».
//  - Aucune description de plat ni aucun prix à la carte hors formule « deux assiettes » : rien n’est inventé, le composant ne rend rien.
//  - Pas d’avis cités (extraits inconnus). La note Google (4,8, 1 052 avis, source Rankeat) est donnée avec sa réserve.
//  - Date de l’étoile Michelin discordante : aucune année affichée.
const NB = ' ';

export const site = {
  nom: 'L’Essentiel',
  nomPlat: 'L’Essentiel',
  baseline: { texte: 'Dépouiller pour garder l’essentiel.', placeholder: true },
  accroche: 'Cuisine française créative et de saison, servie dans une ancienne tannerie du XVIIe siècle.',
  description:
    'L’Essentiel à Temploux (Namur) : restaurant gastronomique, une étoile au guide Michelin, cuisine française créative et de saison dans une ancienne tannerie du XVIIe siècle.',
  typeCuisine: 'Cuisine française créative et de saison',
  adresse: { rue: 'Rue Roger Clément', numero: '32', cp: '5020', commune: 'Temploux (Namur)', localite: 'Temploux', pays: 'BE' },
  geo: { lat: 50.4751615, lon: 4.7385286 },
  telephone: '+3281568616',
  telephoneLisible: `+32${NB}81${NB}56${NB}86${NB}16`,
  telephoneHref: 'tel:+3281568616',
  email: 'info@lessentiel.be',
  reservationUrl: 'https://www.lessentiel.be/reservation/',
  siteClient: 'https://www.lessentiel.be',
  planUrl: 'https://www.openstreetmap.org/?mlat=50.4751615&mlon=4.7385286#map=17/50.4751615/4.7385286',
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/lessentiel.temploux/' },
    { nom: 'Instagram', url: 'https://www.instagram.com/l.essentiel.temploux/' },
  ],
  credit: 'Photos : L’Essentiel',
  distinctions: {
    michelin: { texte: `Une étoile au guide Michelin`, url: 'https://guide.michelin.com/be/fr/namur/temploux/restaurant/l-essentiel210192' },
    gaultmillau: { note: `16,5${NB}/${NB}20`, edition: 'Gault&Millau 2024', rang: 'troisième de la province de Namur', source: 'DH, 27 novembre 2023', url: 'https://www.dhnet.be/regions/namur/2023/11/27/gaultmillau-2024-meilleur-restaurant-de-belgique-jeune-chef-de-lannee-decouvrez-les-notes-des-namurois-2FS5OMOPTBHEHEGVEBQY3R4DWI/' },
    google: { note: `4,8${NB}/${NB}5`, nombre: `1${NB}052 avis`, reserve: 'selon Rankeat, le nombre varie selon les sources' },
  },
} as const;

/** Créneaux de service : mercredi à samedi. 5 = vendredi… (ISO : 1 lundi, 7 dimanche). */
export const services = [
  { id: 'midi', libelle: `12${NB}h à 14${NB}h`, debut: '12:00', fin: '14:00' },
  { id: 'soir', libelle: `19${NB}h à 21${NB}h${NB}30`, debut: '19:00', fin: '21:30' },
] as const;
export const joursOuverts = ['mercredi', 'jeudi', 'vendredi', 'samedi'] as const;
export const joursFermes = ['lundi', 'mardi', 'dimanche'] as const;
export const joursSchema = ['Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

export const fermetures = [
  `du 20 décembre 2026 au 5 janvier 2027 (service traiteur de Noël)`,
  `du 21 février au 10 mars 2027`,
  `du 2 au 11 mai 2027`,
  `du 17 juillet au 3 août 2027`,
  `du 12 au 21 septembre 2027`,
  `du 7 au 11 novembre 2027`,
  `à partir du 19 décembre 2027 (fin non précisée)`,
] as const;

/** Mêmes fermetures en dates ISO (incluses) pour le statut calculé du hero ; fin inconnue = null. */
export const fermeturesPlages: [string, string | null][] = [
  ['2026-12-20', '2027-01-05'], ['2027-02-21', '2027-03-10'], ['2027-05-02', '2027-05-11'],
  ['2027-07-17', '2027-08-03'], ['2027-09-12', '2027-09-21'], ['2027-11-07', '2027-11-11'], ['2027-12-19', null],
];

export type Plat = { nom: string; supplement?: string; photo?: 'petitGris' | 'poisson' | 'biche' | 'entree' | 'dessert'; placeholder?: boolean };
export type Assiette = { id: string; titre: string; plats: Plat[] };

/** Carte relevée à l’automne 2026 (saison du gibier). Noms de plats = ceux du client, sans description ni prix. */
export const assiettes: Assiette[] = [
  {
    id: 'premiere',
    titre: 'Première assiette',
    plats: [
      { nom: 'Émincé de noix de Saint-Jacques, choux chinois, épinards et shiitakés, gel de soja pimenté et dashi', photo: 'entree' },
      { nom: 'Carpaccio de dos de faon, betterave, tartare de langoustine, granité de foie gras et jus de viande perlé' },
      { nom: 'Croquettes de petits gris et pied de porc, lentilles vertes, jambonneau et jus de volaille émulsionné', photo: 'petitGris' },
      { nom: 'Légumes de saison tiédis, gelée de butternut, paleta et jus de cuisson' },
      { nom: 'Gras de cuisse de volaille ardennaise, ris de veau, topinambour, champignon de Paris, oignon caramélisé et jus truffé' },
    ],
  },
  {
    id: 'deuxieme',
    titre: 'Deuxième assiette',
    plats: [
      { nom: 'Filet de sole, condiment d’huître et lardon, poireau, laitue de mer, huile de ciboulette', photo: 'poisson' },
      { nom: 'Turbot grillé, artichaut poivrade, sucrine et palet de bintje croustillant, sauce choron' },
      { nom: 'Homard bleu cuit dans sa carapace puis roulé au beurre, ris de veau meunière, épinard, fèves des marais et béarnaise des pinces', supplement: 'Supplément selon le cours du marché' },
      { nom: 'Mignon de biche du Pays, trompettes, choux de Bruxelles, airelles et coing, pomme Dauphine et sauce poivrade', photo: 'biche' },
      { nom: 'Suprême de poule faisane rôti sur le coffre, chicon, champignons des bois et potimarron, croquettes des cuisses et jus façon brabançonne' },
    ],
  },
];

export const fin = {
  fromage: { nom: 'Découverte du chariot de fromages affinés', prix: `16${NB}€` },
  dessert: { nom: 'Plaisir sucré', prix: `14${NB}€`, note: 'Certains desserts demandent une attention particulière : à commander en début de repas.', photo: 'dessert' as const },
};

export const menus = [
  { id: 'deux', nom: 'Les deux assiettes', prix: `90${NB}€`, detail: 'Une première et une deuxième assiette, à choisir à la carte.' },
  { id: 'affaire', nom: 'Menu Affaire', prix: `50${NB}€`, detail: `Entrée, plat, dessert selon l’inspiration du chef. Midi en semaine uniquement, hors jours fériés. Avec accord de vins : 75${NB}€.` },
  { id: 'plaisir', nom: 'Menu Plaisir', prix: `72${NB}€`, services: 4, detail: `Quatre services. Accord sans alcool « Aromatisée » 30${NB}€ ; vins « Découverte » 38${NB}€ ou « Français » 48${NB}€.` },
  { id: 'balade', nom: 'Menu Balade', prix: `90${NB}€`, services: 6, detail: `Six services. Accord sans alcool « Aromatisée » 35${NB}€ ; vins « Découverte » 45${NB}€ ou « Français » 58${NB}€. Le chariot de fromages remplace le dessert : supplément de 14${NB}€.` },
] as const;

export const regles = [
  'Chaque menu est servi pour la table entière ; tout changement coûte 25 € de supplément.',
  'Au-delà de six couverts, menu uniquement.',
  'Merci de signaler toute allergie.',
] as const;

export const chambres = {
  intro: 'Quatre chambres d’hôtes occupent une ancienne maison à colombages, à 800 m du restaurant.',
  noms: ['Tilleul (suite, bain et douche)', 'Ardoise', 'Rouille', 'Réglisse'],
  equipement: 'Lit de 180 sur 200, douche à l’italienne, peignoir, Wi-Fi. Terrasse privative pour Rouille et Réglisse.',
  tarifs: [
    { nom: 'Chambre double (2 personnes)', prix: `120${NB}€` },
    { nom: 'Suite Tilleul (2 personnes)', prix: `150${NB}€` },
    { nom: 'Petit-déjeuner, par personne', prix: `20${NB}€` },
    { nom: 'Lit supplémentaire, par personne', prix: `30${NB}€` },
  ],
};

export const equipe = {
  accueil: { nom: 'Bénédicte et son équipe', role: 'accueil et salle', source: 'site du restaurant' },
  chef: { nom: 'Raphaël Adam', role: 'chef', confirme: false },
};

export const histoire = {
  lieu: 'L’Essentiel s’installe dans une ancienne tannerie du XVIIe siècle, à Temploux. Maison de caractère, elle compte plusieurs salles, chacune avec son ambiance : table longue aux persiennes, mur de brique, arche et marbre noir.',
  accueil: 'Bénédicte et son équipe reçoivent dans ces salles. Le site du restaurant n’en dit pas davantage : l’année d’ouverture et le parcours de la maison ne sont pas publiés.',
  terrasse: 'La terrasse donne sur les jardins.',
  cuisine: 'La cuisine suit la saison : gibier du Pays à l’automne, poissons nobles, ris de veau, et un chariot de fromages affinés.',
};

/** Le retrait : ce que la maison enlève (mots biffés, microcopie du concept) et ce qui reste (faits du dossier). */
export const retrait = {
  biffes: ['le décor', 'l’effet', 'le détour', 'le bruit', 'la mode'],
  reste: ['la table', 'le produit', 'la saison'],
};
