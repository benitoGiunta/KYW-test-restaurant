// Contenu de la variante « legacy » de Makimono. Source : data/restaurants/makimono/ (donnees.json, dossier.md,
// site-actuel/page.html, photos/index.json). La carte (transcrite du menu 2026) vit dans carte.json.
// Rien d'inventé : aucune histoire, équipe, citation, note ni nombre d'avis n'est repris. Pas d'outil de réservation
// de table connu : l'action du site est la commande en ligne (lien du site d'origine).
import carteJson from './carte.json';

export const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
export const NB = ' ';

export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean }
export interface Categorie { categorie: string; note: string; plats: Plat[] }
export interface Option { nom: string; prix: string | null }
export interface Groupe { titre: string; note: string; options: Option[] }

export const resto = {
  nom: 'Makimono',
  baseline: 'Creative uramaki made with love',
  siteActuel: 'https://www.makimono.be',
  adresse: { rue: 'Rue Saint-Loup', numero: '14', cp: '5000', ville: 'Namur' },
  geo: { lat: 50.4643256, lon: 4.8635198 },
  tel: 'tel:+32483038847',
  telAffiche: `+32 483 03 88 47`.replace(/ /g, NB),
  email: 'contact.makimono@gmail.com',
  commande: 'https://makimono.be/online_order/fr/order/',
  carteComplete: 'https://www.makimono.be/images/2026_menu.pdf',
  itineraire: 'https://maps.app.goo.gl/muDgkdVqwWHDYPzo9',
  facebook: 'https://www.facebook.com/MakimonoNamur/',
  instagram: 'https://www.instagram.com/makimono_namur/',
};

export const liens = [
  { href: '#carte', texte: 'La carte' },
  { href: '#galerie', texte: 'Photos' },
  { href: '#livraison', texte: 'Livraison' },
  { href: '#evenement', texte: 'Événement' },
  { href: '#contact', texte: 'Contact' },
];

const midi = { de: '12:00', a: '14:30', libelle: `12${NB}h${NB}00 à 14${NB}h${NB}30` };
const soir = { de: '18:00', a: '22:00', libelle: `18${NB}h${NB}00 à 22${NB}h${NB}00` };
export const horaires = [
  { jour: 'Lundi', midi, soir }, { jour: 'Mardi', midi, soir }, { jour: 'Mercredi', midi, soir },
  { jour: 'Jeudi', midi, soir }, { jour: 'Vendredi', midi, soir }, { jour: 'Samedi', midi, soir },
  { jour: 'Dimanche', midi: null, soir },
];

const c = carteJson as { carte: any[]; roll: Groupe[]; bowl: Groupe[] };
const ap = (t: string) => t.replace(/(\p{L})'(\p{L})/gu, '$1’$2');
const cat = (i: number): Categorie => ({ categorie: c.carte[i].categorie, note: ap(c.carte[i].note), plats: c.carte[i].plats.map((x: Plat) => ({ ...x, nom: ap(x.nom), description: ap(x.description).replace(/\s*Prix 11\.00[^)]*\)?\.?$/, '').replace(/\s*\(à confirmer\)\.?$/, '') })) });
export const panneaux: { id: string; titre: string; categories: Categorie[] }[] = [
  { id: 'rolls', titre: 'Rolls', categories: [cat(0)] },
  { id: 'nigiri', titre: 'Nigiri et poké', categories: [cat(1), cat(2)] },
  { id: 'cote', titre: 'Accompagnements', categories: [cat(3), cat(4)] },
  { id: 'boissons', titre: 'Boissons', categories: [cat(5), cat(6), cat(7)] },
];
export const composer = {
  roll: { nom: 'Create.Your.Roll', groupes: c.roll },
  bowl: { nom: 'Create.Your.Bowl', groupes: c.bowl },
};
export const boxes = [
  { nom: 'Fast Box', prix: `16,00${NB}€`, texte: '16 pièces : Poulet Katsu Mangue (4), California Saumon (4), Tempura de Scampis Avocat (4), Crispy Saumon (4).' },
  { nom: 'Creative Box', prix: `18,00${NB}€`, texte: '16 pièces : le chef imagine des rolls créatifs avec les ingrédients de Create.Your.Roll. Allergies ou box 100 % végé à signaler au chef.' },
];

const p = (f: string, w: number, ht: number) => ({ src: `${base}photos/${f}.webp`, src800: `${base}photos/${f}-800.webp`, w, h: ht });
export const photos = {
  hero: { ...p('13-nigiri-saumon-flambe', 1600, 1157), alt: 'Nigiri de saumon flambés au chalumeau sur une assiette noire' },
  logo: { src: `${base}photos/00-logo.webp`, w: 480, h: 529 },
  terrasse: { ...p('05-plateau-terrasse', 1422, 1752), alt: 'Plateau de rolls, gyoza et tempura sur une table de terrasse' },
};
export const galerie = [
  { ...p('14-creative-box', 1600, 1102), alt: 'Creative Box : rolls garnis de tobiko et de sauce épicée', legende: 'La Creative Box, rolls garnis de tobiko et de sauce épicée.', cls: 'g1' },
  { ...p('04-poke-bowl-gros-plan', 1000, 1334), alt: 'Poké bowl au saumon, avocat, edamame et tobiko', legende: 'Poké bowl au saumon, avocat, edamame et tobiko.', cls: 'g2' },
  { ...p('09-facade-terrasse', 1046, 1309), alt: 'Façade vitrée du restaurant, rue Saint-Loup, avec sa terrasse', legende: 'La façade, rue Saint-Loup.', cls: 'g3' },
  { ...p('15-poke-chicken', 1600, 1141), alt: 'Poké Chicken : poulet katsu, nachos, cream cheese, coriandre', legende: 'Poké Chicken, au poulet katsu.', cls: 'g4' },
  { ...p('12-rolls-assiette', 1600, 1000), alt: 'Rolls aux sésames noirs, oignons verts et mayonnaise', legende: 'Rolls aux sésames noirs et oignons verts.', cls: 'g5' },
  { ...p('06-salle-fenetres', 1000, 1333), alt: 'La salle : tables en bois, chaises en métal, grandes fenêtres', legende: 'La salle, tables en bois et grandes fenêtres.', cls: 'g6' },
];
