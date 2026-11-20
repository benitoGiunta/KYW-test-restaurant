// Contenu de la Pizzeria Doria (variante awwwards « Casiers »). Source : data/restaurants/pizzeria-doria/ (donnees.json, dossier.md).
// Hypothèses :
//  - adresse retenue = site du client (Rue Fond de Malonne 66, 5020 Malonne, commune de Namur) ; Tripadvisor dit « 95 », non retenu.
//  - le lien pizzy.be est celui de la commande à emporter, pas d'une réservation : la réservation passe par le téléphone et l'e-mail.
//  - aucune note, aucun avis, aucun abonné affiché (non prouvés par le site client).
//  - équipe : Rocco et Luigi, prénoms seuls tels que donnés par le site ; aucune photo d'eux.
//  - photos de pizzas : le client n'en fournit pas ; trois photos libres Unsplash, marquées illustratives (`illustratif: true`).
import carte from './carte.json';

export const site = {
  nom: 'Pizzeria Doria',
  description:
    'Pizzeria Doria à Malonne (Namur) : pizzas au fior di latte, pâtes fraîches bio et plats italiens, servis dans l’ancienne salle des coffres d’une banque.',
  typeCuisine: 'Pizzas, pâtes, plats italiens',
  baseline: 'Venez passer un moment chaleureux et convivial aux saveurs de l’Italie chez Doria.',
  adresse: { rue: 'Rue Fond de Malonne', numero: '66', cp: '5020', commune: 'Malonne (Namur)', localite: 'Namur', pays: 'BE' },
  geo: { lat: 50.4404882, lon: 4.7950329 },
  telephone: '+32 81 44 44 08',
  telephoneHref: 'tel:+3281444408',
  telephoneLisible: '+32 81 44 44 08',
  email: 'info@pizzeriadoria.be',
  emporterUrl: 'https://pizzy.be/pizzeria-doria',
  facebookUrl: 'https://www.facebook.com/pizzeriadoria/',
  planUrl: 'https://www.openstreetmap.org/?mlat=50.4404882&mlon=4.7950329#map=18/50.4404882/4.7950329',
  paiement: 'Payconiq et espèces',
  credit: 'Photos : Pizzeria Doria et photos libres illustratives (Unsplash)',
  creditIllustratif: 'Photos libres Unsplash (Benu Marinescu, Hoja Studio, Nadya Spetnitskaya), illustratives, pas des photos du restaurant',
  ouvertDepuis: 'octobre 2017',
  adresseDepuis: 'mai 2023',
};

export type Creneau = { debut: string; fin: string };
export type Jour = { cle: string; nom: string; court: string; schema: string; creneaux: Creneau[] };
const midi: Creneau = { debut: '12:00', fin: '13:30' };
export const jours: Jour[] = [
  { cle: 'lundi', nom: 'Lundi', court: 'Lun', schema: 'Monday', creneaux: [midi, { debut: '18:00', fin: '21:30' }] },
  { cle: 'mardi', nom: 'Mardi', court: 'Mar', schema: 'Tuesday', creneaux: [] },
  { cle: 'mercredi', nom: 'Mercredi', court: 'Mer', schema: 'Wednesday', creneaux: [] },
  { cle: 'jeudi', nom: 'Jeudi', court: 'Jeu', schema: 'Thursday', creneaux: [midi, { debut: '18:00', fin: '21:30' }] },
  { cle: 'vendredi', nom: 'Vendredi', court: 'Ven', schema: 'Friday', creneaux: [midi, { debut: '18:00', fin: '22:00' }] },
  { cle: 'samedi', nom: 'Samedi', court: 'Sam', schema: 'Saturday', creneaux: [midi, { debut: '18:00', fin: '22:00' }] },
  { cle: 'dimanche', nom: 'Dimanche', court: 'Dim', schema: 'Sunday', creneaux: [{ debut: '18:00', fin: '21:30' }] },
];
/** « 12 h 00 » : insécables. */
export const heure = (h: string) => h.replace(':', ' h ');
export const libelleJour = (j: Jour) => (j.creneaux.length ? j.creneaux.map((c) => `${heure(c.debut)} à ${heure(c.fin)}`).join(' · ') : 'Fermé');

/** « 9,50 € » avec espace insécable. */
export const eur = (n: number) => `${n.toFixed(2).replace('.', ',')} €`;

export type Plat = { nom: string; description: string | null; prix: number | null; placeholder: boolean };
export type Casier = { numero: string; slug: string; nom: string; plats: Plat[]; min: number | null; max: number | null };
const slugs: Record<string, string> = {
  'Apéritifs': 'aperitifs', 'Bières': 'bieres', 'Softs': 'softs', 'Salades & Antipasti': 'antipasti', 'Pizzas': 'pizzas', 'Pasta': 'pasta',
  'Viandes': 'viandes', 'Glaces & Desserts': 'desserts', 'Café': 'cafe', 'Digestifs': 'digestifs',
  'Vins (bouteilles 75 cl)': 'vins-bouteilles', 'Vins au verre et pichets': 'vins-verre',
};
const noms: Record<string, string> = { 'Salades & Antipasti': 'Salades et antipasti', 'Glaces & Desserts': 'Glaces et desserts', 'Pasta': 'Pâtes', 'Vins (bouteilles 75 cl)': 'Vins, bouteilles 75 cl', 'Vins au verre et pichets': 'Vins au verre et pichets' };
// L'ordre du site client (apéritifs d'abord) est conservé pour les boissons, mais la cuisine passe devant : pizzas = casier 01.
const ordre = ['Pizzas', 'Pasta', 'Salades & Antipasti', 'Viandes', 'Glaces & Desserts', 'Apéritifs', 'Bières', 'Softs', 'Vins au verre et pichets', 'Vins (bouteilles 75 cl)', 'Café', 'Digestifs'];
export const casiers: Casier[] = ordre.map((cat, i) => {
  const c = (carte as { categorie: string; plats: Plat[] }[]).find((x) => x.categorie === cat)!;
  const prix = c.plats.map((p) => p.prix).filter((p): p is number => p != null);
  return {
    numero: String(i + 1).padStart(2, '0'),
    slug: slugs[cat],
    nom: noms[cat] ?? cat,
    plats: c.plats,
    min: prix.length ? Math.min(...prix) : null,
    max: prix.length ? Math.max(...prix) : null,
  };
});
export const casier = (slug: string) => casiers.find((c) => c.slug === slug)!;
export const nbPizzas = casier('pizzas').plats.length; // 45 pizzas et pains selon le dossier

export const suggestions = {
  titre: 'Suggestions affichées sur le site du restaurant en novembre 2026',
  plats: [
    { nom: 'Pizza aux cèpes', detail: 'Cèpes, fior di latte, saucisse au fenouil, speck, copeaux de parmesan', prix: 18 },
    { nom: 'Risotto aux cèpes', detail: 'Préparé à la commande, comptez 30 minutes', prix: 20 },
    { nom: 'Panna cotta', detail: 'Fruits des bois, chocolat blanc, zeste de citron', prix: 8 },
  ],
};

export const midis = {
  titre: 'Les midis d’école',
  texte: 'Du lundi au vendredi les jours d’école, hors mardi et mercredi : des cornets de pâtes de 5 à 6 € et des paninis maison de 6 à 7,50 €.',
};

export const equipe = [
  { nom: 'Rocco', role: 'Gérant' },
  { nom: 'Luigi', role: 'Gérant, auteur de la sélection de vins au verre' },
];

export const histoire = [
  'La Pizzeria Doria ouvre en octobre 2017. Elle est tenue par Rocco et Luigi.',
  'En mai 2023, elle change d’adresse : une ancienne banque restaurée, au Fond de Malonne. On y mange dans la salle des coffres, entre les casiers de métal.',
  'À table : de la pizza au fior di latte et à la tomate San Marzano (le fior di latte existe sans lactose, sur demande), des pâtes fraîches bio Eggusto, des viandes. Au comptoir : la Philomène de Malonne et la Vulpio de Wépion, et des vins d’Italie.',
];

export const pratique = [
  { titre: 'Sur place ou à emporter', texte: 'Les plats se prennent à table ou à emporter ; la commande à emporter se fait en ligne ou par téléphone.' },
  { titre: 'Paiement', texte: 'Payconiq et espèces.' },
  { titre: 'Sans lactose', texte: 'Le fior di latte sans lactose est disponible sur demande.' },
  { titre: 'Pâtes bio', texte: 'Pâtes fraîches et artisanales Eggusto, bio, avec un supplément de 2,50 €.' },
  { titre: 'Fermetures', texte: 'Fermé le mardi et le mercredi, y compris les jours fériés qui y tombent.' },
];

export const photos = [
  { cle: 'coffres', credit: 'Photos : Pizzeria Doria' },
];
