// Données de Partage (Namur), variante legacy. Source : data/restaurants/partage/donnees.json (copié dans
// ./donnees.json), dossier.md, le HTML sauvegardé de restaurantpartage.be. Rien n'est inventé ; ce qui est
// illustratif porte `placeholder: true` et s'affiche avec data-placeholder="true".
import donnees from './donnees.json';
import photos from './photos.json';

export const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
export const u = (p = '') => base + p.replace(/^\//, '');

export const resto = {
  nom: 'Partage',
  signature: 'Charles Jeandrain',
  adresse: { rue: 'Rue des Fossés Fleuris 18', cp: '5000', ville: 'Namur', repere: 'dans le piétonnier, place Maurice Servais' },
  telAffiche: '081 81 00 98',
  tel: 'tel:+3281810098',
  maps: 'https://maps.app.goo.gl/EiJQZJTgEEVMNpYR7',
  facebook: 'https://www.facebook.com/profile.php?id=61566994066332',
  instagram: 'https://www.instagram.com/restaurant_partage_namur/',
  zenchef: 'https://bookings.zenchef.com/results?rid=371394&pid=1001',
  bonCadeauEnLigne: 'https://restaurantpartage.be/bon-cadeau/',
  attablez: 'https://attablezvous.be',
  entreprise: 'BE 0451 659 813',
  ouverture: '12 novembre 2024',
  couverts: 'une trentaine',
  privatisation: 'Possibilité de privatiser pour des groupes de 20 à 30 personnes.',
  parkings: [
    { nom: 'Parking Beffroi', temps: '1 min à pied' },
    { nom: 'Parking La Confluence', temps: '2 min à pied' },
  ],
  geo: donnees.geo,
};

// Le texte du site d'origine, mot pour mot (redesign.md § The words).
export const presentation = [
  'Imaginé par Charles Jeandrain, Partage se situe dans le piétonnier de Namur et propose des plats à base de produits locaux, privilégiant une cuisine sincère et gourmande.',
  'Ici, l’expérience se vit dans le partage : au lieu de plats individuels, les convives se régalent de plusieurs mets à partager, le tout dans une ambiance chaleureuse et accueillante.',
  'Dans la lignée d’Attablez-vous, Partage retourne à une cuisine simple et authentique afin de garantir un moment de plaisir pour tous.',
];

// Horaires : jours de fermeture officiels (site) ; heures de service à confirmer (deux sources divergent).
// jour : 0 = dimanche (Date.getDay()).
export interface Jour { jour: number; nom: string; midi: string | null; soir: string | null; aConfirmer: boolean }
export const horaires: Jour[] = [
  { jour: 1, nom: 'Lundi', midi: null, soir: null, aConfirmer: false },
  { jour: 2, nom: 'Mardi', midi: null, soir: '18:30 à 22:00', aConfirmer: true },
  { jour: 3, nom: 'Mercredi', midi: '12:00 à 14:00', soir: '18:30 à 22:00', aConfirmer: true },
  { jour: 4, nom: 'Jeudi', midi: '12:00 à 14:00', soir: '18:30 à 22:00', aConfirmer: true },
  { jour: 5, nom: 'Vendredi', midi: '12:00 à 14:00', soir: '18:30 à 22:00', aConfirmer: true },
  { jour: 6, nom: 'Samedi', midi: '12:00 à 14:00', soir: '18:30 à 22:00', aConfirmer: true },
  { jour: 0, nom: 'Dimanche', midi: null, soir: null, aConfirmer: false },
];
export const fermeture = 'Fermé le dimanche, le lundi et le mardi midi.';

// La carte (transcrite des GIF du site, carte du 28/09/2026 ; lunch du 21/10/2026).
export interface Plat { nom: string; description: string | null; prix: string | null; placeholder?: boolean }
export interface Rubrique { categorie: string; plats: Plat[] }
const carte = donnees.carte as Rubrique[];
const nettoie = (s: string) => s.replace(/\boe/g, 'œ').replace(/\bOe/g, 'Œ');
const rub = (noms: string[]) => carte
  .filter((r) => noms.includes(r.categorie))
  .map((r) => ({ categorie: r.categorie.replace(/ \(prix verre, bouteille\)/, ''), plats: r.plats.map((p) => ({ ...p, nom: nettoie(p.nom), description: p.description ? nettoie(p.description) : null })) }));

export const carteCuisine = rub(['Starters', 'Entrées', 'Plats', 'Desserts']);
export const carteVins = rub(['Vins au verre (prix verre, bouteille)', 'Apéritifs', 'Cocktails', 'Bières', 'Softs', 'Sans alcool', 'Jus artisanaux (33 cl)']);
export const carteFin = rub(['Digestifs', 'Cocktails fin de repas et digestifs chauds', 'Alcools', 'Gins', 'Rhums et whiskys', 'Tequilas Clase Azul (2 cl) et chartreuses', 'Cafés et thés']);
export const dateCarte = '28 septembre 2026';

export const lunch = {
  prix: '38 €',
  regle: 'Uniquement les midis, pour la table entière.',
  date: '21 octobre 2026',
  services: [
    { nom: 'Comme une pomme de terre au foie gras', description: 'Gel porto, oignons rouges' },
    { nom: 'Raviole de champignons des bois', description: 'Bouillon beurré de champignons au soja' },
    { nom: 'Volaille jaune à basse température', description: 'Embeurrée de chou vert, jus brun de volaille au poivre' },
    { nom: 'Crumble de pommes', description: 'Crème légère, glace vanille' },
  ],
  fromages: 'Fromages en supplément 16 €, ou en remplacement du dessert 9 €.',
};

// Choix de la page d'accueil : quatre plats réels de la carte, prix réels.
const tous = carteCuisine.flatMap((r) => r.plats);
const pick = (debut: string) => tous.find((p) => p.nom.startsWith(debut))!;
export const aPartager = [pick('Croquettes de jambon'), pick('Saint-Jacques'), pick('Chou-fleur'), pick('Foie gras')];

// Photos du client (data/restaurants/partage/photos, WebP générés au build local).
type Ph = { w: number; h: number; widths?: number[]; png?: boolean };
const P = photos as Record<string, Ph>;
export function photo(id: string) {
  const p = P[id];
  if (!p) throw new Error(`photo inconnue : ${id}`);
  const widths = p.widths ?? [p.w];
  const src = u(`photos/${id}-${widths[widths.length - 1]}.webp`);
  const srcset = widths.map((w) => `${u(`photos/${id}-${w}.webp`)} ${w}w`).join(', ');
  return { src, srcset, width: p.w, height: p.h };
}

// Bon cadeau : formules illustratives (la page d'origine n'a pas été capturée).
export const bonsCadeaux = [
  { nom: 'Le lunch pour deux', valeur: '76 €', detail: 'Deux lunchs à 38 €, un midi au choix.', placeholder: false },
  { nom: 'Une soirée à partager', valeur: '120 €', detail: 'Un montant pour la carte du soir, vins compris.', placeholder: true },
  { nom: 'Montant libre', valeur: 'À partir de 25 €', detail: 'À utiliser sur toute la carte.', placeholder: true },
];

export const nav = [
  { href: '', label: 'Partage', id: 'accueil' },
  { href: 'carte/', label: 'Menus et carte', id: 'carte' },
  { href: 'bon-cadeau/', label: 'Bon cadeau', id: 'bon-cadeau' },
];
