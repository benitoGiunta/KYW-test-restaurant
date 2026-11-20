// Mouvement global (phase 1 : rideau et menu). Le rideau se verse de bas en haut : un voile rouge puis le vert de nuit.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { startMenu } from './menu';

export function setupMotion() {
  const panneaux = (c: HTMLElement) => [c.querySelector<HTMLElement>('.curtain__panel--b')!, c.querySelector<HTMLElement>('.curtain__panel--a')!];
  setTransition({
    leave: (c) => {
      const [rouge, nuit] = panneaux(c);
      return gsap.timeline().set(c, { autoAlpha: 1 })
        .fromTo(rouge, { yPercent: 101 }, { yPercent: 0, duration: 0.6, ease: ease.inOut }, 0)
        .fromTo(nuit, { yPercent: 101 }, { yPercent: 0, duration: 0.6, ease: ease.inOut }, 0.1);
    },
    enter: (c) => {
      const [rouge, nuit] = panneaux(c);
      return gsap.timeline()
        .to(nuit, { yPercent: -101, duration: 0.65, ease: ease.inOut }, 0)
        .to(rouge, { yPercent: -101, duration: 0.65, ease: ease.inOut }, 0.1)
        .set(c, { autoAlpha: 0 });
    },
  });
  startMenu();
}
