// Transition de page du concept : un miroir rond s'ouvre au point du clic et couvre la page
// (bleu nuit), puis s'ouvre en son centre sur la page suivante (iris). 0,8 s par sens.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';

export function startPassage() {
  let point = { x: innerWidth / 2, y: innerHeight / 2 };
  addEventListener('pointerdown', (e) => { point = { x: e.clientX, y: e.clientY }; }, { passive: true });
  addEventListener('keydown', (e) => { if (e.key === 'Enter') point = { x: innerWidth / 2, y: innerHeight / 2 }; });
  setTransition({
    leave: (c) => {
      const panel = c.querySelector<HTMLElement>('.curtain__panel')!;
      return gsap.timeline()
        .set(panel, { '--trou': '0px', clipPath: `circle(0px at ${point.x}px ${point.y}px)` })
        .set(c, { autoAlpha: 1 })
        .to(panel, { clipPath: `circle(${Math.hypot(innerWidth, innerHeight)}px at ${point.x}px ${point.y}px)`, duration: 0.8, ease: ease.inOut });
    },
    enter: (c) => {
      const panel = c.querySelector<HTMLElement>('.curtain__panel')!;
      return gsap.timeline()
        .set(panel, { clipPath: 'none' })
        .to(panel, { '--trou': `${Math.hypot(innerWidth, innerHeight) / 2 + 40}px`, duration: 0.8, ease: ease.inOut })
        .set(c, { autoAlpha: 0 })
        .set(panel, { '--trou': '0px' });
    },
  });
}
