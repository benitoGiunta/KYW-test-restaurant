// Motion globale de Chez Guillaume. Phase 1 : menu mobile et rideau de transition par défaut de l'engine
// (panneau bordeaux `--c-curtain`). La signature (time-code de régie qui roule) arrive en phase 2.
import { menuMobile } from './menu';

export function setupMotion() {
  menuMobile();
}
