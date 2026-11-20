// Tous les liens et assets passent par ici : le site est servi sous `base` (/le-d-arville/awwwards/).
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
/** Lien interne : u('/carte/') → '/le-d-arville/awwwards/carte/'. */
export const u = (chemin: string) => `${base}/${chemin.replace(/^\/+/, '')}`;
export const asset = u;
