// Motion « Guinguette » : loader nappe, rideau corail depuis le bas, objets qui tombent et rebondissent puis se saisissent
// (Draggable + inertie maison par quickTo), table de tirages draggables qu'on repose de travers puis qu'on remet en place,
// filet de lecture sous le tricolore, marquee d'état (heure de Bruxelles).
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
    const cleanups = [marquee(), heroTitre(intro), heroObjets(intro), table(), progres()];
    return () => cleanups.forEach((c) => c());
  });
}

/** État « ouvert / fermé » calculé depuis site.horaires (data-horaires) à l'heure de Bruxelles, jamais une date en dur. */
function marquee() {
  const root = document.querySelector<HTMLElement>('[data-marquee]');
  if (!root) return () => {};
  const jours = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  const horaires = JSON.parse(root.dataset.horaires || '[]') as { j: string; c: { ouverture: string; fermeture: string }[] }[];
  const parJour = (j: string) => horaires.find((h) => h.j === j);
  const fmt = new Intl.DateTimeFormat('fr-BE', { timeZone: 'Europe/Brussels', weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  const heure = (hhmm: string) => { const [h, m] = hhmm.split(':'); return `${Number(h)}\u00a0h${m === '00' ? '' : `\u00a0${m}`}`; };
  const peindre = () => {
    const parts = fmt.formatToParts(new Date());
    const val = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
    const jour = val('weekday').toLowerCase();
    const idx = Math.max(0, jours.indexOf(jour));
    const hhmm = `${val('hour')}:${val('minute')}`;
    const auj = parJour(jour);
    let texte = 'Horaires du jour';
    let etat = '';
    const ouvert = auj?.c.find((c) => c.ouverture <= hhmm && hhmm < c.fermeture);
    const suivant = auj?.c.find((c) => c.ouverture > hhmm);
    if (ouvert) { texte = `Ouvert, arrivée jusqu'à ${heure(ouvert.fermeture)}`; etat = 'is-ouvert'; }
    else if (suivant) { texte = `Fermé en ce moment, ouverture à ${heure(suivant.ouverture)}`; etat = 'is-ferme'; }
    else {
      for (let k = 1; k <= 7; k++) {
        const h = parJour(jours[(idx + k) % 7]);
        if (h && h.c.length) { texte = `Fermé aujourd'hui, prochain service ${h.j} à ${heure(h.c[0].ouverture)}`; etat = 'is-ferme'; break; }
      }
    }
    root.querySelectorAll<HTMLElement>('[data-marquee-etat]').forEach((e) => { e.textContent = texte; e.className = `marquee__etat ${etat}`; });
  };
  peindre();
  const id = window.setInterval(peindre, 60_000);
  return () => window.clearInterval(id);
}

/** Rend un élément saisissable : Draggable x,y borné au parent, zIndex au drag, inertie maison, flèches au clavier. */
function saisissable(el: HTMLElement, bounds: HTMLElement, opts: { exclure?: HTMLElement | null; rebond?: boolean; pose?: boolean; onMove?: () => void } = {}) {
  let z = 10;
  el.dataset.r0 = el.style.getPropertyValue('--r');
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
      if (opts.pose) { el.classList.add('is-pose'); el.style.setProperty('--r', `${gsap.utils.random(-8, 8, 1)}deg`); }
      opts.onMove?.();
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
    opts.onMove?.();
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

/** La table : tirages posés en stagger avec rotation, puis saisissables (desktop), reposés de travers au lâcher ; « Remettre la table » les ramène. Rail en mobile. */
function table() {
  const scene = document.querySelector<HTMLElement>('[data-table-scene]');
  if (!scene || isMobile() || getComputedStyle(scene).display === 'none') return () => {};
  const items = [...scene.querySelectorAll<HTMLElement>('[data-tirage], [data-obj]')];
  const cleanups: (() => void)[] = [];
  const reduit = prefersReducedMotion();
  const bouton = document.querySelector<HTMLButtonElement>('[data-table-reset]');
  const bouge = () => { if (bouton) bouton.hidden = false; };
  const armer = () => items.forEach((t) => cleanups.push(saisissable(t, scene, { pose: t.hasAttribute('data-tirage'), onMove: bouge })));
  const remettre = () => {
    items.forEach((t) => { if (t.dataset.r0) t.style.setProperty('--r', t.dataset.r0); t.style.zIndex = ''; });
    gsap.to(items, {
      x: 0, y: 0, duration: reduit ? 0 : 0.8, ease: 'back.out(1.4)', stagger: reduit ? 0 : { each: 0.05, from: 'random' },
      onComplete: () => items.forEach((t) => (Draggable.get(t) as Draggable | undefined)?.update()),
    });
    if (bouton) bouton.hidden = true;
    items[0]?.focus({ preventScroll: true });
  };
  bouton?.addEventListener('click', remettre);
  cleanups.push(() => { bouton?.removeEventListener('click', remettre); if (bouton) bouton.hidden = true; });
  if (reduit) { armer(); return () => cleanups.forEach((c) => c()); }
  const tl = gsap.timeline({ scrollTrigger: { trigger: scene, start: 'top 70%', once: true }, onComplete: armer });
  tl.from(items, { y: 90, autoAlpha: 0, rotation: () => gsap.utils.random(-14, 14), duration: 0.9, ease: 'back.out(1.6)', stagger: { each: 0.06, from: 'random' } });
  cleanups.push(() => tl.kill());
  return () => cleanups.forEach((c) => c());
}

/** Hero : le titre monte de deux lignes (transform seul, texte jamais caché), l'accroche s'écrit de gauche à droite. */
function heroTitre(intro: gsap.core.Timeline) {
  const lignes = document.querySelectorAll<HTMLElement>('.hero__titre span');
  const slogan = document.querySelector<HTMLElement>('.hero__slogan');
  if (!lignes.length || prefersReducedMotion()) return () => {};
  intro.from(lignes, { y: 34, duration: 0.9, ease: ease.out, stagger: 0.12, clearProps: 'transform' }, 0.05);
  if (slogan) intro.fromTo(slogan, { clipPath: 'inset(-10% 100% -10% 0)' }, { clipPath: 'inset(-10% -2% -10% -2%)', duration: 1, ease: 'power2.out', clearProps: 'clipPath' }, 0.4);
  return () => {};
}

/** Filet de lecture : un trait d'encre sous le tricolore avance avec le défilement (--progres, 0 à 1). */
function progres() {
  const t = document.querySelector<HTMLElement>('.tricolore');
  if (!t || prefersReducedMotion()) return () => {};
  const st = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (self) => t.style.setProperty('--progres', self.progress.toFixed(3)) });
  return () => st.kill();
}
