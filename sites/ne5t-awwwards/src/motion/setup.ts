// Mouvement d'Intuition, appelé une fois par l'adaptateur (engine/astro.ts).
// Transition : la nuit passe comme on change de service, le nom « Intuition » pressenti au passage (≤ 1 s par sens).
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { startImpression } from './impression';
import { startImpressions } from './impressions';
import { startMenu } from './menu';

export function setupMotion() {
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { yPercent: 100 }, { yPercent: 0, duration: 0.85, ease: ease.inOut })
      .fromTo(c.querySelector('.curtain__mot'), { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 0.35, duration: 0.6, ease: ease.soft }, 0.3),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__mot'), { opacity: 1, duration: 0.25, ease: ease.soft })
      .to(c.querySelector('.curtain__panel'), { yPercent: -100, duration: 0.85, ease: ease.inOut }, 0.1)
      .set(c, { autoAlpha: 0 }),
  });
  startImpressions();
  startImpression();
  startMenu();
}
