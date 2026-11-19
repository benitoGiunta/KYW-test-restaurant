// Motion globale de Yayami : tourne une fois sur le client, avant la première page.
// Pas de loader ni de WebGL (DESIGN.md « Théâtre »). Transition : deux volets rouges qui se posent
// l'un contre l'autre (la paire) puis s'écartent ; module pilote ./paire.ts ; menu plein écran ./menu.ts.
import { gsap } from 'gsap';
import { setTransition, onScroll, ease } from '../engine';
import { menuMobile } from './menu';
import { startPaire } from './paire';

export function setupMotion() {
  const volets = (c: HTMLElement) => c.querySelectorAll<HTMLElement>('.curtain__panel');
  setTransition({
    leave: (c) => {
      const [a, b] = volets(c);
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(a, { yPercent: -101 }, { yPercent: 0, duration: 0.6, ease: ease.inOut }, 0)
        .fromTo(b, { yPercent: 101 }, { yPercent: 0, duration: 0.6, ease: ease.inOut }, 0.04);
    },
    enter: (c) => {
      const [a, b] = volets(c);
      return gsap.timeline()
        .to(a, { yPercent: -101, duration: 0.7, ease: ease.inOut }, 0.05)
        .to(b, { yPercent: 101, duration: 0.7, ease: ease.inOut }, 0.09)
        .set(c, { autoAlpha: 0 });
    },
  });
  // L'en-tête s'écarte quand on descend, revient quand on remonte (patterns.md § 6) : rien ne couvre le texte.
  let dernier = 0;
  onScroll(({ y }) => {
    if (Math.abs(y - dernier) < 4) return;
    document.documentElement.classList.toggle('frame-away', y > 240 && y > dernier && !document.querySelector('.menu:not([hidden])'));
    dernier = y;
  });
  menuMobile();
  startPaire();
}
