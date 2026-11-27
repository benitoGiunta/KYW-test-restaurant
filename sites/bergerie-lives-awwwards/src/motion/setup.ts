// Mouvement global, appelé une fois par start(setupMotion) : rideau à deux battants, entrée de repos, pilote du clos, menu.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { startIdle } from './idle';
import { startClos } from './clos';
import { startMenu } from './menu';

export function setupMotion() {
  // La barrière : deux battants se referment au centre (sortie), puis s'ouvrent vers les bords (entrée).
  const battants = (c: HTMLElement) => [c.querySelector<HTMLElement>('.curtain__panel--g')!, c.querySelector<HTMLElement>('.curtain__panel--d')!];
  setTransition({
    leave: (c) => {
      const [g, d] = battants(c);
      return gsap.timeline().set(c, { autoAlpha: 1 })
        .fromTo(g, { xPercent: -101 }, { xPercent: 0, duration: 0.75, ease: ease.inOut }, 0)
        .fromTo(d, { xPercent: 101 }, { xPercent: 0, duration: 0.75, ease: ease.inOut }, 0.05);
    },
    enter: (c) => {
      const [g, d] = battants(c);
      return gsap.timeline()
        .to(g, { xPercent: -101, duration: 0.85, ease: ease.inOut }, 0.05)
        .to(d, { xPercent: 101, duration: 0.85, ease: ease.inOut }, 0)
        .set(c, { autoAlpha: 0 });
    },
  });
  startIdle();
  startClos();
  startMenu();
}
