// Menu plein écran (téléphone) : bouton « Menu » avec aria-expanded, panneau framboise qui déborde depuis
// la droite (comme le rideau), focus piégé, Échap ferme, focus rendu au bouton. Rebranché à chaque page.
import { gsap } from 'gsap';
import { onPage, stopScroll, startScroll, ease, prefersReducedMotion } from '../engine';

export function startMenu() {
  onPage(() => {
    const btn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
    const panel = document.getElementById('menu');
    if (!btn || !panel) return;
    const close = panel.querySelector<HTMLButtonElement>('[data-menu-close]')!;
    const focusables = () => [...panel.querySelectorAll<HTMLElement>('a[href], button')];
    let tl: gsap.core.Timeline | null = null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); fermer(); return; }
      if (e.key !== 'Tab') return;
      const f = focusables(); const first = f[0]; const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    function ouvrir() {
      panel!.hidden = false;
      btn!.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('menu-ouvert');
      stopScroll();
      document.addEventListener('keydown', onKey);
      tl?.kill();
      if (!prefersReducedMotion()) {
        tl = gsap.timeline()
          .fromTo(panel, { clipPath: 'inset(0% 0% 0% 100%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: ease.inOut })
          .from(panel.querySelectorAll('.menu__lien'), { yPercent: 110, duration: 0.9, ease: ease.out, stagger: 0.06 }, 0.3);
      }
      (panel!.querySelector<HTMLElement>('.menu__lien a') || close).focus();
    }
    function fermer(rendre = true) {
      if (panel!.hidden) return;
      tl?.kill(); tl = null;
      gsap.set(panel, { clearProps: 'clipPath' });
      gsap.set(panel!.querySelectorAll('.menu__lien'), { clearProps: 'transform' });
      panel!.hidden = true;
      btn!.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('menu-ouvert');
      document.removeEventListener('keydown', onKey);
      startScroll();
      if (rendre) btn!.focus();
    }
    const basculer = () => (panel.hidden ? ouvrir() : fermer());
    btn.addEventListener('click', basculer);
    close.addEventListener('click', () => fermer());
    // Un lien interne lance la navigation : le menu se referme sans voler le focus.
    const surLien = () => fermer(false);
    panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', surLien));
    return () => {
      fermer(false);
      btn.removeEventListener('click', basculer);
      panel.querySelectorAll('a').forEach((a) => a.removeEventListener('click', surLien));
    };
  });
}
