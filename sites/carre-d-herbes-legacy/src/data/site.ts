// Données du Carré d’herbes, toutes tirées de data/restaurants/carre-d-herbes (donnees.json, dossier.md, site-actuel/).
// Tout ce qui n’est pas prouvé par le dossier est absent (null) ; aucun fait inventé.
const N = ' '; // espace insécable
export const eur = (n: number | string) => `${n}${N}€`;

export const resto = {
  nom: 'Carré d’herbes',
  baseline: 'Cuisine sincère et raffinée',
  situe: 'Entre Namur et Profondeville, en bord de Meuse',
  adresse: { rue: 'Chaussée de Dinant 780', cp: '5100', commune: 'Wépion (Namur)' },
  tel: '081 34 48 19',
  telHref: 'tel:+3281344819',
  email: null as string | null, // inconnu : le site d’origine n’en publie pas
  facebook: 'https://www.facebook.com/profile.php?id=100092685321462',
  parking: 'Le parking privé de dix places est accessible par la Route de Saint-Gérard.',
  reservation: 'Les réservations se prennent uniquement par téléphone, du mercredi au dimanche à partir de 10 h 00.',
};

export const h = (a: number, b = 0) => `${a} h ${String(b).padStart(2, '0')}`.replaceAll(' ', N);

// Horaires du site d’origine (page Contact). Dimanche : midi seulement.
export const horaires = [
  { jour: 'Lundi', midi: null, soir: null },
  { jour: 'Mardi', midi: null, soir: null },
  { jour: 'Mercredi', midi: null, soir: null },
  { jour: 'Jeudi', midi: `${h(12)} à ${h(16)}`, soir: `${h(19)} à ${h(0)}` },
  { jour: 'Vendredi', midi: `${h(12)} à ${h(16)}`, soir: `${h(19)} à ${h(0)}` },
  { jour: 'Samedi', midi: `${h(12)} à ${h(16)}`, soir: `${h(19)} à ${h(0)}` },
  { jour: 'Dimanche', midi: `${h(12)} à ${h(16)}`, soir: null },
];
export const derniereCommande = `Dernière prise de commande : ${h(13, 15)} le midi, ${h(20, 15)} le soir.`;

export type Plat = { nom: string; desc?: string; prix?: string };
export type Etape = { etape: string; choix: Plat[] };
export type Menu = { slug: string; nom: string; court: string; prix: string; accord?: string; note?: string; etapes: Etape[]; apres?: string };

const miseEnBouche: Etape = { etape: 'Bienvenue', choix: [{ nom: 'Mises en bouche', desc: 'Pour éveiller vos papilles.' }] };
const foie: Plat = { nom: 'Foie gras', desc: 'Foie gras de canard cuit au torchon, pommes Royal Gala, anguille fumée à la flamme, pain brioché au charbon végétal' };
const jacques: Plat = { nom: 'Saint-Jacques', desc: 'Os à moelle gratiné, noix de Saint-Jacques snackée, bœuf Aubrac fumé, huile verte au poireau, espuma tartufata' };
const ris: Plat = { nom: 'Ris de veau', desc: 'Ris de veau croustillant, coque d’oignon, girolles, guanciale, crème d’Isigny, persil, Parmesan' };
const poisson: Plat = { nom: 'Poisson', desc: 'Pêche du jour, farce fine aux herbes, trompettes de la mort, lard confit, céleri-rave, beurre nantais' };
const biche: Plat = { nom: 'Biche', desc: 'Biche en deux préparations : le rôti cuit basse température et la gigue confite en effilochée, focaccia, morbier, échalotes, carottes rolls, sauce à la Leffe brune' };
const desserts: Etape = {
  etape: 'Dessert',
  choix: [
    { nom: 'Poire', desc: 'Poire, crumble, fromage blanc, glace chocolat blanc et vanille, toffee miso' },
    { nom: 'Dame blanche à notre façon' },
    { nom: 'Sabayon au Champagne', desc: 'Gratiné, fruit et glace du moment' },
    { nom: 'Île flottante revisitée', desc: 'Marmelade de rhubarbe et framboises, crème anglaise vanillée' },
  ],
};
const fromages = `L’assiette de fromages affinés se prend en supplément (${eur(15)}) ou en remplacement du dessert (${eur(7)}).`;

export const menus: Menu[] = [
  {
    slug: 'lunch', nom: 'Lunch en 2 assiettes', court: 'Lunch', prix: eur(38),
    note: `${eur(48)} avec le dessert commandé en début de repas. Formule servie les midis et le jeudi soir sur réservation, sauf dimanche et jours fériés. Non modifiable, pour l’ensemble des convives d’une même table, sans accord mets-vins.`,
    etapes: [miseEnBouche, { etape: 'Entrée et plat', choix: [{ nom: 'Selon l’inspiration du chef', desc: '« Entrée + plat » annoncés oralement.' }] }],
  },
  { slug: '3-assiettes', nom: 'Menu en 3 assiettes', court: '3 assiettes', prix: eur(55), accord: eur(69), etapes: [miseEnBouche, { etape: 'Entrée', choix: [foie] }, { etape: 'Plat', choix: [biche] }, desserts], apres: fromages },
  { slug: '4-assiettes', nom: 'Menu en 4 assiettes', court: '4 assiettes', prix: eur(68), accord: eur(89), etapes: [miseEnBouche, { etape: 'Première entrée', choix: [foie] }, { etape: 'Seconde entrée', choix: [jacques] }, { etape: 'Plat', choix: [poisson, biche] }, desserts], apres: fromages },
  { slug: '5-assiettes', nom: 'Menu en 5 assiettes', court: '5 assiettes', prix: eur(85), accord: eur(113), etapes: [miseEnBouche, { etape: 'Première entrée', choix: [foie] }, { etape: 'Deuxième entrée', choix: [jacques] }, { etape: 'Troisième entrée', choix: [ris] }, { etape: 'Plat', choix: [poisson, biche] }, desserts], apres: fromages },
];
export const accordNote = 'Accord mets-vins : le verre de vin sélectionné par la maison, servi avec les entrées et les plats.';
export const regimes = 'Pour ajuster les recettes à un régime spécial (allergie, intolérance, végétarien), prévenez-nous lors de votre réservation. Les régimes vegan et sans lactose ne peuvent pas être assurés. Selon l’arrivage et les produits du marché, la composition des plats peut être modifiée.';

export const noel = {
  nom: 'Noël au restaurant', prix: eur(68), quand: 'Midi du 25 décembre, cinq services',
  note: `Acompte de ${eur(40)} par personne. Accord mets-vins : ${eur(7)} le verre.`,
  etapes: [
    { etape: 'Mise en bouche', choix: [{ nom: 'Mises en bouche' }] },
    { etape: 'Première entrée', choix: [{ nom: 'Maquereau et truite', desc: 'Maquereau à la flamme, cannelloni de truite de mer fumée et fromage frais, miel, poireaux vinaigrette, mizuna, mayo yaourt persil plat' }] },
    { etape: 'Deuxième entrée', choix: [{ nom: 'Saint-Jacques', desc: 'Tartelette de Saint-Jacques et de bœuf Angus fumé, pickles de chou-fleur, crumble, Pecorino, huile verte au céleri perpétuel' }] },
    { etape: 'Troisième entrée, en supplément', choix: [{ nom: 'Ris de veau', desc: 'Noix de ris de veau rôtie, coque d’oignon, crémeux à la moutarde, guanciale, jambon et champignons de Paris, croûtons et Parmesan', prix: `+${N}${eur(12)}` }] },
    { etape: 'Plat', choix: [{ nom: 'Biche', desc: 'Pithivier de filet de biche au foie gras, chou vert de Milan, pomme de terre bouchon' }] },
    { etape: 'Dessert', choix: [{ nom: 'Gourmandise festive', desc: 'Sablé « Petit Bateau », groseilles et vanille bourbon' }] },
  ] as Etape[],
};
export const emporter = {
  nom: 'Menu de Noël et Nouvel An à emporter', prix: `${eur(50)}, ${eur(60)} ou ${eur(70)}`,
  note: 'Une, deux ou trois entrées, un plat et un dessert. Commande par téléphone uniquement : avant le 20 décembre pour l’enlèvement du 24, avant le 27 décembre pour l’enlèvement du 31. Plats froids, prêts à être réchauffés.',
  plats: [
    { etape: 'Entrée', nom: 'Foie gras', desc: 'Foie gras de canard cuit au torchon, pomme Royal Gala, pain brioché au charbon végétal', prix: eur(22) },
    { etape: 'Entrée', nom: 'Tartelette de Saint-Jacques', desc: 'Noix de Saint-Jacques, cubes de saumon fumé, marmelade d’échalotes confites, crème double aux œufs de poisson', prix: eur(22) },
    { etape: 'Entrée ou plat', nom: 'Ris de veau', desc: 'Noix rôtie, coque d’oignon, crémeux à la moutarde, guanciale, croûtons et Parmesan', prix: `${eur(22)} en entrée, ${eur(32)} en plat` },
    { etape: 'Plat', nom: 'Pêche du jour en papillote', desc: 'Crevettes grises, moules, fondue de poireaux, céleri, grenailles, bisque de crevettes', prix: eur(28) },
    { etape: 'Plat', nom: 'Biche ou canette', desc: 'Noisette de biche grillée ou filet de canette grillé, purée de potimarron aux lardons confits', prix: eur(28) },
    { etape: 'Dessert', nom: 'Sablé « Petit Bateau »', desc: 'Groseilles, vanille bourbon', prix: eur(10) },
  ],
};

// Actualités du site d’origine (dates réelles). « Venez déguster notre nouvelle carte » : texte d’origine.
export const actus = [
  { date: '5 novembre 2026', titre: 'Fêtes de fin d’année', texte: 'Comme chaque année, le restaurant s’invite chez vous avec un menu de fêtes à emporter, et vous accueille aussi au restaurant le midi du 25 décembre. Au plaisir de vous accueillir.', lien: 'fetes-2026/', libelle: 'Voir le programme' },
  { date: '17 octobre 2026', titre: 'Venez déguster notre nouvelle carte', texte: 'La carte change : les menus en deux, trois, quatre et cinq assiettes sont à découvrir.', lien: 'nos-menus/', libelle: 'Voir les menus' },
  { date: '6 juin 2025', titre: 'Offre d’emploi', texte: 'Le restaurant recherchait un(e) cuisinier(e) : CDI à temps plein, entrée immédiate. Offre publiée en juin 2025.', lien: null, libelle: null },
  { date: '10 novembre 2021', titre: 'Bienvenue sur notre nouveau site internet', texte: 'Le site a été réalisé avec Créatonit, agence de communication de Bois-de-Villers : le restaurant, le chef et son parcours, la carte et les menus mis à jour régulièrement.', lien: null, libelle: null },
];

export const avis = { texte: 'Un cadre très agréable, un service au top et des plats succulents. Merci pour cette jolie découverte et à bientôt.', auteur: 'Stéphane Materne', source: 'témoignage affiché sur la page Le restaurant du site d’origine', aVerifier: true };
export const citation = { texte: 'La gastronomie est l’art d’utiliser la nourriture pour créer le bonheur.', auteur: 'Théodore Zeldin' };

export const nav = [
  { href: 'le-restaurant/', label: 'Le restaurant', page: 'restaurant' },
  { href: 'nos-menus/', label: 'Les menus', page: 'menus' },
  { href: 'fetes-2026/', label: 'Fêtes 2026', page: 'fetes' },
  { href: 'actualites/', label: 'Actualités', page: 'actus' },
  { href: 'contact/', label: 'Contact', page: 'contact' },
];

export const photos = {
  hero: { src: 'photos/13-plat-dentelle.webp', w: 1920, h: 1440, alt: 'Légumes verts et fleurs de ciboulette sur une tuile en dentelle, assiette blanche texturée' },
  cuisine: { src: 'photos/16-cuisine-poivre.webp', w: 1100, h: 920, alt: 'Cuisinier en veste blanche moulant du poivre sur un plan de travail de cuisine' },
  parc: { src: 'photos/05-parc-potager.webp', w: 1600, h: 900, alt: 'Parc arboré et carré potager de plantes aromatiques' },
  salle: { src: 'photos/01-salle-terrasse-vitree.webp', w: 1600, h: 1065, alt: 'Salle à manger lumineuse, grande table en bois et baie vitrée sur le parc' },
  terrasse: { src: 'photos/07-terrasse-table.webp', w: 800, h: 1422, alt: 'Table de terrasse au bord du parc, fauteuils noirs' },
  voutes: { src: 'photos/02-salle-table-voutes.webp', w: 1400, h: 1050, alt: 'Salle avec grande table dressée, arches en bois et mur de brique blanchie' },
  noire: { src: 'photos/11-plat-assiette-noire.webp', w: 1400, h: 1050, alt: 'Plat dressé sur une assiette noire texturée, jardin en arrière-plan' },
  volaille: { src: 'photos/14-plat-volaille.webp', w: 1200, h: 801, alt: 'Cuisse et filet de volaille, sauce et légumes sur assiette blanche' },
  bouche: { src: 'photos/12-mises-en-bouche.webp', w: 1200, h: 899, alt: 'Mises en bouche sur une planche en bois d’olivier' },
  sapin: { src: 'photos/18-dessert-sapin-macarons.webp', w: 1100, h: 870, alt: 'Dessert de fêtes en forme de sapin de macarons sous cloche' },
  emporter: { src: 'photos/19-traiteur-emporter.webp', w: 900, h: 900, alt: 'Plats à emporter en barquettes et plat de viande' },
  facade: { src: 'photos/06-facade-maison.webp', w: 600, h: 450, alt: 'Façade de la maison en brique rouge' },
  brique: { src: 'photos/04-salle-mur-brique.webp', w: 800, h: 1067, alt: 'Table dressée devant le mur de brique et les arches en bois' },
};
