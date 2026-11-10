// Tout le contenu du site vit ici. Source : data/restaurants/li-micougni/donnees.json, dossier.md et photos/index.json.
// Ce qui n'est pas prouvé par le dossier porte `placeholder: true` et une marque visible là où il s'affiche, ou vaut `null`.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string | null; description: string; placeholder: boolean }
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
  geo: { lat: number; lon: number } | null; // GPS inconnu au dossier : jamais publié
  telephone: string; // format international
  email: string;
  reservation: { outil: string; url: string };
  horaires: Horaire[];
  horairesPlaceholder: boolean; // horaires précis à confirmer : affichés avec la mention « à confirmer », jamais publiés en JSON-LD
  reseaux: Reseau[];
  carte: Categorie[];
  menus: Menu[];
  histoire: string[]; // un paragraphe par entrée
  avis: never[]; // aucun avis sourcé au dossier
  photos: Photo[];
  valeurs: string[];
}

const photo = (nom: string, alt: string, largeur: number, hauteur: number): Photo => ({ src: `/photos/${nom}.webp`, alt, largeur, hauteur, placeholder: false });

export const site: Restaurant = {
  slug: 'li-micougni',
  nom: 'Li Micougni',
  baseline: 'Produits locaux et de saison, ardoises à partager et grillades au charbon de bois, au centre de Namur.',
  description:
    'Li Micougni, restaurant à Namur : produits locaux et de saison, ardoises à partager, grillades au charbon de bois et terrasse dans une cour privée.',
  url: 'https://www.limicougni.com',
  typeCuisine: 'Produits locaux de saison, grillades au charbon de bois',
  adresse: { rue: 'Rue des Brasseurs', numero: '110', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: null,
  telephone: '+32 470 59 75 96',
  email: 'limicougni@gmail.com',
  reservation: { outil: 'téléphone ou e-mail', url: 'https://www.limicougni.com/contact' },
  // Le site actuel annonce « ouverts à partir de mardi soir 17h jusqu'à dimanche 17h » ; les heures de fermeture et le détail midi / soir ne sont pas connus (dossier.md : contradictoire, à confirmer).
  horaires: [
    { jour: 'lundi', creneaux: [], note: 'fermé' },
    { jour: 'mardi', creneaux: [{ ouverture: '17:00', fermeture: '22:00' }] },
    { jour: 'mercredi', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '22:00' }] },
    { jour: 'jeudi', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '22:00' }] },
    { jour: 'vendredi', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '22:00' }] },
    { jour: 'samedi', creneaux: [{ ouverture: '12:00', fermeture: '22:00' }] },
    { jour: 'dimanche', creneaux: [{ ouverture: '11:30', fermeture: '17:00' }] },
  ],
  horairesPlaceholder: true,
  reseaux: [
    { nom: 'Facebook', url: 'https://facebook.com/61585258150821/' },
    { nom: 'Instagram', url: 'https://instagram.com/limicougninamur' },
  ],
  carte: [
    {
      categorie: "Les ardoises à partager",
      plats: [
        { nom: "L’ardoise Li Micougni", description: "charcuteries, fromages, tapas fromages, tapenade, raisins, confiture, grissini, fruits secs, olives, salade, pain", prix: "27 €", placeholder: false },
        { nom: "L’ardoise camembert rôti", description: "sélection de charcuteries, petit camembert rôti au thym et miel, pommes grenailles", prix: "24,50 €", placeholder: false },
        { nom: "L’ardoise de la mer", description: "sardines à l’huile, gambas, scampis, saumon fumé, tapas crevettes grises, anneaux de calamar, mayonnaise au safran, pickles d’oignons rouges, citron, salade, houmous", prix: "29,50 €", placeholder: false },
      ],
    },
    {
      categorie: "À grignoter",
      plats: [
        { nom: "Saucisson du moment", description: "", prix: "7,10 €", placeholder: false },
        { nom: "Assiette de fromages", description: "", prix: "7,50 €", placeholder: false },
        { nom: "Calamars frits sauce tartare maison", description: "", prix: "9,50 €", placeholder: false },
        { nom: "Tapas 6 pièces fromage", description: "", prix: "15,50 €", placeholder: false },
        { nom: "Tapas 6 pièces crevettes", description: "", prix: "16,90 €", placeholder: false },
        { nom: "Tapas mixte", description: "tapas crevettes et tapas fromage", prix: "15,90 €", placeholder: false },
      ],
    },
    {
      categorie: "Les entrées",
      plats: [
        { nom: "Les escargots de Namur", description: "beurre persil ail", prix: "18,75 €", placeholder: false },
        { nom: "Saumon fumé", description: "mascarpone au citron jaune, herbes, toast de pain grillé", prix: "15,75 €", placeholder: false },
        { nom: "Le lard confit et velouté de petits pois", description: "huile d’olive, oignons frits, herbes fraîches", prix: "15,30 €", placeholder: false },
        { nom: "Poireau vinaigrette", description: "chips de jambon italien, moutarde miel, mayonnaise safran, œuf mimosa, herbes fraîches", prix: "15,90 €", placeholder: false },
        { nom: "Croquettes maison fromage", description: "", prix: "10,35 €", placeholder: false },
        { nom: "Croquettes maison crevettes grises", description: "", prix: "12,45 €", placeholder: false },
        { nom: "2 croquettes au choix", description: "", prix: "18,75 €", placeholder: false },
      ],
    },
    {
      categorie: "Les plats",
      plats: [
        { nom: "Boulettes sauce tomate de Mamy Max", description: "porc et veau, sauce tomate, frites", prix: "22,30 €", placeholder: false },
        { nom: "Vol-au-vent à la volaille jaune et son feuilleté", description: "", prix: "25,50 €", placeholder: false },
        { nom: "Magret de canard", description: "cuit à la grillade, purée de patates douces, légumes cuits à l’anglaise, sauce brune au thym du jardin", prix: "30,90 €", placeholder: false },
        { nom: "Li Micougni burger", description: "burger 100 % pur bœuf, fromage aux herbes, salade, tomate, oignons caramélisés, sauce maison, frites", prix: "22,25 €", placeholder: false },
        { nom: "Parmigiana", description: "aubergines, salade, frites", prix: "22,15 €", placeholder: false },
        { nom: "Volaille jaune", description: "suprême, endives, carottes, pommes de terre rissolées, sauce Sambre & Meuse", prix: "24,15 €", placeholder: false },
      ],
    },
    {
      categorie: "Les pâtes",
      plats: [
        { nom: "Pâtes champignons truffe", description: "tagliatelles, champignons de Paris, pleurotes, tartufata, crème, roquette", prix: "26,60 €", placeholder: false },
        { nom: "Pâtes burrata di bufala", description: "tagliatelles, burrata, citron, pesto vert, tomates cerises, roquette", prix: "22,40 €", placeholder: false },
        { nom: "Pâtes du chef", description: "tagliatelles, scampis, chorizo, crème de poivron, roquette", prix: "25,90 €", placeholder: false },
      ],
    },
    {
      categorie: "Les salades",
      plats: [
        { nom: "Salade de la mer", description: "scampis, tapas crevettes, saumon fumé, citron, tomates cerises, concombre, oignon rouge, vinaigrette", prix: "25,20 €", placeholder: false },
        { nom: "Salade au chèvre chaud", description: "chèvre, tomates cerises, oignon rouge, noix, œuf, pomme, miel, vinaigrette ; supplément lard confit +3 €", prix: "23,50 €", placeholder: false },
      ],
    },
    {
      categorie: "Les grillades (cuites au charbon de bois)",
      plats: [
        { nom: "Onglet de bœuf", description: "salade, frites, sauce à l’échalote", prix: "28,50 €", placeholder: false },
        { nom: "Entrecôte de bœuf 350 g", description: "salade, frites, sauce au choix", prix: "32,40 €", placeholder: false },
        { nom: "Pavé de bœuf 250 g", description: "salade, frites, sauce au choix", prix: "28 €", placeholder: false },
        { nom: "Magret de canard", description: "salade, frites, sauce au choix", prix: "28,50 €", placeholder: false },
        { nom: "Spareribs de porc", description: "salade, frites, sauce au choix", prix: "25 €", placeholder: false },
        { nom: "Épée de bœuf", description: "brochette, salade, frites, sauce au choix", prix: "26 €", placeholder: false },
        { nom: "Épée de poulet", description: "brochette, salade, frites, sauce au choix", prix: "25 €", placeholder: false },
        { nom: "Épée de gambas", description: "brochette, salade, frites, sauce au choix", prix: "27,50 €", placeholder: false },
      ],
    },
    {
      categorie: "Sauces maison",
      plats: [
        { nom: "Béarnaise, poivre, champignon, Sambre & Meuse, orange, tartare, aïoli", description: "", prix: null, placeholder: false },
        { nom: "Sauce truffée", description: "", prix: "+2 €", placeholder: false },
      ],
    },
    {
      categorie: "Suppléments",
      plats: [
        { nom: "Frites maison", description: "", prix: "3 €", placeholder: false },
        { nom: "Tagliatelles", description: "", prix: "3 €", placeholder: false },
        { nom: "Assiette de légumes", description: "", prix: "5 €", placeholder: false },
        { nom: "Salade", description: "", prix: "3 €", placeholder: false },
        { nom: "Sauce au choix", description: "", prix: "3 €", placeholder: false },
      ],
    },
    {
      categorie: "Desserts",
      plats: [
        { nom: "Glaces (vanille, chocolat, citron, pistache)", description: "+2 € par boule supplémentaire", prix: "3 €", placeholder: false },
        { nom: "Dame blanche", description: "", prix: "9 €", placeholder: false },
        { nom: "Pain perdu", description: "", prix: "9 €", placeholder: false },
        { nom: "Crème brûlée", description: "", prix: "8 €", placeholder: false },
        { nom: "Colonel", description: "", prix: "9 €", placeholder: false },
        { nom: "Moelleux au chocolat", description: "", prix: "9 €", placeholder: false },
        { nom: "Poire belle Hélène", description: "", prix: "9 €", placeholder: false },
        { nom: "Tarte tatin avec glace", description: "", prix: "9 €", placeholder: false },
      ],
    },
  ],
  menus: [
    {
      nom: 'Menu de la semaine',
      prix: null,
      description: 'Entrée et plat, plat et dessert, ou trois services : des suggestions hors carte, à prix raisonnable. Le prix n’est pas publié.',
      placeholder: false,
    },
    {
      nom: 'Menu enfant',
      prix: '18 €',
      description: 'Croquette au fromage et boulette sauce tomate, ou boulette sauce tomate et une boule de glace au choix.',
      placeholder: false,
    },
  ],
  histoire: [
    'Li Micougni est né de l’amitié de deux passionnés de l’horeca : l’envie de bien recevoir et le plaisir de se retrouver autour d’une table.',
    'Le nom vient de la culture wallonne. Chez nous, vous êtes tous les bienvenus, même les demi-fous.',
    'La carte privilégie les produits locaux et de saison, le fait maison, et elle évolue régulièrement. Les grillades sont cuites au charbon de bois, les sauces sont faites maison.',
    'Les ardoises se commandent pour deux : charcuteries, fromages ou produits de la mer. Et derrière la salle, une cour privée accueille 30 couverts toute l’année.',
  ],
  avis: [],
  photos: [
    photo('grill-charbon', 'Grill au charbon de bois dans la cour', 1290, 1717),
    photo('ardoise-partage', 'Ardoise de charcuteries et de fromages à partager', 1800, 1200),
    photo('salle', 'Vue large de la salle : banquettes rouges et fauteuils bruns', 1800, 1200),
    photo('salle-tables', 'La salle, tables en bois et fauteuils', 1600, 2400),
    photo('salle-fenetres', 'La salle côté fenêtres, avec des fleurs', 1600, 2400),
    photo('terrasse', 'Terrasse arrière dans la cour privée, sous un parasol', 1350, 2400),
    photo('salade-chevre', 'Salade au chèvre chaud en cuisine', 1800, 1200),
    photo('salade-chevre-service', 'Salade au chèvre chaud servie à l’assiette', 1600, 2400),
    photo('ardoise-logo', 'Ardoise gravée au logo, détail', 1800, 1200),
    photo('plat-rouget', 'Rouget, sauce verte et légumes', 1500, 2000),
    photo('plat-viande', 'Viande en sauce, carotte-patate douce et endive', 1600, 1199),
    photo('plat-poisson-creme', 'Poisson, sauce crémeuse et pommes de terre', 1200, 1600),
    photo('plat-saumon-fume', 'Saumon fumé, mascarpone et gressin', 1600, 1199),
    photo('plat-bol-viande', 'Plat servi en bol : viande et fromage frais', 1290, 1714),
    photo('plat-veloute', 'Velouté, croûtons et œuf', 1290, 1714),
    photo('polaroids', 'Tableau de polaroïds et fleurs', 1800, 2400),
  ],
  valeurs: ['Produits locaux et de saison', 'Fait maison', 'Carte évolutive', 'Convivialité et partage'],
};

export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue : ${src}`);
  return p;
}

export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;

/** Lien d'itinéraire : recherche par adresse (le GPS n'est pas connu). */
export const itineraire = (r: Restaurant = site) => `https://www.openstreetmap.org/search?query=${encodeURIComponent(adresseLigne(r))}`;

/** Horaires d'un jour en texte. */
export const horaireTexte = (h: Horaire) =>
  h.creneaux.length ? h.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(', ') : h.note || 'fermé';

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;

// ---------------------------------------------------------------------------------------------
// Contenu propre au gabarit « Guinguette », adapté à Li Micougni.
// ---------------------------------------------------------------------------------------------

export type ObjetId = 'frites' | 'fourchette' | 'verre' | 'parasol' | 'bouteille' | 'citron' | 'flamme' | 'ardoise';
export interface Objet { id: ObjetId; label: string; x: number; y: number; r: number; taille: number; mobile: boolean; mx?: number }
export interface Tirage { src: string; alt: string; x: number; y: number; r: number; legende: string; placeholder: boolean }
export interface Picto { categorie: string; picto: ObjetId }
export interface Fait { etiquette: string; texte: string; r: number }

export const guinguette = {
  /** Titre et slogan du hero. Le slogan reprend le mot d'accueil du site actuel (nom wallon). */
  heroTitre: ['Li Micougni,', 'tous à table'],
  slogan: { texte: 'vous êtes tous les bienvenus, même les demi-fous', placeholder: false },
  objets: [
    { id: 'parasol', label: 'Parasol dessiné au trait', x: 6, y: 10, r: -12, taille: 150, mobile: true, mx: 4 },
    { id: 'verre', label: 'Verre à pied dessiné au trait', x: 84, y: 8, r: 10, taille: 110, mobile: false },
    { id: 'frites', label: 'Cornet de frites dessiné au trait', x: 10, y: 66, r: 8, taille: 130, mobile: true, mx: 40 },
    { id: 'ardoise', label: 'Ardoise à partager dessinée au trait', x: 30, y: 78, r: -14, taille: 120, mobile: false },
    { id: 'bouteille', label: 'Bouteille dessinée au trait', x: 80, y: 60, r: 14, taille: 140, mobile: true, mx: 74 },
    { id: 'flamme', label: 'Flamme de charbon de bois dessinée au trait', x: 62, y: 82, r: -6, taille: 100, mobile: false },
  ] as Objet[],
  /** La table : 12 tirages à cadre blanc (photos réelles, légendes d'après le sujet de la photo). */
  tirages: [
    { src: '/photos/grill-charbon.webp', alt: 'Grill au charbon de bois dans la cour', x: 4, y: 6, r: -7, legende: 'Le grill au charbon', placeholder: false },
    { src: '/photos/ardoise-partage.webp', alt: 'Ardoise de charcuteries et de fromages à partager', x: 22, y: 2, r: 5, legende: 'L’ardoise à partager', placeholder: false },
    { src: '/photos/salle.webp', alt: 'La salle : banquettes rouges et fauteuils bruns', x: 42, y: 4, r: -3, legende: 'La salle', placeholder: false },
    { src: '/photos/terrasse.webp', alt: 'Terrasse arrière dans la cour privée, sous un parasol', x: 62, y: 3, r: 8, legende: 'La terrasse', placeholder: false },
    { src: '/photos/salade-chevre.webp', alt: 'Salade au chèvre chaud en cuisine', x: 80, y: 8, r: -5, legende: 'Salade au chèvre chaud', placeholder: false },
    { src: '/photos/plat-rouget.webp', alt: 'Rouget, sauce verte et légumes', x: 2, y: 44, r: 6, legende: 'Rouget, sauce verte', placeholder: false },
    { src: '/photos/plat-viande.webp', alt: 'Viande en sauce, carotte-patate douce et endive', x: 20, y: 52, r: -9, legende: 'Viande en sauce', placeholder: false },
    { src: '/photos/plat-saumon-fume.webp', alt: 'Saumon fumé, mascarpone et gressin', x: 40, y: 48, r: 4, legende: 'Saumon fumé', placeholder: false },
    { src: '/photos/plat-veloute.webp', alt: 'Velouté, croûtons et œuf', x: 58, y: 54, r: -6, legende: 'Velouté', placeholder: false },
    { src: '/photos/polaroids.webp', alt: 'Tableau de polaroïds et fleurs', x: 78, y: 50, r: 7, legende: 'Les polaroïds', placeholder: false },
    { src: '/photos/salle-fenetres.webp', alt: 'La salle côté fenêtres, avec des fleurs', x: 12, y: 26, r: 3, legende: 'Côté fenêtres', placeholder: false },
    { src: '/photos/ardoise-logo.webp', alt: 'Ardoise gravée au logo, détail', x: 68, y: 28, r: -4, legende: 'L’ardoise gravée', placeholder: false },
  ] as Tirage[],
  /** Pictogramme au trait par catégorie de carte. */
  pictos: [
    { categorie: 'Les ardoises', picto: 'ardoise' },
    { categorie: 'À grignoter', picto: 'frites' },
    { categorie: 'Les entrées', picto: 'citron' },
    { categorie: 'Les plats', picto: 'fourchette' },
    { categorie: 'Les pâtes', picto: 'fourchette' },
    { categorie: 'Les salades', picto: 'citron' },
    { categorie: 'Les grillades', picto: 'flamme' },
    { categorie: 'Sauces', picto: 'bouteille' },
    { categorie: 'Suppléments', picto: 'frites' },
    { categorie: 'Desserts', picto: 'parasol' },
  ] as Picto[],
  /** Cartes posées sous le mot géant : uniquement des faits du dossier (aucun avis n'est publié). */
  faits: [
    { etiquette: 'Au charbon de bois', texte: 'Onglet, entrecôte, spareribs, brochettes : les grillades sont cuites au charbon de bois, avec des sauces maison.', r: -4 },
    { etiquette: 'Pour deux', texte: 'Charcuteries, fromages, camembert rôti ou produits de la mer : trois ardoises à partager.', r: 3 },
    { etiquette: 'Mamy Max', texte: 'Les boulettes sauce tomate, porc et veau, servies avec des frites.', r: -2 },
    { etiquette: 'De Namur', texte: 'Les escargots arrivent au beurre persil ail, et la carte suit les saisons.', r: 5 },
  ] as Fait[],
  motFaits: 'Braise',
  /** Terrasse (site actuel) et privatisation. */
  terrasse: {
    texte: 'Derrière la salle, une cour privée accueille 30 couverts, toute l’année. Le grill au charbon de bois y est installé.',
    points: ['30 couverts', 'cour privée', 'ouverte toute l’année', 'grill au charbon'],
    privatisation: 'Anniversaires, réunions, évènements : le lieu se privatise, avec un menu adapté à votre budget.',
  },
  /** Manifeste : phrases tirées des valeurs réelles du dossier. */
  manifeste: {
    titre: ['Local, de saison', 'et à partager'],
    motItalique: 'partager',
    texte: 'Des produits locaux et de saison, du fait maison, une carte qui évolue, et des ardoises que l’on pose au milieu de la table.',
  },
  finale: 'À table !',
};

/** Vrai si l'heure donnée (HH:MM) est dans un créneau. */
export const estOuvert = (h: Horaire, hhmm: string) => h.creneaux.some((c) => c.ouverture <= hhmm && hhmm < c.fermeture);
