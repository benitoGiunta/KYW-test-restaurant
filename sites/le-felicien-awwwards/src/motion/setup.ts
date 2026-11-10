// Motion globale : transition « rideau vert traversé par la règle », pilote de l'échelle, menu et état d'ouverture.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { setupEchelle } from './echelle';
import { setupMenu } from './menu';

export function setupMotion() {
  // Sortie 0,7 s : le vert tire depuis la gauche, la règle jaune se trace par crans d'un bord à l'autre.
  // Entrée 0,6 s : la règle s'efface au cran, le vert se retire vers la droite.
  setTransition({
    leave: (c) => {
      const p = c.querySelector<HTMLElement>('.curtain__panel');
      const r = c.querySelector<HTMLElement>('.curtain__regle');
      return gsap.timeline().set(c, { autoAlpha: 1 })
        .fromTo(p, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: ease.inOut }, 0)
        .fromTo(r, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'steps(40)' }, 0.22);
    },
    enter: (c) => {
      const p = c.querySelector<HTMLElement>('.curtain__panel');
      const r = c.querySelector<HTMLElement>('.curtain__regle');
      return gsap.timeline()
        .to(r, { clipPath: 'inset(0 0 0 100%)', duration: 0.25, ease: 'steps(10)' }, 0)
        .to(p, { clipPath: 'inset(0 0 0 100%)', duration: 0.5, ease: ease.inOut }, 0.1)
        .set(c, { autoAlpha: 0 });
    },
  });
  setupEchelle();
  setupMenu();
}
