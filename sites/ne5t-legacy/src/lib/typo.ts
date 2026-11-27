/** Chemin interne sous la base du site (KYW_BASE), jamais codé en dur. */
export const u = (p = '') => `${import.meta.env.BASE_URL.replace(/\/?$/, '/')}${p.replace(/^\//, '')}`;

/** Insécable avant « : ; ! ? € » et à l'intérieur des guillemets français, sur les seuls nœuds texte (balises et scripts intacts). */
export const nbsp = (html: string) =>
  html
    .split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>)/)
    .map((seg) => (seg.startsWith('<') ? seg : seg.replace(/ ([:;!?€»])/g, ' $1').replace(/« /g, '« ')))
    .join('');
