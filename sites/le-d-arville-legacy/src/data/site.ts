// Données du restaurant : dossier.md, donnees.json et site-actuel/ (ledarville.be). Rien d'inventé ;
// ce qui manque est marqué `fill` (slot texte à compléter) ou `placeholder`.
const nb = ' ';
export const eur = (n: number) => `${n}${nb}€`;

export const resto = {
  nom: 'Le D’Arville',
  baseline: 'Restaurant gastronomique',
  adresse: { rue: 'Rue d’Arville', numero: '94', cp: '5100', commune: 'Wierde (Namur)' },
  tel: { affiche: `+32${nb}81${nb}46${nb}23${nb}65`, href: '+3281462365' },
  email: 'info@ledarville.be',
  reservation: 'https://www.ledarville.be/reservation/',
  facebook: 'https://www.facebook.com/ledarville/',
  facebookBarabas: 'https://www.facebook.com/LaSuiteDuDArville/',
  siteActuel: 'https://www.ledarville.be',
  geo: { lat: 50.41238, lon: 4.95854 },
  barabas: { rue: 'Rue de Barabas', numero: '81' },
};

// Jours d'ouverture : site officiel. Les heures ne sont pas données : slot `fill`.
export const jours = [
  { jour: 'Lundi', services: null },
  { jour: 'Mardi', services: null },
  { jour: 'Mercredi', services: null },
  { jour: 'Jeudi', services: 'Soir' },
  { jour: 'Vendredi', services: `Midi et${nb}soir` },
  { jour: 'Samedi', services: `Midi et${nb}soir` },
  { jour: 'Dimanche', services: 'Midi' },
] as const;
export const heuresFill = 'Heures d’ouverture à confirmer par le restaurant';

export const conges = [
  `Du 1er au${nb}6${nb}janvier`,
  `Du 26${nb}avril au${nb}5${nb}mai`,
  `Du 16${nb}août au 1er${nb}septembre`,
  `Du 20 au${nb}31${nb}décembre`,
];

export const menus = [
  { nom: 'Tendance de saison', prix: 73, accord: 40, texte: 'Quatre mises en bouche, une entrée au choix (Saint-Jacques ou carpaccio de biche), une seconde entrée au choix (quenelles de brochet ou ris de veau), un plat au choix, un dessert.' },
  { nom: 'Balade', prix: 90, accord: 50, texte: 'Quatre mises en bouche, Saint-Jacques, carpaccio de biche, ris de veau, le lièvre en deux préparations, un dessert de la carte.' },
  { nom: 'Menu enfant', prix: 28, accord: null, texte: 'Entrée (fondu au parmesan ou scampis à la crème), plat (filet de volaille ou cabillaud), dessert (salade de fruits ou dame blanche).' },
];

export const carte = [
  { cat: 'Les entrées', plats: [
    { nom: 'Noix de Saint-Jacques rôties', d: 'feuilleté, duxelles de champignons, émulsion de cèpes', prix: 30 },
    { nom: 'Quenelles de brochet', d: 'crabe royal, sauce Nantua', prix: 30 },
    { nom: 'Carpaccio de biche', d: 'texture de foie gras de canard, vinaigrette au jus de plume', prix: 30 },
    { nom: 'Noix de ris de veau croustillantes', d: 'wok de légumes, jus corsé au saté de Chine', prix: 30 },
    { nom: 'Escalope de foie gras de canard rôtie', d: 'cerise Amarena, pain d’épices, jus corsé', prix: 30 },
  ]},
  { cat: 'Les plats', plats: [
    { nom: 'Le homard en direct de notre vivier', d: 'servi en deux assiettes', prix: 70 },
    { nom: 'Maigre cuit sur la peau', d: 'blanc de poireau, sauce crème à la truffe, mousseline de pommes de terre au mascarpone', prix: 40 },
    { nom: 'Sole meunière', d: 'servie en filets, pommes de terre tournées, beurre citron et herbes fraîches', prix: 55 },
    { nom: 'Filet de bœuf au poivre concassé', d: 'crème à l’armagnac, frites, salade gourmande', prix: 40 },
    { nom: 'Le lièvre en deux préparations', d: 'filet, purée de marrons, airelles, gratin de céleri-rave ; cuisses à la royal, sauce arlequin', prix: 40 },
  ]},
  { cat: 'Les fromages', plats: [
    { nom: 'Chariot de fromages affinés', d: 'fromages de nos régions, de France et d’ailleurs, accord mets-vin, salade et petit pain (17 € en remplacement du dessert)', prix: 22 },
  ]},
  { cat: 'Les desserts', plats: [
    { nom: 'Moelleux au chocolat des Caraïbes', d: 'autour de l’ananas et du fruit de la passion', prix: null },
    { nom: 'La dame blanche tournée à la minute', d: 'chocolat croquant', prix: null },
    { nom: 'Trompe l’œil « By Noa »', d: 'le citron, glace au chocolat blanc Yvoir', prix: null },
    { nom: 'Notre île flottante', d: 'glace au lait d’amande', prix: null },
  ]},
];

export const boissons = [
  { nom: 'Eaux aromatisées', prix: `4,00${nb}€`, unite: 'le verre' },
  { nom: 'Kombucha', prix: `4,50${nb}€`, unite: 'le verre' },
];

// Photos du client : `sujet` de photos/index.json fait foi pour l'alt. [largeur, hauteur] du fichier 1600.
const P: Record<string, [number, number, string]> = {
  '01-salle-tables': [1600, 1067, 'Salle du restaurant, tables dressées, murs sombres et tableaux'],
  '02-plat-assiette-noire': [1600, 1066, 'Assiette noire dressée vue du dessus, fleurs et légumes'],
  '03-plat-dressage-sauce': [1600, 2400, 'Dressage d’une assiette, sauce versée à la cuillère'],
  '04-dessert-assiette-blanche': [1600, 1066, 'Assiette blanche dressée sur un rondin de bois, couverts dorés'],
  '05-terrasse-voile-rouge': [1600, 1065, 'Terrasse sous voile rouge, jardin et pierre sculptée'],
  '06-jardin-salon': [1600, 2355, 'Salon de jardin dans la prairie, ciel nuageux'],
  '07-terrasse-bassin': [1600, 1065, 'Terrasse et bâtiment en briques au bord d’un bassin'],
  '08-terrasse-table': [1600, 1066, 'Table dressée sur la terrasse, voile rouge'],
  '09-batiment-etang': [1600, 1065, 'Bâtiment en briques, étang et plantes aquatiques, terrasse'],
  '10-salle-bleue': [1600, 1066, 'Salle à manger, banquette ondulée bleue et mur orangé'],
  '11-terrasse-toile-blanche': [1600, 1066, 'Terrasse en bois sous toile blanche, vue sur la campagne'],
  '12-table-lampe': [1600, 2399, 'Table dressée près d’un mur de briques, lampe et tableau'],
  '13-table-verres-terrasse': [1600, 1066, 'Table de terrasse, verres, huile et poivrier'],
  '14-cuisine-dressage': [1600, 2400, 'Mains en cuisine dressant de petits bols'],
  '15-plat-bois-mise-en-bouche': [1600, 1066, 'Deux petites préparations sur une planche en bois'],
  '16-chef-facade': [1024, 1534, 'Portrait en pied du chef devant l’entrée en briques portant l’enseigne Le D’Arville'],
  '17-barabas-suite-orientale': [1600, 1066, 'Chambre colorée, bleu, orange et carreaux, à la villa Barabas'],
  '18-barabas-suite-glamour': [1600, 1066, 'Suite Glamour : lit, tête de lit fuchsia, poutres'],
  '19-barabas-salle-petit-dejeuner': [1600, 1065, 'Longue table et salle rouge et noire, petit-déjeuner dressé'],
  '20-barabas-facade': [1600, 900, 'Façade blanche de la villa Barabas'],
  '21-barabas-piscine': [1600, 1066, 'Piscine extérieure avec jet, pins en fond'],
  '22-barabas-chambre-rouge': [1600, 1066, 'Chambre, tête de lit rouge, poutre apparente'],
};
export const photo = (id: string) => { const [w, h, alt] = P[id]; return { id, w, h, alt }; };
export const galerie = Object.keys(P).filter((k) => Number(k.slice(0, 2)) <= 16);
