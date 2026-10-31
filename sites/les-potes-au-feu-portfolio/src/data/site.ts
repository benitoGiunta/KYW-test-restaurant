// Tout le contenu du site vit ici. Source : data/restaurants/les-potes-au-feu/ (donnees.json, dossier.md, photos/index.json).
// Les trous des données réelles sont comblés par des données fictives marquées `placeholder: true` :
// le gabarit les affiche, la revue les signale, le client les remplace.
//
// Hypothèses du gabarit « Quatre mains » (toutes marquées placeholder dans les données ci-dessous) :
// - la colonne de chaque chef porte son parcours (prouvé) ; l'attribution des plats à l'un ou à l'autre (tags D / F,
//   plats fétiches) n'est pas prouvée : `voixPlaceholder: true` / `platsFetichesPlaceholder: true`, affichée « illustrative » ;
// - descriptions des plats : seulement ce que le dossier prouve (photos du site, carte HTML), sinon vide ;
// - les parcours ne portent que des étapes prouvées (récit du site, Le Fooding) ; seules 2019 et 2020 sont datées ;
// - adaptation « les-potes-au-feu-portfolio » (31/10/2026) : e-mail inconnu, donc non affiché ; avis inventés retirés
//   (seuls l'avis MICHELIN et la note Google relevée par Rankeat sont montrés) ; boissons réelles (Le Fooding, 07/2026) ;
//   citations des chefs remplacées par des phrases du site du restaurant, sourcées ;
// - restent fictifs et marqués : composition des formules du midi, exemple de lunch, rôles de Sara et Jordan,
//   attribution des plats à l'un ou l'autre chef.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';
export type Voix = 'D' | 'F'; // D = Damien (colonne verte), F = François (colonne moutarde)

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
// voixPlaceholder : l'attribution du plat à un chef (voix) n'est pas prouvée par le dossier ; l'interface affiche « attribution illustrative ».
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean; voix?: Voix; voixPlaceholder?: boolean; photo?: string }
export interface Categorie { categorie: string; moment?: 'soir' | 'midi' | 'commun'; intro?: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean; moment?: 'soir' | 'midi' | 'commun' }
export interface Membre { nom: string; role: string; photo?: string; placeholder: boolean; voix?: Voix; mot?: string }
export interface Avis { texte: string; auteur: string; source: string; date: string; note?: number; placeholder: boolean }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }
export interface Etape { annee: string; lieu: string; texte: string; placeholder: boolean }
export interface Chef {
  voix: Voix;
  prenom: string;
  nom: string;
  role: string; // « Chef et co-propriétaire »
  registre: string; // la voix de la colonne : le parcours prouvé par le dossier (« de la Belgique à Shanghai »)
  portrait: string;
  bio: string[]; // uniquement des phrases prouvées par dossier.md (récit du site)
  platsFetichesPlaceholder: boolean; // attribution des plats au chef : illustrative
  parcours: Etape[];
  citation: { texte: string; source?: string; placeholder: boolean };
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
  email: { valeur: string; placeholder: boolean } | null; // null : inconnu, rien n'est affiché
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
  noteGoogle: { note: string; sur: number; nombre: number; source: string; aConfirmer: boolean } | null;
  presse: { nom: string; texte: string; citation: boolean; date: string; url?: string }[]; // citation false : résumé, jamais entre guillemets
  video: { titre: string; url: string; chaine: string; poster: string } | null;
  prixGamme: string;
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
  adresse: { rue: 'Avenue de la Plante', numero: '4', cp: '5000', commune: 'Namur', pays: 'BE', repere: 'au bord de la Meuse, côté Citadelle, entre le Casino et le Royal Snail' },
  geo: { lat: 50.4586737, lon: 4.8643452 },
  telephone: '+32 81 64 04 44',
  email: null,
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
      registre: 'de la Belgique à Shanghai',
      portrait: '/photos/chef-damien.webp',
      bio: [
        "Damien s'est fait une place en Belgique et a cumulé des expériences à l'étranger, notamment à Shanghai.",
        'Avec François, il sert lui-même les plats et explique leur démarche à table.',
      ],
      parcours: [
        { annee: 'Débuts', lieu: "La Plage d'Amée, Jambes", texte: 'Premiers couteaux aiguisés à côté de François. Deux gamins pleins d\'envie.', placeholder: false },
        { annee: 'Ensuite', lieu: 'Belgique', texte: 'Il se fait une place dans les cuisines belges.', placeholder: false },
        { annee: 'Ailleurs', lieu: 'Shanghai', texte: 'Quelques expériences à l\'étranger, notamment à Shanghai.', placeholder: false },
        { annee: '2019', lieu: 'Avenue de la Plante, Namur', texte: 'Début de l\'hiver, installés par hasard à une table de ce lieu. Le rêve prend une adresse.', placeholder: false },
        { annee: '2020', lieu: 'Les Potes au Feu', texte: 'Trois mois plus tard, les clés. Le restaurant ouvre à quatre mains.', placeholder: false },
      ],
      citation: { texte: 'Une cuisine bistronomique à quatre mains, de qualité, avec un ancrage local. Et un mot d\'ordre : le plaisir.', source: 'Le concept, site des Potes au Feu', placeholder: false },
      platsFetichesPlaceholder: true,
      platsFetiches: ['Boeuf confit, carottes, cromesquis de pommes de terre', 'Saint-Jacques, butternut, passion'],
    },
    {
      voix: 'F',
      prenom: 'François',
      nom: 'Schepens',
      role: 'Chef et co-propriétaire',
      registre: 'des États-Unis à Montréal',
      portrait: '/photos/chef-francois.webp',
      bio: [
        'François a fait ses classes aux États-Unis et à Montréal.',
        'Avec Damien, il accompagne lui-même chaque assiette jusqu\'à la table et explique leur démarche.',
      ],
      parcours: [
        { annee: 'Débuts', lieu: "La Plage d'Amée, Jambes", texte: 'Même cuisine, même époque : la rencontre avec Damien, et le début d\'une amitié d\'adolescence.', placeholder: false },
        { annee: 'Ensuite', lieu: 'États-Unis', texte: 'Il continue ses classes outre-Atlantique.', placeholder: false },
        { annee: 'Puis', lieu: 'Montréal', texte: 'Ses classes se poursuivent au Québec.', placeholder: false },
        { annee: '2019', lieu: 'Avenue de la Plante, Namur', texte: 'Début de l\'hiver, la même table, par hasard. Ils ne savent pas encore qu\'ils ouvriront ici.', placeholder: false },
        { annee: '2020', lieu: 'Les Potes au Feu', texte: 'Trois mois plus tard, les clés. Le menu s\'écrit à deux depuis.', placeholder: false },
      ],
      citation: { texte: 'Un restaurant à l\'image des Potes : bon, généreux et accueillant.', source: 'Le concept, site des Potes au Feu', placeholder: false },
      platsFetichesPlaceholder: true,
      platsFetiches: ['Soufflé au caramel, chaï, poire', 'Rosace de pommes, glace et tuile'],
    },
  ],
  rencontre: [
    "Adolescents, François et Damien aiguisent leurs premiers couteaux ensemble à la Plage d'Amée, à Jambes. À chaque retrouvaille, autour d'un verre, le rêve d'ouvrir un restaurant se dessine.",
    "Début de l'hiver 2019, installés par hasard à une table de ce lieu, ils ne savent pas encore qu'ils y ouvriront leur premier restaurant. Trois mois plus tard, ils en ont les clés.",
  ],
  carteQuatreMains: [
    { nom: 'Mises en bouche', description: '', prix: null, placeholder: false, voix: 'F', voixPlaceholder: true, photo: '/photos/cuisine-chefs-dressage.webp' },
    { nom: 'Légumes racines, champignons, noix', description: '', prix: null, placeholder: false, voix: 'D', voixPlaceholder: true, photo: '/photos/cuisine-mains-pate.webp' },
    { nom: 'Saint-Jacques, butternut, passion', description: 'Snackées, mousseline et tuile noire', prix: null, placeholder: false, voix: 'D', voixPlaceholder: true, photo: '/photos/plat-saint-jacques.webp' },
    { nom: 'Tartare de boeuf aux tuiles', description: 'Vu en photo, hors du menu actuel', prix: null, placeholder: true, voix: 'D', voixPlaceholder: true, photo: '/photos/plat-tartare.webp' },
    { nom: 'Boeuf confit, carottes, cromesquis de pommes de terre', description: '', prix: null, placeholder: false, voix: 'D', voixPlaceholder: true, photo: '/photos/plat-boeuf-confit.webp' },
    { nom: 'Fromage', description: 'À la place du dessert (+7 €) ou avant (+15 €)', prix: null, placeholder: false, voix: 'D', voixPlaceholder: true, photo: '/photos/cuisine-salage-viande.webp' },
    { nom: 'Soufflé au caramel, chaï, poire', description: '', prix: null, placeholder: false, voix: 'F', voixPlaceholder: true, photo: '/photos/cuisine-francois-poele.webp' },
    { nom: 'Rosace de pommes, glace et tuile', description: 'Vue en photo, hors du menu actuel', prix: null, placeholder: true, voix: 'F', voixPlaceholder: true, photo: '/photos/dessert-tarte-pomme.webp' },
  ],
  carte: [
    {
      categorie: 'Le soir : menu dégustation unique, 4 services',
      moment: 'soir',
      intro: 'Du lundi au vendredi soir, 67 € par personne. Un seul menu, écrit à quatre mains, qui change au fil des saisons.',
      plats: [
        { nom: 'Mises en bouche', description: '', prix: null, placeholder: false, voix: 'F', voixPlaceholder: true },
        { nom: 'Légumes racines, champignons, noix', description: '', prix: null, placeholder: false, voix: 'D', voixPlaceholder: true },
        { nom: 'Saint-Jacques, butternut, passion', description: 'Snackées, mousseline et tuile noire', prix: null, placeholder: false, voix: 'D', voixPlaceholder: true },
        { nom: 'Boeuf confit, carottes, cromesquis de pommes de terre', description: '', prix: null, placeholder: false, voix: 'D', voixPlaceholder: true },
        { nom: 'Soufflé au caramel, chaï, poire', description: '', prix: null, placeholder: false, voix: 'F', voixPlaceholder: true },
        { nom: 'Mignardise', description: '', prix: null, placeholder: false, voix: 'F', voixPlaceholder: true },
        { nom: 'Fromage à la place du dessert', description: 'Supplément', prix: '+7 €', placeholder: false },
        { nom: 'Fromage avant le dessert', description: 'Supplément', prix: '+15 €', placeholder: false },
      ],
    },
    {
      categorie: 'Le midi : formule 3 services, mercredi et vendredi',
      moment: 'midi',
      intro: 'Formule à choix multiples, 52 €, inspirée des produits du moment. Lunch entrée-plat ou plat-dessert à 40 €, servi à l\'ensemble de la table.',
      plats: [
        { nom: 'Oeuf parfait, poireaux, noisettes', description: 'Entrée du moment', prix: null, placeholder: true, voix: 'F', voixPlaceholder: true },
        { nom: 'Truite de rivière, fenouil, beurre blanc', description: 'Entrée du moment', prix: null, placeholder: true, voix: 'D', voixPlaceholder: true },
        { nom: 'Volaille fermière, chou pointu, jus au thym', description: 'Plat du moment', prix: null, placeholder: true, voix: 'D', voixPlaceholder: true },
        { nom: 'Risotto d\'épeautre, courge, pecorino', description: 'Plat du moment, végétarien', prix: null, placeholder: true, voix: 'F', voixPlaceholder: true },
        { nom: 'Poire pochée, crumble de cacao, glace vanille au lait cru', description: 'Dessert du moment', prix: null, placeholder: true, voix: 'F', voixPlaceholder: true },
      ],
    },
    {
      categorie: 'Boissons',
      moment: 'commun',
      intro: 'Quelques bouteilles et un cocktail relevés par Le Fooding (fiche de juillet 2026). La carte complète se découvre à table.',
      plats: [
        { nom: 'Amaretto sour maison', description: 'Cocktail, au verre', prix: '13 €', placeholder: false },
        { nom: 'Anjou, Domaine Olivier', description: 'Au verre', prix: '9 €', placeholder: false },
        { nom: 'Syrah, Stéphane Ogier', description: 'La bouteille', prix: '50 €', placeholder: false },
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
    titre: 'Lunch du vendredi',
    date: '',
    lignes: ['Oeuf parfait, poireaux, noisettes', 'Volaille fermière, chou pointu, jus au thym', 'Poire pochée, crumble de cacao'],
    prix: '40 €',
    placeholder: true,
  },
  histoire: [
    "Les Potes au Feu, c'est d'abord l'histoire d'une rencontre. Encore adolescents, François Schepens et Damien Gorjanec aiguisent leurs premiers couteaux au restaurant la Plage d'Amée, à Jambes : deux gamins pleins d'envie, le début d'une amitié.",
    "François continue ses classes aux États-Unis et à Montréal, Damien se fait une place en Belgique et cumule des expériences à l'étranger, notamment à Shanghai. À chaque retrouvaille, autour d'un verre, le rêve d'ouvrir un restaurant se dessine.",
    "Début de l'hiver 2019, installés par hasard à une table de ce lieu, ils ne savent pas encore qu'ils y ouvriront leur premier restaurant. Trois mois plus tard, ils en ont les clés.",
    "Le concept : une cuisine bistronomique à quatre mains, de qualité, avec un ancrage local, et un mot d'ordre, le plaisir. Ils servent eux-mêmes leurs plats et expliquent leur démarche à table, dans une atmosphère décontractée qui ne se la raconte pas.",
  ],
  equipe: [
    { nom: 'Damien Gorjanec', role: 'Chef et co-propriétaire', photo: '/photos/chef-damien.webp', placeholder: false, voix: 'D' },
    { nom: 'François Schepens', role: 'Chef et co-propriétaire', photo: '/photos/chef-francois.webp', placeholder: false, voix: 'F' },
    { nom: 'Sara', role: 'Salle et bar', photo: '/photos/service-frites.webp', placeholder: true, mot: 'La pétillante Sara' },
    { nom: 'Jordan', role: 'Salle', placeholder: true, mot: 'Épaule les chefs' },
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
  // Note relevée par Rankeat (fiche du 22/08/2025), à confirmer sur Google Maps : aucun extrait d'avis n'est cité.
  noteGoogle: { note: '4,8', sur: 5, nombre: 212, source: 'Google, relevé Rankeat du 22/08/2025', aConfirmer: true },
  presse: [
    {
      nom: 'Guide MICHELIN Belgique 2026',
      texte: "Un duo d'amis revisite le concept de bistronomie avec pour fil rouge la créativité. Légumes cultivés localement, associations originales et saveurs intenses sont au rendez-vous.",
      citation: true,
      date: '2026-05-04',
      url: 'https://guide.michelin.com/fr/fr/namur/namur/restaurant/les-potes-au-feu',
    },
    {
      nom: 'Le Fooding',
      texte: "Deux amis d'adolescence, une cuisine ouverte, et des chefs qui servent eux-mêmes leurs assiettes.",
      citation: false,
      date: '2026-07-28',
    },
  ],
  video: {
    titre: 'Alfonse, Les potes au feu. Aftermovie',
    url: 'https://www.youtube.com/watch?v=dZtMOajOefE',
    chaine: 'Les Potes Au Feu',
    poster: '/photos/cuisine-chefs-passe.webp',
  },
  prixGamme: '€€',
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
    photo('/photos/service-frites.webp', 'Une serveuse souriante porte des paniers de frites en salle, les chefs en arrière-plan', 1140, 642),
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
    'Photographies : Les Potes au Feu (site du restaurant) et Guide MICHELIN. Sources : Guide MICHELIN 2026, Le Fooding, Rankeat.',
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

/** Légende d'un plat : description prouvée, chef (attribution illustrative), mention illustratif. */
export const legendePlat = (p: Plat): string => {
  const c = p.voix ? chef(p.voix).prenom + (p.voixPlaceholder ? ' (attribution illustrative)' : '') : '';
  return [p.description, c].filter(Boolean).join(', ') + (p.placeholder ? ' (illustratif)' : '');
};
