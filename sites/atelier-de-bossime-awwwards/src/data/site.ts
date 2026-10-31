// Contenu de la variante awwwards de L’Atelier de Bossimé. Toute donnée vient de
// data/restaurants/atelier-de-bossime/donnees.json et dossier.md (recherche du 31/10/2026).
// Hypothèses (listées dans RAPPORT.md) :
// 1. piliersPlaceholder : la lecture des trois accents (la terre, les gens, la maison) est la nôtre ; le client
//    dit seulement « un accent par pilier de la durabilité ».
// 2. emailPlaceholder : info@bossime.be vient de data/restaurants.json, il n’est pas affiché sur le site du client.
// 3. horairesFermeturePlaceholder : les heures de fin (16 h, 23 h 30) viennent du Guide MICHELIN ; le client écrit
//    « dès 12 h » et « dès 19 h ». Le texte visible suit le client, le JSON-LD suit Michelin.
// 4. Aucun plat nommé : le livret change à table. Les photos d’assiettes sont des assiettes passées.
// 5. Aucune photo n’est légendée « Ludovic Vanackere » (portrait non confirmé dans photos/index.json).

export const site = {
  nom: "L’Atelier de Bossimé",
  nomCourt: 'Bossimé',
  baseline: 'Ferme gastronomique à Loyers, Namur',
  description:
    "Ferme gastronomique à Loyers, près de Namur : légumes du potager bio, cuisine ouverte dans un ancien fenil, lunch en semaine et menus de 3 à 7 Moments.",
  typeCuisine: ['Cuisine gastronomique', 'Cuisine bio', 'Cuisine française moderne'],
  url: 'https://kyw-test-restaurant.vercel.app/atelier-de-bossime/awwwards/',
  adresse: { rue: 'Rue Bossimé', numero: '2B', cp: '5101', commune: 'Loyers', ville: 'Namur', pays: 'BE' },
  geo: { lat: 50.4548436, lon: 4.9317527 },
  carteUrl: 'https://www.openstreetmap.org/?mlat=50.45484&mlon=4.93175#map=17/50.45484/4.93175',
  telephone: '+32 478 13 71 25',
  telephoneLisible: '0478 13 71 25',
  telephoneHref: 'tel:+32478137125',
  email: 'info@bossime.be',
  emailPlaceholder: true,
  reservation: {
    outil: 'Zenchef',
    url: 'https://www.atelier-de-bossime.be/page/reservation-table-restaurant-gastronomique-durable-atelier-bossime-namur.html',
  },
  reseaux: [{ nom: 'Facebook', url: 'https://www.facebook.com/atelierdebossime/' }],
  devise: 'Remettre la ferme au milieu du village.',
  deviseBis: "L’exigence de la cuisine, la simplicité de la nature.",
  tva: 'BE 0552.992.842',
};

// Horaires : texte visible du client (« dès 12 h », « dès 19 h »), heures de fin Michelin pour le JSON-LD.
export type Jour = { jour: string; en: string; midi: boolean; soir: boolean };
export const horaires: Jour[] = [
  { jour: 'Lundi', en: 'Monday', midi: true, soir: true },
  { jour: 'Mardi', en: 'Tuesday', midi: true, soir: true },
  { jour: 'Mercredi', en: 'Wednesday', midi: true, soir: true },
  { jour: 'Jeudi', en: 'Thursday', midi: true, soir: true },
  { jour: 'Vendredi', en: 'Friday', midi: true, soir: true },
  { jour: 'Samedi', en: 'Saturday', midi: false, soir: true },
  { jour: 'Dimanche', en: 'Sunday', midi: false, soir: false },
];
export const services = {
  midi: { libelle: 'midi, dès 12 h', ouverture: '12:00', fermeture: '16:00' },
  soir: { libelle: 'soir, dès 19 h', ouverture: '19:00', fermeture: '23:30' },
  horairesFermeturePlaceholder: true,
};
export const journee = (j: Jour) =>
  !j.midi && !j.soir ? 'fermé' : [j.midi && services.midi.libelle, j.soir && services.soir.libelle].filter(Boolean).join(' et ');

// Les trois accents. Lecture KYW des « trois piliers de la durabilité » du logo (hypothèse 1).
export const piliersPlaceholder = true;
export const piliers = [
  {
    cle: 'terre',
    titre: 'La terre',
    texte:
      "Le potager de la ferme compte environ 45 variétés, cultivées en bio sur sol vivant, souvent à partir de semences anciennes. Ce qui manque vient de producteurs voisins, en circuit court.",
    photo: 'platTomate',
  },
  {
    cle: 'gens',
    titre: 'Les gens',
    texte:
      "La cuisine est ouverte sur la salle : vous voyez la brigade dresser chaque assiette. La maison fait de l’emploi de qualité un engagement, au même titre que le bio.",
    photo: 'dressage',
  },
  {
    cle: 'maison',
    titre: 'La maison',
    texte:
      "La salle occupe l’ancien fenil de la ferme, rénové en matériaux durables. Les contenants sont réutilisables et la maison vise le zéro déchet.",
    photo: 'serviceFenil',
  },
] as const;

// Repères chiffrés : uniquement des faits sourcés (site du client, L’Avenir 22/01/2024).
export const reperes = [
  { valeur: '2011', libelle: "l’ouverture, dans un coin de la ferme familiale" },
  { valeur: '20', unite: 'ans', libelle: "l’âge du chef Ludovic Vanackere ce jour-là" },
  { valeur: '8', unite: 'tables', libelle: 'au premier service' },
  { valeur: '45', unite: 'variétés', libelle: 'environ, au potager bio' },
  { valeur: '60', unite: 'places', libelle: 'assises pour un groupe, 120 debout' },
];

// Carte : formules réelles (page carte du site du client, 31/10/2026). Prix en nombres.
export type Ligne = { nom: string; detail?: string; prix: number | [number, number]; moments?: number; photo?: string; placeholder?: boolean };
export type Rubrique = { cle: string; titre: string; intro: string; lignes: Ligne[] };
export const carte: Rubrique[] = [
  {
    cle: 'lunch',
    titre: 'Le lunch',
    intro: 'Du lundi au vendredi, à midi. Servi en une heure si vous le demandez en arrivant.',
    lignes: [
      { nom: 'Lunch en 2 services', detail: 'Accueil, puis deux plats au choix sur le livret ou en surprise.', prix: 42, moments: 2, photo: 'platConcombre' },
      { nom: 'Lunch en 3 services', detail: 'Accueil, puis trois plats au choix sur le livret ou en surprise.', prix: 52, moments: 3, photo: 'platVolaille' },
      { nom: "L’option verre de vin", detail: 'Ou sa version sans alcool, à 10\u00a0€.', prix: 12 },
      { nom: 'Le chariot de fromages belges', detail: 'Fromages affinés, confits, fruits secs et pain maison.', prix: 16 },
    ],
  },
  {
    cle: 'moments',
    titre: 'Les menus en Moments',
    intro: 'Midi et soir. Vous composez vos Moments sur le livret, ou vous laissez la cuisine choisir : la carte blanche.',
    lignes: [
      { nom: '3 Moments', detail: 'Au choix sur le livret ou en carte blanche.', prix: 68, moments: 3, photo: 'platTarte' },
      { nom: '4 Moments', detail: 'Au choix sur le livret ou en carte blanche.', prix: 80, moments: 4, photo: 'platPoireau' },
      { nom: '5 Moments', detail: 'Au choix sur le livret ou en carte blanche.', prix: 92, moments: 5, photo: 'platCanard' },
      { nom: '7 Moments', detail: 'À réserver deux jours avant votre venue.', prix: 130, moments: 7, photo: 'dessertChocolat' },
    ],
  },
  {
    cle: 'boissons',
    titre: 'À boire',
    intro: 'Le bar fait ses cocktails et ses boissons maison.',
    lignes: [
      { nom: "L’apéritif au verre", prix: 16, photo: 'cocktailSour' },
      { nom: 'Le vin au verre', prix: 12 },
      { nom: 'La bière artisanale', prix: 6 },
      { nom: "L’eau", prix: 12 },
      { nom: 'Le café ou le thé', prix: 4 },
      { nom: 'La carte des vins', detail: 'Des bouteilles de 44 à 160 €.', prix: [44, 160] },
    ],
  },
];
export const euro = (p: Ligne['prix']) =>
  Array.isArray(p) ? `${p[0]} à ${p[1]} €` : `${p} €`;

// Pratique (site du client).
export const pratique = {
  acces: 'À 35 minutes de Bruxelles, 30 de Charleroi et 40 de Liège.',
  groupes: "Jusqu’à 60 personnes assises et 120 en dînatoire debout. Dès 10 personnes, la maison peut ouvrir hors des horaires.",
  pmr: "L’accès compte un escalier de cinq marches, jusqu’aux travaux prévus en 2027.",
  chiens: 'Les chiens sont acceptés.',
  allergies: 'Signalez vos allergies en réservant : la cuisine adapte le menu.',
};

export const credits = {
  photos: "photos : L’Atelier de Bossimé",
  polices: 'Cabinet Grotesk et General Sans (Indian Type Foundry, Fontshare)',
  outils: 'Astro, GSAP et Lenis',
};
