// Carte réelle de L'Huile sur le Feu (data/restaurants/huile-sur-le-feu/donnees.json, relevée sur lhuilesurlefeu.be/menu).
// `huile` : l'huile nommée dans le plat (truffe, piment, mandarine, menthe, ail, persil, toscane) ; null si aucune n'est citée.
// Aucun plat ajouté, aucun prix inventé (placeholder: false partout). `prix: null` : prix non communiqué par le site.
export type CleHuile = 'truffe' | 'piment' | 'mandarine' | 'menthe' | 'ail' | 'persil' | 'toscane';
export interface Plat { nom: string; description: string | null; prix: number | null; huile: CleHuile | null; placeholder?: boolean }
export interface Categorie { categorie: string; plats: Plat[] }
export const carte: Categorie[] = [
 {
  "categorie": "Les suggestions du moment",
  "plats": [
   {
    "nom": "La Pinsa Romana",
    "description": "Courgettes, aubergines, burrata, jambon de Parme et copeaux de parmesan",
    "prix": 23.0,
    "huile": null
   },
   {
    "nom": "Linguine pesto de pistache, scampi et huile d’olive de Toscane",
    "description": null,
    "prix": 25.0,
    "huile": "toscane"
   },
   {
    "nom": "Casarecce au potimarron, chips de speck et pecorino",
    "description": null,
    "prix": 23.0,
    "huile": null
   },
   {
    "nom": "Carpaccio de tartare de bœuf",
    "description": "Copeaux de parmesan, roquette et huile d’olive à la truffe",
    "prix": 29.0,
    "huile": "truffe"
   }
  ]
 },
 {
  "categorie": "En dégustant l’apéritif",
  "plats": [
   {
    "nom": "La planche charcuterie du moment & burrata",
    "description": null,
    "prix": 25.9,
    "huile": null
   },
   {
    "nom": "Véritable jambon de Parme",
    "description": null,
    "prix": 15.0,
    "huile": null
   },
   {
    "nom": "Huile à la truffe blanche",
    "description": null,
    "prix": null,
    "huile": "truffe"
   },
   {
    "nom": "Assiette méditerranéenne",
    "description": "Accompagnée de légumes grillés (pour 2-3 personnes)",
    "prix": 25.9,
    "huile": null
   },
   {
    "nom": "Assiette végétarienne",
    "description": "Pour 2-3 personnes",
    "prix": 24.9,
    "huile": null
   },
   {
    "nom": "Planche gourmande à partager",
    "description": "Charcuterie & fromages italiens sélectionnés",
    "prix": 29.9,
    "huile": null
   },
   {
    "nom": "Bruschetta",
    "description": "8 pièces",
    "prix": 10.0,
    "huile": null
   }
  ]
 },
 {
  "categorie": "Entrées & salades",
  "plats": [
   {
    "nom": "Potage du jour",
    "description": null,
    "prix": 10.0,
    "huile": null
   },
   {
    "nom": "Demi-lunes au chorizo",
    "description": "Pâtes fraîches, huile au piment",
    "prix": 17.0,
    "huile": "piment"
   },
   {
    "nom": "Carpaccio de bœuf",
    "description": "Copeaux de parmesan, roquette, huile d’olive à la truffe et vieux vinaigre balsamique à la figue",
    "prix": 21.0,
    "huile": "truffe"
   },
   {
    "nom": "Demi-lunes aux champignons",
    "description": "Pâtes fraîches légèrement crémées, huile à la truffe, burrata",
    "prix": 20.0,
    "huile": "truffe"
   },
   {
    "nom": "Vitello tonnato",
    "description": null,
    "prix": 19.0,
    "huile": null
   },
   {
    "nom": "Croquettes de scampi au curry",
    "description": "Sauce homardine (2 pièces)",
    "prix": 19.0,
    "huile": null
   }
  ]
 },
 {
  "categorie": "Pâtes fraîches & ravioles",
  "plats": [
   {
    "nom": "Lasagne aux blettes",
    "description": "Saucisse italienne fraîche, mozzarella gratinée",
    "prix": 22.0,
    "huile": null
   },
   {
    "nom": "Risotto au parfum de curcuma",
    "description": "Scampi et chorizo",
    "prix": 25.0,
    "huile": null
   },
   {
    "nom": "Orecchiette au ragù de saucisse italienne",
    "description": "Basilic et parmesan",
    "prix": 21.0,
    "huile": null
   },
   {
    "nom": "Demi-lunes au chorizo, crème tomatée",
    "description": "Pâtes fraîches, crème tomatée au parmesan, huile au piment",
    "prix": 22.0,
    "huile": "piment"
   },
   {
    "nom": "Demi-lunes aux champignons des bois",
    "description": "Pâtes fraîches légèrement crémées, huile à la truffe et burrata",
    "prix": 25.0,
    "huile": "truffe"
   },
   {
    "nom": "Rigatoni à la crème de gorgonzola",
    "description": "Brocolis et noix",
    "prix": 23.0,
    "huile": null
   },
   {
    "nom": "Linguine aux 3 tomates confites",
    "description": "Ail, basilic, pecorino et burrata",
    "prix": 22.0,
    "huile": null
   },
   {
    "nom": "Penne à la crème de poivrons",
    "description": "Saucisse italienne rôtie, mascarpone, spianata calabra, parmesan",
    "prix": 25.0,
    "huile": null
   },
   {
    "nom": "Cannelloni aux quatre fromages",
    "description": "Gratinés, huile à la truffe",
    "prix": 22.0,
    "huile": "truffe"
   },
   {
    "nom": "Lasagne gratinée au chèvre",
    "description": "Légumes grillés, parmesan",
    "prix": 20.0,
    "huile": null
   },
   {
    "nom": "Linguine au pesto de courgettes",
    "description": "Croquant de guanciale, scampi et pecorino",
    "prix": 26.0,
    "huile": null
   }
  ]
 },
 {
  "categorie": "Les viandes & poissons",
  "plats": [
   {
    "nom": "Poisson du jour",
    "description": "Demandez-nous",
    "prix": 29.0,
    "huile": null
   },
   {
    "nom": "Carpaccio de bœuf",
    "description": "Copeaux de parmesan, roquette, huile à la truffe, vinaigre à la figue",
    "prix": 24.0,
    "huile": "truffe"
   },
   {
    "nom": "Escalope de veau façon parmigiana",
    "description": null,
    "prix": 33.0,
    "huile": null
   },
   {
    "nom": "Osso buco à la milanaise",
    "description": "Tagliatelle",
    "prix": 29.0,
    "huile": null
   },
   {
    "nom": "Tartare de bœuf coupé au couteau",
    "description": "Pignons, tomates confites, artichauts, parmesan, huile d’olive à l’ail",
    "prix": 29.0,
    "huile": "ail"
   }
  ]
 },
 {
  "categorie": "Les douceurs & fromage",
  "plats": [
   {
    "nom": "Pannacotta aux framboises",
    "description": null,
    "prix": 12.0,
    "huile": null
   },
   {
    "nom": "Coulant au chocolat",
    "description": "Huile d’olive à la mandarine",
    "prix": 12.0,
    "huile": "mandarine"
   },
   {
    "nom": "Le tiramisù traditionnel",
    "description": "Cacao",
    "prix": 12.0,
    "huile": null
   },
   {
    "nom": "Tiramisù au spéculoos",
    "description": null,
    "prix": 12.0,
    "huile": null
   },
   {
    "nom": "La palette de glaces du moment",
    "description": null,
    "prix": 9.0,
    "huile": null
   },
   {
    "nom": "L’assortiment de fromages affinés du moment",
    "description": null,
    "prix": 14.0,
    "huile": null
   },
   {
    "nom": "Salade de fruits frais",
    "description": "Huile d’olive à la menthe",
    "prix": 9.0,
    "huile": "menthe"
   },
   {
    "nom": "Dessert du menu",
    "description": null,
    "prix": 13.0,
    "huile": null
   }
  ]
 },
 {
  "categorie": "Gins",
  "plats": [
   {
    "nom": "Gin Amalfi",
    "description": "Italie",
    "prix": 14.0,
    "huile": null
   },
   {
    "nom": "Gin Birdie",
    "description": "Royaume-Uni",
    "prix": 12.0,
    "huile": null
   },
   {
    "nom": "Gin Engine",
    "description": "Italie, Alta Langa",
    "prix": 12.0,
    "huile": null
   },
   {
    "nom": "Gin Panda master Juniperus",
    "description": "Belgique",
    "prix": 12.0,
    "huile": null
   }
  ]
 },
 {
  "categorie": "Vins blancs",
  "plats": [
   {
    "nom": "Greco, Casa Primis BIO",
    "description": "Greco, Puglia",
    "prix": 29.9,
    "huile": null
   },
   {
    "nom": "Fiordiligi Grillo, Assuli BIO",
    "description": "Grillo, Sicilia",
    "prix": 31.9,
    "huile": null
   },
   {
    "nom": "Zin Salento, Fiano",
    "description": "Fiano, Puglia",
    "prix": 26.9,
    "huile": null
   }
  ]
 },
 {
  "categorie": "Vins rouges",
  "plats": [
   {
    "nom": "Salice Salentino, Palama 37,5 cl",
    "description": "Negroamaro, Puglia",
    "prix": 22.9,
    "huile": null
   },
   {
    "nom": "Cigliegiolo, Casa Primis",
    "description": "Cigliegiolo, Puglia",
    "prix": 29.9,
    "huile": null
   }
  ]
 },
 {
  "categorie": "Vins rosés",
  "plats": [
   {
    "nom": "Metiusco Salento, Palama",
    "description": "Negroamaro, Puglia",
    "prix": 29.0,
    "huile": null
   }
  ]
 }
];
