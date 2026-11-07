// Le Я : dans chaque mot d'un titre d'affichage, le DERNIER r est retourné (CSS .r), une seule lettre fausse par mot ;
// le texte reste « r » pour les lecteurs d'écran.
export const retourne = (s: string) =>
  s.replace(/[^\s]+/g, (mot) => {
    const i = Math.max(mot.lastIndexOf('r'), mot.lastIndexOf('R'));
    return i < 0 ? mot : `${mot.slice(0, i)}<span class="r">${mot[i]}</span>${mot.slice(i + 1)}`;
  });
/** Prix : 14,5 → « 14,50 € » (espace insécable). */
export const euro = (n: number) => `${n.toFixed(2).replace('.', ',')} €`;
