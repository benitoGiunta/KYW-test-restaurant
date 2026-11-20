// Module pilote « le jour sans pause ». Une variable : l'heure de la page (11 h en haut, 22 h au pied),
// lue sur les sections [data-hour] au défilement. Elle est distribuée à l'horloge fixe (aiguille, libellé),
// au trait des heures de chaque section (--draw) et à la couleur de thème. Le pointeur penche l'aiguille.
// Repos : quand le visiteur ne fait rien, la trotteuse de l'horloge continue de tourner (la maison ne ferme pas).
// Une seule horloge : gsap.ticker. Rien au niveau module ne touche au DOM.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ease, isTouch, onPage, onScroll, prefersReducedMotion } from '../engine';

gsap.registerPlugin(ScrollTrigger);

const s = { hour: 11, target: 11, lean: 0, sweep: 0, speed: 0, idle: false };
const GROUNDS: Record<string, string> = { midi: '#eef0e8', apres: '#dce7dd', soir: '#1e4a40', nuit: '#0f2d27' };
const IDLE_AFTER = 800; // ms sans entrée avant le repos
const SWEEP = 36; // degrés par seconde en repos (un tour en 10 s)

let clock: HTMLElement | null = null;
let setHand: ((v: number) => void) | null = null;
let setSweep: ((v: number) => void) | null = null;
let label: HTMLElement | null = null;
let shown = -1;
let lastInput = 0;
let wired = false;
let wide: MediaQueryList | null = null;

/** Entrée de repos : la trotteuse reprend sa course. */
export function startIdle() {
  if (prefersReducedMotion() || s.idle) return;
  s.idle = true;
}
function wake() {
  lastInput = performance.now();
  s.idle = false;
}

function tick(_t: number, dt: number) {
  if (!clock || !setHand || !setSweep) return;
  const reduced = prefersReducedMotion();
  s.hour = reduced ? s.target : s.hour + (s.target - s.hour) * Math.min(1, dt / 120);
  if (!reduced && !s.idle && performance.now() - lastInput > IDLE_AFTER) startIdle();
  s.speed += ((s.idle ? 1 : 0) - s.speed) * Math.min(1, dt / 400);
  s.sweep = (s.sweep + (SWEEP * s.speed * dt) / 1000) % 360;
  setHand(((s.hour % 12) / 12) * 360 + s.lean);
  setSweep(s.sweep);
  const h = Math.min(22, Math.floor(s.hour + 0.02));
  if (h !== shown && label) { shown = h; label.textContent = `${h} h`; }
}

function wireClock() {
  if (wired) return;
  clock = document.getElementById('horloge');
  if (!clock) return;
  wired = true;
  wide = matchMedia('(min-width: 761px)');
  const hand = clock.querySelector<HTMLElement>('.horloge__aiguille');
  const sweep = clock.querySelector<HTMLElement>('.horloge__trotteuse');
  label = clock.querySelector<HTMLElement>('.horloge__h');
  if (!hand || !sweep) return;
  setHand = gsap.quickSetter(hand, 'rotation', 'deg') as (v: number) => void;
  setSweep = gsap.quickSetter(sweep, 'rotation', 'deg') as (v: number) => void;
  lastInput = performance.now();
  const lean = gsap.quickTo(s, 'lean', { duration: 0.8, ease: ease.soft });
  addEventListener('pointermove', (e) => {
    wake();
    if (!isTouch() && !prefersReducedMotion()) lean((e.clientY / innerHeight - 0.5) * 14);
  }, { passive: true });
  addEventListener('keydown', wake, { passive: true });
  addEventListener('wheel', wake, { passive: true });
  addEventListener('touchstart', wake, { passive: true });
  onScroll(() => wake());
  gsap.ticker.add(tick);
}

function groundOf(el: Element) {
  const m = el.className.match(/ground-(\w+)/);
  return m ? GROUNDS[m[1]] : GROUNDS.midi;
}

export function setupJour() {
  onPage(({ intro }) => {
    wireClock();
    const reduced = prefersReducedMotion();
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const secs = [...document.querySelectorAll<HTMLElement>('[data-hour]')];
    if (!secs.length) return;
    s.target = s.hour = parseFloat(secs[0].dataset.hour || '11');
    const short = document.documentElement.scrollHeight <= innerHeight + 4;
    if (short) s.target = parseFloat(secs[secs.length - 1].dataset.hour || '22'); // page courte : état épinglé

    secs.forEach((sec, i) => {
      const h = parseFloat(sec.dataset.hour || '11');
      const next = secs[i + 1] ? parseFloat(secs[i + 1].dataset.hour || String(h)) : h + 1;
      ScrollTrigger.create({
        trigger: sec,
        start: i === 0 ? 0 : 'top 55%', // en haut de page, l'heure est celle de la première section
        end: 'bottom 55%',
        onUpdate: (self) => { if (!short) s.target = reduced ? h : h + (next - h) * self.progress; },
        onToggle: (self) => {
          if (self.isActive) meta?.setAttribute('content', groundOf(sec));
        },
      });
    });

    // Le trait des heures se prolonge au défilement (une variable par section, jamais sur <html>).
    const hours = [...document.querySelectorAll<HTMLElement>('.sec__hour')];
    if (reduced) {
      hours.forEach((el) => el.style.setProperty('--draw', '1'));
    } else {
      hours.forEach((el, i) => {
        if (i === 0) { // première heure de la page : elle se trace avec l'intro
          intro.fromTo(el, { '--draw': 0 }, { '--draw': 1, duration: 1.4, ease: ease.inOut }, 0.1);
          return;
        }
        gsap.fromTo(el, { '--draw': 0 }, {
          '--draw': 1, ease: 'none',
          scrollTrigger: { trigger: el.closest('section, footer') || el, start: 'top 85%', end: 'bottom 60%', scrub: true, invalidateOnRefresh: true },
        });
      });
    }
    // 22 h : au pied de page, l'horloge se retire (elle couvrirait l'adresse).
    const foot = document.querySelector('.foot, .kyw-footer');
    if (foot && clock) {
      const c = clock;
      ScrollTrigger.create({ trigger: foot, start: 'top 85%', onEnter: () => c.classList.add('is-away'), onLeaveBack: () => c.classList.remove('is-away') });
    }
    // Carte : la rubrique lue s'allume dans le rail.
    const rail = document.querySelector('.carte__rail');
    if (rail) {
      document.querySelectorAll<HTMLElement>('.cat[id]').forEach((cat) => {
        const link = rail.querySelector<HTMLElement>(`a[href$="#${cat.id}"]`);
        if (!link) return;
        ScrollTrigger.create({
          trigger: cat, start: 'top 40%', end: 'bottom 40%',
          onToggle: (self) => link.classList.toggle('is-on', self.isActive),
        });
      });
    }
    const done = () => { meta?.setAttribute('content', GROUNDS.midi); clock?.classList.remove('is-away'); };
    if (reduced) return done;

    // Intro du hero : la photo se pose (rien n'est caché, l'image reste peinte au premier rendu).
    const heroImg = document.querySelector<HTMLElement>('.hero__media img');
    if (heroImg) intro.fromTo(heroImg, { scale: 1.12 }, { scale: 1, duration: 1.6, ease: ease.out, clearProps: 'transform' }, 0);

    // Barres de la semaine : chaque journée se prolonge de l'ouverture à la fermeture.
    const bars = document.querySelectorAll<HTMLElement>('.week__bar');
    if (bars.length) {
      gsap.fromTo(bars, { scaleX: 0 }, {
        scaleX: 1, transformOrigin: 'left center', duration: 1.2, ease: ease.out, stagger: 0.06,
        scrollTrigger: { trigger: bars[0].closest('.week') || bars[0], start: 'top 80%', once: true },
      });
    }

    return done;
  });
}
