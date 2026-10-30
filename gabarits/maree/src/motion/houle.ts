// La houle : un seul path sinusoïdal (2 ondes sur 1440 × 80) recalculé au ticker et partagé par toutes les
// instances [data-houle] de la page. Amplitude 6 px au repos (elle respire), 28 px à vitesse max (vélocité Lenis).
// Mobile : amplitude /2 et 30 fps ; pause hors écran. Reduced motion : path statique, pas de ticker.
import { gsap } from 'gsap';
import { onScroll, prefersReducedMotion, isMobile } from '../engine';

const W = 1440, H = 80, N = 72;
const amp = { v: 6 };
let repos = 6, max = 28;
let phase = 0;
let paths: { el: SVGPathElement; visible: boolean }[] = [];
let io: IntersectionObserver | null = null;
let last = 0;
let ticking = false;
let setAmp: ((v: number) => void) | null = null;
let unsub: (() => void) | null = null;

/** d d'une houle d'amplitude a et de phase p : ligne à mi-hauteur, remplie vers le bas. */
export function houleD(a: number, p = 0) {
  let d = '';
  for (let i = 0; i <= N; i++) {
    const x = (i / N) * W;
    const y = H / 2 + Math.sin((i / N) * Math.PI * 4 + p) * a;
    d += (i ? ' L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1);
  }
  return d + ` L${W},${H} L0,${H} Z`;
}

function tick(time: number) {
  if (isMobile() && time - last < 1 / 30) return; // 30 fps en mobile
  last = time;
  phase = (time * 1.05) % (Math.PI * 2); // respiration lente : une période toutes les 6 s
  const d = houleD(amp.v, phase);
  for (const p of paths) if (p.visible) p.el.setAttribute('d', d);
}

/** Enregistre les houles de la page (appelé dans onPage) ; renvoie le nettoyage. */
export function registerHoules(root: ParentNode = document) {
  const els = [...root.querySelectorAll<SVGPathElement>('path[data-houle]')];
  const statique = houleD(6, 0);
  els.forEach((el) => el.setAttribute('d', statique));
  if (prefersReducedMotion() || !els.length) return () => {};
  const mobile = isMobile();
  repos = mobile ? 3 : 6;
  max = mobile ? 14 : 28;
  amp.v = repos;
  paths = els.map((el) => ({ el, visible: true }));
  io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const p = paths.find((x) => x.el.closest('svg') === e.target);
      if (p) p.visible = e.isIntersecting;
    }
  }, { rootMargin: '120px 0px' });
  paths.forEach((p) => io!.observe(p.el.closest('svg')!));
  if (!setAmp) setAmp = gsap.quickTo(amp, 'v', { duration: 0.7, ease: 'power2.out' });
  if (!unsub) unsub = onScroll((s) => {
    const v = Math.min(1, Math.abs(s.velocity ?? 0) / 45);
    setAmp!(repos + (max - repos) * v);
  });
  if (!ticking) { gsap.ticker.add(tick); ticking = true; }
  return () => {
    io?.disconnect();
    io = null;
    paths = [];
    if (ticking) { gsap.ticker.remove(tick); ticking = false; }
  };
}
