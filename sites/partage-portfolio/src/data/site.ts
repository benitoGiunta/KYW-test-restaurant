// Tout le contenu du site vit ici. Source : data/restaurants/partage/{dossier.md,donnees.json} (recherche du 01/11/2026).
// Une donnée, un drapeau : `placeholder: true` ne vaut que pour le champ qu'il accompagne. Toute sous-donnée non
// prouvée par le dossier a son propre drapeau et une marque visible là où elle s'affiche (« exemple », « illustratif »).
// La carte de Partage est réelle (carte du 28/09/2026 transcrite des GIF du site, lunch du 21/10/2026) : aucune ligne
// d'exemple. Seuls les heures de service, l'attribution des suggestions aux jours et le rôle d'Antoine sont incertains.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';
export type Service = 'midi' | 'soir';
export type Rubrique = Service | 'tous' | 'bar'; // 'bar' : carte des boissons, page carte seulement
export type Badge = 'végé' | 'maison' | 'local';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat {
  nom: string;
  description: string; // vide si le dossier ne donne que le nom
  prix: string | null; // null = compris dans le menu
  placeholder: boolean; // le plat lui-même est-il une invention ?
  badges?: Badge[];
  apercu?: string; // photo 4:5 de la maison, pas toujours le plat exact (voir la note de la page carte) ; dans public/photos (aperçu flottant / vignette mobile)
}
export interface Categorie {
  categorie: string;
  service: Rubrique;
  exemple: boolean; // catégorie entière composée de lignes d'exemple
  note?: string; // affichée sous le titre de catégorie
  prix?: string; // prix du menu quand les plats n'en ont pas
  plats: Plat[];
}
export interface Menu { nom: string; prix: string; description: string; quand: string; placeholder: boolean }
export interface Membre { nom: string; role: string; rolePlaceholder: boolean; photo?: string; placeholder: boolean }
export interface Avis { texte: string; auteur: string; source: string; date: string; note?: number; placeholder: boolean }
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
  reservation: { outil: string; url: string; note: string };
  cadeau: { note: string; url: string };
  horairesNote: { texte: string; placeholder: boolean }; // heures de service à confirmer
  privatisation: { texte: string; placeholder: boolean };
  horaires: Horaire[];
  reseaux: Reseau[];
  suggestions: Suggestion[];
  carte: Categorie[];
  menus: Menu[];
  histoire: string[];
  equipe: Membre[];
  avis: Avis[];
  photos: Photo[];
  motsSalle: string[]; // mots géants empilés de la section salle (tous prouvés par le dossier)
  valeurs: string[];
}

const photo = (src: string, alt: string, largeur: number, hauteur: number, placeholder = false): Photo => ({ src, alt, largeur, hauteur, placeholder });

export const site: Restaurant = {
  slug: 'partage',
  nom: 'Partage',
  nomLignes: ['Partage', 'Charles Jeandrain'], // le nom, puis la signature du logo
  baseline: 'Ici, l’expérience se vit dans le partage : plusieurs assiettes au milieu de la table, une cuisine sincère et gourmande, au cœur du piétonnier de Namur.',
  description:
    'Partage, le bistro de Charles Jeandrain dans le piétonnier de Namur : la carte à partager et ses prix, le lunch du midi, les horaires et la réservation, lus en un coup d’œil.',
  url: 'https://restaurantpartage.be',
  typeCuisine: 'Cuisine locale à partager, influences belges, méditerranéennes et asiatiques',
  adresse: { rue: 'Rue des Fossés Fleuris', numero: '18', cp: '5000', commune: 'Namur', pays: 'BE' },
  acces: [
    { texte: 'Dans le piétonnier, à deux pas de la place Maurice Servais.', placeholder: false },
    { texte: 'Parking Beffroi à 1 minute, parking La Confluence à 2 minutes.', placeholder: false },
  ],
  geo: { lat: 50.4626798, lon: 4.8651014 },
  telephone: '+32 81 81 00 98',
  email: { valeur: '', placeholder: true }, // inconnu : jamais affiché
  reservation: { outil: 'restaurantpartage.be', url: 'https://restaurantpartage.be/#reservation', note: 'Pour un groupe de plus de six personnes, appelez-nous.' },
  cadeau: { note: 'Le bon cadeau se commande en ligne, sur le site du restaurant.', url: 'https://restaurantpartage.be/bon-cadeau/' },
  privatisation: { texte: 'La salle se privatise pour des groupes de 20 à 30 personnes : repas d’entreprise, anniversaire, famille.', placeholder: false },
  horairesNote: { texte: 'Jours de fermeture confirmés ; heures de service indicatives, à confirmer.', placeholder: true },
  horaires: [
    { jour: 'lundi', creneaux: [], note: 'fermé' },
    { jour: 'mardi', creneaux: [{ ouverture: '18:30', fermeture: '22:00' }] },
    { jour: 'mercredi', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '18:30', fermeture: '22:00' }] },
    { jour: 'jeudi', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '18:30', fermeture: '22:00' }] },
    { jour: 'vendredi', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '18:30', fermeture: '22:00' }] },
    { jour: 'samedi', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '18:30', fermeture: '22:00' }] },
    { jour: 'dimanche', creneaux: [], note: 'fermé' },
  ],
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61566994066332' },
    { nom: 'Instagram', url: 'https://www.instagram.com/restaurant_partage_namur/' },
  ],
  // Suggestions : plats réels de la carte ; leur attribution à un jour est illustrative (marquée). Jours fermés : réels.
  suggestions: [
    { jour: 'lundi', texte: 'Fermé le lundi. On se retrouve mardi soir.', prix: null, placeholder: false },
    { jour: 'mardi', texte: 'À partager ce soir : croquettes de jambon ibérique, six pièces', prix: '16 €', placeholder: true },
    { jour: 'mercredi', texte: 'Calamars frits, sauce tartare, au milieu de la table', prix: '22 €', placeholder: true },
    { jour: 'jeudi', texte: 'Poulpe rôti, niçoise de légumes, chorizo', prix: '34 €', placeholder: true },
    { jour: 'vendredi', texte: 'Saint-Jacques snackées, fondue de poireaux, beurre blanc', prix: '23 €', placeholder: true },
    { jour: 'samedi', texte: 'Filet pur de bœuf Holstein, béarnaise, pommes allumettes', prix: '45 €', placeholder: true },
    { jour: 'dimanche', texte: 'Fermé le dimanche. On se retrouve mardi soir.', prix: null, placeholder: false },
  ],
  carte: [
    {
      categorie: 'Lunch',
      service: 'midi',
      exemple: false,
      prix: '38 €',
      note: 'Entrée, plat et dessert, uniquement le midi et pour la table entière. Composition au 21 octobre 2026 : elle change au fil des semaines.',
      plats: [
        { nom: 'Comme une pomme de terre au foie gras', description: 'gel porto, oignons rouges', prix: null, placeholder: false },
        { nom: 'Raviole de champignons des bois', description: 'bouillon beurré de champignons au soja', prix: null, placeholder: false },
        { nom: 'Volaille jaune à basse température', description: 'embeurrée de chou vert, jus brun de volaille au poivre', prix: null, placeholder: false },
        { nom: 'Crumble de pommes', description: 'crème légère, glace vanille', prix: null, placeholder: false },
        { nom: 'Fromages en supplément', description: '', prix: '+16 €', placeholder: false },
        { nom: 'Fromages à la place du dessert', description: '', prix: '+9 €', placeholder: false },
      ],
    },
    {
      categorie: "Starters",
      service: 'soir',
      exemple: false,
      note: "À picorer au centre de la table.",
      plats: [
        { nom: "Croquettes de jambon ibérique (6 pièces)", description: "", prix: "16 €", placeholder: false, apercu: '/photos/apercu-jambon.webp' },
        { nom: "Œuf mimosa aux œufs de saumon", description: "", prix: "11 €", placeholder: false },
      ],
    },
    {
      categorie: "Entrées",
      service: 'soir',
      exemple: false,
      note: "Plusieurs assiettes au milieu de la table plutôt qu’un plat chacun.",
      plats: [
        { nom: "Saint-Jacques snackées", description: "Fondue de poireaux, beurre blanc à l’huile d’herbes", prix: "23 €", placeholder: false },
        { nom: "Chou-fleur confit", description: "Rôti au beurre, crémeux de jaunes d’œufs, noisettes", prix: "21 €", placeholder: false, badges: ["végé"] },
        { nom: "Carpaccio de thon rouge", description: "Olives, roquette, huile d’olive au citron, mayonnaise au basilic", prix: "23 €", placeholder: false },
        { nom: "Foie gras maison", description: "Salade de magret de canard", prix: "24 €", placeholder: false, badges: ["maison"] },
        { nom: "Calamars frits", description: "Sauce tartare", prix: "22 €", placeholder: false, apercu: '/photos/apercu-calamars.webp' },
      ],
    },
    {
      categorie: "Plats",
      service: 'soir',
      exemple: false,
      plats: [
        { nom: "Filet pur de bœuf Holstein", description: "Béarnaise, pommes allumettes, salade verte", prix: "45 €", placeholder: false },
        { nom: "Rognon de veau à la moutarde", description: "Pommes grenailles", prix: "33 €", placeholder: false },
        { nom: "Risotto aux champignons des bois et parmesan", description: "", prix: "24 €", placeholder: false, badges: ["végé"] },
        { nom: "Poulpe rôti", description: "Niçoise de légumes, chorizo, mayonnaise aux poivrons", prix: "34 €", placeholder: false },
        { nom: "Filet de daurade à l’unilatérale", description: "Artichauts, vierge aux légumes", prix: "29 €", placeholder: false },
      ],
    },
    {
      categorie: "Desserts",
      service: 'soir',
      exemple: false,
      plats: [
        { nom: "Compotée de poire à la vanille", description: "Ganache chocolat blanc, crumble fleur de sel", prix: "13 €", placeholder: false },
        { nom: "Dame Blanche", description: "Glace vanille, sauce chocolat, crème chantilly", prix: "13 €", placeholder: false },
        { nom: "Assiette de fromages", description: "Sélection de la « Maison Depouhon »", prix: "16 €", placeholder: false },
        { nom: "Suggestion de dessert du moment", description: "", prix: "13 €", placeholder: false },
      ],
    },
    {
      categorie: "Vins au verre",
      service: 'tous',
      exemple: false,
      note: "Prix au verre, puis à la bouteille entre parenthèses.",
      plats: [
        { nom: "Muscadet de Sèvre et Maine sur lie « La Grenouille » (Vallée de la Loire)", description: "blanc", prix: "9 € (32 €)", placeholder: false, apercu: '/photos/apercu-verres.webp' },
        { nom: "Chardonnay Côtes d’Auxerre Dom Sorin Coquard (Bourgogne)", description: "blanc", prix: "12 € (41 €)", placeholder: false, apercu: '/photos/apercu-verres.webp' },
        { nom: "Bianco di Custoza IGT Veronese Ca’dei Colli (Vénétie)", description: "blanc", prix: "9 € (31 €)", placeholder: false, apercu: '/photos/apercu-verres.webp' },
        { nom: "Syrah « Les Vignes d’à Côté » Yves Cuilleron (Vallée du Rhône)", description: "rouge", prix: "10 € (35 €)", placeholder: false, apercu: '/photos/apercu-verres.webp' },
        { nom: "Terrasses du Larzac « La Petite Prise » Mas Conscience (Languedoc)", description: "rouge", prix: "13 € (45 €)", placeholder: false, apercu: '/photos/apercu-verres.webp' },
        { nom: "Primitivo « Kerinos » IGP Caiaffa (Pouilles)", description: "rouge", prix: "9 € (31 €)", placeholder: false, apercu: '/photos/apercu-verres.webp' },
        { nom: "IGP Méditerranée « Méditerranée » Château Favori", description: "rosé", prix: "9 € (32 €)", placeholder: false, apercu: '/photos/apercu-verres.webp' },
      ],
    },
    {
      categorie: "Apéritifs",
      service: 'bar',
      exemple: false,
      plats: [
        { nom: "Coupe Chant d’Éole Blanc de Blancs", description: "", prix: "15 €", placeholder: false },
        { nom: "Campari", description: "", prix: "9 €", placeholder: false },
        { nom: "Martini (blanc, rouge)", description: "", prix: "8 €", placeholder: false },
        { nom: "Picon amer", description: "", prix: "8,5 €", placeholder: false },
        { nom: "Picon (bière, vin blanc)", description: "", prix: "10 €", placeholder: false },
        { nom: "Ricard", description: "", prix: "8,5 €", placeholder: false },
        { nom: "Pisang Ambon", description: "", prix: "8 €", placeholder: false },
        { nom: "Passoa", description: "", prix: "8 €", placeholder: false },
        { nom: "Kir vin blanc", description: "", prix: "8 €", placeholder: false },
        { nom: "Pineau des Charentes (blanc, rouge)", description: "", prix: "8 €", placeholder: false },
        { nom: "Porto (blanc, rouge)", description: "", prix: "8 €", placeholder: false },
        { nom: "Accompagnement soft", description: "", prix: "2,5 €", placeholder: false },
      ],
    },
    {
      categorie: "Cocktails",
      service: 'bar',
      exemple: false,
      plats: [
        { nom: "Apérol Spritz", description: "", prix: "12 €", placeholder: false },
        { nom: "Hugo Spritz", description: "", prix: "12 €", placeholder: false },
        { nom: "Negroni", description: "", prix: "12 €", placeholder: false },
        { nom: "Jet 27", description: "", prix: "8 €", placeholder: false },
        { nom: "Cocktail du moment", description: "", prix: "12 €", placeholder: false },
      ],
    },
    {
      categorie: "Sans alcool",
      service: 'bar',
      exemple: false,
      plats: [
        { nom: "Cocktail : eau, lavande, cardamome et citron vert", description: "", prix: "8 €", placeholder: false },
        { nom: "Stella 0.0", description: "", prix: "4 €", placeholder: false },
        { nom: "Gin Copperhead 0.0", description: "", prix: "10 €", placeholder: false },
        { nom: "Gin Botaniets Original", description: "", prix: "14 €", placeholder: false },
        { nom: "Bière Houla Houppe NA", description: "", prix: "6 €", placeholder: false },
        { nom: "Gin Arduena NA + tonic", description: "", prix: "13,5 €", placeholder: false },
      ],
    },
    {
      categorie: "Jus artisanaux (33 cl)",
      service: 'bar',
      exemple: false,
      plats: [
        { nom: "Raisin blanc", description: "", prix: "8 €", placeholder: false },
        { nom: "Pomme cox’s", description: "", prix: "8 €", placeholder: false },
        { nom: "Ananas", description: "", prix: "8 €", placeholder: false },
        { nom: "Tomate noire de Crimée", description: "", prix: "8 €", placeholder: false },
      ],
    },
    {
      categorie: "Bières",
      service: 'bar',
      exemple: false,
      plats: [
        { nom: "Stella Artois (fût)", description: "", prix: "4 €", placeholder: false },
        { nom: "Scotch CTS (fût)", description: "", prix: "5,5 €", placeholder: false },
        { nom: "Tripel Karmeliet (fût)", description: "", prix: "6 €", placeholder: false },
        { nom: "Triple de Leignon (suggestion)", description: "", prix: "6 €", placeholder: false },
        { nom: "Houppe (bouteille)", description: "", prix: "6,5 €", placeholder: false },
        { nom: "Chimay Bleue", description: "", prix: "6 €", placeholder: false },
        { nom: "Orval", description: "", prix: "7 €", placeholder: false },
        { nom: "Leffe Blonde / Brune", description: "", prix: "6 €", placeholder: false },
        { nom: "Leffe Ruby", description: "", prix: "6 €", placeholder: false },
      ],
    },
    {
      categorie: "Softs",
      service: 'bar',
      exemple: false,
      plats: [
        { nom: "Eau plate / pétillante (1/4, 1/2 l)", description: "", prix: "3 € / 5 €", placeholder: false },
        { nom: "Coca-Cola, Coca-Cola zéro, Fanta orange, Sprite", description: "", prix: "3,5 €", placeholder: false },
        { nom: "Fuzetea pétillant, Fuzetea pêche-hibiscus", description: "", prix: "3,8 €", placeholder: false },
        { nom: "Tonic (Fever-Tree)", description: "", prix: "4 €", placeholder: false },
        { nom: "Jus d’orange, jus de pomme cerise", description: "", prix: "3,8 €", placeholder: false },
      ],
    },
    {
      categorie: "Alcools",
      service: 'bar',
      exemple: false,
      plats: [
        { nom: "Vodka blanche Eristoff", description: "", prix: "8 €", placeholder: false },
        { nom: "Bacardi Carta Blanca", description: "", prix: "8,5 €", placeholder: false },
        { nom: "Bacardi Carta Oro", description: "", prix: "8,5 €", placeholder: false },
        { nom: "Jack Daniel’s", description: "", prix: "9 €", placeholder: false },
        { nom: "Johnnie Walker Red Label", description: "", prix: "8,5 €", placeholder: false },
      ],
    },
    {
      categorie: "Gins",
      service: 'bar',
      exemple: false,
      plats: [
        { nom: "Tanqueray", description: "", prix: "9 €", placeholder: false },
        { nom: "Panda", description: "", prix: "11,5 €", placeholder: false },
        { nom: "Copperhead", description: "", prix: "14,5 €", placeholder: false },
        { nom: "Double You", description: "", prix: "11,5 €", placeholder: false },
        { nom: "Marula", description: "", prix: "13,5 €", placeholder: false },
        { nom: "Gin Mare Méditerranée", description: "", prix: "10,5 €", placeholder: false },
      ],
    },
    {
      categorie: "Rhums et whiskys",
      service: 'bar',
      exemple: false,
      plats: [
        { nom: "Eminente 7 ans (Cuba)", description: "", prix: "12 €", placeholder: false },
        { nom: "Admiral Rodney Princessa (Sainte-Lucie)", description: "", prix: "12 €", placeholder: false },
        { nom: "Depaz XO (Martinique)", description: "", prix: "14 €", placeholder: false },
        { nom: "Kilchoman Sanaig (Écosse)", description: "", prix: "14 €", placeholder: false },
        { nom: "Westland Beer Cask (Amérique)", description: "", prix: "16 €", placeholder: false },
        { nom: "Yellow Spot 12 ans (Irlande)", description: "", prix: "17 €", placeholder: false },
      ],
    },
    {
      categorie: "Tequilas Clase Azul (2 cl) et chartreuses",
      service: 'bar',
      exemple: false,
      plats: [
        { nom: "Clase Azul Reposado", description: "", prix: "18 €", placeholder: false },
        { nom: "Clase Azul Gold", description: "", prix: "38 €", placeholder: false },
        { nom: "Clase Azul Añejo", description: "", prix: "68 €", placeholder: false },
        { nom: "Clase Azul Mezcal San Luis", description: "", prix: "38 €", placeholder: false },
        { nom: "Clase Azul Mezcal Durango", description: "", prix: "38 €", placeholder: false },
        { nom: "Clase Azul Mezcal Guerrero", description: "", prix: "38 €", placeholder: false },
        { nom: "Chartreuse Verte", description: "", prix: "12 €", placeholder: false },
        { nom: "Chartreuse Jaune", description: "", prix: "11 €", placeholder: false },
        { nom: "Chartreuse MOF", description: "", prix: "14 €", placeholder: false },
        { nom: "Chartreuse VEP", description: "", prix: "22 €", placeholder: false },
      ],
    },
    {
      categorie: "Digestifs",
      service: 'bar',
      exemple: false,
      plats: [
        { nom: "Cognac Ch. de Montifaud VS", description: "", prix: "9 €", placeholder: false },
        { nom: "Calvados du Breuil", description: "", prix: "9 €", placeholder: false },
        { nom: "Bas Armagnac Ch. de Laubade", description: "", prix: "9,5 €", placeholder: false },
        { nom: "Grappa Marolo Barbaresco", description: "", prix: "12 €", placeholder: false },
        { nom: "Grappa Marolo Amarone", description: "", prix: "12 €", placeholder: false },
        { nom: "Sambuca Molinari", description: "", prix: "8,5 €", placeholder: false },
        { nom: "Cointreau", description: "", prix: "9,5 €", placeholder: false },
        { nom: "Poire Cognac Distillerie des Ardennes", description: "", prix: "8,5 €", placeholder: false },
        { nom: "Poire Williams « Grande Réserve »", description: "", prix: "10,5 €", placeholder: false },
        { nom: "Framboise « Grande Réserve »", description: "", prix: "11 €", placeholder: false },
        { nom: "Mirabelle « Grande Réserve »", description: "", prix: "10,5 €", placeholder: false },
        { nom: "Marc de Gewurztraminer « Grande Réserve »", description: "", prix: "10,5 €", placeholder: false },
        { nom: "Eau de Villée", description: "", prix: "9 €", placeholder: false },
        { nom: "Bailey’s", description: "", prix: "8,5 €", placeholder: false },
        { nom: "Vieille Prune Souillac", description: "", prix: "12 €", placeholder: false },
        { nom: "Amaretto Adriatico", description: "", prix: "10 €", placeholder: false },
        { nom: "Amaretto Bianco Adriatico", description: "", prix: "10 €", placeholder: false },
      ],
    },
    {
      categorie: "Cocktails fin de repas et digestifs chauds",
      service: 'bar',
      exemple: false,
      plats: [
        { nom: "Espresso Martini", description: "", prix: "12 €", placeholder: false },
        { nom: "Amaretto Sour", description: "", prix: "11 €", placeholder: false },
        { nom: "Limoncello / Basilic", description: "", prix: "11 €", placeholder: false },
        { nom: "Irish Coffee", description: "", prix: "11 €", placeholder: false },
        { nom: "French Coffee", description: "", prix: "11 €", placeholder: false },
        { nom: "Italian Coffee", description: "", prix: "11 €", placeholder: false },
      ],
    },
    {
      categorie: "Cafés et thés",
      service: 'bar',
      exemple: false,
      plats: [
        { nom: "Café ou déca", description: "", prix: "4,5 €", placeholder: false },
        { nom: "Espresso", description: "", prix: "4,5 €", placeholder: false },
        { nom: "Cappuccino", description: "", prix: "5 €", placeholder: false },
        { nom: "Thé ou infusion", description: "", prix: "5 €", placeholder: false },
      ],
    },
  ],
  // Les « formules » de Partage : le lunch (réel), la carte à partager (fourchette réelle), la privatisation (réelle).
  // Menus cités par la presse (4 services 49 €, homard 67 €) absents du site actuel : non affichés.
  menus: [
    { nom: 'Le lunch', prix: '38 €', quand: 'Le midi, du mercredi au samedi', description: 'Entrée, plat et dessert, servis à la table entière. Fromages en supplément 16 €, ou 9 € à la place du dessert.', placeholder: false },
    { nom: 'La carte à partager', prix: 'dès 11 €', quand: 'Du mardi au samedi soir', description: 'Starters de 11 à 16 €, entrées de 21 à 24 €, plats de 24 à 45 €, desserts de 13 à 16 €. On commande plusieurs assiettes pour la table.', placeholder: false },
    { nom: 'La salle pour vous', prix: '20 à 30', quand: 'Sur demande, par téléphone', description: 'Privatisation pour des groupes de 20 à 30 personnes, dans une salle d’une trentaine de couverts.', placeholder: false },
  ],
  histoire: [
    'Partage est la deuxième adresse de Charles Jeandrain, le chef étoilé d’Attablez-vous. Il l’a ouverte le 12 novembre 2024, rue des Fossés Fleuris, dans le piétonnier de Namur : « J’avais toujours dit que j’ouvrirais un bistro dans le centre de Namur. »',
    'L’idée tient dans le nom : plusieurs mets posés au milieu de la table, que l’on partage, plutôt qu’une assiette chacun. « Le partage, c’est aussi un moment. »',
    'Une cuisine sincère et gourmande, à base de produits locaux, avec des touches belges, méditerranéennes et asiatiques : croquettes de jambon ibérique, foie gras maison, poulpe rôti, et la dame blanche pour finir.',
    'En cuisine, Luca Recloux mène la brigade ; en salle, Loïc Goumet accueille après neuf ans passés chez Attablez-vous. La maison forme aussi de jeunes cuisiniers. Une trentaine de couverts, une cuisine plus chaleureuse et moins guindée.',
  ],
  equipe: [
    { nom: 'Charles Jeandrain', role: 'Chef et fondateur', rolePlaceholder: false, photo: '/photos/chef-charles.webp', placeholder: false },
    { nom: 'Luca Recloux', role: 'Chef exécutif', rolePlaceholder: false, placeholder: false },
    { nom: 'Loïc Goumet', role: 'Salle', rolePlaceholder: false, placeholder: false },
    { nom: 'Antoine', role: 'Cuisine', rolePlaceholder: false, placeholder: false },
  ],
  // Aucun extrait d'avis client vérifiable : la presse et la note Google (agrégée) seulement, jamais d'avis inventé.
  avis: [
    { texte: 'Bistro namurois à la cuisine gourmande, avec des touches raffinées ou voyageuses.', auteur: 'La Libre', source: '« On a testé Partage », 31 mai 2025', date: '2025-05-31', placeholder: false },
    { texte: 'Une cuisine chaleureuse, moins guindée que celle d’Attablez-vous.', auteur: 'La DH', source: 'à l’ouverture, 19 novembre 2024', date: '2024-11-19', placeholder: false },
    { texte: '4,7 sur 5, sur une cinquantaine d’avis Google.', auteur: 'Note Google', source: 'relevée par Rankeat, août 2025', date: '2025-08-01', note: 4.7, placeholder: false },
  ],
  photos: [
    photo('/photos/salle-table-duo.webp', 'Une table pour deux en chêne clair contre un mur crème, chaises en bois blond', 600, 800),
    photo('/photos/salle-suspensions.webp', 'Couloir au papier peint rayé sous des suspensions colorées en dentelle', 600, 800),
    photo('/photos/salle-etagere.webp', 'Niche murale aux étagères en chêne, vaisselle noire et objets de décoration', 600, 800),
    photo('/photos/salle-signe.webp', 'Le grand signe noir du logo en quatre pièces sur un mur de briques peintes', 600, 800),
    photo('/photos/salle-claustra-table.webp', 'Une table dressée derrière un claustra ajouré en bois', 600, 800),
    photo('/photos/table-citronnier.webp', 'Table dressée, verres à vin et serviette roulée devant un citronnier', 600, 800),
    photo('/photos/salle-claustra-logo.webp', 'Claustra en bois, tables en chêne et signe noir du logo au mur', 600, 800),
    photo('/photos/salle-vue-large.webp', 'Vue large de la salle claire, tables en chêne et vitrine sur la rue', 600, 800),
    photo('/photos/chef-charles.webp', 'Charles Jeandrain, lunettes et veste noire, sourit en cuisine', 600, 600),
    photo('/photos/facade-equipe.webp', 'L’équipe de Partage pose devant la façade noire du restaurant', 800, 1067),
    photo('/photos/cuisinier-portrait.webp', 'Un cuisinier de Partage en veste noire, en cuisine', 800, 1199),
    photo('/photos/plat-jambon.webp', 'Assiette de jambon ibérique et gressins, vue de dessus', 800, 1199),
    photo('/photos/service-bouteille.webp', 'Un serveur présente une bouteille en salle, sourire aux lèvres', 800, 534),
    photo('/photos/plat-bol.webp', 'Un cuisinier assaisonne un bol au passe', 800, 1199),
    photo('/photos/plat-tartines.webp', 'Tartines garnies et pousses d’herbes sur une assiette grise', 800, 1199),
    photo('/photos/cuisinier-poele.webp', 'Un cuisinier dresse une poêlée en cuisine', 800, 1199),
    photo('/photos/verres-table.webp', 'Verres à vin et gobelets ambrés sur une table dressée', 800, 1067),
    photo('/photos/plat-citron.webp', 'Un filet de citron pressé sur un bol de fritures', 800, 1199),
    photo('/photos/chef-cuisine.webp', 'Charles Jeandrain en veste blanche dans une cuisine lumineuse', 1200, 800),
  ],
  motsSalle: ['Salle', 'Cuisine', 'Partage'],
  valeurs: ['Plats à partager', 'Produits locaux', 'Cuisine sincère et gourmande', 'Jeunes cuisiniers formés à la maison'],
};

/** Photo par chemin (erreur explicite si le chemin n'existe pas). */
export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}

export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;
export const horaireTexte = (h: Horaire) => (h.creneaux.length ? h.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(', ') : h.note || 'fermé');
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;
export const carteDe = (service: Service) => site.carte.filter((c) => c.service === service || c.service === 'tous');
/** Créneau d'un service pour un jour : 'midi' = ouverture avant 15:00. */
export const creneauService = (h: Horaire, s: Service) => h.creneaux.find((c) => (s === 'midi' ? c.ouverture < '15:00' : c.ouverture >= '15:00')) || null;
/** Libellé statique des services (repli sans JS de la barre d'état). */
export const servicesTexte = () => {
  const midi = site.horaires.filter((h) => creneauService(h, 'midi')).map((h) => h.jour);
  const soir = site.horaires.filter((h) => creneauService(h, 'soir')).map((h) => h.jour);
  const plage = (j: string[]) => (j.length > 2 ? `du ${j[0]} au ${j[j.length - 1]}` : j.join(' et '));
  return `Le soir ${plage(soir)}, le midi ${plage(midi)}`;
};
