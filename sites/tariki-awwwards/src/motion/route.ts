// Pilote du concept « la route » (patterns.md § 1). Une variable : la progression dans la page (0 = départ,
// Syrie ; 1 = arrivée, votre table). Elle place le voyageur sur chaque route visible, allume les étapes
// franchies, remplit le fil de l'en-tête (--route-p sur <html>) et le fil vertical de la carte.
// Pointeur : le voyageur se penche vers lui (±1,5 % de la route). Repos : la route pointillée coule sous
// le voyageur à vitesse constante et son halo s'élargit en boucle (gsap.ticker, en pause hors écran).
// Mouvement réduit : aucune animation, chaque route montre sa position statique `data-p`, fil complet.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll, ease, prefersReducedMotion } from '../engine';
import { idle, startIdle } from './idle';

type Route = { el: HTMLElement; ombre: SVGPathElement | null; voy: HTMLElement; etapes: HTMLElement[]; w: number; p: number; epingle: boolean; visible: boolean; pret: boolean };
let routes: Route[] = [];
let current = 0;
let reduit = false;

// Le fil : quatre arcs quadratiques de 250 unités, x linéaire en t ; sommets alternés à 19 et 41.
const yAt = (u: number) => {
  const x = gsap.utils.clamp(0, 1000, u * 1000);
  const k = Math.min(3, Math.floor(x / 250));
  const t = (x - k * 250) / 250;
  return 30 + 2 * t * (1 - t) * (k % 2 === 0 ? -22 : 22);
};

function place(r: Route, q: number, drift: number) {
  const u = gsap.utils.clamp(0, 1, q + drift);
  r.voy.style.translate = `${(7 + u * (r.w - 14)).toFixed(1)}px ${yAt(u).toFixed(1)}px`;
  r.etapes.forEach((li, i) => li.classList.toggle('is-passe', q >= i / 4 - 0.002));
}

function apply(p: number, drift = 0) {
  if (!reduit) document.documentElement.style.setProperty('--route-p', p.toFixed(4));
  for (const r of routes) if (r.pret) place(r, r.epingle || reduit ? r.p : p, reduit ? 0 : drift);
}

function tick() {
  const t = idle.t;
  for (const r of routes) {
    if (!r.visible || !r.pret) continue;
    if (r.ombre) r.ombre.style.strokeDashoffset = (-(t * 18) % 1100).toFixed(2);
    r.voy.style.setProperty('--h', ((t * 0.55) % 1).toFixed(3));
    place(r, r.epingle ? r.p : current, idle.x * 0.03);
  }
}

// Le tracé : le calque doré se découvre de gauche à droite, les étapes s'allument quand le fil les atteint.
function trace(r: Route, duree: number) {
  const fil = r.el.querySelector<SVGElement>('[data-route-fil]')!;
  const fin = r.el.classList.contains('route--cassee') ? 40 : 0;
  const o = { v: 0 };
  return gsap.timeline({ onComplete: () => { r.pret = true; r.el.classList.add('is-pret'); apply(current); } })
    .fromTo(fil, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: `inset(0% ${fin}% 0% 0%)`, duration: duree, ease: ease.inOut }, 0)
    .to(o, {
      v: 1 - fin / 100, duration: duree, ease: ease.inOut,
      onUpdate: () => r.etapes.forEach((li, i) => li.classList.toggle('is-atteint', o.v >= i / 4 - 0.02)),
    }, 0);
}

export function startRoute() {
  reduit = prefersReducedMotion();
  if (!reduit) {
    startIdle();
    onScroll(({ progress }) => { current = progress; apply(current); });
  }
  onPage(({ intro }) => {
    current = 0;
    routes = [...document.querySelectorAll<HTMLElement>('[data-route]')].map((el) => ({
      el,
      ombre: el.querySelector<SVGPathElement>('[data-route-ombre]'),
      voy: el.querySelector<HTMLElement>('[data-route-voyageur]')!,
      etapes: [...el.querySelectorAll<HTMLElement>('li')],
      w: el.clientWidth,
      p: parseFloat(el.dataset.p || '0'),
      epingle: el.hasAttribute('data-epingle'),
      visible: false,
      pret: reduit,
    }));
    const mesure = () => routes.forEach((r) => { r.w = r.el.clientWidth; });
    addEventListener('resize', mesure);
    if (reduit) {
      routes.forEach((r) => { r.el.classList.add('is-pret'); r.etapes.forEach((li) => li.classList.add('is-atteint')); });
      apply(0);
      return () => { removeEventListener('resize', mesure); routes = []; };
    }
    for (const r of routes) {
      if (r.el.hasAttribute('data-route-intro')) intro.add(trace(r, 1.6), 0.35);
      else ScrollTrigger.create({ trigger: r.el, start: 'top 88%', once: true, onEnter: () => { trace(r, 1.3); } });
      ScrollTrigger.create({ trigger: r.el, start: 'top bottom', end: 'bottom top', onToggle: (s) => { r.visible = s.isActive; } });
    }
    gsap.ticker.add(tick);
    apply(current);
    return () => {
      gsap.ticker.remove(tick);
      removeEventListener('resize', mesure);
      document.documentElement.style.removeProperty('--route-p');
      routes = [];
    };
  });
}
