// Menu mobile plein écran (motion.md « Full-screen menu overlay ») : bouton « Menu » avec
// aria-expanded, panneau qui s'ouvre en rond depuis le bouton, focus piégé, Échap ferme,
// focus rendu au bouton. Fonctionne aussi en mouvement réduit (sans animation).
import { gsap } from 'gsap';
import { onPage, ease, prefersReducedMotion, stopScroll, startScroll } from '../engine';

export function startMenu() {
  onPage(() => {
    const btn = document.querySelector<HTMLButtonElement>('.menu-btn');
    const menu = document.getElementById('menu');
    if (!btn || !menu) return;
    const panel = menu.querySelector<HTMLElement>('.menu__panel')!;
    const close = menu.querySelector<HTMLButtonElement>('.menu__close')!;
    const liens = [...menu.querySelectorAll<HTMLElement>('.menu__list a')];
    const focusables = () => [...menu.querySelectorAll<HTMLElement>('a, button')];
    let tl: gsap.core.Timeline | null = null;

    const centre = () => {
      const r = btn.getBoundingClientRect();
      return `${r.left + r.width / 2}px ${r.top + r.height / 2}px`;
    };
    const open = () => {
      menu.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-ouvert');
      stopScroll();
      if (!prefersReducedMotion()) {
        tl?.kill();
        tl = gsap.timeline()
          .fromTo(panel, { clipPath: `circle(0% at ${centre()})` }, { clipPath: `circle(150% at ${centre()})`, duration: 0.7, ease: ease.inOut })
          .from(liens, { yPercent: 110, duration: 0.8, stagger: 0.06, ease: ease.out }, 0.25);
      }
      liens[0]?.focus();
    };
    const shut = (rendre = true) => {
      if (menu.hidden) return;
      tl?.kill();
      gsap.set(panel, { clearProps: 'clipPath' });
      gsap.set(liens, { clearProps: 'transform' });
      menu.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-ouvert');
      startScroll();
      if (rendre) btn.focus();
    };
    const onBtn = () => (menu.hidden ? open() : shut());
    const onKey = (e: KeyboardEvent) => {
      if (menu.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); shut(); return; }
      if (e.key !== 'Tab') return;
      const f = focusables();
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    const onLien = () => shut(false);
    btn.addEventListener('click', onBtn);
    close.addEventListener('click', () => shut());
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', onLien));
    document.addEventListener('keydown', onKey);
    const mq = matchMedia('(min-width: 721px)');
    const onMq = () => { if (mq.matches) shut(false); };
    mq.addEventListener('change', onMq);
    return () => { document.removeEventListener('keydown', onKey); mq.removeEventListener('change', onMq); startScroll(); };
  });
}
