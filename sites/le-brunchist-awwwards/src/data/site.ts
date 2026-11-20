// Contenu du Brunchist. Sources : data/restaurants/le-brunchist/donnees.json et dossier.md (recherche du 20/11/2026).
// HYPOTHÈSES (à valider par le restaurant) :
//  - Adresse place d'Armes 8 et téléphone +32 474 06 92 27 : sources récentes (donnees.json) ; restaurants.json porte une ancienne adresse et un ancien numéro.
//  - Horaires mercredi à dimanche 9 h 30 à 15 h 30 (Namur CentreVille) ; d'autres sources divergent (9 h à 15 h, ouverture à 10 h).
//  - Aucune carte, aucun prix, aucune photo du client : les plats cités par la presse et les avis sont repris sans prix certain ;
//    descriptions, prix et répartition en trois moments sont `placeholder: true` (illustratifs).
//  - Aucun e-mail connu : aucun mailto. Aucune note ni avis affichés.
const nb = ' ';

export type Plat = { nom: string; description: string; prix: number; moment: 'matin' | 'brunch' | 'midi'; placeholder: boolean };

export const restaurant = {
  nom: 'Le Brunchist',
  typeCuisine: ['Brunch', 'Café de spécialité'],
  baseline: `Brunch et cafés de spécialité, place d’Armes à Namur`,
  description: `Le Brunchist, café-brunch et cafés de spécialité place d’Armes à Namur. Eggs benedict, granola maison, jus frais. Du mercredi au dimanche, de 9${nb}h${nb}30 à 15${nb}h${nb}30.`,
  adresse: { rue: 'Place d’Armes', numero: '8', cp: '5000', commune: 'Namur', pays: 'BE' },
  telephone: '+32 474 06 92 27',
  telephoneHref: 'tel:+32474069227',
  telephoneLisible: '0474 06 92 27',
  reservationUrl: null as string | null,
  mapUrl: 'https://www.openstreetmap.org/search?query=Place%20d%27Armes%208%205000%20Namur',
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/Lebrunchist' },
    { nom: 'Instagram', url: 'https://www.instagram.com/lebrunchist/' },
  ],
  siteActuel: 'https://lebrunchist.com',
  credit: 'Aucune photo du restaurant n’a été fournie : les visuels de cette maquette sont des compositions typographiques',
};

/** Horaires par jour : ouverture et fermeture en minutes depuis minuit, null = fermé. */
export const jours = [
  { court: 'Lun.', long: 'Lundi', schema: 'Monday', ouvre: null, ferme: null },
  { court: 'Mar.', long: 'Mardi', schema: 'Tuesday', ouvre: null, ferme: null },
  { court: 'Mer.', long: 'Mercredi', schema: 'Wednesday', ouvre: 570, ferme: 930 },
  { court: 'Jeu.', long: 'Jeudi', schema: 'Thursday', ouvre: 570, ferme: 930 },
  { court: 'Ven.', long: 'Vendredi', schema: 'Friday', ouvre: 570, ferme: 930 },
  { court: 'Sam.', long: 'Samedi', schema: 'Saturday', ouvre: 570, ferme: 930 },
  { court: 'Dim.', long: 'Dimanche', schema: 'Sunday', ouvre: 570, ferme: 930 },
] as const;
export const horairesTexte = `9${nb}h${nb}30 à 15${nb}h${nb}30`;
export const joursOuverts = jours.filter((j) => j.ouvre !== null);

export const moments = [
  { id: 'matin', heure: `9${nb}h${nb}30`, titre: 'Le premier café', texte: 'On s’installe, on commande une tasse. Cafés de spécialité, matcha, jus frais.' },
  { id: 'brunch', heure: `11${nb}h`, titre: 'Le vrai brunch', texte: 'Œufs, pancakes, granola : le milieu de la matinée, celui qui s’étire.' },
  { id: 'midi', heure: `13${nb}h`, titre: 'Le déjeuner', texte: 'Tartines et toasts pour ceux qui arrivent quand le soleil est haut.' },
] as const;

// Noms cités par la presse ou les avis (namur.top, Quefaireanamur, Restaurant Guru) ; prix, descriptions et moment : illustratifs.
export const plats: Plat[] = [
  { nom: 'Café de spécialité', description: 'Espresso ou filtre, torréfaction à confirmer.', prix: 3.2, moment: 'matin', placeholder: true },
  { nom: 'Latte', description: 'Espresso, lait mousseux.', prix: 4.6, moment: 'matin', placeholder: true },
  { nom: 'Matcha', description: 'Thé vert en poudre, lait au choix.', prix: 5.2, moment: 'matin', placeholder: true },
  { nom: 'Jus frais', description: 'Pressé à la commande.', prix: 5.5, moment: 'matin', placeholder: true },
  { nom: 'Granola maison', description: 'Granola fait maison, yaourt, fruits.', prix: 10.9, moment: 'brunch', placeholder: true },
  { nom: 'Granola bowl', description: 'Base de granola, fruits de saison.', prix: 11.9, moment: 'brunch', placeholder: true },
  { nom: 'Pancakes', description: 'Pile de pancakes, garniture du jour.', prix: 12.5, moment: 'brunch', placeholder: true },
  { nom: 'Œufs brouillés', description: 'Œufs brouillés, pain grillé.', prix: 11.5, moment: 'brunch', placeholder: true },
  { nom: 'Eggs benedict', description: 'Œufs pochés, muffin, sauce hollandaise.', prix: 14.5, moment: 'brunch', placeholder: true },
  { nom: 'Toast à l’avocat', description: 'Avocat écrasé, œuf, pain grillé.', prix: 13.5, moment: 'midi', placeholder: true },
  { nom: 'Tartine du jour', description: 'Composition du moment sur pain frais.', prix: 12.5, moment: 'midi', placeholder: true },
  { nom: 'Filet américain', description: 'Filet américain, tartine, crudités.', prix: 15.5, moment: 'midi', placeholder: true },
];

export const histoire = {
  titre: 'Un mot-valise, une adresse',
  paragraphes: [
    'Le Brunchist ouvre en 2022, à Namur, à l’initiative de Mélisande et Arnaud, un couple namurois. L’idée tient dans le nom : un café où le petit-déjeuner et le déjeuner se rejoignent, sans se presser, avec du local et du fait maison.',
    'La presse locale l’a d’abord situé rue des Brasseurs. Il a depuis pris ses quartiers place d’Armes, au cœur de la ville, avec une terrasse en extérieur.',
  ],
  source: 'Sources : ELLE.be (26 janvier 2025) et namur.top (19 mars 2023). À confirmer par le restaurant.',
  etapes: [
    { quand: '2022', texte: 'Mélisande et Arnaud ouvrent Le Brunchist à Namur.' },
    { quand: '2023', texte: 'Le café est installé rue des Brasseurs, selon namur.top.' },
    { quand: 'Aujourd’hui', texte: 'Place d’Armes 8, du mercredi au dimanche.' },
  ],
};
export const equipe = [{ nom: 'Mélisande et Arnaud', role: 'Fondateurs', placeholder: false }];
export const presse = [
  { media: 'ELLE.be', titre: 'Les meilleurs brunchs à tester à Namur', date: '26 janvier 2025', url: 'https://www.elle.be/fr/442321-les-meilleurs-brunchs-a-tester-a-namur.html' },
  { media: 'namur.top', titre: 'Le Brunchist, le meilleur brunch de Namur', date: '19 mars 2023', url: 'https://namur.top/le-brunchist-le-meilleur-brunch-de-namur/' },
];
export const photos: { fichier: string; alt: string; credit: string }[] = [];
export const prixFmt = (p: number) => p.toFixed(2).replace('.', ',') + ' €';
export const hh = (m: number) => `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')}`;
