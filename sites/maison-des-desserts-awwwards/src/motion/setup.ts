// Mouvement global (phase 1 : rideau de page seulement). Le cadran animé (aiguille, fond interpolé) arrive en phase 2.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';

export function setupMotion() {
  const panneau = (c: HTMLElement) => c.querySelector<HTMLElement>('.curtain__panel--a')!;
  setTransition({
    leave: (c) => gsap.timeline().set(c, { autoAlpha: 1 }).fromTo(panneau(c), { yPercent: 101 }, { yPercent: 0, duration: 0.6, ease: ease.inOut }),
    enter: (c) => gsap.timeline().to(panneau(c), { yPercent: -101, duration: 0.65, ease: ease.inOut }).set(c, { autoAlpha: 0 }),
  });
}
