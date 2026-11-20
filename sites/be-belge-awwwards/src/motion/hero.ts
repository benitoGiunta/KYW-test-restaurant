// Intro du hero : les points s'allument (pilote), puis « et d'ailleurs » glisse depuis la gauche et
// se pose : la phrase se poursuit. Titre et accroche restent peints dès le premier rendu (LCP).
import { gsap } from 'gsap';
import { onPage, ease, prefersReducedMotion } from '../engine';

export const heroIntro = () => onPage(({ intro }) => {
  if (prefersReducedMotion()) return;
  const suite = document.querySelector<HTMLElement>('[data-hero-suite]');
  const img = document.querySelector<HTMLElement>('.hero__photo img');
  if (suite) {
    gsap.set(suite, { xPercent: -10, autoAlpha: 0 });
    intro.to(suite, { xPercent: 0, autoAlpha: 1, duration: 1.1, ease: ease.out }, 0.95);
  }
  if (img) intro.fromTo(img, { scale: 1.08 }, { scale: 1, duration: 1.6, ease: ease.out }, 0);
  intro.eventCallback('onComplete', () => document.documentElement.classList.add('intro-faite'));
});
