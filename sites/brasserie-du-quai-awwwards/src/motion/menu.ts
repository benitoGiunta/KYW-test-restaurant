// Menu plein écran (téléphone) : bouton aria-expanded, overlay, focus piégé, Échap ferme, focus rendu au bouton.
import { gsap } from 'gsap';
import { onPage, stopScroll, startScroll, prefersReducedMotion, ease } from '../engine';

export const menuMobile = () => onPage(() => {
  const bouton = document.querySelector<HTMLButtonElement>('[data-menu-bouton]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!bouton || !menu) return;
  const fermer = menu.querySelector<HTMLButtonElement>('[data-menu-fermer]')!;
  const focusables = () => [...menu.querySelectorAll<HTMLElement>('a[href], button')];
  let ouvert = false;
  const open = () => {
    ouvert = true;
    menu.hidden = false;
    bouton.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('menu-open');
    stopScroll();
    if (!prefersReducedMotion()) {
      gsap.fromTo(menu, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: ease.inOut });
      gsap.from(menu.querySelectorAll('.menu__lien'), { yPercent: 110, duration: 0.9, stagger: 0.06, ease: ease.out, delay: 0.25 });
    }
    focusables()[0]?.focus();
  };
  const close = (rendre = true) => {
    if (!ouvert) return;
    ouvert = false;
    bouton.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('menu-open');
    startScroll();
    const fin = () => { menu.hidden = true; if (rendre) bouton.focus(); };
    if (prefersReducedMotion()) fin();
    else gsap.to(menu, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.5, ease: ease.inOut, onComplete: fin });
  };
  const key = (e: KeyboardEvent) => {
    if (!ouvert) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key === 'Tab') {
      const f = focusables(); const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };
  const nav = () => close(false);
  bouton.addEventListener('click', open);
  fermer.addEventListener('click', () => close());
  document.addEventListener('keydown', key);
  document.addEventListener('astro:before-preparation', nav);
  return () => { document.removeEventListener('keydown', key); document.removeEventListener('astro:before-preparation', nav); document.documentElement.classList.remove('menu-open'); };
});
