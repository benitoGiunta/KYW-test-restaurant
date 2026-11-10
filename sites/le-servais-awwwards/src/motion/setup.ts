// Motion globale du Servais. Phase 1 : transition « départ de cabine » (le rideau turquoise monte d'un bloc puis
// repart vers le haut). La signature (cabine sur le câble, repos pendulaire) arrive en phase 2.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';

export function setupMotion() {
  const panneau = (c: HTMLElement) => c.querySelector<HTMLElement>('.curtain__panel')!;
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(panneau(c), { yPercent: 101 }, { yPercent: 0, duration: 0.7, ease: ease.inOut }, 0),
    enter: (c) => gsap.timeline()
      .to(panneau(c), { yPercent: -101, duration: 0.8, ease: ease.inOut }, 0.05)
      .set(c, { autoAlpha: 0 }),
  });
}
