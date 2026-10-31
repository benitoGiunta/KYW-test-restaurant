// Motion globale « Quatre mains » : rideau en deux panneaux qui se rejoignent, loader « la ligne puis les deux
// couleurs », compteur mono, et le driver de la frontière (diptyque.ts).
import { gsap } from 'gsap';
import { ease, setLoaderExit, setLoaderFormat, setTransition } from '../engine';
import { loaderCourt } from '../engine/loader';
import { initDiptyque } from './diptyque';

export function setupMotion() {
  setLoaderFormat((p) => `${String(Math.round(p)).padStart(3, '0')} / 100`);

  // Sortie du loader : les textes montent, puis vert et moutarde se répandent depuis la ligne centrale vers les bords ;
  // le hero dessous a la même frontière à 50 %, le loader s'efface sur un décor identique (handoff continu).
  // REVISION-1 F2-02 : sortie raccourcie de 40 % sur petit écran / tactile.
  setLoaderExit((root) => {
    const k = loaderCourt() ? 0.45 : 0.6; // REVISION-1 (site) F2-05 : sortie ≈ 0,8 s bureau, 0,6 s mobile
    return gsap.timeline()
      .to(root.querySelectorAll('[data-loader-out]'), { yPercent: -110, duration: 0.6 * k, ease: ease.inOut, stagger: 0.05 * k })
      .to([root.querySelector('[data-loader-g]'), root.querySelector('[data-loader-d]')], { scaleX: 1, duration: 0.9 * k, ease: ease.inOut }, `-=${0.3 * k}`)
      .to(root.querySelector('[data-loader-bar]'), { autoAlpha: 0, duration: 0.2 * k }, `<${0.5 * k}`)
      .to(root, { autoAlpha: 0, duration: 0.35 * k, ease: 'none' });
  });

  // Transition de page : deux panneaux (vert depuis la gauche, moutarde depuis la droite) se rejoignent au centre.
  const panneaux = (c: HTMLElement) => [c.querySelector('.curtain__panel:not(.curtain__panel--d)'), c.querySelector('.curtain__panel--d')];
  setTransition({
    leave: (c) => {
      const [g, d] = panneaux(c);
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(g, { xPercent: -100 }, { xPercent: 0, duration: 0.8, ease: ease.inOut }, 0)
        .fromTo(d, { xPercent: 100 }, { xPercent: 0, duration: 0.8, ease: ease.inOut }, 0);
    },
    enter: (c) => {
      const [g, d] = panneaux(c);
      return gsap.timeline()
        .to(g, { xPercent: -100, duration: 0.9, ease: ease.inOut }, 0.1)
        .to(d, { xPercent: 100, duration: 0.9, ease: ease.inOut }, 0.1)
        .set(c, { autoAlpha: 0 });
    },
  });

  initDiptyque();
}
