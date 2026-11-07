// Motion globale du Royal : phase 1 = seulement le rideau de transition (brique sombre). Le reste en phase 2.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';

export function setupMotion() {
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { xPercent: -100 }, { xPercent: 0, duration: 0.7, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { xPercent: 100, duration: 0.8, ease: ease.inOut, delay: 0.05 })
      .set(c, { autoAlpha: 0 }),
  });
}
