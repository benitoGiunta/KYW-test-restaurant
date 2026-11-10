// Tout le contenu de la variante « Affiche » de Makimono vit ici. Source : data/restaurants/makimono/ (donnees.json,
// dossier.md, photos/index.json). La carte complète est dans carte.json (transcrite du menu 2026 par la recherche).
// Les trous des données réelles sont comblés par des éléments marqués `placeholder: true` (affichés « exemple » ou
// « illustratif »). Hypothèses (toutes marquées) : la définition du nom (sens courant du mot japonais, pas un fait
// du restaurant) ; l'exemple de roll composé (prix calculé avec les tarifs de la carte) ; la note Google (à confirmer).
// Non repris car inconnus : histoire, fondateurs, équipe, presse, nombre de couverts, outil de réservation.
import carteJson from './carte.json';

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean; badges?: ('végé' | 'épicé' | 'signature')[] }
export interface Categorie { categorie: string; format: 'bento' | 'liste'; note: string; plats: Plat[] }
export interface Option { nom: string; prix: string | null }
export interface Groupe { titre: string; note: string; options: Option[] }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean }
export interface Avis { texte: string; auteur: string; source: string; date: string; placeholder: boolean }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }
export interface Couche { numero: string; nom: string; detail: string }
export interface Etape { titre: string; texte: string }
export interface Commande { nom: string; url: string }

export interface Restaurant {
  slug: string;
  nom: string;
  nomLignes: [string, string]; // le nom sur deux registres (contour puis plein)
  baseline: string;
  description: string; // meta description par défaut (50 à 160 caractères)
  url: string; // site actuel du client
  typeCuisine: string; // schema.org servesCuisine
  adresse: { rue: string; numero: string; cp: string; commune: string; pays: string; repere: string };
  geo: { lat: number; lon: number };
  telephone: string; // format international
  email: { valeur: string; placeholder: boolean };
  commande: Commande[]; // commande en ligne (pas d'outil de réservation de table)
  horaires: Horaire[];
  horairesResume: string; // repli sans JavaScript de la pastille d'état
  reseaux: Reseau[];
  definition: { mot: string; prononciation: string; nature: string; sens: string[]; placeholder: boolean };
  signature: { nom: string; couches: Couche[]; prix: string; prixLabel: string; placeholder: boolean };
  carte: Categorie[];
  composer: { roll: Groupe[]; bowl: Groupe[] };
  menus: Menu[];
  etapes: Etape[];
  traiteur: { titre: string; texte: string };
  avis: Avis[];
  noteGoogle: { note: string; nombre: string; source: string };
  photos: Photo[];
  galerie: string[]; // 8 chemins de photos, dans l'ordre de la bande
  valeurs: string[];
  adieu: string; // mot d'adieu géant du pied de page
  colophon: string;
}

const photo = (src: string, alt: string, largeur: number, hauteur: number): Photo => ({ src, alt, largeur, hauteur, placeholder: false });
const NB = ' ';

export const site: Restaurant = {
  slug: 'makimono',
  nom: 'Makimono',
  nomLignes: ['Maki', 'mono'],
  baseline: `Creative uramaki made with love. Rolls et poké bowls à déguster sur place ou à emporter, rue Saint-Loup, Namur.`,
  description: 'Makimono, sushi créatifs à Namur : uramaki signatures ou composés à votre façon, poké bowls, nigiri flambés, sur place, à emporter ou livrés.',
  url: 'https://www.makimono.be',
  typeCuisine: 'Cuisine japonaise créative, sushi, poké bowls',
  adresse: { rue: 'Rue Saint-Loup', numero: '14', cp: '5000', commune: 'Namur', pays: 'BE', repere: 'Façade vitrée et terrasse sur la rue Saint-Loup' },
  geo: { lat: 50.4643256, lon: 4.8635198 },
  telephone: '+32 483 03 88 47',
  email: { valeur: 'contact.makimono@gmail.com', placeholder: false },
  commande: [
    { nom: 'Commander en ligne (Deliverect)', url: 'https://pickup.deliverect.com/makimono/' },
    { nom: 'Commander en ligne (Ordering Club)', url: 'https://makimono.orderingclub.com/fr/makimononamur0' },
  ],
  horaires: [
    { jour: 'lundi', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '22:00' }] },
    { jour: 'mardi', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '22:00' }] },
    { jour: 'mercredi', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '22:00' }] },
    { jour: 'jeudi', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '22:00' }] },
    { jour: 'vendredi', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '22:00' }] },
    { jour: 'samedi', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '22:00' }] },
    { jour: 'dimanche', creneaux: [{ ouverture: '18:00', fermeture: '22:00' }] },
  ],
  horairesResume: 'Midi et soir du lundi au samedi, le dimanche soir',
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/MakimonoNamur/' },
    { nom: 'Instagram', url: 'https://www.instagram.com/makimono_namur/' },
  ],
  definition: {
    mot: 'makimono',
    prononciation: '[ma.ki.mo.no]',
    nature: 'n. m. (japonais)',
    sens: [
      'Rouleau : manuscrit ou peinture que l’on déroule, de droite à gauche, pour le lire. Le mot « maki » désigne aussi le rouleau de riz et d’algue.',
      'Par extension : une adresse namuroise où le rouleau se compose à sa façon. Voir aussi : uramaki, poké, made with love.',
    ],
    placeholder: true,
  },
  signature: {
    nom: 'Create.Your.Roll',
    couches: [
      { numero: '01', nom: 'La base', detail: 'maki, california ou spring' },
      { numero: '02', nom: 'La protéine', detail: 'saumon snacké' },
      { numero: '03', nom: 'Les fillings', detail: 'avocat et mangue' },
      { numero: '04', nom: 'Les toppings', detail: 'graines de sésame' },
      { numero: '05', nom: 'La sauce', detail: 'spicy ou unagi' },
    ],
    prix: `10,10${NB}€`,
    prixLabel: 'un roll composé : california, saumon snacké, deux fillings, un topping, une sauce (total calculé avec les prix de la carte, exemple)',
    placeholder: true,
  },
  carte: carteJson.carte as Categorie[],
  composer: { roll: carteJson.roll as Groupe[], bowl: carteJson.bowl as Groupe[] },
  menus: [
    { nom: 'Fast Box', prix: `16,00${NB}€`, description: '16 pièces : poulet katsu mangue (4), california saumon (4), tempura de scampis avocat (4), crispy saumon (4).', placeholder: false },
    { nom: 'Creative Box', prix: `18,00${NB}€`, description: '16 pièces : le chef imagine des rolls créatifs avec les ingrédients de Create.Your.Roll. Allergies ou box 100 % végé à signaler au chef.', placeholder: false },
  ],
  etapes: [
    { titre: 'Composez', texte: 'Un roll signature de la carte, ou le vôtre : base, protéine, fillings, toppings, sauces.' },
    { titre: 'Commandez', texte: 'Sur place, en ligne pour le retrait ou la livraison, ou par téléphone.' },
    { titre: 'Dégustez', texte: 'Rapide et frais, à table rue Saint-Loup ou chez vous.' },
  ],
  traiteur: { titre: 'Traiteur et événements', texte: 'Makimono prépare vos événements et livre dans un rayon de 30 km. Écrivez-nous pour en parler.' },
  avis: [
    { texte: 'Exceptionnel.', auteur: 'Aaron L.', source: 'Avis Google, via Restaurant Guru', date: '2026', placeholder: false },
    { texte: `Nourriture 5 sur 5, service 5 sur 5, ambiance 4 sur 5. Commande à emporter, dîner, 20 à 30${NB}€ par personne.`, auteur: 'Ezéchiel W.', source: 'Avis Google, via Restaurant Guru', date: '2026', placeholder: false },
    { texte: `Nourriture 4 sur 5, service 4 sur 5, ambiance 4 sur 5. Sur place, déjeuner, 20 à 30${NB}€ par personne.`, auteur: 'Geys_70', source: 'Avis Google, via Restaurant Guru', date: '2026', placeholder: false },
  ],
  noteGoogle: { note: '4,6', nombre: '532', source: 'Google, d’après Restaurant Guru (à confirmer)' },
  photos: [
    photo('/photos/rolls-saumon-table.webp', 'Rolls au saumon snacké sur assiette texturée, table en bois clair', 1422, 1679),
    photo('/photos/rolls-planche.webp', 'Deux plateaux de rolls au saumon snacké et rolls garnis de piment vert, sur ardoise', 1800, 1800),
    photo('/photos/poke-bowls-maki.webp', 'Trois poké bowls et un plateau de maki vus du dessus', 1000, 1202),
    photo('/photos/poke-bowl.webp', 'Poké bowl au saumon, avocat, edamame et tobiko, gros plan', 1000, 1334),
    photo('/photos/plateau-terrasse.webp', 'Plateau de rolls, gyoza et tempura sur une table de terrasse, boisson Firefly', 1422, 1752),
    photo('/photos/salle-fenetres.webp', 'La salle : tables en bois, chaises en métal, grandes fenêtres et parquet sombre', 1000, 1333),
    photo('/photos/salle-tables.webp', 'La salle : tables en bois clair, chaises en métal, étagères au mur', 1000, 1333),
    photo('/photos/mochis.webp', 'Mochis roses et verts et fraises', 1429, 1275),
    photo('/photos/facade.webp', 'La façade vitrée de la rue Saint-Loup, sa terrasse et l’ardoise « Freshly made with love »', 1046, 1309),
    photo('/photos/accompagnements.webp', 'Accompagnements vus du dessus : gyoza, poulet frit, tempura de scampis, wakame, soupe miso et riz', 1276, 1116),
    photo('/photos/rolls-teriyaki.webp', 'Rolls au saumon snacké nappés de sauce teriyaki et de ciboulette, sur fond sombre', 1800, 1240),
    photo('/photos/rolls-assiette.webp', 'Rolls aux sésames noirs, oignons verts et mayonnaise, sur assiette marbrée bleue', 1800, 1125),
    photo('/photos/nigiri-flambe.webp', 'Nigiri de saumon flambés au chalumeau sur assiette noire', 1800, 1301),
    photo('/photos/creative-box.webp', 'Creative Box : assortiment de rolls garnis de tobiko et de sauce épicée', 1800, 1240),
    photo('/photos/poke-chicken.webp', 'Poké Chicken : poulet katsu, nachos, cream cheese et coriandre', 1790, 1276),
    photo('/photos/gyoza-pommes.webp', 'Gyoza aux pommes sur assiette rouge, table avec vase et boissons japonaises', 1178, 1339),
  ],
  galerie: [
    '/photos/rolls-teriyaki.webp',
    '/photos/poke-bowl.webp',
    '/photos/nigiri-flambe.webp',
    '/photos/salle-fenetres.webp',
    '/photos/creative-box.webp',
    '/photos/facade.webp',
    '/photos/mochis.webp',
    '/photos/rolls-saumon-table.webp',
  ],
  valeurs: ['Made with love', 'Rapide et frais', 'Options végétariennes signalées sur la carte', 'Une recommandation du chef signalée sur la carte'],
  adieu: 'Itadakimasu !',
  colophon: 'Caractère Archivo (Google Fonts, licence OFL). Photos : Makimono. Plat dessiné par KYW.',
};

/** Photo par chemin (erreur explicite si le chemin n'existe pas : un gabarit ne doit pas pointer dans le vide). */
export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}

/** Adresse sur une ligne. */
export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;

/** Horaires lisibles : '12:00 à 14:30, 18:00 à 22:00' ou la note. */
export const horaireTexte = (h: Horaire) =>
  h.creneaux.length ? h.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(', ') : h.note || 'fermé';

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;

/** Jour abrégé en 3 lettres pour les cartes d'horaires. */
export const jourCourt = (j: Jour) => ({ lundi: 'Lun', mardi: 'Mar', mercredi: 'Mer', jeudi: 'Jeu', vendredi: 'Ven', samedi: 'Sam', dimanche: 'Dim' })[j];

/** Les plats du bento de l'accueil : six plats nommés de la carte. */
export const bentoAccueil = (): Plat[] => {
  const tous = site.carte.flatMap((c) => c.plats);
  return ['Spicy Fuji', 'Dragon Crunch', 'Honey Moon', 'Saumon', 'Poké Salmon', 'Crazy Tempura']
    .map((n) => tous.find((p) => p.nom === n))
    .filter((p): p is Plat => !!p);
};
