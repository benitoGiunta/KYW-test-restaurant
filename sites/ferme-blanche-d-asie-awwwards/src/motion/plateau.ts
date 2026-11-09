// Module pilote « plateau tournant » (patterns.md § 1). Une seule variable : l'angle du plateau, en degrés.
//   angle = repos (écoulement lent, 3 degrés par seconde)
//         + défilement (un tour par page, par crans de 15 degrés que l'on rattrape en ralentissant : « tourner d'un cran »)
//         + pointeur (le plateau se penche de 12 degrés au plus vers la main ; au toucher, la vitesse de défilement)
//         + intro (le plateau arrive d'un tiers de tour en arrière au chargement de chaque page)
// Distribuée à tout ce qui porte le concept par `--rot` (anneau du hero, ronds de catégorie, sceau, rond 404, menu),
// écrite seulement sur les porteurs visibles (IntersectionObserver), jamais sur <html>. À zéro en mouvement réduit.
import { gsap } from 'gsap';
import { onPage, onScroll, isTouch, prefersReducedMotion, ease } from '../engine';

const CRAN = 15;          // degrés par cran de défilement
const REPOS = 3;          // degrés par seconde au repos (diff mesurée : 0,77 % en 1,2 s à 4 degrés, sous le seuil settled de 1 %)
const PENCHE = 12;        // influence maximale du pointeur, en degrés
const TOUR = 360;         // un tour sur toute la page

export const plateau = { angle: 0, intro: 0, ouverture: 1 };
let started = false;

/** Entrée de repos et horloge unique (gsap.ticker). Appelée une fois depuis setup.ts. */
export function startIdle() {
  if (started || prefersReducedMotion()) return;
  started = true;
  const touch = isTouch();
  const vise = { cran: 0, penche: 0 };
  const lu = { cran: 0, penche: 0, repos: 0 };
  let progression = 0;

  onScroll((s) => {
    progression = s.progress || 0;
    if (touch) vise.penche = gsap.utils.clamp(-1, 1, (s.velocity || 0) / 30);
  });
  if (!touch) addEventListener('pointermove', (e) => { vise.penche = (e.clientX / innerWidth - 0.5) * 2; }, { passive: true });

  gsap.ticker.add((_t, dt) => {
    const r = gsap.ticker.deltaRatio();
    if (!document.hidden) lu.repos += (REPOS * dt) / 1000;
    vise.cran = Math.round((progression * TOUR) / CRAN) * CRAN;
    lu.cran += (vise.cran - lu.cran) * (1 - Math.pow(0.9, r));       // rattrape le cran, ralentit en fin de course
    if (touch) vise.penche *= Math.pow(0.92, r);
    lu.penche += (vise.penche - lu.penche) * (1 - Math.pow(0.95, r));
    plateau.angle = lu.repos + lu.cran + lu.penche * PENCHE + plateau.intro;
    porteurs.forEach((el) => {
      const sens = el.dataset.sens === '-1' ? -1 : 1;
      const k = parseFloat(el.dataset.rapport || '1');
      el.style.setProperty('--rot', `${(plateau.angle * k * sens).toFixed(2)}deg`);
    });
  });
}

// Porteurs visibles : ceux qui coupent la fenêtre. Un porteur hors écran ne reçoit rien (pause hors écran).
const porteurs = new Set<HTMLElement>();

export function plateauPages() {
  onPage(({ intro }) => {
    if (prefersReducedMotion()) return;
    const els = [...document.querySelectorAll<HTMLElement>('[data-rot]')];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? porteurs.add(e.target as HTMLElement) : porteurs.delete(e.target as HTMLElement)));
    }, { rootMargin: '10% 0px' });
    els.forEach((el) => io.observe(el));

    // Intro : le plateau arrive d'un tiers de tour, l'anneau s'allume, le disque se pose (sans opacité : déjà peint).
    plateau.intro = -120;
    const anneau = document.querySelector<SVGTextElement>('.plateau__anneau text');
    const disque = document.querySelector<HTMLElement>('.plateau__disque');
    intro.to(plateau, { intro: 0, duration: 1.6, ease: ease.out }, 0);
    if (anneau) intro.fromTo(anneau, { opacity: 0 }, { opacity: 1, duration: 0.9, ease: ease.out }, 0.1);
    if (disque) intro.fromTo(disque, { scale: 0.9 }, { scale: 1, duration: 1.4, ease: ease.out, clearProps: 'transform' }, 0);

    return () => {
      io.disconnect();
      els.forEach((el) => porteurs.delete(el));
    };
  });
}
