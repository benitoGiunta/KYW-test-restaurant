// Contenu de Pépite, cave à manger. Source : data/restaurants/pepite/ (donnees.json, dossier.md).
// Hypothèses : (1) fondation 2017 (presse : Le Vif, Juliette & Victor), la fiche Mapstr « 2023 » est écartée ;
// (2) téléphone 0476/620182 (site actuel) ; 081/22 91 81 (annuaires) non repris ; (3) prix des assiettes à la carte,
// carte des vins, équipe actuelle : inconnus, rien d'inventé : seul le menu affiché du 12 au 14 novembre 2026 est publié ;
// (4) réservation : lien vers le site du client (outil Tablebooker ou Zenchef à confirmer), pas de formulaire.
// Aucun champ placeholder : tout vient du dossier.
export const site = {
  nom: 'Pépite, cave à manger',
  court: 'Pépite',
  baseline: 'Cave à manger',
  description: 'Pépite, cave à manger au 44 rue Notre-Dame à Namur : assiettes à partager, vins d’auteurs élaborés dans le respect du vivant, boutique et soirées aux bougies.',
  typeCuisine: 'Assiettes à partager, vins d’auteurs',
  adresse: { rue: 'Rue Notre-Dame', numero: '44', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.4601105, lon: 4.8665145 },
  telephoneLisible: '0476 62 01 82',
  telephoneHref: 'tel:+32476620182',
  email: 'catherine.mathieu@me.com',
  siteClient: 'https://pepite-caveamanger.be/',
  planUrl: 'https://www.openstreetmap.org/?mlat=50.4601105&mlon=4.8665145#map=18/50.4601105/4.8665145',
  reseaux: [
    { nom: 'Instagram', url: 'https://www.instagram.com/pepitecaveamanger/' },
    { nom: 'Facebook', url: 'https://www.facebook.com/Pépite-cave-à-manger-248386248950963/' },
  ],
  fondatrice: 'Catherine Mathieu',
  ouverture: 2017,
};

// Jours ouverts : boutique et cave à manger. `en` sert au JSON-LD.
export const horaires = [
  { jour: 'Jeudi', en: 'Thursday', boutique: 'dès 16 h', cave: 'dès 19 h' },
  { jour: 'Vendredi', en: 'Friday', boutique: 'dès 16 h', cave: 'dès 19 h' },
  { jour: 'Samedi', en: 'Saturday', boutique: 'dès 10 h 30', cave: 'dès 19 h' },
];
export const fermes = 'Fermé du dimanche au mercredi. Samedi midi et privatisation sur demande.';

export const semaine = { libelle: 'Du jeudi 12 au samedi 14 novembre 2026', prix: 58, prixTexte: '58 €' };

// Menu 5 services affiché sur le site actuel (dégustable tel quel ou à l’assiette).
export const plats = [
  { nom: 'Les incontournables', description: 'Sardines Papa Anzoi, caponata siciliana', categorie: 'menu' },
  { nom: 'Betterave, grenade, feta', description: null, categorie: 'menu' },
  { nom: 'Potimarron rôti', description: 'Noisettes et beurre noisette, câpres, sauge, parmesan', categorie: 'menu' },
  { nom: 'Poulet confit au fenouil et clémentine', description: 'Grenailles à l’origan, version végétale possible', categorie: 'menu' },
  { nom: 'Pomme au four', description: 'Glace spéculoos, toffee', categorie: 'menu' },
] as { nom: string; description: string | null; categorie: string; placeholder?: boolean }[];
export const supplements = [{ nom: 'Assortiment de fromages', description: 'En supplément', prix: '12 €' }];
export const boissons = [
  { nom: 'Vin au verre', description: 'Vins d’auteurs, élaborés dans le respect du vivant', prix: 'de 5,50 à 12,50 €' },
  { nom: 'Djîn, gin de Sang Hoon Degeimbre', description: 'Bouteille de 500 ml', prix: '45 €' },
];

export const histoire = [
  'Pépite ouvre en 2017 au 44 rue Notre-Dame, dans les murs de Cuisinémoi, l’ancien restaurant de Catherine Mathieu. Elle y installe une cave à manger : une boutique de vins et une salle où l’on choisit des assiettes à partager.',
  'Les vins sont des vins d’auteurs, élaborés dans le respect du vivant. La presse de l’époque l’a résumé d’une formule : ici, pas de menu, mais un tableau.',
  'Depuis, la cave voûtée accueille aussi des soirées à la bougie, sans gaz ni électricité, que Le Vif a racontées en 2022.',
];
export const citation = {
  texte: 'Partager et Se Sentir Bien sont les mots qui ont résonné en moi lors de la création de ce lieu.',
  auteur: 'Catherine Mathieu, fondatrice',
};
export const presse = [
  { media: 'Le Vif', titre: 'Pépite, la sensation namuroise du moment', date: 'juillet 2017' },
  { media: 'So Soir', titre: 'Ici pas de menu, mais un tableau', date: 'septembre 2017' },
  { media: 'Chef Magazine', titre: 'Pépite, le vin en partage', date: 'janvier-février 2018' },
  { media: 'Le Vif', titre: 'Trois soirs par mois, menu 100 % sans gaz ni électricité à la bougie', date: 'novembre 2022' },
];
export const colis = 'Chou, Chouchou & Chou Chéri : les trois sélections de vins, aussi proposées en colis cadeaux.';
