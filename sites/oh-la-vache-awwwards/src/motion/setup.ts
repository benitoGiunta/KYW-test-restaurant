// Mouvement global, appelé une fois par start(setupMotion) : rideau en balayage d'aiguille, repos, pilote du cadran, menu.
import { gsap } from 'gsap';
import { setTransition, ease, onPage, prefersReducedMotion } from '../engine';
import { startIdle } from './idle';
import { startCadran } from './cadran';
import { startMenu } from './menu';

export function setupMotion() {
  // Transition : le rideau noir balaie l'écran comme une aiguille fait le tour du cadran (masque conique sur
  // --a, 0 à 360°), puis se retire en continuant dans le même sens (--b). 0,7 s par sens, ease.inOut.
  const panneau = (c: HTMLElement) => c.querySelector<HTMLElement>('.curtain__panel--a')!;
  setTransition({
    leave: (c) => gsap.timeline().set(c, { autoAlpha: 1 })
      .fromTo(panneau(c), { '--a': '0deg', '--b': '0deg' }, { '--a': '360deg', duration: 0.7, ease: ease.inOut }, 0),
    enter: (c) => gsap.timeline()
      .fromTo(panneau(c), { '--b': '0deg' }, { '--b': '360deg', duration: 0.7, ease: ease.inOut }, 0)
      .set(c, { autoAlpha: 0 }),
  });
  startIdle();
  startCadran();
  startMenu();

  // Intro du hero : la tache se pose en tournant (enveloppe dédiée, jamais celle que le pilote fait tourner).
  onPage(({ intro }) => {
    const pose = document.querySelector<HTMLElement>('[data-pose]');
    if (!pose || prefersReducedMotion()) return;
    intro.fromTo(pose, { scale: 0.78, rotate: -35 }, { scale: 1, rotate: 0, duration: 1.4, ease: ease.out, clearProps: 'transform' }, 0.1);
  });
}
