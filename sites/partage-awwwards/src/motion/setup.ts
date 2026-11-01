// Motion globale de Partage : tourne une fois sur le client, avant la première page.
// Pas de loader ni de WebGL (DESIGN.md « Théâtre ») : le premier frame est le mot lui-même.
import { gsap } from 'gsap';
import { setTransition, onScroll, ease } from '../engine';
import { partage } from './partage';
import { menuMobile } from './menu';

export function setupMotion() {
  // Transition « on dresse la table » : deux demi-nappes de chêne glissent des bords et se rejoignent au milieu ;
  // réunies, elles lisent PARTAGE en entier. À l'arrivée elles s'écartent : le mot se recoupe sur la nouvelle page.
  // 0,7 s à l'aller, 0,8 s au retour (≤ 1 s par sens).
  setTransition({
    leave: (c) => {
      const [g, d] = [c.querySelector('.curtain__g'), c.querySelector('.curtain__d')];
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(g, { xPercent: -101 }, { xPercent: 0, duration: 0.7, ease: ease.inOut }, 0)
        .fromTo(d, { xPercent: 101 }, { xPercent: 0, duration: 0.7, ease: ease.inOut }, 0);
    },
    enter: (c) => {
      const [g, d] = [c.querySelector('.curtain__g'), c.querySelector('.curtain__d')];
      return gsap.timeline()
        .to(g, { xPercent: -101, duration: 0.8, ease: ease.inOut }, 0.05)
        .to(d, { xPercent: 101, duration: 0.8, ease: ease.inOut }, 0.05)
        .set(c, { autoAlpha: 0 });
    },
  });

  // L'en-tête s'écarte au défilement vers le bas et revient en remontant (patterns.md § 6).
  let dernier = 0;
  onScroll(({ y }) => {
    if (Math.abs(y - dernier) < 4) return;
    document.documentElement.classList.toggle('frame-away', y > 240 && y > dernier && !document.querySelector('.menu:not([hidden])'));
    dernier = y;
  });

  partage();
  menuMobile();
}
