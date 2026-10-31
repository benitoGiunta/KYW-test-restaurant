// Carte : liste index avec aperçu qui suit le pointeur (motion.md « Index list with cursor-following preview »).
// L'aperçu penche dans le sens de l'accent quand le pointeur va vite. Au toucher : vignettes en ligne (CSS).
import { gsap } from 'gsap';
import { onPage, onScroll, isTouch, prefersReducedMotion } from '../engine';

export const apercuCarte = () => onPage(() => {
  const listes = [...document.querySelectorAll<HTMLElement>('[data-index]')];
  const box = document.querySelector<HTMLElement>('.apercu');
  if (!listes.length || !box || isTouch() || matchMedia('(hover: none)').matches) return;
  const img = box.querySelector('img')!;
  const reduit = prefersReducedMotion();
  const d = reduit ? 0 : 0.6;
  const x = gsap.quickTo(box, 'x', { duration: d, ease: 'power3.out' });
  const y = gsap.quickTo(box, 'y', { duration: d, ease: 'power3.out' });
  const rot = gsap.quickTo(box, 'rotate', { duration: 0.8, ease: 'power3.out' });
  let lastX = 0, px = -999, py = -999, active: HTMLElement | null = null;
  const move = (e: PointerEvent) => {
    px = e.clientX; py = e.clientY;
    x(px); y(py);
    if (!reduit) rot(gsap.utils.clamp(-10, 10, (px - lastX) * 0.5));
    lastX = px;
  };
  const show = (li: HTMLElement) => {
    if (active === li) return;
    active = li;
    const src = li.dataset.preview;
    if (!src) return hide();
    if (img.getAttribute('src') !== src) img.src = src;
    gsap.to(box, { autoAlpha: 1, scale: 1, duration: reduit ? 0 : 0.5, ease: 'expo.out', overwrite: 'auto' });
  };
  const hide = () => { active = null; gsap.to(box, { autoAlpha: 0, scale: 0.86, duration: reduit ? 0 : 0.35, ease: 'expo.out', overwrite: 'auto' }); };
  const off: (() => void)[] = [];
  listes.forEach((liste) => {
    liste.querySelectorAll<HTMLElement>('.ligne').forEach((li) => {
      const e = () => show(li);
      li.addEventListener('pointerenter', e);
      off.push(() => li.removeEventListener('pointerenter', e));
    });
    liste.addEventListener('pointerleave', hide);
    off.push(() => liste.removeEventListener('pointerleave', hide));
  });
  // Préchargement des aperçus (première survol sans image vide).
  listes.forEach((l) => l.querySelectorAll<HTMLElement>('[data-preview]').forEach((li) => { const i = new Image(); i.src = li.dataset.preview!; }));
  addEventListener('pointermove', move, { passive: true });
  const offScroll = onScroll(() => {
    const sous = document.elementFromPoint(px, py)?.closest<HTMLElement>('.ligne');
    if (sous) show(sous); else if (active) hide();
  });
  return () => { removeEventListener('pointermove', move); offScroll(); off.forEach((f) => f()); gsap.set(box, { autoAlpha: 0 }); };
});
