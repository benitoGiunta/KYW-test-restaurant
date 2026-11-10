// Motion globale (phase 1 : transition minimale, le vrai mouvement arrive en phase 2).
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';

export function setupMotion() {
  setTransition({
    leave: (c) => {
      const p = c.querySelector<HTMLElement>('.curtain__panel');
      return gsap.timeline().set(c, { autoAlpha: 1 })
        .fromTo(p, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: ease.inOut }, 0);
    },
    enter: (c) => {
      const p = c.querySelector<HTMLElement>('.curtain__panel');
      return gsap.timeline().to(p, { clipPath: 'inset(0 0 0 100%)', duration: 0.5, ease: ease.inOut }, 0.05).set(c, { autoAlpha: 0 });
    },
  });
}
