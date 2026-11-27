// Motion globale « Cahier » : le loader est l'étiquette qui se colle, la transition est une page kraft qui se tourne.
import { gsap } from 'gsap';
import { setLoaderFormat, setLoaderExit, setTransition, ease } from '../engine';
import { initCahier } from './cahier';

export function setupMotion() {
  setLoaderFormat((p) => `p. ${Math.max(1, Math.round(p))}`);
  setLoaderExit((root) =>
    gsap.timeline()
      .to(root.querySelector('.etiquette'), { scale: 0.97, duration: 0.18, ease: 'power2.in' })
      .to(root.querySelector('.etiquette'), { scale: 1, duration: 0.25, ease: 'back.out(2)' })
      .to(root, { yPercent: -100, duration: 0.75, ease: ease.inOut }, '+=0.05'),
  );
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { xPercent: 100 }, { xPercent: 0, duration: 0.7, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { xPercent: -100, duration: 0.8, ease: ease.inOut })
      .set(c, { autoAlpha: 0 }),
  });
  initCahier();
}
