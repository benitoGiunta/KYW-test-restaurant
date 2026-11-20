// Carte de la Brasserie Edgard, générée depuis data/restaurants/brasserie-edgard/donnees.json (prix : site du client, relevé du 20/11/2026).
// Aucun plat fictif : placeholder est absent partout. `prix` : liste de montants (m en euros, l = précision « 1 pce »).
export type Prix = { m: number; l?: string };
export type Plat = { nom: string; prix: Prix[]; desc?: string; note?: string; placeholder?: boolean };
export type Categorie = { id: string; titre: string; plats: Plat[] };

export const categories: Categorie[] = [
 {
  "id": "entrees",
  "titre": "Entrées",
  "plats": [
   {
    "nom": "Carpaccio de bœuf à l’Italienne",
    "prix": [
     {
      "m": 19.1
     }
    ],
    "desc": "pesto, roquette, copeaux de parmesan, tomates séchées"
   },
   {
    "nom": "Carpaccio de bœuf à la Française",
    "prix": [
     {
      "m": 21.5
     }
    ],
    "desc": "foie gras, magret fumé, poire confite, croûtons briochés, huile de noisettes et balsamique"
   },
   {
    "nom": "Carpaccio de bœuf à la Grecque",
    "prix": [
     {
      "m": 19.1
     }
    ],
    "desc": "feta, olives, concombre et tomate, origan, huile au citron"
   },
   {
    "nom": "Tartare Impérial",
    "prix": [
     {
      "m": 21.0
     }
    ],
    "desc": "saint-jacques, saint-pierre, saumon, mangue, poivrons doux, vinaigrette au yuzu"
   },
   {
    "nom": "Carpaccio de bar et saumon frais",
    "prix": [
     {
      "m": 19.5
     }
    ],
    "desc": "huile vierge au citrus, baies roses"
   },
   {
    "nom": "Tranche de foie gras Maison",
    "prix": [
     {
      "m": 24.9
     }
    ],
    "desc": "toast brioché, chutney de fruits"
   },
   {
    "nom": "Fondu aux fromages Maison",
    "prix": [
     {
      "m": 10.9,
      "l": "1 pce"
     },
     {
      "m": 16.1,
      "l": "2 pces"
     }
    ],
    "desc": "crème de chou-fleur au parmesan"
   },
   {
    "nom": "Croquette Maison",
    "prix": [
     {
      "m": 10.9,
      "l": "1 pce"
     },
     {
      "m": 16.1,
      "l": "2 pces"
     }
    ],
    "desc": "volaille fumée et lard braisé"
   },
   {
    "nom": "Mixte fondu et croquette",
    "prix": [
     {
      "m": 16.1,
      "l": "2 pces"
     }
    ]
   },
   {
    "nom": "Ravioles ricotta-épinards",
    "prix": [
     {
      "m": 18.1
     }
    ],
    "desc": "crème de chou-fleur au parmesan"
   },
   {
    "nom": "Fricassée de scampi à l’ail",
    "prix": [
     {
      "m": 18.6,
      "l": "1 pce"
     },
     {
      "m": 23.9,
      "l": "2 pces"
     }
    ]
   },
   {
    "nom": "Fricassée de scampi du chef",
    "prix": [
     {
      "m": 18.6,
      "l": "1 pce"
     },
     {
      "m": 23.9,
      "l": "2 pces"
     }
    ],
    "desc": "jus de crustacés flambé Cognac, crème, estragon"
   },
   {
    "nom": "Petits gris de Namur à l’ail",
    "prix": [
     {
      "m": 15.0,
      "l": "1 pce"
     },
     {
      "m": 25.6,
      "l": "2 pces"
     }
    ]
   },
   {
    "nom": "La planche Mr Edgard",
    "prix": [
     {
      "m": 32.0
     }
    ],
    "desc": "légumes du sud et tapenade, minis croquettes, crustacés, charcuterie, fromage… selon l’inspiration du chef"
   }
  ]
 },
 {
  "id": "le-coin-du-boucher",
  "titre": "Le coin du boucher",
  "plats": [
   {
    "nom": "Pavé de bœuf grillé",
    "prix": [
     {
      "m": 24.1
     }
    ],
    "desc": "pommes frites Maison"
   },
   {
    "nom": "Entrecôte de bœuf grillée 350 g",
    "prix": [
     {
      "m": 35.2
     }
    ],
    "desc": "pommes frites Maison"
   },
   {
    "nom": "Filet pur de bœuf grillé 250 g",
    "prix": [
     {
      "m": 35.9
     }
    ],
    "desc": "pommes frites Maison"
   },
   {
    "nom": "Souris d’agneau confite au miel et abricots",
    "prix": [
     {
      "m": 29.1
     }
    ],
    "desc": "jeunes carottes, mange-tout, grenailles rôties au romarin"
   },
   {
    "nom": "Magret de canard, caramel d’Amaretto",
    "prix": [
     {
      "m": 28.1
     }
    ],
    "desc": "marmelade de chicons et lard braisé, pommes maxime"
   },
   {
    "nom": "Tagliata de volaille",
    "prix": [
     {
      "m": 23.5
     }
    ],
    "desc": "poulet basse température, reginette, roquette, parmesan, tomates séchées, crème de balsamique"
   },
   {
    "nom": "Vol-au-vent de poule fermière et ses boulettes",
    "prix": [
     {
      "m": 24.1
     }
    ],
    "desc": "pommes frites Maison"
   },
   {
    "nom": "Bouchée à la reine",
    "prix": [
     {
      "m": 32.1
     }
    ],
    "desc": "ris de veau et volaille, mousseline, pommes frites Maison"
   },
   {
    "nom": "Le traditionnel tartare de bœuf, classique ou à l’italienne",
    "prix": [
     {
      "m": 22.1
     }
    ],
    "desc": "pommes frites Maison"
   },
   {
    "nom": "Cassolette de boulettes rôties",
    "prix": [
     {
      "m": 20.5
     }
    ],
    "desc": "pommes frites Maison, sauce au choix"
   },
   {
    "nom": "Ris et rognons de veau Mamy Georgette",
    "prix": [
     {
      "m": 32.5
     }
    ],
    "desc": "champignons, lardons, oignons grelots, röstis"
   },
   {
    "nom": "Tranches croustillantes de filet de porcelet",
    "prix": [
     {
      "m": 28.3
     }
    ],
    "desc": "cuit basse température, sauce laquée, pommes frites"
   },
   {
    "nom": "Brochette géante bœuf 300 g",
    "prix": [
     {
      "m": 27.9
     }
    ]
   },
   {
    "nom": "Brochette géante agneau 300 g",
    "prix": [
     {
      "m": 28.9
     }
    ]
   },
   {
    "nom": "Brochette géante volaille 300 g",
    "prix": [
     {
      "m": 25.7
     }
    ]
   },
   {
    "nom": "Brochette du chef",
    "prix": [
     {
      "m": 28.9
     }
    ],
    "desc": "bœuf, volaille, agneau, lard braisé"
   },
   {
    "nom": "Scampi lardés (9 pièces)",
    "prix": [
     {
      "m": 28.9
     }
    ],
    "desc": "trois sauces froides Maison, salade méditerranéenne, frites"
   },
   {
    "nom": "Burger du chef",
    "prix": [
     {
      "m": 22.9
     }
    ],
    "desc": "bœuf, bacon, cheddar, oignons frits, sauce cow-boy, frites Maison"
   },
   {
    "nom": "Crispy Burger",
    "prix": [
     {
      "m": 21.9
     }
    ],
    "desc": "volaille panée au Panko, mangue, poivrons, sauce andalouse Maison"
   },
   {
    "nom": "Pepper Burger",
    "prix": [
     {
      "m": 22.9
     }
    ],
    "desc": "bœuf, bacon, cheddar, oignons frits, sauce au poivre"
   },
   {
    "nom": "Ylan vegé burger",
    "prix": [
     {
      "m": 21.9
     }
    ],
    "desc": "chèvre rôti, miel et balsamique"
   },
   {
    "nom": "Épaule de porcelet rôtie « Porketto » (1,3 kg, pour 2, 25 min)",
    "prix": [
     {
      "m": 68.0
     }
    ],
    "desc": "duo de sauces, salade méditerranéenne, grenailles"
   }
  ]
 },
 {
  "id": "le-coin-du-poissonnier",
  "titre": "Le coin du poissonnier",
  "plats": [
   {
    "nom": "Filet de saumon",
    "prix": [
     {
      "m": 27.1
     }
    ],
    "desc": "sauce mousseline, poêlée de légumes, grenailles"
   },
   {
    "nom": "Pavé de saumon en croûte de parmesan",
    "prix": [
     {
      "m": 28.3
     }
    ],
    "desc": "reginette, courgette à la crème"
   },
   {
    "nom": "Ballotine de poissons aux scampis",
    "prix": [
     {
      "m": 26.1
     }
    ],
    "desc": "sauce arlequin, grenailles"
   },
   {
    "nom": "Filets de sole limande farcis à la florentine",
    "prix": [
     {
      "m": 27.5
     }
    ],
    "desc": "beurre blanc, purée Maison"
   },
   {
    "nom": "Moules (en saison) : marinière, vin blanc, crème à l’ail, gorgonzola, du chef",
    "prix": [],
    "note": "prix du jour"
   }
  ]
 },
 {
  "id": "pates-fraiches",
  "titre": "Pâtes fraîches",
  "plats": [
   {
    "nom": "Del Mare",
    "prix": [
     {
      "m": 22.9
     }
    ],
    "desc": "scampi, calamars, jus de crustacés flambé Cognac, crème"
   },
   {
    "nom": "Al Salmone",
    "prix": [
     {
      "m": 22.1
     }
    ],
    "desc": "saumon frais et fumé, courgette, crème de chou-fleur au parmesan"
   },
   {
    "nom": "Al Ragù",
    "prix": [
     {
      "m": 20.5
     }
    ],
    "desc": "viande mijotée à la tomate et épices italiennes, parmesan"
   },
   {
    "nom": "Al Giuseppe",
    "prix": [
     {
      "m": 21.9
     }
    ],
    "desc": "volaille basse température, crème tartufata, tomates séchées, parmesan"
   },
   {
    "nom": "Quattro fromaggi",
    "prix": [
     {
      "m": 19.9
     }
    ],
    "desc": "pecorino, taleggio, parmesan, gorgonzola, crème"
   },
   {
    "nom": "Roulade de lasagne aux aubergines et courgettes",
    "prix": [
     {
      "m": 20.9
     }
    ],
    "desc": "crème de chou-fleur au parmesan, gratinée"
   }
  ]
 },
 {
  "id": "salades",
  "titre": "Salades",
  "plats": [
   {
    "nom": "Jules « César »",
    "prix": [
     {
      "m": 23.1
     }
    ],
    "desc": "poulet basse température, anchois, œuf dur, parmesan, croûtons"
   },
   {
    "nom": "Commandant « Cousteau »",
    "prix": [
     {
      "m": 24.9
     }
    ],
    "desc": "saumon fumé, poisson fumé, calamars, scampi, œuf dur, vinaigrette citrus"
   },
   {
    "nom": "Monsieur « Seguin »",
    "prix": [
     {
      "m": 22.5
     }
    ],
    "desc": "croustillant de fromage de chèvre au miel, raisins, balsamique"
   },
   {
    "nom": "Président « Chirac »",
    "prix": [
     {
      "m": 26.5
     }
    ],
    "desc": "foie gras Maison, magret fumé, gésier de canard, poire confite, croûtons briochés"
   }
  ]
 },
 {
  "id": "enfants",
  "titre": "Enfants",
  "plats": [
   {
    "nom": "Boulettes sauce tomate",
    "prix": [
     {
      "m": 13.5
     }
    ],
    "desc": "pommes frites Maison"
   },
   {
    "nom": "Rigatoni aux fromages ou Al Ragù",
    "prix": [
     {
      "m": 13.5
     }
    ]
   },
   {
    "nom": "Nuggets de poulet",
    "prix": [
     {
      "m": 13.5
     }
    ],
    "desc": "compote, pommes frites Maison"
   }
  ]
 },
 {
  "id": "desserts",
  "titre": "Desserts",
  "plats": [
   {
    "nom": "Mousse au chocolat Maison",
    "prix": [
     {
      "m": 9.3
     }
    ]
   },
   {
    "nom": "Crème brûlée",
    "prix": [
     {
      "m": 9.3
     }
    ]
   },
   {
    "nom": "Tiramisu Maison au spéculoos",
    "prix": [
     {
      "m": 10.2
     }
    ]
   },
   {
    "nom": "Sabayon minute au Marsala, avec ou sans glace",
    "prix": [
     {
      "m": 11.5
     },
     {
      "m": 12.5
     }
    ]
   },
   {
    "nom": "Pain perdu brioché",
    "prix": [
     {
      "m": 12.0
     }
    ],
    "desc": "poire pochée, glace vanille, caramel beurre salé"
   },
   {
    "nom": "Mi-cuit au chocolat fondant Maison",
    "prix": [
     {
      "m": 11.5
     }
    ],
    "desc": "boule de glace vanille"
   },
   {
    "nom": "Baba arrosé au rhum de Martinique, chantilly",
    "prix": [
     {
      "m": 12.5
     }
    ]
   },
   {
    "nom": "Dame blanche",
    "prix": [
     {
      "m": 10.2
     }
    ]
   },
   {
    "nom": "Dame noire",
    "prix": [
     {
      "m": 10.2
     }
    ]
   },
   {
    "nom": "Brésilienne",
    "prix": [
     {
      "m": 10.2
     }
    ]
   },
   {
    "nom": "Café glacé",
    "prix": [
     {
      "m": 10.6
     }
    ]
   },
   {
    "nom": "Coupe au choix",
    "prix": [
     {
      "m": 9.5
     }
    ]
   },
   {
    "nom": "Milk-shake au choix",
    "prix": [
     {
      "m": 9.5
     }
    ]
   },
   {
    "nom": "Le Colonel",
    "prix": [
     {
      "m": 12.0
     }
    ],
    "desc": "sorbet citron, vodka"
   },
   {
    "nom": "Crêpes aux sucres",
    "prix": [
     {
      "m": 8.5
     }
    ]
   },
   {
    "nom": "Crêpes Mikado",
    "prix": [
     {
      "m": 11.5
     }
    ]
   },
   {
    "nom": "Crêpes flambées au Grand Marnier",
    "prix": [
     {
      "m": 12.5
     }
    ]
   }
  ]
 }
];

export const suggestions: Plat[] = [
 {
  "nom": "Croquettes aux crevettes grises artisanales (2 pièces)",
  "prix": [
   {
    "m": 19.5
   }
  ]
 },
 {
  "nom": "Choucroute de la Mer, crème au Riesling",
  "prix": [
   {
    "m": 32.5
   }
  ]
 },
 {
  "nom": "Traditionnel cassolet de notre chef Titi",
  "prix": [
   {
    "m": 34.0
   }
  ]
 },
 {
  "nom": "Salade autour de la crevette",
  "prix": [
   {
    "m": 27.5
   }
  ]
 },
 {
  "nom": "Moules de Zélande marinière",
  "prix": [
   {
    "m": 27.9
   }
  ]
 },
 {
  "nom": "Moules de Zélande au vin blanc",
  "prix": [
   {
    "m": 28.9
   }
  ]
 },
 {
  "nom": "Moules de Zélande crème à l’ail",
  "prix": [
   {
    "m": 29.9
   }
  ]
 },
 {
  "nom": "Moules de Zélande gorgonzola",
  "prix": [
   {
    "m": 29.9
   }
  ]
 },
 {
  "nom": "Moules de Zélande du chef",
  "prix": [
   {
    "m": 31.9
   }
  ]
 },
 {
  "nom": "Crumble d’automne aux amandes (dessert)",
  "prix": [
   {
    "m": 11.5
   }
  ]
 }
];

export const menus: Plat[] = [
 {
  "nom": "Plat du jour (lundi au vendredi, midi)",
  "prix": [
   {
    "m": 14.5
   }
  ]
 },
 {
  "nom": "Lunch : plat + dessert (lundi au vendredi, midi)",
  "prix": [
   {
    "m": 21.5
   }
  ]
 },
 {
  "nom": "Menu groupe : entrée, plat, dessert (table de plus de 10, max 16)",
  "prix": [
   {
    "m": 49.0
   }
  ]
 },
 {
  "nom": "Menu groupe : entrée et plat",
  "prix": [
   {
    "m": 39.0
   }
  ]
 },
 {
  "nom": "Menu groupe : plat et dessert",
  "prix": [
   {
    "m": 34.0
   }
  ]
 }
];

const f = new Intl.NumberFormat('fr-BE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
/** « 19,10 € » avec insécable ; liste de variantes séparées par une barre. */
export const eur = (m: number) => `${f.format(m)}\u00a0€`;
export const prixTexte = (p: Plat) => (p.prix.length ? p.prix.map((x) => (x.l ? `${eur(x.m)} (${x.l.replace(' ', '\u00a0')})` : eur(x.m))).join(' / ') : (p.note ?? '').replace(/^./, (c) => c.toUpperCase()));
