// Motion globale de Wok de Jin (phase 1 : transition de page seule ; la signature « grille de la semaine » arrive en phase 2).
// Deux volets noir de fumée et cinabre qui montent comme un bol qui se remplit puis se vident.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';

export function setupMotion() {
  const volets = (c: HTMLElement) => c.querySelectorAll<HTMLElement>('.curtain__panel');
  setTransition({
    leave: (c) => {
      const [a, b] = volets(c);
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(a, { yPercent: 101 }, { yPercent: 0, duration: 0.6, ease: ease.inOut }, 0)
        .fromTo(b, { yPercent: 101 }, { yPercent: 0, duration: 0.6, ease: ease.inOut }, 0.08);
    },
    enter: (c) => {
      const [a, b] = volets(c);
      return gsap.timeline()
        .to(b, { yPercent: -101, duration: 0.7, ease: ease.inOut }, 0.05)
        .to(a, { yPercent: -101, duration: 0.7, ease: ease.inOut }, 0.12)
        .set(c, { autoAlpha: 0 });
    },
  });
}
