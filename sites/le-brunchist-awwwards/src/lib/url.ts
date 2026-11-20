// Tous les liens et assets passent par ici : le site est servi sous `base` (/le-brunchist/awwwards/).
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
/** Lien interne : u('/carte/') → '/le-brunchist/awwwards/carte/'. */
export const u = (chemin: string) => `${base}/${chemin.replace(/^\/+/, '')}`;
/** Fichier de public/. */
export const asset = u;
