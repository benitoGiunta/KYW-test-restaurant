// Typographie française : espaces insécables devant h, € et dans les heures.
export const ins = (s: string) => s.replace(/(\d) ?(h|€)/g, '$1 $2').replace(/h (\d)/g, 'h $1').replace(/ à /g, ' à ').replace(/\+ ?(\d)/g, '+ $1');
export const euro = (n: number) => `${n} €`;
export const tel = (t: string) => `tel:${t.replace(/\s/g, '')}`;
