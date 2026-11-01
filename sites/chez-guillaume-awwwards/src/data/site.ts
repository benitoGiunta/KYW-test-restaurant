// Contenu de Chez Guillaume (variante awwwards « La conduite »).
// Source : data/restaurants/chez-guillaume/{donnees.json,dossier.md} (relevé du 01/11/2026, carte d'octobre 2026).
// Hypothèses (aucune question posée, décisions notées dans DESIGN.md et ETAT.md) :
// - Adresse retenue : celle du site (Rue Lelièvre 4, en face de la place Saint-Aubain), pas celle de la BCE (Jambes).
// - Horaires : ceux de la FAQ 2026 (lun-sam 18 h à minuit, dim 10 h à 18 h), incohérents avec les spectacles :
//   affichés tels quels avec la mention « à confirmer » ; le service du soir (18 h 30 à 20 h 30, mer-sam) fait foi.
// - Heure du spectacle du soir : non publiée au dossier, on écrit « après le repas », jamais une heure inventée.
// - Cheffe : Tamara Truyts à l'ouverture (ELLE.be, janvier 2025), non confirmée en 2026 : citée au passé.
// - Aucun avis, note, nombre de couverts ni abonné : rien n'est affiché.
// - Les trois menus changent chaque mois : relevé d'octobre 2026, dit comme tel.

export const site = {
  nom: 'Chez Guillaume',
  baseline: 'Restaurant & comedy club',
  description:
    'Chez Guillaume, restaurant et comedy club en face de la place Saint-Aubain à Namur : repas de 18 h 30 à 20 h 30 avant le spectacle, brunch stand-up le dimanche.',
  typeCuisine: ['Brasserie', 'Repas-spectacle', 'Brunch'],
  adresse: { rue: 'Rue Lelièvre', numero: '4', cp: '5000', commune: 'Namur', pays: 'BE', repere: 'en face de la place Saint-Aubain' },
  telephone: '+32 81 26 25 65',
  telephoneLisible: '081 26 25 65',
  telephoneHref: 'tel:+3281262565',
  email: 'hello@chezguillaume.be',
  emailJour: 'restaurant@chezguillaume.be',
  reservationUrl: 'https://chezguillaume.be/#agenda',
  siteActuel: 'https://chezguillaume.be',
  carteUrl: 'https://www.google.com/maps/search/?api=1&query=Rue+Leli%C3%A8vre+4%2C+5000+Namur',
  reseaux: [
    { nom: 'Instagram', url: 'https://www.instagram.com/chez.guillaume/' },
    { nom: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61558313910793' },
  ],
  fondateur: 'Guillaume Wattecamps',
  alias: 'GuiHome',
  societe: 'Comme des gosses Company',
} as const;

/** La conduite d'une soirée : les tops réels, en heures. Chaque section du site porte le sien. */
export const tops = {
  salle: { heure: '18:30', lisible: '18 h 30', libelle: 'Entrée en salle' },
  service: { heure: '18:30', fin: '20:30', lisible: '18 h 30 à 20 h 30', libelle: 'Service' },
  rideau: { heure: '20:30', lisible: 'après le repas', libelle: 'Rideau' },
  brunch: { heure: '11:30', fin: '14:00', lisible: '11 h 30 à 14 h', libelle: 'Brunch du dimanche' },
  matinee: { heure: '15:00', lisible: '15 h', libelle: 'Spectacle du dimanche' },
} as const;

/** Horaires de la FAQ du site (2026). Jours au format schema.org pour le JSON-LD. */
export const horaires = [
  { jour: 'Lundi', en: 'Monday', ouverture: '18:00', fermeture: '00:00', lisible: '18 h à minuit', note: 'Lundi « face à la crise »' },
  { jour: 'Mardi', en: 'Tuesday', ouverture: '18:00', fermeture: '00:00', lisible: '18 h à minuit', note: '' },
  { jour: 'Mercredi', en: 'Wednesday', ouverture: '18:00', fermeture: '00:00', lisible: '18 h à minuit', note: 'Repas-spectacle' },
  { jour: 'Jeudi', en: 'Thursday', ouverture: '18:00', fermeture: '00:00', lisible: '18 h à minuit', note: 'Repas-spectacle' },
  { jour: 'Vendredi', en: 'Friday', ouverture: '18:00', fermeture: '00:00', lisible: '18 h à minuit', note: 'Repas-spectacle' },
  { jour: 'Samedi', en: 'Saturday', ouverture: '18:00', fermeture: '00:00', lisible: '18 h à minuit', note: 'Repas-spectacle' },
  { jour: 'Dimanche', en: 'Sunday', ouverture: '10:00', fermeture: '18:00', lisible: '10 h à 18 h', note: 'Brunch et spectacle' },
] as const;

export interface Plat { service: 'Entrée' | 'Plat' | 'Dessert'; description: string; placeholder?: boolean }
export interface Menu { id: string; nom: string; court: string; prix2: number; prix3: number; plats: Plat[] }

/** Les trois menus du mois (relevé d'octobre 2026). Prix réels, par menu ; aucun prix par plat. */
export const menus: Menu[] = [
  {
    id: 'bonne-maman', nom: 'Menu Bonne Maman', court: 'Bonne Maman', prix2: 29, prix3: 39,
    plats: [
      { service: 'Entrée', description: 'Tête pressée, salade de chicons' },
      { service: 'Plat', description: 'Boulettes liégeoises avec frites et salade' },
      { service: 'Dessert', description: 'Poire Belle-Hélène' },
    ],
  },
  {
    id: 'cheffe', nom: 'Menu de la Cheffe', court: 'La Cheffe', prix2: 39, prix3: 49,
    plats: [
      { service: 'Entrée', description: 'Rouget snacké, mousseline de saumon, travail autour de la betterave rouge' },
      { service: 'Plat', description: 'Filet d’agneau, céleri-rave, pomme de terre fondante, poire confite au cidre, ail noir' },
      { service: 'Dessert', description: 'Riz au lait, compotée de coing, prune en pickles' },
    ],
  },
  {
    id: 'vegetarien', nom: 'Menu végétarien', court: 'Végétarien', prix2: 29, prix3: 39,
    plats: [
      { service: 'Entrée', description: 'Halloumi snacké, quenelle de tofu aux épinards, travail autour de la betterave rouge' },
      { service: 'Plat', description: 'Gnocchi de patate douce, céleri-rave, pomme de terre fondante, poire confite au cidre, ail noir' },
      { service: 'Dessert', description: 'Riz au lait, compotée de coing, prune en pickles' },
    ],
  },
];

export const brunch = {
  prix: 35,
  prixEnfant: 15,
  spectacle: 20,
  buffet: [
    'Eau, jus d’orange et thé glacé à volonté',
    'Œufs brouillés et bacon',
    'Légumes chauds et salades',
    'Pains, fromages et charcuteries',
    'Potage du jour',
    'Pancakes et viennoiseries',
    'Yaourt, granola et fruits',
    'Desserts',
  ],
};

export const lundi = { nom: 'Lundi « face à la crise »', contenu: 'Croque-monsieur et boisson', prix: 12 };

export const bar = [
  'Cocktails maison',
  'Mocktails signatures',
  'Un vin rouge et un vin blanc bio',
];

/** Repères de l'histoire, tous sourcés (dossier.md, donnees.json). */
export const histoire = [
  { date: 'Janvier 2025', texte: 'Semaine d’ouverture les 9, 10 et 11 janvier, première soirée stand-up.', source: 'L’Avenir, 10/01/2025' },
  { date: 'Été 2025', texte: 'Complet sur complet jusqu’au 30 juin, salle remplie à environ 80 % l’été.', source: 'L’Avenir, 11/09/2025' },
  { date: 'Octobre 2026', texte: 'Trois menus par mois, brunch stand-up le dimanche, lundis « face à la crise ».', source: 'chezguillaume.be' },
];

export const equipe = [
  { nom: 'Guillaume Wattecamps', role: 'Fondateur et humoriste namurois, sur scène sous le nom de GuiHome', source: 'L’Avenir, 11/09/2025' },
  { nom: 'Tamara Truyts', role: 'Cheffe à l’ouverture, ancienne sous-cheffe de Julien Malaisse (à confirmer pour 2026)', source: 'ELLE.be, janvier 2025' },
];

export const presse = [
  { media: 'L’Avenir', date: '10/01/2025', titre: 'Le comedy club « Chez Guillaume » à Namur a inauguré sa première soirée stand up', url: 'https://www.lavenir.net/regions/namur/2025/01/10/le-comedy-club-chez-guillaume-a-namur-a-inaugure-sa-premiere-soiree-stand-up-7NV6TPIN7ZE7FNC6EXOLDPONFY/' },
  { media: 'La DH', date: '09/01/2025', titre: 'La DH était à l’ouverture du restaurant-comedy club de GuiHome', url: 'https://www.dhnet.be/medias/divers/2025/01/09/la-dh-etait-a-louverture-du-restaurant-comedy-club-de-guihome-on-a-mis-des-baffles-meme-aux-chiottes-histoire-de-ne-rien-louper-des-blagues-PKSWVUPYS5BSJHL6Y2HXDI4UKI/' },
  { media: 'ELLE.be', date: '01/2025', titre: 'Chez Guillaume : le nouveau Comedy Club', url: 'https://www.elle.be/fr/441761-chez-guillaume-le-nouveau-comedy-club-en-plein-centre-de-namur.html' },
  { media: 'L’Avenir', date: '11/09/2025', titre: 'Le rire au menu et le succès en dessert huit mois après l’ouverture', url: 'https://www.lavenir.net/regions/namur/2025/09/11/le-rire-au-menu-et-le-succes-en-dessert-huit-mois-apres-louverture-de-chez-guillaume-a-namur-on-veut-ouvrir-les-portes-a-toute-la-francophonie-O5MKQJTWSJDJFNBBFSTUZHX3WM/' },
];

export const prix = (n: number) => `${n} €`;
