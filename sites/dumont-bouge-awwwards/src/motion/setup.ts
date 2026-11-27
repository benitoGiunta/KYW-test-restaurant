// Motion globale de Dumont Bouge. Phase 1 : transition de page par le rideau rose (un seul volet) ; la signature « Sept à dix-huit » arrive en phase 2.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';

export function setupMotion() {
  const volet = (c: HTMLElement) => c.querySelector<HTMLElement>('.curtain__panel')!;
  setTransition({
    leave: (c) => gsap.timeline().set(c, { autoAlpha: 1 }).fromTo(volet(c), { xPercent: -101 }, { xPercent: 0, duration: 0.7, ease: ease.inOut }, 0),
    enter: (c) => gsap.timeline().to(volet(c), { xPercent: 101, duration: 0.8, ease: ease.inOut }, 0.05).set(c, { autoAlpha: 0 }),
  });
}
