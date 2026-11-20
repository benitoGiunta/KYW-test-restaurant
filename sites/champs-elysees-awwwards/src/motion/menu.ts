// Menu plein écran (téléphone) : aria-expanded, focus piégé, Échap ferme, focus rendu au bouton.
import { gsap } from 'gsap';
import { ease, onPage, prefersReducedMotion, startScroll, stopScroll } from '../engine';

export function setupMenu() {
  onPage(() => {
    const menu = document.getElementById('menu');
    const opener = document.querySelector<HTMLButtonElement>('[data-menu-open]');
    const closer = menu?.querySelector<HTMLButtonElement>('[data-menu-close]');
    if (!menu || !opener || !closer) return;
    const focusables = () => [...menu.querySelectorAll<HTMLElement>('a[href], button')];
    let open = false;

    const show = () => {
      open = true;
      menu.hidden = false;
      opener.setAttribute('aria-expanded', 'true');
      stopScroll();
      document.documentElement.classList.add('menu-open');
      if (!prefersReducedMotion()) {
        gsap.fromTo(menu, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: ease.inOut });
        gsap.fromTo(menu.querySelectorAll('.menu__nav a'), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, ease: ease.out, stagger: 0.05, delay: 0.2 });
      }
      menu.querySelector<HTMLElement>('.menu__nav a')?.focus();
    };
    const hide = (restore = true) => {
      if (!open) return;
      open = false;
      menu.hidden = true;
      opener.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('menu-open');
      startScroll();
      if (restore) opener.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') { e.preventDefault(); hide(); return; }
      if (e.key !== 'Tab') return;
      const f = focusables();
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    const onLink = (e: Event) => { if ((e.target as HTMLElement).closest('a')) hide(false); };
    const onWide = () => { if (matchMedia('(min-width: 641px)').matches) hide(false); };

    opener.addEventListener('click', show);
    closer.addEventListener('click', () => hide());
    menu.addEventListener('click', onLink);
    document.addEventListener('keydown', onKey);
    addEventListener('resize', onWide);
    return () => {
      hide(false);
      document.removeEventListener('keydown', onKey);
      removeEventListener('resize', onWide);
    };
  });
}
