// Motion globale. Transition « lame » : le bleu de la chambre est tranché de gauche à droite, une lame braise
// tient le bord de la coupe ; à l'arrivée, la coupe repart par la gauche et découvre la nouvelle page (0,5 s par sens).
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { setupMenu } from './menu';
import { startTranche } from './tranche';

export function setupMotion() {
  const W = () => innerWidth;
  setTransition({
    leave: (c) => {
      const p = c.querySelector<HTMLElement>('.curtain__panel');
      const r = c.querySelector<HTMLElement>('.curtain__lame');
      return gsap.timeline().set(c, { autoAlpha: 1 })
        .fromTo(p, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: ease.inOut }, 0)
        .fromTo(r, { x: -6 }, { x: () => W() - 6, duration: 0.5, ease: ease.inOut }, 0);
    },
    enter: (c) => {
      const p = c.querySelector<HTMLElement>('.curtain__panel');
      const r = c.querySelector<HTMLElement>('.curtain__lame');
      return gsap.timeline()
        .fromTo(p, { clipPath: 'inset(0 0 0 0%)' }, { clipPath: 'inset(0 0 0 100%)', duration: 0.5, ease: ease.inOut }, 0.05)
        .fromTo(r, { x: 0 }, { x: () => W(), duration: 0.5, ease: ease.inOut }, 0.05)
        .set(c, { autoAlpha: 0 });
    },
  });
  setupMenu();
  startTranche();
}
