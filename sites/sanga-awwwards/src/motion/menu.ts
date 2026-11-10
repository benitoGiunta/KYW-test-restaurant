// Menu plein écran du téléphone (motion.md « Full-screen menu overlay ») : bouton « Menu » avec aria-expanded,
// l'eau monte (clip-path depuis le bas), focus piégé, Échap ferme, focus rendu au bouton, défilement arrêté.
import { gsap } from 'gsap';
import { onPage, stopScroll, startScroll, prefersReducedMotion, ease } from '../engine';

export function startMenu() {
  onPage(() => {
    const btn = document.querySelector<HTMLButtonElement>('.tete__menu');
    const menu = document.getElementById('menu');
    const fermerBtn = menu?.querySelector<HTMLButtonElement>('.menu__fermer');
    if (!btn || !menu || !fermerBtn) return;
    const focusables = () => [...menu.querySelectorAll<HTMLElement>('a[href], button')];
    let ouvert = false;
    let anim: gsap.core.Timeline | null = null;
    const ouvrir = () => {
      if (ouvert) return;
      ouvert = true;
      menu.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      stopScroll();
      if (!prefersReducedMotion()) {
        anim?.kill();
        anim = gsap.timeline()
          .fromTo(menu, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: ease.inOut }, 0)
          .from(menu.querySelectorAll('.menu__ligne'), { yPercent: 110, duration: 1, stagger: 0.06, ease: ease.out }, 0.35);
      }
      focusables()[0]?.focus();
    };
    const fermer = (rendre = true) => {
      if (!ouvert) return;
      ouvert = false;
      anim?.progress(1).kill();
      anim = null;
      menu.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      startScroll();
      if (rendre) btn.focus();
    };
    const clavier = (e: KeyboardEvent) => {
      if (!ouvert) return;
      if (e.key === 'Escape') { e.preventDefault(); fermer(); return; }
      if (e.key !== 'Tab') return;
      const f = focusables();
      const premier = f[0], dernier = f[f.length - 1];
      if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus(); }
      else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus(); }
      else if (!menu.contains(document.activeElement)) { e.preventDefault(); premier.focus(); }
    };
    const clic = (e: Event) => { if ((e.target as HTMLElement).closest('a')) fermer(false); };
    const ferme = () => fermer();
    btn.addEventListener('click', ouvrir);
    fermerBtn.addEventListener('click', ferme);
    menu.addEventListener('click', clic);
    document.addEventListener('keydown', clavier);
    return () => {
      fermer(false);
      btn.removeEventListener('click', ouvrir);
      fermerBtn.removeEventListener('click', ferme);
      menu.removeEventListener('click', clic);
      document.removeEventListener('keydown', clavier);
    };
  });
}
