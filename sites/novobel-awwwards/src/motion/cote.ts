// Module pilote « La cote » : une seule variable, la mesure, distribuée à tout ce qui porte le concept.
// - chaque ligne de cote (.cote) se trace depuis ses deux repères vers la valeur (variable --trace, 0 à 1) ;
// - chaque chiffre de projet (.mesure__val, .fiche__val) compte jusqu'à sa valeur réelle ;
// - le mètre ruban du hero (.metre) défile lentement au repos ; le pointeur (ou la vitesse de défilement au toucher)
//   l'infléchit, comme un ruban qu'on tire. Tout passe par gsap.ticker ; rien ne bouge en mouvement réduit.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll, prefersReducedMotion, isTouch, ease } from '../engine';

gsap.registerPlugin(ScrollTrigger);

/** Entrée de repos : t en secondes, x et y entre -0,5 et 0,5, retardés. Reste à zéro en mouvement réduit. */
export const idle = { t: 0, x: 0, y: 0 };
let idleStarted = false;

export function startIdle() {
  if (idleStarted || prefersReducedMotion()) return;
  idleStarted = true;
  const touch = isTouch();
  const aim = { x: 0, y: 0 };
  if (touch) onScroll(({ velocity }) => { aim.x = gsap.utils.clamp(-0.5, 0.5, velocity / 40); });
  else addEventListener('pointermove', (e) => { aim.x = e.clientX / innerWidth - 0.5; aim.y = e.clientY / innerHeight - 0.5; }, { passive: true });
  gsap.ticker.add((t) => {
    const r = gsap.ticker.deltaRatio();
    if (touch) aim.x *= Math.pow(0.9, r);
    const k = 1 - Math.pow(0.95, r);
    idle.t = t; idle.x += (aim.x - idle.x) * k; idle.y += (aim.y - idle.y) * k;
  });
}

const PAS = 100;        // période des graduations du ruban, en px (un décimètre dessiné)
const VITESSE = 14;     // px par seconde au repos : un ruban qu'on déroule
const TIRAGE = 90;      // px d'inflexion maximale donnée par le pointeur

export function startCote() {
  onPage(({ intro }) => {
    if (prefersReducedMotion()) return; // tout reste tracé, compté et immobile (repli CSS)
    const kills: (() => void)[] = [];

    // 1. Lignes de cote : celles du premier écran se tracent avec l'intro, les autres à l'entrée dans la vue.
    document.querySelectorAll<HTMLElement>('.cote').forEach((el) => {
      const val = el.querySelector('.cote__val');
      const tl = gsap.timeline({ paused: true })
        .fromTo(el, { '--trace': 0 }, { '--trace': 1, duration: 0.8, ease: ease.out }, 0)
        .fromTo(val, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: ease.out }, 0.35);
      if (el.closest('.hero, .entete, .perdu')) intro.add(() => tl.play(), 0.15);
      else {
        const st = ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => tl.play() });
        kills.push(() => st.kill());
      }
      kills.push(() => tl.kill());
    });

    // 2. Chiffres des projets : ils comptent jusqu'à leur valeur réelle (le texte final est déjà dans le HTML).
    document.querySelectorAll<HTMLElement>('.mesure__val, .fiche__val').forEach((el, i) => {
      const fin = parseInt(el.textContent || '0', 10);
      if (!fin) return;
      const n = { v: 0 };
      el.textContent = '0';
      const tw = gsap.to(n, {
        v: fin, duration: 1.1 + fin * 0.02, ease: ease.out, paused: true, delay: (i % 4) * 0.06,
        onUpdate: () => { el.textContent = String(Math.round(n.v)); },
      });
      const st = ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => tw.play() });
      kills.push(() => { st.kill(); tw.kill(); el.textContent = String(fin); });
    });

    // 3. Mètre ruban du hero : état de repos, piloté par le ticker, en pause hors écran.
    const ruban = document.querySelector<HTMLElement>('.metre__ruban');
    if (ruban) {
      const wrap = gsap.utils.wrap(-PAS, 0);
      const setX = gsap.quickSetter(ruban, 'x', 'px');
      const lecture = document.querySelector<HTMLElement>('.metre__lecture');
      const setL = lecture ? gsap.quickSetter(lecture, 'x', 'px') : null;
      const tick = () => {
        setX(wrap(-(idle.t * VITESSE) - idle.x * TIRAGE));
        setL?.(idle.x * TIRAGE * 0.5);
      };
      const st = ScrollTrigger.create({
        trigger: ruban.parentElement!, start: 'top bottom', end: 'bottom top',
        onToggle: (s) => (s.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
      });
      if (st.isActive) gsap.ticker.add(tick);
      kills.push(() => { gsap.ticker.remove(tick); st.kill(); });
    }

    return () => kills.forEach((k) => k());
  });
}
