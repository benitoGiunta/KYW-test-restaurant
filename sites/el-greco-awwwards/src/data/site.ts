// Contenu d'El Greco (Bouge, Namur). Source : data/restaurants/el-greco/ (donnees.json, dossier.md, photos/).
// HYPOTHÈSES (aussi dans RAPPORT.md) :
// - Horaires : jeudi à dimanche d'après Trouve Ton Resto (à confirmer) ; lundi à mercredi inconnus, jamais inventés.
// - Photos : aucune photo du restaurant ni des plats ; trois photos de stock Pexels de Grèce, marquées « illustration ».
// - Équipe, chef, fondateurs : inconnus, aucune section équipe. Avis : seuls les chiffres Tripadvisor du dossier.
// - Réservation : téléphone, e-mail et page contact du site actuel (cible non vérifiée) ; aucun formulaire.
export const site = {
  nom: 'El Greco',
  typeCuisine: 'Cuisine grecque',
  description: 'Restaurant grec à Bouge, aux portes de Namur : mezze, crèmes grecques, giouvetsi, poulpe grillé et grillades. Depuis 1986, selon le site du restaurant.',
  depuis: 1986,
  adresse: { rue: 'Rue de Sardanson', numero: '22', cp: '5004', commune: 'Bouge (Namur)', pays: 'BE' },
  geo: { lat: 50.4749656, lon: 4.8775723 },
  telephone: '+32 81 20 07 47',
  telephoneHref: 'tel:+3281200747',
  telephoneLisible: '081 20 07 47',
  email: 'contact@elgrecorestaurant.com',
  reservationUrl: 'https://elgrecorestaurant.com/contact/',
  siteActuel: 'https://elgrecorestaurant.com',
  planUrl: 'https://www.openstreetmap.org/?mlat=50.4749656&mlon=4.8775723#map=17/50.4749656/4.8775723',
  facebook: 'https://www.facebook.com/elgrecobouge/',
  instagram: 'https://www.instagram.com/elgreconamur/',
  paiements: 'Espèces, cartes, Bancontact',
  tripadvisor: { note: '4,0', avis: 121 },
  credit: 'Photos d’illustration : Cécile Hournau, Marios Potsis et Pixabay (Pexels), pas le restaurant',
};

/** Horaires connus (Trouve Ton Resto, à confirmer) ; `null` = inconnu, affiché « à confirmer par téléphone ». */
export const horaires: { jour: string; creneaux: string[] | null; placeholder?: boolean }[] = [
  { jour: 'Lundi', creneaux: null },
  { jour: 'Mardi', creneaux: null },
  { jour: 'Mercredi', creneaux: null },
  { jour: 'Jeudi', creneaux: ['18 h à 22 h'] },
  { jour: 'Vendredi', creneaux: ['12 h à 15 h', '18 h à 22 h'] },
  { jour: 'Samedi', creneaux: ['12 h à 15 h', '18 h à 22 h'] },
  { jour: 'Dimanche', creneaux: ['18 h à 23 h'] },
];
export const horairesSchema = [
  { jours: ['Thursday'], opens: '18:00', closes: '22:00' },
  { jours: ['Friday', 'Saturday'], opens: '12:00', closes: '15:00' },
  { jours: ['Friday', 'Saturday'], opens: '18:00', closes: '22:00' },
  { jours: ['Sunday'], opens: '18:00', closes: '23:00' },
];

export const equipe: never[] = []; // inconnue : aucune section équipe

/** Plats mis en avant sur l'accueil (tous réels, voir carte.ts). */
export const phares = [
  { nom: 'Assiette El Greco', detail: 'Mini rumsteak d’Angus, côte d’agneau et brochette de poulet', prix: 28.9 },
  { nom: 'Giouvetsi', detail: 'Agneau mijoté plusieurs heures, pâtes grecques et feta', prix: 25.9 },
  { nom: 'Poulpe grillé', detail: 'Citron frais, huile d’olive de Crète et purée de fèves de Santorin', prix: 18.9 },
  { nom: 'Pastitsio', detail: 'Pâtes grecques, bœuf haché mijoté et béchamel gratinée', prix: 19.9 },
  { nom: 'Spanakopita', detail: 'Feuilleté croustillant aux épinards et feta', prix: 13.9 },
  { nom: 'Gyros', detail: 'Poulet mariné aux herbes méditerranéennes, pita chaude et tzatziki', prix: 21.9 },
];

export const cremes = [
  { nom: 'Tzatziki', detail: 'Yaourt grec, concombre frais, ail et aneth' },
  { nom: 'Tarama', detail: 'Crème aux œufs de poisson et huile d’olive' },
  { nom: 'Tirokafteri', detail: 'Feta grecque AOP, poivrons rouges grillés et huile d’olive de Crète' },
];

/** Photos d'illustration (Pexels) : placeholder true, jamais présentées comme le restaurant. */
export const photosInfo = {
  clocher: { alt: 'Clocher blanc à toit bleu des Cyclades se détachant sur le ciel. Photo d’illustration, pas le restaurant.', placeholder: true },
  terrasses: { alt: 'Maisons blanches en terrasses à Santorin, ruelle bordée de murs chaulés. Photo d’illustration, pas le restaurant.', placeholder: true },
  coupole: { alt: 'Église blanche à coupole bleue sous un ciel clair en Grèce. Photo d’illustration, pas le restaurant.', placeholder: true },
};
