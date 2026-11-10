// Contenu de Makimono. Source : data/restaurants/makimono/{donnees.json,dossier.md,photos/}.
// Hypothèses (voir RAPPORT.md) :
//  - téléphone : +32 483 03 88 47 (site du client) ; restaurants.json donne +32 495 90 82 74, non repris, à confirmer.
//  - aucune histoire, aucun nom d'équipe, aucun avis cité : inconnus, donc absents (aucun placeholder inventé).
//  - pas d'outil de réservation connu : tel:, mailto: et liens de commande du client.
import carte from './carte.json';

export const restaurant = {
  nom: 'Makimono',
  baseline: 'Creative uramaki made with love',
  typeCuisine: 'Sushi, uramaki créatifs, poké bowls',
  description: 'Rolls créatifs, poké bowls et nigiri flambés au chalumeau, à déguster sur place ou à emporter, Rue Saint-Loup à Namur.',
  adresse: { rue: 'Rue Saint-Loup', numero: '14', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.4643256, lon: 4.8635198 },
  telephone: '+32483038847',
  telephoneAffiche: '0483 03 88 47',
  email: 'contact.makimono@gmail.com',
  plan: 'https://www.openstreetmap.org/?mlat=50.4643256&mlon=4.8635198#map=18/50.4643256/4.8635198',
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/MakimonoNamur/' },
    { nom: 'Instagram', url: 'https://www.instagram.com/makimono_namur/' },
  ],
  commande: [
    { nom: 'Commander en ligne', url: 'https://makimono.be/online_order/fr/order/' },
    { nom: 'Retrait (Deliverect)', url: 'https://pickup.deliverect.com/makimono/' },
    { nom: 'Ordering Club', url: 'https://makimono.orderingclub.com/fr/makimononamur0' },
  ],
  paiement: 'Visa, Mastercard, carte de débit',
  livraison: 'Livraison dans un rayon de 30 km, traiteur pour vos événements.',
} as const;

export const jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] as const;
export const joursSchema = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export const midi = { debut: '12:00', fin: '14:30' };
export const soir = { debut: '18:00', fin: '22:00' };
/** Horaires par jour : tableau de services {debut, fin}. Le dimanche midi est fermé. */
export const horaires = jours.map((j) => ({ jour: j, services: j === 'dimanche' ? [soir] : [midi, soir] }));
/** Regroupement pour le schema.org. */
export const servicesSchema = [
  { jours: joursSchema.slice(0, 6), ...midi },
  { jours: [...joursSchema], ...soir },
];
export const hm = (t: string) => { const [h, m] = t.split(':'); return m === '00' ? `${+h}\u00a0h` : `${+h}\u00a0h\u00a0${m}`; };

export const nbsp = ' ';
export const eur = (n: number) => `${n.toFixed(2).replace('.', ',').replace(',00', '')}${nbsp}€`;
/** « 8.40 € » ou « Saumon 3.00 » du JSON → virgule et insécable. */
export const fr = (s: string) => s.replace(/(\d+)\.(\d+)(?:\s*€)?/g, (_m, a, b) => `${a},${b}${nbsp}€`).replace(/,00/g, '');

export { carte };
export const rollsAuChoix = carte.rolls.filter((r) => r.proteines).length;
export const proteines = ['Saumon', 'Saumon Snacké', 'Thon', 'Thon Snacké', 'Tempura de Scampis', 'Poulet Katsu', 'Yam Tempura', 'Tofu Frit'];

export const boxes = [
  { nom: 'Fast Box', prix: 16, detail: '16 pièces : Poulet Katsu Mangue, California Saumon, Tempura de Scampis Avocat et Crispy Saumon, quatre pièces de chacun.' },
  { nom: 'Creative Box', prix: 18, detail: '16 pièces : le chef imagine des rolls créatifs avec les ingrédients de Create.Your.Roll. Allergies ou box 100 % végétarienne : à signaler au chef.' },
] as const;

export const valeurs = [
  'Fait avec amour, « made with love ».',
  'Les options végétariennes sont signalées sur la carte (Yam Tempura, Tofu Frit).',
  'Les recommandations du chef sont signalées sur la carte.',
];
