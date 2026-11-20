// Contenu de Café Fleuri. Source : data/restaurants/cafe-fleuri/ (donnees.json, dossier.md). Site d'origine inaccessible (403).
// Tout ce qui n'est pas prouvé par le dossier porte `placeholder: true` (affiché « illustratif ») ou est null (rien n'est rendu).
export const resto = {
  nom: 'Café Fleuri',
  adresse: { rue: 'Rue des Fossés Fleuris', numero: '38', cp: '5000', commune: 'Namur' },
  geo: { lat: 50.46254, lon: 4.86458 },
  // Deux numéros dans les sources (Restaurant Guru, Wanderlog : +32 81 65 89 15 ; restaurants.json : +32 492 93 87 96) : le premier retenu, à confirmer.
  tel: { href: '+3281658915', affiche: '081 65 89 15', placeholder: true },
  email: null as string | null, // hello@cafefleuri.be non confirmé : rien n'est affiché
  reseaux: [] as { nom: string; url: string }[],
  carte: 'https://www.openstreetmap.org/?mlat=50.46254&mlon=4.86458#map=18/50.46254/4.86458',
};
// Horaires contradictoires dans les sources (9 h à 14 h 30, 9 h à 16 h, 10 h 30 à 14 h 30) : 9 h à 16 h tous les jours retenu, illustratif.
export const horaires = { jours: 'Tous les jours', plage: '9 h 00 à 16 h 00', placeholder: true };
export const brunchs = [
  { nom: 'Brunch salé', texte: 'Avocado toast, œufs Benedict sur épinards avec gravlax de saumon maison ou bacon grillé, salade.' },
  { nom: 'Brunch sucré', texte: 'Deux pancakes au sirop d’érable, une tranche de pain perdu, granola maison.' },
  { nom: 'Brunch mixte', texte: 'Un mélange du salé et du sucré.' },
];
// Prix du Petit Futé (ancien, à confirmer) : illustratifs.
export const formules = [
  { nom: 'Brunch', prix: '21,95 €', placeholder: true },
  { nom: 'Petit-déjeuner', prix: '11,95 €', placeholder: true },
];
export const aussi = [
  { nom: 'Pancakes au saumon gravlax', texte: 'Mascarpone, aneth et citron.' },
  { nom: 'Plateau charcuterie et fromage', texte: null as string | null },
];
export const boissons = [
  { nom: 'Limonades maison', texte: 'Dont la limonade framboise, citée par les clients.' },
  { nom: 'Thé glacé maison', texte: 'À la pêche.' },
  { nom: 'Boissons chaudes', texte: null as string | null },
];
export const mardi = 'Le mardi, une boisson offerte aux étudiants avec un brunch.';
export const histoire = 'Ouvert en 2020, rue des Fossés Fleuris, à deux pas du Bistro Bisou dont les brunchs ont donné l’idée du lieu.';
export const photos = {
  salle: { alt: 'La salle du café, petit lieu cocooning', ratio: '16/9' },
  facade: { alt: 'La façade et la terrasse de la rue des Fossés Fleuris', ratio: '4/3' },
  table: { alt: 'Une table de brunch dressée', ratio: '4/5' },
};
