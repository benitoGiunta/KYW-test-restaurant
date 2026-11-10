// Motion globale du Servais « La Ligne ». Appelé une fois par l'adaptateur (start) :
// transition « départ de cabine » (le rideau turquoise monte d'un bloc puis repart vers le haut, 0,7 s et 0,8 s),
// entrée de repos, module pilote de la ligne (cabine, stations, pendule), menu mobile.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { startIdle } from './idle';
import { startLigne } from './ligne';
import { startMenu } from './menu';

export function setupMotion() {
  const panneau = (c: HTMLElement) => c.querySelector<HTMLElement>('.curtain__panel')!;
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(panneau(c), { yPercent: 101 }, { yPercent: 0, duration: 0.7, ease: ease.inOut }, 0),
    enter: (c) => gsap.timeline()
      .to(panneau(c), { yPercent: -101, duration: 0.8, ease: ease.inOut }, 0.05)
      .set(c, { autoAlpha: 0 }),
  });
  startIdle();
  startLigne();
  startMenu();
}
