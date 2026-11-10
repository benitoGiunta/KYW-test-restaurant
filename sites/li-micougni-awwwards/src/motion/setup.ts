// Motion globale de Li Micougni « Les demi-fous ». Appelé une fois par l'adaptateur (start(setupMotion)).
// Transition de page : deux moitiés de rideau brun rouge se recollent (haute depuis la gauche, basse depuis
// la droite, coupe à 55 % comme les titres), puis le rideau entier se lève sur la page suivante.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { startIdle } from './idle';
import { startRecoller } from './recoller';
import { startMenu, fermerMenu } from './menu';

export function setupMotion() {
  const moities = (c: HTMLElement) => [c.querySelector<HTMLElement>('.curtain__h')!, c.querySelector<HTMLElement>('.curtain__b')!];
  setTransition({
    leave: (c) => {
      fermerMenu();
      const [h, b] = moities(c);
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .set([h, b], { y: 0 })
        .fromTo(h, { xPercent: -101 }, { xPercent: 0, duration: 0.75, ease: ease.inOut }, 0)
        .fromTo(b, { xPercent: 101 }, { xPercent: 0, duration: 0.75, ease: ease.inOut }, 0.06);
    },
    enter: (c) => gsap.timeline()
      .to(moities(c), { y: () => -innerHeight * 1.02, duration: 0.8, ease: ease.inOut, stagger: 0.05 }, 0.05)
      .set(c, { autoAlpha: 0 }),
  });
  startIdle();
  startRecoller();
  startMenu();
}
