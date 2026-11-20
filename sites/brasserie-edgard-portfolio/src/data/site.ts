// Tout le contenu du site vit ici. Source : data/restaurants/<slug>/donnees.json et photos/index.json.
// Les trous des données réelles sont comblés par des données fictives marquées `placeholder: true` :
// un gabarit les affiche, la revue les signale, le client les remplace.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean }
export interface Suggestion { nom: string; prix: string }
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
  /** Précision sur la cuisine (dossier.md : fermée de 15 h à 18 h en semaine). */
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
import suggestionsJson from './suggestions.json';

const P = (n: string, alt: string, largeur: number, hauteur: number): Photo => ({ src: `/photos/${n}.webp`, alt, largeur, hauteur, placeholder: false });

const tous = (): Horaire[] =>
  (['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] as Jour[]).map((jour) => ({
    jour,
    creneaux: [{ ouverture: '10:00', fermeture: '22:30' }],
    note: ['samedi', 'dimanche'].includes(jour) ? 'cuisine continue' : 'cuisine fermée de 15 h à 18 h',
  }));

export const site: Restaurant = {
  slug: 'brasserie-edgard',
  nom: 'Brasserie Edgard',
  baseline: 'Votre brasserie restaurant à Namur',
  description:
    'Brasserie Edgard à Saint-Servais, Namur : carpaccios, moules de Zélande, brochettes géantes et pâtes fraîches. Ouvert tous les jours.',
  url: 'https://www.brasserieedgard.be',
  typeCuisine: 'Brasserie belge et française',
  adresse: { rue: 'Chaussée de Waterloo', numero: '473', cp: '5002', commune: 'Saint-Servais (Namur)', pays: 'BE' },
  geo: { lat: 50.472276, lon: 4.8331165 },
  telephone: '+32 81 46 08 00',
  email: { valeur: 'info@brasserieedgard.be', placeholder: false }, // restaurants.json ; le site précise que les réservations par e-mail ne sont pas enregistrées
  reservation: { outil: 'Barestho', url: 'https://brasserieedgard.reservation.barestho.com/' },
  horaires: tous(),
  reseaux: [{ nom: 'Facebook', url: 'https://www.facebook.com/brasserieedgardnamur/' }],
  carte: carteJson as Categorie[],
  menus: [
    { nom: 'Plat du jour', prix: '14,50 €', description: 'Du lundi au vendredi, le midi.', placeholder: false },
    { nom: 'Lunch : plat et dessert', prix: '21,50 €', description: 'Du lundi au vendredi, le midi.', placeholder: false },
  ],
  histoire: [], // inconnue au dossier : aucune histoire inventée, la page « La salle » parle du lieu
  equipe: [], // seul « Titi » est cité (cassolet), à confirmer : pas de section équipe
  avis: [], // aucun extrait d'avis au dossier
  photos: [
    P('facade', 'Façade de la brasserie de nuit, enseigne lumineuse Mr Edgard, Chaussée de Waterloo', 1800, 1095),
    P('salle-baies-vitrees', 'Salle avec grandes baies cintrées et clients (pose longue)', 1000, 667),
    P('salle-bar', 'Salle et comptoir-bar en bois sculpté', 1000, 667),
    P('salle-comptoir', 'Comptoir et salle vus depuis l’entrée', 1000, 660),
    P('comptoir-bois-sculpte', 'Comptoir en bois sculpté, salle en arrière-plan', 1000, 849),
    P('salle-tables-dressees', 'Salle, tables dressées et banquettes cuir', 1000, 667),
    P('salle-horloge', 'Salle, tables dressées, horloge murale', 1000, 667),
    P('mur-bois-passe-plat', 'Mur de bois sculpté avec ouverture sur la salle', 1000, 667),
    P('salle-bar-fond', 'Salle et bar au fond', 1000, 667),
    P('salle-veranda', 'Espace lumineux côté terrasse couverte', 1000, 667),
    P('salle-banquettes', 'Salle, banquettes et mur de bois', 1000, 667),
    P('table-mosaique', 'Table et panneau décoratif vert', 750, 1000),
    P('verres-table', 'Verres sur table dressée, mur de bois flou', 1000, 667),
    P('table-fauteuils', 'Table et fauteuils cuir', 1000, 641),
    P('terrasse-parasols', 'Terrasse couverte, parasols', 1000, 670),
    P('terrasse-tables', 'Terrasse, tables sous parasols', 1000, 658),
    P('terrasse-exterieur', 'Terrasse extérieure vue de la rue', 1000, 562),
    P('horloge-mosaique', 'Horloge murale en mosaïque', 667, 1000),
    P('lampes', 'Petites lampes sur le rebord d’une baie', 1000, 831),
    P('coupelles-aperitif', 'Coupelles d’olives et de grignotages', 1000, 667),
    P('plat-tartare', 'Tartare de bœuf avec frites, sur plat rectangulaire', 1000, 667),
    P('plat-volaille-pates', 'Assiette de viande grillée et pâtes au parmesan', 1000, 1000),
    P('plat-salade', 'Grande salade garnie', 1000, 667),
    P('plat-burger', 'Burger et seau de frites', 1000, 667),
    P('plat-viande-croquette', 'Assiette de viande et croquette, jus dressé', 1000, 1000),
    P('dessert-coupe-glacee', 'Coupe glacée aux fraises et chantilly', 749, 1000),
  ],
  valeurs: ['Produits de qualité', 'Terrasse en été'],
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

// ---------------------------------------------------------------------------------------------
// Contenu propre au gabarit « Guinguette », adapté à Brasserie Edgard. Tout ce qui n'est pas prouvé par
// dossier.md porte `placeholder: true` et une marque visible là où il s'affiche.
// ---------------------------------------------------------------------------------------------

export type ObjetId = 'frites' | 'fourchette' | 'verre' | 'parasol' | 'bouteille' | 'citron';
export interface Objet { id: ObjetId; label: string; x: number; y: number; r: number; taille: number; mobile: boolean; mx?: number }
export interface Tirage { src: string; alt: string; x: number; y: number; r: number; legende: string; placeholder: boolean }
export interface Picto { categorie: string; picto: ObjetId }

export const guinguette = {
  /** Titre du hero (nom de l'enseigne) et slogan : baseline du site actuel (dossier.md, « Identité »). */
  heroTitre: ['À table,', 'chez Edgard'],
  slogan: { texte: 'votre brasserie à Saint-Servais', placeholder: false },
  objets: [
    { id: 'parasol', label: 'Parasol dessiné au trait', x: 6, y: 10, r: -12, taille: 150, mobile: true, mx: 4 },
    { id: 'verre', label: 'Verre à pied dessiné au trait', x: 84, y: 8, r: 10, taille: 110, mobile: false },
    { id: 'frites', label: 'Cornet de frites dessiné au trait', x: 10, y: 66, r: 8, taille: 130, mobile: true, mx: 40 },
    { id: 'fourchette', label: 'Fourchette dessinée au trait', x: 30, y: 78, r: -40, taille: 120, mobile: false },
    { id: 'bouteille', label: 'Bouteille dessinée au trait', x: 80, y: 60, r: 14, taille: 140, mobile: true, mx: 74 },
    { id: 'citron', label: 'Citron coupé dessiné au trait', x: 62, y: 82, r: -6, taille: 90, mobile: false },
  ] as Objet[],
  /** La table : 12 tirages carrés (photos réelles, légendes tirées du champ `sujet` de photos/index.json). */
  tirages: [
    { src: '/photos/terrasse-parasols.webp', alt: 'Terrasse couverte, parasols', x: 4, y: 6, r: -7, legende: 'La terrasse couverte', placeholder: false },
    { src: '/photos/plat-burger.webp', alt: 'Burger et seau de frites', x: 22, y: 2, r: 5, legende: 'Burger et frites', placeholder: false },
    { src: '/photos/salle-baies-vitrees.webp', alt: 'Salle avec grandes baies cintrées et clients', x: 42, y: 4, r: -3, legende: 'Les baies cintrées', placeholder: false },
    { src: '/photos/plat-tartare.webp', alt: 'Tartare de bœuf avec frites, sur plat rectangulaire', x: 62, y: 3, r: 8, legende: 'Tartare et frites', placeholder: false },
    { src: '/photos/comptoir-bois-sculpte.webp', alt: 'Comptoir en bois sculpté, salle en arrière-plan', x: 80, y: 8, r: -5, legende: 'Le comptoir', placeholder: false },
    { src: '/photos/dessert-coupe-glacee.webp', alt: 'Coupe glacée aux fraises et chantilly', x: 2, y: 44, r: 6, legende: 'Coupe glacée', placeholder: false },
    { src: '/photos/salle-tables-dressees.webp', alt: 'Salle, tables dressées et banquettes cuir', x: 20, y: 52, r: -9, legende: 'Tables dressées', placeholder: false },
    { src: '/photos/plat-volaille-pates.webp', alt: 'Assiette de viande grillée et pâtes au parmesan', x: 40, y: 48, r: 4, legende: 'Viande et pâtes', placeholder: false },
    { src: '/photos/horloge-mosaique.webp', alt: 'Horloge murale en mosaïque', x: 58, y: 54, r: -6, legende: 'L’horloge en mosaïque', placeholder: false },
    { src: '/photos/terrasse-tables.webp', alt: 'Terrasse, tables sous parasols', x: 78, y: 50, r: 7, legende: 'Sous les parasols', placeholder: false },
    { src: '/photos/coupelles-aperitif.webp', alt: 'Coupelles d’olives et de grignotages', x: 12, y: 26, r: 3, legende: 'À l’apéro', placeholder: false },
    { src: '/photos/lampes.webp', alt: 'Petites lampes sur le rebord d’une baie', x: 68, y: 28, r: -4, legende: 'Les petites lampes', placeholder: false },
  ] as Tirage[],
  pictos: [
    { categorie: 'Entrées', picto: 'citron' },
    { categorie: 'Le coin du boucher', picto: 'fourchette' },
    { categorie: 'Le coin du poissonnier', picto: 'citron' },
    { categorie: 'Pâtes', picto: 'fourchette' },
    { categorie: 'Salades', picto: 'citron' },
    { categorie: 'Enfants', picto: 'frites' },
    { categorie: 'Desserts', picto: 'parasol' },
  ] as Picto[],
  /** Suggestions du moment (site actuel, page Lunch et Suggestions, relevé du 20/11). */
  suggestions: suggestionsJson as Suggestion[],
  /** Menu groupe (site actuel) : table de plus de 10 personnes, maximum 16. */
  groupe: {
    min: 10,
    max: 16,
    menus: [
      { nom: 'Entrée, plat et dessert', prix: '49 €' },
      { nom: 'Entrée et plat', prix: '39 €' },
      { nom: 'Plat et dessert', prix: '34 €' },
    ],
  },
  emballage: 'Supplément emballage de 0,60 € sur les plats à emporter (carte du site actuel).',
  terrasse: { connue: true, texte: 'Terrasse couverte, ouverte en été.' },
  manifeste: {
    titre: ['Pour un petit creux', 'ou une grande faim'],
    motItalique: 'grande faim',
    texte: 'Un dîner d’affaires, un repas en famille ou un moment entre amis : du carpaccio aux moules de Zélande, des brochettes géantes aux pâtes fraîches, dans un cadre contemporain.',
  },
  finale: 'À table !',
};

/** Vrai si l'heure donnée (HH:MM) est dans un créneau. */
export const estOuvert = (h: Horaire, hhmm: string) => h.creneaux.some((c) => c.ouverture <= hhmm && hhmm < c.fermeture);
