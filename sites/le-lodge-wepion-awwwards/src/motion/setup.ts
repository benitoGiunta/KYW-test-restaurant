// Mise en mouvement du site « Deux rives » : rideau de page (la berge qui traverse l'écran), pilote de la berge
// (défilement, pointeur, repos) et menu plein écran du téléphone. Appelé une fois par l'adaptateur Astro.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { startMenu } from './menu';
import { startBerge } from './berge';

export function setupMotion() {
  // Verbe « traverser » : tout entre par la droite et sort par la gauche, comme un bac.
  // Le jour d'Erpent aborde le premier, la nuit suit avec le trait ambre de la berge sur son bord.
  const panneaux = (c: HTMLElement) => [c.querySelector<HTMLElement>('.curtain__panel--b')!, c.querySelector<HTMLElement>('.curtain__panel--a')!];
  setTransition({
    leave: (c) => {
      const [b, a] = panneaux(c);
      return gsap.timeline().set(c, { autoAlpha: 1 })
        .fromTo(b, { xPercent: 101 }, { xPercent: 0, duration: 0.75, ease: ease.inOut }, 0)
        .fromTo(a, { xPercent: 101 }, { xPercent: 0, duration: 0.75, ease: ease.inOut }, 0.12);
    },
    enter: (c) => {
      const [b, a] = panneaux(c);
      return gsap.timeline()
        .to(a, { xPercent: -101, duration: 0.8, ease: ease.inOut }, 0)
        .to(b, { xPercent: -101, duration: 0.8, ease: ease.inOut }, 0.1)
        .set(c, { autoAlpha: 0 });
    },
  });
  startBerge();
  startMenu();
}
