// Mouvement global : rideau de transition (la route qui avance), pilote du concept, menu, code de page.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { startMenu } from './menu';
import { startRoute } from './route';
import { startPages } from './pages';

export function setupMotion() {
  // Le rideau coulisse de gauche à droite, comme la route qu'on avance : son bord porte le fil et le voyageur.
  const panneau = (c: HTMLElement) => c.querySelector<HTMLElement>('.curtain__panel')!;
  setTransition({
    leave: (c) => gsap.timeline().set(c, { autoAlpha: 1 }).fromTo(panneau(c), { xPercent: -101 }, { xPercent: 0, duration: 0.6, ease: ease.inOut }),
    enter: (c) => gsap.timeline().to(panneau(c), { xPercent: 101, duration: 0.65, ease: ease.inOut }).set(c, { autoAlpha: 0 }),
  });
  startRoute();
  startPages();
  startMenu();
}
