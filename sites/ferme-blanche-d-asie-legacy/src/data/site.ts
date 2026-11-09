// Données de La Ferme Blanche d’Asie, variante legacy. Source : data/restaurants/ferme-blanche-d-asie/donnees.json
// (copié dans ./donnees.json), dossier.md, HTML sauvegardé de lafermeblanchedasie.be. Ce qui n’est pas prouvé est absent (null).
import donnees from './donnees.json';

export const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
export const u = (p = '') => base + p.replace(/^\//, '');

const nb = ' ';
export const euro = (n: number) => `${n.toFixed(2).replace('.', ',').replace(',00', '')}${nb}€`;

export const resto = {
  nom: 'La Ferme Blanche d’Asie',
  court: 'Ferme Blanche d’Asie',
  adresse: { rue: 'Allée de la Maison Blanche 20', cp: '5020', ville: 'Malonne (Namur)' },
  telAffiche: '081 44 64 89',
  tel: 'tel:+3281446489',
  mail: 'lafermeblanchedasie@gmail.com',
  facebook: 'https://fr-fr.facebook.com/lafermeblanchedasie/',
  siteActuel: donnees.site_actuel,
  geo: donnees.geo,
  maps: 'https://www.google.com/maps/search/?api=1&query=50.4510732%2C4.817696',
  // Affiches des menus de fêtes : fichiers du site d’origine (liens conservés)
  afficheNoel: 'https://www.lafermeblanchedasie.be/f1/Menu%20noel%202026.png',
  afficheAn: 'https://www.lafermeblanchedasie.be/f1/Menu%20Nouvel%20an%20.png',
  paiements: 'Espèces, Visa, Mastercard, Maestro, Bancontact',
};

// Horaires du site : lundi à vendredi et samedi 12:00 à 14:30 et 18:00 à 23:00 (minuit le samedi) ; dimanche 12:00 à 15:30.
const h = (s: string) => s.replace(':', ' h ');
export const semaine = [
  { jour: 'Lundi', i: 1, midi: ['12:00', '14:30'], soir: ['18:00', '23:00'] },
  { jour: 'Mardi', i: 2, midi: ['12:00', '14:30'], soir: ['18:00', '23:00'] },
  { jour: 'Mercredi', i: 3, midi: ['12:00', '14:30'], soir: ['18:00', '23:00'] },
  { jour: 'Jeudi', i: 4, midi: ['12:00', '14:30'], soir: ['18:00', '23:00'] },
  { jour: 'Vendredi', i: 5, midi: ['12:00', '14:30'], soir: ['18:00', '23:00'] },
  { jour: 'Samedi', i: 6, midi: ['12:00', '14:30'], soir: ['18:00', '00:00'] },
  { jour: 'Dimanche', i: 0, midi: ['12:00', '15:30'], soir: ['18:00', '23:00'] },
].map((j) => ({ ...j, midiAff: `${h(j.midi[0])} à ${h(j.midi[1])}`, soirAff: `${h(j.soir[0])} à ${h(j.soir[1])}` }));

// Typographie : apostrophes et espaces de la carte, sans changer un mot (sauf coquille évidente, signalée).
const fix = (s: string) =>
  s
    .replace(/\b([dl]) (?=[aeiouyhéèêàâ])/gi, '$1’')
    .replace(/\( /g, '(').replace(/ \)/g, ')').replace(/ ,/g, ',')
    .replace(/\bBoeuf\b/g, 'Bœuf').replace(/\bboeuf\b/g, 'bœuf').replace(/\boeuf\b/g, 'œuf').replace(/\bOeuf\b/g, 'Œuf')
    .replace(/(\d),(\d\d)€/g, '$1,$2 €')
    // Hallmark · reworded "Potage crème nid d" to "Potage crème nid d’hirondelle" · coquille du site (nom tronqué), le menu de Noël écrit « nid d’hirondelle »
    .replace(/nid d$/, 'nid d’hirondelle');

type Plat = { nom: string; description: string | null; prix: number };
type Cat = { categorie: string; plats: Plat[] };
export type Ligne = { num: string; nom: string; desc: string | null; prix: string };
const split = (p: Plat): Ligne => {
  const m = p.nom.match(/^(\d+)\.\s*(.*)$/);
  let nom = fix(m ? m[2] : p.nom);
  // « Assortiment de plateaux à partir 2 personnes (18,50€ par personne) » : le prix par personne est déjà dans la colonne prix
  nom = nom.replace(/\s*\([\d,]+ ?€ par personne\)/, '');
  return { num: m ? m[1] : '', nom, desc: p.description ? fix(p.description) : null, prix: euro(p.prix) };
};
const cat = (n: string) => (donnees.carte as Cat[]).find((c) => c.categorie === n)!.plats.map(split);
export const carte = {
  potages: cat('Les potages'),
  entrees: cat('Les entrées'),
  plats: cat('Les plats'),
  decouverte: cat('Menu découverte 5 services'),
};
export const nbPlats = carte.potages.length + carte.entrees.length + carte.plats.length + carte.decouverte.length; // 56, vérifié au build

export const decouverte = {
  prix: euro(29),
  plats: ['Bœuf aux oignons', 'Canard aux fruits frais', 'Poulet sauce coriandre', 'Filet de perche sauce coriandre', 'Scampis à l’ail'],
};

// Menus de fêtes : transcription des affiches (donnees.json). Desserts de Noël illisibles : absents.
export const fetes = [
  {
    nom: 'Menu de Noël', prix: euro(45), lien: resto.afficheNoel, lienTxt: 'Voir l’affiche',
    lignes: [
      ['Mise en bouche', 'Salade de bœuf et avocat'],
      ['Potage au choix', 'Piquant, nid d’hirondelle, tomate ou raviolis chinois'],
      ['Entrée', 'Scampis sautés aux tomates'],
      ['Assortiment de plateaux', 'Calamars au curry jaune, dorade royale au beurre à l’ail, bœuf aux oignons, canard sirop d’érable, poulet basilic'],
    ],
    note: 'Par personne. Dessert au choix, à retrouver sur l’affiche.',
  },
  {
    nom: 'Réveillon du nouvel an', prix: euro(65), lien: resto.afficheAn, lienTxt: 'Voir l’affiche',
    lignes: [
      ['Mise en bouche', 'Salade de bœuf et avocat'],
      ['Potage', 'Légumes et scampis de rizière'],
      ['Entrée', 'Tomate farcie au poulet thaï'],
      ['Plat au choix', 'Ribs de porc à l’ail, canard laqué aux cèpes umami, scampis façon du chef, fondue de dorade au curry et lait de coco (à réserver à l’avance) ou nouilles royales (bœuf, poulet, calamars, scampis)'],
      ['Dessert', 'Flan au matcha'],
    ],
    note: 'Par personne. Acompte de 20 € par personne à la réservation.',
  },
];

// Légendes : le champ « sujet » de photos/index.json fait foi. Filigrane du photographe recadré (bas de l’image).
export const photos = {
  ronde: { f: 'salle-ronde', alt: 'Salle à table ronde avec plateau tournant, lustre et rideaux bruns', w: 1400, h: 850 },
  principale: { f: 'salle-principale', alt: 'Salle principale, tables dressées sous les lustres', w: 1400, h: 850 },
  longue: { f: 'salle-longue', alt: 'Salle en longueur le long des baies vitrées, longue tablée', w: 1400, h: 850 },
  poutres: { f: 'salle-poutres', alt: 'Salle à poutres, tables dressées', w: 1400, h: 850 },
  salon: { f: 'coin-salon', alt: 'Coin salon avec canapés en cuir et fresque florale', w: 1400, h: 850 },
  terrasse: { f: 'terrasse', alt: 'Terrasse avec parasols et bambous devant le bâtiment', w: 1400, h: 850 },
  jardin: { f: 'jardin', alt: 'Bâtiment vu du jardin, kiosque en bois et pelouse', w: 1400, h: 850 },
  kiosque: { f: 'kiosque', alt: 'Bâtiment vu du jardin avec kiosque chinois', w: 1400, h: 850 },
  table: { f: 'table-ronde', alt: 'Table ronde à plateau tournant dans une salle à poutres', w: 1400, h: 850 },
} as const;
export type PhotoKey = keyof typeof photos;
export const credits = 'Photographies des salles et du jardin : Find Your Place (filigrane recadré). Logo : La Ferme Blanche d’Asie.';

// Extraits d’avis repris mot pour mot, avec leur source (à vérifier avec le client).
export const avis = (donnees.extraits_avis as { texte: string; source: string }[]).filter((a) =>
  ['Service rapide, gentillesse du personnel, beau cadre, très bonne nourriture. Prix abordable.', 'Accueil chaleureux aussi bien du patron que du personnel, cuisine raffinée.'].includes(a.texte));
