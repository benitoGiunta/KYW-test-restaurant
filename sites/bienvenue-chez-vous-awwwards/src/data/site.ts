// Contenu de Bienvenue chez vous (Namur). Source : data/restaurants/bienvenue-chez-vous/{donnees.json,dossier.md}.
// Hypothèses (aussi listées dans RAPPORT.md) :
// - Téléphone et horaires viennent de sources tierces (Gault&Millau, Restaurant Guru), pas du site client : `aConfirmer`.
// - E-mail issu de data/restaurants.json (domaine différent du site) : à confirmer.
// - Les prix des plats de la carte du mois ne sont pas publiés : aucun prix inventé, seules les formules (site client) ont un prix.
// - Le tarif des mercredis est ambigu dans la source : il n'est pas affiché comme un prix, la mention est un complément `placeholder`.
// - Pas d'avis, de note ni de photo d'équipe : Cédric Delsaut n'apparaît pas en photo (aucune photo identifiée de lui).

export const restaurant = {
  nom: 'Bienvenue chez vous',
  baseline: 'fine cuisine et créativité',
  cuisine: 'Cuisine française à base classique, vision contemporaine',
  adresse: { rue: 'Rue Pépin 33', cp: '5000', ville: 'Namur', pays: 'BE' },
  telephone: '+32 477 29 96 83',
  telephoneAffiche: '+32 477 29 96 83',
  email: 'info@restaurantbienvenuechezvous.be',
  reservationUrl: null as string | null,
  siteClient: 'https://www.restobienvenuechezvous.com',
  plan: 'https://www.openstreetmap.org/search?query=Rue%20P%C3%A9pin%2033%2C%205000%20Namur',
  reseaux: [
    { nom: 'Instagram', href: 'https://instagram.com/resto_bienvenuechezvous_namur' },
    { nom: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100036275366364' },
    { nom: 'TikTok', href: 'https://www.tiktok.com/@bienvenuechezvousnamur' },
  ],
  depuis: 2002,
  description: 'Bienvenue chez vous, au premier étage d’une maison de maître, rue Pépin à Namur : cuisine française créative en escales, sur réservation.',
} as const;

// Horaires (sources tierces, à confirmer). Fermé lundi et dimanche.
export const horaires = [
  { jour: 'Lundi', fermé: true },
  { jour: 'Mardi', midi: '12 h à 13 h 30', soir: '19 h 30 à 21 h' },
  { jour: 'Mercredi', midi: '12 h à 13 h 30', soir: '19 h 30 à 21 h' },
  { jour: 'Jeudi', midi: '12 h à 13 h 30', soir: '19 h 30 à 21 h' },
  { jour: 'Vendredi', midi: '12 h à 13 h 30', soir: '19 h 30 à 21 h' },
  { jour: 'Samedi', midi: '12 h à 13 h 30', soir: '19 h 30 à 21 h' },
  { jour: 'Dimanche', fermé: true },
] as { jour: string; fermé?: boolean; midi?: string; soir?: string }[];

// Pour le JSON-LD.
export const horairesLd = [
  { jours: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], ouvre: '12:00', ferme: '13:30' },
  { jours: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], ouvre: '19:30', ferme: '21:00' },
];

// Les formules du Repas, en escales (site client, page « Délice des Saveurs »). Accords en supplément.
export const formules = [
  { cle: 'midi', nom: 'Le midi', escales: 'Grignotages, 3 escales, douceurs', quand: 'Midi, hors jours fériés', prix: 49, accords: 'accords B +30 €, C +40 €' },
  { cle: 'quatre', nom: '4 escales', escales: 'Grignotages, 4 escales, douceurs', quand: 'Midi et soir, sur réservation', prix: 69, accords: 'accords A +29 €, B +44 €, C +54 €' },
  { cle: 'cinq', nom: '5 escales', escales: 'Grignotages, 5 escales, douceurs', quand: 'Soir, sur réservation', prix: 79, accords: 'accords A +35 €, B +49 €, C +59 €' },
  { cle: 'signature', nom: 'Voyage Signature', escales: 'Le grand tour de la saison', quand: 'Midi et soir, sur réservation', prix: 94, accords: 'accords A +40 €, B +54 €, C +64 €' },
] as const;

export const accords = [
  { lettre: 'A', nom: 'L’Accord', texte: 'Harmonie de vins, ou de préparations maison sans alcool.' },
  { lettre: 'B', nom: 'Le Confort', texte: 'Apéritif, accord, eau, café ou thé.' },
  { lettre: 'C', nom: 'Le Confort +', texte: 'Le Confort, avec un digestif.' },
] as const;

// La carte du mois (octobre 2026, midi et soir, sur réservation). Prix non publiés : `prix: null`.
export type Plat = { nom: string; description: string; prix: number | null; categorie: string; photo: string; placeholder?: boolean };
export const plats: Plat[] = [
  { nom: 'Grignotages', description: 'Un avant-goût du voyage.', prix: null, categorie: 'Départ', photo: 'bouchees' },
  { nom: 'Les Saint-Jacques de Vincent', description: 'Textures, fraîcheur et notes grillées, en direct de petits bateaux à Port-en-Bessin.', prix: null, categorie: 'Escale', photo: 'stJacques' },
  { nom: 'L’œuf parfait', description: 'Bœuf Angus séché, potiron et noisettes.', prix: null, categorie: 'Escale', photo: 'terrine' },
  { nom: 'Filet pur de veau', description: 'Légèrement saumuré, coques et végétaux marins.', prix: null, categorie: 'Escale', photo: 'plateauViande' },
  { nom: 'Dessert du moment', description: 'En finesse, léger, frais, peu sucré.', prix: null, categorie: 'Douceurs', photo: 'salade' },
  { nom: 'Biscuit, chocolat, fantaisie', description: 'Nos incontournables douceurs.', prix: null, categorie: 'Douceurs', photo: 'smiley' },
];

// À emporter (traiteur). Prix lus sur le site client ; la Box Bienvenue chez vous est à confirmer.
export const traiteur = [
  { nom: 'Repas gourmand de la semaine', description: 'Saint-Jacques de Vincent mises au vert, filet de veau saumuré ou filet de biche, dessert du moment. À commander 24 h à l’avance.', prix: null as number | null, note: 'Le menu change chaque semaine', photo: 'platEmporter' },
  { nom: 'Box Tapas, pour deux', description: 'Une boîte de pièces à partager.', prix: 199 as number | null, note: '174 € sans boissons', photo: 'lapinsEmporter' },
  { nom: 'Box Bienvenue chez vous, pour deux', description: 'Le repas du restaurant, à déguster chez vous.', prix: 109 as number | null, note: 'Prix à confirmer', photo: 'plateauViande' },
] as const;

// Complément illustratif (placeholder) : le tarif des mercredis est ambigu dans les sources.
export const mercredis = {
  titre: 'Les mercredis à prix réduit',
  texte: 'Tous les mercredis soir, hors jours fériés, un repas en 4 escales à tarif réduit, uniquement sur réservation.',
  tarif: 'Tarif communiqué à la réservation',
  placeholder: true,
};

export const equipe = [
  { nom: 'Cédric Delsaut', role: 'Chef et propriétaire : cuisine, salle et cave', photo: null as string | null },
];

// Histoire (faits sourcés : site client, Gault&Millau, La DH du 18/05/2020).
export const histoire = [
  { annee: '2002', texte: 'Le restaurant ouvre, d’abord à Bruxelles.' },
  { annee: '2016', texte: 'Cédric Delsaut est distingué Jeune Chef de l’année par Gault&Millau.' },
  { annee: '2020', texte: 'La maison quitte l’avenue Cardinal Mercier, à Salzinnes, pour la rue Pépin, à Namur.' },
];

export const artisans = 'Une boutique de produits d’artisans, souvent locaux, et des chèques cadeaux complètent la salle.';

export const credit = 'Photos : Bienvenue chez vous';
