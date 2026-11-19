// Contenu de Wok de Jin (variante awwwards « La semaine à volonté »).
// Source : data/restaurants/wok-de-jin/{donnees.json,dossier.md}. Rien d'inventé : avis, réseaux, e-mail, histoire,
// année d'ouverture, parking sont inconnus et ne sont pas affichés.
// HYPOTHESES (listées dans RAPPORT.md) :
//  1. Le site client donne trois tarifs (midi 16,80 / soir en semaine 23,80 / week-end et jours fériés 27,80). Hypothèse
//     de lecture : midi = lundi, mercredi, jeudi, vendredi ; soir = ces mêmes jours ; samedi et dimanche = tarif
//     week-end aux deux services (`hypothese: true`). Le jour férié suit le tarif week-end (dit sur le site).
//  2. Téléphone : 081 30 68 88 (site du client) ; restaurants.json donne un mobile +32 487 888 968, à confirmer.
//  3. Le lien de réservation générale est la page d'accueil du site du client ; seul le réveillon a une URL dédiée.
const NB = ' ';
export const heure = (h: string) => {
  const [hh, mm] = h.split(':');
  return mm === '00' ? `${Number(hh)}${NB}h` : `${Number(hh)}${NB}h${NB}${mm}`;
};
export const plage = (a: string, b: string) => `${heure(a)} à ${heure(b)}`;
export const prix = (n: number) => `${n.toFixed(2).replace('.', ',')}${NB}€`;

export const site = {
  nom: 'Wok de Jin',
  baseline: 'Buffet à volonté asiatique. Toutes vos envies à la même table.',
  description: 'Buffet asiatique à volonté à Jambes, Namur : sushis, wok et teppanyaki préparés devant vous, dès 16,80 € le midi. Fermé le mardi.',
  typeCuisine: 'Buffet asiatique à volonté : wok, sushis, teppanyaki',
  adresse: { rue: 'Avenue du Bourgmestre Jean Materne', numero: '219', cp: '5100', commune: 'Jambes (Namur)', ville: 'Jambes', pays: 'BE' },
  geo: { lat: 50.4547, lon: 4.8782 },
  telephone: '+3281306888',
  telephoneLisible: '081 30 68 88',
  telephoneHref: 'tel:+3281306888',
  reservationUrl: 'https://wokdejin.com/',
  reveillonUrl: 'https://wokdejin.com/reveillon/reserver',
  carteUrl: 'https://maps.app.goo.gl/Je47suHkwBY6jtC66',
  siteActuel: 'https://wokdejin.com',
  credit: 'Photos : Wok de Jin',
} as const;

export const services = [
  { id: 'midi', libelle: 'Midi', debut: '12:00', fin: '14:00' },
  { id: 'soir', libelle: 'Soir', debut: '18:00', fin: '22:30' },
] as const;

export const tarifs = {
  t1: { id: 't1', libelle: 'Midi', contexte: 'en semaine', buffet: 16.8, boissons: 28 },
  t2: { id: 't2', libelle: 'Soir', contexte: 'en semaine', buffet: 23.8, boissons: 37 },
  t3: { id: 't3', libelle: 'Week-end et jours fériés', contexte: 'midi et soir', buffet: 27.8, boissons: 40 },
} as const;
export type Tier = keyof typeof tarifs;

// `hypothese: true` : correspondance jour / tarif déduite des trois onglets du site client (voir en-tête).
export const semaine: { id: string; nom: string; court: string; ferme?: boolean; midi?: Tier; soir?: Tier; hypothese?: boolean }[] = [
  { id: 'lundi', nom: 'Lundi', court: 'Lun', midi: 't1', soir: 't2', hypothese: true },
  { id: 'mardi', nom: 'Mardi', court: 'Mar', ferme: true },
  { id: 'mercredi', nom: 'Mercredi', court: 'Mer', midi: 't1', soir: 't2', hypothese: true },
  { id: 'jeudi', nom: 'Jeudi', court: 'Jeu', midi: 't1', soir: 't2', hypothese: true },
  { id: 'vendredi', nom: 'Vendredi', court: 'Ven', midi: 't1', soir: 't2', hypothese: true },
  { id: 'samedi', nom: 'Samedi', court: 'Sam', midi: 't3', soir: 't3', hypothese: true },
  { id: 'dimanche', nom: 'Dimanche', court: 'Dim', midi: 't3', soir: 't3', hypothese: true },
];
export const joursSchema = ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

export const boissonsFormule = 'bière au fût, Coca, Fanta, Sprite, Ice Tea, eau, jus d’orange, de lychees et d’ananas, vin en pichet, un café ou un thé';

// Comptoirs du buffet : descriptions tirées du dossier (« Le buffet de sushis comprend nigiris, makis et créations de la
// maison, avec poissons et fruits de mer » ; wok et teppanyaki : ingrédients au choix cuisinés devant le client ; desserts : macarons, pâtisseries).
export const comptoirs = [
  { id: 'sushis', nom: 'Sushis', texte: 'Nigiris, makis et créations de la maison, au tapis du buffet.', photo: 'sushis', placeholder: false },
  { id: 'mer', nom: 'Mer', texte: 'Poissons et fruits de mer à volonté, en bacs sur la glace.', photo: 'mer', placeholder: false },
  { id: 'wok', nom: 'Wok', texte: 'Vous choisissez viandes et légumes, le cuisinier les saute devant vous.', photo: 'wokIngredients', placeholder: false },
  { id: 'teppanyaki', nom: 'Teppanyaki', texte: 'Même principe sur la plaque : vos ingrédients, cuits à la minute.', photo: 'teppanyaki', placeholder: false },
  { id: 'sucre', nom: 'Sucré', texte: 'Macarons, pâtisseries et chocolats pour finir.', photo: 'desserts', placeholder: false },
] as const;

export const famille = [
  { titre: 'Enfants', texte: 'De 0 à 3 ans, c’est gratuit. De 4 à 11 ans, demi-tarif, sur présentation de la carte d’identité.' },
  { titre: 'Anniversaire', texte: 'Moins 50 % sur le buffet, boissons exclues, sur présentation d’une pièce d’identité, à trois jours près.' },
  { titre: 'Salle de jeux', texte: 'Une salle de jeux occupe les enfants pendant que les grands reprennent un tour.' },
  { titre: 'Grandes tablées', texte: 'De grandes tables accueillent les familles, les amis et les collègues.' },
] as const;

export const reveillon = {
  date: 'jeudi 31 décembre 2026',
  debut: '18:00',
  prix: 80,
  acompte: 20,
  texte: 'Buffet de fête avec DJ, boissons comprises : cochon de lait rôti, dinde aux cranberries, escargots, wok, teppanyaki, sushis, fruits de mer et pâtisseries.',
  conditions: 'Acompte de 20 € par personne, non remboursable, déduit de l’addition. Enfants jusqu’à 4 ans : 5 € sur place. Réservation en ligne jusqu’au 31 décembre à minuit.',
} as const;
