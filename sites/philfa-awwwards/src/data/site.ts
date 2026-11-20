// Contenu de PhilFa. Source : data/restaurants/philfa/{donnees.json,dossier.md}. Tout ce qui n'y figure pas est marqué
// `placeholder: true` ou absent.
// Hypothèses : (1) « Phil » et « Fa » (le logo met les deux syllabes en deux couleurs) sont lus comme un clin d'œil aux deux
// patrons, Philippe et Fabian : c'est une lecture de la maquette, le texte ne l'affirme jamais comme un fait ;
// (2) le menu du moment est celui du PDF du site (date inconnue) : il est présenté comme exemple de formule, il change toutes les 6 semaines ;
// (3) aucune note ni avis (valeurs non vérifiées, laissées de côté) ; (4) e-mail inconnu : aucun mailto, seulement tel: et Barestho.
import carteJson from './carte.json';

export interface Prix { v: number; lib?: string }
export interface Plat { nom: string; description: string | null; prix: Prix[]; placeholder?: boolean }
export interface Categorie { cle: string; titre: string; note: string | null; plats: Plat[] }

export const carte = carteJson as Categorie[];

export const site = {
  nom: 'PhilFa',
  nomLong: 'Brasserie PhilFa',
  typeCuisine: 'Brasserie française moderne',
  description: 'PhilFa, brasserie du centre de Namur, rue de Marchovelette : menu du moment à double choix, croquettes, tartare coupé au couteau, gibier de saison. Salle feutrée et terrasse.',
  adresse: { rue: 'Rue de Marchovelette', numero: '21/23', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.4626126, lon: 4.8668955 },
  telephone: '+3281226111',
  telephoneLisible: '+32 81 22 61 11',
  telephoneHref: 'tel:+3281226111',
  reservationUrl: 'https://philfa.reservation.barestho.com/',
  planUrl: 'https://www.openstreetmap.org/?mlat=50.4626126&mlon=4.8668955#map=18/50.4626126/4.8668955',
  siteActuel: 'https://www.philfa.be',
  facebook: 'https://www.facebook.com/RestaurantPhilFaNamur',
  instagram: 'https://www.instagram.com/philfa_restaurant',
  ouvertDepuis: 2013,
  renoveEn: 2020,
  places: { salle: 55, terrasse: 20 },
} as const;

export const services = [
  { cle: 'midi', nom: 'Midi', debut: '12:00', fin: '14:30', lisible: '12 h à 14 h 30' },
  { cle: 'soir', nom: 'Soir', debut: '18:15', fin: '21:00', lisible: '18 h 15 à 21 h' },
] as const;
export const joursOuverts = ['Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'] as const;
export const joursFermes = ['Lundi', 'Dimanche'] as const;
export const joursSchema = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

/** Menu du moment : double choix à chaque étape. Texte du PDF du site (date inconnue). */
export const menuDuMoment = {
  prixDeux: 35,
  prixTrois: 41,
  rotation: 'toutes les 6 semaines',
  etapes: [
    { cle: 'entree', nom: 'Entrée', choix: ['Saumon frais mariné, agrumes, menthe, citron et bâtonnets de poireaux crus', 'Poêlée de champignons, beurre à l’ail, fines herbes, mini croque-monsieur à l’huile de truffe'] },
    { cle: 'plat', nom: 'Plat', choix: ['Mijoté de blanc de volaille façon coq au vin, lardons et frites', 'Dos de loup de mer, choucroute nature, sauce dijonnaise, purée de pomme de terre aux herbes'] },
    { cle: 'dessert', nom: 'Dessert', choix: ['Glace au chocolat goût Nutella, crème battue', 'Sorbet banane, caramel et meringue aux amandes caramélisées'] },
  ],
} as const;

export const equipe = [
  { nom: 'Philippe Legrand', role: 'Patron, en cuisine' },
  { nom: 'Fabian Rammeloo', role: 'Patron, en cuisine' },
  { nom: 'Leo Afizi', role: 'Équipe' },
  { nom: 'Alicia Rammeloo', role: 'Équipe, fille de la maison' },
] as const;

export const atouts = ['Terrasse ombragée à l’avant', 'Air conditionné', 'Animaux acceptés', 'Menu enfant jusqu’à 12 ans', 'Plat végétarien à la carte'] as const;

export const eur = (v: number) => `${v.toFixed(2).replace('.', ',')} €`;
