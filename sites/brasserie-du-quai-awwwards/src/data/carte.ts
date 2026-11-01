// Carte de La Brasserie du Quai, générée depuis data/restaurants/brasserie-du-quai/donnees.json
// (site actuel, pages /la-carte/ et /lecailler/, relevé du 01/11/2026).
// prix : un prix en euros par portion (portions : « 1 pièce », « 6 pièces »…) ; null = « prix du jour » chez le client.
// PLACEHOLDER : la catégorie « Desserts » (le client ne publie ni desserts ni boissons) : noms plausibles, sans prix.
export interface Plat { nom: string; detail?: string; prix: number[] | null; portions?: string[]; placeholder?: boolean }
export interface Categorie { id: string; titre: string; rive: 'quai' | 'eau'; placeholder?: boolean; plats: Plat[] }
export const carte: Categorie[] = [
  {
    "id": "les-entrees",
    "titre": "Les entrées",
    "rive": "quai",
    "plats": [
      {
        "nom": "Tartare de saumon, crème au raifort et caviar de hareng",
        "prix": [
          20
        ]
      },
      {
        "nom": "Carpaccio de contrefilet Wagyu, sel de Guérande fumé",
        "prix": [
          22
        ]
      },
      {
        "nom": "Tomate aux crevettes grises « épluchées main » (1 pièce)",
        "prix": null
      },
      {
        "nom": "Notre assiette de saumon norvégien « Maison Dawagne »",
        "prix": [
          24
        ]
      },
      {
        "nom": "Croquettes de crevettes grises « maison »",
        "prix": [
          11,
          22
        ],
        "portions": [
          "1 pièce",
          "2 pièces"
        ]
      },
      {
        "nom": "Fondus au parmesan « maison »",
        "prix": [
          9,
          18
        ],
        "portions": [
          "1 pièce",
          "2 pièces"
        ]
      },
      {
        "nom": "Mix croquettes au parmesan et crevettes grises",
        "prix": [
          20
        ]
      },
      {
        "nom": "Bisque de homard en cappuccino aux arômes de café torréfié",
        "prix": [
          19
        ]
      },
      {
        "nom": "Petits gris de Warnant, champignons d’ici et d’ailleurs, écume à la houppe",
        "prix": [
          24
        ]
      }
    ]
  },
  {
    "id": "poissons",
    "titre": "Poissons",
    "rive": "quai",
    "plats": [
      {
        "nom": "Tomates aux crevettes grises épluchées main, pommes frites (2 pièces)",
        "prix": null
      },
      {
        "nom": "Salade de crevettes grises, frites (2 pièces)",
        "prix": null
      },
      {
        "nom": "Notre belle sole « meunière »",
        "prix": null,
        "detail": "purée de pommes de terre"
      },
      {
        "nom": "Dos de saumon snacké et crevettes royales",
        "prix": [
          30
        ],
        "detail": "nage de curry thaï et yuzu"
      },
      {
        "nom": "Fish & chips de cabillaud",
        "prix": [
          28
        ],
        "detail": "salade composée, sauce tartare, frites"
      },
      {
        "nom": "Cœur de cabillaud vapeur",
        "prix": [
          34
        ],
        "detail": "lit de poireaux, sauce mousseline, purée de pomme de terre"
      }
    ]
  },
  {
    "id": "viandes",
    "titre": "Viandes",
    "rive": "quai",
    "plats": [
      {
        "nom": "Américain préparé haché minute",
        "prix": [
          26
        ],
        "detail": "salade composée, frites"
      },
      {
        "nom": "Tartare de bœuf haché minute préparé par vos soins",
        "prix": [
          26
        ],
        "detail": "salade composée, frites"
      },
      {
        "nom": "Pavé de bœuf grillé",
        "prix": [
          32
        ],
        "detail": "salade composée, frites, sauce au choix"
      },
      {
        "nom": "Contrefilet « Holstein »",
        "prix": [
          39
        ],
        "detail": "salade composée, frites, sauce au choix"
      },
      {
        "nom": "Notre vol-au-vent revisité",
        "prix": [
          28
        ],
        "detail": "croustade au beurre, frites"
      },
      {
        "nom": "Notre vol-au-vent « Royal » (truffe et ris de veau)",
        "prix": [
          34
        ],
        "detail": "croustade au beurre, frites"
      },
      {
        "nom": "Rognons de veau à la dijonnaise",
        "prix": [
          27
        ],
        "detail": "pommes de terre rissolées"
      },
      {
        "nom": "Ris de veau braisé",
        "prix": [
          42
        ],
        "detail": "champignons des bois et crème de morilles, croquettes de pommes de terre"
      }
    ]
  },
  {
    "id": "pates-fraiches",
    "titre": "Pâtes fraîches",
    "rive": "quai",
    "plats": [
      {
        "nom": "Tortellini à la ricotta et truffe",
        "prix": [
          25
        ],
        "detail": "crème de champignons truffés"
      }
    ]
  },
  {
    "id": "accompagnements-et-sauces",
    "titre": "Accompagnements et sauces",
    "rive": "quai",
    "plats": [
      {
        "nom": "Beurre maître d’hôtel",
        "prix": [
          3
        ]
      },
      {
        "nom": "Nos sauces (poivre vert crème, archiduc, dijonnaise, béarnaise ou choron)",
        "prix": [
          4.5
        ]
      },
      {
        "nom": "Supplément mayonnaise maison",
        "prix": [
          2
        ]
      },
      {
        "nom": "Salade laitue, salade tomates ou salade mixte",
        "prix": [
          7
        ]
      },
      {
        "nom": "Supplément frites, purée ou croquettes",
        "prix": [
          3.5
        ]
      },
      {
        "nom": "Bouquetière de légumes",
        "prix": [
          10
        ]
      }
    ]
  },
  {
    "id": "pour-les-enfants",
    "titre": "Pour les enfants",
    "rive": "quai",
    "plats": [
      {
        "nom": "Mini steak grillé",
        "prix": [
          14
        ],
        "detail": "frites ou purée"
      },
      {
        "nom": "Mini américain préparé",
        "prix": [
          14
        ],
        "detail": "frites ou purée"
      },
      {
        "nom": "Fish & chips de cabillaud",
        "prix": [
          14
        ],
        "detail": "frites ou purée"
      }
    ]
  },
  {
    "id": "desserts",
    "titre": "Desserts",
    "rive": "quai",
    "placeholder": true,
    "plats": [
      {
        "nom": "Dame blanche, chocolat chaud",
        "prix": null,
        "placeholder": true
      },
      {
        "nom": "Crème brûlée à la vanille",
        "prix": null,
        "placeholder": true
      },
      {
        "nom": "Café gourmand",
        "prix": null,
        "placeholder": true
      }
    ]
  },
  {
    "id": "huitres",
    "titre": "Huîtres",
    "rive": "eau",
    "plats": [
      {
        "nom": "Les Normandes n°4",
        "prix": [
          15,
          30
        ],
        "portions": [
          "6 pièces",
          "12 pièces"
        ]
      },
      {
        "nom": "Les Fines de Claire n°3",
        "prix": [
          19.2,
          38.4
        ],
        "portions": [
          "6 pièces",
          "12 pièces"
        ]
      },
      {
        "nom": "Les Gillardeaux n°4",
        "prix": [
          27.6,
          55.2
        ],
        "portions": [
          "6 pièces",
          "12 pièces"
        ]
      }
    ]
  },
  {
    "id": "produits-de-la-mer",
    "titre": "Produits de la mer",
    "rive": "eau",
    "plats": [
      {
        "nom": "La langoustine",
        "prix": null
      },
      {
        "nom": "Le demi-homard en belle vue",
        "prix": null
      },
      {
        "nom": "Le tourteau en belle vue",
        "prix": null
      },
      {
        "nom": "Le bol de bulots",
        "prix": [
          13
        ]
      },
      {
        "nom": "Le bol de bigorneaux jumbo",
        "prix": [
          14
        ]
      },
      {
        "nom": "Le bol de crevettes grises de la mer du Nord à éplucher",
        "prix": [
          16
        ]
      },
      {
        "nom": "Les crevettes « Bouquet Royal » (la pièce)",
        "prix": [
          3.5
        ]
      }
    ]
  },
  {
    "id": "plateaux",
    "titre": "Plateaux",
    "rive": "eau",
    "plats": [
      {
        "nom": "L’assiette de l’écailler (1 pers.)",
        "prix": [
          45
        ],
        "detail": "3 Fines de Claire, 3 Normandes, 3 Gillardeaux, 3 Plates (en saison) ou découverte du moment"
      },
      {
        "nom": "L’assiette du Quai (1 pers.)",
        "prix": [
          45
        ],
        "detail": "4 Fines de Claire, 3 Normandes, 3 crevettes Bouquet Royal, bulots, bigorneaux"
      },
      {
        "nom": "Le Trésor du Quai (1 pers.)",
        "prix": [
          88
        ],
        "detail": "4 Fines de Claire, 4 Normandes, 1/2 homard, 2 langoustines, 4 Bouquet Royal, bulots, bigorneaux, crevettes grises non épluchées"
      },
      {
        "nom": "Le Spécial Crustacés (2 pers.)",
        "prix": [
          145
        ],
        "detail": "2 x 1/2 homard, 4 langoustines, 1 tourteau, 6 Bouquet Royal, crevettes grises non épluchées"
      },
      {
        "nom": "Le Plateau du Quai (2 pers.)",
        "prix": [
          165
        ],
        "detail": "8 Normandes, 4 Fines de Claire, 2 x 1/2 homard, 4 langoustines, 6 Bouquet Royal, bulots, bigorneaux, crevettes grises non épluchées"
      },
      {
        "nom": "Le Royal du Quai (2 pers.)",
        "prix": [
          195
        ],
        "detail": "8 Normandes, 12 Fines de Claire, 1 tourteau, 2 x 1/2 homard, 4 langoustines, 4 Bouquet Royal, bulots, bigorneaux, crevettes grises non épluchées"
      }
    ]
  }
];
