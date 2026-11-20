// Motion globale de Café Fleuri « Le trop-plein ». Appelée une fois par start() (engine/astro.ts).
// Rideau framboise qui entre par la droite comme un plateau qui déborde, puis sort par la gauche ;
// pilote du débordement (debordement.ts), entrée de repos (idle.ts), menu plein écran (menu.ts).
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { startIdle } from './idle';
import { startDebordement } from './debordement';
import { startMenu } from './menu';

export function setupMotion() {
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { xPercent: 100 }, { xPercent: 0, duration: 0.8, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { xPercent: -100, duration: 0.85, ease: ease.inOut, delay: 0.05 })
      .set(c, { autoAlpha: 0 }),
  });
  startIdle();
  startDebordement();
  startMenu();
}
