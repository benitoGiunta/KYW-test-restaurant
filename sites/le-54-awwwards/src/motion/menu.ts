// Menu mobile : <dialog> modal (focus piégé et Échap natifs), focus rendu au bouton « Menu » à la fermeture.
// La nappe du panneau se pose du haut vers le bas (verbe « dresser »), puis les lignes arrivent une à une.
import { gsap } from 'gsap';
import { onPage, prefersReducedMotion, ease, stopScroll, startScroll } from '../engine';

function initMenu() {
  const menu = document.querySelector<HTMLDialogElement>('#menu');
  const ouvrir = document.querySelector<HTMLButtonElement>('[data-menu-ouvrir]');
  if (!menu || !ouvrir || typeof menu.showModal !== 'function') return () => {};
  const fermerBtn = menu.querySelector<HTMLButtonElement>('[data-menu-fermer]');
  const lignes = menu.querySelectorAll<HTMLElement>('.panneau__lien > span');
  const open = () => {
    menu.showModal();
    stopScroll();
    ouvrir.setAttribute('aria-expanded', 'true');
    if (!prefersReducedMotion()) {
      gsap.fromTo(menu, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: ease.inOut });
      gsap.fromTo(lignes, { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: ease.out, stagger: 0.06, delay: 0.25 });
    }
  };
  const close = () => { if (menu.open) menu.close(); };
  const onClose = () => {
    ouvrir.setAttribute('aria-expanded', 'false');
    gsap.set([menu, ...lignes], { clearProps: 'clipPath,transform' });
    startScroll();
    ouvrir.focus();
  };
  // Un lien ferme le menu avant la navigation : le <dialog> modal passerait au-dessus du rideau.
  const onClic = (e: MouseEvent) => { if ((e.target as HTMLElement).closest('a') || e.target === menu) close(); };
  ouvrir.addEventListener('click', open);
  fermerBtn?.addEventListener('click', close);
  menu.addEventListener('close', onClose);
  menu.addEventListener('click', onClic);
  const mq = matchMedia('(min-width: 48.0625rem)');
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
