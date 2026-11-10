// Module pilote « le pont » (patterns.md § 1). Une seule variable : la traversée (progression de la page, 0 à 1),
// complétée par une dérive de repos (le tablier glisse d'un bord à l'autre, sans jamais s'arrêter) et par le pointeur.
// Elle est distribuée à tout ce qui porte le concept :
//   [data-traversee]   filet doré sous l'en-tête : la part de la page déjà franchie (+ l'arche qui avance)
//   [data-pont]        motifs du pont (hero, pied, 404) : le tablier glisse, plus vite quand on défile
//   [data-arche]       signature : chaque photo s'ouvre en arche qui monte du sol (clip-path arrondi)
//   .hero__media img   l'assiette sous l'arche suit un peu le pointeur
// Tout passe par gsap.ticker (une horloge) ; rien ne bouge en mouvement réduit.
import { gsap } from 'gsap';

import { onPage, onScroll, ease, prefersReducedMotion } from '../engine';
import { idle, startIdle } from './idle';

const ARCHE_SOL = 'inset(100% 0% 0% 0% round 50% 50% 0% 0% / 30% 30% 0% 0%)';
const ARCHE_OUVERTE = 'inset(0% 0% 0% 0% round 50% 50% 0% 0% / 30% 30% 0% 0%)';
const PAS = 200; // largeur d'une travée du motif (unités du viewBox de Pont.astro)

let progress = 0;
let vitesse = 0;
let decalage = 0;
let fil: HTMLElement | null = null;
let marque: HTMLElement | null = null;
let assiette: HTMLElement | null = null;
const visibles = new Set<SVGPatternElement>();

function apply(p: number) {
  if (fil) fil.style.scale = `${p} 1`;
  if (marque) marque.style.translate = `calc(${p} * (100vw - 1.75rem)) 0`;
}

function tick(_t: number, dt: number) {
  // Le tablier franchit à vitesse constante (14 unités/s), accéléré par le défilement et dévié par le pointeur.
  const v = 14 + Math.min(Math.abs(vitesse) * 6, 160) + idle.x * 24;
  decalage = gsap.utils.wrap(0, PAS, decalage + (v * dt) / 1000);
  const tr = `translate(${-decalage.toFixed(2)} 0)`;
  visibles.forEach((p) => p.setAttribute('patternTransform', tr));
  if (assiette) gsap.set(assiette, { x: idle.x * -18, y: idle.y * -12 });
}

function signature() {
  const arches = gsap.utils.toArray<HTMLElement>('[data-arche]');
  arches.forEach((fig) => {
    const img = fig.querySelector('img');
    // Les arches d'une même rangée s'ouvrent l'une après l'autre (60 ms), de gauche à droite.
    const rang = fig.closest('[data-arches]');
    const i = rang ? [...rang.querySelectorAll('[data-arche]')].indexOf(fig) : 0;
    const tl = gsap.timeline({ scrollTrigger: { trigger: fig, start: 'top 88%', once: true }, delay: i * 0.06 });
    tl.fromTo(fig, { clipPath: ARCHE_SOL }, { clipPath: ARCHE_OUVERTE, duration: 1.4, ease: ease.out, clearProps: 'clipPath' }, 0);
    if (img) tl.fromTo(img, { scale: 1.25, yPercent: 8 }, { scale: 1, yPercent: 0, duration: 1.6, ease: ease.out, clearProps: 'transform' }, 0);
  });
}

function intro(tl: gsap.core.Timeline) {
  // Premier frame déjà complet (titre, photo, CTA peints) : l'intro ne cache rien, elle trace le pont et avance la marque.
  const tablier = document.querySelector<HTMLElement>('.hero__pont');
  if (tablier) tl.fromTo(tablier, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: ease.inOut, clearProps: 'clipPath' }, 0);
  if (assiette) tl.fromTo(assiette, { scale: 1.14 }, { scale: 1.06, duration: 1.6, ease: ease.out }, 0);
  if (fil) tl.fromTo(fil, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: ease.soft, clearProps: 'opacity' }, 0.2);
}

export function setupPont() {
  const motion = !prefersReducedMotion();
  if (motion) startIdle();
  onScroll(({ progress: p, velocity }) => { progress = p; vitesse = velocity; apply(p); });
  onPage(({ intro: tl }) => {
    fil = document.querySelector('[data-traversee] .traversee__fil');
    marque = document.querySelector('[data-traversee] .traversee__arche');
    assiette = motion ? document.querySelector('.hero__media img') : null;
    // Pages courtes (404) : l'état est épinglé par data-state, sinon la progression réelle.
    const epingle = document.querySelector<HTMLElement>('[data-state]')?.dataset.state;
    apply(epingle ? +epingle : progress);
    if (!motion) return () => { fil = marque = assiette = null; };

    if (assiette) gsap.set(assiette, { scale: 1.06 });
    signature();
    intro(tl);

    // Les motifs ne glissent que visibles (ensemble tenu par IntersectionObserver).
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      const p = (e.target as HTMLElement).querySelector('pattern');
      if (!p) return;
      if (e.isIntersecting) visibles.add(p); else visibles.delete(p);
    }));
    document.querySelectorAll('[data-pont]').forEach((el) => io.observe(el));
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      io.disconnect();
      visibles.clear();
      fil = marque = assiette = null;
    };
  });
}
