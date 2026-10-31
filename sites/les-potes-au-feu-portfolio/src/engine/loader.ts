// First-load sequence. Progress follows REAL work (fonts + critical images), eased by GSAP,
// with a floor so it reads as intentional and a ceiling so it never becomes a usability problem.
// Markup (#loader) lives in the layout; its look is authored per project.
import { gsap } from 'gsap';
import { ease, prefersReducedMotion } from './env';

let format = (p: number) => String(Math.round(p)).padStart(3, '0');
/** Customize the counter text, e.g. a clock, a year, a frame count. p goes 0 → 100. */
export const setLoaderFormat = (fn: (p: number) => string) => { format = fn; };
let exit: ((root: HTMLElement) => gsap.core.Timeline) | null = null;
/** Replace the exit choreography (the loader → hero handoff). Return a timeline. */
export const setLoaderExit = (fn: (root: HTMLElement) => gsap.core.Timeline) => { exit = fn; };

// REVISION-1 (site) F2-05 : loader total ≤ 1,6 s visé (plancher 0,6 s, plafond 0,9 s + sortie ≈ 0,8 s).
const MIN = 0.6; // seconds: long enough to read as a designed moment
const MAX = 0.9; // seconds: a longer loader is a usability problem
// Petits écrans / tactile : le JS arrive déjà tard sur réseau mobile, le compteur est raccourci (REVISION-1 F2-02).
export const loaderCourt = () => typeof matchMedia === 'function' && matchMedia('(max-width: 767px), (pointer: coarse)').matches;
// REVISION-2 F2-01 : sur téléphone, le JS du moteur arrive tard (≈ 2 s en 4G lente, CPU ×4) ; si le loader démarre
// après TARDIF secondes, il ne rejoue pas son compteur : il passe à 100 et sort en version courte (motion/setup.ts).
const TARDIF = 1.2;
let tardif = false;
export const arriveeTardive = () => tardif;
const VU = 'qm-loader-vu'; // une seule fois par session : les visites suivantes passent directement au hero

function criticalAssets(): Promise<unknown>[] {
  const imgs = [...document.querySelectorAll<HTMLImageElement>('img[data-critical], [data-intro] img, [data-gl-instant] img')];
  return [document.fonts.ready, ...imgs.map((i) => (i.complete ? Promise.resolve() : i.decode().catch(() => {})))];
}

export async function runLoader(): Promise<void> {
  const root = document.getElementById('loader');
  if (!root) return;
  let vu = false;
  try { vu = sessionStorage.getItem(VU) === '1'; sessionStorage.setItem(VU, '1'); } catch { /* stockage bloqué : loader normal */ }
  if (vu) return finish(root);
  tardif = loaderCourt() && performance.now() / 1000 > TARDIF;
  const min = loaderCourt() ? 0.3 : MIN;
  const max = loaderCourt() ? 0.6 : MAX;
  if (prefersReducedMotion()) {
    await Promise.race([Promise.all(criticalAssets()), wait(MAX)]);
    await gsap.to(root, { autoAlpha: 0, duration: 0.3 });
    return finish(root);
  }
  const count = root.querySelector<HTMLElement>('[data-loader-count]');
  const bar = root.querySelector<HTMLElement>('[data-loader-bar]');
  if (tardif) {
    if (count) count.textContent = format(100);
    if (bar) bar.style.transform = 'scaleX(1)';
    if (exit) { await exit(root); return finish(root); }
    await gsap.to(root, { autoAlpha: 0, duration: 0.3 });
    return finish(root);
  }
  const tasks = criticalAssets();
  let done = 0;
  const shown = { v: 0 };
  const target = { v: 0 };
  tasks.forEach((t) => t.then(() => { done++; target.v = (done / tasks.length) * 100; }));
  const start = performance.now();

  await new Promise<void>((resolve) => {
    const tick = () => {
      const elapsed = (performance.now() - start) / 1000;
      const timeCap = Math.min(100, (elapsed / min) * 100); // never faster than MIN
      const goal = elapsed > max ? 100 : Math.min(target.v, timeCap);
      shown.v += (goal - shown.v) * Math.min(1, 0.12 * gsap.ticker.deltaRatio()); // indépendant de la cadence
      if (goal === 100 && shown.v > 98) shown.v = 100;
      if (count) count.textContent = format(shown.v);
      if (bar) bar.style.transform = `scaleX(${shown.v / 100})`;
      if (shown.v === 100) { gsap.ticker.remove(tick); resolve(); }
    };
    gsap.ticker.add(tick);
  });

  // Exit. Author per project with setLoaderExit(): it is the first handoff every visitor sees.
  if (exit) { await exit(root); return finish(root); }
  await gsap.timeline()
    .to(root.querySelectorAll('[data-loader-out]'), { yPercent: -110, duration: 0.7, ease: ease.inOut, stagger: 0.05 })
    .to(root, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1, ease: ease.inOut }, '-=0.35');
  finish(root);
}

// Hide rather than remove: in React apps the loader node belongs to React.
function finish(root: HTMLElement) {
  root.hidden = true;
  document.documentElement.classList.add('is-loaded');
}

const wait = (s: number) => new Promise((r) => setTimeout(r, s * 1000));
