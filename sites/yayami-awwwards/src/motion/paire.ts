// Module pilote « Deux pièces » (patterns.md § 1). Une variable : p, la distance entre les deux pièces
// d'une paire ([data-paire]). p suit le défilement de la section de la paire (0 = écartées, 1 = posées
// l'une contre l'autre) ; une page peut l'épingler (data-state, 404 : la pièce manque toujours).
// Le sceau (rouge, [data-piece="sceau"]) se pose à l'intro ; le jumeau en filet ([data-piece="jumeau"])
// arrive ensuite, se penche vers le pointeur et tourne lentement au repos comme un plateau.
// Une seule horloge : gsap.ticker ; la paire n'est calculée que si elle est à l'écran.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, ease, prefersReducedMotion } from '../engine';
import { idle, startIdle } from './idle';

type Paire = { sceau: HTMLElement | null; jumeau: HTMLElement; loin: number[]; p: number; entree: number };
const actives = new Set<Paire>();

function apply(q: Paire) {
  const d = (1 - q.p) * (1 + (1 - q.entree) * 1.2); // à l'intro le jumeau vient de plus loin
  gsap.set(q.jumeau, {
    xPercent: q.loin[0] * d + idle.x * 14,
    yPercent: q.loin[1] * d + idle.y * 10,
    rotation: idle.t * 18, // le filet pointillé tourne : 18 degrés par seconde
    scale: 1 + 0.07 * Math.sin(idle.t * 1.4), // et respire de 7 %
    autoAlpha: q.entree,
  });
}
const tick = () => actives.forEach(apply);

export function startPaire() {
  if (prefersReducedMotion()) return; // repli : la paire reste posée et immobile (CSS)
  startIdle();
  gsap.ticker.add(tick);
  onPage(({ intro }) => {
    const els = [...document.querySelectorAll<HTMLElement>('[data-paire]')];
    els.forEach((el, i) => {
      const jumeau = el.querySelector<HTMLElement>('[data-piece="jumeau"]');
      if (!jumeau) return;
      const etat = el.dataset.state;
      const q: Paire = {
        sceau: el.querySelector<HTMLElement>('[data-piece="sceau"]'),
        jumeau,
        loin: (el.dataset.loin || '0,0').split(',').map(Number),
        p: etat != null ? +etat : 0,
        entree: 0,
      };
      const section = el.closest<HTMLElement>('section') ?? el;
      if (etat == null) ScrollTrigger.create({ trigger: section, start: 'top top', end: 'bottom 35%', onUpdate: (s) => { q.p = s.progress; } });
      const vue = ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onToggle: (s) => (s.isActive ? actives.add(q) : actives.delete(q)) });
      if (vue.isActive) actives.add(q);
      apply(q);
      // Le moment signature : le sceau se pose (ressort léger), puis le jumeau glisse vers lui.
      if (q.sceau) intro.add(gsap.fromTo(q.sceau, { autoAlpha: 0, scale: 1.5, rotation: -14 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.9, ease: ease.spring }), 0.15 + i * 0.08);
      intro.add(gsap.to(q, { entree: 1, duration: 1.2, ease: ease.out, onUpdate: () => apply(q) }), 0.6 + i * 0.08);
    });
    return () => actives.clear();
  });
}
