// Données de Le Royal Namur, variante legacy. Source : data/restaurants/le-royal/donnees.json (copié dans
// ./donnees.json), dossier.md, HTML sauvegardé de leroyalnamur.be. Ce qui n'est pas prouvé est absent (null).
import donnees from './donnees.json';

export const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
export const u = (p = '') => base + p.replace(/^\//, '');

const nb = ' ';
export const euro = (n: number | string) =>
  typeof n === 'number' ? `${n.toFixed(2).replace('.', ',')}${nb}€` : `${n}${nb}€`;

export const resto = {
  nom: 'Le Royal Namur',
  court: 'Le Royal',
  baseline: 'L’élégance d’une brasserie au cœur de Namur',
  adresse: { rue: 'Place du Théâtre 13', cp: '5000', ville: 'Namur' },
  telAffiche: '081 22 01 33',
  tel: 'tel:+3281220133',
  mail: 'resto@leroyalnamur.be',
  zenchef: donnees.reservation.url,
  facebook: donnees.reseaux.facebook,
  instagram: donnees.reseaux.instagram,
  carteUrl: 'https://www.leroyalnamur.be/wp-content/uploads/2026/08/CARTE-ROYAL-OK-BAT.pdf',
  feteUrl: 'https://www.leroyalnamur.be/wp-content/uploads/2026/11/Royal-Fete-patro.pdf',
  siteActuel: donnees.site_actuel,
  geo: donnees.geo,
  maps: 'https://www.google.com/maps/search/?api=1&query=Place+du+Th%C3%A9%C3%A2tre+13+5000+Namur',
};

// Horaires : « Cuisine ouverte 7 jours sur 7, de 12h à 14h30 et de 18h à 22h » (site). Identiques tous les jours.
export const service = [
  { nom: 'Midi', de: '12:00', a: '14:30', affiche: ['12 h 00', '14 h 30'] },
  { nom: 'Soir', de: '18:00', a: '22:00', affiche: ['18 h 00', '22 h 00'] },
];

type Plat = { nom: string; description: string | null; prix: number | string };
type Cat = { categorie: string; plats: Plat[]; note?: string };
const cartes = donnees.carte as Cat[];
const pick = (noms: string[]) => noms.map((n) => cartes.find((c) => c.categorie === n)).filter(Boolean) as Cat[];

export const carte = {
  manger: pick(['En-cas', 'Entrées', 'Salades', 'Pâtes fraîches', 'Poissons', 'Plats brasserie', 'Moules jumbo (1,350 kg)', 'Coin du boucher', 'Enfants']),
  boire: pick(['Vins du patron (Pays d\'Oc)', 'Bières au fût', 'Cocktails et apéritifs (extraits)', 'Boissons chaudes et soft (extraits)']),
};

export const fetes = {
  sans: 50,
  avec: 65,
  detailAvec: 'Apéritif maison et mises en bouche, 3 verres de vin ou 3 softs ou 3 pils, café ou thé.',
  entrees: ['Terrine de chevreuil au foie gras', 'Saumon gravlax', 'Tarte fine au potimarron'],
  plats: ['Civet de biche', 'Suprême de pintade aux pleurotes', 'Filet de lieu', 'Risotto aux champignons des bois'],
  desserts: ['Tarte fine aux pommes', 'Crémeux au chocolat'],
};

export const photos = {
  facade: { src: 'facade', w: [800, 1200], width: 1200, height: 896, alt: 'Façade en brique de la brasserie Le Royal, place du Théâtre à Namur, sous un ciel bleu' },
  planche: { src: 'planche', w: [640, 960], width: 960, height: 1280, alt: 'Planche de charcuterie et deux verres qui trinquent sur la terrasse, la façade de la brasserie en arrière-plan' },
  terrasse: { src: 'terrasse', w: [640, 800, 1200], width: 1200, height: 1600, alt: 'Terrasse sous parasols noirs face au Théâtre de Namur, avec l’ardoise des moules jumbo du mardi et du jeudi à 20 €' },
  moules: { src: 'moules', w: [640, 960], width: 960, height: 1280, alt: 'Table de terrasse avec moules, frites, spaghetti et verres de vin' },
};
