import photos from './photos.json';
export const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
export const u = (p: string) => `${base}${p.replace(/^\//, '')}`;

const N = ' '; // espace insécable
export const h = (a: string, b: string) => `${a}${N}h${N}${b}`;

export const resto = {
  nom: 'Wok de Jin',
  siteActuel: 'https://wokdejin.com',
  baseline: 'Buffet à volonté asiatique',
  adresse: { rue: 'Avenue du Bourgmestre Jean Materne', numero: '219', cp: '5100', ville: 'Jambes (Namur)' },
  tel: { affiche: '081 30 68 88', href: 'tel:+3281306888' },
  itineraire: 'https://maps.app.goo.gl/Je47suHkwBY6jtC66',
  reservationReveillon: 'https://wokdejin.com/reveillon/reserver',
  confidentialite: 'https://wokdejin.com/confidentialite',
  legal: { raison: '© 2026 Shenze SRL', tva: 'TVA BE0789318791' },
};

const midi = `${h('12', '00')} à ${h('14', '00')}`;
const soir = `${h('18', '00')} à ${h('22', '30')}`;
export const horaires = [
  { jour: 'Lundi', plages: [midi, soir] },
  { jour: 'Mardi', plages: [] },
  { jour: 'Mercredi', plages: [midi, soir] },
  { jour: 'Jeudi', plages: [midi, soir] },
  { jour: 'Vendredi', plages: [midi, soir] },
  { jour: 'Samedi', plages: [midi, soir] },
  { jour: 'Dimanche', plages: [midi, soir] },
];

export const tarifs = [
  { service: 'Midi', seul: `16,80${N}€`, boissons: `28,00${N}€` },
  { service: 'Soir en semaine', seul: `23,80${N}€`, boissons: `37,00${N}€` },
  { service: 'Week-end et jours fériés', seul: `27,80${N}€`, boissons: `40,00${N}€` },
];
export const boissonsIncluses = `Bière au fût, Coca, Fanta, Sprite, Ice Tea, eau, jus d’orange, lychees, ananas, vin en pichet, un café ou un thé.`;

export const buffet = [
  { titre: 'Les sushis', texte: 'Nigiris, makis et créations de la maison.', photo: 'sashimi', alt: 'Assiette de sashimi de saumon' },
  { titre: 'La fraîcheur', texte: 'Poissons et fruits de mer à découvrir.', photo: 'fruits-de-mer', alt: 'Bacs de poissons et fruits de mer frais au buffet' },
  { titre: 'La touche sucrée', texte: 'Gardez une petite place pour le dessert.', photo: 'desserts', alt: 'Buffet de desserts : macarons, pâtisseries, chocolats' },
];

export const reveillon = {
  date: `Jeudi 31${N}décembre 2026`,
  depuis: `Dès ${h('18', '00')}`,
  prix: `80${N}€`,
  menu: [
    { titre: 'Cochon de lait rôti, dinde aux cranberries, escargots', texte: 'Au buffet du réveillon.', photo: 'reveillon-roti' },
    { titre: 'Tout le buffet à volonté', texte: 'Wok, teppanyaki, sushis et fruits de mer.', photo: 'reveillon-sushis' },
    { titre: 'Pâtisseries, macarons et fruits de fête', texte: 'Au buffet du réveillon.', photo: 'reveillon-desserts' },
  ],
  conditions: [
    `Réservation en ligne avec un acompte de 20${N}€ par personne (non remboursable), déduit de l’addition le soir même.`,
    `Enfants jusqu’à 4${N}ans : 5${N}€ sur place.`,
    `Réservation en ligne jusqu’au 31${N}décembre à minuit.`,
  ],
};

export const alts: Record<string, string> = {
  'salle-rouge': 'La grande salle de Wok de Jin, chaises rouges et tables dressées',
  'sushis-tapis': 'Le tapis de sushis du buffet',
  'wok-flamme': 'Cuisinier au wok, avec la flamme',
  teppanyaki: 'Cuisinier à la plaque de teppanyaki',
  'salle-large': 'La salle de Wok de Jin vue dans sa longueur',
  'table-dressee': 'Table dressée dans la salle rouge',
  'salle-jeux': 'La salle de jeux des enfants',
  'reveillon-sushis': 'Buffet de sushis et sashimis du réveillon',
  'reveillon-roti': 'Cochon de lait rôti et dinde aux cranberries au buffet du réveillon',
  'reveillon-desserts': 'Buffet de pâtisseries et de macarons du réveillon',
  'reveillon-fruits': 'Fruits de fête dressés en forme de sapin',
  sashimi: 'Assiette de sashimi de saumon',
  'fruits-de-mer': 'Bacs de poissons et fruits de mer frais au buffet',
  desserts: 'Buffet de desserts : macarons, pâtisseries, chocolats',
};
export const dims = photos as Record<string, { w: number; h: number; w2: number }>;
