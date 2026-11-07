// Motion globale du Royal : transition « face à face » (deux volets, brique côté brasserie et ardoise côté théâtre,
// se rejoignent sur l'axe puis s'écartent) et pilote du concept (face.ts). Appelé une fois par l'engine.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { startFace } from './face';

export function setupMotion() {
  const volets = (c: HTMLElement) => c.querySelectorAll<HTMLElement>('.curtain__panel');
  setTransition({
    leave: (c) => {
      const [a, b] = volets(c);
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(a, { xPercent: -101 }, { xPercent: 0, duration: 0.7, ease: ease.inOut }, 0)
        .fromTo(b, { xPercent: 101 }, { xPercent: 0, duration: 0.7, ease: ease.inOut }, 0.04);
    },
    enter: (c) => {
      const [a, b] = volets(c);
      return gsap.timeline()
        .to(a, { xPercent: -101, duration: 0.8, ease: ease.inOut }, 0.05)
        .to(b, { xPercent: 101, duration: 0.8, ease: ease.inOut }, 0.09)
        .set(c, { autoAlpha: 0 });
    },
  });
  startFace();
}
