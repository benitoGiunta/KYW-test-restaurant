// Données des Potes au Feu, reprises de data/restaurants/les-potes-au-feu/{dossier.md, donnees.json}
// et du site d'origine (lespotesaufeu.be, HTML relu le 31/10/2026). Rien n'est inventé ici.

export const resto = {
  nom: 'Les Potes au Feu',
  baseline: 'Bistronomie',
  adresse: { rue: 'Avenue de la Plante 4', ville: '5000 Namur' },
  telAffiche: '+32 (0)81 64 04 44',
  telHref: 'tel:+3281640444',
  zenchef: 'https://bookings.zenchef.com/results?rid=379477',
  bonCadeau: 'https://www.lespotesaufeu.be/page/bon-cadeau-en-ligne.html',
  facebook: 'https://www.facebook.com/lespotesaufeu.bistronomie/',
  video: 'https://www.youtube.com/watch?v=dZtMOajOefE',
  plan: 'https://www.openstreetmap.org/?mlat=50.4586737&mlon=4.8643452#map=17/50.4586737/4.8643452',
  societe: 'DAMFRA SRL',
  tva: 'BE 0741.540.749',
};

// Horaires (page contact du site d'origine, identiques Michelin, Rankeat, Le Fooding).
// `jour` suit Date.getDay() (0 = dimanche) pour marquer le jour courant.
export const horaires = [
  { nom: 'Lundi', jour: 1, services: ['19:00 à 21:00'] },
  { nom: 'Mardi', jour: 2, services: ['19:00 à 21:00'] },
  { nom: 'Mercredi', jour: 3, services: ['12:00 à 14:00', '19:00 à 21:00'] },
  { nom: 'Jeudi', jour: 4, services: ['19:00 à 21:00'] },
  { nom: 'Vendredi', jour: 5, services: ['12:00 à 14:00', '19:00 à 21:00'] },
  { nom: 'Samedi', jour: 6, services: [], note: 'privatisation possible' },
  { nom: 'Dimanche', jour: 0, services: [] },
];

export const menuSoir = {
  titre: 'Menu dégustation, 4 services',
  prix: '67 €',
  quand: 'Du lundi au vendredi soir',
  // `services` = le nombre annoncé (4) ; mises en bouche et mignardise accompagnent le menu sans compter
  // comme services (`horsService`) : elles ne sont pas numérotées (REVUE-1, C1).
  services: 4,
  plats: [
    { nom: 'Mises en bouche', horsService: true },
    { nom: 'Légumes racines / Champignons / Noix' },
    { nom: 'Saint-Jacques / Butternut / Passion' },
    { nom: 'Bœuf confit / Carottes / Cromesquis de pdt' },
    { nom: 'Soufflé au caramel / Chaï / Poire' },
    { nom: 'Mignardise', horsService: true },
  ] as { nom: string; horsService?: boolean }[],
  supplements: [
    { nom: 'Fromage à la place du dessert', prix: '+7 €' },
    { nom: 'Fromage avant le dessert', prix: '+15 €' },
  ],
};

export const menuMidi = {
  quand: 'Le mercredi et le vendredi midi',
  formules: [
    {
      titre: 'Formule 3 services',
      prix: '52 €',
      texte: 'Une formule 3 services à choix multiples, inspirée de nos produits du moment.',
    },
    {
      titre: 'Lunch, entrée-plat ou plat-dessert',
      prix: '40 €',
      texte: 'Proposé en fonction de nos envies et servi à l’ensemble de la table. Appelez-nous pour en connaître la composition.',
    },
  ],
};

export const nav = [
  { href: '', label: 'Accueil' },
  { href: 'les-potes-au-feu/', label: 'Les potes au feu' },
  { href: 'le-menu-des-potes/', label: 'Le menu des potes' },
  { href: 'contactez-nous/', label: 'Contact' },
];
