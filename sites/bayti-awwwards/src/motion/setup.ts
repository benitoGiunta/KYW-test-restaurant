// Mouvement global de Bayti : appelé une fois par start(setupMotion) dans Base.astro.
// Transition de page « longer » : le rideau de nuit traverse la rue de droite à gauche,
// le fil s'y trace du n° 6 au n° 15, puis le rideau poursuit sa route et dégage la page.
import { gsap } from 'gsap';
import { ease, setTransition } from '../engine';
import { initRue } from './rue';
import { initMenu } from './menu';

export function setupMotion() {
  setTransition({
    leave: (c) => {
      const panneau = c.querySelector('.curtain__panel');
      const fil = c.querySelector('.curtain__fil');
      const nom = c.querySelector('.curtain__nom');
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(panneau, { xPercent: 100 }, { xPercent: 0, duration: 0.7, ease: ease.inOut }, 0)
        .fromTo(fil, { scaleX: 0, transformOrigin: '0 50%' }, { scaleX: 1, duration: 0.55, ease: ease.out }, 0.3)
        .fromTo(nom, { autoAlpha: 0, x: 24 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: ease.out }, 0.35);
    },
    enter: (c) => {
      const panneau = c.querySelector('.curtain__panel');
      return gsap.timeline()
        .to(panneau, { xPercent: -100, duration: 0.8, ease: ease.inOut }, 0)
        .set(c, { autoAlpha: 0 });
    },
  });
  initRue();
  initMenu();
}
