// Point d'entrée du mouvement, appelé une fois par l'adaptateur Astro (engine/astro.ts).
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { startPoints } from './points';
import { heroIntro } from './hero';
import { menuMobile } from './menu';

// Transition : la phrase se poursuit. Un panneau d'encre entre par la gauche, ses trois points
// s'allument un à un, puis il sort par la droite et découvre la page suivante (0,8 s et 0,9 s).
function transitionPoursuivre() {
  const panneau = (c: HTMLElement) => c.querySelector('.curtain__panel');
  const pts = (c: HTMLElement) => c.querySelectorAll('.curtain__pts i');
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .set(pts(c), { autoAlpha: 0, x: -14 })
      .fromTo(panneau(c), { xPercent: -100 }, { xPercent: 0, duration: 0.75, ease: ease.inOut }, 0)
      .to(pts(c), { autoAlpha: 1, x: 0, duration: 0.3, stagger: 0.07, ease: ease.soft }, 0.45),
    enter: (c) => gsap.timeline()
      .to(pts(c), { autoAlpha: 0, x: 14, duration: 0.25, stagger: 0.05, ease: ease.soft }, 0)
      .to(panneau(c), { xPercent: 100, duration: 0.85, ease: ease.inOut }, 0.05)
      .set(c, { autoAlpha: 0 }),
  });
}

export function setupMotion(): void {
  transitionPoursuivre();
  startPoints();
  heroIntro();
  menuMobile();
}
