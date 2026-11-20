// Appelé une fois par l'adaptateur Astro (start(setupMotion)) : transition du concept, pilote, menu.
// Transition : le café s'étale en cercle depuis le point de clic et couvre la page (le jaune au centre),
// puis se résorbe au centre de la nouvelle page. 0,75 s à l'aller, 0,8 s au retour (≤ 1 s par sens).
// Pas de loader : un café ne fait pas attendre (Concept Card).
import { gsap } from 'gsap';
import { ease, setTransition } from '../engine';
import { initCadran } from './cadran';
import { initMenu } from './menu';

let px = 50;
let py = 50;

export function setupMotion() {
  addEventListener('pointerdown', (e) => {
    px = (e.clientX / innerWidth) * 100;
    py = (e.clientY / innerHeight) * 100;
  }, { passive: true });
  addEventListener('keydown', (e) => { if (e.key === 'Enter') { px = 50; py = 50; } });

  setTransition({
    leave: (c) => {
      const panel = c.querySelector('.curtain__panel');
      const jaune = c.querySelector('.curtain__jaune');
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .set(jaune, { scale: 0.4 })
        .fromTo(panel, { clipPath: `circle(0% at ${px}% ${py}%)` }, { clipPath: `circle(150% at ${px}% ${py}%)`, duration: 0.75, ease: ease.inOut }, 0)
        .to(jaune, { scale: 1, duration: 0.6, ease: ease.out }, 0.2);
    },
    enter: (c) => {
      const panel = c.querySelector('.curtain__panel');
      const jaune = c.querySelector('.curtain__jaune');
      return gsap.timeline()
        .to(jaune, { scale: 0, duration: 0.4, ease: ease.inOut }, 0)
        .fromTo(panel, { clipPath: 'circle(150% at 50% 50%)' }, { clipPath: 'circle(0% at 50% 50%)', duration: 0.8, ease: ease.inOut }, 0)
        .set(c, { autoAlpha: 0 });
    },
  });

  initCadran();
  initMenu();
}
