// Motion globale « Braise » : loader qui compte en °C, rideau noir à lisière braise, driver de température.
import { gsap } from 'gsap';
import { setLoaderFormat, setLoaderExit, setTransition, ease } from '../engine';
import { initBraise } from './braise';

export function setupMotion() {
  // Le loader chauffe : 20 → 900 °C, puis il devient le thermomètre.
  setLoaderFormat((p) => String(Math.round(20 + p * 8.8)));
  setLoaderExit((root) =>
    gsap.timeline()
      .to(root.querySelectorAll('[data-loader-out]'), { yPercent: -110, duration: 0.4, ease: ease.inOut, stagger: 0.04 })
      .to(root, { clipPath: 'inset(0% 0% 100% 0%)', duration: matchMedia('(max-width: 767px)').matches ? 0.45 : 0.6, ease: ease.inOut }, '-=0.2'),
  );
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { yPercent: 100 }, { yPercent: 0, duration: 0.75, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { yPercent: -100, duration: 0.9, ease: ease.inOut })
      .set(c, { autoAlpha: 0 }),
  });
  initBraise();
}
