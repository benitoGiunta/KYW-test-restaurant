// Phase 1 : pas d'animation. Le rideau est un panneau nori (transition de la phase 2).
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';

export function setupMotion() {
  const panneau = (c: HTMLElement) => c.querySelector<HTMLElement>('.curtain__panel')!;
  setTransition({
    leave: (c) => gsap.timeline().set(c, { autoAlpha: 1 }).fromTo(panneau(c), { yPercent: 101 }, { yPercent: 0, duration: 0.6, ease: ease.inOut }),
    enter: (c) => gsap.timeline().to(panneau(c), { yPercent: -101, duration: 0.7, ease: ease.inOut }, 0.05).set(c, { autoAlpha: 0 }),
  });
}
