// Menu plein écran du téléphone (popover natif : couche supérieure, Échap). Ajouts : aria-expanded tenu à jour,
// focus sur le premier lien à l'ouverture, focus piégé, focus rendu au bouton, défilement Lenis suspendu,
// lignes du menu qui s'allument l'une après l'autre (verbe du concept). Code DOM dans onPage().
import { onPage, stopScroll, startScroll, prefersReducedMotion } from '../engine';
import { allumer } from './neon';

export const menuMobile = () => onPage(() => {
  const menu = document.getElementById('menu-mobile');
  const bouton = document.querySelector<HTMLButtonElement>('.tete__menu');
  if (!menu || !bouton) return;
  const focusables = () => [...menu.querySelectorAll<HTMLElement>('a[href], button')];
  const bascule = (e: Event) => {
    const ouvert = (e as ToggleEvent).newState === 'open';
    bouton.setAttribute('aria-expanded', String(ouvert));
    if (ouvert) {
      stopScroll();
      const liens = [...menu.querySelectorAll<HTMLElement>('.menu-mobile__lien')];
      liens[0]?.focus();
      if (!prefersReducedMotion()) allumer(liens, 0.05);
    } else {
      startScroll();
      if (menu.contains(document.activeElement) || document.activeElement === document.body) bouton.focus();
    }
  };
  const clavier = (e: KeyboardEvent) => {
    if (e.key !== 'Tab' || !menu.matches(':popover-open')) return;
    const f = focusables(); const premier = f[0], dernier = f[f.length - 1];
    if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus(); }
    else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus(); }
  };
  bouton.setAttribute('aria-expanded', 'false');
  bouton.setAttribute('aria-controls', 'menu-mobile');
  menu.addEventListener('toggle', bascule);
  document.addEventListener('keydown', clavier);
  return () => {
    menu.removeEventListener('toggle', bascule);
    document.removeEventListener('keydown', clavier);
    startScroll();
  };
});
