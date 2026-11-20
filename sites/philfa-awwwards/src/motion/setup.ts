// Motion globale de PhilFa (phase 1 : seule la transition de page existe ; les entrées et le repos arrivent en phase 2).
// Transition : deux volets (rose des banquettes) qui se rejoignent au centre puis s'écartent, ≤ 0,9 s par sens (verbe : accorder).
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';

export function setupMotion() {
  const volets = (c: HTMLElement) => c.querySelectorAll<HTMLElement>('.curtain__panel');
  setTransition({
    leave: (c) => {
      const [a, b] = volets(c);
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(a, { xPercent: -101 }, { xPercent: 0, duration: 0.6, ease: ease.inOut }, 0)
        .fromTo(b, { xPercent: 101 }, { xPercent: 0, duration: 0.6, ease: ease.inOut }, 0);
    },
    enter: (c) => {
      const [a, b] = volets(c);
      return gsap.timeline()
        .to(a, { xPercent: -101, duration: 0.7, ease: ease.inOut }, 0.05)
        .to(b, { xPercent: 101, duration: 0.7, ease: ease.inOut }, 0.05)
        .set(c, { autoAlpha: 0 });
    },
  });
}
