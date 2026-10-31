// Carte : liste index avec aperçu au curseur (desktop) ; vignettes inline au toucher (CSS). Recette motion.md.
import { gsap } from 'gsap';
import { onPage, onScroll, isTouch, prefersReducedMotion } from '../engine';

export const apercuCarte = () => onPage(() => {
  const list = document.querySelector<HTMLElement>('[data-index]');
  const box = document.querySelector<HTMLElement>('[data-apercu]');
  if (!list || !box || isTouch() || prefersReducedMotion()) return;
  const img = box.querySelector('img')!;
  const x = gsap.quickTo(box, 'x', { duration: 0.6, ease: 'power3.out' });
  const y = gsap.quickTo(box, 'y', { duration: 0.6, ease: 'power3.out' });
  const rot = gsap.quickTo(box, 'rotate', { duration: 0.8, ease: 'power3.out' });
  let lastX = 0, px = 0, py = 0;
  const move = (e: PointerEvent) => { px = e.clientX; py = e.clientY; x(px); y(py); rot(gsap.utils.clamp(-14, 14, (px - lastX) * 0.6)); lastX = px; };
  const show = (e: Event) => {
    const row = e.currentTarget as HTMLElement;
    const src = row.querySelector<HTMLImageElement>('[data-apercu-src]')?.currentSrc || row.dataset.preview || '';
    if (img.src !== src) { img.src = src; img.alt = ''; }
    gsap.to(box, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'expo.out' });
  };
  const hide = () => gsap.to(box, { autoAlpha: 0, scale: 0.85, duration: 0.4, ease: 'expo.out' });
  list.querySelectorAll<HTMLElement>('[data-preview]').forEach((a) => { a.addEventListener('pointerenter', show); a.addEventListener('pointerleave', hide); });
  addEventListener('pointermove', move, { passive: true });
  const off = onScroll(() => { const el = document.elementFromPoint(px, py); if (!el || !el.closest('[data-preview]')) hide(); });
  return () => { removeEventListener('pointermove', move); off(); gsap.set(box, { autoAlpha: 0 }); };
});
