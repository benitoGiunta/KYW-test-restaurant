// Menu plein écran du téléphone : bouton « Menu » avec aria-expanded, panneau qui se déroule de gauche à droite,
// focus piégé, Échap ferme, focus rendu au bouton. Fermé (sans animation) au clic sur un lien, avant la transition.
import { gsap } from 'gsap';
import { onPage, ease, prefersReducedMotion, stopScroll, startScroll } from '../engine';

export function startMenu() {
  onPage(() => {
    const btn = document.querySelector<HTMLButtonElement>('.tete__menu');
    const panel = document.getElementById('menu');
    if (!btn || !panel) return;
    let ouvert = false;
    const focusables = () => Array.from(panel.querySelectorAll<HTMLElement>('a, button'));

    const ouvrir = () => {
      ouvert = true;
      panel.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('menu-ouvert');
      stopScroll();
      if (!prefersReducedMotion()) {
        gsap.fromTo(panel, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: ease.inOut });
        gsap.from(panel.querySelectorAll('.menu__lien'), { yPercent: 60, opacity: 0, duration: 0.6, stagger: 0.06, ease: ease.out, delay: 0.2 });
      }
      focusables()[0]?.focus();
    };
    const fermer = (rendre = true) => {
      if (!ouvert) return;
      ouvert = false;
      btn.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('menu-ouvert');
      startScroll();
      const fin = () => { panel.hidden = true; gsap.set(panel, { clearProps: 'clipPath' }); };
      if (rendre && !prefersReducedMotion()) gsap.to(panel, { clipPath: 'inset(0% 0% 0% 100%)', duration: 0.45, ease: ease.inOut, onComplete: fin });
      else fin();
      if (rendre) btn.focus();
    };
    const onBtn = () => (ouvert ? fermer() : ouvrir());
    const onKey = (e: KeyboardEvent) => {
      if (!ouvert) return;
      if (e.key === 'Escape') { e.preventDefault(); fermer(); return; }
      if (e.key !== 'Tab') return;
      const f = [btn, ...focusables()];
      const i = f.indexOf(document.activeElement as HTMLElement);
      const j = e.shiftKey ? (i <= 0 ? f.length - 1 : i - 1) : (i === f.length - 1 ? 0 : i + 1);
      e.preventDefault();
      f[j].focus();
    };
    const onLien = (e: Event) => { if ((e.target as HTMLElement).closest('a')) fermer(false); };
    const onResize = () => { if (ouvert && matchMedia('(min-width: 40.01rem)').matches) fermer(false); };
    btn.addEventListener('click', onBtn);
    document.addEventListener('keydown', onKey);
    panel.addEventListener('click', onLien);
    addEventListener('resize', onResize);
    return () => {
      fermer(false);
      btn.removeEventListener('click', onBtn);
      document.removeEventListener('keydown', onKey);
      panel.removeEventListener('click', onLien);
      removeEventListener('resize', onResize);
    };
  });
}
