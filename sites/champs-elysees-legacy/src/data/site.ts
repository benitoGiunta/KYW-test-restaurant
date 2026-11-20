import carteJson from './carte.json';

export const resto = {
  nom: 'Champs Elysées',
  baseline: 'Bistro convivial',
  adresse1: 'Avenue Albert Ier 149',
  adresse2: '5100 Jambes (Namur)', // cp à confirmer : 5000 sur le site d’origine, 5100 dans restaurants.json
  tel: '081 23 14 26',
  telHref: 'tel:081231426',
  email: 'resto@champselysees.be',
  zenchef: 'https://bookings.zenchef.com/results?rid=377536&pid=1001',
  maps: 'https://www.google.com/maps/place/CHAMPS+%C3%89LYS%C3%89ES/@50.466866,4.8849416,20.51z',
  facebook: 'https://www.facebook.com/p/Brasserie-Les-Champs-%C3%89lys%C3%A9es-100057095544488/',
  flipbook: 'https://champselysees.be/flipbook/fetes-patronales/',
  site: 'https://champselysees.be',
};

// Horaires du site d’origine (priorité sur Rankeat, à confirmer).
export const horaires = [
  { jour: 'Lundi', o: '11 h 00', f: '22 h 00' },
  { jour: 'Mardi', o: '11 h 00', f: '22 h 00' },
  { jour: 'Mercredi', o: '11 h 00', f: '22 h 00' },
  { jour: 'Jeudi', o: '11 h 00', f: '22 h 00' },
  { jour: 'Vendredi', o: '11 h 00', f: '22 h 00' },
  { jour: 'Samedi', o: '11 h 00', f: '22 h 00' },
  { jour: 'Dimanche', o: '11 h 00', f: '16 h 00' },
];

export const photos = {
  hero: { src: 'hero-tables', w: 1920, h: 1660, alt: 'Tables dressées devant la banquette bleu-vert, verres et sets de table en cuir' },
  facade: { src: 'facade', w: 800, h: 1200, alt: 'Façade de la brasserie avec terrasse, avenue Albert Ier' },
  fenetre: { src: 'salle-fenetre', w: 800, h: 1200, alt: 'Salle avec banquette bleu-vert, lampes suspendues et grande baie vitrée' },
  casserole: { src: 'casserole', w: 800, h: 1200, alt: 'Casserole fumante de moules, verre de bière Chimay au premier plan' },
  biere: { src: 'biere-pression', w: 800, h: 1200, alt: 'Bière tirée à la pression dans un verre Chimay' },
  frites: { src: 'plat-frites', w: 800, h: 1200, alt: 'Plat en sauce crémeuse aux champignons et câpres, avec frites' },
  spritz: { src: 'spritz-terrasse', w: 800, h: 1200, alt: 'Spritz à la terrasse, assiette au premier plan' },
  carte: { src: 'menu-table', w: 800, h: 1200, alt: 'Carte et carte des vins posées sur la table' },
  lecture: { src: 'menu-lecture', w: 800, h: 1200, alt: 'Cliente lisant la carte' },
};

export type Ligne = { l: string; p: string };
export type Plat = { nom: string; desc: string; prix: Ligne[] };
export type Rubrique = { titre: string; boisson: boolean; plats: Plat[] };
export const carte = carteJson as Rubrique[];

// Sélection de la page d’accueil : plats cités par le dossier (croquettes, boulettes, vol-au-vent, cordon bleu, Burger des Champs).
export const signatures = ['Croquette de fromage artisanale', 'Boulettes sauce tomate', 'Vol-au-vent maison', 'Cordon bleu maison', 'Burger des Champs']
  .map((n) => carte.flatMap((r) => r.plats).find((p) => p.nom === n)!);

export const fetes = {
  prixSans: '50 €',
  prixAvec: '65 €',
  services: [
    { titre: 'Entrées', choix: ['Terrine de chasse, confit d’oignons, toast', 'Velouté de potimarron à la châtaigne', 'Saumon gravlax, pickles de légumes, sauce miel-moutarde'] },
    { titre: 'Plats', choix: ['Civet de marcassin, pomme aux airelles, pommes duchesses', 'Suprême de pintade aux pleurotes, carottes glacées et croquettes', 'Médaillons de sole aux petits légumes, pommes nature'] },
    { titre: 'Desserts', choix: ['Omelette norvégienne', 'Mousse au chocolat', 'Panna cotta au caramel et noix'] },
  ],
  boissons: ['Apéritif maison et mises en bouche (uniquement avec la formule boissons)', '3 verres de vin ou 3 softs ou 3 pils', 'Café ou thé en fin de repas'],
};
