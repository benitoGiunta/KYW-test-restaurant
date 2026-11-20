// Pilote « les trois points » (patterns.md § 1). Une variable par groupe de points : p, de 0 à 3,
// le nombre de points allumés. Le défilement l'écrit (chaque titre s'allume point par point quand
// il entre), l'intro l'écrit pour le hero, le pointeur penche les points vers la suite de la phrase
// (vers la droite : « poursuivre ») et l'entrée de repos les fait respirer en vague.
// Une seule horloge (gsap.ticker), écriture sur les seuls groupes visibles (IntersectionObserver).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, ease, prefersReducedMotion } from '../engine';
import { idle, startIdle } from './idle';

type Groupe = { el: HTMLElement; pts: HTMLElement[]; p: number };
const visibles = new Set<Groupe>();
let groupes: Groupe[] = [];

// Un point i : allumé de 0 à 1 ; éteint, il attend à gauche (la phrase arrive) ; allumé, il respire.
function apply(g: Groupe) {
  for (let i = 0; i < 3; i++) {
    const on = gsap.utils.clamp(0, 1, g.p - i);
    const x = (1 - on) * -0.4 + on * idle.x * 0.07 * (i + 1);
    const y = on * (Math.sin(idle.t * 1.7 - i * 0.9) * 0.045 + idle.y * 0.03);
    const s = g.pts[i].style;
    s.opacity = String(0.12 + on * 0.88);
    s.translate = `${x.toFixed(4)}em ${y.toFixed(4)}em`;
  }
}
const tick = () => visibles.forEach(apply);

export function startPoints() {
  if (prefersReducedMotion()) return; // repli : points pleins et immobiles (CSS)
  startIdle();
  onPage(({ intro }) => {
    const io = new IntersectionObserver((entrees) => entrees.forEach((e) => {
      const g = groupes.find((x) => x.el === e.target);
      if (!g) return;
      if (e.isIntersecting) visibles.add(g); else { visibles.delete(g); apply(g); }
    }));
    groupes = [...document.querySelectorAll<HTMLElement>('[data-points]')].map((el) => ({
      el, pts: [...el.querySelectorAll<HTMLElement>('i')], p: 0,
    }));
    groupes.forEach((g) => {
      io.observe(g.el);
      const hero = g.el.closest('[data-intro-points]');
      if (g.el.closest('.tete')) g.p = 3; // la marque reste entière
      else if (hero) intro.to(g, { p: 3, duration: 0.9, ease: 'none' }, 0.1); // un point toutes les 0,3 s
      else gsap.to(g, {
        p: 3, ease: 'none',
        scrollTrigger: { trigger: g.el, start: 'top 92%', end: 'top 62%', scrub: 0.6 },
      });
      apply(g);
    });
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); io.disconnect(); visibles.clear(); groupes = []; };
  });
  // La carte : les points de conduite courent du plat vers son prix.
  onPage(() => {
    const filets = document.querySelectorAll<HTMLElement>('.ligne__pts');
    if (!filets.length) return;
    gsap.set(filets, { clipPath: 'inset(0% 100% 0% 0%)' });
    ScrollTrigger.batch(filets, {
      start: 'top 90%', once: true,
      onEnter: (lot) => gsap.to(lot, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, stagger: 0.06, ease: ease.out }),
    });
  });
}
