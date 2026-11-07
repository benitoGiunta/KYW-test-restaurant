// Pilote « Face à face » (patterns.md § 1). Une variable par diptyque : sa progression dans le viewport.
// Elle est distribuée à tout ce qui porte le concept :
//   [data-face="a"] et [data-face="b"] : contre-défilement (les deux faces glissent en sens opposés) ;
//   .axe__point : la place, un trait brique qui s'écoule le long de l'axe entre les deux faces ;
// le défilement et le pointeur la décalent, le repos la fait avancer lentement (idle.ts, 40 px/s). Au téléphone l'axe est horizontal :
// pas de contre-défilement, la place glisse le long du filet. Mouvement réduit : rien ne bouge, place au milieu.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, ease, prefersReducedMotion } from '../engine';
import { idle, startIdle } from './idle';

type Duo = {
  st: ScrollTrigger; haut: boolean; amp: number;
  a: ((v: number) => void)[]; b: ((v: number) => void)[];
  axe: HTMLElement | null; point: HTMLElement | null;
};

export function startFace() {
  if (prefersReducedMotion()) return;
  startIdle();
  onPage(({ intro }) => {
    const sections = [...document.querySelectorAll<HTMLElement>('[data-duo]')];
    if (!sections.length) return;
    const mq = matchMedia('(max-width: 48rem)');
    const duos: Duo[] = sections.map((el) => {
      const haut = el.dataset.duo === 'haut';
      return {
        haut,
        amp: parseFloat(el.dataset.amp || (haut ? '80' : '40')),
        st: ScrollTrigger.create({ trigger: el, start: haut ? 'top top' : 'top bottom', end: 'bottom top', invalidateOnRefresh: true }),
        a: [...el.querySelectorAll<HTMLElement>(':scope > [data-face="a"], :scope > * > [data-face="a"]')].map((f) => gsap.quickSetter(f, 'y', 'px') as (v: number) => void),
        b: [...el.querySelectorAll<HTMLElement>(':scope > [data-face="b"], :scope > * > [data-face="b"]')].map((f) => gsap.quickSetter(f, 'y', 'px') as (v: number) => void),
        axe: el.querySelector<HTMLElement>('.axe'),
        point: el.querySelector<HTMLElement>('.axe__point'),
      };
    });

    const apply = (d: Duo) => {
      const mobile = mq.matches;
      const pr = d.st.progress;
      const p = d.haut ? pr : pr * 2 - 1; // accueil : 0 au chargement ; ailleurs : 0 quand la section est centrée
      const amp = mobile ? 0 : d.amp;
      d.a.forEach((s) => s(-p * amp));
      d.b.forEach((s) => s(p * amp * 0.6));
      if (!d.axe || !d.point) return;
      // La place s'écoule le long de l'axe (repos, vitesse constante), décalée par le défilement et le pointeur ;
      // l'axe la coupe à ses bouts (overflow: clip) : elle sort d'un côté et revient par l'autre.
      const L = mobile ? d.axe.clientWidth : d.axe.clientHeight;
      const h = mobile ? d.point.offsetWidth : d.point.offsetHeight;
      const off = (d.haut ? pr * 0.5 : p * 0.4) * L + (mobile ? idle.x : idle.y) * 0.25 * L + idle.t * (mobile ? 30 : 40);
      const pos = gsap.utils.wrap(0, L + h, L * 0.5 + h * 0.5 + off) - h;
      if (mobile) gsap.set(d.point, { x: pos, y: 0 });
      else gsap.set(d.point, { y: pos, x: 0 });
    };
    const tick = () => { for (const d of duos) if (d.st.isActive || d.haut && d.st.progress === 0) apply(d); };
    gsap.ticker.add(tick);

    // Intro du haut de page : l'axe se trace entre les deux faces, puis la place s'y pose.
    const tete = duos.find((d) => d.haut);
    if (tete?.axe && tete.point) {
      const h = !mq.matches;
      intro.fromTo(tete.axe, h ? { scaleY: 0 } : { scaleX: 0 }, { scaleY: 1, scaleX: 1, transformOrigin: h ? '50% 0%' : '0% 50%', duration: 1.3, ease: ease.out }, 0.1);
      intro.fromTo(tete.point, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: ease.soft }, 0.9);
    }
    return () => { gsap.ticker.remove(tick); duos.forEach((d) => d.st.kill()); };
  });
}
