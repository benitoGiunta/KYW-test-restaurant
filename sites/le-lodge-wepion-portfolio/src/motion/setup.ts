// Motion « Guinguette » : loader nappe, rideau corail depuis le bas, objets qui tombent et rebondissent puis se saisissent
// (Draggable + inertie maison par quickTo), table de tirages draggables, « Avis » qui sort du flou, marquee d'état.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { setLoaderFormat, setLoaderExit, setTransition, ease, onPage, prefersReducedMotion, isMobile } from '../engine';

gsap.registerPlugin(ScrollTrigger, Draggable);

export function setupMotion() {
  const svg = document.querySelector<HTMLElement>('#loader .loader__svg');
  setLoaderFormat((p) => {
    svg?.style.setProperty('--p', String(p / 100));
    return String(Math.round(p)).padStart(3, '0');
  });
  setLoaderExit((root) =>
    gsap.timeline()
      .to(root.querySelectorAll('[data-loader-out]'), { y: -30, autoAlpha: 0, duration: 0.25, ease: ease.inOut, stagger: 0.04 })
      .to(root, { yPercent: -110, duration: 0.5, ease: ease.inOut }, '-=0.15'),
  );
  setTransition({
    leave: (c) => gsap.timeline().set(c, { autoAlpha: 1 }).fromTo(c.querySelector('.curtain__panel'), { yPercent: 100 }, { yPercent: 0, duration: 0.7, ease: ease.inOut }),
    enter: (c) => gsap.timeline().to(c.querySelector('.curtain__panel'), { yPercent: -100, duration: 0.8, ease: ease.inOut }).set(c, { autoAlpha: 0 }),
  });

  onPage(({ intro }) => {
    const cleanups = [marquee(), heroObjets(intro), table(), avis()];
    return () => cleanups.forEach((c) => c());
  });
}

/** Bandeau d'état : texte statique (fermeture), copies jusqu'à couvrir la fenêtre, pause (bouton, survol, focus), aucun horaire. */
function marquee() {
  const root = document.querySelector<HTMLElement>('[data-marquee]');
  if (!root) return () => {};
  const groupes = [...root.querySelectorAll<HTMLElement>('.marquee__groupe')];
  const copies: HTMLElement[] = [];
  if (!prefersReducedMotion() && groupes[0]) {
    const l = groupes[0].getBoundingClientRect().width || 1;
    const n = Math.max(0, Math.ceil(window.innerWidth / l) - 1);
    groupes.forEach((g) => {
      const base = [...g.children] as HTMLElement[];
      for (let k = 0; k < n; k++) base.forEach((c) => { const x = c.cloneNode(true) as HTMLElement; x.setAttribute('aria-hidden', 'true'); g.appendChild(x); copies.push(x); });
    });
  }
  const bouton = root.querySelector<HTMLButtonElement>('[data-marquee-pause]');
  const basculer = () => bouton?.setAttribute('aria-pressed', String(root.classList.toggle('is-paused')));
  bouton?.addEventListener('click', basculer);
  return () => { bouton?.removeEventListener('click', basculer); root.classList.remove('is-paused'); copies.forEach((c) => c.remove()); };
}

/** Rend un élément saisissable : Draggable x,y borné au parent, zIndex au drag, inertie maison, flèches au clavier. */
function saisissable(el: HTMLElement, bounds: HTMLElement, opts: { exclure?: HTMLElement | null; rebond?: boolean } = {}) {
  let z = 10;
  let vx = 0, vy = 0, lastX = 0, lastY = 0, lastT = 0;
  const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
  const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
  const [drag] = Draggable.create(el, {
    type: 'x,y',
    bounds,
    zIndexBoost: false,
    onPress() { el.classList.add('is-drag'); el.classList.remove('is-flottant'); el.style.zIndex = String(++z + 20); lastX = this.x; lastY = this.y; lastT = performance.now(); vx = vy = 0; },
    onDrag() { const t = performance.now(); const dt = Math.max(1, t - lastT); vx = (this.x - lastX) / dt; vy = (this.y - lastY) / dt; lastX = this.x; lastY = this.y; lastT = t; },
    onRelease() {
      el.classList.remove('is-drag');
      const d = this as Draggable;
      const cibleX = gsap.utils.clamp(d.minX, d.maxX, d.x + vx * 140);
      const cibleY = gsap.utils.clamp(d.minY, d.maxY, d.y + vy * 140);
      if (opts.exclure && chevauche(el, opts.exclure)) {
        gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: opts.rebond ? 'bounce.out' : 'power3.out', onComplete: () => { d.update(); el.classList.add('is-flottant'); } });
        return;
      }
      xTo(cibleX); yTo(cibleY);
      gsap.delayedCall(0.6, () => { d.update(); if (opts.rebond) el.classList.add('is-flottant'); });
    },
  });
  const clavier = (e: KeyboardEvent) => {
    const pas = e.shiftKey ? 48 : 16;
    const dx = e.key === 'ArrowRight' ? pas : e.key === 'ArrowLeft' ? -pas : 0;
    const dy = e.key === 'ArrowDown' ? pas : e.key === 'ArrowUp' ? -pas : 0;
    if (!dx && !dy) return;
    e.preventDefault();
    el.style.zIndex = String(++z + 20);
    gsap.to(el, { x: `+=${dx}`, y: `+=${dy}`, duration: 0.25, ease: 'power2.out', onComplete: () => drag.applyBounds(bounds) });
  };
  el.addEventListener('keydown', clavier);
  return () => { el.removeEventListener('keydown', clavier); drag.kill(); };
}

function chevauche(a: HTMLElement, b: HTMLElement) {
  const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
  return ra.left < rb.right && ra.right > rb.left && ra.top < rb.bottom && ra.bottom > rb.top;
}

/** Hero : les objets tombent et rebondissent (bounce.out) avec l'intro, puis deviennent saisissables ; au repos ils flottent. */
function heroObjets(intro: gsap.core.Timeline) {
  const zone = document.querySelector<HTMLElement>('[data-hero-zone]');
  if (!zone) return () => {};
  const texte = document.querySelector<HTMLElement>('[data-hero-texte]');
  const objets = [...zone.querySelectorAll<HTMLElement>('[data-obj]')].filter((o) => getComputedStyle(o).display !== 'none');
  const cleanups: (() => void)[] = [];
  if (prefersReducedMotion()) {
    objets.forEach((o) => cleanups.push(saisissable(o, zone, { exclure: texte })));
  } else {
    gsap.set(objets, { y: -window.innerHeight * 0.8, autoAlpha: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(objets, { y: 0, autoAlpha: 1, duration: 1.3, ease: 'bounce.out', stagger: 0.09, onComplete: () => objets.forEach((o) => { o.classList.add('is-flottant'); cleanups.push(saisissable(o, zone, { exclure: texte, rebond: true })); }) });
    intro.add(() => tl.play(), 0.1);
    cleanups.push(() => tl.kill());
  }
  return () => cleanups.forEach((c) => c());
}

/** La table : tirages posés en stagger avec rotation, puis saisissables (desktop) ; rail en mobile. */
function table() {
  const scene = document.querySelector<HTMLElement>('[data-table-scene]');
  if (!scene || isMobile() || getComputedStyle(scene).display === 'none') return () => {};
  const items = [...scene.querySelectorAll<HTMLElement>('[data-tirage], [data-obj]')];
  const cleanups: (() => void)[] = [];
  const section = scene.closest<HTMLElement>('[data-table]');
  const ranger = document.querySelector<HTMLButtonElement>('[data-ranger]');
  const etat = document.querySelector<HTMLElement>('[data-ranger-etat]');
  let pret = false;
  const pret_ = () => { pret = true; ranger?.removeAttribute('aria-disabled'); };
  const pris = () => section?.classList.add('is-pris');
  scene.addEventListener('pointerdown', pris, { once: true });
  scene.addEventListener('keydown', pris, { once: true });
  const ranger_ = () => {
    if (!pret) return;
    const reduit = prefersReducedMotion();
    section?.classList.remove('is-pris');
    scene.addEventListener('pointerdown', pris, { once: true });
    gsap.to(items, { x: 0, y: 0, duration: reduit ? 0 : 0.9, ease: 'back.out(1.4)', stagger: reduit ? 0 : { each: 0.04, from: 'random' }, overwrite: 'auto', onComplete: () => items.forEach((el) => Draggable.get(el)?.update()) });
    if (etat) { etat.textContent = 'La table est rangée.'; window.setTimeout(() => { etat.textContent = ''; }, 2500); }
  };
  ranger?.addEventListener('click', ranger_);
  cleanups.push(() => { ranger?.removeEventListener('click', ranger_); scene.removeEventListener('pointerdown', pris); scene.removeEventListener('keydown', pris); });
  if (prefersReducedMotion()) {
    scene.querySelectorAll<HTMLElement>('[data-tirage]').forEach((t) => cleanups.push(saisissable(t, scene)));
    pret_();
    return () => cleanups.forEach((c) => c());
  }
  ranger?.setAttribute('aria-disabled', 'true');
  const tl = gsap.timeline({
    scrollTrigger: { trigger: scene, start: 'top 70%', once: true },
    onComplete: () => { items.forEach((t) => cleanups.push(saisissable(t, scene))); pret_(); },
  });
  tl.from(items, { y: 90, autoAlpha: 0, rotation: () => gsap.utils.random(-14, 14), duration: 0.9, ease: 'back.out(1.6)', stagger: { each: 0.06, from: 'random' } });
  cleanups.push(() => tl.kill());
  return () => cleanups.forEach((c) => c());
}

/** Avis : le mot géant sort du flou au scrub ; les cartes glissent par-dessus en tournant. */
function avis() {
  const root = document.querySelector<HTMLElement>('[data-avis]');
  if (!root || prefersReducedMotion()) return () => {};
  const mot = root.querySelector<HTMLElement>('[data-avis-mot]');
  const cartes = root.querySelectorAll<HTMLElement>('[data-carte-avis]');
  const vars = { flou: 14 };
  const st = gsap.to(vars, { flou: 0, ease: 'none', onUpdate: () => mot?.style.setProperty('--flou', `${vars.flou.toFixed(1)}px`), scrollTrigger: { trigger: root, start: 'top 85%', end: 'center center', scrub: 0.6 } });
  const tw = gsap.from(cartes, { y: 120, rotation: (i) => (i % 2 ? 10 : -10), autoAlpha: 0, duration: 1, ease: ease.out, stagger: 0.1, scrollTrigger: { trigger: root, start: 'top 70%', once: true } });
  return () => { st.kill(); tw.kill(); };
}
