// Motion globale de La Brasserie du Quai : tourne une fois sur le client, avant la première page.
// Pas de loader ni de WebGL (DESIGN.md « Théâtre »). Phase 1 : transition d'eau, en-tête qui s'écarte, menu.
// Phase 2 : module pilote ./quai.ts (houle du reflet, crue, échelle, verbe « accoster »).
import { gsap } from 'gsap';
import { setTransition, onScroll, ease } from '../engine';
import { menuMobile } from './menu';
import { startQuai } from './quai';

export function setupMotion() {
  // Transition « la Meuse monte » : l'eau couvre la page depuis le bas (0,7 s), puis se retire vers le haut (0,8 s).
  setTransition({
    leave: (c) => {
      const p = c.querySelector('.curtain__panel');
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(p, { yPercent: 101 }, { yPercent: 0, duration: 0.7, ease: ease.inOut });
    },
    enter: (c) => {
      const p = c.querySelector('.curtain__panel');
      return gsap.timeline()
        .to(p, { yPercent: -101, duration: 0.8, ease: ease.inOut }, 0.05)
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

  menuMobile();
  startQuai();
}
