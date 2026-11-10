// Motion globale du Le 54. Transition : un voile d'émail monte du bas comme une nappe qu'on tire sur la table, puis
// repart vers le haut (0,7 s et 0,85 s, ease.inOut). Le concept (plans, registre, repos) vit dans couverts.ts.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { startCouverts } from './couverts';
import { setupMenu } from './menu';

export function setupMotion() {
  const panneau = (c: HTMLElement) => c.querySelector<HTMLElement>('.curtain__panel--a')!;
  setTransition({
    leave: (c) => gsap.timeline().set(c, { autoAlpha: 1 }).fromTo(panneau(c), { yPercent: 101 }, { yPercent: 0, duration: 0.7, ease: ease.inOut }, 0),
    enter: (c) => gsap.timeline().to(panneau(c), { yPercent: -101, duration: 0.8, ease: ease.inOut }, 0.05).set(c, { autoAlpha: 0 }),
  });
  startCouverts();
  setupMenu();
}
