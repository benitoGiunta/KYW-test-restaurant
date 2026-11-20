// Tout le contenu du site « Épices & Nous » vit ici. Source : data/restaurants/epices-et-nous/dossier.md et donnees.json.
// Une donnée, un drapeau : `placeholder: true` ne vaut que pour le champ qu'il accompagne. Toute sous-donnée non prouvée
// par le dossier est absente (null ou retirée), jamais inventée.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean; services: number }
/** Un service du menu : ses propositions (relevé du menu 3 services du site client). */
export interface ServiceMenu { service: string; options: string[] }
export interface Membre { nom: string; role: string; photo: string; photoAlt: string; bio: string[]; placeholder: boolean }
export interface Avis { texte: string; auteur: string; source: string; date: string; placeholder: boolean; url?: string }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }
/** Chiffre monumental d'un chapitre : seulement des nombres prouvés par le dossier (preuve citée). */
export interface Chiffre { valeur: number; libelle: string; sousLibelle?: string; preuve: string; placeholder: false }
export interface Distinction { nom: string; detail: string; url: string; placeholder: boolean }
export interface Espace { nom: string; texte: string; photo: string }

export interface Restaurant {
  slug: string;
  nom: string;
  initiales: string;
  baseline: string;
  description: string; // meta description par défaut (50 à 160 caractères)
  url: string; // site actuel du client
  typeCuisine: string; // schema.org servesCuisine
  adresse: { rue: string; numero: string; cp: string; commune: string; pays: string };
  telephone: string; // format international
  email: { valeur: string; placeholder: boolean };
  reservation: { outil: string; url: string; note: string };
  horaires: Horaire[];
  reseaux: Reseau[];
  carte: Categorie[];
  menus: Menu[];
  menuServices: ServiceMenu[];
  histoire: string[]; // un paragraphe par entrée
  equipe: Membre[];
  photos: Photo[];
  valeurs: string[];
  chiffres: { services: Chiffre; prix: Chiffre; salles: Chiffre; ouverture: Chiffre };
  distinctions: Distinction[];
  citation: Avis;
  espaces: { intro: string; liste: Espace[] };
}

const photo = (src: string, alt: string, largeur: number, hauteur: number, placeholder = false): Photo => ({ src, alt, largeur, hauteur, placeholder });
const p = (nom: string, description: string, prix: string | null): Plat => ({ nom, description, prix, placeholder: false });

export const site: Restaurant = {
  slug: 'epices-et-nous',
  nom: 'Épices & Nous',
  initiales: 'É&N',
  baseline: "Là où la passion de la cuisine se mêle à l'art de recevoir",
  description:
    "Épices & Nous, restaurant à Erpent (Namur) : cuisine française de saison aux touches d'épices, menu 3 services à 52 €, par Denis et Sophie Delvigne.",
  url: 'https://www.epicesetnous.com',
  typeCuisine: "Cuisine française traditionnelle et créative, aux épices",
  adresse: { rue: 'Chaussée de Marche', numero: '561', cp: '5101', commune: 'Erpent (Namur)', pays: 'BE' },
  telephone: '+32 81 31 32 24',
  email: { valeur: '', placeholder: true }, // dossier : e-mail inconnu. Jamais de mailto: illustratif.
  reservation: {
    outil: 'le site du restaurant',
    url: 'https://www.epicesetnous.com/reservations',
    note: 'Vous pouvez aussi réserver par téléphone.',
  },
  horaires: [
    { jour: 'lundi', creneaux: [], note: 'fermé' },
    { jour: 'mardi', creneaux: [{ ouverture: '12:00', fermeture: '13:45' }, { ouverture: '19:00', fermeture: '20:30' }] },
    { jour: 'mercredi', creneaux: [{ ouverture: '12:00', fermeture: '13:45' }, { ouverture: '19:00', fermeture: '20:30' }] },
    { jour: 'jeudi', creneaux: [{ ouverture: '12:00', fermeture: '13:45' }, { ouverture: '19:00', fermeture: '20:30' }] },
    { jour: 'vendredi', creneaux: [{ ouverture: '12:00', fermeture: '13:45' }, { ouverture: '19:00', fermeture: '20:30' }] },
    { jour: 'samedi', creneaux: [{ ouverture: '19:00', fermeture: '20:30' }] },
    { jour: 'dimanche', creneaux: [], note: 'fermé' },
  ],
  reseaux: [{ nom: 'Facebook', url: 'https://www.facebook.com/epices.et.nous/' }],
  carte: [
    {
      categorie: 'Entrées',
      plats: [
        p('Pomme de terre Macaire', 'Aux petits lardons, reblochon fermier et rosaces de contrefilet Holstein épicé, fumé, maturé', '20,50'),
        p('Velouté de champignons des bois', 'Filet de plie poché, lamelles de truffes et petits croûtons bien dorés', '22,50'),
        p('Saint-Jacques de Dieppe', 'Noix de Saint-Jacques snackées, céleri, lard confit et bouillon de moules, châtaigne', '25,50'),
        p('Lentilles vertes du Puy', 'Salade tiède de lentilles vertes du Puy, Morteau, escalope de foie gras de canard poêlée', '25,50'),
      ],
    },
    {
      categorie: 'Plats',
      plats: [
        p('Filet de biche du Pays', 'Filet de biche rôti, légumes d\'automne, airelles, sauce poivrade et mousseline de céleri rave', '45,75'),
        p('Aloyau de bœuf', 'Aloyau de bœuf du Pays cuit au sautoir, quelques légumes du moment, frites et sauce au choix', '33,50'),
        p('Ris de veau', 'Croustillant de ris de veau, laquage miel, soja, gingembre confit, légumes racines et mousseline de céleri rave', '45,75'),
        p('Coucou de Malines', 'Suprême de coucou de Malines cuisson douce puis coloré vivement, chiconnette caramélisée, sauce fine Champagne et pomme Dauphine', '33,50'),
        p('Daurade royale', 'Filet de daurade royale cuit sur peau, tombée d\'épinards, scampis grillés, riz basmati et fumet de poissons légèrement crémé au curry rouge', '33,50'),
      ],
    },
    {
      categorie: 'Desserts',
      plats: [
        p('Assiette de fromages', "Fromages d'ici et d'ailleurs", '17'),
        p('Gâteau de Mamy', 'Chocolat noir et petits beurre écrasés, crème anglaise à la vanille', '13'),
        p('Marquise au chocolat', 'Crème anglaise liqueur Advocaat', '13'),
        p('Nougatine glacée', 'Coulis de fruits rouges', '13'),
        p('Macaron farci', 'Glace au caramel à la fleur de sel', '14'),
        p('Dame blanche ou Brésilienne', '', '13'),
        p('Café glacé', '', '13'),
        p('Sorbets, à la boule', 'Citron vert, framboise, mangue, noix de coco, ananas, chocolat amer, clémentine Corse, citron vert-basilic, abricot-romarin', '3'),
        p('Glaces, à la boule', 'Vanille de Madagascar, caramel à la fleur de sel, café, praliné, pistache, vanille-grué de cacao', '3'),
      ],
    },
  ],
  menus: [
    {
      nom: 'Menu 3 services',
      prix: '52 €',
      services: 3, // nombre annoncé par le dossier (constante, jamais un length)
      description: 'Sans les boissons, servi par table entière, sans changement possible.',
      placeholder: false,
    },
  ],
  menuServices: [
    {
      service: 'Entrée',
      options: [
        "Tartare de saumon aux éclats de grenade à l'huile d'olive d'Uzès, petite salade et grissini",
        'Salade tiède de lentilles vertes du Puy, Morteau, scampi grillé, foie gras poêlé, huile de noisette',
      ],
    },
    {
      service: 'Plat',
      options: [
        'Filet de daurade royale cuit sur peau, mousseline de butternut aux épices, châtaignes, Saint-Jacques de Dieppe crue marinée, beurre blanc au miso',
        'Noisettes de biche cuites au sautoir, garnitures automnales, poivrade adoucie au chocolat, mousseline de céleri rave',
      ],
    },
    {
      service: 'Dessert',
      options: [
        'Tartelette chocolat, châtaignes, glace vanille du Mexique',
        'Pomme caramélisée, sabayon au miel d\'acacia, crumble',
      ],
    },
  ],
  histoire: [
    'Depuis 1999, Denis et Sophie Delvigne accueillent leurs convives à Erpent.',
    "Formés à l'école hôtelière de la Citadelle, ils n'étaient pas destinés à la restauration. Le nom de la maison reflète la passion de Denis pour les épices et la convivialité.",
    "La cuisine est française, traditionnelle et revisitée avec créativité : produits frais et locaux, suggestions de saison. Le ris de veau façon carbonara est le plat signature de la maison.",
    "Ils ont un jour organisé un mariage intimiste pour la fille d'un client, et font volontiers visiter la citadelle de Namur et la parfumerie Guy Delforge à leurs hôtes.",
  ],
  equipe: [
    {
      nom: 'Denis Delvigne',
      role: 'En cuisine, cofondateur',
      photo: '/photos/histoire-cuisine-nb.webp',
      photoAlt: 'Girolles saisies dans une poêle inox, photographiées en noir et blanc',
      bio: ["Sa passion pour les épices a donné son nom à la maison."],
      placeholder: false,
    },
    {
      nom: 'Sophie Delvigne',
      role: 'Accueil et salle, cofondatrice',
      photo: '/photos/histoire-salle-nb.webp',
      photoAlt: 'La salle avant, tables dressées et luminaire, en noir et blanc',
      bio: ["L'art de recevoir : elle tient la salle, moderne et lumineuse."],
      placeholder: false,
    },
  ],
  citation: {
    texte: 'Maison familiale aux saveurs épicées',
    auteur: 'Gault&Millau',
    source: 'Gault&Millau, fiche du restaurant',
    url: 'https://www.gaultmillau.be/fr/restaurants/epices-et-nous-namur-erpent',
    date: '',
    placeholder: false,
  },
  chiffres: {
    services: { valeur: 3, libelle: 'services', sousLibelle: 'un menu entrée, plat, dessert, servi par table entière', preuve: 'dossier.md, carte du site client', placeholder: false },
    prix: { valeur: 52, libelle: 'euros', sousLibelle: 'le menu 3 services, sans les boissons', preuve: 'dossier.md, carte du site client', placeholder: false },
    salles: { valeur: 2, libelle: 'espaces', sousLibelle: 'la salle avant et la verrière, plus une terrasse aux beaux jours', preuve: 'dossier.md, identité (site client, page Home)', placeholder: false },
    ouverture: { valeur: 1999, libelle: 'depuis', sousLibelle: 'Denis et Sophie Delvigne vous reçoivent à Erpent', preuve: 'dossier.md, site client « Depuis 1999 »', placeholder: false },
  },
  distinctions: [
    { nom: 'Gault&Millau', detail: '13,5/20', url: 'https://www.gaultmillau.be/fr/restaurants/epices-et-nous-namur-erpent', placeholder: false },
    { nom: 'Guide MICHELIN', detail: 'Restaurant recommandé', url: 'https://guide.michelin.com/be/fr/namur/erpent/restaurant/epices-et-nous', placeholder: false }, // pas d'année en dur
  ],
  espaces: {
    intro: 'Une salle vive, une verrière feutrée, une terrasse aux beaux jours.',
    liste: [
      { nom: 'La salle avant', texte: 'Moderne, lumineuse et dynamique : la salle où le service du midi et du soir bat son plein.', photo: '/photos/salle-avant.webp' },
      { nom: 'La verrière', texte: "À l'arrière, une salle plus douce et feutrée, sous la verrière, pour un repas posé.", photo: '/photos/salle-verriere.webp' },
      { nom: 'La terrasse', texte: 'La terrasse prolonge la salle aux beaux jours.', photo: '/photos/facade.webp' },
    ],
  },
  photos: [
    photo('/photos/hero-table.webp', 'Table dressée, verres et serviette, ambiance sombre et chaude', 1600, 900),
    photo('/photos/hero-table-960.webp', 'Table dressée, verres et serviette, ambiance sombre et chaude', 960, 540),
    photo('/photos/chap-biche-1200.webp', 'Viande rouge tranchée, carottes et purées de couleur sur ardoise noire', 1200, 1200),
    photo('/photos/chap-sauce-1200.webp', 'Sauce beurre blanc versée sur scampis, linguine et légumes', 1200, 1200),
    photo('/photos/chap-verriere-1200.webp', 'La verrière : table dressée, tableau au mur', 1200, 1200),
    photo('/photos/salle-avant.webp', 'La salle avant, tables dressées et luminaire', 1140, 642),
    photo('/photos/salle-verriere.webp', 'La verrière : table dressée sous la verrière, tableau au mur', 1140, 642),
    photo('/photos/facade.webp', 'Façade du restaurant, enseigne Épices & Nous, ciel bleu', 1140, 642),
    photo('/photos/gal-saumon-nb.webp', 'Des mains tranchent un saumon frais en cuisine, en noir et blanc', 900, 900),
    photo('/photos/gal-girolles-nb.webp', 'Girolles en poêle inox, en noir et blanc', 900, 507),
    photo('/photos/gal-passe-nb.webp', 'Le passe de la cuisine, ustensiles dans un pot inox, en noir et blanc', 900, 507),
    photo('/photos/gal-cocotte-nb.webp', 'Légumes de saison dans une cocotte noire, en noir et blanc', 900, 507),
    photo('/photos/gal-poele-nb.webp', 'Deux pavés de saumon à la poêle, en noir et blanc', 900, 507),
    photo('/photos/plat-girolles-toast.webp', 'Girolles sur toast, assiette blanche', 550, 825),
    photo('/photos/plat-viande-ardoise.webp', 'Viande, carottes et purées sur ardoise noire, vue verticale', 550, 825),
    photo('/photos/plat-volaille.webp', 'Volaille, chou-fleur et croquettes sur assiette grise', 550, 825),
    photo('/photos/histoire-cuisine-nb.webp', 'Girolles saisies dans une poêle inox, en noir et blanc', 1000, 1332),
    photo('/photos/histoire-cuisine-nb-700.webp', 'Girolles saisies dans une poêle inox, en noir et blanc', 700, 933),
    photo('/photos/histoire-salle-nb.webp', 'La salle avant, tables dressées et luminaire, en noir et blanc', 1000, 1332),
  ],
  valeurs: ['Produits frais et locaux', 'Cuisine de saison', 'Accueil familial'],
};

/** Fourchette de prix d'une catégorie de la carte, calculée (jamais écrite en dur) : « 20,50 à 25,50 ». */
export function fourchette(categorie: string): { min: string; max: string } {
  const c = site.carte.find((x) => x.categorie === categorie);
  if (!c) throw new Error(`Catégorie inconnue : ${categorie}`);
  const n = (s: string) => parseFloat(s.replace(',', '.'));
  const prix = c.plats.map((x) => x.prix).filter((x): x is string => !!x).filter((x) => n(x) >= 10); // hors boules de glace
  const tri = [...prix].sort((a, b) => n(a) - n(b));
  return { min: tri[0], max: tri[tri.length - 1] };
}

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

/** Les 3 lignes d'horaires de la carte de clôture : soirs, midis, week-end (calculées, jamais écrites en dur). */
export function horairesResume(r: Restaurant = site): { libelle: string; valeur: string }[] {
  const soirs = r.horaires.filter((h) => h.creneaux.some((c) => c.ouverture >= '17:00'));
  const midis = r.horaires.filter((h) => h.creneaux.some((c) => c.ouverture < '15:00'));
  const fermes = r.horaires.filter((h) => !h.creneaux.length);
  const plage = (hs: Horaire[]) => (hs.length > 2 ? `du ${hs[0].jour} au ${hs[hs.length - 1].jour}` : hs.map((h) => h.jour).join(' et '));
  const heure = (hs: Horaire[], soir: boolean) => { const c = hs[0].creneaux.find((x) => (x.ouverture >= '17:00') === soir)!; return `${c.ouverture} à ${c.fermeture}`; };
  return [
    { libelle: 'Le soir', valeur: `${plage(soirs)}, ${heure(soirs, true)}` },
    { libelle: 'Le midi', valeur: `${plage(midis)}, ${heure(midis, false)}` },
    { libelle: plage(fermes), valeur: fermes[0]?.note || 'fermé' },
  ];
}

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;
