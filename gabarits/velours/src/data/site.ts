// Tout le contenu du gabarit « Velours » vit ici. Source : data/restaurants/les-potes-au-feu/dossier.md et donnees.json.
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
  equipe: Membre[];
  avis: Avis[];
  photos: Photo[];
  valeurs: string[];
  chiffres: { services: Chiffre; prix: Chiffre; chefs: Chiffre; ouverture: Chiffre };
  distinctions: Distinction[];
  citation: Avis;
  privatisation: { intro: string; offres: Offre[] };
  bonCadeau: { montants: string; texte: string; placeholder: boolean };
}

const photo = (src: string, alt: string, largeur: number, hauteur: number, placeholder = false): Photo => ({ src, alt, largeur, hauteur, placeholder });

export const site: Restaurant = {
  slug: 'les-potes-au-feu',
  nom: 'Les Potes au Feu',
  baseline: "Bistronomie à Namur. L'histoire d'une rencontre, celle de deux potes passionnés.",
  description:
    'Les Potes au Feu, restaurant bistronomique à Namur : un menu unique en 4 services à 67 €, deux chefs qui servent eux-mêmes, produits locaux et fait maison.',
  url: 'https://www.lespotesaufeu.be',
  typeCuisine: 'Cuisine française moderne, bistronomie',
  adresse: { rue: 'Avenue de la Plante', numero: '4', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.4586737, lon: 4.8643452 },
  telephone: '+32 81 64 04 44',
  email: { valeur: '', placeholder: true }, // dossier : e-mail inconnu, formulaire seulement. Jamais de mailto: illustratif.
  reservation: {
    outil: 'Zenchef',
    url: 'https://bookings.zenchef.com/results?rid=379477',
    note: 'Pour une réservation de dernière minute ou de plus de 6 personnes, appelez-nous.',
  },
  horaires: [
    { jour: 'lundi', creneaux: [{ ouverture: '19:00', fermeture: '21:00' }] },
    { jour: 'mardi', creneaux: [{ ouverture: '19:00', fermeture: '21:00' }] },
    { jour: 'mercredi', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:00', fermeture: '21:00' }] },
    { jour: 'jeudi', creneaux: [{ ouverture: '19:00', fermeture: '21:00' }] },
    { jour: 'vendredi', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:00', fermeture: '21:00' }] },
    { jour: 'samedi', creneaux: [], note: 'fermé, privatisation possible' },
    { jour: 'dimanche', creneaux: [], note: 'fermé' },
  ],
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/lespotesaufeu.bistronomie/' },
    { nom: 'YouTube', url: 'https://www.youtube.com/watch?v=dZtMOajOefE' },
  ],
  carte: [
    {
      categorie: 'Menu dégustation unique, 4 services',
      plats: [
        { nom: 'Mises en bouche', description: '', prix: null, placeholder: false },
        { nom: 'Légumes racines / Champignons / Noix', description: '', prix: null, placeholder: false },
        { nom: 'Saint-Jacques / Butternut / Passion', description: '', prix: null, placeholder: false },
        { nom: 'Boeuf confit / Carottes / Cromesquis de pommes de terre', description: '', prix: null, placeholder: false },
        { nom: 'Soufflé au caramel / Chaï / Poire', description: '', prix: null, placeholder: false },
        { nom: 'Mignardise', description: '', prix: null, placeholder: false },
      ],
    },
    {
      categorie: 'Suppléments et options',
      plats: [
        { nom: 'Fromage à la place du dessert', description: '', prix: '+7 €', placeholder: false },
        { nom: 'Fromage avant le dessert', description: '', prix: '+15 €', placeholder: false },
        { nom: 'Menu végétarien', description: 'sur demande', prix: null, placeholder: false },
        { nom: 'Allergies et intolérances', description: 'le menu est adapté, à signaler lors de la réservation', prix: null, placeholder: false },
      ],
    },
  ],
  menus: [
    {
      nom: 'Menu dégustation unique',
      prix: '67 €',
      services: 4, // nombre annoncé par le dossier (constante, jamais un length : la liste compte 6 lignes avec les mises en bouche et la mignardise)
      quand: 'du lundi au vendredi soir',
      description: 'Mises en bouche, quatre services et mignardise. Fromage à la place du dessert +7 €, avant le dessert +15 €.',
      placeholder: false,
    },
    { nom: 'Formule 3 services', prix: '52 €', services: 3, quand: 'le midi, mercredi et vendredi', description: 'À choix multiples, inspirée des produits du moment.', placeholder: false },
    {
      nom: 'Lunch',
      prix: '40 €',
      services: 2,
      quand: 'le midi, mercredi et vendredi',
      description: "Entrée-plat ou plat-dessert, proposé selon les envies des chefs et servi à l'ensemble de la table ; composition sur demande par téléphone.",
      placeholder: false,
    },
  ],
  bonCadeau: { montants: '50, 75, 100 ou 150 €', texte: 'Demande en ligne sur le site actuel, retrait au restaurant.', placeholder: false },
  histoire: [
    "Les Potes au Feu, c'est d'abord l'histoire d'une rencontre : François Schepens et Damien Gorjanec ont aiguisé leurs premiers couteaux ensemble à la Plage d'Amée, à Namur. Deux gamins pleins d'envie, le début d'une amitié.",
    "François a fait ses classes aux États-Unis et à Montréal ; Damien s'est fait une place en Belgique et a cuisiné jusqu'à Shanghai. À chaque retrouvaille, autour d'un verre, le rêve d'ouvrir un restaurant se dessine.",
    "Début de l'hiver 2019, installés par hasard à une table de ce lieu, ils ne savaient pas encore qu'ils y ouvriraient leur premier restaurant. Trois mois plus tard, ils en avaient les clés : la maison ouvre en 2020.",
    "Une cuisine bistronomique à quatre mains, de qualité, avec un ancrage local, et un mot d'ordre : le plaisir. Les chefs accompagnent eux-mêmes leurs plats jusqu'à votre table et vous expliquent leur démarche.",
  ],
  equipe: [
    { nom: 'Damien Gorjanec', role: 'Chef et co-propriétaire', photo: '/photos/chef-damien-nb.webp', placeholder: false, bio: ["S'est fait une place en Belgique et a cuisiné jusqu'à Shanghai."] },
    { nom: 'François Schepens', role: 'Chef et co-propriétaire', photo: '/photos/chef-francois-nb.webp', placeholder: false, bio: ['A fait ses classes aux États-Unis et à Montréal.'] },
    { nom: 'Sara', role: 'Salle et bar', placeholder: false, rolePlaceholder: true }, // prénom prouvé (« la pétillante Sara »), rôle inconnu
    { nom: 'Jordan', role: 'Salle', placeholder: false, rolePlaceholder: true }, // prénom prouvé, rôle inconnu
  ],
  citation: {
    texte: "Un restaurant décontracté qui swingue sur tous les plans. Le plaisir déborde de l'assiette !",
    auteur: 'Inspecteur du Guide MICHELIN',
    source: 'Guide MICHELIN Belgique 2026',
    url: 'https://guide.michelin.com/fr/fr/namur/namur/restaurant/les-potes-au-feu',
    date: '2026-05-04',
    placeholder: false,
  },
  avis: [
    {
      texte: 'Légumes cultivés localement, associations originales et saveurs intenses sont au rendez-vous.',
      auteur: 'Inspecteur du Guide MICHELIN',
      source: 'Guide MICHELIN Belgique 2026',
      url: 'https://guide.michelin.com/fr/fr/namur/namur/restaurant/les-potes-au-feu',
      date: '2026-05-04',
      placeholder: false,
    },
    { texte: 'Les chefs viennent eux-mêmes présenter chaque assiette, et on repart avec le sourire.', auteur: '', source: "Exemple d'avis", date: '', placeholder: true },
    { texte: 'Menu unique, zéro hésitation : le cadre est chaleureux et le service aussi simple que précis.', auteur: '', source: "Exemple d'avis", date: '', placeholder: true },
  ],
  chiffres: {
    services: { valeur: 4, libelle: 'services', sousLibelle: 'un menu dégustation unique, le soir', preuve: 'dossier.md, carte du 28/10/2026', placeholder: false },
    prix: { valeur: 67, libelle: 'euros', sousLibelle: 'le prix du menu, du lundi au vendredi soir', preuve: 'dossier.md, carte du 28/10/2026', placeholder: false },
    chefs: { valeur: 2, libelle: 'chefs', sousLibelle: 'une cuisine à quatre mains', preuve: 'dossier.md, identité', placeholder: false },
    ouverture: { valeur: 2020, libelle: 'ouverture', sousLibelle: 'les clés de la maison, trois mois après une table prise par hasard', preuve: 'dossier.md, BCE 14/01/2020', placeholder: false },
  },
  distinctions: [
    { nom: 'Guide MICHELIN', detail: 'Sélection Belgique 2026', url: 'https://guide.michelin.com/fr/fr/namur/namur/restaurant/les-potes-au-feu', placeholder: false },
  ],
  privatisation: {
    intro: 'Le samedi, le restaurant se privatise : mariages, événements, ou chef à domicile.',
    offres: [
      { nom: 'Privatisation', texte: 'La salle entière pour votre événement, un samedi, avec le menu des chefs.', textePlaceholder: true, photo: '/photos/salle-ampoules.webp' },
      { nom: 'Mariage', texte: 'Un repas de mariage à quatre mains, servi et expliqué à table par François et Damien.', textePlaceholder: true, photo: '/photos/service-francois-table.webp' },
      { nom: 'Chef à domicile', texte: 'Les chefs se déplacent chez vous, un samedi, pour un menu composé avec vous.', textePlaceholder: true, photo: '/photos/cuisine-chefs-dressage.webp' },
    ],
  },
  photos: [
    photo('/photos/salle-clients-bar.webp', 'Clients attablés au bar, Damien en salle sous les ampoules chaudes', 1140, 642),
    photo('/photos/hero-salle-960.webp', 'Clients attablés au bar, Damien en salle sous les ampoules chaudes', 960, 541),
    photo('/photos/chap-boeuf-1200.webp', 'Boeuf confit, carottes et cromesquis sur assiette rouge', 1200, 1200),
    photo('/photos/chap-salle-1200.webp', 'La salle de jour : banquette, coussins moutarde, lambris vert-gris', 1200, 1200),
    photo('/photos/chef-damien-nb.webp', 'Damien Gorjanec en cuisine, portrait en noir et blanc', 1000, 1332),
    photo('/photos/chef-damien-nb-700.webp', 'Damien Gorjanec en cuisine, portrait en noir et blanc', 700, 933),
    photo('/photos/chef-francois-nb.webp', 'François Schepens en cuisine, portrait en noir et blanc', 1000, 1332),
    photo('/photos/salle-ampoules.webp', 'Ampoules à filament suspendues devant une étagère en bois', 1140, 642),
    photo('/photos/service-francois-table.webp', 'François verse une sauce à table devant une cliente', 1140, 642),
    photo('/photos/cuisine-chefs-dressage.webp', 'Les deux chefs concentrés au dressage sous les lampes chauffantes', 1140, 642),
    photo('/photos/gal-mains-nb.webp', 'Des mains travaillent une pâte sur une balance', 900, 900),
    photo('/photos/gal-sauce-nb.webp', 'Sauce versée à la cuillère sur un plat, à table', 900, 507),
    photo('/photos/gal-profil-nb.webp', 'Damien de profil en clair-obscur, mains jointes', 900, 507),
    photo('/photos/gal-cocktails-nb.webp', 'Deux cocktails dosés au bar', 900, 507),
    photo('/photos/gal-passe-nb.webp', 'Les deux chefs au passe, dressage des assiettes', 900, 507),
    photo('/photos/gal-dessert-nb.webp', 'Rosace de pommes, glace et éclats de tuile, vue de dessus', 800, 725),
    photo('/photos/plat-saint-jacques.webp', 'Saint-Jacques snackées, mousseline et tuile noire sur assiette bleue', 550, 825),
    photo('/photos/plat-tartare.webp', 'Tartare de boeuf, roquette et tuiles sur assiette noire', 550, 825),
    photo('/photos/dessert-tarte-pomme.webp', 'Rosace de pommes, glace et éclats de tuile, vue de dessus', 800, 725),
    photo('/photos/equipe-trio.webp', "L'équipe riant sur une banquette autour d'une table en chêne", 800, 725),
    photo('/photos/cuisine-mains-pate.webp', 'Des mains travaillent une pâte sur une balance', 1600, 1600),
    photo('/photos/salle-banquette.webp', 'La salle de jour : banquette, coussins moutarde, lambris vert-gris', 1600, 1600),
  ],
  valeurs: ['Fait maison', 'Produits des saisons', 'Rencontre et convivialité'],
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
