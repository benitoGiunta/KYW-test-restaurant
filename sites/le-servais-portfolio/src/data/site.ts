// Tout le contenu du site vit ici. Source : data/restaurants/le-servais/donnees.json, dossier.md et photos/index.json.
// Les trous des données réelles sont marqués `placeholder: true` (ou passent à null : le composant ne rend rien).

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM' ; fermeture <= ouverture = après minuit
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string }
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }

export interface Restaurant {
  slug: string;
  nom: string;
  baseline: string;
  description: string;
  url: string;
  typeCuisine: string;
  adresse: { rue: string; numero: string; cp: string; commune: string; pays: string };
  geo: { lat: number; lon: number } | null; // inconnu au dossier : pas de lien d'itinéraire par coordonnées
  telephone: string;
  telephoneAConfirmer: boolean;
  email: { valeur: string; placeholder: boolean };
  reservation: { outil: string; url: string };
  horaires: Horaire[]; // heures d'ouverture du bar (= de la maison)
  reseaux: Reseau[];
  carte: Categorie[];
  menus: Menu[];
  photos: Photo[];
  valeurs: string[];
}

const photo = (src: string, alt: string, largeur: number, hauteur: number, placeholder = false): Photo => ({ src, alt, largeur, hauteur, placeholder });

const ouvert = (ouverture: string, fermeture: string): Creneau[] => [{ ouverture, fermeture }];

export const site: Restaurant = {
  slug: 'le-servais',
  nom: 'Le Servais',
  baseline: 'Le bar-brasserie de Namur, ouvert tous les jours dès 9h, au départ du téléphérique.',
  description:
    'Le Servais, bar-brasserie à Namur au départ du téléphérique : petits-déjeuners, boulets liégeois, plats à partager et cocktails, ouvert 7 jours sur 7 dès 9h.',
  url: 'https://www.leservais.be',
  typeCuisine: 'Brasserie belge, bar à cocktails, sharing food',
  adresse: { rue: 'Rue des Fossés Fleuris', numero: '33', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: null,
  telephone: '081 73 65 52',
  telephoneAConfirmer: true,
  email: { valeur: 'hello@leservais.be', placeholder: false },
  reservation: { outil: 'réservation en ligne', url: 'https://book.leservais.be/' },
  horaires: [
    { jour: 'lundi', creneaux: ouvert('09:00', '01:00') },
    { jour: 'mardi', creneaux: ouvert('09:00', '01:00') },
    { jour: 'mercredi', creneaux: ouvert('09:00', '01:00') },
    { jour: 'jeudi', creneaux: ouvert('09:00', '01:00') },
    { jour: 'vendredi', creneaux: ouvert('09:00', '02:00') },
    { jour: 'samedi', creneaux: ouvert('09:00', '02:00') },
    { jour: 'dimanche', creneaux: ouvert('09:00', '01:00') },
  ],
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/leservais' },
    { nom: 'Instagram', url: 'https://www.instagram.com/leservais.namur' },
  ],
  carte: [], // la carte est portée par les moments (ci-dessous) et la page « carte »
  menus: [
    { nom: 'Petit-déjeuner, groupes', prix: 'dès 10 € par personne', description: 'Croissants, café, eaux et jus en self-service dans la Verrière, de 9h à 12h.', placeholder: false },
    { nom: 'Brunch buffet, groupes', prix: 'dès 25 € par personne', description: 'À partir de 20 personnes, dans la Verrière, de 9h à 15h.', placeholder: false },
    { nom: 'Repas, groupes', prix: 'dès 20 € par personne', description: 'Choix entre trois plats, boissons sur mesure.', placeholder: false },
    { nom: 'Apéro, groupes', prix: 'dès 18 € par personne', description: 'Finger food et boissons, de 12 à 120 personnes.', placeholder: false },
  ],
  photos: [
    photo('/photos/bar-comptoir.webp', 'Le comptoir du bar : bois patiné, plateau blanc, tuyaux apparents au plafond et suspensions rondes', 1800, 1200),
    photo('/photos/bar-detail.webp', 'Derrière le comptoir : étagères de bouteilles, plantes et barmaid au fond de la salle industrielle', 1000, 1000),
    photo('/photos/terrasse.webp', 'Des clients attablés avec leurs verres devant la façade en pierre, à la terrasse', 1158, 1600),
    photo('/photos/terrasse-large.webp', 'Groupe d’amis autour de petites tables rondes, bières et verres de vin, devant la porte noire de la façade', 1158, 760),
    photo('/photos/spaghetti.webp', 'Assiette « Le Servais » de spaghetti sauce tomate, un verre de Duvel tenu à la main', 1067, 1600),
    photo('/photos/spaghetti-carre.webp', 'Assiette creuse blanche « Le Servais » de spaghetti sauce tomate sur un comptoir en terrazzo', 900, 900),
    photo('/photos/biere-main.webp', 'Une main tient un verre de Duvel, mousse haute, au-dessus de l’assiette', 900, 900),
    photo('/photos/petit-dejeuner.webp', 'Petit-déjeuner sur une table en marbre cerclée de laiton : tasse turquoise, jus d’orange, viennoiserie', 1066, 1600),
    photo('/photos/tasse-turquoise.webp', 'Une tasse et sa soucoupe turquoise de café au lait sur un guéridon en marbre', 900, 760),
    photo('/photos/jus-croissant.webp', 'Jus d’orange pressé et viennoiserie coupée au couteau sur la table en marbre', 900, 900),
    photo('/photos/veranda.webp', 'La Verrière : fauteuils en cuir orange, plantes suspendues et structure métallique, verrière au fond', 1200, 1800, true),
    photo('/photos/veranda-carre.webp', 'La Verrière : deux fauteuils orange autour d’une petite table, plantes et étagères en métal', 1200, 900, true),
  ],
  valeurs: ['Produits locaux cités sur la carte', 'Boulets maison, frites à double cuisson', 'Ouvert 7 jours sur 7'],
};

export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}

export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;

export const horaireTexte = (h: Horaire) =>
  h.creneaux.length ? h.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(', ') : h.note || 'fermé';

export const telHref = (r: Restaurant = site) => `tel:+32${r.telephone.replace(/\s+/g, '').replace(/^0/, '')}`;

/** Lien d'itinéraire : recherche par adresse (pas de coordonnées au dossier). */
export const itineraire = () => `https://www.openstreetmap.org/search?query=${encodeURIComponent(adresseLigne())}`;

// ---------------------------------------------------------------------------------------------
// Gabarit « Journée » : six moments, tous réels chez Le Servais (ouvert 7/7 de 9h à 1h).
// Prix du dossier (menus Cuisine et Bar). `placeholder` ne reste qu'aux éléments non prouvés.
// ---------------------------------------------------------------------------------------------

export interface Ligne { nom: string; detail: string; prix: string | null; placeholder: boolean }
export interface Moment {
  id: string; // ancre : m-9h
  heure: number; // heure décimale
  heureTexte: string;
  titre: string;
  accroche: string;
  accrochePlaceholder: boolean;
  theme: 'aube' | 'midi' | 'ocre' | 'corail' | 'nuit' | 'nuitProfonde';
  lignes: Ligne[];
  photo?: string;
  placeholder: boolean;
}

const l = (nom: string, prix: string | null, detail = ''): Ligne => ({ nom, detail, prix, placeholder: false });

export const moments: Moment[] = [
  {
    id: 'm-9h', heure: 9, heureTexte: '9h', titre: 'Le petit-déjeuner', theme: 'aube',
    accroche: 'Le bar ouvre à 9h, tous les jours. Le samedi et le dimanche, de 9h30 à 11h30, la cuisine sert pancakes, pain perdu et œufs.',
    accrochePlaceholder: false, placeholder: false, photo: '/photos/petit-dejeuner.webp',
    lignes: [
      l('Croissant', '3 €'),
      l('Granola', '10 €', 'yaourt grec sucré, granola aux fruits secs, fruits rouges'),
      l('Pancakes Servais', '12 €', 'sirop d’érable, fruits rouges, 3 pièces'),
      l('Pain perdu', '12 €', 'pâte de croissant, caramel au beurre salé, fruits rouges, glace vanille'),
      l('Œufs au plat', '8,50 €', '2 pièces, pain toasté, beurre'),
    ],
  },
  {
    id: 'm-11h30', heure: 11.5, heureTexte: '11h30', titre: 'Le déjeuner', theme: 'midi',
    accroche: 'La cuisine tourne non stop dès 11h30. Boulets maison, croque, burger, et le mardi la bolo à 12 €.',
    accrochePlaceholder: false, placeholder: false, photo: '/photos/spaghetti.webp',
    lignes: [
      l('Boulet liégeois', '16,50 €', 'porc et bœuf maison, sauce liégeoise au sirop de Liège, frites maison ; 2 pièces 20,50 €'),
      l('Américain maison', '19,90 €', 'haché sur place, salade, frites maison'),
      l('Croque-monsieur', '14,50 €', 'jambon, fromage, salade'),
      l('Cheeseburger', '18,50 €', 'potato bun, pur bœuf, sauce de la cheffe, oignons pickles'),
      l('Spaghetti bolognaise', '17,50 €'),
    ],
  },
  {
    id: 'm-16h', heure: 16, heureTexte: '16h', titre: 'À partager', theme: 'ocre',
    accroche: 'Du sharing food toute la journée : croquettes, fromage de Boninne, spécialités de Spy et frites à double cuisson.',
    accrochePlaceholder: false, placeholder: false, photo: '/photos/terrasse.webp',
    lignes: [
      l('Croquettes à la Houppe', '11 €', '6 mini croquettes au fromage et à la Houppe, bière namuroise'),
      l('Spycroc', '7,50 €', '6 mini, version artisanale du poulycroc, produits à Spy'),
      l('Fromage de Boninne', '6,50 €', 'produit à Boninne par Marie-Cécile Crevits'),
      l('Frites Servais', '10 €', 'parmesan et huile de truffe'),
      l('Planche mixte', '20 €'),
    ],
  },
  {
    id: 'm-18h', heure: 18, heureTexte: '18h', titre: 'Le 3+1', theme: 'corail',
    accroche: 'Tous les jours de 18h à 20h, le 3+1 sur les cocktails. Le bar se remplit avant la salle.',
    accrochePlaceholder: false, placeholder: false, photo: '/photos/bar-detail.webp',
    lignes: [
      l('Aperol Spritz', '11 €'),
      l('Moscow Mule', '12 €'),
      l('Negroni', '12 €'),
      l('Pornstar Martini', '11,50 €'),
      l('Espresso Martini', '11,50 €'),
    ],
  },
  {
    id: 'm-20h', heure: 20, heureTexte: '20h', titre: 'Le dîner', theme: 'nuit',
    accroche: 'Cuisine ouverte jusqu’à 22h, jusqu’à minuit le vendredi et le samedi : viandes, pâtes, vol-au-vent.',
    accrochePlaceholder: false, placeholder: false, photo: '/photos/bar-comptoir.webp',
    lignes: [
      l('Pavé de bœuf', '20,90 €', '250 g, frites maison, sauce archiduc, Sambre & Meuse ou poivre'),
      l('Tagliata de bœuf à l’italienne', '22,50 €', 'huile de truffe, salade italienne, frites'),
      l('Vol-au-vent', '19,90 €', 'bouchée à la reine, frites maison'),
      l('Rigatoni butternut', '21,90 €', 'crème de butternut, gorgonzola, noix, lardons'),
      l('Burger raclette', '19,90 €', 'pur bœuf, raclette, mayo moutarde, oignons caramélisés'),
    ],
  },
  {
    id: 'm-23h', heure: 23, heureTexte: '23h', titre: 'Le dernier verre', theme: 'nuitProfonde',
    accroche: 'Le bar ferme à 1h, à 2h le vendredi et le samedi.',
    accrochePlaceholder: false, placeholder: false,
    lignes: [
      l('Servais Pils 5°', '4 €', '33 cl, pression'),
      l('Duvel 8,5°', '6,20 €', '33 cl, pression'),
      l('La Chouffe 8°', '5,40 €', '33 cl, pression'),
      l('Irish Coffee', '12 €'),
      l('Colonel', '10,50 €', 'sorbet citron, Potato Vodka Dada Chapel'),
    ],
  },
];

/** Carte complète par rubrique (menu Cuisine et extraits du menu Bar), pour la page « carte ». */
export const rubriques: { id: string; titre: string; note?: string; lignes: Ligne[] }[] = [
  {
    id: 'petit-dejeuner', titre: 'Petit-déjeuner', note: 'Samedi et dimanche, de 9h30 à 11h30.',
    lignes: [
      l('Croissant', '3 €'), l('Pain choc', '3 €'),
      l('Granola', '10 €', 'yaourt grec sucré, granola aux fruits secs, fruits rouges'),
      l('Pain perdu', '12 €', 'pâte de croissant, caramel au beurre salé, fruits rouges, glace vanille'),
      l('Œufs au plat', '8,50 €', '2 pièces, pain toasté, beurre ; supplément bacon 3 €'),
      l('Toast œufs brouillés', '10,50 €', 'pain toasté, salade ; supplément bacon 3 €'),
      l('Pancakes Servais', '12 €', 'sirop d’érable, fruits rouges, 3 pièces'),
      l('Apple pie pancakes', '12 €', 'pommes caramélisées à la cannelle, caramel beurre salé, chantilly, 3 pièces'),
      l('English style', '15 €', 'œuf, bacon, sirop d’érable, 3 pièces'),
      l('Pancake enfant (moins de 12 ans)', '9 €', 'sirop d’érable, chocolat ou spéculoos, 2 pièces'),
    ],
  },
  {
    id: 'sharing', titre: 'À partager', note: 'De 11h30 à 22h, jusqu’à minuit le vendredi et le samedi.',
    lignes: [
      l('Olives', '4,50 €'), l('Boulette froide', '5 €', 'porc et bœuf maison, moutarde'),
      l('Fromage de Boninne', '6,50 €', 'produit à Boninne par Marie-Cécile Crevits'),
      l('Saucisse sèche à la Chouffe', '5 €', 'affinée par la Boucherie de l’Artisan à Spy'),
      l('Croquettes à la Houppe', '11 €', '6 mini croquettes au fromage et à la Houppe, bière namuroise'),
      l('Camembert au four', '14 €', 'camembert Paquerette de chez Kaas'),
      l('Frites maison', '5,50 €', 'double cuisson à la graisse de bœuf'),
      l('Frites Servais', '10 €', 'parmesan et huile de truffe'),
      l('Frites de patates douces', '8,50 €'),
      l('Spycroc', '7,50 €', '6 mini, version artisanale du poulycroc, produits à Spy'),
      l('Spycadelle à l’ail des ours', '7,50 €', '8 mini'),
      l('Bitterballen, moutarde', '7,50 €', '8 boulettes de ragoût de viande'),
      l('Croquettes de fromage', '7,50 €', '8 mini'),
      l('Croquettes de crevettes', '8 €', '8 mini, sauce tartare'),
      l('Crevettes panko', '9,50 €', '6 queues, sauce aigre-douce'),
      l('Chipirones', '10 €', 'petits calamars frits, sauce tartare'),
      l('Tzatziki', '11,50 €', 'pain naan'), l('Houmous', '11,50 €', 'pain naan'),
      l('Nachos', '12,50 €', 'cheddar grillé, guacamole'),
      l('Mix fritures', '17,50 €'), l('Planche mixte', '20 €'), l('Maxi plateau apéro', '36 €'),
    ],
  },
  {
    id: 'brasserie', titre: 'Brasserie', note: 'De 11h30 à 22h, jusqu’à minuit le vendredi et le samedi.',
    lignes: [
      l('Croque-monsieur', '14,50 €', 'jambon, fromage, salade'),
      l('Croque végé', '15,50 €', 'emmental, aubergine grillée, tapenade de tomates séchées'),
      l('Salade César', '19,50 €'), l('Salade chèvre chaud', '19,50 €', 'croustillant de chèvre, miel'),
      l('Boulet liégeois', '16,50 € / 20,50 €', 'porc et bœuf maison, sauce liégeoise au sirop de Liège, frites maison ; 1 ou 2 pièces'),
      l('Boulettes sauce tomate', '16,50 € / 20,50 €', '1 ou 2 pièces'),
      l('Boulettes Sambre & Meuse', '16,50 € / 20,50 €', '1 ou 2 pièces'),
      l('Américain maison', '19,90 €', 'haché sur place, salade, frites maison'),
      l('Pavé de bœuf', '20,90 €', '250 g, frites maison, sauce archiduc, Sambre & Meuse ou poivre'),
      l('Tagliata de bœuf à l’italienne', '22,50 €', 'huile de truffe, salade italienne, frites'),
      l('Vol-au-vent', '19,90 €', 'bouchée à la reine, frites maison'),
      l('Spaghetti bolognaise', '17,50 €'),
      l('Reginettes tartufata', '20,50 €', 'sauce mascarpone tartufata, parmesan, huile de truffe'),
      l('Rigatoni butternut', '21,90 €', 'crème de butternut, gorgonzola, noix, lardons (version végé possible)'),
      l('Cheeseburger', '18,50 €', 'potato bun, pur bœuf, sauce de la cheffe, oignons pickles'),
      l('Chicken bacon burger', '19,50 €'), l('Veggie burger', '18,50 €', 'croquette végétarienne'),
      l('Burger raclette', '19,90 €', 'pur bœuf, raclette, mayo moutarde, oignons caramélisés'),
    ],
  },
  {
    id: 'enfants', titre: 'Enfants', note: 'Moins de 12 ans.',
    lignes: [
      l('Chicken burger enfant', '12,50 €'), l('Spycroc enfant', '12,50 €', '4 mini croquettes de poulet, frites'),
      l('Boulette, frites', '12,50 €'), l('Spaghet’ bolo', '12,50 €', 'tous les mardis, la bolo à 12 €'),
    ],
  },
  {
    id: 'desserts', titre: 'Desserts',
    lignes: [
      l('Boule de glace', '3,50 €', 'vanille ou sorbet citron'), l('Pain « croissant » perdu', '12 €'),
      l('Dame blanche', '10,50 €'), l('Affogato pimpé', '11,50 €'),
      l('Colonel', '10,50 €', 'sorbet citron, Potato Vodka Dada Chapel'),
    ],
  },
  {
    id: 'cocktails', titre: 'Cocktails', note: 'Extrait du menu Bar. 3+1 tous les jours de 18h à 20h.',
    lignes: [
      l('Aperol Spritz', '11 €'), l('Saint-Germain Spritz', '12,50 €'), l('Moscow Mule', '12 €'), l('Negroni', '12 €'),
      l('Pornstar Martini', '11,50 €'), l('Espresso Martini', '11,50 €'), l('Long Island Iced Tea', '12,50 €'),
    ],
  },
  {
    id: 'bieres', titre: 'Bières pression', note: 'Extrait du menu Bar.',
    lignes: [
      l('Servais Pils 5°', '3 € / 4 € / 5,80 €', '25 cl, 33 cl, 50 cl'),
      l('Duvel 8,5°', '4,80 € / 6,20 €', '25 cl, 33 cl'),
      l('Vedett IPA 6°', '4,30 € / 5,50 € / 8,30 €', '25 cl, 33 cl, 50 cl'),
      l('La Chouffe 8°', '4,20 € / 5,40 € / 8,20 €', '25 cl, 33 cl, 50 cl'),
    ],
  },
  {
    id: 'cafe', titre: 'Café et boissons chaudes', note: 'Extrait du menu Bar.',
    lignes: [
      l('Espresso', '3 €'), l('Cappuccino', '4,90 €'), l('Latte macchiato', '4,90 €'), l('Matcha latte', '5,50 €'), l('Irish Coffee', '12 €'),
    ],
  },
];

/** Offre du bar à l'heure du 3+1 (réelle). */
export const happyHour = { texte: '3+1 sur les cocktails, tous les jours de 18h à 20h', placeholder: false };

/** Horaires de cuisine (réels) ; `site.horaires` porte l'ouverture du bar. */
export const horairesCuisine: { jour: Jour; texte: string }[] = [
  { jour: 'lundi', texte: '11:30 à 22:00' },
  { jour: 'mardi', texte: '11:30 à 22:00' },
  { jour: 'mercredi', texte: '11:30 à 22:00' },
  { jour: 'jeudi', texte: '11:30 à 22:00' },
  { jour: 'vendredi', texte: '11:30 à 00:00' },
  { jour: 'samedi', texte: '11:30 à 00:00' },
  { jour: 'dimanche', texte: '11:30 à 22:00' },
];

/** Presse (réelle). */
export const presse = { media: 'RTBF Auvio, Namur Matin', titre: 'Le Servais, nouveau bar restaurant à Namur', date: '15 mai 2025', url: 'https://auvio.rtbf.be/media/namur-matin-le-servais-nouveau-bar-restaurant-a-namur-3340069' };

/** Privatisation (réelle). */
export const privatisation = {
  verriere: 'La Verrière accueille de 12 à 30 personnes assises, jusqu’à 50 debout, avec bar en self-service, musique et projecteur.',
  bar: 'Le bar entier se privatise à partir de 60 personnes.',
};

export const jours: Jour[] = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
