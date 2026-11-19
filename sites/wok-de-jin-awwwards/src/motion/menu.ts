// Menu mobile : <dialog> modal (focus piégé et Échap natifs), focus rendu au bouton « Menu » à la fermeture.
// Le panneau monte du bas comme un bol qui se remplit (verbe « se servir »), puis les lignes arrivent une à une.
import { gsap } from 'gsap';
import { onPage, prefersReducedMotion, ease, stopScroll, startScroll } from '../engine';

function initMenu() {
  const menu = document.querySelector<HTMLDialogElement>('#menu');
  const ouvrir = document.querySelector<HTMLButtonElement>('[data-menu-ouvrir]');
  if (!menu || !ouvrir || typeof menu.showModal !== 'function') return () => {};
  const fermerBtn = menu.querySelector<HTMLButtonElement>('[data-menu-fermer]');
  const lignes = menu.querySelectorAll<HTMLElement>('.panneau__lien > span');
  const focalisables = () => [...menu.querySelectorAll<HTMLElement>('a[href], button')];
  const open = () => {
    menu.showModal();
    stopScroll();
    ouvrir.setAttribute('aria-expanded', 'true');
    if (!prefersReducedMotion()) {
      gsap.fromTo(menu, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: ease.inOut });
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
  const boucle = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const f = focalisables();
    if (!f.length) return;
    const premier = f[0], dernier = f[f.length - 1];
    if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus(); }
    else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus(); }
  };
  menu.addEventListener('keydown', boucle);
  ouvrir.addEventListener('click', open);
  fermerBtn?.addEventListener('click', close);
  menu.addEventListener('close', onClose);
  menu.addEventListener('click', onClic);
  const mq = matchMedia('(min-width: 48rem)');
  const largeur = () => { if (mq.matches) close(); };
  mq.addEventListener('change', largeur);
  return () => {
    ouvrir.removeEventListener('click', open);
    fermerBtn?.removeEventListener('click', close);
    menu.removeEventListener('close', onClose);
    menu.removeEventListener('click', onClic);
    menu.removeEventListener('keydown', boucle);
    mq.removeEventListener('change', largeur);
    if (menu.open) menu.close();
  };
}

export function setupMenu() {
  onPage(() => initMenu());
}
