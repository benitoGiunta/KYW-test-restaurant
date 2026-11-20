// Menu mobile : <dialog> modal (focus piégé et Échap natifs), aria-expanded tenu, focus rendu au bouton,
// ouverture qui s'étale en cercle depuis le bouton. Fermé au clic sur un lien AVANT la navigation
// (un dialog modal reste dans la couche supérieure, au-dessus du rideau de transition).
import { gsap } from 'gsap';
import { ease, onPage, prefersReducedMotion, startScroll, stopScroll } from '../engine';

export function initMenu() {
  onPage(() => {
    const btn = document.querySelector<HTMLButtonElement>('[data-menu-ouvrir]');
    const dlg = document.getElementById('menu') as HTMLDialogElement | null;
    if (!btn || !dlg) return;
    const fermeBtn = dlg.querySelector<HTMLButtonElement>('[data-menu-fermer]');
    const liens = [...dlg.querySelectorAll<HTMLAnchorElement>('a')];

    const ouvrir = () => {
      if (dlg.open) return;
      dlg.showModal();
      btn.setAttribute('aria-expanded', 'true');
      stopScroll();
      if (!prefersReducedMotion()) {
        gsap.fromTo(dlg, { clipPath: 'circle(0% at 100% 0%)' }, { clipPath: 'circle(150% at 100% 0%)', duration: 0.7, ease: ease.inOut, clearProps: 'clipPath' });
        gsap.from(dlg.querySelectorAll('.menu__lien'), { yPercent: 60, autoAlpha: 0, duration: 0.8, ease: ease.out, stagger: 0.06, delay: 0.15, clearProps: 'transform,opacity' });
      }
    };
    const fermer = () => { if (dlg.open) dlg.close(); };
    const surFermeture = () => {
      btn.setAttribute('aria-expanded', 'false');
      startScroll();
      btn.focus();
    };
    const mq = matchMedia('(min-width: 48rem)');
    const surLargeur = () => { if (mq.matches) fermer(); };

    btn.addEventListener('click', ouvrir);
    fermeBtn?.addEventListener('click', fermer);
    dlg.addEventListener('close', surFermeture);
    liens.forEach((a) => a.addEventListener('click', fermer));
    mq.addEventListener('change', surLargeur);
    return () => {
      btn.removeEventListener('click', ouvrir);
      fermeBtn?.removeEventListener('click', fermer);
      dlg.removeEventListener('close', surFermeture);
      liens.forEach((a) => a.removeEventListener('click', fermer));
      mq.removeEventListener('change', surLargeur);
      if (dlg.open) dlg.close();
    };
  });
}
