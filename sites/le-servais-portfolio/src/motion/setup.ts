// Motion globale « Journée » : le loader compte de 00:00 à l'heure réelle, le rideau est un soleil qui se lève
// (cercle depuis le bas), puis le driver du ciel prend la main.
import { gsap } from 'gsap';
import { setLoaderFormat, setLoaderExit, setTransition, ease } from '../engine';
import { initJournee } from './journee';

const pad = (n: number) => String(n).padStart(2, '0');

export function setupMotion() {
  const d = new Date();
  const cible = d.getHours() * 60 + d.getMinutes();
  setLoaderFormat((p) => { const m = Math.round((cible * p) / 100); return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`; });
  setLoaderExit((root) =>
    gsap.timeline()
      .to(root.querySelectorAll('[data-loader-out]'), { yPercent: -110, duration: 0.45, ease: ease.inOut, stagger: 0.05 })
      .to(root, { clipPath: 'inset(0% 0% 100% 0%)', duration: matchMedia('(max-width: 767px)').matches ? 0.5 : 0.8, ease: ease.inOut }, '-=0.2'),
  );
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { clipPath: 'circle(0% at 50% 110%)' }, { clipPath: 'circle(160% at 50% 110%)', duration: 0.8, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { yPercent: -100, duration: 0.85, ease: ease.inOut })
      .set(c, { autoAlpha: 0 })
      .set(c.querySelector('.curtain__panel'), { yPercent: 0, clipPath: 'circle(0% at 50% 110%)' }),
  });
  initJournee();
}
