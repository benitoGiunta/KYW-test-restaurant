// Appelé une fois par start() (engine/astro.ts) : transition, pilote du concept, menu plein écran.
import { initRetrait } from './retrait';
import { initVolet } from './volet';
import { initStatut } from './statut';

export function setupMotion() {
  initRetrait();
  initVolet();
  initStatut();
}
