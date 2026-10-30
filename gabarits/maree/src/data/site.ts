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

/* ───────── Données propres au gabarit « Marée » (chaque donnée non prouvée par le dossier porte son drapeau) ───────── */

export interface Arrivage { nom: string; origine: string; calibre: string; prix: string; placeholder: boolean }
export interface PointPlan { numero: number; nom: string; detail: string; x: number; y: number; placeholder: boolean }
export interface Regle { texte: string; placeholder: boolean }
export interface Service { jour: Jour; debut: string; fin: string; nom: 'midi' | 'soir' }

/** Trois univers sous le nom (le restaurant n'a ni terrasse ni écailler : mots du gabarit, illustratifs). */
export const univers = [
  { mot: 'terrasse', placeholder: true },
  { mot: 'écailler', placeholder: true },
  { mot: 'bistronomie', placeholder: false },
];

/** Arrivages de l'écailler : entièrement illustratifs (Les Potes au Feu n'ont pas d'écailler). */
export const arrivages: Arrivage[] = [
  { nom: 'Huître creuse de Zélande', origine: 'Yerseke, Pays-Bas', calibre: 'n° 3', prix: '3,20 € la pièce', placeholder: true },
  { nom: 'Huître plate de Belon', origine: 'Riec-sur-Bélon, Bretagne', calibre: 'n° 2', prix: '4,50 € la pièce', placeholder: true },
  { nom: 'Fine de claire verte', origine: 'Marennes-Oléron, Charente', calibre: 'n° 2', prix: '3,80 € la pièce', placeholder: true },
  { nom: 'Crevettes grises', origine: 'Ostende, mer du Nord', calibre: 'décortiquées à table', prix: '14 € les 100 g', placeholder: true },
  { nom: 'Tourteau', origine: 'Roscoff, Bretagne', calibre: '600 à 800 g', prix: '24 € la pièce', placeholder: true },
  { nom: 'Bulots', origine: 'Granville, Normandie', calibre: 'cuits du matin', prix: '9 € les 250 g', placeholder: true },
];

/** Règles maison : les deux premières viennent du dossier (options de la carte, note du samedi), les autres sont illustratives. */
export const regles: Regle[] = [
  { texte: 'Menu végétarien sur demande', placeholder: false },
  { texte: 'Allergies à signaler à la réservation', placeholder: false },
  { texte: 'Privatisation le samedi', placeholder: false },
  { texte: 'Terrasse sans réservation', placeholder: true },
  { texte: 'Chiens bienvenus en terrasse', placeholder: true },
  { texte: 'Menu enfant jusqu\'à 12 ans', placeholder: true },
];

/** Plan au trait du quai : Meuse, Avenue de la Plante et pont de Jambes sont réels (OpenStreetMap, tracé simplifié) ;
 *  les trois points de service autour du restaurant sont illustratifs. Coordonnées en % de la boîte du SVG. */
export const plan: PointPlan[] = [
  { numero: 1, nom: 'Les Potes au Feu', detail: 'Avenue de la Plante 4, 5000 Namur', x: 44, y: 54, placeholder: false },
  { numero: 2, nom: 'Parking de la Plante', detail: 'à 150 m, le long de la Meuse', x: 38, y: 74, placeholder: true },
  { numero: 3, nom: 'Ponton de la halte nautique', detail: 'arrivée par bateau, amarrage une heure', x: 62, y: 46, placeholder: true },
  { numero: 4, nom: 'Arrêt de bus « Plante »', detail: 'lignes TEC vers la gare de Namur', x: 30, y: 36, placeholder: true },
];

/** Services (réels, dérivés des horaires) : alimentent la ligne de temps 08h-23h. */
export const services: Service[] = site.horaires.flatMap((h) =>
  h.creneaux.map((c) => ({ jour: h.jour, debut: c.ouverture, fin: c.fermeture, nom: c.ouverture < '16:00' ? 'midi' : 'soir' }) as Service),
);

/** Citation de la terrasse : écrite pour le gabarit, pas une citation du client. */
export const citationTerrasse = { texte: 'On s\'assied face à l\'eau, et le temps prend la vitesse de la Meuse.', placeholder: true };

/** Photos libres (Lorem Picsum / Unsplash) ajoutées pour l'imagerie lumineuse du gabarit : créditées en colophon. */
export interface PhotoLibre extends Photo { credit: string; source: string }
export const photosLibres: PhotoLibre[] = [
  { src: '/photos/libre-213.webp', alt: "Eau pâle et plate sous un ciel laiteux", largeur: 1600, hauteur: 1067, placeholder: true, credit: 'Kelly Sikkema, Unsplash', source: 'https://unsplash.com/photos/X7dy114KWs4' },
  { src: '/photos/libre-124.webp', alt: "Eau turquoise vue d'en haut, une barque amarrée", largeur: 1600, hauteur: 1067, placeholder: true, credit: 'Anton Sulsky, Unsplash', source: 'https://unsplash.com/photos/fj0tFloTPGQ' },
  { src: '/photos/libre-302.webp', alt: "Rivage clair, sable et eau", largeur: 1600, hauteur: 1067, placeholder: true, credit: 'Billy Lam, Unsplash', source: 'https://unsplash.com/photos/O3rmGgNYLKo' },
];

/** Photo (client ou libre) par chemin. */
export function photoAny(src: string): Photo {
  return site.photos.find((x) => x.src === src) ?? photosLibres.find((x) => x.src === src) ?? (() => { throw new Error(`Photo inconnue : ${src}`); })();
}
