// Mouvement global (phase 1 : seulement le rideau de transition ; le reste est prévu en phase 2, voir DESIGN.md).
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';

export function setupMotion() {
  // Le rideau monte comme une colonne qui s'allonge : de bas en haut, deux panneaux décalés.
  const panneaux = (c: HTMLElement) => [c.querySelector<HTMLElement>('.curtain__panel--b')!, c.querySelector<HTMLElement>('.curtain__panel--a')!];
  setTransition({
    leave: (c) => {
      const [clair, nuit] = panneaux(c);
      return gsap.timeline().set(c, { autoAlpha: 1 })
        .fromTo(clair, { yPercent: 101 }, { yPercent: 0, duration: 0.65, ease: ease.inOut }, 0)
        .fromTo(nuit, { yPercent: 101 }, { yPercent: 0, duration: 0.65, ease: ease.inOut }, 0.12);
    },
    enter: (c) => {
      const [clair, nuit] = panneaux(c);
      return gsap.timeline()
        .to(nuit, { yPercent: -101, duration: 0.7, ease: ease.inOut }, 0)
        .to(clair, { yPercent: -101, duration: 0.7, ease: ease.inOut }, 0.1)
        .set(c, { autoAlpha: 0 });
    },
  });
}
