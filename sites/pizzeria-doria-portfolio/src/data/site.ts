// Tout le contenu du site vit ici. Source : data/restaurants/pizzeria-doria/ (donnees.json, dossier.md, photos/index.json).
// Tout ce qui n'est pas prouvé par le dossier est marqué `placeholder: true` ou passe à `null` (le composant ne rend rien).
import carteJson from './carte.json';

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; sansLactose: boolean; placeholder: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Membre { nom: string; role: string; placeholder: boolean }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }

export interface Restaurant {
  slug: string;
  nom: string;
  baseline: string;
  description: string;
  url: string;
  typeCuisine: string;
  adresse: { rue: string; numero: string; cp: string; commune: string; pays: string };
  geo: { lat: number; lon: number };
  telephone: string;
  email: { valeur: string; placeholder: boolean };
  reservation: { outil: string; url: string | null };
  emporter: { outil: string; url: string };
  paiement: string;
  horaires: Horaire[];
  noteCuisine: string;
  reseaux: Reseau[];
  carte: Categorie[];
  histoire: string[];
  equipe: Membre[];
  photos: Photo[];
  valeurs: string[];
}

const photo = (src: string, alt: string, largeur: number, hauteur: number, placeholder = false): Photo => ({ src, alt, largeur, hauteur, placeholder });

const h = (jour: Jour, creneaux: [string, string][], note?: string): Horaire => ({ jour, creneaux: creneaux.map(([ouverture, fermeture]) => ({ ouverture, fermeture })), note });
const midiSoir: [string, string][] = [['12:00', '13:30'], ['18:00', '21:30']];

export const site: Restaurant = {
  slug: 'pizzeria-doria',
  nom: 'Pizzeria Doria',
  baseline: "Venez passer un moment chaleureux et convivial aux saveurs de l'Italie chez Doria.",
  description: "Pizzeria Doria à Malonne (Namur) : pizzas, pâtes fraîches, viandes italiennes et antipasti, servis dans la salle des coffres d'une ancienne banque.",
  url: 'https://www.pizzeriadoria.be',
  typeCuisine: 'Pizzas, pâtes fraîches, cuisine italienne',
  adresse: { rue: 'Rue Fond de Malonne', numero: '66', cp: '5020', commune: 'Malonne (Namur)', pays: 'BE' },
  geo: { lat: 50.4404882, lon: 4.7950329 },
  telephone: '+32 81 44 44 08',
  email: { valeur: 'info@pizzeriadoria.be', placeholder: false },
  reservation: { outil: 'téléphone', url: null }, // mode de réservation en ligne à confirmer (dossier : « outil à confirmer ») ; seul le téléphone est prouvé, ne pas écrire « uniquement »
  emporter: { outil: 'Pizzy', url: 'https://pizzy.be/pizzeria-doria' },
  paiement: 'Payconiq et espèces',
  horaires: [
    h('lundi', midiSoir),
    h('mardi', [], 'fermé'),
    h('mercredi', [], 'fermé'),
    h('jeudi', midiSoir),
    h('vendredi', [['12:00', '13:30'], ['18:00', '22:00']]),
    h('samedi', [['12:00', '13:30'], ['18:00', '22:00']]),
    h('dimanche', [['18:00', '21:30']]),
  ],
  noteCuisine: 'Cuisine fermée à partir de 21 h du mardi au jeudi et le dimanche, de 21 h 30 le vendredi et le samedi. Jours fériés : 18:00 à 21:30 (mardi et mercredi fériés : fermé).',
  reseaux: [{ nom: 'Facebook', url: 'https://www.facebook.com/pizzeriadoria/' }],
  carte: carteJson as Categorie[],
  histoire: [
    "Ouverte en octobre 2017, la Pizzeria Doria est gérée par Rocco et Luigi. Une histoire de famille.",
    "Depuis mai 2023, la maison a pris ses quartiers dans une ancienne banque restaurée, à Malonne. On s’y attable dans la « salle des coffres », entre les casiers métalliques d'origine, les tables en bois et les chaises noires.",
    "À la carte : quarante-cinq pizzas et pains, des pâtes fraîches bio signées Eggusto en option, des viandes italiennes et des antipasti. Le fior di latte sans lactose se demande à la commande, et chaque plat se prend sur place ou à emporter.",
    "Côté verre, Luigi choisit la sélection de vins au verre, la carte des vins est italienne, et la bière vient du coin : la Philomène de Malonne et la Vulpio de Wépion.",
  ],
  equipe: [
    { nom: 'Rocco', role: 'Gérant', placeholder: false },
    { nom: 'Luigi', role: 'Gérant, sélection de vins au verre', placeholder: false },
  ],
  photos: [
    photo('/photos/salle-des-coffres.webp', 'La salle des coffres : ancienne salle de coffres de banque, casiers métalliques, tables en bois et chaises noires', 640, 800),
    photo('/photos/friture.webp', 'Assiette de friture de poisson, calamars, gambas, œufs durs et salade', 1440, 945),
    photo('/photos/roquette.webp', 'Assiette de roquette, tomates cerises, copeaux de fromage et crème de balsamique', 921, 691),
    photo('/photos/bouchons.webp', 'Cadre de bouchons de liège sur un mur orangé, vu de dessus', 1350, 1800),
    photo('/photos/pizza-coupe.webp', 'Pizza découpée en parts (photo libre, illustrative)', 1200, 1800, true),
    photo('/photos/pizza-basilic.webp', 'Pizza garnie de basilic frais (photo libre, illustrative)', 1200, 1800, true),
    photo('/photos/pate.webp', 'Pâte travaillée à la main sur un plan fariné (photo libre, illustrative)', 1500, 1000, true),
    photo('/photos/burrata.webp', 'Burrata ouverte sur une assiette (photo libre, illustrative)', 1200, 1800, true),
  ],
  valeurs: ['Produits maison, parfois bio', 'Pâtes fraîches bio artisanales Eggusto', 'Bières locales : Philomène de Malonne, Vulpio de Wépion'],
};

/** Photo par chemin (erreur explicite si le chemin n'existe pas). */
export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}

export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;
export const horaireTexte = (x: Horaire) => (x.creneaux.length ? x.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(', ') : x.note || 'fermé');
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;
export const estOuvert = (x: Horaire, hhmm: string) => x.creneaux.some((c) => c.ouverture <= hhmm && hhmm < c.fermeture);

/** Catégories de la carte regroupées par page. */
const par = (noms: string[]) => site.carte.filter((c) => noms.includes(c.categorie));
export const groupes = {
  pizzas: par(['Pizzas']),
  cuisine: par(['Salades & Antipasti', 'Pasta', 'Viandes', 'Glaces & Desserts']),
  boissons: par(['Apéritifs', 'Bières', 'Softs', 'Café', 'Digestifs']),
  vins: par(['Vins au verre et pichets', 'Vins (bouteilles 75 cl)']),
};

// ---------------------------------------------------------------------------------------------
// Contenu propre au gabarit « Guinguette » adapté à la pizzeria.
// ---------------------------------------------------------------------------------------------

export type ObjetId = 'pizza' | 'fourchette' | 'verre' | 'basilic' | 'bouteille' | 'tomate';
export interface Objet { id: ObjetId; label: string; x: number; y: number; r: number; taille: number; mobile: boolean; mx?: number }
export interface Tirage { src: string; legende: string; x: number; y: number; r: number }
export interface Picto { categorie: string; picto: ObjetId }

export const guinguette = {
  heroTitre: ['À table,', 'chez Doria'],
  slogan: { texte: "un moment chaleureux et convivial aux saveurs de l'Italie", placeholder: false },
  objets: [
    { id: 'basilic', label: 'Feuille de basilic dessinée au trait', x: 6, y: 10, r: -12, taille: 140, mobile: true, mx: 4 },
    { id: 'verre', label: 'Verre à pied dessiné au trait', x: 84, y: 8, r: 10, taille: 110, mobile: false },
    { id: 'pizza', label: 'Pizza dessinée au trait', x: 10, y: 64, r: 8, taille: 150, mobile: true, mx: 40 },
    { id: 'fourchette', label: 'Fourchette dessinée au trait', x: 30, y: 78, r: -40, taille: 120, mobile: false },
    { id: 'bouteille', label: 'Bouteille dessinée au trait', x: 80, y: 60, r: 14, taille: 140, mobile: true, mx: 74 },
    { id: 'tomate', label: 'Tomate dessinée au trait', x: 62, y: 82, r: -6, taille: 100, mobile: false },
  ] as Objet[],
  /** La table : 8 tirages (4 photos du client, 4 photos libres marquées illustratives). */
  tirages: [
    { src: '/photos/salle-des-coffres.webp', legende: 'La salle des coffres', x: 5, y: 4, r: -6 },
    { src: '/photos/pizza-coupe.webp', legende: 'Pizza (photo libre)', x: 27, y: 2, r: 5 },
    { src: '/photos/friture.webp', legende: 'Friture de poisson', x: 50, y: 5, r: -4 },
    { src: '/photos/pate.webp', legende: 'La pâte (photo libre)', x: 72, y: 3, r: 7 },
    { src: '/photos/bouchons.webp', legende: 'Cadre de bouchons', x: 6, y: 60, r: 5 },
    { src: '/photos/pizza-basilic.webp', legende: 'Basilic (photo libre)', x: 27, y: 62, r: -7 },
    { src: '/photos/roquette.webp', legende: 'Roquette et balsamique', x: 49, y: 59, r: 4 },
    { src: '/photos/burrata.webp', legende: 'Burrata (photo libre)', x: 70, y: 61, r: -5 },
  ] as Tirage[],
  pictos: [
    { categorie: 'Pizzas', picto: 'pizza' },
    { categorie: 'Salades', picto: 'basilic' },
    { categorie: 'Pasta', picto: 'fourchette' },
    { categorie: 'Viandes', picto: 'fourchette' },
    { categorie: 'Glaces', picto: 'tomate' },
    { categorie: 'Vins', picto: 'bouteille' },
    { categorie: 'Apéritifs', picto: 'verre' },
    { categorie: 'Bières', picto: 'verre' },
    { categorie: 'Softs', picto: 'verre' },
    { categorie: 'Café', picto: 'tomate' },
    { categorie: 'Digestifs', picto: 'bouteille' },
  ] as Picto[],
  /** Suggestions du moment : affiche de la modale d'accueil, novembre 2026 (dossier.md). Période annoncée en constante. */
  suggestions: {
    periode: 'novembre 2026',
    plats: [
      { nom: 'Pizza aux cèpes', description: 'Cèpes, fior di latte, saucisse au fenouil, speck, copeaux de parmesan', prix: '18 €' },
      { nom: 'Risotto aux cèpes', description: 'Préparé à la commande, 30 minutes', prix: '20 €' },
      { nom: 'Panna cotta', description: 'Fruits des bois, chocolat blanc, zeste de citron', prix: '8 €' },
    ],
  },
  /** Midis scolaires : cornets de pâtes 5 à 6 €, paninis 6 à 7,50 € (dossier.md). Détail des plats non fourni. */
  midis: { cornets: '5 à 6 €', paninis: '6 à 7,50 €' },
  manifeste: {
    titre: ['Pâtes fraîches,', 'pizzas et antipasti'],
    motItalique: 'antipasti',
    texte: "Quarante-cinq pizzas et pains, des pâtes fraîches bio Eggusto, des viandes italiennes et des antipasti, dans la salle des coffres d'une ancienne banque.",
  },
  finale: 'Buon appetito !',
};
