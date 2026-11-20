// Tout le contenu du site vit ici. Source : data/restaurants/terrasses-de-crupet/ (donnees.json, dossier.md, photos/index.json).
// Les trous des données réelles sont comblés par des données fictives marquées `placeholder: true`.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean }
export interface Avis { texte: string; auteur: string; source: string; date: string; note?: number; placeholder: boolean }
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
  geo?: { lat: number; lon: number }; // inconnu au dossier : omis
  telephone: string;
  email: { valeur: string; placeholder: boolean };
  reservation: { outil: string; url: string };
  horaires: Horaire[];
  reseaux: Reseau[];
  carte: Categorie[];
  menus: Menu[];
  histoire: string[]; // un paragraphe par entrée
  avis: Avis[];
  photos: Photo[];
  valeurs: string[];
}

const DIMS: Record<string, [number, number]> = {"facade-ete":[798,1200],"facade-drone":[1200,738],"enseigne-entree":[675,1200],"terrasse-tables":[798,1200],"salle-bar-vue":[1200,798],"salle-banquette-miroirs":[752,1200],"salle-banquette-fenetres":[1200,798],"salle-claire-fauteuils":[798,1200],"tables-fauteuils-orange":[1200,800],"bar-carrelage-vert":[675,1200],"salle-miroirs-ronds":[675,1200],"tables-dressees-soir":[675,1200],"plat-tartare":[1200,795],"plat-viande-service":[800,1200],"plateau-fondue":[1200,800],"fondue-table":[675,1200],"cocktails-shaker":[675,1200],"cocktail-orange":[1200,800],"burger":[699,1243],"chalet-hiver-table":[800,1200],"service-vin-table":[675,1200],"carte-menu-table":[800,1200]};
const photo = (nom: string, alt: string): Photo => ({ src: `/photos/${nom}.webp`, alt, largeur: DIMS[nom][0], hauteur: DIMS[nom][1], placeholder: false });

const midiSoir: Creneau[] = [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '18:00', fermeture: '22:00' }];

export const site: Restaurant = {
  slug: 'terrasses-de-crupet',
  nom: 'Les Terrasses de Crupet',
  baseline: 'Un moment hors du temps au cœur du village.',
  description: 'Les Terrasses de Crupet, brasserie conviviale et familiale au cœur du village de Crupet (Assesse) : carte de brasserie, fondues, cocktails, terrasse et chalet d’hiver.',
  url: 'https://www.lesterrassesdecrupet.be',
  typeCuisine: 'Brasserie familiale, cuisine de terroir',
  adresse: { rue: 'Rue Basse', numero: '13', cp: '5330', commune: 'Crupet (Assesse)', pays: 'BE' },
  telephone: '+32 83 655 111',
  email: { valeur: 'resto@lesterrassesdecrupet.be', placeholder: false },
  reservation: { outil: 'Zenchef', url: 'https://bookings.zenchef.com/results?rid=367820' },
  horaires: (['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] as Jour[]).map((jour) => ({ jour, creneaux: midiSoir })),
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61559320650854' },
    { nom: 'Instagram', url: 'https://www.instagram.com/lesterrassesdecrupet/' },
  ],
  carte: [
    {
      "categorie": "À partager",
      "plats": [
        {
          "nom": "Rillettes de truite fumée",
          "description": "",
          "prix": "15 €",
          "placeholder": false
        },
        {
          "nom": "Petits gris de Warnant au beurre et à l'ail",
          "description": "",
          "prix": "17 €",
          "placeholder": false
        },
        {
          "nom": "Os à moelle et tartare de bœuf",
          "description": "",
          "prix": "15 €",
          "placeholder": false
        },
        {
          "nom": "Camembert au four",
          "description": "miel et thym, avec ses mouillettes",
          "prix": "17 €",
          "placeholder": false
        },
        {
          "nom": "La planche des gourmands",
          "description": "cro-truffe, fondus d'abbaye, pâté en croûte, nuggets de chou-fleur",
          "prix": "24 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Entrées",
      "plats": [
        {
          "nom": "Fondus au fromage d'abbaye (2 pièces)",
          "description": "",
          "prix": "15 €",
          "placeholder": false
        },
        {
          "nom": "Foie gras poêlé",
          "description": "gel de figue, champignons",
          "prix": "19 €",
          "placeholder": false
        },
        {
          "nom": "Scampis à la diable (6 pièces)",
          "description": "",
          "prix": "18 €",
          "placeholder": false
        },
        {
          "nom": "Saumon gravlax",
          "description": "aneth et coulis de petits pois",
          "prix": "17 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Plats",
      "plats": [
        {
          "nom": "Carbonnade à la bière",
          "description": "et ses croquettes de pomme de terre",
          "prix": "24 €",
          "placeholder": false
        },
        {
          "nom": "Boulettes de saison et frites fraîches",
          "description": "demander aux serveurs ce que le chef mijote",
          "prix": "22 €",
          "placeholder": false
        },
        {
          "nom": "Poule au riz, le vol-au-vent de Mamy et frites fraîches",
          "description": "",
          "prix": "24 €",
          "placeholder": false
        },
        {
          "nom": "Crupétois",
          "description": "burger de poulet croustillant, croquette de fromage",
          "prix": "28 €",
          "placeholder": false
        },
        {
          "nom": "Truite façon meunière",
          "description": "",
          "prix": "29 €",
          "placeholder": false
        },
        {
          "nom": "Pavé de bœuf flambé ou classique",
          "description": "sauces au choix : champignons, roquefort, béarnaise",
          "prix": "29 €",
          "placeholder": false
        },
        {
          "nom": "Steak de chou-fleur",
          "description": "purée de pommes de terre, haricots et sauce Noilly Prat",
          "prix": "24 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Enfants",
      "plats": [
        {
          "nom": "Burger de bœuf, ketchup, frites",
          "description": "",
          "prix": "16 €",
          "placeholder": false
        },
        {
          "nom": "Filet de poulet rôti, compote maison et frites",
          "description": "",
          "prix": "14 €",
          "placeholder": false
        },
        {
          "nom": "Coquillettes jambon-fromage",
          "description": "",
          "prix": "12 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Desserts",
      "plats": [
        {
          "nom": "Le traditionnel moelleux au chocolat",
          "description": "",
          "prix": "12 €",
          "placeholder": false
        },
        {
          "nom": "La dame blanche maison",
          "description": "",
          "prix": "10 €",
          "placeholder": false
        },
        {
          "nom": "La crème brûlée",
          "description": "",
          "prix": "12 €",
          "placeholder": false
        },
        {
          "nom": "Le café gourmand",
          "description": "+4 € pour un Irish gourmand",
          "prix": "14 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Cocktails",
      "plats": [
        {
          "nom": "Maison",
          "description": "",
          "prix": "12 €",
          "placeholder": false
        },
        {
          "nom": "Moscow Mule",
          "description": "",
          "prix": "12 €",
          "placeholder": false
        },
        {
          "nom": "Mojito",
          "description": "",
          "prix": "12 €",
          "placeholder": false
        },
        {
          "nom": "Saint-Germain Spritz",
          "description": "",
          "prix": "12 €",
          "placeholder": false
        },
        {
          "nom": "Aperol Spritz",
          "description": "",
          "prix": "10 €",
          "placeholder": false
        },
        {
          "nom": "Campari Spritz",
          "description": "",
          "prix": "10 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Bières",
      "plats": [
        {
          "nom": "Cristal 25 cl (fût)",
          "description": "",
          "prix": "3,20 €",
          "placeholder": false
        },
        {
          "nom": "Blanche de Namur 25 cl",
          "description": "",
          "prix": "3,20 €",
          "placeholder": false
        },
        {
          "nom": "Duvel 33 cl",
          "description": "",
          "prix": "5,50 €",
          "placeholder": false
        },
        {
          "nom": "Orval 33 cl",
          "description": "",
          "prix": "6,50 €",
          "placeholder": false
        },
        {
          "nom": "Chimay bleue 33 cl",
          "description": "",
          "prix": "5,60 €",
          "placeholder": false
        },
        {
          "nom": "Triple Westmalle 33 cl",
          "description": "",
          "prix": "5,80 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Vins (sélection)",
      "plats": [
        {
          "nom": "Vins maison Rouquet's (Languedoc), verre",
          "description": "chardonnay, cinsault rosé, merlot",
          "prix": "6 €",
          "placeholder": false
        },
        {
          "nom": "Champagne Michel Rocourt blanc de blancs brut, verre",
          "description": "",
          "prix": "12 €",
          "placeholder": false
        },
        {
          "nom": "Sancerre « Terre de Maimbray », bouteille",
          "description": "Domaine P. & N. Reverdy",
          "prix": "56 €",
          "placeholder": false
        },
        {
          "nom": "Corbières « Alice 1820 », bouteille",
          "description": "Artisans Partisans, bio",
          "prix": "32 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Boissons chaudes",
      "plats": [
        {
          "nom": "Espresso (cafés Delahaut)",
          "description": "",
          "prix": "3,50 €",
          "placeholder": false
        },
        {
          "nom": "Cappuccino italien",
          "description": "",
          "prix": "4,50 €",
          "placeholder": false
        },
        {
          "nom": "Irish coffee",
          "description": "",
          "prix": "10 €",
          "placeholder": false
        },
        {
          "nom": "Thé / tisane (Delahaut)",
          "description": "",
          "prix": "4 €",
          "placeholder": false
        }
      ]
    }
  ],
  menus: [
    {
      "nom": "Menu de fêtes à emporter, deux services",
      "prix": "37 € (plat-dessert) ou 44 € (entrée-plat)",
      "description": "Retrait au restaurant le 24 ou le 31 décembre, 10h-15h ; commande avant le 20 (24/12) ou le 27 décembre (31/12)",
      "placeholder": false
    },
    {
      "nom": "Menu de fêtes à emporter, trois services",
      "prix": "53 € (entrée-plat-dessert) ou 59 € (deux entrées-plat)",
      "description": "Ravioles de homard, foie gras au torchon, pavé de saumon laqué, biche rôtie, entremets façon Forêt-Noire (choix à chaque service)",
      "placeholder": false
    },
    {
      "nom": "Menu de fêtes à emporter, quatre services",
      "prix": "69 €",
      "description": "Deux entrées - plat - dessert ; zakouskis en supplément (3 pièces, 10 €)",
      "placeholder": false
    }
  ],
  histoire: [
    'Les Terrasses de Crupet est une brasserie au cœur du village de Crupet, dans la commune d’Assesse. Un lieu où il fera bon se restaurer en famille ou entre amis.',
    'La salle aux miroirs ronds, le bar carrelé de vert, la terrasse en été et le chalet d’hiver : on peut réserver dans le restaurant ou dans le chalet.',
    'La carte fait la part belle aux plats de brasserie : carbonnade à la bière et ses croquettes, vol-au-vent de Mamy et frites fraîches, os à moelle et tartare de bœuf, fondus au fromage d’abbaye. Les enfants ont leur carte.',
    'Une carte des vins étoffée, des cocktails, et des cafés et thés signés Delahaut.',
  ],
  avis: [],
  photos: [
    photo('facade-ete', 'Façade en pierre du restaurant en été, enseigne à médaillon et terrasse couverte sur le côté'),
    photo('facade-drone', 'Vue aérienne du restaurant dans le village, au bord de la route'),
    photo('enseigne-entree', 'Entrée du restaurant : porte en bois et enseigne lumineuse « Les Terrasses de Crupet »'),
    photo('terrasse-tables', 'Longues tables en bois dressées sous la toile de la terrasse'),
    photo('salle-bar-vue', 'La salle vue depuis le bar : mur vert, claustras en bois, tables dressées'),
    photo('salle-banquette-miroirs', 'Banquette verte, miroirs ronds et fauteuils orange devant des tables en bois'),
    photo('salle-banquette-fenetres', 'Banquette le long des fenêtres, tables dressées et fauteuils orange'),
    photo('salle-claire-fauteuils', 'Salle claire aux fauteuils orange, grande fenêtre et mur de briques'),
    photo('tables-fauteuils-orange', 'Tables dressées avec verres à pied et fauteuils orange'),
    photo('bar-carrelage-vert', 'Le bar habillé de carrelage hexagonal vert, verres suspendus au-dessus'),
    photo('salle-miroirs-ronds', 'Salle du restaurant : miroirs ronds rétroéclairés, banquette verte, fauteuils cuivrés'),
    photo('tables-dressees-soir', 'Tables dressées le soir, bougies noires et lumières chaudes contre un mur en pierre'),
    photo('plat-tartare', 'Tartare de bœuf et roquette sur une assiette bleue'),
    photo('plat-viande-service', 'Une assiette de viande et pommes de terre posée sur la table, verres à pied autour'),
    photo('plateau-fondue', 'Caquelon de fondue rouge, planche de charcuteries, frites et salade sur la table'),
    photo('fondue-table', 'Une personne pique un morceau de viande dans un caquelon de fondue'),
    photo('cocktails-shaker', 'Trois grands verres glacés au bar, un shaker versé au-dessus'),
    photo('cocktail-orange', 'Cocktail orange à la menthe, paille noire, sur une table dressée'),
    photo('burger', 'Burger de bœuf au fromage sur une assiette bleue'),
    photo('chalet-hiver-table', 'Une table dans le chalet d’hiver, boiseries claires et rideau rouge'),
    photo('service-vin-table', 'Du vin rouge versé dans un verre à table, frites et plat au premier plan'),
    photo('carte-menu-table', 'La carte noire du restaurant posée sur une table en bois'),
  ],
  valeurs: ['Convivialité', 'Service attentionné', 'Produits de qualité', 'Fromagerie La Petite Ferme et cafés Delahaut'],
};

/** Photo par chemin (erreur explicite si le chemin n'existe pas : un gabarit ne doit pas pointer dans le vide). */
export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}

/** Adresse sur une ligne. */
export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;

/** Lien d'itinéraire : par adresse (coordonnées GPS inconnues). */
export const itineraire = (r: Restaurant = site) => `https://www.openstreetmap.org/search?query=${encodeURIComponent(`${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} Crupet`)}`;

/** Horaires lisibles : '12:00 à 14:00, 18:00 à 22:00' ou la note. */
export const horaireTexte = (h: Horaire) =>
  h.creneaux.length ? h.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(', ') : h.note || 'fermé';

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;

// ---------------------------------------------------------------------------------------------
// Contenu propre au gabarit « Guinguette ». Tout ce qui n'est pas prouvé par dossier.md porte un
// drapeau `placeholder: true` et une marque visible là où il s'affiche.
// ---------------------------------------------------------------------------------------------

export type ObjetId = 'frites' | 'fourchette' | 'verre' | 'parasol' | 'bouteille' | 'citron';
export interface Objet { id: ObjetId; label: string; x: number; y: number; r: number; taille: number; mobile: boolean; mx?: number }
export interface Tirage { src: string; alt: string; x: number; y: number; r: number; legende: string; placeholder: boolean }
export interface AvisExemple { texte: string; note: number; r: number; placeholder: true }
export interface Picto { categorie: string; picto: ObjetId }

const tirage = (nom: string, x: number, y: number, r: number, legende: string): Tirage => {
  const p = photoDe(`/photos/${nom}.webp`);
  return { src: p.src, alt: p.alt, x, y, r, legende, placeholder: false };
};

export const guinguette = {
  heroTitre: ['Un moment', 'hors du temps'],
  slogan: { texte: 'au cœur du village de Crupet', placeholder: false },
  objets: [
    { id: 'parasol', label: 'Parasol dessiné au trait', x: 6, y: 10, r: -12, taille: 150, mobile: true, mx: 4 },
    { id: 'verre', label: 'Verre à pied dessiné au trait', x: 84, y: 8, r: 10, taille: 110, mobile: false },
    { id: 'frites', label: 'Cornet de frites dessiné au trait', x: 10, y: 66, r: 8, taille: 130, mobile: true, mx: 40 },
    { id: 'fourchette', label: 'Fourchette dessinée au trait', x: 22, y: 78, r: -40, taille: 120, mobile: false },
    { id: 'bouteille', label: 'Bouteille dessinée au trait', x: 80, y: 60, r: 14, taille: 140, mobile: true, mx: 74 },
    { id: 'citron', label: 'Citron coupé dessiné au trait', x: 72, y: 82, r: -6, taille: 90, mobile: false },
  ] as Objet[],
  /** La table : 12 tirages à cadre blanc, légendes d'après le sujet de la photo. */
  tirages: [
    tirage('service-vin-table', 2, 2, -7, 'Le vin, à table'),
    tirage('terrasse-tables', 21, 4, 5, 'La terrasse'),
    tirage('plat-tartare', 41, 2, -3, 'Le tartare'),
    tirage('cocktails-shaker', 61, 4, 8, 'Au bar'),
    tirage('cocktail-orange', 80, 2, -5, 'Un cocktail'),
    tirage('plateau-fondue', 3, 69, 6, 'La fondue'),
    tirage('salle-miroirs-ronds', 21, 71, -9, 'La salle'),
    tirage('burger', 41, 69, 4, 'Le burger'),
    tirage('chalet-hiver-table', 60, 71, -6, 'Le chalet d’hiver'),
    tirage('plat-viande-service', 79, 69, 7, 'Le plat arrive'),
    tirage('bar-carrelage-vert', 1, 36, 3, 'Le bar'),
    tirage('tables-dressees-soir', 84, 36, -4, 'Le soir'),
  ] as Tirage[],
  pictos: [
    { categorie: 'À partager', picto: 'frites' },
    { categorie: 'Entrées', picto: 'citron' },
    { categorie: 'Plats', picto: 'fourchette' },
    { categorie: 'Enfants', picto: 'frites' },
    { categorie: 'Desserts', picto: 'parasol' },
    { categorie: 'Cocktails', picto: 'verre' },
    { categorie: 'Bières', picto: 'bouteille' },
    { categorie: 'Vins', picto: 'bouteille' },
    { categorie: 'Boissons chaudes', picto: 'citron' },
  ] as Picto[],
  /** Catégories montrées sur l'accueil (la carte complète est sur /carte/). */
  accueilCategories: ['À partager', 'Entrées', 'Plats', 'Enfants', 'Desserts', 'Cocktails'],
  /** Aucun avis réel au dossier : quatre cartes d'exemple, étiquetées « Exemple d'avis » à l'écran. */
  avisExemples: [
    { texte: 'On a attrapé la dernière table du vendredi midi. Les enfants ont fini les frites des parents.', note: 5, r: -4, placeholder: true },
    { texte: 'Une carbonnade comme à la maison, et une salle où l’on se sent bien tout de suite.', note: 5, r: 3, placeholder: true },
    { texte: 'On a choisi le chalet pour la fondue. Service souriant, on reviendra l’hiver prochain.', note: 5, r: -2, placeholder: true },
    { texte: 'Simple, généreux, chaleureux. Le genre d’adresse qu’on garde pour soi puis qu’on donne quand même.', note: 5, r: 5, placeholder: true },
  ] as AvisExemple[],
  /** Terrasse et chalet : faits du dossier ; places, saison et jours inconnus (non affichés). */
  terrasse: { connue: true, placeholder: false },
  chalet: 'On peut réserver dans le restaurant ou dans le chalet d’hiver.',
  /** Menus de fêtes à emporter : retrait les 24 et 31 décembre (dossier, menu-emporter.pdf). */
  emporter: { retrait: 'Retrait au restaurant les 24 et 31 décembre', zakouskis: 'Zakouskis en supplément : 3 pièces, 10 €' },
  manifeste: {
    titre: ['En famille,', 'entre amis'],
    motItalique: 'amis',
    texte: 'Une brasserie au cœur du village de Crupet. Un lieu où il fera bon se restaurer en famille ou entre amis.',
  },
  finale: 'À table !',
};

/** Vrai si l'heure donnée (HH:MM) est dans un créneau. */
export const estOuvert = (h: Horaire, hhmm: string) => h.creneaux.some((c) => c.ouverture <= hhmm && hhmm < c.fermeture);
