// Module pilote du concept « cadran » (patterns.md § 1) : une variable, l'heure de la journée de service,
// de 11:00 (haut de page) à 23:45 (pied). Elle est distribuée à tout ce qui porte le concept :
//   [data-horloge]  l'heure affichée dans l'en-tête (au quart d'heure, chiffres tabulaires) ;
//   [data-aiguille] la tache de la marque, qui tourne comme l'aiguille des heures ;
//   [data-cadran]   la tache du hero, qui tourne lentement sur elle-même (photo contre-tournée, toujours droite) ;
//   [data-deux]     les deux-points du pied « 23 : 45 », qui battent la seconde quand le pied est visible.
// Entrées : défilement (heure), pointeur (± 6° sur la tache), repos (dérive constante, idle.ts).
// Une page peut épingler son heure : <main data-state="1"> (404 = 23:45). Rien ne bouge en mouvement réduit.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll, prefersReducedMotion } from '../engine';
import { idle } from './idle';

const DEBUT = 11 * 60;            // 11:00
const FIN = 23 * 60 + 45;         // 23:45, l'heure du pied
const deux = (n: number) => String(n).padStart(2, '0');

/** Heure au quart d'heure pour une progression 0..1. */
export function heure(p: number) {
  const m = DEBUT + Math.round(((FIN - DEBUT) * gsap.utils.clamp(0, 1, p)) / 15) * 15;
  return `${deux(Math.floor(m / 60))}:${deux(m % 60)}`;
}

let courant = 0;
let horloge: HTMLElement | null = null;
let aiguille: HTMLElement | null = null;

const epingle = () => {
  const v = document.querySelector<HTMLElement>('[data-state]')?.dataset.state;
  return v ? +v : null;
};

function applique(p: number) {
  courant = p;
  if (horloge) {
    const h = heure(p);
    if (horloge.textContent !== h) horloge.textContent = h;
  }
  // Aiguille des heures : 11:00 = 330°, un tour complet en 12 h ; la dérive de repos s'ajoute dans le ticker.
  if (aiguille) aiguille.style.rotate = `${330 + ((FIN - DEBUT) * p * 0.5) + idle.x * 12}deg`;
}

export function startCadran() {
  const reduit = prefersReducedMotion();
  onScroll(({ progress }) => applique(epingle() ?? progress));

  onPage(() => {
    horloge = document.querySelector('[data-horloge]');
    aiguille = document.querySelector('[data-aiguille]');
    applique(epingle() ?? 0);
    if (reduit) return () => { horloge = aiguille = null; };

    // Repos de l'aiguille de la marque : le pointeur la fait hésiter (toujours à l'écran, en-tête fixe).
    const actifs = new Set<() => void>();
    const bascule = (fn: () => void, on: boolean) => {
      if (on && !actifs.has(fn)) { actifs.add(fn); gsap.ticker.add(fn); }
      if (!on && actifs.has(fn)) { actifs.delete(fn); gsap.ticker.remove(fn); }
    };
    const tickMarque = () => applique(epingle() ?? courant);
    bascule(tickMarque, true);

    // La tache du hero tourne à vitesse constante (3° par seconde), plus l'heure et le pointeur.
    const cadran = document.querySelector<HTMLElement>('[data-cadran]');
    const photo = cadran?.querySelector<HTMLElement>('picture');
    let t0 = idle.t;
    const tickCadran = () => {
      if (!cadran || !photo) return;
      const a = (idle.t - t0) * 3 + courant * 90 + idle.x * 6;
      cadran.style.rotate = `${a}deg`;
      photo.style.rotate = `${-a}deg`;
    };
    const st = cadran ? ScrollTrigger.create({
      trigger: cadran,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (s) => bascule(tickCadran, s.isActive),
    }) : null;
    bascule(tickCadran, !!cadran && cadran.getBoundingClientRect().top < innerHeight);

    // Les deux-points du pied battent la seconde, seulement quand le pied est visible.
    const points = document.querySelector<HTMLElement>('[data-deux]');
    const tickDeux = () => { if (points) points.style.opacity = Math.floor(idle.t) % 2 ? '0.15' : '1'; };
    const st2 = points ? ScrollTrigger.create({
      trigger: points,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (s) => { bascule(tickDeux, s.isActive); if (!s.isActive) points.style.opacity = '1'; },
    }) : null;

    return () => {
      actifs.forEach((fn) => gsap.ticker.remove(fn));
      actifs.clear();
      st?.kill();
      st2?.kill();
      horloge = aiguille = null;
      t0 = 0;
    };
  });
}
