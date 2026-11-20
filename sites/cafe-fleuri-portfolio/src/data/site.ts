// Tout le contenu du site vit ici. Source : data/restaurants/<slug>/donnees.json et photos/index.json.
// Les trous des données réelles sont comblés par des données fictives marquées `placeholder: true` :
// un gabarit les affiche, la revue les signale, le client les remplace.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean }
export interface Membre { nom: string; role: string; photo?: string; placeholder: boolean }
export interface Avis { texte: string; auteur: string; source: string; date: string; note?: number; placeholder: boolean }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }

export interface Restaurant {
  slug: string;
  nom: string;
  baseline: string;
  description: string; // meta description par défaut (50 à 160 caractères)
  url: string; // site actuel du client
  typeCuisine: string; // schema.org servesCuisine
  adresse: { rue: string; numero: string; cp: string; commune: string; pays: string };
  geo: { lat: number; lon: number };
  telephone: string; // format international
  email: { valeur: string; placeholder: boolean };
  reservation: { outil: string; url: string };
  horaires: Horaire[];
  reseaux: Reseau[];
  carte: Categorie[];
  menus: Menu[];
  histoire: string[]; // un paragraphe par entrée
  equipe: Membre[];
  avis: Avis[];
  photos: Photo[];
  valeurs: string[];
}

const photo = (src: string, alt: string, largeur: number, hauteur: number, placeholder = true): Photo => ({ src, alt, largeur, hauteur, placeholder });

// Statut : le dossier signale un possible arrêt d'activité (à confirmer). La maquette présente le café comme actif,
// toutes les données non prouvées sont marquées illustratives.
export const site: Restaurant = {
  slug: 'cafe-fleuri',
  nom: 'Café Fleuri',
  baseline: 'Café-brunch à Namur, rue des Fossés Fleuris : brunchs salé, sucré ou mixte, limonades maison, terrasse.',
  description:
    'Café Fleuri, café-brunch à Namur : brunchs salé, sucré ou mixte, gravlax, pancakes, limonades et thé glacé maison, dans un petit lieu cocooning avec terrasse.',
  url: 'https://www.cafefleuri.be',
  typeCuisine: 'Café, brunch, pâtisserie maison',
  adresse: { rue: 'Rue des Fossés Fleuris', numero: '38', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.46254, lon: 4.86458 },
  telephone: '+32 81 65 89 15',
  email: { valeur: '', placeholder: true },
  reservation: { outil: '', url: '' },
  // Horaires contradictoires dans les sources (9h-14h30, 9h-16h, 10h30-14h30) : 9h-16h 7j/7 retenu, à confirmer, marqué illustratif.
  horaires: (['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] as Jour[]).map((jour) => ({
    jour,
    creneaux: [{ ouverture: '09:00', fermeture: '16:00' }],
  })),
  reseaux: [],
  carte: [
    {
      categorie: 'Les brunchs',
      plats: [
        { nom: 'Brunch salé', description: 'avocado toast, œufs Benedict sur épinards avec gravlax de saumon maison ou bacon grillé, salade', prix: null, placeholder: false },
        { nom: 'Brunch sucré', description: 'deux pancakes au sirop d’érable, une tranche de pain perdu, granola maison', prix: null, placeholder: false },
        { nom: 'Brunch mixte', description: 'un mélange du salé et du sucré', prix: null, placeholder: false },
      ],
    },
    {
      categorie: 'Plats cités par un annuaire en ligne',
      plats: [
        { nom: 'Pancakes au saumon gravlax', description: 'mascarpone, aneth et citron', prix: null, placeholder: false },
        { nom: 'Plateau charcuterie et fromage', description: 'à partager, plutôt à l’apéritif du soir selon l’annuaire', prix: null, placeholder: false },
      ],
    },
    {
      categorie: 'Boissons',
      plats: [
        { nom: 'Limonade maison', description: 'framboise', prix: '4,50 €', placeholder: true },
        { nom: 'Thé glacé maison', description: 'pêche', prix: '4,50 €', placeholder: true },
        { nom: 'Café et boissons chaudes', description: '', prix: '3 €', placeholder: true },
      ],
    },
  ],
  menus: [
    { nom: 'Brunch', prix: '21,95 €', description: 'Prix relevé dans un guide ancien, à confirmer. Salé, sucré ou mixte.', placeholder: true },
    { nom: 'Petit-déjeuner', prix: '11,95 €', description: 'Prix relevé dans un guide ancien, à confirmer.', placeholder: true },
  ],
  histoire: [
    "Le Café Fleuri ouvre en 2020 comme second lieu du Bistro Bisou : les brunchs de la maison mère étaient trop demandés pour une seule salle.",
    "Le lieu ferme peu après son ouverture à cause du Covid, est réaménagé, puis rouvre. Une adresse de poche, cocooning, au cœur du centre historique de Namur, rue des Fossés Fleuris.",
    "On y vient pour un brunch salé, sucré ou mixte : avocado toast, œufs Benedict avec gravlax de saumon préparé maison, pancakes au sirop d’érable, pain perdu, granola maison. Les limonades et le thé glacé sont maison aussi.",
    "Le mardi, les étudiants se voient offrir une boisson avec un brunch.",
  ],
  equipe: [],
  avis: [
    { texte: 'Wonderful place!', auteur: 'Un client', source: 'Google, relevé par Restaurant Guru', date: '2025', placeholder: false },
  ],
  photos: [
    photo('/photos/cafe-latte.webp', 'Un cappuccino à la mousse dessinée sur une table en bois sombre, une clochette et des tickets à côté', 1600, 1067),
    photo('/photos/tasse-rouge.webp', 'Une tasse de café au lait vue de dessus sur un fond rouge', 1600, 1067),
    photo('/photos/framboises.webp', 'Une tasse blanche remplie de framboises sur une table en bois clair', 1600, 1067),
    photo('/photos/yaourt-fraises.webp', 'Un bol de yaourt, flocons d’avoine et fraises', 1600, 1067),
    photo('/photos/the-citron.webp', 'Une main tient une tasse de thé au citron et au gingembre', 1600, 1067),
    photo('/photos/terrasse.webp', 'Une terrasse avec des chaises rouges, une figurine, un tableau noir et des plantes devant la façade', 1000, 667),
    photo('/photos/salle.webp', 'Une longue table en bois et deux tasses dans une salle lumineuse ouverte sur la rue', 1600, 1067),
    photo('/photos/miel.webp', 'Un pot de miel et sa cuillère en bois', 1600, 1067),
    photo('/photos/legumes.webp', 'Oignon rouge, herbes et poivres sur une planche en bois', 1600, 1067),
    photo('/photos/comptoir.webp', 'Un comptoir de café animé, clients au bar', 1600, 1067),
  ],
  valeurs: ['Fait maison', 'Gravlax maison', 'Limonades et thé glacé maison', 'Un lieu cocooning'],
};

/** Photo par chemin (erreur explicite si le chemin n'existe pas : un gabarit ne doit pas pointer dans le vide). */
export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}

/** Adresse sur une ligne. */
export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;

/** Horaires lisibles : '12:00 à 14:00, 19:00 à 21:00' ou la note. */
export const horaireTexte = (h: Horaire) =>
  h.creneaux.length ? h.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(', ') : h.note || 'fermé';

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;


// ---------------------------------------------------------------------------------------------
// Gabarit « Journée », adapté : cinq moments d'une journée de café-brunch (9h à 16h, plage de la frise).
// Les horaires et les prix sont illustratifs (sources contradictoires) ; la carte vient du dossier.
// ---------------------------------------------------------------------------------------------

export interface Ligne { nom: string; detail: string; prix: string | null; placeholder: boolean }
export interface Moment {
  id: string; // ancre : m-9h
  heure: number; // 9, 10.5, 12, 14, 16 (heure décimale possible)
  heureTexte: string;
  titre: string;
  accroche: string;
  accrochePlaceholder: boolean;
  theme: 'aube' | 'midi' | 'ocre' | 'corail' | 'nuit' | 'nuitProfonde';
  lignes: Ligne[];
  photo?: string;
  placeholder: boolean;
}

/** Plage de la frise (heures). */
export const FRISE = { debut: 9, fin: 17 };

export const moments: Moment[] = [
  {
    id: 'm-9h', heure: 9, heureTexte: '9h', titre: 'Le café', theme: 'aube',
    accroche: 'La salle ouvre : un café, une boisson chaude, le petit-déjeuner sur une table en bois.',
    accrochePlaceholder: true, placeholder: true, photo: '/photos/cafe-latte.webp',
    lignes: [
      { nom: 'Café et boissons chaudes', detail: '', prix: '3 €', placeholder: true },
      { nom: 'Petit-déjeuner', detail: 'Prix relevé dans un guide ancien, à confirmer', prix: '11,95 €', placeholder: true },
      { nom: 'Pain perdu', detail: '', prix: null, placeholder: false },
    ],
  },
  {
    id: 'm-10h30', heure: 10.5, heureTexte: '10h30', titre: 'Le brunch', theme: 'midi',
    accroche: 'Le moment de la maison : salé, sucré ou mixte, avec du gravlax maison et un granola maison.',
    accrochePlaceholder: false, placeholder: false, photo: '/photos/yaourt-fraises.webp',
    lignes: [
      { nom: 'Brunch salé', detail: 'avocado toast, œufs Benedict, gravlax maison ou bacon grillé, salade', prix: null, placeholder: false },
      { nom: 'Brunch sucré', detail: 'deux pancakes au sirop d’érable, pain perdu, granola maison', prix: null, placeholder: false },
      { nom: 'Brunch mixte', detail: 'un peu de chaque', prix: null, placeholder: false },
    ],
  },
  {
    id: 'm-12h', heure: 12, heureTexte: '12h', titre: 'Le déjeuner', theme: 'ocre',
    accroche: 'Le brunch se prend aussi à midi : pancakes au gravlax, œufs Benedict sur épinards.',
    accrochePlaceholder: true, placeholder: false, photo: '/photos/comptoir.webp',
    lignes: [
      { nom: 'Pancakes au saumon gravlax', detail: 'mascarpone, aneth et citron', prix: null, placeholder: false },
      { nom: 'Œufs Benedict sur épinards', detail: 'gravlax maison ou bacon grillé', prix: null, placeholder: false },
    ],
  },
  {
    id: 'm-14h', heure: 14, heureTexte: '14h', titre: 'Le goûter', theme: 'corail',
    accroche: 'Une limonade à la framboise, un thé glacé à la pêche, un granola maison : la pause de l’après-midi, en terrasse si le ciel le veut.',
    accrochePlaceholder: true, placeholder: true, photo: '/photos/framboises.webp',
    lignes: [
      { nom: 'Limonade maison', detail: 'framboise', prix: '4,50 €', placeholder: true },
      { nom: 'Thé glacé maison', detail: 'pêche', prix: '4,50 €', placeholder: true },
      { nom: 'Pain perdu', detail: 'aussi dans le brunch sucré', prix: null, placeholder: false },
      { nom: 'Granola maison', detail: '', prix: null, placeholder: false },
    ],
  },
  {
    id: 'm-16h', heure: 16, heureTexte: '16h', titre: 'La fermeture', theme: 'nuit',
    accroche: 'La frise s’arrête à 16h, heure de fermeture retenue pour cette maquette, à confirmer.',
    accrochePlaceholder: true, placeholder: true,
    lignes: [
      { nom: 'Terrasse', detail: 'mentionnée par les sites d’avis', prix: null, placeholder: false },
      { nom: 'Mardi étudiants', detail: 'une boisson offerte avec un brunch', prix: null, placeholder: false },
    ],
  },
];

/** Offre du mardi (réelle, info-lux). */
export const mardiEtudiants = 'Le mardi, une boisson offerte aux étudiants avec un brunch.';

/** Horaires de la formule brunch (illustratifs) ; les horaires de la salle sont `site.horaires`. */
export const horairesBar: { jour: Jour; texte: string; placeholder: boolean }[] = (
  ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] as Jour[]
).map((jour) => ({ jour, texte: '10:30 à 14:30', placeholder: true }));

export const jours: Jour[] = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
