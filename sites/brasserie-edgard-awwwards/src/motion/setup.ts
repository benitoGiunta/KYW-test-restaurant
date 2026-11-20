// Motion globale de la Brasserie Edgard, appelée une fois par l'adaptateur (engine/astro.ts).
// Transition : le bois sombre du mur balaie l'écran comme une aiguille fait le tour du cadran (secteur depuis midi, sens horaire),
// 0,8 s à l'aller, 0,9 s au retour. Puis le module pilote (cadran.ts) et le menu mobile.
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { menuMobile } from './menu';
import { cadran } from './cadran';

/** Secteur de a0 à a1 degrés (0 = midi, sens horaire), rayon assez grand pour couvrir les coins. */
function secteur(a0: number, a1: number) {
  const pts = ['50% 50%'];
  const pas = Math.max(2, Math.ceil((a1 - a0) / 12));
  for (let i = 0; i <= pas; i++) {
    const a = ((a0 + ((a1 - a0) * i) / pas) * Math.PI) / 180;
    pts.push(`${(50 + 110 * Math.sin(a)).toFixed(2)}% ${(50 - 110 * Math.cos(a)).toFixed(2)}%`);
  }
  return `polygon(${pts.join(', ')})`;
}

export function setupMotion() {
  setTransition({
    leave: (c) => {
      const panel = c.querySelector<HTMLElement>('.curtain__panel')!;
      const p = { a: 0 };
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .set(panel, { clipPath: secteur(0, 0.1) })
        .to(p, { a: 360, duration: 0.8, ease: ease.inOut, onUpdate: () => { panel.style.clipPath = secteur(0, Math.max(p.a, 0.1)); } })
        .set(panel, { clipPath: 'none' });
    },
    enter: (c) => {
      const panel = c.querySelector<HTMLElement>('.curtain__panel')!;
      const p = { a: 0 };
      return gsap.timeline({ delay: 0.05 })
        .to(p, { a: 360, duration: 0.9, ease: ease.inOut, onUpdate: () => { panel.style.clipPath = secteur(Math.min(p.a, 359.9), 360); } })
        .set(c, { autoAlpha: 0 })
        .set(panel, { clipPath: 'none' });
    },
  });
  cadran();
  menuMobile();
}
