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
  "slug": "oh-la-vache",
  "nom": "Oh la Vache !",
  "baseline": "Resto grill, cuisine française et italienne : fondues, pierrades, raclettes. Ouvert 7 jours sur 7 à Erpent.",
  "description": "Oh la Vache !, resto grill à Erpent (Namur) : fondues, pierrades, raclette, viandes grillées, burgers Angus et 13 gin'to. Terrasse, ouvert 7j/7.",
  "url": "https://ohlavache-erpent.be",
  "typeCuisine": "Grill, cuisine française et italienne",
  "adresse": {
    "rue": "Chaussée de Marche",
    "numero": "581",
    "cp": "5101",
    "commune": "Erpent (Namur)",
    "pays": "BE"
  },
  "geo": {
    "lat": 50.4410675,
    "lon": 4.9068745
  },
  "telephone": "+32 494 29 44 72",
  "email": {
    "valeur": "",
    "placeholder": true
  },
  "reservation": {
    "outil": "Téléphone",
    "url": "tel:+32494294472"
  },
  "horaires": [
    {
      "jour": "lundi",
      "creneaux": [
        {
          "ouverture": "11:00",
          "fermeture": "22:30"
        }
      ]
    },
    {
      "jour": "mardi",
      "creneaux": [
        {
          "ouverture": "11:00",
          "fermeture": "22:30"
        }
      ]
    },
    {
      "jour": "mercredi",
      "creneaux": [
        {
          "ouverture": "11:00",
          "fermeture": "22:30"
        }
      ]
    },
    {
      "jour": "jeudi",
      "creneaux": [
        {
          "ouverture": "11:00",
          "fermeture": "22:30"
        }
      ]
    },
    {
      "jour": "vendredi",
      "creneaux": [
        {
          "ouverture": "11:00",
          "fermeture": "23:45"
        }
      ]
    },
    {
      "jour": "samedi",
      "creneaux": [
        {
          "ouverture": "11:00",
          "fermeture": "23:45"
        }
      ]
    },
    {
      "jour": "dimanche",
      "creneaux": [
        {
          "ouverture": "11:00",
          "fermeture": "23:45"
        }
      ]
    }
  ],
  "reseaux": [
    {
      "nom": "Facebook",
      "url": "https://www.facebook.com/restoohlavache/"
    },
    {
      "nom": "Instagram",
      "url": "https://www.instagram.com/resto_oh_la_vache/"
    }
  ],
  "carte": [
    {
      "categorie": "Entrées froides",
      "plats": [
        {
          "nom": "Le carpaccio de bœuf",
          "description": "crème balsamique, pignons de pin, copeaux de parmesan",
          "prix": "17,90 €",
          "placeholder": false
        },
        {
          "nom": "Le carpaccio de bœuf fumé Holstein",
          "description": "",
          "prix": "20,40 €",
          "placeholder": false
        },
        {
          "nom": "La pêche ou tomate au thon",
          "description": "",
          "prix": "16,50 €",
          "placeholder": false
        },
        {
          "nom": "La tomate aux crevettes grises",
          "description": "",
          "prix": "19,90 €",
          "placeholder": false
        },
        {
          "nom": "Le saumon fumé et ses petits toasts grillés",
          "description": "",
          "prix": "21,70 €",
          "placeholder": false
        },
        {
          "nom": "L'assiette d'antipasti",
          "description": "",
          "prix": "16,90 €",
          "placeholder": false
        },
        {
          "nom": "L'assiette de foie gras et son verre de Moelleux",
          "description": "",
          "prix": "21,50 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Entrées chaudes",
      "plats": [
        {
          "nom": "Pain à l'ail",
          "description": "",
          "prix": "4,50 €",
          "placeholder": false
        },
        {
          "nom": "Pain à l'ail et mozzarella",
          "description": "",
          "prix": "5,50 €",
          "placeholder": false
        },
        {
          "nom": "Le toast champignons crème",
          "description": "avec ail si souhaité",
          "prix": "16,50 €",
          "placeholder": false
        },
        {
          "nom": "Le duo de croquettes au parmesan",
          "description": "",
          "prix": "17,90 €",
          "placeholder": false
        },
        {
          "nom": "Le duo de croquettes aux crevettes grises",
          "description": "",
          "prix": "18,70 €",
          "placeholder": false
        },
        {
          "nom": "La frisée aux lardons",
          "description": "",
          "prix": "18,50 €",
          "placeholder": false
        },
        {
          "nom": "Les gambas grillées",
          "description": "",
          "prix": "19,00 €",
          "placeholder": false
        },
        {
          "nom": "La noix saint jacques gratinée",
          "description": "",
          "prix": "18,90 €",
          "placeholder": false
        },
        {
          "nom": "Les cuisses de grenouilles panées à l'ail crème ou beurre à l'ail",
          "description": "",
          "prix": "18,50 €",
          "placeholder": false
        },
        {
          "nom": "La brochette de scampis grillés et sa sauce tartare",
          "description": "",
          "prix": "18,50 €",
          "placeholder": false
        },
        {
          "nom": "Les scampis à l'indienne",
          "description": "",
          "prix": "18,50 €",
          "placeholder": false
        },
        {
          "nom": "Les scampis à l'ail crème",
          "description": "",
          "prix": "18,50 €",
          "placeholder": false
        },
        {
          "nom": "Les calamars diaboliques",
          "description": "",
          "prix": "17,90 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Petite restauration",
      "plats": [
        {
          "nom": "Le croque-monsieur",
          "description": "",
          "prix": "17,00 €",
          "placeholder": false
        },
        {
          "nom": "Le croque Hawaï",
          "description": "",
          "prix": "18,00 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Plats enfants (avec 1 boule de glace)",
      "plats": [
        {
          "nom": "La boulette tomate",
          "description": "",
          "prix": "13,90 €",
          "placeholder": false
        },
        {
          "nom": "Le vol au vent",
          "description": "",
          "prix": "13,90 €",
          "placeholder": false
        },
        {
          "nom": "La penne bolognaise",
          "description": "",
          "prix": "13,90 €",
          "placeholder": false
        },
        {
          "nom": "Les pennes jambon crème",
          "description": "",
          "prix": "13,90 €",
          "placeholder": false
        },
        {
          "nom": "L'assiette chicken nuggets",
          "description": "",
          "prix": "13,90 €",
          "placeholder": false
        },
        {
          "nom": "L'assiette fricadelle",
          "description": "",
          "prix": "13,90 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Poissons",
      "plats": [
        {
          "nom": "La cassolette de noix de saint Jacques, scampis et crevettes",
          "description": "petits légumes flambés, crème tomatée gratinée",
          "prix": "28,90 €",
          "placeholder": false
        },
        {
          "nom": "Le dos de cabillaud sauce crème et fines herbes",
          "description": "",
          "prix": "28,70 €",
          "placeholder": false
        },
        {
          "nom": "La lotte au poivre",
          "description": "",
          "prix": "28,00 €",
          "placeholder": false
        },
        {
          "nom": "La sole façon meunière",
          "description": "",
          "prix": "Prix du jour",
          "placeholder": false
        },
        {
          "nom": "Le tournedos de saumon sauce choron",
          "description": "",
          "prix": "26,70 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Nos plats",
      "plats": [
        {
          "nom": "Le jambonneau à l'ancienne ou sauce roquefort",
          "description": "",
          "prix": "25,90 €",
          "placeholder": false
        },
        {
          "nom": "Les boulettes maison sauce tomate ou sauce lapin",
          "description": "",
          "prix": "19,50 €",
          "placeholder": false
        },
        {
          "nom": "Le filet américain maison",
          "description": "haché minute",
          "prix": "22,70 €",
          "placeholder": false
        },
        {
          "nom": "Le tartare à l'italienne",
          "description": "haché minute",
          "prix": "25,80 €",
          "placeholder": false
        },
        {
          "nom": "Le camembert chaud",
          "description": "pommes de terre grenaille, sirop de liège, salade, charcuterie",
          "prix": "21,50 €",
          "placeholder": false
        },
        {
          "nom": "Le vol au vent maison",
          "description": "",
          "prix": "21,70 €",
          "placeholder": false
        },
        {
          "nom": "La blanquette de veau maison",
          "description": "",
          "prix": "24,50 €",
          "placeholder": false
        },
        {
          "nom": "Le chicon au gratin du chef",
          "description": "",
          "prix": "21,90 €",
          "placeholder": false
        },
        {
          "nom": "La brochette de poulet grillé",
          "description": "",
          "prix": "21,90 €",
          "placeholder": false
        },
        {
          "nom": "La tranche de jambon grillée",
          "description": "sauce béarnaise",
          "prix": "24,50 €",
          "placeholder": false
        },
        {
          "nom": "Lapin à la Leffe",
          "description": "",
          "prix": "24,90 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Spécialités fondues, pierrades de bœuf et raclette",
      "plats": [
        {
          "nom": "La fondue bourguignonne",
          "description": "min. 2 couverts ; frites, crudités et 4 sauces froides maison ; supplément viande 10 €",
          "prix": "25,90 € / pers.",
          "placeholder": false
        },
        {
          "nom": "La fondue savoyarde",
          "description": "min. 2 couverts ; pain, crudités et charcuteries",
          "prix": "26,50 € / pers.",
          "placeholder": false
        },
        {
          "nom": "La pierrade mixte",
          "description": "min. 2 couverts ; bœuf, merguez, poulet ; frites, crudités et 4 sauces froides maison",
          "prix": "29,00 € / pers.",
          "placeholder": false
        },
        {
          "nom": "La pierrade de bœuf",
          "description": "morceau de viande cuit sur pierre à table ; 4 sauces froides maison",
          "prix": "27,50 €",
          "placeholder": false
        },
        {
          "nom": "La raclette",
          "description": "min. 2 couverts ; pommes grenaille, crudités et charcuteries",
          "prix": "25,00 € / pers.",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Nos viandes",
      "plats": [
        {
          "nom": "Les côtes d'agneau grillées",
          "description": "",
          "prix": "26,90 €",
          "placeholder": false
        },
        {
          "nom": "La carbonnade à la Leffe",
          "description": "",
          "prix": "22,50 €",
          "placeholder": false
        },
        {
          "nom": "Le magret de canard sauce poivre",
          "description": "",
          "prix": "31,00 €",
          "placeholder": false
        },
        {
          "nom": "La langue de bœuf sauce Madère",
          "description": "",
          "prix": "24,90 €",
          "placeholder": false
        },
        {
          "nom": "La poêlée de filet pur à la mexicaine",
          "description": "",
          "prix": "26,90 €",
          "placeholder": false
        },
        {
          "nom": "L'osso bucco",
          "description": "",
          "prix": "28,50 €",
          "placeholder": false
        },
        {
          "nom": "Les spare ribs",
          "description": "",
          "prix": "24,90 €",
          "placeholder": false
        },
        {
          "nom": "Les minis brochettes d'agneau",
          "description": "salade grecque, tzatziki et pommes de terre grenaille aux herbes",
          "prix": "29,70 €",
          "placeholder": false
        },
        {
          "nom": "L'assiette mixte grill",
          "description": "bœuf, agneau, lard, saucisse, merguez, poulet",
          "prix": "31,00 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Bœuf",
      "plats": [
        {
          "nom": "Le steak de bœuf",
          "description": "",
          "prix": "25,90 €",
          "placeholder": false
        },
        {
          "nom": "Le filet pur de bœuf",
          "description": "",
          "prix": "30,90 €",
          "placeholder": false
        },
        {
          "nom": "Le filet pur Irlandais",
          "description": "",
          "prix": "37,80 €",
          "placeholder": false
        },
        {
          "nom": "Le filet pur Rossini",
          "description": "",
          "prix": "35,50 €",
          "placeholder": false
        },
        {
          "nom": "La brochette de bœuf maison",
          "description": "bœuf enrobé de lard, oignons, poivron",
          "prix": "29,50 €",
          "placeholder": false
        },
        {
          "nom": "L'entrecôte de bœuf",
          "description": "",
          "prix": "29,00 €",
          "placeholder": false
        },
        {
          "nom": "L'entrecôte Rib Eye Argentine Grass-fed",
          "description": "",
          "prix": "31,00 €",
          "placeholder": false
        },
        {
          "nom": "L'entrecôte Irlandaise",
          "description": "",
          "prix": "28,90 €",
          "placeholder": false
        },
        {
          "nom": "La côte à l'os",
          "description": "",
          "prix": "33,90 €",
          "placeholder": false
        },
        {
          "nom": "La tagliata de bœuf",
          "description": "huile de truffe blanche, roquette et copeaux de parmesan",
          "prix": "29,50 €",
          "placeholder": false
        },
        {
          "nom": "Le Tomahawk",
          "description": "+/- 1,3 kg, 2 personnes",
          "prix": "88,00 €",
          "placeholder": false
        },
        {
          "nom": "Nos sauces",
          "description": "poivre, champignons crème, béarnaise, choron, échalote, roquefort, diabolique, Sambre et Meuse, chasseur",
          "prix": "3,90 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Burgers",
      "plats": [
        {
          "nom": "Le burger maison (Angus beef)",
          "description": "viande de bœuf, roquette, oignons, tomate, cheddar, bacon, sauce Giant",
          "prix": "19,90 €",
          "placeholder": false
        },
        {
          "nom": "Le burger Charolais",
          "description": "viande charolaise, fromage Maredsous, salade, tomate, oignons et sa sauce maison",
          "prix": "19,90 €",
          "placeholder": false
        },
        {
          "nom": "Le chicken burger",
          "description": "poulet, pesto, roquette, parmesan, tomates séchées, pignon de pin, oignons",
          "prix": "18,90 €",
          "placeholder": false
        },
        {
          "nom": "Le burger Rossini (Angus beef)",
          "description": "pain brioché, viande de bœuf, foie gras, confit d'oignons, salade",
          "prix": "22,90 €",
          "placeholder": false
        },
        {
          "nom": "Le burger Savoyard (Angus beef)",
          "description": "viande de bœuf, fromage raclette, croquette de pomme de terre, salade, tomate, oignons, sauce maison",
          "prix": "21,50 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Nos escalopes",
      "plats": [
        {
          "nom": "L'escalope de veau du chef",
          "description": "oignons, lardon, ail, champignons crème tomatée, gratinée",
          "prix": "24,70 €",
          "placeholder": false
        },
        {
          "nom": "L'escalope de veau mamamia",
          "description": "sauce tomate, poivron, oignons, ail, gratinée",
          "prix": "24,70 €",
          "placeholder": false
        },
        {
          "nom": "L'escalope de veau maison",
          "description": "jambon, champignons crème gratinée",
          "prix": "24,70 €",
          "placeholder": false
        },
        {
          "nom": "L'escalope de veau tomate fraîches mozzarella",
          "description": "sauce tomate, tomate, mozzarella gratinée",
          "prix": "24,70 €",
          "placeholder": false
        },
        {
          "nom": "L'escalope de poulet miel & moutarde",
          "description": "escalopine de poulet, jambon de Parme, sauce miel-moutarde, gratinée",
          "prix": "23,70 €",
          "placeholder": false
        },
        {
          "nom": "L'escalope de veau pizzaïola",
          "description": "sauce tomate, ail, câpres, anchois, gratinée",
          "prix": "24,70 €",
          "placeholder": false
        },
        {
          "nom": "L'escalope de poulet panée maison",
          "description": "jambon, champignons crème gratinée",
          "prix": "23,70 €",
          "placeholder": false
        },
        {
          "nom": "L'escalope de veau milanaise",
          "description": "",
          "prix": "21,70 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Nos pâtes",
      "plats": [
        {
          "nom": "Les linguines bolo maison",
          "description": "",
          "prix": "17,90 €",
          "placeholder": false
        },
        {
          "nom": "Les linguines napoli",
          "description": "bolo, ail, crème",
          "prix": "18,50 €",
          "placeholder": false
        },
        {
          "nom": "Les linguines jambon crème",
          "description": "",
          "prix": "18,50 €",
          "placeholder": false
        },
        {
          "nom": "Les linguines carbonara",
          "description": "",
          "prix": "19,50 €",
          "placeholder": false
        },
        {
          "nom": "Les tortellinis jambon fumé & sa sauce crème boursin",
          "description": "",
          "prix": "20,50 €",
          "placeholder": false
        },
        {
          "nom": "Les linguines scampis à l'ail et huile d'olives",
          "description": "",
          "prix": "21,70 €",
          "placeholder": false
        },
        {
          "nom": "Les linguines scampis sauce tomate à l'ail",
          "description": "",
          "prix": "22,70 €",
          "placeholder": false
        },
        {
          "nom": "Les linguines fruits de mer",
          "description": "",
          "prix": "22,70 €",
          "placeholder": false
        },
        {
          "nom": "Les linguines au saumon",
          "description": "",
          "prix": "23,50 €",
          "placeholder": false
        },
        {
          "nom": "Les pennes 4 fromages",
          "description": "",
          "prix": "19,50 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Nos salades",
      "plats": [
        {
          "nom": "La salade végétarienne",
          "description": "salade et crudités du moment",
          "prix": "16,90 €",
          "placeholder": false
        },
        {
          "nom": "L'Hollandaise",
          "description": "salade, crudités, dés de fromage et jambon",
          "prix": "18,40 €",
          "placeholder": false
        },
        {
          "nom": "L'Hawaïenne",
          "description": "salade, crudités, jambon, ananas, maïs, poulet",
          "prix": "18,90 €",
          "placeholder": false
        },
        {
          "nom": "La salade de poulet grillé",
          "description": "sauce curry",
          "prix": "21,70 €",
          "placeholder": false
        },
        {
          "nom": "La Grecque",
          "description": "salade, crudités, féta, olives, oignons, poivrons",
          "prix": "18,90 €",
          "placeholder": false
        },
        {
          "nom": "Le chèvre chaud",
          "description": "salade, crudités, chèvres, lardons, pomme, miel",
          "prix": "21,70 €",
          "placeholder": false
        },
        {
          "nom": "La Niçoise",
          "description": "salade, crudités, thon, olives, oignons, poivrons, anchois",
          "prix": "18,90 €",
          "placeholder": false
        },
        {
          "nom": "La frisée aux lardons",
          "description": "frites ou pommes de terre",
          "prix": "22,70 €",
          "placeholder": false
        },
        {
          "nom": "La norvégienne",
          "description": "salade, crudités, saumon fumé, truite fumée, filet de hareng, anchois, crevettes, oignons",
          "prix": "23,40 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Glaces",
      "plats": [
        {
          "nom": "La dame blanche",
          "description": "",
          "prix": "9,80 €",
          "placeholder": false
        },
        {
          "nom": "La dame noir",
          "description": "",
          "prix": "9,80 €",
          "placeholder": false
        },
        {
          "nom": "La brésilienne",
          "description": "",
          "prix": "9,80 €",
          "placeholder": false
        },
        {
          "nom": "La coupe cuberdon",
          "description": "",
          "prix": "10,80 €",
          "placeholder": false
        },
        {
          "nom": "La coupe spéculoos",
          "description": "",
          "prix": "10,40 €",
          "placeholder": false
        },
        {
          "nom": "Le chocolat liégeois",
          "description": "",
          "prix": "9,80 €",
          "placeholder": false
        },
        {
          "nom": "Le café liégeois",
          "description": "",
          "prix": "11,50 €",
          "placeholder": false
        },
        {
          "nom": "Le banana split",
          "description": "",
          "prix": "11,50 €",
          "placeholder": false
        },
        {
          "nom": "Le parfait aux fraises (en saison)",
          "description": "",
          "prix": "12,90 €",
          "placeholder": false
        },
        {
          "nom": "Sorbet passion, citron vert, framboise, coco ou pomme",
          "description": "",
          "prix": "9,00 €",
          "placeholder": false
        },
        {
          "nom": "Le colonel",
          "description": "",
          "prix": "7,90 €",
          "placeholder": false
        },
        {
          "nom": "Boule de glace",
          "description": "2 boules 5.90 ; chantilly 1.40",
          "prix": "3,20 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Nos desserts Vachement bon !",
      "plats": [
        {
          "nom": "La gaufre au sucre",
          "description": "",
          "prix": "7,00 €",
          "placeholder": false
        },
        {
          "nom": "La gaufre chantilly",
          "description": "",
          "prix": "8,00 €",
          "placeholder": false
        },
        {
          "nom": "La gaufre Nutella",
          "description": "",
          "prix": "9,00 €",
          "placeholder": false
        },
        {
          "nom": "La crêpe au sucre",
          "description": "",
          "prix": "7,00 €",
          "placeholder": false
        },
        {
          "nom": "La crêpe Nutella",
          "description": "",
          "prix": "8,50 €",
          "placeholder": false
        },
        {
          "nom": "La crêpe Kinder bueno",
          "description": "",
          "prix": "9,50 €",
          "placeholder": false
        },
        {
          "nom": "La crêpe mikado",
          "description": "",
          "prix": "9,50 €",
          "placeholder": false
        },
        {
          "nom": "Le tartufo nero",
          "description": "",
          "prix": "9,50 €",
          "placeholder": false
        },
        {
          "nom": "La mousse au chocolat",
          "description": "",
          "prix": "8,90 €",
          "placeholder": false
        },
        {
          "nom": "Le tiramisu spéculoos",
          "description": "",
          "prix": "8,90 €",
          "placeholder": false
        },
        {
          "nom": "La crème brûlée",
          "description": "",
          "prix": "8,50 €",
          "placeholder": false
        },
        {
          "nom": "Le bavarois framboise",
          "description": "",
          "prix": "8,00 €",
          "placeholder": false
        },
        {
          "nom": "Le café gourmand",
          "description": "5 pièces",
          "prix": "12,90 €",
          "placeholder": false
        },
        {
          "nom": "La coco givrée",
          "description": "",
          "prix": "10,50 €",
          "placeholder": false
        },
        {
          "nom": "L'orange givrée",
          "description": "",
          "prix": "10,50 €",
          "placeholder": false
        },
        {
          "nom": "La tarte tatin",
          "description": "",
          "prix": "9,70 €",
          "placeholder": false
        },
        {
          "nom": "Le nougat glacé",
          "description": "",
          "prix": "9,50 €",
          "placeholder": false
        },
        {
          "nom": "Le fondant chocolat",
          "description": "",
          "prix": "8,90 €",
          "placeholder": false
        },
        {
          "nom": "Le fondant caramel",
          "description": "",
          "prix": "9,50 €",
          "placeholder": false
        },
        {
          "nom": "Le fondant Baileys",
          "description": "",
          "prix": "10,50 €",
          "placeholder": false
        },
        {
          "nom": "L'assiette de fromage",
          "description": "",
          "prix": "11,00 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Cafés et pousse-café",
      "plats": [
        {
          "nom": "Expresso",
          "description": "",
          "prix": "3,20 €",
          "placeholder": false
        },
        {
          "nom": "Café / décaféiné",
          "description": "",
          "prix": "3,20 €",
          "placeholder": false
        },
        {
          "nom": "Cappuccino",
          "description": "",
          "prix": "3,70 €",
          "placeholder": false
        },
        {
          "nom": "Thé / thé menthe fraîche",
          "description": "",
          "prix": "3,70 / 4,70 €",
          "placeholder": false
        },
        {
          "nom": "Latte macchiato",
          "description": "aromatisés : noisette, vanille, spéculoos, caramel",
          "prix": "4,70 €",
          "placeholder": false
        },
        {
          "nom": "Irish Coffee",
          "description": "",
          "prix": "9,50 €",
          "placeholder": false
        },
        {
          "nom": "Italian / French / Baileys Coffee",
          "description": "",
          "prix": "10,00 €",
          "placeholder": false
        },
        {
          "nom": "Cognac Bisquit",
          "description": "",
          "prix": "9,00 €",
          "placeholder": false
        },
        {
          "nom": "Amaretto",
          "description": "",
          "prix": "7,50 €",
          "placeholder": false
        },
        {
          "nom": "Poire Williams",
          "description": "",
          "prix": "9,00 €",
          "placeholder": false
        },
        {
          "nom": "Chartreuse",
          "description": "",
          "prix": "10,00 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Apéritifs",
      "plats": [
        {
          "nom": "Spécial maison coco-curaçao-ananas",
          "description": "",
          "prix": "9,40 €",
          "placeholder": false
        },
        {
          "nom": "Martini « Royal » blanc-rosé",
          "description": "",
          "prix": "8,40 €",
          "placeholder": false
        },
        {
          "nom": "Martini blanc-rouge",
          "description": "",
          "prix": "7,00 €",
          "placeholder": false
        },
        {
          "nom": "Apéritif de Namur",
          "description": "",
          "prix": "7,50 €",
          "placeholder": false
        },
        {
          "nom": "Porto blanc-rouge",
          "description": "",
          "prix": "7,00 €",
          "placeholder": false
        },
        {
          "nom": "Kir / Kir royal",
          "description": "",
          "prix": "6,90 / 11,90 €",
          "placeholder": false
        },
        {
          "nom": "Spritz",
          "description": "",
          "prix": "9,80 €",
          "placeholder": false
        },
        {
          "nom": "Picon nature ou vin blanc",
          "description": "",
          "prix": "5,90 / 7,90 €",
          "placeholder": false
        },
        {
          "nom": "Funny pêche ou pisang (sans alcool)",
          "description": "",
          "prix": "5,00 €",
          "placeholder": false
        },
        {
          "nom": "Sanbitter (sans alcool)",
          "description": "",
          "prix": "5,00 €",
          "placeholder": false
        },
        {
          "nom": "Lillet",
          "description": "",
          "prix": "10,80 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Bières",
      "plats": [
        {
          "nom": "Jupiler",
          "description": "",
          "prix": "3,20 €",
          "placeholder": false
        },
        {
          "nom": "Jupiler 0%",
          "description": "",
          "prix": "3,00 €",
          "placeholder": false
        },
        {
          "nom": "Ciney blonde ou brune",
          "description": "",
          "prix": "4,20 €",
          "placeholder": false
        },
        {
          "nom": "Leffe blonde ou brune",
          "description": "",
          "prix": "4,90 €",
          "placeholder": false
        },
        {
          "nom": "Duvel",
          "description": "",
          "prix": "5,00 €",
          "placeholder": false
        },
        {
          "nom": "Westmalle triple",
          "description": "",
          "prix": "5,50 €",
          "placeholder": false
        },
        {
          "nom": "Chimay rouge",
          "description": "",
          "prix": "5,50 €",
          "placeholder": false
        },
        {
          "nom": "Chimay triple",
          "description": "",
          "prix": "5,00 €",
          "placeholder": false
        },
        {
          "nom": "Chimay bleue",
          "description": "",
          "prix": "5,50 €",
          "placeholder": false
        },
        {
          "nom": "Carlsberg",
          "description": "",
          "prix": "4,00 €",
          "placeholder": false
        },
        {
          "nom": "Liefmans",
          "description": "",
          "prix": "4,90 €",
          "placeholder": false
        },
        {
          "nom": "Hoegaarden blanche",
          "description": "",
          "prix": "4,20 €",
          "placeholder": false
        },
        {
          "nom": "Hoegaarden rosé ou rosé 0%",
          "description": "",
          "prix": "4,90 €",
          "placeholder": false
        },
        {
          "nom": "Orval",
          "description": "",
          "prix": "5,90 €",
          "placeholder": false
        },
        {
          "nom": "Cubanisto",
          "description": "",
          "prix": "5,50 €",
          "placeholder": false
        },
        {
          "nom": "Houppe",
          "description": "",
          "prix": "5,70 €",
          "placeholder": false
        },
        {
          "nom": "Houppe « Jambes en l'air »",
          "description": "",
          "prix": "5,50 €",
          "placeholder": false
        },
        {
          "nom": "Houppe « Brewrocks »",
          "description": "",
          "prix": "5,90 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Limonades et softs",
      "plats": [
        {
          "nom": "Pepsi / Pepsi Max / 7Up / Mirinda orange / Ace",
          "description": "Ace 3.60",
          "prix": "3,40 €",
          "placeholder": false
        },
        {
          "nom": "Gini",
          "description": "",
          "prix": "3,70 €",
          "placeholder": false
        },
        {
          "nom": "Orangina / Oasis",
          "description": "",
          "prix": "3,80 €",
          "placeholder": false
        },
        {
          "nom": "Ice tea / Ice tea green ou pêche",
          "description": "",
          "prix": "3,60 €",
          "placeholder": false
        },
        {
          "nom": "Villers pétillante ou plate 20cl",
          "description": "",
          "prix": "3,20 €",
          "placeholder": false
        },
        {
          "nom": "Villers pétillante ou plate 50cl",
          "description": "",
          "prix": "5,60 €",
          "placeholder": false
        },
        {
          "nom": "San Pellegrino acqua tonica",
          "description": "",
          "prix": "3,80 €",
          "placeholder": false
        },
        {
          "nom": "San Pellegrino limonata",
          "description": "",
          "prix": "3,90 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Cocktails",
      "plats": [
        {
          "nom": "« Oh la vache ! »",
          "description": "vodka, amaretto, jus d'ananas, energy drink",
          "prix": "11,50 €",
          "placeholder": false
        },
        {
          "nom": "Cocktail sans alcool",
          "description": "jus d'orange, jus d'ananas, sirop de fraise",
          "prix": "8,90 €",
          "placeholder": false
        },
        {
          "nom": "Gin « Barbe à papa »",
          "description": "Gin Gordon rose, infusion fruits rouges, limonade à la rose, barbe à papa",
          "prix": "14,50 €",
          "placeholder": false
        },
        {
          "nom": "Mojito",
          "description": "",
          "prix": "10,80 €",
          "placeholder": false
        },
        {
          "nom": "Mojito fraise",
          "description": "",
          "prix": "11,80 €",
          "placeholder": false
        },
        {
          "nom": "Sangria blanche ou rouge",
          "description": "",
          "prix": "8,90 €",
          "placeholder": false
        },
        {
          "nom": "La coupe de Cava",
          "description": "",
          "prix": "7,90 €",
          "placeholder": false
        },
        {
          "nom": "La coupe de champagne « Gobillard »",
          "description": "",
          "prix": "11,00 €",
          "placeholder": false
        },
        {
          "nom": "Daïquiri fraise/framboise",
          "description": "",
          "prix": "11,00 €",
          "placeholder": false
        },
        {
          "nom": "Piña colada",
          "description": "",
          "prix": "11,00 €",
          "placeholder": false
        },
        {
          "nom": "Moscow Mule / Disaronno Mule",
          "description": "",
          "prix": "11,00 €",
          "placeholder": false
        },
        {
          "nom": "Ardennes Mule",
          "description": "élixir des Moines de Maredsous, lime, ginger beer",
          "prix": "11,00 €",
          "placeholder": false
        },
        {
          "nom": "Negroni",
          "description": "",
          "prix": "11,00 €",
          "placeholder": false
        },
        {
          "nom": "Mai tai",
          "description": "",
          "prix": "12,00 €",
          "placeholder": false
        },
        {
          "nom": "Margarita",
          "description": "",
          "prix": "11,00 €",
          "placeholder": false
        },
        {
          "nom": "Long island",
          "description": "",
          "prix": "12,00 €",
          "placeholder": false
        },
        {
          "nom": "Hemingway",
          "description": "",
          "prix": "12,00 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Gin'To (tous accompagnés d'un tonic sélectionné)",
      "plats": [
        {
          "nom": "Gin de Namur",
          "description": "boisé, floral",
          "prix": "14,00 €",
          "placeholder": false
        },
        {
          "nom": "Gin Panda",
          "description": "litchis, plantes aromatiques",
          "prix": "14,00 €",
          "placeholder": false
        },
        {
          "nom": "Iced Gin",
          "description": "servi à -18 °C",
          "prix": "15,00 €",
          "placeholder": false
        },
        {
          "nom": "Gin Marula",
          "description": "",
          "prix": "14,00 €",
          "placeholder": false
        },
        {
          "nom": "Gin Maredsous Invictus",
          "description": "vieilli 6 mois en fût de chêne",
          "prix": "14,00 €",
          "placeholder": false
        },
        {
          "nom": "LièGin Violette",
          "description": "",
          "prix": "14,00 €",
          "placeholder": false
        },
        {
          "nom": "Gin Namur Ma Belle",
          "description": "vin rosé et fruits rouges",
          "prix": "14,00 €",
          "placeholder": false
        },
        {
          "nom": "Moulin du loup",
          "description": "London Dry Gin, baies de genévrier, agrumes et poivre",
          "prix": "14,00 €",
          "placeholder": false
        },
        {
          "nom": "Cuberd'Gin",
          "description": "",
          "prix": "14,00 €",
          "placeholder": false
        },
        {
          "nom": "Gin barbe à papa",
          "description": "",
          "prix": "14,00 €",
          "placeholder": false
        },
        {
          "nom": "Mombasa club Gin",
          "description": "",
          "prix": "14,00 €",
          "placeholder": false
        },
        {
          "nom": "Gin Maredsous Valéo",
          "description": "",
          "prix": "14,00 €",
          "placeholder": false
        },
        {
          "nom": "Gin Malfy con arancia",
          "description": "orange sanguine",
          "prix": "14,00 €",
          "placeholder": false
        }
      ]
    },
    {
      "categorie": "Gins et mocktails 0%",
      "plats": [
        {
          "nom": "Gin Tanqueray tonic 0%",
          "description": "",
          "prix": "11,00 €",
          "placeholder": false
        },
        {
          "nom": "Gin barbe à papa 0%",
          "description": "",
          "prix": "12,00 €",
          "placeholder": false
        },
        {
          "nom": "Gin poire & épices 0%",
          "description": "",
          "prix": "10,00 €",
          "placeholder": false
        },
        {
          "nom": "Strawberry / Raspberry Gin Daïquiri",
          "description": "",
          "prix": "9,00 €",
          "placeholder": false
        },
        {
          "nom": "Cocktail maison 0%",
          "description": "",
          "prix": "7,80 €",
          "placeholder": false
        },
        {
          "nom": "Virgin colada",
          "description": "",
          "prix": "8,00 €",
          "placeholder": false
        },
        {
          "nom": "Shirley Temple",
          "description": "",
          "prix": "6,50 €",
          "placeholder": false
        },
        {
          "nom": "Virgin Mojito",
          "description": "",
          "prix": "8,50 €",
          "placeholder": false
        },
        {
          "nom": "Spritz 0%",
          "description": "",
          "prix": "7,00 €",
          "placeholder": false
        },
        {
          "nom": "Sangria 0%",
          "description": "",
          "prix": "6,50 €",
          "placeholder": false
        },
        {
          "nom": "Frozen fruits",
          "description": "",
          "prix": "8,00 €",
          "placeholder": false
        },
        {
          "nom": "Irish coffee 0%",
          "description": "",
          "prix": "8,50 €",
          "placeholder": false
        },
        {
          "nom": "Italian coffee 0%",
          "description": "",
          "prix": "8,90 €",
          "placeholder": false
        }
      ]
    }
  ],
  "menus": [
    {
      "nom": "Menu 3 services",
      "prix": "43,50 €",
      "description": "Apéro (kir, cava ou verre de moelleux), une entrée (scampis piquant maison, fondu parmesan ou pêche au thon), un plat (côtes d'agneau grillées, steak de bœuf sauce au choix ou pavé de saumon béarnaise), dessert (mousse au chocolat maison, tiramisu maison ou bavarois framboise) ; accompagnement frites, croquettes, purée ou pommes grenailles",
      "placeholder": false
    },
    {
      "nom": "Formule à 58 €",
      "prix": "58,00 €",
      "description": "Menu 3 services avec apéritif, café et 1/4 l de vin",
      "placeholder": false
    },
    {
      "nom": "Menu raclette, fondue savoyarde ou bourguignonne",
      "prix": "45,00 € / pers.",
      "description": "Min. 2 personnes ; apéritif (coupe de cava, kir ou verre de moelleux), entrée (assiette de foie gras ou toast saumon fumé), plat au choix",
      "placeholder": false
    },
    {
      "nom": "Fondue savoyarde tomate & ail",
      "prix": "28,00 € / pers.",
      "description": "Suggestion",
      "placeholder": false
    },
    {
      "nom": "Fondue Ardennaise",
      "prix": "29,00 € / pers.",
      "description": "Suggestion",
      "placeholder": false
    }
  ],
  "histoire": [
    "Oh la Vache ! est un restaurant grill de la Chaussée de Marche, à Erpent, aux portes de Namur. On y vient pour les viandes grillées, les burgers au bœuf Angus et les plats à partager.",
    "La cuisine est française et italienne : fondues, pierrades et raclettes dès deux couverts, escalopes gratinées, pâtes, salades et desserts « Vachement bon ! ».",
    "On s'y installe sur la terrasse, entre canapés et parasols, ou dans la salle sous tente, sous le lustre. Le restaurant annonce ouvrir tous les jours.",
    "Côté bar, la carte compte treize gin'to, dont plusieurs gins de Namur et de Belgique, et une sélection de cocktails et de bières."
  ],
  "equipe": [],
  "avis": [],
  "photos": [
    {
      "src": "/photos/facade.webp",
      "alt": "Façade du restaurant et enseigne à la vache",
      "largeur": 1800,
      "hauteur": 1195,
      "placeholder": false
    },
    {
      "src": "/photos/terrasse-canapes.webp",
      "alt": "Terrasse avec canapés et parasols",
      "largeur": 1440,
      "hauteur": 1080,
      "placeholder": false
    },
    {
      "src": "/photos/terrasse-parasol.webp",
      "alt": "Table dressée sur la terrasse sous un parasol",
      "largeur": 1080,
      "hauteur": 1440,
      "placeholder": false
    },
    {
      "src": "/photos/terrasse-tables.webp",
      "alt": "Terrasse avec tables et parasols",
      "largeur": 1440,
      "hauteur": 1078,
      "placeholder": false
    },
    {
      "src": "/photos/terrasse-ardoise.webp",
      "alt": "Terrasse avec ardoise des suggestions",
      "largeur": 1440,
      "hauteur": 1078,
      "placeholder": false
    },
    {
      "src": "/photos/terrasse-pergola.webp",
      "alt": "Terrasse sous pergola, tables dressées",
      "largeur": 1440,
      "hauteur": 1080,
      "placeholder": false
    },
    {
      "src": "/photos/salle-rouge.webp",
      "alt": "Salle sous tente éclairée de rouge",
      "largeur": 1440,
      "hauteur": 1920,
      "placeholder": false
    },
    {
      "src": "/photos/salle-lustre.webp",
      "alt": "Salle sous tente avec lustre",
      "largeur": 1440,
      "hauteur": 1920,
      "placeholder": false
    },
    {
      "src": "/photos/moules-frites.webp",
      "alt": "Moules-frites servies avec une ardoise de boissons",
      "largeur": 1080,
      "hauteur": 1440,
      "placeholder": false
    },
    {
      "src": "/photos/assiette-caprese.webp",
      "alt": "Assiette de tomate-mozzarella, jambon cru et salade",
      "largeur": 1440,
      "hauteur": 1080,
      "placeholder": false
    },
    {
      "src": "/photos/entrecote-frites.webp",
      "alt": "Entrecôte grillée, frites et sauce",
      "largeur": 1536,
      "hauteur": 2048,
      "placeholder": false
    },
    {
      "src": "/photos/planche-charcuterie.webp",
      "alt": "Planche de charcuterie et verre de rosé",
      "largeur": 1440,
      "hauteur": 1440,
      "placeholder": false
    },
    {
      "src": "/photos/dessert-fondant.webp",
      "alt": "Dessert au chocolat avec une boule de glace",
      "largeur": 1800,
      "hauteur": 1800,
      "placeholder": false
    },
    {
      "src": "/photos/cafe-gourmand.webp",
      "alt": "Café gourmand",
      "largeur": 1440,
      "hauteur": 1078,
      "placeholder": false
    },
    {
      "src": "/photos/cocktail-spritz.webp",
      "alt": "Cocktail spritz servi à table",
      "largeur": 644,
      "hauteur": 1440,
      "placeholder": false
    },
    {
      "src": "/photos/nachos-cocktails.webp",
      "alt": "Plateau de nachos avec deux cocktails",
      "largeur": 1080,
      "hauteur": 1440,
      "placeholder": false
    },
    {
      "src": "/photos/gin-tonic.webp",
      "alt": "Plateau de boissons avec un gin tonic",
      "largeur": 828,
      "hauteur": 1104,
      "placeholder": false
    }
  ],
  "valeurs": [
    "Grillades et plats à partager",
    "Cuisine française et italienne",
    "Terrasse et salle sous tente",
    "Ouvert 7 jours sur 7"
  ]
};

/** Photo par chemin (erreur explicite si le chemin n'existe pas : un gabarit ne doit pas pointer dans le vide). */
export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}

/** Adresse sur une ligne. */
export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;

/** Horaires lisibles : '11:00 à 22:30' ou la note. */
export const horaireTexte = (h: Horaire) =>
  h.creneaux.length ? h.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(', ') : h.note || 'fermé';

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;

export type ObjetId = 'frites' | 'fourchette' | 'verre' | 'parasol' | 'bouteille' | 'citron';
export interface Objet { id: ObjetId; label: string; x: number; y: number; r: number; taille: number; mobile: boolean; mx?: number }
export interface Tirage { src: string; alt: string; x: number; y: number; r: number; legende: string; placeholder: boolean }
export interface Picto { categorie: string; picto: ObjetId }

export const guinguette = {
  "heroTitre": [
    "Oh la vache,",
    "à table !"
  ],
  "slogan": {
    "texte": "Fondues, pierrades, raclettes et grillades, à Erpent",
    "placeholder": false
  },
  "objets": [
    {
      "id": "parasol",
      "label": "Parasol dessiné au trait",
      "x": 6,
      "y": 10,
      "r": -12,
      "taille": 150,
      "mobile": true,
      "mx": 4
    },
    {
      "id": "verre",
      "label": "Verre à pied dessiné au trait",
      "x": 84,
      "y": 8,
      "r": 10,
      "taille": 110,
      "mobile": false
    },
    {
      "id": "frites",
      "label": "Cornet de frites dessiné au trait",
      "x": 10,
      "y": 66,
      "r": 8,
      "taille": 130,
      "mobile": true,
      "mx": 40
    },
    {
      "id": "fourchette",
      "label": "Fourchette dessinée au trait",
      "x": 30,
      "y": 78,
      "r": -40,
      "taille": 120,
      "mobile": false
    },
    {
      "id": "bouteille",
      "label": "Bouteille dessinée au trait",
      "x": 80,
      "y": 60,
      "r": 14,
      "taille": 140,
      "mobile": true,
      "mx": 74
    },
    {
      "id": "citron",
      "label": "Citron coupé dessiné au trait",
      "x": 62,
      "y": 82,
      "r": -6,
      "taille": 90,
      "mobile": false
    }
  ],
  "tirages": [
    {
      "src": "/photos/terrasse-canapes.webp",
      "alt": "Terrasse avec canapés et parasols",
      "x": 2,
      "y": 2,
      "r": -7,
      "legende": "Les canapés de la terrasse",
      "placeholder": false
    },
    {
      "src": "/photos/moules-frites.webp",
      "alt": "Moules-frites servies avec une ardoise de boissons",
      "x": 18,
      "y": 4,
      "r": 5,
      "legende": "Moules-frites",
      "placeholder": false
    },
    {
      "src": "/photos/entrecote-frites.webp",
      "alt": "Entrecôte grillée, frites et sauce",
      "x": 34,
      "y": 2,
      "r": -3,
      "legende": "Entrecôte et frites",
      "placeholder": false
    },
    {
      "src": "/photos/cocktail-spritz.webp",
      "alt": "Cocktail spritz servi à table",
      "x": 50,
      "y": 4,
      "r": 8,
      "legende": "Spritz",
      "placeholder": false
    },
    {
      "src": "/photos/terrasse-parasol.webp",
      "alt": "Table dressée sur la terrasse sous un parasol",
      "x": 66,
      "y": 2,
      "r": -5,
      "legende": "Table sous parasol",
      "placeholder": false
    },
    {
      "src": "/photos/planche-charcuterie.webp",
      "alt": "Planche de charcuterie et verre de rosé",
      "x": 82,
      "y": 4,
      "r": 6,
      "legende": "Planche de charcuterie",
      "placeholder": false
    },
    {
      "src": "/photos/dessert-fondant.webp",
      "alt": "Dessert au chocolat avec une boule de glace",
      "x": 3,
      "y": 63,
      "r": -9,
      "legende": "Dessert au chocolat",
      "placeholder": false
    },
    {
      "src": "/photos/terrasse-pergola.webp",
      "alt": "Terrasse sous pergola, tables dressées",
      "x": 19,
      "y": 65,
      "r": 4,
      "legende": "Sous la pergola",
      "placeholder": false
    },
    {
      "src": "/photos/nachos-cocktails.webp",
      "alt": "Plateau de nachos avec deux cocktails",
      "x": 35,
      "y": 63,
      "r": -6,
      "legende": "Nachos et cocktails",
      "placeholder": false
    },
    {
      "src": "/photos/assiette-caprese.webp",
      "alt": "Assiette de tomate-mozzarella, jambon cru et salade",
      "x": 51,
      "y": 65,
      "r": 7,
      "legende": "Tomate-mozzarella",
      "placeholder": false
    },
    {
      "src": "/photos/salle-lustre.webp",
      "alt": "Salle sous tente avec lustre",
      "x": 67,
      "y": 63,
      "r": 3,
      "legende": "La salle sous tente",
      "placeholder": false
    },
    {
      "src": "/photos/gin-tonic.webp",
      "alt": "Plateau de boissons avec un gin tonic",
      "x": 83,
      "y": 65,
      "r": -4,
      "legende": "Gin tonic",
      "placeholder": false
    }
  ],
  "pictos": [
    {
      "categorie": "Entrées",
      "picto": "citron"
    },
    {
      "categorie": "Petite",
      "picto": "frites"
    },
    {
      "categorie": "Plats enfants",
      "picto": "frites"
    },
    {
      "categorie": "Poissons",
      "picto": "citron"
    },
    {
      "categorie": "Nos plats",
      "picto": "fourchette"
    },
    {
      "categorie": "Spécialités",
      "picto": "fourchette"
    },
    {
      "categorie": "Nos viandes",
      "picto": "fourchette"
    },
    {
      "categorie": "Bœuf",
      "picto": "fourchette"
    },
    {
      "categorie": "Burgers",
      "picto": "frites"
    },
    {
      "categorie": "Nos escalopes",
      "picto": "fourchette"
    },
    {
      "categorie": "Nos pâtes",
      "picto": "fourchette"
    },
    {
      "categorie": "Nos salades",
      "picto": "citron"
    },
    {
      "categorie": "Glaces",
      "picto": "parasol"
    },
    {
      "categorie": "Nos desserts",
      "picto": "parasol"
    },
    {
      "categorie": "Cafés",
      "picto": "verre"
    },
    {
      "categorie": "Apéritifs",
      "picto": "verre"
    },
    {
      "categorie": "Bières",
      "picto": "bouteille"
    },
    {
      "categorie": "Limonades",
      "picto": "bouteille"
    },
    {
      "categorie": "Cocktails",
      "picto": "verre"
    },
    {
      "categorie": "Gin'To",
      "picto": "bouteille"
    },
    {
      "categorie": "Gins et mocktails",
      "picto": "verre"
    }
  ],
  "boissons": [
    "Apéritifs",
    "Bières",
    "Limonades et softs",
    "Cocktails",
    "Gin'To (tous accompagnés d'un tonic sélectionné)",
    "Gins et mocktails 0%",
    "Cafés et pousse-café"
  ],
  "accueilCats": [
    "Spécialités fondues, pierrades de bœuf et raclette",
    "Bœuf",
    "Burgers",
    "Nos desserts Vachement bon !"
  ],
  "reperes": [
    {
      "texte": "Le Tomahawk, environ 1,3 kg, se partage à deux. 88 €.",
      "r": -4
    },
    {
      "texte": "Fondue bourguignonne, fondue savoyarde, pierrade mixte et raclette se commandent dès deux couverts.",
      "r": 3
    },
    {
      "texte": "Treize gin'to à la carte, dont des gins de Namur et de Belgique, servis avec un tonic choisi.",
      "r": -2
    },
    {
      "texte": "Menu trois services à 43,50 €, avec apéritif, entrée, plat et dessert au choix.",
      "r": 5
    }
  ],
  "menuUnique": {
    "services": 3,
    "prix": "43,50 €",
    "periode": "menu trois services avec apéritif"
  },
  "horairesNote": "Horaires du site actuel du restaurant. Le vendredi et le mardi sont à confirmer auprès du restaurant.",
  "terrasse": {
    "connue": true,
    "placeholder": false,
    "texte": "La terrasse s'étend sous parasols et pergola, avec des canapés pour l'apéritif et des tables dressées pour manger dehors.",
    "points": [
      "canapés et parasols",
      "tables sous pergola",
      "ardoise des suggestions",
      "salle sous tente"
    ]
  },
  "manifeste": {
    "titre": [
      "Grillé, fondu",
      "et vachement bon"
    ],
    "motItalique": "vachement bon",
    "texte": "Des viandes grillées, des fondues et des pierrades à partager, des burgers au bœuf Angus et un bar à gin'to. À Erpent, tous les jours selon le restaurant."
  },
  "finale": "À table !"
} as unknown as {
  heroTitre: string[]; slogan: { texte: string; placeholder: boolean }; objets: Objet[]; tirages: Tirage[]; pictos: Picto[];
  boissons: string[]; accueilCats: string[]; reperes: { texte: string; r: number }[];
  menuUnique: { services: number; prix: string; periode: string }; horairesNote: string;
  terrasse: { connue: boolean; placeholder: boolean; texte: string; points: string[] };
  manifeste: { titre: string[]; motItalique: string; texte: string }; finale: string;
};

/** Vrai si l'heure donnée (HH:MM) est dans un créneau. */
export const estOuvert = (h: Horaire, hhmm: string) => h.creneaux.some((c) => c.ouverture <= hhmm && hhmm < c.fermeture);
