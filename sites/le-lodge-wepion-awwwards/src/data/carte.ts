// Carte du Lodge, copiée de data/restaurants/le-lodge-wepion/donnees.json (diaporama du site lodgewepion.be, relevé du 20/11/2026).
// Carte de saison d'avant l'incendie : celle du relais d'Erpent peut différer (à confirmer). Aucun plat ni prix inventé.
export interface Plat { nom: string; description: string | null; prix: number; placeholder?: boolean }
export interface Categorie { id: string; titre: string; plats: Plat[] }
export const carte: Categorie[] = [
 {
  "id": "partager",
  "titre": "À partager",
  "plats": [
   {
    "nom": "Calamars frits",
    "description": "Sauce aïoli à l’encre de seiche",
    "prix": 10
   },
   {
    "nom": "Mini croquettes de fromage de Poteaupré (Chimay)",
    "description": null,
    "prix": 10
   },
   {
    "nom": "Le houmous de Zaim",
    "description": "Pois chiches croquants épicés et tahinés, toasts",
    "prix": 10
   },
   {
    "nom": "Mini saucissons naturels",
    "description": "Origine France",
    "prix": 10
   },
   {
    "nom": "Gouda AOP",
    "description": "Sel de céleri maison",
    "prix": 10
   },
   {
    "nom": "Assiette apéritive",
    "description": "Avec les 5 assortiments (remplace une entrée)",
    "prix": 20
   },
   {
    "nom": "Pinsa jambon italien",
    "description": "Tomates confites, rucola, burrata",
    "prix": 18
   }
  ]
 },
 {
  "id": "entrees",
  "titre": "Les entrées",
  "plats": [
   {
    "nom": "La poêlée de scampis",
    "description": "Crème d’ail ou diabolique",
    "prix": 19
   },
   {
    "nom": "Le tartare de bœuf à l’italienne",
    "description": "Tartufata, parmesan, grissini",
    "prix": 16
   },
   {
    "nom": "Carpaccio de bœuf",
    "description": "Copeaux de parmesan, tomates confites",
    "prix": 16
   },
   {
    "nom": "Croquettes de crevettes grises",
    "description": "Persil frit et citron (1 pièce 15,00 / 2 pièces 24,00)",
    "prix": 15
   },
   {
    "nom": "Fondus fromage",
    "description": "Fromage de Chimay Poteaupré, salade, parmesan",
    "prix": 16
   },
   {
    "nom": "Saumon mariné maison",
    "description": "Saumon mariné et asperges blanches en tartare, pomme Granny, sauce tartare",
    "prix": 19
   },
   {
    "nom": "Les asperges à la flamande",
    "description": null,
    "prix": 19
   },
   {
    "nom": "La croquette de ris de veau",
    "description": "Asperges rôties, vinaigrette garriguette",
    "prix": 19
   }
  ]
 },
 {
  "id": "salades",
  "titre": "Les salades",
  "plats": [
   {
    "nom": "La salade gourmande",
    "description": "Haricots, ananas, saumon mariné, grenade, houmous, salade romaine, burrata",
    "prix": 24
   },
   {
    "nom": "La salade chèvre",
    "description": "Noix, croûtons de pain d’épice, miel, raisins secs, pomme Granny",
    "prix": 24
   },
   {
    "nom": "La salade de volaille croustillante",
    "description": "Comme une César : sucrine, œuf dur, légumes pickles, croûtons, parmesan",
    "prix": 24
   },
   {
    "nom": "La salade avocat",
    "description": "Tartare d’avocat, guacamole, croquettes de fromage de Poteaupré, roquette, sucrine, pistaches, vinaigrette balsamique",
    "prix": 22
   },
   {
    "nom": "Carpaccio de bœuf (plat)",
    "description": "Copeaux de parmesan, tomates confites",
    "prix": 26
   }
  ]
 },
 {
  "id": "viandes",
  "titre": "Les viandes",
  "plats": [
   {
    "nom": "Les boulettes maison",
    "description": "Sauce tomate ou liégeoise, viande de porc qualité Ardenne, p. frites",
    "prix": 20
   },
   {
    "nom": "Le vol-au-vent maison",
    "description": "Quenelles de volaille, champignons",
    "prix": 22
   },
   {
    "nom": "Pavé de bœuf Hereford",
    "description": null,
    "prix": 29
   },
   {
    "nom": "Entrecôte à l’os irlandaise",
    "description": null,
    "prix": 41
   },
   {
    "nom": "Magret de canard",
    "description": "Ferme de La Sauvenière, cuit basse température, sauce poivre, gratin dauphinois",
    "prix": 32
   },
   {
    "nom": "Les rognons de veau",
    "description": "Crème de moutarde Bister",
    "prix": 26
   },
   {
    "nom": "Le jambonneau à l’ancienne PQA",
    "description": "Pané à la Bister, sauce béarnaise",
    "prix": 25
   },
   {
    "nom": "La tagliata de bœuf à l’italienne",
    "description": "Roquette, parmesan, tomates confites, crème de balsamique",
    "prix": 32
   },
   {
    "nom": "Filet pur de bœuf",
    "description": "Sauce au choix, frites maison",
    "prix": 41
   }
  ]
 },
 {
  "id": "tartares",
  "titre": "Les tartares",
  "plats": [
   {
    "nom": "Nature",
    "description": "Préparé par vos soins",
    "prix": 22
   },
   {
    "nom": "Le préparé par nos soins",
    "description": null,
    "prix": 24
   },
   {
    "nom": "L’Italien",
    "description": "Parmesan, tartufata, sésame, pepperoni, huile au pesto",
    "prix": 24
   },
   {
    "nom": "L’Asiatique",
    "description": "Sauce soja, gingembre, curry vert, sésame, oignons cébette",
    "prix": 24
   }
  ]
 },
 {
  "id": "burgers",
  "titre": "Les burgers",
  "plats": [
   {
    "nom": "Le Classic",
    "description": "Pur bœuf, cheddar, tomate, oignons, lard, sauce maison, pain buns rustique",
    "prix": 22
   },
   {
    "nom": "Burger américain",
    "description": "Pulled pork, peperoncini, oignons pickles, sucrine",
    "prix": 22
   },
   {
    "nom": "Filet de volaille croustillante",
    "description": "Tomate, oignons, cheddar, sauce curry, sucrine",
    "prix": 22
   },
   {
    "nom": "Le burger végétarien",
    "description": "Mesclun, oignons rouges, crème de pepperoni Marimati",
    "prix": 21
   }
  ]
 },
 {
  "id": "poissons",
  "titre": "Les poissons",
  "plats": [
   {
    "nom": "Trio de solettes meunières",
    "description": "Pommes frites",
    "prix": 36
   },
   {
    "nom": "Truite d’Annevoie rôtie au beurre",
    "description": "Fines herbes, pommes de terre grenailles",
    "prix": 26
   },
   {
    "nom": "Tataki de thon",
    "description": "Salade romaine snackée, vinaigrette d’agrumes, aïoli à l’encre de seiche, croûtons, grenade, tuile de riz",
    "prix": 34
   }
  ]
 },
 {
  "id": "pates",
  "titre": "Les pâtes artisanales",
  "plats": [
   {
    "nom": "La réginette aux scampis",
    "description": null,
    "prix": 22
   },
   {
    "nom": "Les spaghettis carbonara",
    "description": null,
    "prix": 20
   },
   {
    "nom": "La Tubi Floreali",
    "description": "Burrata, crème à la tartufata",
    "prix": 24
   },
   {
    "nom": "Comme une lasagne",
    "description": "Aubergine parmigiana",
    "prix": 24
   }
  ]
 },
 {
  "id": "suggestions",
  "titre": "Les suggestions du moment",
  "plats": [
   {
    "nom": "Fricassée de veau épicée à l’andalouse",
    "description": "Gnocchis poêlés, poivrons rouges",
    "prix": 29
   },
   {
    "nom": "Filet de volaille jaune farci",
    "description": "Tomates séchées, aubergine parmigiano",
    "prix": 27
   },
   {
    "nom": "Ris de veau crème de morilles",
    "description": "Gratin de pommes de terre, asperges blanches",
    "prix": 42
   }
  ]
 },
 {
  "id": "bambins",
  "titre": "Pour les bambins",
  "plats": [
   {
    "nom": "Pennes carbonara",
    "description": null,
    "prix": 12
   },
   {
    "nom": "Boulette tomate",
    "description": "1 pièce, frites",
    "prix": 12
   },
   {
    "nom": "Steak haché",
    "description": "Frites, salade, ketchup",
    "prix": 12
   },
   {
    "nom": "Les nuggets de poulet maison",
    "description": "Salade et ketchup",
    "prix": 12
   }
  ]
 },
 {
  "id": "accompagnements",
  "titre": "Accompagnements",
  "plats": [
   {
    "nom": "Les sauces maison",
    "description": "Poivre vert, grand-mère, béarnaise",
    "prix": 4
   },
   {
    "nom": "Sauce crème morilles",
    "description": null,
    "prix": 7
   },
   {
    "nom": "Sauces froides",
    "description": "Mayonnaise maison, moutarde, ketchup",
    "prix": 1
   },
   {
    "nom": "Frites ou pommes de terre grenailles",
    "description": null,
    "prix": 2
   },
   {
    "nom": "Gratin dauphinois",
    "description": null,
    "prix": 3.5
   },
   {
    "nom": "Boîte à emporter",
    "description": null,
    "prix": 1
   }
  ]
 },
 {
  "id": "glaces",
  "titre": "Les glaces Pagotini",
  "plats": [
   {
    "nom": "Dame blanche ou dame noire",
    "description": null,
    "prix": 10
   },
   {
    "nom": "Dame blanche ou noire enfant",
    "description": null,
    "prix": 7
   },
   {
    "nom": "Assiette sorbets",
    "description": "Citron, framboises, fruits frais",
    "prix": 10
   },
   {
    "nom": "Brésilienne",
    "description": "2 boules moka, 1 boule vanille, caramel maison",
    "prix": 10
   },
   {
    "nom": "Colonel",
    "description": "2 boules de sorbet citron et vodka",
    "prix": 12
   },
   {
    "nom": "Pistache",
    "description": "2 boules pistache, 1 boule vanille",
    "prix": 12
   },
   {
    "nom": "Wépion",
    "description": "Fraises fraîches, 1 boule vanille, 2 boules fraise, coulis de fraises",
    "prix": 12
   }
  ]
 },
 {
  "id": "desserts",
  "titre": "Les desserts",
  "plats": [
   {
    "nom": "Feuilleté à la fraise",
    "description": "Crème mascarpone, fraises du pays, coulis",
    "prix": 13
   },
   {
    "nom": "La coupe de fraises de Wépion",
    "description": "Coulis de fraises",
    "prix": 12
   },
   {
    "nom": "Mousse au chocolat",
    "description": "Copeaux de chocolat",
    "prix": 12
   },
   {
    "nom": "Le traditionnel tiramisu",
    "description": "Au spéculoos",
    "prix": 12
   },
   {
    "nom": "Mini baba au rhum",
    "description": "Glace rhum raisin",
    "prix": 12
   },
   {
    "nom": "Carpaccio d’ananas",
    "description": "Mini baba rhum, glace rhum raisin",
    "prix": 14
   },
   {
    "nom": "Crème brûlée",
    "description": null,
    "prix": 10
   },
   {
    "nom": "Le gourmand",
    "description": "Assortiment de mini desserts maison",
    "prix": 12
   },
   {
    "nom": "Pain perdu brioché pur beurre",
    "description": "Pommes, caramel beurre salé, glace vanille",
    "prix": 12
   },
   {
    "nom": "Moelleux au chocolat coulant",
    "description": "Coulis de fruits rouges, glace au lait d’amande",
    "prix": 12
   }
  ]
 },
 {
  "id": "crepes",
  "titre": "Crêpes et gaufres",
  "plats": [
   {
    "nom": "Sucre ou cassonade",
    "description": null,
    "prix": 8
   },
   {
    "nom": "Chantilly",
    "description": null,
    "prix": 8
   },
   {
    "nom": "Mikado",
    "description": null,
    "prix": 10
   },
   {
    "nom": "Wépion",
    "description": "Fraises fraîches, coulis de fraises, 1 boule fraise",
    "prix": 12
   }
  ]
 },
 {
  "id": "boissons",
  "titre": "Boissons (extraits)",
  "plats": [
   {
    "nom": "Eau Vittel 25 cl",
    "description": null,
    "prix": 3
   },
   {
    "nom": "Stella Artois pression 25 cl",
    "description": null,
    "prix": 3
   },
   {
    "nom": "Chimay Bleue pression 25 cl",
    "description": null,
    "prix": 6
   },
   {
    "nom": "La Houppe (Brasserie de Namur) 25 cl",
    "description": null,
    "prix": 4.5
   },
   {
    "nom": "Café ou décaféiné",
    "description": null,
    "prix": 4
   },
   {
    "nom": "Cappuccino",
    "description": null,
    "prix": 4.5
   },
   {
    "nom": "Coupe de crémant d’Alsace Katz",
    "description": null,
    "prix": 12
   },
   {
    "nom": "Hugo crémant",
    "description": "Sirop de sureau de Wépion fait maison",
    "prix": 11
   },
   {
    "nom": "Apérol Spritz",
    "description": null,
    "prix": 12
   },
   {
    "nom": "Gin de Chimay",
    "description": "Houblon et pin, accompagnement Fever Tree",
    "prix": 15
   }
  ]
 }
];
