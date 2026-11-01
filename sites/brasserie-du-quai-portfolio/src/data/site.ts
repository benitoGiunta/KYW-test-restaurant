// Tout le contenu du site vit ici. Source : data/restaurants/<slug>/donnees.json et photos/index.json.
// Les trous des données réelles sont comblés par des données fictives marquées `placeholder: true` :
// un gabarit les affiche, la revue les signale, le client les remplace.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string; aConfirmer?: boolean } // creneaux vide = fermé ; aConfirmer : jour d'ouverture non prouvé par le dossier
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean } // prix déjà formaté ('20 €', 'prix du jour')
export interface Categorie { categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean }
export interface Membre { nom: string; role: string; photo?: string; placeholder: boolean }
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
}

const photo = (src: string, alt: string, largeur: number, hauteur: number): Photo => ({ src, alt, largeur, hauteur, placeholder: false });

/** Horaires de la saison en cours (novembre à avril, page Réservation du site). De mai à octobre, le soir va jusqu'à 22:00.
 *  Les jours de fermeture ne sont pas publiés : jeudi à lundi sont les jours du banc d'écailler (site) ; mardi, mercredi
 *  et dimanche portent `aConfirmer` et s'affichent « à confirmer » (le dimanche « toute la journée » de Gault&Millau n'est pas repris). */
const saison: Creneau[] = [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '21:30' }];

export const site: Restaurant = {
  slug: 'brasserie-du-quai',
  nom: 'La Brasserie du Quai',
  baseline: 'Une expérience au fil de l’eau.',
  description:
    'La Brasserie du Quai à Namur : brasserie de produits frais et banc d’écailler du jeudi au lundi, au pied du pont du Luxembourg, terrasse chauffée sur la Meuse.',
  url: 'https://www.brasserieduquai.be',
  typeCuisine: 'Brasserie, fruits de mer, banc d’écailler',
  adresse: { rue: 'Rue du Quai', numero: '9', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.4656346, lon: 4.8794989 },
  telephone: '+32 81 65 70 03',
  email: { valeur: 'info@brasserieduquai.be', placeholder: false },
  reservation: { outil: 'la page Réservation de la maison', url: 'https://www.brasserieduquai.be/reservation/' },
  horaires: [
    { jour: 'lundi', creneaux: saison },
    { jour: 'mardi', creneaux: saison, aConfirmer: true },
    { jour: 'mercredi', creneaux: saison, aConfirmer: true },
    { jour: 'jeudi', creneaux: saison },
    { jour: 'vendredi', creneaux: saison },
    { jour: 'samedi', creneaux: saison },
    { jour: 'dimanche', creneaux: saison, aConfirmer: true },
  ],
  reseaux: [
    { nom: 'Instagram', url: 'https://www.instagram.com/brasserieduquai/' },
    { nom: 'Facebook', url: 'https://www.facebook.com/brasserieduquai/' },
  ],
  carte: [
  {
    "categorie": "Les entrées",
    "plats": [
      {
        "nom": "Tartare de saumon, crème au raifort et caviar de hareng",
        "description": "",
        "prix": "20 €",
        "placeholder": false
      },
      {
        "nom": "Carpaccio de contrefilet Wagyu, sel de Guérande fumé",
        "description": "",
        "prix": "22 €",
        "placeholder": false
      },
      {
        "nom": "Tomate aux crevettes grises « épluchées main » (1 pièce)",
        "description": "",
        "prix": "prix du jour",
        "placeholder": false
      },
      {
        "nom": "Notre assiette de saumon norvégien « Maison Dawagne »",
        "description": "",
        "prix": "24 €",
        "placeholder": false
      },
      {
        "nom": "Croquettes de crevettes grises « maison »",
        "description": "1 pièce 11,00 € · 2 pièces 22,00 €",
        "prix": "11 / 22 €",
        "placeholder": false
      },
      {
        "nom": "Fondus au parmesan « maison »",
        "description": "1 pièce 9,00 € · 2 pièces 18,00 €",
        "prix": "9 / 18 €",
        "placeholder": false
      },
      {
        "nom": "Mix croquettes au parmesan et crevettes grises",
        "description": "",
        "prix": "20 €",
        "placeholder": false
      },
      {
        "nom": "Bisque de homard en cappuccino aux arômes de café torréfié",
        "description": "",
        "prix": "19 €",
        "placeholder": false
      },
      {
        "nom": "Petits gris de Warnant, champignons d’ici et d’ailleurs, écume à la houppe",
        "description": "",
        "prix": "24 €",
        "placeholder": false
      }
    ]
  },
  {
    "categorie": "Les plats : poissons",
    "plats": [
      {
        "nom": "Tomates aux crevettes grises épluchées main, pommes frites (2 pièces)",
        "description": "",
        "prix": "prix du jour",
        "placeholder": false
      },
      {
        "nom": "Salade de crevettes grises, frites (2 pièces)",
        "description": "",
        "prix": "prix du jour",
        "placeholder": false
      },
      {
        "nom": "Notre belle sole « meunière »",
        "description": "purée de pommes de terre",
        "prix": "prix du jour",
        "placeholder": false
      },
      {
        "nom": "Dos de saumon snacké et crevettes royales",
        "description": "nage de curry thaï et yuzu",
        "prix": "30 €",
        "placeholder": false
      },
      {
        "nom": "Fish & chips de cabillaud",
        "description": "salade composée, sauce tartare, frites",
        "prix": "28 €",
        "placeholder": false
      },
      {
        "nom": "Cœur de cabillaud vapeur",
        "description": "lit de poireaux, sauce mousseline, purée de pomme de terre",
        "prix": "34 €",
        "placeholder": false
      }
    ]
  },
  {
    "categorie": "Les plats : viandes",
    "plats": [
      {
        "nom": "Américain préparé haché minute",
        "description": "salade composée, frites",
        "prix": "26 €",
        "placeholder": false
      },
      {
        "nom": "Tartare de bœuf haché minute préparé par vos soins",
        "description": "salade composée, frites",
        "prix": "26 €",
        "placeholder": false
      },
      {
        "nom": "Pavé de bœuf grillé",
        "description": "salade composée, frites, sauce au choix",
        "prix": "32 €",
        "placeholder": false
      },
      {
        "nom": "Contrefilet « Holstein »",
        "description": "salade composée, frites, sauce au choix",
        "prix": "39 €",
        "placeholder": false
      },
      {
        "nom": "Notre vol-au-vent revisité",
        "description": "croustade au beurre, frites",
        "prix": "28 €",
        "placeholder": false
      },
      {
        "nom": "Notre vol-au-vent « Royal » (truffe et ris de veau)",
        "description": "croustade au beurre, frites",
        "prix": "34 €",
        "placeholder": false
      },
      {
        "nom": "Rognons de veau à la dijonnaise",
        "description": "pommes de terre rissolées",
        "prix": "27 €",
        "placeholder": false
      },
      {
        "nom": "Ris de veau braisé",
        "description": "champignons des bois et crème de morilles, croquettes de pommes de terre",
        "prix": "42 €",
        "placeholder": false
      }
    ]
  },
  {
    "categorie": "Pâtes fraîches",
    "plats": [
      {
        "nom": "Tortellini à la ricotta et truffe",
        "description": "crème de champignons truffés",
        "prix": "25 €",
        "placeholder": false
      }
    ]
  },
  {
    "categorie": "Accompagnements et sauces",
    "plats": [
      {
        "nom": "Beurre maître d’hôtel",
        "description": "",
        "prix": "3 €",
        "placeholder": false
      },
      {
        "nom": "Nos sauces (poivre vert crème, archiduc, dijonnaise, béarnaise ou choron)",
        "description": "",
        "prix": "4,50 €",
        "placeholder": false
      },
      {
        "nom": "Supplément mayonnaise maison",
        "description": "",
        "prix": "2 €",
        "placeholder": false
      },
      {
        "nom": "Salade laitue, salade tomates ou salade mixte",
        "description": "",
        "prix": "7 €",
        "placeholder": false
      },
      {
        "nom": "Supplément frites, purée ou croquettes",
        "description": "",
        "prix": "3,50 €",
        "placeholder": false
      },
      {
        "nom": "Bouquetière de légumes",
        "description": "",
        "prix": "10 €",
        "placeholder": false
      }
    ]
  },
  {
    "categorie": "Pour les enfants",
    "plats": [
      {
        "nom": "Mini steak grillé",
        "description": "frites ou purée",
        "prix": "14 €",
        "placeholder": false
      },
      {
        "nom": "Mini américain préparé",
        "description": "frites ou purée",
        "prix": "14 €",
        "placeholder": false
      },
      {
        "nom": "Fish & chips de cabillaud",
        "description": "frites ou purée",
        "prix": "14 €",
        "placeholder": false
      }
    ]
  },
  {
    "categorie": "Desserts",
    "plats": [
      {
        "nom": "Dame blanche",
        "description": "",
        "prix": null,
        "placeholder": true
      },
      {
        "nom": "Crème brûlée à la vanille",
        "description": "",
        "prix": null,
        "placeholder": true
      },
      {
        "nom": "Café gourmand",
        "description": "",
        "prix": null,
        "placeholder": true
      }
    ]
  },
  {
    "categorie": "Banc d’écailler : huîtres",
    "plats": [
      {
        "nom": "Les Normandes n°4",
        "description": "6 pièces 15,00 € · 12 pièces 30,00 €",
        "prix": "15 / 30 €",
        "placeholder": false
      },
      {
        "nom": "Les Fines de Claire n°3",
        "description": "6 pièces 19,20 € · 12 pièces 38,40 €",
        "prix": "19,20 / 38,40 €",
        "placeholder": false
      },
      {
        "nom": "Les Gillardeaux n°4",
        "description": "6 pièces 27,60 € · 12 pièces 55,20 €",
        "prix": "27,60 / 55,20 €",
        "placeholder": false
      }
    ]
  },
  {
    "categorie": "Banc d’écailler : produits de la mer",
    "plats": [
      {
        "nom": "La langoustine",
        "description": "",
        "prix": "prix du jour",
        "placeholder": false
      },
      {
        "nom": "Le demi-homard en belle vue",
        "description": "",
        "prix": "prix du jour",
        "placeholder": false
      },
      {
        "nom": "Le tourteau en belle vue",
        "description": "",
        "prix": "prix du jour",
        "placeholder": false
      },
      {
        "nom": "Le bol de bulots",
        "description": "",
        "prix": "13 €",
        "placeholder": false
      },
      {
        "nom": "Le bol de bigorneaux jumbo",
        "description": "",
        "prix": "14 €",
        "placeholder": false
      },
      {
        "nom": "Le bol de crevettes grises de la mer du Nord à éplucher",
        "description": "",
        "prix": "16 €",
        "placeholder": false
      },
      {
        "nom": "Les crevettes « Bouquet Royal » (la pièce)",
        "description": "",
        "prix": "3,50 €",
        "placeholder": false
      }
    ]
  },
  {
    "categorie": "Banc d’écailler : plateaux",
    "plats": [
      {
        "nom": "L’assiette de l’écailler (1 pers.)",
        "description": "3 Fines de Claire, 3 Normandes, 3 Gillardeaux, 3 Plates (en saison) ou découverte du moment",
        "prix": "45 €",
        "placeholder": false
      },
      {
        "nom": "L’assiette du Quai (1 pers.)",
        "description": "4 Fines de Claire, 3 Normandes, 3 crevettes Bouquet Royal, bulots, bigorneaux",
        "prix": "45 €",
        "placeholder": false
      },
      {
        "nom": "Le Trésor du Quai (1 pers.)",
        "description": "4 Fines de Claire, 4 Normandes, 1/2 homard, 2 langoustines, 4 Bouquet Royal, bulots, bigorneaux, crevettes grises non épluchées",
        "prix": "88 €",
        "placeholder": false
      },
      {
        "nom": "Le Spécial Crustacés (2 pers.)",
        "description": "2 x 1/2 homard, 4 langoustines, 1 tourteau, 6 Bouquet Royal, crevettes grises non épluchées",
        "prix": "145 €",
        "placeholder": false
      },
      {
        "nom": "Le Plateau du Quai (2 pers.)",
        "description": "8 Normandes, 4 Fines de Claire, 2 x 1/2 homard, 4 langoustines, 6 Bouquet Royal, bulots, bigorneaux, crevettes grises non épluchées",
        "prix": "165 €",
        "placeholder": false
      },
      {
        "nom": "Le Royal du Quai (2 pers.)",
        "description": "8 Normandes, 12 Fines de Claire, 1 tourteau, 2 x 1/2 homard, 4 langoustines, 4 Bouquet Royal, bulots, bigorneaux, crevettes grises non épluchées",
        "prix": "195 €",
        "placeholder": false
      }
    ]
  }
],
  menus: [],
  histoire: [
    'C’est au pied du pont du Luxembourg, sur les berges de la Meuse, que s’est posée la Brasserie du Quai.',
    'De grandes baies vitrées offrent une vue imprenable sur la Meuse. La grande terrasse au bord de l’eau est chauffée et à l’abri du vent : elle permet de profiter de l’endroit jusque tard dans la saison.',
    'Une cuisine de brasserie authentique et variée, travaillée avec des produits frais. Chaque semaine, une sélection de suggestions de saison complète la carte ; les croquettes de crevettes grises et les fondus au parmesan sont faits maison, et les frites sont cuites à la graisse de bœuf.',
    'Depuis juillet 2026, Martin et Rémy mènent la cuisine, après le départ à la retraite du chef de longue date. Pierre-Alexandre et son équipe vous accueillent en salle.',
  ],
  equipe: [
    { nom: 'Martin et Rémy', role: 'En cuisine depuis juillet 2026', photo: '/photos/equipe-cuisine-martin-remy.webp', placeholder: false },
    { nom: 'Le banc d’écailler', role: 'Ouvert du jeudi au lundi inclus', photo: '/photos/chef-ecailler.webp', placeholder: false },
    { nom: 'Pierre-Alexandre et son équipe', role: 'La maison et la salle', placeholder: false },
  ],
  avis: [
    { texte: 'Une spécialité d’écailler délicieuse, une vraie brasserie et un service attentionné.', auteur: 'Client', source: 'Tripadvisor, avis résumé', date: '', placeholder: false },
    { texte: 'Un plateau de fruits de mer très frais et savoureux.', auteur: 'Client', source: 'Tripadvisor, avis résumé', date: '', placeholder: false },
    { texte: 'Une terrasse très calme, avec vue sur la Meuse.', auteur: 'Client', source: 'Tripadvisor, avis résumé', date: '', placeholder: false },
  ],
  photos: [
    photo('/photos/terrasse-meuse.webp', 'La terrasse sous les parasols verts, tables en bois face à la Meuse et à la rive de Jambes', 1500, 1001),
    photo('/photos/terrasse-meuse-portrait.webp', 'Tables de la terrasse alignées le long du garde-corps, la Meuse en contrebas', 1001, 1500),
    photo('/photos/terrasse-couverte.webp', 'La terrasse couverte et chauffée, des clients attablés le long des baies', 720, 1122),
    photo('/photos/salle-baies-vitrees.webp', 'La salle et ses baies vitrées ouvertes sur la terrasse et la Meuse', 1500, 1001),
    photo('/photos/salle-banquette.webp', 'Banquette en cuir fauve et tables en bois dressées, appliques dorées', 1500, 1001),
    photo('/photos/salle-cuisine-ouverte.webp', 'La salle vue vers la cuisine ouverte, chaises en cuir et étagères noires', 1500, 1001),
    photo('/photos/salle-panorama.webp', 'La salle en panorama, banquette courbe et bar au fond', 1500, 833),
    photo('/photos/salle-banquette-longue.webp', 'Longue banquette jaune moutarde le long des tables dressées', 720, 706),
    photo('/photos/bar.webp', 'Le comptoir en bois clair et les étagères bleu nuit du bar', 1500, 903),
    photo('/photos/bar-bouteilles.webp', 'Étagères de bouteilles et de verres derrière le bar', 1500, 1001),
    photo('/photos/cave-a-vins.webp', 'Casiers de la cave à vins en bois clair, bouteilles couchées', 1001, 1500),
    photo('/photos/table-dressee.webp', 'Table dressée, verres à vin et serviettes blanches, la cave au fond', 1001, 1500),
    photo('/photos/deco-hibou.webp', 'Un hibou blanc aux yeux lumineux dans une niche noire', 1166, 1500),
    photo('/photos/deco-machine-a-ecrire.webp', 'Une machine à écrire posée dans une niche au-dessus d’une rangée de verres', 1004, 1500),
    photo('/photos/facade-meuse.webp', 'La façade vitrée de la brasserie sur les berges de la Meuse, au crépuscule', 1800, 1125),
    photo('/photos/huitres.webp', 'Six huîtres ouvertes sur glace pilée et un demi-citron, vues du dessus', 720, 720),
    photo('/photos/plat-tartare-saumon.webp', 'Le tartare de saumon dressé à table, finition au siphon', 720, 752),
    photo('/photos/plat-viande.webp', 'Assiette de viande, croquettes de pommes de terre et choux de Bruxelles', 870, 740),
    photo('/photos/plat-boeuf.webp', 'Pièce de bœuf tranchée, garniture et sauce, sur une table en bois', 640, 1138),
    photo('/photos/plat-volaille-croquettes.webp', 'Volaille, croquettes et légumes glacés sur assiette blanche', 640, 853),
    photo('/photos/ceviche.webp', 'Entrée de poisson cru en dés sur une huile verte, assiette creuse', 640, 853),
    photo('/photos/service-sole.webp', 'Une sole meunière servie avec salade, citron et beurre', 721, 740),
    photo('/photos/chef-ecailler.webp', 'Un cuisinier ouvre des coquillages au poste de l’écailler', 640, 1138),
    photo('/photos/equipe-cuisine-martin-remy.webp', 'Martin et Rémy, en veste noire, accoudés au passe de la cuisine', 640, 853),
  ],
  valeurs: ['Produits frais et du marché', 'Fait maison : croquettes, fondus, mayonnaise', 'Allergènes : notre personnel est à votre disposition'],
};

/** Notes publiques relevées par la recherche (Rankeat 07/2026, Tripadvisor, Resto.be). */
export const notes = [
  { source: 'Google', note: '4,3 / 5', nombre: '1 832 avis' },
  { source: 'Resto.be', note: '9,3 / 10', nombre: '2 752 avis' },
  { source: 'Tripadvisor', note: '3,9 / 5', nombre: '370 avis' },
];

/** Presse vérifiée (la note Gault&Millau n'est pas confirmée : non affichée). */
export const presse = { media: 'Guide MICHELIN', titre: 'Sélection Belgique 2026', url: 'https://guide.michelin.com/en/namur/namur/restaurant/brasserie-du-quai' };

/** Saisons d'ouverture (site, page Réservation). */
export const saisons = [
  { nom: 'De novembre à avril', texte: '12:00 à 14:30, 18:00 à 21:30' },
  { nom: 'De mai à octobre', texte: '12:00 à 14:30, 18:00 à 22:00' },
];

export const bonCadeau = { url: 'https://www.brasserieduquai.be/cheque-cadeau/' };


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
  (h.creneaux.length ? h.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(', ') : h.note || 'fermé') + (h.aConfirmer ? ' (jour à confirmer)' : '');

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;

/* ───────── Données propres au gabarit « Marée » (chaque donnée non prouvée par le dossier porte son drapeau) ───────── */

export interface Arrivage { nom: string; detail: string; prix: string; placeholder: boolean }
export interface PointPlan { numero: number; nom: string; detail: string; x: number; y: number; placeholder: boolean }
export interface Regle { texte: string; placeholder: boolean }
export interface Service { jour: Jour; debut: string; fin: string; nom: 'midi' | 'soir'; aConfirmer: boolean }

/** Trois univers sous le nom : tous réels (site actuel). */
export const univers = [
  { mot: 'terrasse sur la Meuse', placeholder: false },
  { mot: 'banc d’écailler', placeholder: false },
  { mot: 'brasserie', placeholder: false },
];

/** Le banc d'écailler : catégories réelles de la carte (pages /la-carte/ et /lecailler/ du site). */
export const ecailler = site.carte.filter((c) => c.categorie.startsWith('Banc d’écailler'));
export const carteSalle = site.carte.filter((c) => !c.categorie.startsWith('Banc d’écailler'));

/** Les huîtres, en liste « arrivages » (réelles, prix de la carte). */
export const arrivages: Arrivage[] = (ecailler[0]?.plats ?? []).map((p) => ({ nom: p.nom, detail: p.description, prix: p.prix ?? '', placeholder: p.placeholder }));

/** Règles maison : faits du dossier ; les deux dernières viennent de Gault&Millau, à confirmer. */
export const regles: Regle[] = [
  { texte: 'Banc d’écailler du jeudi au lundi inclus', placeholder: false },
  { texte: 'Terrasse chauffée, à l’abri du vent', placeholder: false },
  { texte: 'Frites cuites à la graisse de bœuf', placeholder: false },
  { texte: 'Allergènes : demandez à notre personnel', placeholder: false },
  { texte: 'Plats pour les enfants', placeholder: false },
  { texte: 'Animaux admis', placeholder: true },
  { texte: 'Plats à emporter', placeholder: true },
];

/** Plan schématique : la Meuse, le pont du Luxembourg et les berges sont cités par le site ; tracé non à l'échelle,
 *  à retracer sur OpenStreetMap. Coordonnées en % de la boîte du SVG. */
export const plan: PointPlan[] = [
  { numero: 1, nom: 'La Brasserie du Quai', detail: 'Rue du Quai 9, 5000 Namur', x: 48, y: 52, placeholder: false },
  { numero: 2, nom: 'La terrasse', detail: 'sur les berges, face à la Meuse', x: 58, y: 46, placeholder: false },
  { numero: 3, nom: 'Le pont du Luxembourg', detail: 'la brasserie est à son pied', x: 68, y: 38, placeholder: false },
];

/** Services (dérivés des horaires) : alimentent la ligne de temps 08h-23h. */
export const services: Service[] = site.horaires.flatMap((h) =>
  h.creneaux.map((c) => ({ jour: h.jour, debut: c.ouverture, fin: c.fermeture, nom: c.ouverture < '16:00' ? 'midi' : 'soir', aConfirmer: !!h.aConfirmer }) as Service),
);

/** Citation de la terrasse (accueil, page terrasse). */
export const citationTerrasse = { texte: 'De grandes baies vitrées offrent une vue imprenable sur la Meuse.', placeholder: false }; // phrase du site actuel

/** Photos libres : aucune (le restaurant fournit ses photos d'eau et de terrasse). */
export interface PhotoLibre extends Photo { credit: string; source: string }
export const photosLibres: PhotoLibre[] = [];

/** Photo (client ou libre) par chemin. */
export function photoAny(src: string): Photo {
  return site.photos.find((x) => x.src === src) ?? photosLibres.find((x) => x.src === src) ?? (() => { throw new Error(`Photo inconnue : ${src}`); })();
}

