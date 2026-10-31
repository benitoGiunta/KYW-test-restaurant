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
export type CouleurActivite = 'vert' | 'rose' | 'bleu';
/** Une activité du lieu : `reelle: false` = activité illustrative du gabarit (marquée partout où elle s'affiche). */
export interface Activite { id: string; nom: string; motItalique: string; couleur: CouleurActivite; accroche: string; reelle: boolean }
/** Événement d'exemple : jamais de date en dur, seulement un jour de semaine et une heure. */
export interface Evenement { titre: string; jour: Jour; heure: string; activite: string; photo: string; detail: string; placeholder: boolean }
export interface Formule { nom: string; prix: string; lignes: string[]; placeholder: boolean }
export interface Sticker { texte: string; placeholder: boolean }

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
  activites: Activite[];
  evenements: Evenement[];
  brunch: Formule;
  stickers: Sticker[];
  privatisation: { phrase: string; placeholder: boolean };
  quartier: { phrase: string; placeholder: boolean };
  manifeste: { avant: string; italique: string; apres: string };
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
      auteur: '',
      source: "Exemple d'avis",
      date: '2026-03-18',
      note: 5,
      placeholder: true,
    },
    {
      texte: 'Menu unique, zéro hésitation, que du plaisir. Le cadre est chaleureux et le service aussi simple que précis.',
      auteur: '',
      source: "Exemple d'avis",
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
  manifeste: { avant: 'Une cuisine à quatre mains, un menu unique, et un mot d', italique: 'ordre', apres: ' : le plaisir.' },
  activites: [
    { id: 'table', nom: 'Table', motItalique: 'quatre mains', couleur: 'vert', accroche: 'La table, à', reelle: true },
    { id: 'scene', nom: 'Scène', motItalique: 'on rit', couleur: 'rose', accroche: 'Le soir où', reelle: false },
    { id: 'brunch', nom: 'Brunch', motItalique: 'tard', couleur: 'bleu', accroche: 'Le dimanche, on se lève', reelle: false },
  ],
  // Six événements d'exemple pour illustrer l'agenda ligné : aucun n'existe, aucune date.
  evenements: [
    { titre: 'Plateau d\'humour', jour: 'jeudi', heure: '20:30', activite: 'scene', photo: '/photos/salle-ampoules.webp', detail: 'Trois humoristes, un micro, le bar ouvert.', placeholder: true },
    { titre: 'Quatuor au bar', jour: 'vendredi', heure: '21:00', activite: 'scene', photo: '/photos/bar-cocktails.webp', detail: 'Jazz en quatuor, entre les tables.', placeholder: true },
    { titre: 'Brunch des voisins', jour: 'dimanche', heure: '11:00', activite: 'brunch', photo: '/photos/dessert-tarte-pomme.webp', detail: 'Grande tablée, formule unique.', placeholder: true },
    { titre: 'Lecture à voix haute', jour: 'mercredi', heure: '19:30', activite: 'scene', photo: '/photos/salle-banquette.webp', detail: 'Un auteur, un texte, un verre.', placeholder: true },
    { titre: 'Soirée vigneron', jour: 'mardi', heure: '19:00', activite: 'table', photo: '/photos/salle-clients-bar.webp', detail: 'Un vigneron à table, cinq verres.', placeholder: true },
    { titre: 'Brunch en famille', jour: 'dimanche', heure: '10:30', activite: 'brunch', photo: '/photos/cuisine-mains-pate.webp', detail: 'Pâtisserie du matin, jus pressés.', placeholder: true },
  ],
  brunch: { nom: 'Formule brunch', prix: '32 €', lignes: ['Viennoiseries maison', 'Œufs au choix', 'Pain, beurre, confitures', 'Jus pressé et café'], placeholder: true },
  stickers: [
    { texte: 'Fait maison', placeholder: false },
    { texte: 'Produits des saisons', placeholder: false },
    { texte: 'Servi par les chefs', placeholder: false },
  ],
  privatisation: { phrase: 'Le samedi, le restaurant se privatise : mariages, événements, ou chef à domicile.', placeholder: false },
  quartier: { phrase: 'Avenue de la Plante, au bord de la Meuse, côté Citadelle, entre le Casino et le Royal Snail.', placeholder: false },
};

/** Jours de service (créneaux non vides), pour l'agenda sans date. */
export const joursService = (r: Restaurant = site) => r.horaires.filter((h) => h.creneaux.length).map((h) => h.jour);
export const activiteDe = (id: string): Activite => {
  const a = site.activites.find((x) => x.id === id);
  if (!a) throw new Error(`Activité inconnue : ${id}`);
  return a;
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
