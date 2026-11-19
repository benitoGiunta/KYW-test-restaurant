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

const photo = (src: string, alt: string, largeur: number, hauteur: number): Photo => ({ src, alt, largeur, hauteur, placeholder: false });
const H = [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '18:00', fermeture: '22:30' }];

export const site: Restaurant = {
  slug: 'wok-de-jin',
  nom: 'Wok de Jin',
  baseline: 'Buffet à volonté asiatique. Toutes vos envies à la même table.',
  description:
    'Wok de Jin, buffet asiatique à volonté à Jambes, Namur : sushis, wok et teppanyaki préparés devant vous, salle de jeux pour les enfants, grandes tablées.',
  url: 'https://wokdejin.com',
  typeCuisine: 'Buffet asiatique à volonté, wok, sushi, teppanyaki',
  adresse: { rue: 'Avenue du Bourgmestre Jean Materne', numero: '219', cp: '5100', commune: 'Jambes', pays: 'BE' },
  geo: { lat: 50.4547, lon: 4.8782 }, // approximatif (rue, dossier.md)
  telephone: '+32 81 30 68 88',
  email: { valeur: '', placeholder: true }, // inconnu au dossier : jamais affiché
  reservation: { outil: 'Rendez-vous en ligne', url: 'https://wokdejin.com/' },
  horaires: [
    { jour: 'lundi', creneaux: H },
    { jour: 'mardi', creneaux: [], note: 'fermé' },
    { jour: 'mercredi', creneaux: H },
    { jour: 'jeudi', creneaux: H },
    { jour: 'vendredi', creneaux: H },
    { jour: 'samedi', creneaux: H },
    { jour: 'dimanche', creneaux: H },
  ],
  reseaux: [{ nom: 'Google Maps', url: 'https://maps.app.goo.gl/Je47suHkwBY6jtC66' }],
  carte: [
    {
      categorie: 'Le buffet à volonté',
      plats: [
        { nom: 'Buffets chaud et froid', description: 'à volonté, midi et soir', prix: null, placeholder: false },
        { nom: 'Sushis, nigiris et makis', description: 'créations de la maison', prix: null, placeholder: false },
        { nom: 'Poissons et fruits de mer', description: 'bacs frais au buffet', prix: null, placeholder: false },
        { nom: 'Wok et teppanyaki', description: 'ingrédients au choix, cuisinés devant vous', prix: null, placeholder: false },
        { nom: 'Desserts', description: 'macarons, pâtisseries', prix: null, placeholder: false },
      ],
    },
  ],
  menus: [
    { nom: 'Enfants', prix: '', description: '0 à 3 ans : gratuit. 4 à 11 ans : demi-tarif. Sur présentation de la carte d’identité.', placeholder: false },
    { nom: 'Anniversaire', prix: '−50 %', description: 'Sur le buffet, hors boissons, sur présentation d’une pièce d’identité, à plus ou moins trois jours de la date.', placeholder: false },
    { nom: 'Réveillon du jeudi 31 décembre 2026', prix: '80 €', description: 'Boissons comprises, dès 18:00, avec DJ.', placeholder: false },
  ],
  histoire: [], // inconnue au dossier : la page « La maison » décrit la salle, pas une histoire
  equipe: [],
  avis: [], // aucun avis vérifié au dossier : section retirée
  photos: [
    photo('/photos/sashimi-saumon.webp', 'Assiette de sashimi de saumon', 1440, 1440),
    photo('/photos/chef-wok.webp', 'Cuisinier au wok avec flamme', 1170, 870),
    photo('/photos/chef-teppanyaki.webp', 'Cuisinier à la plaque teppanyaki', 1170, 1516),
    photo('/photos/sushis-tapis.webp', 'Tapis de sushis du buffet', 1440, 1440),
    photo('/photos/makis-crevette.webp', 'Makis et rolls à la crevette sur plateau noir', 960, 960),
    photo('/photos/buffet-homards.webp', 'Homards et huîtres au buffet', 720, 960),
    photo('/photos/buffet-fruits-de-mer.webp', 'Bacs de poissons et fruits de mer frais au buffet', 720, 960),
    photo('/photos/desserts-macarons.webp', 'Buffet de desserts : macarons, pâtisseries, chocolats', 1170, 1440),
    photo('/photos/wok-ingredients.webp', 'Ingrédients à composer pour le wok : viandes et légumes', 720, 960),
    photo('/photos/salle-tables-rouges.webp', 'Salle avec chaises rouges et tables rondes', 1800, 1350),
    photo('/photos/salle-large.webp', 'Vue large de la salle, chaises rouges, décor chinois', 1800, 1350),
    photo('/photos/table-dressee.webp', 'Table dressée au premier plan, salle rouge et noire', 1800, 1350),
    photo('/photos/salle-de-jeux.webp', 'Salle de jeux pour enfants', 1440, 1440),
    photo('/photos/salle-buffet.webp', 'La salle et l’îlot du buffet', 1360, 1020),
    photo('/photos/cocktail-vert.webp', 'Boisson colorée dans un verre à pied', 765, 1020),
    photo('/photos/reveillon-desserts.webp', 'Desserts du buffet de réveillon', 1600, 1200),
    photo('/photos/reveillon-sapin.webp', 'Fruits en forme de sapin sur une ardoise', 900, 1600),
    photo('/photos/reveillon-roti.webp', 'Cochon de lait rôti, dinde et escargots', 1600, 1200),
    photo('/photos/reveillon-sushis.webp', 'Plateaux de sushis et sashimi du réveillon', 1600, 1200),
  ],
  valeurs: ['Buffet à volonté', 'Wok et teppanyaki devant vous', 'Grandes tablées', 'Salle de jeux pour les enfants'],
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
// Contenu propre au gabarit « Guinguette » adapté à Wok de Jin. Tout est prouvé par dossier.md ; le reste est `null`
// ou absent (aucun avis, aucune histoire, aucun e-mail).
// ---------------------------------------------------------------------------------------------

export type ObjetId = 'bol' | 'baguettes' | 'lanterne' | 'sushi' | 'theiere' | 'wok';
export interface Objet { id: ObjetId; label: string; x: number; y: number; r: number; taille: number; mobile: boolean; mx?: number }
export interface Tirage { src: string; alt: string; x: number; y: number; r: number; legende: string; placeholder: boolean }
export interface Picto { categorie: string; picto: ObjetId }
export interface Tarif { moment: string; prix: string }

export const guinguette = {
  heroTitre: ['Buffet asiatique', 'à volonté'],
  slogan: { texte: 'Toutes vos envies à la même table', placeholder: false },
  objets: [
    { id: 'lanterne', label: 'Lanterne dessinée au trait', x: 6, y: 10, r: -12, taille: 150, mobile: true, mx: 4 },
    { id: 'theiere', label: 'Théière dessinée au trait', x: 84, y: 8, r: 10, taille: 120, mobile: false },
    { id: 'bol', label: 'Bol fumant dessiné au trait', x: 10, y: 66, r: 8, taille: 130, mobile: true, mx: 40 },
    { id: 'baguettes', label: 'Baguettes dessinées au trait', x: 30, y: 78, r: -30, taille: 120, mobile: false },
    { id: 'wok', label: 'Wok dessiné au trait', x: 80, y: 60, r: 14, taille: 140, mobile: true, mx: 74 },
    { id: 'sushi', label: 'Nigiri dessiné au trait', x: 62, y: 82, r: -6, taille: 100, mobile: false },
  ] as Objet[],
  tirages: [
    { src: '/photos/sashimi-saumon.webp', alt: 'Assiette de sashimi de saumon', x: 2, y: 4, r: -7, legende: 'Sashimi de saumon', placeholder: false },
    { src: '/photos/chef-wok.webp', alt: 'Cuisinier au wok avec flamme', x: 21, y: 2, r: 5, legende: 'Au wok, devant vous', placeholder: false },
    { src: '/photos/sushis-tapis.webp', alt: 'Tapis de sushis du buffet', x: 40, y: 5, r: -3, legende: 'Le tapis de sushis', placeholder: false },
    { src: '/photos/makis-crevette.webp', alt: 'Makis et rolls à la crevette sur plateau noir', x: 60, y: 3, r: 8, legende: 'Makis à la crevette', placeholder: false },
    { src: '/photos/buffet-homards.webp', alt: 'Homards et huîtres au buffet', x: 80, y: 6, r: -5, legende: 'Homards et huîtres', placeholder: false },
    { src: '/photos/chef-teppanyaki.webp', alt: 'Cuisinier à la plaque teppanyaki', x: 2, y: 36, r: 6, legende: 'À la plaque', placeholder: false },
    { src: '/photos/desserts-macarons.webp', alt: 'Buffet de desserts : macarons, pâtisseries, chocolats', x: 5, y: 68, r: -9, legende: 'Les desserts', placeholder: false },
    { src: '/photos/buffet-fruits-de-mer.webp', alt: 'Bacs de poissons et fruits de mer frais au buffet', x: 25, y: 70, r: 4, legende: 'Le frais du buffet', placeholder: false },
    { src: '/photos/wok-ingredients.webp', alt: 'Ingrédients à composer pour le wok : viandes et légumes', x: 45, y: 66, r: -6, legende: 'Les ingrédients du wok', placeholder: false },
    { src: '/photos/cocktail-vert.webp', alt: 'Boisson colorée dans un verre à pied', x: 65, y: 69, r: 7, legende: 'Un verre à pied', placeholder: false },
    { src: '/photos/salle-tables-rouges.webp', alt: 'Salle avec chaises rouges et tables rondes', x: 83, y: 35, r: 3, legende: 'La salle rouge', placeholder: false },
    { src: '/photos/salle-de-jeux.webp', alt: 'Salle de jeux pour enfants', x: 84, y: 68, r: -4, legende: 'La salle de jeux', placeholder: false },
  ] as Tirage[],
  pictos: [
    { categorie: 'Le buffet', picto: 'bol' },
    { categorie: 'Buffet seul', picto: 'bol' },
    { categorie: 'Buffet et boissons', picto: 'theiere' },
    { categorie: 'Wok', picto: 'wok' },
  ] as Picto[],
  /** Tarifs par personne, relevés sur le site actuel le 19/11/2026 (dossier.md). */
  tarifs: {
    seul: [
      { moment: 'Midi', prix: '16,80 €' },
      { moment: 'Soir en semaine', prix: '23,80 €' },
      { moment: 'Week-end et jours fériés', prix: '27,80 €' },
    ] as Tarif[],
    boissons: [
      { moment: 'Midi', prix: '28,00 €' },
      { moment: 'Soir en semaine', prix: '37,00 €' },
      { moment: 'Week-end et jours fériés', prix: '40,00 €' },
    ] as Tarif[],
    boissonsListe: 'Bière au fût, Coca, Fanta, Sprite, Ice Tea, eau, jus d’orange, de lychees et d’ananas, vin en pichet, un café ou un thé.',
    note: 'Prix par personne.',
  },
  /** La maison : uniquement des faits du dossier (site actuel). */
  maison: {
    titre: ['Une grande salle,', 'une grande tablée'],
    texte: [
      'Wok de Jin est un buffet asiatique à volonté, à Jambes, avenue du Bourgmestre Jean Materne. La salle est grande, au décor chinois : chaises rouges, tables rondes, fresques.',
      'De grandes tables accueillent les familles, les amis et les collègues. Une salle de jeux occupe les enfants pendant le repas.',
    ],
  },
  buffet: {
    texte: [
      'Buffets chaud et froid, sushis, wok, teppanyaki, fruits de mer et desserts : on se sert à volonté, midi et soir.',
      'Le buffet de sushis réunit nigiris, makis et créations de la maison, avec poissons et fruits de mer.',
    ],
    specialites: ['Sushis, nigiris, makis', 'Poissons, homards et huîtres', 'Wok et teppanyaki', 'Desserts, macarons, pâtisseries'],
  },
  plaque: {
    titre: ['Au wok et', 'à la plaque'],
    texte: 'On choisit ses ingrédients au buffet, et les cuisiniers les préparent devant vous, au wok ou sur la plaque de teppanyaki.',
  },
  reveillon: {
    date: 'jeudi 31 décembre 2026',
    heure: 'dès 18:00',
    prix: '80 €',
    inclus: ['Boissons comprises', 'DJ', 'Cochon de lait rôti', 'Dinde aux cranberries', 'Escargots', 'Wok et teppanyaki', 'Sushis et fruits de mer', 'Pâtisseries'],
    acompte: 'Acompte de 20 € par personne, non remboursable, déduit de l’addition.',
    enfants: 'Enfants jusqu’à 4 ans : 5 € sur place.',
    limite: 'Réservation en ligne jusqu’au 31 décembre, à minuit.',
    url: 'https://wokdejin.com/reveillon/reserver',
  },
  emporter: {
    texte: 'Wok de Jin propose la vente à emporter. La carte à emporter est consultable sur le site du restaurant.',
  },
  manifeste: {
    titre: ['Réveillon du', '31 décembre'],
    motItalique: '31 décembre',
  },
  finale: 'À table !',
};

/** Vrai si l'heure donnée (HH:MM) est dans un créneau. */
export const estOuvert = (h: Horaire, hhmm: string) => h.creneaux.some((c) => c.ouverture <= hhmm && hhmm < c.fermeture);
