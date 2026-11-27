// Données de Oh la Vache ! (Erpent, Namur). Sources : data/restaurants/oh-la-vache/donnees.json et dossier.md (27/11/2026).
// HYPOTHESES (aucune question posée) :
//  - Horaires : ceux de donnees.json (lundi à jeudi 11 h à 22 h 30, vendredi à dimanche 11 h à 23 h 45) ; le dossier signale que le
//    vendredi et un éventuel mardi de fermeture sont à confirmer. Affichés comme « selon le site du restaurant ».
//  - Réservation : téléphone uniquement (aucun outil en ligne, aucune adresse e-mail publique du restaurant : celle du site est celle de la société).
//  - Histoire, équipe, avis, événements : inconnus. Rien d'inventé ; le seul texte de complément est marqué `placeholder: true`.
//  - Les « heures » de la carte (11 h, 19 h, 21 h, 23 h 45) regroupent les rubriques ; c'est un classement éditorial, pas un horaire de service.
import carte from './carte.json';

export const site = {
  nom: 'Oh la Vache !',
  baseline: 'Resto grill, cuisine française et italienne, fondues, pierrades, raclettes',
  description: 'Resto grill à Erpent, Namur : cuisine française et italienne, fondues, pierrades, raclettes, burgers Angus. Ouvert 7 jours sur 7, dès 11 h.',
  typeCuisine: ['Cuisine française', 'Cuisine italienne', 'Grill', 'Fondues et pierrades'],
  adresse: { rue: 'Chaussée de Marche', numero: '581', cp: '5101', commune: 'Erpent (Namur)', communeSchema: 'Namur', pays: 'BE' },
  geo: { lat: 50.4410675, lon: 4.9068745 },
  telephone: '+32494294472',
  telephoneHref: 'tel:+32494294472',
  telephoneLisible: '0494 29 44 72',
  planUrl: 'https://www.openstreetmap.org/?mlat=50.4410675&mlon=4.9068745#map=18/50.4410675/4.9068745',
  facebook: 'https://www.facebook.com/restoohlavache/',
  instagram: 'https://www.instagram.com/resto_oh_la_vache/',
  siteClient: 'https://ohlavache-erpent.be',
  credit: 'Photos : Oh la Vache !',
};
export const reservationUrl = site.telephoneHref; // pas d'outil en ligne : le téléphone est la réservation
export const reseaux = [
  { nom: 'Facebook', url: site.facebook },
  { nom: 'Instagram', url: site.instagram },
];

export const jours = [
  { nom: 'Lundi', fin: '22 h 30', schema: 'Monday' }, { nom: 'Mardi', fin: '22 h 30', schema: 'Tuesday' },
  { nom: 'Mercredi', fin: '22 h 30', schema: 'Wednesday' }, { nom: 'Jeudi', fin: '22 h 30', schema: 'Thursday' },
  { nom: 'Vendredi', fin: '23 h 45', schema: 'Friday' }, { nom: 'Samedi', fin: '23 h 45', schema: 'Saturday' },
  { nom: 'Dimanche', fin: '23 h 45', schema: 'Sunday' },
].map((j) => ({ ...j, debut: '11 h', ouvre: '11:00', ferme: j.fin === '22 h 30' ? '22:30' : '23:45' }));

/** Prix : « 25.90/pers. » → « 25,90 € / pers. » ; « 3.70 / 4.70 » → « 3,70 / 4,70 € » ; « Prix du jour » inchangé. */
export function prix(p: string | number | null): string {
  if (p === null || p === undefined) return '';
  const s = String(p);
  if (!/\d/.test(s)) return s;
  const fmt = (x: string) => x.replace('.', ',');
  const pers = /\/pers\./.test(s);
  const nums = s.replace('/pers.', '').trim().split(/\s*\/\s*/).map(fmt);
  return nums.join(' / ') + ' €' + (pers ? ' / pers.' : '');
}
/** Texte sans tiret cadratin ni demi-cadratin. */
export const nettoyer = (t: string) => t.replace(/[–—]/g, ',').replace(/\s+;\s+/g, ' ; ');

type Rubrique = { categorie: string; plats: { nom: string; prix: string | null; description: string | null }[] };
const parNom = (n: string) => (carte as Rubrique[]).find((r) => r.categorie.startsWith(n))!;

/** Les quatre « heures » de la carte : classement éditorial des 22 rubriques du restaurant (carte d'octobre 2024). */
export const heures = [
  { id: 'onze', heure: '11 h', titre: 'Pour commencer', mot: 'Midi', theme: 'jour',
    note: 'Entrées, salades, pâtes, burgers et plats pour les enfants.',
    rubriques: ['Entrées froides', 'Entrées chaudes', 'Petite restauration', 'Nos salades', 'Nos pâtes', 'Burgers', 'Plats enfants'] },
  { id: 'dixneuf', heure: '19 h', titre: 'Au grill', mot: 'Soir', theme: 'nuit',
    note: 'Viandes, bœuf, escalopes, poissons et, dès deux couverts, fondues, pierrades et raclette.',
    rubriques: ['Spécialités fondues', 'Bœuf', 'Nos viandes', 'Nos escalopes', 'Nos plats', 'Poissons'] },
  { id: 'vingtetun', heure: '21 h', titre: 'Vachement bon !', mot: 'Dessert', theme: 'jour',
    note: 'Glaces, gaufres, crêpes, fondants et cafés.',
    rubriques: ['Glaces', 'Nos desserts', 'Cafés'] },
  { id: 'minuit', heure: '23 h 45', titre: 'Le dernier verre', mot: 'Nuit', theme: 'nuit',
    note: 'Apéritifs, bières, cocktails et treize gin’to.',
    rubriques: ['Apéritifs', 'Bières', 'Limonades', 'Cocktails', 'Gin\'To', 'Gins et mocktails'] },
].map((h) => ({ ...h, sections: h.rubriques.map(parNom).map((r) => ({
  titre: nettoyer(r.categorie.replace(/\s*\(.*\)$/, '').replace('Spécialités fondues, pierrades de bœuf et raclette', 'Fondues, pierrades et raclette').replace('Nos desserts Vachement bon !', 'Desserts').replace('Gin\'To', 'Gin’to')),
  precision: /Gin'To/.test(r.categorie) ? 'Tous accompagnés d’un tonic sélectionné' : /enfants/.test(r.categorie) ? 'Avec une boule de glace' : /Spécialités fondues/.test(r.categorie) ? 'Dès deux couverts' : '',
  plats: r.plats.map((p) => ({ nom: nettoyer(p.nom), prix: prix(p.prix), description: p.description ? nettoyer(p.description) : '' })),
})) }));

export const menus = [
  { nom: 'Menu 3 services', prix: prix('43.50'), detail: 'Apéritif (kir, cava ou verre de moelleux), entrée, plat, dessert.' },
  { nom: 'Formule', prix: prix('58.00'), detail: 'Le menu 3 services avec apéritif, café et un quart de litre de vin.' },
  { nom: 'Raclette, fondue savoyarde ou bourguignonne', prix: prix('45.00/pers.'), detail: 'À partir de deux personnes ; apéritif, entrée et plat au choix.' },
];

/** Chiffres de la carte (octobre 2024) : tous issus de donnees.json. */
export const chiffres = [
  { valeur: '13', unite: 'gin’to', texte: 'dont plusieurs gins namurois et belges' },
  { valeur: '88', unite: '€', texte: 'le Tomahawk, environ 1,3 kg, pour deux' },
  { valeur: '2', unite: 'couverts', texte: 'au minimum pour fondues, pierrades et raclette' },
  { valeur: '7/7', unite: 'jours', texte: 'd’ouverture, selon le site du restaurant' },
];

export const histoire = [
  { texte: 'Oh la Vache ! est un restaurant grill de la Chaussée de Marche, à Erpent. L’enseigne noire aux taches blanches se repère de la route.', placeholder: false },
  { texte: 'La cuisine est française et italienne : viandes grillées, escalopes gratinées, pâtes, burgers de bœuf Angus, et les fondues, pierrades et raclettes qui se commandent à deux.', placeholder: false },
  { texte: 'On s’installe sur la terrasse, canapés et parasols, ou sous la tente et son lustre. Le restaurant annonce ouvrir tous les jours.', placeholder: false },
  { texte: 'Texte de présentation, date d’ouverture et mot des patrons : à fournir par le restaurateur.', placeholder: true },
];
export const acces = [
  'Chaussée de Marche 581, à Erpent, sur la route de Marche.',
  'Aucun bus ni train à proximité, d’après le site du restaurant : venez en voiture.',
  'Paiement : un seul paiement par table. Doggy bag : supplément de 0,90 €.',
  'Terrasse avec canapés et parasols, salle sous tente.',
];
