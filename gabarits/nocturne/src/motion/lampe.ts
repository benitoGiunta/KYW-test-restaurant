// La lampe : un seul canvas 2D fixe (#lampe), halo radial ambré qui suit le pointeur avec inertie, dessiné dans le
// ticker unique du moteur. Elle écrit --lx/--ly sur :root et --mx/--my sur chaque figure visible [data-lampe-item]
// (calque dupliqué masqué par radial-gradient). Désactivée sous reduced-motion et sur tactile ; pause quand le pointeur
// sort de la fenêtre ou que l'onglet est caché ; rien n'est redessiné quand rien ne bouge.
import { gsap } from 'gsap';
import { isTouch, prefersReducedMotion } from '../engine';

const R = 260;
const AMBRE = '240, 166, 59';
let actif = false;
let items = new Set<HTMLElement>();
let visibles = new Set<HTMLElement>();
let io: IntersectionObserver | null = null;
let allume = { v: 0 }; // 0 éteinte, 1 allumée (la timeline du hero l'allume)

export const lampeActive = () => actif;

/** Allume ou éteint la lampe (tween sur l'intensité). */
export function allumer(v: number, duration = 1.2) {
  if (!actif) return;
  gsap.to(allume, { v, duration, ease: 'power2.out', overwrite: true });
}

/** Enregistre les figures de la page courante ; renvoie un nettoyage. */
export function enregistrerFigures(root: ParentNode = document) {
  if (!actif) return () => {};
  const list = [...root.querySelectorAll<HTMLElement>('[data-lampe-item]')];
  items = new Set(list);
  visibles = new Set();
  io?.disconnect();
  io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const el = e.target as HTMLElement;
      if (e.isIntersecting) visibles.add(el);
      else { visibles.delete(el); el.style.setProperty('--mx', '-999px'); el.style.setProperty('--my', '-999px'); }
    }
  }, { rootMargin: `${R}px` });
  list.forEach((el) => io!.observe(el));
  return () => { io?.disconnect(); io = null; items.clear(); visibles.clear(); };
}

export function initLampe() {
  if (actif) return;
  const canvas = document.getElementById('lampe') as HTMLCanvasElement | null;
  if (!canvas || isTouch() || prefersReducedMotion() || matchMedia('(hover: none)').matches) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  actif = true;
  document.documentElement.classList.add('lampe-on');

  // Grain : un motif de bruit de 96 px composé sur le halo seulement.
  const g = document.createElement('canvas');
  g.width = g.height = 96;
  const gc = g.getContext('2d')!;
  const img = gc.createImageData(96, 96);
  for (let i = 0; i < img.data.length; i += 4) { const v = Math.random() * 255; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; }
  gc.putImageData(img, 0, 0);
  const grain = ctx.createPattern(g, 'repeat')!;

  let dpr = 1;
  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    dirty = true;
  };
  const pos = { x: innerWidth / 2, y: innerHeight * 0.42 };
  const cible = { x: pos.x, y: pos.y };
  // Tant que le pointeur n'est jamais entré, la lampe veille au centre à mi-intensité (elle respire) ; elle s'éteint
  // quand le pointeur sort de la fenêtre.
  let presence = 0;
  let presenceCible = 0.45;
  let dirty = true;
  let cache = false;
  let t = 0;

  const move = (e: PointerEvent) => { cible.x = e.clientX; cible.y = e.clientY; presenceCible = 1; };
  const sortie = (e: MouseEvent) => { if (!e.relatedTarget) presenceCible = 0; };
  const visibilite = () => { cache = document.hidden; };
  addEventListener('pointermove', move, { passive: true });
  document.addEventListener('mouseout', sortie);
  document.addEventListener('visibilitychange', visibilite);
  addEventListener('resize', resize);
  resize();

  const root = document.documentElement.style;
  const tick = (_time: number, delta: number) => {
    if (cache) return;
    const k = Math.min(1, 0.12 * gsap.ticker.deltaRatio());
    const dx = cible.x - pos.x, dy = cible.y - pos.y;
    const dp = presenceCible - presence;
    t += delta / 1000;
    const respire = 1 + Math.sin(t * (Math.PI * 2) / 5) * 0.023; // ± 6 px sur 260
    const a = allume.v * presence;
    if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05 && Math.abs(dp) < 0.002 && !dirty && a === 0) return;
    pos.x += dx * k; pos.y += dy * k; presence += dp * k;
    dirty = false;
    root.setProperty('--lx', pos.x.toFixed(1) + 'px');
    root.setProperty('--ly', pos.y.toFixed(1) + 'px');
    for (const el of visibles) {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (pos.x - r.left).toFixed(1) + 'px');
      el.style.setProperty('--my', (pos.y - r.top).toFixed(1) + 'px');
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    if (a <= 0.001) return;
    const r = R * respire;
    const grad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, r);
    grad.addColorStop(0, `rgba(${AMBRE}, ${0.55 * a})`);
    grad.addColorStop(0.45, `rgba(${AMBRE}, ${0.2 * a})`);
    grad.addColorStop(1, `rgba(${AMBRE}, 0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(pos.x - r, pos.y - r, r * 2, r * 2);
    ctx.globalCompositeOperation = 'source-atop';
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = grain;
    ctx.fillRect(pos.x - r, pos.y - r, r * 2, r * 2);
  };
  gsap.ticker.add(tick);
}
