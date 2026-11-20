// Motion globale de Carré d'herbes (phase 1 : rideau de transition seulement ; le reste vient en phase 2).
// Le rideau vert (la flamme du logo) monte comme un couvercle sur l'assiette puis se retire vers le haut.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';

export function setupMotion() {
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { yPercent: 100 }, { yPercent: 0, duration: 0.7, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { yPercent: -100, duration: 0.75, ease: ease.inOut, delay: 0.05 })
      .set(c, { autoAlpha: 0 }),
  });
}
