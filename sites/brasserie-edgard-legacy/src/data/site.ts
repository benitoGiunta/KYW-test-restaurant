import carte from './carte.json';

export const site = {
  nom: 'Mr Edgard',
  nomLong: 'Brasserie Edgard',
  baseline: 'Votre brasserie restaurant à Namur',
  adresse: { rue: 'Chaussée de Waterloo 473', ville: '5002 Saint-Servais (Namur)' },
  tel: '+32 81 46 08 00',
  telHref: 'tel:+3281460800',
  email: 'info@brasserieedgard.be',
  reservation: 'https://brasserieedgard.reservation.barestho.com/',
  maps: 'https://www.google.com/maps?q=50.472276,4.8331165',
  facebook: 'https://www.facebook.com/brasserieedgardnamur/',
  tripadvisor:
    'https://fr.tripadvisor.be/Restaurant_Review-g188663-d8420132-Reviews-Brasserie_Edgard-Namur_The_Ardennes_Wallonia.html',
  siteOrigine: 'https://www.brasserieedgard.be',
  bce: 'BE 0809.946.832',
};

const nbsp = ' ';
export function prix(p: string | number): string {
  const n = typeof p === 'string' ? parseFloat(p) : p;
  const s = Number.isInteger(n) ? String(n) : n.toFixed(2).replace('.', ',');
  return `${s}${nbsp}€`;
}

/** Horaires du site d'origine : tous les jours de 10 h 00 à 22 h 30, cuisine fermée de 15 h à 18 h en semaine. */
export const jours = [
  { jour: 'Lundi', semaine: true },
  { jour: 'Mardi', semaine: true },
  { jour: 'Mercredi', semaine: true },
  { jour: 'Jeudi', semaine: true },
  { jour: 'Vendredi', semaine: true },
  { jour: 'Samedi', semaine: false },
  { jour: 'Dimanche', semaine: false },
].map((j) => ({
  ...j,
  heures: `10${nbsp}h${nbsp}00 à 22${nbsp}h${nbsp}30`,
  cuisine: j.semaine ? `Cuisine fermée de 15${nbsp}h à 18${nbsp}h` : 'Cuisine ouverte en continu',
}));
export const horairesNote = `Cuisine fermée de 15${nbsp}h à 18${nbsp}h, sauf le week-end et les jours fériés. Les réservations par e-mail ne sont pas enregistrées.`;

export const nav = [
  { href: 'la-carte/', label: 'La carte' },
  { href: 'lunch-et-suggestions/', label: 'Lunch et suggestions' },
  { href: 'menu-groupe/', label: 'Menu groupe' },
  { href: 'galerie/', label: 'Galerie' },
  { href: 'contact/', label: 'Contact' },
];

/** Catégories de la carte : ancres d'origine (#entrees, #viandes, #poissons, #pates, #salades, #enfants, #desserts). */
export const categories = [
  { id: 'entrees', court: 'Entrées', i: 0 },
  { id: 'viandes', court: 'Viandes', i: 1 },
  { id: 'poissons', court: 'Poissons', i: 2 },
  { id: 'pates', court: 'Pâtes', i: 3 },
  { id: 'salades', court: 'Salades', i: 4 },
  { id: 'enfants', court: 'Enfants', i: 5 },
  { id: 'desserts', court: 'Desserts', i: 6 },
].map((c) => ({ ...c, ...(carte as any[])[c.i] })) as { id: string; court: string; i: number; categorie: string; plats: { nom: string; description: string | null; prix: string }[] }[];

const trouve = (re: RegExp) => (carte as any[]).flatMap((c) => c.plats).find((p: any) => re.test(p.nom));
/** Quelques plats de la carte pour l'accueil (noms et prix tels que dans la carte). */
export const selection = [
  trouve(/Carpaccio de bœuf à l’Italienne/),
  trouve(/^Croquette Maison/),
  trouve(/Brochette géante bœuf/),
  trouve(/Porketto/),
  trouve(/^Al Ragù/),
].filter(Boolean) as { nom: string; description: string | null; prix: string }[];

export const lunch = {
  platDuJour: '14.50',
  platDessert: '21.50',
  quand: 'Du lundi au vendredi, uniquement le midi',
  plats: [
    { nom: 'Filet américain, salade, pommes frites' },
    { nom: 'Pavé de saumon, sauce béarnaise, flan de légumes, chicons braisés, frites', suppl: '1.50' },
    { nom: 'Stoemp aux légumes, lard braisé, saucisse de campagne' },
    { nom: 'Tartiflette maison', suppl: '1.00' },
    { nom: 'Carbonnade de bœuf à la flamande, pommes frites' },
    { nom: 'Le boulet liégeois, pommes de terre rissolées' },
    { nom: 'Le plat du jour du moment (à demander au serveur)' },
  ],
  desserts: [
    { nom: 'Mousse au chocolat' },
    { nom: 'Crumble aux amandes, pommes, poires, raisins et rhum, glace vanille', suppl: '2.00' },
    { nom: 'Mini dame blanche' },
    { nom: 'Crème brûlée' },
    { nom: 'Irish coffee', suppl: '3.50' },
  ],
};

export const suggestions = {
  entree: [{ nom: 'Croquettes aux crevettes grises artisanales', detail: '2 pièces', prix: '19.50' }],
  plats: [
    { nom: 'Choucroute de la mer, crème au Riesling', detail: 'Truite saumonée, omble chevalier, filet de merlan, quenelle de lingue', prix: '32.50' },
    { nom: 'Traditionnel cassolet de notre chef Titi', detail: 'Saucisse de Toulouse, épaule d’agneau basse température, cuisse de canard confite, échine de porc fumé', prix: '34.00' },
    { nom: 'Salade autour de la crevette', detail: 'Mixte de salade, crevettes grises, vinaigrette douce aux pommes, croquettes aux crevettes, pommes frites', prix: '27.50' },
  ],
  moules: [
    { nom: 'Marinière', prix: '27.90' },
    { nom: 'Au vin blanc', prix: '28.90' },
    { nom: 'Crème à l’ail', prix: '29.90' },
    { nom: 'Gorgonzola', prix: '29.90' },
    { nom: 'Du chef', detail: 'Scampis, calamars, jus de crustacés crémé', prix: '31.90' },
  ],
  moulesNote: 'Toutes nos moules sont accompagnées de pommes frites maison.',
  dessert: [{ nom: 'Crumble d’automne aux amandes', detail: 'Pommes, poires et raisins', prix: '11.50' }],
};

export const groupe = {
  taille: 'Table de plus de 10 personnes, 16 au maximum',
  limite: 'Pas plus de 12 personnes le vendredi soir, le samedi soir, le dimanche midi et les jours fériés.',
  formules: [
    { nom: 'Entrée, plat, dessert', prix: '49.00' },
    { nom: 'Entrée et plat', prix: '39.00' },
    { nom: 'Plat et dessert', prix: '34.00' },
  ],
  entrees: ['Carpaccio de bœuf, pesto, roquette et copeaux de parmesan', 'Duo de fondus au fromage maison, crème au parmesan', 'Fricassée de scampi du chef, jus de crustacés, crème, estragon'],
  plats: [
    'Filet de saumon en croûte de parmesan, réginette, courgette à la crème',
    'Tranches de filet de porcelet croustillant, cuit à basse température, sauce « laque du feu de dieu », pommes frites maison',
    'Souris d’agneau confite au miel et abricots, jeunes carottes, mange-tout, grenailles au romarin',
  ],
  desserts: ['Le baba arrosé au rhum de Martinique, crème chantilly', 'Mi-cuit maison au chocolat et sa boule de glace vanille', 'L’incontournable dame blanche'],
  conditions: [
    'Tout supplément le jour même sera facturé au prix de la carte. La note est payable en fin de repas.',
    'Merci de confirmer votre réservation dès que possible afin de la bloquer.',
    'Choix des plats et nombre de personnes exact au plus tard 48 h avant l’événement.',
    'La brasserie se réserve le droit de facturer le nombre de personnes confirmées.',
  ],
  participants: ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
  menus: ['À la carte réduite (pour les groupes)', 'Menu : entrée, plat, dessert', 'Menu : entrée, plat', 'Menu : plat, dessert'],
  heures: ['12 h 00 à 12 h 30', '13 h 00 à 13 h 30', '14 h 00 à 14 h 30', '18 h 00 à 18 h 30', '19 h 00 à 19 h 40', '20 h 00 à 20 h 30', '21 h 00 à 21 h 30'],
};

/** Photos du client (sujet = champ `sujet` de photos/index.json). */
export const photos: Record<string, { w: number; h: number; alt: string }> = {
  facade: { w: 1800, h: 1095, alt: 'Façade de la brasserie de nuit, enseigne lumineuse Mr Edgard, Chaussée de Waterloo' },
  baies: { w: 1000, h: 667, alt: 'Salle avec grandes baies cintrées et clients' },
  bar: { w: 1000, h: 667, alt: 'Salle et comptoir-bar en bois sculpté' },
  comptoir: { w: 900, h: 764, alt: 'Comptoir en bois sculpté, salle en arrière-plan' },
  tables: { w: 1000, h: 667, alt: 'Salle, tables dressées et banquettes en cuir' },
  'mur-bois': { w: 1000, h: 667, alt: 'Mur de bois sculpté avec ouverture sur la salle' },
  veranda: { w: 1000, h: 667, alt: 'Espace lumineux côté terrasse couverte' },
  banquettes: { w: 1000, h: 667, alt: 'Salle, banquettes et mur de bois' },
  terrasse: { w: 1000, h: 670, alt: 'Terrasse couverte, parasols' },
  'terrasse-tables': { w: 1000, h: 658, alt: 'Terrasse, tables sous parasols' },
  'terrasse-rue': { w: 1000, h: 562, alt: 'Terrasse extérieure vue de la rue' },
  lampes: { w: 800, h: 665, alt: 'Petites lampes sur le rebord d’une baie' },
  coupelles: { w: 1000, h: 667, alt: 'Coupelles d’olives et de grignotages' },
  tartare: { w: 1000, h: 667, alt: 'Tartare de bœuf avec frites, sur un plat rectangulaire' },
  'volaille-pates': { w: 900, h: 900, alt: 'Assiette de viande grillée et pâtes au parmesan' },
  salade: { w: 1000, h: 667, alt: 'Grande salade garnie' },
  burger: { w: 1000, h: 667, alt: 'Burger et seau de frites' },
  'viande-croquette': { w: 900, h: 900, alt: 'Assiette de viande et croquette, jus dressé' },
  'coupe-glacee': { w: 749, h: 1000, alt: 'Coupe glacée aux fraises et chantilly' },
  'irish-coffee': { w: 500, h: 332, alt: 'Deux Irish coffees servis en verre' },
  verres: { w: 1000, h: 667, alt: 'Verres sur une table dressée, mur de bois flou' },
  'bar-fond': { w: 1000, h: 667, alt: 'Salle et bar au fond' },
  horloge: { w: 1000, h: 667, alt: 'Salle, tables dressées, horloge murale' },
  entree: { w: 1000, h: 660, alt: 'Comptoir et salle vus depuis l’entrée' },
  fauteuils: { w: 1000, h: 641, alt: 'Table et fauteuils en cuir' },
  mosaique: { w: 750, h: 1000, alt: 'Table et panneau décoratif vert' },
  'horloge-mosaique': { w: 667, h: 1000, alt: 'Horloge murale en mosaïque' },
  etagee: { w: 406, h: 700, alt: 'Présentation étagée sur fond de bois sculpté' },
  'salle-verticale': { w: 660, h: 1000, alt: 'Salle, vue verticale' },
};
