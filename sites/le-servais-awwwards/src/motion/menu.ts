// Menu mobile : <dialog> modal (focus piégé par le navigateur, Échap ferme), aria-expanded tenu à jour, focus rendu au
// bouton. Entrée : la porte de la cabine s'ouvre de haut en bas (clip-path), les stations montent en stagger.
import { gsap } from 'gsap';
import { onPage, prefersReducedMotion, stopScroll, startScroll, ease } from '../engine';

export function startMenu() {
  onPage(() => {
    const btn = document.querySelector<HTMLButtonElement>('[data-menu-ouvrir]');
    const dlg = document.querySelector<HTMLDialogElement>('#menu-ligne');
    if (!btn || !dlg) return;
    const fermer = dlg.querySelector<HTMLButtonElement>('[data-menu-fermer]');
    const reduit = prefersReducedMotion();

    const ouvrir = () => {
      dlg.showModal();
      btn.setAttribute('aria-expanded', 'true');
      stopScroll();
      if (reduit) return;
      gsap.fromTo(dlg, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: ease.out });
      gsap.fromTo(dlg.querySelectorAll('.menu-ligne__item'), { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.6, stagger: 0.05, ease: ease.out, delay: 0.12, clearProps: 'transform,opacity,visibility' });
    };
    const fin = () => {
      btn.setAttribute('aria-expanded', 'false');
      gsap.set(dlg, { clearProps: 'clipPath' });
      startScroll();
      btn.focus();
    };
    const clicLien = (e: Event) => { if ((e.target as HTMLElement).closest('a')) dlg.close(); };
    const clicFond = (e: MouseEvent) => { if (e.target === dlg) dlg.close(); };
    // Le modal natif laisse sortir Tab vers l'interface du navigateur : on boucle dans le menu.
    const piege = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const f = [...dlg.querySelectorAll<HTMLElement>('a[href], button')];
      const premier = f[0], dernier = f[f.length - 1];
      if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus(); }
      else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus(); }
    };
    dlg.addEventListener('keydown', piege);
    const auBureau = matchMedia('(min-width: 48.01rem)');
    const bureau = () => { if (auBureau.matches && dlg.open) dlg.close(); };

    btn.addEventListener('click', ouvrir);
    fermer?.addEventListener('click', () => dlg.close());
    dlg.addEventListener('close', fin);
    dlg.addEventListener('click', clicLien);
    dlg.addEventListener('click', clicFond);
    auBureau.addEventListener('change', bureau);
    return () => {
      btn.removeEventListener('click', ouvrir);
      dlg.removeEventListener('close', fin);
      auBureau.removeEventListener('change', bureau);
      if (dlg.open) dlg.close();
    };
  });
}
