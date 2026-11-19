import carte from './carte.json';

export const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
const N = ' ';

export const resto = {
  nom: 'Yayami Sushi',
  baseline: 'Japanese Sushi & take away',
  adresse: { rue: 'Rue de Bruxelles', numero: '15', cp: '5000', ville: 'Namur' },
  geo: { lat: 50.4652249, lon: 4.8631295 },
  telTexte: '081 34 37 89',
  telHref: 'tel:+3281343789',
  commander: 'https://www.yayami.be/shop/',
  siteActuel: 'https://www.yayami.be',
  osm: 'https://www.openstreetmap.org/?mlat=50.4652249&mlon=4.8631295#map=18/50.4652249/4.8631295',
  livraisonDes: '30' + N + '€',
  remiseEmporter: '10' + N + '%',
  zone: ['5000', '5001', '5002', '5003', '5004', '5020', '5100'],
  paiement: ['Cash à la livraison', 'Cash à l’emporter', 'Bancontact', 'Maestro', 'MasterCard', 'Visa'],
  // même horaire sept jours sur sept (site actuel : « Ouvert 7/7, de 12h à 14h et de 18h à 22h »)
  services: [
    { nom: 'Midi', debut: '12:00', fin: '14:00', texte: `12${N}h${N}00 à 14${N}h${N}00` },
    { nom: 'Soir', debut: '18:00', fin: '22:00', texte: `18${N}h${N}00 à 22${N}h${N}00` },
  ],
};

export const menus = carte.menus;
export const categories = carte.categories.map((c) => {
  const min = c.plats.map((p) => parseFloat(p.prix.replace(',', '.'))).reduce((a, b) => Math.min(a, b));
  return { ...c, des: min.toFixed(2).replace('.', ',') + N + '€' };
});

export const photos: Record<string, { src: string; w: number; h: number; alt: string; fond: boolean }> = {
  nigiri: { src: '23-nigiri-saumon-noir.jpg', w: 1280, h: 929, alt: 'Nigiri au saumon sur fond noir', fond: true },
  maki: { src: '19-maki-assortiment-noir.jpg', w: 1280, h: 929, alt: 'Assortiment de maki et de california sur fond noir', fond: true },
  gyoza: { src: '21-gyoza-noir.jpg', w: 1280, h: 929, alt: 'Gyoza grillés sur une feuille de salade', fond: true },
  salade: { src: '17-salade-wakame.jpg', w: 1280, h: 929, alt: 'Salade d’algues wakame dans un bol', fond: true },
  biere: { src: '22-biere-asahi.jpg', w: 1280, h: 929, alt: 'Bière Asahi, bouteille et verre', fond: true },
  ramune: { src: '20-ramune.jpg', w: 1280, h: 929, alt: 'Limonade ramune en bouteille', fond: true },
  matsu: { src: '03-menu-matsu.jpg', w: 1440, h: 1080, alt: 'Plateau du Menu Matsu : sushi et maki', fond: false },
  chirashi: { src: '02-chirashi-bowl.jpg', w: 1440, h: 1080, alt: 'Chirashi bowl', fond: false },
  udon: { src: '10-udon-poulet.jpg', w: 1440, h: 1080, alt: 'Nouilles udon au poulet', fond: false },
};
export const photoPar: Record<string, string> = { nigiri: 'nigiri', maki: 'maki', 'plats-chaud': 'udon', salades: 'salade', bieres: 'biere', boissons: 'ramune' };
