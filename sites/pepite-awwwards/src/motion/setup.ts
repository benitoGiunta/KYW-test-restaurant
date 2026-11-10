// Motion globale de Pépite (phase 1 : rideau seul ; le filon et le repos arrivent en phase 2).
// Rideau de transition : la pierre de la cave (--c-curtain) monte du sol puis se retire.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';

export function setupMotion() {
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { yPercent: 100 }, { yPercent: 0, duration: 0.7, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { yPercent: -100, duration: 0.8, ease: ease.inOut, delay: 0.05 })
      .set(c, { autoAlpha: 0 }),
  });
}
