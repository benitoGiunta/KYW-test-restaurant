// Contenu de Monepi Boulangerie (data/restaurants/mon-epi/donnees.json + dossier.md).
// HYPOTHÈSES (aussi dans RAPPORT.md) :
// - Monepi est une BOULANGERIE, pas un restaurant : pas de réservation de table ; « réservation » = commande par téléphone
//   (route /reservation/ conservée, libellé « Commander »).
// - Horaires : seul le vendredi 9 h à 18 h est publié (monepi.be/contact). Les autres jours ne sont ni inventés ni affichés comme fermés.
// - E-mail inconnu : aucun mailto. Réservation en ligne inexistante : aucun formulaire.
// - Taux d'extraction des farines : « environ » (≈ 65, 75, 75, 80 %), valeurs du site client (about-us), à confirmer.
// - Année du four : 2002 (about-us) ou 2000 (accueil), à confirmer : le site dit « au début des années 2000 ».
// - Page Quiches du site client en 404 : rubrique omise. Aucun avis, note ni distinction inventés (avis Google : null).
// Rien n'est `placeholder: true` : tout vient du dossier. Les équivalents fictifs : aucun.

export const site = {
  nom: 'Monepi',
  enseigne: 'Monepi Boulangerie',
  baseline: 'Pain au levain, farines moulues sur place, cuit au four à bois',
  description: 'Monepi, boulangerie artisanale bio à Loyers (Namur) : pains au levain, farines de blé et d’épeautre moulues sur meules de granit, cuisson au four à bois.',
  telephone: '+32 491 18 29 35',
  telephoneAffiche: '0491 18 29 35',
  email: null as string | null,
  adresse: { rue: 'Rue Es Fays', numero: '43', cp: '5101', commune: 'Loyers', ville: 'Namur', pays: 'BE' },
  geo: { lat: 50.4527485, lon: 4.956183 },
  carte: 'https://www.openstreetmap.org/?mlat=50.4527485&mlon=4.956183#map=17/50.4527485/4.956183',
  reseaux: [{ nom: 'Facebook', url: 'https://www.facebook.com/Monepi.boulangerie' }],
  reservationUrl: null as string | null,
  siteClient: 'http://www.monepi.be',
  credit: 'photos : Monepi Boulangerie',
};

export const horaires = [
  { jour: 'Vendredi', en: 'Friday', ouverture: '09:00', fermeture: '18:00', texte: '9 h à 18 h' },
];

export type Farine = { id: string; nom: string; taux: number; note: string };
// Taux d'extraction : part du grain conservée dans la farine (about-us de monepi.be, « environ »).
export const farines: Farine[] = [
  { id: 'ble-blanc', nom: 'Blé blanc', taux: 65, note: 'La plus claire des quatre : le pain « Blé blanc », 800 g, à la levure.' },
  { id: 'ble-demi-gris', nom: 'Blé demi-gris', taux: 75, note: 'Le pain de tous les jours, au levain ou à la levure.' },
  { id: 'epeautre-demi-gris', nom: 'Épeautre demi-gris', taux: 75, note: 'Le pur épeautre, au levain ou à la levure, et le pain d’épeautre et de seigle.' },
  { id: 'petit-epeautre', nom: 'Petit épeautre', taux: 80, note: 'La plus riche en grain : un pain dense, au levain.' },
];

export type Plat = { nom: string; poids?: string; prix: number; prixMax?: number; composition: string; farine?: string; placeholder?: boolean };
export type Rayon = { id: string; titre: string; intro: string; photo: 'ronds' | 'rustiques' | 'chocolat' | 'baguette' | 'seigle' | 'graines' | null; plats: Plat[] };

export const rayons: Rayon[] = [
  { id: 'levain', titre: 'Pains au levain', intro: 'Levain issu de l’agriculture biologique, farine, sel marin, eau.', photo: 'ronds', plats: [
    { nom: 'Blé complet', poids: '800 g', prix: 3.0, composition: 'Farine de blé complète, sel marin, eau, levain', farine: 'complète' },
    { nom: 'Pur épeautre demi-gris', poids: '800 g', prix: 4.3, composition: 'Farine d’épeautre demi-grise, sel marin, eau, levain', farine: 'epeautre-demi-gris' },
    { nom: 'Blé demi-gris', poids: '800 g', prix: 3.0, composition: 'Farine de blé demi-grise, sel marin, eau, levain', farine: 'ble-demi-gris' },
    { nom: 'Épeautre et 35 % de seigle complet', poids: '800 g', prix: 4.15, composition: 'Farine d’épeautre demi-grise, farine de seigle complète, sel marin, eau, levain', farine: 'epeautre-demi-gris' },
    { nom: 'Petit épeautre', poids: '400 g ou 800 g', prix: 4.0, prixMax: 8.0, composition: 'Farine de petit épeautre, sel marin, eau, levain', farine: 'petit-epeautre' },
  ] },
  { id: 'levure', titre: 'Pains à la levure', intro: 'Les mêmes farines, levées à la levure.', photo: 'rustiques', plats: [
    { nom: 'Blé demi-gris', poids: '800 g ou 1 600 g', prix: 3.0, prixMax: 5.9, composition: 'Farine de blé demi-grise, sel marin, eau, levure', farine: 'ble-demi-gris' },
    { nom: 'Pur épeautre demi-gris', poids: '800 g', prix: 4.3, composition: 'Farine d’épeautre demi-grise, sel marin, eau, levure', farine: 'epeautre-demi-gris' },
    { nom: 'Pur épeautre blanc', poids: '800 g', prix: 4.35, composition: 'Farine d’épeautre blanche, sel marin, eau, levure' },
    { nom: 'Blé demi-gris sésame', poids: '400 g ou 800 g', prix: 2.3, prixMax: 3.75, composition: 'Farine de blé demi-grise, sel marin, eau, levure, graines de sésame', farine: 'ble-demi-gris' },
    { nom: 'Blé et 30 % d’épeautre', poids: '800 g', prix: 3.5, composition: 'Farine de blé demi-grise (70 %), farine d’épeautre demi-grise (30 %), sel marin, eau, levure', farine: 'ble-demi-gris' },
    { nom: 'Pain aux raisins', poids: '700 g', prix: 3.25, composition: 'Farine d’épeautre blanche, sel marin, eau, levure, raisins secs' },
    { nom: 'Blé demi-gris et noix', poids: '400 g ou 800 g', prix: 2.95, prixMax: 4.95, composition: 'Farine de blé demi-grise, sel marin, eau, levure, cerneaux de noix', farine: 'ble-demi-gris' },
    { nom: 'Blé blanc', poids: '800 g', prix: 3.0, composition: 'Farine de blé blanche, sel marin, eau, levure', farine: 'ble-blanc' },
    { nom: 'Cramique', poids: '800 g', prix: 5.6, composition: 'Farine d’épeautre blanche, sel marin, beurre, eau, levure, raisins secs' },
    { nom: 'Blé demi-gris multigraines', poids: '400 g ou 800 g', prix: 2.3, prixMax: 3.75, composition: 'Farine de blé demi-grise, sel marin, eau, levure, graines (amandes, noisettes, tournesol, courge, sésame, lin, pavot)', farine: 'ble-demi-gris' },
    { nom: 'Épeautre et seigle complet', poids: '800 g', prix: 4.15, composition: 'Farine d’épeautre demi-grise (65 %), farine de seigle complète (35 %), sel marin, eau, levure', farine: 'epeautre-demi-gris' },
  ] },
  { id: 'viennoiserie', titre: 'Viennoiseries', intro: 'Farine d’épeautre blanche et beurre, pour presque toutes.', photo: 'chocolat', plats: [
    { nom: 'Pain au chocolat', prix: 1.35, composition: 'Farine d’épeautre blanche, beurre, chocolat, sucre, sel marin, eau, levure' },
    { nom: 'Gaufre', prix: 2.3, composition: 'Farine d’épeautre blanche, beurre, sucre, sel marin, eau, levure' },
    { nom: 'Baulus', prix: 1.5, composition: 'Farine d’épeautre blanche, beurre, lait, sucre, sel marin, eau, levure' },
    { nom: 'Boule au chocolat', prix: 1.3, composition: 'Farine d’épeautre blanche, beurre, sucre, chocolat, eau, sel marin, levure' },
    { nom: 'Gosette aux pommes', prix: 2.5, composition: 'Farine d’épeautre blanche, beurre, sucre, pomme, sel marin, eau' },
    { nom: 'Boule aux raisins', prix: 1.3, composition: 'Farine d’épeautre blanche, beurre, sucre, raisins, sel marin, eau, levure' },
  ] },
  { id: 'petite', titre: 'Petite boulangerie', intro: 'Le quotidien du comptoir.', photo: 'baguette', plats: [
    { nom: 'Baguette et tresse', prix: 1.9, composition: 'Farine d’épeautre blanche, eau, sel marin, levain ou levure ; les tresses portent des graines' },
    { nom: 'Pistolet', prix: 0.65, composition: 'Farine d’épeautre blanche, eau, sel marin, levure' },
    { nom: 'Ficelle', prix: 1.25, composition: 'Farine d’épeautre blanche, eau, sel marin, levure, graines' },
    { nom: 'Sandwich', prix: 0.65, composition: 'Farine d’épeautre blanche, beurre, sucre, sel marin, levure' },
    { nom: 'Mendiant', prix: 1.3, composition: 'Farine d’épeautre blanche, eau, sel marin, levure, fruits secs (amandes, raisins, noisettes)' },
    { nom: 'Faluche', poids: 'petite ou grande', prix: 0.8, prixMax: 1.6, composition: 'Farine d’épeautre blanche, eau, sel marin, levure' },
  ] },
  { id: 'sans-gluten', titre: 'Sans gluten', intro: 'Au levain ou à la levure, en deux recettes.', photo: null, plats: [
    { nom: 'Pain sans gluten', poids: '400 g ou 700 g', prix: 4.0, prixMax: 7.0, composition: 'Variante châtaigne (farine de châtaigne, riz complet, sarrasin complet, fécule de pomme de terre) ou quinoa (riz complet, quinoa, sarrasin complet, fécule de pomme de terre)' },
  ] },
];

export const histoire = [
  { annee: '1980', texte: 'Dirk Longin se forme comme boulanger-pâtissier, chocolatier et glacier.' },
  { annee: '1990', texte: 'Il est engagé à la boulangerie Monepi, à Loyers.' },
  { annee: '1992', texte: 'Il reprend l’atelier.' },
  { annee: '1996', texte: 'La meunerie à meules de granit est installée : la farine est moulue sur place.' },
  { annee: 'Début des années 2000', texte: 'Le four à bois breton est construit.' },
];

export const four = [
  { v: '75 cm', t: 'de hauteur sous la voûte, ovale : un « four à arômes »' },
  { v: '3 à 4 h', t: 'de chauffe avec des fagots séchés deux ans au plus' },
  { v: '4', t: 'farines, toutes moulues sur meules de granit' },
];

export const pointsDeVente = [
  'Biomanie, à Wanze',
  'Ferme de Graux, à Fernelmont',
  'Bio&Co, à Andenne',
  'L’épicerie d’Ernest, à Thon',
];

export const presse = { titre: 'Des pains cuits au feu de bois', media: 'L’Avenir', date: '28 mars 2016' };

export const prixTxt = (p: Plat) => {
  const f = (n: number) => n.toFixed(2).replace('.', ',');
  return p.prixMax ? `${f(p.prix)} à ${f(p.prixMax)}` : f(p.prix);
};
