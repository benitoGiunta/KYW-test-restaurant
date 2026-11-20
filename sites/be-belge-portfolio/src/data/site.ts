// Tout le contenu du site « Be Belge… et d'ailleurs » vit ici. Source : data/restaurants/be-belge/dossier.md et donnees.json.
// Une donnée, un drapeau : `placeholder: true` ne vaut que pour le champ qu'il accompagne. Toute sous-donnée non prouvée
// par le dossier porte son propre drapeau et une marque visible là où elle s'affiche.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean; services: number; quand: string; vins: string }
export interface Avis { texte: string; auteur: string; source: string; date: string; placeholder: boolean; url?: string }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }
/** Chiffre monumental d'un chapitre : seulement des nombres prouvés par le dossier (preuve citée). */
export interface Chiffre { valeur: number; libelle: string; sousLibelle?: string; preuve: string; placeholder: false }
export interface Offre { nom: string; texte: string; textePlaceholder: boolean; photo: string }

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
  reservation: { outil: string; url: string; note: string };
  horaires: Horaire[];
  reseaux: Reseau[];
  carte: Categorie[];
  menus: Menu[];
  histoire: string[]; // un paragraphe par entrée
  photos: Photo[];
  valeurs: string[];
  chiffres: { services: Chiffre; prix: Chiffre; convives: Chiffre; jours: Chiffre };
  citation: Avis;
  privatisation: { intro: string; offres: Offre[] };
}

const photo = (src: string, alt: string, largeur: number, hauteur: number, placeholder = false): Photo => ({ src, alt, largeur, hauteur, placeholder });
const midi = { ouverture: '12:00', fermeture: '13:30' };
const soir = { ouverture: '19:00', fermeture: '20:30' };

export const site: Restaurant = {
  slug: 'be-belge',
  nom: "Be Belge… et d'ailleurs",
  baseline: "Cuisine belge et de saison, avec un peu d'ailleurs, avenue de Marlagne à Wépion.", // baseline rédigée d'après le nom et la description des listings (à confirmer)
  description:
    "Be Belge… et d'ailleurs, restaurant à Wépion (Namur) : Menu du Chef en 3 ou 4 services à partir de 57 €, jardin, terrasse et salle de pierre, ouvert du mercredi au dimanche.",
  url: 'https://bebelgeetdailleurs.be',
  typeCuisine: 'Cuisine belge et de saison',
  adresse: { rue: 'Avenue de Marlagne', numero: '203', cp: '5000', commune: 'Namur (Wépion)', pays: 'BE' },
  geo: { lat: 50.4517812, lon: 4.8421921 },
  telephone: '+32 81 47 00 95',
  email: { valeur: 'info@bebelgeetdailleurs.be', placeholder: false }, // donnees.json : e-mail du site client
  reservation: {
    outil: 'Zenchef',
    url: 'https://bookings.zenchef.com/results?rid=382492',
    note: 'Vous préférez le téléphone ? Appelez le restaurant pendant les heures de service.',
  },
  horaires: [
    { jour: 'lundi', creneaux: [], note: 'fermé' },
    { jour: 'mardi', creneaux: [], note: 'fermé' },
    { jour: 'mercredi', creneaux: [midi] },
    { jour: 'jeudi', creneaux: [midi, soir] },
    { jour: 'vendredi', creneaux: [midi, soir] },
    { jour: 'samedi', creneaux: [soir] },
    { jour: 'dimanche', creneaux: [midi] },
  ],
  reseaux: [{ nom: 'Facebook', url: 'https://www.facebook.com/Restaurant-be-Belgeet-d-ailleurs-460789377730605/' }],
  carte: [
    {
      categorie: 'Mises en bouche et entrées, au choix',
      plats: [
        { nom: 'Saint-Jacques en deux préparations', description: 'Taillées à cru, fraîcheur d\u2019agrumes ; poêlées, émulsion au beurre blanc', prix: null, placeholder: false },
        { nom: 'Langoustines rôties aux épices', description: 'Risotto et petits pois façon paëlla, crème de chorizo doux', prix: null, placeholder: false },
        { nom: 'Foie de canard poêlé', description: 'Compotée d\u2019oignons caramélisés, liégeoise et cassis', prix: null, placeholder: false },
      ],
    },
    {
      categorie: 'Plats, au choix',
      plats: [
        { nom: 'Soupe de poissons de la Méditerranée', description: 'Grenailles safranées', prix: null, placeholder: false },
        { nom: 'Carré de veau de lait basse température', description: 'Jus corsé à la truffe d\u2019été, jeunes légumes et pommes bouchon', prix: null, placeholder: false },
        { nom: 'Filet de canette', description: 'Abricot caramélisé à la lavande, jus corsé à la Kriek Boon', prix: null, placeholder: false },
      ],
    },
    {
      categorie: 'Desserts, au choix',
      plats: [
        { nom: 'Douceur tiède au chocolat Valrhona', description: 'Crème anglaise à la vanille Bourbon, fruits frais', prix: null, placeholder: false },
        { nom: 'La classique Dame blanche', description: 'Et son chocolat chaud', prix: null, placeholder: false },
        { nom: 'Assortiment de sorbets', description: '', prix: null, placeholder: false },
      ],
    },
    {
      categorie: 'Suppléments',
      plats: [
        { nom: 'Assortiment de fromages affinés par la Petite Ferme', description: 'en supplément', prix: '+7 €', placeholder: false },
        { nom: 'Irish Coffee', description: 'en supplément', prix: '+4 €', placeholder: false },
      ],
    },
  ],
  menus: [
    { nom: 'Menu du Chef, 3 services', prix: '57 €', description: 'Entrée, plat et dessert, à choisir sur la carte. Sélection de vins en accord, en option : 28 €.', placeholder: false, services: 3, quand: 'composition de l\u2019été 2026, proposée du 13 août au 6 septembre', vins: '28 €' },
    { nom: 'Menu du Chef, 4 services', prix: '72 €', description: 'Deux entrées, un plat et un dessert. Sélection de vins en accord, en option : 35 €.', placeholder: false, services: 4, quand: 'composition de l\u2019été 2026, proposée du 13 août au 6 septembre', vins: '35 €' },
  ],
  histoire: [
    "« Bonjour les Gourmets ! Nous avons le plaisir de vous accueillir dans notre nouveau petit nid ! » Le mot d'accueil du restaurant dit l'essentiel : une maison, un jardin, et l'envie de recevoir à table.",
    "Be Belge… et d'ailleurs sert une cuisine belge et de saison, avec quelques escapades : Saint-Jacques en deux préparations, langoustines aux épices, canette à la Kriek Boon.",
  ],
  photos: [
    photo('/photos/hero-salle-1800.webp', 'Salle à manger au mur de pierre, avec sa cheminée', 1800, 1350),
    photo('/photos/hero-salle-960.webp', 'Salle à manger au mur de pierre, avec sa cheminée', 960, 720),
    photo('/photos/chap-table-1200.webp', 'Table dressée devant un triptyque de tableaux rouges et un mur de pierre', 1200, 1200),
    photo('/photos/chap-bar-1200.webp', 'Buffet en bois chargé de bouteilles, devant une fenêtre', 1200, 1200),
    photo('/photos/chap-terrasse-1200.webp', 'Terrasse ombragée, chaises et tables sous les arbres', 1200, 1200),
    photo('/photos/chap-banquette-1200.webp', 'Salle avec banquette et tables dressées', 1200, 1200),
    photo('/photos/salle-banquette-1140.webp', 'Salle avec banquette et tables dressées', 1140, 642),
    photo('/photos/brasero-1140.webp', 'Table de terrasse près du foyer à feu', 1140, 642),
    photo('/photos/jardin-1140.webp', 'Pelouse et bâtiment du restaurant vus du jardin', 1140, 642),
    photo('/photos/tableaux-1140.webp', 'Table dressée devant un triptyque de tableaux rouges et un mur de pierre', 1140, 642),
    photo('/photos/cheminee-1140.webp', 'Salle à manger au mur de pierre, avec sa cheminée', 1140, 642),
    photo('/photos/gal-jardin-nb.webp', 'Le jardin et le bâtiment du restaurant, en noir et blanc', 900, 507),
    photo('/photos/gal-terrasse-nb.webp', 'La terrasse ombragée, en noir et blanc', 900, 900),
    photo('/photos/gal-enseigne-nb.webp', "L'enseigne métallique du restaurant, en noir et blanc", 900, 507),
    photo('/photos/gal-applique-nb.webp', 'Applique murale lumineuse sur un mur sombre', 900, 900),
    photo('/photos/gal-brasero-nb.webp', 'Table de terrasse et foyer à feu, en noir et blanc', 900, 507),
  ],
  valeurs: ['Cuisine belge', 'Produits de saison', 'Un peu d\u2019ailleurs'],
  chiffres: {
    services: { valeur: 3, libelle: 'services', sousLibelle: 'ou quatre : le Menu du Chef, entrée, plat et dessert', preuve: 'dossier.md, carte du site client (/carte/)', placeholder: false },
    prix: { valeur: 57, libelle: 'euros', sousLibelle: 'le Menu du Chef en trois services ; 72 € en quatre', preuve: 'dossier.md, carte du site client (/carte/)', placeholder: false },
    convives: { valeur: 34, libelle: 'convives', sousLibelle: 'jusqu\u2019à 34 personnes assises, 40 en walking dinner', preuve: 'dossier.md, site client /banquets-et-receptions/', placeholder: false },
    jours: { valeur: 5, libelle: 'jours', sousLibelle: 'ouvert du mercredi au dimanche, fermé le lundi et le mardi', preuve: 'dossier.md, horaires du site client', placeholder: false },
  },
  citation: {
    texte: "Il n'y a pas de bon repas si le vin n'y coule pas !",
    auteur: '',
    source: 'Le mot d\u2019accueil de la maison',
    date: '',
    placeholder: false,
    url: 'https://bebelgeetdailleurs.be',
  },
  privatisation: {
    intro: 'Le restaurant se privatise pour vos repas de groupe et réceptions. Jours et horaires adaptables.',
    offres: [
      { nom: 'Repas assis', texte: 'De 15 à 34 personnes, un repas assis dans la salle.', textePlaceholder: false, photo: '/photos/salle-banquette-1140.webp' },
      { nom: 'Walking dinner', texte: 'De 20 à 40 personnes, un dîner debout, de plat en plat.', textePlaceholder: false, photo: '/photos/brasero-1140.webp' },
      { nom: 'Sur mesure', texte: 'Les jours et les horaires s\u2019adaptent à votre réception : parlons-en avec la maison.', textePlaceholder: false, photo: '/photos/jardin-1140.webp' },
    ],
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

/** Horaires lisibles : '12:00 à 14:00, 19:00 à 21:00' ou la note. */
export const horaireTexte = (h: Horaire) =>
  h.creneaux.length ? h.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(', ') : h.note || 'fermé';

/** Lignes d'horaires de la carte de clôture : midi, soir, fermeture (calculées depuis `horaires`, jamais écrites en dur). */
export function horairesResume(r: Restaurant = site): { libelle: string; valeur: string }[] {
  const liste = (hs: Horaire[]) => hs.map((h) => h.jour).reduce((a, j, i, t) => a + (i === 0 ? '' : i === t.length - 1 ? ' et ' : ', ') + j, '');
  const parCreneau = (c: Creneau) => r.horaires.filter((h) => h.creneaux.some((x) => x.ouverture === c.ouverture && x.fermeture === c.fermeture));
  const ferme = r.horaires.filter((h) => !h.creneaux.length);
  const m = r.horaires.flatMap((h) => h.creneaux).find((c) => c.ouverture < '15:00')!;
  const s = r.horaires.flatMap((h) => h.creneaux).find((c) => c.ouverture >= '17:00')!;
  return [
    { libelle: 'Le midi', valeur: `${liste(parCreneau(m))}, ${m.ouverture} à ${m.fermeture}` },
    { libelle: 'Le soir', valeur: `${liste(parCreneau(s))}, ${s.ouverture} à ${s.fermeture}` },
    { libelle: liste(ferme), valeur: 'fermé' },
  ];
}

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;
