// Typographie française : insécable avant « : ; ! ? » et « € », heures « 12 h 00 », apostrophe typographique.
const NB = ' ';
export function fr(s: string | null | undefined): string {
  if (!s) return '';
  return s
    .replace(/'/g, '’')
    .replace(/(\d{1,2})h(\d{2})?(?![\p{L}\d])/gu, (_m, h, mm) => (mm ? `${h}${NB}h${NB}${mm}` : `${h}${NB}h`))
    .replace(/ ([:;!?»€])/g, `${NB}$1`)
    .replace(/« /g, `«${NB}`)
    .replace(/(\d) €/g, `$1${NB}€`);
}
export function u(path = ''): string {
  const b = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  return b + path.replace(/^\//, '');
}
