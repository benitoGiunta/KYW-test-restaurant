// Phase 1 : seul le rideau de transition (un panneau brun qui se verse). Le reste du mouvement arrive en phase 2.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';

export function setupMotion() {
  setTransition({
    leave: (c) => gsap.timeline().set(c, { autoAlpha: 1 }).fromTo(c.querySelector('.curtain__panel'), { yPercent: 101 }, { yPercent: 0, duration: 0.55, ease: ease.inOut }),
    enter: (c) => gsap.timeline().to(c.querySelector('.curtain__panel'), { yPercent: -101, duration: 0.6, ease: ease.inOut }).set(c, { autoAlpha: 0 }),
  });
}
