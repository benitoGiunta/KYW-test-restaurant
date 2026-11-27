// Phase 1 : seul le rideau de transition est branché (une bande de nuit qui passe). Les signatures arrivent en phase 2.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';

export function setupMotion() {
  setTransition({
    leave: (c) => gsap.timeline().set(c, { autoAlpha: 1 }).fromTo(c.querySelector('.curtain__panel'), { yPercent: 100 }, { yPercent: 0, duration: 0.6, ease: ease.inOut }),
    enter: (c) => gsap.timeline().to(c.querySelector('.curtain__panel'), { yPercent: -100, duration: 0.7, ease: ease.inOut }).set(c, { autoAlpha: 0 }),
  });
}
