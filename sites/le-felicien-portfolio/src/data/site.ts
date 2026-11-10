// Tout le contenu du site vit ici. Source : data/restaurants/le-felicien/{dossier.md,donnees.json,photos/index.json}.
// Une donnée, un drapeau : `placeholder: true` ne vaut que pour le champ qu'il accompagne. Toute sous-donnée non
// prouvée par le dossier a son propre drapeau et une marque visible là où elle s'affiche (« exemple », « illustratif »).
// La carte d'automne 2026 est réelle et complète (68 lignes) : aucune catégorie d'exemple. Les photos libres
// (Unsplash via Picsum) sont des illustrations marquées `placeholder: true`, jamais présentées comme le restaurant.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';
export type Service = 'midi' | 'soir';
/** Onglets de l'ardoise : la carte (midi et soir, identique), les suggestions du midi, le bar. */
export type Onglet = 'carte' | 'midi' | 'bar';
export type Badge = 'végé' | 'maison' | 'local';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat {
  nom: string;
  description: string; // vide si le dossier ne donne que le nom
  prix: string | null; // null = compris dans le menu
  placeholder: boolean; // le plat lui-même est-il une invention ?
  badges?: Badge[];
  apercu?: string; // photo 4:5 dans public/photos (aperçu flottant / vignette mobile)
}
export interface Categorie {
  categorie: string;
  service: Onglet;
  exemple: boolean; // catégorie entière composée de lignes d'exemple
  note?: string; // affichée sous le titre de catégorie
  prix?: string; // prix du menu quand les plats n'en ont pas
  plats: Plat[];
}
export interface Menu { nom: string; prix: string; description: string; quand: string; placeholder: boolean }
export interface Membre { nom: string; role: string; rolePlaceholder: boolean; photo?: string; placeholder: boolean }
export interface Presse { media: string; titre: string; date: string; url: string }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }
export interface Suggestion { jour: Jour; texte: string; prix: string | null; placeholder: boolean }

export interface Restaurant {
  slug: string;
  nom: string;
  nomLignes: [string, string]; // le nom en deux lignes sur l'ardoise
  baseline: string;
  description: string;
  url: string;
  typeCuisine: string;
  adresse: { rue: string; numero: string; cp: string; commune: string; pays: string };
  acces: { texte: string; placeholder: boolean }[];
  geo: { lat: number; lon: number };
  telephone: string;
  email: { valeur: string; placeholder: boolean };
  emailEvenements: string;
  reservation: { outil: string; url: string; note: string };
  evenements: { texte: string; prixMenu: string };
  capacite: { texte: string; placeholder: boolean };
  horaires: Horaire[];
  horairesNote: string;
  reseaux: Reseau[];
  suggestions: Suggestion[];
  carte: Categorie[];
  menus: Menu[];
  histoire: string[];
  equipe: Membre[];
  presse: Presse[];
  photos: Photo[];
  motsSalle: string[]; // mots géants empilés de la section salle (tous prouvés par le dossier)
  valeurs: string[];
}

const photo = (src: string, alt: string, largeur: number, hauteur: number, placeholder = false): Photo => ({ src, alt, largeur, hauteur, placeholder });
/** Ligne de carte réelle (prix et description tels que publiés par le restaurant). */
const l = (nom: string, description: string, prix: string, badges?: Badge[], apercu?: string): Plat => ({ nom, description, prix, placeholder: false, badges: badges?.length ? badges : undefined, apercu });
const tous: Jour[] = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
const cren = (soirFin: string) => [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '18:00', fermeture: soirFin }];

export const site: Restaurant = {
  slug: 'le-felicien',
  nom: 'Le Félicien',
  nomLignes: ['Le', 'Félicien'],
  baseline: 'Une brasserie pour tous, au cœur du Business Village Ecolys, ouverte 7 jours sur 7.',
  description:
    "Le Félicien, brasserie à Suarlée (Namur) : croquettes, boulets à la liégeoise, vol-au-vent, carte d'automne 2026, horaires et réservation en ligne.",
  url: 'https://www.lefelicien.be',
  typeCuisine: 'Brasserie classique, cuisine belge',
  adresse: { rue: "Avenue d'Ecolys", numero: '2 bte 3', cp: '5020', commune: 'Suarlée (Namur)', pays: 'BE' },
  acces: [
    { texte: "Au cœur du Business Village Ecolys, à Suarlée.", placeholder: false },
    { texte: 'Stationnement et transports en commun : informations à venir (non communiquées par la maison).', placeholder: true },
  ],
  geo: { lat: 50.485, lon: 4.7953 },
  telephone: '081 39 53 23',
  email: { valeur: 'info@lefelicien.be', placeholder: false },
  emailEvenements: 'evenement@lefelicien.be',
  reservation: { outil: 'Tablebooker', url: 'https://reservations.lefelicien.be/', note: 'Réservation en ligne.' },
  evenements: { texte: 'Le premier étage accueille dîners, banquets et réceptions, combinables avec les salles du Business Village Ecolys.', prixMenu: 'dès 27 € hors boissons' },
  capacite: { texte: "Jusqu'à 300 couverts selon L'Avenir (2026), à confirmer par la maison.", placeholder: true },
  horaires: tous.map((jour) => ({ jour, creneaux: cren(jour === 'vendredi' || jour === 'samedi' ? '22:00' : '21:30') })),
  horairesNote: "Horaires de la cuisine. La veille d'un jour férié, le service du soir va jusqu'à 22h00. Pendant les ventes Rops : petite restauration de 14h00 à 18h00.",
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/lefelicienrestaurant/' },
    { nom: 'Instagram', url: 'https://www.instagram.com/le.felicien/' },
  ],
  // Suggestions de la semaine : mardi au vendredi midi (25 € entrée + plat, 18 € plat). L'attribution d'un plat à un jour
  // est illustrative (le restaurant renouvelle la liste chaque semaine) ; le lundi midi est la cuisine du marché (réel).
  suggestions: [
    { jour: 'lundi', texte: 'Cuisine du marché, décidée le jour même', prix: null, placeholder: false },
    { jour: 'mardi', texte: 'Aumônière de fromage en feuille de brick', prix: '25\u00a0€', placeholder: true },
    { jour: 'mercredi', texte: 'Filet de rouget', prix: '25\u00a0€', placeholder: true },
    { jour: 'jeudi', texte: 'Porcelet', prix: '25\u00a0€', placeholder: true },
    { jour: 'vendredi', texte: 'Saumon', prix: '25\u00a0€', placeholder: true },
    { jour: 'samedi', texte: "Pas de suggestions de la semaine ce jour-là : toute la carte, midi et soir.", prix: null, placeholder: false },
    { jour: 'dimanche', texte: "Pas de suggestions de la semaine ce jour-là : toute la carte, midi et soir.", prix: null, placeholder: false },
  ],
  carte: [
    {
      categorie: 'Suggestions de la semaine',
      service: 'midi',
      exemple: false,
      prix: '25\u00a0€',
      note: "Du mardi au vendredi midi : renouvelées chaque semaine ; exemples d'une semaine d'automne 2026. Le lundi midi, cuisine du marché décidée le jour même.",
      plats: [
        { nom: 'Aumônière de fromage en feuille de brick', description: 'entrée', prix: null, placeholder: false },
        { nom: 'Filet de rouget', description: 'entrée', prix: null, placeholder: false },
        { nom: 'Porcelet', description: 'plat', prix: null, placeholder: false },
        { nom: 'Saumon', description: 'plat', prix: null, placeholder: false },
      ],
    },
    {
      categorie: "Entrées · à partager",
      service: 'carte',
      exemple: false,
      plats: [
        l("Planche apéritive (2 personnes)", "", "11 €"),
      ],
    },
    {
      categorie: "Entrées · à savourer",
      service: 'carte',
      exemple: false,
      plats: [
        l("Soupe à l'oignon", "emmental râpé et croûtons", "10 €"),
        l("Terrine de gibier", "duo de confits, fruits secs, cramique toasté", "17 €"),
        l("Salade de saumon fumé de Gembloux", "échalotes hachées, toast rôti, sauce Gravlax · 21 € en plat", "18 €"),
        l("Croquette au fromage", "mesclun et garnitures · 2 pièces, 16 € en plat", "10 €"),
        l("Croquette de crevettes grises", "mesclun et garnitures · 2 pièces, 21 € en plat", "13 €"),
        l("Croquette d'effiloché de bœuf", "2 pièces, 17 € en plat", "11 €"),
        l("Duo de croquettes fromage et crevettes", "", "19 €"),
        l("Crottin de Chavignol rôti", "miel d'acacia, quatre épices, poires pochées aux agrumes", "16 €"),
        l("Feuilleté de scampis sautés au curry", "bisque au lait de coco", "17 €"),
        l("Os à moelle rôti au four", "persillade de fines herbes à l'ail, oignons frits, focaccia grillée (20 min)", "18 €"),
      ],
    },
    {
      categorie: "Plats · viandes",
      service: 'carte',
      exemple: false,
      plats: [
        l("Filet américain préparé ou non", "salade, frites", "23 €"),
        l("Le Féliburger", "Black Angus, mozzarella filante, roquette, tomates confites, mayonnaise au basilic, frites", "28 €"),
        l("Boulets à la liégeoise maison", "frites", "19 €", ["maison"]),
        l("Boulettes sauce tomate", "frites", "19 €"),
        l("Vol-au-vent maison", "boulettes de veau, feuilleté, frites", "24 €", ["maison"]),
        l("Parmentier de canard", "purée de brocolis, jus corsé", "27 €"),
        l("Jambonneau en croûte", "sauce dijonnaise, frites (20 min)", "27 €"),
        l("Ris de veau grillé", "sauce aux morilles, râpé de pommes de terre", "36 €"),
        l("Filet mignon de bœuf irlandais (250 g)", "frites, sauce au choix", "29 €"),
        l("Entrecôte de bœuf du moment (350 g)", "frites, sauce au choix", "38 €"),
        l("Brochette de bœuf irlandais (300 g)", "frites, sauce au choix", "31 €"),
        l("Brochette de poulet jaune de la Semois", "frites, sauce au choix", "24 €"),
      ],
    },
    {
      categorie: "Plats · poissons",
      service: 'carte',
      exemple: false,
      plats: [
        l("Pavé de saumon rôti au four", "sauté de légumes, sauce béarnaise, frites", "26 €"),
        l("Dorade royale rôtie entière", "sauté de légumes, mayonnaise maison au tandoori, frites", "27 €"),
        l("Filets de bar de ligne", "coulis d'épinards crémé, purée", "28 €"),
      ],
    },
    {
      categorie: "Plats · pâtes",
      service: 'carte',
      exemple: false,
      plats: [
        l("Rigatoni jambon fromage gratinés", "", "15 €", []),
        l("Cannelloni de volaille à la truffe, gratinés", "", "20 €", []),
        l("Linguine aux gambas rôties", "sauce Alfredo", "23 €", []),
      ],
    },
    {
      categorie: "Plats · salade",
      service: 'carte',
      exemple: false,
      plats: [
        l("Salade périgourdine", "magret fumé, gésiers de canard confits, terrine de gibier, cramique toasté", "24 €"),
      ],
    },
    {
      categorie: "Vegan & Veggie",
      service: 'carte',
      exemple: false,
      plats: [
        l("Bowl de falafels", "houmous et guacamole", "17 €", ["végé"]),
        l("Cannelloni ricotta-épinards gratinés", "sauce tomate", "21 €", ["végé"]),
        l("Veggie Burger", "bun bretzel, galette de pommes de terre, sauce Vintage, salade, tomate ; version vegan sur demande", "23 €", ["végé"]),
      ],
    },
    {
      categorie: "Pour les bambins",
      service: 'carte',
      exemple: false,
      plats: [
        l("Boulettes sauce tomate ou liégeoise, frites", "", "10 €"),
        l("Vol-au-vent maison, frites", "", "11 €", ["maison"]),
        l("Brochette de bœuf, frites", "", "15 €"),
        l("Rigatoni jambon fromage", "", "10 €"),
      ],
    },
    {
      categorie: "Desserts",
      service: 'carte',
      exemple: false,
      plats: [
        l("Pain perdu brioché", "caramel beurre salé, glace vanille", "12 €"),
        l("Cheesecake à la mandarine et spéculoos", "", "12 €"),
        l("Mousse au chocolat", "", "11 €"),
        l("Crème brûlée à la vanille Bourbon et sucre de canne", "", "11 €"),
        l("Dame blanche et chocolat chaud", "", "11 €"),
        l("Dame noire", "", "11 €"),
        l("Banana split", "", "12 €"),
        l("Glace brésilienne", "", "11 €"),
        l("Sorbet Colonel", "", "14 €"),
        l("Café gourmand (4 variétés)", "", "14 €", []),
      ],
    },
    {
      categorie: "Suppléments",
      service: 'carte',
      exemple: false,
      plats: [
        l("Salade verte, supplément frites, supplément sauce au choix", "sauces : béarnaise maison, archiduc, 10 poivres, roquefort, dijonnaise, crème aux morilles (+2 €)", "3,5 €"),
      ],
    },
    {
      categorie: "Cocktails et apéritifs",
      service: 'bar',
      exemple: false,
      plats: [
        l("Le Félicien", "Passoa, gin, Cointreau, jus de fruits", "11 €"),
        l("Negroni", "", "10 €"),
        l("Aperol Spritz", "", "10 €"),
        l("Mojito", "", "11 €"),
        l("Gimber Apple (mocktail)", "", "8 €"),
        l("Virgin Mojito", "", "9 €"),
        l("Coupe de « Perle de Wallonie »", "", "10 €"),
        l("Coupe de Champagne « Vranken »", "", "14 €"),
        l("Kir Royal", "", "15 €"),
        l("Kir vin blanc", "", "6,5 €"),
        l("Sangria rouge / blanche", "", "9 €"),
      ],
    },
    {
      categorie: "Bières (extraits)",
      service: 'bar',
      exemple: false,
      plats: [
        l("Jupiler (fût 25 cl)", "", "3,5 €"),
        l("Blanche de Namur (fût 25 cl)", "", "3,5 €"),
        l("Leffe Blonde (fût 25 cl)", "", "5 €"),
        l("Tripel Karmeliet (fût 25 cl)", "", "6 €"),
        l("Orval (bouteille)", "", "6 €"),
        l("Chimay Bleue (bouteille)", "", "6 €"),
      ],
    },
    {
      categorie: "Softs (extraits)",
      service: 'bar',
      exemple: false,
      plats: [
        l("Chaudfontaine plate ou pétillante 25 cl", "", "3,2 €"),
        l("Coca-Cola / Fanta / Sprite", "", "3,5 €"),
        l("Jus de pomme « Reinette et Co »", "", "4,2 €"),
      ],
    },
  ],
  menus: [
    { nom: 'Suggestions de la semaine', prix: '25\u00a0€', quand: 'Du mardi au vendredi, le midi', description: "Entrée et plat 25 €, plat seul 18 €. Le lundi, cuisine du marché décidée le jour même.", placeholder: false },
    { nom: 'Pour les bambins', prix: 'dès 10\u00a0€', quand: 'Midi et soir', description: 'Boulettes sauce tomate ou liégeoise, vol-au-vent, brochette de bœuf ou rigatoni jambon fromage, avec frites ou pâtes.', placeholder: false },
    { nom: 'Banquets et réceptions', prix: 'dès 27\u00a0€', quand: 'Au premier étage', description: 'Pour dîners, banquets et réceptions.', placeholder: false },
  ],
  histoire: [
    "Lancé fin 2019 au cœur du Business Village Ecolys, Le Félicien est une brasserie pour tous : celle des employés du parc d'activités, des clients de l'hôtel voisin, des habitants de Suarlée et de Namur.",
    "La brasserie a rouvert le jeudi 22 janvier 2026 sous la direction de Maximilien de Sauvage, à l'initiative de la relance et du développement du projet. Elle est ouverte 7 jours sur 7, midi et soir.",
    "En cuisine, le chef Sébastien Deprost ; en salle, le maître d'hôtel Sébastien Gilles. À eux deux, plus de trente années d'expérience.",
    "La carte reste celle des grands classiques : croquettes au fromage, aux crevettes grises ou à l'effiloché de bœuf, boulets à la liégeoise et vol-au-vent maison, et des frites fraîches cuites à la graisse de bœuf. La carte d'automne 2026 ajoute terrine de gibier, os à moelle et ris de veau aux morilles.",
  ],
  equipe: [
    { nom: 'Sébastien Deprost', role: 'Chef de cuisine', rolePlaceholder: false, placeholder: false },
    { nom: 'Sébastien Gilles', role: "Maître d'hôtel", rolePlaceholder: false, placeholder: false },
    { nom: 'Maximilien de Sauvage', role: 'À l\'initiative de la relance et du développement du projet', rolePlaceholder: false, placeholder: false },
  ],
  presse: [
    { media: "L'Avenir", titre: 'La Brasserie Le Félicien reprend du service à Namur', date: '2026-01-26', url: 'https://www.lavenir.net/regions/namur/2026/01/26/la-brasserie-le-felicien-reprend-du-service-a-namur-6XMP7PS7JJH75M3FJUBP4ABTKQ/' },
  ],
  photos: [
    photo('/photos/pates-brasserie.webp', 'Assiette de pâtes et légumes sur un comptoir, arrière-plan flou (photo du restaurant, 2020)', 1800, 914),
    photo('/photos/salle-bar.webp', "Photo libre d'illustration : clients attablés dans un bar animé, lumières chaudes", 1600, 1067, true),
    photo('/photos/illustration-carte.webp', "Illustration dessinée de la salle, couverture de la carte d'automne 2026", 1000, 1414),
    photo('/photos/galerie-ingredients.webp', "Photo libre d'illustration : oignon rouge, herbes et poivre sur une planche en bois", 1200, 800, true),
    photo('/photos/galerie-cafe.webp', "Photo libre d'illustration : un café sur une table en bois", 1200, 800, true),
    photo('/photos/galerie-framboises.webp', "Photo libre d'illustration : framboises dans une tasse blanche", 1200, 800, true),
    photo('/photos/galerie-fraises.webp', "Photo libre d'illustration : un dessert aux fraises dans un bol blanc", 1200, 800, true),
    photo('/photos/galerie-grains.webp', "Photo libre d'illustration : grains de café", 1200, 800, true),
  ],
  motsSalle: ['Brasserie', 'Bar', 'Banquets'],
  valeurs: ['Grands classiques de la brasserie', 'Cuisine lisible, généreuse et maîtrisée', "Carte d'automne", 'Corbeille de pain frais offerte à la demande'],
};

/** Crédits des photos libres (Unsplash, licence Unsplash) : à remplacer par des photos du restaurant. */
export const credits = [
  { auteur: 'Dogancan Ozturan', url: 'https://unsplash.com/photos/94taEmdowRw', usage: 'bar' },
  { auteur: 'Webvilla', url: 'https://unsplash.com/photos/hv1MrBzGGNY', usage: 'ingrédients' },
  { auteur: 'Carli Jean', url: 'https://unsplash.com/photos/UWRqlJcDCXA', usage: 'café' },
  { auteur: 'Glen Carrie', url: 'https://unsplash.com/photos/FjjUVn_KHLU', usage: 'framboises' },
  { auteur: 'Jeffrey Deng', url: 'https://unsplash.com/photos/h6t2dbYgDuc', usage: 'dessert aux fraises' },
  { auteur: 'Daniel Ruswick', url: 'https://unsplash.com/photos/MHM_al3KqIQ', usage: 'grains de café' },
];

/** Photo par chemin (erreur explicite si le chemin n'existe pas). */
export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}

export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;
export const horaireTexte = (h: Horaire) => (h.creneaux.length ? h.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(', ') : h.note || 'fermé');
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;
export const carteDe = (onglet: Onglet) => site.carte.filter((c) => c.service === onglet);
/** Créneau d'un service pour un jour : 'midi' = ouverture avant 15:00. */
export const creneauService = (h: Horaire, s: Service) => h.creneaux.find((c) => (s === 'midi' ? c.ouverture < '15:00' : c.ouverture >= '15:00')) || null;
/** Libellé statique des services (repli sans JS de la barre d'état). */
export const servicesTexte = () => 'Ouvert 7 jours sur 7 : midi 12h00 à 14h00, soir dès 18h00';
