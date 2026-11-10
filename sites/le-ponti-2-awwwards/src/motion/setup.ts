// Mouvement global : transition « on passe sous le pont », pilote du pont, menu mobile.
// Sortie 0,8 s : le bordeaux monte du bas, bord supérieur en arche (on s'engage sous le pont).
// Entrée 0,8 s : le tablier se lève comme un pont-levis, la nouvelle rive apparaît par le bas.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { setupPont } from './pont';
import { setupMenu } from './menu';

export function setupMotion() {
  setTransition({
    leave: (c) => {
      const p = c.querySelector<HTMLElement>('.curtain__panel');
      return gsap.timeline().set(c, { autoAlpha: 1 })
        .fromTo(p, { clipPath: 'inset(100% 0% 0% 0% round 50% 50% 0% 0% / 40% 40% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0% round 0% 0% 0% 0% / 0% 0% 0% 0%)', duration: 0.8, ease: ease.inOut });
    },
    enter: (c) => {
      const p = c.querySelector<HTMLElement>('.curtain__panel');
      return gsap.timeline()
        .to(p, { clipPath: 'inset(0% 0% 100% 0% round 0% 0% 0% 0% / 0% 0% 0% 0%)', duration: 0.8, ease: ease.inOut })
        .set(c, { autoAlpha: 0 });
    },
  });
  setupPont();
  setupMenu();
}
