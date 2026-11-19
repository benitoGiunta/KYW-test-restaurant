// Menu plein écran du téléphone (motion.md « Full-screen menu overlay ») : aria-expanded, focus piégé,
// Échap ferme, focus rendu au bouton. Ouverture : le panneau se verse depuis le haut (verbe du concept).
import { gsap } from 'gsap';
import { onPage, ease, stopScroll, startScroll, prefersReducedMotion } from '../engine';

const FOCUSABLES = 'a[href], button:not([disabled])';

export function startMenu() {
  onPage(() => {
    const menu = document.querySelector<HTMLElement>('[data-menu]');
    const ouvrir = document.querySelector<HTMLButtonElement>('[data-menu-ouvrir]');
    const fermer = menu?.querySelector<HTMLButtonElement>('[data-menu-fermer]');
    if (!menu || !ouvrir || !fermer) return;
    const items = menu.querySelectorAll<HTMLElement>('[data-menu-item]');
    let ouvert = false;
    let tl: gsap.core.Timeline | null = null;

    const piege = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      const f = [...menu.querySelectorAll<HTMLElement>(FOCUSABLES)];
      const premier = f[0], dernier = f[f.length - 1];
      if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus(); }
      else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus(); }
    };

    function open() {
      if (ouvert) return;
      ouvert = true;
      menu!.hidden = false;
      ouvrir!.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('menu-ouvert');
      stopScroll();
      document.addEventListener('keydown', piege);
      tl?.kill();
      if (!prefersReducedMotion()) {
        tl = gsap.timeline()
          .fromTo(menu, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: ease.inOut })
          .fromTo(items, { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.6, stagger: 0.05, ease: ease.out }, 0.3);
      }
      fermer!.focus();
    }

    function close(rendreFocus = true) {
      if (!ouvert) return;
      ouvert = false;
      ouvrir!.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('menu-ouvert');
      document.removeEventListener('keydown', piege);
      startScroll();
      tl?.kill();
      const fin = () => { menu!.hidden = true; gsap.set(menu, { clearProps: 'clipPath' }); };
      if (prefersReducedMotion()) fin();
      else tl = gsap.timeline({ onComplete: fin }).to(menu, { clipPath: 'inset(100% 0% 0% 0%)', duration: 0.55, ease: ease.inOut });
      if (rendreFocus) ouvrir!.focus();
    }

    const surOuvrir = () => open();
    const surFermer = () => close();
    const surLien = (e: Event) => { if ((e.target as HTMLElement).closest('a')) close(false); };
    const surTaille = () => { if (innerWidth > 820) close(false); };
    ouvrir.addEventListener('click', surOuvrir);
    fermer.addEventListener('click', surFermer);
    menu.addEventListener('click', surLien);
    addEventListener('resize', surTaille);
    return () => {
      document.removeEventListener('keydown', piege);
      removeEventListener('resize', surTaille);
      document.documentElement.classList.remove('menu-ouvert');
      if (ouvert) startScroll();
      tl?.kill();
    };
  });
}
