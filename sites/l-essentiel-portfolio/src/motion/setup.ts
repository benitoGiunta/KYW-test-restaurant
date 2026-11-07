// Motion « Comptoir » : rien ne bouge sans raison. Loader blanc à barre céladon, rideau blanc bordé d'un filet,
// intro du hero en fondu lent, filets qui se dessinent, et un seul geste scrubbé : le dressage.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setLoaderFormat, setLoaderExit, setTransition, ease, onPage, prefersReducedMotion, isMobile } from '../engine';

gsap.registerPlugin(ScrollTrigger);

export function setupMotion() {
  setLoaderFormat((p) => String(Math.round(p)));
  setLoaderExit((root) =>
    gsap.timeline()
      .to(root.querySelector('[data-loader-bar]'), { scaleX: 0, transformOrigin: 'right', duration: 0.4, ease: ease.inOut })
      .to(root.querySelectorAll('[data-loader-out]'), { autoAlpha: 0, y: -8, duration: 0.4, ease: ease.inOut, stagger: 0.04 }, '<')
      .to(root, { autoAlpha: 0, duration: 0.5, ease: ease.inOut }, '-=0.1'),
  );
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { yPercent: 100 }, { yPercent: 0, duration: 0.7, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { yPercent: -100, duration: 0.7, ease: ease.inOut })
      .set(c, { autoAlpha: 0 }),
  });

  onPage(({ intro }) => {
    const cleanups: (() => void)[] = [];
    cleanups.push(heroIntro(intro));
    cleanups.push(filets());
    cleanups.push(dressage());
    cleanups.push(dateMinimum());
    return () => cleanups.forEach((c) => c());
  });
}

/** Hero : fondu lent (1,4 s) de l'image en desktop ; en mobile l'image est peinte au premier rendu (élément LCP). */
function heroIntro(intro: gsap.core.Timeline) {
  const media = document.querySelector<HTMLElement>('[data-hero-media]');
  if (!media || prefersReducedMotion() || isMobile()) return () => {};
  gsap.set(media, { autoAlpha: 0 });
  const tl = gsap.timeline({ paused: true }).to(media, { autoAlpha: 1, duration: 1.4, ease: ease.out });
  intro.add(() => tl.play(), 0);
  return () => { tl.kill(); };
}

/** Lien sur filet : le trait se dessine sur toute la colonne à l'entrée (scaleX), une seule fois. */
function filets() {
  const els = document.querySelectorAll<HTMLElement>('[data-filet]');
  if (!els.length || prefersReducedMotion()) return () => {};
  els.forEach((el) => {
    gsap.fromTo(el, { '--trait': 0 }, { '--trait': 1, duration: 1.2, ease: ease.out, scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });
  return () => {};
}

/** Dressage : scène épinglée (220 %), composants posés à la pince au scrub, traits et légendes qui suivent.
 *  Reduced motion : tout est affiché complet par le CSS (html:not(.motion)), rien à faire ici. */
function dressage() {
  const root = document.querySelector<HTMLElement>('[data-dressage]');
  if (!root || prefersReducedMotion()) return () => {};
  const scene = root.querySelector<HTMLElement>('[data-dressage-scene]')!;
  const comps = [...root.querySelectorAll<HTMLElement>('[data-composant]')];
  const tl = gsap.timeline({
    scrollTrigger: { trigger: root, start: 'top top', end: '+=220%', pin: scene, scrub: 0.8, anticipatePin: 1 },
  });
  tl.to({}, { duration: 0.3 }); // l'assiette vide respire un instant
  comps.forEach((c) => {
    const i = c.dataset.composant!;
    const trait = root.querySelector<SVGPathElement>(`[data-trait="${i}"]`);
    const legende = root.querySelector<HTMLElement>(`[data-legende="${i}"]`);
    const t = tl.duration();
    tl.fromTo(c, { scale: 1.15, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.8, ease: ease.out }, t);
    if (trait) {
      const l = trait.getTotalLength();
      tl.fromTo(trait, { strokeDasharray: l, strokeDashoffset: l }, { strokeDashoffset: 0, duration: 0.5, ease: 'none' }, t + 0.5);
    }
    if (legende) tl.fromTo(legende, { autoAlpha: 0, x: c.dataset.cote === 'gauche' ? 6 : -6 }, { autoAlpha: 1, x: 0, duration: 0.4, ease: ease.out }, t + 0.9);
    tl.to({}, { duration: 0.25 }, t + 1.3);
  });
  tl.to({}, { duration: 0.4 }); // le plat reste posé avant de défiler
  // Liste texte : le focus ou le survol d'un composant le met en avant sur l'assiette.
  const items = [...root.querySelectorAll<HTMLElement>('[data-liste-item]')];
  const mettre = (i: string | null) => comps.forEach((c) => c.classList.toggle('is-avant', c.dataset.composant === i));
  const handlers: [HTMLElement, string, () => void][] = [];
  items.forEach((it) => {
    const on = () => mettre(it.dataset.listeItem!);
    const off = () => mettre(null);
    for (const [ev, fn] of [['focusin', on], ['mouseenter', on], ['focusout', off], ['mouseleave', off]] as const) {
      it.addEventListener(ev, fn);
      handlers.push([it, ev, fn]);
    }
  });
  return () => { handlers.forEach(([el, ev, fn]) => el.removeEventListener(ev, fn)); };
}

/** Formulaire : la date minimale est aujourd'hui (calculée, jamais écrite en dur). */
function dateMinimum() {
  const input = document.querySelector<HTMLInputElement>('input[type="date"][data-min-aujourdhui]');
  if (!input) return () => {};
  const d = new Date();
  input.min = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  return () => {};
}
