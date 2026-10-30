// Tout le contenu du site vit ici. Source : data/restaurants/les-potes-au-feu/ (donnees.json, dossier.md, photos/index.json).
// Les trous des données réelles sont comblés par des données fictives marquées `placeholder: true` :
// le gabarit les affiche, la revue les signale, le client les remplace.
//
// Hypothèses du gabarit « Quatre mains » (toutes marquées placeholder dans les données ci-dessous) :
// - les rôles « le soir / le salé » (Damien) et « le midi / le sucré » (François) sont une mise en scène du diptyque, pas une
//   répartition réelle du travail ; l'attribution des plats à l'un ou à l'autre (tags D / F) est illustrative ;
// - les années des parcours sont déduites du récit du site (« il y a quatorze ans ») ; seules 2019 et 2020 sont sûres ;
// - l'e-mail, les boissons, la composition des formules du midi, les deux avis Google et les rôles de Sara et Jordan sont fictifs.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';
export type Voix = 'D' | 'F'; // D = Damien (colonne verte), F = François (colonne moutarde)

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean; voix?: Voix; photo?: string }
export interface Categorie { categorie: string; moment?: 'soir' | 'midi' | 'commun'; intro?: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean; moment?: 'soir' | 'midi' | 'commun' }
export interface Membre { nom: string; role: string; photo?: string; placeholder: boolean; voix?: Voix }
export interface Avis { texte: string; auteur: string; source: string; date: string; note?: number; placeholder: boolean }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }
export interface Etape { annee: string; lieu: string; texte: string; placeholder: boolean }
export interface Chef {
  voix: Voix;
  prenom: string;
  nom: string;
  role: string; // « Chef et co-propriétaire »
  registre: string; // la voix de la colonne : « Le soir, le salé »
  portrait: string;
  bio: string[];
  parcours: Etape[];
  citation: { texte: string; placeholder: boolean };
  platsFetiches: string[]; // noms de plats, renvoient à `carteQuatreMains`
}

export interface Restaurant {
  slug: string;
  nom: string;
  nomCoupe: [string, string]; // le nom en deux lignes sur mobile : ligne 1 sur vert, ligne 2 sur moutarde
  baseline: string;
  description: string; // meta description par défaut (50 à 160 caractères)
  url: string; // site actuel du client
  typeCuisine: string; // schema.org servesCuisine
  adresse: { rue: string; numero: string; cp: string; commune: string; pays: string; repere?: string };
  geo: { lat: number; lon: number };
  telephone: string; // format international
  email: { valeur: string; placeholder: boolean };
  reservation: { outil: string; url: string; note: string };
  horaires: Horaire[];
  reseaux: Reseau[];
  chefs: [Chef, Chef];
  rencontre: string[]; // la section commune « La rencontre »
  carteQuatreMains: Plat[]; // les 8 plats de la liste à stage de l'accueil
  carte: Categorie[];
  menus: Menu[];
  menuDuJour: { titre: string; date: string; lignes: string[]; prix: string; placeholder: boolean };
  histoire: string[]; // un paragraphe par entrée
  equipe: Membre[];
  avis: Avis[];
  photos: Photo[];
  galerie: string[]; // chemins de `photos`, 8 à 12 entrées
  valeurs: string[];
  privatisation: string;
  colophon: string[];
}

const photo = (src: string, alt: string, largeur: number, hauteur: number): Photo => ({ src, alt, largeur, hauteur, placeholder: false });

export const site: Restaurant = {
  slug: 'les-potes-au-feu',
  nom: 'Les Potes au Feu',
  nomCoupe: ['Les Potes', 'au Feu'],
  baseline: "Bistronomie à Namur. L'histoire d'une rencontre, celle de deux potes passionnés.",
  description:
    'Les Potes au Feu, restaurant bistronomique à Namur : cuisine à quatre mains, menu unique de saison, produits locaux et fait maison, servi par les chefs.',
  url: 'https://www.lespotesaufeu.be',
  typeCuisine: 'Cuisine française moderne, bistronomie',
  adresse: { rue: 'Avenue de la Plante', numero: '4', cp: '5000', commune: 'Namur', pays: 'BE', repere: 'au bord de la Meuse, côté Citadelle' },
  geo: { lat: 50.4586737, lon: 4.8643452 },
  telephone: '+32 81 64 04 44',
  email: { valeur: 'bonjour@lespotesaufeu.be', placeholder: true },
  reservation: {
    outil: 'Zenchef',
    url: 'https://bookings.zenchef.com/results?rid=379477',
    note: 'Pour une table de plus de six personnes ou une réservation de dernière minute, appelez-nous.',
  },
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
  chefs: [
    {
      voix: 'D',
      prenom: 'Damien',
      nom: 'Gorjanec',
      role: 'Chef et co-propriétaire',
      registre: 'Le soir, le salé',
      portrait: '/photos/chef-damien.webp',
      bio: [
        "Damien s'est fait une place en Belgique, puis a cuisiné à l'étranger, jusqu'à Shanghai. Il tient la partie salée du menu et le service du soir : le boeuf confit, les Saint-Jacques, les légumes racines.",
        'À table, c\'est souvent lui qui pose l\'assiette et raconte le producteur qui est derrière.',
      ],
      parcours: [
        { annee: '2012', lieu: "La Plage d'Amée, Namur", texte: 'Premiers couteaux aiguisés à côté de François. Deux gamins pleins d\'envie.', placeholder: true },
        { annee: '2014', lieu: 'Bruxelles', texte: 'Il se fait une place dans les cuisines belges, de la brasserie à la table gastronomique.', placeholder: true },
        { annee: '2017', lieu: 'Shanghai', texte: 'Une saison à l\'autre bout du monde : le wok, le feu vif, les marchés à cinq heures du matin.', placeholder: true },
        { annee: '2019', lieu: 'Avenue de la Plante, Namur', texte: 'Début de l\'hiver, une table réservée par hasard dans ce lieu. Le rêve prend une adresse.', placeholder: false },
        { annee: '2020', lieu: 'Les Potes au Feu', texte: 'Trois mois plus tard, les clés. Le restaurant ouvre à quatre mains.', placeholder: false },
      ],
      citation: { texte: 'On cuisine à deux parce qu\'on a appris à deux. Le reste, c\'est du plaisir.', placeholder: true },
      platsFetiches: ['Boeuf confit, carottes, cromesquis de pommes de terre', 'Saint-Jacques, butternut, passion'],
    },
    {
      voix: 'F',
      prenom: 'François',
      nom: 'Schepens',
      role: 'Chef et co-propriétaire',
      registre: 'Le midi, le sucré',
      portrait: '/photos/chef-francois.webp',
      bio: [
        'François a fait ses classes aux États-Unis et à Montréal. Il signe les desserts et les formules du midi : le soufflé au caramel, la rosace de pommes, la mignardise qui ferme le repas.',
        'Il aime les menus courts, servis à toute la table, et les explications qui tiennent en une phrase.',
      ],
      parcours: [
        { annee: '2012', lieu: "La Plage d'Amée, Namur", texte: 'Même cuisine, même année : la rencontre avec Damien, et le début d\'une amitié.', placeholder: true },
        { annee: '2014', lieu: 'États-Unis', texte: 'Il continue ses classes outre-Atlantique, dans des cuisines qui ne dorment jamais.', placeholder: true },
        { annee: '2016', lieu: 'Montréal', texte: 'La pâtisserie de restaurant, les hivers longs et les marchés de Jean-Talon.', placeholder: true },
        { annee: '2019', lieu: 'Avenue de la Plante, Namur', texte: 'La même table, le même soir. Il regarde la salle et imagine déjà la cuisine ouverte.', placeholder: false },
        { annee: '2020', lieu: 'Les Potes au Feu', texte: 'Les clés, puis le premier service. Le menu s\'écrit à deux depuis.', placeholder: false },
      ],
      citation: { texte: 'Un menu unique, c\'est une promesse : on ne vous laisse pas choisir, on vous régale.', placeholder: true },
      platsFetiches: ['Soufflé au caramel, chaï, poire', 'Rosace de pommes, glace et tuile'],
    },
  ],
  rencontre: [
    "Il y a quatorze ans, François et Damien aiguisent leurs premiers couteaux ensemble à la Plage d'Amée, à Namur. À chaque retrouvaille, autour d'un verre, le rêve d'ouvrir un restaurant se dessine.",
    "Début de l'hiver 2019, installés par hasard à une table de ce lieu, ils ne savent pas encore qu'ils y ouvriront leur premier restaurant. Trois mois plus tard, ils en ont les clés.",
  ],
  carteQuatreMains: [
    { nom: 'Mises en bouche', description: 'Trois bouchées pour ouvrir le repas, selon le marché du jour.', prix: null, placeholder: false, voix: 'F', photo: '/photos/cuisine-chefs-dressage.webp' },
    { nom: 'Légumes racines, champignons, noix', description: 'Les légumes cultivés localement, rôtis et crus, un jus de champignons.', prix: null, placeholder: false, voix: 'D', photo: '/photos/cuisine-mains-pate.webp' },
    { nom: 'Saint-Jacques, butternut, passion', description: 'Snackées, mousseline de butternut, tuile noire, vinaigrette passion.', prix: null, placeholder: false, voix: 'D', photo: '/photos/plat-saint-jacques.webp' },
    { nom: 'Tartare de boeuf aux tuiles', description: 'Coupé au couteau, roquette, tuiles croquantes.', prix: null, placeholder: true, voix: 'D', photo: '/photos/plat-tartare.webp' },
    { nom: 'Boeuf confit, carottes, cromesquis de pommes de terre', description: 'Cuit longtemps, carottes glacées, cromesquis fondant, jus réduit.', prix: null, placeholder: false, voix: 'D', photo: '/photos/plat-boeuf-confit.webp' },
    { nom: 'Fromages de la région', description: 'À la place du dessert (+7 €) ou avant (+15 €).', prix: null, placeholder: false, voix: 'D', photo: '/photos/cuisine-salage-viande.webp' },
    { nom: 'Soufflé au caramel, chaï, poire', description: 'Servi dès la sortie du four, glace au chaï, poire pochée.', prix: null, placeholder: false, voix: 'F', photo: '/photos/cuisine-francois-poele.webp' },
    { nom: 'Rosace de pommes, glace et tuile', description: 'Pommes en rosace, glace vanille, éclats de tuile.', prix: null, placeholder: true, voix: 'F', photo: '/photos/dessert-tarte-pomme.webp' },
  ],
  carte: [
    {
      categorie: 'Le soir : menu dégustation unique, 4 services',
      moment: 'soir',
      intro: 'Du lundi au vendredi soir, 67 € par personne. Un seul menu, écrit à quatre mains, qui change au fil des saisons.',
      plats: [
        { nom: 'Mises en bouche', description: 'Trois bouchées selon le marché du jour', prix: null, placeholder: false, voix: 'F' },
        { nom: 'Légumes racines, champignons, noix', description: 'Rôtis et crus, jus de champignons', prix: null, placeholder: false, voix: 'D' },
        { nom: 'Saint-Jacques, butternut, passion', description: 'Snackées, mousseline, tuile noire', prix: null, placeholder: false, voix: 'D' },
        { nom: 'Boeuf confit, carottes, cromesquis de pommes de terre', description: 'Cuit longtemps, jus réduit', prix: null, placeholder: false, voix: 'D' },
        { nom: 'Soufflé au caramel, chaï, poire', description: 'Glace au chaï, poire pochée', prix: null, placeholder: false, voix: 'F' },
        { nom: 'Mignardise', description: 'Pour finir avec le café', prix: null, placeholder: false, voix: 'F' },
        { nom: 'Fromage à la place du dessert', description: 'Supplément', prix: '+7 €', placeholder: false },
        { nom: 'Fromage avant le dessert', description: 'Supplément', prix: '+15 €', placeholder: false },
      ],
    },
    {
      categorie: 'Le midi : formule 3 services, mercredi et vendredi',
      moment: 'midi',
      intro: 'Formule à choix multiples, 52 €, inspirée des produits du moment. Lunch entrée-plat ou plat-dessert à 40 €, servi à l\'ensemble de la table.',
      plats: [
        { nom: 'Oeuf parfait, poireaux, noisettes', description: 'Entrée du moment', prix: null, placeholder: true, voix: 'F' },
        { nom: 'Truite de rivière, fenouil, beurre blanc', description: 'Entrée du moment', prix: null, placeholder: true, voix: 'D' },
        { nom: 'Volaille fermière, chou pointu, jus au thym', description: 'Plat du moment', prix: null, placeholder: true, voix: 'D' },
        { nom: 'Risotto d\'épeautre, courge, pecorino', description: 'Plat du moment, végétarien', prix: null, placeholder: true, voix: 'F' },
        { nom: 'Poire pochée, crumble de cacao, glace vanille au lait cru', description: 'Dessert du moment', prix: null, placeholder: true, voix: 'F' },
      ],
    },
    {
      categorie: 'Boissons',
      moment: 'commun',
      intro: 'Une courte sélection, servie au bar avant le repas ou à table.',
      plats: [
        { nom: 'Accord mets et vins, 4 verres', description: 'Vignerons belges et français', prix: '32 €', placeholder: true },
        { nom: 'Vin au verre', description: 'Blanc, rouge ou rosé, selon la saison', prix: '6 à 9 €', placeholder: true },
        { nom: 'Cocktail de la maison', description: 'Au bar, avant le service', prix: '12 €', placeholder: true },
        { nom: 'Bière namuroise', description: 'Blonde ou ambrée, 33 cl', prix: '5 €', placeholder: true },
        { nom: 'Eaux, limonades et cafés', description: 'Eau plate ou pétillante, limonade maison, café de torréfacteur', prix: '3 à 4,50 €', placeholder: true },
      ],
    },
  ],
  menus: [
    {
      nom: 'Menu dégustation unique, 4 services',
      prix: '67 €',
      moment: 'soir',
      description: 'Du lundi au vendredi soir. Mises en bouche, légumes racines, Saint-Jacques, boeuf confit, soufflé au caramel, mignardise.',
      placeholder: false,
    },
    { nom: 'Formule 3 services, le midi', prix: '52 €', moment: 'midi', description: 'Mercredi et vendredi midi. Formule à choix multiples inspirée des produits du moment.', placeholder: false },
    {
      nom: 'Lunch, entrée-plat ou plat-dessert',
      prix: '40 €',
      moment: 'midi',
      description: "Mercredi et vendredi midi. Proposé selon les envies des chefs et servi à l'ensemble de la table.",
      placeholder: false,
    },
    { nom: 'Bon cadeau', prix: '50, 75, 100 ou 150 €', moment: 'commun', description: 'Demande en ligne, retrait au restaurant.', placeholder: false },
  ],
  menuDuJour: {
    titre: 'Lunch de ce vendredi',
    date: '2026-10-30',
    lignes: ['Oeuf parfait, poireaux, noisettes', 'Volaille fermière, chou pointu, jus au thym', 'Poire pochée, crumble de cacao'],
    prix: '40 €',
    placeholder: true,
  },
  histoire: [
    "Les Potes au Feu, c'est d'abord l'histoire d'une rencontre. Il y a quatorze ans, François Schepens et Damien Gorjanec aiguisent leurs premiers couteaux au restaurant la Plage d'Amée à Namur : deux gamins pleins d'envie, le début d'une amitié.",
    "François continue ses classes aux États-Unis et à Montréal, Damien se fait une place en Belgique et cumule des expériences à l'étranger, notamment à Shanghai. À chaque retrouvaille, autour d'un verre, le rêve d'ouvrir un restaurant se dessine.",
    "Début de l'hiver 2019, installés par hasard à une table de ce lieu, ils ne savent pas encore qu'ils y ouvriront leur premier restaurant. Trois mois plus tard, ils en ont les clés.",
    "Le concept : une cuisine bistronomique à quatre mains, de qualité, avec un ancrage local, et un mot d'ordre, le plaisir. Ils servent eux-mêmes leurs plats et expliquent leur démarche à table, dans une atmosphère décontractée qui ne se la raconte pas.",
  ],
  equipe: [
    { nom: 'Damien Gorjanec', role: 'Chef et co-propriétaire', photo: '/photos/chef-damien.webp', placeholder: false, voix: 'D' },
    { nom: 'François Schepens', role: 'Chef et co-propriétaire', photo: '/photos/chef-francois.webp', placeholder: false, voix: 'F' },
    { nom: 'Sara', role: 'Salle et bar', photo: '/photos/bar-cocktails.webp', placeholder: true },
    { nom: 'Jordan', role: 'Salle', photo: '/photos/service-planche.webp', placeholder: true },
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
    '/photos/salle-banquette.webp',
    '/photos/cuisine-chefs-passe.webp',
    '/photos/salle-clients-bar.webp',
    '/photos/plat-boeuf-confit.webp',
    '/photos/service-francois-table.webp',
    '/photos/salle-ampoules.webp',
    '/photos/cuisine-mains-pate.webp',
    '/photos/bar-cocktails.webp',
    '/photos/service-frites.webp',
    '/photos/portrait-damien-profil.webp',
  ],
  valeurs: [
    'Fait maison',
    'Produits des saisons',
    'Rencontre et convivialité',
    'Ancrage local : producteurs du coin, légumes cultivés localement',
    'Les chefs servent et expliquent leurs plats à table',
  ],
  privatisation: 'Le samedi, le restaurant se privatise : mariages, événements, ou chef à domicile.',
  colophon: [
    'Photographies : Les Potes au Feu et Guide MICHELIN (site du restaurant).',
    'Caractères : Switzer (Fontshare) et Fragment Mono (Google Fonts).',
    'Gabarit « Quatre mains » de la collection KYW.',
  ],
};

/** Photo par chemin (erreur explicite si le chemin n'existe pas : un gabarit ne doit pas pointer dans le vide). */
export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}

/** Chef par voix. */
export const chef = (v: Voix): Chef => site.chefs.find((c) => c.voix === v)!;

/** Adresse sur une ligne. */
export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;

/** Horaires lisibles : '12:00 à 14:00, 19:00 à 21:00' ou la note. */
export const horaireTexte = (h: Horaire) =>
  h.creneaux.length ? h.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(', ') : h.note || 'fermé';

/** Horaires courts pour une bande : '19:00 à 21:00'. */
export const horaireCourt = (h: Horaire) => (h.creneaux.length ? h.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(' et ') : 'fermé');

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;
