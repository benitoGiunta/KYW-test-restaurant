// Menu mobile : <dialog> modal plein écran (focus piégé, Échap ferme, focus rendu au bouton).
// Il se déroule du haut (clip-path), les liens montent un à un. Code de page dans onPage, nettoyé.
import { gsap } from 'gsap';
import { onPage, stopScroll, startScroll, prefersReducedMotion, ease } from '../engine';

const FOCUSABLES = 'a[href], button:not([disabled])';

export function setupMenu() {
  onPage(() => {
    const bouton = document.querySelector<HTMLButtonElement>('[data-menu-ouvrir]');
    const menu = document.getElementById('menu') as HTMLDialogElement | null;
    if (!bouton || !menu) return;
    const fermer = () => { if (menu.open) menu.close(); };
    const ouvrir = () => {
      menu.showModal();
      bouton.setAttribute('aria-expanded', 'true');
      stopScroll();
      if (prefersReducedMotion()) return;
      gsap.fromTo(menu, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: ease.inOut });
      gsap.fromTo(menu.querySelectorAll('.menu__liens li'), { yPercent: 70, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.8, stagger: 0.06, ease: ease.out, delay: 0.25 });
    };
    const surFermeture = () => {
      bouton.setAttribute('aria-expanded', 'false');
      gsap.set(menu, { clearProps: 'clipPath' });
      startScroll();
      bouton.focus();
    };
    // Tab boucle dans le menu (showModal seul laisse parfois sortir vers l'interface du navigateur).
    const piege = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const f = [...menu.querySelectorAll<HTMLElement>(FOCUSABLES)];
      const premier = f[0], dernier = f[f.length - 1];
      if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus(); }
      else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus(); }
    };
    const clicLien = (e: Event) => { if ((e.target as HTMLElement).closest('a')) fermer(); };
    const large = matchMedia('(min-width: 821px)');
    const surLarge = () => { if (large.matches) fermer(); };
    const boutonFermer = menu.querySelector<HTMLButtonElement>('[data-menu-fermer]');
    bouton.addEventListener('click', ouvrir);
    boutonFermer?.addEventListener('click', fermer);
    menu.addEventListener('close', surFermeture);
    menu.addEventListener('keydown', piege);
    menu.addEventListener('click', clicLien);
    large.addEventListener('change', surLarge);
    return () => {
      bouton.removeEventListener('click', ouvrir);
      boutonFermer?.removeEventListener('click', fermer);
      menu.removeEventListener('close', surFermeture);
      menu.removeEventListener('keydown', piege);
      menu.removeEventListener('click', clicLien);
      large.removeEventListener('change', surLarge);
      if (menu.open) { menu.close(); }
    };
  });
}
