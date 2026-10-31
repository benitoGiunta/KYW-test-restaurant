// Motion globale des Potes au Feu : tourne une fois sur le client, avant la première page.
// Pas de loader (décision DESIGN.md : brief calme, le premier frame est l'assiette qui se pose).
import { gsap } from 'gsap';
import { setTransition, onScroll, onPage, ease, prefersReducedMotion } from '../engine';
import { startIdle } from './idle';
import { startService } from './service';
import { buttonFill } from './hovers';
import { menuMobile } from './menu';
import { apercuCarte } from './carte';

export function setupMotion() {
  // Transition « le plateau passe » : un panneau couleur chêne traverse l'écran de droite à gauche, comme une
  // assiette que l'on fait glisser sur la table, puis continue sa route (≤ 1 s par sens).
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { xPercent: 104, skewX: -6 }, { xPercent: 0, skewX: 0, duration: 0.8, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { xPercent: -104, skewX: 6, duration: 0.9, ease: ease.inOut })
      .set(c, { autoAlpha: 0 }),
  });

  // Le cadre s'écarte au défilement vers le bas et revient en remontant (patterns.md § 6).
  let last = 0;
  onScroll(({ y }) => {
    if (Math.abs(y - last) < 4) return;
    document.documentElement.classList.toggle('frame-away', y > 160 && y > last);
    last = y;
  });

  // Intro du hero de l'accueil : l'assiette se pose (glisse depuis la droite en tournant, puis s'immobilise).
  // Transform seul, jamais d'opacité : la photo est peinte au premier rendu et reste l'élément LCP (lecons.md).
  onPage(({ intro }) => {
    const plate = document.querySelector<HTMLElement>('[data-hero-plate]');
    if (!plate || prefersReducedMotion()) return;
    gsap.set(plate, { xPercent: 45, rotate: 22 });
    intro.add(gsap.to(plate, { xPercent: 0, rotate: 0, duration: 1.5, ease: ease.out }), 0.1);
  });

  startIdle();
  startService();
  buttonFill();
  menuMobile();
  apercuCarte();
}
