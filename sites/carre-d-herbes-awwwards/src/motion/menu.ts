// Menu mobile : bouton « Menu » (aria-expanded), panneau plein écran, focus piégé, Échap ferme, focus rendu.
import { onPage, stopScroll, startScroll } from '../engine';

export function startMenu() {
  onPage(() => {
    const top = document.querySelector<HTMLElement>('.top');
    const btn = top?.querySelector<HTMLButtonElement>('.top__menu');
    const nav = top?.querySelector<HTMLElement>('.top__nav');
    if (!top || !btn || !nav) return;
    const mq = matchMedia('(max-width: 40rem)');
    const label = btn.querySelector('span')!;
    const focusables = () => [btn, ...nav.querySelectorAll<HTMLElement>('a')].filter((el) => el.offsetParent !== null);
    const setOpen = (open: boolean, rendreFocus = true) => {
      top.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      label.textContent = open ? 'Fermer' : 'Menu';
      if (open) { stopScroll(); nav.querySelector<HTMLElement>('a')?.focus(); }
      else { startScroll(); if (rendreFocus) btn.focus(); }
    };
    const onClick = () => setOpen(btn.getAttribute('aria-expanded') !== 'true');
    const onKey = (e: KeyboardEvent) => {
      if (!top.classList.contains('is-open')) return;
      if (e.key === 'Escape') { e.preventDefault(); setOpen(false); return; }
      if (e.key !== 'Tab') return;
      const f = focusables();
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    const onLink = (e: Event) => { if ((e.target as HTMLElement).closest('a') && top.classList.contains('is-open')) setOpen(false, false); };
    const onMq = () => { if (!mq.matches && top.classList.contains('is-open')) setOpen(false, false); };
    btn.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    nav.addEventListener('click', onLink);
    mq.addEventListener('change', onMq);
    return () => {
      btn.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
      nav.removeEventListener('click', onLink);
      mq.removeEventListener('change', onMq);
      startScroll();
    };
  });
}
