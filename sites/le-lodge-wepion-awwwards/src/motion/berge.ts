// Pilote du concept « Deux rives » (patterns.md § 1) : une seule variable, la position de la berge.
//   p      progression du défilement dans le héros (0 en haut, 1 quand il a quitté l'écran) : le jour d'Erpent
//          traverse vers la rive de Wépion (le panneau .rives__crue suit le trait), on passe d'une rive à l'autre ;
//   pointeur  ±6 px sur le trait (idle.x), avant même le premier défilement ;
//   repos  l'onde coule le long de la berge à vitesse constante (startIdle), plus vite au toucher pendant le défilement.
// Tout passe par gsap.ticker ; un trait hors écran n'est pas mis à jour ; mouvement réduit : rien ne bouge.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, ease, prefersReducedMotion, isMobile } from '../engine';
import { idle, startIdle } from './idle';

type Trait = { el: HTMLElement; onde: SVGElement; sens: 'v' | 'h'; vu: boolean; flot: (v: number) => void; porteur: HTMLElement | null };

let traits: Trait[] = [];
let p = 0;            // progression du héros (pilote)
let phase = 0;        // écoulement de l'onde, en % de la longueur du SVG
let dernier = '';

const wrap = gsap.utils.wrap(-50, 0);

function tick(_t: number, dt: number) {
  if (!traits.length) return;
  const vitesse = 1.1 + Math.abs(idle.y) * 14; // %/s ; le toucher accélère par la vitesse de défilement
  phase += vitesse * (dt / 1000);
  for (const t of traits) {
    if (!t.vu) continue;
    t.flot(wrap(t.sens === 'v' ? phase - 50 : -phase));
    if (t.porteur) {
      const largeur = t.porteur.clientWidth * (7 / 12);
      const bx = (isMobile() ? 0 : -p * largeur * 0.42) + idle.x * 12;
      const v = bx.toFixed(1);
      if (v !== dernier) { t.porteur.style.setProperty('--bx', v + 'px'); dernier = v; }
    }
  }
}

export function startBerge() {
  if (prefersReducedMotion()) return;
  startIdle();
  gsap.ticker.add(tick);
  onPage(({ intro }) => {
    const els = [...document.querySelectorAll<HTMLElement>('[data-berge]')];
    traits = els.map((el) => {
      const onde = el.querySelector<SVGElement>('.berge__onde')!;
      const sens = el.dataset.berge === 'h' ? 'h' : 'v';
      return { el, onde, sens, vu: false, flot: gsap.quickSetter(onde, sens === 'v' ? 'yPercent' : 'xPercent') as (v: number) => void, porteur: el.closest<HTMLElement>('[data-rives]') };
    });
    dernier = '';
    p = 0;
    traits.forEach((t) => {
      ScrollTrigger.create({ trigger: t.el, start: 'top bottom', end: 'bottom top', onToggle: (s) => { t.vu = s.isActive; } });
      // Entrée : le trait se dessine le long de la berge pendant l'intro de la page.
      intro.fromTo(t.el, { clipPath: t.sens === 'v' ? 'inset(0% 0% 100% 0%)' : 'inset(0% 100% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: ease.out, clearProps: 'clipPath' }, 0.15);
    });
    const rives = document.querySelector<HTMLElement>('[data-rives]');
    if (rives) {
      ScrollTrigger.create({ trigger: rives, start: 'top top', end: 'bottom top', onUpdate: (s) => { p = s.progress; } });
      // La photo de Wépion se pose (peinte dès le premier rendu, jamais cachée) pendant que le titre monte.
      const img = rives.querySelector('.rive--nuit .photo img');
      if (img) intro.fromTo(img, { scale: 1.08 }, { scale: 1, duration: 1.6, ease: ease.out, clearProps: 'scale' }, 0);
    }
    // Tableau des deux rives : la colonne d'Erpent entre par la droite, comme le bac qui aborde.
    const jour = document.querySelectorAll<HTMLElement>('.passage .passage__jour');
    if (jour.length) {
      gsap.fromTo(jour, { clipPath: 'inset(0% 0% 0% 100%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: ease.out, stagger: 0.06, clearProps: 'clipPath',
        scrollTrigger: { trigger: '.passage', start: 'top 80%', once: true },
      });
    }
    return () => { traits = []; rives?.style.removeProperty('--bx'); };
  });
}
