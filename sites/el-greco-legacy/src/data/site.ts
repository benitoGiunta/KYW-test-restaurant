// Contenu d'El Greco : données de data/restaurants/el-greco (donnees.json, dossier.md, site actuel).
// Tout ce qui n'est pas prouvé par le dossier est marqué `placeholder` ou `verifier`.
import carteBrute from './carte.json';

const NBSP = ' ';

export const resto = {
  nom: 'El Greco',
  adresse: { rue: 'Rue de Sardanson 22', cp: '5004', commune: 'Bouge (Namur)' },
  geo: { lat: 50.4749656, lon: 4.8775723 },
  tel: '081 20 07 47',
  telHref: 'tel:+3281200747',
  email: 'contact@elgrecorestaurant.com',
  facebook: 'https://www.facebook.com/elgrecobouge/',
  instagram: 'https://www.instagram.com/elgreconamur/',
  depuis: 1986,
  siteOrigine: 'https://elgrecorestaurant.com',
};

export const itineraire = `https://www.google.com/maps/search/?api=1&query=${resto.geo.lat},${resto.geo.lon}`;

// Horaires : jeudi à dimanche d'après Trouve Ton Resto (à confirmer) ; le site d'origine affichait « 18:00 - 23:00 » sans jours.
export type Creneau = { de: string; a: string };
export const horaires: { jour: string; court: string; creneaux: Creneau[] | null }[] = [
  { jour: 'lundi', court: 'lun', creneaux: null },
  { jour: 'mardi', court: 'mar', creneaux: null },
  { jour: 'mercredi', court: 'mer', creneaux: null },
  { jour: 'jeudi', court: 'jeu', creneaux: [{ de: '18:00', a: '22:00' }] },
  { jour: 'vendredi', court: 'ven', creneaux: [{ de: '12:00', a: '15:00' }, { de: '18:00', a: '22:00' }] },
  { jour: 'samedi', court: 'sam', creneaux: [{ de: '12:00', a: '15:00' }, { de: '18:00', a: '22:00' }] },
  { jour: 'dimanche', court: 'dim', creneaux: [{ de: '18:00', a: '23:00' }] },
];
export const h = (t: string) => t.replace(':', `${NBSP}h${NBSP}`);

export const prix = (p: string) => `${p}${NBSP}€`;

export type Plat = { nom: string; desc: string | null; prix: string };
export type Categorie = { nom: string; plats: Plat[] };
const carte = carteBrute as Categorie[];
export const slug = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const menu: Categorie[] = carte.slice(0, 8);
export const boissons: Categorie[] = carte.slice(8);

// Les six spécialités de la page d'accueil (liste « specialites » de donnees.json, prix de la carte).
const trouver = (n: string) => carte.flatMap((c) => c.plats).find((p) => p.nom === n)!;
export const specialites: Plat[] = ['Mezze signature', 'Giouvetsi', 'Poulpe grillé', 'Gyros', 'Spanakopita', 'Crèmes grecques'].map(trouver);

// Avis repris mot pour mot de donnees.json (Trustindex) ; à faire vérifier par le client. Aucune note, aucun nombre d'avis.
export const avis = [
  { texte: 'Resto familial extra ! Un goût authentique au niveau des plats et vins. […] profiter de la terrasse au calme est toujours très agréable', auteur: 'lf gh', date: 'juillet 2026' },
  { texte: 'Bon moment culinaire, très bonne qualité de plats, belle présentation. Personnel aimable et attentionné.', auteur: 'Ferdinando Longo', date: 'juillet 2026' },
  { texte: 'De la réservation à la demande de l’addition tout était parfait […] très bon accueil, mise en bouche offerte par le chef, les plats étaient excellents, tout le long la patronne est restée très agréable.', auteur: 'Ced', date: 'octobre 2026' },
];

export const histoire = [
  'Depuis 1986, le restaurant El Greco célèbre avec passion et fierté les traditions culinaires familiales de la Grèce à Namur.',
  'Nos plats sont bien plus que des recettes ; ils sont le reflet de toute une histoire, portant en eux les saveurs authentiques héritées de nos ancêtres. Chaque préparation est réalisée avec le même dévouement et l’amour qu’une mère mettrait dans sa propre cuisine, perpétuant ainsi un héritage gastronomique riche et précieux.',
];

export const navLiens = [
  { href: '', texte: 'Accueil', id: 'accueil' },
  { href: 'our-menu/', texte: 'Le menu', id: 'menu' },
  { href: 'carte-des-boissons/', texte: 'Les boissons', id: 'boissons' },
  { href: 'about-us/', texte: 'Notre histoire', id: 'histoire' },
  { href: 'contact/', texte: 'Infos et réservation', id: 'contact' },
];
