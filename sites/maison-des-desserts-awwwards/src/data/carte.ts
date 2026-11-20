// Carte transcrite de data/restaurants/maison-des-desserts/donnees.json (carte PDF du site client, 142 lignes).
// Organisation en chapitres de la journée : choix éditorial, les horaires de service viennent du site et de la carte.
// Prix incertains (lecture du PDF) : `aConfirmer: true` (chocolat chaud viennois, mignardises : voir RAPPORT.md).
export interface Plat { nom: string; description?: string; prix?: number; unite?: string; prixTexte?: string; aConfirmer?: boolean; placeholder?: boolean }
export interface Section { titre: string; note?: string; plats: Plat[] }
export interface Chapitre { id: string; heure: string; fin?: string; titre: string; ton: 'matin' | 'midi' | 'gouter' | 'soir'; sections: Section[] }
export const NOMBRE_LIGNES = 142;
export const chapitres: Chapitre[] = [
 {
  "id": "petit-dejeuner",
  "heure": "8 h 30",
  "fin": "10 h 30",
  "titre": "Le petit déjeuner",
  "ton": "matin",
  "sections": [
   {
    "titre": "Petit déjeuner et sur le pouce",
    "note": "Servi de 8 h 30 à 10 h 30",
    "plats": [
     {
      "nom": "Bulles au déjeuner",
      "description": "Sur réservation, minimum 2 personnes",
      "prix": 20,
      "unite": "par personne"
     },
     {
      "nom": "Wake up !",
      "description": "1 viennoiserie, 1 boisson chaude, 1 jus de fruits frais",
      "prix": 8.5
     },
     {
      "nom": "Sandwich garni",
      "prix": 4.5
     }
    ]
   }
  ]
 },
 {
  "id": "sucre-du-moment",
  "heure": "9 h",
  "fin": "17 h 30",
  "titre": "Desserts et boissons du moment",
  "ton": "matin",
  "sections": [
   {
    "titre": "Suggestions desserts et boissons",
    "note": "De 9 h à 17 h 30",
    "plats": [
     {
      "nom": "Pain perdu",
      "description": "Poires, glace vanille, caramel",
      "prix": 12
     },
     {
      "nom": "Chouquette",
      "description": "Glace vanille, chantilly, chocolat chaud",
      "prix": 12
     },
     {
      "nom": "Boule de Berlin",
      "description": "Pommes caramélisées, crème légère vanille praliné",
      "prix": 11
     },
     {
      "nom": "Vin chaud maison",
      "prix": 6
     },
     {
      "nom": "Thé vert Macaron Cassis Violette",
      "prix": 4.5
     },
     {
      "nom": "Latte matcha",
      "prix": 5
     },
     {
      "nom": "Latte macchiato pop-corn",
      "prix": 4.6
     },
     {
      "nom": "Latte macchiato spéculoos",
      "prix": 4.6
     },
     {
      "nom": "Bière Vulpio blonde (5 % vol.)",
      "prix": 5
     },
     {
      "nom": "Bière Vulpio ambrée (8,2 % vol.)",
      "prix": 5
     },
     {
      "nom": "Bière Vulpio triple (8 % vol.)",
      "prix": 5
     }
    ]
   }
  ]
 },
 {
  "id": "cuisine",
  "heure": "11 h 30",
  "fin": "17 h 30",
  "titre": "La cuisine",
  "ton": "midi",
  "sections": [
   {
    "titre": "Suggestions du moment",
    "note": "Carte d’automne, sur ardoise",
    "plats": [
     {
      "nom": "Pavé de bœuf irlandais 300 g",
      "description": "Sauce béarnaise, roquefort, champignons ou poivre ; accompagnement frites, pâtes, grenailles ou gratin dauphinois",
      "prix": 28
     },
     {
      "nom": "Vol-au-vent",
      "description": "Feuilleté, salade d'herbes, frites",
      "prix": 24
     },
     {
      "nom": "Filet de faisan à la Brabançonne",
      "description": "Chicons, pommes dauphines, légumes vapeur",
      "prix": 27
     },
     {
      "nom": "Saumon rôti",
      "description": "Pommade de butternut, noisettes, bouillon crémé",
      "prix": 26
     },
     {
      "nom": "Salade d'automne",
      "description": "Pâté de gibier, foie gras, croquette de canard, figue, mesclun",
      "prix": 24
     },
     {
      "nom": "Burger raclette",
      "description": "Steak haché pur bœuf, coppa, fromage à raclette, oignons confits, mayonnaise, laitue, frites",
      "prix": 22
     },
     {
      "nom": "Quiche aux chicons",
      "description": "Jambon, emmental, salade",
      "prix": 17
     },
     {
      "nom": "Ravioles",
      "description": "Fromages de montagne, bresaola, roquette à la truffe",
      "prix": 22
     },
     {
      "nom": "Avisance de Namur maison",
      "description": "Pâte feuilletée, viande hachée, salade ; sauce moutarde, roquefort, champignons ou poivre",
      "prix": 17
     },
     {
      "nom": "Croque Normand",
      "description": "Pain grillé, lard braisé, poires, gratiné au camembert, salade",
      "prix": 17
     }
    ]
   },
   {
    "titre": "Servie de 11 h 30 à 17 h 30",
    "plats": [
     {
      "nom": "Le feuilleté jambon fromage",
      "description": "Feuilleté farci jambon / fromage, salade",
      "prix": 15
     },
     {
      "nom": "Les quiches au choix",
      "description": "Lorraine, chèvre / brocolis, saumon / épinards, scampis / gorgonzola, petits légumes, la saisonnière, salade",
      "prix": 17
     },
     {
      "nom": "La farandole de quiches",
      "description": "Assortiment du jour, salade, vinaigrette miel / moutarde",
      "prix": 19
     },
     {
      "nom": "Les pâtes jambon crème fromage",
      "description": "Penne, jambon, crème, emmenthal",
      "prix": 15
     },
     {
      "nom": "Le burger « parma »",
      "description": "Burger toasté, jambon de Parme, parmesan, roquette, légumes grillés marinés",
      "prix": 17
     },
     {
      "nom": "La salade Roma",
      "description": "Mesclun, jambon, pecorino, artichauts, tomates, asperges thaïes, basilic, olives, vinaigrette",
      "prix": 21
     },
     {
      "nom": "La salade Caesar",
      "description": "Mesclun, poulet grillé, coppa, tomates, oignons, parmesan, vinaigrette anchois, sauce curry",
      "prix": 21
     },
     {
      "nom": "La salade de chèvre",
      "description": "Mesclun, chèvres chauds, coppa, tomates, concombre, pommes, sirop miel / balsamique",
      "prix": 21
     }
    ]
   },
   {
    "titre": "Servie de 12 h à 15 h",
    "plats": [
     {
      "nom": "Le croque midi",
      "description": "Croque monsieur gratiné, crudités (samedi 12h00-17h30)",
      "prix": 16
     },
     {
      "nom": "Le croque hawaï",
      "description": "Croque monsieur, ananas, crudités (samedi 12h00-17h30)",
      "prix": 16.5
     },
     {
      "nom": "Le croque « Maison des desserts »",
      "description": "Trois demi-croques : jambon cuit, jambon d'Ardenne, saumon fumé, crudités (samedi 12h00-17h30)",
      "prix": 18
     },
     {
      "nom": "Le burger cotoletta",
      "description": "Burger toasté, poulet croustillant, cheddar, crudités, sauce tartare",
      "prix": 19
     },
     {
      "nom": "Le burger rustique",
      "description": "Viande de bœuf, laitue, emmental, tomate, frites, sauce au poivre",
      "prix": 20
     },
     {
      "nom": "Le Poke Bowl",
      "description": "Mesclun, riz gluant, saumon, scampis frits, mangue, choux, avocat, sésame, sauce soja",
      "prix": 24
     },
     {
      "nom": "Les cannellonis",
      "description": "Farcis à la viande et aux épinards, sauce tomate, crème parmesan, petits légumes",
      "prix": 20
     }
    ]
   }
  ]
 },
 {
  "id": "gouter",
  "heure": "Après-midi",
  "titre": "Pâtisseries, crêpes, glaces, gaufres",
  "ton": "gouter",
  "sections": [
   {
    "titre": "Pâtisseries et assiettes",
    "plats": [
     {
      "nom": "Pâtisseries du comptoir",
      "description": "Choix à commander au comptoir (majoré de la TVA et du service)"
     },
     {
      "nom": "Trilogie de gâteaux au chocolat",
      "description": "Servie avec glace et crème anglaise",
      "prix": 13.6
     },
     {
      "nom": "Trilogie de gâteaux aux fruits frais",
      "description": "Servie avec sorbet et coulis",
      "prix": 13.6
     },
     {
      "nom": "La grande assiette « Maison des Desserts »",
      "description": "Gâteaux aux fruits, gâteaux au chocolat, coulis, crème anglaise, glace",
      "prix": 18
     },
     {
      "nom": "L'Apple pie",
      "description": "Glace vanille ou spéculoos, crème anglaise et coulis",
      "prix": 10
     },
     {
      "nom": "Le moelleux au chocolat",
      "description": "Glace vanille, crème anglaise pistache",
      "prix": 10
     },
     {
      "nom": "Le saladier de fruits frais nature",
      "prix": 10.7
     },
     {
      "nom": "Le saladier de fruits frais avec coulis et crème fraîche",
      "prix": 11.2
     },
     {
      "nom": "Trio de crèmes brûlées",
      "prix": 10
     },
     {
      "nom": "Omelette norvégienne flambée",
      "prix": 12.3
     }
    ]
   },
   {
    "titre": "Crêpes",
    "plats": [
     {
      "nom": "Crêpes nature trio de sucre",
      "prix": 8.6
     },
     {
      "nom": "Crêpes au beurre",
      "prix": 8.9
     },
     {
      "nom": "Crêpes du chocolatier",
      "description": "Chocolat chaud, chantilly",
      "prix": 11.2
     },
     {
      "nom": "Crêpes confiture",
      "description": "Groseilles, framboises, cerises, fraises",
      "prix": 9.8
     },
     {
      "nom": "Crêpes banane chocolat chaud",
      "prix": 12.8
     },
     {
      "nom": "Crêpes Mikado",
      "description": "Crème pâtissière, chocolat chaud, chantilly",
      "prix": 12.8
     },
     {
      "nom": "Crêpes du glacier",
      "description": "Glace vanille, chocolat chaud, chantilly",
      "prix": 12.8
     },
     {
      "nom": "Crêpes de la « Maison des Desserts »",
      "description": "Crème pâtissière pralinée, amandes, noisettes",
      "prix": 12.8
     },
     {
      "nom": "Crêpes Belle-Hélène",
      "description": "Poires chaudes, chocolat chaud, chantilly",
      "prix": 12.8
     },
     {
      "nom": "Crêpes frangipane",
      "description": "Frangipane, crème pâtissière, amandes torréfiées",
      "prix": 12.8
     },
     {
      "nom": "Crêpes aux fruits frais de saison, coulis",
      "prix": 14.4
     },
     {
      "nom": "Crêpe normande caramélisée",
      "prix": 17.1
     },
     {
      "nom": "Crêpe normande caramélisée, flambée calvados",
      "prix": 18.2
     },
     {
      "nom": "Crêpes Suzette",
      "description": "Jus d'orange, flambé Grand Marnier",
      "prix": 11.8
     },
     {
      "nom": "Crêpes Comédie française",
      "description": "Jus d'orange, flambé Grand Marnier, glace vanille",
      "prix": 15.5
     }
    ]
   },
   {
    "titre": "Glaces",
    "plats": [
     {
      "nom": "Coupe enfant, parfum au choix",
      "prix": 6.6
     },
     {
      "nom": "Coupe vanille / chocolat / pralinée / moka / pistache / fraise",
      "prix": 9.6
     },
     {
      "nom": "Trio de sorbets",
      "prix": 9.6
     },
     {
      "nom": "Coupe Brésilienne",
      "prix": 10.6
     },
     {
      "nom": "Café liégeois",
      "prix": 10.6
     },
     {
      "nom": "Dame blanche",
      "prix": 10.6
     },
     {
      "nom": "Banana split",
      "description": "Glace vanille, bananes, chocolat chaud",
      "prix": 11.1
     },
     {
      "nom": "Coupe « Jacques »",
      "description": "Glace vanille, fruits frais, coulis",
      "prix": 13.1
     },
     {
      "nom": "Coupe pêche Melba",
      "description": "Glace pralinée, pêches",
      "prix": 13.1
     },
     {
      "nom": "Coupe fraise Melba",
      "description": "Glace vanille, fraises, coulis ou chocolat chaud (supplément 2 € hors saison)",
      "prix": 13.1
     },
     {
      "nom": "Coupe Amarena",
      "description": "Glace pistache, cerises Amarena, crème fraîche",
      "prix": 10.5
     },
     {
      "nom": "Coupe Belle-Hélène",
      "description": "Glace vanille, poires, chocolat chaud",
      "prix": 13
     },
     {
      "nom": "Assiette « Maison des Desserts »",
      "description": "Assortiment de 9 parfums, coulis",
      "prix": 20
     },
     {
      "nom": "Parfait Nougatine",
      "description": "Assortiment de 7 parfums, coulis, fruits frais",
      "prix": 20
     },
     {
      "nom": "Suprême chocolaté",
      "description": "Glace biétrumé, chocolat blanc, chocolat fondant, glace pralinée",
      "prix": 13.1
     }
    ]
   },
   {
    "titre": "Gaufres, vacherins et milk-shakes",
    "plats": [
     {
      "nom": "Gaufre au sucre",
      "prix": 8.6
     },
     {
      "nom": "Gaufre au beurre",
      "prix": 8.7
     },
     {
      "nom": "Gaufre crème fraîche",
      "prix": 10
     },
     {
      "nom": "Gaufre du glacier",
      "description": "Crème fraîche et glace vanille",
      "prix": 12.2
     },
     {
      "nom": "Gaufre au chocolat",
      "description": "Crème fraîche et chocolat chaud",
      "prix": 12.7
     },
     {
      "nom": "Gaufre banane chocolat chaud",
      "prix": 12.8
     },
     {
      "nom": "Gaufre aux fraises",
      "description": "Supplément 2 € hors saison",
      "prix": 14.4
     },
     {
      "nom": "Gaufre « Tutti Frutti »",
      "prix": 13.9
     },
     {
      "nom": "Vacherin praliné",
      "description": "Meringue, glace pralinée, pêches, crème fraîche, amandes effilées",
      "prix": 13.3
     },
     {
      "nom": "Vacherin au chocolat",
      "description": "Meringue, glace chocolat, crème fraîche, copeaux de chocolat",
      "prix": 13.3
     },
     {
      "nom": "Vacherin aux fraises",
      "description": "Meringue, glace vanille, fraises, crème fraîche, amandes effilées (supplément 1 € hors saison)",
      "prix": 14.4
     },
     {
      "nom": "Milk-shakes vanille, chocolat, moka, banane",
      "prix": 8.2
     },
     {
      "nom": "Milk-shakes fraise, framboise",
      "prix": 8.2
     }
    ]
   }
  ]
 },
 {
  "id": "boissons",
  "heure": "Toute la journée",
  "titre": "Boissons",
  "ton": "gouter",
  "sections": [
   {
    "titre": "Boissons chaudes",
    "plats": [
     {
      "nom": "Café expresso",
      "prix": 3.6
     },
     {
      "nom": "Café expresso décaféiné",
      "prix": 3.6
     },
     {
      "nom": "Petit café expresso",
      "prix": 3.6
     },
     {
      "nom": "Double café expresso",
      "prix": 4.6
     },
     {
      "nom": "Café cafetière",
      "prix": 4.5
     },
     {
      "nom": "Cappuccino chantilly",
      "prix": 4.2
     },
     {
      "nom": "Cappuccino mousse de lait",
      "prix": 4
     },
     {
      "nom": "Latte macchiato",
      "prix": 4.8
     },
     {
      "nom": "Latte macchiato aromatisé (caramel, vanille, praliné, amaretto)",
      "prix": 5
     },
     {
      "nom": "Lait chaud",
      "prix": 4.2
     },
     {
      "nom": "Lait russe",
      "prix": 4.5
     },
     {
      "nom": "Chocolat chaud chocolatière",
      "prix": 4.8
     },
     {
      "nom": "Chocolat chaud viennois",
      "aConfirmer": true
     },
     {
      "nom": "Irish coffee",
      "prix": 9
     },
     {
      "nom": "Mignardises (2 pralines et 2 biscuits)",
      "prix": 3.5,
      "aConfirmer": true
     },
     {
      "nom": "Thés verts, noirs, infusions et rooibos (gamme d'une vingtaine de références)",
      "description": "Dont Miss Damann, Soleil vert, Earl Grey, Darjeeling, Provence, Samba, Citrus, Rooibos vanille",
      "prix": 4.5
     }
    ]
   },
   {
    "titre": "Boissons froides, bières et vins",
    "plats": [
     {
      "nom": "Jus de fruits pressés (orange, pamplemousse, cocktail)",
      "prix": 5
     },
     {
      "nom": "Chaudfontaine pétillante ou plate 25 cl",
      "prix": 3.5
     },
     {
      "nom": "Chaudfontaine pétillante ou plate 50 cl",
      "prix": 6.1
     },
     {
      "nom": "Jus de pomme (nature, framboise, cerise, poire)",
      "prix": 3.9
     },
     {
      "nom": "Sodas (Coca-Cola, Fanta, Sprite, San Pellegrino, Royal Bliss)",
      "prix": 3.5
     },
     {
      "nom": "Limonades (fruit de la passion, hibiscus), thé glacé maison, thé pêche pétillant",
      "prix": 4.9
     },
     {
      "nom": "Stella",
      "prix": 3.5
     },
     {
      "nom": "Carlsberg",
      "prix": 4
     },
     {
      "nom": "Blanche de Namur (et rosée)",
      "prix": 4
     },
     {
      "nom": "Cuvée de Leffe blonde ou brune",
      "prix": 4.5
     },
     {
      "nom": "Bières Houppe (Baden skiff, Houla 0,3 %, Classic triple, Jambes en l'air) et Vulpio",
      "prix": 5
     },
     {
      "nom": "Orval",
      "prix": 6
     },
     {
      "nom": "Vins au verre (Pinot blanc, Pinot gris, Muscat d'Alsace, Hauts de Lalande, Pinot noir…)",
      "description": "Carte de vins alsaciens et du Languedoc, bouteilles de 14,00 € à 29,00 € ; crémant d'Alsace 6,50 € le verre, Kir royal 7,00 €",
      "prixTexte": "de 5,50 € à 8,50 € le verre"
     }
    ]
   }
  ]
 },
 {
  "id": "emporter",
  "heure": "À commander",
  "titre": "Boulangerie et fêtes",
  "ton": "soir",
  "sections": [
   {
    "titre": "Boulangerie (carte des fêtes 2026-2027)",
    "plats": [
     {
      "nom": "Pains de 400 g (Mélan, Avresse, Molon, Moncrabeau, Li bia bouquet, Le Fély)",
      "description": "Le raisin/noix 3,80 €",
      "prix": 2.5
     },
     {
      "nom": "Le cramique",
      "description": "Sucre et raisins",
      "prix": 6
     },
     {
      "nom": "Le craquelin",
      "description": "Sucre perlé",
      "prix": 6
     },
     {
      "nom": "Le pain brioché",
      "prix": 3.8
     },
     {
      "nom": "La baguette tradition",
      "prix": 1.8
     },
     {
      "nom": "Le pistolet",
      "prix": 0.9
     },
     {
      "nom": "Le sandwich",
      "prix": 0.8
     },
     {
      "nom": "Le mini sandwich",
      "prix": 0.6
     },
     {
      "nom": "Les cougnous",
      "description": "Au sucre ou sucre et raisins",
      "prix": 2.95,
      "unite": "(100 g), 7,00 € (250 g), 14,00 € (500 g)"
     },
     {
      "nom": "Les cougnous au chocolat",
      "description": "Individuel uniquement",
      "prix": 2.95
     },
     {
      "nom": "Cakes nature, chocolat ou orange",
      "prix": 11
     },
     {
      "nom": "Quiches (Lorraine, chèvre/brocolis, saumon fumé/épinards, scampis/gorgonzola, chicons gratin)",
      "prix": 16.5
     }
    ]
   },
   {
    "titre": "Fêtes de fin d’année 2026-2027",
    "note": "Commandes de Noël jusqu’au 22 décembre à 18 h, du Nouvel An jusqu’au 29 décembre à 18 h",
    "plats": [
     {
      "nom": "Bûches de Noël (Forêt Noire, Confluent, Dacquoise, Éclat, Moka, Crème fraîche, Paris-Brest, Fruits des Bois, Éphémère)",
      "description": "En 1, 4, 6 et 8 personnes",
      "prix": 6,
      "unite": "par personne"
     },
     {
      "nom": "Gâteaux de l'An (mêmes parfums que les bûches)",
      "description": "En 1, 4, 6 et 8 personnes",
      "prix": 6,
      "unite": "par personne"
     },
     {
      "nom": "Gâteaux glacés (omelette norvégienne, corne d'abondance en nougatine)",
      "description": "Corne d'abondance 4 pers. 30,00 €, 6 pers. 42,00 €, 8 pers. 56,00 € ; glace au litre 17,00 €",
      "prix": 6,
      "unite": "par personne"
     },
     {
      "nom": "Galette des rois (à partir du 2 janvier)",
      "description": "Corin d'abricots frangipane ; gelée cerise frangipane ; praliné noisettes frangipane ; thème 2027 : Stitch"
     },
     {
      "nom": "Macarons de Paris",
      "description": "Tube de 9 pièces 15,00 €, sachet de 8 pièces 12,50 €, boîtes de 12 ou 18 pièces 19,50 € et 28,00 €",
      "prix": 75,
      "unite": "le kg"
     },
     {
      "nom": "Boîte de pralines Namuco",
      "description": "4 variétés de pralines à diverses ganaches",
      "prix": 14.7,
      "unite": ", 23,90 € ou 31,30 €"
     },
     {
      "nom": "Baisers de la Maison des Desserts / assortiment de biscuits maison",
      "prix": 55,
      "unite": "le kg"
     },
     {
      "nom": "Pralines artisanales",
      "description": "Ballotins de 250 g à 1 kg",
      "prix": 79,
      "unite": "le kg"
     },
     {
      "nom": "Biétrumés",
      "description": "Boîtes de 250, 400 et 600 g"
     }
    ]
   }
  ]
 }
];
