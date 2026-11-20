// Module pilote « Un carré, des assiettes ». Une variable : la mise en place (le carré cherche l'assiette).
// - Repos (startIdle) : le carré du hero tourne lentement autour de l'assiette, à vitesse constante, comme une
//   main qui ajuste le dressage ; il se met en pause hors écran.
// - Pointeur : le carré se décale vers le pointeur (on recentre l'assiette dans son cadre).
// - Défilement : chaque assiette marquée [data-tournette] tourne avec la distance parcourue (la tournette du chef).
// - Signature « Compter les assiettes » : les ronds de chaque menu se posent un par un (stagger 60 ms) à l'entrée.
// Une seule horloge : gsap.ticker et onScroll de l'engine ; aucun rAF ni listener scroll maison.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll, ease, prefersReducedMotion, isTouch } from '../engine';

const RAYON = 0.022; // orbite du carré, en fraction de sa largeur
const PERIODE = 9; // secondes par tour (vitesse constante : pas de point mort, visible par idleMotion)

function startIdle(carre: HTMLElement) {
  const setX = gsap.quickSetter(carre, 'x', 'px');
  const setY = gsap.quickSetter(carre, 'y', 'px');
  const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
  let angle = 0;
  let visible = true;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
  io.observe(carre);
  const onMove = (e: PointerEvent) => {
    ptr.tx = (e.clientX / innerWidth - 0.5) * 2;
    ptr.ty = (e.clientY / innerHeight - 0.5) * 2;
  };
  if (!isTouch()) addEventListener('pointermove', onMove, { passive: true });
  const tick = (_t: number, dt: number) => {
    if (!visible) return;
    const w = carre.offsetWidth;
    angle += (dt / 1000) * ((Math.PI * 2) / PERIODE);
    ptr.x += (ptr.tx - ptr.x) * 0.06;
    ptr.y += (ptr.ty - ptr.y) * 0.06;
    setX(Math.cos(angle) * w * RAYON + ptr.x * w * 0.03);
    setY(Math.sin(angle) * w * RAYON + ptr.y * w * 0.03);
  };
  gsap.ticker.add(tick);
  return () => { gsap.ticker.remove(tick); io.disconnect(); removeEventListener('pointermove', onMove); };
}

function tournettes() {
  const els = [...document.querySelectorAll<HTMLElement>('[data-tournette]')];
  if (!els.length) return () => {};
  const sets = els.map((el) => ({ k: parseFloat(el.dataset.tournette || '1'), set: gsap.quickSetter(el, 'rotation', 'deg') }));
  return onScroll((s) => { sets.forEach(({ k, set }) => set(s.y * 0.02 * k)); });
}

function compterLesAssiettes() {
  document.querySelectorAll<HTMLElement>('.rondes[data-poser]').forEach((r) => {
    const ronds = r.querySelectorAll('i');
    gsap.fromTo(ronds, { scale: 0, autoAlpha: 0 }, {
      scale: 1, autoAlpha: 1, duration: 0.7, ease: ease.out, stagger: 0.06,
      scrollTrigger: { trigger: r, start: 'top 90%', once: true },
    });
  });
}

export function startAssiettes() {
  onPage(({ intro }) => {
    if (prefersReducedMotion()) return;
    const cleanups: (() => void)[] = [];
    const disque = document.querySelector<HTMLElement>('.hero__disque');
    if (disque) {
      const carre = disque.querySelector<HTMLElement>('.hero__carre')!;
      const assiette = disque.querySelector<HTMLElement>('.photo-p')!;
      // Le premier frame : le carré se trace, l'assiette se pose en tournant (dresser).
      intro.fromTo(carre, { scale: 0.62, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.2, ease: ease.out, clearProps: 'opacity,visibility' }, 0.15);
      intro.fromTo(assiette, { rotation: -32, scale: 0.9 }, { rotation: 0, scale: 1, duration: 1.4, ease: ease.out }, 0.25);
      cleanups.push(startIdle(carre));
    }
    compterLesAssiettes();
    cleanups.push(tournettes());
    ScrollTrigger.refresh();
    return () => cleanups.forEach((c) => c());
  });
}
