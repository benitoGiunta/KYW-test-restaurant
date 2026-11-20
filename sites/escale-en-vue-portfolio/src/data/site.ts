// Tout le contenu du site vit ici. Source : data/restaurants/escale-en-vue/ (donnees.json, dossier.md, photos/index.json).
// Les trous des données réelles sont comblés par des données fictives marquées `placeholder: true` :
// le site les affiche avec une marque « exemple », la revue les signale, le client les remplace.

export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';

export interface Creneau { ouverture: string; fermeture: string } // 'HH:MM'
export interface Horaire { jour: Jour; creneaux: Creneau[]; note?: string } // creneaux vide = fermé
export interface Plat { nom: string; description: string; prix: string | null; placeholder: boolean }
export interface Categorie { categorie: string; note?: string; plats: Plat[] }
export interface Photo { src: string; alt: string; largeur: number; hauteur: number; placeholder: boolean }
export interface Reseau { nom: string; url: string }

export interface Restaurant {
  slug: string;
  nom: string;
  baseline: string;
  description: string; // meta description par défaut (50 à 160 caractères)
  url: string; // site actuel du client
  typeCuisine: string; // schema.org servesCuisine
  adresse: { rue: string; numero: string; cp: string; commune: string; pays: string };
  geo: { lat: number; lon: number };
  telephone: string; // format international
  email: string;
  saison: { texte: string; terminee: boolean };
  reservation: { outil: string };
  horaires: Horaire[];
  reseaux: Reseau[];
  carte: Categorie[];
  histoire: string[]; // un paragraphe par entrée
  photos: Photo[];
  valeurs: string[];
}

const photo = (src: string, alt: string, largeur: number, hauteur: number): Photo => ({ src, alt, largeur, hauteur, placeholder: false });

export const site: Restaurant = {
  slug: 'escale-en-vue',
  nom: 'Escale en Vue !',
  baseline: 'Terrasse et restaurant saisonniers à Dave, au-dessus de la vallée.',
  description:
    'Escale en Vue ! : terrasse et restaurant saisonniers à Dave (Namur), petites assiettes fraîcheur, bières régionales et trappistes, et une vue sur la vallée.',
  url: 'https://www.escale-en-vue.be',
  typeCuisine: 'Petites assiettes saisonnières, apéro planchette',
  adresse: { rue: 'Rue de la Rêche-Terre', numero: '21', cp: '5100', commune: 'Dave (Namur)', pays: 'BE' },
  geo: { lat: 50.413908, lon: 4.89467 }, // centre de la carte du site actuel, à confirmer
  telephone: '+32 493 46 79 71',
  email: 'info@escale-en-vue.be',
  // Saison 2026 terminée (billet Facebook relayé sur le site). Dates de la saison suivante : inconnues.
  saison: { texte: 'Saison 2026 du 19 juin au 6 septembre', terminee: true },
  reservation: { outil: 'téléphone' },
  // Affiche d'horaires 2026 du site actuel (site-actuel/horaires-2026.jpg). Samedi : midi puis soir, sans coupure connue.
  horaires: [
    { jour: 'lundi', creneaux: [] },
    { jour: 'mardi', creneaux: [] },
    { jour: 'mercredi', creneaux: [] },
    { jour: 'jeudi', creneaux: [{ ouverture: '17:30', fermeture: '20:30' }] },
    { jour: 'vendredi', creneaux: [{ ouverture: '17:30', fermeture: '21:30' }] },
    { jour: 'samedi', creneaux: [{ ouverture: '11:30', fermeture: '21:30' }] },
    { jour: 'dimanche', creneaux: [{ ouverture: '11:30', fermeture: '17:00' }] },
  ],
  reseaux: [
    { nom: 'Facebook', url: 'https://facebook.com/escale.en.vue/' },
    { nom: 'Instagram', url: 'https://www.instagram.com/escale_en_vue/' },
  ],
  // Aucune carte publiée : seule l'offre mentionnée par le site et les posts Facebook 2026, sans prix.
  carte: [
    {
      categorie: 'Apéro',
      plats: [{ nom: 'Apéro planchette', description: 'du jeudi soir au dimanche midi', prix: null, placeholder: false }],
    },
    {
      categorie: 'Plat du jour maison',
      note: 'Sur réservation, à partir du vendredi soir, avec une variante végé.',
      plats: [
        { nom: 'Parmigiana', description: 'au menu en 2026', prix: null, placeholder: false },
        { nom: 'Tagliatelles fraîches', description: 'au menu en 2026', prix: null, placeholder: false },
        { nom: 'Filet de poulet mariné', description: 'au menu en 2026', prix: null, placeholder: false },
      ],
    },
    {
      categorie: 'À boire',
      plats: [
        { nom: 'Bières régionales et trappistes', description: '', prix: null, placeholder: false },
        { nom: 'Softs de qualité', description: '', prix: null, placeholder: false },
      ],
    },
  ],
  histoire: [
    'Escale en Vue ! est une terrasse et un restaurant saisonniers à Dave, section de Namur, au-dessus de la vallée.',
    'Toutes les tables sont dehors. On y vient du jeudi soir au dimanche après-midi, le temps d’une saison : en 2026, du 19 juin au 6 septembre.',
    'La cuisine se veut fraîcheur, créative, familiale et locale, avec toujours une alternative végé. Les produits viennent d’artisans locaux et d’une coopérative de paysans-artisans.',
    'Le jardin donne les tomates et les aubergines de la parmigiana de fin d’été. La carte des bières fait une place aux trappistes et aux bières régionales.',
  ],
  photos: [
    photo('/photos/terrasse-parasol.webp', 'Terrasse en gravier avec un parasol rouge et la vue sur la vallée', 1024, 768),
    photo('/photos/planchette-vue.webp', 'Planchette d’apéro et verre de jus sur une table de terrasse, la vallée en fond', 1152, 1536),
    photo('/photos/bol-coucher-soleil.webp', 'Bol-salade et verre sur une table en bois au coucher du soleil, la vallée en fond', 382, 510),
    photo('/photos/table-panorama.webp', 'Table avec une plante, une bière et un verre devant le panorama de la vallée', 1080, 608),
    photo('/photos/mur-pierre.webp', 'Chaises de terrasse devant un mur de pierre, l’affiche du restaurant au mur', 1080, 1620),
    photo('/photos/bieres-trappistes.webp', 'Huit bouteilles de bières trappistes alignées', 1024, 575),
    photo('/photos/pres-transats.webp', 'Prairie clôturée avec des transats jaunes, une colline au fond', 1279, 720),
    photo('/photos/boule-osier.webp', 'Boule d’osier suspendue à une branche', 720, 900),
  ],
  valeurs: [
    'Produits d’artisans locaux',
    'Cuisine fraîcheur, familiale, imparfaite',
    'Un jardin potager',
    'Coopérative de paysans-artisans',
    'Une alternative végé à chaque plat',
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
export const telHref = (r: Restaurant = site) => `tel:${r.telephone.replace(/\s+/g, '')}`;

/** Téléphone tel que le restaurant l'écrit. */
export const telAffiche = '0493 46 79 71';

// ---------------------------------------------------------------------------------------------
// Contenu propre au gabarit « Guinguette ». Tout ce qui n'est pas prouvé par dossier.md porte un
// drapeau `placeholder: true` et une marque visible là où il s'affiche.
// ---------------------------------------------------------------------------------------------

export type ObjetId = 'transat' | 'fourchette' | 'verre' | 'parasol' | 'bouteille' | 'citron';
export interface Objet { id: ObjetId; label: string; x: number; y: number; r: number; taille: number; mobile: boolean; mx?: number }
export interface Tirage { src: string; cote: number; alt: string; x: number; y: number; r: number; legende: string; placeholder: boolean }
export interface Picto { categorie: string; picto: ObjetId }
export interface NoteTierce { source: string; note: string; nombre: string; date?: string }

export const guinguette = {
  /** Titre et slogan du hero. Le slogan reprend la baseline du site actuel. */
  heroTitre: ['Faites escale,', 'et une vue !'],
  slogan: { texte: 'une cuisine fraîcheur, respectable, variée et imparfaite', placeholder: false },
  ouverture: 'Habituellement ouvert du jeudi soir au dimanche après-midi',
  /** Objets au trait du hero : position en % de la section, rotation en degrés. `mobile` = reste visible en 390 px. */
  objets: [
    { id: 'parasol', label: 'Parasol dessiné au trait', x: 6, y: 10, r: -12, taille: 150, mobile: true, mx: 4 },
    { id: 'verre', label: 'Verre à pied dessiné au trait', x: 84, y: 8, r: 10, taille: 110, mobile: false },
    { id: 'transat', label: 'Transat dessiné au trait', x: 10, y: 66, r: 8, taille: 130, mobile: true, mx: 40 },
    { id: 'fourchette', label: 'Fourchette dessinée au trait', x: 30, y: 78, r: -40, taille: 120, mobile: false },
    { id: 'bouteille', label: 'Bouteille dessinée au trait', x: 80, y: 60, r: 14, taille: 140, mobile: true, mx: 74 },
    { id: 'citron', label: 'Citron coupé dessiné au trait', x: 62, y: 82, r: -6, taille: 90, mobile: false },
  ] as Objet[],
  /** La table : 8 tirages à cadre blanc (photos réelles du restaurant), positions en % et rotation. */
  tirages: [
    { src: '/photos/terrasse-parasol.webp', cote: 640, alt: 'Terrasse en gravier avec un parasol rouge et la vue sur la vallée', x: 4, y: 4, r: -6, legende: 'Terrasse et parasol', placeholder: false },
    { src: '/photos/planchette-vue.webp', cote: 640, alt: 'Planchette d’apéro et verre de jus sur une table de terrasse, la vallée en fond', x: 27, y: 2, r: 5, legende: 'Planchette, vallée en fond', placeholder: false },
    { src: '/photos/table-panorama.webp', cote: 608, alt: 'Table avec une plante, une bière et un verre devant le panorama de la vallée', x: 50, y: 5, r: -3, legende: 'Devant le panorama', placeholder: false },
    { src: '/photos/bieres-trappistes.webp', cote: 575, alt: 'Huit bouteilles de bières trappistes alignées', x: 73, y: 3, r: 7, legende: 'Les trappistes', placeholder: false },
    { src: '/photos/bol-coucher-soleil.webp', cote: 382, alt: 'Bol-salade et verre sur une table en bois au coucher du soleil, la vallée en fond', x: 10, y: 64, r: 6, legende: 'Au coucher du soleil', placeholder: false },
    { src: '/photos/mur-pierre.webp', cote: 640, alt: 'Chaises de terrasse devant un mur de pierre, l’affiche du restaurant au mur', x: 32, y: 66, r: -5, legende: 'Le mur de pierre', placeholder: false },
    { src: '/photos/pres-transats.webp', cote: 640, alt: 'Prairie clôturée avec des transats jaunes, une colline au fond', x: 55, y: 62, r: 4, legende: 'Le pré aux transats', placeholder: false },
    { src: '/photos/boule-osier.webp', cote: 640, alt: 'Boule d’osier suspendue à une branche', x: 77, y: 67, r: -7, legende: 'Boule d’osier', placeholder: false },
  ] as Tirage[],
  /** Pictogramme au trait par catégorie de carte (celles de la carte réelle puis les exemples). */
  pictos: [
    { categorie: 'Apéro', picto: 'citron' },
    { categorie: 'Plat du jour', picto: 'fourchette' },
    { categorie: 'À boire', picto: 'bouteille' },
    { categorie: 'Petites assiettes', picto: 'fourchette' },
    { categorie: 'Du jardin', picto: 'citron' },
    { categorie: 'Pour finir', picto: 'parasol' },
    { categorie: 'Dehors', picto: 'verre' },
  ] as Picto[],
  /** Carte d'exemple : petites assiettes de saison, entièrement fictives (aucune carte publiée par le restaurant). */
  carteExemple: [
    {
      categorie: 'Petites assiettes',
      plats: [
        { nom: 'Planchette du coin', description: 'fromages et charcuteries locaux, pain', prix: '14 €', placeholder: true, vege: false },
        { nom: 'Tomates du jardin', description: 'huile d’olive, basilic', prix: '9 €', placeholder: true, vege: true },
        { nom: 'Aubergines rôties', description: 'yaourt, menthe, graines', prix: '10 €', placeholder: true, vege: true },
        { nom: 'Salade fraîcheur', description: 'légumes crus, herbes, vinaigrette', prix: '11 €', placeholder: true, vege: true },
      ],
    },
    {
      categorie: 'Pour finir',
      plats: [
        { nom: 'Tarte du jour', description: 'selon la saison', prix: '6 €', placeholder: true, vege: true },
        { nom: 'Fromage du coin', description: 'pain aux noix', prix: '8 €', placeholder: true, vege: true },
      ],
    },
    {
      categorie: 'Dehors',
      plats: [
        { nom: 'Limonade maison', description: 'citron, menthe', prix: '4 €', placeholder: true, vege: true },
        { nom: 'Bière régionale', description: '33 cl', prix: '4,5 €', placeholder: true, vege: true },
        { nom: 'Jus de pomme local', description: '25 cl', prix: '3,5 €', placeholder: true, vege: true },
      ],
    },
  ] as (Categorie & { plats: (Plat & { vege: boolean })[] })[],
  /** Notes tierces relevées le 20/11/2026 (dossier.md, « Réputation »), non vérifiées directement : affichées avec leur source. */
  /** Notes tierces retirées (revue F1-1) : aucune note chiffrée tant que le restaurant ne les a pas confirmées. */
  notes: [] as NoteTierce[],
  /** Thèmes récurrents des avis tiers (paraphrase du dossier, aucun extrait cité). */
  themesAvis: ['la vue sur la vallée', 'l’accueil aimable', 'la bonne bière', 'les produits frais et locaux'],
  /** Terrasse : toutes les tables sont dehors (dossier.md). Le nombre de places est inconnu. */
  terrasse: {
    connue: true,
    points: ['Toutes les tables dehors', 'Vue sur la vallée', 'Une alternative végé à chaque plat', 'Bières régionales et trappistes'],
    pratique: [
      { texte: 'Carte bancaire acceptée', source: 'Petit Futé' },
    ],
  },
  /** Manifeste : phrases tirées des valeurs réelles du dossier. */
  manifeste: {
    titre: ['Fraîche, familiale', 'et locale'],
    motItalique: 'locale',
    texte: 'Et au jardin, les tomates et les aubergines de la parmigiana de fin d’été.',
  },
  finale: 'À bientôt !',
};

/** Vrai si l'heure donnée (HH:MM) est dans un créneau. */
export const estOuvert = (h: Horaire, hhmm: string) => h.creneaux.some((c) => c.ouverture <= hhmm && hhmm < c.fermeture);
