// Module pilote du concept « Les miroirs ronds » (patterns.md § 1).
// Variable unique : l'ouverture de chaque miroir (0 fermé, 1 ouvert), donnée par le défilement
// (scrub) ou par l'intro pour le miroir du hero et de la 404. Tout ce qui porte le concept la lit :
//   - l'iris (clip-path circulaire) du hublot ;
//   - le reflet (l'image) qui se resserre en s'ouvrant, puis glisse contre le pointeur
//     (un miroir montre ce qui est derrière : changer de point de vue décale le reflet) ;
//   - l'éclat de lumière qui fait le tour du verre du grand miroir (état de repos, gsap.ticker).
// Mouvement réduit : rien ne tourne, les hublots sont ouverts (repli CSS, html:not(.motion)).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, ease, prefersReducedMotion } from '../engine';
import { idle, startIdle } from './idle';

gsap.registerPlugin(ScrollTrigger);

const R0 = 18; // rayon fermé (% de circle(), 50 = cercle inscrit)
const R1 = 72; // ouvert : au-delà du cercle inscrit, le bord cuivré est entier
export const iris = (o: number) => `circle(${(R0 + (R1 - R0) * o).toFixed(2)}% at 50% 50%)`;

type Miroir = { el: HTMLElement; img: HTMLElement | null; o: { v: number }; amp: number };

function ouvrir(m: Miroir) {
  m.el.style.clipPath = iris(m.o.v);
  if (m.img) gsap.set(m.img, { scale: 1.1 + (1 - m.o.v) * 0.22 });
}

export function startConcept() {
  if (prefersReducedMotion()) return;
  startIdle();
  onPage(({ intro }) => {
    const all = [...document.querySelectorAll<HTMLElement>('[data-iris]')];
    if (!all.length) return;
    const visibles = new Set<Miroir>();
    const miroirs: Miroir[] = all.map((el) => ({
      el,
      img: el.querySelector<HTMLElement>('img'),
      o: { v: 0 },
      amp: Math.min(16, el.offsetWidth * 0.025),
    }));

    miroirs.forEach((m) => {
      ouvrir(m);
      const update = () => ouvrir(m);
      if (m.el.dataset.iris === 'intro') {
        m.o.v = 0.3;
        ouvrir(m);
        intro.add(gsap.to(m.o, { v: 1, duration: 1.5, ease: ease.out, onUpdate: update }), 0.15);
      } else {
        gsap.to(m.o, {
          v: 1, ease: 'none', onUpdate: update,
          scrollTrigger: { trigger: m.el, start: 'top 95%', end: 'top 45%', scrub: 0.6, invalidateOnRefresh: true },
        });
      }
    });

    // Seuls les miroirs à l'écran suivent le pointeur (IntersectionObserver, pas de calcul hors écran).
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const m = miroirs.find((x) => x.el === e.target);
        if (m) e.isIntersecting ? visibles.add(m) : visibles.delete(m);
      });
    });
    miroirs.forEach((m) => io.observe(m.el));

    // Éclat : le reflet de la lampe tourne autour du verre du grand miroir et penche vers le pointeur.
    const eclat = document.querySelector<HTMLElement>('.eclat');
    let enVue = true;
    const ioEclat = eclat ? new IntersectionObserver(([e]) => { enVue = e.isIntersecting; }) : null;
    if (eclat) ioEclat!.observe(eclat);

    const tick = () => {
      visibles.forEach((m) => {
        if (m.img) gsap.set(m.img, { x: -idle.x * m.amp * 2, y: -idle.y * m.amp * 2 });
      });
      if (eclat && enVue) gsap.set(eclat, { rotation: idle.t * 14 + idle.x * 50 });
    };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); io.disconnect(); ioEclat?.disconnect(); };
  });
}
