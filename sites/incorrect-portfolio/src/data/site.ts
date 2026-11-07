// Tout le contenu du site INCORЯECT (variante portfolio, gabarit « Affiche ») vit ici. Source : data/restaurants/incorrect/
// (donnees.json, dossier.md, photos/index.json). La carte complète est dans carte.json (tirée de donnees.json par script).
//
// Hypothèses : aucune donnée inventée n'est affichée comme vraie. Ce qui est écrit par KYW (définition humoristique du nom,
// étapes de la vente à emporter) est marqué `placeholder: true` et le gabarit l'affiche avec « exemple » ou « illustratif ».
// Horaires : sources contradictoires (Le Fooding, G&M, Table de Terroir) ; on retient mar-sam 18:30-21:30 + sam midi,
// marqués « à confirmer ». Pas d'e-mail public (celui de restaurants.json est personnel), pas d'avis clients chiffrés.

import carte from './carte.json';

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean; badges?: ('végé' | 'épicé' | 'signature')[] }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Fait { nom: string; valeur: string; description: string; source: string }
export interface Membre { nom: string; role: string; photo?: string; placeholder: boolean }
export interface Avis { texte: string; auteur: string; source: string; date: string; note?: number; placeholder: boolean }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }
export interface Couche { numero: string; nom: string; detail: string }
export interface Etape { titre: string; texte: string }

export interface Restaurant {
  slug: string;
  nom: string;
  nomLignes: [string, string]; // le nom sur deux registres (contour puis plein)
  baseline: string;
  description: string; // meta description par défaut (50 à 160 caractères)
  url: string; // site actuel du client
  typeCuisine: string; // schema.org servesCuisine
  adresse: { rue: string; numero: string; cp: string; commune: string; pays: string; repere?: string };
  geo?: { lat: number; lon: number };
  telephone: string; // format international
  email: { valeur: string; placeholder: boolean } | null;
  reservation: { outil: string; url: string };
  horaires: Horaire[];
  horairesResume: string; // repli sans JavaScript de la pastille d'état
  horairesNote: string;
  reseaux: Reseau[];
  definition: { mot: string; prononciation: string; nature: string; sens: string[]; placeholder: boolean };
  signature: { nom: string; couches: Couche[]; prix: string; prixLabel: string; placeholder: boolean };
  carte: Categorie[];
  faits: Fait[];
  etapes: { surPlace: Etape[]; aEmporter: Etape[]; aEmporterPlaceholder: boolean };
  histoire: string[]; // un paragraphe par entrée
  equipe: Membre[];
  avis: Avis[];
  photos: Photo[];
  galerie: string[]; // 8 chemins de photos, dans l'ordre de la bande
  valeurs: string[];
  adieu: string; // mot d'adieu géant du pied de page
  colophon: string;
}

const photo = (src: string, alt: string, largeur: number, hauteur: number): Photo => ({ src, alt, largeur, hauteur, placeholder: false });
const j = (jour: Jour, creneaux: Creneau[], note?: string): Horaire => ({ jour, creneaux, note });
const soir: Creneau = { ouverture: '18:30', fermeture: '21:30' };

export const site: Restaurant = {
  slug: 'incorrect',
  nom: 'Incorrect',
  nomLignes: ['Incorrect', 'pizzeria'],
  baseline: 'La pizzeria rock-n-roll d’Alex et Estelle. Pâte au levain, rue Haute Marcelle, Namur.',
  description: 'Incorrect, pizzeria rock-n-roll à Namur : pizzas au levain reposées 48 heures, pizzas « de nous », bières craft. Réservation en ligne.',
  url: 'https://www.incorrect.pizza',
  typeCuisine: 'Pizza au levain créative',
  adresse: { rue: 'Rue Haute Marcelle', numero: '35', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.464418, lon: 4.8639223 },
  telephone: '+32 81 13 85 61',
  email: null,
  reservation: { outil: 'Barestho', url: 'https://incorrect.reservation.barestho.com/' },
  horaires: [
    j('lundi', [], 'fermé'),
    j('mardi', [soir]),
    j('mercredi', [soir]),
    j('jeudi', [soir]),
    j('vendredi', [soir]),
    j('samedi', [{ ouverture: '12:00', fermeture: '14:00' }, soir]),
    j('dimanche', [], 'fermé'),
  ],
  horairesResume: 'Mardi au samedi, 18 h 30 à 21 h 30 ; samedi midi aussi',
  horairesNote: 'Horaires à confirmer : les sources divergent, la maison fera foi.',
  reseaux: [
    { nom: 'Instagram', url: 'https://www.instagram.com/incorrect.namur/' },
    { nom: 'Facebook', url: 'https://www.facebook.com/p/Incorrectnamur-61557438170846/' },
  ],
  definition: {
    mot: 'incorrect',
    prononciation: '[ɛ̃.kɔ.ʁɛkt]',
    nature: 'adj.',
    sens: [
      'Qui s’écarte de la règle. Exemple : une pizza au kimchi maison, à l’ananas frais et à la mayo bbq.',
      'Par extension : la pizzeria rock-n-roll d’Alex et Estelle, à Namur, où la pâte lève au levain et repose 48 heures avant de passer au four. Voir aussi : le goût, la qualité et l’audace.',
    ],
    placeholder: true,
  },
  signature: {
    nom: 'Dwight Schrute',
    couches: [
      { numero: '01', nom: 'Pain au levain', detail: 'maison, grillé' },
      { numero: '02', nom: 'Crème de betterave', detail: 'la base, bien rose' },
      { numero: '03', nom: 'Chèvre fumé', detail: 'envoyé au siphon' },
      { numero: '04', nom: 'Avruga', detail: 'et poudre d’olive' },
      { numero: '05', nom: 'Fenouil et aneth', detail: 'fleurs conservées, huile d’aneth' },
    ],
    prix: '14,50 €',
    prixLabel: 'le classic de la maison, pour attendre la pizza',
    placeholder: false,
  },
  carte: carte as Categorie[],
  faits: [
    { nom: 'Pâte au levain', valeur: '48 h', description: 'Le temps de repos de la pâte avant le four.', source: 'Le Fooding' },
    { nom: 'Farine belge', valeur: 'Bodson', description: 'Des moulins Bodson, en Belgique.', source: 'L’Avenir' },
    { nom: 'Fait maison', valeur: 'Kimchi', description: 'Le kimchi et le beurre au kimchi sortent de la cuisine.', source: 'carte du restaurant' },
    { nom: 'Vente à emporter', valeur: 'Oui', description: 'Les pizzas se prennent aussi à emporter.', source: 'Le Fooding' },
  ],
  etapes: {
    surPlace: [
      { titre: 'Réservez', texte: 'En ligne via Barestho, ou par téléphone au 081 13 85 61.' },
      { titre: 'Installez-vous', texte: 'Briques, parquet et tables en bois, avec la cuisine ouverte en face.' },
      { titre: 'Mangez avec les doigts', texte: 'Des pizzas au levain, des dips pour finir les croûtes, une bière craft à côté.' },
    ],
    aEmporter: [
      { titre: 'Choisissez', texte: 'Parmi les pizzas de la carte.' },
      { titre: 'Appelez', texte: 'Au 081 13 85 61, pour convenir de l’heure.' },
      { titre: 'Passez la porte', texte: 'Rue Haute Marcelle 35, et repartez avec la boîte.' },
    ],
    aEmporterPlaceholder: true,
  },
  histoire: [
    'Incorrect se présente comme la pizzeria rock-n-roll d’Alex et Estelle, à Namur. Estelle accueille et fait sourire en salle ; Alexandre Hocquet est en cuisine.',
    'Alexandre est ancien boulanger, diplômé de l’école hôtelière de Namur. Il est passé par L’Air du Temps à Liernu, Bon-Bon à Bruxelles et Les Terres d’ici à La Hulpe.',
    'La pâte lève au levain et repose 48 heures, avec de la farine des moulins Bodson, en Belgique. Le kimchi et son beurre sont faits maison, les produits sont locaux et de saison, la cuisine est très végétale.',
    'Ici, pas de gastro : des briques et du parquet, des assiettes en céramique, du rock, du metal et du rap américain dans la salle. En octobre 2025, ELLE Belgique notait que l’endroit n’avait qu’un an.',
  ],
  equipe: [
    { nom: 'Alexandre Hocquet', role: 'En cuisine, ancien boulanger', placeholder: false },
    { nom: 'Estelle', role: 'À l’accueil et en salle', placeholder: false },
  ],
  avis: [
    { texte: 'INCORЯECT : l’adresse qui révolutionne la pizza', auteur: 'ELLE Belgique', source: 'Titre de l’article, 31 octobre 2025', date: '2025-10-31', placeholder: false },
    { texte: 'On a testé Incorrect, le resto qui revisite les pizzas à Namur', auteur: 'L’Avenir', source: 'Titre de l’article, 5 février 2025', date: '2025-02-05', placeholder: false },
    { texte: 'HIP INCORЯECT', auteur: 'Gault&Millau', source: 'Sélection HIP', date: '', placeholder: false },
  ],
  photos: [
    photo('/photos/salle-cuisine-ouverte.webp', 'Salle aux murs de briques et aux tables en bois, la cuisine ouverte en arrière-plan', 1600, 982),
    photo('/photos/salle-passe.webp', 'La fenêtre de pierre et de briques sur la cuisine, des orchidées au premier plan', 700, 1035),
    photo('/photos/salle-table.webp', 'Une table en bois dressée, couverts posés sur une serviette en papier', 960, 495),
    photo('/photos/pizza-gants.webp', 'Une pizza au bord noirci sortant du four, des mains gantées de noir au-dessus', 1100, 1035),
    photo('/photos/pizza-croute.webp', 'Le bord alvéolé et tacheté d’une pizza, du fromage fondu au centre', 1560, 395),
    photo('/photos/table-pizza-verte.webp', 'Table en bois, pizza aux herbes vertes en partie découpée et verres de bière', 1600, 982),
    photo('/photos/table-verres.webp', 'Des verres de bière et une bouteille verte sur une table en bois', 460, 540),
    photo('/photos/table-pizza-part.webp', 'Une pizza aux herbes vertes sur une assiette en céramique', 880, 395),
  ],
  galerie: [
    '/photos/salle-cuisine-ouverte.webp',
    '/photos/pizza-gants.webp',
    '/photos/table-pizza-verte.webp',
    '/photos/salle-passe.webp',
    '/photos/table-verres.webp',
    '/photos/pizza-croute.webp',
    '/photos/salle-table.webp',
    '/photos/table-pizza-part.webp',
  ],
  valeurs: ['Pâte au levain, 48 heures de repos', 'Farine belge des moulins Bodson', 'Produits locaux et de saison', 'Lactofermentation, kimchi maison'],
  adieu: 'À table !',
  colophon: 'Caractère Archivo (Google Fonts, licence OFL). Photos : Incorrect (site du restaurant). Plat dessiné par KYW.',
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

/** Jour abrégé en 3 lettres pour les cartes d'horaires. */
export const jourCourt = (j: Jour) => ({ lundi: 'Lun', mardi: 'Mar', mercredi: 'Mer', jeudi: 'Jeu', vendredi: 'Ven', samedi: 'Sam', dimanche: 'Dim' })[j];

/** Les plats du bento de l'accueil : six plats choisis par nom. */
export const bentoAccueil = (): Plat[] => {
  const noms = ['Dwight Schrute', 'M.A.G.A', 'Margherita', 'Ananas Montana', 'Poti Poney', 'Coucou petite perruche'];
  const tous = site.carte.flatMap((c) => c.plats);
  return noms.map((n) => tous.find((p) => p.nom === n)).filter((p): p is Plat => !!p);
};

/** Les pizzas (classiques puis « de nous »), pour la page à emporter. */
export const pizzas = (): Plat[] => site.carte.filter((c) => c.categorie.startsWith('Les pizzas')).flatMap((c) => c.plats);
