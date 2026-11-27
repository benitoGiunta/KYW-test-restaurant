// Motion globale de Monepi : transition « tamis » (le rideau tombe à travers la page), pilote d'extraction.
import { gsap } from 'gsap';
import { onScroll, setTransition, ease } from '../engine';
import { initTamis } from './tamis';

export function setupMotion() {
  let last = 0;
  onScroll(({ y }) => {
    if (Math.abs(y - last) < 4) return;
    const h = document.documentElement;
    if (!h.classList.contains('menu-ouvert')) h.classList.toggle('frame-away', y > 200 && y > last);
    last = y;
  });

  // Transition : le panneau suie, bordé d'un filet braise, tombe d'en haut, couvre, puis continue sa chute.
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { yPercent: -100 }, { yPercent: 0, duration: 0.7, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { yPercent: 100, duration: 0.8, ease: ease.inOut })
      .set(c, { autoAlpha: 0 }),
  });

  initTamis();
}
