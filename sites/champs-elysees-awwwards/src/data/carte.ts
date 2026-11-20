// Carte relevée sur le PDF du restaurant (octobre, millésime à confirmer) : data/restaurants/champs-elysees/donnees.json.
// Généré une fois depuis donnees.json ; prix en euros (nombre), `variantes` quand plusieurs formats, `prixTexte` sinon.
export interface Plat { nom: string; description?: string; prix?: number; variantes?: { l: string; p: number }[]; prixTexte?: string; placeholder?: boolean }
export interface Categorie { id: string; nom: string; groupe: 'manger' | 'boire'; note?: string; plats: Plat[] }
export const carte: Categorie[] = [
 {
  "nom": "À partager ou pas",
  "plats": [
   {
    "nom": "Rillettes de porc",
    "description": "cornichons, pain",
    "prix": 10.0
   },
   {
    "nom": "Mini croquettes de fromage",
    "description": "4 pièces",
    "prix": 11.0
   },
   {
    "nom": "Rillettes de saumon maison",
    "description": "pain",
    "prix": 12.0
   },
   {
    "nom": "Boîte de sardines",
    "prix": 10.0
   },
   {
    "nom": "Œuf dur",
    "prix": 1.0
   },
   {
    "nom": "Anneaux de calamars",
    "description": "sauce tartare",
    "prix": 12.0
   },
   {
    "nom": "Terrine maison",
    "description": "moutarde, pain",
    "prix": 10.0
   },
   {
    "nom": "Portion de Comté",
    "prix": 8.0
   },
   {
    "nom": "Saucisson gaumais",
    "prix": 8.0
   },
   {
    "nom": "Portion mixte",
    "description": "Comté, saucisson gaumais",
    "prix": 10.0
   },
   {
    "nom": "Planche mixte",
    "description": "rillettes de porc, croquettes de fromage, anneaux de calamars, Comté, saucisson gaumais",
    "prix": 27.0
   }
  ],
  "id": "a-partager-ou-pas",
  "groupe": "manger"
 },
 {
  "nom": "Entrées",
  "plats": [
   {
    "nom": "Croquette de fromage artisanale",
    "variantes": [
     {
      "l": "1 pc",
      "p": 11.0
     },
     {
      "l": "2 pcs",
      "p": 19.0
     }
    ]
   },
   {
    "nom": "Croquette de crevettes artisanale",
    "variantes": [
     {
      "l": "1 pc",
      "p": 13.0
     },
     {
      "l": "2 pcs",
      "p": 21.0
     }
    ]
   },
   {
    "nom": "Scampis à l’ail",
    "variantes": [
     {
      "l": "3 pcs",
      "p": 14.0
     },
     {
      "l": "6 pcs",
      "p": 18.0
     },
     {
      "l": "9 pcs",
      "p": 24.0
     }
    ]
   },
   {
    "nom": "Scampis ail-crème",
    "variantes": [
     {
      "l": "3 pcs",
      "p": 15.0
     },
     {
      "l": "6 pcs",
      "p": 19.0
     },
     {
      "l": "9 pcs",
      "p": 25.0
     }
    ]
   },
   {
    "nom": "Scampis diaboliques",
    "variantes": [
     {
      "l": "3 pcs",
      "p": 15.0
     },
     {
      "l": "6 pcs",
      "p": 19.0
     },
     {
      "l": "9 pcs",
      "p": 25.0
     }
    ]
   },
   {
    "nom": "Petits gris de Namur",
    "variantes": [
     {
      "l": "8 pcs",
      "p": 19.0
     }
    ]
   },
   {
    "nom": "Foie gras maison",
    "prix": 20.0
   },
   {
    "nom": "Poireaux à la vinaigrette",
    "prix": 15.0
   },
   {
    "nom": "Toast cannibale",
    "prix": 15.0
   }
  ],
  "id": "entrees",
  "groupe": "manger"
 },
 {
  "nom": "Salades",
  "plats": [
   {
    "nom": "César",
    "prix": 25.0
   },
   {
    "nom": "César aux scampis",
    "prix": 29.0
   },
   {
    "nom": "Frisée aux lardons",
    "prix": 25.5
   },
   {
    "nom": "Chèvre chaud",
    "prix": 25.0
   }
  ],
  "id": "salades",
  "groupe": "manger"
 },
 {
  "nom": "Plats végétariens",
  "plats": [
   {
    "nom": "Burger d’halloumi",
    "prix": 25.0
   },
   {
    "nom": "Penne au pesto",
    "prix": 23.0
   },
   {
    "nom": "Lasagne de légumes",
    "prix": 23.0
   }
  ],
  "id": "plats-vegetariens",
  "groupe": "manger"
 },
 {
  "nom": "Plats brasserie",
  "plats": [
   {
    "nom": "Boulettes sauce tomate",
    "prix": 22.0
   },
   {
    "nom": "Boulettes sauce liégeoise",
    "prix": 24.0
   },
   {
    "nom": "Boulettes sauce Sambre et Meuse",
    "prix": 24.0
   },
   {
    "nom": "Vol-au-vent maison",
    "prix": 25.0
   },
   {
    "nom": "Cordon bleu maison",
    "prix": 26.0
   },
   {
    "nom": "Burger des Champs",
    "description": "bœuf de Famenne, lard, fromage de Maredsous, oignons caramélisés, sauce magique",
    "prix": 25.0
   }
  ],
  "id": "plats-brasserie",
  "groupe": "manger"
 },
 {
  "nom": "Pâtes",
  "plats": [
   {
    "nom": "Bolognèse",
    "prix": 20.0
   },
   {
    "nom": "Carbo à la belge",
    "prix": 23.5
   },
   {
    "nom": "4 fromages",
    "prix": 27.0
   },
   {
    "nom": "All’amatriciana",
    "prix": 27.0
   },
   {
    "nom": "Scampis",
    "prix": 29.0
   }
  ],
  "id": "pates",
  "groupe": "manger",
  "note": "Spaghetti ou penne"
 },
 {
  "nom": "Les djônes",
  "plats": [
   {
    "nom": "Pâtes",
    "prix": 15.0
   },
   {
    "nom": "Boulette",
    "prix": 15.0
   },
   {
    "nom": "Filet de poulet",
    "prix": 15.0
   },
   {
    "nom": "Burger",
    "prix": 15.0
   }
  ],
  "id": "djones",
  "groupe": "manger",
  "note": "Menu enfant, jusqu’à 12 ans"
 },
 {
  "nom": "Viandard",
  "plats": [
   {
    "nom": "Pavé de bœuf",
    "prix": 28.0
   },
   {
    "nom": "Entrecôte",
    "prix": 36.0
   },
   {
    "nom": "Américain",
    "prix": 25.0
   },
   {
    "nom": "Jambonneau",
    "description": "sauce moutarde",
    "prix": 29.0
   },
   {
    "nom": "Rognon de veau",
    "description": "à la namuroise ou sauce moutarde",
    "prix": 28.0
   },
   {
    "nom": "Côte de porcelet saumurée",
    "description": "sauce moutarde, croquettes",
    "prix": 28.0
   },
   {
    "nom": "Filet de poulet",
    "prix": 23.0
   },
   {
    "nom": "Onglet à l’échalote",
    "prix": 27.0
   },
   {
    "nom": "Supplément sauce au choix",
    "description": "poivre, champignons, béarnaise, Sambre et Meuse, gorgonzola",
    "prix": 3.0
   }
  ],
  "id": "viandard",
  "groupe": "manger"
 },
 {
  "nom": "Poissons",
  "plats": [
   {
    "nom": "Sole meunière",
    "prixTexte": "Prix du jour"
   },
   {
    "nom": "Truite",
    "description": "meunière, aux amandes, à la namuroise",
    "prix": 25.0
   },
   {
    "nom": "Pavé de saumon",
    "description": "sauce au vin blanc",
    "prix": 28.0
   },
   {
    "nom": "Fish and chips",
    "description": "sauce tartare",
    "prix": 22.0
   }
  ],
  "id": "poissons",
  "groupe": "manger"
 },
 {
  "nom": "Desserts",
  "plats": [
   {
    "nom": "Mousse au chocolat",
    "prix": 10.0
   },
   {
    "nom": "Crème brûlée",
    "prix": 10.0
   },
   {
    "nom": "Tiramisu au Marsala",
    "prix": 10.0
   },
   {
    "nom": "Dame blanche ou noire",
    "prix": 11.0
   },
   {
    "nom": "Coupe brésilienne",
    "prix": 11.0
   },
   {
    "nom": "Café glacé",
    "prix": 11.0
   },
   {
    "nom": "Sorbets du moment",
    "prix": 11.0
   }
  ],
  "id": "desserts",
  "groupe": "manger"
 },
 {
  "nom": "Bières pression",
  "plats": [
   {
    "nom": "Cristal",
    "variantes": [
     {
      "l": "25 cl",
      "p": 3.8
     },
     {
      "l": "33 cl",
      "p": 4.8
     },
     {
      "l": "50 cl",
      "p": 7.5
     }
    ]
   },
   {
    "nom": "Cristal babette",
    "prix": 2.6
   },
   {
    "nom": "Chimay triple",
    "prix": 5.2
   },
   {
    "nom": "St-Hubertus",
    "prix": 4.9
   },
   {
    "nom": "Grimbergen",
    "prix": 5.4
   },
   {
    "nom": "Mazout",
    "prix": 3.8
   },
   {
    "nom": "Panaché",
    "prix": 3.8
   }
  ],
  "id": "bieres-pression",
  "groupe": "boire"
 },
 {
  "nom": "Bières en bouteille",
  "plats": [
   {
    "nom": "Bertinchamps triple",
    "prix": 7.0
   },
   {
    "nom": "Blanche de Namur",
    "prix": 4.4
   },
   {
    "nom": "Chouffe",
    "prix": 5.5
   },
   {
    "nom": "Duvel",
    "prix": 5.5
   },
   {
    "nom": "Houppe",
    "variantes": [
     {
      "l": "25 cl",
      "p": 6.0
     },
     {
      "l": "75 cl",
      "p": 15.7
     }
    ]
   },
   {
    "nom": "Tripel Karmeliet",
    "prix": 5.5
   }
  ],
  "id": "bieres-bouteille",
  "groupe": "boire",
  "note": "Extrait de la carte"
 },
 {
  "nom": "Trappistes",
  "plats": [
   {
    "nom": "Chimay bleue",
    "prix": 6.5
   },
   {
    "nom": "Chimay dorée",
    "prix": 6.0
   },
   {
    "nom": "Chimay rouge",
    "prix": 6.0
   },
   {
    "nom": "Orval",
    "prix": 6.5
   },
   {
    "nom": "Rochefort 8°",
    "prix": 6.5
   },
   {
    "nom": "Rochefort 10°",
    "prix": 6.9
   },
   {
    "nom": "Westmalle Tripel",
    "prix": 6.8
   }
  ],
  "id": "trappistes",
  "groupe": "boire"
 },
 {
  "nom": "Cocktails et spritz",
  "plats": [
   {
    "nom": "Saint-Germain Spritz",
    "prix": 12.0
   },
   {
    "nom": "Aperol Spritz",
    "prix": 12.0
   },
   {
    "nom": "Campari Spritz",
    "prix": 12.0
   },
   {
    "nom": "Moscow Mule",
    "prix": 12.0
   },
   {
    "nom": "Negroni",
    "prix": 12.0
   },
   {
    "nom": "Sangria maison blanche ou rouge",
    "prix": 9.5
   }
  ],
  "id": "cocktails",
  "groupe": "boire"
 },
 {
  "nom": "Softs et boissons chaudes",
  "plats": [
   {
    "nom": "Coca-Cola",
    "prix": 3.8
   },
   {
    "nom": "Jus d’orange",
    "prix": 3.8
   },
   {
    "nom": "Café",
    "prix": 3.5
   },
   {
    "nom": "Cappuccino",
    "prix": 5.5
   },
   {
    "nom": "Chocolat chaud",
    "prix": 5.0
   },
   {
    "nom": "Irish coffee",
    "prix": 11.0
   }
  ],
  "id": "softs",
  "groupe": "boire"
 }
];
