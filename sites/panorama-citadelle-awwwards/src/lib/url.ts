// Tous les liens et assets passent par ici : le site est servi sous `base` (/panorama-citadelle/awwwards/).
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
export const u = (chemin: string) => `${base}/${chemin.replace(/^\/+/, '')}`;
export const asset = u;
