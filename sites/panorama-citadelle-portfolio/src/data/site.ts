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
  presse: { media: string; titre: string; date: string | null; url: string }[];
}

const photo = (src: string, alt: string, largeur: number, hauteur: number): Photo => ({ src, alt, largeur, hauteur, placeholder: false });

const tousLesJours = (c: Creneau[]): Horaire[] =>
  (['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] as Jour[]).map((jour) => ({ jour, creneaux: c }));

export const site: Restaurant = {
  slug: 'panorama-citadelle',
  nom: 'Le Panorama',
  baseline: 'Une expérience culinaire au sommet de la Citadelle',
  description:
    'Le Panorama, brasserie au sommet de la Citadelle de Namur : carte signée Yves Mattagne, tarte flambée au four à bois, terrasse et vue sur la Meuse.',
  url: 'https://www.panoramanamur.be',
  typeCuisine: 'Brasserie, cuisine du monde et classiques revisités',
  adresse: { rue: 'Route Merveilleuse', numero: '82', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.45712, lon: 4.85948 },
  telephone: '+32 81 84 11 34',
  // Seule adresse e-mail publiée par le site actuel : réservations de groupe.
  email: { valeur: 'groupes@panoramanamur.be', placeholder: false },
  reservation: { outil: 'Zenchef', url: 'https://www.panoramanamur.be/reservation-contact/' },
  // Site actuel : « Ouvert tous les jours de 8h00 à 23h00 » (la page contact annonce 11h-23h pour la brasserie : voir horairesSecond).
  horaires: tousLesJours([{ ouverture: '08:00', fermeture: '23:00' }]),
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/PanoramaNamur' },
    { nom: 'Instagram', url: 'https://www.instagram.com/panoramanamur' },
  ],
  carte: [
    {
      categorie: "Pour l'apéro à partager",
      plats: [
        { nom: 'Brocolinette', description: 'tzatziki, bubu arare, combava, grenade, menthe', prix: '16,50 €', placeholder: false },
        { nom: 'Crevettes Nobashi croustillantes', description: 'mousseline aigre-douce, kalamansi', prix: '21 €', placeholder: false },
        { nom: 'Calamars frits', description: 'shichimi, lime', prix: '16,50 €', placeholder: false },
        { nom: 'Croquettes de jambon ibérique (5 pièces)', description: '', prix: '19 €', placeholder: false },
        { nom: 'Poulet karaage', description: 'sauce plum barbecue fumé', prix: '21 €', placeholder: false },
      ],
    },
    {
      categorie: 'Au four à bois : Flammeküeche',
      plats: [
        { nom: 'Tarte flambée tradition', description: 'lardons, oignons, crème', prix: '19 €', placeholder: false },
        { nom: 'Tarte flambée gratinée', description: 'lardons, oignons, crème, fromage', prix: '21 €', placeholder: false },
        { nom: 'Tarte flambée saumon', description: 'chlorophylle d’aneth, graines de moutarde', prix: '23 €', placeholder: false },
        { nom: 'Tarte flambée gratinée « raclette »', description: 'champignons des bois, salade de blé, noix', prix: '24 €', placeholder: false },
        { nom: 'Tarte flambée chicon gratin', description: 'chiffonnade de jambon cuit', prix: '24 €', placeholder: false },
      ],
    },
    {
      categorie: 'Entrées',
      plats: [
        { nom: 'Huîtres de Cancale creuses n°3', description: '', prix: '26 €', placeholder: false },
        { nom: 'Sashimi de saumon à la flamme, kombujime', description: 'vinaigrette huître, tonburi façon taboulé de mer, huile de livèche', prix: '26 €', placeholder: false },
        { nom: 'Noix de Saint-Jacques', description: 'Italicus, coco, fenouil, concombre, crème épaisse d’Isigny, aneth', prix: '29 €', placeholder: false },
        { nom: 'Marbré de foie gras de canard et anguille fumée', description: 'chutney de pomme balsamico, pain de campagne toasté', prix: '27,50 €', placeholder: false },
        { nom: 'Œuf mimosa', description: 'thon, anchois, bacon, laitue', prix: '12 €', placeholder: false },
        { nom: 'Croquettes de crevettes grises (2 pièces)', description: 'persil frit, citron', prix: '25 €', placeholder: false },
        { nom: 'Fondus au fromage Vieux Bruges (2 pièces)', description: 'persil frit, citron', prix: '19 €', placeholder: false },
        { nom: 'Feuilleté au ragoût de champignons des bois', description: 'abricot, vin jaune, ciboule', prix: '23 €', placeholder: false },
        { nom: 'Foie gras de canard poêlé', description: 'chiconette confite, amaretto, râpé de truffe, amande', prix: '27,50 €', placeholder: false },
        { nom: 'Poêlée de cuisses de grenouilles', description: 'beurre à l’ail, persil', prix: '23 €', placeholder: false },
      ],
    },
    {
      categorie: 'Poissons',
      plats: [
        { nom: 'Sole n°2', description: 'fondue d’épinards, purée au beurre ou frites', prix: 'prix du jour', placeholder: false },
        { nom: 'Tartare de thon façon américain', description: 'sucrine, frites', prix: '35 €', placeholder: false },
        { nom: 'Thon à la flamme', description: 'teriyaki, légumes au wok, oignons frits, sésame, cacahuètes, coriandre, riz jasmin', prix: '36 €', placeholder: false },
        { nom: 'Dos de cabillaud', description: 'miso, pak-choï grillé, riz jasmin', prix: '36 €', placeholder: false },
        { nom: 'Soupe de poisson façon bouillabaisse', description: 'aïoli, fromage, pain toasté', prix: '35 €', placeholder: false },
        { nom: 'Homard « café de Paris » (demi ou entier)', description: 'frites', prix: '39 € / 75 €', placeholder: false },
      ],
    },
    {
      categorie: 'Viandes et grill',
      plats: [
        { nom: 'Tartare de bœuf Angus coupé au couteau', description: 'caviar Dauricus, crème aigrelette, blinis', prix: '59 €', placeholder: false },
        { nom: 'Américain de bœuf Holstein', description: 'sucrine, frites, mayonnaise', prix: '28 €', placeholder: false },
        { nom: 'Spare ribs de porc laqué', description: 'cébette, sésame, oignons frits, cacahuètes, frites', prix: '34 €', placeholder: false },
        { nom: 'Pain de viande porc et veau', description: 'chicons confits au foie gras, rattes', prix: '29,50 €', placeholder: false },
        { nom: 'Ris de veau', description: 'béarnaise, sucrine, frites', prix: '45 €', placeholder: false },
        { nom: 'Burger', description: 'sauce américain, tomate, estragon, cerfeuil, câpres, salade, bacon, cheddar, frites', prix: '29,50 €', placeholder: false },
        { nom: 'Filet de bœuf en croûte de poivre noir concassé, flambé au cognac', description: '', prix: '45,50 €', placeholder: false },
        { nom: 'Rib-eye Black Angus', description: 'accompagnements, salade, frites, sauce au choix', prix: '45,50 €', placeholder: false },
        { nom: 'Onglet irlandais Angus', description: '', prix: '35 €', placeholder: false },
        { nom: 'Brochette de filet de bœuf', description: '', prix: '36 €', placeholder: false },
        { nom: 'Chevreuil façon Arlequin', description: 'miso, soubise, agrume, croquette des gigues, nougatine, poire vanille', prix: '48 €', placeholder: false },
      ],
    },
    {
      categorie: 'Pour deux à partager',
      plats: [
        { nom: 'Bar de ligne en croûte de sel', description: 'beurre blanc, légumes de saison, environ 50 minutes d’attente', prix: '98 €', placeholder: false },
        { nom: 'Épaule d’agneau', description: 'zaatar, tzatziki d’aubergine, relish, menthe, grenade, pain gyros', prix: '98 €', placeholder: false },
        { nom: 'Chateaubriand mariné teriyaki, cuisson lente 5 h', description: 'légumes au wok, oignons frits, sésame, cacahuètes, coriandre, riz jasmin', prix: '94 €', placeholder: false },
      ],
    },
    {
      categorie: 'Pour les enfants',
      plats: [
        { nom: 'Boulet à la liégeoise', description: '', prix: '19 €', placeholder: false },
        { nom: 'Coquillettes jambon fromage', description: '', prix: '19 €', placeholder: false },
        { nom: 'Spaghetti bolognaise', description: '', prix: '19 €', placeholder: false },
      ],
    },
  ],
  menus: [
    { nom: 'Le Pano Express', prix: '12 €', description: 'Boisson chaude, jus d’orange pressé, viennoiserie au choix.', placeholder: false },
    { nom: 'Le Pano traditionnel', prix: '15 €', description: 'Boisson chaude, jus d’orange, viennoiserie, pain, beurre, assiette jambon fromage, confiture, Nutella.', placeholder: false },
    { nom: 'Le Pano Healthy', prix: '15 €', description: 'Boisson chaude, jus d’orange, yaourt muesli, pain, beurre, confiture, fruits frais.', placeholder: false },
    { nom: 'Le Pano Gourmand', prix: '25 €', description: 'Le traditionnel, plus un œuf au choix avec bacon, un yaourt muesli et des fruits frais.', placeholder: false },
    { nom: 'Menu des fêtes 2026', prix: '110 €', description: 'Par personne, boissons non comprises : coupe de champagne, trois mises en bouche, entrée, plat et dessert au choix, café ou infusion.', placeholder: false },
  ],
  histoire: [
    'Le Panorama occupe un pavillon vitré tout en haut de la Citadelle de Namur, Route Merveilleuse, à une centaine de mètres du téléphérique. De la salle comme de la terrasse, le regard embrasse la ville et la vallée de la Meuse.',
    'Rénové et rouvert en 2022 par François Delpire-Crets et Frédéric Massart, le lieu a gagné une terrasse sur plusieurs niveaux, un bar en marbre, une cuisine ouverte et un four à bois. On y vient pour un petit-déjeuner, un déjeuner, un apéro ou un dîner.',
    'La carte est signée Yves Mattagne, chef doublement étoilé de La Villa Lorraine : des classiques de brasserie revus façon bistronomie, avec des accents du monde et des produits frais et locaux.',
    'La tarte flambée cuite au four à bois a été transmise aux cuisiniers par le chef alsacien Patrice Bluntzer, de l’auberge Saint-Martin à Kintzheim. La Pano, bière blanche brassée avec La Houppe, ne se boit qu’ici.',
  ],
  equipe: [
    { nom: 'Yves Mattagne', role: 'Chef, signe la carte', placeholder: false },
    { nom: 'François Delpire-Crets', role: 'Gérant', placeholder: false },
    { nom: 'Frédéric Massart', role: 'Gérant', placeholder: false },
    { nom: 'Patrice Bluntzer', role: 'Chef alsacien, a formé les cuisiniers à la tarte flambée', placeholder: false },
  ],
  // Aucun avis client cité : Google et Tripadvisor non retenus par le dossier. La presse est dans `presse`.
  avis: [],
  photos: [
    photo('/photos/salle.webp', 'Salle principale aux murs de pierre et au plafond de lattes de bois, tables dressées', 1800, 1198),
    photo('/photos/vue-meuse.webp', 'Vue panoramique sur la Meuse et la ville de Namur depuis la Citadelle', 1800, 1198),
    photo('/photos/terrasse-platanes.webp', 'Terrasse de gravier sous des platanes taillés, pavillon vitré en fond', 1800, 1198),
    photo('/photos/terrasse-large.webp', 'Terrasse vue de large, tables en bois, la vallée en arrière-plan', 1800, 1198),
    photo('/photos/terrasse-pergola.webp', 'Terrasse sous la pergola de platanes, façade vitrée', 1800, 1198),
    photo('/photos/terrasse-guirlandes.webp', 'Tables de terrasse sous des guirlandes lumineuses, vue sur la Meuse', 1800, 1198),
    photo('/photos/facade.webp', 'Pavillon vitré du Panorama et terrasse de gravier sous un ciel bleu', 1800, 1448),
    photo('/photos/facade-960.webp', 'Pavillon vitré du Panorama et terrasse de gravier sous un ciel bleu', 960, 772),
    photo('/photos/aerienne.webp', 'Vue aérienne du pavillon et de la terrasse, au bord de la Citadelle', 1800, 1350),
    photo('/photos/bar-salle.webp', 'Bar en marbre noir et tabourets verts, côté salle', 1800, 1198),
    photo('/photos/bar-service.webp', 'Comptoir du bar, bouteilles et verres suspendus, une serveuse au travail', 1800, 1198),
    photo('/photos/table-vitres.webp', 'Longue table dressée devant les baies vitrées donnant sur la ville', 1800, 1198),
    photo('/photos/table-verres-vue.webp', 'Table dressée et verres, la vallée floue derrière la vitre', 1800, 1198),
    photo('/photos/cave.webp', 'Entrée de la salle et cave à vin vitrée', 1800, 1198),
    photo('/photos/biere-pano.webp', 'Verre de bière blanche Pano sur fond clair', 1800, 1799),
    photo('/photos/equipe.webp', 'L’équipe de salle réunie sur la terrasse', 1800, 1198),
    photo('/photos/four-bois.webp', 'Un cuisinier en blouse blanche devant le four à bois', 1800, 1769),
  ],
  valeurs: ['Produits frais et locaux', 'Une cuisine tournée vers le monde', 'Classiques de brasserie revus façon bistronomie'],
  presse: [
    { media: 'RTBF', titre: 'Le Panorama : une escale supplémentaire à la Citadelle de Namur dès le mois de mai', date: '2022-04-13', url: 'https://www.rtbf.be/article/le-panorama-une-escale-supplementaire-a-la-citadelle-de-namur-des-le-mois-de-mai-10974498' },
    { media: 'Moustique', titre: 'Le Panorama, le bon petit plan d’Eric Boschman', date: '2022-09-25', url: 'https://www.moustique.be/tendances/food/2022/09/25/le-panorama-le-bon-petit-plan-deric-boschman-247429' },
    { media: 'Gault&Millau Belgique', titre: 'Fiche du restaurant', date: null, url: 'https://www.gaultmillau.be/en/restaurants/le-panorama-namur' },
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
// Six moments de la journée au Panorama (ouvert de 8h à 23h). Les lignes viennent du dossier
// (carte d'automne 2026, petits-déjeuners). Seules les lignes `placeholder: true` sont illustratives.
// ---------------------------------------------------------------------------------------------

export interface Ligne { nom: string; detail: string; prix: string | null; placeholder: boolean }
export interface Moment {
  id: string; // ancre : m-8h
  heure: number;
  heureTexte: string;
  titre: string;
  accroche: string;
  accrochePlaceholder: boolean;
  theme: 'aube' | 'midi' | 'ocre' | 'corail' | 'nuit' | 'nuitProfonde';
  lignes: Ligne[];
  photo?: string;
  placeholder: boolean;
}

const l = (nom: string, detail: string, prix: string | null, placeholder = false): Ligne => ({ nom, detail, prix, placeholder });

export const moments: Moment[] = [
  {
    id: 'm-8h', heure: 8, heureTexte: '8h', titre: 'Le petit-déjeuner', theme: 'aube',
    accroche: 'Dès 8h, la Citadelle se réveille : une boisson chaude, un jus d’orange pressé et une viennoiserie face à la vallée.',
    accrochePlaceholder: false, placeholder: false, photo: '/photos/facade.webp',
    lignes: [
      l('Le Pano Express', 'boisson chaude, jus d’orange pressé, viennoiserie', '12 €'),
      l('Le Pano traditionnel', 'viennoiserie, pain beurre, jambon fromage, confiture', '15 €'),
      l('Le Pano Healthy', 'yaourt muesli, fruits frais, pain, beurre, confiture', '15 €'),
      l('Le Pano Gourmand', 'le traditionnel, œuf au choix et bacon, fruits frais', '25 €'),
    ],
  },
  {
    id: 'm-10h', heure: 10, heureTexte: '10h', titre: 'La salle et la terrasse', theme: 'midi',
    accroche: 'Une salle de pierre et de bois, un bar en marbre, une terrasse sur plusieurs niveaux : on choisit sa place selon l’heure et le ciel.',
    accrochePlaceholder: false, placeholder: false,
    lignes: [
      l('La terrasse', 'plusieurs niveaux, 400 places annoncées, sans réservation', null),
      l('La salle', '120 places, murs de pierre, baies vitrées sur la ville', null),
      l('Le bar en marbre', 'tabourets verts, cave à vin vitrée à l’entrée', null),
    ],
  },
  {
    id: 'm-12h', heure: 12, heureTexte: '12h', titre: 'Le déjeuner', theme: 'ocre',
    accroche: 'La carte de brasserie signée Yves Mattagne : tartes flambées au four à bois, entrées du moment, poissons et viandes.',
    accrochePlaceholder: false, placeholder: true,
    lignes: [
      l('Œuf mimosa', 'thon, anchois, bacon, laitue', '12 €'),
      l('Pain de viande porc et veau', 'chicons confits au foie gras, rattes', '29,50 €'),
      l('Dos de cabillaud', 'miso, pak-choï grillé, riz jasmin', '36 €'),
    ],
  },
  {
    id: 'm-17h', heure: 17, heureTexte: '17h', titre: 'L’apéro', theme: 'corail',
    accroche: 'Du côté du bar : des petites assiettes à partager, une bière blanche brassée pour la maison, un verre face à la Meuse.',
    accrochePlaceholder: false, placeholder: true, photo: '/photos/biere-pano.webp',
    lignes: [
      l('Brocolinette', 'tzatziki, combava, grenade, menthe', '16,50 €'),
      l('Crevettes Nobashi croustillantes', 'mousseline aigre-douce, kalamansi', '21 €'),
      l('Calamars frits', 'shichimi, lime', '16,50 €'),
      l('Poulet karaage', 'sauce plum barbecue fumé', '21 €'),
      l('La Pano', 'bière blanche brassée avec La Houppe', null),
    ],
  },
  {
    id: 'm-19h', heure: 19, heureTexte: '19h', titre: 'Le dîner', theme: 'nuit',
    accroche: 'Le soir, sous les guirlandes de la terrasse ou derrière les baies vitrées : poissons, viandes, grillades et plats pour deux.',
    accrochePlaceholder: false, placeholder: true, photo: '/photos/terrasse-guirlandes.webp',
    lignes: [
      l('Noix de Saint-Jacques snackées', 'chou kimchi, pecorino, poire, sésame', '29 €'),
      l('Thon à la flamme', 'teriyaki, légumes au wok, riz jasmin', '36 €'),
      l('Homard « café de Paris »', 'demi ou entier, frites', '39 € / 75 €'),
      l('Rib-eye Black Angus', 'frites, salade, sauce au choix', '45,50 €'),
      l('Chevreuil façon Arlequin', 'miso, soubise, agrume, poire vanille', '48 €'),
      l('Épaule d’agneau, pour deux', 'zaatar, tzatziki d’aubergine, pain gyros', '98 €'),
    ],
  },
  {
    id: 'm-23h', heure: 23, heureTexte: '23h', titre: 'Le dernier verre', theme: 'nuitProfonde',
    accroche: 'La salle se vide doucement, le bar et la vue restent : la ville s’allume sous la Citadelle.',
    accrochePlaceholder: false, placeholder: false,
    lignes: [
      l('La Pano', 'bière blanche, exclusive au restaurant', null),
      l('Digestif de la maison', '', '8 €', true),
      l('Verre de vin de la cave', '', '7 €', true),
    ],
  },
];

/** Menu des fêtes 2026 (110 €), étapes tirées de la description du PDF. */
export const fetes = {
  prix: '110 €',
  titre: 'Menu des fêtes 2026',
  etapes: [
    'Coupe de champagne',
    'Trois mises en bouche',
    'Entrée au choix : foie gras, Saint-Jacques ou raviole de homard',
    'Plat au choix : filet de veau et ris de veau, ou médaillon de sole',
    'Dessert au choix',
    'Café ou infusion',
  ],
  note: 'Par personne, boissons non comprises.',
};

/** Seconde ligne d'horaires : le site actuel annonce « brasserie 11h-23h » sur sa page contact, à confirmer. */
export const libelleSecond = 'Brasserie';
export const horairesSecond: { jour: Jour; texte: string; aConfirmer: boolean }[] =
  (['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] as Jour[]).map((jour) => ({ jour, texte: '11:00 à 23:00', aConfirmer: true }));

export const jours: Jour[] = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
