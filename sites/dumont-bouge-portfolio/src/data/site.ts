import carteJson from './carte.json';
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
  geo?: { lat: number; lon: number }; // inconnu : absent plutôt qu'inventé
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

const photo = (src: string, alt: string, largeur: number, hauteur: number): Photo => ({ src, alt, largeur, hauteur, placeholder: false });

export const site: Restaurant = {
  slug: 'dumont-bouge',
  nom: 'Dumont Bouge',
  baseline: 'Pâtisserie, boulangerie, restauration et tea-room à Bouge, tous les jours de 7h à 18h.',
  description:
    'Dumont Bouge, boulangerie-pâtisserie et tea-room à Bouge (Namur) : pains du matin, gâteaux maison, sandwichs Dagobert, brunch, gaufres et crêpes, ouvert 7 jours sur 7.',
  url: 'https://www.dumontbouge.com',
  typeCuisine: 'Boulangerie, pâtisserie, sandwicherie, tea-room',
  adresse: { rue: 'Chaussée de Louvain', numero: '343', cp: '5004', commune: 'Bouge (Namur)', pays: 'BE' },
  telephone: '+32 81 22 96 02',
  email: { valeur: 'srl-dumontbouge@outlook.com', placeholder: false },
  reservation: { outil: 'le formulaire de dumontbouge.com', url: 'https://www.dumontbouge.com/reservations' },
  horaires: (['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] as Jour[]).map((jour) => ({ jour, creneaux: [{ ouverture: '07:00', fermeture: '18:00' }] })),
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61572819565373' },
    { nom: 'Instagram', url: 'https://www.instagram.com/dumontbouge/' },
  ],
  carte: carteJson as Categorie[],
  menus: [
    { nom: 'Formule Dumont', prix: '13,80 €', description: "Petit-déjeuner de 7h à 11h : 2 couques au choix, jus d'orange frais, 1 boisson chaude ou froide au choix.", placeholder: false },
    { nom: 'Formule Français', prix: '14,50 €', description: 'Petit-déjeuner de 7h à 11h : 2 croissants ou 2 pistolets, confiture, fromage ou jambon, 1 boisson chaude au choix.', placeholder: false },
  ],
  histoire: [
    "Dumont Bouge est bien plus qu'un salon de thé, c'est un lieu de rencontre et de partage. Nous sommes passionnés par l'art de la dégustation, offrant une grande variété gustative.",
  ],
  equipe: [],
  avis: [],
  photos: [
    photo('/photos/facade.webp', 'Façade et entrée de Dumont Bouge, chaussée de Louvain, avec le parvis pavé et la terrasse couverte', 1800, 1350),
    photo('/photos/facade-960.webp', 'Façade et entrée de Dumont Bouge, chaussée de Louvain, avec le parvis pavé et la terrasse couverte', 960, 720),
    photo('/photos/vitrine.webp', 'Vitrine de tartes et de pâtisseries aux fruits rouges', 1800, 1350),
    photo('/photos/vitrine-960.webp', 'Vitrine de tartes et de pâtisseries aux fruits rouges', 960, 720),
    photo('/photos/salade-chevre.webp', 'Assiette de toasts de chèvre, jambon cru et crudités', 1200, 1600),
    photo('/photos/plateau-mini-sandwichs.webp', 'Plateau de mini-sandwichs avec des serviettes siglées Dumont', 1200, 1600),
    photo('/photos/tarte-framboises.webp', 'Tarte aux framboises et groseilles', 1800, 1012),
  ],
  valeurs: [
    'Pains pétris et cuits chaque matin',
    'Gâteaux préparés à la main',
    'Sandwichs, salades et paninis préparés à la commande',
  ],
};

/** Second point de vente listé par le site actuel (horaires distincts). */
export const adresseNamur = { rue: 'Rue de Marchovelette', numero: '9', cp: '5000', commune: 'Namur' };
export const horairesNamur: { jour: Jour; texte: string }[] = (['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'] as Jour[])
  .map((jour) => ({ jour, texte: '07:00 à 17:00' }))
  .concat([{ jour: 'dimanche', texte: 'fermé' }]);

/** Photo par chemin (erreur explicite si le chemin n'existe pas). */
export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}
export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;
export const horaireTexte = (h: Horaire) =>
  h.creneaux.length ? h.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(', ') : h.note || 'fermé';
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;
/** Itinéraire : recherche par adresse (coordonnées GPS inconnues). */
export const itineraire = `https://www.openstreetmap.org/search?query=${encodeURIComponent(adresseLigne())}`;

// ---------------------------------------------------------------------------------------------
// Gabarit « Journée » : six moments, de 7h à 18h. Tout vient du dossier (carte.json = donnees.json) ;
// aucune donnée fictive dans ce site, hors mention contraire (`placeholder`).
// ---------------------------------------------------------------------------------------------
export interface Ligne { nom: string; detail: string; prix: string | null; placeholder: boolean }
export interface Moment {
  id: string; heure: number; heureTexte: string; titre: string; accroche: string; accrochePlaceholder: boolean;
  theme: 'aube' | 'midi' | 'ocre' | 'aprem' | 'corail' | 'nuit' | 'nuitProfonde';
  lignes: Ligne[]; photo?: string; placeholder: boolean;
}

const cat = (debut: string) => site.carte.find((c) => c.categorie.includes(debut))!;
const l = (debut: string, nom: string): Ligne => {
  const p = cat(debut).plats.find((x) => x.nom === nom);
  if (!p) throw new Error(`Plat introuvable : ${debut} / ${nom}`);
  return { nom: p.nom, detail: p.description, prix: p.prix, placeholder: false };
};

export const moments: Moment[] = [
  {
    id: 'm-7h', heure: 7, heureTexte: '7h', titre: 'Le petit-déjeuner', theme: 'aube',
    accroche: 'De 7h à 11h, deux formules et le café du matin, sur place ou au comptoir.',
    accrochePlaceholder: false, placeholder: false, photo: '/photos/facade.webp',
    lignes: [
      { nom: 'Formule Dumont', detail: '2 couques, jus d’orange frais, boisson', prix: '13,80 €', placeholder: false },
      { nom: 'Formule Français', detail: '2 croissants ou 2 pistolets, confiture, fromage ou jambon, boisson chaude', prix: '14,50 €', placeholder: false },
      l('Boissons chaudes', 'Café ou expresso'),
    ],
  },
  {
    id: 'm-9h', heure: 9, heureTexte: '9h', titre: 'Le pain et la vitrine', theme: 'midi',
    accroche: 'Les pains sont pétris et cuits chaque matin ; les gâteaux sont préparés à la main.',
    accrochePlaceholder: false, placeholder: false,
    lignes: [
      l('Nos pains', 'Petit Blanc'),
      l('Nos pains', 'Soleil'),
      l('Nos pains', 'Country'),
      { nom: 'Saint Honoré, Truffe chocolat, Javanais…', detail: 'gâteaux à la commande, prix non publiés', prix: null, placeholder: false },
    ],
  },
  {
    id: 'm-11h30', heure: 11.5, heureTexte: '11h30', titre: 'Le brunch', theme: 'ocre',
    accroche: 'De 11h30 à 15h : croques, salades, croquettes, toasts, pâtes et méli-mélo.',
    accrochePlaceholder: false, placeholder: false, photo: '/photos/salade-chevre.webp',
    lignes: [l('Nos croques', 'Monsieur'), l('Nos salades', 'Salade chèvre chaud'), l('Les croquettes', 'Duo de fromages'), l('Les pâtes', 'Lasagne')],
  },
  {
    id: 'm-14h', heure: 14, heureTexte: '14h', titre: 'Les Dagobert', theme: 'aprem',
    accroche: 'Sandwichs, salades et paninis préparés à la commande, à emporter.',
    accrochePlaceholder: false, placeholder: false, photo: '/photos/plateau-mini-sandwichs.webp',
    lignes: [l('Dagobert spéciaux', 'Campagnard'), l('Dagobert spéciaux', 'Créole'), l('Dagobert) · Salades', 'Fraîcheur'), l('Paninis', 'Panini croque'), l('Paninis', 'Italien')],
  },
  {
    id: 'm-15h30', heure: 15.5, heureTexte: '15h30', titre: 'Le tea-room', theme: 'corail',
    accroche: 'Gaufres de Bruxelles, crêpes et coupes glacées, avec un thé de la sélection Teatower.',
    accrochePlaceholder: false, placeholder: false, photo: '/photos/tarte-framboises.webp',
    lignes: [l('Gaufres de Bruxelles', 'Sucre'), l('Gaufres de Bruxelles', 'Chantilly'), l('Crêpes', 'Sucre, cassonade, citron ou confiture'), l('Nos suggestions de coupes', 'Brésilienne')],
  },
  {
    id: 'm-17h30', heure: 17.5, heureTexte: '17h30', titre: 'Avant la fermeture', theme: 'nuit',
    accroche: 'La maison ferme à 18h. Pour un gâteau sur mesure, commandez-le au 081 22 96 02.',
    accrochePlaceholder: false, placeholder: false,
    lignes: [
      { nom: 'Bouge, chaussée de Louvain 343', detail: 'tous les jours', prix: '7h–18h', placeholder: false },
      { nom: 'Namur, rue de Marchovelette 9', detail: 'du lundi au samedi', prix: '7h–17h', placeholder: false },
      { nom: 'Paiement', detail: 'un paiement par table', prix: null, placeholder: false },
    ],
  },
];

/** Familles du brunch pour l'accueil : nom, exemples, prix d'appel (dérivés de la carte). */
const prixNum = (p: string | null) => (p ? parseFloat(p.replace(',', '.')) : NaN);
export const brunchFamilles = site.carte
  .filter((c) => c.categorie.includes('Brunch'))
  .map((c) => {
    const prix = c.plats.map((p) => prixNum(p.prix)).filter((n) => !Number.isNaN(n));
    const mini = Math.min(...prix);
    return {
      nom: c.categorie.split('·').pop()!.replace(/\(.*\)/, '').trim(),
      exemples: c.plats.slice(0, 3).map((p) => p.nom).join(', '),
      prix: `dès ${mini.toFixed(2).replace('.', ',')} €`,
    };
  });

export const jours: Jour[] = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
