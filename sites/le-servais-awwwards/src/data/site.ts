// Contenu du Servais Namur. Source : data/restaurants/le-servais/ (donnees.json, dossier.md, photos/index.json).
// Hypothèses (aussi dans ETAT.md puis RAPPORT.md) :
//  - Téléphone : 081/73.65.52 (site et Namur Tourisme) retenu ; donnees.json cite aussi +32492938796, à confirmer.
//  - Propriétaires, chef, équipe : inconnus, donc absents (pas de section équipe, aucun prénom).
//  - Avis Google, abonnés, GPS : inconnus, donc absents (aucune note affichée, pas de geo dans le JSON-LD).
//  - Carte : 76 lignes réelles du menu Cuisine (PDF) et extraits du menu Bar ; prix du Margarita à confirmer (aconfirmer).
//  - Photo 05 (salle végétalisée) : origine à confirmer (préfixe Wix 11062b), servie comme « illustrative » (placeholder: true).
//  - Ouverture : début mai 2025 (RTBF, Namur Matin, 15/05/2025). Aucune autre date.
import carteBrute from './carte.json';

export const site = {
  nom: 'Le Servais',
  baseline: 'Bar et brasserie au départ du téléphérique de Namur',
  description: 'Le Servais, bar brasserie au départ du téléphérique de Namur : petits-déjeuners, boulets liégeois, sharing food et cocktails. Ouvert 7 jours sur 7 dès 9 h.',
  typeCuisine: 'Brasserie belge, bar à cocktails, sharing food',
  adresse: { rue: 'Rue des Fossés Fleuris', numero: '33', cp: '5000', commune: 'Namur', pays: 'BE' },
  telephone: '+3281736552',
  telephoneLisible: '081 73 65 52',
  telephoneHref: 'tel:+3281736552',
  email: 'hello@leservais.be',
  reservationUrl: 'https://book.leservais.be/',
  carteUrl: 'https://www.openstreetmap.org/search?query=Rue%20des%20Foss%C3%A9s%20Fleuris%2033%2C%205000%20Namur',
  siteActuel: 'https://www.leservais.be',
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/leservais' },
    { nom: 'Instagram', url: 'https://www.instagram.com/leservais.namur' },
  ],
  presse: { media: 'RTBF Auvio, Namur Matin', titre: 'Le Servais, nouveau bar restaurant à Namur', date: '15 mai 2025', url: 'https://auvio.rtbf.be/media/namur-matin-le-servais-nouveau-bar-restaurant-a-namur-3340069' },
  credit: 'Photos : Le Servais',
} as const;

export type Jour = { id: string; nom: string; ouvre: string; ferme: string };
const court = { ouvre: '9 h', ferme: '1 h' };
const long = { ouvre: '9 h', ferme: '2 h' };
export const jours: Jour[] = [
  { id: 'lundi', nom: 'Lundi', ...court },
  { id: 'mardi', nom: 'Mardi', ...court },
  { id: 'mercredi', nom: 'Mercredi', ...court },
  { id: 'jeudi', nom: 'Jeudi', ...court },
  { id: 'vendredi', nom: 'Vendredi', ...long },
  { id: 'samedi', nom: 'Samedi', ...long },
  { id: 'dimanche', nom: 'Dimanche', ...court },
];
export const horairesSchema = [
  { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Sunday'], opens: '09:00', closes: '01:00' },
  { dayOfWeek: ['Friday', 'Saturday'], opens: '09:00', closes: '02:00' },
];
export const cuisine = [
  { nom: 'Petit-déjeuner', quand: 'Samedi et dimanche', libelle: '9 h 30 à 11 h 30' },
  { nom: 'Cuisine', quand: 'Dimanche à jeudi', libelle: '11 h 30 à 22 h' },
  { nom: 'Cuisine', quand: 'Vendredi et samedi', libelle: '11 h 30 à minuit' },
  { nom: 'Cocktails 3 + 1', quand: 'Tous les jours', libelle: '18 h à 20 h' },
];

export type Plat = { nom: string; desc: string | null; prix: string; aconfirmer?: boolean };
export type Categorie = { id: string; titre: string; note: string; heure: string; moment: string; plats: Plat[] };
export const carte = carteBrute as Categorie[];

// Stations de la journée (accueil). Heures et plats : menu Cuisine et menu Bar du client.
export const stations = [
  { heure: '9 h', titre: 'Le bar ouvre', texte: 'Tous les jours, dès 9 h. Le week-end, de 9 h 30 à 11 h 30, la carte du petit-déjeuner : pancakes, pain perdu à la pâte de croissant, granola, œufs.', photo: 'dejeuner' },
  { heure: '11 h 30', titre: 'La cuisine part', texte: 'Boulets liégeois sauce au sirop de Liège, frites maison à double cuisson, pavé de bœuf, burgers. Puis du sharing food pour la table entière. Cuisine non stop.', photo: 'spaghetti' },
  { heure: '18 h', titre: '3 + 1 sur les cocktails', texte: 'Tous les jours de 18 h à 20 h, 3 + 1 sur les cocktails : Spritz, Moscow Mule, Negroni, Espresso Martini.', photo: 'terrasse' },
  { heure: '1 h', titre: 'Terminus', texte: 'La cuisine ferme à 22 h, à minuit le vendredi et le samedi. Le bar ferme à 1 h, à 2 h le vendredi et le samedi.', photo: null },
] as const;

// Produits cités par la carte du client. Rien n'est ajouté : maison, lieu et prix viennent de donnees.json.
export const produits = [
  { produit: 'Fromage de Boninne', maison: 'Marie-Cécile Crevits', lieu: 'Boninne', prix: '6,50 €' },
  { produit: 'Saucisse sèche à la Chouffe', maison: 'Boucherie de l’Artisan', lieu: 'Spy', prix: '5,00 €' },
  { produit: 'Spycroc, Spycadelle à l’ail des ours', maison: 'Produits à Spy', lieu: 'Spy', prix: '7,50 €' },
  { produit: 'Croquettes à la Houppe', maison: 'Bière namuroise Houppe', lieu: 'Namur', prix: '11,00 €' },
  { produit: 'Camembert au four', maison: 'Paquerette, chez Kaas', lieu: null, prix: '14,00 €' },
] as const;

export const groupes = {
  verriere: { assis: '12 à 30', debout: '50', total: '60' },
  formules: [
    { nom: 'Petit-déjeuner', prix: '10 €', detail: 'Croissants, café, eaux et jus en self-service, dans la Verrière, de 9 h à 12 h.' },
    { nom: 'Brunch buffet', prix: '25 €', detail: 'À partir de 20 personnes, dans la Verrière, de 9 h à 15 h.' },
    { nom: 'Repas', prix: '20 €', detail: 'Choix entre trois plats, boissons sur mesure.' },
    { nom: 'Apéro', prix: '18 €', detail: 'Finger food et boissons, de 12 à 120 personnes.' },
  ],
} as const;
