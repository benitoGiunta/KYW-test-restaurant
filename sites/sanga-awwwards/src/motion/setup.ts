// Motion globale de Sanga. Phase 1 : transition de page seulement (deux volets indigo qui montent comme une crue
// puis redescendent). Le fil de l'eau (signature) arrive en phase 2. Appelé une fois par l'engine.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';

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
}
