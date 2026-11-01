// Tout le contenu du site vit ici. Source : data/restaurants/dolce-vita-wepion/dossier.md, donnees.json, photos/index.json.
// Règle « une donnée, un drapeau » : chaque champ non prouvé par le dossier porte son propre `placeholder: true`
// (ou `rolePlaceholder`, `descriptionPlaceholder`) et le gabarit le marque à l'endroit où il s'affiche.
// Règle « rien de daté, rien de promis » : aucune date en dur ; le compte à rebours se calcule depuis `horaires`.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; tags?: string[]; placeholder: boolean; photo?: string; /** ligne du menu hors des services numérotés (mise en bouche, mignardise, supplément) */ horsService?: boolean }
export interface Categorie { categorie: string; plats: Plat[]; /** nombre de services annoncé (le compteur ne compte pas les lignes) */ services?: number }
export interface Menu { nom: string; prix: string; description: string; placeholder: boolean; /** n'est pas une formule de repas (bon cadeau) : hors du compteur */ horsFormule?: boolean }
export interface Membre { nom: string; role: string; rolePlaceholder: boolean; photo?: string; placeholder: boolean }
export interface Supplement { libelle: string; prix: string }
export interface Avis { texte: string; auteur: string; source: string; date?: string; note?: number; placeholder: boolean }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }
export interface MotLien { mot: string; href: string }
/** Phrase du manifeste : texte avec deux mots-liens soulignés (ordre : avant, lien1, milieu, lien2, apres). */
export interface Manifeste { avant: string; lien1: MotLien; milieu: string; lien2: MotLien; apres: string; placeholder: boolean }
export interface Produit { nom: string; description: string; prix: string; etiquette?: string; placeholder: boolean }
export interface CategorieProduits { categorie: string; produits: Produit[] }
export interface Fournee { libelle: string; heure: string }

export interface Restaurant {
  slug: string;
  nom: string;
  /** Nom en deux lignes pour les titres géants (le second sert de titre à la levée). */
  nomLignes: [string, string];
  baseline: string;
  description: string; // meta description par défaut (50 à 160 caractères)
  url: string; // site actuel du client
  typeCuisine: string; // schema.org servesCuisine
  adresse: { rue: string; numero: string; cp: string; commune: string; pays: string };
  geo: { lat: number; lon: number } | null; // non géocodé : le plan passe par une recherche d'adresse
  telephone: string; // format international
  telephoneMobile: string;
  email: { valeur: string; placeholder: boolean };
  reservation: { outil: string; url: string | null };
  horaires: Horaire[];
  reseaux: Reseau[];
  carte: Categorie[];
  menus: Menu[];
  histoire: string[]; // un paragraphe par entrée
  equipe: Membre[];
  avis: Avis[];
  photos: Photo[];
  valeurs: string[];
  manifeste: Manifeste;
  /** Levée : photo qui grossit et noms qui défilent (les services réels du menu). */
  levee: { photo: string; marquee: string[]; marqueePlaceholder: boolean };
  /** Pizze : catégories de la carte présentées sur la page dédiée, et suppléments. */
  pizze: { categories: string[]; supplements: Supplement[] };
  /** À emporter : faits du dossier, rien d'autre. */
  emporter: { intro: string; lignes: { libelle: string; valeur: string }[] };
  /** Ardoise : catégorie de la carte qui change au rythme du marché. */
  ardoise: string;
  fournil: string[]; // photos du mur « la maison » (chemins de `photos`)
}

import carteJson from './carte.json';

const photo = (src: string, alt: string, largeur: number, hauteur: number): Photo => ({ src, alt, largeur, hauteur, placeholder: false });


const CARTE: Categorie[] = (carteJson as Categorie[]).map((c) => ({
  ...c,
  plats: c.plats.map((p) => {
    const vignette: Record<string, string> = {
      'Antipasto Dolce Vita': '/photos/planche-antipasti-carre.webp',
      'Margherita': '/photos/pizza-margherita-carre.webp',
      'Moelleux au chocolat': '/photos/moelleux-carre.webp',
    };
    return vignette[p.nom] ? { ...p, photo: vignette[p.nom] } : p;
  }),
}));

export const site: Restaurant = {
  slug: 'dolce-vita-wepion',
  nom: 'La Dolce Vita',
  nomLignes: ['La Dolce', 'Vita'],
  baseline: "À Wépion, l'Italie prend son temps. Se è Dolce, la vita è più bella.",
  description:
    "La Dolce Vita, restaurant italien et pizzeria à Wépion (Namur) : antipasti, pasta, pizze, scaloppine et dolci, sur place et à emporter.",
  url: 'https://dolcevitawepion.be',
  typeCuisine: 'Cuisine italienne, pizzeria',
  adresse: { rue: 'Chaussée de Dinant', numero: '1080', cp: '5100', commune: 'Wépion (Namur)', pays: 'BE' },
  geo: null,
  telephone: '+32 81 85 54 20',
  telephoneMobile: '+32 471 06 00 02',
  email: { valeur: 'dolcevitawepion@gmail.com', placeholder: false },
  reservation: { outil: 'téléphone', url: null },
  horaires: [
    { jour: 'lundi', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '18:00', fermeture: '22:00' }] },
    { jour: 'mardi', creneaux: [], note: 'fermé' },
    { jour: 'mercredi', creneaux: [{ ouverture: '18:00', fermeture: '22:00' }], },
    { jour: 'jeudi', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '18:00', fermeture: '22:00' }] },
    { jour: 'vendredi', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '18:00', fermeture: '22:00' }] },
    { jour: 'samedi', creneaux: [{ ouverture: '18:00', fermeture: '22:00' }] },
    { jour: 'dimanche', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '18:00', fermeture: '22:00' }] },
  ],
  reseaux: [
    { nom: 'Facebook', url: 'https://www.facebook.com/ladolcevitaw/' },
    { nom: 'Instagram', url: 'https://www.instagram.com/dolcevitawepion/' },
  ],
  carte: CARTE,
  menus: [],
  histoire: [
    "La Dolce Vita ouvre ses portes chaussée de Dinant, à Wépion, en 2017. Une maison de cuisine italienne et de pizzas, à table ou à emporter, avec une devise en guise de programme : Se è Dolce, la vita è più bella.",
    "En cuisine, Armando, qui a fait ses armes dans de belles tables italiennes à Bruxelles. Les pâtes sont al dente, les desserts faits maison : tiramisu della casa, crème brûlée, mousse au chocolat, nougat glacé.",
    "Dans la salle, Antigone imagine l'atmosphère et la décoration : bois blond, mur olive, fleurs de cerisier, un néon « la dolce vita » et, au fond, l'ardoise des suggestions du moment.",
    "Le reste tient en peu de mots : une table familiale, des pizzas généreuses et une carte variée, du carpaccio aux scaloppine.",
  ],
  equipe: [
    { nom: 'Armando', role: 'En cuisine', rolePlaceholder: false, placeholder: false },
    { nom: 'Antigone', role: 'Atmosphère et décoration', rolePlaceholder: false, placeholder: false },
  ],
  avis: [
    { texte: 'Les pizzas y sont délicieuses, généreuses en taille et en garnitures, à un prix très raisonnable !', auteur: 'Maurice D.', source: 'avis Google', placeholder: false },
    { texte: 'Un très bel endroit. La carte est variée et l’équipe nous reçoit avec de la gentillesse.', auteur: 'Grégory R.', source: 'avis Google', placeholder: false },
    { texte: 'Le service est impeccable. Le plat de pâtes était excellent, pour des prix tout à fait raisonnables.', auteur: 'Chris', source: 'avis Google', placeholder: false },
  ],
  photos: [
    photo('/photos/facade-soir-960.webp', 'Façade et terrasse du restaurant le soir, enseigne allumée', 960, 540),
    photo('/photos/facade-soir.webp', 'Façade et terrasse du restaurant le soir, enseigne allumée', 1800, 1013),
    photo('/photos/facade-enseigne.webp', 'Façade blanche avec l’enseigne La Dolce Vita et des jardinières', 1800, 1201),
    photo('/photos/neon.webp', 'Néon « la dolce vita » sur un mur végétal', 1800, 1201),
    photo('/photos/salle-mur-olive.webp', 'La salle : tables en bois, banquettes sombres, mur vert olive et fleurs de cerisier roses', 1800, 1201),
    photo('/photos/salle-mur-olive-960.webp', 'La salle : tables en bois, banquettes sombres, mur vert olive et fleurs de cerisier roses', 960, 640),
    photo('/photos/salle-ardoise.webp', 'La salle avec un chariot de bouteilles de vin, une ardoise et des branches fleuries roses', 1800, 1201),
    photo('/photos/chariot-vins.webp', 'Bouteilles de vin rouge sur un chariot devant l’ardoise des suggestions', 1800, 1201),
    photo('/photos/terrasse.webp', 'La terrasse, salon de jardin sur pavés devant la façade, de jour', 1800, 1350),
    photo('/photos/planche-antipasti.webp', 'Planche en bois de charcuteries, fromages et olives', 1800, 1201),
    photo('/photos/planche-antipasti-carre.webp', 'Planche en bois de charcuteries, fromages et olives', 520, 520),
    photo('/photos/burrata.webp', 'Assiette de burrata, jambon cru, figues, fruits jaunes et basilic', 1800, 1201),
    photo('/photos/pates-palourdes.webp', 'Pâtes aux palourdes et tomates sur une assiette bleue décorée', 1800, 1201),
    photo('/photos/escalope.webp', 'Escalope gratinée à la sauce tomate sur une assiette grise', 1800, 1199),
    photo('/photos/pizza-margherita.webp', 'Pizza margherita sur un plateau noir, basilic frais', 1600, 1194),
    photo('/photos/pizza-margherita-960.webp', 'Pizza margherita sur un plateau noir, basilic frais', 960, 716),
    photo('/photos/pizza-margherita-carre.webp', 'Pizza margherita sur un plateau noir, basilic frais', 520, 520),
    photo('/photos/moelleux.webp', 'Moelleux au chocolat, boule de glace, chantilly et fruits rouges', 1800, 1013),
    photo('/photos/moelleux-carre.webp', 'Moelleux au chocolat, boule de glace, chantilly et fruits rouges', 520, 520),
    photo('/photos/geste.webp', 'Des mains étalent une pâte sur un plan de travail sombre', 607, 1080),
  ],
  valeurs: ['Fait maison : mousse au chocolat, crème brûlée, nougat glacé, tiramisu della casa', 'Pâtes al dente', 'Accueil familial'],
  manifeste: {
    avant: 'À Wépion, une cuisine italienne et une ',
    lien1: { mot: 'pizzeria', href: '/pizze/' },
    milieu: ' qui prennent leur temps, sur place comme ',
    lien2: { mot: 'à emporter', href: '/a-emporter/' },
    apres: '.',
    placeholder: false,
  },
  levee: {
    photo: '/photos/pizza-margherita-960.webp',
    marquee: ['Antipasti', 'Pasta', 'Pizze', 'Scaloppine', 'Secondi', 'Dolci'],
    marqueePlaceholder: false,
  },
  pizze: {
    categories: ['Pizze', 'Le preferite'],
    supplements: [
      { libelle: 'Supplément pizza', prix: '1 €' },
      { libelle: 'Supplément spéciaux', prix: '3 €' },
      { libelle: 'Supplément burrata', prix: '4 €' },
    ],
  },
  emporter: {
    intro: 'Les plats de la carte se prennent aussi à emporter.',
    lignes: [
      { libelle: 'Livraison gratuite', valeur: 'dès 2 plats' },
      { libelle: 'Livraison', valeur: '18 h à 22 h' },
    ],
  },
  ardoise: 'L’ardoise du moment',
  fournil: [
    '/photos/facade-enseigne.webp',
    '/photos/neon.webp',
    '/photos/salle-ardoise.webp',
    '/photos/terrasse.webp',
    '/photos/chariot-vins.webp',
  ],
};

/** Photo par chemin (erreur explicite si le chemin n'existe pas : un gabarit ne doit pas pointer dans le vide). */
export function photoDe(src: string): Photo {
  const p = site.photos.find((x) => x.src === src);
  if (!p) throw new Error(`Photo inconnue dans site.ts : ${src}`);
  return p;
}

/** Adresse sur une ligne. */
export const adresseLigne = (r: Restaurant = site) => `${r.adresse.rue} ${r.adresse.numero}, ${r.adresse.cp} ${r.adresse.commune}`;

/** Horaires lisibles : '12:00 à 14:00, 19:00 à 21:00' ou la note. */
export const horaireTexte = (h: Horaire) =>
  h.creneaux.length ? h.creneaux.map((c) => `${c.ouverture} à ${c.fermeture}`).join(', ') : h.note || 'fermé';

/** Téléphone pour href="tel:" (sans espaces). */
export const telHref = (num: string = site.telephone) => `tel:${num.replace(/\s+/g, '')}`;

/** Horaires compacts par service : « lundi au vendredi 19:00 à 21:00 », calculés (pas de texte en dur). */
export function servicesTexte(r: Restaurant = site): { libelle: string; jours: string; heures: string }[] {
  const abr: Record<Jour, string> = { lundi: 'lun.', mardi: 'mar.', mercredi: 'mer.', jeudi: 'jeu.', vendredi: 'ven.', samedi: 'sam.', dimanche: 'dim.' };
  const groupes = new Map<string, Jour[]>();
  for (const h of r.horaires) for (const c of h.creneaux) {
    const k = `${c.ouverture} à ${c.fermeture}`;
    groupes.set(k, [...(groupes.get(k) || []), h.jour]);
  }
  return [...groupes.entries()].map(([heures, jours]) => ({
    libelle: parseInt(heures) < 17 ? 'Midi' : 'Soir',
    jours: jours.map((j) => abr[j]).join(', '),
    heures,
  }));
}

/** Numéros des disques : seuls les services comptent (01 à 04) ; mises en bouche, mignardise et suppléments n'ont pas de numéro. */
export function numerosServices(plats: Plat[]): string[] {
  let n = 0;
  return plats.map((p) => (p.horsService ? '' : String(++n).padStart(2, '0')));
}
/** Compteur d'une catégorie : le nombre de services annoncé, sinon le nombre de lignes. */
export function compteCategorie(c: Categorie): string {
  return String(c.services ?? c.plats.length).padStart(2, '0');
}
