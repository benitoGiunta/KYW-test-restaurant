// Motion globale de La Dolce Vita, appelée une fois par l'adaptateur (engine/astro.ts).
// Phase 1 : transition seulement. La salle s'éteint (rideau `--c-curtain` en fondu), puis se rallume.
// L'allumage du néon, son bourdonnement de repos et les hovers « s'allumer » arrivent en phase 2.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';

export function setupMotion() {
  setTransition({
    leave: (c) => gsap.timeline().fromTo(c, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45, ease: ease.inOut }),
    enter: (c) => gsap.timeline().to(c, { autoAlpha: 0, duration: 0.6, ease: ease.out, delay: 0.05 }),
  });
}
