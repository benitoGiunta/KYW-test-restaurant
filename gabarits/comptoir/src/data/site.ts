// Tout le contenu du site vit ici. Source : data/restaurants/les-potes-au-feu/dossier.md et donnees.json.
// Règle « une donnée, un drapeau » : `placeholder: true` ne couvre que le champ qu'il accompagne ; toute sous-donnée
// non prouvée par le dossier porte son propre drapeau et une mention visible « illustratif » dans le gabarit.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
// horsService : ligne du menu qui n'est pas un des services comptés (mises en bouche, mignardise) : pas de numéro.
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean; horsService?: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
// services : nombre de services annoncé par le dossier (constante, jamais `plats.length`).
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean; services?: number }
export interface Membre { nom: string; role: string; photo?: string; placeholder: boolean; rolePlaceholder?: boolean }
// Avis placeholder : jamais de nom de personne ni de source réelle (Google…) ; auteur et source vides, marque « exemple » avant la citation.
export interface Avis { texte: string; auteur: string; source: string; date: string; note?: number; placeholder: boolean }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }

/** Un composant du dressage : médaillon détouré posé sur l'assiette (coordonnées en % de la scène carrée). */
export interface Composant {
  nom: string;
  src: string;
  x: number; // centre, % de la scène
  y: number;
  d: number; // diamètre, % de la scène
  cote: 'gauche' | 'droite'; // côté de la légende en desktop
  ly: number; // hauteur de la légende, % de la scène
  placeholder: boolean; // true : composant déduit de la photo, pas du dossier
}
export interface Dressage { plat: string; service: string; composants: Composant[] }
export interface Distinction { texte: string; source: string; url?: string; placeholder: boolean }

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
  email: { valeur: string; placeholder: boolean }; // placeholder : affiché en texte non cliquable marqué, jamais en mailto:
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
  dressage: Dressage;
  distinctions: Distinction[];
  phrase: { avant: string; accent: string; apres: string }; // la phrase-manifeste de l'accueil
  groupes: string; // note groupes et privatisation (dossier)
  bonCadeau: { montants: string; mode: string };
  legendes: Record<string, string>; // légende courte par photo (distincte du texte alternatif)
}

const photo = (src: string, alt: string, largeur: number, hauteur: number, placeholder = false): Photo => ({ src, alt, largeur, hauteur, placeholder });

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
  // Le dossier ne donne que les noms des services : les descriptions restent vides.
  carte: [
    {
      categorie: 'Menu dégustation unique, 4 services, 67 € (du lundi au vendredi soir)',
      plats: [
        { nom: 'Mises en bouche', description: '', prix: null, placeholder: false, horsService: true },
        { nom: 'Légumes racines / Champignons / Noix', description: '', prix: null, placeholder: false },
        { nom: 'Saint-Jacques / Butternut / Passion', description: '', prix: null, placeholder: false },
        { nom: 'Bœuf confit / Carottes / Cromesquis de pommes de terre', description: '', prix: null, placeholder: false },
        { nom: 'Soufflé au caramel / Chaï / Poire', description: '', prix: null, placeholder: false },
        { nom: 'Mignardise', description: '', prix: null, placeholder: false, horsService: true },
      ],
    },
    {
      categorie: 'Suppléments et options',
      plats: [
        { nom: 'Fromage à la place du dessert', description: '', prix: '+7 €', placeholder: false },
        { nom: 'Fromage avant le dessert', description: '', prix: '+15 €', placeholder: false },
        { nom: 'Menu végétarien', description: 'sur demande', prix: null, placeholder: false },
        { nom: 'Allergies et intolérances', description: 'le menu est adapté, à signaler lors de la réservation', prix: null, placeholder: false },
      ],
    },
    {
      categorie: 'Boissons',
      plats: [
        { nom: 'Accord mets et vins, 4 verres', description: '', prix: '32 €', placeholder: true },
        { nom: 'Cocktail de la maison', description: '', prix: '12 €', placeholder: true },
      ],
    },
  ],
  menus: [
    {
      nom: 'Menu dégustation unique, 4 services',
      prix: '67 €',
      description: 'Du lundi au vendredi soir. Fromage à la place du dessert +7 €, avant le dessert +15 €.',
      placeholder: false,
      services: 4, // dossier : « 4 services » (6 lignes, mises en bouche et mignardise comprises)
    },
    { nom: 'Formule 3 services, le midi', prix: '52 €', description: 'Formule à choix multiples inspirée des produits du moment, les mercredis et vendredis midi.', placeholder: false },
    {
      nom: 'Lunch, entrée-plat ou plat-dessert',
      prix: '40 €',
      description: "Proposé en fonction des envies des chefs et servi à l'ensemble de la table ; composition sur demande par téléphone.",
      placeholder: false,
    },
  ],
  histoire: [
    "Les Potes au Feu, c'est d'abord l'histoire d'une rencontre. Dès leurs débuts, François Schepens et Damien Gorjanec aiguisent leurs premiers couteaux au restaurant la Plage d'Amée à Namur : deux gamins pleins d'envie, le début d'une amitié.",
    "François continue ses classes aux États-Unis et à Montréal, Damien se fait une place en Belgique et cumule des expériences à l'étranger, notamment à Shanghai. À chaque retrouvaille, autour d'un verre, le rêve d'ouvrir un restaurant se dessine.",
    "Début de l'hiver 2019, installés par hasard à une table de ce lieu, ils ne savent pas encore qu'ils y ouvriront leur premier restaurant. Trois mois plus tard, ils en ont les clés.",
    "Le concept : une cuisine bistronomique à quatre mains, de qualité, avec un ancrage local, et un mot d'ordre, le plaisir. Ils servent eux-mêmes leurs plats et expliquent leur démarche à table, dans une atmosphère décontractée qui ne se la raconte pas.",
  ],
  equipe: [
    { nom: 'Damien Gorjanec', role: 'Chef et co-propriétaire', photo: '/photos/chef-damien-nb.webp', placeholder: false },
    { nom: 'François Schepens', role: 'Chef et co-propriétaire', photo: '/photos/chef-francois-nb.webp', placeholder: false },
    { nom: 'Sara', role: 'Salle', placeholder: false, rolePlaceholder: true }, // prénom cité par le site ; rôle non précisé
    { nom: 'Jordan', role: 'Salle', placeholder: false, rolePlaceholder: true },
  ],
  avis: [
    {
      texte: "Un restaurant décontracté qui swingue sur tous les plans. Le plaisir déborde de l'assiette !",
      auteur: 'Guide MICHELIN Belgique 2026',
      source: 'avis d’inspecteur',
      date: '2026-05-04',
      placeholder: false,
    },
    {
      texte: 'Les chefs viennent eux-mêmes présenter chaque assiette. On repart avec le sourire.',
      auteur: '',
      source: '',
      date: '',
      placeholder: true, // exemple de gabarit : aucun avis client dans le dossier
    },
    {
      texte: 'Menu unique, zéro hésitation, que du plaisir. Le service est aussi simple que précis.',
      auteur: '',
      source: '',
      date: '',
      placeholder: true,
    },
  ],
  photos: [
    photo('/photos/assiette-boeuf.webp', 'Bœuf confit, carottes et cromesquis sur assiette rouge, vue de dessus, détourée', 1400, 1400),
    photo('/photos/assiette-saint-jacques.webp', 'Saint-Jacques snackées et mousseline, vue de dessus, détourée', 410, 410),
    photo('/photos/assiette-dessert.webp', 'Rosace de pommes et glace, vue de dessus, détourée', 1040, 1040),
    photo('/photos/chef-damien-nb.webp', 'Damien Gorjanec en cuisine, portrait en noir et blanc', 1200, 1599),
    photo('/photos/chef-francois-nb.webp', 'François Schepens en cuisine, portrait en noir et blanc', 1200, 1599),
    photo('/photos/chef-damien.webp', 'Damien Gorjanec en cuisine, tablier noir devant la hotte rouge', 1351, 1800),
    photo('/photos/chef-francois.webp', 'François Schepens en cuisine, tablier noir devant la hotte rouge', 1351, 1800),
    photo('/photos/equipe-trio.webp', "L'équipe riant sur une banquette autour d'une table en chêne", 800, 725),
    photo('/photos/dessert-tarte-pomme.webp', 'Rosace de pommes, glace et éclats de tuile, vue de dessus', 800, 725),
    photo('/photos/plat-tartare.webp', 'Tartare de bœuf, roquette et tuiles sur assiette noire', 550, 825),
    photo('/photos/plat-saint-jacques.webp', 'Saint-Jacques snackées, mousseline et tuile noire sur assiette bleue', 550, 825),
    photo('/photos/salle-bar-panoramique.webp', 'Le bar vert sombre et une table haute dressée, vue sur la cuisine', 1800, 468),
    photo('/photos/salle-ampoules.webp', 'Ampoules à filament suspendues devant une étagère en bois', 1140, 642),
    photo('/photos/salle-clients-bar.webp', 'Clients attablés au bar, Damien en salle sous les ampoules chaudes', 1140, 642),
    photo('/photos/cuisine-francois-poele.webp', 'François poêle en main, Damien penché au premier plan', 1140, 642),
    photo('/photos/service-planche.webp', 'Une planche de viande portée vers la salle', 1140, 642),
    photo('/photos/cuisine-chefs-dressage.webp', 'Les deux chefs concentrés au dressage sous les lampes chauffantes', 1140, 642),
    photo('/photos/cuisine-chefs-passe.webp', 'Les deux chefs au passe, dressage des assiettes', 1140, 642),
    photo('/photos/service-sauce-table.webp', 'Sauce versée à la cuillère sur un plat, à table', 1140, 642),
    photo('/photos/service-francois-table.webp', 'François verse une sauce à table devant une cliente', 1140, 642),
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
  // Dressage : le plat est réel (carte du 28/10/2026) ; les trois premiers composants sont son intitulé.
  // « Jus » et « pousses » sont lus sur la photo, pas dans le dossier : drapeau propre, mention « illustratif ».
  dressage: {
    plat: 'Bœuf confit / Carottes / Cromesquis de pommes de terre',
    service: 'Au menu dégustation, entre la Saint-Jacques et le soufflé',
    composants: [
      { nom: 'Bœuf confit', src: '/photos/composant-boeuf.webp', x: 52, y: 53, d: 23, cote: 'droite', ly: 56, placeholder: false },
      { nom: 'Carottes', src: '/photos/composant-carotte.webp', x: 41, y: 40, d: 16, cote: 'gauche', ly: 32, placeholder: false },
      { nom: 'Cromesquis de pommes de terre', src: '/photos/composant-cromesquis.webp', x: 60, y: 39, d: 11, cote: 'droite', ly: 28, placeholder: false },
      { nom: 'Jus', src: '/photos/composant-jus.webp', x: 61, y: 63, d: 11, cote: 'droite', ly: 84, placeholder: true },
      { nom: 'Pousses', src: '/photos/composant-pousses.webp', x: 43, y: 64, d: 10, cote: 'gauche', ly: 70, placeholder: true },
    ],
  },
  distinctions: [
    {
      texte: 'Restaurant sélectionné par le Guide MICHELIN',
      source: 'Guide MICHELIN Belgique 2026',
      url: 'https://guide.michelin.com/fr/fr/namur/namur/restaurant/les-potes-au-feu',
      placeholder: false,
    },
  ],
  phrase: { avant: 'Deux potes au passe, un menu unique de saison, et des assiettes', accent: 'servies par ceux qui les cuisinent', apres: '.' },
  groupes: 'Au-delà de six personnes ou pour une demande de dernière minute, réservez par téléphone. Le samedi, le restaurant se privatise : mariage, événement ou chef à domicile.',
  bonCadeau: { montants: '50, 75, 100 ou 150 €', mode: 'demande en ligne, retrait au restaurant' },
  legendes: {
    '/photos/cuisine-chefs-passe.webp': 'Au passe',
    '/photos/service-francois-table.webp': 'La sauce, à table',
    '/photos/equipe-trio.webp': "L'équipe",
    '/photos/cuisine-chefs-dressage.webp': 'Le dressage',
    '/photos/salle-clients-bar.webp': 'Le bar',
    '/photos/service-planche.webp': 'En salle',
    '/photos/salle-ampoules.webp': 'La salle',
    '/photos/dessert-tarte-pomme.webp': 'Rosace de pommes',
  },
};

/** Photo par chemin (erreur explicite si le chemin n'existe pas : un gabarit ne doit pas pointer dans le vide). */
export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}

/** Adresse sur une ligne. */
export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;

/** Heure à la française : '19:00' → '19 h', '12:30' → '12 h 30'. */
export const heure = (hhmm: string) => { const [h, m] = hhmm.split(':'); return m === '00' ? `${Number(h)} h` : `${Number(h)} h ${m}`; };

/** Horaires lisibles : '12 h à 14 h, 19 h à 21 h' ou la note. */
export const horaireTexte = (h: Horaire) =>
  h.creneaux.length ? h.creneaux.map((c) => `${heure(c.ouverture)} à ${heure(c.fermeture)}`).join(', ') : h.note || 'fermé';

/** Numéro romain d'une ligne du menu : les lignes hors service (mises en bouche, mignardise) n'en ont pas. */
export const numeroService = (plats: Plat[], i: number) =>
  plats[i].horsService ? '' : romain(plats.slice(0, i + 1).filter((p) => !p.horsService).length);

/** Nombre de services annoncé (constante du dossier ; repli : lignes comptées hors service). */
export const nbServices = (r: Restaurant = site) => r.menus[0].services ?? r.carte[0].plats.filter((p) => !p.horsService).length;

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;

/** Chiffres romains des services. */
export const romain = (n: number) => ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][n - 1] ?? String(n);
