// Motion globale du Le 54 (phase 1 : transition de page seulement). Un voile d'émail monte du bas comme une assiette
// qu'on pose, puis repart vers le haut. Les moments du concept (couverts.ts) arrivent en phase 2.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';

export function setupMotion() {
  const panneau = (c: HTMLElement) => c.querySelector<HTMLElement>('.curtain__panel--a')!;
  setTransition({
    leave: (c) => gsap.timeline().set(c, { autoAlpha: 1 }).fromTo(panneau(c), { yPercent: 101 }, { yPercent: 0, duration: 0.7, ease: ease.inOut }, 0),
    enter: (c) => gsap.timeline().to(panneau(c), { yPercent: -101, duration: 0.8, ease: ease.inOut }, 0.05).set(c, { autoAlpha: 0 }),
  });
}
