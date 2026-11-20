// Menu mobile accessible (motion.md « Full-screen menu overlay ») : bouton « Menu » avec aria-expanded,
// panneau plein écran qui entre comme le rideau (de gauche à droite), focus piégé, Échap ferme,
// focus rendu au bouton. Code de page dans onPage(), nettoyage rendu.
import { gsap } from 'gsap';
import { onPage, prefersReducedMotion, stopScroll, startScroll, ease } from '../engine';

const FOCUSABLE = 'a[href], button:not([disabled])';

export function startMenu() {
  onPage(() => {
    const btn = document.querySelector<HTMLButtonElement>('.menu-btn');
    const panel = document.getElementById('menu-mobile');
    if (!btn || !panel) return;
    const texte = btn.querySelector('.menu-btn__texte');
    let open = false;
    let anim: gsap.core.Timeline | null = null;

    const items = () => [btn, ...panel.querySelectorAll<HTMLElement>(FOCUSABLE)];
    const setOpen = (v: boolean, rendreFocus = true) => {
      if (v === open) return;
      open = v;
      btn.setAttribute('aria-expanded', String(v));
      if (texte) texte.textContent = v ? 'Fermer' : 'Menu';
      document.documentElement.classList.toggle('menu-ouvert', v);
      anim?.kill();
      const reduced = prefersReducedMotion();
      if (v) {
        panel.hidden = false;
        stopScroll();
        if (!reduced) {
          anim = gsap.timeline()
            .fromTo(panel, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: ease.inOut })
            .from(panel.querySelectorAll('.menu-mobile__liste li'), { x: -32, opacity: 0, duration: 0.8, ease: ease.out, stagger: 0.05 }, 0.25);
        }
        panel.querySelector<HTMLElement>(FOCUSABLE)?.focus();
      } else {
        const fin = () => { panel.hidden = true; gsap.set(panel, { clearProps: 'clipPath' }); };
        if (reduced) fin();
        else anim = gsap.timeline({ onComplete: fin }).to(panel, { clipPath: 'inset(0% 0% 0% 100%)', duration: 0.6, ease: ease.inOut });
        startScroll();
        if (rendreFocus) btn.focus();
      }
    };

    const onClick = () => setOpen(!open);
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') { e.preventDefault(); setOpen(false); return; }
      if (e.key !== 'Tab') return;
      const f = items();
      const i = f.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    };
    const mq = matchMedia('(min-width: 52.01rem)');
    const onMq = () => { if (mq.matches) setOpen(false, false); };
    btn.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      btn.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
      document.documentElement.classList.remove('menu-ouvert');
      anim?.kill();
    };
  });
}
