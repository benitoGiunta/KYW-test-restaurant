// Motion globale, appelée une fois par l'adaptateur (start(setupMotion)).
// Transition « plateau » : un disque rouge s'ouvre depuis le point de clic pendant que son anneau tourne d'un quart,
// puis se referme vers le centre de la nouvelle page en finissant le quart. 0,6 s par sens.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { startIdle, plateauPages } from './plateau';
import { menu } from './menu';

const clic = { x: 50, y: 50 };

export function setupMotion() {
  addEventListener('pointerdown', (e) => {
    clic.x = (e.clientX / innerWidth) * 100;
    clic.y = (e.clientY / innerHeight) * 100;
  }, { passive: true });
  addEventListener('keydown', (e) => { if (e.key === 'Enter') { clic.x = 50; clic.y = 50; } });

  setTransition({
    leave: (c) => {
      const p = c.querySelector<HTMLElement>('.curtain__panel');
      const a = c.querySelector<HTMLElement>('.curtain__anneau');
      const at = `${clic.x.toFixed(1)}% ${clic.y.toFixed(1)}%`;
      return gsap.timeline().set(c, { autoAlpha: 1 })
        .fromTo(p, { clipPath: `circle(0% at ${at})` }, { clipPath: `circle(150% at ${at})`, duration: 0.6, ease: ease.inOut }, 0)
        .fromTo(a, { rotation: -90, scale: 0.6, opacity: 0 }, { rotation: -45, scale: 1, opacity: 1, duration: 0.6, ease: ease.inOut }, 0);
    },
    enter: (c) => {
      const p = c.querySelector<HTMLElement>('.curtain__panel');
      const a = c.querySelector<HTMLElement>('.curtain__anneau');
      return gsap.timeline()
        .to(p, { clipPath: 'circle(0% at 50% 50%)', duration: 0.6, ease: ease.inOut }, 0.05)
        .to(a, { rotation: 0, scale: 0.6, opacity: 0, duration: 0.6, ease: ease.inOut }, 0.05)
        .set(c, { autoAlpha: 0 });
    },
  });

  startIdle();
  plateauPages();
  menu();
}
