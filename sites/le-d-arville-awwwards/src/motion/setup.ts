// Motion globale du D’Arville : rideau de brique (le panneau traverse l'écran comme on passe une haie,
// de gauche à droite), pilote « La balade » et menu mobile. Appelé une fois par start() (astro.ts).
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { startBalade } from './balade';
import { startMenu } from './menu';

export function setupMotion() {
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { xPercent: -100 }, { xPercent: 0, duration: 0.7, ease: ease.inOut })
      .fromTo(c.querySelector('.curtain__borne'), { x: -40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.5, ease: ease.out }, 0.3),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__borne'), { x: 40, autoAlpha: 0, duration: 0.35, ease: ease.soft })
      .to(c.querySelector('.curtain__panel'), { xPercent: 100, duration: 0.8, ease: ease.inOut }, 0.05)
      .set(c, { autoAlpha: 0 }),
  });
  startBalade();
  startMenu();
}
