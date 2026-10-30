// Tout le contenu du site vit ici. Source : data/restaurants/<slug>/donnees.json et photos/index.json.
// Les trous des données réelles sont comblés par des données fictives marquées `placeholder: true` :
// un gabarit les affiche, la revue les signale, le client les remplace.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean }
export interface Membre { nom: string; role: string; photo?: string; placeholder: boolean }
export interface Avis { texte: string; auteur: string; source: string; date: string; note?: number; placeholder: boolean }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }

export interface Restaurant {
  slug: string;
  nom: string;
  baseline: string;
  description: string; // meta description par défaut (50 à 160 caractères)
  url: string; // site actuel du client
  typeCuisine: string; // schema.org servesCuisine
  adresse: { rue: string; numero: string; cp: string; commune: string; pays: string };
  geo: { lat: number; lon: number };
  telephone: string; // format international
  email: { valeur: string; placeholder: boolean };
  reservation: { outil: string; url: string };
  horaires: Horaire[];
  reseaux: Reseau[];
  carte: Categorie[];
  menus: Menu[];
  histoire: string[]; // un paragraphe par entrée
  equipe: Membre[];
  avis: Avis[];
  photos: Photo[];
  valeurs: string[];
}

const photo = (src: string, alt: string, largeur: number, hauteur: number): Photo => ({ src, alt, largeur, hauteur, placeholder: false });

export const site: Restaurant = {
  slug: 'les-potes-au-feu',
  nom: 'Les Potes au Feu',
  baseline: "Bistronomie à Namur. L'histoire d'une rencontre, celle de deux potes passionnés.",
  description:
    'Les Potes au Feu, restaurant bistronomique à Namur : cuisine à quatre mains, menu unique de saison, produits locaux et fait maison, servi par les chefs.',
  url: 'https://www.lespotesaufeu.be',
  typeCuisine: 'Cuisine française moderne, bistronomie',
  adresse: { rue: 'Avenue de la Plante', numero: '4', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.4586737, lon: 4.8643452 },
  telephone: '+32 81 64 04 44',
  email: { valeur: 'bonjour@lespotesaufeu.be', placeholder: true },
  reservation: { outil: 'Zenchef', url: 'https://bookings.zenchef.com/results?rid=379477' },
  horaires: [
    { jour: 'lundi', creneaux: [{ ouverture: '19:00', fermeture: '21:00' }] },
    { jour: 'mardi', creneaux: [{ ouverture: '19:00', fermeture: '21:00' }] },
    { jour: 'mercredi', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:00', fermeture: '21:00' }] },
    { jour: 'jeudi', creneaux: [{ ouverture: '19:00', fermeture: '21:00' }] },
    { jour: 'vendredi', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:00', fermeture: '21:00' }] },
    { jour: 'samedi', creneaux: [], note: 'fermé, privatisation possible' },
    { jour: 'dimanche', creneaux: [], note: 'fermé' },
  ],
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/lespotesaufeu.bistronomie/' },
    { nom: 'YouTube', url: 'https://www.youtube.com/watch?v=dZtMOajOefE' },
  ],
  carte: [
    {
      categorie: 'Menu dégustation unique 4 services, 67 € (du lundi au vendredi soir)',
      plats: [
        { nom: 'Mises en bouche', description: '', prix: null, placeholder: false },
        { nom: 'Légumes racines / Champignons / Noix', description: '', prix: null, placeholder: false },
        { nom: 'Saint-Jacques / Butternut / Passion', description: '', prix: null, placeholder: false },
        { nom: 'Boeuf confit / Carottes / Cromesquis de pommes de terre', description: '', prix: null, placeholder: false },
        { nom: 'Soufflé au caramel / Chaï / Poire', description: '', prix: null, placeholder: false },
        { nom: 'Mignardise', description: '', prix: null, placeholder: false },
        { nom: 'Fromage à la place du dessert', description: 'supplément', prix: '+7 €', placeholder: false },
        { nom: 'Fromage avant le dessert', description: 'supplément', prix: '+15 €', placeholder: false },
      ],
    },
    {
      categorie: 'Options',
      plats: [
        { nom: 'Menu végétarien', description: 'sur demande', prix: null, placeholder: false },
        { nom: 'Adaptation allergies et intolérances', description: 'à signaler lors de la réservation', prix: null, placeholder: false },
      ],
    },
    {
      categorie: 'Boissons',
      plats: [
        { nom: 'Accord mets et vins, 4 verres', description: 'sélection de vignerons belges et français', prix: '32 €', placeholder: true },
        { nom: 'Cocktail de la maison', description: 'au bar, avant le service', prix: '12 €', placeholder: true },
      ],
    },
  ],
  menus: [
    {
      nom: 'Menu dégustation unique 4 services',
      prix: '67 €',
      description:
        'Du lundi au vendredi soir. Mises en bouche, Légumes racines / Champignons / Noix, Saint-Jacques / Butternut / Passion, Boeuf confit / Carottes / Cromesquis de pommes de terre, Soufflé au caramel / Chaï / Poire, Mignardise. Fromage à la place du dessert +7 €, avant le dessert +15 €.',
      placeholder: false,
    },
    { nom: 'Formule 3 services (le midi)', prix: '52 €', description: 'Formule 3 services à choix multiples inspirée des produits du moment.', placeholder: false },
    {
      nom: 'Lunch (entrée-plat ou plat-dessert)',
      prix: '40 €',
      description: "Proposé en fonction des envies des chefs et servi à l'ensemble de la table ; composition sur demande par téléphone.",
      placeholder: false,
    },
    { nom: 'Bon cadeau', prix: '50 / 75 / 100 / 150 €', description: 'Demande en ligne, retrait au restaurant.', placeholder: false },
  ],
  histoire: [
    "Les Potes au Feu, c'est d'abord l'histoire d'une rencontre. Il y a quatorze ans, François Schepens et Damien Gorjanec aiguisent leurs premiers couteaux au restaurant la Plage d'Amée à Namur : deux gamins pleins d'envie, le début d'une amitié.",
    "François continue ses classes aux États-Unis et à Montréal, Damien se fait une place en Belgique et cumule des expériences à l'étranger, notamment à Shanghai. À chaque retrouvaille, autour d'un verre, le rêve d'ouvrir un restaurant se dessine.",
    "Début de l'hiver 2019, installés par hasard à une table de ce lieu, ils ne savent pas encore qu'ils y ouvriront leur premier restaurant. Trois mois plus tard, ils en ont les clés.",
    "Le concept : une cuisine bistronomique à quatre mains, de qualité, avec un ancrage local, et un mot d'ordre, le plaisir. Ils servent eux-mêmes leurs plats et expliquent leur démarche à table, dans une atmosphère décontractée qui ne se la raconte pas.",
  ],
  equipe: [
    { nom: 'Damien Gorjanec', role: 'Chef et co-propriétaire', photo: '/photos/chef-damien.webp', placeholder: false },
    { nom: 'François Schepens', role: 'Chef et co-propriétaire', photo: '/photos/chef-francois.webp', placeholder: false },
    { nom: 'Sara', role: 'Salle et bar', placeholder: true },
    { nom: 'Jordan', role: 'Salle', placeholder: true },
  ],
  avis: [
    {
      texte: "Un restaurant décontracté qui swingue sur tous les plans. Le plaisir déborde de l'assiette !",
      auteur: 'Inspecteur du Guide MICHELIN',
      source: 'Guide MICHELIN Belgique 2026',
      date: '2026-05-04',
      placeholder: false,
    },
    {
      texte: 'Les chefs viennent eux-mêmes présenter chaque assiette. Le boeuf confit est une merveille, et on repart avec le sourire.',
      auteur: 'Claire D.',
      source: 'Avis Google',
      date: '2026-03-18',
      note: 5,
      placeholder: true,
    },
    {
      texte: 'Menu unique, zéro hésitation, que du plaisir. Le cadre est chaleureux et le service aussi simple que précis.',
      auteur: 'Thomas V.',
      source: 'Avis Google',
      date: '2026-02-02',
      note: 5,
      placeholder: true,
    },
  ],
  photos: [
    photo('/photos/chef-damien.webp', 'Damien Gorjanec en cuisine, tablier noir devant la hotte rouge', 1351, 1800),
    photo('/photos/chef-francois.webp', 'François Schepens en cuisine, tablier noir devant la hotte rouge', 1351, 1800),
    photo('/photos/equipe-trio.webp', "L'équipe riant sur une banquette autour d'une table en chêne", 800, 725),
    photo('/photos/dessert-tarte-pomme.webp', 'Rosace de pommes, glace et éclats de tuile, vue de dessus', 800, 725),
    photo('/photos/plat-tartare.webp', 'Tartare de boeuf, roquette et tuiles sur assiette noire', 550, 825),
    photo('/photos/plat-saint-jacques.webp', 'Saint-Jacques snackées, mousseline et tuile noire sur assiette bleue', 550, 825),
    photo('/photos/salle-bar-panoramique.webp', 'Le bar vert sombre et une table haute dressée, vue sur la cuisine', 1800, 468),
    photo('/photos/salle-ampoules.webp', 'Ampoules à filament suspendues devant une étagère en bois', 1140, 642),
    photo('/photos/salle-clients-bar.webp', 'Clients attablés au bar, Damien en salle sous les ampoules chaudes', 1140, 642),
    photo('/photos/bar-cocktails.webp', 'Deux cocktails rouges dosés au bar', 1140, 642),
    photo('/photos/cuisine-francois-poele.webp', 'François poêle en main, Damien penché au premier plan', 1140, 642),
    photo('/photos/service-planche.webp', 'Une planche de viande portée vers la salle', 1140, 642),
    photo('/photos/cuisine-salage-viande.webp', 'Une main sale une pièce de viande tranchée', 1140, 642),
    photo('/photos/cuisine-chefs-dressage.webp', 'Les deux chefs concentrés au dressage sous les lampes chauffantes', 1140, 642),
    photo('/photos/service-frites.webp', 'Paniers de frites portés en salle, les chefs en arrière-plan', 1140, 642),
    photo('/photos/cuisine-chefs-passe.webp', 'Les deux chefs au passe, dressage des assiettes', 1140, 642),
    photo('/photos/service-sauce-table.webp', 'Sauce versée à la cuillère sur un plat, à table', 1140, 642),
    photo('/photos/service-francois-table.webp', 'François verse une sauce à table devant une cliente', 1140, 642),
    photo('/photos/portrait-damien-profil.webp', 'Damien de profil en clair-obscur, mains jointes', 1140, 642),
    photo('/photos/salle-banquette.webp', 'La salle de jour : banquette, coussins moutarde, lambris vert-gris', 1600, 1600),
    photo('/photos/cuisine-mains-pate.webp', 'Des mains travaillent une pâte sur une balance', 1600, 1600),
    photo('/photos/plat-boeuf-confit.webp', 'Boeuf confit, carottes et cromesquis sur assiette rouge', 1600, 1600),
  ],
  valeurs: [
    'Fait maison',
    'Produits des saisons',
    'Rencontre et convivialité',
    'Ancrage local : producteurs du coin, légumes cultivés localement',
    'Les chefs servent et expliquent leurs plats à table',
  ],
};

/** Photo par chemin (erreur explicite si le chemin n'existe pas : un gabarit ne doit pas pointer dans le vide). */
export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}

/** Adresse sur une ligne. */
export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;

/** Horaires lisibles : '12:00 à 14:00, 19:00 à 21:00' ou la note. */
export const horaireTexte = (h: Horaire) =>
  h.creneaux.length ? h.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(', ') : h.note || 'fermé';

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;

/* ------------------------------------------------------------------------------------------------
   Données propres au gabarit « Cahier ». Tout ce qui n'est pas vérifié est `placeholder: true`.
   ------------------------------------------------------------------------------------------------ */

export interface LigneSommaire { nom: string; prix: string | null; origine?: string; placeholder: boolean }
export interface CategorieSommaire { categorie: string; note?: string; lignes: LigneSommaire[] }
export interface Producteur { prenom: string; produit: string; village: string; photo: string; note: string; placeholder: boolean }
export interface FormuleTraiteur { nom: string; prix: string; description: string; minimum: string; placeholder: boolean }

export const cahier = {
  numero: 6,
  saison: 'automne 2026',
  /** Menu du jour : trois lignes tracées à la main (signature du gabarit). Fictif, daté. */
  menuDuJour: {
    date: '30 octobre',
    jour: 'jeudi',
    lignes: [
      { service: 'Entrée', texte: 'Velouté de potiron, noisettes du jardin', placeholder: true },
      { service: 'Plat', texte: 'Boudin de Namur, pommes et chicons', placeholder: true },
      { service: 'Dessert', texte: 'Tarte au sucre, crème crue', placeholder: true },
    ],
    prix: [
      { libelle: 'entrée et plat', prix: '28 €' },
      { libelle: 'les trois', prix: '34 €' },
    ],
    placeholder: true,
  },
  /** Sommaire de la carte : les plats réels du menu dégustation, puis des lignes illustratives avec origine. */
  sommaire: [
    {
      categorie: 'Le menu du moment',
      note: 'Menu unique 4 services, 67 €, du lundi au vendredi soir. Végétarien sur demande.',
      lignes: [
        { nom: 'Mises en bouche', prix: null, placeholder: false },
        { nom: 'Légumes racines, champignons, noix', prix: null, origine: 'racines de chez Mathieu, Wépion', placeholder: true },
        { nom: 'Saint-Jacques, butternut, passion', prix: null, origine: 'butternut de Bossière', placeholder: true },
        { nom: 'Boeuf confit, carottes, cromesquis de pommes de terre', prix: null, origine: 'boeuf de la ferme de Gesves', placeholder: true },
        { nom: 'Soufflé au caramel, chaï, poire', prix: null, origine: 'poires de Fernelmont', placeholder: true },
        { nom: 'Mignardise', prix: null, placeholder: false },
        { nom: 'Fromage à la place du dessert', prix: '+7 €', origine: 'fromages de Rochefort et de Maredsous', placeholder: true },
        { nom: 'Fromage avant le dessert', prix: '+15 €', placeholder: false },
      ],
    },
    {
      categorie: 'Le midi, formule 3 services',
      note: 'Mercredi et vendredi midi, 52 €. Lunch entrée-plat ou plat-dessert, 40 €.',
      lignes: [
        { nom: 'Oeuf parfait, champignons des bois, noisette', prix: null, origine: 'champignons de la Marlagne', placeholder: true },
        { nom: 'Tartare de boeuf au couteau, frites maison', prix: null, origine: 'boeuf de Gesves, pommes de terre de Floreffe', placeholder: true },
        { nom: 'Dos de lieu, beurre blanc, poireaux', prix: null, origine: 'poireaux de chez Mathieu, Wépion', placeholder: true },
        { nom: 'Rosace de pommes, glace vanille', prix: null, origine: 'pommes de Fernelmont', placeholder: true },
        { nom: 'Café et mignardise', prix: null, placeholder: true },
      ],
    },
    {
      categorie: 'La cave et le bar',
      lignes: [
        { nom: 'Accord mets et vins, 4 verres', prix: '32 €', origine: 'vignerons belges et français', placeholder: true },
        { nom: 'Cocktail de la maison', prix: '12 €', origine: 'servi au bar avant le service', placeholder: true },
        { nom: 'Bière de la brasserie du coin', prix: '5 €', origine: 'brassée à Namur', placeholder: true },
        { nom: 'Jus de pomme pressé', prix: '4 €', origine: 'pommes de Fernelmont', placeholder: true },
        { nom: 'Eau plate ou pétillante, 75 cl', prix: '6 €', placeholder: true },
      ],
    },
  ] as CategorieSommaire[],
  /** Six producteurs illustratifs (prénom et village seulement, pas de raison sociale). */
  producteurs: [
    { prenom: 'Mathieu', produit: 'légumes de plein champ', village: 'Wépion', photo: '/photos/cuisine-mains-pate.webp', note: 'les racines du menu, livrées le mardi', placeholder: true },
    { prenom: 'Anne et Luc', produit: 'boeuf élevé à l’herbe', village: 'Gesves', photo: '/photos/cuisine-salage-viande.webp', note: 'le boeuf confit vient de là', placeholder: true },
    { prenom: 'Pierre', produit: 'fromages affinés', village: 'Rochefort', photo: '/photos/plat-boeuf-confit.webp', note: 'le plateau du dessert', placeholder: true },
    { prenom: 'Sophie', produit: 'poires et pommes', village: 'Fernelmont', photo: '/photos/dessert-tarte-pomme.webp', note: 'cueillies à la main en octobre', placeholder: true },
    { prenom: 'La criée', produit: 'Saint-Jacques et poissons', village: 'Zeebrugge', photo: '/photos/plat-saint-jacques.webp', note: 'arrivage du jeudi', placeholder: true },
    { prenom: 'Jonas', produit: 'bières et jus', village: 'Namur', photo: '/photos/bar-cocktails.webp', note: 'la bière du bar', placeholder: true },
  ] as Producteur[],
  /** Carte postale du chef : texte à la première personne, tiré de l'histoire réelle. */
  postale: {
    signataire: 'Damien et François',
    lignes: [
      'Nous avons commencé ensemble il y a quatorze ans, à la Plage d’Amée. Deux gamins pleins d’envie.',
      'Ici, c’est un menu unique, quatre services, que nous venons vous présenter à table. Ce qui est dans l’assiette vient de près, et on vous dira de chez qui.',
      'Venez comme vous êtes. Le mot d’ordre, c’est le plaisir.',
    ],
    placeholder: false,
  },
  /** Page « Commander » : formules traiteur et événements, illustratives. */
  traiteur: [
    { nom: 'Le cahier à emporter', prix: '34 € par personne', description: 'Le menu du jour en trois services, préparé le matin, à retirer au restaurant entre 11 h et 12 h.', minimum: 'à partir de 2 personnes, commande la veille avant 16 h', placeholder: true },
    { nom: 'La table privatisée', prix: '67 € par personne', description: 'La salle pour vous, le samedi : menu dégustation 4 services servi par les chefs, accord mets et vins en option.', minimum: 'de 12 à 28 personnes', placeholder: true },
    { nom: 'Les potes chez vous', prix: 'sur devis', description: 'Les deux chefs en cuisine chez vous ou dans vos locaux, menu composé ensemble, produits de la saison.', minimum: 'à partir de 8 personnes, dans un rayon de 30 km', placeholder: true },
  ] as FormuleTraiteur[],
  /** Phrase d'équipe (les deux premières sont tirées du dossier, les autres sont illustratives). */
  equipePhrases: [
    'Aiguise ses couteaux depuis la Plage d’Amée. A cuisiné en Belgique et à Shanghai.',
    'A fait ses classes aux États-Unis et à Montréal. Vient vous expliquer l’assiette à table.',
    'Tient le bar et la salle. Connaît les vins par leur prénom.',
    'En salle le soir. Le premier à vous dire d’où vient le pain.',
  ],
};
