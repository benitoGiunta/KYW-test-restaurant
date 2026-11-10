const N = ' ';
/** 27 → « 27 € », 3.5 → « 3,50 € » (espace insécable). */
export const euro = (n: number) => `${Number.isInteger(n) ? n : n.toFixed(2).replace('.', ',')}${N}€`;
