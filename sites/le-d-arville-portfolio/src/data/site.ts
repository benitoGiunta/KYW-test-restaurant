// Tout le contenu du site « Le D'Arville » (gabarit Velours) vit ici. Source : data/restaurants/le-d-arville/dossier.md et donnees.json.
// Une donnée, un drapeau : `placeholder: true` ne vaut que pour le champ qu'il accompagne. Toute sous-donnée non prouvée
// par le dossier porte son propre drapeau et une marque visible là où elle s'affiche.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
/** `heuresPlaceholder` : les jours viennent du site officiel, les heures sont illustratives (dossier : « heures inconnues »). */
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string; heuresPlaceholder?: boolean }
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean; descriptionPlaceholder?: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string | null; description: string; accord?: string; placeholder: boolean }
export interface Membre { nom: string; role: string; photo?: string; placeholder: boolean; rolePlaceholder?: boolean; bio?: string[]; bioPlaceholder?: boolean }
export interface Avis { texte: string; auteur: string; source: string; date: string; note?: number; placeholder: boolean; url?: string }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }
/** Chiffre monumental d'un chapitre : seulement des nombres prouvés par le dossier (preuve citée). */
export interface Chiffre { valeur: number; libelle: string; sousLibelle?: string; preuve: string; placeholder: false }
export interface Distinction { nom: string; detail: string; url?: string; placeholder: boolean }
export interface Offre { nom: string; texte: string; textePlaceholder: boolean; photo: string }
export interface Chambre { nom: string; texte: string; photo: string; textePlaceholder: boolean }

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
  equipe: Membre[];
  avis: Avis[];
  photos: Photo[];
  valeurs: string[];
  chiffres: { menus: Chiffre; prix: Chiffre; hotes: Chiffre; ouverture: Chiffre; barabas: Chiffre; domaine: Chiffre };
  distinctions: Distinction[];
  citation: Avis;
  privatisation: { intro: string; offres: Offre[] };
  bonCadeau: { texte: string; placeholder: boolean };
  barabas: { adresse: string; intro: string; petitDejeuner: string; chambres: Chambre[]; services: string[] };
  bonPlan: string;
  vins: string;
}

const photo = (src: string, alt: string, largeur: number, hauteur: number, placeholder = false): Photo => ({ src, alt, largeur, hauteur, placeholder });

export const site: Restaurant = {
  slug: 'le-d-arville',
  nom: "Le D'Arville",
  baseline: 'Restaurant gastronomique',
  description:
    "Le D'Arville, restaurant gastronomique dans une ferme du 19e siècle à Wierde, près de Namur : menus de saison dès 73 €, terrasse, jardin et villa Barabas.",
  url: 'https://www.ledarville.be',
  typeCuisine: 'Cuisine gastronomique de saison',
  adresse: { rue: "Rue d'Arville", numero: '94', cp: '5100', commune: 'Wierde (Namur)', pays: 'BE' },
  geo: { lat: 50.41238, lon: 4.95854 },
  telephone: '+32 81 46 23 65',
  email: { valeur: 'info@ledarville.be', placeholder: false },
  reservation: {
    outil: 'Zenchef',
    url: 'https://www.ledarville.be/reservation/',
    note: 'Au-delà de 6 personnes, appelez le restaurant ou écrivez-lui.',
  },
  // Jours : site officiel (jeudi soir, vendredi, samedi midi et soir, dimanche midi). Heures : illustratives (Trouve Ton Resto : 12:00-14:30 et 19:00-21:30, à confirmer).
  horaires: [
    { jour: 'lundi', creneaux: [], note: 'fermé' },
    { jour: 'mardi', creneaux: [], note: 'fermé' },
    { jour: 'mercredi', creneaux: [], note: 'fermé' },
    { jour: 'jeudi', creneaux: [{ ouverture: '19:00', fermeture: '21:30' }], heuresPlaceholder: true },
    { jour: 'vendredi', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '19:00', fermeture: '21:30' }], heuresPlaceholder: true },
    { jour: 'samedi', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '19:00', fermeture: '21:30' }], heuresPlaceholder: true },
    { jour: 'dimanche', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }], heuresPlaceholder: true },
  ],
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/ledarville/' },
    { nom: 'Facebook Barabas', url: 'https://www.facebook.com/LaSuiteDuDArville/' },
  ],
  carte: [
    {
      categorie: 'Les entrées',
      plats: [
        { nom: 'Noix de Saint-Jacques rôties', description: 'feuilleté, duxelles de champignons, émulsion de cèpes', prix: '30 €', placeholder: false },
        { nom: 'Quenelles de brochet', description: 'crabe royal, sauce Nantua', prix: '30 €', placeholder: false },
        { nom: 'Carpaccio de biche', description: 'texture de foie gras de canard, vinaigrette au jus de plume', prix: '30 €', placeholder: false },
        { nom: 'Noix de ris de veau croustillantes', description: 'wok de légumes, jus corsé au saté de Chine', prix: '30 €', placeholder: false },
        { nom: 'Escalope de foie gras de canard rôtie', description: 'cerise Amarena, pain d’épices, jus corsé', prix: '30 €', placeholder: false },
      ],
    },
    {
      categorie: 'Les plats',
      plats: [
        { nom: 'Le homard en direct de notre vivier', description: 'servi en deux assiettes', prix: '70 €', placeholder: false },
        { nom: 'Maigre cuit sur la peau', description: 'blanc de poireau, sauce crème à la truffe, mousseline de pommes de terre au mascarpone', prix: '40 €', placeholder: false },
        { nom: 'Sole meunière', description: 'servie en filets, pommes de terre tournées, beurre citron et herbes fraîches', prix: '55 €', placeholder: false },
        { nom: 'Filet de bœuf au poivre concassé', description: 'crème à l’armagnac, frites, salade gourmande', prix: '40 €', placeholder: false },
        { nom: 'Le lièvre en deux préparations', description: 'filet, purée de marrons, airelles, gratin de céleri-rave ; cuisses à la royal, sauce arlequin', prix: '40 €', placeholder: false },
      ],
    },
    {
      categorie: 'Fromages',
      plats: [
        { nom: 'Chariot de fromages affinés', description: 'fromages de nos régions, de France et d’ailleurs, accord mets-vin, salade et petit pain ; 17 € en remplacement du dessert', prix: '22 €', placeholder: false },
      ],
    },
    {
      categorie: 'Les desserts',
      plats: [
        { nom: 'Moelleux au chocolat des Caraïbes', description: 'autour de l’ananas et du fruit de la passion', prix: null, placeholder: false },
        { nom: 'La dame blanche tournée à la minute', description: 'chocolat croquant', prix: null, placeholder: false },
        { nom: 'Trompe l’œil « By Noa »', description: 'le citron, glace au chocolat blanc Yvoir', prix: null, placeholder: false },
        { nom: 'Notre île flottante', description: 'glace au lait d’amande', prix: null, placeholder: false },
      ],
    },
  ],
  menus: [
    {
      nom: 'Tendance de saison',
      prix: '73 €',
      description: 'Quatre mises en bouche, une première entrée au choix (Saint-Jacques ou carpaccio de biche), une seconde entrée au choix (quenelles de brochet ou ris de veau), un plat au choix (maigre ou lièvre) et un dessert de la carte.',
      accord: 'Accord mets, vins et café : 40 € par personne.',
      placeholder: false,
    },
    {
      nom: 'Balade',
      prix: '90 €',
      description: 'Quatre mises en bouche, Saint-Jacques, carpaccio de biche, ris de veau, le lièvre en deux préparations et un dessert de la carte.',
      accord: 'Accord mets, vins et café : 50 € par personne.',
      placeholder: false,
    },
    {
      nom: 'Menu enfant',
      prix: '28 €',
      description: 'Une entrée (fondu au parmesan ou scampis à la crème), un plat (filet de volaille ou cabillaud) et un dessert (salade de fruits ou dame blanche).',
      placeholder: false,
    },
  ],
  bonPlan: 'Menu « Bon Plan » : jeudi soir, vendredi midi et samedi midi.',
  vins: 'La carte des vins, « Le cellier du D’Arville », est proposée au restaurant. Eaux aromatisées 4 € le verre, kombucha 4,50 €.',
  bonCadeau: { texte: 'Le restaurant propose des chèques cadeau.', placeholder: false },
  histoire: [
    "Estelle et Olivier accueillent dans leur ferme du 19e siècle, à Wierde. Un cadre contemporain, un salon, une table d'hôte, une cuisine ouverte sur la salle.",
    "Le D'Arville a fêté ses 20 ans en 2025. Avec le temps, la villa Barabas, la « petite sœur », est venue s'ajouter à 200 mètres du restaurant, avec ses suites et ses chambres à thèmes.",
    "Entre les deux, une prairie : la maison l'a acquise, et le domaine compte aujourd'hui plus de 5 hectares. Un gîte équestre, « les filles d'à côté », y a été créé avec Nathalie Maroy.",
    "La terrasse, le jardin et le point d'eau font partie de la maison : on y dresse les tables, on y prolonge le repas.",
  ],
  equipe: [
    { nom: 'Olivier Bourguignon', role: 'Chef et propriétaire', placeholder: false },
    { nom: 'Estelle', role: 'Co-propriétaire', placeholder: false },
  ],
  // Aucune citation littérale d'avis n'a pu être obtenue (dossier). Ce bloc cite la carte de la maison : un plat, sa description.
  citation: {
    texte: 'Le homard en direct de notre vivier, servi en deux assiettes.',
    auteur: '',
    source: 'À la carte, le plat de la maison',
    url: 'https://www.ledarville.be/menus-et-carte/',
    date: '',
    placeholder: false,
  },
  avis: [],
  chiffres: {
    menus: { valeur: 2, libelle: 'menus', sousLibelle: 'Tendance de saison et Balade', preuve: 'dossier.md, Menus et carte du site client', placeholder: false },
    prix: { valeur: 73, libelle: 'euros', sousLibelle: 'le menu Tendance de saison, avant les accords', preuve: 'dossier.md, Menus et carte du site client', placeholder: false },
    hotes: { valeur: 2, libelle: 'hôtes', sousLibelle: 'Estelle et Olivier', preuve: 'dossier.md, identité (site, Gault&Millau)', placeholder: false },
    ouverture: { valeur: 20, libelle: 'ans', sousLibelle: 'fêtés en 2025', preuve: 'dossier.md : « le D’Arville a 20 ans » (affiche du site, février 2025)', placeholder: false },
    barabas: { valeur: 200, libelle: 'mètres', sousLibelle: 'entre le restaurant et la villa Barabas', preuve: 'dossier.md, Pratique (Barabas à 200 m)', placeholder: false },
    domaine: { valeur: 5, libelle: 'hectares', sousLibelle: 'et plus, entre le restaurant et les chambres', preuve: 'dossier.md, Histoire (plus de 5 hectares)', placeholder: false },
  },
  distinctions: [
    { nom: 'Gault&Millau', detail: '15/20', url: 'https://www.gaultmillau.be/en/restaurants/le-darville-namur-wierde', placeholder: false }, // Trouve Ton Resto indique 16/20 : à confirmer
    { nom: 'Tripadvisor', detail: '4,5 sur 5, environ 545 avis', placeholder: false }, // note relevée à la recherche (20/11/2026), sans lien direct
  ],
  privatisation: {
    intro: 'Séminaires, fêtes de fin d’année, cadeaux : la maison vous reçoit aussi en dehors du repas.',
    offres: [
      { nom: 'Séminaires', texte: 'Les séminaires et les événements se tiennent à la villa Barabas, à 200 mètres du restaurant. ', textePlaceholder: true, photo: '/photos/barabas-petit-dejeuner.webp' },
      { nom: 'Traiteur de fêtes', texte: 'Un service traiteur est proposé pour les fêtes de fin d’année.', textePlaceholder: true, photo: '/photos/salle-tables.webp' },
      { nom: 'Chèque cadeau', texte: 'Offrez une table au D’Arville : le restaurant propose des chèques cadeau.', textePlaceholder: false, photo: '/photos/cheque-table.webp' },
    ],
  },
  barabas: {
    adresse: 'Rue de Barabas 81, Wierde',
    intro: 'La villa Barabas est la petite sœur du restaurant, à 200 mètres. On y dort dans des suites et des chambres à thèmes, on s’y baigne dans une piscine chauffée, on y prend le petit-déjeuner.',
    petitDejeuner: 'Petit-déjeuner : 18 € par personne.',
    chambres: [
      { nom: 'Suite Orientale', texte: 'Une chambre colorée, bleu, orange et carreaux.', photo: '/photos/barabas-orientale.webp', textePlaceholder: false },
      { nom: 'Suite Glamour', texte: 'Un lit à la tête de lit fuchsia sous les poutres.', photo: '/photos/barabas-glamour.webp', textePlaceholder: false },
      { nom: 'Chambre rouge', texte: 'Une tête de lit rouge et une poutre apparente.', photo: '/photos/barabas-chambre-rouge.webp', textePlaceholder: true },
    ],
    services: ['Suites à thèmes : Glamour, Orientale, à la française', 'Chambres Zen et Aux pommes', 'Piscine chauffée', 'Petit-déjeuner à 18 € par personne', "Room service jusqu'à 23 h"],
  },
  photos: [
    photo('/photos/hero-1800.webp', "Terrasse et bâtiment en briques au bord d'un bassin", 1600, 1065),
    photo('/photos/hero-960.webp', "Terrasse et bâtiment en briques au bord d'un bassin", 960, 639),
    photo('/photos/chap-dessert-1200.webp', 'Assiette blanche dressée sur un rondin de bois, couverts dorés', 1200, 1200),
    photo('/photos/chap-salle-1200.webp', 'Salle à manger, banquette ondulée bleue et mur orangé', 1200, 1200),
    photo('/photos/chap-facade-1200.webp', "Portrait en pied du chef devant l'entrée en briques portant l'enseigne Le D'Arville", 1024, 1200),
    photo('/photos/chap-barabas-1200.webp', 'Façade blanche de la villa Barabas', 1200, 1152),
    photo('/photos/portrait-chef.webp', "Le chef devant l'entrée en briques du restaurant, en noir et blanc", 1000, 1333),
    photo('/photos/portrait-domaine.webp', 'Bâtiment en briques, étang et plantes aquatiques, en noir et blanc', 1000, 1333),
    photo('/photos/gal-assiette-nb.webp', 'Assiette noire dressée vue du dessus, fleurs et légumes', 900, 900),
    photo('/photos/gal-terrasse-nb.webp', 'Terrasse sous voile rouge, jardin et pierre sculptée', 900, 507),
    photo('/photos/gal-lampe-nb.webp', 'Table dressée près d’un mur de briques, lampe et tableau', 900, 1200),
    photo('/photos/gal-verres-nb.webp', 'Table de terrasse, verres, huile et poivrier', 900, 507),
    photo('/photos/gal-cuisine-nb.webp', 'Mains en cuisine dressant de petits bols', 900, 1200),
    photo('/photos/plat-assiette-noire.webp', 'Assiette noire dressée vue du dessus, fleurs et légumes', 800, 1200),
    photo('/photos/plat-sauce.webp', 'Dressage d’une assiette, sauce versée à la cuillère', 800, 1200),
    photo('/photos/plat-bois.webp', 'Deux petites préparations sur une planche en bois', 800, 1200),
    photo('/photos/terrasse-toile.webp', 'Terrasse en bois sous toile blanche, vue sur la campagne', 1140, 759),
    photo('/photos/barabas-petit-dejeuner.webp', 'Longue table et salle rouge et noire, petit-déjeuner dressé', 1140, 759),
    photo('/photos/traiteur-bois.webp', 'Deux petites préparations sur une planche en bois', 1140, 760),
    photo('/photos/cheque-table.webp', 'Table de terrasse, verres, huile et poivrier', 1140, 759),
    photo('/photos/salle-tables.webp', 'Salle du restaurant, tables dressées, murs sombres et tableaux', 1140, 760),
    photo('/photos/terrasse-table.webp', 'Table dressée sur la terrasse, voile rouge', 1140, 759),
    photo('/photos/barabas-orientale.webp', 'Chambre colorée, bleu, orange et carreaux', 1140, 759),
    photo('/photos/barabas-glamour.webp', 'Suite Glamour : lit, tête de lit fuchsia, poutres', 1140, 759),
    photo('/photos/barabas-piscine.webp', 'Piscine extérieure avec jet, pins en fond', 1140, 759),
    photo('/photos/barabas-chambre-rouge.webp', 'Chambre, tête de lit rouge, poutre apparente', 1140, 759),
  ],
  valeurs: ['Cuisine de saison', 'Terrasse, jardin et point d’eau', 'Cuisine ouverte'],
};

/** Photo par chemin (erreur explicite si le chemin n'existe pas : un gabarit ne doit pas pointer dans le vide). */
export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}

/** Adresse sur une ligne. */
export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;

/** Horaires lisibles : '12:00 à 14:30, 19:00 à 21:30' ou la note. */
export const horaireTexte = (h: Horaire) =>
  h.creneaux.length ? h.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(', ') : h.note || 'fermé';

/** Les 3 lignes d'horaires de la carte de clôture : soirs, midis, jours de fermeture (calculées, jamais écrites en dur). */
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

/** Vrai si les heures affichées sont illustratives (les jours, eux, viennent du site officiel). */
export const heuresIllustratives = (r: Restaurant = site) => r.horaires.some((h) => h.heuresPlaceholder);

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;
