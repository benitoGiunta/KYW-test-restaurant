// Tout le contenu du site « Bienvenue chez vous » vit ici. Source : data/restaurants/bienvenue-chez-vous/dossier.md et donnees.json.
// Une donnée, un drapeau : `placeholder: true` ne vaut que pour le champ qu'il accompagne. Toute sous-donnée non prouvée
// par le dossier porte son propre drapeau et une marque visible là où elle s'affiche.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean; descriptionPlaceholder?: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; detail: string; description: string; placeholder: boolean; services?: number }
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
  sigle: string; // initiales du logo cerclé
  baseline: string;
  description: string; // meta description par défaut (50 à 160 caractères)
  url: string; // site actuel du client
  typeCuisine: string; // schema.org servesCuisine
  adresse: { rue: string; numero: string; cp: string; commune: string; pays: string };
  telephone: string; // format international
  email: { valeur: string; placeholder: boolean };
  reservation: { outil: string; note: string };
  horaires: Horaire[];
  horairesNote: string;
  reseaux: Reseau[];
  carte: Categorie[];
  menus: Menu[];
  mercredi: string;
  histoire: string[]; // un paragraphe par entrée
  equipe: Membre[];
  avis: Avis[];
  photos: Photo[];
  valeurs: string[];
  chiffres: { services: Chiffre; prix: Chiffre; chefs: Chiffre; ouverture: Chiffre };
  distinctions: Distinction[];
  citation: Avis;
  emporter: { intro: string; offres: Offre[]; materiel: string };
  bonCadeau: { texte: string; placeholder: boolean };
  credit: string;
}

const photo = (src: string, alt: string, largeur: number, hauteur: number, placeholder = false): Photo => ({ src, alt, largeur, hauteur, placeholder });

export const site: Restaurant = {
  slug: 'bienvenue-chez-vous',
  nom: 'Bienvenue chez vous',
  sigle: 'B',
  baseline: 'Fine cuisine et créativité',
  description:
    'Bienvenue chez vous, restaurant de Cédric Delsaut à Namur : un voyage en escales, une cuisine française créative servie à quelques tables, sur réservation.',
  url: 'https://www.restobienvenuechezvous.com',
  typeCuisine: 'Cuisine française créative',
  adresse: { rue: 'Rue Pépin', numero: '33', cp: '5000', commune: 'Namur', pays: 'BE' },
  telephone: '+32 477 29 96 83', // Gault&Millau, Restaurant Guru : absent du site actuel, à confirmer
  email: { valeur: '', placeholder: true }, // info@restaurantbienvenuechezvous.be à confirmer (domaine différent du site) : jamais affiché
  reservation: {
    outil: 'Téléphone',
    note: "Le restaurant reçoit sur réservation, par téléphone ; il n'y a pas de module en ligne.",
  },
  horaires: [
    { jour: 'lundi', creneaux: [], note: 'fermé' },
    { jour: 'mardi', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:00' }] },
    { jour: 'mercredi', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:00' }] },
    { jour: 'jeudi', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:00' }] },
    { jour: 'vendredi', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:00' }] },
    { jour: 'samedi', creneaux: [{ ouverture: '12:00', fermeture: '13:30' }, { ouverture: '19:30', fermeture: '21:00' }] },
    { jour: 'dimanche', creneaux: [], note: 'fermé' },
  ],
  horairesNote: 'Horaires relevés dans les guides (Gault&Millau, Restaurant Guru).',
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100036275366364' },
    { nom: 'Instagram', url: 'https://instagram.com/resto_bienvenuechezvous_namur' },
    { nom: 'TikTok', url: 'https://www.tiktok.com/@bienvenuechezvousnamur' },
  ],
  carte: [
    {
      categorie: 'Le Repas, « Les Saveurs du Mois » (relevé d\'octobre 2026)',
      plats: [
        { nom: 'Grignotages', description: 'Un avant-goût du voyage', prix: null, placeholder: false },
        { nom: 'Les Saint-Jacques de Vincent', description: 'Textures, fraîcheur et notes grillées, en direct de petits bateaux à Port-en-Bessin', prix: null, placeholder: false },
        { nom: "L'œuf parfait", description: 'Bœuf Angus séché, potiron et noisettes', prix: null, placeholder: false },
        { nom: 'Filet pur de veau', description: 'Légèrement saumuré, coques et végétaux marins', prix: null, placeholder: false },
        { nom: 'Dessert du moment', description: 'En finesse, léger, frais, peu sucré', prix: null, placeholder: false },
        { nom: 'Biscuit, chocolat, fantaisie', description: 'Nos incontournables douceurs', prix: null, placeholder: false },
      ],
    },
    {
      categorie: 'Accords et boissons',
      plats: [
        { nom: "A, L'Accord", description: 'harmonie de vins ou de préparations maison sans alcool', prix: null, placeholder: false },
        { nom: 'B, Le Confort', description: 'apéritif, accord, eau, café, thé', prix: null, placeholder: false },
        { nom: 'C, Le Confort +', description: 'comme le Confort, avec un digestif', prix: null, placeholder: false },
        { nom: 'Vins', description: 'au verre, ou carte des vins à prix coûtant, avec droit de bouchon', prix: null, placeholder: false },
      ],
    },
    {
      categorie: 'Traiteur, repas gourmand hebdomadaire (à emporter, commande 24 h à l\'avance)',
      plats: [
        { nom: 'Saint-Jacques de Vincent, mises au vert', description: 'Bœuf Angus séché ; ou saumon écossais Label rouge, textures et notes de fumaison', prix: null, placeholder: false },
        { nom: 'Filet de veau saumuré ou filet de biche', description: 'Saveurs automnales, jus intense épicé (biche, supplément de 5 €)', prix: null, placeholder: false },
        { nom: 'Dessert du moment', description: 'Léger, frais, peu sucré', prix: null, placeholder: false },
      ],
    },
  ],
  menus: [
    { nom: 'Le Repas, formule midi', prix: '49 €', detail: '3 escales, le midi', services: 3, description: 'Grignotages, trois escales et douceurs, le midi hors jours fériés. Accords : B +30 €, C +40 €.', placeholder: false },
    { nom: 'Le Repas', prix: '69 €', detail: '4 escales, midi et soir', services: 4, description: 'Quatre escales, sur réservation. Accords : A +29 €, B +44 €, C +54 €.', placeholder: false },
    { nom: 'Le Repas', prix: '79 €', detail: '5 escales, le soir', services: 5, description: 'Cinq escales, sur réservation. Accords : A +35 €, B +49 €, C +59 €.', placeholder: false },
    { nom: 'Voyage Signature', prix: '94 €', detail: 'Midi et soir', description: 'Le grand voyage du chef, sur réservation. Accords : A +40 €, B +54 €, C +64 €.', placeholder: false },
  ],
  mercredi: "Chaque mercredi soir, hors jours fériés, un repas à prix réduit en quatre escales, uniquement sur réservation.",
  bonCadeau: { texte: "Chèques cadeaux proposés par le restaurant.", placeholder: false },
  histoire: [
    "Bienvenue chez vous est né en 2002, d'abord à Bruxelles. Le restaurant s'est installé à Namur, rue Pépin, en 2020, au premier étage d'une maison de maître.",
    "Ici, quelques tables seulement, à la lueur des bougies, et aux beaux jours une terrasse calme. Cédric Delsaut est seul : il cuisine, il sert, il choisit les vins.",
    "Sa cuisine est française, à base classique, avec une vision contemporaine : gourmande, raffinée, créative, en mouvement permanent, au rythme de la nature et des artisans, souvent locaux, qui fournissent les produits.",
    "Le repas se vit en escales : des grignotages, des escales entre intemporels et créations de saison, puis des douceurs. Le menu n'est pas dévoilé : on se laisse conduire.",
  ],
  equipe: [
    { nom: 'Cédric Delsaut', role: 'Chef et propriétaire, en cuisine, en salle et à la cave', placeholder: false, bio: ['Jeune Chef de l\'année 2016 pour Gault&Millau.'] },
  ],
  citation: {
    texte: "Cadre intimiste, le chef est seul en cuisine et aux fourneaux, le menu n'est pas dévoilé.",
    auteur: 'Dominique J.',
    source: 'Trouve Ton Resto, « Remarquable et charmant »',
    date: '',
    placeholder: false,
  },
  avis: [
    { texte: "Cadre intimiste, le chef est seul en cuisine et aux fourneaux, le menu n'est pas dévoilé.", auteur: 'Dominique J.', source: 'Trouve Ton Resto', date: '', placeholder: false },
  ],
  chiffres: {
    services: { valeur: 4, libelle: 'escales', sousLibelle: 'le repas en quatre escales, midi et soir', preuve: 'donnees.json, menus du site client', placeholder: false },
    prix: { valeur: 69, libelle: 'euros', sousLibelle: 'hors accords', preuve: 'donnees.json, menus du site client', placeholder: false },
    chefs: { valeur: 1, libelle: 'chef', sousLibelle: 'seul pour la cuisine, la salle et la cave', preuve: 'Gault&Millau Belgium', placeholder: false },
    ouverture: { valeur: 2002, libelle: 'maison créée', sousLibelle: 'Née à Bruxelles, installée à Namur, rue Pépin, depuis 2020', preuve: 'site client (« Depuis 2002 »), La DH 18/05/2020', placeholder: false },
  },
  distinctions: [
    { nom: 'Gault&Millau', detail: "Jeune Chef de l'année 2016", url: 'https://www.gaultmillau.be/en/restaurants/bienvenue-chez-vous-namur', placeholder: false },
  ],
  emporter: {
    intro: "Le voyage continue à la maison : un repas gourmand chaque semaine à emporter, des box, des buffets, et la boutique des artisans de la maison.",
    materiel: 'Prix et disponibilités auprès du restaurant.',
    offres: [
      { nom: 'Repas gourmand', texte: "Chaque semaine, un repas à emporter à commander 24 heures à l'avance. Deux box pour deux personnes : la Box Tapas à 199 € (174 € sans boissons) et la Box Bienvenue chez vous à 109 €.", textePlaceholder: false, photo: '/photos/onglet-traiteur.webp' },
      { nom: 'Fêtes et buffets', texte: "Menus de Noël et du Nouvel An, buffets, walking dinner, brunch et pièces montées : le traiteur prépare aussi vos réceptions.", textePlaceholder: false, photo: '/photos/onglet-fetes.webp' },
      { nom: 'Boutique et cadeaux', texte: "Une boutique de produits d'artisans, souvent locaux, et des chèques cadeaux pour offrir une table.", textePlaceholder: false, photo: '/photos/onglet-boutique.webp' },
    ],
  },
  credit: "Certaines photos de créations sont d'Anthony Florio, que le restaurant remercie sur son site.",
  photos: [
    photo('/photos/hero-1600.webp', 'Dessert en forme de smiley rose aux fraises', 1600, 1200),
    photo('/photos/hero-960.webp', 'Dessert en forme de smiley rose aux fraises', 960, 720),
    photo('/photos/chap-escales-1200.webp', 'Saumon, jus vert et perles sur assiette blanche', 1200, 1200),
    photo('/photos/chap-prix-1200.webp', 'Magret en tranches, betterave rose et framboise', 1200, 1200),
    photo('/photos/chap-maison-1200.webp', 'Façade de la maison de maître, rue Pépin', 1200, 1200),
    photo('/photos/onglet-traiteur.webp', 'Plat à emporter en bol kraft, légumes et asperges', 1140, 642),
    photo('/photos/onglet-fetes.webp', 'Plateau de douze verrines de bouchées', 1140, 642),
    photo('/photos/onglet-boutique.webp', 'Carte de visite du restaurant sur une serviette roulée, table en bois', 1140, 642),
    photo('/photos/gal-huitres.webp', 'Huîtres garnies de perles végétales et fleurs comestibles', 900, 1200),
    photo('/photos/gal-tomates.webp', 'Tomates multicolores, sorbet et fleurs comestibles', 900, 800),
    photo('/photos/gal-asperges.webp', 'Asperges, sauce verte et algues', 900, 1000),
    photo('/photos/gal-poisson.webp', 'Poisson, févettes, asperges et capucines', 900, 1200),
    photo('/photos/gal-crustace.webp', 'Crustacé, fleurs comestibles et tuile en dentelle', 900, 800),
    photo('/photos/menu-carpaccio.webp', 'Carpaccio de noix de Saint-Jacques, crème verte et salicorne', 550, 825),
    photo('/photos/menu-foie-gras.webp', 'Assiette gris perle, truffe noire et sauce brune', 550, 825),
    photo('/photos/menu-saint-jacques.webp', 'Saint-Jacques snackées sur sauce verte', 550, 825),
    photo('/photos/histoire-facade.webp', 'Façade de la maison de maître, rue Pépin', 1140, 642),
    photo('/photos/histoire-enseigne.webp', 'Enseigne rouge « Bienvenue chez vous, fine cuisine et créativité »', 1024, 683),
    photo('/photos/histoire-carte.webp', 'Carte de visite du restaurant sur une serviette roulée, table en bois', 800, 1000),
    photo('/photos/reservation-desserts.webp', 'Assiettes en cœur et caquelons de desserts', 1140, 642),
  ],
  valeurs: ['Produits de première qualité', 'Créativité et saisons', 'Convivialité, tables intimes'],
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
