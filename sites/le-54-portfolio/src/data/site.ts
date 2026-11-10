// Tout le contenu du gabarit « Velours » vit ici. Source : data/restaurants/le-54/dossier.md et donnees.json.
// Une donnée, un drapeau : `placeholder: true` ne vaut que pour le champ qu'il accompagne. Toute sous-donnée non prouvée
// par le dossier porte son propre drapeau et une marque visible là où elle s'affiche.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string; aConfirmer?: boolean } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string; aConfirmer?: boolean } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean; descriptionPlaceholder?: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean; services?: number; quand?: string; aConfirmer?: boolean }
export interface Membre { nom: string; role: string; photo?: string; placeholder: boolean; rolePlaceholder?: boolean; bio?: string[]; bioPlaceholder?: boolean }
export interface Avis { texte: string; auteur: string; source: string; date: string; note?: number; placeholder: boolean; url?: string | null }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }
/** Chiffre monumental d'un chapitre : seulement des nombres prouvés par le dossier (preuve citée). */
export interface Chiffre { valeur: number; libelle: string; sousLibelle?: string; preuve: string; placeholder: false }
export interface Distinction { nom: string; detail: string; url: string | null; placeholder: boolean }
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
  telephone2: string;
  monogramme: string; // initiales du logo cerclé
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
  chiffres: { services: Chiffre; prix: Chiffre; famille: Chiffre; ouverture: Chiffre };
  distinctions: Distinction[];
  citation: Avis;
  maison: { intro: string; offres: Offre[] };
  pratique: { libelle: string; valeur: string; aConfirmer?: boolean }[];
}

const photo = (src: string, alt: string, largeur: number, hauteur: number, placeholder = false): Photo => ({ src, alt, largeur, hauteur, placeholder });
const nb = ' '; // espace insécable (prix, guillemets)

export const site: Restaurant = {
  slug: 'le-54',
  nom: 'Le 54',
  monogramme: '54',
  baseline: `Table gastronomique de Dave, au bord de la Meuse. Un menu de saison en 3 ou 4 services.`,
  description:
    `Le 54, table gastronomique à Dave (Namur) : menu de saison en 3 services à 48${nb}€ ou 4 services à 65${nb}€, cuisine du chef Jonathan Collignon.`,
  url: 'https://www.le54dave.be',
  typeCuisine: 'Cuisine gastronomique française inventive, de saison et de marché',
  adresse: { rue: 'Rue de Longeau', numero: '54', cp: '5100', commune: 'Dave (Namur)', pays: 'BE' },
  geo: { lat: 50.4188668, lon: 4.8850885 },
  telephone: '+32 81 58 04 40',
  telephone2: '+32 496 35 10 75',
  email: { valeur: 'restaurantle54@gmail.com', placeholder: false }, // affiché sur le site actuel
  reservation: {
    outil: 'Téléphone et formulaire de contact',
    url: 'https://www.le54dave.be/contact',
    note: `Réservation souhaitée. Allergies et intolérances : à signaler lors de la réservation.`,
  },
  // Site actuel : « fermé mardi, mercredi et samedi midi ». Plages 12:00-14:00 / 18:30-21:00 : Trouve Ton Resto, à confirmer.
  // Lundi : le site actuel ne le dit pas fermé, La-carte.be oui : à confirmer.
  horaires: [
    { jour: 'lundi', creneaux: [{ ouverture: '12:00', fermeture: '14:00', aConfirmer: true }, { ouverture: '18:30', fermeture: '21:00', aConfirmer: true }], aConfirmer: true },
    { jour: 'mardi', creneaux: [], note: 'fermé' },
    { jour: 'mercredi', creneaux: [], note: 'fermé' },
    { jour: 'jeudi', creneaux: [{ ouverture: '12:00', fermeture: '14:00', aConfirmer: true }, { ouverture: '18:30', fermeture: '21:00', aConfirmer: true }] },
    { jour: 'vendredi', creneaux: [{ ouverture: '12:00', fermeture: '14:00', aConfirmer: true }, { ouverture: '18:30', fermeture: '21:00', aConfirmer: true }] },
    { jour: 'samedi', creneaux: [{ ouverture: '18:30', fermeture: '21:00', aConfirmer: true }], note: 'le soir seulement' },
    { jour: 'dimanche', creneaux: [{ ouverture: '12:00', fermeture: '14:00', aConfirmer: true }, { ouverture: '18:30', fermeture: '21:00', aConfirmer: true }] },
  ],
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/Restaurant-LE-54--146193728765518/' },
    { nom: 'Instagram', url: 'https://www.instagram.com/le54dave/' },
  ],
  carte: [
    {
      categorie: 'Menu du moment',
      plats: [
        { nom: 'Fin tranchée de veau, sauce tonnato', description: "Veau cuit en basse température, sauce tonnato, œufs de truite, câpres. Et/ou crevettes nobashi en raviole au curry et juste raidie, crème de dashi.", prix: null, placeholder: false },
        { nom: 'Bœuf wagyu A5', description: `Véritable bœuf wagyu A5 (100${nb}g), sel au charbon. Supplément de 40${nb}€.`, prix: null, placeholder: false },
        { nom: 'Cochon de lait ou zarzuela', description: `Cochon de lait légèrement saumuré, garniture estivale, pimentos, pommes de terre confites à l'huile d'olive. Ou zarzuela à notre façon, poissons et coquillages selon arrivage, légumes du sud.`, prix: null, placeholder: false },
        { nom: 'Plaisir sucré', description: '', prix: null, placeholder: false },
      ],
    },
    {
      categorie: 'Suppléments et options',
      plats: [
        { nom: 'Bœuf wagyu A5, 100 g', description: 'sel au charbon', prix: `+40${nb}€`, placeholder: false },
        { nom: 'Zarzuela Royale', description: 'avec un demi-homard, minimum 2 personnes', prix: `+25${nb}€`, placeholder: false },
        { nom: 'Zarzuela Impériale', description: 'avec une demi-langouste, minimum 2 personnes', prix: `+35${nb}€`, placeholder: false },
        { nom: 'Allergies et intolérances', description: 'la cuisine adapte le menu si vous les signalez à la réservation', prix: null, placeholder: false },
      ],
    },
  ],
  // Menus : 3 et 4 services (site actuel) ; 2 services (Gault&Millau seulement, à confirmer).
  menus: [
    { nom: 'Menu 3 services', prix: `48${nb}€`, services: 3, quand: 'menu du moment', description: 'Le menu du moment en trois services.', placeholder: false },
    { nom: 'Menu 4 services', prix: `65${nb}€`, services: 4, quand: 'menu du moment', description: `Le menu du moment en quatre services. Gault&Millau indique 62${nb}€.`, placeholder: false, aConfirmer: true },
    { nom: 'Menu 2 services', prix: `30${nb}€`, services: 2, quand: 'indiqué par Gault&Millau', description: 'Formule courte relevée par le guide, absente du site de la maison.', placeholder: false, aConfirmer: true },
  ],
  histoire: [
    "Michel et Véronique Collignon reprennent l'établissement avec leur fils Jonathan en 2010 et lui donnent une dimension plus gastronomique.",
    "Jonathan Collignon est diplômé de l'École hôtelière provinciale de Namur. Il est passé par Le Vivier d'Oies, chez le chef Godelet, puis a fait un stage chez le chef Pauly, au Coq aux Champs.",
    "Autodidacte et créatif, il promeut les artisans locaux avec une carte de saison fréquemment renouvelée : une cuisine raffinée, savoureuse, qui va à l'essentiel.",
    "La salle, chaleureuse et confortable, est au bord de la Meuse, à deux pas de Namur. Trente-quatre couverts au plus.",
  ],
  equipe: [
    { nom: 'Jonathan Collignon', role: 'Chef', placeholder: false },
    { nom: 'Michel Collignon', role: 'Reprise de la maison avec son épouse et son fils, en 2010', placeholder: false },
    { nom: 'Véronique Collignon', role: 'Reprise de la maison avec son époux et son fils, en 2010', placeholder: false },
  ],
  citation: {
    texte: `Pas une seule fois nous avons été déçu.`,
    auteur: 'Lorry K.',
    source: 'Avis publié sur Trouve Ton Resto',
    url: null,
    date: '',
    placeholder: false,
  },
  avis: [
    { texte: `Accueil chaleureux, d'une gentillesse…`, auteur: 'Virlet V.', source: 'Trouve Ton Resto', url: null, date: '', placeholder: false },
    { texte: `Les mets y sont bons et frais.`, auteur: 'Ornella S.', source: 'Trouve Ton Resto', url: null, date: '', placeholder: false },
  ],
  chiffres: {
    services: { valeur: 4, libelle: 'services', sousLibelle: 'un menu de saison en trois ou quatre services', preuve: 'dossier.md, carte du site client', placeholder: false },
    prix: { valeur: 48, libelle: 'euros', sousLibelle: `le menu en 3 services, 65${nb}€ en 4 services`, preuve: 'dossier.md, site client /lacarte', placeholder: false },
    famille: { valeur: 3, libelle: 'Collignon', sousLibelle: 'Michel, Véronique et Jonathan, une maison de famille', preuve: 'dossier.md, le54dave.be/a-propos', placeholder: false },
    ouverture: { valeur: 2010, libelle: 'reprise en famille', sousLibelle: 'la maison devient plus gastronomique', preuve: 'dossier.md, le54dave.be/a-propos', placeholder: false },
  },
  distinctions: [
    { nom: 'Gault&Millau', detail: `13/20 sur la fiche du guide, 13,5/20 selon la maison`, url: 'https://www.gaultmillau.be/en/restaurants/le-54-namur-dave', placeholder: false },
    { nom: 'resto.be', detail: `9,2/10 sur 251 avis`, url: null, placeholder: false },
  ],
  maison: {
    intro: 'Une salle chaleureuse au bord de la Meuse, une terrasse, un parking en face.',
    offres: [
      { nom: 'La salle', texte: `Trente-quatre couverts au plus, une salle chaleureuse et confortable au bord de la Meuse. Une terrasse est aussi à votre disposition.`, textePlaceholder: false, photo: '/photos/salle-sombre.webp' },
      { nom: 'La cuisine', texte: `Une carte de saison et de marché, poissons et fruits de mer, produits des artisans locaux, renouvelée fréquemment.`, textePlaceholder: false, photo: '/photos/geste-dressage.webp' },
      { nom: 'Venir', texte: `Rue de Longeau 54, à Dave. Parking aisé en face du restaurant, accès pour les personnes à mobilité réduite, chiens admis.`, textePlaceholder: false, photo: '/photos/salle-nb-1800.webp' },
    ],
  },
  pratique: [
    { libelle: 'Couverts', valeur: 'trente-quatre au plus', aConfirmer: true },
    { libelle: 'Parking', valeur: 'aisé, en face du restaurant' },
    { libelle: 'Terrasse', valeur: 'oui' },
    { libelle: 'Accès PMR', valeur: 'oui' },
    { libelle: 'Chiens', valeur: 'admis' },
    { libelle: 'Paiement', valeur: 'Visa, MasterCard' },
    { libelle: 'Jours fériés', valeur: 'ouvert' },
  ],
  photos: [
    photo('/photos/salle-nb-1800.webp', 'Salle en noir et blanc, tables dressées', 1800, 1143),
    photo('/photos/hero-salle-960.webp', 'Salle en noir et blanc, tables dressées', 960, 610),
    photo('/photos/salle-sombre.webp', 'Salle à manger, parquet et tables nappées', 1280, 928),
    photo('/photos/plat-langoustine.webp', 'Assiette de langoustine, herbes et émulsion', 1200, 800),
    photo('/photos/plat-saint-jacques.webp', 'Noix de Saint-Jacques dans un bol bleu, crème et ciboulette', 1280, 853),
    photo('/photos/geste-dressage.webp', 'Mains dressant des assiettes en cuisine', 1800, 1200),
    photo('/photos/geste-dressage-700.webp', 'Mains dressant des assiettes en cuisine', 700, 467),
    photo('/photos/dressage-sauce.webp', "Service d'une sauce sur un plat de légumes", 1000, 1500),
    photo('/photos/plat-tartare.webp', 'Tartare dressé sur assiette blanche', 900, 594),
    photo('/photos/plat-veloute.webp', 'Velouté mousseux, pièce rouge et herbes', 900, 600),
    photo('/photos/dessert-amandes.webp', 'Dessert glacé aux amandes effilées', 900, 600),
    photo('/photos/gal-sauce-nb.webp', "Service d'une sauce sur un plat de légumes, en noir et blanc", 900, 1350),
    photo('/photos/gal-bol-noir-nb.webp', 'Plat dans un bol noir, sauce versée à table, en noir et blanc', 900, 600),
    photo('/photos/gal-betterave-nb.webp', 'Assiette de betteraves et légumes en fleurs, en noir et blanc', 900, 832),
    photo('/photos/gal-bol-bleu-nb.webp', 'Plat dans un bol en salle, en noir et blanc', 900, 1064),
    photo('/photos/gal-bols-nb.webp', 'Bols, purée et copeaux, en noir et blanc', 800, 1200),
  ],
  valeurs: ['Artisans et produits locaux', 'Carte de saison fréquemment renouvelée', 'Allergies adaptées sur demande'],
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

/** Les 3 lignes d'horaires de la carte de clôture : soirs, midis, fermetures (calculées, jamais écrites en dur). */
export function horairesResume(r: Restaurant = site): { libelle: string; valeur: string }[] {
  const tous = r.horaires.map((h) => h.jour);
  const soirs = r.horaires.filter((h) => h.creneaux.some((c) => c.ouverture >= '17:00'));
  const midis = r.horaires.filter((h) => h.creneaux.some((c) => c.ouverture < '15:00'));
  const fermes = r.horaires.filter((h) => !h.creneaux.length);
  const liste = (js: string[]) => js.length > 1 ? `${js.slice(0, -1).join(', ')} et ${js[js.length - 1]}` : js.join('');
  const plage = (hs: Horaire[]) => {
    const js = hs.map((h) => h.jour);
    if (js.length === tous.length) return 'tous les jours';
    return js.length > tous.length / 2 ? `tous les jours sauf ${liste(tous.filter((j) => !js.includes(j)))}` : liste(js);
  };
  const heure = (hs: Horaire[], soir: boolean) => { const c = hs[0].creneaux.find((x) => (x.ouverture >= '17:00') === soir)!; return `${c.ouverture} à ${c.fermeture}`; };
  const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  return [
    { libelle: 'Le soir', valeur: `${maj(plage(soirs))}, ${heure(soirs, true)}` },
    { libelle: 'Le midi', valeur: `${maj(plage(midis))}, ${heure(midis, false)}` },
    { libelle: maj(liste(fermes.map((h) => h.jour))), valeur: 'fermé' },
  ];
}

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site, n: 1 | 2 = 1) => `tel:${(n === 2 ? r.telephone2 : r.telephone).replace(/\s+/g, '')}`;
