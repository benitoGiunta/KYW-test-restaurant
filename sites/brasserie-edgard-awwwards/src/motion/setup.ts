// Motion globale de la Brasserie Edgard, appelée une fois par l'adaptateur (engine/astro.ts).
// Phase 1 : seul le rideau de transition (le bois sombre du mur, ≤ 1 s par sens) et le menu mobile. Le cadran vivant et les révélations arrivent en phase 2.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { menuMobile } from './menu';

export function setupMotion() {
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { yPercent: 100 }, { yPercent: 0, duration: 0.8, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { yPercent: -100, duration: 0.9, ease: ease.inOut, delay: 0.05 })
      .set(c, { autoAlpha: 0 }),
  });
  menuMobile();
}
