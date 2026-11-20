// Tout le contenu du gabarit « Velours » vit ici. Source : data/restaurants/carre-d-herbes/dossier.md et donnees.json.
// Une donnée, un drapeau : `placeholder: true` ne vaut que pour le champ qu'il accompagne. Toute sous-donnée non prouvée
// par le dossier porte son propre drapeau et une marque visible là où elle s'affiche.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean; descriptionPlaceholder?: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean; services?: number; quand?: string }
export interface Membre { nom: string; role: string; photo?: string; placeholder: boolean; rolePlaceholder?: boolean; bio?: string[]; bioPlaceholder?: boolean }
export interface Avis { texte: string; auteur: string; source: string; date: string; note?: number; placeholder: boolean; url?: string }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }
/** Chiffre monumental d'un chapitre : seulement des nombres prouvés par le dossier (preuve citée). */
export interface Chiffre { valeur: number; libelle: string; sousLibelle?: string; preuve: string; placeholder: false }
export interface Distinction { nom: string; detail: string; url: string; placeholder: boolean }
export interface Offre { nom: string; texte: string; textePlaceholder: boolean; photo: string; lien?: string }

export interface Restaurant {
  slug: string;
  nom: string;
  monogramme: string;
  baseline: string;
  description: string; // meta description par défaut (50 à 160 caractères)
  url: string; // site actuel du client
  typeCuisine: string; // schema.org servesCuisine
  adresse: { rue: string; numero: string; cp: string; commune: string; pays: string };
  geo: { lat: number; lon: number } | null; // GPS inconnu : pas de JSON-LD geo, itinéraire par adresse
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
  chiffres: { menus: Chiffre; prix: Chiffre; parc: Chiffre; parking: Chiffre };
  distinctions: Distinction[];
  citation: Avis;
  fetes: { intro: string; offres: Offre[] };
  bonCadeau: { montants: string; texte: string; placeholder: boolean };
}

const photo = (src: string, alt: string, largeur: number, hauteur: number, placeholder = false): Photo => ({ src, alt, largeur, hauteur, placeholder });

export const site: Restaurant = {
  slug: 'carre-d-herbes',
  nom: "Carré d'herbes",
  monogramme: 'Ch',
  baseline: 'Cuisine sincère et raffinée, entre Namur et Profondeville',
  description:
    "Carré d'herbes, restaurant gastronomique à Wépion (Namur) : menus en 2 à 5 assiettes de 38 à 85 €, produits locaux de saison, parc et terrasse en bord de Meuse.",
  url: 'https://carredherbes.be',
  typeCuisine: 'Cuisine raffinée de saison, produits locaux, fait maison',
  adresse: { rue: 'Chaussée de Dinant', numero: '780', cp: '5100', commune: 'Wépion (Namur)', pays: 'BE' },
  geo: null, // dossier : GPS inconnu
  telephone: '+32 81 34 48 19',
  email: { valeur: '', placeholder: true }, // dossier : e-mail inconnu. Jamais de mailto: illustratif.
  reservation: {
    outil: 'téléphone',
    url: 'https://carredherbes.be/reservations/',
    note: "La réservation se fait par téléphone, du mercredi au dimanche à partir de 10h. Pour les jours de fermeture, le formulaire de contact du restaurant prend le relais.",
  },
  horaires: [
    { jour: 'lundi', creneaux: [], note: 'fermé' },
    { jour: 'mardi', creneaux: [], note: 'fermé' },
    { jour: 'mercredi', creneaux: [], note: 'fermé' },
    { jour: 'jeudi', creneaux: [{ ouverture: '12:00', fermeture: '16:00' }, { ouverture: '19:00', fermeture: '00:00' }] },
    { jour: 'vendredi', creneaux: [{ ouverture: '12:00', fermeture: '16:00' }, { ouverture: '19:00', fermeture: '00:00' }] },
    { jour: 'samedi', creneaux: [{ ouverture: '12:00', fermeture: '16:00' }, { ouverture: '19:00', fermeture: '00:00' }] },
    { jour: 'dimanche', creneaux: [{ ouverture: '12:00', fermeture: '16:00' }] },
  ],
  reseaux: [{ nom: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100092685321462' }],
  carte: [
    {
      categorie: 'Menu en 3 assiettes, les plats du moment',
      plats: [
        { nom: 'Foie gras', description: 'Foie gras de canard cuit au torchon, pommes Royal Gala, anguille fumée à la flamme, pain brioché au charbon végétal', prix: null, placeholder: false },
        { nom: 'Biche', description: 'Biche en 2 préparations : le rôti cuit basse température et la gigue confite en effilochée, focaccia, morbier, échalotes, carottes rolls, sauce à la Leffe brune', prix: null, placeholder: false },
        { nom: 'Poire', description: 'Poire, crumble, fromage blanc, glace chocolat blanc et vanille, toffee miso', prix: null, placeholder: false },
      ],
    },
    {
      categorie: 'Menus en 4 et 5 assiettes, entrées supplémentaires et poisson',
      plats: [
        { nom: 'Saint-Jacques', description: 'Os à moelle gratiné, noix de St-Jacques snackée, bœuf Aubrac fumé, huile verte au poireau, espuma tartufata', prix: null, placeholder: false },
        { nom: 'Ris de veau (menu 5 assiettes)', description: "Ris de veau croustillant, coque d'oignon, girolles, guanciale, crème d'Isigny, persil, Parmesan", prix: null, placeholder: false },
        { nom: 'Poisson', description: 'Pêche du jour, farce fine aux herbes, trompettes de la mort, lard confit, céleri-rave, beurre nantais', prix: null, placeholder: false },
      ],
    },
    {
      categorie: 'Desserts et fromages',
      plats: [
        { nom: 'Dame blanche à notre façon', description: '', prix: null, placeholder: false },
        { nom: 'Sabayon au Champagne', description: 'Gratiné, fruit et glace du moment', prix: null, placeholder: false },
        { nom: 'Île flottante revisitée', description: 'Marmelade de rhubarbe et framboises, crème anglaise vanillée', prix: null, placeholder: false },
        { nom: 'Assiette de fromages affinés', description: 'En supplément, ou en remplacement du dessert', prix: '15 € / 7 €', placeholder: false },
      ],
    },
    {
      categorie: 'Régimes et allergies',
      plats: [
        { nom: 'Menu végétarien', description: 'à signaler lors de la réservation', prix: null, placeholder: false },
        { nom: 'Allergies et intolérances', description: 'à signaler lors de la réservation ; menus vegan et sans lactose impossibles', prix: null, placeholder: false },
      ],
    },
  ],
  menus: [
    { nom: 'Lunch en 2 assiettes', prix: '38 €', services: 2, quand: 'le midi et le jeudi soir sur réservation, sauf dimanche et jours fériés', description: "Entrée et plat annoncés oralement, selon l'inspiration du chef. 48 € avec un dessert commandé en début de repas.", placeholder: false },
    { nom: 'Menu en 3 assiettes', prix: '55 €', services: 3, quand: 'entrée, plat, dessert', description: 'Accord mets-vins en option : 69 €.', placeholder: false },
    { nom: 'Menu en 4 assiettes', prix: '68 €', services: 4, quand: 'deux entrées, plat, dessert', description: 'Accord mets-vins en option : 89 €.', placeholder: false },
    { nom: 'Menu en 5 assiettes', prix: '85 €', services: 5, quand: 'trois entrées, plat, dessert', description: 'Accord mets-vins en option : 113 €.', placeholder: false },
  ],
  bonCadeau: { montants: 'de la valeur de votre choix, ou deux menus au choix', texte: 'Valable 6 mois, sauf le samedi soir. Retrait au restaurant.', placeholder: false },
  histoire: [
    "Le chef Damien Herbay a fait son apprentissage sous la direction d'Éric Briffard, puis s'est perfectionné aux Forges du Pont d'Oye, à La Table des Guilloux et à L'Air du Temps. Un jour, il réalise son rêve : ouvrir les portes de sa maison.",
    "Le nom du lieu a trois sources : la tour carrée de la façade, le carré potager d'aromates du jardin, et un clin d'œil au nom du chef, Herbay.",
    "Une maison de bord de Meuse entièrement rénovée, un parc arboré de plus de 28 ares, une terrasse au calme. Tout ce qui est proposé à la dégustation est fait maison, avec des produits locaux de saison.",
    "Damien Herbay est au fourneau, Anne-Sophie Gevaert-Herbay vous accueille en salle.",
  ],
  equipe: [
    { nom: 'Damien Herbay', role: 'Chef, au fourneau', placeholder: false, bio: ["Apprentissage sous la direction d'Éric Briffard, puis Les Forges du Pont d'Oye, La Table des Guilloux et L'Air du Temps."] },
    { nom: 'Anne-Sophie Gevaert-Herbay', role: 'En salle', placeholder: false, bio: ["Elle accueille les convives dans la maison."] },
  ],
  citation: {
    texte: 'Un cadre très agréable, un service au top et des plats succulents. Merci pour cette jolie découverte et à bientôt.',
    auteur: 'Stéphane Materne',
    source: 'Témoignage affiché sur le site du restaurant',
    url: 'https://carredherbes.be/le-restaurant/',
    date: '',
    placeholder: false,
  },
  avis: [],
  chiffres: {
    menus: { valeur: 4, libelle: 'menus', sousLibelle: 'le lunch, puis 3, 4 ou 5 assiettes', preuve: 'dossier.md, Offre et carte', placeholder: false },
    prix: { valeur: 38, libelle: 'euros', sousLibelle: 'le lunch en 2 assiettes, jusqu’à 85 € pour 5 assiettes', preuve: 'dossier.md, Offre et carte', placeholder: false },
    parc: { valeur: 28, libelle: 'ares de parc', sousLibelle: 'plus de 28 ares de parc arboré, avec terrasse', preuve: 'dossier.md, Identité (site client)', placeholder: false },
    parking: { valeur: 10, libelle: 'places de parking', sousLibelle: 'un parking privé, accès Route de Saint-Gérard', preuve: 'dossier.md, Identité (site client)', placeholder: false },
  },
  distinctions: [
    { nom: 'Gault&Millau', detail: 'Deux toques, 13,5/20 sur la fiche du guide', url: 'https://be.gaultmillau.com/restaurant/carre-d-herbes?locale=fr-BE', placeholder: false },
  ],
  fetes: {
    intro: 'Pour les fêtes 2026, la maison propose un menu de Noël à table et un menu à emporter pour les 24 et 31 décembre.',
    offres: [
      { nom: 'Noël au restaurant', texte: 'Le midi du 25 décembre, un menu en 5 services à 68 € : maquereau et truite, Saint-Jacques, ris de veau (supplément 12 €), pithivier de biche, sablé « Petit Bateau ». Acompte de 40 € par personne ; accord mets-vins à 7 € le verre.', textePlaceholder: false, photo: '/photos/fete-sapin.webp' },
      { nom: 'À emporter, 24 et 31 décembre', texte: 'Un menu de 1, 2 ou 3 entrées, plat et dessert à 50, 60 ou 70 €, à composer par téléphone. Commande avant le 20 décembre pour le 24, avant le 27 décembre pour le 31.', textePlaceholder: false, photo: '/photos/fete-emporter.webp' },
      { nom: 'Bon cadeau', texte: 'Un chèque de la valeur de votre choix, ou deux menus au choix. Valable 6 mois, sauf le samedi soir ; retrait au restaurant.', textePlaceholder: false, photo: '/photos/fete-cadeau.webp' },
    ],
  },
  photos: [
    photo('/photos/hero-salle.webp', 'Salle à manger lumineuse : grande table en bois et baie vitrée sur le parc', 1800, 1000),
    photo('/photos/hero-salle-960.webp', 'Salle à manger lumineuse : grande table en bois et baie vitrée sur le parc', 960, 541),
    photo('/photos/chap-plat-1200.webp', 'Plat dressé sur une assiette noire texturée, jardin en arrière-plan', 1200, 1200),
    photo('/photos/chap-salle-1200.webp', 'Salle avec grande table dressée, arches en bois et mur de brique blanchie', 1200, 1200),
    photo('/photos/chap-parc-1080.webp', 'Parc arboré avec carré potager de plantes aromatiques', 1080, 1080),
    photo('/photos/fete-sapin.webp', 'Dessert de fêtes en forme de sapin de macarons sous cloche', 1140, 642),
    photo('/photos/fete-emporter.webp', 'Plats à emporter en barquettes et plat de viande', 1140, 642),
    photo('/photos/fete-cadeau.webp', 'Assiettes d’entrées dressées sur une table', 1140, 642),
    photo('/photos/cuisine-dressage.webp', 'Une main dresse une assiette à la pince, au passe de la cuisine', 1000, 1333),
    photo('/photos/cuisine-dressage-700.webp', 'Une main dresse une assiette à la pince, au passe de la cuisine', 700, 933),
    photo('/photos/salle-brique.webp', 'Table dressée devant le mur de brique et les arches en bois', 1000, 1333),
    photo('/photos/gal-1-nb.webp', 'Mises en bouche sur une planche en bois d’olivier, en noir et blanc', 900, 900),
    photo('/photos/gal-2-nb.webp', 'Salle claire avec table en bois et fenêtres, en noir et blanc', 900, 507),
    photo('/photos/gal-3-nb.webp', 'Le parc et son carré potager d’aromates, en noir et blanc', 900, 507),
    photo('/photos/gal-4-nb.webp', 'Un cuisinier moud du poivre sur un plan de travail, en noir et blanc', 900, 507),
    photo('/photos/gal-5-nb.webp', 'Plat vert sur une tuile en dentelle, en noir et blanc', 900, 507),
    photo('/photos/plat-volaille.webp', 'Cuisse et filet de volaille, sauce et légumes sur assiette blanche', 550, 825),
    photo('/photos/plat-entrees.webp', 'Assiettes d’entrées dressées sur une table', 550, 825),
    photo('/photos/dessert-glaces.webp', 'Dessert avec glaces et crumble sur une assiette en verre', 600, 544),
    photo('/photos/terrasse-table.webp', 'Table de terrasse au bord du parc, fauteuils noirs', 800, 1200),
    photo('/photos/terrasse-parasols.webp', 'Terrasse sous parasols blancs, mobilier noir, mur de brique', 768, 1024),
    photo('/photos/parc-large.webp', 'Parc arboré avec carré potager de plantes aromatiques', 1200, 675),
  ],
  valeurs: ['Produits locaux de saison', 'Tout est fait maison', "Carré potager d'aromates"],
};

/** Photo par chemin (erreur explicite si le chemin n'existe pas : un gabarit ne doit pas pointer dans le vide). */
export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}

/** Adresse sur une ligne. */
export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;

/** 00:00 se lit « minuit ». */
const heureTexte = (h: string) => (h === '00:00' ? 'minuit' : h);

/** Horaires lisibles : '12:00 à 14:00, 19:00 à 21:00' ou la note. */
export const horaireTexte = (h: Horaire) =>
  h.creneaux.length ? h.creneaux.map((c) => `${c.ouverture} à ${heureTexte(c.fermeture)}`).join(', ') : h.note || 'fermé';

/** Les 3 lignes d'horaires de la carte de clôture : soirs, midis, week-end (calculées, jamais écrites en dur). */
export function horairesResume(r: Restaurant = site): { libelle: string; valeur: string }[] {
  const soirs = r.horaires.filter((h) => h.creneaux.some((c) => c.ouverture >= '17:00'));
  const midis = r.horaires.filter((h) => h.creneaux.some((c) => c.ouverture < '15:00'));
  const fermes = r.horaires.filter((h) => !h.creneaux.length);
  const plage = (hs: Horaire[]) => (hs.length > 2 ? `du ${hs[0].jour} au ${hs[hs.length - 1].jour}` : hs.map((h) => h.jour).join(' et '));
  const heure = (hs: Horaire[], soir: boolean) => { const c = hs[0].creneaux.find((x) => (x.ouverture >= '17:00') === soir)!; return `${c.ouverture} à ${heureTexte(c.fermeture)}`; };
  return [
    { libelle: 'Le soir', valeur: `${plage(soirs)}, ${heure(soirs, true)}` },
    { libelle: 'Le midi', valeur: `${plage(midis)}, ${heure(midis, false)}` },
    { libelle: plage(fermes), valeur: fermes[0]?.note || 'fermé' },
  ];
}

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;
