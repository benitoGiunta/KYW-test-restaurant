// Motion globale de Pépite, appelée une fois par l'adaptateur (start(setupMotion)).
// Rideau de transition : la pierre de la cave (--c-curtain) monte du sol, bordée d'un fil de cuivre,
// puis se retire vers le haut ; la nouvelle page affleure dessous. Une famille d'easing (ease.*), ≤ 1 s par sens.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { setupFilon } from './filon';
import { setupMenu } from './menu';

export function setupMotion() {
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { yPercent: 100 }, { yPercent: 0, duration: 0.7, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { yPercent: -100, duration: 0.8, ease: ease.inOut, delay: 0.05 })
      .set(c, { autoAlpha: 0 }),
  });
  setupFilon();
  setupMenu();
}
