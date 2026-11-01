// Motion globale de La Dolce Vita, appelée une fois par l'adaptateur (engine/astro.ts).
// Transition : la salle s'éteint (rideau `--c-curtain`, coupure franche en deux battements comme un interrupteur
// fatigué, 0,32 s), puis la page suivante sort du noir (0,6 s) pendant que son néon s'allume (intro).
// Pilote : src/motion/neon.ts (allumage, bourdonnement de repos, pointeur). Menu : src/motion/menu.ts.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { startIdle, startNeon, startMesures } from './neon';
import { menuMobile } from './menu';

export function setupMotion() {
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1, opacity: 0.55 }, 0)
      .set(c, { opacity: 0.2 }, 0.07)
      .to(c, { opacity: 1, duration: 0.24, ease: ease.inOut }, 0.08),
    enter: (c) => gsap.timeline().to(c, { autoAlpha: 0, duration: 0.6, ease: ease.out, delay: 0.05 }),
  });
  startIdle();
  startMesures();
  startNeon();
  menuMobile();
}
