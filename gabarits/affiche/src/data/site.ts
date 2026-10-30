// Tout le contenu du gabarit « Affiche » vit ici. Source : data/restaurants/les-potes-au-feu/ (donnees.json, dossier.md,
// photos/index.json). Les trous des données réelles sont comblés par des données fictives marquées `placeholder: true` :
// le gabarit les affiche avec la mention « exemple » ou « illustratif », la revue les signale, le client les remplace.
//
// Hypothèses (toutes marquées placeholder) : e-mail de contact ; prix à la carte (le restaurant fonctionne en menu
// unique, les plats du bento portent des prix illustratifs) ; 8 plats inventés pour compléter le bento ; menu du jour ;
// service à emporter (inexistant à ce jour, page entière illustrative) ; rôles de Sara et Jordan ; deux avis Google ;
// prononciation et définition humoristique du nom.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean; badges?: ('végé' | 'épicé' | 'signature')[] }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean }
export interface Membre { nom: string; role: string; photo?: string; placeholder: boolean }
export interface Avis { texte: string; auteur: string; source: string; date: string; note?: number; placeholder: boolean }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }
export interface Couche { numero: string; nom: string; detail: string }
export interface Etape { titre: string; texte: string }

export interface Restaurant {
  slug: string;
  nom: string;
  nomLignes: [string, string]; // le nom sur deux registres (contour puis plein)
  baseline: string;
  description: string; // meta description par défaut (50 à 160 caractères)
  url: string; // site actuel du client
  typeCuisine: string; // schema.org servesCuisine
  adresse: { rue: string; numero: string; cp: string; commune: string; pays: string; repere: string };
  geo: { lat: number; lon: number };
  telephone: string; // format international
  email: { valeur: string; placeholder: boolean };
  reservation: { outil: string; url: string };
  horaires: Horaire[];
  horairesResume: string; // repli sans JavaScript de la pastille d'état
  reseaux: Reseau[];
  definition: { mot: string; prononciation: string; nature: string; sens: string[]; placeholder: boolean };
  signature: { nom: string; couches: Couche[]; prix: string; prixLabel: string; placeholder: boolean };
  carte: Categorie[];
  menus: Menu[];
  menuDuJour: { titre: string; lignes: string[]; prix: string; placeholder: boolean };
  etapes: { surPlace: Etape[]; aEmporter: Etape[]; aEmporterPlaceholder: boolean };
  emporter: Plat[];
  histoire: string[]; // un paragraphe par entrée
  equipe: Membre[];
  avis: Avis[];
  photos: Photo[];
  galerie: string[]; // 8 chemins de photos, dans l'ordre de la bande
  valeurs: string[];
  adieu: string; // mot d'adieu géant du pied de page
  colophon: string;
}

const photo = (src: string, alt: string, largeur: number, hauteur: number): Photo => ({ src, alt, largeur, hauteur, placeholder: false });

export const site: Restaurant = {
  slug: 'les-potes-au-feu',
  nom: 'Les Potes au Feu',
  nomLignes: ['Les potes', 'au feu'],
  baseline: 'Bistronomie à quatre mains, menu unique, servi par les chefs. Avenue de la Plante, Namur.',
  description:
    'Les Potes au Feu, restaurant bistronomique à Namur : cuisine à quatre mains, menu unique de saison en 4 services, produits locaux, servi et expliqué à table par les chefs.',
  url: 'https://www.lespotesaufeu.be',
  typeCuisine: 'Cuisine française moderne, bistronomie',
  adresse: { rue: 'Avenue de la Plante', numero: '4', cp: '5000', commune: 'Namur', pays: 'BE', repere: 'au bord de la Meuse, côté Citadelle' },
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
    { jour: 'samedi', creneaux: [], note: 'privatisation possible' },
    { jour: 'dimanche', creneaux: [], note: 'repos' },
  ],
  horairesResume: 'Le soir du lundi au vendredi, le midi mercredi et vendredi',
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/lespotesaufeu.bistronomie/' },
    { nom: 'YouTube', url: 'https://www.youtube.com/watch?v=dZtMOajOefE' },
  ],
  definition: {
    mot: 'les potes au feu',
    prononciation: '[le pɔt o fø]',
    nature: 'n. m. pl.',
    sens: [
      'Deux copains de cuisine, Damien et François, qui ont aiguisé leurs premiers couteaux ensemble à la Plage d’Amée et ouvert leur propre table avenue de la Plante au début de 2020.',
      'Par extension : un menu unique en quatre services, cuisiné à quatre mains, apporté et expliqué à votre table par ceux qui l’ont préparé. Voir aussi : plaisir, saison, fait maison.',
    ],
    placeholder: true,
  },
  signature: {
    nom: 'Boeuf confit, carottes, cromesquis',
    couches: [
      { numero: '01', nom: 'Assiette', detail: 'rouge, comme en salle' },
      { numero: '02', nom: 'Carottes', detail: 'rôties entières' },
      { numero: '03', nom: 'Boeuf confit', detail: 'cuit lentement' },
      { numero: '04', nom: 'Cromesquis', detail: 'de pommes de terre' },
      { numero: '05', nom: 'Jus et herbes', detail: 'la finition, à table' },
    ],
    prix: '67 €',
    prixLabel: 'le menu dégustation, 4 services, du lundi au vendredi soir',
    placeholder: false,
  },
  carte: [
    {
      categorie: 'Pour commencer',
      plats: [
        { nom: 'Mises en bouche', description: 'Trois bouchées du moment, pour ouvrir le menu', prix: null, placeholder: false },
        { nom: 'Légumes racines, champignons, noix', description: 'Le premier service du menu dégustation', prix: null, placeholder: false, badges: ['végé'] },
        { nom: 'Saint-Jacques, butternut, passion', description: 'Snackées, mousseline et tuile noire', prix: '24 €', placeholder: true },
        { nom: 'Tartare de boeuf aux tuiles', description: 'Couteau, roquette, tuiles croquantes', prix: '19 €', placeholder: true },
        { nom: 'Oeuf parfait, poireau, lard fumé', description: 'Cuit à 63 degrés, bouillon de poireau', prix: '17 €', placeholder: true },
      ],
    },
    {
      categorie: 'Les plats',
      plats: [
        { nom: 'Boeuf confit, carottes, cromesquis', description: 'Le plat de l’assiette rouge, cromesquis de pommes de terre', prix: '34 €', placeholder: true, badges: ['signature'] },
        { nom: 'Lieu jaune, beurre blanc, poireaux', description: 'Poché, beurre blanc au cidre', prix: '31 €', placeholder: true },
        { nom: 'Volaille fermière, maïs, jus corsé', description: 'Suprême rôti, maïs grillé', prix: '29 €', placeholder: true },
        { nom: 'Risotto de petit épeautre, courge', description: 'Épeautre wallon, courge rôtie, parmesan', prix: '26 €', placeholder: true, badges: ['végé'] },
        { nom: 'Agneau, aubergine, harissa', description: 'Épaule confite, aubergine brûlée, harissa maison', prix: '33 €', placeholder: true, badges: ['épicé'] },
      ],
    },
    {
      categorie: 'Les desserts',
      plats: [
        { nom: 'Soufflé au caramel, chaï, poire', description: 'Le dessert du menu dégustation', prix: null, placeholder: false },
        { nom: 'Cerises noires, griottes, crumble de cacao', description: 'Glace vanille au lait cru, cité par le Guide MICHELIN', prix: '12 €', placeholder: true },
        { nom: 'Rosace de pommes, glace, tuile', description: 'Pommes de la région, éclats de tuile', prix: '11 €', placeholder: true },
        { nom: 'Fromages affinés', description: 'À la place du dessert +7 €, avant le dessert +15 €', prix: '+7 €', placeholder: false },
        { nom: 'Chocolat, café, fleur de sel', description: 'Crémeux chocolat noir, crumble café', prix: '12 €', placeholder: true },
      ],
    },
    {
      categorie: 'À boire',
      plats: [
        { nom: 'Accord mets et vins, 4 verres', description: 'Vignerons belges et français', prix: '32 €', placeholder: true },
        { nom: 'Cocktail de la maison', description: 'Au bar, avant le service', prix: '12 €', placeholder: true },
        { nom: 'Vin au verre', description: 'Blanc, rouge, rosé, selon la carte du moment', prix: '6 à 9 €', placeholder: true },
        { nom: 'Bière locale', description: 'Brasseries namuroises, 33 cl', prix: '5 €', placeholder: true },
        { nom: 'Café et mignardise', description: 'Pour finir le menu', prix: null, placeholder: false },
      ],
    },
  ],
  menus: [
    {
      nom: 'Menu dégustation, 4 services',
      prix: '67 €',
      description:
        'Du lundi au vendredi soir. Mises en bouche, légumes racines / champignons / noix, Saint-Jacques / butternut / passion, boeuf confit / carottes / cromesquis, soufflé au caramel / chaï / poire, mignardise. Fromage à la place du dessert +7 €, avant le dessert +15 €.',
      placeholder: false,
    },
    { nom: 'Formule 3 services, le midi', prix: '52 €', description: 'Mercredi et vendredi midi : trois services à choix multiples, inspirés des produits du moment.', placeholder: false },
    {
      nom: 'Lunch entrée-plat ou plat-dessert',
      prix: '40 €',
      description: 'Proposé selon les envies des chefs et servi à l’ensemble de la table. Composition du jour par téléphone.',
      placeholder: false,
    },
  ],
  menuDuJour: {
    titre: 'Le lunch de ce midi',
    lignes: ['Velouté de potimarron, noisettes torréfiées', 'Volaille fermière, maïs grillé, jus corsé', 'Rosace de pommes, glace vanille'],
    prix: '40 €',
    placeholder: true,
  },
  etapes: {
    surPlace: [
      { titre: 'Réservez', texte: 'En ligne via Zenchef, ou par téléphone pour plus de six personnes et les tables de dernière minute.' },
      { titre: 'Installez-vous', texte: 'Petite salle, bar en chêne, cuisine ouverte : vous voyez les deux chefs travailler.' },
      { titre: 'Laissez-vous servir', texte: 'Un menu unique en quatre services, apporté et expliqué à table par Damien et François.' },
    ],
    aEmporter: [
      { titre: 'Commandez', texte: 'Avant 11 h, par téléphone ou en ligne, pour le midi même.' },
      { titre: 'Retirez', texte: 'Entre 12 h et 14 h, avenue de la Plante, en boîte consignée.' },
      { titre: 'Réchauffez', texte: 'Huit minutes au four à 160 degrés, le jus à part, et c’est servi.' },
    ],
    aEmporterPlaceholder: true,
  },
  emporter: [
    { nom: 'Boîte boeuf confit', description: 'Boeuf confit, carottes rôties, cromesquis, jus à part', prix: '24 €', placeholder: true, badges: ['signature'] },
    { nom: 'Boîte lieu jaune', description: 'Lieu jaune, poireaux, beurre blanc au cidre', prix: '22 €', placeholder: true },
    { nom: 'Boîte petit épeautre', description: 'Risotto de petit épeautre, courge, parmesan', prix: '18 €', placeholder: true, badges: ['végé'] },
    { nom: 'Boîte agneau harissa', description: 'Épaule confite, aubergine brûlée, harissa maison', prix: '23 €', placeholder: true, badges: ['épicé'] },
    { nom: 'Dessert du jour', description: 'Rosace de pommes ou crémeux chocolat', prix: '8 €', placeholder: true },
    { nom: 'Le duo', description: 'Deux boîtes plat et deux desserts', prix: '58 €', placeholder: true },
  ],
  histoire: [
    'Les Potes au Feu, c’est d’abord l’histoire d’une rencontre. Il y a quatorze ans, François Schepens et Damien Gorjanec aiguisent leurs premiers couteaux au restaurant la Plage d’Amée à Namur : deux gamins pleins d’envie, le début d’une amitié.',
    'François continue ses classes aux États-Unis et à Montréal, Damien se fait une place en Belgique et cumule des expériences à l’étranger, notamment à Shanghai. À chaque retrouvaille, autour d’un verre, le rêve d’ouvrir un restaurant se dessine.',
    'Début de l’hiver 2019, installés par hasard à une table de ce lieu, ils ne savent pas encore qu’ils y ouvriront leur premier restaurant. Trois mois plus tard, ils en ont les clés.',
    'Le concept : une cuisine bistronomique à quatre mains, de qualité, avec un ancrage local, et un mot d’ordre, le plaisir. Ils servent eux-mêmes leurs plats et expliquent leur démarche à table, dans une atmosphère décontractée qui ne se la raconte pas.',
  ],
  equipe: [
    { nom: 'Damien Gorjanec', role: 'Chef et co-propriétaire', photo: '/photos/chef-damien.webp', placeholder: false },
    { nom: 'François Schepens', role: 'Chef et co-propriétaire', photo: '/photos/chef-francois.webp', placeholder: false },
    { nom: 'Sara', role: 'Salle et bar', photo: '/photos/bar-cocktails.webp', placeholder: true },
    { nom: 'Jordan', role: 'Salle', placeholder: true },
  ],
  avis: [
    {
      texte: 'Un restaurant décontracté qui swingue sur tous les plans. Le plaisir déborde de l’assiette !',
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
    photo('/photos/equipe-trio.webp', 'L’équipe riant sur une banquette autour d’une table en chêne', 800, 725),
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
  galerie: [
    '/photos/plat-boeuf-confit.webp',
    '/photos/cuisine-chefs-passe.webp',
    '/photos/service-francois-table.webp',
    '/photos/salle-clients-bar.webp',
    '/photos/cuisine-salage-viande.webp',
    '/photos/dessert-tarte-pomme.webp',
    '/photos/service-frites.webp',
    '/photos/salle-banquette.webp',
  ],
  valeurs: ['Fait maison', 'Produits des saisons', 'Rencontre et convivialité', 'Producteurs du coin, légumes cultivés localement', 'Les chefs servent et expliquent leurs plats à table'],
  adieu: 'À table !',
  colophon: 'Caractère Archivo (Google Fonts, licence OFL). Photos : Les Potes au Feu et Guide MICHELIN. Couches du plat dessinées par KYW.',
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

/** Jour abrégé en 3 lettres pour les cartes d'horaires. */
export const jourCourt = (j: Jour) => ({ lundi: 'Lun', mardi: 'Mar', mercredi: 'Mer', jeudi: 'Jeu', vendredi: 'Ven', samedi: 'Sam', dimanche: 'Dim' })[j];

/** Les plats du bento de l'accueil : six plats, les vrais d'abord. */
export const bentoAccueil = (): Plat[] => {
  const tous = site.carte.flatMap((c) => c.plats).filter((p) => p.prix);
  return [...tous.filter((p) => p.badges?.includes('signature')), ...tous.filter((p) => !p.badges?.includes('signature'))].slice(0, 6);
};
