// Motion globale de Novobel, appelée une fois par l'adaptateur : rideau « coffrage » qui glisse à l'horizontale
// et sur lequel un trait de cote jaune se trace, module pilote « La cote » (repos, pointeur, tracés, compteurs), menu mobile.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { menuMobile } from './menu';
import { startIdle, startCote } from './cote';

export function setupMotion() {
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { xPercent: -100 }, { xPercent: 0, duration: 0.7, ease: ease.inOut }, 0)
      .fromTo(c.querySelector('.curtain__trait'), { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: ease.out }, 0.4),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { xPercent: 100, duration: 0.8, ease: ease.inOut, delay: 0.05 })
      .set(c, { autoAlpha: 0 }),
  });
  startIdle();
  startCote();
  menuMobile();
}
