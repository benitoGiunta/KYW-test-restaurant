// Motion globale de Partage : tourne une fois sur le client, avant la première page.
// Phase 1 : seulement le menu accessible. Phases 2 et 3 : la coupure du mot (module pilote `partage.ts`),
// la transition « deux demi-nappes qui se rejoignent au milieu » (setTransition) et l'état de repos.
import { menuMobile } from './menu';

export function setupMotion() {
  menuMobile();
}
