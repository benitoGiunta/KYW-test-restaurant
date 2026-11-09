// Motion globale (phase 1 : transition de base). Rideau « plateau » : un disque rouge s'ouvre depuis le centre
// puis se referme. Les animations du concept (plateau qui tourne) arrivent en phase 2.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';

export function setupMotion() {
  setTransition({
    leave: (c) => {
      const p = c.querySelector<HTMLElement>('.curtain__panel');
      return gsap.timeline().set(c, { autoAlpha: 1 })
        .fromTo(p, { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(80% at 50% 50%)', duration: 0.7, ease: ease.inOut }, 0);
    },
    enter: (c) => {
      const p = c.querySelector<HTMLElement>('.curtain__panel');
      return gsap.timeline()
        .to(p, { clipPath: 'circle(0% at 50% 50%)', duration: 0.7, ease: ease.inOut }, 0.05)
        .set(c, { autoAlpha: 0 });
    },
  });
}
