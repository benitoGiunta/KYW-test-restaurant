// Mouvement « Deux voix ». Appelé une fois par l'adaptateur (engine/astro.ts) avant la première page.
// Transition : les deux battants du passe (cuisine à gauche, salle à droite) se rejoignent sur l'axe,
// le & safran s'allume au contact, puis les battants repartent chacun de son côté (0,5 s + 0,55 s).
// Pas de loader (Concept Card : une adresse de quartier répond en 3 s), pas de GL.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { startPasse } from './passe';
import { startSignature } from './signature';
import { startMenu } from './menu';

export function setupMotion() {
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__g'), { xPercent: -101 }, { xPercent: 0, duration: 0.5, ease: ease.inOut }, 0)
      .fromTo(c.querySelector('.curtain__d'), { xPercent: 101 }, { xPercent: 0, duration: 0.5, ease: ease.inOut }, 0)
      .fromTo(c.querySelector('.curtain__et'), { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: ease.out }, 0.32),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__et'), { autoAlpha: 0, duration: 0.2, ease: ease.soft }, 0)
      .to(c.querySelector('.curtain__g'), { xPercent: -101, duration: 0.55, ease: ease.inOut }, 0.1)
      .to(c.querySelector('.curtain__d'), { xPercent: 101, duration: 0.55, ease: ease.inOut }, 0.1)
      .set(c, { autoAlpha: 0 }),
  });
  startPasse();
  startSignature();
  startMenu();
}
