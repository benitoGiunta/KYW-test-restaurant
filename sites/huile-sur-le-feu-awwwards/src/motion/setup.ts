// Motion globale (phase 1 : rideau de transition seul ; le filet qui coule, la goutte au repos et les hovers arrivent en phase 2).
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';

export function setupMotion() {
  const panel = (c: HTMLElement) => c.querySelector<HTMLElement>('.curtain__panel--a')!;
  setTransition({
    leave: (c) => gsap.timeline().set(c, { autoAlpha: 1 }).fromTo(panel(c), { yPercent: 101 }, { yPercent: 0, duration: 0.7, ease: ease.inOut }),
    enter: (c) => gsap.timeline().to(panel(c), { yPercent: -101, duration: 0.8, ease: ease.inOut }).set(c, { autoAlpha: 0 }),
  });
}
