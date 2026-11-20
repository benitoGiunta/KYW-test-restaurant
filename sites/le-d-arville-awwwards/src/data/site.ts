// Contenu du D’Arville (data/restaurants/le-d-arville/donnees.json + dossier.md, recherche du 20/11/2026).
// HYPOTHÈSES (aussi listées dans RAPPORT.md) :
//  - Heures de service non publiées : jamais écrites ; seuls les jours et « midi » / « soir » sont affichés.
//  - Aucun avis, note, distinction ni abonné affiché (Gault&Millau, Tripadvisor : sourcés mais variables, laissés de côté).
//  - Prix des desserts absents du site client : non affichés (ils sont inclus dans les menus).
//  - Contenu et prix du menu « Bon Plan » inconnus : cité comme tel, sans détail.
//  - Distances : seul le chiffre « 200 mètres » entre restaurant et villa Barabas est sourcé (dossier.md).
//  - Aucun contenu fictif n'est inséré : `placeholder: true` n'est porté par aucun élément à ce stade.
const nbsp = ' ';
export const eur = (n: number) => `${String(n).replace('.', ',')}${nbsp}€`;

export const site = {
  nom: 'Le D’Arville',
  nomJsonLd: 'Le D\'Arville',
  baseline: 'Restaurant gastronomique',
  typeCuisine: 'Gastronomique de saison',
  description:
    'Le D’Arville, restaurant gastronomique dans une ferme du 19e siècle à Wierde, près de Namur : cuisine de saison, homard du vivier, terrasse sur l’étang.',
  adresse: { rue: 'Rue d’Arville', numero: '94', cp: '5100', commune: 'Wierde (Namur)', pays: 'BE' },
  geo: { lat: 50.41238, lon: 4.95854 },
  telephone: '+32 81 46 23 65',
  telephoneAffiche: '081 46 23 65',
  email: 'info@ledarville.be',
  reservationUrl: 'https://www.ledarville.be/reservation/',
  planUrl: 'https://www.google.com/maps/search/?api=1&query=50.41238,4.95854',
  siteClient: 'https://www.ledarville.be',
  carteVinsUrl: 'https://www.ledarville.be/menus-et-carte/',
  reseaux: [
    { nom: 'Facebook, le restaurant', url: 'https://www.facebook.com/ledarville/' },
    { nom: 'Facebook, la villa Barabas', url: 'https://www.facebook.com/LaSuiteDuDArville/' },
  ],
  distanceBarabas: 200,
  barabas: { rue: 'Rue de Barabas', numero: '81' },
};

// Jours d'ouverture : site officiel (18/11/2026). Heures non publiées.
export const jours = [
  { jour: 'Lundi', service: null },
  { jour: 'Mardi', service: null },
  { jour: 'Mercredi', service: null },
  { jour: 'Jeudi', service: 'soir' },
  { jour: 'Vendredi', service: 'midi et soir' },
  { jour: 'Samedi', service: 'midi et soir' },
  { jour: 'Dimanche', service: 'midi' },
] as const;
export const joursSchema = { Thursday: 'jeudi', Friday: 'vendredi', Saturday: 'samedi', Sunday: 'dimanche' };

// La balade : l'ordre réel du service des deux menus.
export const balade = {
  nom: 'Balade',
  prix: 90,
  accord: 50,
  haltes: [
    { etape: 'Pour commencer', plat: 'Quatre mises en bouche', detail: null },
    { etape: 'Première entrée', plat: 'Noix de Saint-Jacques rôties', detail: 'feuilleté, duxelles de champignons, émulsion de cèpes' },
    { etape: 'Deuxième entrée', plat: 'Carpaccio de biche', detail: 'texture de foie gras de canard, vinaigrette au jus de plume' },
    { etape: 'Troisième entrée', plat: 'Noix de ris de veau croustillantes', detail: 'wok de légumes, jus corsé au saté de Chine' },
    { etape: 'Le plat', plat: 'Le lièvre en deux préparations', detail: 'filet, purée de marrons, airelles, gratin de céleri-rave ; cuisses à la royal, sauce arlequin' },
    { etape: 'Pour finir', plat: 'Dessert de la carte', detail: null },
  ],
};
export const tendance = {
  nom: 'Tendance de saison',
  prix: 73,
  accord: 40,
  haltes: [
    { etape: 'Pour commencer', plat: 'Quatre mises en bouche', detail: null },
    { etape: 'Première entrée, au choix', plat: 'Saint-Jacques ou carpaccio de biche', detail: null },
    { etape: 'Deuxième entrée, au choix', plat: 'Quenelles de brochet ou ris de veau', detail: null },
    { etape: 'Le plat, au choix', plat: 'Maigre ou lièvre', detail: null },
    { etape: 'Pour finir', plat: 'Dessert de la carte', detail: null },
  ],
};

export type Plat = { nom: string; description: string; prix: number | null; placeholder?: boolean };
export const plats: { categorie: string; note?: string; plats: Plat[] }[] = [
  {
    categorie: 'Les entrées',
    note: 'Toutes à 30 €.',
    plats: [
      { nom: 'Noix de Saint-Jacques rôties', description: 'feuilleté, duxelles de champignons, émulsion de cèpes', prix: 30 },
      { nom: 'Quenelles de brochet', description: 'crabe royal, sauce Nantua', prix: 30 },
      { nom: 'Carpaccio de biche', description: 'texture de foie gras de canard, vinaigrette au jus de plume', prix: 30 },
      { nom: 'Noix de ris de veau croustillantes', description: 'wok de légumes, jus corsé au saté de Chine', prix: 30 },
      { nom: 'Escalope de foie gras de canard rôtie', description: 'cerise Amarena, pain d’épices, jus corsé', prix: 30 },
    ],
  },
  {
    categorie: 'Les plats',
    plats: [
      { nom: 'Le homard en direct de notre vivier', description: 'servi en deux assiettes', prix: 70 },
      { nom: 'Sole meunière', description: 'servie en filets, pommes de terre tournées, beurre citron et herbes fraîches', prix: 55 },
      { nom: 'Maigre cuit sur la peau', description: 'blanc de poireau, sauce crème à la truffe, mousseline de pommes de terre au mascarpone', prix: 40 },
      { nom: 'Filet de bœuf au poivre concassé', description: 'crème à l’armagnac, frites, salade gourmande', prix: 40 },
      { nom: 'Le lièvre en deux préparations', description: 'filet, purée de marrons, airelles, gratin de céleri-rave ; cuisses à la royal, sauce arlequin', prix: 40 },
    ],
  },
  {
    categorie: 'Les desserts',
    note: 'Prix non affichés par le restaurant ; ils sont compris dans les menus.',
    plats: [
      { nom: 'Moelleux au chocolat des Caraïbes', description: 'autour de l’ananas et du fruit de la passion', prix: null },
      { nom: 'La dame blanche tournée à la minute', description: 'chocolat croquant', prix: null },
      { nom: 'Trompe-l’œil « By Noa »', description: 'le citron, glace au chocolat blanc Yvoir', prix: null },
      { nom: 'Notre île flottante', description: 'glace au lait d’amande', prix: null },
    ],
  },
];
export const fromages = {
  nom: 'Chariot de fromages affinés',
  description: 'fromages de nos régions, de France et d’ailleurs, accord mets-vin, salade et petit pain',
  prix: 22,
  enRemplacementDuDessert: 17,
};
export const autresMenus = [
  { nom: 'Menu enfant', prix: 28, description: 'Entrée (fondu au parmesan ou scampis à la crème), plat (filet de volaille ou cabillaud), dessert (salade de fruits ou dame blanche).' },
];
export const boissons = [
  { nom: 'Eaux aromatisées', prix: 4, note: 'le verre' },
  { nom: 'Kombucha', prix: 4.5, note: 'le verre' },
];

export const equipe = [
  { nom: 'Olivier Bourguignon', role: 'Chef et propriétaire' },
  { nom: 'Estelle', role: 'Co-propriétaire' },
];

export const histoire = {
  titre: 'Une ferme, une prairie, une villa',
  paragraphes: [
    'Estelle et Olivier ont fait naître le restaurant dans une ferme du 19e siècle, à Wierde, sur la route d’Arville. Les briques sont restées, le cadre est devenu contemporain : un salon, une table d’hôte, une cuisine ouverte, une terrasse, un jardin et un point d’eau.',
    'La villa Barabas est venue ensuite, à 200 mètres. Entre les deux, ils ont acquis la prairie : le domaine compte aujourd’hui plus de 5 hectares. Selon l’affiche du restaurant, le D’Arville a 20 ans.',
    'Un gîte équestre, « les filles d’à côté », est né de la même histoire, avec Nathalie Maroy.',
  ],
};

export const barabas = {
  intro: 'Suites et chambres à thèmes, piscine chauffée, petit-déjeuner à 18 € par personne et room service jusqu’à 23 h.',
  chambres: ['Suite Glamour', 'Suite Orientale', 'Suite à la française', 'Chambre Zen', 'Chambre Aux pommes'],
  petitDej: 18,
};

export const pratique = [
  { titre: 'Y venir', texte: 'Rue d’Arville 94, à Wierde, commune de Namur. Un parking privé accueille les voitures.' },
  { titre: 'Groupes', texte: 'Au-delà de 6 personnes, le restaurant demande de l’appeler ou de lui écrire.' },
  { titre: 'Offrir', texte: 'Le chèque cadeau, le traiteur de fêtes et les séminaires à la villa Barabas se demandent au restaurant.' },
];

export const congesIntro = 'Fermetures annoncées pour 2027 : du 1er au 6 janvier, du 26 avril au 5 mai, du 16 août au 1er septembre, du 20 au 31 décembre (service traiteur).';
