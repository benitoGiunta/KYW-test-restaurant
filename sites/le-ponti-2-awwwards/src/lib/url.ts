// Tous les liens et assets passent par ici : le site est servi sous `base` (/le-ponti-2/awwwards/).
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
/** Lien interne : u('/carte/') */
export const u = (chemin: string) => `${base}/${chemin.replace(/^\/+/, '')}`;
/** Fichier de public/ */
export const asset = u;
/** Prix : 21 → « 21 € », 21.5 → « 21,50 € » (espace insécable). */
export const prix = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2).replace('.', ',')) + ' €';
