// Module pilote « La balade » (patterns.md § 1). Une variable : la progression du scroll, lue comme
// une distance de 0 à 200 m (la prairie entre la ferme et la villa Barabas). Elle est distribuée à
// tout ce qui porte le concept : la borne du sentier fixe (position, tracé parcouru, libellé),
// la balise du hero et l'état « Arrivée » en fin de page. Le pointeur penche la borne, le repos la
// fait respirer (horloge gsap.ticker). La 404 épingle son état (`data-borne="hors"` sur <body>).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll, prefersReducedMotion, ease } from '../engine';
import { idle, startIdle } from './idle';

const TOTAL = 200; // mètres, seule distance sourcée (dossier.md)
let current = 0;
let lost = false;
let labels: HTMLElement[] = [];
let trackH = 0;
let setY: ((v: number) => void) | null = null;
let setX: ((v: number) => void) | null = null;
let setFill: ((v: number) => void) | null = null;

const label = (p: number) => {
  if (lost) return 'Hors sentier';
  const m = Math.round(p * TOTAL);
  return m >= TOTAL ? `${TOTAL} m, arrivée` : `${m} m`;
};

function apply(p: number, drift = 0, lean = 0) {
  const txt = label(p); // l'état affiché vient de la vraie valeur, jamais du repos
  for (const l of labels) if (l.textContent !== txt) l.textContent = txt;
  const q = gsap.utils.clamp(0, 1, (lost ? 0.5 : p) + drift);
  setY?.(q * trackH);
  setX?.(lean);
  setFill?.(lost ? 0 : p);
  document.documentElement.classList.toggle('is-arrivee', !lost && p > 0.985);
}

function measure() {
  const trace = document.querySelector<HTMLElement>('.sentier__trace');
  trackH = trace ? trace.offsetHeight : 0;
}

const tick = () => apply(current, Math.sin(idle.t * 0.9) * 0.012 + idle.y * 0.02, idle.x * 8);

export function startBalade() {
  const sentier = document.querySelector<HTMLElement>('.sentier');
  const reduced = prefersReducedMotion();
  if (sentier && !reduced) {
    const borne = sentier.querySelector('.sentier__borne');
    const fait = sentier.querySelector('.sentier__fait');
    setY = gsap.quickSetter(borne, 'y', 'px') as (v: number) => void;
    setX = gsap.quickSetter(borne, 'x', 'px') as (v: number) => void;
    setFill = gsap.quickSetter(fait, 'scaleY') as (v: number) => void;
    ScrollTrigger.addEventListener('refresh', measure);
    startIdle();
    gsap.ticker.add(tick); // élément fixe, toujours à l'écran : le repos tourne tant que la page vit
  }
  onScroll(({ progress }) => { current = progress; if (reduced) apply(current); });
  onPage(() => {
    lost = document.body.dataset.borne === 'hors';
    labels = [...document.querySelectorAll<HTMLElement>('[data-borne-m]')];
    current = 0;
    measure();
    apply(0);
    if (!reduced) chemins();
    return () => { labels = []; };
  });
}

// Verbe « cheminer » : les haltes d'une route glissent depuis le sentier (20 à 40 px, horizontal).
function chemins() {
  document.querySelectorAll<HTMLElement>('.route, .index-plats').forEach((liste) => {
    gsap.from(liste.children, {
      x: -32, autoAlpha: 0, duration: 1.1, ease: ease.out, stagger: 0.06,
      scrollTrigger: { trigger: liste, start: 'top 85%', once: true },
    });
  });
}
