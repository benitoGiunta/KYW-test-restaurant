// Menu mobile : <dialog> modal (focus piégé et Échap natifs), ouverture en arche qui monte, focus rendu au bouton.
import { gsap } from 'gsap';
import { onPage, prefersReducedMotion, ease, stopScroll, startScroll } from '../engine';

const ARCHE_FERMEE = 'inset(100% 0% 0% 0% round 50% 50% 0% 0% / 18% 18% 0% 0%)';
const ARCHE_OUVERTE = 'inset(0% 0% 0% 0% round 0% 0% 0% 0% / 0% 0% 0% 0%)';

function initMenu() {
  const menu = document.querySelector<HTMLDialogElement>('#menu');
  const ouvrir = document.querySelector<HTMLButtonElement>('[data-menu-ouvrir]');
  if (!menu || !ouvrir || typeof menu.showModal !== 'function') return () => {};
  const fermerBtn = menu.querySelector<HTMLButtonElement>('[data-menu-fermer]');
  const liens = menu.querySelectorAll<HTMLElement>('.menu__lien');
  const open = () => {
    menu.showModal();
    ouvrir.setAttribute('aria-expanded', 'true');
    stopScroll();
    if (!prefersReducedMotion()) {
      gsap.fromTo(menu, { clipPath: ARCHE_FERMEE }, { clipPath: ARCHE_OUVERTE, duration: 0.8, ease: ease.inOut });
      gsap.fromTo(liens, { yPercent: 110 }, { yPercent: 0, duration: 1, ease: ease.out, stagger: 0.06, delay: 0.3 });
    }
  };
  const close = () => { if (menu.open) menu.close(); };
  const onClose = () => {
    ouvrir.setAttribute('aria-expanded', 'false');
    gsap.set(liens, { clearProps: 'transform' });
    gsap.set(menu, { clearProps: 'clipPath' });
    startScroll();
    ouvrir.focus();
  };
  // Un lien ferme le menu avant la navigation : le <dialog> modal passerait au-dessus du rideau.
  const onClic = (e: MouseEvent) => { if ((e.target as HTMLElement).closest('a') || e.target === menu) close(); };
  ouvrir.addEventListener('click', open);
  fermerBtn?.addEventListener('click', close);
  menu.addEventListener('close', onClose);
  menu.addEventListener('click', onClic);
  const mq = matchMedia('(min-width: 48.01rem)');
  const largeur = () => { if (mq.matches) close(); };
  mq.addEventListener('change', largeur);
  return () => {
    ouvrir.removeEventListener('click', open);
    fermerBtn?.removeEventListener('click', close);
    menu.removeEventListener('close', onClose);
    menu.removeEventListener('click', onClic);
    mq.removeEventListener('change', largeur);
    if (menu.open) menu.close();
  };
}

export function setupMenu() {
  onPage(() => initMenu());
}
