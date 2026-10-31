// Tout le contenu du site vit ici. Source : data/restaurants/les-potes-au-feu/{dossier.md,donnees.json}.
// Une donnée, un drapeau : `placeholder: true` ne vaut que pour le champ qu'il accompagne. Toute sous-donnée non
// prouvée par le dossier a son propre drapeau et une marque visible là où elle s'affiche (« exemple », « illustratif »).
// La carte réelle des Potes au Feu est un menu unique : la « carte longue » du gabarit est composée du menu réel
// (catégories `exemple: false`) et de catégories d'exemple marquées visiblement (`exemple: true`).

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';
export type Service = 'midi' | 'soir';
export type Badge = 'végé' | 'maison' | 'local';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat {
  nom: string;
  description: string; // vide si le dossier ne donne que le nom
  prix: string | null; // null = compris dans le menu
  placeholder: boolean; // le plat lui-même est-il une invention ?
  badges?: Badge[];
  apercu?: string; // photo 4:5 dans public/photos (aperçu flottant / vignette mobile)
}
export interface Categorie {
  categorie: string;
  service: Service | 'tous';
  exemple: boolean; // catégorie entière composée de lignes d'exemple
  note?: string; // affichée sous le titre de catégorie
  prix?: string; // prix du menu quand les plats n'en ont pas
  plats: Plat[];
}
export interface Menu { nom: string; prix: string; description: string; quand: string; placeholder: boolean }
export interface Membre { nom: string; role: string; rolePlaceholder: boolean; photo?: string; placeholder: boolean }
export interface Avis { texte: string; auteur: string; source: string; date: string; note?: number; placeholder: boolean }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }
export interface Suggestion { jour: Jour; texte: string; prix: string | null; placeholder: boolean }

export interface Restaurant {
  slug: string;
  nom: string;
  nomLignes: [string, string]; // le nom en deux lignes sur l'ardoise
  baseline: string;
  description: string;
  url: string;
  typeCuisine: string;
  adresse: { rue: string; numero: string; cp: string; commune: string; pays: string };
  acces: { texte: string; placeholder: boolean }[];
  geo: { lat: number; lon: number };
  telephone: string;
  email: { valeur: string; placeholder: boolean };
  reservation: { outil: string; url: string; note: string };
  cadeau: { montants: string; note: string; url: string };
  privatisation: { texte: string; placeholder: boolean };
  horaires: Horaire[];
  reseaux: Reseau[];
  suggestions: Suggestion[];
  carte: Categorie[];
  menus: Menu[];
  histoire: string[];
  equipe: Membre[];
  avis: Avis[];
  photos: Photo[];
  motsSalle: string[]; // mots géants empilés de la section salle (tous prouvés par le dossier)
  valeurs: string[];
}

const photo = (src: string, alt: string, largeur: number, hauteur: number, placeholder = false): Photo => ({ src, alt, largeur, hauteur, placeholder });
const reel = (nom: string, apercu?: string): Plat => ({ nom, description: '', prix: null, placeholder: false, apercu });
const ex = (nom: string, description: string, prix: string, apercu?: string, badges?: Badge[]): Plat => ({ nom, description, prix, placeholder: true, apercu, badges });

export const site: Restaurant = {
  slug: 'les-potes-au-feu',
  nom: 'Les Potes au Feu',
  nomLignes: ['Les Potes', 'au Feu'],
  baseline: "Bistronomie à Namur. L'histoire d'une rencontre, celle de deux potes passionnés.",
  description:
    'Les Potes au Feu, restaurant bistronomique à Namur : la carte du moment, les formules du midi, les horaires et la réservation en ligne, lus en un coup d\'œil.',
  url: 'https://www.lespotesaufeu.be',
  typeCuisine: 'Cuisine française moderne, bistronomie',
  adresse: { rue: 'Avenue de la Plante', numero: '4', cp: '5000', commune: 'Namur', pays: 'BE' },
  acces: [
    { texte: 'Au bord de la Meuse, côté Citadelle, entre le Casino et le Royal Snail.', placeholder: false },
    { texte: 'Stationnement : à deux pas, le long de l\'avenue (exemple, à confirmer).', placeholder: true },
  ],
  geo: { lat: 50.4586737, lon: 4.8643452 },
  telephone: '+32 81 64 04 44',
  email: { valeur: 'bonjour@lespotesaufeu.be', placeholder: true },
  reservation: { outil: 'Zenchef', url: 'https://bookings.zenchef.com/results?rid=379477', note: 'Pour une réservation de dernière minute ou de plus de six personnes, appelez-nous.' },
  cadeau: { montants: '50, 75, 100 ou 150 €', note: 'Demande en ligne, retrait au restaurant.', url: 'https://www.lespotesaufeu.be' },
  privatisation: { texte: 'Le samedi, le restaurant se privatise : mariages, événements, ou chef à domicile.', placeholder: false },
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
  // Suggestions du jour : illustratives (le restaurant travaille en menu unique). Les jours fermés sont réels.
  suggestions: [
    { jour: 'lundi', texte: 'Tartare de bœuf au couteau, tuiles et roquette', prix: '19 €', placeholder: true },
    { jour: 'mardi', texte: 'Saint-Jacques snackées, mousseline de butternut, passion', prix: '24 €', placeholder: true },
    { jour: 'mercredi', texte: 'Bœuf confit, carottes, cromesquis de pommes de terre', prix: '26 €', placeholder: true },
    { jour: 'jeudi', texte: 'Légumes racines rôtis, champignons, noix', prix: '17 €', placeholder: true },
    { jour: 'vendredi', texte: 'Soufflé au caramel, chaï, poire', prix: '11 €', placeholder: true },
    { jour: 'samedi', texte: 'Fermé. Le samedi, le restaurant se privatise.', prix: null, placeholder: false },
    { jour: 'dimanche', texte: 'Fermé. On se retrouve lundi soir.', prix: null, placeholder: false },
  ],
  carte: [
    {
      categorie: 'Menu dégustation 4 services',
      service: 'soir',
      exemple: false,
      prix: '67 €',
      note: 'Du lundi au vendredi soir. Menu végétarien sur demande ; allergies et intolérances à signaler à la réservation.',
      plats: [
        reel('Mises en bouche'),
        reel('Légumes racines / Champignons / Noix'),
        reel('Saint-Jacques / Butternut / Passion', '/photos/apercu-saint-jacques.webp'),
        reel('Bœuf confit / Carottes / Cromesquis de pommes de terre', '/photos/apercu-boeuf.webp'),
        reel('Soufflé au caramel / Chaï / Poire'),
        reel('Mignardise'),
        { nom: 'Fromage à la place du dessert', description: 'supplément', prix: '+7 €', placeholder: false },
        { nom: 'Fromage avant le dessert', description: 'supplément', prix: '+15 €', placeholder: false },
      ],
    },
    {
      categorie: 'Pour commencer',
      service: 'soir',
      exemple: true,
      note: 'Lignes d\'exemple : la carte réelle est un menu unique. Elles montrent la carte longue du gabarit.',
      plats: [
        ex('Croquettes de crevettes grises', 'persil frit, citron', '16 €', '/photos/apercu-frites.webp', ['maison']),
        ex('Tartare de bœuf au couteau', 'tuiles, roquette, câpres', '19 €', '/photos/apercu-tartare.webp'),
        ex('Velouté de potimarron', 'noisettes torréfiées, huile de pépins', '12 €', undefined, ['végé']),
        ex('Œuf parfait', 'champignons des bois, lard paysan', '15 €', '/photos/apercu-pate.webp', ['local']),
        ex('Terrine de campagne', 'pickles de la maison, pain grillé', '14 €', '/photos/apercu-planche.webp', ['maison']),
      ],
    },
    {
      categorie: 'Plats',
      service: 'soir',
      exemple: true,
      note: 'Lignes d\'exemple.',
      plats: [
        ex('Bœuf confit douze heures', 'carottes, cromesquis de pommes de terre', '28 €', '/photos/apercu-boeuf.webp'),
        ex('Saint-Jacques snackées', 'butternut, passion, tuile noire', '29 €', '/photos/apercu-saint-jacques.webp'),
        ex('Filet de sandre', 'beurre blanc, poireaux fondants', '27 €', '/photos/apercu-sauce.webp', ['local']),
        ex('Risotto aux champignons', 'parmesan, noix, herbes', '22 €', undefined, ['végé']),
        ex('Pièce du boucher', 'frites maison, sauce au poivre', '31 €', '/photos/apercu-salage.webp', ['maison']),
      ],
    },
    {
      categorie: 'Desserts',
      service: 'soir',
      exemple: true,
      note: 'Lignes d\'exemple.',
      plats: [
        ex('Soufflé au caramel', 'chaï, poire pochée', '12 €'),
        ex('Rosace de pommes', 'glace vanille, tuile', '11 €', '/photos/apercu-tarte.webp', ['maison']),
        ex('Cerises noires et griottes', 'crumble de cacao, glace vanille au lait cru', '12 €'),
        ex('Assiette de fromages affinés', 'pain aux noix', '13 €'),
        ex('Mignardises', 'avec le café', '6 €'),
      ],
    },
    {
      categorie: 'Formule 3 services',
      service: 'midi',
      exemple: false,
      prix: '52 €',
      note: 'Le midi, mercredi et vendredi. Formule à choix multiples inspirée des produits du moment.',
      plats: [
        { nom: 'Entrée, plat et dessert au choix', description: '', prix: null, placeholder: false },
      ],
    },
    {
      categorie: 'Lunch',
      service: 'midi',
      exemple: false,
      prix: '40 €',
      note: 'Entrée-plat ou plat-dessert, proposé selon les envies des chefs et servi à l\'ensemble de la table ; composition par téléphone.',
      plats: [
        { nom: 'Entrée et plat', description: '', prix: null, placeholder: false },
        { nom: 'Plat et dessert', description: '', prix: null, placeholder: false },
      ],
    },
    {
      categorie: 'Entrées du midi',
      service: 'midi',
      exemple: true,
      note: 'Lignes d\'exemple : la composition réelle du midi se demande par téléphone.',
      plats: [
        ex('Soupe du jour', 'pain de campagne', '8 €', undefined, ['végé', 'maison']),
        ex('Croquettes de fromage', 'persil frit', '12 €', '/photos/apercu-frites.webp', ['végé']),
        ex('Tartare de bœuf', 'petite portion, tuiles', '14 €', '/photos/apercu-tartare.webp'),
        ex('Salade de chèvre chaud', 'miel, noix, jeunes pousses', '13 €', undefined, ['végé']),
        ex('Œuf mollet', 'champignons, lard', '12 €', '/photos/apercu-pate.webp', ['local']),
      ],
    },
    {
      categorie: 'Plats du midi',
      service: 'midi',
      exemple: true,
      note: 'Lignes d\'exemple.',
      plats: [
        ex('Plat du jour', 'selon le marché', '18 €', '/photos/apercu-sauce.webp', ['local']),
        ex('Bœuf confit', 'carottes, cromesquis', '24 €', '/photos/apercu-boeuf.webp'),
        ex('Saint-Jacques', 'butternut, passion', '25 €', '/photos/apercu-saint-jacques.webp'),
        ex('Risotto du moment', 'légumes de saison', '19 €', undefined, ['végé']),
        ex('Burger de la maison', 'frites, sauce maison', '19 €', '/photos/apercu-salage.webp', ['maison']),
      ],
    },
    {
      categorie: 'Desserts du midi',
      service: 'midi',
      exemple: true,
      note: 'Lignes d\'exemple.',
      plats: [
        ex('Rosace de pommes', 'glace vanille', '9 €', '/photos/apercu-tarte.webp', ['maison']),
        ex('Mousse au chocolat', 'fleur de sel', '8 €'),
        ex('Café gourmand', 'trois mignardises', '9 €'),
        ex('Fromages', 'pain aux noix', '11 €'),
        ex('Glaces et sorbets', 'deux boules', '7 €'),
      ],
    },
    {
      categorie: 'Boissons',
      service: 'tous',
      exemple: true,
      note: 'Lignes d\'exemple : la carte des boissons n\'est pas publiée.',
      plats: [
        ex('Accord mets et vins, 4 verres', 'vignerons belges et français', '32 €'),
        ex('Cocktail de la maison', 'au bar, avant le service', '12 €', '/photos/apercu-cocktails.webp', ['maison']),
        ex('Verre de vin', 'blanc, rouge ou rosé', '6 €'),
        ex('Bière locale', '33 cl', '5 €', undefined, ['local']),
        ex('Eau, café, thé', '', '3 €'),
      ],
    },
  ],
  menus: [
    { nom: 'Menu dégustation 4 services', prix: '67 €', quand: 'Du lundi au vendredi soir', description: 'Menu unique en quatre services : mises en bouche, légumes racines / champignons / noix, Saint-Jacques / butternut / passion, bœuf confit / carottes / cromesquis, soufflé au caramel / chaï / poire, mignardise. Fromage à la place du dessert +7 €, avant le dessert +15 €.', placeholder: false },
    { nom: 'Formule 3 services', prix: '52 €', quand: 'Le midi, mercredi et vendredi', description: 'Formule 3 services à choix multiples inspirée des produits du moment.', placeholder: false },
    { nom: 'Lunch', prix: '40 €', quand: 'Le midi, mercredi et vendredi', description: 'Entrée-plat ou plat-dessert, proposé selon les envies des chefs et servi à l\'ensemble de la table. Composition sur demande par téléphone.', placeholder: false },
  ],
  histoire: [
    "Les Potes au Feu, c'est d'abord l'histoire d'une rencontre : François Schepens et Damien Gorjanec aiguisent leurs premiers couteaux ensemble à la Plage d'Amée, à Namur. Deux gamins pleins d'envie, le début d'une amitié.",
    "François fait ses classes aux États-Unis et à Montréal ; Damien se fait une place en Belgique et cuisine jusqu'à Shanghai. À chaque retrouvaille, autour d'un verre, le rêve d'ouvrir un restaurant se dessine.",
    "Début de l'hiver 2019, installés par hasard à une table de ce lieu, ils ne savent pas encore qu'ils y ouvriront leur premier restaurant. Trois mois plus tard, ils en ont les clés.",
    "Une cuisine bistronomique à quatre mains, de qualité, avec un ancrage local, et un mot d'ordre : le plaisir. Les chefs accompagnent eux-mêmes leurs plats jusqu'à votre table et expliquent leur démarche.",
  ],
  equipe: [
    { nom: 'Damien Gorjanec', role: 'Chef et co-propriétaire', rolePlaceholder: false, photo: '/photos/chef-damien.webp', placeholder: false },
    { nom: 'François Schepens', role: 'Chef et co-propriétaire', rolePlaceholder: false, photo: '/photos/chef-francois.webp', placeholder: false },
    { nom: 'Sara', role: 'Salle et bar', rolePlaceholder: true, placeholder: false },
    { nom: 'Jordan', role: 'Salle', rolePlaceholder: true, placeholder: false },
  ],
  avis: [
    { texte: "Un restaurant décontracté qui swingue sur tous les plans. Le plaisir déborde de l'assiette !", auteur: 'Inspecteur du Guide MICHELIN', source: 'Guide MICHELIN Belgique 2026', date: '2026-05-04', placeholder: false },
    { texte: 'Les chefs viennent eux-mêmes présenter chaque assiette. Le bœuf confit est une merveille, et on repart avec le sourire.', auteur: '', source: '', date: '', placeholder: true },
    { texte: 'Menu unique, zéro hésitation, que du plaisir. Le cadre est chaleureux et le service aussi simple que précis.', auteur: '', source: '', date: '', placeholder: true },
  ],
  photos: [
    photo('/photos/chef-damien.webp', 'Damien Gorjanec en cuisine, tablier noir devant la hotte rouge', 1351, 1800),
    photo('/photos/chef-francois.webp', 'François Schepens en cuisine, tablier noir devant la hotte rouge', 1351, 1800),
    photo('/photos/equipe-trio.webp', "L'équipe riant sur une banquette autour d'une table en chêne", 800, 725),
    photo('/photos/equipe-trio-800.webp', "L'équipe riant sur une banquette autour d'une table en chêne", 800, 725),
    photo('/photos/dessert-tarte-pomme.webp', 'Rosace de pommes, glace et éclats de tuile, vue de dessus', 800, 725),
    photo('/photos/plat-tartare.webp', 'Tartare de bœuf, roquette et tuiles sur assiette noire', 550, 825),
    photo('/photos/plat-saint-jacques.webp', 'Saint-Jacques snackées, mousseline et tuile noire sur assiette bleue', 550, 825),
    photo('/photos/plat-boeuf-confit.webp', 'Bœuf confit, carottes et cromesquis sur assiette rouge', 1600, 1600),
    photo('/photos/salle-bar-panoramique.webp', 'Le bar vert sombre et une table haute dressée, vue sur la cuisine', 1800, 468),
    photo('/photos/salle-ampoules.webp', 'Ampoules à filament suspendues devant une étagère en bois', 1140, 642),
    photo('/photos/salle-clients-bar.webp', 'Clients attablés au bar, Damien en salle sous les ampoules chaudes', 1140, 642),
    photo('/photos/salle-clients-bar-960.webp', 'Clients attablés au bar, Damien en salle sous les ampoules chaudes', 960, 541),
    photo('/photos/bar-cocktails.webp', 'Deux cocktails rouges dosés au bar', 1140, 642),
    photo('/photos/cuisine-chefs-passe.webp', 'Les deux chefs au passe, dressage des assiettes', 1140, 642),
    photo('/photos/cuisine-chefs-dressage.webp', 'Les deux chefs concentrés au dressage sous les lampes chauffantes', 1140, 642),
    photo('/photos/service-francois-table.webp', 'François verse une sauce à table devant une cliente', 1140, 642),
    photo('/photos/service-planche.webp', 'Une planche de viande portée vers la salle', 1140, 642),
    photo('/photos/salle-banquette.webp', 'La salle de jour : banquette, coussins moutarde, lambris vert-gris', 1600, 1600),
    photo('/photos/salle-banquette-960.webp', 'La salle de jour : banquette, coussins moutarde, lambris vert-gris', 960, 960),
    photo('/photos/cuisine-mains-pate.webp', 'Des mains travaillent une pâte sur une balance', 1600, 1600),
    photo('/photos/portrait-damien-profil.webp', 'Damien de profil en clair-obscur, mains jointes', 1140, 642),
  ],
  motsSalle: ['Salle', 'Bar', 'Cuisine'],
  valeurs: ['Fait maison', 'Produits des saisons', 'Rencontre et convivialité', 'Producteurs du coin', 'Les chefs servent et expliquent leurs plats à table'],
};

/** Photo par chemin (erreur explicite si le chemin n'existe pas). */
export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}

export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;
export const horaireTexte = (h: Horaire) => (h.creneaux.length ? h.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(', ') : h.note || 'fermé');
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;
export const carteDe = (service: Service) => site.carte.filter((c) => c.service === service || c.service === 'tous');
/** Créneau d'un service pour un jour : 'midi' = ouverture avant 15:00. */
export const creneauService = (h: Horaire, s: Service) => h.creneaux.find((c) => (s === 'midi' ? c.ouverture < '15:00' : c.ouverture >= '15:00')) || null;
/** Libellé statique des services (repli sans JS de la barre d'état). */
export const servicesTexte = () => {
  const midi = site.horaires.filter((h) => creneauService(h, 'midi')).map((h) => h.jour);
  const soir = site.horaires.filter((h) => creneauService(h, 'soir')).map((h) => h.jour);
  return `Le soir du ${soir[0]} au ${soir[soir.length - 1]}, le midi ${midi.join(' et ')}`;
};
