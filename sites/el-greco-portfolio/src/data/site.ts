// Tout le contenu du site vit ici. Source : data/restaurants/<slug>/donnees.json et photos/index.json.
// Les trous des données réelles sont comblés par des données fictives marquées `placeholder: true` :
// un gabarit les affiche, la revue les signale, le client les remplace.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string; inconnu?: boolean } // creneaux vide = fermé
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

import carteJson from './carte.json';

const photo = (src: string, alt: string, largeur: number, hauteur: number, placeholder = false): Photo => ({ src, alt, largeur, hauteur, placeholder });

export const site: Restaurant = {
  slug: 'el-greco',
  nom: 'El Greco',
  baseline: 'Saveurs grecques à Bouge, aux portes de Namur',
  description:
    'El Greco, restaurant grec familial à Bouge (Namur) : mezze, giouvetsi, poulpe grillé, grillades, vins et cocktails grecs. Réservation par téléphone.',
  url: 'https://elgrecorestaurant.com',
  typeCuisine: 'Cuisine grecque, mezze, grillades',
  adresse: { rue: 'Rue de Sardanson', numero: '22', cp: '5004', commune: 'Bouge (Namur)', pays: 'BE' },
  geo: { lat: 50.4749656, lon: 4.8775723 },
  telephone: '+32 81 20 07 47',
  email: { valeur: 'contact@elgrecorestaurant.com', placeholder: false },
  reservation: { outil: 'téléphone', url: 'https://elgrecorestaurant.com/contact/' },
  // Horaires : jeudi à dimanche d'après Trouve Ton Resto (à confirmer) ; lundi à mercredi inconnus (inconnu: true).
  horaires: [
    { jour: 'lundi', creneaux: [], inconnu: true, note: 'nous appeler' },
    { jour: 'mardi', creneaux: [], inconnu: true, note: 'nous appeler' },
    { jour: 'mercredi', creneaux: [], inconnu: true, note: 'nous appeler' },
    { jour: 'jeudi', creneaux: [{ ouverture: '18:00', fermeture: '22:00' }] },
    { jour: 'vendredi', creneaux: [{ ouverture: '12:00', fermeture: '15:00' }, { ouverture: '18:00', fermeture: '22:00' }] },
    { jour: 'samedi', creneaux: [{ ouverture: '12:00', fermeture: '15:00' }, { ouverture: '18:00', fermeture: '22:00' }] },
    { jour: 'dimanche', creneaux: [{ ouverture: '18:00', fermeture: '23:00' }] },
  ],
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/elgrecobouge/' },
    { nom: 'Instagram', url: 'https://www.instagram.com/elgreconamur/' },
  ],
  carte: carteJson as Categorie[],
  menus: [],
  histoire: [
    'Depuis 1986, El Greco célèbre avec passion et fierté les traditions culinaires familiales de la Grèce, à Namur.',
    'À Bouge, rue de Sardanson, la carte suit ces traditions : un mezze à partager, l’agneau du giouvetsi mijoté plusieurs heures avec des pâtes grecques et de la feta, le poulpe grillé à l’huile d’olive de Crète et à la purée de fèves de Santorin, des grillades d’Angus et d’agneau.',
    'Côté boissons, la maison fait la place aux vins grecs (Limniona, Malagousia, Retsina) et à des cocktails comme le Santorini Sunset. Des clients citent aussi l’accueil de la patronne et la terrasse, calme aux beaux jours.',
  ],
  equipe: [],
  // Avis cités tels quels (extraits du dossier, widget Trustindex) ; auteurs non nommés.
  avis: [
    { texte: 'Très bon accueil, mise en bouche offerte par le chef, les plats étaient excellents, tout le long la patronne est restée très agréable.', auteur: 'Un client', source: 'Trustindex', date: '2026', placeholder: false },
    { texte: 'Excellent restaurant, excellent accueil et service impeccable, nous avons vraiment apprécié les plats ! Restaurant qui mérite le détour !', auteur: 'Un client', source: 'Trustindex', date: '2026-10-13', placeholder: false },
    { texte: 'Resto familial extra ! Un goût authentique au niveau des plats et vins. Profiter de la terrasse au calme est toujours très agréable.', auteur: 'Un client', source: 'Trustindex', date: '2026-07-12', placeholder: false },
    { texte: 'Bon moment culinaire, très bonne qualité de plats, belle présentation. Personnel aimable et attentionné.', auteur: 'Un client', source: 'Trustindex', date: '2026-07-24', placeholder: false },
  ],
  // Aucune photo du restaurant au dossier : photos de stock (Cyclades), toutes placeholder.
  photos: [
    photo('/photos/maison-eglise.webp', 'Murs blancs et église à coupole bleue sur une île grecque', 1800, 1200, true),
    photo('/photos/clocher.webp', 'Clocher blanc des Cyclades sur ciel bleu nuit', 640, 640, true),
    photo('/photos/parasols.webp', 'Parasols blancs sur une terrasse de Santorin', 640, 640, true),
    photo('/photos/terrasses.webp', 'Terrasses blanches d’Oia au-dessus de la mer', 640, 640, true),
    photo('/photos/coupole.webp', 'Coupole bleue d’une église grecque', 640, 640, true),
    photo('/photos/mur-pierres.webp', 'Mur chaulé et pierres volcaniques', 640, 640, true),
    photo('/photos/ciel-croix.webp', 'Croix blanche et clocher sur ciel bleu', 640, 640, true),
  ],
  valeurs: ['cuisine familiale grecque', 'feta AOP, huile d’olive de Crète, fèves de Santorin'],
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
// Contenu propre au gabarit « Guinguette », adapté à El Greco. Tout ce qui n'est pas prouvé par dossier.md
// porte `placeholder: true` et une marque visible là où il s'affiche.
// ---------------------------------------------------------------------------------------------

export type ObjetId = 'frites' | 'fourchette' | 'verre' | 'parasol' | 'bouteille' | 'citron' | 'amphore' | 'brochette' | 'olive';
export interface Objet { id: ObjetId; label: string; x: number; y: number; r: number; taille: number; mobile: boolean; mx?: number }
export interface Tirage { src: string; alt: string; x: number; y: number; r: number; legende: string; placeholder: boolean }
export interface Picto { categorie: string; picto: ObjetId }

export const guinguette = {
  heroTitre: ['Saveurs', 'grecques'], // titre du site actuel
  slogan: { texte: 'à partager, comme à la maison', placeholder: true },
  objets: [
    { id: 'amphore', label: 'Amphore dessinée au trait', x: 6, y: 10, r: -12, taille: 150, mobile: true, mx: 4 },
    { id: 'verre', label: 'Verre à pied dessiné au trait', x: 84, y: 8, r: 10, taille: 110, mobile: false },
    { id: 'olive', label: 'Branche d’olivier dessinée au trait', x: 10, y: 66, r: 8, taille: 130, mobile: true, mx: 40 },
    { id: 'brochette', label: 'Brochette dessinée au trait', x: 30, y: 78, r: -40, taille: 120, mobile: false },
    { id: 'bouteille', label: 'Bouteille de vin dessinée au trait', x: 80, y: 60, r: 14, taille: 140, mobile: true, mx: 74 },
    { id: 'citron', label: 'Citron coupé dessiné au trait', x: 72, y: 84, r: -6, taille: 90, mobile: false },
  ] as Objet[],
  /** La table : 6 tirages de stock (placeholder), légendes honnêtes. */
  tirages: [
    { src: '/photos/clocher.webp', alt: 'Clocher blanc des Cyclades sur ciel bleu nuit', x: 6, y: 8, r: -7, legende: 'Cyclades', placeholder: true },
    { src: '/photos/parasols.webp', alt: 'Parasols blancs sur une terrasse de Santorin', x: 30, y: 4, r: 5, legende: 'Terrasse, Santorin', placeholder: true },
    { src: '/photos/coupole.webp', alt: 'Coupole bleue d’une église grecque', x: 54, y: 8, r: -4, legende: 'Coupole bleue', placeholder: true },
    { src: '/photos/terrasses.webp', alt: 'Terrasses blanches d’Oia au-dessus de la mer', x: 76, y: 6, r: 7, legende: 'Oia', placeholder: true },
    { src: '/photos/mur-pierres.webp', alt: 'Mur chaulé et pierres volcaniques', x: 18, y: 63, r: 4, legende: 'Pierres et chaux', placeholder: true },
    { src: '/photos/ciel-croix.webp', alt: 'Croix blanche et clocher sur ciel bleu', x: 60, y: 64, r: -6, legende: 'Ciel d’Égée', placeholder: true },
  ] as Tirage[],
  pictos: [
    { categorie: 'Entrées froides', picto: 'olive' },
    { categorie: 'Entrées chaudes', picto: 'citron' },
    { categorie: 'Spécialités', picto: 'amphore' },
    { categorie: 'Grillades', picto: 'brochette' },
    { categorie: 'Poissons', picto: 'citron' },
    { categorie: 'Salades', picto: 'olive' },
    { categorie: 'Menus enfant', picto: 'frites' },
    { categorie: 'Suppléments', picto: 'fourchette' },
    { categorie: 'Cocktails', picto: 'verre' },
    { categorie: 'Apéritifs', picto: 'verre' },
    { categorie: 'Vins', picto: 'bouteille' },
    { categorie: 'Bières', picto: 'verre' },
  ] as Picto[],
  /** Catégories de la partie « à boire » (le reste est « à table »). */
  boissons: ['Cocktails du moment', 'Apéritifs', 'Vins grecs (bouteille)', 'Bières et softs'],
  /** Terrasse : citée par des avis, jamais décrite par le restaurant. */
  terrasse: { connue: false, texte: 'citée par nos clients, au calme' },
  /** Aggrégats d'avis du dossier (sources nommées). */
  notes: [
    { source: 'Tripadvisor', note: '4,0', nombre: 121 },
    { source: 'Trouve Ton Resto', note: '4,3', nombre: 5 },
  ],
  manifeste: {
    titre: ['Une table grecque,', 'simple et généreuse'],
    motItalique: 'généreuse',
    texte: 'Mezze à partager, agneau mijoté, poulpe grillé, grillades au feu, vins et cocktails grecs : la maison vous reçoit à Bouge, comme en famille.',
  },
  finale: 'Kalí órexi !',
};

/** Vrai si l'heure donnée (HH:MM) est dans un créneau. */
export const estOuvert = (h: Horaire, hhmm: string) => h.creneaux.some((c) => c.ouverture <= hhmm && hhmm < c.fermeture);
