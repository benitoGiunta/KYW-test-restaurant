// Tous les liens et assets passent par ici : le site est servi sous `base` (/gabarits/<nom>/ ou
// /<slug>/<variante>/) et import.meta.env.BASE_URL vaut cette base, avec ou sans barre finale selon la version d'Astro.
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Lien interne : u('/carte/') → '/gabarits/_socle/carte/'. */
export const u = (chemin: string) => `${base}/${chemin.replace(/^\/+/, '')}`;
/** Fichier de public/ : asset('/photos/x.webp') → '/gabarits/_socle/photos/x.webp'. */
export const asset = u;

/**
 * REVISION-2 F2-02 : srcset d'un portrait de hero servi en variantes réduites (`<nom>-640.webp`, `<nom>-960.webp` dans
 * public/photos, tirées de l'original du client), l'original en dernier recours.
 */
export const srcsetPortrait = (src: string, largeurOriginale: number) =>
  [640, 960].map((w) => `${asset(src.replace(/\.webp$/, `-${w}.webp`))} ${w}w`).concat(`${asset(src)} ${largeurOriginale}w`).join(', ');
/** Largeur affichée du portrait du hero (`.hero__portrait` : 18rem en mobile, 24rem au plus en bureau). */
export const sizesPortrait = '(max-width: 767px) 18rem, 24rem';
