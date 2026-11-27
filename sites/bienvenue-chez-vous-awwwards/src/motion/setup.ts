// Mouvement global du site : exécuté une fois côté client, avant l'initialisation de la première page.
// Pas de loader (décision du concept, DESIGN.md) : setLoaderFormat n'est pas utilisé.
// Transition de page : l'assiette rouge s'ouvre depuis le point de clic, puis se referme sur la première escale
// de la page suivante (clip-path en cercle, ease.inOut, 0,7 s par sens).
import { gsap } from 'gsap';
import { setTransition, ease } from '../engine';
import { startEscales } from './escales';

let origine = { x: 50, y: 50 }; // en pour cent de la fenêtre

function noterOrigine(e: MouseEvent) {
  const cible = (e.target as Element | null)?.closest('a');
  if (!cible) return;
  if (e.detail === 0) { // clic au clavier : centre du lien activé
    const r = cible.getBoundingClientRect();
    origine = { x: ((r.left + r.width / 2) / innerWidth) * 100, y: ((r.top + r.height / 2) / innerHeight) * 100 };
  } else {
    origine = { x: (e.clientX / innerWidth) * 100, y: (e.clientY / innerHeight) * 100 };
  }
}

function premiereEscale() {
  const route = document.querySelector('.route');
  if (!route) return { x: 50, y: 30 };
  const r = route.getBoundingClientRect();
  return { x: ((r.left + 12) / innerWidth) * 100, y: Math.min(((r.top + 60) / innerHeight) * 100, 60) };
}

export function setupMotion() {
  document.addEventListener('click', noterOrigine, { capture: true, passive: true });
  setTransition({
    leave: (c) => {
      const p = c.querySelector('.curtain__panel');
      const { x, y } = origine;
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(p, { clipPath: `circle(0% at ${x}% ${y}%)` }, { clipPath: `circle(150% at ${x}% ${y}%)`, duration: 0.7, ease: ease.inOut });
    },
    enter: (c) => {
      const p = c.querySelector('.curtain__panel');
      const { x, y } = premiereEscale();
      return gsap.timeline()
        .fromTo(p, { clipPath: `circle(150% at ${x}% ${y}%)` }, { clipPath: `circle(0% at ${x}% ${y}%)`, duration: 0.7, ease: ease.inOut })
        .set(c, { autoAlpha: 0 });
    },
  });
  startEscales();
}
