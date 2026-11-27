// Tout le contenu du site vit ici. Source : data/restaurants/bayti/donnees.json et photos/index.json.
// Les trous des données réelles sont comblés par des données fictives marquées `placeholder: true` :
// un gabarit les affiche, la revue les signale, le client les remplace.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string; comptoir: string; restaurant: string }
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean; regimes?: string[]; note?: string }
export interface Categorie { categorie: string; plats: Plat[] }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean }
export interface Avis { texte: string; auteur: string; source: string; date?: string; note?: number; placeholder: boolean }
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
  adresseComptoir: { rue: string; numero: string; cp: string; commune: string; pays: string };
  geo: { lat: number; lon: number };
  telephone: string; // format international
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
  specialites: string[];
}

const photo = (src: string, alt: string, largeur: number, hauteur: number): Photo => ({ src, alt, largeur, hauteur, placeholder: false });

// Horaires : restaurant mardi à samedi 18h-21h, Comptoir mardi à samedi 11h-19h (bayti.be). Fermeture du dimanche
// et du lundi déduite par la recherche (à confirmer). `creneaux` couvre l'ouverture de la maison (11h-21h).
const ouvert = (jour: Jour): Horaire => ({ jour, creneaux: [{ ouverture: '11:00', fermeture: '21:00' }], comptoir: '11:00 à 19:00', restaurant: '18:00 à 21:00' });
const ferme = (jour: Jour): Horaire => ({ jour, creneaux: [], note: 'fermé (à confirmer)', comptoir: 'fermé', restaurant: 'fermé' });

export const site: Restaurant = {
  slug: 'bayti',
  nom: 'Bayti',
  baseline: 'Deux mondes, une table.',
  description:
    'Bayti à Namur : restaurant du Moyen-Orient revisité d’une touche européenne, menu unique en 8 services le soir, Comptoir de mezzés à emporter et traiteur.',
  url: 'https://www.bayti.be',
  typeCuisine: "Cuisine moyen-orientale (libanaise) revisitée d'une touche européenne",
  adresse: { rue: 'Rue du Pont', numero: '15', cp: '5000', commune: 'Namur', pays: 'BE' },
  adresseComptoir: { rue: 'Rue du Pont', numero: '6', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.4624432, lon: 4.8678736 },
  telephone: '+32 492 07 25 76',
  email: { valeur: 'info@bayti.be', placeholder: false },
  reservation: { outil: 'Barestho', url: 'https://bayti.reservation.barestho.com/' },
  horaires: [ferme('lundi'), ouvert('mardi'), ouvert('mercredi'), ouvert('jeudi'), ouvert('vendredi'), ouvert('samedi'), ferme('dimanche')],
  reseaux: [
    { nom: 'Instagram', url: 'https://www.instagram.com/bayti.be/' },
    { nom: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100067102638326' },
  ],
  carte: [
  {
    "categorie": "Restaurant · Menu 8 services, 45 € par personne",
    "plats": [
      {
        "nom": "Kaak al quds",
        "description": "Pain brioché du Levant, légèrement grillé et servi tiède",
        "prix": null,
        "placeholder": false
      },
      {
        "nom": "Houmous à la grenade",
        "description": "Purée de Houmous, grenade, Crème de betterave au cumin",
        "prix": null,
        "placeholder": false
      },
      {
        "nom": "Feuilles de vigne au kumquat",
        "description": "Feuilles de vigne fondantes, kumquat, pistaches",
        "prix": null,
        "placeholder": false
      },
      {
        "nom": "Rakatat au fromage, miel fermenté",
        "description": "Cigares croustillants farcis au fromage levantin, nappés d'un miel fermenté aux épices",
        "prix": null,
        "placeholder": false
      },
      {
        "nom": "Musakhan roll, sauce toum",
        "description": "Roulés croustillants farcis au poulet musakhan, oignons caramélisés au sumac, sauce toum",
        "prix": null,
        "placeholder": false
      },
      {
        "nom": "Sambousek de bœuf",
        "description": "Chaussons farcis au bœuf épicé, labneh crémeux",
        "prix": null,
        "placeholder": false
      },
      {
        "nom": "Riz safrané, kefta d'agneau & fruits secs",
        "description": "Riz parfumé au safran, kefta d'agneau grillée, fruits secs",
        "prix": null,
        "placeholder": false
      },
      {
        "nom": "Soft Baked Cookie, glace ashta",
        "description": "Cookie fondant « servi chaud », accompagné d'une glace ashta",
        "prix": null,
        "placeholder": false
      }
    ]
  },
  {
    "categorie": "Comptoir · Mezzés froids",
    "plats": [
      {
        "nom": "Houmous bayti",
        "description": "pois chiche, tahini, jus de citron, huile d'olive",
        "prix": "8 €",
        "placeholder": false,
        "regimes": [
          "Sans gluten",
          "Végétalien",
          "Sans lactose"
        ]
      },
      {
        "nom": "Hummus de betterave",
        "description": "pois chiche, tahini, betterave, cumin, huile d'olive",
        "prix": "8 €",
        "placeholder": false,
        "regimes": [
          "Végétalien",
          "Sans gluten",
          "Sans lactose"
        ]
      },
      {
        "nom": "Salade de betteraves et fêta au Douka",
        "description": "betteraves, fêta, noix, miel, Douka",
        "prix": "8 €",
        "placeholder": false,
        "regimes": [
          "Végétarien",
          "Sans gluten"
        ]
      },
      {
        "nom": "Labneh à l'ail",
        "description": "yaourt extra filtré, ail, zaatar de Jordanie, summak, huile d'olive",
        "prix": "8 €",
        "placeholder": false,
        "regimes": [
          "Végétarien",
          "Sans gluten"
        ]
      },
      {
        "nom": "Feuilles de vigne",
        "description": "feuilles de vigne, riz, tomates, oignons, persil, mélasse de grenade, citron, huile d'olive",
        "prix": "7,5 €",
        "placeholder": false,
        "regimes": [
          "Végétalien",
          "Sans gluten",
          "Sans lactose"
        ]
      },
      {
        "nom": "Muhammara du Damas",
        "description": "piment d'alep, noix, mélasse de grenade, cumin, coriandre, huile d'olive",
        "prix": "8 €",
        "placeholder": false,
        "regimes": [
          "Végétalien",
          "Sans lactose"
        ]
      },
      {
        "nom": "Maghmour libanais",
        "description": "aubergine, pois chiche, tomate, oignons, chips de pain libanais",
        "prix": "8 €",
        "placeholder": false,
        "regimes": [
          "Végétalien",
          "Sans lactose",
          "Sans gluten"
        ]
      },
      {
        "nom": "Makdous",
        "description": "Aubergines fondantes farcies de noix et d'ail, maturées dans l'huile d'olive",
        "prix": "1 €",
        "placeholder": false,
        "regimes": [
          "Végétalien"
        ],
        "note": "achat par pièce"
      },
      {
        "nom": "Pickles de navet au jus de betterave",
        "description": "Navets croquants marinés, acidulés et colorés au jus de betterave",
        "prix": "4 €",
        "placeholder": false
      },
      {
        "nom": "Olives libanaises",
        "description": "",
        "prix": "4 €",
        "placeholder": false
      },
      {
        "nom": "Mutabla d'aubergine",
        "description": "Aubergines grillées, tahini soyeux et touche de citron",
        "prix": "8 €",
        "placeholder": false
      },
      {
        "nom": "Salade carotte, olive & feta",
        "description": "Carottes marinées, olives et feta émiettée",
        "prix": "8 €",
        "placeholder": false
      },
      {
        "nom": "Labneh piquant à l'harissa",
        "description": "Labneh onctueux relevé d'harissa",
        "prix": "8 €",
        "placeholder": false
      }
    ]
  },
  {
    "categorie": "Comptoir · Mezzés chauds",
    "plats": [
      {
        "nom": "Le glorieux kebbeh",
        "description": "boulgour, viande hachée, oignons, mélasse de grenade, pistache, ras el-hanout",
        "prix": "2 €",
        "placeholder": false,
        "note": "achat par pièce"
      },
      {
        "nom": "Les rouleaux de Jérusalem",
        "description": "poulet rôti, oignons, sumac, épices libanaises, pignons, pâte phyllo",
        "prix": "2 €",
        "placeholder": false,
        "note": "achat par pièce"
      },
      {
        "nom": "Les pommes de terre épicées",
        "description": "cubes, coriandre, ail, citron, paprika fumé, poivre d'alep",
        "prix": "8 €",
        "placeholder": false
      },
      {
        "nom": "Rakakat au fromage",
        "description": "pâte phyllo, feta, persil, menthe, huile d'olive",
        "prix": "1,5 €",
        "placeholder": false
      },
      {
        "nom": "Le makanek citronné",
        "description": "mini saucisse d'agneau et de bœuf, épices libanaises, citron, mélasse de grenade",
        "prix": "10 €",
        "placeholder": false
      },
      {
        "nom": "Sujuk d'alep",
        "description": "mini saucisses relevées, tomates, citron, piment d'alep, harissa maison",
        "prix": "10 €",
        "placeholder": false
      },
      {
        "nom": "Makali",
        "description": "chou-fleur frit à la libanaise, aubergine, coriandre, grenade, sauce sésame au zaatar",
        "prix": "8 €",
        "placeholder": false
      },
      {
        "nom": "Boulgour à la tomate",
        "description": "blé complet, tomates, oignon, menthe, persil",
        "prix": "8 €",
        "placeholder": false
      },
      {
        "nom": "Le vrai falafel du Liban",
        "description": "pois chiche, oignon, ail et épices maison",
        "prix": "1,5 €",
        "placeholder": false,
        "note": "achat par pièce"
      }
    ]
  },
  {
    "categorie": "Comptoir · Grillades",
    "plats": [
      {
        "nom": "Jawaneh de poulet épicées",
        "description": "ailes de poulet, coriandre, ail, citron, harissa",
        "prix": "2 €",
        "placeholder": false,
        "note": "achat par pièce"
      },
      {
        "nom": "Shish tawook",
        "description": "Poulet mariné à la libanaise, grillé, citron et ail",
        "prix": "4,5 €",
        "placeholder": false,
        "note": "achat par pièce"
      },
      {
        "nom": "Brochette de scampis à l'ail",
        "description": "",
        "prix": "4,5 €",
        "placeholder": false,
        "note": "achat par pièce"
      },
      {
        "nom": "Brochette de kefta d'agneau",
        "description": "",
        "prix": "4,5 €",
        "placeholder": false,
        "note": "achat par pièce"
      }
    ]
  },
  {
    "categorie": "Comptoir · Desserts",
    "plats": [
      {
        "nom": "Soft baked cookies au chocolat et fleur de sel",
        "description": "",
        "prix": "3,5 €",
        "placeholder": false
      },
      {
        "nom": "Baklava au chocolat et pistache",
        "description": "",
        "prix": "3 €",
        "placeholder": false
      },
      {
        "nom": "Baklava au pistache nature",
        "description": "",
        "prix": "3 €",
        "placeholder": false
      }
    ]
  },
  {
    "categorie": "Comptoir · Accompagnements",
    "plats": [
      {
        "nom": "Sauce harissa",
        "description": "",
        "prix": "2 €",
        "placeholder": false
      },
      {
        "nom": "Sauce à l'ail au summak",
        "description": "",
        "prix": "2 €",
        "placeholder": false
      },
      {
        "nom": "Sauce tahini au zaatar",
        "description": "",
        "prix": "2 €",
        "placeholder": false
      },
      {
        "nom": "Pain libanais",
        "description": "",
        "prix": "2 €",
        "placeholder": false
      },
      {
        "nom": "Simit",
        "description": "",
        "prix": "2,5 €",
        "placeholder": false
      }
    ]
  }
],
  menus: [
    {
      nom: 'Menu 8 services, au restaurant',
      prix: '45 €',
      description: 'Le soir, sur place, du mardi au samedi de 18h à 21h. Prix par personne.',
      placeholder: false,
    },
    {
      nom: 'Menu Découverte à emporter',
      prix: '28 €',
      description:
        'Par personne, au Comptoir : houmous Bayti, muhammara de Damas, labneh à l’ail, feuilles de vigne, rakakat au fromage, rouleaux de Jérusalem, jawaneh de poulet, pain libanais, sauce à l’ail au summak.',
      placeholder: false,
    },
  ],
  histoire: [
    'Bayti signifie « foyer » en arabe classique. Le nom dit tout : une table familiale, ouverte, où l’on vient comme chez soi.',
    'La maison est née du désir de faire découvrir la cuisine traditionnelle du Moyen-Orient, en recréant « la cuisine de notre enfance » autour d’une table partagée, avec une touche personnelle.',
    'Au cœur de Namur, un voyage culinaire célèbre le meilleur de deux mondes : l’âme du Moyen-Orient, revisitée d’une touche européenne.',
    'Trois façons d’y goûter, toutes Rue du Pont : le restaurant le soir au numéro 15, le Comptoir de jour au numéro 6, et Bayti chez vous, le traiteur qui apporte la table à vos événements.',
  ],
  avis: [
    {
      texte:
        'Un véritable petit coin du Moyen-Orient au cœur de Namur. Chaque mezzé est un voyage divin pour les papilles des saveurs authentiques, variées et parfaitement équilibrées. Chaque plat est préparé avec soin et tout est succulent du début à la fin. Le restaurant dégage une atmosphère chaleureuse et accueillante dès qu’on franchit la porte.',
      auteur: 'Brenda C.',
      source: 'avis Google repris sur bayti.be',
      placeholder: false,
    },
  ],
  photos: [
  photo('/photos/hero-mezzes-herbes.webp', "Bols de mezzés (houmous à la betterave, falafels, salades) sur herbes et fleurs, panoramique", 1800, 782),
  photo('/photos/mezzes-vue-dessus-pelouse.webp', "Sélection de mezzés en bols kraft sur pelouse fleurie, vue du dessus", 1600, 1143),
  photo('/photos/mezzes-feuilles-automne.webp', "Six bols de mezzés sur feuilles d'automne, vue du dessus", 1800, 1441),
  photo('/photos/mezzes-feuilles-portrait.webp', "Bols de mezzés sur feuilles d'automne, format portrait", 1366, 2048),
  photo('/photos/coffret-traiteur-pain.webp', "Coffret traiteur en bois avec bols de mezzés et pain libanais sur mousse", 1800, 1286),
  photo('/photos/boite-traiteur-ouverte.webp', "Boîte traiteur ouverte avec compartiments de mezzés, sous-bois", 1800, 1286),
  photo('/photos/buffet-evenement.webp', "Buffet de mezzés sur nappe rouge (événement, traiteur)", 1600, 2400),
  photo('/photos/kebbeh-falafel-mains.webp', "Deux bols tenus à deux mains : kebbeh frits et falafels", 1800, 1286),
  photo('/photos/desserts-ashta-semoule.webp', "Deux bols de desserts (crème et gâteau pistache-rose) sur feuilles dorées", 1800, 1440),
  photo('/photos/mezzes-rouleaux-kefta.webp', "Bols de houmous, rouleaux croustillants, falafel et kefta, vue du dessus", 1800, 1286),
  photo('/photos/rakakat-kebbeh-fond-noir.webp', "Rouleau croustillant au fromage et kebbeh à la pistache sur fond noir", 1800, 1441),
  photo('/photos/salade-croustillants.webp', "Salade avec lamelles de pain frit et grenade, gros plan", 1800, 1441),
  photo('/photos/bols-kraft-houmous-pois-chiches.webp', "Houmous aux pois chiches, taboulé et mezzés en bols kraft", 1800, 1201),
  photo('/photos/makanek-mains.webp', "Deux bols de makanek (saucisses sauce tomate, citron) tenus à deux mains", 1800, 1286),
  photo('/photos/mezzes-ail-des-ours.webp', "Huit bols de mezzés et pain libanais sur ail des ours", 1800, 1286),
  photo('/photos/falafels-salade-feuilles.webp', "Bols de falafels et salade sur feuilles d'automne, gros plan", 1800, 1441),
  photo('/photos/salade-betterave-feta.webp', "Salade de betteraves, feta, noix et pistaches, bol kraft sur fleurs", 1080, 1080),
  photo('/photos/maghmour-aubergine-pois-chiches.webp', "Bol d'aubergines, pois chiches et tomate garni de pain croustillant", 1080, 1080),
  photo('/photos/olives-fond-carrelage-vert.webp', "Bol de mezzé sombre sur carrelage vert (fonds verts, vue du dessus)", 1714, 2400),
  photo('/photos/pickles-navet.webp', "Pickles de navet rose dans une assiette bleue, main visible", 1714, 2400),
  photo('/photos/olives-vertes.webp', "Bol d'olives vertes sur carrelage vert", 1714, 2400),
  photo('/photos/mutabal-aubergine.webp', "Purée d'aubergine (type mutabal) dans un bol, carrelage vert", 1714, 2400),
  photo('/photos/salade-carotte-feta.webp', "Salade de carottes et feta dans un bol gris, carrelage vert", 1714, 2400),
  photo('/photos/houmous-tomates-cerises.webp', "Houmous garni de tomates cerises tenu à deux mains, carrelage vert", 1714, 2400),
  photo('/photos/kebbeh-boulgour-grenade.webp', "Bol de boulgour farci gratiné à la grenade sur fleurs", 1080, 1080),
  photo('/photos/saucisses-epicees-citron.webp', "Saucisses sauce tomate, piment et citron dans un bol", 1300, 1270),
  photo('/photos/poulet-herbes-citron.webp', "Poulet rôti aux herbes et citron dans un bol kraft sur fleurs", 1800, 1800),
  photo('/photos/brochettes-poulet-poivron.webp', "Brochettes de poulet et poivron dans une boîte kraft", 1800, 1800),
  photo('/photos/cookies-main.webp', "Cookies cassés à la main sur plat en verre, carrelage vert", 1714, 2400),
  photo('/photos/baklava-chocolat-pistache.webp', "Baklavas chocolat-pistache sur présentoir en verre", 1800, 1826),
  photo('/photos/baklava-pistache.webp', "Baklavas à la pistache sur présentoir en verre", 1714, 2400),
  photo('/photos/pain-libanais.webp', "Pain libanais grillé empilé, mezzés en arrière-plan", 1124, 1687),
  photo('/photos/simit.webp', "Simit dans une corbeille en tissu sur carrelage vert", 1714, 2400),
  ],
  valeurs: [
    'Une cuisine « comme à la maison »',
    'Le Moyen-Orient et une touche européenne',
    'Des menus sur mesure pour vos événements',
  ],
  specialites: ['Mezzés froids et chauds', 'Kebbeh', 'Falafel libanais', 'Rakakat au fromage', 'Makanek citronné', 'Sujuk d’Alep', 'Baklavas'],
};

/** Photo par chemin (erreur explicite si le chemin n'existe pas : un site ne doit pas pointer dans le vide). */
export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}

/** Adresse sur une ligne. */
export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;
export const adresseComptoirLigne = (r: Restaurant = site) => `${r.adresseComptoir.rue} ${r.adresseComptoir.numero}, ${r.adresseComptoir.cp} ${r.adresseComptoir.commune}`;

/** Horaires lisibles : '11:00 à 21:00' ou la note. */
export const horaireTexte = (h: Horaire) =>
  h.creneaux.length ? h.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(', ') : h.note || 'fermé';

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;

// ---------------------------------------------------------------------------------------------
// Gabarit « Journée » adapté : trois moments réels de la maison (11h Comptoir, 18h restaurant, 21h fermeture),
// plus la page « Bayti chez vous » (traiteur). Aucun moment fictif : tout vient du dossier.
// ---------------------------------------------------------------------------------------------

export interface Ligne { nom: string; detail: string; prix: string | null; placeholder: boolean }
export interface Moment {
  id: string; // ancre : m-11h
  heure: number; // 11, 18, 21
  heureTexte: string; // '11h'
  titre: string;
  accroche: string;
  accrochePlaceholder: boolean;
  theme: 'aube' | 'midi' | 'ocre' | 'corail' | 'nuit' | 'nuitProfonde';
  lignes: Ligne[];
  photo?: string;
  placeholder: boolean;
}

const plat = (nom: string): Plat => {
  for (const c of site.carte) for (const p of c.plats) if (p.nom === nom) return p;
  throw new Error(`Plat inconnu : ${nom}`);
};
const ligneDe = (nom: string, detail?: string): Ligne => {
  const p = plat(nom);
  return { nom: p.nom, detail: detail ?? (p.note ? p.note : ''), prix: p.prix, placeholder: false };
};
const services = site.carte[0].plats;

export const moments: Moment[] = [
  {
    id: 'm-11h', heure: 11, heureTexte: '11h', titre: 'Le Comptoir', theme: 'midi',
    accroche: 'Rue du Pont 6, de jour : des mezzés froids et chauds, des grillades et des desserts, à l’unité ou en Menu Découverte, à emporter.',
    accrochePlaceholder: false, placeholder: false, photo: '/photos/bols-kraft-houmous-pois-chiches.webp',
    lignes: [
      ligneDe('Houmous bayti', 'pois chiche, tahini, citron'),
      ligneDe('Le vrai falafel du Liban', 'achat par pièce'),
      ligneDe('Rakakat au fromage', 'feta, persil, menthe'),
      ligneDe('Le glorieux kebbeh', 'achat par pièce'),
      { nom: 'Menu Découverte à emporter', detail: 'par personne, neuf préparations', prix: '28 €', placeholder: false },
    ],
  },
  {
    id: 'm-18h', heure: 18, heureTexte: '18h', titre: 'Le restaurant', theme: 'nuit',
    accroche: 'Rue du Pont 15, du mardi au samedi soir : un menu unique en 8 services, servi sur place.',
    accrochePlaceholder: false, placeholder: false, photo: '/photos/rakakat-kebbeh-fond-noir.webp',
    lignes: services.map((p) => ({ nom: p.nom, detail: p.description, prix: null, placeholder: false })),
  },
  {
    id: 'm-21h', heure: 21, heureTexte: '21h', titre: 'À demain', theme: 'nuitProfonde',
    accroche: 'Le Comptoir ferme à 19h, le restaurant à 21h. La maison est fermée le dimanche et le lundi (à confirmer).',
    accrochePlaceholder: false, placeholder: false,
    lignes: [
      { nom: 'Le Comptoir', detail: 'mardi à samedi, 11h à 19h', prix: null, placeholder: false },
      { nom: 'Le restaurant', detail: 'mardi à samedi, 18h à 21h', prix: null, placeholder: false },
    ],
  },
];

export const jours: Jour[] = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
