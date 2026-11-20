// Motion globale. Rideau de transition : la nuit (panneau ardoise) balaie l'écran de gauche à droite,
// portant la ligne d'horizon et son soleil ; elle couvre (0,7 s) puis découvre la page suivante (0,85 s).
// Le module pilote (horizon.ts) est lancé une fois ici.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { startHorizon, startCarte } from './horizon';

export function setupMotion() {
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { xPercent: -100 }, { xPercent: 0, duration: 0.7, ease: ease.inOut }, 0)
      .fromTo(c.querySelector('.curtain__soleil'), { xPercent: -300 }, { xPercent: 0, duration: 0.7, ease: ease.inOut }, 0),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { xPercent: 100, duration: 0.85, ease: ease.inOut, delay: 0.05 }, 0)
      .to(c.querySelector('.curtain__soleil'), { xPercent: 300, duration: 0.85, ease: ease.inOut, delay: 0.05 }, 0)
      .set(c, { autoAlpha: 0 }),
  });
  startHorizon();
  startCarte();
}
