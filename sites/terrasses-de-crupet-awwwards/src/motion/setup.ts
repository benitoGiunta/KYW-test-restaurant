// Appelé une fois par l'adaptateur (engine/astro.ts). Pas de loader (décision de concept, DESIGN.md).
import { startConcept } from './miroirs';
import { startPassage } from './passage';
import { startMenu } from './menu';

export function setupMotion() {
  startPassage();
  startConcept();
  startMenu();
}
