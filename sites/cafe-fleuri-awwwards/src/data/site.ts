/* Contenu de Café Fleuri (variante awwwards « Le trop-plein »). Sources : data/restaurants/cafe-fleuri/ (dossier.md,
   donnees.json). HYPOTHESES, toutes signalées dans RAPPORT.md :
   - Statut : le dossier indique « probablement fermé (à confirmer) » ; la maquette est produite comme si le café était ouvert.
   - Horaires : contradictoires entre sources ; on retient 9 h à 14 h 30 tous les jours (Restaurant Guru) et `placeholder: true`.
   - Téléphone : +32 81 65 89 15 (Restaurant Guru, Wanderlog) ; restaurants.json donne +32 492 93 87 96 (à confirmer).
   - E-mail hello@cafefleuri.be : issu de restaurants.json, à confirmer (placeholder).
   - Aucun prix de plat connu : aucun prix affiché pour les plats. Seuls deux tarifs anciens (Petit Futé) sont montrés, marqués indicatifs.
   - Aucune photo du client (site bloqué) : le site n'emploie pas de photo, il est composé en typographie et en aplats. */

export type Plat = { nom: string; description?: string; prix?: number; placeholder?: boolean };

export const site = {
  nom: 'Café Fleuri',
  description: 'Café-brunch de Namur, rue des Fossés Fleuris : trois brunchs, salé, sucré ou mixte, gravlax, pancakes, granola, limonades et thé glacé maison.',
  typeCuisine: 'Café, brunch, pâtisserie maison',
  adresse: { rue: 'Rue des Fossés Fleuris', numero: '38', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.46254, lon: 4.86458 },
  telephone: '+3281658915',
  telephoneAffiche: '081 65 89 15',
  email: 'hello@cafefleuri.be',
  emailPlaceholder: true,
  reservationUrl: null as string | null,
  reseaux: [] as { nom: string; url: string }[],
  plan: 'https://www.openstreetmap.org/?mlat=50.46254&mlon=4.86458#map=18/50.46254/4.86458',
};

export const horaires = {
  jours: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
  schemaJours: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  ouverture: '09:00', fermeture: '14:30',
  de: '9 h', a: '14 h 30',
  placeholder: true,
  note: 'Horaires relevés chez un annuaire tiers.',
};

export const brunchs = [
  { id: 'sale', nom: 'Brunch salé', court: 'Salé', couleur: 'aneth',
    description: 'Avocado toast, œufs Benedict sur épinards avec gravlax de saumon maison ou bacon grillé, salade.' },
  { id: 'sucre', nom: 'Brunch sucré', court: 'Sucré', couleur: 'framboise',
    description: 'Deux pancakes au sirop d’érable, une tranche de pain perdu, granola maison.' },
  { id: 'mixte', nom: 'Brunch mixte', court: 'Mixte', couleur: 'mixte',
    description: 'Un peu de salé, un peu de sucré, dans la même assiette.' },
];

export const boissons: Plat[] = [
  { nom: 'Limonades maison', description: 'Dont la limonade à la framboise, citée par les clients.' },
  { nom: 'Thé glacé maison', description: 'À la pêche.' },
  { nom: 'Boissons chaudes' },
];

export const aussi: Plat[] = [
  { nom: 'Pancakes au saumon gravlax', description: 'Mascarpone, aneth et citron.' },
  { nom: 'Plateau charcuterie et fromage' },
];

export const tarifs = [
  { nom: 'Brunch', prix: 21.95 },
  { nom: 'Petit-déjeuner', prix: 11.95 },
].map((t) => ({ ...t, placeholder: true }));
export const tarifsNote = 'Tarifs relevés dans un guide, anciens.';

export const histoire = [
  { quand: '2020', texte: 'Le Café Fleuri ouvre au 38, rue des Fossés Fleuris, comme second lieu du Bistro Bisou, au 44 et 46 : les brunchs du Bisou étaient trop demandés.' },
  { quand: 'Peu après', texte: 'Le Covid ferme la porte presque aussitôt. Le café est réaménagé.' },
  { quand: 'Ensuite', texte: 'Il rouvre, petit lieu cocooning avec terrasse, et tourne autour du brunch.' },
];

export const maison = [
  { mot: 'Gravlax', texte: 'Le gravlax de saumon maison est servi avec les œufs Benedict ou en pancakes, au mascarpone et à l’aneth.' },
  { mot: 'Granola', texte: 'Fait maison, il accompagne le brunch sucré.' },
  { mot: 'Limonade', texte: 'Maison aussi, à la framboise, avec le thé glacé à la pêche.' },
  { mot: 'Pain perdu', texte: 'Une tranche, avec les deux pancakes et le sirop d’érable.' },
];

export const mardi = 'Le mardi, une boisson offerte aux étudiants avec un brunch.';
export const reputation = { note: '4,2', sur: '5', avis: 223, source: 'Google, source tierce' };
export const photos: { fichier: string; alt: string; credit: string }[] = [];
