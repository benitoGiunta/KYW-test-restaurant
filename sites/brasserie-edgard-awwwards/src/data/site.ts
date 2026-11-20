// Contenu de la Brasserie Edgard (variante awwwards « Le cadran »). Source : data/restaurants/brasserie-edgard/ (donnees.json, dossier.md).
// Hypothèses (aucune question posée) :
//  - Horaires : tous les jours 10 h à 22 h 30 ; cuisine fermée de 15 h à 18 h sauf week-end et jours fériés (site du client, 20/11/2026).
//  - On dit que la salle reste ouverte pendant la pause de cuisine parce que les horaires d'ouverture courent de 10 h à 22 h 30 sans coupure.
//  - E-mail repris de restaurants.json avec réserve (le site précise que les réservations par e-mail ne sont pas enregistrées) : mailto proposé pour questions seulement.
//  - Histoire, année d'ouverture, fondateurs, avis, presse, parking, boissons : inconnus, rien d'inventé. Aucun champ placeholder dans ce fichier.
export const site = {
  nom: 'Brasserie Edgard',
  alias: 'Mr Edgard',
  baseline: 'Votre brasserie restaurant à Namur',
  description: 'Brasserie belge à Saint-Servais (Namur), ouverte tous les jours de 10 h à 22 h 30 : carpaccios, croquettes, moules de Zélande, brochettes et pâtes fraîches.',
  typeCuisine: 'Brasserie belge et française',
  adresse: { rue: 'Chaussée de Waterloo', numero: '473', cp: '5002', commune: 'Saint-Servais (Namur)', pays: 'BE' },
  geo: { lat: 50.472276, lon: 4.8331165 },
  telephoneLisible: '081 46 08 00',
  telephoneHref: 'tel:+3281460800',
  telephoneIntl: '+32 81 46 08 00',
  email: 'info@brasserieedgard.be',
  reservationUrl: 'https://brasserieedgard.reservation.barestho.com/',
  siteClient: 'https://www.brasserieedgard.be',
  planUrl: 'https://www.google.com/maps/search/?api=1&query=50.472276,4.8331165',
  reseaux: [{ nom: 'Facebook', url: 'https://www.facebook.com/brasserieedgardnamur/' }],
  // Cadran : heures décimales. La cuisine ferme de 15 h à 18 h en semaine seulement.
  ouverture: 10,
  fermeture: 22.5,
  pause: { debut: 15, fin: 18 },
  lunch: { platDuJour: 14.5, platDessert: 21.5 },
  groupes: { min: 10, max: 16, formules: [{ nom: 'Entrée, plat, dessert', prix: 49 }, { nom: 'Entrée et plat', prix: 39 }, { nom: 'Plat et dessert', prix: 34 }] },
  emporterSupplement: 0.6,
} as const;

export const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'] as const;

/** Horaires structurés (JSON-LD) : même plage tous les jours. */
export const ouvertureJsonLd = [{ dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '10:00', closes: '22:30' }];

export const histoire = [
  'La brasserie occupe un bâtiment bas de la chaussée de Waterloo, à Saint-Servais. Son enseigne, Mr Edgard, s’allume la nuit sur la façade.',
  'À l’intérieur, le cadre est contemporain : un bois sculpté en sillons court sur les murs et le comptoir, des banquettes en cuir caramel, de grandes baies cintrées. Côté rue, une terrasse couverte accueille la belle saison.',
  'La carte reste celle d’une grande brasserie : carpaccios, croquettes maison, moules de Zélande en saison, pâtes fraîches. Le cassolet des suggestions est celui de « notre chef Titi », nommé ainsi sur la carte.',
  'L’année d’ouverture et l’histoire de la maison ne nous ont pas été transmises : nous préférons les laisser vides plutôt que les inventer.',
];
