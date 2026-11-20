// Tous les liens et assets passent par ici : le site est servi sous `base` (/gabarits/<nom>/ ou
// /<slug>/<variante>/) et import.meta.env.BASE_URL vaut cette base, avec ou sans barre finale selon la version d'Astro.
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Lien interne : u('/carte/') → '/gabarits/_socle/carte/'. */
export const u = (chemin: string) => `${base}/${chemin.replace(/^\/+/, '')}`;
/** Fichier de public/ : asset('/photos/x.webp') → '/gabarits/_socle/photos/x.webp'. */
export const asset = u;
