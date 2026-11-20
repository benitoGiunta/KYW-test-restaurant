// Moment signature « Deux voix » (motion.md : intro du hero + scrub). Le nom arrive en deux moitiés,
// « Épices » depuis la cuisine (gauche), « Nous » depuis la salle (droite) ; elles se rejoignent sur l'axe
// et le & s'allume au contact. Au défilement, le passe s'ouvre : les moitiés s'écartent et le & reste sur l'axe.
// Au pied, le & s'allume en scrub quand la page arrive au passe final. Compteur du menu sur le vrai prix.
import { gsap } from 'gsap';
import { onPage, ease, prefersReducedMotion } from '../engine';

const lire = (el: Element, v: string) => getComputedStyle(el).getPropertyValue(v).trim();

export function startSignature() {
  onPage(({ intro }) => {
    if (prefersReducedMotion()) return;

    const nom = document.querySelector<HTMLElement>('.poster__nom');
    if (nom) {
      const g = nom.querySelector('.poster__g');
      const d = nom.querySelector('.poster__d');
      const et = nom.querySelector('.poster__et');
      const ligne = lire(nom, '--c-line');
      gsap.set(nom, { visibility: 'visible' });
      const tl = gsap.timeline()
        .from(g, { xPercent: -22, autoAlpha: 0, duration: 1.1, ease: ease.out }, 0)
        .from(d, { xPercent: 22, autoAlpha: 0, duration: 1.1, ease: ease.out }, 0)
        .from(et, { scale: 0.45, autoAlpha: 0, color: ligne, duration: 0.7, ease: ease.out }, 0.45);
      intro.add(tl, 0);
      // Le passe s'ouvre au défilement (x en pixels, distinct du xPercent de l'intro).
      gsap.to(g, { x: () => -innerWidth * 0.06, ease: 'none', scrollTrigger: { trigger: nom, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
      gsap.to(d, { x: () => innerWidth * 0.06, ease: 'none', scrollTrigger: { trigger: nom, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
    }

    const pied = document.querySelector<HTMLElement>('.pied__et .et');
    if (pied) {
      gsap.fromTo(pied, { scale: 0.55, color: lire(pied, '--c-line') }, {
        scale: 1, color: lire(pied, '--c-accent'), ease: 'none',
        scrollTrigger: { trigger: pied, start: 'top 95%', end: 'top 55%', scrub: 0.6 },
      });
    }

    document.querySelectorAll<HTMLElement>('[data-compte]').forEach((el) => {
      const fin = parseInt(el.textContent || '0', 10);
      const o = { v: 0 };
      el.textContent = '0';
      gsap.to(o, {
        v: fin, duration: 1.2, ease: ease.out,
        onUpdate: () => { el.textContent = String(Math.round(o.v)); },
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    });
  });
}
