// Menu plein écran du téléphone (motion.md « Full-screen menu overlay ») sur un <dialog> :
// aria-expanded, Échap (natif), focus piégé (boucle Tab), focus rendu au bouton, défilement arrêté.
// À l'ouverture, les liens coupés se recollent l'un après l'autre (le verbe du concept).
import { gsap } from 'gsap';
import { onPage, ease, stopScroll, startScroll, prefersReducedMotion } from '../engine';

let fermer: (() => void) | null = null;
export const fermerMenu = () => fermer?.();

export function startMenu() {
  onPage(() => {
    const bouton = document.querySelector<HTMLButtonElement>('.entete__menu');
    const menu = document.querySelector<HTMLDialogElement>('#menu');
    if (!bouton || !menu) return;
    const liens = () => [...menu.querySelectorAll<HTMLElement>('a, button')];
    const reduit = prefersReducedMotion();

    const ouvrir = () => {
      menu.showModal();
      bouton.setAttribute('aria-expanded', 'true');
      stopScroll();
      liens()[0]?.focus();
      if (reduit) return;
      gsap.fromTo(menu, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: ease.inOut });
      gsap.fromTo(menu.querySelectorAll('.menu__lien'), { '--ecart': '0.6em' }, { '--ecart': '0.07em', duration: 0.9, ease: ease.out, stagger: 0.06, delay: 0.25 });
    };
    const clore = () => {
      if (!menu.open) return;
      menu.close();
    };
    fermer = clore;
    const surFermeture = () => {
      gsap.set(menu, { clearProps: 'clipPath' });
      bouton.setAttribute('aria-expanded', 'false');
      startScroll();
      bouton.focus();
    };
    const piege = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const l = liens(); const premier = l[0]; const dernier = l[l.length - 1];
      if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus(); }
      else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus(); }
    };
    const surClic = (e: MouseEvent) => { if (e.target === menu) clore(); };
    const auBureau = matchMedia('(min-width: 48rem)');
    const surBureau = () => { if (auBureau.matches) clore(); };
    const basculer = () => (menu.open ? clore() : ouvrir());

    bouton.addEventListener('click', basculer);
    menu.addEventListener('close', surFermeture);
    menu.addEventListener('keydown', piege);
    menu.addEventListener('click', surClic);
    menu.querySelector('.menu__fermer')?.addEventListener('click', clore);
    auBureau.addEventListener('change', surBureau);
    return () => {
      bouton.removeEventListener('click', basculer);
      menu.removeEventListener('close', surFermeture);
      menu.removeEventListener('keydown', piege);
      menu.removeEventListener('click', surClic);
      auBureau.removeEventListener('change', surBureau);
      if (menu.open) { menu.removeEventListener('close', surFermeture); menu.close(); startScroll(); }
      fermer = null;
    };
  });
}
