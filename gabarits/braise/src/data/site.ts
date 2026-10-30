// Tout le contenu du site vit ici. Source : data/restaurants/les-potes-au-feu/donnees.json, dossier.md et photos/index.json.
// Les trous des données réelles sont comblés par des données fictives marquées `placeholder: true` :
// le gabarit les affiche, la revue les signale, le client les remplace.
//
// Hypothèses (toutes marquées placeholder) : e-mail de contact ; rôles de Sara et Jordan ; plats de la formule du midi
// et du lunch ; desserts hors soufflé, cerises (Michelin) et rosace de pommes ; accord mets et vins et cocktail ; deux avis
// clients ; nombre de couverts (28) et conditions de privatisation ; températures de cuisson du chapitre « cuisson » ;
// droits des trois photos reprises de la fiche Guide MICHELIN (à confirmer avant mise en ligne).

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean; photo?: string }
export interface Categorie { categorie: string; plats: Plat[]; service?: 'midi' | 'soir' | 'desserts'; note?: string }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean }
export interface Membre { nom: string; role: string; photo?: string; placeholder: boolean; phrase?: string }
export interface Avis { texte: string; auteur: string; source: string; date: string; note?: number; placeholder: boolean }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean; legende?: string }
export interface Reseau { nom: string; url: string }
export interface Couche { id: string; nom: string; detail: string; temp: number; src: string; placeholder: boolean }

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
  bonCadeau: { url: string; montants: string };
  horaires: Horaire[];
  reseaux: Reseau[];
  carte: Categorie[];
  menus: Menu[];
  histoire: string[]; // un paragraphe par entrée
  equipe: Membre[];
  avis: Avis[];
  photos: Photo[];
  valeurs: string[];
  manifeste: { avant: string; motCle: string; apres: string };
  cuisson: { plat: string; intro: string; couches: Couche[] };
  privatisation: { couverts: { valeur: number; placeholder: boolean }; formules: { nom: string; texte: string; placeholder: boolean }[] };
  colophon: string[];
}

const photo = (src: string, alt: string, largeur: number, hauteur: number, legende?: string, placeholder = false): Photo => ({ src, alt, largeur, hauteur, placeholder, legende });

export const site: Restaurant = {
  slug: 'les-potes-au-feu',
  nom: 'Les Potes au Feu',
  baseline: 'Bistronomie à quatre mains, au bord de la Meuse. Un menu unique, servi par les chefs.',
  description:
    'Les Potes au Feu, restaurant bistronomique à Namur : cuisine à quatre mains, menu unique de saison, produits locaux et fait maison, servi par les chefs.',
  url: 'https://www.lespotesaufeu.be',
  typeCuisine: 'Cuisine française moderne, bistronomie',
  adresse: { rue: 'Avenue de la Plante', numero: '4', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.4586737, lon: 4.8643452 },
  telephone: '+32 81 64 04 44',
  email: { valeur: 'bonjour@lespotesaufeu.be', placeholder: true },
  reservation: { outil: 'Zenchef', url: 'https://bookings.zenchef.com/results?rid=379477' },
  bonCadeau: { url: 'https://www.lespotesaufeu.be/page/bon-cadeau-en-ligne.html', montants: '50, 75, 100 ou 150 €' },
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
      categorie: 'Le soir, menu dégustation en quatre services',
      service: 'soir',
      note: 'Du lundi au vendredi soir, 67 € par personne. Un menu végétarien est possible sur demande ; signalez vos allergies à la réservation.',
      plats: [
        { nom: 'Mises en bouche', description: '', prix: null, placeholder: false },
        { nom: 'Légumes racines, champignons, noix', description: '', prix: null, placeholder: false },
        { nom: 'Saint-Jacques, butternut, passion', description: 'Snackées, mousseline et tuile noire', prix: null, placeholder: false, photo: '/photos/plat-saint-jacques.webp' },
        { nom: 'Boeuf confit, carottes, cromesquis', description: 'Cromesquis de pommes de terre', prix: null, placeholder: false, photo: '/photos/plat-boeuf-confit.webp' },
        { nom: 'Soufflé au caramel, chaï, poire', description: '', prix: null, placeholder: false },
        { nom: 'Mignardise', description: '', prix: null, placeholder: false },
      ],
    },
    {
      categorie: 'Le midi, formule et lunch',
      service: 'midi',
      note: 'Les mercredis et vendredis midi : formule trois services à choix multiples (52 €) ou lunch entrée-plat ou plat-dessert (40 €), servi à toute la table. Exemples de plats, à confirmer chaque semaine par les chefs.',
      plats: [
        { nom: 'Tartare de boeuf, tuiles, roquette', description: 'Taillé au couteau, condiment du moment', prix: '52 €', placeholder: true, photo: '/photos/plat-tartare.webp' },
        { nom: 'Velouté de courge, noisettes torréfiées', description: 'Crème crue, huile de noisette', prix: '52 €', placeholder: true },
        { nom: 'Lieu jaune, poireaux, beurre blanc', description: 'Poireaux grillés, beurre blanc au cidre', prix: '52 €', placeholder: true },
        { nom: 'Volaille fermière, jus de rôti, légumes racines', description: 'Suprême rôti, racines glacées', prix: '52 €', placeholder: true },
        { nom: 'Lunch entrée et plat', description: 'Composition du jour, servie à toute la table', prix: '40 €', placeholder: true },
        { nom: 'Lunch plat et dessert', description: 'Composition du jour, servie à toute la table', prix: '40 €', placeholder: true },
      ],
    },
    {
      categorie: 'Desserts et fromages',
      service: 'desserts',
      note: 'Le dessert du menu change avec la saison. Fromage à la place du dessert +7 €, avant le dessert +15 €.',
      plats: [
        { nom: 'Soufflé au caramel, chaï, poire', description: 'Le dessert du menu du soir', prix: null, placeholder: false },
        { nom: 'Cerises noires et griottes, crumble de cacao', description: 'Glace vanille au lait cru, le dessert cité par le Guide MICHELIN', prix: null, placeholder: false },
        { nom: 'Rosace de pommes, glace, éclats de tuile', description: '', prix: null, placeholder: false, photo: '/photos/dessert-tarte-pomme.webp' },
        { nom: 'Chocolat, sarrasin, fleur de sel', description: 'Crémeux, tuile de sarrasin soufflé', prix: null, placeholder: true },
        { nom: 'Fromage', description: 'À la place du dessert ou avant le dessert', prix: '+7 € ou +15 €', placeholder: false },
        { nom: 'Mignardise et café', description: 'Avec le café ou l’infusion', prix: null, placeholder: true },
      ],
    },
    {
      categorie: 'Boissons',
      plats: [
        { nom: 'Accord mets et vins, quatre verres', description: 'Vignerons belges et français', prix: '32 €', placeholder: true },
        { nom: 'Cocktail de la maison', description: 'Au bar, avant le service', prix: '12 €', placeholder: true },
      ],
    },
  ],
  menus: [
    {
      nom: 'Menu dégustation, quatre services',
      prix: '67 €',
      description: 'Du lundi au vendredi soir. Mises en bouche, légumes racines, Saint-Jacques, boeuf confit, soufflé au caramel, mignardise.',
      placeholder: false,
    },
    { nom: 'Formule du midi, trois services', prix: '52 €', description: 'Les mercredis et vendredis midi, à choix multiples, inspirée des produits du moment.', placeholder: false },
    { nom: 'Lunch, entrée-plat ou plat-dessert', prix: '40 €', description: 'Selon les envies des chefs, servi à toute la table ; composition par téléphone.', placeholder: false },
  ],
  histoire: [
    "Les Potes au Feu, c'est d'abord l'histoire d'une rencontre. Il y a quatorze ans, François Schepens et Damien Gorjanec aiguisent leurs premiers couteaux au restaurant la Plage d'Amée, à Namur : deux gamins pleins d'envie, le début d'une amitié.",
    "François continue ses classes aux États-Unis et à Montréal, Damien se fait une place en Belgique et cumule des expériences à l'étranger, notamment à Shanghai. À chaque retrouvaille, autour d'un verre, le rêve d'ouvrir un restaurant se dessine.",
    "Début de l'hiver 2019, installés par hasard à une table de ce lieu, ils ne savent pas encore qu'ils y ouvriront leur premier restaurant. Trois mois plus tard, ils en ont les clés.",
    "Le concept : une cuisine bistronomique à quatre mains, de qualité, avec un ancrage local, et un mot d'ordre, le plaisir. Ils servent eux-mêmes leurs plats et expliquent leur démarche à table, dans une atmosphère décontractée qui ne se la raconte pas.",
  ],
  equipe: [
    { nom: 'Damien Gorjanec', role: 'Chef et co-propriétaire', photo: '/photos/chef-damien.webp', placeholder: false, phrase: 'De Namur à Shanghai, puis retour au bord de la Meuse.' },
    { nom: 'François Schepens', role: 'Chef et co-propriétaire', photo: '/photos/chef-francois.webp', placeholder: false, phrase: 'Formé aux États-Unis et à Montréal, revenu pour cuisiner avec son pote.' },
    { nom: 'Sara', role: 'Salle et bar', placeholder: true, phrase: 'La pétillante de l’équipe, au bar et en salle.' },
    { nom: 'Jordan', role: 'Salle', placeholder: true, phrase: 'Le service, du passe à votre table.' },
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
      source: 'avis illustratif',
      date: '2026-03-18',
      note: 5,
      placeholder: true,
    },
    {
      texte: 'Menu unique, zéro hésitation, que du plaisir. Le cadre est chaleureux et le service aussi simple que précis.',
      auteur: 'Thomas V.',
      source: 'avis illustratif',
      date: '2026-02-02',
      note: 5,
      placeholder: true,
    },
  ],
  photos: [
    photo('/photos/cuisine-chefs-passe.webp', 'Damien et François au passe, sous les lampes chauffantes, en plein dressage', 1140, 642, 'Le passe, 19 h 30'),
    photo('/photos/chef-damien.webp', 'Damien Gorjanec en cuisine, tablier noir devant la hotte rouge', 1351, 1800),
    photo('/photos/chef-francois.webp', 'François Schepens en cuisine, tablier noir devant la hotte rouge', 1351, 1800),
    photo('/photos/equipe-trio.webp', "L'équipe riant sur une banquette autour d'une table en chêne", 800, 725, 'Entre deux services'),
    photo('/photos/dessert-tarte-pomme.webp', 'Rosace de pommes, glace et éclats de tuile, vue de dessus', 800, 725),
    photo('/photos/plat-tartare.webp', 'Tartare de boeuf, roquette et tuiles sur assiette noire', 550, 825),
    photo('/photos/plat-saint-jacques.webp', 'Saint-Jacques snackées, mousseline et tuile noire sur assiette bleue', 550, 825),
    photo('/photos/salle-ampoules.webp', 'Ampoules à filament suspendues devant une étagère en bois', 1140, 642, 'Les ampoules du bar'),
    photo('/photos/salle-clients-bar.webp', 'Clients attablés au bar, Damien en salle sous les ampoules chaudes', 1140, 642, 'Le bar, un soir de semaine'),
    photo('/photos/bar-cocktails.webp', 'Deux cocktails rouges dosés au bar', 1140, 642, 'Deux cocktails avant le service'),
    photo('/photos/cuisine-francois-poele.webp', 'François poêle en main, Damien penché au premier plan', 1140, 642, 'La poêle de François'),
    photo('/photos/service-planche.webp', 'Une planche de viande portée vers la salle', 1140, 642, 'La planche part en salle'),
    photo('/photos/cuisine-salage-viande.webp', 'Une main sale une pièce de viande tranchée sur la plaque', 1140, 642, 'Le sel, à la main'),
    photo('/photos/cuisine-chefs-dressage.webp', 'Les deux chefs concentrés au dressage sous les lampes chauffantes', 1140, 642, 'Quatre mains au dressage'),
    photo('/photos/service-francois-table.webp', 'François verse une sauce à table devant une cliente', 1140, 642, 'François termine le plat à votre table'),
    photo('/photos/service-sauce-table.webp', 'Sauce versée à la cuillère sur un plat, à table', 1140, 642, 'Le jus, à la cuillère'),
    photo('/photos/portrait-damien-profil.webp', 'Damien de profil en clair-obscur, mains jointes', 1140, 642),
    photo('/photos/salle-banquette.webp', 'La salle de jour : banquette, coussins moutarde, lambris vert-gris', 1600, 1600, 'La salle, le matin', true),
    photo('/photos/cuisine-mains-pate.webp', 'Des mains travaillent une pâte sur une balance', 1600, 1600, 'Le pain, fait maison', true),
    photo('/photos/plat-boeuf-confit.webp', 'Boeuf confit, carottes et cromesquis sur assiette rouge', 1600, 1600, 'Le boeuf confit', true),
  ],
  valeurs: ['Fait maison', 'Produits des saisons', 'Rencontre et convivialité', 'Producteurs du coin', 'Les chefs servent et expliquent leurs plats à table'],
  manifeste: {
    avant: 'Deux potes, un feu, un menu unique qui change avec les saisons. Des légumes cultivés localement, une cuisine ouverte sur la salle, les chefs qui viennent poser l’assiette devant vous et raconter ce qu’il y a dedans. Un mot d’ordre :',
    motCle: 'le plaisir.',
    apres: '',
  },
  cuisson: {
    plat: 'Boeuf confit, carottes, cromesquis',
    intro: 'Le plat signature, couche par couche. Étapes et températures illustratives.',
    couches: [
      { id: 'fond', nom: 'L’assiette', detail: 'Chaude, prête à recevoir', temp: 520, src: '/couches/fond.webp', placeholder: true },
      { id: 'piece', nom: 'Le boeuf confit', detail: 'La pièce confite', temp: 420, src: '/couches/piece.webp', placeholder: true },
      { id: 'garniture', nom: 'Carottes, cromesquis', detail: 'Cromesquis de pommes de terre', temp: 300, src: '/couches/garniture.webp', placeholder: true },
      { id: 'sauce', nom: 'Le jus', detail: 'Réduit, versé au dernier moment', temp: 180, src: '/couches/sauce.webp', placeholder: true },
    ],
  },
  privatisation: {
    couverts: { valeur: 28, placeholder: true },
    formules: [
      { nom: 'Le samedi, en privé', texte: 'Le restaurant ferme ses portes au public le samedi et peut être privatisé pour un mariage, un anniversaire ou un repas d’équipe, en menu unique écrit avec vous.', placeholder: false },
      { nom: 'Chef à domicile', texte: 'Damien ou François vient cuisiner chez vous, avec son matériel et ses producteurs, pour une table de 8 à 20 convives.', placeholder: true },
      { nom: 'Bon cadeau', texte: 'Une soirée aux Potes au Feu à offrir : bons de 50, 75, 100 ou 150 €, demandés en ligne et retirés au restaurant.', placeholder: false },
    ],
  },
  colophon: [
    'Photos : Les Potes au Feu (site du restaurant) ; trois photos reprises de la fiche Guide MICHELIN, droits à confirmer.',
    'Caractères : Melodrama (Fontshare) et Literata (Google Fonts).',
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

/** '19:00' → '19 h', '19:30' → '19 h 30'. */
export const heure = (s: string) => s.replace(/^0/, '').replace(/:00$/, ' h').replace(':', ' h ');
/** Horaires lisibles : '12 h à 14 h, 19 h à 21 h' ou la note. */
export const horaireTexte = (h: Horaire) =>
  h.creneaux.length ? h.creneaux.map((c) => `${heure(c.ouverture)} à ${heure(c.fermeture)}`).join(', ') : h.note || 'fermé';

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;

/** Libellé de chapitre du thermomètre selon la température. */
export const chapitreDe = (t: number) => (t >= 400 ? 'cuisson' : t >= 200 ? 'dressage' : t >= 60 ? 'table' : 'nuit');
