// Mouvement global. Pas de loader ni de WebGL (DESIGN.md « Théâtre »).
// Transition : le store du soir descend sur la page puis la libère (verbe « prolonger », physique d'un rideau de façade).
import { gsap } from 'gsap';
import { ease, setTransition } from '../engine';
import { setupJour } from './jour';
import { setupMenu } from './menu';

export function setupMotion() {
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { yPercent: -100 }, { yPercent: 0, duration: 0.7, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { yPercent: 100, duration: 0.8, ease: ease.inOut })
      .set(c, { autoAlpha: 0 }),
  });
  setupJour();
  setupMenu();
}
