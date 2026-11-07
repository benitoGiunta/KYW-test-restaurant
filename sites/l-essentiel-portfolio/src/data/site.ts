// Tout le contenu du site vit ici. Source : data/restaurants/l-essentiel/dossier.md et donnees.json.
// Règle « une donnée, un drapeau » : `placeholder: true` ne couvre que le champ qu'il accompagne ; toute sous-donnée
// non prouvée par le dossier porte son propre drapeau et une mention visible « illustratif » dans le gabarit.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
// horsService : ligne du menu qui n'est pas un des services comptés (mises en bouche, mignardise) : pas de numéro.
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean; horsService?: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
// services : nombre de services annoncé par le dossier (constante, jamais `plats.length`).
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean; services?: number }
export interface Membre { nom: string; role: string; photo?: string; placeholder: boolean; rolePlaceholder?: boolean }
// Avis placeholder : jamais de nom de personne ni de source réelle (Google…) ; auteur et source vides, marque « exemple » avant la citation.
export interface Avis { texte: string; auteur: string; source: string; date: string; note?: number; placeholder: boolean }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Chambre { nom: string; detail: string }
export interface Reseau { nom: string; url: string }

/** Un composant du dressage : médaillon détouré posé sur l'assiette (coordonnées en % de la scène carrée). */
export interface Composant {
  nom: string;
  src: string;
  x: number; // centre, % de la scène
  y: number;
  d: number; // diamètre, % de la scène
  cote: 'gauche' | 'droite'; // côté de la légende en desktop
  ly: number; // hauteur de la légende, % de la scène
  placeholder: boolean; // true : composant déduit de la photo, pas du dossier
}
export interface Dressage { plat: string; service: string; composants: Composant[] }
export interface Distinction { texte: string; source: string; url?: string; placeholder: boolean }

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
  fermetures: string[]; // fermetures annuelles publiées par le restaurant
  reseaux: Reseau[];
  carte: Categorie[];
  carteNotes: string[]; // règles de la carte (table entière, supplément, groupes)
  menus: Menu[];
  accords: { menu: string; boisson: string; prix: string }[];
  histoire: string[]; // un paragraphe par entrée
  equipe: Membre[];
  chambres: Chambre[];
  tarifsChambres: { libelle: string; prix: string }[];
  avis: Avis[]; // vide : aucun extrait d'avis prouvé dans le dossier
  photos: Photo[];
  valeurs: string[];
  dressage: Dressage;
  distinctions: Distinction[];
  phrase: { avant: string; accent: string; apres: string };
  groupes: string;
  legendes: Record<string, string>;
}

const photo = (src: string, alt: string, largeur: number, hauteur: number, placeholder = false): Photo => ({ src, alt, largeur, hauteur, placeholder });
const nb = (s: string) => s.replace(/ ([€%])/g, '\u00a0$1');

export const site: Restaurant = {
  slug: 'l-essentiel',
  nom: "L'Essentiel",
  baseline: "Table gastronomique étoilée dans une ancienne tannerie du XVIIe siècle, à Temploux.",
  description:
    "L'Essentiel, table gastronomique à Temploux (Namur) : une étoile au guide Michelin, cuisine française créative et de saison, deux assiettes à la carte, chambres d'hôtes.",
  url: 'https://www.lessentiel.be',
  typeCuisine: 'Cuisine française créative et de saison',
  adresse: { rue: 'Rue Roger Clément', numero: '32', cp: '5020', commune: 'Temploux', pays: 'BE' },
  geo: { lat: 50.4751615, lon: 4.7385286 },
  telephone: '+32 81 56 86 16',
  email: { valeur: 'info@lessentiel.be', placeholder: false },
  reservation: { outil: 'le calendrier de réservation du restaurant', url: 'https://www.lessentiel.be/reservation/' },
  horaires: [
    { jour: 'lundi', creneaux: [], note: 'fermé' },
    { jour: 'mardi', creneaux: [], note: 'fermé' },
    ...(['mercredi', 'jeudi', 'vendredi', 'samedi'] as const).map((jour) => ({
      jour,
      creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:00', fermeture: '21:30' }],
    })),
    { jour: 'dimanche', creneaux: [], note: 'fermé' },
  ],
  fermetures: [
    'Du 20 décembre 2026 au 5 janvier 2027 (service traiteur pour Noël)',
    'Du 21 février au 10 mars 2027',
    'Du 2 au 11 mai 2027',
    'Du 17 juillet au 3 août 2027',
    'Du 12 au 21 septembre 2027',
    'Du 7 au 11 novembre 2027',
    'À partir du 19 décembre 2027',
  ],
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/lessentiel.temploux/' },
    { nom: 'Instagram', url: 'https://www.instagram.com/l.essentiel.temploux/' },
  ],
  // Carte relevée le 7 novembre 2026 (saison gibier). Seule la formule « deux assiettes » est tarifée.
  carte: [
    {
      categorie: 'Première assiette',
      plats: [
        { nom: 'Émincé de noix de Saint-Jacques, choux chinois, épinards et shiitakés, gel de soja pimenté et dashi', description: '', prix: null, placeholder: false },
        { nom: 'Carpaccio de dos de faon, betterave, tartare de langoustine, granité de foie gras et jus de viande perlé', description: '', prix: null, placeholder: false },
        { nom: 'Croquettes de petits gris et pied de porc, lentilles vertes, jambonneau et jus de volaille émulsionné', description: '', prix: null, placeholder: false },
        { nom: 'Légumes de saison tiédis, gelée de butternut, paleta et jus de cuisson', description: '', prix: null, placeholder: false },
        { nom: 'Gras de cuisse de volaille ardennaise, ris de veau, topinambour, champignon de Paris, oignon caramélisé et jus truffé', description: '', prix: null, placeholder: false },
      ],
    },
    {
      categorie: 'Deuxième assiette',
      plats: [
        { nom: "Filet de sole, condiment d'huître et lardon, poireau, laitue de mer, huile de ciboulette", description: '', prix: null, placeholder: false },
        { nom: 'Turbot grillé, artichaut poivrade, sucrine et palet de bintje croustillant, sauce choron', description: '', prix: null, placeholder: false },
        { nom: 'Homard bleu cuit dans sa carapace puis roulé au beurre, ris de veau meunière, épinard, fèves des marais et béarnaise des pinces', description: 'supplément selon le cours du marché', prix: null, placeholder: false },
        { nom: 'Mignon de biche du Pays, trompettes, choux de Bruxelles, airelles et coing, pomme Dauphine et sauce poivrade', description: '', prix: null, placeholder: false },
        { nom: 'Suprême de poule faisane rôti sur le coffre, chicon, champignons des bois et potimarron, croquettes des cuisses et jus façon brabançonne', description: '', prix: null, placeholder: false },
      ],
    },
    {
      categorie: 'Fromages et dessert',
      plats: [
        { nom: 'Découverte du chariot de fromages affinés', description: '', prix: nb('16 €'), placeholder: false },
        { nom: 'Plaisir sucré', description: 'Certains desserts demandent une attention particulière : à commander en début de repas', prix: nb('14 €'), placeholder: false },
      ],
    },
  ],
  carteNotes: [
    'Chaque menu est servi pour la table entière. Changer de menu en cours de table : supplément de 25\u00a0€.',
    'Au-delà de six couverts, menu uniquement.',
    'Allergies et intolérances : à signaler à la réservation.',
  ],
  menus: [
    { nom: 'Carte : les deux assiettes', prix: nb('90 €'), description: 'Une première et une deuxième assiette à choisir à la carte.', placeholder: false, services: 2 },
    { nom: 'Menu Affaire', prix: nb('50 €'), description: "Entrée, plat, dessert selon l'inspiration du chef, uniquement le midi en semaine, hors jours fériés. Avec les vins : 75\u00a0€.", placeholder: false, services: 3 },
    { nom: 'Menu Plaisir', prix: nb('72 €'), description: '4 services, à table pour toute la tablée.', placeholder: false, services: 4 },
    { nom: 'Menu Balade', prix: nb('90 €'), description: "6 services. Le chariot de fromages affinés peut remplacer le dessert : supplément de 14\u00a0€.", placeholder: false, services: 6 },
  ],
  accords: [
    { menu: 'Menu Plaisir', boisson: 'Accord sans alcool « Aromatisée »', prix: nb('30 €') },
    { menu: 'Menu Plaisir', boisson: 'Vins « Découverte »', prix: nb('38 €') },
    { menu: 'Menu Plaisir', boisson: 'Vins « Français »', prix: nb('48 €') },
    { menu: 'Menu Balade', boisson: 'Accord sans alcool « Aromatisée »', prix: nb('35 €') },
    { menu: 'Menu Balade', boisson: 'Vins « Découverte »', prix: nb('45 €') },
    { menu: 'Menu Balade', boisson: 'Vins « Français »', prix: nb('58 €') },
  ],
  histoire: [
    "L'Essentiel occupe une ancienne tannerie du XVIIe siècle, à Temploux, dans la commune de Namur. La brique, la pierre et la poutre sont restées ; les salles, plusieurs, ont chacune leur ambiance.",
    "À table, Bénédicte et son équipe vous accueillent. La salle claire aux rideaux blancs, la salle de brique, l'arche aux persiennes : choisissez l'ambiance de votre soirée en réservant.",
    "La cuisine est française, créative et de saison : le gibier du Pays à l'automne, les poissons nobles, le ris de veau, et un chariot de fromages affinés qui se découvre en fin de repas.",
  ],
  equipe: [{ nom: 'Bénédicte', role: "Accueil et salle, avec son équipe", placeholder: false }],
  chambres: [
    { nom: 'Tilleul', detail: 'Suite, avec bain et douche' },
    { nom: 'Ardoise', detail: 'Chambre double, douche à l\'italienne' },
    { nom: 'Rouille', detail: 'Chambre double, terrasse privative' },
    { nom: 'Réglisse', detail: 'Chambre double, terrasse privative' },
  ],
  tarifsChambres: [
    { libelle: 'Chambre double, 2 personnes', prix: nb('120 €') },
    { libelle: 'Suite, 2 personnes', prix: nb('150 €') },
    { libelle: 'Petit-déjeuner, par personne', prix: nb('20 €') },
    { libelle: 'Lit supplémentaire, par personne', prix: nb('30 €') },
  ],
  avis: [],
  photos: [
    photo('/photos/facade-enseigne.webp', "Façade en brique et enseigne manuscrite dorée « l'essentiel » sur un panneau noir", 1200, 1500),
    photo('/photos/salle-tulipes.webp', 'Table longue dressée, tulipes blanches au premier plan et persiennes noires', 1600, 1067),
    photo('/photos/salle-brique.webp', 'Salle à manger de brique et de poutres, tables rondes dressées, chaises cannées', 1600, 1067),
    photo('/photos/salle-rideaux.webp', 'Salle claire, tables rondes dressées et rideaux blancs', 1600, 1067),
    photo('/photos/salle-chaises.webp', 'Chaises en bois et cuir devant un mur de brique, tables dressées', 1000, 1500),
    photo('/photos/salle-arche.webp', 'Arche de la salle, persiennes et marbre noir', 1000, 1500),
    photo('/photos/salle-table-ronde.webp', 'Table ronde en bois, chaises et rideaux', 1000, 1500),
    photo('/photos/table-dressee.webp', 'Table dressée : verres, serviette, couverts dorés et assiette', 1417, 567),
    photo('/photos/plat-petit-gris.webp', 'Petits gris, herbes et écume sur fond sombre', 1490, 435),
    photo('/photos/plat-poisson.webp', "Poisson grillé, jaune d'œuf ou beurre et fleur de bourrache", 1494, 433),
    photo('/photos/plat-biche.webp', 'Viande rouge rôtie, garnitures et sauce sur assiette claire', 1489, 433),
    photo('/photos/plat-entree.webp', 'Entrée : poisson, légumes, sauce brune et herbes', 1492, 435),
    photo('/photos/plat-dessert.webp', 'Dessert : sphère verte, boules blanches et fruits jaunes sur assiette claire', 1492, 435),
    photo('/photos/chambre-1.webp', "Chambre d'hôtes : lit, linge blanc et bois ancien", 1499, 431),
    photo('/photos/chambre-2.webp', "Chambre d'hôtes : détail du lit et du linge blanc", 1498, 429),
    photo('/photos/chambre-3.webp', "Chambre d'hôtes : tête de lit en bois ancien éclairée", 1500, 430),
    photo('/photos/chambre-4.webp', "Chambre d'hôtes : poutre apparente et luminaire rond", 1500, 431),
    photo('/photos/maison-hotes.webp', "La maison à colombages des chambres d'hôtes, dans son jardin", 700, 466),
    photo('/photos/coin-table-bois.webp', 'Coin de salle en bois devant une fenêtre', 1501, 429),
  ],
  valeurs: ['Cuisine créative et de saison', 'Le produit travaillé au plus juste de sa nature'],
  // Dressage : la photo est celle du mignon de biche (carte du 7/11/2026). Les composants sont des recadrages de cette
  // photo, nommés d'après l'intitulé du plat : seul le mignon est sûr, les autres portent leur drapeau « illustratif ».
  dressage: {
    plat: 'Mignon de biche du Pays, trompettes, choux de Bruxelles, airelles et coing',
    service: 'Deuxième assiette, saison du gibier',
    composants: [
      { nom: 'Mignon de biche', src: '/photos/composant-biche.webp', x: 52, y: 53, d: 23, cote: 'droite', ly: 56, placeholder: false },
      { nom: 'Pomme Dauphine', src: '/photos/composant-dauphine.webp', x: 41, y: 40, d: 16, cote: 'gauche', ly: 32, placeholder: true },
      { nom: 'Croquette', src: '/photos/composant-croquette.webp', x: 60, y: 39, d: 11, cote: 'droite', ly: 28, placeholder: true },
      { nom: 'Sauce poivrade', src: '/photos/composant-sauce.webp', x: 61, y: 63, d: 11, cote: 'droite', ly: 84, placeholder: true },
      { nom: 'Jeune pousse', src: '/photos/composant-pousse.webp', x: 43, y: 64, d: 10, cote: 'gauche', ly: 70, placeholder: true },
    ],
  },
  distinctions: [
    { texte: 'Une étoile au guide Michelin', source: 'Guide MICHELIN, fiche de Temploux', url: 'https://guide.michelin.com/be/fr/namur/temploux/restaurant/l-essentiel210192', placeholder: false },
    { texte: '16,5/20 au Gault&Millau 2024, 3e de la province de Namur', source: 'DH / La Libre, 27 novembre 2023', url: 'https://www.dhnet.be/regions/namur/2023/11/27/gaultmillau-2024-meilleur-restaurant-de-belgique-jeune-chef-de-lannee-decouvrez-les-notes-des-namurois-2FS5OMOPTBHEHEGVEBQY3R4DWI/', placeholder: false },
    { texte: nb('4,8/5 sur plus de 1 000 avis Google'), source: 'Google, note relevée le 7 novembre 2026', placeholder: false },
  ],
  phrase: { avant: 'Une cuisine créative et de saison, où le produit est', accent: 'travaillé au plus juste de sa nature', apres: '.' },
  groupes: "Chaque menu est servi pour la table entière ; au-delà de six couverts, menu uniquement. Pour un groupe, appelez le restaurant.",
  legendes: {
    '/photos/salle-rideaux.webp': 'La salle claire',
    '/photos/salle-tulipes.webp': 'La table longue',
    '/photos/salle-brique.webp': 'La salle de brique',
    '/photos/table-dressee.webp': 'La table dressée',
    '/photos/maison-hotes.webp': 'La maison des chambres',
  },
};

/** Photo par chemin (erreur explicite si le chemin n'existe pas : un gabarit ne doit pas pointer dans le vide). */
export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}

/** Adresse sur une ligne. */
export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;

/** Heure à la française : '19:00' → '19 h', '12:30' → '12 h 30'. */
export const heure = (hhmm: string) => { const [h, m] = hhmm.split(':'); return m === '00' ? `${Number(h)} h` : `${Number(h)} h ${m}`; };

/** Horaires lisibles : '12 h à 14 h, 19 h à 21 h' ou la note. */
export const horaireTexte = (h: Horaire) =>
  h.creneaux.length ? h.creneaux.map((c) => `${heure(c.ouverture)} à ${heure(c.fermeture)}`).join(', ') : h.note || 'fermé';

/** Numéro romain d'une ligne du menu : les lignes hors service (mises en bouche, mignardise) n'en ont pas. */
export const numeroService = (plats: Plat[], i: number) =>
  plats[i].horsService ? '' : romain(plats.slice(0, i + 1).filter((p) => !p.horsService).length);

/** Nombre de services annoncé (constante du dossier ; repli : lignes comptées hors service). */
export const nbServices = (r: Restaurant = site) => r.menus[0].services ?? r.carte[0].plats.filter((p) => !p.horsService).length;

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;

/** Chiffres romains des services. */
export const romain = (n: number) => ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][n - 1] ?? String(n);
