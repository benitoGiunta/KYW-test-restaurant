// Motion globale de L'Atelier de Bossimé : tourne une fois sur le client, avant la première page.
// Pas de loader ni de WebGL (DESIGN.md « Théâtre ») : le premier frame est le mot lui-même.
import { gsap } from 'gsap';
import { setTransition, onScroll, ease } from '../engine';
import { startIdle } from './idle';
import { startAccents, poser } from './accents';
import { biais } from './biais';
import { apercuCarte } from './carte';
import { menuMobile } from './menu';

export function setupMotion() {
  // Transition « un trait en biais » : une bande aubergine, inclinée à la pente de l'accent, traverse l'écran
  // de droite à gauche ; pendant qu'elle couvre la page, les trois accents s'y posent puis s'effacent (≤ 1 s par sens).
  setTransition({
    leave: (c) => {
      const svg = c.querySelector('[data-accents="rideau"]');
      const o = { v: 0 };
      poser(svg, 0);
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(c.querySelector('.curtain__panel'), { xPercent: 105, skewX: -28 }, { xPercent: 0, skewX: -28, duration: 0.75, ease: ease.inOut })
        .to(o, { v: 1, duration: 0.45, ease: 'power2.out', onUpdate: () => poser(svg, o.v) }, 0.4);
    },
    enter: (c) => {
      const svg = c.querySelector('[data-accents="rideau"]');
      return gsap.timeline()
        .to(svg, { autoAlpha: 0, duration: 0.25 }, 0)
        .to(c.querySelector('.curtain__panel'), { xPercent: -105, skewX: -28, duration: 0.85, ease: ease.inOut }, 0.05)
        .set(svg, { autoAlpha: 1 })
        .set(c, { autoAlpha: 0 });
    },
  });

  // L'en-tête s'écarte au défilement vers le bas et revient en remontant (patterns.md § 6).
  let last = 0;
  onScroll(({ y }) => {
    if (Math.abs(y - last) < 4) return;
    document.documentElement.classList.toggle('frame-away', y > 200 && y > last);
    last = y;
  });

  startIdle();
  startAccents();
  biais();
  apercuCarte();
  menuMobile();
}
