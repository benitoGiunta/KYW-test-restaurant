// Pilote du concept « Le filon ». Une variable, la profondeur (progression du défilement, 0 à 1), est
// distribuée à tout ce qui porte le fil de cuivre :
//   - la lueur qui court sur le fil du hero (sa vitesse suit la vitesse du défilement),
//   - le fil du tableau de la semaine, qui se trace au scroll, et ses pépites qui affleurent à son passage,
//   - la dernière pépite du pied, qui s'allume à mesure qu'on creuse (--profondeur sur <html>).
// Influence du pointeur : la lueur s'avive quand le pointeur s'approche du fil (--proche).
// Repos : startIdle() fait courir la lueur sur le fil et vaciller la dernière pépite comme une bougie ;
// une seule horloge (gsap.ticker), en pause hors écran, absente en mouvement réduit.
import { gsap } from 'gsap';
import { onPage, scrollState, prefersReducedMotion, isTouch, ease } from '../engine';

type Fil = { el: HTMLElement; lueur: HTMLElement | null; visible: boolean };
let fils: Fil[] = [];
let pied: { el: HTMLElement; visible: boolean } | null = null;
let pos = 0; // position de la lueur sur le fil, 0 à 1 (revient par le haut)
let proche = 0; // pointeur près du fil, lissé
let cible = 0;
let profondeur = -1;
let idle = false;

function versLeFil(e: PointerEvent) {
  let d = Infinity;
  for (const f of fils) {
    if (!f.visible) continue;
    const r = f.el.getBoundingClientRect();
    d = Math.min(d, Math.abs(e.clientX - (r.left + r.width / 2)));
  }
  cible = d === Infinity ? 0 : gsap.utils.clamp(0, 1, 1 - d / 420);
}

function tick(_t: number, dt: number) {
  const s = scrollState();
  const h = document.documentElement;
  const p = Math.round(s.progress * 200) / 200;
  if (p !== profondeur) { profondeur = p; h.style.setProperty('--profondeur', String(p)); }
  proche += (cible - proche) * 0.08;
  const vite = 0.11 + Math.min(Math.abs(s.velocity) * 0.02, 0.5); // cycles par seconde
  pos = gsap.utils.wrap(0, 1, pos + (dt / 1000) * vite);
  for (const f of fils) {
    if (!f.visible || !f.lueur) continue;
    gsap.set(f.lueur, { yPercent: -100 + pos * (100 + f.el.offsetHeight / Math.max(f.lueur.offsetHeight, 1) * 100) });
    f.el.style.setProperty('--proche', proche.toFixed(3));
  }
  if (pied?.visible) {
    const t = performance.now() / 1000; // vacillement de bougie : deux sinus incommensurables
    pied.el.style.setProperty('--vacille', (0.8 + 0.12 * Math.sin(t * 7.3) + 0.08 * Math.sin(t * 13.1 + 1.7)).toFixed(3));
  }
}

/** Entrée de repos : la lueur court sur le fil, la dernière pépite vacille. Une fois, depuis setup. */
export function startIdle() {
  if (idle || prefersReducedMotion()) return;
  idle = true;
  gsap.ticker.add(tick);
  if (!isTouch()) addEventListener('pointermove', versLeFil, { passive: true });
}

/** Le fil du tableau se trace au scroll ; chaque pépite affleure quand la pointe du fil l'atteint. */
function traceFil() {
  document.querySelectorAll<HTMLElement>('.etapes').forEach((liste) => {
    const fil = liste.querySelector<HTMLElement>('.etapes__fil');
    if (fil) {
      gsap.fromTo(fil, { scaleY: 0 }, {
        scaleY: 1, ease: 'none', transformOrigin: '50% 0%',
        scrollTrigger: { trigger: liste, start: 'top 75%', end: 'bottom 55%', scrub: 0.6, invalidateOnRefresh: true },
      });
    }
    liste.querySelectorAll<HTMLElement>('.etape').forEach((etape) => {
      const pepite = etape.querySelector('.etape__pepite');
      const textes = etape.querySelectorAll('.etape__nom, .etape__desc');
      gsap.timeline({ scrollTrigger: { trigger: etape, start: 'top 66%', once: true } })
        .fromTo(pepite, { scale: 0 }, { scale: 1, duration: 0.6, ease: ease.out })
        .fromTo(textes, { y: '0.5em', clipPath: 'inset(100% 0% 0% 0%)' }, { y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: ease.out, stagger: 0.08 }, 0.1);
    });
  });
}

function initPage({ intro }: { intro: gsap.core.Timeline }) {
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    const f = fils.find((x) => x.el === e.target);
    if (f) f.visible = e.isIntersecting;
    if (pied && pied.el === e.target) pied.visible = e.isIntersecting;
  }));
  fils = [...document.querySelectorAll<HTMLElement>('[data-fil]')].map((el) => ({ el, lueur: el.querySelector<HTMLElement>('.fil__lueur'), visible: false }));
  const p = document.querySelector<HTMLElement>('.pied__pepite');
  pied = p ? { el: p, visible: false } : null;
  fils.forEach((f) => io.observe(f.el));
  if (p) io.observe(p);
  if (!prefersReducedMotion()) {
    traceFil();
    // Intro : le fil du hero descend du haut de la page, puis sa pépite affleure.
    fils.forEach((f) => {
      intro.fromTo(f.el.querySelector('.fil__trait'), { scaleY: 0 }, { scaleY: 1, transformOrigin: '50% 0%', duration: 1.3, ease: ease.out }, 0.15);
      intro.fromTo(f.el.querySelector('.fil__pepite'), { scale: 0 }, { scale: 1, duration: 0.6, ease: ease.out }, 1.0);
    });
  }
  return () => { io.disconnect(); fils = []; pied = null; cible = 0; };
}

export function setupFilon() {
  startIdle();
  onPage(initPage);
}
