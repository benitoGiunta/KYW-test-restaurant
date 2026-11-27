// Pilote du concept « Le Clos » (patterns.md § 1). Une variable : l'ouverture de l'enclos (--ouv, 0 fermé, 1 ouvert),
// distribuée à tout ce qui porte le concept :
//   - hero : deux battants s'écartent à l'intro, les piquets d'angle se posent (intro de page) ;
//   - chaque cadre .enclos : ses piquets s'écartent jusqu'aux bords de la photo quand elle entre dans l'écran (scrub) ;
//   - repos : les piquets du hero respirent (--resp, va-et-vient à vitesse constante) et penchent vers le pointeur.
// Mouvement réduit : rien ne tourne, --ouv vaut 1 et --resp 0 par défaut (CSS), les battants sont masqués.
import { gsap } from 'gsap';
import { onPage, ease, prefersReducedMotion } from '../engine';
import { idle } from './idle';

export function startClos() {
  onPage(({ intro }) => {
    if (prefersReducedMotion()) return;
    const hero = document.querySelector<HTMLElement>('[data-battants]');
    if (hero) {
      const [g, d] = hero.querySelectorAll<HTMLElement>('.battant');
      intro
        .fromTo(g, { xPercent: 0 }, { xPercent: -101, duration: 1.1, ease: ease.inOut }, 0.15)
        .fromTo(d, { xPercent: 0 }, { xPercent: 101, duration: 1.1, ease: ease.inOut }, 0.15)
        .fromTo(hero, { '--ouv': 0 }, { '--ouv': 1, duration: 1, ease: ease.out }, 0.55)
        .set([g, d], { autoAlpha: 0 });
    }

    // Les cadres de la page : l'enclos se referme sur la photo à son entrée.
    document.querySelectorAll<HTMLElement>('.enclos:not([data-battants])').forEach((el) => {
      gsap.fromTo(el, { '--ouv': 0 }, { '--ouv': 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 40%', scrub: 0.6 } });
    });

    // Index : la vignette suit le pointeur le long de sa ligne (pointeur fin seulement).
    const offs: (() => void)[] = [];
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      document.querySelectorAll<HTMLElement>('.index__lien').forEach((a) => {
        const v = a.querySelector<HTMLElement>('.index__vignette');
        if (!v) return;
        const x = gsap.quickTo(v, 'x', { duration: 0.7, ease: ease.out });
        const move = (e: PointerEvent) => {
          const r = v.getBoundingClientRect();
          x(gsap.utils.clamp(-r.width * 0.6, 0, e.clientX - (r.left - (Number(gsap.getProperty(v, 'x')) || 0)) - r.width / 2));
        };
        const out = () => x(0);
        a.addEventListener('pointermove', move);
        a.addEventListener('pointerleave', out);
        offs.push(() => { a.removeEventListener('pointermove', move); a.removeEventListener('pointerleave', out); });
      });
    }
    if (!hero) return () => offs.forEach((f) => f());
    // Repos : les piquets veillent. Va-et-vient de 0 à 12 px (5 px/s, seuil idleMotion de shoot.mjs), plus le penchant vers le pointeur.
    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting === visible) return;
      visible = e.isIntersecting;
      if (visible) gsap.ticker.add(tick); else gsap.ticker.remove(tick);
    });
    const tick = () => {
      const resp = gsap.utils.wrapYoyo(0, 12, idle.t * 5);
      hero.style.setProperty('--resp', `${(resp + idle.y * 6).toFixed(2)}px`);
      hero.style.setProperty('--pen', `${(idle.x * 14).toFixed(2)}px`);
    };
    io.observe(hero);
    return () => { offs.forEach((f) => f()); io.disconnect(); gsap.ticker.remove(tick); hero.style.removeProperty('--resp'); hero.style.removeProperty('--pen'); };
  });
}
