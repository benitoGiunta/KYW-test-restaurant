// Contenu du Grill des amiS (variante awwwards « Du brut au feu »). Source : data/restaurants/grill-des-amis/ (donnees.json, dossier.md).
// Hypothèses : (1) l'e-mail, les réseaux, les avis, l'année d'ouverture et le parking sont inconnus : rien n'est affiché à leur place ;
// (2) mardi, mercredi et dimanche sont « fermé (à confirmer) » dans les données : affichés ainsi ; (3) la photo « patrons » est légendée sans nom
// (l'identité est à confirmer) ; (4) aucun plat fictif : la carte vient du PDF du client (placeholder: false partout).
import carteJson from './carte.json';

export type Plat = { nom: string; description: string | null; prix: number; unite: string | null; placeholder: boolean };
export type Categorie = { categorie: string; plats: Plat[] };
export const carte = carteJson as Categorie[];
export const plats: (Plat & { categorie: string })[] = carte.flatMap((c) => c.plats.map((p) => ({ ...p, categorie: c.categorie })));

const N = ' ';
export const site = {
  nom: 'Le Grill des amiS',
  baseline: 'Le spécialiste viandes, maturation et grillades à Namur',
  description: 'Restaurant de viandes à Namur : pièces achetées brutes, découpées et maturées sur place, grillades au feu de bois. Rue Saint-Joseph 10, 081 61 72 60.',
  typeCuisine: 'Grillades, viandes maturées',
  devise: 'Cuisine et Grillades pour le plaisir de nos clients, nos amis',
  adresse: { rue: 'Rue Saint-Joseph', numero: '10', cp: '5000', commune: 'Namur', pays: 'BE' },
  geo: { lat: 50.4662832, lon: 4.8644955 },
  telephone: '+32 81 61 72 60',
  telephoneHref: 'tel:+3281617260',
  telephoneLisible: `081${N}61${N}72${N}60`,
  reservationUrl: 'https://www.legrilldesamis.be/reserver',
  siteClient: 'https://www.legrilldesamis.be',
  planUrl: 'https://www.google.com/maps/search/?api=1&query=50.4662832,4.8644955',
  credit: 'Photos : Le Grill des amiS',
} as const;

// Horaires du site du client. Une ligne par groupe de jours ; `schema` sert au JSON-LD et à l'état « ouvert maintenant ».
export const services = [
  { jours: 'Lundi', schema: ['Monday'], midi: `12${N}h à 14${N}h`, soir: `18${N}h à 21${N}h30`, o1: '12:00', c1: '14:00', o2: '18:00', c2: '21:30' },
  { jours: 'Jeudi au samedi', schema: ['Thursday', 'Friday', 'Saturday'], midi: `12${N}h à 14${N}h`, soir: `18${N}h à 21${N}h30`, o1: '12:00', c1: '14:00', o2: '18:00', c2: '21:30' },
] as const;
export const fermes = 'Mardi, mercredi, dimanche : fermé (à confirmer)';

export const gestes = [
  { verbe: 'Acheter', texte: 'De grosses pièces, brutes, chez des fournisseurs choisis. L’entrecôte du moment suit l’arrivage de Rungis.', photo: null },
  { verbe: 'Découper', texte: 'Gaëtan découpe sur place : côte à l’os, hampe, onglet. Ce qui part au gril est taillé dans la maison.', photo: 'decoupe' },
  { verbe: 'Maturer', texte: 'Deux chambres de maturation éclairées en bleu, à vue de la salle. La côte de porc Duroc d’Olive y reste 14 jours.', photo: 'chambre' },
  { verbe: 'Griller', texte: 'Au feu de bois, à la pince, sur la grille. Les sauces sont préparées sur place, les frites sont maison.', photo: 'grill' },
] as const;

// Pièces mises en avant sur l'accueil : noms exacts de la carte (prix lus dans carte.json).
export const pieces = [
  { nom: 'La Hampe de bœuf', note: 'le morceau du boucher, longue bande plate aux fibres longues' },
  { nom: 'L\'Onglet de bœuf', note: 'servi bleu ou saignant' },
  { nom: 'L\'Entrecôte du moment', note: 'suivant l’arrivage de Rungis' },
  { nom: 'La Côte de porc Duroc d\'Olive maturée 14 j.', note: 'maturée dans la maison' },
  { nom: 'Pluma de porc ibérique', note: 'à la braise' },
  { nom: 'L\'Assiette des Amis (1 kg)', note: '1 entrecôte premium, 1 entrecôte maturée, 1 hampe, 1 porc ibérique' },
] as const;
export const prixDe = (nom: string) => plats.find((p) => p.nom === nom)!;

export const viandard = { prix: 69, viandes: 5, services: 3, des: 2 } as const;
export const midi = [
  { nom: 'Lunch', prix: '15,50', texte: 'Braisade de volaille, légumes chauds et frites, ou escalope de porc Duroc panée, sauce au choix et frites.' },
  { nom: 'Steak du midi', prix: '17', texte: 'Environ 250 g, à la carte du midi.' },
] as const;

export const equipe = [
  { nom: 'Gaëtan', role: 'Chef. Il choisit les viandes, les découpe, compose la carte et les accords avec les vins.' },
  { nom: 'Elise', role: 'Co-signataire de la maison avec Gaëtan.' },
] as const;
export const adn = ['Produits frais', 'Sauces préparées sur place', 'Frites et croquettes maison', 'Poissons et volailles', 'Accords mets et vins', 'Suggestions renouvelées'] as const;
