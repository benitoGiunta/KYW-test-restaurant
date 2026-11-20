// Mouvement global, appelé une fois par l'adaptateur (engine/astro.ts) : rideau du concept, repos, pilote, menu.
// Le rideau avance de gauche à droite comme l'aiguille : un panneau gris rayé de la salle, son bord avant porte l'aiguille dorée.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { startIdle } from './idle';
import { startJournee } from './journee';
import { startMenu, fermerMenu } from './menu';

export function setupMotion() {
  const panneau = (c: HTMLElement) => c.querySelector<HTMLElement>('.curtain__panel--a')!;
  setTransition({
    leave: (c) => {
      fermerMenu();
      return gsap.timeline().set(c, { autoAlpha: 1 }).fromTo(panneau(c), { xPercent: -101 }, { xPercent: 0, duration: 0.75, ease: ease.inOut });
    },
    enter: (c) => gsap.timeline().to(panneau(c), { xPercent: 101, duration: 0.8, ease: ease.inOut }).set(c, { autoAlpha: 0 }),
  });
  startIdle();
  startJournee();
  startMenu();
}
