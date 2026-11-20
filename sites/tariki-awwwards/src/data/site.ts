// Contenu de Tariki (variante awwwards). Source : data/restaurants/tariki/ (donnees.json, dossier.md, site-actuel/).
// HYPOTHÈSES (aussi dans RAPPORT.md) :
// - Adresse : Rue de l’Ouvrage 2, 5000 Namur (site du client). L’adresse BCE (Rue du Pont 15) est celle de Bayti : non utilisée.
// - Carte du soir : version de la page « La carte » du client (prix inférieurs à ceux de la page d’accueil).
//   La formule « Le début du voyage » (18 € par personne) n’existe que sur la version d’accueil : non affichée.
// - Aucun avis, note, distinction ni citation affichés ; Moustique (lecture partielle) non cité. Équipe, chef, ouverture : inconnus, absents.
// - GPS, parking, accès, terrasse, privatisation, take-away : inconnus, absents (lien de plan par recherche d’adresse).
// - Photos : seulement celles du site du client (braises, feu, arcades). L’arcade est possiblement un rendu IA et n’est pas le
//   restaurant : légende « illustration ». Aucun plat, salle ni visage : la typographie et la route portent la mise en page.
// - Étapes de la route : les cinq pays viennent du récit du client ; leur association aux rubriques de la carte est une mise en voix du concept.

export const site = {
  nom: 'Tariki',
  baseline: 'De notre route… jusqu’à votre table.',
  sens: 'mon chemin',
  arabe: 'طريقي',
  description: 'Cuisine levantine au feu de bois à Namur : mezzés à partager, grillades au charbon, déjeuner à 17 €. Rue de l’Ouvrage 2, fermé le dimanche.',
  typeCuisine: 'Levantine, grillades au feu de bois',
  adresse: { rue: 'Rue de l’Ouvrage', numero: '2', cp: '5000', commune: 'Namur', pays: 'BE' },
  telephone: '+32 492 92 18 39',
  telephoneHref: 'tel:+32492921839',
  telephoneLisible: '0492 92 18 39',
  email: 'info@tarikirestaurant.be',
  reservationUrl: 'https://www.tarikirestaurant.be#reservation',
  siteClient: 'https://www.tarikirestaurant.be',
  instagram: 'https://www.instagram.com/tariki.restaurant',
  planUrl: 'https://www.openstreetmap.org/search?query=Rue%20de%20l%27Ouvrage%202%205000%20Namur',
  credit: 'Visuels d’ambiance du site de Tariki, illustratifs',
} as const;

/** Services d’ouverture (donnees.json > horaires). */
export const services = [
  { jours: ['Monday', 'Tuesday'], debut: '18:00', fin: '21:00' },
  { jours: ['Wednesday', 'Thursday', 'Friday', 'Saturday'], debut: '11:30', fin: '14:00' },
  { jours: ['Wednesday', 'Thursday', 'Friday', 'Saturday'], debut: '18:00', fin: '21:00' },
] as const;

/** Lignes d’affichage des horaires. */
export const horaires = [
  { jour: 'Lundi', midi: null, soir: '18 h à 21 h' },
  { jour: 'Mardi', midi: null, soir: '18 h à 21 h' },
  { jour: 'Mercredi', midi: '11 h 30 à 14 h', soir: '18 h à 21 h' },
  { jour: 'Jeudi', midi: '11 h 30 à 14 h', soir: '18 h à 21 h' },
  { jour: 'Vendredi', midi: '11 h 30 à 14 h', soir: '18 h à 21 h' },
  { jour: 'Samedi', midi: '11 h 30 à 14 h', soir: '18 h à 21 h' },
  { jour: 'Dimanche', midi: null, soir: null },
] as const;

/** La route : cinq étapes du récit du client (Syrie, Liban, Turquie, Grèce, puis la Belgique). */
export const etapes = ['Syrie', 'Liban', 'Turquie', 'Grèce', 'Namur'] as const;

export const formuleMidi = {
  nom: 'Formule midi',
  prix: 17,
  detail: 'Un sandwich au feu de bois (tawook, tawook épicé ou falafel), un accompagnement (houmous, mutabal, salade fatoush ou batata harra) et une pièce de baklava.',
} as const;

export const histoire = {
  lead: 'Tariki veut dire « mon chemin ».',
  paragraphes: [
    'Un chemin commencé en Syrie, passé par le Liban, la Turquie et la Grèce, avant de trouver un foyer en Belgique. Ce foyer s’appelle Bayti. Il est né de cette gratitude, puis est venu Bayti le Comptoir.',
    'Tariki ouvre un nouveau chapitre autour du feu : grillades cuites au charbon et à flamme ouverte, mezzés posés au milieu de la table, une carte volontairement courte.',
  ],
  trilogie: [
    { nom: 'Bayti', note: '' },
    { nom: 'Bayti le Comptoir', note: '' },
    { nom: 'Tariki', note: 'Il prolonge les deux autres sans les remplacer.' },
  ],
  valeurs: ['Cuisson au charbon et à flamme ouverte', 'Le partage', 'L’hospitalité'],
} as const;

export const pageInfos = {
  acces: [
    'Le restaurant est fermé le dimanche.',
    'Du mercredi au samedi, le service du midi a lieu de 11 h 30 à 14 h : sandwichs au feu de bois à 9 €, formule à 17 €.',
    'Le lundi et le mardi, seul le service du soir est ouvert, de 18 h à 21 h.',
    'La carte signale les allergènes : fruits à coque, lait, sésame.',
  ],
} as const;
