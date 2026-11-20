/** 24 -> « 24,00 € », 12.9 -> « 12,90 € » (espace insécable, deux décimales pour aligner les prix en tabulaire). */
export const euro = (n: number) => `${n.toFixed(2).replace('.', ',')} €`;
