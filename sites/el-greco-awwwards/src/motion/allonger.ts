// Module pilote du concept « allonger » (patterns.md § 1). Une variable, l'étirement vertical, distribuée à tout ce
// qui porte le concept :
//   [data-allonge]           --etire de 0,28 à 1 (intro si data-intro, sinon à l'entrée dans l'écran), depuis la base ;
//   .hero [data-allonge]     --defile de 1 à 1,16 pendant que le hero quitte l'écran (scrub) : le Grec s'étire encore ;
//   [data-respire]           l'image du cadre haut glisse lentement (repos), le pointeur la tire vers le haut ou le bas ;
//   .carte__nav              le filet de la rubrique lue monte (is-actif).
// Une horloge : gsap.ticker et ScrollTrigger. En mouvement réduit : rien ne bouge, les variables restent à 1.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, ease } from '../engine';
import { idle, startIdle } from './idle';

gsap.registerPlugin(ScrollTrigger);

const DEPART = 0.28;
const PERIODE = 14; // secondes, respiration des cadres

export function startAllonger() {
  startIdle();
  onPage(({ intro }) => {
    // Sommaire de la carte : utile aussi en mouvement réduit (aucun mouvement, une classe).
    const liens = new Map<string, HTMLElement>();
    document.querySelectorAll<HTMLAnchorElement>('.carte__nav a[href^="#"]').forEach((a) => liens.set(a.hash.slice(1), a));
    document.querySelectorAll<HTMLElement>('.rubrique').forEach((sec) => {
      const a = liens.get(sec.id);
      if (!a) return;
      ScrollTrigger.create({ trigger: sec, start: 'top 45%', end: 'bottom 45%', onToggle: (st) => a.classList.toggle('is-actif', st.isActive) });
    });

    if (!document.documentElement.classList.contains('motion')) return;

    // Intro et entrées : la forme part tassée sur sa base et s'allonge.
    let rang = 0;
    document.querySelectorAll<HTMLElement>('[data-allonge]').forEach((el) => {
      const cadre = el.dataset.allonge === 'cadre';
      const vars = { '--etire': 1, duration: cadre ? 1.1 : 0.9, ease: ease.out };
      const delay = parseFloat(el.dataset.delay || '0');
      if (el.hasAttribute('data-intro')) intro.fromTo(el, { '--etire': DEPART }, vars, 0.05 + rang++ * 0.08 + delay);
      else gsap.fromTo(el, { '--etire': DEPART }, { ...vars, delay, scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
    });

    // Défilement : le hero continue de s'étirer en sortant.
    const hero = document.querySelector<HTMLElement>('.hero');
    if (hero) {
      gsap.fromTo(hero.querySelectorAll('[data-allonge]'), { '--defile': 1 }, {
        '--defile': 1.16, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
      });
    }

    // Repos : les images des cadres hauts glissent (sinus lent) ; le pointeur (ou la vitesse au toucher) les tire.
    const cadres = [...document.querySelectorAll<HTMLElement>('[data-respire]')];
    const imgs = cadres.map((c) => c.querySelector<HTMLImageElement>('img'));
    const visibles = new Set<number>();
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      const i = cadres.indexOf(e.target as HTMLElement);
      if (e.isIntersecting) visibles.add(i); else visibles.delete(i);
    }));
    cadres.forEach((c) => io.observe(c));
    // yPercent de l'image (110 % du cadre) entre -9 et 0 : centre -4,5, sinus ±1,8, pointeur ±0,9.
    const tick = () => {
      visibles.forEach((i) => {
        const img = imgs[i];
        if (!img) return;
        gsap.set(img, { yPercent: -4.5 + 1.8 * Math.sin((idle.t / PERIODE) * Math.PI * 2 + i * 1.7) + idle.y * 1.8 });
      });
    };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); io.disconnect(); };
  });
}
