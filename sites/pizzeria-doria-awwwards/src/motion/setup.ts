// Motion globale (phase 1 : transition de base, deux volets qui se ferment comme une porte de coffre).
// Les signatures du concept (tiroirs qui coulissent) viennent en phase 2.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';

export function setupMotion() {
  const volets = (c: HTMLElement) => c.querySelectorAll<HTMLElement>('.curtain__panel');
  setTransition({
    leave: (c) => {
      const [a, b] = volets(c);
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(a, { xPercent: -101 }, { xPercent: 0, duration: 0.6, ease: ease.inOut }, 0)
        .fromTo(b, { xPercent: 101 }, { xPercent: 0, duration: 0.6, ease: ease.inOut }, 0.04);
    },
    enter: (c) => {
      const [a, b] = volets(c);
      return gsap.timeline()
        .to(a, { xPercent: -101, duration: 0.7, ease: ease.inOut }, 0.05)
        .to(b, { xPercent: 101, duration: 0.7, ease: ease.inOut }, 0.09)
        .set(c, { autoAlpha: 0 });
    },
  });
}
