import donnees from './donnees.json';

export const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
const NB = ' ';

export const resto = {
  nom: 'INCORЯECT',
  baseline: donnees.baseline,
  adresse: { rue: 'Rue Haute Marcelle 35', cp: '5000', ville: 'Namur' },
  tel: '081 13 85 61',
  telHref: 'tel:+3281138561',
  reservation: donnees.reservation.url,
  carte: 'https://cdn.prod.website-files.com/6679384155bf657a6d64ca93/6ae0872cb42e4b157b62d886_menu%20fran%C3%A7ais%20(1).pdf',
  instagram: donnees.reseaux.instagram as string,
  facebook: donnees.reseaux.facebook as string,
  geo: donnees.geo,
};

/** Horaires issus du dossier : sources contradictoires, donc « à confirmer » (data-placeholder). */
export const horaires = [
  { jours: 'Mardi à vendredi', creneaux: ['18 h 30 à 21 h 30'] },
  { jours: 'Samedi', creneaux: ['12 h 00 à 14 h 00', '18 h 30 à 21 h 30'] },
  { jours: 'Dimanche et lundi', creneaux: [], ferme: true },
];

export const fournisseurs = [
  { quoi: 'Farine', qui: 'Moulin Bodson, à Awans' },
  { quoi: 'Légumes', qui: 'Jardins de la Vequée' },
  { quoi: 'Boissons sans alcool', qui: 'Brasserie {C}' },
  { quoi: 'Café', qui: 'Wild Speciality Coffee Roaster' },
];

export function prix(p: string, decimales = false): string {
  const s = decimales ? p : p.replace(/,00/g, '');
  return s + NB + '€';
}
const brut = (p: string) => p.replace(/,00/g, '');
const apos = (t: string | null) => (t ? t.replace(/'/g, '\u2019') : t);

type Plat = { nom: string; description: string | null; prix: string };
export type Ligne = { nom: string; note: string | null; desc: string | null; prix: string };

function ligne(p: Plat): Ligne {
  let nom = p.nom, note: string | null = null, desc = p.description, pr = p.prix;
  const m = nom.match(/^(.*?)\s*\((.*)\)$/);
  if (m) { nom = m[1]; note = m[2]; }
  if (desc && /^\d[\d,\s/]*$/.test(desc)) { pr = desc; desc = null; }
  return { nom: apos(nom) as string, note: apos(note), desc: apos(desc), prix: pr };
}

// Une liste de prix garde la même règle partout : deux décimales dès qu'une valeur en a (F2-2).
function groupe(ls: Ligne[]): Ligne[] {
  const dec = ls.some((l) => /,\d*[1-9]/.test(l.prix));
  return ls.map((l) => ({ ...l, prix: prix(l.prix, dec) }));
}

const cat = (n: string) => {
  const c = (donnees.carte as any[]).find((x) => x.categorie.startsWith(n));
  return { titre: c.categorie as string, lignes: groupe((c.plats as Plat[]).map(ligne)) };
};

export const onglets = [
  { id: 'pizzas', label: 'Pizzas', groupes: [cat('Les pizzas classiques'), cat('Les pizzas de nous'), cat('Suppléments')] },
  { id: 'grignoter', label: 'À grignoter', groupes: [cat('En attendant'), cat('Mange tes croûtes')] },
  { id: 'desserts', label: 'Desserts', groupes: [cat('Desserts')] },
  { id: 'boire', label: 'À boire', groupes: [cat('Boissons sans alcool'), cat('Cocktails'), cat('Bières craft'), cat('Vins'), cat('Boissons chaudes')] },
];
