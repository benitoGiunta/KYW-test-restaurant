// Motion globale de Dumont Bouge « Sept à dix-huit ». Verbe : dérouler. Une famille d'easing (ease.* de l'engine).
// Transition : le rideau rose se déroule de gauche à droite, puis repart à droite (≤ 1 s par sens).
// Pas de loader (décision de la Concept Card), pas de GL.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { startJournee } from './journee';
import { startMenu } from './menu';

export function setupMotion() {
  const volet = (c: HTMLElement) => c.querySelector<HTMLElement>('.curtain__panel')!;
  setTransition({
    leave: (c) => gsap.timeline().set(c, { autoAlpha: 1 }).fromTo(volet(c), { xPercent: -101 }, { xPercent: 0, duration: 0.7, ease: ease.inOut }, 0),
    enter: (c) => gsap.timeline().to(volet(c), { xPercent: 101, duration: 0.8, ease: ease.inOut }, 0.05).set(c, { autoAlpha: 0 }),
  });
  startJournee();
  startMenu();
}
