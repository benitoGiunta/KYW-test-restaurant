// Menu mobile plein écran (motion.md « Full-screen menu overlay ») : aria-expanded, focus piégé,
// Échap ferme, focus rendu au bouton, défilement arrêté pendant l'ouverture, fermé au départ d'une navigation.
import { gsap } from 'gsap';
import { onPage, ease, prefersReducedMotion, stopScroll, startScroll } from '../engine';

export function startMenu() {
  onPage(() => {
    const btn = document.querySelector<HTMLButtonElement>('.tete__menu');
    const menu = document.getElementById('menu');
    if (!btn || !menu) return;
    const fermer = menu.querySelector<HTMLButtonElement>('.menu-plein__fermer');
    const focusables = () => [...menu.querySelectorAll<HTMLElement>('a[href], button')];
    let ouvert = false;
    let anim: gsap.core.Timeline | undefined;

    const ouvrir = () => {
      if (ouvert) return;
      ouvert = true;
      menu.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('menu-ouvert');
      stopScroll();
      if (!prefersReducedMotion()) {
        anim = gsap.timeline()
          .fromTo(menu, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: ease.inOut })
          .fromTo(menu.querySelectorAll('.menu-plein__l span'), { yPercent: 110, opacity: 0.2 }, { yPercent: 0, opacity: 1, duration: 0.9, ease: ease.out, stagger: 0.06 }, 0.3);
      }
      menu.querySelector<HTMLElement>('.menu-plein__liens a')?.focus();
    };
    const close = (rendre = true) => {
      if (!ouvert) return;
      ouvert = false;
      anim?.kill();
      gsap.set(menu, { clearProps: 'clipPath' });
      menu.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('menu-ouvert');
      startScroll();
      if (rendre) btn.focus();
    };
    const clavier = (e: KeyboardEvent) => {
      if (!ouvert) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      const f = focusables();
      const premier = f[0], dernier = f[f.length - 1];
      if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus(); }
      else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus(); }
    };
    const surLien = () => close(false);
    btn.addEventListener('click', ouvrir);
    fermer?.addEventListener('click', () => close());
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', surLien));
    document.addEventListener('keydown', clavier);
    return () => { close(false); document.removeEventListener('keydown', clavier); };
  });
}
