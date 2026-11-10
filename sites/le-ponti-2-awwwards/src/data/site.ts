// Contenu de Le Ponti 2 (variante awwwards). Source : data/restaurants/le-ponti-2/donnees.json et dossier.md.
// HYPOTHÈSES : histoire, fondateurs, équipe, année d'ouverture, avis, presse, parking, vins : inconnus, donc absents du site.
// Aucun contenu fictif : tous les `placeholder` sont false. Le « 2 » du nom n'est pas expliqué (inconnu).
import { groupes } from './carte';

const trouver = (id: string) => groupes.flatMap((g) => g.categories).find((c) => c.id === id)!;
const fourchette = (id: string) => {
  const p = trouver(id).lignes.map((l) => l.prix);
  return { min: Math.min(...p), max: Math.max(...p), n: p.length };
};
export const familles = {
  pates: { ...fourchette('pates') },
  pizzas: { ...fourchette('pizzas') },
  escalopes: (() => {
    const p = [...trouver('escalopes-de-veau-panees').lignes, ...trouver('escalopes-de-veau-non-panees').lignes].map((l) => l.prix);
    return { min: Math.min(...p), max: Math.max(...p), n: p.length };
  })(),
};

export const site = {
  nom: 'Le Ponti 2',
  baseline: 'Restaurant italien, esprit familial.',
  typeCuisine: ['italienne', 'pizzeria'],
  description: 'Le Ponti 2, restaurant italien et pizzeria à Jambes (Namur) : vingt pizzas, pâtes, escalopes de veau et desserts maison, midi et soir du mardi au dimanche.',
  adresse: { rue: 'Avenue du Bourgmestre Jean Materne', numero: '87', cp: '5100', commune: 'Jambes (Namur)', localite: 'Namur', pays: 'BE' },
  geo: { lat: 50.4573956, lon: 4.8702847 },
  telephone: { lisible: '081 30 40 75', href: 'tel:+3281304075' },
  email: 'Leponti2@hotmail.be',
  reservationUrl: 'https://leponti2.reservation.barestho.com/?lng=fr',
  planUrl: 'https://www.openstreetmap.org/?mlat=50.4573956&mlon=4.8702847#map=18/50.4573956/4.8702847',
  siteActuel: 'https://www.leponti2.be',
  reseaux: [{ nom: 'Facebook', url: 'https://www.facebook.com/leponti2/' }],
  credit: 'Photos : Le Ponti 2',
  nbPizzas: familles.pizzas.n,
};

export const creneaux = { midi: '11 h 30 à 14 h 30', soir: '18 h à 21 h 30' };
export const jours = [
  { jour: 'Lundi', ferme: true },
  ...['Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((jour) => ({ jour, ferme: false })),
];
export const horairesSchema = [
  { jours: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '11:30', closes: '14:30' },
  { jours: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '18:00', closes: '21:30' },
];

export const menu = {
  nom: 'Menu trois services',
  prix: 40,
  services: [
    { titre: 'Entrée', texte: 'Scampis à l’ail (5 pièces) ou croquettes au fromage.' },
    { titre: 'Plat', texte: 'Steak, frites, salade, crème poivre concassé, ou pizza au choix, ou escalopes de veau à la carte (+ 7 €).' },
    { titre: 'Dessert', texte: 'Tiramisu aux fruits rouges ou mousse au chocolat.' },
  ],
};

export const histoire = [
  'Le Ponti 2 est un restaurant italien et une pizzeria de Jambes, à Namur, installé avenue du Bourgmestre Jean Materne. L’esprit est familial, la carte est franchement italienne.',
  'Elle compte vingt pizzas, treize pâtes, des escalopes de veau panées, gratinées ou en saltimbocca à la romana, et des desserts faits maison : tiramisu aux fruits rouges, mousse au chocolat, sabayon minute.',
  'La carte propose des cocktails signature, dont le Spritz Ponti. Quand la météo le permet, la terrasse est ouverte.',
];
export const equipe: { nom: string; role: string; placeholder?: boolean }[] = [];
