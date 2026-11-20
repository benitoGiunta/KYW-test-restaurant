// Menu plein écran du téléphone (motion.md « Full-screen menu overlay ») : aria-expanded, focus piégé,
// Échap ferme, focus rendu au bouton, fermé dès qu'une navigation commence.
import { gsap } from 'gsap';
import { onPage, stopScroll, startScroll, prefersReducedMotion, ease } from '../engine';

let fermer: (() => void) | null = null;
export const fermerMenu = () => fermer?.();

export function startMenu() {
  onPage(() => {
    const bouton = document.querySelector<HTMLButtonElement>('.tete__menu');
    const menu = document.getElementById('menu');
    if (!bouton || !menu) return;
    const panneau = menu.querySelector<HTMLElement>('.menu__panneau')!;
    const lignes = [...menu.querySelectorAll<HTMLElement>('.menu__ligne')];
    const focusables = () => [...menu.querySelectorAll<HTMLElement>('a[href], button')];
    let ouvert = false;

    const clavier = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); fermer?.(); return; }
      if (e.key !== 'Tab') return;
      const f = focusables();
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    const ouvrir = () => {
      if (ouvert) return;
      ouvert = true;
      menu.hidden = false;
      bouton.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('menu-ouvert');
      stopScroll();
      document.addEventListener('keydown', clavier);
      if (!prefersReducedMotion()) {
        gsap.timeline()
          .fromTo(panneau, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: ease.inOut }, 0)
          .fromTo(lignes, { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.06, ease: ease.out }, 0.25);
      }
      focusables()[0]?.focus();
    };
    fermer = () => {
      if (!ouvert) return;
      ouvert = false;
      menu.hidden = true;
      bouton.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('menu-ouvert');
      document.removeEventListener('keydown', clavier);
      gsap.set([panneau, ...lignes], { clearProps: 'clipPath,transform' });
      startScroll();
      bouton.focus();
    };
    const basculer = () => (ouvert ? fermer!() : ouvrir());
    const fermeBtn = menu.querySelector<HTMLButtonElement>('.menu__fermer');
    const fermerClic = () => fermer?.();
    bouton.addEventListener('click', basculer);
    fermeBtn?.addEventListener('click', fermerClic);
    return () => {
      bouton.removeEventListener('click', basculer);
      fermeBtn?.removeEventListener('click', fermerClic);
      document.removeEventListener('keydown', clavier);
      if (ouvert) { menu.hidden = true; document.documentElement.classList.remove('menu-ouvert'); startScroll(); }
      fermer = null;
    };
  });
}
