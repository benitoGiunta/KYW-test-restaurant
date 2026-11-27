// Motion globale de Monepi (phase 1 : socle seulement ; tamis, transition et repos arrivent en phase 2).
import { onScroll } from '../engine';

export function setupMotion() {
  let last = 0;
  onScroll(({ y }) => {
    if (Math.abs(y - last) < 4) return;
    document.documentElement.classList.toggle('frame-away', y > 200 && y > last);
    last = y;
  });
}
