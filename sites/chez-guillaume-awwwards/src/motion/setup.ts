// Motion globale de Chez Guillaume, appelée une fois par l'adaptateur (engine/astro.ts).
// Rideau de transition : le rideau bordeaux de la salle (photo 09) tombe du cintre puis se relève (≤ 1 s par sens).
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { menuMobile } from './menu';
import { startConduite, startIdle } from './conduite';

export function setupMotion() {
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { yPercent: -100 }, { yPercent: 0, duration: 0.8, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { yPercent: -100, duration: 0.9, ease: ease.inOut, delay: 0.05 })
      .set(c, { autoAlpha: 0 }),
  });
  startIdle();
  startConduite();
  menuMobile();
}
