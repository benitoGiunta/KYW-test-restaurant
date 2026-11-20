// Carte de Don Dino : 115 plats réels extraits de la carte PDF du site actuel (data/restaurants/don-dino/donnees.json).
// Aucun plat inventé. Desserts et boissons absents de la source : non affichés.
export interface Plat { nom: string; description: string | null; prix: number }
export interface Categorie { id: string; nom: string; plats: Plat[] }
export const carte: Categorie[] = [
 {
  "id": "potages",
  "nom": "Potages",
  "plats": [
   {
    "nom": "Minestrone",
    "description": null,
    "prix": 9.9
   },
   {
    "nom": "Tortellini in brodo",
    "description": "bouillon de tortellini",
    "prix": 11
   },
   {
    "nom": "Crème de tomate",
    "description": null,
    "prix": 9.6
   }
  ]
 },
 {
  "id": "entrees-froides",
  "nom": "Entrées froides",
  "plats": [
   {
    "nom": "Anti pasti à l’Italienne",
    "description": "assortiment de charcuteries",
    "prix": 16
   },
   {
    "nom": "Jambon de Parme, crudités",
    "description": null,
    "prix": 15
   },
   {
    "nom": "Jambon de Parme, crudités, melon",
    "description": "en saison",
    "prix": 17.3
   },
   {
    "nom": "Carpaccio de bœuf",
    "description": null,
    "prix": 16.8
   },
   {
    "nom": "Carpaccio de bresaola",
    "description": null,
    "prix": 17.2
   },
   {
    "nom": "Saumon fumé et sa garniture",
    "description": null,
    "prix": 16.8
   },
   {
    "nom": "Tartare de saumon",
    "description": "saumon, balsamique, citron, huile, ciboulette, aneth",
    "prix": 16.8
   },
   {
    "nom": "Tomate de crevettes grises",
    "description": "1 pièce",
    "prix": 15.9
   },
   {
    "nom": "Tomate de crevettes grises",
    "description": "2 pièces",
    "prix": 25.4
   },
   {
    "nom": "Salade Caprèse",
    "description": null,
    "prix": 14.7
   }
  ]
 },
 {
  "id": "entrees-chaudes",
  "nom": "Entrées chaudes",
  "plats": [
   {
    "nom": "Roulés de prosciutto au fromage de chèvre",
    "description": "jambon, chèvre, roquette, ciboulette",
    "prix": 14
   },
   {
    "nom": "Moules gratinées",
    "description": null,
    "prix": 16.1
   },
   {
    "nom": "Escargots à l’ail",
    "description": null,
    "prix": 12.6
   },
   {
    "nom": "Escargots flambés au Ricard",
    "description": "tomate fraîche, Ricard, crème",
    "prix": 14.3
   },
   {
    "nom": "Cuisses de grenouille à l’ail",
    "description": null,
    "prix": 14.7
   },
   {
    "nom": "Cuisses de grenouille à la crème",
    "description": null,
    "prix": 16
   },
   {
    "nom": "Scampis à l’ail",
    "description": null,
    "prix": 15.7
   },
   {
    "nom": "Scampis à l’estragon",
    "description": "tomate fraîche, estragon, crème",
    "prix": 17.3
   },
   {
    "nom": "Scampis au gratin",
    "description": "sauce tomate, crème, mozzarella",
    "prix": 16.8
   },
   {
    "nom": "Brochette de scampis",
    "description": null,
    "prix": 16.2
   },
   {
    "nom": "Scampis fritti",
    "description": null,
    "prix": 16.2
   },
   {
    "nom": "Calamars fritti",
    "description": null,
    "prix": 15.3
   },
   {
    "nom": "Calamars à la Sicilienne",
    "description": "tomates cerises, ail, basilic",
    "prix": 16.2
   },
   {
    "nom": "Calamars à l’Italienne",
    "description": "sauce tomate, crème",
    "prix": 16.2
   },
   {
    "nom": "Fondu parmesan maison",
    "description": null,
    "prix": 14.8
   },
   {
    "nom": "Toast aux champignons à l’ail",
    "description": null,
    "prix": 12
   },
   {
    "nom": "Toast aux champignons à la crème",
    "description": null,
    "prix": 13.4
   },
   {
    "nom": "Salade frisée aux lardons et son œuf poché",
    "description": null,
    "prix": 17.2
   },
   {
    "nom": "Croquettes aux crevettes",
    "description": null,
    "prix": 16.8
   }
  ]
 },
 {
  "id": "pates",
  "nom": "Pâtes",
  "plats": [
   {
    "nom": "Spaghetti bolognaise",
    "description": "bolognaise maison",
    "prix": 14.6
   },
   {
    "nom": "Spaghetti carbonnara",
    "description": "lardons, œuf, parmesan, crème",
    "prix": 15.2
   },
   {
    "nom": "Spaghetti pesto",
    "description": null,
    "prix": 14.9
   },
   {
    "nom": "Spaghetti fruits de mer",
    "description": null,
    "prix": 16.2
   },
   {
    "nom": "Spaghetti vongole",
    "description": "tomate fraîche, palourdes, ail",
    "prix": 18.3
   },
   {
    "nom": "Tagliatelle au saumon fumé",
    "description": null,
    "prix": 18.3
   },
   {
    "nom": "Tagliatelle aux scampis",
    "description": null,
    "prix": 18.3
   },
   {
    "nom": "Penne arrabiata",
    "description": "tomate, piment",
    "prix": 13.8
   },
   {
    "nom": "Penne jambon crème",
    "description": null,
    "prix": 14.1
   },
   {
    "nom": "Penne 4 fromages",
    "description": null,
    "prix": 15.2
   },
   {
    "nom": "Penne méditerranéenne",
    "description": "sauce tomate, ail, thon, olives noires",
    "prix": 15.2
   },
   {
    "nom": "Penne puttanesca",
    "description": "ail, anchois, câpres, sauce tomate, olives",
    "prix": 15
   },
   {
    "nom": "Penne aux aubergines et parmesan",
    "description": "aubergine, ail, sauce tomate, basilic et parmesan",
    "prix": 15.4
   },
   {
    "nom": "Tortellini aux lardons et champignons",
    "description": null,
    "prix": 15.2
   },
   {
    "nom": "Tortellini Maître d’Hôtel",
    "description": "jambon, champignons, tomate, crème",
    "prix": 15.2
   }
  ]
 },
 {
  "id": "gratines",
  "nom": "Gratinés",
  "plats": [
   {
    "nom": "Lasagne maison à la bolognaise",
    "description": null,
    "prix": 15.4
   },
   {
    "nom": "Cannelloni à la viande",
    "description": null,
    "prix": 15.4
   },
   {
    "nom": "Cannelloni ricotta et épinards",
    "description": null,
    "prix": 16.2
   },
   {
    "nom": "Pasticcio",
    "description": "lasagne, œuf dur, petits pois",
    "prix": 16.4
   },
   {
    "nom": "Penne al forno",
    "description": "jambon, champignons, tomate, crème, mozzarella",
    "prix": 16.2
   }
  ]
 },
 {
  "id": "pizzas",
  "nom": "Pizzas",
  "plats": [
   {
    "nom": "Margherita",
    "description": "tomate, mozzarella",
    "prix": 10.5
   },
   {
    "nom": "Prosciutto",
    "description": "tomate, mozzarella, jambon",
    "prix": 12.6
   },
   {
    "nom": "Capri",
    "description": "tomate, mozzarella, jambon, champignons",
    "prix": 13.1
   },
   {
    "nom": "Hawaï",
    "description": "tomate, mozzarella, jambon, ananas",
    "prix": 13.1
   },
   {
    "nom": "Sicilia",
    "description": "tomate, mozzarella, anchois, olives, ail",
    "prix": 12.6
   },
   {
    "nom": "Diavola",
    "description": "tomate, mozzarella, salami piquant, champignons",
    "prix": 13.1
   },
   {
    "nom": "Bolognaise",
    "description": "sauce bolognaise, mozzarella, parmesan",
    "prix": 14
   },
   {
    "nom": "4 Stagione",
    "description": "tomate, mozzarella, jambon, champignons, œufs, artichauts",
    "prix": 14.1
   },
   {
    "nom": "Pescatora",
    "description": "tomate, mozzarella, fruits de mer, gambas, scampi, ail",
    "prix": 17.8
   },
   {
    "nom": "Mediterranea",
    "description": "tomate, mozzarella, scampi, oignon, fines herbes, brocoli",
    "prix": 17.3
   },
   {
    "nom": "4 formaggi",
    "description": "tomate, mozzarella, gorgonzola, taleggio, parmesan",
    "prix": 15
   },
   {
    "nom": "Al salmone",
    "description": "tomate, mozzarella, saumon fumé, oignons",
    "prix": 16.2
   },
   {
    "nom": "Dino",
    "description": "tomate, mozzarella, jambon, champignons, œuf, salami",
    "prix": 14.3
   },
   {
    "nom": "Calzone « fermée »",
    "description": "tomate, mozzarella, jambon, épinards, anchois",
    "prix": 13.1
   },
   {
    "nom": "Mafiosa",
    "description": "tomate, mozzarella, jambon, poivrons, œuf, anchois, ail",
    "prix": 14.1
   },
   {
    "nom": "Regina",
    "description": "tomate fraîche, mozzarella, oignon, ail, jambon de Parme, copeaux de parmesan, roquette",
    "prix": 15.6
   },
   {
    "nom": "Parmiggiana",
    "description": "tomate, mozzarella, aubergine, oignon, parmesan",
    "prix": 14.1
   },
   {
    "nom": "Végétariene",
    "description": "tomate, mozzarella, poivrons, aubergine, champignons, courgette",
    "prix": 14.3
   },
   {
    "nom": "Fiorentina",
    "description": "tomate, mozzarella, épinards, œuf, gorgonzala, champignons",
    "prix": 14.3
   },
   {
    "nom": "Cipolla",
    "description": "tomate, mozzarella, jambon, oignon",
    "prix": 13.1
   },
   {
    "nom": "Tonno",
    "description": "tomate, mozzarella, thon, oignon",
    "prix": 13.1
   },
   {
    "nom": "Maison",
    "description": "tomate fraîche, mozzarella, ail, oignon, jambon de Parme",
    "prix": 14.1
   },
   {
    "nom": "Brocoli",
    "description": "tomate, mozzarella, brocolis, lardons, ail",
    "prix": 13.1
   },
   {
    "nom": "Tartiflette",
    "description": "crème, pomme de terre, lardons, ail",
    "prix": 14.8
   },
   {
    "nom": "Chèvre",
    "description": "tomate, mozzarella, oignon, lardons, chèvre, miel",
    "prix": 16.2
   },
   {
    "nom": "Carbonnara",
    "description": "mozzarella, crème, pancetta, parmesan, œuf frais",
    "prix": 15.7
   }
  ]
 },
 {
  "id": "salades",
  "nom": "Salades",
  "plats": [
   {
    "nom": "Salade Berger",
    "description": "tomate, concombre, œuf dur, jambon, oignon, olives noires",
    "prix": 14.1
   },
   {
    "nom": "Salade de chèvre chaud",
    "description": "salades variées, chèvre, toast, noix, miel",
    "prix": 16.2
   },
   {
    "nom": "Salade Niçoise",
    "description": "salades variées, thon, anchois, olives, œuf dur, poivron, oignon",
    "prix": 15.7
   },
   {
    "nom": "Salade Campagnarde",
    "description": "salades variées, pancetta, oignon, pdt, tomate, œuf poché",
    "prix": 15.7
   },
   {
    "nom": "Salade haricots verts, saumon fumé, dés d’ananas",
    "description": null,
    "prix": 17.9
   },
   {
    "nom": "Salade Italienne",
    "description": "salades variées, tomate, mozzarella, Parme",
    "prix": 17.7
   }
  ]
 },
 {
  "id": "poissons",
  "nom": "Poissons",
  "plats": [
   {
    "nom": "Filet de sole Meunière",
    "description": "citron, beurre, persil",
    "prix": 24
   },
   {
    "nom": "Filet de sole aux amandes",
    "description": null,
    "prix": 25
   },
   {
    "nom": "Filet de sole aux gambas à la Vodka et au safran",
    "description": "Vodka, safran, crème",
    "prix": 27
   },
   {
    "nom": "Saumon au poivre rose ou à l’Estragon",
    "description": null,
    "prix": 23
   },
   {
    "nom": "Espadon à la Milanaise",
    "description": "échalotes, câpres, olives, raisins secs, sauce tomate",
    "prix": 26
   },
   {
    "nom": "Espadon à la Sicilienne",
    "description": "tomate fraîche, ail, basilic",
    "prix": 26
   }
  ]
 },
 {
  "id": "veau",
  "nom": "Veau",
  "plats": [
   {
    "nom": "Escalope Milanaise",
    "description": null,
    "prix": 19.9
   },
   {
    "nom": "Escalope Bolognaise",
    "description": null,
    "prix": 23.1
   },
   {
    "nom": "Escalope al forno",
    "description": "jambon, mozzarella, tomate, crème",
    "prix": 23.1
   },
   {
    "nom": "Escalope parmigiana",
    "description": "jambon, fromage, aubergine, sauce tomate",
    "prix": 23.6
   },
   {
    "nom": "Escalope grillée et légumes chauds",
    "description": null,
    "prix": 19.9
   },
   {
    "nom": "Picatta Lombarda",
    "description": "citron, beurre, vin blanc",
    "prix": 23.1
   },
   {
    "nom": "Saltimbucca",
    "description": "Parme, sauge, vin blanc",
    "prix": 23.9
   },
   {
    "nom": "Escalope Boscaiola",
    "description": "oignon, pancetta, champignons des bois, crème",
    "prix": 24.3
   },
   {
    "nom": "Escalope Florentine",
    "description": "épinards, œuf dur, crème",
    "prix": 24.1
   },
   {
    "nom": "Escalope Valdostana",
    "description": "jambon, fromage, sauce champignons, crème",
    "prix": 24.1
   },
   {
    "nom": "Escalope farcie au Parme",
    "description": "Parme, fromage, sauce tomate, ail, basilic",
    "prix": 23.4
   },
   {
    "nom": "Osso bucco",
    "description": null,
    "prix": 27.8
   },
   {
    "nom": "Rognons à la moutarde",
    "description": null,
    "prix": 25.9
   },
   {
    "nom": "Rognons façon du chef",
    "description": "champignons, poivre vert, crème",
    "prix": 25.9
   },
   {
    "nom": "Rognons au vin rouge",
    "description": "champignons, vin rouge, tomate",
    "prix": 25.9
   }
  ]
 },
 {
  "id": "boeuf",
  "nom": "Bœuf",
  "plats": [
   {
    "nom": "Steak grillé ou nature",
    "description": null,
    "prix": 21.7
   },
   {
    "nom": "Entrecôte grillée ou nature",
    "description": null,
    "prix": 24.8
   },
   {
    "nom": "Brochette de bœuf",
    "description": null,
    "prix": 23.8
   },
   {
    "nom": "Tagliata de bœuf",
    "description": "roquette, copeaux de parmesan, crème de balsamique",
    "prix": 24.8
   },
   {
    "nom": "Mixed grilled",
    "description": "par couvert, minimum 2",
    "prix": 35.7
   }
  ]
 },
 {
  "id": "sauces",
  "nom": "Sauces",
  "plats": [
   {
    "nom": "Pizzaiola - Gorgonzola",
    "description": "ail, câpres, olives, sauce tomate",
    "prix": 3.5
   },
   {
    "nom": "Béarnaise - choron",
    "description": null,
    "prix": 4
   },
   {
    "nom": "Mayonnaise - Ketchup - Moutarde",
    "description": null,
    "prix": 1
   }
  ]
 },
 {
  "id": "agneau",
  "nom": "Agneau",
  "plats": [
   {
    "nom": "Côtes d’agneau grillées et haricots verts",
    "description": null,
    "prix": 24.6
   },
   {
    "nom": "Brochette d’agneau",
    "description": null,
    "prix": 24.6
   }
  ]
 }
];
