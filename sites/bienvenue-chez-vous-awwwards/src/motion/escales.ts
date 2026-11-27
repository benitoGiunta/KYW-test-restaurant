// Module pilote du concept « Escales » : une variable (la progression sur la route, lue au défilement)
// distribuée à tout ce qui porte le concept : le fil rouge du rail, les escales qui s'allument,
// les assiettes qui s'ouvrent, la vitesse de l'escale qui tourne autour de l'assiette du hero.
// Le pointeur penche l'assiette ; startIdle() fait tourner l'escale au repos. Une horloge : gsap.ticker.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll, ease, prefersReducedMotion, isTouch } from '../engine';

let vitesse = 0; // vitesse de défilement lissée, partagée par la page courante

/** Repos : l'escale fait le tour de l'assiette (10 degrés par seconde, plus vite quand on défile). */
function startIdle(bague: SVGElement, plate: HTMLElement) {
  let angle = 0;
  let visible = true;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
  io.observe(plate);
  const tick = (_t: number, dt: number) => {
    if (!visible) return;
    angle = (angle + (dt / 1000) * (10 + Math.min(Math.abs(vitesse) * 0.02, 40))) % 360;
    gsap.set(bague, { rotation: angle, svgOrigin: '100 100' });
  };
  gsap.ticker.add(tick);
  return () => { gsap.ticker.remove(tick); io.disconnect(); };
}

/** Pointeur : l'assiette du hero se penche de quelques pixels vers la main. */
function pointeur(plate: HTMLElement) {
  if (isTouch()) return () => {};
  const toX = gsap.quickTo(plate, 'x', { duration: 0.9, ease: ease.soft });
  const toY = gsap.quickTo(plate, 'y', { duration: 0.9, ease: ease.soft });
  const move = (e: PointerEvent) => {
    toX(((e.clientX / innerWidth) - 0.5) * 16);
    toY(((e.clientY / innerHeight) - 0.5) * 12);
  };
  window.addEventListener('pointermove', move, { passive: true });
  return () => window.removeEventListener('pointermove', move);
}

export function startEscales() {
  onScroll((s) => { vitesse = s?.velocity ?? 0; });

  onPage(({ intro }) => {
    if (prefersReducedMotion()) return; // repli statique dessiné : rail, escales et assiettes visibles
    const nettoyages: (() => void)[] = [];
    const route = document.querySelector<HTMLElement>('.route');

    // 1. Le fil rouge : la route se remplit jusqu'à l'endroit où vous êtes.
    if (route) {
      const fil = document.createElement('span');
      fil.className = 'route__fil';
      fil.setAttribute('aria-hidden', 'true');
      route.prepend(fil);
      gsap.fromTo(fil, { scaleY: 0 }, {
        scaleY: 1, ease: 'none', transformOrigin: '50% 0%',
        scrollTrigger: { trigger: route, start: 'top 55%', end: 'bottom 55%', scrub: 0.5, invalidateOnRefresh: true },
      });
      nettoyages.push(() => fil.remove());

      // 2. Les escales s'allument au passage (le point se remplit, CSS .is-lit).
      route.querySelectorAll<HTMLElement>(':scope > .stop').forEach((stop) => {
        ScrollTrigger.create({
          trigger: stop, start: 'top 62%',
          onEnter: () => stop.classList.add('is-lit'),
          onLeaveBack: () => stop.classList.remove('is-lit'),
        });
      });
    }

    // 3. Les assiettes s'ouvrent : clip-path en cercle, depuis le centre du plat.
    document.querySelectorAll<HTMLElement>('.route .photo--rond').forEach((img) => {
      if (img.closest('.hero')) return; // l'assiette du hero est peinte dès le premier rendu (LCP)
      const ligne = img.closest('.index__ligne, .mur figure');
      gsap.fromTo(img, { clipPath: 'circle(0% at 50% 50%)' }, {
        clipPath: 'circle(50% at 50% 50%)', duration: 0.9, ease: ease.out,
        delay: ligne && ligne.matches('.mur figure') ? (Array.from(ligne.parentElement!.children).indexOf(ligne) % 3) * 0.06 : 0,
        clearProps: 'clipPath',
        scrollTrigger: { trigger: ligne ?? img, start: 'top 86%', once: true },
      });
    });

    // 4. Le hero : l'assiette est posée (servir), puis l'escale tourne au repos.
    const plate = document.querySelector<HTMLElement>('.hero__plate');
    const bague = plate?.querySelector<SVGElement>('.bague__tour');
    if (plate) {
      intro.from(plate, { scale: 0.94, rotation: -4, duration: 1.2, ease: ease.out }, 0.1);
      const actions = document.querySelectorAll('.hero__actions > *, .hero__infos');
      if (actions.length) intro.from(actions, { y: 16, opacity: 0, duration: 0.7, stagger: 0.06, ease: ease.out, clearProps: 'transform,opacity' }, 0.45);
      nettoyages.push(pointeur(plate));
      if (bague) {
        intro.from(bague, { opacity: 0, duration: 0.8, ease: ease.soft }, 0.6);
        nettoyages.push(startIdle(bague, plate));
      }
    }

    return () => nettoyages.forEach((n) => n());
  });
}
