// Généré depuis data/restaurants/le-ponti-2/donnees.json (carte, 99 lignes). Prix en euros, textes du restaurant tels quels.
export interface Ligne { nom: string; prix: number; description?: string; suffixe?: string; liste?: boolean; placeholder?: boolean }
export interface Categorie { id: string; titre: string; note?: string; lignes: Ligne[] }
export interface Groupe { id: string; titre: string; accroche: string; categories: Categorie[] }
export const groupes: Groupe[] = [
 {
  "id": "avant",
  "titre": "Avant le pont",
  "accroche": "Entrées et salades pour se mettre en route.",
  "categories": [
   {
    "id": "entrees-froides",
    "titre": "Entrées froides",
    "lignes": [
     {
      "nom": "Saumon fumé",
      "prix": 21.0
     },
     {
      "nom": "Carpaccio de bœuf",
      "prix": 21.0,
      "description": "roquette, copeaux de parmesan, vinaigre balsamique"
     },
     {
      "nom": "Assiette de charcuterie",
      "prix": 12.0,
      "description": "à partir de 2 personnes",
      "suffixe": "par personne"
     }
    ]
   },
   {
    "id": "entrees-chaudes",
    "titre": "Entrées chaudes",
    "lignes": [
     {
      "nom": "Croquettes au fromage",
      "prix": 21.0
     },
     {
      "nom": "Croquettes aux crevettes",
      "prix": 24.0
     },
     {
      "nom": "Aubergines Parmigiana",
      "prix": 18.0,
      "description": "gratinées, aubergines, mozzarella, basilic, tomate"
     },
     {
      "nom": "Scampis sauce à la diable (7 pc)",
      "prix": 20.0
     },
     {
      "nom": "Scampis sauce curry ananas (7 pc)",
      "prix": 20.0
     },
     {
      "nom": "Scampis à l’ail (7 pc)",
      "prix": 20.0
     }
    ],
    "note": "en plat : supplément de 7 €"
   },
   {
    "id": "grandes-salades",
    "titre": "Grandes salades",
    "lignes": [
     {
      "nom": "Salade Ponti",
      "prix": 22.0,
      "description": "crudités, scampis, crème caramel beurre salé"
     },
     {
      "nom": "Salade de volaille",
      "prix": 21.0,
      "description": "crudités, poulet, copeaux de parmesan, graines de tournesol, vinaigre balsamique, PDT"
     },
     {
      "nom": "Salade crevettes d’Argentine",
      "prix": 22.0,
      "description": "parfumée au tandoori, crudités, chorizo, vinaigre balsamique, grains de sésame"
     },
     {
      "nom": "Salade Caprese",
      "prix": 21.0,
      "description": "tomate, mozzarella, basilic, jambon serrano, vinaigre balsamique"
     }
    ]
   }
  ]
 },
 {
  "id": "traversee",
  "titre": "La traversée",
  "accroche": "Pâtes, pizzas et escalopes de veau : le cœur de la maison.",
  "categories": [
   {
    "id": "pates",
    "titre": "Pâtes",
    "lignes": [
     {
      "nom": "Bolognaise",
      "prix": 19.0,
      "description": "sauce tomate, viande hachée, carottes, oignons, herbes"
     },
     {
      "nom": "4 Fromages",
      "prix": 21.5,
      "description": "mozzarella, gorgonzola, parmesan, taleggio"
     },
     {
      "nom": "Jambon fromage",
      "prix": 19.0,
      "description": "jambon, mozzarella, crème"
     },
     {
      "nom": "Carbonara",
      "prix": 21.0,
      "description": "lardons, oignons, crème, jaune d’œuf"
     },
     {
      "nom": "Estive",
      "prix": 19.0,
      "description": "tomates fraîches, basilic, mozzarella"
     },
     {
      "nom": "Arrabiata",
      "prix": 20.0,
      "description": "olives, sauce tomate, poivrons, piment"
     },
     {
      "nom": "Matriciana",
      "prix": 20.5,
      "description": "lardons, sauce tomate, oignons"
     },
     {
      "nom": "Végétariennes",
      "prix": 21.5,
      "description": "légumes sautés"
     },
     {
      "nom": "Pesto Melanzane",
      "prix": 21.5,
      "description": "pesto, aubergines, basilic, ricotta"
     },
     {
      "nom": "Alla Norma",
      "prix": 21.5,
      "description": "sauce tomate, aubergines, basilic, ricotta"
     },
     {
      "nom": "Scampis",
      "prix": 23.0,
      "description": "sauce tomate, crème, poivrons, scampis"
     },
     {
      "nom": "Saumon",
      "prix": 23.0,
      "description": "crème, oignons, saumon fumé"
     },
     {
      "nom": "Tagliatelles crevettes d’Argentine",
      "prix": 24.0,
      "description": "pesto, courgettes, tomates cerises"
     }
    ],
    "note": "spaghetti, penne ou tagliatelle au choix"
   },
   {
    "id": "pizzas",
    "titre": "Pizzas",
    "lignes": [
     {
      "nom": "Margherita",
      "prix": 14.0,
      "description": "tomate, mozzarella, origan"
     },
     {
      "nom": "Funghi",
      "prix": 17.0,
      "description": "tomate, mozzarella, origan, champignons"
     },
     {
      "nom": "Prosciutto",
      "prix": 17.0,
      "description": "tomate, mozzarella, origan, jambon"
     },
     {
      "nom": "Salami",
      "prix": 17.0,
      "description": "tomate, mozzarella, origan, salami"
     },
     {
      "nom": "Capricciosa",
      "prix": 18.5,
      "description": "tomate, mozzarella, origan, jambon, champignons"
     },
     {
      "nom": "4 Fromages",
      "prix": 18.5,
      "description": "tomate, mozzarella, origan, taleggio, gorgonzola, parmesan"
     },
     {
      "nom": "Hawaï",
      "prix": 18.5,
      "description": "tomate, mozzarella, origan, jambon, ananas"
     },
     {
      "nom": "Tonno",
      "prix": 18.5,
      "description": "tomate, mozzarella, origan, thon, oignons"
     },
     {
      "nom": "Vegetariana",
      "prix": 20.0,
      "description": "tomate, mozzarella, origan, légumes de saison"
     },
     {
      "nom": "4 Stagioni",
      "prix": 20.5,
      "description": "tomate, mozzarella, origan, jambon, champignons, artichauts, olives"
     },
     {
      "nom": "Melanzane",
      "prix": 20.5,
      "description": "tomate, mozzarella, origan, aubergines, basilic, ricotta"
     },
     {
      "nom": "Chorizo",
      "prix": 20.0,
      "description": "tomate, mozzarella, origan, chorizo, champignons, œuf"
     },
     {
      "nom": "Chèvre",
      "prix": 20.0,
      "description": "tomate, mozzarella, origan, chèvre, épinards"
     },
     {
      "nom": "Caprese",
      "prix": 20.5,
      "description": "tomate, mozzarella fraîche, origan, tomates cerises, pesto, basilic"
     },
     {
      "nom": "Napoli",
      "prix": 21.5,
      "description": "tomate, mozzarella, origan, câpres, anchois, olives"
     },
     {
      "nom": "Scampis",
      "prix": 21.5,
      "description": "tomate, mozzarella, origan, scampis, ail"
     },
     {
      "nom": "Saumon",
      "prix": 21.5,
      "description": "tomate, mozzarella, origan, saumon fumé, oignons rouges"
     },
     {
      "nom": "Fruits de mer",
      "prix": 21.5,
      "description": "tomate, mozzarella, origan, fruits de mer, ail"
     },
     {
      "nom": "Catania",
      "prix": 21.5,
      "description": "tomate, mozzarella, origan, tomates fraîches, ail, jambon serrano, ricotta"
     },
     {
      "nom": "Maison",
      "prix": 23.0,
      "description": "tomate, mozzarella, origan, ail, aubergines, scampis, roquette, parmesan"
     }
    ]
   },
   {
    "id": "supplements-pizzas",
    "titre": "Suppléments pizzas",
    "lignes": [
     {
      "nom": "Salami, lardons, poivron, jambon, ricotta, aubergines, chorizo, gorgonzola, fromage de chèvre, pesto, roquette, basilic, artichauts, tomates cerises, oignons",
      "prix": 2.5,
      "liste": true
     },
     {
      "nom": "Jambon serrano, anchois, scampis, saumon",
      "prix": 6.0
     }
    ]
   },
   {
    "id": "escalopes-de-veau-panees",
    "titre": "Escalopes de veau panées",
    "lignes": [
     {
      "nom": "Napoli",
      "prix": 24.0,
      "description": "sauce tomate"
     },
     {
      "nom": "Funghi",
      "prix": 26.0,
      "description": "crème, champignons"
     },
     {
      "nom": "Pizzaiola",
      "prix": 27.0,
      "description": "sauce tomate, anchois, câpres, ail"
     },
     {
      "nom": "Norma",
      "prix": 27.0,
      "description": "sauce tomate, basilic, aubergines, ricotta"
     },
     {
      "nom": "Le Ponti",
      "prix": 28.0,
      "description": "gratinée, sauce tomate, tomates fraîches, mozzarella, jambon cuit, basilic"
     },
     {
      "nom": "Parmigiana",
      "prix": 28.0,
      "description": "gratinée, aubergines, sauce tomate, parmesan, basilic"
     }
    ],
    "note": "crudités et penne ou frites"
   },
   {
    "id": "escalopes-de-veau-non-panees",
    "titre": "Escalopes de veau non panées",
    "lignes": [
     {
      "nom": "Piccata lombarda",
      "prix": 28.0,
      "description": "citron et son jus de cuisson, réduit au vin blanc"
     },
     {
      "nom": "Saltimbocca à la romana",
      "prix": 30.0,
      "description": "copeaux de parmesan, jambon Serrano, feuille de sauge, jus de veau, réduit au vin blanc"
     }
    ],
    "note": "crudités et penne ou frites"
   },
   {
    "id": "viandes",
    "titre": "Viandes",
    "lignes": [
     {
      "nom": "Steak de bœuf, frites & salade",
      "prix": 22.0
     },
     {
      "nom": "Filet de volaille, crème champignon, frites, salade",
      "prix": 25.0
     },
     {
      "nom": "Noix d’entrecôte de Holstein, frites, salade",
      "prix": 30.0
     },
     {
      "nom": "Sauce Gorgonzola",
      "prix": 5.0,
      "description": "supplément"
     },
     {
      "nom": "Sauce Champignon crème",
      "prix": 5.0,
      "description": "supplément"
     },
     {
      "nom": "Sauce Crème poivre concassé",
      "prix": 4.0,
      "description": "supplément"
     },
     {
      "nom": "Sauce Crème poivre vert",
      "prix": 4.0,
      "description": "supplément"
     },
     {
      "nom": "Spaghetti, penne, tagliatelle ou frites",
      "prix": 5.0,
      "description": "supplément"
     },
     {
      "nom": "Légumes chauds",
      "prix": 3.0,
      "description": "supplément"
     }
    ]
   }
  ]
 },
 {
  "id": "rive",
  "titre": "L’autre rive",
  "accroche": "Douceurs maison, coupes et glaces.",
  "categories": [
   {
    "id": "douceurs-maison",
    "titre": "Douceurs maison",
    "lignes": [
     {
      "nom": "Tiramisu fruits rouges",
      "prix": 12.0,
      "description": "Revisité, fait maison. Mascarpone, fruits rouges, cacao."
     },
     {
      "nom": "Mousse au chocolat",
      "prix": 12.0,
      "description": "Fait maison. Chocolat noir, crème, cacao."
     },
     {
      "nom": "Sabayon minute",
      "prix": 12.0,
      "description": "Servi chaud sur glace vanille. Œuf, Marsala, vanille."
     },
     {
      "nom": "Colonel",
      "prix": 12.0,
      "description": "Sorbet citron & vodka."
     },
     {
      "nom": "Coupe Ponti Exotic",
      "prix": 13.5,
      "description": "Mangue, citron, framboise. Trait de Batida ou Safari."
     }
    ]
   },
   {
    "id": "coupes-et-glaces",
    "titre": "Coupes & glaces",
    "lignes": [
     {
      "nom": "Dame Blanche",
      "prix": 12.0,
      "description": "Glace vanille, chocolat chaud, chantilly"
     },
     {
      "nom": "Brésilienne",
      "prix": 12.0,
      "description": "Glace vanille, chocolat chaud, banane, chantilly"
     },
     {
      "nom": "Café Liégeois",
      "prix": 12.0,
      "description": "Glace café, espresso, chantilly"
     },
     {
      "nom": "Affogato",
      "prix": 9.0,
      "description": "Glace vanille & espresso chaud ; + Amaretto, Grappa ou Baileys : +2 €"
     },
     {
      "nom": "1 boule",
      "prix": 4.0,
      "description": "Vanille, Chocolat, Fraise, Citron, Mangue, Café"
     },
     {
      "nom": "2 boules",
      "prix": 7.0
     },
     {
      "nom": "3 boules",
      "prix": 10.0
     }
    ]
   }
  ]
 },
 {
  "id": "bar",
  "titre": "Au comptoir",
  "accroche": "Cocktails, sans alcool et digestifs.",
  "categories": [
   {
    "id": "cocktails-signatures",
    "titre": "Cocktails signatures",
    "lignes": [
     {
      "nom": "Ponti Signature",
      "prix": 14.0,
      "description": "Agrumes frais, touche de framboise"
     },
     {
      "nom": "Espresso Martini",
      "prix": 14.0,
      "description": "Espresso frais, vodka, légère touche sucrée"
     },
     {
      "nom": "Limoncello Fresco",
      "prix": 13.0,
      "description": "Limoncello, citron frais, rhum blanc, menthe"
     },
     {
      "nom": "Blue Heaven",
      "prix": 13.0,
      "description": "Gin, curaçao bleu, citron, tonic"
     },
     {
      "nom": "Spritz Ponti",
      "prix": 12.0,
      "description": "Aperol, prosecco, orange"
     }
    ]
   },
   {
    "id": "cocktails-classiques",
    "titre": "Cocktails classiques",
    "lignes": [
     {
      "nom": "Manhattan",
      "prix": 14.0,
      "description": "Whisky, vermouth rouge"
     },
     {
      "nom": "Mojito",
      "prix": 11.0,
      "description": "Menthe fraîche, citron vert, rhum, eau pétillante"
     },
     {
      "nom": "Tequila Sunrise",
      "prix": 13.0,
      "description": "Tequila, orange, grenadine"
     }
    ]
   },
   {
    "id": "cocktails-sans-alcool",
    "titre": "Cocktails sans alcool",
    "lignes": [
     {
      "nom": "Mojito",
      "prix": 9.0,
      "description": "Menthe fraîche, citron vert, sucre, eau pétillante"
     },
     {
      "nom": "Crodino Tonic",
      "prix": 9.0,
      "description": "Apéritif italien sans alcool, tonic"
     },
     {
      "nom": "Red Fresh",
      "prix": 9.0,
      "description": "Fruits rouges, citron, bulles"
     },
     {
      "nom": "Citrus Spritz",
      "prix": 9.0,
      "description": "Agrumes frais, bulles"
     }
    ]
   },
   {
    "id": "digestifs",
    "titre": "Digestifs",
    "lignes": [
     {
      "nom": "Limoncello",
      "prix": 9.0
     },
     {
      "nom": "Sambuca",
      "prix": 9.0
     },
     {
      "nom": "Grappa",
      "prix": 9.0
     },
     {
      "nom": "Amaretto",
      "prix": 10.0
     },
     {
      "nom": "Averna",
      "prix": 10.0
     },
     {
      "nom": "Fernet Branca",
      "prix": 9.5
     },
     {
      "nom": "Cognac Martell",
      "prix": 11.5
     },
     {
      "nom": "Calvados Boulard",
      "prix": 11.5
     },
     {
      "nom": "Grand Marnier",
      "prix": 11.0
     },
     {
      "nom": "Cointreau",
      "prix": 11.0
     }
    ]
   }
  ]
 }
];
