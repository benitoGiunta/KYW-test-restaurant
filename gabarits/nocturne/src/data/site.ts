// Tout le contenu du site vit ici. Source : data/restaurants/<slug>/donnees.json et photos/index.json.
// Les trous des données réelles sont comblés par des données fictives marquées `placeholder: true` :
// un gabarit les affiche, la revue les signale, le client les remplace.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean }
export interface Membre { nom: string; role: string; photo?: string; placeholder: boolean; rolePlaceholder?: boolean }
export interface Avis { texte: string; auteur: string; source: string; date: string; note?: number; placeholder: boolean }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }
export type Famille = 'sour' | 'highball' | 'spiritueux' | 'sans alcool';
export interface Cocktail { nom: string; ingredients: string; prix: string; famille: Famille; placeholder: boolean }
export interface Regle { texte: string; placeholder: boolean }
export interface Soiree { nom: string; description: string; quand: string; placeholder: boolean }
export interface Mosaique { src: string; placeholder: boolean }

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
  // Nocturne
  accroche: { titre: [string, string]; sousTitre: string; bande: string; carte: string; bar: string; soirees: string; demande: string; complementAdresse: string };
  regles: Regle[];
  originStory: string[]; // 4 phrases courtes, tirées de l'histoire
  cocktails: Cocktail[];
  soirees: Soiree[];
  mosaique: Mosaique[]; // 12 photos sombres, dans l'ordre d'affichage
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
  email: { valeur: '', placeholder: false }, // aucune adresse publique (dossier : formulaire uniquement) : rien n'est affiché tant que le restaurant n'en fournit pas
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
    { nom: 'Vidéo YouTube', url: 'https://www.youtube.com/watch?v=dZtMOajOefE' },
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
    "Les Potes au Feu, c'est d'abord l'histoire d'une rencontre. Au départ, François Schepens et Damien Gorjanec aiguisent leurs premiers couteaux au restaurant la Plage d'Amée à Namur : deux gamins pleins d'envie, le début d'une amitié.",
    "François continue ses classes aux États-Unis et à Montréal, Damien se fait une place en Belgique et cumule des expériences à l'étranger, notamment à Shanghai. À chaque retrouvaille, autour d'un verre, le rêve d'ouvrir un restaurant se dessine.",
    "Début de l'hiver 2019, installés par hasard à une table de ce lieu, ils ne savent pas encore qu'ils y ouvriront leur premier restaurant. Trois mois plus tard, ils en ont les clés.",
    "Le concept : une cuisine bistronomique à quatre mains, de qualité, avec un ancrage local, et un mot d'ordre, le plaisir. Ils servent eux-mêmes leurs plats et expliquent leur démarche à table, dans une atmosphère décontractée qui ne se la raconte pas.",
  ],
  equipe: [
    { nom: 'Damien Gorjanec', role: 'Chef et co-propriétaire', photo: '/photos/chef-damien.webp', placeholder: false },
    { nom: 'François Schepens', role: 'Chef et co-propriétaire', photo: '/photos/chef-francois.webp', placeholder: false },
    { nom: 'Sara', role: 'Salle et bar', placeholder: false, rolePlaceholder: true },
    { nom: 'Jordan', role: 'Salle', placeholder: false, rolePlaceholder: true },
  ],
  avis: [
    {
      texte: "Un restaurant décontracté qui swingue sur tous les plans. Le plaisir déborde de l'assiette !",
      auteur: 'Inspecteur du Guide MICHELIN',
      source: 'Guide MICHELIN Belgique 2026',
      date: '2026-05-04',
      placeholder: false,
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
  accroche: {
    titre: ['Le feu,', 'la nuit'],
    sousTitre: 'Bistronomie à quatre mains, avenue de la Plante, au bord de la Meuse. Un menu unique, servi par les chefs.',
    bande: 'Fait maison, produits des saisons, et deux chefs qui portent eux-mêmes leurs assiettes à votre table.',
    carte: 'Un seul menu, en quatre services. Le midi, une formule à choix multiples ou un lunch. Végétarien sur demande.',
    bar: 'Le bar vert sombre, les ampoules à filament, deux cocktails rouges sur le comptoir en chêne.',
    soirees: 'Le samedi, le restaurant se privatise : mariage, événement. Les chefs se déplacent aussi chez vous.',
    demande: 'Une date, un nombre de convives, une envie : on en parle de vive voix.',
    complementAdresse: 'Au bord de la Meuse, côté Citadelle.',
  },
  regles: [
    { texte: 'Le dernier service est à 21h : les horaires sont des heures d\'arrivée.', placeholder: false },
    { texte: 'Plus de six personnes ou une table de dernière minute : on vous demande d\'appeler.', placeholder: false },
    { texte: 'Un seul menu, en quatre services. Végétarien sur demande.', placeholder: false },
    { texte: 'Allergies et intolérances : à signaler lors de la réservation.', placeholder: false },
    { texte: 'Le samedi, la maison se privatise : mariage, événement, chef à domicile.', placeholder: false },
  ],
  originStory: [
    'Tout commence à la Plage d\'Amée, à Namur : François et Damien y aiguisent ensemble leurs premiers couteaux.',
    'François file aux États-Unis puis à Montréal. Damien cuisine en Belgique, puis jusqu\'à Shanghai.',
    'Début de l\'hiver 2019, ils dînent par hasard à une table de ce lieu. Trois mois plus tard, les clés sont à eux.',
    'Une cuisine à quatre mains, un ancrage local, un mot d\'ordre : le plaisir. Ils servent eux-mêmes leurs plats.',
  ],
  cocktails: [
    { nom: 'Feu doux', ingredients: 'whisky tourbé, sirop de poire, bitter cacao', prix: '13 €', famille: 'spiritueux', placeholder: true },
    { nom: 'Plante', ingredients: 'gin, verveine, citron vert, soda', prix: '12 €', famille: 'highball', placeholder: true },
    { nom: 'Meuse sour', ingredients: 'genièvre, citron, blanc d\'œuf, sirop de sapin', prix: '12 €', famille: 'sour', placeholder: true },
    { nom: 'Amée', ingredients: 'rhum ambré, griotte, vermouth rouge', prix: '13 €', famille: 'spiritueux', placeholder: true },
    { nom: 'Chaï', ingredients: 'bourbon, thé chaï, orange brûlée', prix: '13 €', famille: 'spiritueux', placeholder: true },
    { nom: 'Butternut fizz', ingredients: 'vodka, courge rôtie, passion, tonic', prix: '12 €', famille: 'highball', placeholder: true },
    { nom: 'Noix', ingredients: 'cognac, noix, citron, sucre brun', prix: '13 €', famille: 'sour', placeholder: true },
    { nom: 'Citadelle', ingredients: 'tequila, pamplemousse, piment doux, soda', prix: '12 €', famille: 'highball', placeholder: true },
    { nom: 'Pomme et fumée', ingredients: 'jus de pomme fumé, miel, citron, gingembre', prix: '8 €', famille: 'sans alcool', placeholder: true },
    { nom: 'Verveine', ingredients: 'infusion froide, sirop de sureau, tonic', prix: '8 €', famille: 'sans alcool', placeholder: true },
  ],
  soirees: [
    { nom: 'Privatisation du samedi', description: 'Le restaurant est à vous : mariage, événement.', quand: 'le samedi', placeholder: false },
    { nom: 'Chef à domicile', description: 'Les chefs se déplacent chez vous avec leur cuisine à quatre mains.', quand: 'sur demande', placeholder: false },
    { nom: 'Soirée au bar', description: 'Le bar ouvert avant le service, quelques cocktails, les chefs au passe.', quand: 'en semaine', placeholder: true },
  ],
  mosaique: [
    { src: '/photos/bar-cocktails.webp', placeholder: false },
    { src: '/photos/salle-ampoules.webp', placeholder: false },
    { src: '/photos/cuisine-chefs-dressage.webp', placeholder: false },
    { src: '/photos/plat-tartare.webp', placeholder: false },
    { src: '/photos/salle-clients-bar.webp', placeholder: false },
    { src: '/photos/cuisine-salage-viande.webp', placeholder: false },
    { src: '/photos/service-sauce-table.webp', placeholder: false },
    { src: '/photos/plat-saint-jacques.webp', placeholder: false },
    { src: '/photos/cuisine-chefs-passe.webp', placeholder: false },
    { src: '/photos/service-planche.webp', placeholder: false },
    { src: '/photos/plat-boeuf-confit.webp', placeholder: false },
    { src: '/photos/cuisine-francois-poele.webp', placeholder: false },
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

/** Jours de service du soir et bornes du service, pour les textes serveur et le loader. */
export function serviceSoir(r: Restaurant = site) {
  const soirs = r.horaires.filter((h) => h.creneaux.some((c) => c.ouverture >= '17:00'));
  const ouv = soirs.map((h) => h.creneaux.at(-1)!.ouverture).sort()[0] ?? '19:00';
  const ferm = soirs.map((h) => h.creneaux.at(-1)!.fermeture).sort().at(-1) ?? '21:00';
  const jours = soirs.map((h) => h.jour);
  const texte = jours.length > 2 && jours.every((j, i) => i === 0 || r.horaires.findIndex((h) => h.jour === j) === r.horaires.findIndex((h) => h.jour === jours[i - 1]) + 1)
    ? `du ${jours[0]} au ${jours.at(-1)} soir`
    : jours.join(', ');
  return { ouverture: ouv, fermeture: ferm, jours, texte };
}
export const heure = (h: string) => h.replace(':00', 'h').replace(':', 'h');

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;
