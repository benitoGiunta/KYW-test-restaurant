/** 24 -> « 24 € », 49.9 -> « 49,90 € » (espace insécable). */
export const euro = (n: number) => `${Number.isInteger(n) ? n : n.toFixed(2).replace('.', ',')} €`;
