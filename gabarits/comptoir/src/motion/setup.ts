// Motion globale du site : tourne une fois sur le client, avant l'initialisation de la première page.
// C'est ici qu'un gabarit enregistre setTransition, setLoaderFormat, setLoaderExit (et setBackground s'il ajoute le GL).
import { setLoaderFormat } from '../engine';

export function setupMotion() {
  setLoaderFormat((p) => String(Math.round(p)).padStart(3, '0'));
}
