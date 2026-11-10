// Tout le contenu du site vit ici. Source : data/restaurants/huile-sur-le-feu/donnees.json, dossier.md et photos/index.json.
// Les trous des données réelles sont comblés par des données fictives marquées `placeholder: true`.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean }
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
  description: string;
  url: string;
  typeCuisine: string;
  adresse: { rue: string; numero: string; cp: string; commune: string; pays: string };
  geo: { lat: number; lon: number };
  telephone: string;
  email: { valeur: string; placeholder: boolean };
  reservation: { outil: string; url: string };
  horaires: Horaire[];
  reseaux: Reseau[];
  carte: Categorie[];
  menus: Menu[];
  histoire: string[];
  equipe: Membre[];
  avis: Avis[];
  photos: Photo[];
  valeurs: string[];
}

const photo = (n: string, alt: string, largeur: number, hauteur: number): Photo => ({ src: `/photos/${n}.webp`, alt, largeur, hauteur, placeholder: false });
const service = [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '18:00', fermeture: '21:15' }];

export const site: Restaurant = {
  slug: 'huile-sur-le-feu',
  nom: "L'Huile sur le Feu",
  baseline: 'La Méditerranée dans votre assiette',
  description:
    "L'Huile sur le Feu à Namur : cuisine méditerranéenne des Pouilles, pâtes fraîches maison, huiles d'olive Oliviers & Co choisies pour chaque plat, boutique sur place.",
  url: 'https://www.lhuilesurlefeu.be',
  typeCuisine: 'Cuisine méditerranéenne, italienne',
  adresse: { rue: 'Rue de Marchovelette', numero: '19', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.4625484, lon: 4.8669053 },
  telephone: '+32 81 24 19 03',
  email: { valeur: 'info@lhuilesurlefeu.be', placeholder: false },
  reservation: { outil: 'Barestho', url: 'https://lhuilesurlefeu.reservation.barestho.com/' },
  horaires: [
    { jour: 'lundi', creneaux: [], note: 'fermé' },
    { jour: 'mardi', creneaux: service },
    { jour: 'mercredi', creneaux: service },
    { jour: 'jeudi', creneaux: service },
    { jour: 'vendredi', creneaux: service },
    { jour: 'samedi', creneaux: service },
    { jour: 'dimanche', creneaux: [], note: 'fermé' },
  ],
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/lhuilesurlefeu/' },
    { nom: 'Instagram', url: 'https://www.instagram.com/lhuilesurlefeu/' },
  ],
  carte: [
    {
      "categorie": "Les suggestions du moment",
      "plats": [
        {
          "nom": "La Pinsa Romana",
          "description": "Courgettes, aubergines, burrata, jambon de Parme et copeaux de parmesan",
          "prix": "23,00 €",
          "placeholder": false
        },
        {
          "nom": "Linguine pesto de pistache, scampi et huile d'olive de Toscane",
          "description": "",
          "prix": "25,00 €",
          "placeholder": false
        },
        {
          "nom": "Casarecce au potimarron, chips de speck et pecorino",
          "description": "",
          "prix": "23,00 €",
          "placeholder": false
        },
        {
          "nom": "Carpaccio de tartare de bœuf",
          "description": "Copeaux de parmesan, roquette et huile d'olive à la truffe",
          "prix": "29,00 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "En dégustant l'apéritif",
      "plats": [
        {
          "nom": "La planche charcuterie du moment & burrata",
          "description": "",
          "prix": "25,90 €",
          "placeholder": false
        },
        {
          "nom": "Véritable jambon de Parme",
          "description": "",
          "prix": "15,00 €",
          "placeholder": false
        },
        {
          "nom": "Huile à la truffe blanche",
          "description": "",
          "prix": null,
          "placeholder": false
        },
        {
          "nom": "Assiette méditerranéenne",
          "description": "Accompagnée de légumes grillés (pour 2-3 personnes)",
          "prix": "25,90 €",
          "placeholder": false
        },
        {
          "nom": "Assiette végétarienne",
          "description": "Pour 2-3 personnes",
          "prix": "24,90 €",
          "placeholder": false
        },
        {
          "nom": "Planche gourmande à partager",
          "description": "Charcuterie & fromages italiens sélectionnés",
          "prix": "29,90 €",
          "placeholder": false
        },
        {
          "nom": "Bruschetta",
          "description": "8 pièces",
          "prix": "10,00 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Entrées & salades",
      "plats": [
        {
          "nom": "Potage du jour",
          "description": "",
          "prix": "10,00 €",
          "placeholder": false
        },
        {
          "nom": "Demi-lunes au chorizo",
          "description": "Pâtes fraîches, huile au piment",
          "prix": "17,00 €",
          "placeholder": false
        },
        {
          "nom": "Carpaccio de bœuf",
          "description": "Copeaux de parmesan, roquette, huile d'olive à la truffe et vieux vinaigre balsamique à la figue",
          "prix": "21,00 €",
          "placeholder": false
        },
        {
          "nom": "Demi-lunes aux champignons",
          "description": "Pâtes fraîches légèrement crémées, huile à la truffe, burrata",
          "prix": "20,00 €",
          "placeholder": false
        },
        {
          "nom": "Vitello tonnato",
          "description": "",
          "prix": "19,00 €",
          "placeholder": false
        },
        {
          "nom": "Croquettes de scampi au curry",
          "description": "Sauce homardine (2 pièces)",
          "prix": "19,00 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Pâtes fraîches & ravioles",
      "plats": [
        {
          "nom": "Lasagne aux blettes",
          "description": "Saucisse italienne fraîche, mozzarella gratinée",
          "prix": "22,00 €",
          "placeholder": false
        },
        {
          "nom": "Risotto au parfum de curcuma",
          "description": "Scampi et chorizo",
          "prix": "25,00 €",
          "placeholder": false
        },
        {
          "nom": "Orecchiette au ragù de saucisse italienne",
          "description": "Basilic et parmesan",
          "prix": "21,00 €",
          "placeholder": false
        },
        {
          "nom": "Demi-lunes au chorizo, crème tomatée",
          "description": "Pâtes fraîches, crème tomatée au parmesan, huile au piment",
          "prix": "22,00 €",
          "placeholder": false
        },
        {
          "nom": "Demi-lunes aux champignons des bois",
          "description": "Pâtes fraîches légèrement crémées, huile à la truffe et burrata",
          "prix": "25,00 €",
          "placeholder": false
        },
        {
          "nom": "Rigatoni à la crème de gorgonzola",
          "description": "Brocolis et noix",
          "prix": "23,00 €",
          "placeholder": false
        },
        {
          "nom": "Linguine aux 3 tomates confites",
          "description": "Ail, basilic, pecorino et burrata",
          "prix": "22,00 €",
          "placeholder": false
        },
        {
          "nom": "Penne à la crème de poivrons",
          "description": "Saucisse italienne rôtie, mascarpone, spianata calabra, parmesan",
          "prix": "25,00 €",
          "placeholder": false
        },
        {
          "nom": "Cannelloni aux quatre fromages",
          "description": "Gratinés, huile à la truffe",
          "prix": "22,00 €",
          "placeholder": false
        },
        {
          "nom": "Lasagne gratinée au chèvre",
          "description": "Légumes grillés, parmesan",
          "prix": "20,00 €",
          "placeholder": false
        },
        {
          "nom": "Linguine au pesto de courgettes",
          "description": "Croquant de guanciale, scampi et pecorino",
          "prix": "26,00 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Les viandes & poissons",
      "plats": [
        {
          "nom": "Poisson du jour",
          "description": "Demandez-nous",
          "prix": "29,00 €",
          "placeholder": false
        },
        {
          "nom": "Carpaccio de bœuf",
          "description": "Copeaux de parmesan, roquette, huile à la truffe, vinaigre à la figue",
          "prix": "24,00 €",
          "placeholder": false
        },
        {
          "nom": "Escalope de veau façon parmigiana",
          "description": "",
          "prix": "33,00 €",
          "placeholder": false
        },
        {
          "nom": "Osso buco à la milanaise",
          "description": "Tagliatelle",
          "prix": "29,00 €",
          "placeholder": false
        },
        {
          "nom": "Tartare de bœuf coupé au couteau",
          "description": "Pignons, tomates confites, artichauts, parmesan, huile d'olive à l'ail",
          "prix": "29,00 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Les douceurs & fromage",
      "plats": [
        {
          "nom": "Pannacotta aux framboises",
          "description": "",
          "prix": "12,00 €",
          "placeholder": false
        },
        {
          "nom": "Coulant au chocolat",
          "description": "Huile d'olive à la mandarine",
          "prix": "12,00 €",
          "placeholder": false
        },
        {
          "nom": "Le tiramisù traditionnel",
          "description": "Cacao",
          "prix": "12,00 €",
          "placeholder": false
        },
        {
          "nom": "Tiramisù au spéculoos",
          "description": "",
          "prix": "12,00 €",
          "placeholder": false
        },
        {
          "nom": "La palette de glaces du moment",
          "description": "",
          "prix": "9,00 €",
          "placeholder": false
        },
        {
          "nom": "L'assortiment de fromages affinés du moment",
          "description": "",
          "prix": "14,00 €",
          "placeholder": false
        },
        {
          "nom": "Salade de fruits frais",
          "description": "Huile d'olive à la menthe",
          "prix": "9,00 €",
          "placeholder": false
        },
        {
          "nom": "Dessert du menu",
          "description": "",
          "prix": "13,00 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Gins",
      "plats": [
        {
          "nom": "Gin Amalfi",
          "description": "Italie",
          "prix": "14,00 €",
          "placeholder": false
        },
        {
          "nom": "Gin Birdie",
          "description": "Royaume-Uni",
          "prix": "12,00 €",
          "placeholder": false
        },
        {
          "nom": "Gin Engine",
          "description": "Italie, Alta Langa",
          "prix": "12,00 €",
          "placeholder": false
        },
        {
          "nom": "Gin Panda master Juniperus",
          "description": "Belgique",
          "prix": "12,00 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Vins blancs",
      "plats": [
        {
          "nom": "Greco, Casa Primis BIO",
          "description": "Greco, Puglia",
          "prix": "29,90 €",
          "placeholder": false
        },
        {
          "nom": "Fiordiligi Grillo, Assuli BIO",
          "description": "Grillo, Sicilia",
          "prix": "31,90 €",
          "placeholder": false
        },
        {
          "nom": "Zin Salento, Fiano",
          "description": "Fiano, Puglia",
          "prix": "26,90 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Vins rouges",
      "plats": [
        {
          "nom": "Salice Salentino, Palama 37,5 cl",
          "description": "Negroamaro, Puglia",
          "prix": "22,90 €",
          "placeholder": false
        },
        {
          "nom": "Cigliegiolo, Casa Primis",
          "description": "Cigliegiolo, Puglia",
          "prix": "29,90 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Vins rosés",
      "plats": [
        {
          "nom": "Metiusco Salento, Palama",
          "description": "Negroamaro, Puglia",
          "prix": "29,00 €",
          "placeholder": false
        }
      ]
    }
  ]  ,
  menus: [
    {
      nom: 'Menu Gourmet',
      prix: '49,90 €',
      description:
        "Entrée : toast aux champignons, huile d'olive à la truffe. Plat : filet de sébaste, fregola sarda, ratatouille, huile d'olive au persil plat. Dessert : tatin aux pommes, glace fleur de lait, huile d'olive à la mandarine.",
      placeholder: false,
    },
    { nom: 'Menu Enfants', prix: '25 €', description: 'Trois services : potage maison du jour, pâtes au choix à la carte, glace du moment au choix.', placeholder: false },
  ],
  histoire: [
    "Giuseppe Santamaria a grandi dans les Pouilles, là où l'olivier fait partie du paysage autant que de la table. Il en a gardé une idée simple : l'huile d'olive n'est pas la touche finale d'un plat, elle en est le point de départ.",
    "La maison ouvre rue de Marchovelette, à deux pas du centre de Namur. Chaque assiette y reçoit l'huile choisie pour elle : truffe blanche, piment, mandarine, menthe, ail ou persil.",
    "Les huiles viennent d'Oliviers & Co et se retrouvent sur les étagères de la boutique, dans le même lieu : on goûte à table, on repart avec le flacon.",
    "Les pâtes sont fraîches et faites maison : demi-lunes, lasagne, ravioles, orecchiette. La cuisine est ouverte sur la salle.",
  ],
  equipe: [{ nom: 'Giuseppe Santamaria', role: 'Fondateur', placeholder: false }],
  avis: [
    { texte: 'Délicieux du début à la fin (faim)', auteur: '@monalnr23', source: 'Mapstr', date: '2026-07-01', placeholder: false },
    { texte: 'Service incroyable, très bon. Un peu cher et attente +', auteur: '@paulinepee', source: 'Mapstr', date: '2025-09-09', placeholder: false },
  ],
  photos: [
    photo('flambage-poele', "Flambage d'une poêle dans la cuisine ouverte", 1600, 1078),
    photo('facade', "Façade en pierre, porte vitrée et enseigne Oliviers & Co, L'Huile sur le Feu", 1086, 1448),
    photo('salle', 'Salle aux murs ocre, tableau noir et tables dressées', 1539, 1022),
    photo('lustre-huiles', "Lustre de flacons d'huile dorée", 1538, 1022),
    photo('detail-presse-huile', "Détail d'une presse à huile et brins séchés sur un mur ocre", 1538, 1022),
    photo('cocktail-pain', 'Cocktail rouge et petits pains sur une planche', 1122, 1402),
    photo('portrait-homme', "Portrait d'un homme souriant à table", 1122, 1402),
    photo('plat-croquette-scampi', 'Croquette de scampi, sauce crémeuse et roquette, vue de dessus', 1200, 1600),
    photo('salade-legumes-grilles', 'Salade de légumes grillés et tomates, pain et vin rouge', 1448, 1086),
    photo('bruschette-assiette', 'Assiette de bruschette et légumes grillés', 1344, 1170),
    photo('carpaccio', "Carpaccio garni de roquette, verre de vin blanc et huile d'olive", 1254, 1254),
    photo('plat-sauce-orange', 'Plat en sauce orange dans une assiette creuse, vin rosé', 1448, 1086),
    photo('boutique-allee', 'Allée de la boutique, étagères de produits', 1022, 1538),
    photo('boutique-etageres', "Étagères de la boutique : huiles et conserves", 1600, 900),
    photo('boutique-flacons-oco', "Flacons d'huile et coffrets Oliviers & Co sur une table", 1448, 1086),
    photo('oliveraie', 'Oliveraie au soleil couchant', 1600, 914),
    photo('branche-olivier', "Une main tient une branche d'olivier", 1067, 1600),
  ],
  valeurs: [
    "L'huile d'olive comme point de départ du plat",
    'Pâtes fraîches faites maison',
    'Produits simples, peu de gestes',
    'Une carte qui suit les saisons',
  ],
};

export function photoDe(n: string): Photo {
  const src = `/photos/${n}.webp`;
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${n}`);
  return p;
}

export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;
export const horaireTexte = (h: Horaire) =>
  h.creneaux.length ? h.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(', ') : h.note || 'fermé';
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;
export const itineraireHref = `https://www.openstreetmap.org/?mlat=${site.geo.lat}&mlon=${site.geo.lon}#map=17/${site.geo.lat}/${site.geo.lon}`;

/* ───────── Données propres à la variante ───────── */

export interface Regle { texte: string; placeholder: boolean }
export interface Service { jour: Jour; debut: string; fin: string; nom: 'midi' | 'soir' }
export interface Huile { huile: string; libelle: string; plat: string | null; source: string }

/** Trois univers sous le nom (tous prouvés par le site du client). */
export const univers = [
  { mot: 'pâtes fraîches', placeholder: false },
  { mot: "huiles d'olive", placeholder: false },
  { mot: 'boutique', placeholder: false },
];

/** Huiles : plat associé quand le menu Gourmet le prouve, sinon null (jamais d'association inventée). */
export const huiles: Huile[] = [
  { huile: 'Truffe blanche', libelle: "Huile d'olive à la truffe blanche", plat: "Toast aux champignons (menu Gourmet) et carpaccio de tartare de bœuf", source: 'menu et carte' },
  { huile: 'Persil plat', libelle: "Huile d'olive au persil plat", plat: 'Filet de sébaste, fregola sarda, ratatouille (menu Gourmet)', source: 'menu Gourmet' },
  { huile: 'Mandarine', libelle: "Huile d'olive à la mandarine", plat: 'Tatin aux pommes, glace fleur de lait (menu Gourmet)', source: 'menu Gourmet' },
  { huile: 'Piment', libelle: "Huile d'olive au piment", plat: null, source: 'site du restaurant' },
  { huile: 'Menthe', libelle: "Huile d'olive à la menthe", plat: null, source: 'site du restaurant' },
  { huile: 'Ail', libelle: "Huile d'olive à l'ail", plat: null, source: 'site du restaurant' },
];

/** Infos pratiques : les trois premières viennent du dossier, les suivantes sont illustratives. */
export const regles: Regle[] = [
  { texte: 'Fermé le dimanche et le lundi', placeholder: false },
  { texte: 'Menu Enfants à 25 €', placeholder: false },
  { texte: 'Réservation en ligne ou par téléphone', placeholder: false },
  { texte: 'Parking à proximité', placeholder: true },
  { texte: 'Privatisation sur demande', placeholder: true },
  { texte: 'Vente à emporter', placeholder: true },
];

export const services: Service[] = site.horaires.flatMap((h) =>
  h.creneaux.map((c) => ({ jour: h.jour, debut: c.ouverture, fin: c.fermeture, nom: c.ouverture < '16:00' ? 'midi' : 'soir' }) as Service),
);

/** Citation de la boutique : phrase de la maison tirée du dossier (huile du plat = étagère), pas un propos prêté à un client. */
export const phraseBoutique = "L'huile qui parfume votre assiette se retrouve sur l'étagère.";
