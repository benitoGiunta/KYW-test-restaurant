// Données réelles : data/restaurants/be-belge/donnees.json, dossier.md, site-actuel/. Rien d’inventé ; aucun fictif en phase 1.
const N = " "; // espace insécable
export const site = {
  nom: "Be Belge… et d’ailleurs",
  court: "Be Belge",
  suite: "… et d’ailleurs",
  accueil: "Il n’y a pas de bon repas si le vin n’y coule pas !",
  accueilSuite: "Bonjour les Gourmets ! Nous avons le plaisir de vous accueillir dans notre nouveau petit nid !",
  adresse: { rue: "Avenue de Marlagne 203", ville: "5000 Namur (Wépion)" },
  tel: "+32 81 47 00 95",
  telAffiche: "081 47 00 95",
  telHref: "tel:+3281470095",
  mail: "info@bebelgeetdailleurs.be",
  facebook: "https://www.facebook.com/Restaurant-be-Belgeet-d-ailleurs-460789377730605/",
  zenchef: "https://bookings.zenchef.com/results?rid=382492&pid=1001&fullscreen=1",
  itineraire: "https://www.google.com/maps/search/?api=1&query=50.4517812,4.8421921",
  description: "Restaurant à Wépion, Namur : cuisine belge et de saison aux influences d’ailleurs, Menu du Chef en 3 ou 4 services, salle au mur de pierre, jardin et terrasse.",
};
// Horaires du site d’origine. Un service = [début, fin].
export const jours = [
  { jour: "Lundi", services: [] as string[][] },
  { jour: "Mardi", services: [] as string[][] },
  { jour: "Mercredi", services: [["12:00", "13:30"]] },
  { jour: "Jeudi", services: [["12:00", "13:30"], ["19:00", "20:30"]] },
  { jour: "Vendredi", services: [["12:00", "13:30"], ["19:00", "20:30"]] },
  { jour: "Samedi", services: [["19:00", "20:30"]] },
  { jour: "Dimanche", services: [["12:00", "13:30"]] },
];
export const periode = "proposé du 13 août au 6 septembre 2026";
export const formules = [
  { id: "trois", nom: "3 services", detail: "entrée, plat, dessert", prix: `57${N}€`, vins: `28${N}€` },
  { id: "quatre", nom: "4 services", detail: "2 entrées, plat, dessert", prix: `72${N}€`, vins: `35${N}€` },
];
export const carte = [
  { categorie: "Mises en bouche et entrées", note: "au choix", plats: [
    { nom: "Saint-Jacques en deux préparations", desc: "Taillées à cru, fraîcheur d’agrumes ; poêlées, émulsion au beurre blanc" },
    { nom: "Langoustines rôties aux épices", desc: "Risotto et petits pois façon paëlla, crème de chorizo doux" },
    { nom: "Foie de canard poêlé", desc: "Compotée d’oignons caramélisés, liégeoise et cassis" },
  ] },
  { categorie: "Plats", note: "au choix", plats: [
    { nom: "Soupe de poissons de la Méditerranée", desc: "Grenailles safranées" },
    { nom: "Carré de veau de lait basse température", desc: "Jus corsé à la truffe d’été, jeunes légumes et pommes bouchon" },
    { nom: "Filet de canette", desc: "Abricot caramélisé à la lavande, jus corsé à la Kriek Boon" },
  ] },
  { categorie: "Desserts", note: "au choix", plats: [
    { nom: "Douceur tiède au chocolat Valrhona", desc: "Crème anglaise à la vanille Bourbon, fruits frais" },
    { nom: "La classique Dame blanche", desc: "Et son chocolat chaud" },
    { nom: "Assortiment de sorbets", desc: "" },
    { nom: "Assortiment de fromages affinés par la Petite Ferme", desc: "Supplément", prix: `+7${N}€` },
    { nom: "Irish Coffee", desc: "Supplément", prix: `+4${N}€` },
  ] },
];
export const privatisation = {
  texte: "Vous souhaitez organiser une fête privée ou professionnelle, en repas assis ou en walking dinner ? N’hésitez pas à nous contacter pour toute demande de proposition.",
  assis: { min: 15, max: 34 }, walking: { min: 20, max: 40 },
  souple: "Les jours et les horaires sont adaptables en fonction de votre demande.",
};
// Photos du client : sujet = champ « sujet » de photos/index.json.
export const photos = {
  cheminee: { src: "01-salle-cheminee", alt: "Salle à manger, mur de pierre et cheminée", w: 2000, h: 1500 },
  jardin: { src: "02-facade-jardin", alt: "Pelouse et bâtiment du restaurant vus du jardin", w: 2000, h: 1500 },
  tableaux: { src: "03-salle-tableaux", alt: "Table dressée, triptyque de tableaux rouges et mur de pierre", w: 2000, h: 1500 },
  banquette: { src: "04-salle-banquette", alt: "Salle avec banquette et tables dressées", w: 2000, h: 1500 },
  brasero: { src: "05-brasero-terrasse", alt: "Table de terrasse et foyer de feu", w: 2000, h: 1500 },
  terrasse: { src: "06-terrasse", alt: "Terrasse ombragée avec chaises et tables", w: 2000, h: 1500 },
  enseigne: { src: "07-enseigne", alt: "Enseigne métallique « be Belge … et d’ailleurs »", w: 2000, h: 1500 },
  buffet: { src: "08-bar-buffet", alt: "Buffet en bois avec bouteilles et vache colorée devant une fenêtre", w: 2000, h: 1500 },
  applique: { src: "09-applique-murale", alt: "Applique murale lumineuse sur mur sombre", w: 2000, h: 1500 },
};
export type Photo = (typeof photos)[keyof typeof photos];
export const nav = [
  { href: "menu/", label: "Menu" },
  { href: "carte/", label: "Carte" },
  { href: "banquets-et-receptions/", label: "Banquets et réceptions" },
  { href: "photos/", label: "Photos" },
];
