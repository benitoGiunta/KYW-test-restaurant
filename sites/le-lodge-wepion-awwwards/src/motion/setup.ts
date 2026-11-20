// Phase 1 : socle seulement (rideau simple et menu). Le pilote « berge » et l'état de repos arrivent en phase 2.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { startMenu } from './menu';

export function setupMotion() {
  const panneaux = (c: HTMLElement) => [c.querySelector<HTMLElement>('.curtain__panel--b')!, c.querySelector<HTMLElement>('.curtain__panel--a')!];
  setTransition({
    leave: (c) => {
      const [b, a] = panneaux(c);
      return gsap.timeline().set(c, { autoAlpha: 1 })
        .fromTo(b, { xPercent: -101 }, { xPercent: 0, duration: 0.65, ease: ease.inOut }, 0)
        .fromTo(a, { xPercent: -101 }, { xPercent: 0, duration: 0.65, ease: ease.inOut }, 0.12);
    },
    enter: (c) => {
      const [b, a] = panneaux(c);
      return gsap.timeline()
        .to(a, { xPercent: 101, duration: 0.7, ease: ease.inOut }, 0)
        .to(b, { xPercent: 101, duration: 0.7, ease: ease.inOut }, 0.1)
        .set(c, { autoAlpha: 0 });
    },
  });
  startMenu();
}
