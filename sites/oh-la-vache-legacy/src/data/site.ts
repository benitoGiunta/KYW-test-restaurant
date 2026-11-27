import carte from './carte.json';

const nb = ' ';
export const site = {
  nom: 'Oh la Vache !',
  titre: `Oh la Vache${nb}!, grill à Erpent (Namur)`,
  description: `Restaurant grill à Erpent, cuisine française et italienne : fondues, pierrades, raclettes et viandes grillées. Ouvert 7 jours sur 7, réservation par téléphone.`,
  adresse: { rue: 'Chaussée de Marche 581', ville: '5101 Erpent (Namur)' },
  tel: { affiche: `0494${nb}29${nb}44${nb}72`, href: 'tel:+32494294472' },
  mailto: 'mailto:sprl-lacroix@hotmail.com', // adresse de la société affichée sur le site d'origine, à confirmer
  facebook: 'https://www.facebook.com/restoohlavache/', // le pied d'origine pointait vers « lepontdesanges » (autre page)
  instagram: 'https://www.instagram.com/resto_oh_la_vache/',
  horaires: [
    ['Lundi', '11:00', '22:30'], ['Mardi', '11:00', '22:30'], ['Mercredi', '11:00', '22:30'], ['Jeudi', '11:00', '22:30'],
    ['Vendredi', '11:00', '23:45'], ['Samedi', '11:00', '23:45'], ['Dimanche', '11:00', '23:45'],
  ] as [string, string, string][],
  carte,
};

/** « 17.90 » -> « 17,90 € » ; « 25.00/pers. » -> « 25,00 € par personne » ; « 3.70 / 4.70 » -> « 3,70 € / 4,70 € ». */
export function prix(p: string): string {
  if (!/\d/.test(p)) return p;
  const par = /\/pers\.?$/.test(p);
  const base = p.replace(/\/pers\.?$/, '').trim();
  const f = base.split(/\s*\/\s*/).map((x) => `${x.replace('.', ',')}${nb}€`).join(' / ');
  return par ? `${f} par${nb}personne` : f;
}
export const typo = (s: string) => s.replace(/ ([:;!?»€])/g, `${nb}$1`).replace(/« /g, `«${nb}`).replace(/'/g, '’');
