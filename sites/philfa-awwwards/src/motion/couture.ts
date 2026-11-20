// Module pilote de PhilFa (patterns.md § 1) : la couture. Une seule variable, la position du fil,
// distribuée à tout ce qui porte le concept par deux propriétés globales sur <html> :
//   --couture-x : décalage de la couture (px), tiré par le pointeur au bureau, par la vitesse de défilement au toucher ;
//   --point     : avance des points de couture (px), entrée de repos : le fil court le long de la couture.
// Tout passe par gsap.ticker ; pause quand aucune couture n'est à l'écran ; mouvement réduit : tout reste à zéro.
import { gsap } from 'gsap';
import { onPage, onScroll, prefersReducedMotion, isTouch } from '../engine';

export const couture = { x: 0, point: 0, visible: 0 };
const AMPLITUDE = 12; // px de part et d'autre du centre
const VITESSE = 26; // px par seconde : le fil court sans point mort (leçon le-royal : pas de sinus)
let lance = false;

/** Entrée de repos et influence du pointeur, une seule fois. */
export function startIdle() {
  if (lance || prefersReducedMotion()) return;
  lance = true;
  const racine = document.documentElement;
  const touch = isTouch();
  let vise = 0;
  if (touch) onScroll(({ velocity }) => { vise = gsap.utils.clamp(-1, 1, velocity / 30); });
  else addEventListener('pointermove', (e) => { vise = (e.clientX / innerWidth - 0.5) * 2; }, { passive: true });
  gsap.ticker.add(() => {
    if (couture.visible <= 0) return; // aucune couture à l'écran : rien n'est écrit
    const r = gsap.ticker.deltaRatio();
    if (touch) vise *= Math.pow(0.92, r);
    couture.x += (vise * AMPLITUDE - couture.x) * (1 - Math.pow(0.94, r));
    couture.point = (couture.point + (VITESSE * gsap.ticker.deltaRatio(1))) % 36;
    racine.style.setProperty('--couture-x', `${couture.x.toFixed(2)}px`);
    racine.style.setProperty('--point', `${couture.point.toFixed(2)}px`);
  });
}

/** Par page : compte les coutures visibles, et joue l'ouverture du hero dans l'intro. */
export function startCouture() {
  startIdle();
  onPage(({ intro }) => {
    const coutures = document.querySelectorAll<HTMLElement>('.cousu');
    couture.visible = 0;
    const vues = new Set<Element>();
    const io = new IntersectionObserver((entrees) => {
      entrees.forEach((e) => (e.isIntersecting ? vues.add(e.target) : vues.delete(e.target)));
      couture.visible = vues.size;
    });
    coutures.forEach((c) => io.observe(c));

    // Moment signature : les deux moitiés arrivent des bords et s'accordent sur la couture, le fil se coud, puis le nom.
    const hero = document.querySelector<HTMLElement>('.hero');
    if (hero && !prefersReducedMotion()) {
      const phil = hero.querySelector('.hero__titre .phil-mot');
      const fa = hero.querySelector('.hero__titre .fa-mot');
      const large = window.matchMedia('(min-width: 761px)').matches;
      intro
        .fromTo(hero, { '--ouvre': 0 }, { '--ouvre': 1, duration: 0.8, ease: 'expo.inOut' }, 0)
        .fromTo(hero, { '--fil': 0 }, { '--fil': 1, duration: 0.7, ease: 'expo.out' }, 0.5);
      if (large) intro
        .fromTo(phil, { xPercent: -18, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.8, ease: 'expo.out' }, 0.15)
        .fromTo(fa, { xPercent: 18, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.8, ease: 'expo.out' }, 0.2);
    }

    // Le double choix : choisir un plat éclaire sa moitié et éteint l'autre (bouton à bascule, clavier et toucher).
    const clic = (e: Event) => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>('.choix');
      if (!b) return;
      const etape = b.closest('.etape');
      const deja = b.getAttribute('aria-pressed') === 'true';
      etape?.querySelectorAll('.choix').forEach((c) => c.setAttribute('aria-pressed', 'false'));
      b.setAttribute('aria-pressed', deja ? 'false' : 'true');
      etape?.classList.toggle('a-choisi', !deja);
    };
    document.addEventListener('click', clic);
    return () => { io.disconnect(); document.removeEventListener('click', clic); couture.visible = 0; };
  });
}
