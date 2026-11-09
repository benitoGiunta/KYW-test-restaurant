// Menu mobile : <dialog> modal plein écran (focus piégé par le navigateur, Échap ferme, focus rendu au bouton « Menu »).
// Ouverture : le plateau du menu fait un cran, les liens montent l'un après l'autre.
import { gsap } from 'gsap';
import { ease, onPage, prefersReducedMotion } from '../engine';

export function menu() {
  onPage(() => {
    const d = document.getElementById('menu') as HTMLDialogElement | null;
    const bouton = document.querySelector<HTMLButtonElement>('[data-menu-ouvrir]');
    if (!d || !bouton) return;
    const ouvrir = () => {
      d.showModal();
      bouton.setAttribute('aria-expanded', 'true');
      if (!prefersReducedMotion()) {
        gsap.fromTo(d.querySelectorAll('.panneau__lien > span'), { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.05, ease: ease.out });
        gsap.fromTo(d.querySelector('.panneau__anneau'), { rotation: -90, opacity: 0 }, { rotation: 0, opacity: 1, duration: 1, ease: ease.out });
      }
    };
    const fermer = () => d.close();
    const ferme = () => bouton.setAttribute('aria-expanded', 'false');
    const clic = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('[data-menu-fermer]') || t.closest('a')) fermer(); // un lien ferme avant la transition (couche supérieure)
    };
    bouton.addEventListener('click', ouvrir);
    d.addEventListener('close', ferme);
    d.addEventListener('click', clic);
    return () => {
      if (d.open) d.close();
      bouton.removeEventListener('click', ouvrir);
      d.removeEventListener('close', ferme);
      d.removeEventListener('click', clic);
    };
  });
}
