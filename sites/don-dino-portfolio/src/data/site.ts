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

import carteJson from './carte.json';

const photo = (src: string, alt: string, largeur: number, hauteur: number): Photo => ({ src, alt, largeur, hauteur, placeholder: false });

export const site: Restaurant = {
  slug: 'don-dino',
  nom: 'Don Dino',
  baseline: 'Brasserie, restaurant, pizzeria. Spécialités italiennes et bonne ambiance, ouvert 7 jours sur 7, midi et soir.',
  description:
    'Don Dino à Naninne (Namur) : brasserie, restaurant et pizzeria. Pizzas, pâtes, lasagne maison, viandes et poissons, terrasse, ouvert 7 jours sur 7 midi et soir.',
  url: 'https://dondino.be',
  typeCuisine: 'Cuisine italienne, pizzeria, brasserie',
  adresse: { rue: 'Chaussée de Marche', numero: '826', cp: '5100', commune: 'Naninne (Namur)', pays: 'BE' },
  geo: { lat: 50.424481, lon: 4.9315063 },
  telephone: '+32 81 74 15 60',
  email: { valeur: '', placeholder: true }, // inconnu au dossier : jamais affiché
  reservation: { outil: 'dondino.be', url: 'https://dondino.be/fr/reservations' },
  horaires: [
    { jour: 'lundi', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '22:30' }] },
    { jour: 'mardi', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '22:30' }] },
    { jour: 'mercredi', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '22:30' }] },
    { jour: 'jeudi', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '22:30' }] },
    { jour: 'vendredi', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '23:30' }] },
    { jour: 'samedi', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '23:30' }] },
    { jour: 'dimanche', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '22:30' }] },
  ],
  reseaux: [{ nom: 'Facebook', url: 'https://www.facebook.com/dondinonaninne/' }],
  carte: carteJson as Categorie[],
  menus: [],
  histoire: [
    "Don Dino ouvre ses portes en 2014 à Naninne, sur les hauteurs de Namur, en direction de Marche. Une brasserie, un restaurant et une pizzeria sous le même toit, avec un bar et une grande salle.",
    "Aux commandes, Placido Scalisi, dit « Dino », surnommé Il Condottiere : né dans une cuisine, meneur d'hommes et ténor à ses heures. Son accueil sicilien est celui d'un patron toujours de bonne humeur, en salle.",
    "La carte se veut belle pour tous les goûts : un éventail très large de spécialités italiennes et de cuisine française, familiale et traditionnelle, avec des suggestions de saison et des vins français et italiens.",
    "Ouvert 7 jours sur 7, midi et soir, avec le patron en salle : on vient en famille, entre amis ou en groupe, à table ou en terrasse quand le temps s'y prête.",
  ],
  equipe: [{ nom: 'Placido Scalisi, dit « Dino »', role: 'Le patron, en salle', placeholder: false }],
  avis: [],
  photos: [
    photo('/photos/moules-gratinees.webp', 'Moules gratinées servies dans un plat blanc', 1045, 747),
    photo('/photos/toast-tomates-mozzarella.webp', 'Toast garni de tomates cerises, mozzarella et roquette', 1600, 1028),
    photo('/photos/pizza-planche.webp', 'Pizza garnie d’aubergine et de poivron sur une planche en bois', 1600, 1066),
    photo('/photos/spaghetti.webp', 'Assiette de spaghetti persillés aux lardons', 1800, 1080),
    photo('/photos/bar-tireuses.webp', 'Le bar et ses tireuses à bière, un serveur au second plan', 1800, 1782),
    photo('/photos/pizzaiolo-four.webp', 'Le pizzaïolo enfourne une pizza dans le four', 1800, 1203),
    photo('/photos/pizza-jambon-cru.webp', 'Pizza au jambon cru, tomate et roquette', 1800, 1138),
    photo('/photos/salle-pizza.webp', 'Un homme en chemise blanche tient une pizza dans la salle, clients attablés', 510, 358),
    photo('/photos/pizza-anchois.webp', 'Pizza aux anchois, olives noires et épinards', 566, 500),
    photo('/photos/salle-comptoir.webp', 'La salle vue du comptoir, tables dressées', 640, 424),
    photo('/photos/escalope-salade.webp', 'Escalope panée avec salade et citron', 714, 723),
  ],
  valeurs: [
    'Cuisine familiale et traditionnelle',
    'Spécialités italiennes et cuisine française',
    'Le patron en salle, accueil sicilien',
    'Ouvert 7 jours sur 7, midi et soir',
  ],
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
// Contenu propre au gabarit « Guinguette », adapté à Don Dino. Tout ce qui n'est pas prouvé par dossier.md
// porte un drapeau `placeholder: true` et une marque visible là où il s'affiche.
// ---------------------------------------------------------------------------------------------

export type ObjetId = 'pizza' | 'fourchette' | 'verre' | 'parasol' | 'chope' | 'basilic';
export interface Objet { id: ObjetId; label: string; x: number; y: number; r: number; taille: number; mobile: boolean; mx?: number }
export interface Tirage { src: string; alt: string; x: number; y: number; r: number; legende: string; placeholder: boolean }
export interface AvisExemple { texte: string; note: number; r: number; placeholder: true }
export interface Picto { categorie: string; picto: ObjetId }

export const guinguette = {
  /** Titre et slogan du hero. Le slogan reprend la baseline du site actuel (réelle). */
  heroTitre: ['À table,', 'chez Dino'],
  slogan: { texte: 'spécialités italiennes et bonne ambiance', placeholder: false },
  /** Objets au trait du hero : position en % de la section, rotation en degrés. `mobile` = reste visible en 390 px. */
  objets: [
    { id: 'parasol', label: 'Parasol dessiné au trait', x: 6, y: 10, r: -12, taille: 150, mobile: true, mx: 4 },
    { id: 'verre', label: 'Verre à pied dessiné au trait', x: 84, y: 8, r: 10, taille: 110, mobile: false },
    { id: 'pizza', label: 'Pizza dessinée au trait', x: 10, y: 66, r: 8, taille: 140, mobile: true, mx: 40 },
    { id: 'fourchette', label: 'Fourchette dessinée au trait', x: 30, y: 78, r: -40, taille: 120, mobile: false },
    { id: 'chope', label: 'Chope de bière dessinée au trait', x: 80, y: 60, r: 14, taille: 140, mobile: true, mx: 74 },
    { id: 'basilic', label: 'Feuille de basilic dessinée au trait', x: 62, y: 82, r: -6, taille: 90, mobile: false },
  ] as Objet[],
  /** La table : 11 tirages à cadre blanc (photos du dossier), positions en % et rotation. */
  tirages: [
    { src: '/photos/pizza-planche.webp', alt: 'Pizza garnie d’aubergine et de poivron sur une planche en bois', x: 4, y: 6, r: -7, legende: 'Pizza sur planche', placeholder: false },
    { src: '/photos/pizzaiolo-four.webp', alt: 'Le pizzaïolo enfourne une pizza dans le four', x: 22, y: 2, r: 5, legende: 'Au four', placeholder: false },
    { src: '/photos/spaghetti.webp', alt: 'Assiette de spaghetti persillés aux lardons', x: 42, y: 4, r: -3, legende: 'Spaghetti', placeholder: false },
    { src: '/photos/bar-tireuses.webp', alt: 'Le bar et ses tireuses à bière, un serveur au second plan', x: 62, y: 3, r: 8, legende: 'Au bar', placeholder: false },
    { src: '/photos/moules-gratinees.webp', alt: 'Moules gratinées servies dans un plat blanc', x: 80, y: 8, r: -5, legende: 'Moules gratinées', placeholder: false },
    { src: '/photos/toast-tomates-mozzarella.webp', alt: 'Toast garni de tomates cerises, mozzarella et roquette', x: 2, y: 44, r: 6, legende: 'Tomates, mozzarella', placeholder: false },
    { src: '/photos/pizza-jambon-cru.webp', alt: 'Pizza au jambon cru, tomate et roquette', x: 20, y: 52, r: -9, legende: 'Jambon cru, roquette', placeholder: false },
    { src: '/photos/salle-comptoir.webp', alt: 'La salle vue du comptoir, tables dressées', x: 40, y: 48, r: 4, legende: 'La salle', placeholder: false },
    { src: '/photos/pizza-anchois.webp', alt: 'Pizza aux anchois, olives noires et épinards', x: 58, y: 54, r: -6, legende: 'Anchois, olives', placeholder: false },
    { src: '/photos/salle-pizza.webp', alt: 'Un homme en chemise blanche tient une pizza dans la salle, clients attablés', x: 78, y: 50, r: 7, legende: 'En salle', placeholder: false },
    { src: '/photos/escalope-salade.webp', alt: 'Escalope panée avec salade et citron', x: 12, y: 26, r: 3, legende: 'Escalope, salade', placeholder: false },
  ] as Tirage[],
  /** Pictogramme au trait par catégorie de carte. */
  pictos: [
    { categorie: 'Potages', picto: 'fourchette' },
    { categorie: 'Entrées', picto: 'basilic' },
    { categorie: 'Pâtes', picto: 'fourchette' },
    { categorie: 'Gratinés', picto: 'fourchette' },
    { categorie: 'Pizzas', picto: 'pizza' },
    { categorie: 'Salades', picto: 'basilic' },
    { categorie: 'Poissons', picto: 'verre' },
    { categorie: 'Veau', picto: 'fourchette' },
    { categorie: 'Bœuf', picto: 'fourchette' },
    { categorie: 'Sauces', picto: 'basilic' },
    { categorie: 'Agneau', picto: 'fourchette' },
  ] as Picto[],
  /** Catégories mises en avant sur l'accueil (extrait de la carte réelle) et nombre de plats montrés. */
  accueilCategories: ['Pizzas', 'Pâtes', 'Entrées chaudes'],
  accueilNombre: 6,
  /** Faits chiffrés du dossier (constantes). */
  faits: { ouvertDepuis: 2014, jours: 7, categories: 12 },
  /** Terrasse (mentionnée par le site actuel, sans détail) et accueil de groupes (réel). */
  terrasse: {
    connue: true,
    placeholder: false,
    points: ['Terrasse aux beaux jours', 'Parking extérieur privé', 'Parking à vélos', 'Accès personnes à mobilité réduite'],
  },
  groupes: {
    texte: 'Anniversaires, fêtes, mariages, cocktails : la maison se privatise et reçoit les groupes, sur devis.',
    occasions: ['Anniversaires', 'Fêtes', 'Mariages', 'Cocktails'],
  },
  /** Manifeste : faits du dossier. La phrase d'accroche du site actuel est citée comme telle. */
  manifeste: {
    titre: ['Une grande carte,', 'un patron joyeux'],
    motItalique: 'joyeux',
    texte: 'Pizzas, pâtes, viandes et poissons : une belle carte pour tous les goûts, et Dino en salle, toujours de bonne humeur. Le site de la maison l\'écrit lui-même : « Les meilleures de la région, paraît-il ! »',
  },
  finale: 'À table !',
};

/** Vrai si l'heure donnée (HH:MM) est dans un créneau. */
export const estOuvert = (h: Horaire, hhmm: string) => h.creneaux.some((c) => c.ouverture <= hhmm && hhmm < c.fermeture);
