// Menu mobile : bouton « Menu » (aria-expanded), panneau plein écran, focus piégé, Échap ferme,
// focus rendu au bouton ; fermé au clic sur un lien avant la transition de page.
import { onPage } from '../engine';

export function initMenu() {
  onPage(() => {
    const bouton = document.querySelector<HTMLButtonElement>('.menu-bouton');
    const panneau = document.getElementById('menu');
    if (!bouton || !panneau) return;
    const focusables = () => [...panneau.querySelectorAll<HTMLElement>('a, button')];
    const ouvrir = () => {
      panneau.hidden = false;
      bouton.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('menu-ouvert');
      focusables()[0]?.focus();
    };
    const fermer = (rendre = true) => {
      panneau.hidden = true;
      bouton.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('menu-ouvert');
      if (rendre) bouton.focus();
    };
    const basculer = () => (panneau.hidden ? ouvrir() : fermer());
    const clavier = (e: KeyboardEvent) => {
      if (panneau.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); fermer(); return; }
      if (e.key !== 'Tab') return;
      const f = focusables();
      const premier = f[0];
      const dernier = f[f.length - 1];
      if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus(); }
      else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus(); }
    };
    const surLien = (e: Event) => { if ((e.target as Element).closest('a')) fermer(false); };
    const fermeture = panneau.querySelector<HTMLButtonElement>('.menu__fermer');
    const fermerClic = () => fermer();
    bouton.addEventListener('click', basculer);
    fermeture?.addEventListener('click', fermerClic);
    panneau.addEventListener('click', surLien);
    document.addEventListener('keydown', clavier);
    return () => {
      bouton.removeEventListener('click', basculer);
      fermeture?.removeEventListener('click', fermerClic);
      panneau.removeEventListener('click', surLien);
      document.removeEventListener('keydown', clavier);
      document.documentElement.classList.remove('menu-ouvert');
    };
  });
}
