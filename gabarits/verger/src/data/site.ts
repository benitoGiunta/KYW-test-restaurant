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
        { nom: 'Bœuf confit / Carottes / Cromesquis de pommes de terre', description: '', prix: null, placeholder: false },
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
        'Du lundi au vendredi soir. Mises en bouche, Légumes racines / Champignons / Noix, Saint-Jacques / Butternut / Passion, Bœuf confit / Carottes / Cromesquis de pommes de terre, Soufflé au caramel / Chaï / Poire, Mignardise. Fromage à la place du dessert +7 €, avant le dessert +15 €.',
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
    "Les Potes au Feu, c'est d'abord l'histoire d'une rencontre. François Schepens et Damien Gorjanec aiguisent leurs premiers couteaux au restaurant la Plage d'Amée à Namur : deux gamins pleins d'envie, le début d'une amitié.",
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
      texte: 'Les chefs viennent eux-mêmes présenter chaque assiette. Le bœuf confit est une merveille, et on repart avec le sourire.',
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
    photo('/photos/plat-tartare.webp', 'Tartare de bœuf, roquette et tuiles sur assiette noire', 550, 825),
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
    photo('/photos/plat-boeuf-confit.webp', 'Bœuf confit, carottes et cromesquis sur assiette rouge', 1600, 1600),
    photo('/photos/plat-boeuf-confit-800.webp', 'Bœuf confit, carottes et cromesquis sur assiette rouge', 800, 800),
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

// ---------------------------------------------------------------------------------------------
// Données propres au gabarit « Verger ». Règle « une donnée, un drapeau » : chaque champ non prouvé par
// dossier.md / donnees.json porte son propre `placeholder: true` et une marque visible là où il s'affiche.
// ---------------------------------------------------------------------------------------------

export const mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

// Calendrier indicatif (savoir général, pas une donnée client). Un seul tableau de vérité : `mois` trié = mois de présence
// (légende de la roue, page saisons) ; `pic` = le mois où la vignette se pose sur la roue (un des `mois`).
export interface Ingredient { nom: string; pic: number; mois: number[]; placeholder: boolean }
export const ingredients: Ingredient[] = [
  { nom: 'Topinambour', pic: 1, mois: [1, 2, 12], placeholder: true },
  { nom: 'Chou kale', pic: 1, mois: [1, 2], placeholder: true },
  { nom: 'Poireau', pic: 2, mois: [1, 2, 11, 12], placeholder: true },
  { nom: 'Endive', pic: 2, mois: [1, 2], placeholder: true },
  { nom: 'Radis', pic: 3, mois: [3, 4], placeholder: true },
  { nom: 'Épinard', pic: 3, mois: [3, 4, 10], placeholder: true },
  { nom: 'Asperge', pic: 4, mois: [4, 5], placeholder: true },
  { nom: 'Rhubarbe', pic: 4, mois: [4, 5], placeholder: true },
  { nom: 'Petit pois', pic: 5, mois: [5, 6], placeholder: true },
  { nom: 'Fraise', pic: 5, mois: [5, 6], placeholder: true },
  { nom: 'Cerise', pic: 6, mois: [6, 7], placeholder: true },
  { nom: 'Fève', pic: 6, mois: [6, 7], placeholder: true },
  { nom: 'Courgette', pic: 7, mois: [7, 8], placeholder: true },
  { nom: 'Tomate', pic: 7, mois: [7, 8, 9], placeholder: true },
  { nom: 'Haricot vert', pic: 8, mois: [8, 9], placeholder: true },
  { nom: 'Mûre', pic: 8, mois: [8, 9], placeholder: true },
  { nom: 'Champignon', pic: 9, mois: [9, 10, 11], placeholder: true },
  { nom: 'Poire', pic: 9, mois: [9, 10], placeholder: true },
  { nom: 'Butternut', pic: 10, mois: [10, 11], placeholder: true },
  { nom: 'Noix', pic: 10, mois: [10, 11], placeholder: true },
  { nom: 'Carotte', pic: 11, mois: [10, 11], placeholder: true },
  { nom: 'Légumes racines', pic: 11, mois: [1, 11, 12], placeholder: true },
  { nom: 'Chou de Bruxelles', pic: 12, mois: [1, 12], placeholder: true },
  { nom: 'Pomme', pic: 12, mois: [10, 11, 12], placeholder: true },
];

/** Les 4 services du menu réel montrés autour de la roue. Le nom est réel (dossier) ; le menu est UNIQUE et n'est rattaché à
 *  aucun mois : `liaisonPlaceholder: true` interdit d'afficher un lien plat → ingrédient → mois (le calendrier est indicatif).
 *  La roue les présente comme « le menu actuel », jamais comme « le plat du mois ». */
export interface PlatDuMois { nom: string; service: string; ingredient: string; placeholder: boolean; liaisonPlaceholder: boolean }
export const platsDuMois: PlatDuMois[] = [
  { nom: 'Légumes racines / Champignons / Noix', service: 'Service 1', ingredient: 'Champignon', placeholder: false, liaisonPlaceholder: true },
  { nom: 'Saint-Jacques / Butternut / Passion', service: 'Service 2', ingredient: 'Butternut', placeholder: false, liaisonPlaceholder: true },
  { nom: 'Bœuf confit / Carottes / Cromesquis de pommes de terre', service: 'Service 3', ingredient: 'Carotte', placeholder: false, liaisonPlaceholder: true },
  { nom: 'Soufflé au caramel / Chaï / Poire', service: 'Service 4', ingredient: 'Poire', placeholder: false, liaisonPlaceholder: true },
];

/** Citations réelles (site du client, Guide MICHELIN) sur l'origine des produits. */
export const citations = [
  { texte: 'Légumes cultivés localement, associations originales et saveurs intenses sont au rendez-vous.', source: 'Guide MICHELIN Belgique 2026', placeholder: false },
  { texte: 'Ils soignent leurs relations avec les producteurs du coin qui leur fournissent des produits frais.', source: 'lespotesaufeu.be', placeholder: false },
  { texte: 'Un restaurant à l’image des Potes : bon, généreux et accueillant.', source: 'lespotesaufeu.be', placeholder: false },
];

/** Producteurs : INCONNUS dans le dossier. Six exemples pour montrer la mise en page ; tous illustratifs. */
export interface Producteur { nom: string; village: string; km: number; produit: string; placeholder: boolean }
export const producteurs: Producteur[] = [
  { nom: 'Ferme du Coteau', village: 'Wépion', km: 6, produit: 'Fraises et petits fruits', placeholder: true },
  { nom: 'Maraîchage des Sablières', village: 'Jambes', km: 3, produit: 'Légumes racines, choux', placeholder: true },
  { nom: 'Champignonnière du Rocher', village: 'Dave', km: 8, produit: 'Pleurotes, shiitakés', placeholder: true },
  { nom: 'Verger de la Marlagne', village: 'Wépion', km: 7, produit: 'Pommes, poires', placeholder: true },
  { nom: 'Élevage de la Houyoux', village: 'Gembloux', km: 18, produit: 'Bœuf, veau', placeholder: true },
  { nom: 'Moulin de Faulx', village: 'Faulx-les-Tombes', km: 14, produit: 'Farines, noix', placeholder: true },
];

/** Questions fréquentes : réponses prouvées par le dossier sauf drapeau. */
export interface Question { q: string; r: string; placeholder: boolean }
export const questions: Question[] = [
  { q: 'Allergies et intolérances ?', r: 'Le menu peut être adapté en cas d’allergie ou d’intolérance : signalez-le lors de votre réservation.', placeholder: false },
  { q: 'Un menu végétarien ?', r: 'Oui, un menu végétarien est possible sur demande.', placeholder: false },
  { q: 'Comment réserver pour plus de six personnes ?', r: 'Pour une table de plus de six personnes ou une réservation de dernière minute, appelez le restaurant.', placeholder: false },
  { q: 'Peut-on privatiser le restaurant ?', r: 'Le samedi, le restaurant peut être privatisé : mariage, repas de famille, chef à domicile.', placeholder: false },
  { q: 'Les enfants sont-ils les bienvenus ?', r: 'Réponse à compléter par le restaurant (exemple : les enfants sont les bienvenus, le menu peut être réduit sur demande).', placeholder: true },
  { q: 'Offrir un repas ?', r: 'Des bons cadeaux de 50, 75, 100 et 150 € se demandent en ligne et se retirent au restaurant.', placeholder: false },
];

/** Quatre saisons : ingrédients (calendrier indicatif) et un EXEMPLE de carte par saison. Seul le menu actuel (/carte/) est réel : le restaurant sert un menu unique de saison, pas une carte par saison. */
export interface Saison { nom: string; mois: number[]; plats: Plat[] }
const ex = (nom: string): Plat => ({ nom, description: '', prix: null, placeholder: true });
export const saisons: Saison[] = [
  { nom: 'Printemps', mois: [3, 4, 5], plats: ['Asperges blanches / Œuf parfait / Oseille', 'Radis / Beurre fumé / Pain de seigle', 'Agneau / Petits pois / Menthe', 'Truite / Rhubarbe / Aneth', 'Fromage frais / Fèves / Herbes', 'Fraises / Sureau / Lait ribot'].map(ex) },
  { nom: 'Été', mois: [6, 7, 8], plats: ['Tomates / Burrata / Basilic', 'Courgette / Citron / Ricotta', 'Maquereau / Concombre / Raifort', 'Volaille / Haricots verts / Noisette', 'Cerises / Cacao / Vanille', 'Mûres / Miel / Sarrasin'].map(ex) },
  { nom: 'Automne', mois: [9, 10, 11], plats: ['Champignons / Noisette / Jaune d’œuf', 'Butternut / Sauge / Parmesan', 'Chevreuil / Poire / Céleri', 'Canard / Chou / Raisin', 'Pomme / Caramel / Sarrasin', 'Noix / Café / Lait'].map(ex) },
  { nom: 'Hiver', mois: [12, 1, 2], plats: ['Topinambour / Truffe / Œuf', 'Endive / Orange / Noix', 'Chou de Bruxelles / Lard / Châtaigne', 'Bœuf / Légumes racines / Jus corsé', 'Poire / Chocolat / Fève tonka', 'Agrumes / Meringue / Thym'].map(ex) },
];
