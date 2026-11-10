// Menu mobile (<dialog> modal : focus piégé et Échap natifs) et état « ouvert maintenant » à l'heure de Bruxelles.
import { gsap } from 'gsap';
import { onPage, prefersReducedMotion, ease } from '../engine';

type Service = { j: string[]; h: [string, string][] };
const N = ' ';
const heure = (hm: string) => { const [h, m] = hm.split(':'); return m === '00' ? `${Number(h)}${N}h` : `${Number(h)}${N}h${m}`; };

/** Texte d'état calculé depuis les horaires (jours et créneaux), heure lue en Europe/Brussels. */
export function etatOuverture(services: Service[], quand = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Brussels', weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(quand);
  const v = (t: string) => parts.find((p) => p.type === t)?.value || '';
  const jour = v('weekday');
  const min = Number(v('hour')) * 60 + Number(v('minute'));
  const m = (hm: string) => { const [h, mm] = hm.split(':').map(Number); return h * 60 + mm; };
  const creneaux = services.find((s) => s.j.includes(jour))?.h ?? [];
  for (const [o, c] of creneaux) {
    if (min >= m(o) && min < m(c)) return { ouvert: true, texte: `Ouvert jusqu’à ${heure(c)}` };
    if (min < m(o)) return { ouvert: false, texte: `Fermé, la cuisine ouvre à ${heure(o)}` };
  }
  const jours = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const noms = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
  const i0 = jours.indexOf(jour);
  for (let d = 1; d <= 7; d++) {
    const k = (i0 + d) % 7;
    const h = services.find((s) => s.j.includes(jours[k]))?.h?.[0];
    if (h) return { ouvert: false, texte: `Fermé, rouvre ${d === 1 ? 'demain' : noms[k]} à ${heure(h[0])}` };
  }
  return { ouvert: false, texte: 'Fermé' };
}

function initEtat() {
  const tete = document.querySelector<HTMLElement>('[data-services]');
  if (!tete) return () => {};
  const services = JSON.parse(tete.dataset.services || '[]') as Service[];
  const maj = () => {
    const e = etatOuverture(services);
    document.querySelectorAll<HTMLElement>('[data-etat]').forEach((el) => {
      el.textContent = e.texte;
      el.classList.toggle('est-ouvert', e.ouvert);
      el.hidden = false;
    });
  };
  maj();
  const id = window.setInterval(maj, 60_000);
  return () => clearInterval(id);
}

function initMenu() {
  const menu = document.querySelector<HTMLDialogElement>('#menu');
  const ouvrir = document.querySelector<HTMLButtonElement>('[data-menu-ouvrir]');
  if (!menu || !ouvrir || typeof menu.showModal !== 'function') return () => {};
  const fermerBtn = menu.querySelector<HTMLButtonElement>('[data-menu-fermer]');
  const anime = !prefersReducedMotion();
  const open = () => {
    menu.showModal();
    ouvrir.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('menu-ouvert');
    if (anime) {
      gsap.fromTo(menu, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: ease.inOut });
      gsap.fromTo(menu.querySelectorAll('.menu__lien'), { xPercent: -6, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.6, ease: ease.out, stagger: 0.05, delay: 0.2 });
    }
  };
  const close = () => { if (menu.open) menu.close(); };
  const onClose = () => {
    ouvrir.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('menu-ouvert');
    gsap.set(menu.querySelectorAll('.menu__lien'), { clearProps: 'transform,opacity,visibility' });
    ouvrir.focus();
  };
  // Un lien ferme le menu avant la navigation : le <dialog> modal passerait au-dessus du rideau.
  const onClic = (e: MouseEvent) => { if ((e.target as HTMLElement).closest('a')) close(); };
  const onFond = (e: MouseEvent) => { if (e.target === menu) close(); };
  ouvrir.addEventListener('click', open);
  fermerBtn?.addEventListener('click', close);
  menu.addEventListener('close', onClose);
  menu.addEventListener('click', onClic);
  menu.addEventListener('click', onFond);
  const mq = matchMedia('(min-width: 48rem)');
  const largeur = () => { if (mq.matches) close(); };
  mq.addEventListener('change', largeur);
  return () => {
    ouvrir.removeEventListener('click', open);
    fermerBtn?.removeEventListener('click', close);
    menu.removeEventListener('close', onClose);
    menu.removeEventListener('click', onClic);
    menu.removeEventListener('click', onFond);
    mq.removeEventListener('change', largeur);
    if (menu.open) menu.close();
  };
}

export function setupMenu() {
  onPage(() => {
    const a = initEtat();
    const b = initMenu();
    return () => { a(); b(); };
  });
}
