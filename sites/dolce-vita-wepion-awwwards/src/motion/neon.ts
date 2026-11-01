// Module pilote « Il neon » (patterns.md § 1). Une variable : le courant de chaque tube, `--lum` (0 éteint, 1 allumé),
// écrite lettre par lettre sur les segments `.neon__l` visibles. Elle est distribuée à tout ce qui porte le concept :
//  - l'allumage (intro du hero et des têtes de page, pied au défilement) : 3 à 4 paliers irréguliers par segment,
//    60 à 90 ms par palier, timeline GSAP en positions absolues ;
//  - le bourdonnement de repos (startIdle) : respiration lente entre 0,9 et 1, et de temps en temps un segment
//    qui hoquette ; sur la 404, les tubes grillés tentent de repartir et retombent ;
//  - le pointeur : le tube se renforce quand le pointeur s'en approche (au toucher : une baisse de tension quand on
//    défile vite) ;
//  - le menu du téléphone : ses lignes s'allument l'une après l'autre (allumer(), exporté).
// Une seule horloge : gsap.ticker. En pause hors écran (IntersectionObserver). Mouvement réduit : rien ne tourne,
// `--lum` reste à 1 (CSS). Code DOM uniquement dans onPage().
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll, prefersReducedMotion, isTouch } from '../engine';

gsap.registerPlugin(ScrollTrigger);

/** Entrée de repos : t en secondes, x et y du pointeur en px (amortis), tension 0 à 1 (vitesse de défilement). */
export const idle = { t: 0, x: -1e4, y: -1e4, tension: 0 };
let idleDemarre = false;

export function startIdle() {
  if (idleDemarre || prefersReducedMotion()) return; // en mouvement réduit, l'entrée reste à zéro
  idleDemarre = true;
  const vise = { x: -1e4, y: -1e4, tension: 0 };
  if (isTouch()) onScroll(({ velocity }) => { vise.tension = Math.min(1, Math.abs(velocity) / 60); });
  else addEventListener('pointermove', (e) => { vise.x = e.clientX; vise.y = e.clientY; }, { passive: true });
  gsap.ticker.add((t) => {
    const r = gsap.ticker.deltaRatio();
    const k = 1 - Math.pow(0.88, r);
    vise.tension *= Math.pow(0.9, r);
    idle.t = t;
    idle.x = idle.x < -9e3 ? vise.x : idle.x + (vise.x - idle.x) * k;
    idle.y = idle.y < -9e3 ? vise.y : idle.y + (vise.y - idle.y) * k;
    idle.tension += (vise.tension - idle.tension) * k;
  });
}

type Seg = { el: HTMLElement; v: number; tic: number; grille: boolean; ecrit: number };
type Tube = { root: HTMLElement; segs: Seg[]; visible: boolean; phase: number; prochainTic: number };

/** Paliers d'un segment qui s'allume : [délai relatif en s, valeur]. Irréguliers, jamais deux fois le même. */
function paliers(): [number, number][] {
  const r = gsap.utils.random;
  const p = r(0.06, 0.09);
  return r(0, 1) > 0.5
    ? [[0, r(0.45, 0.7)], [p, r(0.05, 0.2)], [p * 2.1, r(0.75, 0.9)], [p * 3.2, 1]]
    : [[0, r(0.3, 0.55)], [p, 0.08], [p * 2.3, 1]];
}

/** Allume une liste de cibles (objets { v }) : timeline en positions absolues, stagger 40 à 80 ms, ≤ 1,2 s. */
export function allumerSegs(segs: { v: number; grille?: boolean }[], debut = 0) {
  const tl = gsap.timeline();
  const ordre = gsap.utils.shuffle(segs.map((_, i) => i)); // un vrai néon ne s'allume pas de gauche à droite
  const pas = Math.min(0.08, 0.7 / Math.max(1, segs.length));
  ordre.forEach((i, rang) => {
    const s = segs[i];
    if (s.grille) { tl.set(s, { v: 0.35 }, debut + rang * pas).set(s, { v: 0 }, debut + rang * pas + 0.07); return; }
    paliers().forEach(([d, v]) => tl.set(s, { v }, debut + rang * pas + d));
  });
  return tl;
}

/** Variante DOM pour le menu et les hovers scriptés : écrit `--lum` sur chaque élément. */
export function allumer(els: HTMLElement[], debut = 0) {
  const segs = els.map((el) => ({ el, v: 0 }));
  segs.forEach((s) => s.el.style.setProperty('--lum', '0'));
  const tl = allumerSegs(segs, debut);
  tl.eventCallback('onUpdate', () => segs.forEach((s) => s.el.style.setProperty('--lum', String(s.v))));
  tl.eventCallback('onComplete', () => segs.forEach((s) => s.el.style.removeProperty('--lum')));
  return tl;
}

export function startNeon() {
  onPage(({ intro }) => {
    if (prefersReducedMotion()) return;
    const tubes: Tube[] = [...document.querySelectorAll<HTMLElement>('[data-neon]')].map((root) => ({
      root,
      visible: false,
      phase: Math.random() * 10,
      prochainTic: -1,
      segs: [...root.querySelectorAll<HTMLElement>('.neon__l')].map((el) => ({
        el, v: 0, tic: 1, grille: el.classList.contains('is-grille'), ecrit: -1,
      })),
    }));
    if (!tubes.length) return;

    // Allumage : le premier tube de la page (hero, tête de page) avec l'intro, les autres à l'entrée dans l'écran.
    const premier = tubes[0];
    const dansIntro = premier.root.getBoundingClientRect().top < innerHeight;
    tubes.forEach((tube, n) => {
      const tl = allumerSegs(tube.segs).pause();
      if (n === 0 && dansIntro) intro.add(() => { tl.play(); }, 0.1);
      else ScrollTrigger.create({ trigger: tube.root, start: 'top 85%', once: true, onEnter: () => { tl.play(); } });
    });

    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      const t = tubes.find((x) => x.root === e.target);
      if (t) t.visible = e.isIntersecting;
    }));
    tubes.forEach((t) => io.observe(t.root));

    const tick = (time: number) => {
      for (const tube of tubes) {
        if (!tube.visible) continue;
        // Respiration lente et irrégulière (somme de deux sinus), 0,9 à 1.
        const souffle = 0.95 + 0.025 * Math.sin(time * 1.7 + tube.phase) + 0.025 * Math.sin(time * 0.63 + tube.phase * 2);
        // Pointeur : le tube se renforce à l'approche (jusqu'à 1,15) ; au toucher, la vitesse fait baisser la tension.
        const r = tube.root.getBoundingClientRect();
        const dx = Math.max(r.left - idle.x, 0, idle.x - r.right);
        const dy = Math.max(r.top - idle.y, 0, idle.y - r.bottom);
        const proche = 1 - Math.min(1, Math.hypot(dx, dy) / 260);
        const tension = 1 + 0.15 * proche - 0.35 * idle.tension;
        // Hoquet : de temps en temps un segment (ou un tube grillé) tente sa chance.
        if (tube.prochainTic < 0) tube.prochainTic = time + 3 + Math.random() * 4;
        if (time > tube.prochainTic) {
          tube.prochainTic = time + 4 + Math.random() * 5;
          const grilles = tube.segs.filter((s) => s.grille);
          const s = grilles.length && Math.random() < 0.7 ? gsap.utils.random(grilles) : gsap.utils.random(tube.segs.filter((x) => x.el.textContent?.trim()));
          if (s) {
            const tl = gsap.timeline();
            if (s.grille) tl.set(s, { v: 0.5 }, 0).set(s, { v: 0 }, 0.06).set(s, { v: 0.3 }, 0.18).set(s, { v: 0 }, 0.24);
            else tl.set(s, { tic: 0.35 }, 0).set(s, { tic: 1 }, 0.07).set(s, { tic: 0.6 }, 0.19).set(s, { tic: 1 }, 0.27);
          }
        }
        for (const s of tube.segs) {
          const lum = Math.round(s.v * (s.grille ? 1 : s.tic * souffle * tension) * 100) / 100;
          if (lum !== s.ecrit) { s.ecrit = lum; s.el.style.setProperty('--lum', String(lum)); }
        }
      }
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      io.disconnect();
    };
  });
}

/** Hauteurs réelles de l'en-tête et du sommaire de la carte, pour les éléments collants (pas par frame). */
export function startMesures() {
  onPage(() => {
    const tete = document.querySelector<HTMLElement>('.tete');
    const sommaire = document.querySelector<HTMLElement>('.sommaire');
    if (!tete) return;
    const poser = () => {
      const h = document.documentElement.style;
      h.setProperty('--tete-h', `${tete.offsetHeight}px`);
      h.setProperty('--sommaire-h', `${sommaire?.offsetHeight ?? 0}px`);
    };
    const ro = new ResizeObserver(poser);
    ro.observe(tete);
    if (sommaire) ro.observe(sommaire);
    return () => ro.disconnect();
  });
}
