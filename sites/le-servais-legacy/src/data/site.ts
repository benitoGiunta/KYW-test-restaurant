// Données du Servais, variante legacy. Source : data/restaurants/le-servais/donnees.json (copié dans ./donnees.json),
// dossier.md, HTML et captures de leservais.be. Ce qui n'est pas prouvé est absent (null) ou marqué « à confirmer ».
import donnees from './donnees.json';

export const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
export const u = (p = '') => base + p.replace(/^\//, '');

const NB = ' ';
const apos = (s: string | null | undefined) => (s ? s.replace(/'/g, '’') : '');
export const euro = (p: string | null) =>
  p == null ? '' : p.replace(/(\d+)\.(\d{2})/g, (_m, a, b) => (b === '00' ? a : `${a},${b}`) + `${NB}€`);

export const resto = {
  nom: 'Le Servais',
  baseline: 'Bar et brasserie au départ du téléphérique de Namur',
  adresse: { rue: 'Rue des Fossés Fleuris 33', cp: '5000', ville: 'Namur' },
  // Téléphone : 081/73.65.52 (site, Namur Tourisme) ; restaurants.json donne +32 492 93 87 96 : à confirmer.
  telAffiche: '081 73 65 52',
  tel: 'tel:+3281736552',
  mail: 'hello@leservais.be',
  reservation: donnees.reservation.url,
  facebook: donnees.reseaux.facebook,
  instagram: donnees.reseaux.instagram,
  carteCuisine: 'https://www.leservais.be/_files/ugd/052157_06da826d98c34af5a6736de73d66916c.pdf',
  carteBar: 'https://www.leservais.be/_files/ugd/052157_5db9670ea3694fd9a922c7d487721974.pdf',
  siteActuel: donnees.site_actuel,
  carteCadeau: 'https://www.leservais.be/carte-cadeau',
  maps: 'https://www.google.com/maps/search/?api=1&query=Rue+des+Foss%C3%A9s+Fleuris+33+5000+Namur',
};

export const routes = [
  { href: 'carte/', label: 'Carte' },
  { href: 'groupes-privatisation/', label: 'Groupes et privatisation' },
  { href: 'evenements/', label: 'Événements' },
  { href: 'carte-cadeau/', label: 'Carte cadeau' },
  { href: 'contact/', label: 'Contact' },
];

// Horaires du site : dimanche à jeudi 9:00-1:00, vendredi et samedi 9:00-2:00.
export const jours = [
  { jour: 'Lundi', de: '09:00', a: '01:00', en: 'Monday' },
  { jour: 'Mardi', de: '09:00', a: '01:00', en: 'Tuesday' },
  { jour: 'Mercredi', de: '09:00', a: '01:00', en: 'Wednesday' },
  { jour: 'Jeudi', de: '09:00', a: '01:00', en: 'Thursday' },
  { jour: 'Vendredi', de: '09:00', a: '02:00', en: 'Friday' },
  { jour: 'Samedi', de: '09:00', a: '02:00', en: 'Saturday' },
  { jour: 'Dimanche', de: '09:00', a: '01:00', en: 'Sunday' },
];
export const h = (t: string) => { const [hh, mm] = t.split(':'); return `${Number(hh)}${NB}h${NB}${mm}`; };
export const cuisine = {
  service: `11${NB}h${NB}30 à 22${NB}h${NB}00, vendredi et samedi jusqu’à minuit`,
  petitDej: `Petit-déjeuner le samedi et le dimanche, de 9${NB}h${NB}30 à 11${NB}h${NB}30`,
};

type Plat = { nom: string; description: string | null; prix: string | null };
const plats = (i: number): { nom: string; desc: string; prix: string }[] =>
  (donnees.carte[i].plats as Plat[]).map((p) => ({ nom: apos(p.nom), desc: apos(p.description), prix: euro(p.prix) }));

export const groupes = [
  { id: 'cuisine', titre: 'Menu cuisine', pdf: resto.carteCuisine, rubriques: [
    { id: 'petit-dejeuner', titre: 'Petit-déjeuner', note: cuisine.petitDej, items: plats(0) },
    { id: 'sharing', titre: 'Sharing food', note: cuisine.service, items: plats(1) },
    { id: 'brasserie', titre: 'Brasserie', note: cuisine.service, items: plats(2) },
    { id: 'enfants', titre: 'Enfants', note: 'Moins de 12 ans', items: plats(3) },
    { id: 'desserts', titre: 'Desserts', note: '', items: plats(4) },
  ] },
  { id: 'bar', titre: 'Menu bar', pdf: resto.carteBar, rubriques: [
    { id: 'cocktails', titre: 'Cocktails', note: 'Extrait du menu bar, la carte complète est en PDF', items: plats(5) },
    { id: 'bieres', titre: 'Bières pression', note: 'Extrait : 25 cl, 33 cl et 50 cl selon la bière', items: plats(6) },
    { id: 'cafes', titre: 'Cafés et boissons chaudes', note: 'Extrait', items: plats(7) },
  ] },
];
// Plat à confirmer (prix d'une ligne ambiguë du PDF)
groupes[1].rubriques[0].items.forEach((p) => { if (p.nom === 'Margarita') p.desc = 'Version à partager, prix à confirmer'; });

export const signature = [
  { nom: 'Boulets liégeois', desc: 'Porc et bœuf maison, sauce liégeoise au sirop de Liège, frites maison à double cuisson', prix: euro('16.50') + ' la pièce' },
  { nom: 'Croquettes à la Houppe', desc: 'Six mini croquettes au fromage et à la Houppe, bière namuroise', prix: euro('11.00') },
  { nom: 'Spycroc', desc: 'Six minis, version artisanale du poulycroc, produits à Spy', prix: euro('7.50') },
  { nom: 'Fromage de Boninne', desc: 'D’une éleveuse de vaches laitières locale', prix: euro('6.50') },
  { nom: 'Spaghetti bolognaise', desc: 'À 12 € tous les mardis', prix: euro('17.50') },
];

export const formules = [
  { nom: 'Petit-déjeuner', prix: `à partir de 10${NB}€ par personne`, desc: 'Croissants, café, eaux et jus en self-service, dans la Verrière, de 9 h à 12 h' },
  { nom: 'Brunch buffet', prix: `à partir de 25${NB}€ par personne`, desc: 'À partir de 20 personnes, dans la Verrière, de 9 h à 15 h' },
  { nom: 'Repas', prix: `à partir de 20${NB}€ par personne`, desc: 'Choix entre trois plats, boissons sur mesure' },
  { nom: 'Apéro', prix: `à partir de 18${NB}€ par personne`, desc: 'Finger food et boissons, de 12 à 120 personnes' },
];
