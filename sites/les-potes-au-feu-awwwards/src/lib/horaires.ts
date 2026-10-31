// Horaires dérivés de site.horaires (une seule source pour le pied de page, la réservation et le JSON-LD).
// Espaces insécables autour de « h » et de « à » : « 19 h à 21 h » ne se coupe jamais.
import type { Horaire } from '../data/site';

const NB = ' ';
/** '19:00' → '19 h' ; '12:30' → '12 h 30'. */
export const heure = (h: string) => {
  const [hh, mm] = h.split(':');
  return `${Number(hh)}${NB}h${mm && mm !== '00' ? `${NB}${mm}` : ''}`;
};
/** Une journée en clair : '12 h à 14 h, 19 h à 21 h' ou la note (« fermé »). */
export const journee = (h: Horaire) =>
  h.creneaux.length ? h.creneaux.map((c) => `${heure(c.ouverture)}${NB}à${NB}${heure(c.fermeture)}`).join(', ') : (h.note ?? 'fermé');
