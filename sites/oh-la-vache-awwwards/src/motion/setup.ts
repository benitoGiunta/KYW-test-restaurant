// Mouvement global (phase 1 : rideau de page seulement ; le reste en phase 2).
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';

export function setupMotion() {
  setTransition({
    leave: (c) => gsap.timeline().set(c, { autoAlpha: 1 }).fromTo(c.querySelector('.curtain__panel--a'), { yPercent: 101 }, { yPercent: 0, duration: 0.6, ease: ease.inOut }, 0),
    enter: (c) => gsap.timeline().to(c.querySelector('.curtain__panel--a'), { yPercent: -101, duration: 0.6, ease: ease.inOut }, 0).set(c, { autoAlpha: 0 }),
  });
}
