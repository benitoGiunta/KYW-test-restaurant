// Contenu de Be Belge… et d'ailleurs. Source : data/restaurants/be-belge/{donnees.json,dossier.md}.
// HYPOTHÈSES (voir ETAT.md) :
//  - Le menu relevé sur le site du client est « proposé du 13 août au 6 septembre 2026 » : il est affiché tel quel, avec cette
//    mention, et à reconfirmer. Aucun prix de plat à la carte (prix: null) : seuls les 2 menus et 2 suppléments sont chiffrés.
//  - Chef, équipe, date d'ouverture, avis, boissons, parking : inconnus, donc absents (rien d'inventé, rien de marqué fictif).
//  - Les couples « d'ici / d'ailleurs » de l'accueil sont une lecture éditoriale des descriptions réelles de la carte.
export const site = {
  nom: 'Be Belge… et d’ailleurs',
  nomCourt: 'Be Belge',
  baseline: 'Cuisine belge et de saison, avec le goût d’ailleurs',
  description: 'Be Belge… et d’ailleurs, restaurant de cuisine belge et de saison à Wépion (Namur) : menu du chef en 3 ou 4 services, salle au mur de pierre, terrasse et jardin.',
  typeCuisine: 'Cuisine belge et de saison, influences d’ailleurs',
  adresse: { rue: 'Avenue de Marlagne', numero: '203', cp: '5000', commune: 'Namur (Wépion)', pays: 'BE' },
  adresseLisible: 'Avenue de Marlagne 203, 5000 Namur (Wépion)',
  geo: { lat: 50.4517812, lon: 4.8421921 },
  planUrl: 'https://www.openstreetmap.org/?mlat=50.4517812&mlon=4.8421921#map=17/50.4517812/4.8421921',
  telephone: '+32 81 47 00 95',
  telephoneLisible: '081 47 00 95',
  telephoneHref: 'tel:+3281470095',
  email: 'info@bebelgeetdailleurs.be',
  reservationUrl: 'https://bebelgeetdailleurs.be/reservation/',
  siteClient: 'https://bebelgeetdailleurs.be',
  reseaux: [{ nom: 'Facebook', url: 'https://www.facebook.com/Restaurant-be-Belgeet-d-ailleurs-460789377730605/' }],
  bce: '0697768609',
  exploitant: 'CATAX',
  accroche: 'Il n’y a pas de bon repas si le vin n’y coule pas !',
  accueil: 'Bonjour les Gourmets ! Nous avons le plaisir de vous accueillir dans notre nouveau petit nid !',
};

export type Service = { debut: string; fin: string };
export const horaires: { jour: string; court: string; ouvert: Service[]; schema: string }[] = [
  { jour: 'Lundi', court: 'Lun', ouvert: [], schema: 'Monday' },
  { jour: 'Mardi', court: 'Mar', ouvert: [], schema: 'Tuesday' },
  { jour: 'Mercredi', court: 'Mer', ouvert: [{ debut: '12:00', fin: '13:30' }], schema: 'Wednesday' },
  { jour: 'Jeudi', court: 'Jeu', ouvert: [{ debut: '12:00', fin: '13:30' }, { debut: '19:00', fin: '20:30' }], schema: 'Thursday' },
  { jour: 'Vendredi', court: 'Ven', ouvert: [{ debut: '12:00', fin: '13:30' }, { debut: '19:00', fin: '20:30' }], schema: 'Friday' },
  { jour: 'Samedi', court: 'Sam', ouvert: [{ debut: '19:00', fin: '20:30' }], schema: 'Saturday' },
  { jour: 'Dimanche', court: 'Dim', ouvert: [{ debut: '12:00', fin: '13:30' }], schema: 'Sunday' },
];
/** '12:00' -> '12 h', '13:30' -> '13 h 30' (espaces insécables). */
export const heure = (h: string) => { const [a, b] = h.split(':'); return b === '00' ? `${+a} h` : `${+a} h ${b}`; };
export const plage = (s: Service) => `${heure(s.debut)} à ${heure(s.fin)}`;

export const menus = [
  { nom: 'Menu du Chef, 3 services', detail: 'Entrée, plat, dessert', prix: 57, vins: 28 },
  { nom: 'Menu du Chef, 4 services', detail: 'Deux entrées, plat, dessert', prix: 72, vins: 35 },
];
export const periodeMenu = 'Menu proposé du 13 août au 6 septembre 2026 (relevé sur le site du restaurant, à reconfirmer).';

export type Plat = { nom: string; description: string; supplement?: number; placeholder?: boolean };
export const carte: { categorie: string; titre: string; plats: Plat[] }[] = [
  { categorie: 'Mises en bouche et entrées', titre: 'Pour commencer', plats: [
    { nom: 'Saint-Jacques en deux préparations', description: 'Taillées à cru, fraîcheur d’agrumes ; poêlées, émulsion au beurre blanc' },
    { nom: 'Langoustines rôties aux épices', description: 'Risotto et petits pois façon paëlla, crème de chorizo doux' },
    { nom: 'Foie de canard poêlé', description: 'Compotée d’oignons caramélisés, liégeoise et cassis' },
  ] },
  { categorie: 'Plats', titre: 'Au centre', plats: [
    { nom: 'Soupe de poissons de la Méditerranée', description: 'Grenailles safranées' },
    { nom: 'Carré de veau de lait basse température', description: 'Jus corsé à la truffe d’été, jeunes légumes et pommes bouchon' },
    { nom: 'Filet de canette', description: 'Abricot caramélisé à la lavande, jus corsé à la Kriek Boon' },
  ] },
  { categorie: 'Desserts', titre: 'Pour finir', plats: [
    { nom: 'Douceur tiède au chocolat Valrhona', description: 'Crème anglaise à la vanille Bourbon, fruits frais' },
    { nom: 'La classique Dame blanche', description: 'Et son chocolat chaud' },
    { nom: 'Assortiment de sorbets', description: '' },
    { nom: 'Assortiment de fromages affinés par la Petite Ferme', description: 'Supplément', supplement: 7 },
    { nom: 'Irish Coffee', description: 'Supplément', supplement: 4 },
  ] },
];

/** Lecture éditoriale de trois plats réels : ce qui vient d'ici, ce qui vient d'ailleurs (accueil). */
export const couples = [
  { plat: 'Filet de canette', ici: 'La Kriek Boon', ailleurs: 'L’abricot caramélisé à la lavande' },
  { plat: 'Foie de canard poêlé', ici: 'La liégeoise et le cassis', ailleurs: 'La compotée d’oignons caramélisés' },
  { plat: 'Langoustines rôties aux épices', ici: 'Les petits pois', ailleurs: 'Le risotto façon paëlla, le chorizo doux' },
];

export const privatisation = { assis: [15, 34], walking: [20, 40], note: 'Jours et horaires adaptables.' };
