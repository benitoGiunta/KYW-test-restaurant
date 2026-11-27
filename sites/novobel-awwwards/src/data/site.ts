// Contenu de Novobel. Source : data/restaurants/novobel/donnees.json et dossier.md (recherche du 27/11/2026).
// HYPOTHÈSES (voir ETAT.md et RAPPORT.md) :
//  - Novobel n'est PAS un restaurant mais une entreprise de construction et rénovation à Namur : le gabarit restaurant
//    est transposé (carte → projets, réservation → contact). Aucune carte, horaire, avis ni réservation n'existe.
//  - Horaires inconnus : jamais affichés. « 25 ans d'activité » (site actuel) contredit la BCE (2019) : non repris.
//  - Photos : images du site actuel, probablement de stock : présentées comme illustrations.
//  - Les phrases d'explication des lots sont des textes génériques écrits pour la maquette (`placeholder: true`).
const NBSP = ' ';

export const site = {
  nom: 'Novobel',
  forme: 'SRL',
  baseline: 'La qualité avant tout',
  activite: 'Construction et rénovation',
  ville: 'Namur',
  description: 'Novobel, entreprise de construction et de rénovation à Namur : rénovation complète, gros œuvre, finitions et installations techniques, de l’étude à la remise des clés.',
  adresse: { rue: 'Rue Emile Cuvelier', numero: `14, boîte${NBSP}1`, cp: '5000', commune: 'Namur', pays: 'BE' },
  telephone: '+32488466413',
  telephoneHref: 'tel:+32488466413',
  telephoneLisible: `+32${NBSP}488${NBSP}46${NBSP}64${NBSP}13`,
  email: 'info@novobel.com',
  siteActuel: 'https://www.novobel.com',
  carriereUrl: 'https://www.novobel.com/jobs',
  carteUrl: 'https://www.openstreetmap.org/search?query=Rue%20Emile%20Cuvelier%2014%2C%205000%20Namur',
  reseaux: [{ nom: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100064109591379' }],
  creditPhotos: 'photos : site novobel.com',
} as const;

export type Lot = { nom: string; texte: string; placeholder: true };
export const lots: Lot[] = [
  { nom: 'Étude', texte: 'Le projet est mesuré, chiffré et planifié avant le premier coup de masse.', placeholder: true },
  { nom: 'Gros œuvre', texte: 'Structure, murs, dalles et ouvertures : la base sur laquelle tout le reste repose.', placeholder: true },
  { nom: 'Finitions', texte: 'Plafonnage, cloisons, peintures, sols et carrelages : le travail que l’on voit.', placeholder: true },
  { nom: 'Installations techniques', texte: 'Électricité et équipements techniques posés et réglés dans l’ordre du chantier.', placeholder: true },
  { nom: 'Remise des clés', texte: 'Un seul interlocuteur, de la première visite jusqu’au dernier contrôle.', placeholder: true },
];

export type Projet = { nom: string; type: string; appartements: number; photo: 'cuisine' | 'salon' | 'combles' | 'entrepot'; lieu?: string };
export const projets: Projet[] = [
  { nom: 'Astrid', type: 'Bureaux transformés en appartements', appartements: 4, photo: 'entrepot' },
  { nom: 'Bellevue', type: 'Immeuble de bureaux transformé en appartements', appartements: 14, photo: 'cuisine' },
  { nom: 'Joseph', type: 'Maison et arrière-maison transformées en appartements', appartements: 6, photo: 'salon' },
  { nom: 'Citadelle', type: 'Maison de maître transformée en appartements', appartements: 4, photo: 'combles' },
];

export const valeurs = ['Une approche familiale', 'La proximité avec le client', 'Le respect des délais'];

export const offres = [
  'Conducteur de chantier',
  'Carreleur',
  'Électricien',
  'Plafonnage et cloisonnage',
  'Stage d’architecte d’intérieur',
  'Ouvrier polyvalent',
];
