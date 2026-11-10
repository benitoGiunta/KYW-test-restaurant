// Mouvement de Makimono : pilote du déroulé, menu mobile, transition de page.
// La transition est un rouleau de nori qui se déroule du haut vers le bas (couvre), puis s'enroule
// vers l'en-tête (découvre) : même physique que le site, chaque sens sous 1 s.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { setupDeroule } from './deroule';
import { setupMenu } from './menu';

export function setupMotion() {
  const panneau = (c: HTMLElement) => c.querySelector<HTMLElement>('.curtain__panel')!;
  setTransition({
    leave: (c) => gsap.timeline().set(c, { autoAlpha: 1 }).fromTo(panneau(c), { yPercent: -101 }, { yPercent: 0, duration: 0.65, ease: ease.inOut }),
    enter: (c) => gsap.timeline().to(panneau(c), { yPercent: -101, duration: 0.75, ease: ease.inOut }, 0.05).set(c, { autoAlpha: 0 }),
  });
  setupDeroule();
  setupMenu();
}
