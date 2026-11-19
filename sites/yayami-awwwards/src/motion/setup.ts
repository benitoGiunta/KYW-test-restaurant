// Motion globale de Yayami : phase 1 = transition de page par deux volets rouges (le sceau se pose). Les signatures arrivent en phase 2.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';

export function setupMotion() {
  const volets = (c: HTMLElement) => c.querySelectorAll<HTMLElement>('.curtain__panel');
  setTransition({
    leave: (c) => {
      const [a, b] = volets(c);
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(a, { yPercent: -101 }, { yPercent: 0, duration: 0.6, ease: ease.inOut }, 0)
        .fromTo(b, { yPercent: 101 }, { yPercent: 0, duration: 0.6, ease: ease.inOut }, 0.04);
    },
    enter: (c) => {
      const [a, b] = volets(c);
      return gsap.timeline()
        .to(a, { yPercent: -101, duration: 0.7, ease: ease.inOut }, 0.05)
        .to(b, { yPercent: 101, duration: 0.7, ease: ease.inOut }, 0.09)
        .set(c, { autoAlpha: 0 });
    },
  });
}
