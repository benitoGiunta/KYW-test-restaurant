// Mouvement global, appelé une fois par start(setupMotion) : rideau, entrée de repos, pilote du filet, menu.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { startIdle } from './idle';
import { startFilet } from './filet';
import { startMenu } from './menu';

export function setupMotion() {
  // Le rideau se verse de haut en bas : un voile d'huile (couleur de la dernière huile lue) puis le bordeaux.
  const panneaux = (c: HTMLElement) => [c.querySelector<HTMLElement>('.curtain__panel--b')!, c.querySelector<HTMLElement>('.curtain__panel--a')!];
  setTransition({
    leave: (c) => {
      const [huile, nuit] = panneaux(c);
      return gsap.timeline().set(c, { autoAlpha: 1 })
        .fromTo(huile, { yPercent: -101 }, { yPercent: 0, duration: 0.65, ease: ease.inOut }, 0)
        .fromTo(nuit, { yPercent: -101 }, { yPercent: 0, duration: 0.65, ease: ease.inOut }, 0.12);
    },
    enter: (c) => {
      const [huile, nuit] = panneaux(c);
      return gsap.timeline()
        .to(nuit, { yPercent: 101, duration: 0.7, ease: ease.inOut }, 0)
        .to(huile, { yPercent: 101, duration: 0.7, ease: ease.inOut }, 0.1)
        .set(c, { autoAlpha: 0 });
    },
  });
  startIdle();
  startFilet();
  startMenu();
}
