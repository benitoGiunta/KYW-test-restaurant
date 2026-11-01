// Données réelles : data/restaurants/dolce-vita-wepion/donnees.json, dossier.md, site-actuel/.
// Rien d'inventé : un champ absent du dossier vaut null et le composant ne rend rien.
import photos from './photos.json';
import carteBrute from './carte.json';

const NB = ' ';
export const u = (p = '') => import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + p;

/** Typographie française : apostrophe courbe, insécable avant : ; ! ? et €. */
export const typo = (s: string) =>
  s
    .replace(/'/g, '’')
    .replace(/\s+([:;!?€])/g, NB + '$1')
    .replace(/(\d) €/g, '$1' + NB + '€');

export const SITE = {
  nom: 'La Dolce Vita',
  lieu: 'Wépion, Namur',
  genre: 'Ristorante, pizzeria',
  devise: 'Se è dolce, la vita è più bella.',
  depuis: '2017',
  adresse: { rue: 'Chaussée de Dinant 1080', ville: '5100 Wépion (Namur)' },
  tel: { aff: `081${NB}85${NB}54${NB}20`, href: 'tel:+3281855420' },
  mobile: { aff: `0471${NB}06${NB}00${NB}02`, href: 'tel:+32471060002' },
  email: 'dolcevitawepion@gmail.com',
  facebook: 'https://www.facebook.com/ladolcevitaw/',
  instagram: 'https://www.instagram.com/dolcevitawepion/',
  instagramNom: '@dolcevitawepion',
  itineraire:
    'https://www.google.com/maps/search/?api=1&query=La+Dolce+Vita+Chauss%C3%A9e+de+Dinant+1080+5100+W%C3%A9pion',
  allergenes:
    'Nous ne pouvons garantir l’absence de tout allergène dans nos préparations. Merci de vous informer lors de votre commande.',
  emporter: `Plats et pizzas à emporter, livraison gratuite à partir de 2 plats, entre 18${NB}h et 22${NB}h.`,
  fidelite: 'Carte de fidélité disponible sur demande.',
  supplements: `Suppléments : pizza 1${NB}€, spéciaux 3${NB}€, burrata 4${NB}€. Accompagnement au choix : 3${NB}€. Sauces : 3,50${NB}€.`,
  // Fermeture exceptionnelle du 26 au 29 octobre : passée au 01/11/2026, non reprise (voir ETAT.md).
  fermetureExceptionnelle: null as string | null,
};

export const NAV = [
  { href: 'carte/', label: 'La carte' },
  { href: 'la-dolce-vita/', label: 'Le restaurant' },
  { href: 'infos/', label: 'Infos' },
];

const h = (t: string) => t.replace(':', `${NB}h${NB}`);
const cr = (a: string, b: string) => `${h(a)} à ${h(b)}`;
const SOIR: [string, string] = ['18:00', '22:00'];
const MIDI: [string, string] = ['12:00', '14:00'];
/** midi / soir par jour ; null = fermé (donnees.json : mardi, mercredi midi, samedi midi). */
export const HORAIRES = [
  { jour: 'Lundi', midi: MIDI, soir: SOIR },
  { jour: 'Mardi', midi: null, soir: null },
  { jour: 'Mercredi', midi: null, soir: SOIR },
  { jour: 'Jeudi', midi: MIDI, soir: SOIR },
  { jour: 'Vendredi', midi: MIDI, soir: SOIR },
  { jour: 'Samedi', midi: null, soir: SOIR },
  { jour: 'Dimanche', midi: MIDI, soir: SOIR },
].map((j) => ({
  jour: j.jour,
  midi: j.midi ? cr(...j.midi) : null,
  soir: j.soir ? cr(...j.soir) : null,
  /** créneaux bruts « HH:MM-HH:MM » lus par le script d'état (nav, hero, tableau) */
  rmidi: j.midi ? j.midi.join('-') : '',
  rsoir: j.soir ? j.soir.join('-') : '',
  ferme: !j.midi && !j.soir,
}));

type P = { file: string; w: number; h: number; w2: number; h2: number; alt: string };
export const ph = (id: string): P => (photos as Record<string, P>)[id];

const TAGLINES: Record<string, string | null> = {
  Antipasti: 'Pour commencer à plusieurs.',
  Pasta: 'Cuites al dente, comme il se doit.',
  Pizze: 'Une pâte travaillée avec soin, des ingrédients choisis pour leur qualité.',
  'Le preferite': 'Les pizzas qui ont leurs habitués.',
  Scaloppine: 'L’escalope à l’italienne, généreuse et gratinée.',
};
const PHOTO_CAT: Record<string, string> = { Antipasti: '08', Pizze: '12', Scaloppine: '11', Dolci: '13' };

export const CARTE = (carteBrute as any[]).map((c) => {
  const titre = c.categorie.startsWith('Suggestions') ? 'Suggestions' : c.categorie;
  const id = titre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-');
  return {
    id,
    titre,
    ardoise: titre === 'Suggestions',
    tagline: titre === 'Suggestions' ? 'Écrites à la craie, changées au rythme du marché.' : TAGLINES[titre] ?? null,
    photo: PHOTO_CAT[titre] ?? null,
    plats: c.plats.map((p: any) => ({
      nom: typo(p.nom.trim()),
      description: p.description ? typo(p.description.trim()) : null,
      prix: p.prix ? typo(p.prix) : null,
      tags: p.tags as string[],
      placeholder: !!p.placeholder,
    })),
  };
});

/** Avis repris mot pour mot du site d'origine (donnees.json extraits_avis), à faire vérifier. */
export const AVIS = [
  { texte: 'Les pizzas y sont délicieuses, généreuses en taille et en garnitures, à un prix très raisonnable !', qui: 'Maurice D.' },
  { texte: 'Un très bel endroit. La carte est variée et l’équipe nous reçoit avec de la gentillesse.', qui: 'Grégory R.' },
  { texte: 'Sympa, propre, service correct, une bonne pizzeria. L’antipasti était super !', qui: 'Emile P.' },
];
