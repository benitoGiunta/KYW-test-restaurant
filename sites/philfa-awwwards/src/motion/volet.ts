// Menu plein écran du téléphone (motion.md « Full-screen menu overlay ») : bouton « Menu » avec aria-expanded,
// les deux moitiés du volet arrivent du haut et du bas et s'accordent au centre, focus piégé, Échap ferme,
// focus rendu au bouton, défilement arrêté. Nom « volet » : « .menu » est déjà le menu du moment.
import { gsap } from 'gsap';
import { onPage, stopScroll, startScroll, prefersReducedMotion, ease } from '../engine';

export function startVolet() {
  onPage(() => {
    const btn = document.querySelector<HTMLButtonElement>('.tete__menu');
    const volet = document.getElementById('volet');
    const fermerBtn = volet?.querySelector<HTMLButtonElement>('.volet__fermer');
    if (!btn || !volet || !fermerBtn) return;
    const focusables = () => [...volet.querySelectorAll<HTMLElement>('a[href], button')];
    let ouvert = false;
    let anim: gsap.core.Timeline | null = null;
    const ouvrir = () => {
      if (ouvert) return;
      ouvert = true;
      volet.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      stopScroll();
      if (!prefersReducedMotion()) {
        anim?.kill();
        anim = gsap.timeline()
          .fromTo(volet.querySelector('.volet__phil'), { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: ease.inOut }, 0)
          .fromTo(volet.querySelector('.volet__fa'), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: ease.inOut }, 0)
          .from(volet.querySelectorAll('.volet__ligne'), { yPercent: 110, duration: 0.9, stagger: 0.05, ease: ease.out }, 0.3);
      }
      focusables()[0]?.focus();
    };
    const fermer = (rendre = true) => {
      if (!ouvert) return;
      ouvert = false;
      anim?.progress(1).kill();
      anim = null;
      gsap.set(volet.querySelectorAll('.volet__phil, .volet__fa, .volet__ligne'), { clearProps: 'clipPath,transform' });
      volet.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
      startScroll();
      if (rendre) btn.focus();
    };
    const clavier = (e: KeyboardEvent) => {
      if (!ouvert) return;
      if (e.key === 'Escape') { e.preventDefault(); fermer(); return; }
      if (e.key !== 'Tab') return;
      const f = focusables();
      const premier = f[0], dernier = f[f.length - 1];
      if (e.shiftKey && document.activeElement === premier) { e.preventDefault(); dernier.focus(); }
      else if (!e.shiftKey && document.activeElement === dernier) { e.preventDefault(); premier.focus(); }
      else if (!volet.contains(document.activeElement)) { e.preventDefault(); premier.focus(); }
    };
    const clic = (e: Event) => { if ((e.target as HTMLElement).closest('a')) fermer(false); };
    const ferme = () => fermer();
    btn.addEventListener('click', ouvrir);
    fermerBtn.addEventListener('click', ferme);
    volet.addEventListener('click', clic);
    document.addEventListener('keydown', clavier);
    return () => {
      fermer(false);
      btn.removeEventListener('click', ouvrir);
      fermerBtn.removeEventListener('click', ferme);
      volet.removeEventListener('click', clic);
      document.removeEventListener('keydown', clavier);
    };
  });
}
