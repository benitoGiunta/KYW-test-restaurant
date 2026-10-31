// Tout le contenu visible vit ici. Source : data/restaurants/les-potes-au-feu/{donnees.json, dossier.md, photos/index.json}.
// Hypothèses et compléments (chacun porte `placeholder: true` et figure dans RAPPORT.md) :
//  - rôles de Sara et de Jordan inconnus : le site n'affiche que ce que dit le client (« épaulés par la pétillante Sara et Jordan »)
//  - l'assiette du service 1 (mises en bouche, légumes racines) n'est pas photographiée : assiette dessinée avec le navet du logo
//  - l'assiette du service 4 montre la rosace de pommes (photo réelle d'un dessert antérieur), légendée comme telle
//  - les prix de boissons viennent du Fooding (juillet 2026), à confirmer par le client (`aConfirmer: true`)
//  - aucune adresse e-mail publique : le site n'en invente pas (téléphone et Zenchef seulement)
//  - la formule midi à 52 € vient du site du client et du Fooding (juillet 2026), mais `donnees.json` la classe « à confirmer » : affichée avec la pastille « à confirmer »
//  - la date d'ouverture exacte est inconnue (société créée le 14/01/2020) : le site dit « début 2020 »

export interface Creneau { ouverture: string; fermeture: string }
export interface Horaire { jour: string; creneaux: Creneau[]; note?: string }
export interface Ligne { nom: string; description?: string; prix?: string; photo?: 'saint-jacques' | 'boeuf' | 'tartare' | 'dessert'; placeholder?: boolean; aConfirmer?: boolean }
export interface Formule { id: string; nom: string; prix?: string; prixNote?: string; quand: string; note?: string; lignes: Ligne[]; placeholder?: boolean }
export interface Service { n: number; titre: string; plats: string; note: string; notePlaceholder?: boolean; photo?: 'saint-jacques' | 'boeuf' | 'dessert'; legende?: string }
export interface Membre { nom: string; role: string; placeholder: boolean }

export const site = {
  slug: 'les-potes-au-feu',
  nom: 'Les Potes au Feu',
  nomLogo: 'Les potes au feu',
  baseline: 'Bistronomie à quatre mains, à Namur',
  description: 'Les Potes au Feu, restaurant bistronomique à Namur : un menu unique en quatre services, de saison et fait maison, apporté à votre table par les chefs Damien et François.',
  url: 'https://www.lespotesaufeu.be',
  typeCuisine: 'Cuisine française moderne, bistronomie',
  adresse: { rue: 'Avenue de la Plante', numero: '4', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.4586737, lon: 4.8643452 },
  carteUrl: 'https://www.openstreetmap.org/?mlat=50.4586737&mlon=4.8643452#map=18/50.45867/4.86435',
  telephone: '+32 81 64 04 44',
  telephoneHref: 'tel:+3281640444',
  reservation: { outil: 'Zenchef', url: 'https://bookings.zenchef.com/results?rid=379477' },
  bonCadeauUrl: 'https://www.lespotesaufeu.be/page/bon-cadeau-en-ligne.html',
  ouverture: 2020, // société DAMFRA SRL constituée le 14/01/2020 (BCE)
  horaires: <Horaire[]>[
    { jour: 'Lundi', creneaux: [{ ouverture: '19:00', fermeture: '21:00' }] },
    { jour: 'Mardi', creneaux: [{ ouverture: '19:00', fermeture: '21:00' }] },
    { jour: 'Mercredi', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:00', fermeture: '21:00' }] },
    { jour: 'Jeudi', creneaux: [{ ouverture: '19:00', fermeture: '21:00' }] },
    { jour: 'Vendredi', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:00', fermeture: '21:00' }] },
    { jour: 'Samedi', creneaux: [], note: 'fermé, privatisation possible' },
    { jour: 'Dimanche', creneaux: [], note: 'fermé' },
  ],
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/lespotesaufeu.bistronomie/' },
    { nom: 'Vidéo YouTube', url: 'https://www.youtube.com/watch?v=dZtMOajOefE' },
  ],
  michelin: {
    texte: 'Un restaurant décontracté qui swingue sur tous les plans. Le plaisir déborde de l’assiette !',
    source: 'Guide MICHELIN Belgique 2026, avis de l’inspecteur',
    url: 'https://guide.michelin.com/fr/fr/namur/namur/restaurant/les-potes-au-feu',
  },
};

/** Les quatre services du menu dégustation (carte du 28/10/2026), tels que les chefs les apportent à table. */
export const services: Service[] = [
  {
    n: 1, titre: 'Mises en bouche', plats: 'Légumes racines, champignons, noix',
    note: 'Les légumes viennent de producteurs du coin ; le navet, c’est le logo de la maison.',
    legende: 'Assiette non photographiée : le navet du logo tient la place.',
  },
  {
    n: 2, titre: 'Saint-Jacques', plats: 'Butternut, passion', photo: 'saint-jacques',
    note: 'Un menu végétarien est possible, sur demande à la réservation.',
  },
  {
    n: 3, titre: 'Bœuf confit', plats: 'Carottes, cromesquis de pommes de terre', photo: 'boeuf',
    note: 'Fromage avant le dessert : +15 €. À la place du dessert : +7 €.',
  },
  {
    n: 4, titre: 'Soufflé au caramel', plats: 'Chaï, poire, puis mignardise', photo: 'dessert',
    note: 'Allergies et intolérances : dites-le nous à la réservation, le menu s’adapte.',
    legende: 'Sur la photo : la rosace de pommes, glace et tuile, un dessert d’une carte précédente.',
  },
];

export const formules: Formule[] = [
  {
    id: 'degustation', nom: 'Menu dégustation', prix: '67 €', quand: 'Du lundi au vendredi soir, quatre services, servi à toute la table.',
    note: 'Un menu unique, de saison. Menu végétarien sur demande ; allergies et intolérances à signaler lors de la réservation.',
    lignes: [
      { nom: 'Mises en bouche' },
      { nom: 'Légumes racines, champignons, noix' },
      { nom: 'Saint-Jacques, butternut, passion', photo: 'saint-jacques' },
      { nom: 'Bœuf confit, carottes, cromesquis de pommes de terre', photo: 'boeuf' },
      { nom: 'Soufflé au caramel, chaï, poire' },
      { nom: 'Mignardise' },
      { nom: 'Fromage à la place du dessert', description: 'supplément', prix: '+7 €' },
      { nom: 'Fromage avant le dessert', description: 'supplément', prix: '+15 €' },
    ],
  },
  {
    id: 'midi', nom: 'Le midi', prix: '40 ou 52 €', prixNote: '52 € à confirmer', quand: 'Mercredi et vendredi, de 12 h à 14 h.',
    note: 'Deux façons de déjeuner : la formule à choix multiples, ou le lunch servi à l’ensemble de la table. Composition du jour par téléphone.',
    lignes: [
      { nom: 'Formule trois services', description: 'à choix multiples, inspirée des produits du moment', prix: '52 €', aConfirmer: true },
      { nom: 'Lunch entrée et plat, ou plat et dessert', description: 'selon les envies des chefs, servi à l’ensemble de la table', prix: '40 €' },
    ],
  },
  {
    id: 'bar', nom: 'Au bar', prixNote: 'trois exemples, prix à confirmer', quand: 'Avant, pendant, après.',
    note: 'Trois exemples relevés par Le Fooding en juillet 2026 ; la carte complète des vins et cocktails se demande à table.',
    lignes: [
      { nom: 'Amaretto sour maison', description: 'le verre', prix: '13 €', aConfirmer: true },
      { nom: 'Anjou, domaine Olivier', description: 'le verre', prix: '9 €', aConfirmer: true },
      { nom: 'Syrah, Stéphane Ogier', description: 'la bouteille', prix: '50 €', aConfirmer: true },
    ],
  },
  {
    id: 'cadeau', nom: 'Bon cadeau', prix: '50 à 150 €', quand: 'À retirer au restaurant.',
    note: 'Demande en ligne sur le site du restaurant, retrait sur place.',
    lignes: [
      { nom: 'Bon cadeau', description: 'quatre montants', prix: '50, 75, 100 ou 150 €' },
    ],
  },
];

export const histoire: string[] = [
  'Les Potes au Feu, c’est d’abord l’histoire d’une rencontre. François Schepens et Damien Gorjanec aiguisent leurs premiers couteaux ensemble au restaurant la Plage d’Amée, à Namur : deux gamins pleins d’envie, le début d’une amitié.',
  'François continue ses classes aux États-Unis et à Montréal. Damien se fait une place en Belgique et cumule des expériences à l’étranger, jusqu’à Shanghai. À chaque retrouvaille, autour d’un verre, le rêve d’un restaurant se dessine.',
  'Début de l’hiver 2019, installés par hasard à une table de ce lieu, avenue de la Plante, ils ne savent pas encore qu’ils y ouvriront leur premier restaurant. Trois mois plus tard, ils en ont les clés.',
  'Le concept tient en une phrase : une cuisine bistronomique à quatre mains, de qualité, avec un ancrage local, et un mot d’ordre, le plaisir. Ils apportent eux-mêmes leurs plats et expliquent leur démarche à table, dans une atmosphère décontractée qui ne se la raconte pas.',
];

export const equipe: Membre[] = [
  { nom: 'Damien Gorjanec', role: 'chef et propriétaire', placeholder: false },
  { nom: 'François Schepens', role: 'chef et propriétaire', placeholder: false },
  { nom: 'Sara', role: 'épaule les chefs', placeholder: false }, // source : « épaulés par la pétillante Sara et Jordan »
  { nom: 'Jordan', role: 'épaule les chefs', placeholder: false },
];

export const faits: { chiffre: string; unite: string; label: string; aConfirmer?: boolean }[] = [
  { chiffre: '4', unite: 'services', label: 'Un menu unique, de saison, le soir du lundi au vendredi.' },
  { chiffre: '67', unite: '€', label: 'Le menu dégustation du soir. Le midi : lunch à 40 €, ou formule à 52 €', aConfirmer: true },
  { chiffre: '2', unite: 'chefs', label: 'Damien et François cuisinent et servent eux-mêmes.' },
  { chiffre: '2020', unite: '', label: 'Les clés de l’avenue de la Plante, début 2020, au bord de la Meuse.' },
];

export const credits = {
  photos: 'Photos : Les Potes au Feu',
  polices: 'Bricolage Grotesque et Caveat',
  outils: 'Astro, GSAP, Lenis',
};
