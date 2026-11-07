// Branché une fois par l'adaptateur (start(setupMotion)) : transition « demi-tour », module pilote, code des pages.
import { gsap } from 'gsap';
import { ease, onPage, prefersReducedMotion, setTransition } from '../engine';
import { demiTour } from './demitour';
import { menu } from './menu';

// Transition : deux volets de croûte montent (orange, puis vert bouteille portant un R) ; à l'arrivée le R fait son
// demi-tour puis les volets s'en vont vers le haut. 0,85 s à l'aller, 0,95 s au retour.
function transition() {
  const parts = (c: HTMLElement) => ({
    a: c.querySelector('.curtain__panel--a'),
    b: c.querySelector('.curtain__panel--b'),
    r: c.querySelector('.curtain__r'),
  });
  setTransition({
    leave: (c) => {
      const { a, b, r } = parts(c);
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .set(r, { transformPerspective: 900 })
        .fromTo(a, { yPercent: 100 }, { yPercent: 0, duration: 0.6, ease: ease.inOut }, 0)
        .fromTo(b, { yPercent: 100 }, { yPercent: 0, duration: 0.6, ease: ease.inOut }, 0.1)
        .fromTo(r, { rotationY: -90 }, { rotationY: 0, duration: 0.35, ease: ease.out }, 0.5);
    },
    enter: (c) => {
      const { a, b, r } = parts(c);
      return gsap.timeline()
        .to(r, { rotationY: 180, duration: 0.5, ease: ease.inOut }, 0)
        .to(b, { yPercent: -100, duration: 0.6, ease: ease.inOut }, 0.25)
        .to(a, { yPercent: -100, duration: 0.6, ease: ease.inOut }, 0.35)
        .set(c, { autoAlpha: 0 });
    },
  });
}

export function setupMotion() {
  menu();
  if (prefersReducedMotion()) return;
  transition();
  demiTour();
  // Accueil : la photo du four se pose (léger recul) pendant que le Я fait son demi-tour.
  onPage(({ intro }) => {
    const img = document.querySelector('.hero__media img');
    if (img) intro.fromTo(img, { scale: 1.1 }, { scale: 1, duration: 1.6, ease: ease.out, clearProps: 'transform' }, 0);
  });
}
