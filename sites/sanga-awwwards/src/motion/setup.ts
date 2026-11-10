// Motion globale de Sanga, appelée une fois par l'engine (start(setupMotion) dans Base.astro).
// Transition : la crue (deux volets indigo qui montent puis se retirent vers le haut, ≤ 1 s par sens).
// Pilote : le fil de l'eau (fleuve.ts) ; menu du téléphone (menu.ts) ; entrée du hero (la photo se pose).
import { gsap } from 'gsap';
import { setTransition, ease, onPage, prefersReducedMotion } from '../engine';
import { startFleuve } from './fleuve';
import { startMenu } from './menu';

export function setupMotion() {
  const volets = (c: HTMLElement) => c.querySelectorAll<HTMLElement>('.curtain__panel');
  setTransition({
    leave: (c) => {
      const [a, b] = volets(c);
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(a, { yPercent: 101 }, { yPercent: 0, duration: 0.7, ease: ease.inOut }, 0)
        .fromTo(b, { yPercent: 101 }, { yPercent: 0, duration: 0.7, ease: ease.inOut }, 0.06);
    },
    enter: (c) => {
      const [a, b] = volets(c);
      return gsap.timeline()
        .to(b, { yPercent: -101, duration: 0.8, ease: ease.inOut }, 0.05)
        .to(a, { yPercent: -101, duration: 0.8, ease: ease.inOut }, 0.11)
        .set(c, { autoAlpha: 0 });
    },
  });
  startFleuve();
  startMenu();
  // Entrée du hero : rien n'est caché (LCP), la photo se pose (léger recul) pendant que l'eau descend.
  onPage(({ intro }) => {
    const img = document.querySelector('.hero__photo img');
    if (img && !prefersReducedMotion()) intro.fromTo(img, { scale: 1.08 }, { scale: 1, duration: 1.6, ease: ease.out, clearProps: 'transform' }, 0);
  });
}
