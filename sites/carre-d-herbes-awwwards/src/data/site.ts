// Contenu de Carré d'herbes (variante awwwards « Un carré, des assiettes »).
// Sources : data/restaurants/carre-d-herbes/{dossier.md,donnees.json}. Hypothèses (aucune question posée) :
//  - l'e-mail est inconnu : aucun mailto:, la réservation passe par le téléphone et la page de contact du client ;
//  - GPS inconnu : pas de GeoCoordinates, le plan est un lien externe vers une recherche d'adresse ;
//  - les menus se vendent au menu (2, 3, 4, 5 assiettes), pas à la carte : les plats du menu n'ont pas de prix individuel ;
//  - la note Gault&Millau (13,5/20) vient de la fiche en ligne, non confirmée (Trouve Ton Resto affiche 14/20) ;
//  - les photos de plats du site client ne sont pas rattachées à un plat précis : alt neutres ;
//  - aucun contenu fictif n'est ajouté : tout est tiré du dossier (aucun `placeholder: true` requis).
export const site = {
  nom: "Carré d'herbes",
  baseline: 'Cuisine sincère et raffinée, entre Namur et Profondeville',
  description: "Restaurant gastronomique à Wépion, au bord de la Meuse : menus en deux à cinq assiettes, cuisine de saison faite maison, terrasse et parc. Réservation au 081 34 48 19.",
  typeCuisine: 'Cuisine raffinée de saison',
  telephone: '+3281344819',
  telephoneAffiche: '081 34 48 19',
  email: null as string | null,
  adresse: { rue: 'Chaussée de Dinant', numero: '780', cp: '5100', commune: 'Wépion', pays: 'BE' },
  plan: 'https://www.openstreetmap.org/search?query=Chauss%C3%A9e%20de%20Dinant%20780%2C%205100%20Wépion',
  reservationUrl: 'https://carredherbes.be/reservations/',
  siteClient: 'https://carredherbes.be',
  reseaux: [{ nom: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100092685321462' }],
  credit: "photos : Carré d'herbes",
};

/** Jours d'ouverture : service du midi et du soir (source : page Contact du site client). */
export const horaires = {
  jours: [
    { jour: 'Lundi', midi: null, soir: null },
    { jour: 'Mardi', midi: null, soir: null },
    { jour: 'Mercredi', midi: null, soir: null },
    { jour: 'Jeudi', midi: '12 h à 16 h', soir: '19 h à minuit' },
    { jour: 'Vendredi', midi: '12 h à 16 h', soir: '19 h à minuit' },
    { jour: 'Samedi', midi: '12 h à 16 h', soir: '19 h à minuit' },
    { jour: 'Dimanche', midi: '12 h à 16 h', soir: null },
  ] as { jour: string; midi: string | null; soir: string | null }[],
  derniereCommande: 'Dernière commande : 13 h 15 à midi, 20 h 15 le soir.',
  telephoneNote: 'Réservation par téléphone du mercredi au dimanche, dès 10 h.',
};

/** Le menu se compte en assiettes : le nombre de ronds du site vient d'ici. */
export const menus = [
  { assiettes: 2, nom: 'Lunch', prix: 38, accord: null as number | null, detail: 'Entrée et plat annoncés à l’oral selon l’inspiration du chef. 48 € avec un dessert commandé en début de repas. Les midis, et le jeudi soir sur réservation, sauf dimanche et jours fériés.' },
  { assiettes: 3, nom: 'Menu en trois assiettes', prix: 55, accord: 69, detail: 'Entrée, plat, dessert.' },
  { assiettes: 4, nom: 'Menu en quatre assiettes', prix: 68, accord: 89, detail: 'Deux entrées, plat, dessert.' },
  { assiettes: 5, nom: 'Menu en cinq assiettes', prix: 85, accord: 113, detail: 'Trois entrées, plat, dessert.' },
];
export const fromages = { supplement: 15, remplacement: 7 };

export type Plat = { nom: string; description: string; prix?: number | string; placeholder?: boolean };
/** Plats annoncés par le client sur son site (carte du moment, sans prix individuel). */
export const plats: { entrees: Plat[]; plats: Plat[]; desserts: Plat[]; supplements: Plat[] } = {
  entrees: [
    { nom: 'Foie gras', description: 'Foie gras de canard cuit au torchon, pommes Royal Gala, anguille fumée à la flamme, pain brioché au charbon végétal.' },
  ],
  plats: [
    { nom: 'Biche', description: 'Biche en deux préparations : le rôti cuit à basse température et la gigue confite en effilochée, focaccia, morbier, échalotes, carottes rolls, sauce à la Leffe brune.' },
  ],
  desserts: [
    { nom: 'Poire', description: 'Poire, crumble, fromage blanc, glace chocolat blanc et vanille, toffee miso.' },
    { nom: 'Dame blanche à notre façon', description: '' },
    { nom: 'Sabayon au Champagne', description: 'Gratiné, fruit et glace du moment.' },
    { nom: 'Île flottante revisitée', description: 'Marmelade de rhubarbe et framboises, crème anglaise vanillée.' },
  ],
  supplements: [
    { nom: 'Saint-Jacques', description: 'Os à moelle gratiné, noix de Saint-Jacques snackée, bœuf Aubrac fumé, huile verte au poireau, espuma tartufata.' },
    { nom: 'Ris de veau', description: 'Ris de veau croustillant, coque d’oignon, girolles, guanciale, crème d’Isigny, persil, Parmesan. Au menu en cinq assiettes.' },
    { nom: 'Poisson', description: 'Pêche du jour, farce fine aux herbes, trompettes de la mort, lard confit, céleri-rave, beurre nantais.' },
  ],
};

export const fetes = {
  noel: { titre: 'Noël au restaurant', quand: 'Le 25 décembre, à midi', prix: 68, note: 'Cinq services. Acompte de 40 € par personne. Accord mets-vins : 7 € le verre.' },
  emporter: {
    titre: 'À emporter pour Noël et le Nouvel An',
    quand: 'Retrait les 24 et 31 décembre',
    formules: [50, 60, 70],
    note: 'Une, deux ou trois entrées, un plat, un dessert. Commande par téléphone avant le 20 décembre (retrait le 24) ou avant le 27 décembre (retrait le 31).',
    plats: [
      { nom: 'Foie gras de canard cuit au torchon', prix: 22 },
      { nom: 'Tartelette de Saint-Jacques', prix: 22 },
      { nom: 'Ris de veau', prix: '22 ou 32' },
      { nom: 'Pêche du jour en papillote', prix: 28 },
      { nom: 'Biche ou canette', prix: 28 },
      { nom: 'Sablé « Petit Bateau »', prix: 10 },
    ] as { nom: string; prix: number | string }[],
  },
  bonCadeau: 'Bon cadeau : un chèque de valeur définie ou deux menus au choix, valable six mois sauf le samedi soir, retiré au restaurant.',
  regimes: 'Végétarien et allergies : à signaler à la réservation. Vegan et sans lactose : impossibles.',
};

export const equipe = [
  { nom: 'Damien Herbay', role: 'Au fourneau' },
  { nom: 'Anne-Sophie Gevaert-Herbay', role: 'En salle' },
];

export const histoire = {
  chef: 'Damien Herbay a fait son apprentissage sous la direction d’Éric Briffard, puis s’est perfectionné aux Forges du Pont d’Oye, à La Table des Guilloux et à L’Air du Temps. Il a ouvert les portes de sa propre maison.',
  nom: 'Le nom vient de trois choses : la tour carrée de la façade, le carré potager d’aromates, et le nom du chef, Herbay.',
  lieu: 'Une maison de bord de Meuse entièrement rénovée, un parc arboré de plus de 28 ares, une terrasse au calme, un parking privé de dix voitures.',
  cuisine: 'Tout ce qui est proposé à la dégustation est fait maison, avec des produits locaux de saison.',
  presse: 'Gault&Millau Belgique : 13,5 sur 20 d’après la fiche en ligne.',
};

export const photos = {
  plat: { src: '11-plat-assiette-noire', alt: 'Plat dressé sur une assiette noire texturée, le jardin en arrière-plan' },
  salle: { src: '01-salle-terrasse-vitree', alt: 'Salle lumineuse, grande table en bois et baie vitrée sur le parc' },
  voutes: { src: '02-salle-table-voutes', alt: 'Salle avec grande table dressée, arches en bois et mur de brique blanchie' },
  piano: { src: '03-salle-piano', alt: 'Salle claire, table en bois et fenêtres, vue d’ensemble' },
  brique: { src: '04-salle-mur-brique', alt: 'Table dressée devant le mur de brique et les arches en bois' },
  parc: { src: '05-parc-potager', alt: 'Parc arboré et carré potager de plantes aromatiques' },
  facade: { src: '06-facade-maison', alt: 'Façade de la maison en brique rouge' },
  terrasse: { src: '07-terrasse-table', alt: 'Table de terrasse au bord du parc, fauteuils noirs' },
  bouches: { src: '12-mises-en-bouche', alt: 'Mises en bouche sur une planche en bois d’olivier' },
  dentelle: { src: '13-plat-dentelle', alt: 'Plat vert sur une tuile en dentelle, assiette blanche texturée' },
  volaille: { src: '14-plat-volaille', alt: 'Cuisse et filet de volaille, sauce et légumes sur une assiette blanche' },
  poivre: { src: '16-cuisine-poivre', alt: 'Cuisinier en veste blanche moulant du poivre sur un plan de travail' },
  dressage: { src: '17-dressage', alt: 'Une main dresse une assiette à la pince, à la passe' },
  sapin: { src: '18-dessert-sapin-macarons', alt: 'Dessert de fêtes en forme de sapin de macarons sous cloche' },
  emporter: { src: '19-traiteur-emporter', alt: 'Plats à emporter en barquettes et plat de viande' },
  entrees: { src: '20-entrees-assiettes', alt: 'Assiettes d’entrées dressées sur une table' },
};
