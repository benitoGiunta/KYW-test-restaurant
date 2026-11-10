// Données du Le 54 (Dave, Namur), tirées de data/restaurants/le-54/{donnees.json,dossier.md}.
// HYPOTHÈSES (aussi dans RAPPORT.md) : (1) les 34 couverts viennent de Trouve Ton Resto (donnees.json pratique.couverts) ;
// le PLAN de salle est illustratif (7 tables de 4 et 3 tables de 2 = 34 places, disposition inventée) ; (2) le lundi est
// annoncé ouvert par le site (« fermé mardi, mercredi et samedi midi ») mais fermé par la-carte.be : affiché « à confirmer »,
// absent du JSON-LD ; (3) menu 4 services : 65 € (site) contre 62 € (Gault&Millau) : 65 € affiché ; (4) aucun score Gault&Millau
// affiché (13, 13,5 ou 13,5/20 selon la source) ; aucun avis chiffré ; (5) l'attribution des plats aux services n'est pas connue :
// la carte liste le « menu du moment » sans dire quel plat est dans quel service.
export const site = {
  nom: 'Le 54',
  nomLong: 'Le 54, Dave',
  typeCuisine: 'Cuisine de saison et de marché',
  description: 'Le 54, table gastronomique de Dave, au bord de la Meuse à Namur : menu de saison en 3 ou 4 services, 34 couverts. Réservation souhaitée.',
  adresse: { rue: 'Rue de Longeau', numero: '54', cp: '5100', commune: 'Dave (Namur)', localite: 'Dave', pays: 'BE' },
  geo: { lat: 50.4188668, lon: 4.8850885 },
  telephone: { lisible: '+32 81 58 04 40', href: 'tel:+3281580440' },
  telephone2: { lisible: '+32 496 35 10 75', href: 'tel:+32496351075' },
  email: 'restaurantle54@gmail.com',
  reservationUrl: 'https://www.le54dave.be/contact',
  siteClient: 'https://www.le54dave.be',
  carteUrl: 'https://www.openstreetmap.org/?mlat=50.4188668&mlon=4.8850885#map=17/50.4188668/4.8850885',
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/Restaurant-LE-54--146193728765518/' },
    { nom: 'Instagram', url: 'https://www.instagram.com/le54dave/' },
  ],
  couverts: 34,
  reprise: 2010,
  credit: 'Photos : Le 54',
  pratique: ['Parking aisé, en face du restaurant', 'Terrasse', 'Accessible aux personnes à mobilité réduite', 'Paiement par Visa et MasterCard', 'Chiens admis'],
} as const;

export const creneaux = { midi: '12 h à 14 h', soir: '18 h 30 à 21 h' } as const;
export const dernieresCommandes = { midi: '13 h', soir: '20 h' } as const;
// jour, midi, soir, aConfirmer
export const horaires = [
  { jour: 'Lundi', midi: true, soir: true, aConfirmer: true },
  { jour: 'Mardi', midi: false, soir: false },
  { jour: 'Mercredi', midi: false, soir: false },
  { jour: 'Jeudi', midi: true, soir: true },
  { jour: 'Vendredi', midi: true, soir: true },
  { jour: 'Samedi', midi: false, soir: true },
  { jour: 'Dimanche', midi: true, soir: true },
] as const;
// JSON-LD : seuls les jours confirmés (jeudi, vendredi, samedi soir, dimanche).
export const horairesSchema = [
  { jours: ['Thursday', 'Friday', 'Sunday'], opens: '12:00', closes: '14:00' },
  { jours: ['Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '18:30', closes: '21:00' },
] as const;

export const formules = [
  { nom: '3 services', prix: 48 },
  { nom: '4 services', prix: 65 },
] as const;

// Menu du moment (site du restaurant, page « La carte »). Sans attribution aux services.
export const menuDuMoment = [
  { nom: 'Fin tranchée de veau, sauce tonnato', description: 'Veau cuit à basse température, sauce tonnato, œufs de truite, câpres. Et/ou crevettes nobashi en raviole au curry, juste raidie, crème de dashi.' },
  { nom: 'Bœuf wagyu A5', description: 'Véritable bœuf wagyu A5, 100 g, sel au charbon.', supplement: 40 },
  { nom: 'Cochon de lait ou zarzuela', description: 'Cochon de lait légèrement saumuré, garniture estivale, pimentos, pommes de terre confites à l’huile d’olive. Ou zarzuela à notre façon : poissons et coquillages selon arrivage, légumes du sud.' },
  { nom: 'Plaisir sucré', description: 'Le dessert du moment.' },
] as const;
export const supplementsZarzuela = [
  { nom: 'Royale, avec un demi-homard', prix: 25 },
  { nom: 'Impériale, avec une demi-langouste', prix: 35 },
] as const;
export const notesCarte = ['Pour la zarzuela, minimum deux personnes.', 'Toute modification est susceptible d’entraîner un supplément.', 'Les allergies sont adaptées si elles sont signalées à la réservation.'] as const;

export const histoire = {
  chapeau: 'Une maison de famille devenue table gastronomique.',
  paragraphes: [
    'En 2010, Michel et Véronique Collignon reprennent l’établissement avec leur fils Jonathan et lui donnent une dimension plus gastronomique.',
    'Jonathan Collignon est diplômé de l’École hôtelière provinciale de Namur. Il passe par Le Vivier d’Oies, chez le chef Godelet, puis fait un stage chez le chef Pauly, au Coq aux Champs. Autodidacte et créatif, il promeut les artisans locaux.',
    'La carte suit les saisons et se renouvelle souvent. Trente-quatre couverts, au bord de la Meuse.',
  ],
} as const;
export const equipe = [
  { nom: 'Jonathan Collignon', role: 'Chef' },
  { nom: 'Michel et Véronique Collignon', role: 'Ont repris la maison en 2010' },
] as const;
