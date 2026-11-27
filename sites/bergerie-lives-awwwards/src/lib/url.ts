// Tous les liens et assets passent par ici : le site est servi sous `base` (/bergerie-lives/awwwards/).
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
/** Lien interne : u('/le-domaine/'). */
export const u = (chemin: string) => `${base}/${chemin.replace(/^\/+/, '')}`;
/** Fichier de public/ : asset('/favicon.svg'). */
export const asset = u;
