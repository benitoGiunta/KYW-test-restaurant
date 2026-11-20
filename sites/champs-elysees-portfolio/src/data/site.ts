// Tout le contenu du site vit ici. Source : data/restaurants/<slug>/donnees.json et photos/index.json.
// Les trous des données réelles sont comblés par des données fictives marquées `placeholder: true` :
// un gabarit les affiche, la revue les signale, le client les remplace.

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


export const site: Restaurant = {
  slug: "champs-elysees",
  nom: "Champs Elysées",
  baseline: "Bistro convivial",
  description: "Champs Elysées, bistro convivial à Namur (Jambes) : brasserie familiale ouverte depuis 1984, croquettes, boulettes, vol-au-vent maison, terrasse, 7 jours sur 7.",
  url: "https://champselysees.be",
  typeCuisine: "Brasserie, cuisine belge de brasserie",
  adresse: {
    rue: "Avenue Albert Ier",
    numero: "149",
    cp: "5100",
    commune: "Jambes (Namur)",
    pays: "BE"
  },
  geo: {
    lat: 50.4670366,
    lon: 4.8852896
  },
  telephone: "+32 81 23 14 26",
  email: {
    valeur: "resto@champselysees.be",
    placeholder: false
  },
  reservation: {
    outil: "Zenchef",
    url: "https://bookings.zenchef.com/results?rid=377536&pid=1001"
  },
  horaires: [
    {
      jour: "lundi",
      creneaux: [
        {
          ouverture: "11:00",
          fermeture: "22:00"
        }
      ]
    },
    {
      jour: "mardi",
      creneaux: [
        {
          ouverture: "11:00",
          fermeture: "22:00"
        }
      ]
    },
    {
      jour: "mercredi",
      creneaux: [
        {
          ouverture: "11:00",
          fermeture: "22:00"
        }
      ]
    },
    {
      jour: "jeudi",
      creneaux: [
        {
          ouverture: "11:00",
          fermeture: "22:00"
        }
      ]
    },
    {
      jour: "vendredi",
      creneaux: [
        {
          ouverture: "11:00",
          fermeture: "22:00"
        }
      ]
    },
    {
      jour: "samedi",
      creneaux: [
        {
          ouverture: "11:00",
          fermeture: "22:00"
        }
      ]
    },
    {
      jour: "dimanche",
      creneaux: [
        {
          ouverture: "11:00",
          fermeture: "16:00"
        }
      ]
    }
  ],
  reseaux: [
    {
      nom: "Facebook",
      url: "https://www.facebook.com/p/Brasserie-Les-Champs-%C3%89lys%C3%A9es-100057095544488/"
    }
  ],
  carte: [
    {
      categorie: "À partager… ou pas",
      plats: [
        {
          nom: "Rillettes de porc",
          description: "cornichons, pain",
          prix: "10,00",
          placeholder: false
        },
        {
          nom: "Mini croquettes de fromage",
          description: "4 pièces",
          prix: "11,00",
          placeholder: false
        },
        {
          nom: "Rillettes de saumon maison",
          description: "pain",
          prix: "12,00",
          placeholder: false
        },
        {
          nom: "Boîte de sardines",
          description: "",
          prix: "10,00",
          placeholder: false
        },
        {
          nom: "Œuf dur",
          description: "",
          prix: "1,00",
          placeholder: false
        },
        {
          nom: "Anneaux de calamars",
          description: "sauce tartare",
          prix: "12,00",
          placeholder: false
        },
        {
          nom: "Terrine maison",
          description: "moutarde, pain",
          prix: "10,00",
          placeholder: false
        },
        {
          nom: "Portion de Comté",
          description: "",
          prix: "8,00",
          placeholder: false
        },
        {
          nom: "Saucisson gaumais",
          description: "",
          prix: "8,00",
          placeholder: false
        },
        {
          nom: "Portion mixte",
          description: "Comté, saucisson gaumais",
          prix: "10,00",
          placeholder: false
        },
        {
          nom: "Planche mixte",
          description: "rillettes de porc, croquettes de fromage, anneaux de calamars, Comté, saucisson gaumais",
          prix: "27,00",
          placeholder: false
        }
      ]
    },
    {
      categorie: "Entrées",
      plats: [
        {
          nom: "Croquette de fromage artisanale",
          description: "",
          prix: "1 pc 11,00 · 2 pcs 19,00",
          placeholder: false
        },
        {
          nom: "Croquette de crevettes artisanale",
          description: "",
          prix: "1 pc 13,00 · 2 pcs 21,00",
          placeholder: false
        },
        {
          nom: "Scampis à l’ail",
          description: "",
          prix: "3 pcs 14,00 · 6 pcs 18,00 · 9 pcs 24,00",
          placeholder: false
        },
        {
          nom: "Scampis ail-crème",
          description: "",
          prix: "3 pcs 15,00 · 6 pcs 19,00 · 9 pcs 25,00",
          placeholder: false
        },
        {
          nom: "Scampis diaboliques",
          description: "",
          prix: "3 pcs 15,00 · 6 pcs 19,00 · 9 pcs 25,00",
          placeholder: false
        },
        {
          nom: "Petits gris de Namur",
          description: "",
          prix: "8 pcs 19,00",
          placeholder: false
        },
        {
          nom: "Foie gras maison",
          description: "",
          prix: "20,00",
          placeholder: false
        },
        {
          nom: "Poireaux à la vinaigrette",
          description: "",
          prix: "15,00",
          placeholder: false
        },
        {
          nom: "Toast cannibale",
          description: "",
          prix: "15,00",
          placeholder: false
        }
      ]
    },
    {
      categorie: "Salades",
      plats: [
        {
          nom: "César",
          description: "",
          prix: "25,00",
          placeholder: false
        },
        {
          nom: "César aux scampis",
          description: "",
          prix: "29,00",
          placeholder: false
        },
        {
          nom: "Frisée aux lardons",
          description: "",
          prix: "25,50",
          placeholder: false
        },
        {
          nom: "Chèvre chaud",
          description: "",
          prix: "25,00",
          placeholder: false
        }
      ]
    },
    {
      categorie: "Plats végétariens",
      plats: [
        {
          nom: "Burger d’halloumi",
          description: "",
          prix: "25,00",
          placeholder: false
        },
        {
          nom: "Penne au pesto",
          description: "",
          prix: "23,00",
          placeholder: false
        },
        {
          nom: "Lasagne de légumes",
          description: "",
          prix: "23,00",
          placeholder: false
        }
      ]
    },
    {
      categorie: "Plats brasserie",
      plats: [
        {
          nom: "Boulettes sauce tomate",
          description: "",
          prix: "22,00",
          placeholder: false
        },
        {
          nom: "Boulettes sauce liégeoise",
          description: "",
          prix: "24,00",
          placeholder: false
        },
        {
          nom: "Boulettes sauce Sambre et Meuse",
          description: "",
          prix: "24,00",
          placeholder: false
        },
        {
          nom: "Vol-au-vent maison",
          description: "",
          prix: "25,00",
          placeholder: false
        },
        {
          nom: "Cordon bleu maison",
          description: "",
          prix: "26,00",
          placeholder: false
        },
        {
          nom: "Burger des Champs",
          description: "bœuf de Famenne, lard, fromage de Maredsous, oignons caramélisés, sauce magique",
          prix: "25,00",
          placeholder: false
        }
      ]
    },
    {
      categorie: "Pâtes (spaghetti ou penne)",
      plats: [
        {
          nom: "Bolognèse",
          description: "",
          prix: "20,00",
          placeholder: false
        },
        {
          nom: "Carbo à la belge",
          description: "",
          prix: "23,50",
          placeholder: false
        },
        {
          nom: "4 fromages",
          description: "",
          prix: "27,00",
          placeholder: false
        },
        {
          nom: "All’amatriciana",
          description: "",
          prix: "27,00",
          placeholder: false
        },
        {
          nom: "Scampis",
          description: "",
          prix: "29,00",
          placeholder: false
        }
      ]
    },
    {
      categorie: "Les djônes (jusqu’à 12 ans)",
      plats: [
        {
          nom: "Pâtes",
          description: "",
          prix: "15,00",
          placeholder: false
        },
        {
          nom: "Boulette",
          description: "",
          prix: "15,00",
          placeholder: false
        },
        {
          nom: "Filet de poulet",
          description: "",
          prix: "15,00",
          placeholder: false
        },
        {
          nom: "Burger",
          description: "",
          prix: "15,00",
          placeholder: false
        }
      ]
    },
    {
      categorie: "Viandes",
      plats: [
        {
          nom: "Pavé de bœuf",
          description: "",
          prix: "28,00",
          placeholder: false
        },
        {
          nom: "Entrecôte",
          description: "",
          prix: "36,00",
          placeholder: false
        },
        {
          nom: "Américain",
          description: "",
          prix: "25,00",
          placeholder: false
        },
        {
          nom: "Jambonneau",
          description: "sauce moutarde",
          prix: "29,00",
          placeholder: false
        },
        {
          nom: "Rognon de veau",
          description: "à la namuroise ou sauce moutarde",
          prix: "28,00",
          placeholder: false
        },
        {
          nom: "Côte de porcelet saumurée",
          description: "sauce moutarde, croquettes",
          prix: "28,00",
          placeholder: false
        },
        {
          nom: "Filet de poulet",
          description: "",
          prix: "23,00",
          placeholder: false
        },
        {
          nom: "Onglet à l’échalote",
          description: "",
          prix: "27,00",
          placeholder: false
        },
        {
          nom: "Supplément sauce au choix",
          description: "poivre, champignons, béarnaise, Sambre et Meuse, gorgonzola",
          prix: "3,00",
          placeholder: false
        }
      ]
    },
    {
      categorie: "Poissons",
      plats: [
        {
          nom: "Sole meunière",
          description: "",
          prix: "Prix du jour",
          placeholder: false
        },
        {
          nom: "Truite",
          description: "meunière, aux amandes, à la namuroise",
          prix: "25,00",
          placeholder: false
        },
        {
          nom: "Pavé de saumon",
          description: "sauce au vin blanc",
          prix: "28,00",
          placeholder: false
        },
        {
          nom: "Fish and chips",
          description: "sauce tartare",
          prix: "22,00",
          placeholder: false
        }
      ]
    },
    {
      categorie: "Desserts",
      plats: [
        {
          nom: "Mousse au chocolat",
          description: "",
          prix: "10,00",
          placeholder: false
        },
        {
          nom: "Crème brûlée",
          description: "",
          prix: "10,00",
          placeholder: false
        },
        {
          nom: "Tiramisu au Marsala",
          description: "",
          prix: "10,00",
          placeholder: false
        },
        {
          nom: "Dame blanche ou noire",
          description: "",
          prix: "11,00",
          placeholder: false
        },
        {
          nom: "Coupe brésilienne",
          description: "",
          prix: "11,00",
          placeholder: false
        },
        {
          nom: "Café glacé",
          description: "",
          prix: "11,00",
          placeholder: false
        },
        {
          nom: "Sorbets du moment",
          description: "",
          prix: "11,00",
          placeholder: false
        }
      ]
    },
    {
      categorie: "Bières pression",
      plats: [
        {
          nom: "Cristal",
          description: "",
          prix: "25 cl 3,80 · 33 cl 4,80 · 50 cl 7,50",
          placeholder: false
        },
        {
          nom: "Cristal babette",
          description: "",
          prix: "2,60",
          placeholder: false
        },
        {
          nom: "Chimay triple",
          description: "",
          prix: "5,20",
          placeholder: false
        },
        {
          nom: "St-Hubertus",
          description: "",
          prix: "4,90",
          placeholder: false
        },
        {
          nom: "Grimbergen",
          description: "",
          prix: "5,40",
          placeholder: false
        },
        {
          nom: "Mazout",
          description: "",
          prix: "3,80",
          placeholder: false
        },
        {
          nom: "Panaché",
          description: "",
          prix: "3,80",
          placeholder: false
        }
      ]
    },
    {
      categorie: "Bières en bouteille",
      plats: [
        {
          nom: "Bertinchamps triple",
          description: "",
          prix: "7,00",
          placeholder: false
        },
        {
          nom: "Blanche de Namur",
          description: "",
          prix: "4,40",
          placeholder: false
        },
        {
          nom: "Chouffe",
          description: "",
          prix: "5,50",
          placeholder: false
        },
        {
          nom: "Duvel",
          description: "",
          prix: "5,50",
          placeholder: false
        },
        {
          nom: "Houppe",
          description: "",
          prix: "25 cl 6,00 · 75 cl 15,70",
          placeholder: false
        },
        {
          nom: "Tripel Karmeliet",
          description: "",
          prix: "5,50",
          placeholder: false
        }
      ]
    },
    {
      categorie: "Trappistes",
      plats: [
        {
          nom: "Chimay bleue",
          description: "",
          prix: "6,50",
          placeholder: false
        },
        {
          nom: "Chimay dorée",
          description: "",
          prix: "6,00",
          placeholder: false
        },
        {
          nom: "Chimay rouge",
          description: "",
          prix: "6,00",
          placeholder: false
        },
        {
          nom: "Orval",
          description: "",
          prix: "6,50",
          placeholder: false
        },
        {
          nom: "Rochefort 8°",
          description: "",
          prix: "6,50",
          placeholder: false
        },
        {
          nom: "Rochefort 10°",
          description: "",
          prix: "6,90",
          placeholder: false
        },
        {
          nom: "Westmalle Tripel",
          description: "",
          prix: "6,80",
          placeholder: false
        }
      ]
    },
    {
      categorie: "Cocktails & spritz",
      plats: [
        {
          nom: "Saint-Germain Spritz",
          description: "",
          prix: "12,00",
          placeholder: false
        },
        {
          nom: "Aperol Spritz",
          description: "",
          prix: "12,00",
          placeholder: false
        },
        {
          nom: "Campari Spritz",
          description: "",
          prix: "12,00",
          placeholder: false
        },
        {
          nom: "Moscow Mule",
          description: "",
          prix: "12,00",
          placeholder: false
        },
        {
          nom: "Negroni",
          description: "",
          prix: "12,00",
          placeholder: false
        },
        {
          nom: "Sangria maison blanche ou rouge",
          description: "",
          prix: "9,50",
          placeholder: false
        }
      ]
    },
    {
      categorie: "Softs et boissons chaudes",
      plats: [
        {
          nom: "Coca-Cola",
          description: "",
          prix: "3,80",
          placeholder: false
        },
        {
          nom: "Jus d’orange",
          description: "",
          prix: "3,80",
          placeholder: false
        },
        {
          nom: "Café",
          description: "",
          prix: "3,50",
          placeholder: false
        },
        {
          nom: "Cappuccino",
          description: "",
          prix: "5,50",
          placeholder: false
        },
        {
          nom: "Chocolat chaud",
          description: "",
          prix: "5,00",
          placeholder: false
        },
        {
          nom: "Irish coffee",
          description: "",
          prix: "11,00",
          placeholder: false
        }
      ]
    }
  ],
  menus: [
    {
      nom: "Menu des fêtes patronales",
      prix: "50 € sans boissons, 65 € avec boissons",
      description: "Trois services, entrée, plat et dessert au choix. Entrées : terrine de chasse, velouté de potimarron à la châtaigne ou saumon gravlax. Plats : civet de marcassin, suprême de pintade aux pleurotes ou médaillons de sole. Desserts : omelette norvégienne, mousse au chocolat ou panna cotta caramel-noix. Avec boissons : apéritif maison, trois verres de vin, softs ou pils, café ou thé.",
      placeholder: false
    }
  ],
  histoire: [
    "La brasserie a ouvert le 13 juillet 1984, avenue Albert Ier, à l'emplacement de l'ancien café Le Sportman, près de l'hôpital Saint-Camille. Maurice Druart, que tout le monde appelle Momo, l'a lancée.",
    "Teresa, originaire de Tropea en Calabre, l'a rejoint quelques mois plus tard. Aujourd'hui associés, ils dirigent la maison ensemble : environ 120 couverts et une équipe de neuf personnes.",
    "Le chef Philippe Huens a tenu les fourneaux pendant vingt-huit ans. La carte reste celle d'une vraie brasserie : croquettes artisanales, boulettes, vol-au-vent maison, cordon bleu maison, avec la viande de Famenne et le fromage de Maredsous.",
    "Dedans, des banquettes bleu-vert, des lampes suspendues, un mur de briques sombres. Dehors, une terrasse sur l'avenue. On y vient en famille, entre amis, pour un repas qui se partage."
  ],
  equipe: [
    {
      nom: "Maurice Druart",
      role: "Fondateur, patron (« Momo »)",
      placeholder: false
    },
    {
      nom: "Teresa",
      role: "Patronne, associée",
      placeholder: false
    }
  ],
  avis: [
    {
      texte: "De caractère difficile. Je suis directe. Ceux qui viennent pour moi ont dû apprendre à m'aimer.",
      auteur: "Teresa, patronne",
      source: "La DH, 4 août 2024",
      date: "2024-08-04",
      placeholder: false
    }
  ],
  photos: [
    photo('/photos/facade.webp', "Façade de la brasserie avec sa terrasse, avenue Albert Ier", 800, 1200),
    photo('/photos/salle-baie.webp', "Salle avec banquette bleu-vert, lampes suspendues et grande baie vitrée", 800, 1200),
    photo('/photos/salle-banquette.webp', "Salle, banquette capitonnée et boiseries blanches à médaillons verts", 800, 1200),
    photo('/photos/salle-briques.webp', "Salle, mur de briques sombres, miroir cerné de vert, tables dressées", 800, 1200),
    photo('/photos/salle-tables.webp', "Tables dressées devant la banquette, verres et sets de table en cuir", 1800, 1557),
    photo('/photos/salle-lampe.webp', "Salle, banquette, table dressée et suspension", 800, 1200),
    photo('/photos/plat-frites.webp', "Plat en sauce crémeuse aux champignons et câpres, servi avec des frites", 800, 1200),
    photo('/photos/casserole-vapeur.webp', "Casserole fumante de moules, verre de bière Chimay au premier plan", 800, 1200),
    photo('/photos/biere-pression.webp', "Bière tirée à la pression dans un verre Chimay", 800, 1200),
    photo('/photos/spritz-terrasse.webp', "Spritz à la terrasse, assiette au premier plan", 800, 1200),
    photo('/photos/menu-lecture.webp', "Cliente lisant la carte à la couverture « Menu »", 800, 1200),
    photo('/photos/menu-table.webp', "Carte et carte des vins posées sur la table", 800, 1200),
    photo('/photos/mascotte-bouteille.webp', "Illustration du serveur portant une bouteille, mascotte de la maison", 1721, 1135),
    photo('/photos/mascotte-orange.webp', "Illustration du serveur, version orange, mascotte de la maison", 1208, 1122),
  ],
  valeurs: [
    "Produits frais et tradition avec une touche de nouveauté",
    "Viande de Famenne, fromage de Maredsous, Gin et Houppe de Namur",
    "Une brasserie familiale et conviviale, inspirée des bistrots parisiens"
  ]
};

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

// ---------------------------------------------------------------------------------------------
// Contenu propre au gabarit « Guinguette ». Tout ce qui n'est pas prouvé par dossier.md porte un
// drapeau `placeholder: true` et une marque visible là où il s'affiche.
// ---------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------
// Contenu propre au gabarit « Guinguette », adapté à Champs Elysées. Tout ce qui n'est pas prouvé
// par dossier.md porte `placeholder: true` ; sinon la donnée est retirée.
// ---------------------------------------------------------------------------------------------

export type ObjetId = 'frites' | 'fourchette' | 'verre' | 'parasol' | 'bouteille' | 'citron';
export interface Objet { id: ObjetId; label: string; x: number; y: number; r: number; taille: number; mobile: boolean; mx?: number }
export interface Tirage { src: string; alt: string; x: number; y: number; r: number; legende: string; placeholder: boolean }
export interface Picto { categorie: string; picto: ObjetId }

export const guinguette = {
  /** Titre : « Plaisir et partage », formule du site actuel. Slogan : la baseline réelle. */
  heroTitre: ['Plaisir', 'et partage'],
  slogan: { texte: 'bistro convivial, ouvert 7 jours sur 7', placeholder: false },
  objets: [
    { id: 'parasol', label: 'Parasol dessiné au trait', x: 6, y: 10, r: -12, taille: 150, mobile: true, mx: 4 },
    { id: 'verre', label: 'Verre à pied dessiné au trait', x: 84, y: 8, r: 10, taille: 110, mobile: false },
    { id: 'frites', label: 'Cornet de frites dessiné au trait', x: 10, y: 66, r: 8, taille: 130, mobile: true, mx: 40 },
    { id: 'fourchette', label: 'Fourchette dessinée au trait', x: 30, y: 78, r: -40, taille: 120, mobile: false },
    { id: 'bouteille', label: 'Bouteille dessinée au trait', x: 80, y: 60, r: 14, taille: 140, mobile: true, mx: 74 },
    { id: 'citron', label: 'Citron coupé dessiné au trait', x: 62, y: 82, r: -6, taille: 90, mobile: false },
  ] as Objet[],
  /** La table : 12 tirages à cadre blanc, photos réelles du restaurant, légendes tirées du champ `sujet`. */
  tirages: [
    { src: '/photos/facade.webp', alt: "Façade de la brasserie avec sa terrasse, avenue Albert Ier", x: 4, y: 6, r: -7, legende: "La façade", placeholder: false },
    { src: '/photos/salle-baie.webp', alt: "Salle avec banquette bleu-vert, lampes suspendues et grande baie vitrée", x: 22, y: 2, r: 5, legende: "La baie vitrée", placeholder: false },
    { src: '/photos/plat-frites.webp', alt: "Plat en sauce crémeuse aux champignons et câpres, servi avec des frites", x: 42, y: 4, r: -3, legende: "Un plat et ses frites", placeholder: false },
    { src: '/photos/spritz-terrasse.webp', alt: "Spritz à la terrasse, assiette au premier plan", x: 62, y: 3, r: 8, legende: "Spritz en terrasse", placeholder: false },
    { src: '/photos/biere-pression.webp', alt: "Bière tirée à la pression dans un verre Chimay", x: 80, y: 8, r: -5, legende: "Une pression", placeholder: false },
    { src: '/photos/menu-table.webp', alt: "Carte et carte des vins posées sur la table", x: 2, y: 44, r: 6, legende: "La carte et les vins", placeholder: false },
    { src: '/photos/salle-tables.webp', alt: "Tables dressées devant la banquette, verres et sets de table en cuir", x: 20, y: 52, r: -9, legende: "Tables dressées", placeholder: false },
    { src: '/photos/casserole-vapeur.webp', alt: "Casserole fumante de moules, verre de bière Chimay au premier plan", x: 40, y: 48, r: 4, legende: "La casserole fumante", placeholder: false },
    { src: '/photos/salle-lampe.webp', alt: "Salle, banquette, table dressée et suspension", x: 58, y: 54, r: -6, legende: "Sous les suspensions", placeholder: false },
    { src: '/photos/menu-lecture.webp', alt: "Cliente lisant la carte à la couverture « Menu »", x: 78, y: 50, r: 7, legende: "On lit la carte", placeholder: false },
    { src: '/photos/salle-banquette.webp', alt: "Salle, banquette capitonnée et boiseries blanches à médaillons verts", x: 12, y: 26, r: 3, legende: "La banquette", placeholder: false },
    { src: '/photos/salle-briques.webp', alt: "Salle, mur de briques sombres, miroir cerné de vert, tables dressées", x: 68, y: 28, r: -4, legende: "Le mur de briques", placeholder: false },
  ] as Tirage[],
  pictos: [
    { categorie: 'À partager', picto: 'fourchette' },
    { categorie: 'Entrées', picto: 'citron' },
    { categorie: 'Salades', picto: 'citron' },
    { categorie: 'Plats végétariens', picto: 'citron' },
    { categorie: 'Plats brasserie', picto: 'frites' },
    { categorie: 'Pâtes', picto: 'fourchette' },
    { categorie: 'Les djônes', picto: 'parasol' },
    { categorie: 'Viandes', picto: 'fourchette' },
    { categorie: 'Poissons', picto: 'citron' },
    { categorie: 'Desserts', picto: 'parasol' },
    { categorie: 'Bières pression', picto: 'verre' },
    { categorie: 'Bières en bouteille', picto: 'bouteille' },
    { categorie: 'Trappistes', picto: 'bouteille' },
    { categorie: 'Cocktails', picto: 'verre' },
    { categorie: 'Softs', picto: 'bouteille' },
  ] as Picto[],
  /** Catégories montrées sur l'accueil (la carte complète est sur /carte/). */
  extraitAccueil: ['Entrées', 'Plats brasserie', 'Desserts'],
  /** Presse : seule matière « avis » prouvée (La DH, 04/08/2024). */
  presse: {
    media: 'La DH',
    date: '4 août 2024',
    titre: 'Namur : Teresa et Maurice chauffent la brasserie des Champs Élysées depuis 40 ans',
    url: "https://www.dhnet.be/regions/namur/2024/08/04/namur-teresa-et-maurice-chauffent-la-brasserie-des-champs-elysees-depuis-40-ans-YJEUDRBMBJDEPLM6NMVO3A5RIE/",
    platsCites: ['croque-monsieur gratiné', 'vol-au-vent', 'boulettes sauce tomate', 'filet américain-frites'],
  },
  /** Terrasse : une terrasse sur l'avenue est visible sur les photos ; nombre de places et horaires dédiés inconnus. */
  terrasse: {
    connue: true,
    placeholder: false,
    texte: "Une terrasse donne sur l'avenue Albert Ier.",
  },
  fetes: { groupesTelephone: 'Pour toute réservation de plus de 10 personnes, contactez le restaurant par téléphone.' },
  manifeste: {
    titre: ['Produits frais,', 'tradition et nouveauté'],
    motItalique: 'nouveauté',
    texte: "Une brasserie moderne et contemporaine, inspirée des bistrots parisiens, familiale et conviviale. Bœuf de Famenne, fromage de Maredsous, Gin et Houppe de Namur : la région est dans l'assiette.",
  },
  finale: 'À table !',
};

/** Vrai si l'heure donnée (HH:MM) est dans un créneau. */
export const estOuvert = (h: Horaire, hhmm: string) => h.creneaux.some((c) => c.ouverture <= hhmm && hhmm < c.fermeture);
