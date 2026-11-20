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
export interface Avis { texte: string; auteur: string; source: string; date?: string; note?: number; placeholder: boolean }
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

const h = (ouverture: string, fermeture: string): Creneau => ({ ouverture, fermeture });
const service: Creneau[] = [h('12:00', '14:30'), h('18:15', '21:00')];

export const site: Restaurant = {
  slug: 'philfa',
  nom: 'PhilFa',
  baseline: 'Brasserie de centre-ville à Namur : cuisine revisitée, épices du monde.',
  description:
    'PhilFa, brasserie de centre-ville à Namur : cuisine revisitée et épices du monde, menu du moment, salle feutrée de 55 places et terrasse ombragée. Du mardi au samedi, midi et soir.',
  url: 'https://www.philfa.be',
  typeCuisine: 'Brasserie, cuisine française revisitée',
  adresse: { rue: 'Rue de Marchovelette', numero: '21/23', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.4626, lon: 4.8669 },
  telephone: '+32 81 22 61 11',
  email: { valeur: '', placeholder: true }, // l'adresse du site actuel est personnelle : jamais affichée
  reservation: { outil: 'Barestho', url: 'https://philfa.reservation.barestho.com/' },
  horaires: [
    { jour: 'lundi', creneaux: [], note: 'fermé' },
    { jour: 'mardi', creneaux: service },
    { jour: 'mercredi', creneaux: service },
    { jour: 'jeudi', creneaux: service },
    { jour: 'vendredi', creneaux: service },
    { jour: 'samedi', creneaux: service },
    { jour: 'dimanche', creneaux: [], note: 'fermé' },
  ],
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/RestaurantPhilFaNamur' },
    { nom: 'Instagram', url: 'https://www.instagram.com/philfa_restaurant' },
  ],
  carte: carteJson as Categorie[],
  menus: [
    {
      nom: 'Menu du moment, entrée et plat',
      prix: '35\u00a0€',
      description:
        'À double choix, il change toutes les 6 semaines. Entrée : saumon frais mariné, agrumes, menthe, citron et bâtonnets de poireaux crus, ou poêlée de champignons, beurre à l\u2019ail, fines herbes, mini croque-monsieur, huile de truffe. Plat : mijoté de blanc de volaille façon coq au vin, lardons et frites, ou dos de loup de mer, choucroute nature, sauce dijonnaise, purée de pomme de terre aux herbes.',
      placeholder: false,
    },
    {
      nom: 'Menu du moment, entrée, plat et dessert',
      prix: '41\u00a0€',
      description:
        'Le même menu, avec un dessert au choix : glace au chocolat goût Nutella et crème battue, ou sorbet banane, caramel et meringue d\u2019amandes caramélisées.',
      placeholder: false,
    },
  ],
  histoire: [
    'PhilFa est une brasserie de centre-ville, rue de Marchovelette à Namur. La maison a ouvert ses portes en 2013.',
    'En 2020, le lieu a été rénové et repensé avec son concept actuel : une salle au cadre feutré de 55 places, et 20 places en terrasse ombragée à l\u2019avant.',
    'À la carte, des plats classiques de brasserie, des salades, des viandes, des poissons et des plats selon les saisons, quelques plats végétariens, avec l\u2019originalité et les épices du monde.',
    'Fabian Rammeloo et Philippe Legrand tiennent la maison, avec leur équipe.',
  ],
  equipe: [
    { nom: 'Fabian Rammeloo', role: 'Patron, en cuisine', placeholder: false },
    { nom: 'Philippe Legrand', role: 'Patron, en cuisine', placeholder: false },
    { nom: 'Leo Afizi', role: 'Équipe', placeholder: false },
    { nom: 'Alicia Rammeloo', role: 'Équipe, fille de la maison', placeholder: false },
  ],
  avis: [
    {
      texte: 'Une cuisine accessible et bien exécutée, et une terrasse de style parisien.',
      auteur: 'Gault&Millau Belgique, 12/20, 1 toque',
      source: 'Fiche gaultmillau.be (paraphrase)',
      placeholder: false,
    },
  ],
  photos: [
    photo('/photos/salle-couloir.webp', 'Salle en longueur, mur sombre et banquettes roses, vue vers la vitrine', 1440, 1920),
    photo('/photos/salle-vitrine.webp', 'Salle vue depuis le fond, baie vitrée, tables rondes, hélice décorative au mur', 960, 540),
    photo('/photos/salle-table-longue.webp', 'Salle en profondeur, longue table, suspensions, fresque murale', 1200, 1600),
    photo('/photos/salle-lampe-table.webp', 'Table dressée, lampe, salle au fond, plantes', 1200, 1600),
    photo('/photos/table-plantes.webp', 'Table dressée devant un mur végétal et des étagères de plantes', 1536, 2048),
    photo('/photos/detail-salle-plante.webp', 'Détail de salle : table ronde, chaises rose et ocre, branche au premier plan', 1536, 2048),
    photo('/photos/table-niches-colorees.webp', 'Table pour deux sous des niches lumineuses colorées', 1080, 1206),
    photo('/photos/terrasse.webp', 'Terrasse à l\u2019avant, chaises cannées et tables rondes', 1440, 1800),
    photo('/photos/facade.webp', 'Façade et enseigne de nuit, rue de Marchovelette', 400, 494),
    photo('/photos/bar-bouteilles.webp', 'Comptoir et bouteilles de spiritueux, gins et rhums', 1200, 1600),
    photo('/photos/etagere-spiritueux.webp', 'Étagère ronde de rhums et de gins', 1356, 1600),
    photo('/photos/bar-cave-vitree.webp', 'Bar en bois, cave à vins vitrée et hauts tabourets', 1440, 1920),
  ],
  valeurs: ['Cuisine revisitée', 'Plats selon les saisons', 'Épices du monde', 'Terrasse ombragée à l\u2019avant'],
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
// Contenu propre au gabarit « Guinguette », adapté à PhilFa. Ce que le dossier ne prouve pas porte `placeholder: true`.
// ---------------------------------------------------------------------------------------------

export type ObjetId = 'frites' | 'fourchette' | 'verre' | 'parasol' | 'bouteille' | 'citron';
export interface Objet { id: ObjetId; label: string; x: number; y: number; r: number; taille: number; mobile: boolean; mx?: number }
export interface Tirage { src: string; alt: string; x: number; y: number; r: number; legende: string; placeholder: boolean }
export interface AvisExemple { texte: string; note: number; r: number; placeholder: true }
export interface Picto { categorie: string; picto: ObjetId }

const T = (src: string, legende: string, x: number, y: number, r: number): Tirage => ({ src, alt: photoDe(src).alt, x, y, r, legende, placeholder: false });

export const guinguette = {
  heroTitre: ['À table', 'chez PhilFa'],
  slogan: { texte: 'cuisine revisitée, épices du monde', placeholder: false },
  objets: [
    { id: 'parasol', label: 'Parasol dessiné au trait', x: 6, y: 10, r: -12, taille: 150, mobile: true, mx: 4 },
    { id: 'verre', label: 'Verre à pied dessiné au trait', x: 84, y: 8, r: 10, taille: 110, mobile: false },
    { id: 'frites', label: 'Cornet de frites dessiné au trait', x: 10, y: 66, r: 8, taille: 130, mobile: true, mx: 40 },
    { id: 'fourchette', label: 'Fourchette dessinée au trait', x: 30, y: 78, r: -40, taille: 120, mobile: false },
    { id: 'bouteille', label: 'Bouteille dessinée au trait', x: 80, y: 60, r: 14, taille: 140, mobile: true, mx: 74 },
    { id: 'citron', label: 'Citron coupé dessiné au trait', x: 62, y: 82, r: -6, taille: 90, mobile: false },
  ] as Objet[],
  /** La table : 12 tirages carrés recadrés des 12 photos du restaurant. */
  tirages: [
    T('/photos/salle-couloir.webp', 'Le couloir de la salle', 4, 6, -7),
    T('/photos/table-plantes.webp', 'Le mur de plantes', 22, 2, 5),
    T('/photos/terrasse.webp', 'La terrasse', 42, 4, -3),
    T('/photos/bar-bouteilles.webp', 'Au comptoir', 62, 3, 8),
    T('/photos/table-niches-colorees.webp', 'Les niches colorées', 80, 8, -5),
    T('/photos/salle-lampe-table.webp', 'Une table, une lampe', 2, 44, 6),
    T('/photos/etagere-spiritueux.webp', 'Gins et rhums', 20, 52, -9),
    T('/photos/salle-vitrine.webp', 'La salle et sa baie vitrée', 40, 48, 4),
    T('/photos/detail-salle-plante.webp', 'Chaises rose et ocre', 58, 54, -6),
    T('/photos/facade.webp', 'La façade, rue de Marchovelette', 78, 50, 7),
    T('/photos/salle-table-longue.webp', 'La longue table', 12, 26, 3),
    T('/photos/bar-cave-vitree.webp', 'La cave vitrée', 68, 28, -4),
  ],
  pictos: [
    { categorie: 'Assiettes', picto: 'frites' },
    { categorie: 'Les salades', picto: 'citron' },
    { categorie: 'Les poissons', picto: 'verre' },
    { categorie: 'Les viandes', picto: 'fourchette' },
    { categorie: 'Plat végétarien', picto: 'citron' },
    { categorie: 'Pour les bambins', picto: 'parasol' },
  ] as Picto[],
  /** Avis d'exemple : sans nom ni source, étiquetés « Exemple d'avis » à l'écran (aucun avis vérifié au dossier). */
  avisExemples: [
    { texte: 'On est venus pour le tartare, on est restés pour la salle et son éclairage.', note: 5, r: -4, placeholder: true },
    { texte: 'Une terrasse à l\u2019ombre en plein centre, un service souriant, des assiettes généreuses.', note: 5, r: 3, placeholder: true },
    { texte: 'Le menu du moment nous a réconciliés avec les classiques de brasserie.', note: 5, r: -2, placeholder: true },
  ] as AvisExemple[],
  terrasse: {
    connue: true,
    placeholder: false,
    texte: 'À l\u2019avant du restaurant, vingt places en terrasse ombragée, dans un style qui rappelle les brasseries parisiennes. Les animaux sont acceptés.',
    points: ['20 places en terrasse', 'ombragée, à l\u2019avant', 'style parisien', 'animaux acceptés'],
  },
  salle: { places: 55, texte: 'Salle de cinquante-cinq places au cadre feutré : banquettes roses, chaises ocre, mur de plantes, niches lumineuses colorées. Air conditionné.' },
  fermeture: 'Fermé le 11 novembre',
  manifeste: {
    titre: ['Cuisine revisitée,', 'épices du monde'],
    motItalique: 'épices du monde',
    texte: 'Des classiques de brasserie, des salades, des viandes, des poissons et des plats selon les saisons, avec l\u2019originalité et les épices du monde.',
  },
  finale: 'À table !',
};

/** Vrai si l'heure donnée (HH:MM) est dans un créneau. */
export const estOuvert = (h: Horaire, hhmm: string) => h.creneaux.some((c) => c.ouverture <= hhmm && hhmm < c.fermeture);
