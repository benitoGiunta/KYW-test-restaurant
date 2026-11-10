// Entrée de repos (motion.md « Idle state ») : t en secondes, x et y entre -0,5 et 0,5, retardés.
// Une seule horloge (gsap.ticker) ; à zéro en mouvement réduit ; au toucher, la vitesse de défilement remplace le pointeur.
import { gsap } from 'gsap';
import { onScroll, prefersReducedMotion, isTouch } from '../engine';

export const idle = { t: 0, x: 0, y: 0 };
let started = false;

export function startIdle() {
  if (started || prefersReducedMotion()) return;
  started = true;
  const touch = isTouch();
  const aim = { x: 0, y: 0 };
  if (touch) onScroll(({ velocity }) => { aim.x = gsap.utils.clamp(-0.5, 0.5, velocity / 40); });
  else addEventListener('pointermove', (e) => { aim.x = e.clientX / innerWidth - 0.5; aim.y = e.clientY / innerHeight - 0.5; }, { passive: true });
  gsap.ticker.add((t) => {
    const r = gsap.ticker.deltaRatio();
    if (touch) aim.x *= Math.pow(0.9, r);
    const k = 1 - Math.pow(0.95, r);
    idle.t = t; idle.x += (aim.x - idle.x) * k; idle.y += (aim.y - idle.y) * k;
  });
}
