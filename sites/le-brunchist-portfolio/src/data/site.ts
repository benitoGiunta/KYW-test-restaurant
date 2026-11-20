// Tout le contenu du site vit ici. Source : data/restaurants/<slug>/donnees.json et photos/index.json.
// Les trous des données réelles sont comblés par des données fictives marquées `placeholder: true` :
// un gabarit les affiche, la revue les signale, le client les remplace.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean; prixIllustratif?: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean }
export interface Membre { nom: string; role: string; photo?: string; placeholder: boolean }
export interface Avis { texte: string; auteur: string; source: string; date?: string; note?: number; placeholder: boolean }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean; credit?: string }
export interface Reseau { nom: string; url: string }

export interface Restaurant {
  slug: string;
  nom: string;
  baseline: string;
  description: string;
  url: string;
  typeCuisine: string;
  adresse: { rue: string; numero: string; cp: string; commune: string; pays: string };
  geo: { lat: number; lon: number } | null;
  telephone: string;
  email: { valeur: string; placeholder: boolean } | null;
  reservation: { outil: string; url: string } | null;
  horaires: Horaire[];
  reseaux: Reseau[];
  carte: Categorie[];
  menus: Menu[];
  histoire: string[];
  equipe: Membre[];
  avis: Avis[];
  photos: Photo[];
  valeurs: string[];
}

// Photos libres (Unsplash via picsum.photos) : TOUTES placeholder, aucune photo du client récupérée.
const CREDITS: Record<string, string> = {
  'salle-table-bois': 'Luke Chesser', 'latte-art': 'Carli Jean', 'granola-fraises': 'Jeffrey Deng', 'framboises-tasse': 'Glen Carrie',
  'biscuits-citron': 'Olenka Kotyk', 'cafe-filtre': 'Karl Fredrickson', 'tasse-rouge': 'Justin Leibow', theiere: 'Vee O', 'miel-pot': 'Sonja Langford',
};
const photo = (nom: string, alt: string): Photo => ({ src: `/photos/${nom}.webp`, alt, largeur: 1600, hauteur: 1067, placeholder: true, credit: CREDITS[nom] });

export const site: Restaurant = {
  slug: 'le-brunchist',
  nom: 'Le Brunchist',
  baseline: 'Café-brunch et cafés de spécialité, au cœur de Namur. Local, fait maison.',
  description: 'Le Brunchist, café-brunch à Namur : cuisine locale et maison, cafés de spécialité, jus frais, terrasse. Ouvert du mercredi au dimanche, de 9h30 à 15h30.',
  url: 'https://lebrunchist.com',
  typeCuisine: 'Brunch, café de spécialité',
  adresse: { rue: "Place d'Armes", numero: '8', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: null,
  telephone: '+32 474 06 92 27',
  email: null,
  reservation: null,
  horaires: [
    { jour: 'lundi', creneaux: [], note: 'fermé' },
    { jour: 'mardi', creneaux: [], note: 'fermé' },
    ...(['mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] as Jour[]).map((jour) => ({ jour, creneaux: [{ ouverture: '09:30', fermeture: '15:30' }] })),
  ],
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/Lebrunchist' },
    { nom: 'Instagram', url: 'https://www.instagram.com/lebrunchist/' },
  ],
  carte: [
    {
      categorie: 'Brunch et salé',
      plats: [
        { nom: 'Eggs benedict', description: '', prix: '14 €', placeholder: false, prixIllustratif: true },
        { nom: 'Granola maison', description: '', prix: '9 €', placeholder: false, prixIllustratif: true },
        { nom: 'Toast à l’avocat', description: '', prix: '13 €', placeholder: false, prixIllustratif: true },
        { nom: 'Pancakes', description: '', prix: '11 €', placeholder: false, prixIllustratif: true },
        { nom: 'Œufs brouillés', description: '', prix: '10 €', placeholder: false, prixIllustratif: true },
        { nom: 'Filet américain', description: '', prix: '15 €', placeholder: false, prixIllustratif: true },
      ],
    },
    {
      categorie: 'Cafés et boissons',
      plats: [
        { nom: 'Latte', description: 'café de spécialité', prix: '4,50 €', placeholder: false, prixIllustratif: true },
        { nom: 'Matcha', description: '', prix: '5 €', placeholder: false, prixIllustratif: true },
        { nom: 'Jus frais pressé', description: '', prix: '5 €', placeholder: false, prixIllustratif: true },
      ],
    },
  ],
  menus: [],
  histoire: [
    'Le Brunchist a ouvert en 2022. Derrière le comptoir, un couple namurois, Mélisande et Arnaud, selon la presse locale (à confirmer avec la maison).',
    'La promesse tient en deux mots, « local » et « fait maison » : un café-brunch décontracté et convivial, où le café est de spécialité et où les jus sont frais.',
    "La maison a quitté la Rue des Brasseurs pour s'installer Place d'Armes, au centre de Namur, avec une terrasse en extérieur.",
  ],
  equipe: [{ nom: 'Mélisande et Arnaud', role: 'Fondateurs, selon ELLE.be (à confirmer)', placeholder: false }],
  avis: [
    { texte: 'Best egg topped Avocado toast ever.', auteur: 'David', source: 'Avis Google, relevé sur Restaurant Guru', placeholder: false },
    { texte: 'Very cozy, good fresh foods […]', auteur: 'Wendy Sajid-Witte', source: 'Avis Google, relevé sur Restaurant Guru', placeholder: false },
  ],
  photos: [
    photo('salle-table-bois', 'Longue table en bois dans un café, tasses vertes, lumière de la vitrine'),
    photo('latte-art', 'Un cappuccino avec un motif de mousse, posé sur une table en bois'),
    photo('granola-fraises', 'Bol de granola, yaourt et fraises fraîches'),
    photo('framboises-tasse', 'Tasse blanche remplie de framboises sur sa soucoupe'),
    photo('biscuits-citron', 'Biscuits dans un bol sombre, citrons et jonquilles autour'),
    photo('cafe-filtre', 'Café filtre versé à la main au comptoir'),
    photo('tasse-rouge', 'Tasse de café au lait vue de dessus, sur fond rouge'),
    photo('theiere', 'Théière en verre et bouquet jaune sur une table'),
    photo('miel-pot', 'Pot de miel et cuillère en bois'),
  ],
  valeurs: ['Local', 'Fait maison', 'Ambiance décontractée et conviviale'],
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

// Cinq moments entre l'ouverture (9h30) et la fermeture (15h30). Plage de la frise : PLAGE.debut → PLAGE.fin.
export const PLAGE = { debut: 9, fin: 16 };

export interface Ligne { nom: string; detail: string; prix: string | null; placeholder: boolean; prixIllustratif?: boolean }
export interface Moment {
  id: string;
  heure: number;
  heureTexte: string;
  titre: string;
  accroche: string;
  accrochePlaceholder: boolean;
  theme: 'aube' | 'midi' | 'ocre' | 'corail' | 'nuit' | 'nuitProfonde';
  lignes: Ligne[];
  photo?: string;
  placeholder: boolean;
}
const L = (nom: string, prix: string | null, detail = ''): Ligne => ({ nom, detail, prix, placeholder: false, prixIllustratif: prix !== null });
const X = (nom: string, prix: string | null, detail = ''): Ligne => ({ nom, detail, prix, placeholder: true });

export const moments: Moment[] = [
  {
    id: 'm-9h30', heure: 9.5, heureTexte: '9h30', titre: 'Le café', theme: 'aube',
    accroche: 'La porte ouvre à 9h30. Cafés de spécialité, latte, matcha : la journée commence par une tasse.',
    accrochePlaceholder: false, placeholder: false, photo: '/photos/latte-art.webp',
    lignes: [L('Latte', '4,50 €', 'café de spécialité'), L('Matcha', '5 €'), L('Jus frais pressé', '5 €'), X('Café filtre', '3,50 €')],
  },
  {
    id: 'm-11h', heure: 11, heureTexte: '11h', titre: 'Le brunch', theme: 'midi',
    accroche: 'Eggs benedict, granola maison, pancakes : le brunch se prend sans se presser.',
    accrochePlaceholder: false, placeholder: false,
    lignes: [L('Eggs benedict', '14 €'), L('Granola maison', '9 €'), L('Pancakes', '11 €'), L('Œufs brouillés', '10 €')],
  },
  {
    id: 'm-12h30', heure: 12.5, heureTexte: '12h30', titre: 'Le salé', theme: 'ocre',
    accroche: 'Quand la faim se précise : toast à l’avocat, tartines, filet américain.',
    accrochePlaceholder: false, placeholder: false, photo: '/photos/cafe-filtre.webp',
    lignes: [L('Toast à l’avocat', '13 €'), L('Œufs brouillés', '10 €'), L('Filet américain', '15 €'), X('Tartines de saison', '9 €')],
  },
  {
    id: 'm-14h30', heure: 14.5, heureTexte: '14h30', titre: 'La terrasse', theme: 'corail',
    accroche: 'Un dernier café, un jus frais, un gâteau, en terrasse sur la Place d’Armes.',
    accrochePlaceholder: false, placeholder: false, photo: '/photos/biscuits-citron.webp',
    lignes: [X('Cake du jour', '5 €'), X('Cookie maison', '3 €'), X('Thé ou infusion', '3,50 €'), L('Jus frais pressé', '5 €')],
  },
  {
    id: 'm-15h30', heure: 15.5, heureTexte: '15h30', titre: 'Le rideau', theme: 'nuit',
    accroche: 'La cuisine ferme à 15h30. Merci d’être passé, à bientôt.',
    accrochePlaceholder: false, placeholder: false, lignes: [],
  },
];

/** Index boissons (12h30), utilisé à la place du plat de la semaine. */
export const boissons: { categorie: string; nom: string; prix: string }[] = [
  { categorie: 'Café', nom: 'Latte', prix: '4,50 €' },
  { categorie: 'Thé', nom: 'Matcha', prix: '5 €' },
  { categorie: 'Frais', nom: 'Jus pressé', prix: '5 €' },
];

export const jours: Jour[] = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
