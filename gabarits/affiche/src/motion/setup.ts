// Motion globale du gabarit « Affiche » (verbe : claque comme un volet).
// Rideau d'entrée : 4 bandes qui se lèvent en stagger ; transition : une affiche rouge descend par clip-path
// puis se décolle vers le haut ; les drivers de page (empile, galerie, marquee, horaires, idle) sont enregistrés ici.
import { gsap } from 'gsap';
import { ease, setLoaderExit, setLoaderFormat, setTransition } from '../engine';
import { registerDrivers } from './drivers';

/** Le « clap » : pops courts et nets, partagé par toutes les cartes. */
export const clap = { duration: 0.35, ease: ease.spring } as const;

export function setupMotion() {
  setLoaderFormat((p) => String(Math.round(p)).padStart(3, '0'));

  setLoaderExit((root) =>
    gsap
      .timeline()
      .to(root.querySelectorAll('[data-loader-out]'), { yPercent: -120, autoAlpha: 0, duration: 0.5, ease: ease.inOut })
      .to(root.querySelectorAll('[data-loader-bande]'), { yPercent: -100, duration: 0.9, ease: ease.inOut, stagger: 0.07 }, '-=0.3')
      .to(root, { autoAlpha: 0, duration: 0.01 }),
  );

  setTransition({
    leave: (c) =>
      gsap
        .timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(c.querySelector('.curtain__panel'), { clipPath: 'inset(0% 0% 100% 0%)', yPercent: 0 }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: ease.inOut }),
    enter: (c) =>
      gsap
        .timeline()
        .to(c.querySelector('.curtain__panel'), { yPercent: -100, duration: 0.9, ease: ease.inOut })
        .set(c, { autoAlpha: 0 })
        .set(c.querySelector('.curtain__panel'), { clearProps: 'all' }),
  });

  registerDrivers();
}
