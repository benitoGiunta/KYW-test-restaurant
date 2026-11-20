// Mouvement global : transition de page de l'horizon et module pilote (soleil, heure, soir).
// Transition : un panneau vert du soir monte depuis le bas, porté par sa ligne d'horizon et son
// soleil, couvre la page, puis redescend se poser pour découvrir la suivante (0,8 s par sens).
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { startHorizon } from './horizon';

export function setupMotion() {
  const panneau = (c: HTMLElement) => c.querySelector<HTMLElement>('.curtain__panel--a')!;
  setTransition({
    leave: (c) => gsap.timeline().set(c, { autoAlpha: 1 }).fromTo(panneau(c), { yPercent: 104 }, { yPercent: 0, duration: 0.8, ease: ease.inOut }),
    enter: (c) => gsap.timeline().to(panneau(c), { yPercent: 104, duration: 0.8, ease: ease.inOut }).set(c, { autoAlpha: 0 }),
  });
  startHorizon();
}
