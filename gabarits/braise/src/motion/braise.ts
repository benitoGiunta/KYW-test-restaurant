// Driver « Braise » : une température (900 → 20 °C) calculée depuis les sections [data-temp] pilote les six couleurs,
// le halo, le grain, le voile et le thermomètre. Tout passe par des variables CSS sur <html> (une seule horloge : le
// ticker GSAP). Les modules de page (cuisson, manifeste, carte, marquee, en-tête) vivent ici aussi, chacun derrière
// onPage() avec test de présence.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { onPage, onScroll, scrollState, scrollToTarget, prefersReducedMotion, isTouch, ease } from '../engine';

gsap.registerPlugin(ScrollTrigger, SplitText);

type Stop = { t: number; bg: string; fg: string; muted: string; line: string; accent: string; on: string; halo: number; grain: number; voile: number };
// Arrêts de température (voir DESIGN.md) ; l'encre bascule entre 125 et 115 °C pour que le contraste reste AA ailleurs.
const STOPS: Stop[] = [
  // Révision 1 : accent éclairci sur les bruns moyens et assombri sur l'ivoire, pour que l'accent reste ≥ 4,5:1 en
  // texte (chapeaux) à toute température hors de la bascule 125 → 115 °C ; `on` = encre posée sur l'accent (boutons).
  { t: 900, bg: '#141110', fg: '#f4ede2', muted: '#b9aea2', line: '#5e5650', accent: '#ee7a45', on: '#1a1410', halo: 1, grain: 0.06, voile: 0.3 },
  { t: 520, bg: '#2a1510', fg: '#f4ede2', muted: '#c9b5a4', line: '#6a5146', accent: '#f0875a', on: '#1a1410', halo: 0.7, grain: 0.06, voile: 0.25 },
  { t: 150, bg: '#7a4e36', fg: '#f4ede2', muted: '#f0e2d4', line: '#9c7a62', accent: '#ffc6a6', on: '#1a1410', halo: 0.25, grain: 0.04, voile: 0.15 },
  { t: 125, bg: '#7c4f36', fg: '#f4ede2', muted: '#f4e8dc', line: '#a8866c', accent: '#ffcfb4', on: '#1a1410', halo: 0.18, grain: 0.03, voile: 0.12 },
  { t: 115, bg: '#c9ad95', fg: '#1a1410', muted: '#3e3028', line: '#a88a72', accent: '#5e230a', on: '#f7efe4', halo: 0.12, grain: 0.01, voile: 0.1 },
  { t: 90, bg: '#e6d5bf', fg: '#1a1410', muted: '#54422f', line: '#b9a48f', accent: '#7a300f', on: '#f7efe4', halo: 0.08, grain: 0, voile: 0.08 },
  { t: 20, bg: '#f2e8d8', fg: '#1a1410', muted: '#5e4a3c', line: '#c9b8a4', accent: '#8f3a14', on: '#f7efe4', halo: 0, grain: 0, voile: 0.05 },
];

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, k: number) => {
  const A = hex(a), B = hex(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(' ')})`;
};
function stateAt(t: number) {
  t = Math.max(20, Math.min(900, t));
  let i = 0;
  while (i < STOPS.length - 2 && t < STOPS[i + 1].t) i++;
  const a = STOPS[i], b = STOPS[i + 1];
  const k = (a.t - t) / (a.t - b.t);
  const n = (x: number, y: number) => x + (y - x) * k;
  return {
    bg: mix(a.bg, b.bg, k), fg: mix(a.fg, b.fg, k), muted: mix(a.muted, b.muted, k), line: mix(a.line, b.line, k), accent: mix(a.accent, b.accent, k), on: k < 0.5 ? a.on : b.on,
    halo: n(a.halo, b.halo), grain: n(a.grain, b.grain), voile: n(a.voile, b.voile),
  };
}
export const chapitre = (t: number) => (t >= 400 ? 'cuisson' : t >= 200 ? 'dressage' : t >= 60 ? 'table' : 'nuit');

const root = () => document.documentElement;
let shown = 900;
let target = 900;
let pointer = { x: 0.6, y: 0.4 };
let keys: { y: number; t: number }[] = [];
/** Révision 1 : une seule horloge ; les modules de page (marquee) s'y inscrivent au lieu d'ajouter leur ticker. */
const taches = new Set<(t: number, dt: number) => void>();

/** Clés (position de défilement → température) relevées sur les sections [data-temp] (+ data-temp-end). */
function buildKeys() {
  const vh = innerHeight;
  keys = [];
  document.querySelectorAll<HTMLElement>('[data-temp]').forEach((el) => {
    const top = el.getBoundingClientRect().top + scrollY;
    const t = parseFloat(el.dataset.temp || '900');
    keys.push({ y: Math.max(0, top - vh * 0.35), t });
    if (el.dataset.tempEnd) keys.push({ y: top + el.offsetHeight - vh, t: parseFloat(el.dataset.tempEnd) });
  });
  keys.sort((a, b) => a.y - b.y);
  if (!keys.length) keys = [{ y: 0, t: parseFloat(root().dataset.start || '900') }];
}
function tempAt(y: number) {
  if (!keys.length) return parseFloat(root().dataset.start || '900');
  if (y <= keys[0].y) return keys[0].t;
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i], b = keys[i + 1];
    if (y < b.y) return a.t + (b.t - a.t) * ((y - a.y) / Math.max(1, b.y - a.y));
  }
  return keys[keys.length - 1].t;
}

// Révision 1 (FPS) : les variables de couleur sur <html> invalident le style de tout le document ; elles ne sont
// réécrites que si la température a bougé d'au moins 0,5 °C. La respiration du halo et le pointeur ne touchent que
// le style de #halo (une couche fixe composée), jamais <html>. Nœuds du thermomètre mis en cache par page.
let applied = NaN;
let valNodes: HTMLElement[] = [];
let chapNodes: HTMLElement[] = [];
let haloEl: HTMLElement | null = null;
function cacheNodes() {
  valNodes = [...document.querySelectorAll<HTMLElement>('[data-thermo-val]')];
  chapNodes = [...document.querySelectorAll<HTMLElement>('[data-thermo-chap]')];
  haloEl = document.getElementById('halo');
  applied = NaN;
}
function apply(t: number, drift = 0) {
  if (haloEl) haloEl.style.transform = `scale(${(1 + drift).toFixed(4)})`;
  if (Math.abs(t - applied) < 0.5) return;
  applied = t;
  const s = stateAt(t);
  const r = root().style;
  r.setProperty('--c-bg', s.bg); r.setProperty('--c-fg', s.fg); r.setProperty('--c-muted', s.muted); r.setProperty('--c-line', s.line); r.setProperty('--c-accent', s.accent); r.setProperty('--c-on-accent', s.on);
  r.setProperty('--halo', String(s.halo.toFixed(3))); r.setProperty('--grain', String(s.grain.toFixed(3))); r.setProperty('--voile', String(s.voile.toFixed(3)));
  r.setProperty('--thermo', String(((t - 20) / 880).toFixed(4)));
  const v = String(Math.round(t));
  valNodes.forEach((el) => { if (el.textContent !== v) el.textContent = v; });
  const c = chapitre(t);
  chapNodes.forEach((el) => { if (el.textContent !== c) el.textContent = c; });
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta && meta.content !== s.bg) meta.content = s.bg;
}
function applyPointer() {
  if (!haloEl) return;
  haloEl.style.setProperty('--halo-x', `${(pointer.x * 100).toFixed(1)}%`);
  haloEl.style.setProperty('--halo-y', `${(pointer.y * 100).toFixed(1)}%`);
}

/** À enregistrer une fois dans setupMotion(). */
export function initBraise() {
  const reduced = prefersReducedMotion();
  if (!reduced && !isTouch()) {
    addEventListener('pointermove', (e) => { pointer = { x: 0.6 + (e.clientX / innerWidth - 0.5) * 0.12, y: 0.4 + (e.clientY / innerHeight - 0.5) * 0.12 }; applyPointer(); }, { passive: true });
  }
  onScroll((s) => { target = tempAt(s.y); if (reduced) { shown = target; apply(shown); } });
  if (!reduced) {
    let visible = true;
    document.addEventListener('visibilitychange', () => { visible = !document.hidden; });
    gsap.ticker.add((time, dt) => {
      if (!visible) return;
      taches.forEach((f) => f(time, dt));
      shown += (target - shown) * 0.08;
      if (Math.abs(target - shown) < 0.05) shown = target;
      apply(shown, Math.sin(time * (Math.PI * 2) / 6) * 0.04); // le halo respire ±4 % sur 6 s
    });
  }
  addEventListener('resize', () => { buildKeys(); target = tempAt(scrollState().y); });

  // Chaque page : clés, état initial, en-tête, modules.
  onPage(() => {
    cacheNodes();
    buildKeys();
    const start = parseFloat(root().dataset.start || '900');
    shown = target = reduced ? tempAt(scrollY) : start;
    if (!reduced) target = tempAt(scrollState().y);
    apply(shown);
    requestAnimationFrame(() => { buildKeys(); target = tempAt(reduced ? scrollY : scrollState().y); });
    const offs = [initHeader(), initPastille(), initCuisson(reduced), initManifeste(reduced), initCarte(), initMarquee(reduced), initThermoAnchors(), initButtons()];
    return () => offs.forEach((o) => o && o());
  });
}

function initHeader() {
  const h = document.querySelector<HTMLElement>('.header');
  if (!h) return;
  const thermo = document.querySelector<HTMLElement>('.thermo');
  const footer = document.querySelector<HTMLElement>('.footer');
  const kyw = document.querySelector<HTMLElement>('.kyw-footer');
  const barre = document.querySelector<HTMLElement>('.barre');
  const hero = document.querySelector<HTMLElement>('.hero');
  let last = 0;
  const barreOn = (y: number) => barre?.classList.toggle('is-on', !hero || y > hero.offsetHeight * 0.6);
  barreOn(scrollY);
  return onScroll((s) => {
    if (thermo && footer) thermo.classList.toggle('is-footer', footer.getBoundingClientRect().top < innerHeight - 40);
    if (thermo && kyw) thermo.classList.toggle('is-out', kyw.getBoundingClientRect().top < innerHeight);
    barreOn(s.y);
    const down = s.y > last + 2 && s.y > 120;
    const up = s.y < last - 2;
    if (down) h.classList.add('is-hidden'); else if (up) h.classList.remove('is-hidden');
    last = s.y;
  });
}

/** Pastille ouvert / fermé depuis les horaires (data-horaires = JSON [{jour, creneaux}]). */
function initPastille() {
  const el = document.querySelector<HTMLElement>('[data-pastille]');
  if (!el) return;
  try {
    const horaires = JSON.parse(el.dataset.horaires || '[]') as { jour: string; creneaux: { ouverture: string; fermeture: string }[] }[];
    const jours = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const now = new Date();
    const h = horaires.find((x) => x.jour === jours[now.getDay()]);
    const mins = now.getHours() * 60 + now.getMinutes();
    const toMin = (s: string) => parseInt(s.slice(0, 2)) * 60 + parseInt(s.slice(3, 5));
    const open = !!h && h.creneaux.some((c) => mins >= toMin(c.ouverture) - 30 && mins <= toMin(c.fermeture) + 90);
    const next = h && h.creneaux.find((c) => mins < toMin(c.ouverture) - 30);
    el.classList.toggle('is-open', open);
    el.textContent = open ? 'Service en cours' : next ? `Ouvert ce soir dès ${next.ouverture.replace(':', ' h ')}` : h && h.creneaux.length ? 'Fermé pour aujourd’hui' : 'Fermé aujourd’hui';
  } catch { /* on garde le texte rendu côté serveur */ }
}

/** Scène de couches : sticky stage, timeline scrub ; sauce qui frémit ; liste 01-04 cliquable. */
function initCuisson(reduced: boolean) {
  const sec = document.querySelector<HTMLElement>('.cuisson');
  if (!sec) return;
  const couches = [...sec.querySelectorAll<HTMLElement>('.couche:not(.couche--fond)')];
  const items = [...sec.querySelectorAll<HTMLElement>('.cuisson__item')];
  const bar = sec.querySelector<HTMLElement>('.cuisson__bar i');
  const fond = sec.querySelector<HTMLElement>('.couche--fond');
  const buttons = [...sec.querySelectorAll<HTMLButtonElement>('.cuisson__item button')];
  const n = couches.length + 1;
  if (reduced) {
    items.forEach((i) => i.classList.add('is-lit'));
    buttons.forEach((b, i) => b.addEventListener('click', () => sec.scrollIntoView()));
    return;
  }
  const tl = gsap.timeline({
    defaults: { ease: ease.spring },
    scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom bottom', scrub: 1, invalidateOnRefresh: true,
      onUpdate: (st) => {
        if (bar) bar.style.transform = `scaleX(${st.progress})`;
        items.forEach((it, i) => it.classList.toggle('is-lit', st.progress >= i / n + 0.02));
      } },
  });
  tl.fromTo(fond, { scale: 0.92, autoAlpha: 0.6 }, { scale: 1, autoAlpha: 1, duration: 1, ease: ease.out }, 0);
  couches.forEach((c, i) => {
    tl.fromTo(c, { yPercent: -28, autoAlpha: 0, clipPath: 'inset(0% 0% 100% 0%)' }, { yPercent: 0, autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, i + 1);
  });
  tl.to({}, { duration: 0.4 }); // respiration en fin de course
  const sauce = sec.querySelector<HTMLElement>('.couche--sauce');
  let fremit: gsap.core.Tween | undefined;
  if (sauce) {
    fremit = gsap.to(sauce, { y: 2, duration: 0.9, yoyo: true, repeat: -1, ease: 'sine.inOut', paused: true });
    ScrollTrigger.create({ trigger: sec, start: 'top bottom', end: 'bottom top', onToggle: (st) => (st.isActive ? fremit!.play() : fremit!.pause()) });
  }
  buttons.forEach((b, i) => b.addEventListener('click', () => {
    const top = sec.getBoundingClientRect().top + scrollY;
    scrollToTarget(top + ((i + 1) / n + 0.02) * (sec.offsetHeight - innerHeight));
  }));
  return () => { fremit?.kill(); };
}

/** Manifeste : les mots passent de cendre à ivoire au scrub. */
function initManifeste(reduced: boolean) {
  const el = document.querySelector<HTMLElement>('.manifeste__txt');
  if (!el || reduced) return;
  const split = SplitText.create(el, { type: 'words', wordsClass: 'w', autoSplit: true,
    onSplit: (self) => gsap.to(self.words, { color: 'var(--c-fg)', stagger: 0.08, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true } }) });
  return () => split.revert();
}

/** Carte : filtre midi / soir, vignette qui suit le pointeur. */
function initCarte() {
  const filtres = document.querySelector<HTMLElement>('.carte__filtres');
  const offs: (() => void)[] = [];
  if (filtres) {
    const cats = [...document.querySelectorAll<HTMLElement>('.carte__cat[data-service]')];
    const btns = [...filtres.querySelectorAll<HTMLButtonElement>('button')];
    const set = (f: string) => {
      btns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filtre === f)));
      cats.forEach((c) => { c.hidden = f !== 'tout' && c.dataset.service !== f && c.dataset.service !== 'desserts'; });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    btns.forEach((b) => b.addEventListener('click', () => set(b.dataset.filtre || 'tout')));
  }
  const vignette = document.getElementById('vignette');
  const img = vignette?.querySelector('img');
  const plats = [...document.querySelectorAll<HTMLElement>('.plat[data-photo]')];
  if (vignette && img && plats.length && !isTouch() && !prefersReducedMotion()) {
    const x = gsap.quickTo(vignette, 'x', { duration: 0.5, ease: 'power3.out' });
    const y = gsap.quickTo(vignette, 'y', { duration: 0.5, ease: 'power3.out' });
    const move = (e: PointerEvent) => { x(e.clientX + 120); y(e.clientY); };
    addEventListener('pointermove', move, { passive: true });
    plats.forEach((p) => {
      p.addEventListener('pointerenter', () => { img.src = p.dataset.photo!; img.alt = ''; vignette.classList.add('is-on'); });
      p.addEventListener('pointerleave', () => vignette.classList.remove('is-on'));
    });
    offs.push(() => { removeEventListener('pointermove', move); vignette.classList.remove('is-on'); });
  }
  return () => offs.forEach((o) => o());
}

/** Avis : marquee lent dont la vitesse suit le défilement. */
function initMarquee(reduced: boolean) {
  const m = document.querySelector<HTMLElement>('.marquee');
  if (!m || reduced) return;
  const w = () => m.scrollWidth / 2;
  let x = 0;
  const tick = (_t: number, dt: number) => {
    const v = Math.min(Math.abs(scrollState().velocity), 40);
    x -= (0.04 + v * 0.01) * dt;
    const half = w();
    if (half > 0 && -x >= half) x += half;
    m.style.transform = `translate3d(${x}px,0,0)`;
  };
  taches.add(tick);
  return () => { taches.delete(tick); };
}

/** Repères du thermomètre : ancres vers les chapitres (défilement doux). */
function initThermoAnchors() {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('.thermo__reperes a, a[data-ancre]')];
  const fns = links.map((a) => {
    const fn = (e: Event) => {
      const id = a.getAttribute('href')?.split('#')[1];
      const t = id && document.getElementById(id);
      if (!t) return;
      e.preventDefault();
      scrollToTarget(t);
    };
    a.addEventListener('click', fn);
    return () => a.removeEventListener('click', fn);
  });
  return () => fns.forEach((f) => f());
}

/** Boutons : le remplissage part du point d'entrée du pointeur. */
function initButtons() {
  const btns = [...document.querySelectorAll<HTMLElement>('.btn')];
  const fn = (e: PointerEvent) => {
    const b = e.currentTarget as HTMLElement;
    const r = b.getBoundingClientRect();
    b.style.setProperty('--bx', `${((e.clientX - r.left) / r.width * 100).toFixed(1)}%`);
    b.style.setProperty('--by', `${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`);
  };
  btns.forEach((b) => b.addEventListener('pointerenter', fn));
  return () => btns.forEach((b) => b.removeEventListener('pointerenter', fn));
}
