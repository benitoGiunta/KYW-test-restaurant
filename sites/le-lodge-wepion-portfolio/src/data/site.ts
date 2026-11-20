// Tout le contenu du site vit ici. Source : data/restaurants/<slug>/donnees.json et photos/index.json.
// Les trous des données réelles sont comblés par des données fictives marquées `placeholder: true` :
// un gabarit les affiche, la revue les signale, le client les remplace.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean }
export interface Categorie { categorie: string; note?: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean }
export interface Membre { nom: string; role: string; photo?: string; placeholder: boolean }
export interface Avis { texte: string; auteur?: string; source: string; date?: string; note?: number; placeholder: boolean }
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

import photosJson from './photos.json';
import carteJson from './carte.json';

const NB = ' ';
const photos: Photo[] = (photosJson as { src: string; alt: string; largeur: number; hauteur: number }[]).map((p) => ({
  src: p.src,
  alt: p.alt.replace(/\s*\(.*\)\s*$/, ''),
  largeur: p.largeur,
  hauteur: p.hauteur,
  placeholder: false,
}));

export const site: Restaurant = {
  slug: 'le-lodge-wepion',
  nom: 'Le Lodge Wépion',
  baseline: 'Brasserie, restaurant et tea-room au bord de la Meuse.',
  description:
    'Le Lodge Wépion, brasserie, restaurant et tea-room au bord de la Meuse : fermé depuis l’incendie de mai 2026, l’équipe vous accueille à Erpent en attendant la réouverture.',
  url: 'https://www.lodgewepion.be',
  typeCuisine: 'Brasserie, restaurant et tea-room',
  adresse: { rue: 'Chaussée de Dinant', numero: '931', cp: '5100', commune: 'Wépion', pays: 'BE' },
  geo: { lat: 50.4234855, lon: 4.8742231 },
  telephone: '+32 81 40 08 91',
  email: { valeur: '', placeholder: true }, // adresse hotmail connue mais non affichée : le formulaire passe par Barestho
  reservation: { outil: 'Barestho', url: 'https://lelodge.reservation.barestho.com/' },
  horaires: [], // aucun horaire confirmé pour l'accueil provisoire ; ceux de Wépion sont historiques (voir `lieux`)
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/lodgewepion' },
    { nom: 'Instagram', url: 'https://www.instagram.com/restaurant_le_lodge/' },
  ],
  carte: carteJson as Categorie[],
  menus: [],
  histoire: [
    'Le Lodge est une brasserie, un restaurant et un tea-room au bord de la Meuse, à Wépion. La salle et la terrasse regardent le fleuve et les rochers de l’autre rive.',
    `Il a ouvert ses portes en 2008 et compte 160${NB}couverts, selon l’annuaire Trouve Ton Resto (à confirmer). Grégory Jorion le dirige.`,
    'À la carte : des tartares, des boulettes maison sauce tomate ou liégeoise, des pâtes artisanales de chez Mil’pat, des desserts et des glaces. L’après-midi, la brasserie devient tea-room : crêpes, gaufres et glaces.',
    'Les produits locaux sont cités sur la carte : fromage de Chimay Poteaupré, porc qualité Ardenne, truite d’Annevoie, canard de la Ferme de la Sauvenière, sirop de sureau de Wépion. Mot d’ordre de la carte : une table, une addition.',
  ],
  equipe: [{ nom: 'Grégory Jorion', role: 'Gérant', placeholder: false }],
  avis: [
    { texte: 'Service très agréable, très bien situé au bord de l’eau ! Les spaghettis carbonara sont délicieux !', source: 'Trouve Ton Resto, extrait sans date', placeholder: false },
    { texte: 'L’onglet de bœuf est tout simplement excellent.', source: 'Trouve Ton Resto, extrait sans date', placeholder: false },
    { texte: 'Cadre agréable et cosy pour passer un bon moment, accueil chaleureux, carte assez variée.', source: 'Trouve Ton Resto, extrait sans date', placeholder: false },
  ],
  photos,
  valeurs: [
    'Fait maison : desserts, sauces, sirop de sureau de Wépion',
    'Produits locaux cités sur la carte',
    'Une table, une addition',
  ],
};

/** Photo par chemin (erreur explicite si le chemin n'existe pas : un site ne doit pas pointer dans le vide). */
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
export const telHref = (num: string = site.telephone) => `tel:${num.replace(/\s+/g, '')}`;

// ---------------------------------------------------------------------------------------------
// Situation du moment (dossier.md, « Situation à connaître ») : le restaurant de Wépion est fermé
// depuis l'incendie du 21/05/2026 ; aucun horaire inventé.
// ---------------------------------------------------------------------------------------------

export const lieux = {
  fermeture: { date: '21 mai 2026', texteCourt: 'Fermé depuis l’incendie du 21 mai 2026' },
  reouverture: 'Réouverture à Wépion envisagée fin 2026, voire début 2027 (propos du gérant dans La DH du 26 mai 2026, à confirmer).',
  provisoire: {
    nom: 'Wine & More',
    rue: 'Chaussée de Marche 496',
    commune: 'Erpent',
    telephone: '+32 496 92 55 13',
    telAffiche: '0496\u00a092\u00a055\u00a013',
    texte: 'Depuis le 15 septembre, l’équipe du Lodge est accueillie au Wine & More, « 6 jours sur 7 » selon le site du Lodge (relevé du 20 novembre 2026). Les jours et horaires exacts sont à confirmer par téléphone.',
    lien: 'https://www.openstreetmap.org/search?query=Chauss%C3%A9e%20de%20Marche%20496%20Erpent',
  },
  avant: 'Avant l’incendie, d’après le site du Lodge : tous les jours, de 11 h 30 à 22 h 30 (un annuaire indique 12 h à 15 h et 18 h à 21 h 30 : à confirmer).',
  presse: [
    { media: 'L’Avenir', date: '22 mai 2026', titre: 'Le restaurant Le Lodge ravagé par un incendie ce jeudi soir à Wépion', url: 'https://www.lavenir.net/regions/namur/namur/2026/05/22/namur-le-restaurant-le-lodge-ravage-par-un-incendie-ce-jeudi-soir-J3P57GI63FEPDOVLUCB6FA7UUM/' },
    { media: 'La DH', date: '26 mai 2026', titre: 'Pas de réouverture avant la fin de l’année', url: 'https://www.dhnet.be/regions/namur/2026/05/26/incendie-au-restaurant-le-lodge-a-wepion-pas-de-reouverture-avant-la-fin-de-lannee-SHRIHXPV4JATRPP5M57NM4DREU/' },
    { media: 'La DH', date: '10 juin 2026', titre: 'Le Lodge reprend ses activités à l’Aquaplane de Profondeville', url: 'https://www.dhnet.be/regions/namur/2026/06/10/wepion-victime-dun-incendie-le-restaurant-le-lodge-reprend-ses-activites-a-laquaplane-de-profondeville-des-ce-samedi-UYIEOLSJPNA63DESLTSHW4XKVI/' },
  ],
};

// ---------------------------------------------------------------------------------------------
// Contenu propre au gabarit « Guinguette » adapté au Lodge. Tout ce qui n'est pas prouvé par
// dossier.md porte `placeholder: true` et une marque visible là où il s'affiche.
// ---------------------------------------------------------------------------------------------

export type ObjetId = 'frites' | 'fourchette' | 'verre' | 'parasol' | 'bouteille' | 'citron';
export interface Objet { id: ObjetId; label: string; x: number; y: number; r: number; taille: number; mobile: boolean; mx?: number }
export interface Tirage { src: string; alt: string; x: number; y: number; r: number; legende: string; placeholder: boolean }
export interface Picto { categorie: string; picto: ObjetId }

const T = (n: string, x: number, y: number, r: number, legende: string): Tirage => ({ src: `/photos/${n}.webp`, alt: photoDe(`/photos/${n}.webp`).alt, x, y, r, legende, placeholder: false });

export const guinguette = {
  heroTitre: ['Au bord de', 'la Meuse'],
  slogan: { texte: 'brasserie, restaurant et tea-room à Wépion', placeholder: false },
  objets: [
    { id: 'parasol', label: 'Parasol dessiné au trait', x: 6, y: 10, r: -12, taille: 150, mobile: true, mx: 4 },
    { id: 'verre', label: 'Verre à pied dessiné au trait', x: 84, y: 8, r: 10, taille: 110, mobile: false },
    { id: 'frites', label: 'Cornet de frites dessiné au trait', x: 10, y: 66, r: 8, taille: 130, mobile: true, mx: 40 },
    { id: 'fourchette', label: 'Fourchette dessinée au trait', x: 30, y: 78, r: -40, taille: 120, mobile: false },
    { id: 'bouteille', label: 'Bouteille dessinée au trait', x: 80, y: 60, r: 14, taille: 140, mobile: true, mx: 74 },
    { id: 'citron', label: 'Citron coupé dessiné au trait', x: 62, y: 82, r: -6, taille: 90, mobile: false },
  ] as Objet[],
  /** La table : 12 tirages à cadre blanc (photos réelles du dossier, légendes d'après le champ `sujet`). */
  tirages: [
    T('facade-jour', 1, 0, -7, 'La façade, côté Meuse'),
    T('salle-claire', 17, 5, 5, 'La salle claire'),
    T('terrasse-meuse', 33, 0, -3, 'La terrasse sur la Meuse'),
    T('dessert-coupelle', 49, 4, 8, 'Un dessert en coupelle'),
    T('salle-vue-meuse', 65, 0, -5, 'Près de la fenêtre'),
    T('facade-nuit', 81, 6, 4, 'La façade au crépuscule'),
    T('plat-bol', 1, 62, 6, 'Un plat en bol'),
    T('dessert-assiette', 17, 63, -9, 'Un dessert meringué'),
    T('plat-feuillete', 33, 67, 4, 'Un feuilleté et sa sauce'),
    T('plat-viande-noire', 49, 62, -6, 'Un plat de viande'),
    T('plat-viande-panee', 65, 66, 7, 'Une viande panée'),
    T('salle-voutee', 81, 64, -4, 'La salle voûtée'),
  ] as Tirage[],
  pictos: [
    { categorie: 'À partager', picto: 'frites' },
    { categorie: 'Les entrées', picto: 'citron' },
    { categorie: 'Les salades', picto: 'citron' },
    { categorie: 'Les tartares', picto: 'fourchette' },
    { categorie: 'Les viandes', picto: 'fourchette' },
    { categorie: 'Les burgers', picto: 'frites' },
    { categorie: 'Les poissons', picto: 'citron' },
    { categorie: 'Les pâtes', picto: 'fourchette' },
    { categorie: 'Les suggestions', picto: 'parasol' },
    { categorie: 'Pour les bambins', picto: 'parasol' },
    { categorie: 'Accompagnements', picto: 'frites' },
    { categorie: 'Nos glaces', picto: 'parasol' },
    { categorie: 'Desserts', picto: 'parasol' },
    { categorie: 'Crêpes', picto: 'parasol' },
    { categorie: 'Boissons', picto: 'verre' },
  ] as Picto[],
  /** Catégories mises en avant sur l'accueil (reste de la carte sur /carte/). */
  accueilCategories: ['Les tartares', 'Les pâtes artisanales (Mil’pat)', 'Desserts', 'Crêpes et gaufres'],
  /** Catégories du tea-room. */
  teaRoomCategories: ['Crêpes', 'Nos glaces', 'Desserts'],
  terrasse: { connue: true, placeholder: false },
  manifeste: {
    titre: ['Une table,', 'une addition'],
    motItalique: 'addition',
    texte: 'Une carte de brasserie faite maison, des produits locaux cités plat par plat, et le sirop de sureau de Wépion. À la fin du repas, une seule note par table.',
  },
  finale: 'À table !',
};
