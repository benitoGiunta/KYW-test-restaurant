import carte from './carte.json';

export const BASE: string = import.meta.env.BASE_URL;
export const u = (p: string) => (BASE.endsWith('/') ? BASE : BASE + '/') + p.replace(/^\//, '');

/** Prix en euros, espace insécable, virgule décimale. */
export const eur = (n: number | null) =>
  n === null ? '' : `${Number.isInteger(n) ? n : n.toFixed(2).replace('.', ',')} €`;

export const SITE = {
  nom: 'Le Lodge Wépion',
  court: 'Le Lodge',
  bce: '0824633424',
  reservation: 'https://lelodge.reservation.barestho.com/',
  facebook: 'https://www.facebook.com/lodgewepion',
  instagram: 'https://www.instagram.com/restaurant_le_lodge/',
  email: 'le.lodge@hotmail.com',
  carteHors: 'https://www.google.com/maps?q=50.4234855,4.8742231',
  erpent: {
    nom: 'Wine & More',
    rue: 'Chaussée de Marche 496',
    ville: 'Erpent',
    tel: '0496 92 55 13',
    telHref: 'tel:+32496925513',
    depuis: '15 septembre 2026',
  },
  wepion: {
    rue: 'Chaussée de Dinant 931',
    ville: '5100 Wépion',
    tel: '081 40 08 91',
    telHref: 'tel:+3281400891',
    horaires: 'Tous les jours, 11 h 30 à 22 h 30',
  },
};

/** Photos converties (public/photos). alt = champ `sujet` de photos/index.json. */
type P = { file: string; w: number; h: number; w2: number; h2: number; alt: string };
const PHOTOS: Record<string, P> = {
  facade: { file: '08-facade-nuit', w: 2000, h: 1333, w2: 700, h2: 467, alt: 'Façade du Lodge au crépuscule, vue depuis la berge' },
  terrasse: { file: '03-terrasse-meuse', w: 1145, h: 1145, w2: 700, h2: 700, alt: 'Terrasse sous store avec vue sur la Meuse et les rochers' },
  salleMeuse: { file: '05-salle-vue-meuse', w: 1800, h: 1200, w2: 700, h2: 467, alt: 'Tables près de la fenêtre avec vue sur la Meuse, ambiance du soir' },
  salleVoutee: { file: '10-salle-voutee', w: 1600, h: 1066, w2: 700, h2: 467, alt: 'Salle avec fenêtres cintrées et tables rondes' },
  coupelle: { file: '04-dessert-coupelle', w: 1000, h: 1000, w2: 700, h2: 700, alt: 'Dessert en coupelle sur assiette sombre' },
  meringue: { file: '07-dessert-assiette', w: 900, h: 1350, w2: 700, h2: 1050, alt: 'Dessert meringué sur assiette blanche' },
  bol: { file: '06-plat-bol-soupe', w: 900, h: 1350, w2: 700, h2: 1050, alt: 'Plat en bol avec accompagnement, table dressée' },
  viandeNoire: { file: '09-plat-viande-assiette-noire', w: 900, h: 1350, w2: 700, h2: 1050, alt: 'Plat de viande sur assiette noire, verres à vin' },
  feuillete: { file: '12-plat-feuillete-sauce', w: 900, h: 1350, w2: 700, h2: 1050, alt: 'Plat en assiette creuse noire, feuilleté et sauce crémeuse' },
  panee: { file: '13-plat-viande-panee', w: 900, h: 1350, w2: 700, h2: 1050, alt: 'Viande panée avec salade et sauce' },
};
export const ph = (id: string): P => PHOTOS[id];

type Cat = { categorie: string; plats: { nom: string; description: string | null; prix: number | null }[] };
const byName = (n: string) => (carte as Cat[]).find((c) => c.categorie === n)!;
const pick = (...names: string[]) => names.map(byName);

/** Panneaux de la carte (Switcher). Les glaces, crêpes et gaufres sont au tea-room. */
export const PANNEAUX: { id: string; titre: string; cats: Cat[] }[] = [
  { id: 'debuts', titre: 'Entrées', cats: pick('À partager', 'Les entrées', 'Les salades') },
  { id: 'plats', titre: 'Les plats', cats: pick('Les viandes', 'Les tartares', 'Les burgers', 'Les poissons', 'Les pâtes artisanales (Mil’pat)', 'Les suggestions du moment', 'Pour les bambins', 'Accompagnements en supplément') },
  { id: 'desserts', titre: 'Desserts', cats: pick('Desserts') },
  { id: 'boissons', titre: 'Boissons', cats: pick('Boissons (extraits)') },
];
export const TEAROOM: Cat[] = pick('Crêpes et gaufres', 'Nos glaces (Pagotini)');

/** Produits cités par la carte, avec le plat qui les porte (donnees.json, carte). */
export const ICI = [
  { produit: 'Fromage de Chimay Poteaupré', plat: 'Fondus fromage', prix: '16 €' },
  { produit: 'Porc qualité Ardenne', plat: 'Les boulettes maison', prix: '20 €' },
  { produit: 'Pâtes artisanales Mil’pat', plat: 'Quatre plats de pâtes', prix: '20 à 24 €' },
  { produit: 'Truite d’Annevoie', plat: 'Rôtie au beurre', prix: '26 €' },
  { produit: 'Canard de la Ferme de La Sauvenière', plat: 'Magret de canard', prix: '32 €' },
  { produit: 'Fraises de Wépion', plat: 'La coupe de fraises de Wépion', prix: '12 €' },
];

export const GALERIE = [
  { id: 'bol', cap: 'Plat en bol, table dressée' },
  { id: 'meringue', cap: 'Dessert meringué' },
  { id: 'viandeNoire', cap: 'Viande sur assiette noire' },
  { id: 'salleVoutee', cap: 'Salle aux fenêtres cintrées' },
  { id: 'feuillete', cap: 'Feuilleté et sauce crémeuse' },
  { id: 'panee', cap: 'Viande panée et salade' },
  { id: 'salleMeuse', cap: 'Tables côté Meuse, le soir' },
];
