// Module pilote « l'horizon » (patterns.md § 1). Une variable : l'heure (progression du défilement,
// 0 = après-midi, 1 = soir ; une page peut la figer par data-heure). Elle est distribuée :
//  - au soleil posé sur chaque trait d'horizon : il descend derrière la ligne quand l'heure avance ;
//  - à la couleur du soleil et du parasol de la marque (--heure sur <html>, color-mix en CSS) ;
//  - aux sections du soir, dont le vert monte depuis la ligne au défilement.
// Entrées de repos : le soleil glisse lentement le long du trait (course à vitesse constante qui
// revient par l'autre bord) ; le pointeur le pousse (bureau), la vitesse de défilement au toucher.
// Signature d'intro : le trait se trace, les lettres du titre se posent dessus, le soleil se lève.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { onPage, onScroll, ease, prefersReducedMotion, isTouch } from '../engine';
import { idle, startIdle } from './idle';

gsap.registerPlugin(ScrollTrigger, SplitText);

const VITESSE = 22; // px par seconde : la course du soleil le long du trait
type Soleil = { piste: HTMLElement; disque: HTMLElement; x: number; w: number; dw: number; lever: { v: number }; actif: boolean };
let soleils: Soleil[] = [];
let heure = 0;
let tactile = false;

const fige = () => {
  const v = document.querySelector<HTMLElement>('[data-heure]')?.dataset.heure;
  return v ? +v : null;
};
function appliquer() {
  document.documentElement.style.setProperty('--heure', heure.toFixed(3));
}
function mesurer() {
  for (const s of soleils) { s.w = s.piste.clientWidth; s.dw = s.disque.offsetWidth; }
}
function tick(_t: number, dt: number) {
  const pas = Math.min(dt, 64) / 1000;
  for (const s of soleils) {
    if (!s.actif) continue;
    s.x = gsap.utils.wrap(-s.dw, s.w, s.x + VITESSE * pas);
    const pousse = tactile ? idle.y * 160 : idle.x * s.w * 0.12;
    const x = gsap.utils.wrap(-s.dw, s.w, s.x + pousse);
    const descente = gsap.utils.clamp(0, 1, s.lever.v + heure * 1.8);
    s.disque.style.translate = `${x.toFixed(1)}px ${(descente * 105).toFixed(1)}%`;
  }
}

// Les lettres du titre descendent et se posent sur le trait (masque de ligne, jamais de rebond).
function poser(el: HTMLElement) {
  const st = { tw: undefined as gsap.core.Tween | undefined, fait: false, demande: false };
  SplitText.create(el, {
    type: 'lines,words,chars',
    mask: 'lines',
    linesClass: 'split-line',
    autoSplit: true,
    onSplit(self) {
      gsap.set(el, { visibility: 'visible' });
      if (st.fait) return;
      st.tw = gsap.from(self.chars, {
        yPercent: -112,
        duration: 1.1,
        stagger: 0.035,
        ease: ease.out,
        paused: !st.demande,
        onComplete: () => { st.fait = true; },
      });
      return st.tw;
    },
  });
  return () => { st.demande = true; st.tw?.play(); };
}

export function startHorizon() {
  startIdle();
  onScroll(({ progress }) => { heure = fige() ?? progress; appliquer(); });
  onPage(() => { heure = fige() ?? 0; appliquer(); });
  if (prefersReducedMotion()) return; // soleil posé et immobile, titres et sections visibles (CSS)
  tactile = isTouch();
  gsap.ticker.add(tick);
  ScrollTrigger.addEventListener('refresh', mesurer);

  onPage(({ intro }) => {
    document.querySelectorAll<HTMLElement>('[data-horizon]').forEach((h) => {
      const piste = h.querySelector<HTMLElement>('.soleil-piste');
      const disque = h.querySelector<HTMLElement>('.soleil');
      intro.add(gsap.fromTo(h, { '--trace': 0 }, { '--trace': 1, duration: 1.3, ease: ease.inOut }), 0);
      if (!piste || !disque) return;
      const s: Soleil = { piste, disque, x: 0, w: piste.clientWidth, dw: disque.offsetWidth, lever: { v: 1 }, actif: true };
      s.x = s.w * parseFloat(h.dataset.horizon || '0.62');
      soleils.push(s);
      intro.add(gsap.to(s.lever, { v: 0, duration: 1.4, ease: ease.out }), 0.8);
      ScrollTrigger.create({ trigger: h, start: 'top bottom', end: 'bottom top', onToggle: (t) => { s.actif = t.isActive; } });
    });
    document.querySelectorAll<HTMLElement>('[data-pose]').forEach((el) => intro.add(poser(el), 0.2));
    // Le soir monte depuis la ligne : le vert recouvre le ciel en suivant le défilement.
    document.querySelectorAll<HTMLElement>('.soir').forEach((el) => {
      gsap.fromTo(el, { clipPath: 'inset(55% 0% 0% 0%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 40%', scrub: true, invalidateOnRefresh: true },
      });
    });
    return () => { soleils = []; };
  });
}
