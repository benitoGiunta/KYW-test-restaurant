// Tout le contenu du site vit ici. Source : data/restaurants/les-potes-au-feu/dossier.md, donnees.json, photos/index.json.
// Règle « une donnée, un drapeau » : chaque champ non prouvé par le dossier porte son propre `placeholder: true`
// (ou `rolePlaceholder`, `descriptionPlaceholder`) et le gabarit le marque à l'endroit où il s'affiche.
// Règle « rien de daté, rien de promis » : aucune date en dur ; le compte à rebours se calcule depuis `horaires`.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean; photo?: string; /** ligne du menu hors des services numérotés (mise en bouche, mignardise, supplément) */ horsService?: boolean }
export interface Categorie { categorie: string; plats: Plat[]; /** nombre de services annoncé (le compteur ne compte pas les lignes) */ services?: number }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean; /** n'est pas une formule de repas (bon cadeau) : hors du compteur */ horsFormule?: boolean }
export interface Membre { nom: string; role: string; rolePlaceholder: boolean; photo?: string; placeholder: boolean }
export interface Avis { texte: string; auteur: string; source: string; date: string; note?: number; placeholder: boolean }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }
export interface MotLien { mot: string; href: string }
/** Phrase du manifeste : texte avec deux mots-liens soulignés (ordre : avant, lien1, milieu, lien2, apres). */
export interface Manifeste { avant: string; lien1: MotLien; milieu: string; lien2: MotLien; apres: string; placeholder: boolean }
export interface Produit { nom: string; description: string; prix: string; etiquette?: string; placeholder: boolean }
export interface CategorieProduits { categorie: string; produits: Produit[] }
export interface Fournee { libelle: string; heure: string }

export interface Restaurant {
  slug: string;
  nom: string;
  /** Nom en deux lignes pour les titres géants (le second sert de titre à la levée). */
  nomLignes: [string, string];
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
  reseaux: Reseau[];
  carte: Categorie[];
  menus: Menu[];
  histoire: string[]; // un paragraphe par entrée
  equipe: Membre[];
  avis: Avis[];
  photos: Photo[];
  valeurs: string[];
  manifeste: Manifeste;
  /** Levée : photo qui grossit et noms qui défilent (les services réels du menu). */
  levee: { photo: string; marquee: string[]; marqueePlaceholder: boolean };
  /** Catalogue des pâtes fraîches : service que le restaurant de référence ne rend pas, entièrement illustratif. */
  pates: { titre: string; intro: string; unite: string; categories: CategorieProduits[]; placeholder: boolean };
  /** À emporter : service non attesté par le dossier, entièrement illustratif. */
  emporter: { intro: string; fournees: Fournee[]; placeholder: boolean };
  fournil: string[]; // photos du mur (chemins de `photos`)
}

const photo = (src: string, alt: string, largeur: number, hauteur: number): Photo => ({ src, alt, largeur, hauteur, placeholder: false });

export const site: Restaurant = {
  slug: 'les-potes-au-feu',
  nom: 'Les Potes au Feu',
  nomLignes: ['Les Potes', 'au Feu'],
  baseline: "Bistronomie à Namur. L'histoire d'une rencontre, celle de deux potes passionnés.",
  description:
    'Les Potes au Feu, restaurant bistronomique à Namur : cuisine à quatre mains, menu unique de saison, produits locaux et fait maison, servi par les chefs.',
  url: 'https://www.lespotesaufeu.be',
  typeCuisine: 'Cuisine française moderne, bistronomie',
  adresse: { rue: 'Avenue de la Plante', numero: '4', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.4586737, lon: 4.8643452 },
  telephone: '+32 81 64 04 44',
  email: { valeur: 'bonjour@lespotesaufeu.be', placeholder: true },
  reservation: { outil: 'Zenchef', url: 'https://bookings.zenchef.com/results?rid=379477' },
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
      services: 4,
      plats: [
        { nom: 'Mises en bouche', description: '', prix: null, placeholder: false, horsService: true },
        { nom: 'Légumes racines / Champignons / Noix', description: '', prix: null, placeholder: false },
        { nom: 'Saint-Jacques / Butternut / Passion', description: '', prix: null, placeholder: false, photo: '/photos/plat-saint-jacques-carre.webp' },
        { nom: 'Bœuf confit / Carottes / Cromesquis de pommes de terre', description: '', prix: null, placeholder: false, photo: '/photos/plat-boeuf-confit-carre.webp' },
        { nom: 'Soufflé au caramel / Chaï / Poire', description: '', prix: null, placeholder: false },
        { nom: 'Mignardise', description: '', prix: null, placeholder: false, horsService: true },
        { nom: 'Fromage à la place du dessert', description: 'supplément', prix: '+7 €', placeholder: false, horsService: true },
        { nom: 'Fromage avant le dessert', description: 'supplément', prix: '+15 €', placeholder: false, horsService: true },
      ],
    },
    {
      categorie: 'Options',
      plats: [
        { nom: 'Menu végétarien', description: 'sur demande', prix: null, placeholder: false },
        { nom: 'Adaptation allergies et intolérances', description: 'à signaler lors de la réservation', prix: null, placeholder: false },
      ],
    },
    {
      categorie: 'Boissons',
      plats: [
        { nom: 'Accord mets et vins, 4 verres', description: 'sélection de vignerons belges et français', prix: '32 €', placeholder: true },
        { nom: 'Cocktail de la maison', description: 'au bar, avant le service', prix: '12 €', placeholder: true },
      ],
    },
  ],
  menus: [
    {
      nom: 'Menu dégustation unique 4 services',
      prix: '67 €',
      description:
        'Du lundi au vendredi soir : mises en bouche, quatre services et mignardise, détaillés plus haut. Fromage en supplément.',
      placeholder: false,
    },
    { nom: 'Formule 3 services (le midi)', prix: '52 €', description: 'Formule 3 services à choix multiples inspirée des produits du moment.', placeholder: false },
    {
      nom: 'Lunch (entrée-plat ou plat-dessert)',
      prix: '40 €',
      description: "Proposé en fonction des envies des chefs et servi à l'ensemble de la table ; composition sur demande par téléphone.",
      placeholder: false,
    },
    { nom: 'Bon cadeau', prix: '50 / 75 / 100 / 150 €', description: 'Demande en ligne, retrait au restaurant.', placeholder: false, horsFormule: true },
  ],
  histoire: [
    "Les Potes au Feu, c'est d'abord l'histoire d'une rencontre. François Schepens et Damien Gorjanec aiguisent leurs premiers couteaux au restaurant la Plage d'Amée à Namur : deux gamins pleins d'envie, le début d'une amitié.",
    "François continue ses classes aux États-Unis et à Montréal, Damien se fait une place en Belgique et cumule des expériences à l'étranger, notamment à Shanghai. À chaque retrouvaille, autour d'un verre, le rêve d'ouvrir un restaurant se dessine.",
    "Début de l'hiver 2019, installés par hasard à une table de ce lieu, ils ne savent pas encore qu'ils y ouvriront leur premier restaurant. Trois mois plus tard, ils en ont les clés.",
    "Le concept : une cuisine bistronomique à quatre mains, de qualité, avec un ancrage local, et un mot d'ordre, le plaisir. Ils servent eux-mêmes leurs plats et expliquent leur démarche à table, dans une atmosphère décontractée qui ne se la raconte pas.",
  ],
  equipe: [
    { nom: 'Damien Gorjanec', role: 'Chef et co-propriétaire', rolePlaceholder: false, photo: '/photos/chef-damien.webp', placeholder: false },
    { nom: 'François Schepens', role: 'Chef et co-propriétaire', rolePlaceholder: false, photo: '/photos/chef-francois.webp', placeholder: false },
    { nom: 'Sara', role: 'Salle et bar', rolePlaceholder: true, placeholder: false },
    { nom: 'Jordan', role: 'Salle', rolePlaceholder: true, placeholder: false },
  ],
  avis: [
    {
      texte: "Un restaurant décontracté qui swingue sur tous les plans. Le plaisir déborde de l'assiette !",
      auteur: 'Inspecteur du Guide MICHELIN',
      source: 'Guide MICHELIN Belgique 2026',
      date: '2026-05-04',
      placeholder: false,
    },
    {
      texte: 'Les chefs viennent eux-mêmes présenter chaque assiette. Le bœuf confit est une merveille, et on repart avec le sourire.',
      auteur: 'Exemple d’avis',
      source: 'texte illustratif',
      date: '2026-03-18',
      note: 5,
      placeholder: true,
    },
    {
      texte: 'Menu unique, zéro hésitation, que du plaisir. Le cadre est chaleureux et le service aussi simple que précis.',
      auteur: 'Exemple d’avis',
      source: 'second texte illustratif, à remplacer par un avis réel',
      date: '2026-02-02',
      note: 5,
      placeholder: true,
    },
  ],
  photos: [
    photo('/photos/chef-damien.webp', 'Damien Gorjanec en cuisine, tablier noir devant la hotte rouge', 1351, 1800),
    photo('/photos/chef-francois.webp', 'François Schepens en cuisine, tablier noir devant la hotte rouge', 1351, 1800),
    photo('/photos/equipe-trio.webp', "L'équipe riant sur une banquette autour d'une table en chêne", 800, 725),
    photo('/photos/dessert-tarte-pomme.webp', 'Rosace de pommes, glace et éclats de tuile, vue de dessus', 800, 725),
    photo('/photos/plat-tartare.webp', 'Tartare de bœuf, roquette et tuiles sur assiette noire', 550, 825),
    photo('/photos/plat-saint-jacques.webp', 'Saint-Jacques snackées, mousseline et tuile noire sur assiette bleue', 550, 825),
    photo('/photos/plat-saint-jacques-carre.webp', 'Saint-Jacques snackées, mousseline et tuile noire', 520, 520),
    photo('/photos/plat-boeuf-confit-carre.webp', 'Bœuf confit, carottes et cromesquis sur assiette rouge', 520, 520),
    photo('/photos/plat-tartare-carre.webp', 'Tartare de bœuf, roquette et tuiles', 520, 520),
    photo('/photos/dessert-tarte-pomme-carre.webp', 'Rosace de pommes et glace', 520, 520),
    photo('/photos/salle-bar-panoramique.webp', 'Le bar vert sombre et une table haute dressée, vue sur la cuisine', 1800, 468),
    photo('/photos/salle-ampoules.webp', 'Ampoules à filament suspendues devant une étagère en bois', 1140, 642),
    photo('/photos/salle-clients-bar.webp', 'Clients attablés au bar, Damien en salle sous les ampoules chaudes', 1140, 642),
    photo('/photos/bar-cocktails.webp', 'Deux cocktails rouges dosés au bar', 1140, 642),
    photo('/photos/cuisine-francois-poele.webp', 'François poêle en main, Damien penché au premier plan', 1140, 642),
    photo('/photos/service-planche.webp', 'Une planche de viande portée vers la salle', 1140, 642),
    photo('/photos/cuisine-salage-viande.webp', 'Une main sale une pièce de viande tranchée', 1140, 642),
    photo('/photos/cuisine-chefs-dressage.webp', 'Les deux chefs concentrés au dressage sous les lampes chauffantes', 1140, 642),
    photo('/photos/service-frites.webp', 'Paniers de frites portés en salle, les chefs en arrière-plan', 1140, 642),
    photo('/photos/cuisine-chefs-passe.webp', 'Les deux chefs au passe, dressage des assiettes', 1140, 642),
    photo('/photos/service-sauce-table.webp', 'Sauce versée à la cuillère sur un plat, à table', 1140, 642),
    photo('/photos/service-francois-table.webp', 'François verse une sauce à table devant une cliente', 1140, 642),
    photo('/photos/portrait-damien-profil.webp', 'Damien de profil en clair-obscur, mains jointes', 1140, 642),
    photo('/photos/salle-banquette.webp', 'La salle de jour : banquette, coussins moutarde, lambris vert-gris', 1600, 1600),
    photo('/photos/salle-banquette-960.webp', 'La salle de jour : banquette, coussins moutarde, lambris vert-gris', 960, 960),
    photo('/photos/cuisine-mains-pate.webp', 'Des mains travaillent une pâte sur une balance', 1600, 1600),
    photo('/photos/cuisine-mains-pate-960.webp', 'Des mains travaillent une pâte sur une balance', 960, 960),
    photo('/photos/plat-boeuf-confit.webp', 'Bœuf confit, carottes et cromesquis sur assiette rouge', 1600, 1600),
    photo('/photos/plat-boeuf-confit-960.webp', 'Bœuf confit, carottes et cromesquis sur assiette rouge', 960, 960),
  ],
  valeurs: [
    'Fait maison',
    'Produits des saisons',
    'Rencontre et convivialité',
    'Ancrage local : producteurs du coin, légumes cultivés localement',
    'Les chefs servent et expliquent leurs plats à table',
  ],
  // Phrase du site actuel (dossier.md, « Concept ») : les deux mots-liens sont le ressort du manifeste.
  manifeste: {
    avant: 'Une cuisine bistronomique à ',
    lien1: { mot: 'quatre mains', href: '/histoire/' },
    milieu: ', de qualité, avec un ancrage local. Et un mot d’ordre : ',
    lien2: { mot: 'le plaisir', href: '/carte/' },
    apres: '.',
    placeholder: false,
  },
  levee: {
    photo: '/photos/cuisine-mains-pate-960.webp',
    marquee: ['Mises en bouche', 'Légumes racines', 'Saint-Jacques', 'Bœuf confit', 'Soufflé au caramel', 'Mignardise'],
    marqueePlaceholder: false,
  },
  pates: {
    titre: 'Pâtes fraîches',
    intro: 'Exemple de catalogue pour une table à pâtes ou une pizzeria : produits, descriptions et prix sont illustratifs.',
    unite: 'les 250 g',
    placeholder: true,
    categories: [
      {
        categorie: 'Longues',
        produits: [
          { nom: 'Tagliatelle', description: 'Pâte à l’œuf laminée fine, roulée et coupée au couteau.', prix: '9,50 €', placeholder: true },
          { nom: 'Pappardelle', description: 'Larges rubans pour les sauces longues et les ragoûts.', prix: '10 €', placeholder: true },
          { nom: 'Spaghetti alla chitarra', description: 'Section carrée, tirée sur la guitare à cordes.', prix: '9 €', placeholder: true },
          { nom: 'Linguine', description: 'Plates et étroites, pour les sauces légères et les coquillages.', prix: '9,50 €', placeholder: true },
        ],
      },
      {
        categorie: 'Courtes',
        produits: [
          { nom: 'Orecchiette', description: 'Petites oreilles creusées au pouce, semoule et eau.', prix: '8,50 €', placeholder: true },
          { nom: 'Rigatoni', description: 'Tubes striés, tréfilés au bronze pour accrocher la sauce.', prix: '8,50 €', placeholder: true },
          { nom: 'Gnocchi', description: 'Pomme de terre, farine et œuf, roulés à la fourchette.', prix: '9 €', placeholder: true },
          { nom: 'Fusilli', description: 'Spirales serrées, roulées autour d’un fer.', prix: '8,50 €', placeholder: true },
        ],
      },
      {
        categorie: 'Farcies',
        produits: [
          { nom: 'Ravioli ricotta et épinards', description: 'Carrés fermés à la main, farce ricotta, épinards et muscade.', prix: '12 €', placeholder: true },
          { nom: 'Tortellini', description: 'Petits anneaux pliés autour du doigt, farce de viande.', prix: '12,50 €', placeholder: true },
          { nom: 'Agnolotti', description: 'Pincés en petits coussins, farce de légumes braisés.', prix: '13 €', placeholder: true },
          { nom: 'Cappelletti', description: 'Petits chapeaux, farce de fromage affiné.', prix: '12,50 €', placeholder: true },
        ],
      },
    ],
  },
  emporter: {
    intro: 'Exemple de bande « à emporter » pour un fournil : les fournées ci-dessous sont illustratives, le restaurant de référence n’annonce pas ce service.',
    fournees: [
      { libelle: 'Pain de campagne', heure: '07:30' },
      { libelle: 'Focaccia', heure: '11:30' },
      { libelle: 'Pizzas à emporter', heure: '18:00' },
    ],
    placeholder: true,
  },
  fournil: [
    '/photos/cuisine-salage-viande.webp',
    '/photos/cuisine-chefs-passe.webp',
    '/photos/cuisine-francois-poele.webp',
    '/photos/cuisine-chefs-dressage.webp',
    '/photos/service-planche.webp',
  ],
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

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;

/** Horaires compacts par service : « lundi au vendredi 19:00 à 21:00 », calculés (pas de texte en dur). */
export function servicesTexte(r: Restaurant = site): { libelle: string; jours: string; heures: string }[] {
  const abr: Record<Jour, string> = { lundi: 'lun.', mardi: 'mar.', mercredi: 'mer.', jeudi: 'jeu.', vendredi: 'ven.', samedi: 'sam.', dimanche: 'dim.' };
  const groupes = new Map<string, Jour[]>();
  for (const h of r.horaires) for (const c of h.creneaux) {
    const k = `${c.ouverture} à ${c.fermeture}`;
    groupes.set(k, [...(groupes.get(k) || []), h.jour]);
  }
  return [...groupes.entries()].map(([heures, jours]) => ({
    libelle: parseInt(heures) < 17 ? 'Midi' : 'Soir',
    jours: jours.map((j) => abr[j]).join(', '),
    heures,
  }));
}

/** Numéros des disques : seuls les services comptent (01 à 04) ; mises en bouche, mignardise et suppléments n'ont pas de numéro. */
export function numerosServices(plats: Plat[]): string[] {
  let n = 0;
  return plats.map((p) => (p.horsService ? '' : String(++n).padStart(2, '0')));
}
/** Compteur d'une catégorie : le nombre de services annoncé, sinon le nombre de lignes. */
export function compteCategorie(c: Categorie): string {
  return String(c.services ?? c.plats.length).padStart(2, '0');
}
