// Motion globale (phase 1 : plomberie). Transition « lame » : le bleu de la chambre est tranché de gauche à droite, un trait de braise le suit.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { setupMenu } from './menu';

export function setupMotion() {
  setTransition({
    leave: (c) => {
      const p = c.querySelector<HTMLElement>('.curtain__panel');
      const r = c.querySelector<HTMLElement>('.curtain__lame');
      return gsap.timeline().set(c, { autoAlpha: 1 })
        .fromTo(p, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: ease.inOut }, 0)
        .fromTo(r, { xPercent: -100 }, { xPercent: 0, duration: 0.5, ease: ease.inOut }, 0);
    },
    enter: (c) => {
      const p = c.querySelector<HTMLElement>('.curtain__panel');
      const r = c.querySelector<HTMLElement>('.curtain__lame');
      return gsap.timeline()
        .to(p, { clipPath: 'inset(0 0 0 100%)', duration: 0.5, ease: ease.inOut }, 0)
        .to(r, { xPercent: 100, duration: 0.5, ease: ease.inOut }, 0)
        .set(c, { autoAlpha: 0 });
    },
  });
  setupMenu();
}
