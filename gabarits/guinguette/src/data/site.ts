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
  email: { valeur: '', placeholder: true }, // inconnu au dossier : jamais affiché,
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

// ---------------------------------------------------------------------------------------------
// Contenu propre au gabarit « Guinguette ». Tout ce qui n'est pas prouvé par dossier.md porte un
// drapeau `placeholder: true` et une marque visible là où il s'affiche.
// ---------------------------------------------------------------------------------------------

export type ObjetId = 'frites' | 'fourchette' | 'verre' | 'parasol' | 'bouteille' | 'citron';
export interface Objet { id: ObjetId; label: string; x: number; y: number; r: number; taille: number; mobile: boolean; mx?: number }
export interface Tirage { src: string; alt: string; x: number; y: number; r: number; legende: string; placeholder: boolean }
export interface AvisExemple { texte: string; note: number; r: number; placeholder: true }
export interface Picto { categorie: string; picto: ObjetId }

export const guinguette = {
  /** Titre et slogan du hero. Le slogan est une proposition de copy (fictif, marqué). */
  heroTitre: ['À table,', 'entre potes'], // titre neutre : le restaurant est fermé le dimanche (REVISION-1, F2-5)
  slogan: { texte: 'à quatre mains, les coudes sur la table', placeholder: true },
  /** Objets au trait du hero : position en % de la section, rotation en degrés. `mobile` = reste visible en 390 px. */
  objets: [
    { id: 'parasol', label: 'Parasol dessiné au trait', x: 6, y: 10, r: -12, taille: 150, mobile: true, mx: 4 },
    { id: 'verre', label: 'Verre à pied dessiné au trait', x: 84, y: 8, r: 10, taille: 110, mobile: false },
    { id: 'frites', label: 'Cornet de frites dessiné au trait', x: 10, y: 66, r: 8, taille: 130, mobile: true, mx: 40 },
    { id: 'fourchette', label: 'Fourchette dessinée au trait', x: 30, y: 78, r: -40, taille: 120, mobile: false },
    { id: 'bouteille', label: 'Bouteille dessinée au trait', x: 80, y: 60, r: 14, taille: 140, mobile: true, mx: 74 },
    { id: 'citron', label: 'Citron coupé dessiné au trait', x: 62, y: 82, r: -6, taille: 90, mobile: false },
  ] as Objet[],
  /** La table : 12 tirages à cadre blanc (photos réelles, légendes réelles), positions en % et rotation. */
  tirages: [
    { src: '/photos/service-frites.webp', alt: 'Paniers de frites portés en salle, les chefs en arrière-plan', x: 4, y: 6, r: -7, legende: 'Les frites arrivent', placeholder: false },
    { src: '/photos/equipe-trio.webp', alt: "L'équipe riant sur une banquette autour d'une table en chêne", x: 22, y: 2, r: 5, legende: "L'équipe", placeholder: false },
    { src: '/photos/plat-boeuf-confit.webp', alt: 'Boeuf confit, carottes et cromesquis sur assiette rouge', x: 42, y: 4, r: -3, legende: 'Boeuf confit', placeholder: false },
    { src: '/photos/bar-cocktails.webp', alt: 'Deux cocktails rouges dosés au bar', x: 62, y: 3, r: 8, legende: 'Au bar', placeholder: false },
    { src: '/photos/salle-clients-bar.webp', alt: 'Clients attablés au bar, Damien en salle sous les ampoules chaudes', x: 80, y: 8, r: -5, legende: 'Au comptoir', placeholder: false },
    { src: '/photos/service-sauce-table.webp', alt: 'Sauce versée à la cuillère sur un plat, à table', x: 2, y: 44, r: 6, legende: 'La sauce, à table', placeholder: false },
    { src: '/photos/dessert-tarte-pomme.webp', alt: 'Rosace de pommes, glace et éclats de tuile, vue de dessus', x: 20, y: 52, r: -9, legende: 'Rosace de pommes', placeholder: false },
    { src: '/photos/cuisine-francois-poele.webp', alt: 'François poêle en main, Damien penché au premier plan', x: 40, y: 48, r: 4, legende: 'Poêle en main', placeholder: false },
    { src: '/photos/plat-saint-jacques.webp', alt: 'Saint-Jacques snackées, mousseline et tuile noire sur assiette bleue', x: 58, y: 54, r: -6, legende: 'Saint-Jacques', placeholder: false },
    { src: '/photos/service-francois-table.webp', alt: 'François verse une sauce à table devant une cliente', x: 78, y: 50, r: 7, legende: 'Service par les chefs', placeholder: false },
    { src: '/photos/salle-banquette.webp', alt: 'La salle de jour : banquette, coussins moutarde, lambris vert-gris', x: 12, y: 26, r: 3, legende: 'La banquette', placeholder: false },
    { src: '/photos/plat-tartare.webp', alt: 'Tartare de boeuf, roquette et tuiles sur assiette noire', x: 68, y: 28, r: -4, legende: 'Tartare', placeholder: false },
  ] as Tirage[],
  /** Pictogramme au trait par catégorie de carte (celles de la carte réelle puis les exemples). */
  pictos: [
    { categorie: 'Menu dégustation', picto: 'fourchette' },
    { categorie: 'Options', picto: 'citron' },
    { categorie: 'Boissons', picto: 'verre' },
    { categorie: 'Pour commencer', picto: 'citron' },
    { categorie: 'Sur le grill, à partager', picto: 'frites' },
    { categorie: 'Desserts', picto: 'parasol' },
    { categorie: 'À boire en terrasse', picto: 'bouteille' },
  ] as Picto[],
  /** Carte d'exemple : montre le gabarit avec une carte longue. Entièrement fictive (le restaurant travaille en menu unique). */
  carteExemple: [
    {
      categorie: 'Pour commencer',
      plats: [
        { nom: 'Croquettes de crevettes grises', description: 'persil frit, citron', prix: '14 €', placeholder: true, vege: false },
        { nom: 'Tomates du marché', description: 'burrata, huile aux herbes', prix: '13 €', placeholder: true, vege: true },
        { nom: 'Rillettes de la maison', description: 'pain grillé, cornichons', prix: '11 €', placeholder: true, vege: false },
        { nom: 'Soupe froide de courgette', description: 'menthe, feta', prix: '9 €', placeholder: true, vege: true },
        { nom: 'Planche de terrasse à partager', description: 'charcuteries, fromages, pickles', prix: '22 €', placeholder: true, vege: false },
      ],
    },
    {
      categorie: 'Sur le grill, à partager',
      plats: [
        { nom: 'Côte à l’os pour deux', description: 'frites fraîches, salade, sauce du jour', prix: '58 €', placeholder: true, vege: false },
        { nom: 'Demi-poulet fermier', description: 'jus corsé, pommes grenaille', prix: '21 €', placeholder: true, vege: false },
        { nom: 'Boulets sauce lapin', description: 'frites fraîches, compote', prix: '17 €', placeholder: true, vege: false },
        { nom: 'Légumes grillés et halloumi', description: 'yaourt au citron, graines', prix: '18 €', placeholder: true, vege: true },
        { nom: 'Burger de la guinguette', description: 'cheddar, oignons confits, frites', prix: '19 €', placeholder: true, vege: false },
        { nom: 'Fish and chips', description: 'cabillaud, sauce tartare', prix: '20 €', placeholder: true, vege: false },
      ],
    },
    {
      categorie: 'Desserts',
      plats: [
        { nom: 'Dame blanche', description: 'chocolat chaud, chantilly', prix: '8 €', placeholder: true, vege: true },
        { nom: 'Tarte du jour', description: 'selon le marché', prix: '7 €', placeholder: true, vege: true },
        { nom: 'Gaufre de Bruxelles', description: 'sucre glace, fruits rouges', prix: '8 €', placeholder: true, vege: true },
        { nom: 'Café gourmand', description: 'trois mignardises', prix: '9 €', placeholder: true, vege: true },
        { nom: 'Fromages affinés', description: 'pain aux noix', prix: '12 €', placeholder: true, vege: true },
      ],
    },
    {
      categorie: 'À boire en terrasse',
      plats: [
        { nom: 'Limonade maison', description: 'citron, menthe', prix: '4,5 €', placeholder: true, vege: true },
        { nom: 'Bière de la région', description: '33 cl', prix: '5 €', placeholder: true, vege: true },
        { nom: 'Spritz de la guinguette', description: 'apéritif, prosecco, orange', prix: '9 €', placeholder: true, vege: true },
        { nom: 'Verre de vin', description: 'blanc, rosé ou rouge', prix: '6 €', placeholder: true, vege: true },
        { nom: 'Carafe d’eau filtrée', description: 'plate ou pétillante', prix: '2 €', placeholder: true, vege: true },
      ],
    },
  ] as (Categorie & { plats: (Plat & { vege: boolean })[] })[],
  /** Avis d'exemple : sans nom ni source, étiquetés « Exemple d'avis » à l'écran. */
  avisExemples: [
    { texte: 'On a attrapé la dernière table du vendredi midi. Les enfants ont fini les frites des parents.', note: 5, r: -4, placeholder: true },
    { texte: 'Les chefs posent l’assiette et racontent le plat. On repart avec le sourire et la recette.', note: 5, r: 3, placeholder: true },
    { texte: 'Menu unique, zéro hésitation. Le soufflé au caramel a mis la table d’accord.', note: 5, r: -2, placeholder: true },
    { texte: 'Simple, généreux, précis. Le genre d’adresse qu’on garde pour soi puis qu’on donne quand même.', note: 5, r: 5, placeholder: true },
  ] as AvisExemple[],
  /** Menu unique : nombre de services et période annoncés par le dossier (constantes, jamais calculées). */
  menuUnique: { services: 4, prix: '67 €', periode: 'du lundi au vendredi soir' },
  /** Terrasse et emporter : inconnus au dossier → entièrement illustratifs. */
  terrasse: {
    connue: false,
    placeholder: true,
    exemple: {
      texte: 'Exemple de texte : une terrasse de vingt couverts côté Meuse, ouverte aux mêmes heures que la salle, sans réservation en terrasse.',
      points: ['20 couverts dehors*', 'parasols et plaids*', 'enfants bienvenus*', 'chiens tenus en laisse*'],
    },
  },
  emporter: { connu: false, placeholder: true },
  /** Manifeste : phrases tirées des valeurs réelles du dossier. */
  manifeste: {
    titre: ['Bon, généreux', 'et accueillant'],
    motItalique: 'accueillant',
    texte: 'Une cuisine bistronomique à quatre mains, de qualité, avec un ancrage local, et un mot d’ordre, le plaisir. Les chefs servent eux-mêmes et expliquent leurs plats à table.',
  },
  finale: 'À table !',
};

/** Vrai si l'heure donnée (HH:MM) est dans un créneau. */
export const estOuvert = (h: Horaire, hhmm: string) => h.creneaux.some((c) => c.ouverture <= hhmm && hhmm < c.fermeture);
