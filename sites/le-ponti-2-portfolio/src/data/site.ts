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
const midiSoir: Creneau[] = [{ ouverture: '11:30', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '21:30' }];

export const site: Restaurant = {
  slug: 'le-ponti-2',
  nom: 'Le Ponti 2',
  baseline: 'Restaurant italien, esprit familial.',
  description:
    'Le Ponti 2, restaurant italien et pizzeria à Jambes (Namur) : vingt pizzas, pâtes, escalopes de veau et desserts maison, midi et soir du mardi au dimanche.',
  url: 'https://www.leponti2.be',
  typeCuisine: 'Cuisine italienne, pizzeria',
  adresse: { rue: 'Avenue du Bourgmestre Jean Materne', numero: '87', cp: '5100', commune: 'Jambes (Namur)', pays: 'BE' },
  geo: { lat: 50.4573956, lon: 4.8702847 },
  telephone: '+32 81 30 40 75',
  email: { valeur: 'leponti2@hotmail.be', placeholder: false },
  reservation: { outil: 'Barestho', url: 'https://leponti2.reservation.barestho.com/?lng=fr' },
  horaires: [
    { jour: 'lundi', creneaux: [], note: 'fermé' },
    { jour: 'mardi', creneaux: midiSoir },
    { jour: 'mercredi', creneaux: midiSoir },
    { jour: 'jeudi', creneaux: midiSoir },
    { jour: 'vendredi', creneaux: midiSoir },
    { jour: 'samedi', creneaux: midiSoir },
    { jour: 'dimanche', creneaux: midiSoir },
  ],
  reseaux: [{ nom: 'Facebook', url: 'https://www.facebook.com/leponti2/' }],
  carte: carteJson as Categorie[],
  menus: [
    {
      nom: 'Menu 3 services',
      prix: '40 €',
      description:
        'Entrée : scampis à l’ail (5 pièces) ou croquettes au fromage. Plat : steak, frites, salade, crème au poivre concassé, ou pizza au choix, ou escalopes de veau à la carte (+ 7 €). Dessert : tiramisu aux fruits rouges ou mousse au chocolat.',
      placeholder: false,
    },
  ],
  // Histoire, fondateurs et année d'ouverture : inconnus au dossier. Seuls des faits prouvés sont écrits ici.
  histoire: [
    'Le Ponti 2 est un restaurant italien et pizzeria installé avenue du Bourgmestre Jean Materne, à Jambes, dans l’agglomération de Namur. Son site le résume d’une phrase : restaurant italien, esprit familial.',
    'La carte tient en grands classiques : vingt pizzas, treize sauces de pâtes, des escalopes de veau panées, gratinées ou en saltimbocca à la romana, quelques viandes et des salades repas.',
    'Les desserts sont faits maison : tiramisu aux fruits rouges, mousse au chocolat, sabayon minute servi chaud sur glace vanille. Côté verre, des cocktails signature, dont le Spritz Ponti, et des digestifs italiens.',
    'La maison est ouverte du mardi au dimanche, midi et soir, et ferme le lundi. Une terrasse accueille les clients lorsque la météo le permet.',
  ],
  equipe: [],
  avis: [],
  photos: [
    photo('/photos/pates.webp', 'Assiettes de pâtes à la tomate, au pesto et aux scampis sur une table avec verres et bouteille de vin', 1448, 1086),
    photo('/photos/pizza.webp', 'Pizza à la roquette et aux copeaux de parmesan sur une assiette blanche, comptoir de cuisine', 1448, 1086),
    photo('/photos/escalopes.webp', 'Escalope gratinée sur une assiette bleue, plats en préparation en arrière-plan', 1448, 1086),
    photo('/photos/facade.webp', 'Façade du restaurant de nuit, enseigne lumineuse Le Ponti 2 Restaurant', 1800, 2400),
  ],
  valeurs: ['Fait maison (desserts)', 'Esprit familial'],
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
// Contenu propre au gabarit « Guinguette », adapté au Ponti. Tout ce qui n'est pas prouvé par dossier.md porte un
// drapeau `placeholder: true` et une marque visible là où il s'affiche.
// ---------------------------------------------------------------------------------------------

export type ObjetId = 'pizza' | 'fourchette' | 'verre' | 'parasol' | 'bouteille' | 'citron' | 'pont';
export interface Objet { id: ObjetId; label: string; x: number; y: number; r: number; taille: number; mobile: boolean; mx?: number }
export interface Tirage { src: string; alt: string; x: number; y: number; r: number; legende: string; placeholder: boolean }
export interface Incontournable { categorie: string; nom: string; description: string; prix: string; r: number }
export interface Picto { categorie: string; picto: ObjetId }

const t = (n: string, alt: string, x: number, y: number, r: number, legende: string): Tirage => ({ src: `/photos/${n}.webp`, alt, x, y, r, legende, placeholder: false });

export const guinguette = {
  heroTitre: ['À table,', 'en famille'],
  /** Slogan réel : baseline du site actuel. */
  slogan: { texte: 'restaurant italien, esprit familial', placeholder: false },
  objets: [
    { id: 'parasol', label: 'Parasol dessiné au trait', x: 6, y: 10, r: -12, taille: 150, mobile: true, mx: 4 },
    { id: 'verre', label: 'Verre à pied dessiné au trait', x: 84, y: 8, r: 10, taille: 110, mobile: false },
    { id: 'pizza', label: 'Pizza dessinée au trait', x: 10, y: 66, r: 8, taille: 130, mobile: true, mx: 40 },
    { id: 'fourchette', label: 'Fourchette dessinée au trait', x: 30, y: 78, r: -40, taille: 120, mobile: false },
    { id: 'bouteille', label: 'Bouteille dessinée au trait', x: 80, y: 60, r: 14, taille: 140, mobile: true, mx: 74 },
    { id: 'pont', label: 'Pont à trois arches dessiné au trait, comme sur le logo', x: 62, y: 80, r: -6, taille: 110, mobile: false },
  ] as Objet[],
  /** 12 recadrages carrés des quatre photos du restaurant (aucune photo libre) : légendes descriptives. */
  tirages: [
    t('pizza-roquette', 'Pizza à la roquette et aux copeaux de parmesan', 4, 6, -7, 'Pizza roquette'),
    t('facade-enseigne', 'Enseigne lumineuse Le Ponti 2 Restaurant, de nuit', 22, 2, 5, "L'enseigne"),
    t('pates-assiette', 'Assiette de spaghettis à la tomate et au basilic', 42, 4, -3, 'Pâtes à la tomate'),
    t('escalope-gratinee', 'Escalope gratinée sur une assiette bleue', 62, 3, 8, 'Escalope gratinée'),
    t('pizza-comptoir', 'Pizza à la roquette posée sur le comptoir de cuisine', 80, 8, -5, 'Au comptoir'),
    t('pates-table', 'Pâtes sur une table dressée, verres à pied en arrière-plan', 2, 44, 6, 'À table'),
    t('escalope-salades', 'Salades et plats en préparation au passe', 20, 52, -9, 'Au passe'),
    t('facade-rue', 'Façade du restaurant de nuit, vue depuis la rue', 40, 48, 4, 'La façade'),
    t('pizza-fond', 'Plusieurs pizzas alignées sur le comptoir', 58, 54, -6, 'Une fournée'),
    t('pates-vin', 'Panier de pain et bouteille de vin sur la table', 78, 50, 7, 'Pain et vin'),
    t('escalope-table', 'Plats alignés sur une table, escalope au premier plan', 12, 26, 3, "L'escalope"),
    t('facade-bas', 'Façade de nuit, enseigne et vitrines éclairées', 68, 28, -4, 'La soirée'),
  ] as Tirage[],
  pictos: [
    { categorie: 'Entrées', picto: 'citron' },
    { categorie: 'Pâtes', picto: 'fourchette' },
    { categorie: 'Grandes salades', picto: 'citron' },
    { categorie: 'Pizzas', picto: 'pizza' },
    { categorie: 'Suppléments', picto: 'pizza' },
    { categorie: 'Escalopes', picto: 'fourchette' },
    { categorie: 'Viandes', picto: 'fourchette' },
    { categorie: 'Douceurs', picto: 'parasol' },
    { categorie: 'Coupes', picto: 'parasol' },
    { categorie: 'Cocktails', picto: 'verre' },
    { categorie: 'Digestifs', picto: 'bouteille' },
  ] as Picto[],
  /** Catégories mises en avant sur l'accueil (extraits de la vraie carte) et nombre de lignes montrées. */
  accueilCategories: [
    { debut: 'Pizzas', max: 7 },
    { debut: 'Pâtes', max: 7 },
    { debut: 'Escalopes de veau panées', max: 6 },
  ],
  /** Remplace la section « avis » (aucun avis en texte au dossier) : quatre plats et verres de la carte réelle. */
  incontournables: [
    { categorie: 'Pizzas', nom: 'Maison', description: 'tomate, mozzarella, origan, ail, aubergines, scampis, roquette, parmesan', prix: '23 €', r: -4 },
    { categorie: 'Escalopes de veau', nom: 'Saltimbocca à la romana', description: 'copeaux de parmesan, jambon serrano, feuille de sauge, jus de veau réduit au vin blanc', prix: '30 €', r: 3 },
    { categorie: 'Douceurs maison', nom: 'Tiramisu fruits rouges', description: 'revisité, fait maison : mascarpone, fruits rouges, cacao', prix: '12 €', r: -2 },
    { categorie: 'Cocktails signature', nom: 'Spritz Ponti', description: 'Aperol, prosecco, orange', prix: '12 €', r: 5 },
  ] as Incontournable[],
  /** Menu 3 services : constantes du dossier (jamais calculées). */
  menuTrois: { services: 3, prix: '40 €' },
  terrasse: {
    connue: true,
    placeholder: false,
    texte: 'Une terrasse accueille les clients lorsque la météo le permet.',
    aConfirmer: 'Nombre de places et jours d’ouverture de la terrasse : à confirmer auprès du restaurant.',
  },
  manifeste: {
    titre: ['Simple, généreux', 'et familial'],
    motItalique: 'familial',
    texte: 'Vingt pizzas, des pâtes, des escalopes de veau et des desserts faits maison : une cuisine italienne de quartier, dans un esprit familial.',
  },
  finale: 'Buon appetito !',
};

/** Vrai si l'heure donnée (HH:MM) est dans un créneau. */
export const estOuvert = (h: Horaire, hhmm: string) => h.creneaux.some((c) => c.ouverture <= hhmm && hhmm < c.fermeture);
