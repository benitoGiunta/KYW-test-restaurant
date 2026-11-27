/** Chemin interne sous la base du site (KYW_BASE), jamais codé en dur. */
export const u = (p = '') => `${import.meta.env.BASE_URL.replace(/\/?$/, '/')}${p.replace(/^\//, '')}`;
