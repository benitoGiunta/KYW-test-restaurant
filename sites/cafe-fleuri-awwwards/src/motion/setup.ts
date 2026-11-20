// Motion globale de Café Fleuri. Phase 1 : seulement le rideau de transition (framboise, verbe « déborder » :
// le rideau entre par la droite comme un plateau qui déborde). Les révélations et le débordement viennent en phase 2.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';

export function setupMotion() {
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { xPercent: 100 }, { xPercent: 0, duration: 0.7, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { xPercent: -100, duration: 0.8, ease: ease.inOut, delay: 0.05 })
      .set(c, { autoAlpha: 0 }),
  });
}
