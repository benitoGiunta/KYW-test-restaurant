// Motion « Velours » : tout se dévoile comme un rideau. Loader = rideau baissé qui se lève ; transition de page = même
// rideau ; chaque chapitre = pan bordeaux levé une fois ; chiffre rouge qui compte ; citation dont les mots s'allument
// au scrub ; onglets à barre (rotation 6 s, pause au survol, désactivée en reduced motion). Une horloge : GSAP.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setLoaderFormat, setLoaderExit, setTransition, ease, onPage, prefersReducedMotion, isMobile } from '../engine';

gsap.registerPlugin(ScrollTrigger);

export function setupMotion() {
  setLoaderFormat((p) => String(Math.round(p)).padStart(3, '0'));
  // Sortie : les textes s'effacent, puis le rideau se lève (clip-path depuis le bas), 1,1 s expo.inOut.
  setLoaderExit((root) =>
    gsap.timeline()
      .to(root.querySelector('[data-loader-bar]'), { scaleX: 0, transformOrigin: 'right', duration: 0.4, ease: ease.inOut })
      .to(root.querySelectorAll('[data-loader-out]'), { yPercent: -110, duration: 0.6, ease: ease.inOut, stagger: 0.05 }, '<')
      .to(root, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: ease.inOut }, '-=0.3'),
  );
  // Transition : le rideau monte du bas pour couvrir, puis se lève sur la nouvelle page.
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: ease.inOut })
      .set(c, { autoAlpha: 0 }),
  });

  onPage(({ intro }) => {
    const cleanups = [heroIntro(intro), heroParallaxe(), rideaux(), compteurs(), citation(), escales(), onglets()];
    return () => cleanups.forEach((c) => c());
  });
}

/** Hero : les mots du nom montent dans leur masque en stagger, à la fin du loader (desktop). En mobile et en reduced
 *  motion le nom est peint au premier rendu : rien ne dépend du JS pour le lire. */
function heroIntro(intro: gsap.core.Timeline) {
  const mots = document.querySelectorAll<HTMLElement>('[data-hero-mot]');
  if (!mots.length || prefersReducedMotion() || isMobile()) return () => {};
  const sourire = document.querySelector<SVGPathElement>('[data-sourire]');
  gsap.set(mots, { yPercent: 110 });
  if (sourire) gsap.set(sourire, { strokeDashoffset: 1 });
  const tl = gsap.timeline({ paused: true }).to(mots, { yPercent: 0, duration: 1.1, ease: ease.out, stagger: 0.08 });
  // Signature : le sourire se trace une fois, juste après le nom.
  if (sourire) tl.to(sourire, { strokeDashoffset: 0, duration: 0.9, ease: ease.inOut }, '-=0.4');
  intro.add(() => tl.play(), 0.1);
  return () => { tl.kill(); gsap.set(mots, { clearProps: 'transform' }); if (sourire) gsap.set(sourire, { clearProps: 'strokeDashoffset' }); };
}

/** Hero : la photo glisse de 8 % pendant que la page défile (desktop, scrub). Ni mobile ni reduced motion. */
function heroParallaxe() {
  const photo = document.querySelector<HTMLElement>('.hero__photo');
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!photo || !hero || prefersReducedMotion() || isMobile()) return () => {};
  gsap.set(photo, { scale: 1.1 });
  gsap.to(photo, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
  return () => {};
}

/** Escales du menu : la ligne numérotée au centre de l'écran s'allume. Mobile compris (sans mouvement de taille en reduced motion). */
function escales() {
  if (prefersReducedMotion()) return () => {};
  document.querySelectorAll<HTMLElement>('.menu__ligne:not(.menu__ligne--hors)').forEach((ligne) => {
    ScrollTrigger.create({ trigger: ligne, start: 'top center', end: 'bottom center', toggleClass: { targets: ligne, className: 'is-escale' } });
  });
  return () => {};
}

/** Rideau : un pan bordeaux par section [data-rideau], levé une fois quand la section arrive au tiers de l'écran.
 *  Reduced motion : le pan est `display: none` par le CSS (html:not(.motion)). */
function rideaux() {
  if (prefersReducedMotion()) return () => {};
  document.querySelectorAll<HTMLElement>('[data-rideau]').forEach((section) => {
    const pan = section.querySelector<HTMLElement>('.rideau');
    if (!pan) return;
    gsap.fromTo(pan, { clipPath: 'inset(0% 0% 0% 0%)' }, {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: isMobile() ? 0.8 : 1.1,
      ease: ease.inOut,
      scrollTrigger: { trigger: section, start: 'top 66%', once: true },
      onComplete: () => { pan.style.visibility = 'hidden'; },
    });
  });
  return () => {};
}

/** Chiffre monumental : compte de 0 (ou valeur - 120 pour une année) à sa valeur en 0,9 s, tabular. Le HTML porte déjà la
 *  valeur finale (reduced motion, sans JS, crawlers). */
function compteurs() {
  if (prefersReducedMotion()) return () => {};
  document.querySelectorAll<HTMLElement>('[data-compteur]').forEach((el) => {
    const fin = parseInt(el.dataset.compteur || el.textContent || '0', 10);
    if (!Number.isFinite(fin)) return;
    const o = { v: fin > 100 ? fin - 120 : 0 };
    el.textContent = String(o.v);
    gsap.to(o, {
      v: fin,
      duration: 0.9,
      ease: ease.out,
      onUpdate: () => { el.textContent = String(Math.round(o.v)); },
      onComplete: () => { el.textContent = String(fin); },
      scrollTrigger: { trigger: el.closest('[data-rideau]') || el, start: 'top 66%', once: true },
    });
  });
  return () => {};
}

/** Citation : les mots (spans posés au build) passent de 0,22 à 1 d'opacité au scrub, dans l'ordre. */
function citation() {
  // Mobile : texte plein, pas de scrub (révision 1 : la moitié de la citation restait à 2:1 tant qu'on ne défilait pas).
  // Desktop : départ à 0,5 (≥ 4,5:1 sur profond) et allumage complet quand le bloc atteint le milieu de l'écran.
  if (prefersReducedMotion() || isMobile()) return () => {};
  document.querySelectorAll<HTMLElement>('[data-allume]').forEach((bloc) => {
    const mots = bloc.querySelectorAll<HTMLElement>('.mot');
    if (!mots.length) return;
    gsap.fromTo(mots, { opacity: 0.5 }, {
      opacity: 1,
      stagger: 0.06,
      ease: 'none',
      scrollTrigger: { trigger: bloc, start: 'top 85%', end: 'center 55%', scrub: 0.6 },
    });
  });
  return () => {};
}

/** Onglets à barre : la barre rouge de l'onglet actif se remplit en 6 s puis passe au suivant ; pause au survol ou au
 *  focus ; clic ou flèches pour choisir. Reduced motion : pas de rotation, la barre de l'onglet actif est pleine (CSS). */
function onglets() {
  const root = document.querySelector<HTMLElement>('[data-onglets]');
  if (!root) return () => {};
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const panels = [...root.querySelectorAll<HTMLElement>('[role="tabpanel"]')];
  const photos = [...root.querySelectorAll<HTMLElement>('[data-onglet-photo]')];
  const reduced = prefersReducedMotion();
  let i = 0;
  let tween: gsap.core.Tween | null = null;
  const prog = { v: 0 };
  const applique = () => {
    tabs.forEach((t, k) => {
      const on = k === i;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      t.style.setProperty('--prog', on ? String(prog.v) : '0');
    });
    panels.forEach((p, k) => { p.hidden = k !== i; });
    photos.forEach((p, k) => p.classList.toggle('is-active', k === i));
  };
  const lance = () => {
    tween?.kill();
    prog.v = 0;
    applique();
    if (reduced) { prog.v = 1; applique(); return; }
    tween = gsap.to(prog, { v: 1, duration: 6, ease: 'none', onUpdate: applique, onComplete: () => { i = (i + 1) % tabs.length; lance(); } });
  };
  const choisis = (k: number, focus = false) => { i = (k + tabs.length) % tabs.length; lance(); if (focus) tabs[i].focus(); };
  const handlers: [EventTarget, string, EventListener][] = [];
  const on = (t: EventTarget, ev: string, fn: EventListener) => { t.addEventListener(ev, fn); handlers.push([t, ev, fn]); };
  tabs.forEach((t, k) => {
    on(t, 'click', () => choisis(k));
    on(t, 'keydown', ((e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); choisis(k + 1, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); choisis(k - 1, true); }
    }) as EventListener);
  });
  on(root, 'pointerenter', () => tween?.pause());
  on(root, 'pointerleave', () => tween?.play());
  on(root, 'focusin', () => tween?.pause());
  on(root, 'focusout', () => tween?.play());
  // La rotation ne tourne que quand le bloc est à l'écran (une horloge, en pause hors champ).
  const st = ScrollTrigger.create({ trigger: root, start: 'top bottom', end: 'bottom top', onEnter: () => tween?.play(), onEnterBack: () => tween?.play(), onLeave: () => tween?.pause(), onLeaveBack: () => tween?.pause() });
  lance();
  if (!st.isActive) tween?.pause();
  return () => { tween?.kill(); st.kill(); handlers.forEach(([t, ev, fn]) => t.removeEventListener(ev, fn)); };
}
