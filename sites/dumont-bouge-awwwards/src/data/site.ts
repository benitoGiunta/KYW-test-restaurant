// Contenu de Dumont Bouge (variante awwwards « Sept à dix-huit »). Source : data/restaurants/dumont-bouge/ (donnees.json, dossier.md).
// Hypothèses : (1) adresse principale = Bouge (le site du client la donne, restaurants.json disait « Namur ») ;
// (2) e-mail public du site (srl-dumontbouge@outlook.com), pas l'e-mail personnel de restaurants.json ;
// (3) aucun fondateur, chef, avis, note, distinction : non prouvés, donc absents (aucun contenu fictif dans cette phase) ;
// (4) formule Dumont : 13,80 € dans la carte (iframe), 13,50 € dans `menus` : la carte fait foi, écart noté dans RAPPORT.md ;
// (5) les horaires du tea-room et du brunch s'inscrivent dans l'ouverture 7 h à 18 h de Bouge.
import carte from './carte.json';

const NB = ' ';
export const site = {
  nom: 'Dumont Bouge',
  baseline: 'Pâtisserie, boulangerie, restauration, tea-room',
  description: 'Dumont Bouge, chaussée de Louvain à Bouge (Namur) : pain du matin, pâtisserie, sandwicherie Dagobert et tea-room, tous les jours de 7 h à 18 h.',
  typeCuisine: ['Boulangerie', 'Pâtisserie', 'Sandwicherie', 'Tea-room'],
  adresse: { rue: 'Chaussée de Louvain', numero: '343', cp: '5004', commune: 'Bouge (Namur)', pays: 'BE' },
  second: { rue: 'Rue de Marchovelette', numero: '9', cp: '5000', commune: 'Namur' },
  telephone: '+3281229602',
  telephoneLisible: `081${NB}22${NB}96${NB}02`,
  telephoneHref: 'tel:+3281229602',
  email: 'srl-dumontbouge@outlook.com',
  reservationUrl: 'https://www.dumontbouge.com/reservations',
  siteActuel: 'https://www.dumontbouge.com',
  planUrl: 'https://www.openstreetmap.org/search?query=Chauss%C3%A9e%20de%20Louvain%20343%2C%205004%20Bouge',
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61572819565373' },
    { nom: 'Instagram', url: 'https://www.instagram.com/dumontbouge/' },
  ],
  credit: 'Photos : Dumont Bouge',
} as const;

/** Les quatre moments de la journée (l'index de l'accueil). `debut`/`fin` en 24 h, pour le JSON-LD et l'état « ouvert ». */
export const journee = [
  { h: '7 h', hDebut: '07:00', titre: 'Le pain du matin', texte: 'Pétri et cuit chaque matin à partir de farines sélectionnées : du Petit Blanc au Soleil aux graines.', lien: '/carte/#pains', cta: 'Les pains' },
  { h: '7 h à 11 h', hDebut: '07:00', titre: 'Le petit-déjeuner', texte: 'Deux formules au tea-room : couques ou croissants, jus d’orange frais, une boisson chaude.', lien: '/carte/#tea-room', cta: 'Les formules' },
  { h: '11 h 30 à 15 h', hDebut: '11:30', titre: 'Le brunch', texte: 'Croques gratinés, salades, croquettes, toasts, pâtes et méli-mélo, servis à table.', lien: '/carte/#tea-room', cta: 'Le brunch' },
  { h: 'Jusqu’à 18 h', hDebut: '15:00', titre: 'Gâteaux et gaufres', texte: 'Gâteaux faits à la main, gaufres de Bruxelles, crêpes et coupes glacées ; sandwichs Dagobert à emporter.', lien: '/carte/#gateaux', cta: 'Les gâteaux' },
] as const;

export const horairesBouge = { jours: 'Lundi au dimanche', plage: `7${NB}h${NB}à${NB}18${NB}h`, fermeture: '18:00', ouverture: '07:00' };
export const horairesNamur = [
  { jours: 'Lundi au samedi', plage: `7${NB}h${NB}à${NB}17${NB}h` },
  { jours: 'Dimanche', plage: 'Fermé' },
];
export const joursSchema = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

export const chapitres = carte as Array<{ id: string; titre: string; rubriques: Array<{ titre: string; horaire: string | null; plats: Array<{ nom: string; desc: string | null; prix: Array<{ lib: string | null; montant: string | null }> | null }> }> }>;
const compte = (id: string) => chapitres.find((c) => c.id === id)!.rubriques.reduce((n, r) => n + r.plats.length, 0);
export const chiffres = {
  pains: compte('pains'),
  gateaux: compte('gateaux'),
  dagobert: chapitres.find((c) => c.id === 'emporter')!.rubriques.filter((r) => r.titre.startsWith('Sandwichs')).reduce((n, r) => n + r.plats.length, 0),
  lignes: chapitres.reduce((n, c) => n + c.rubriques.reduce((m, r) => m + r.plats.length, 0), 0),
};

export const presentation = 'Dumont Bouge est bien plus qu’un salon de thé, c’est un lieu de rencontre et de partage. Nous sommes passionnés par l’art de la dégustation, offrant une grande variété gustative.';
