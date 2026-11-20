// Contenu de Don Dino (variante awwwards). Source : data/restaurants/don-dino/ (donnees.json, dossier.md, photos/).
// HYPOTHÈSES (aussi dans RAPPORT.md) :
// - Aucun avis, note, distinction ni citation affichés : la note Google (4,3) a deux nombres d'avis contradictoires (1033 / 350), la presse n'a pas de titres.
// - E-mail inconnu : aucun mailto. Réservation = téléphone + formulaire de demande du site client.
// - Desserts, boissons et vins absents de la carte PDF : non affichés, rien d'inventé (aucun placeholder).
// - L'homme de la photo 09 n'est pas identifié : légende neutre, jamais présenté comme Dino ni comme l'équipe.
// - « 20 pizzas dès 9,30 € » (site) contre 26 pizzas de 10,50 à 17,80 € (carte PDF) : la carte PDF fait foi ici.
export const site = {
  nom: 'Don Dino',
  baseline: 'Brasserie, restaurant, pizzeria. Spécialités italiennes et bonne ambiance.',
  description: 'Brasserie-pizzeria à Naninne, sur les hauteurs de Namur : spécialités italiennes et cuisine française, ouvert 7 jours sur 7, midi et soir, patron en salle.',
  typeCuisine: ['Italienne', 'Pizzeria', 'Française'],
  adresse: { rue: 'Chaussée de Marche', numero: '826', cp: '5100', commune: 'Naninne (Namur)', localite: 'Namur', pays: 'BE' },
  geo: { lat: 50.424481, lon: 4.9315063 },
  telephone: '+32 81 74 15 60',
  telephoneHref: 'tel:+3281741560',
  telephoneLisible: '081 74 15 60',
  reservationUrl: 'https://dondino.be/fr/reservations',
  groupesUrl: 'https://dondino.be/fr/espace-evenementiel',
  siteClient: 'https://dondino.be',
  facebook: 'https://www.facebook.com/dondinonaninne/',
  planUrl: 'https://www.openstreetmap.org/?mlat=50.424481&mlon=4.9315063#map=17/50.424481/4.9315063',
  credit: 'Photos : Don Dino',
  patron: 'Placido Scalisi',
} as const;

export const reseaux = [{ nom: 'Facebook', url: site.facebook }] as const;

export interface Jour { nom: string; court: string; schema: string; midi: string; soir: string; soirFin: string }
const j = (nom: string, court: string, schema: string, soirFin = '22:30'): Jour => ({ nom, court, schema, midi: '12:00-14:30', soir: `18:00-${soirFin}`, soirFin });
export const jours: Jour[] = [
  j('Lundi', 'Lun', 'Monday'), j('Mardi', 'Mar', 'Tuesday'), j('Mercredi', 'Mer', 'Wednesday'), j('Jeudi', 'Jeu', 'Thursday'),
  j('Vendredi', 'Ven', 'Friday', '23:30'), j('Samedi', 'Sam', 'Saturday', '23:30'), j('Dimanche', 'Dim', 'Sunday'),
];
/** « 12:00-14:30 » -> « 12 h à 14 h 30 » (espaces insécables). */
export const lisible = (plage: string) => {
  const f = (h: string) => { const [a, m] = h.split(':'); return m === '00' ? `${+a} h` : `${+a} h ${m}`; };
  const [d, e] = plage.split('-');
  return `${f(d)} à ${f(e)}`;
};
export const accesPratique = [
  { titre: 'Parking', texte: 'Parking extérieur privé et parking à vélos.' },
  { titre: 'Accès', texte: 'Accessible aux personnes à mobilité réduite.' },
  { titre: 'Salle', texte: 'Brasserie spacieuse, bar, terrasse aux beaux jours, climatisation.' },
  { titre: 'Paiement', texte: 'Mastercard, Visa, carte de débit et espèces.' },
  { titre: 'Langues', texte: 'Français, anglais et néerlandais.' },
] as const;
