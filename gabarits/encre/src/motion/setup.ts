// Motion « Encre » : tout glisse comme un rouleau, sur un axe, sans rebond. Loader ivoire qui se referme vers la
// droite, rideau horizontal, hero peint au premier rendu (seule la photo respire et le trait se trace), titres
// verticaux qui s'allument, le Rouleau épinglé au scrub, tracés du plan, sceaux qui se posent, vapeur au repos.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setLoaderFormat, setLoaderExit, setTransition, ease, onPage, prefersReducedMotion, scrollState, scrollToTarget } from '../engine';

gsap.registerPlugin(ScrollTrigger);

const noop = () => {};
const reduced = () => prefersReducedMotion();

export function setupMotion() {
  setLoaderFormat((p) => String(Math.round(p)).padStart(3, '0'));
  setLoaderExit((root) =>
    gsap.timeline()
      .to(root.querySelector('[data-loader-bar]'), { scaleX: 0, transformOrigin: 'right', duration: 0.45, ease: ease.inOut })
      .to(root.querySelectorAll('[data-loader-out]'), { autoAlpha: 0, y: -10, duration: 0.45, ease: ease.inOut, stagger: 0.05 }, '<')
      .to(root, { clipPath: 'inset(0% 0% 0% 100%)', duration: 0.9, ease: ease.inOut }, '-=0.15'),
  );
  // Rideau : un panneau ivoire qui glisse à l'horizontale (le rouleau se referme, puis s'ouvre).
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'), { xPercent: 100 }, { xPercent: 0, duration: 0.7, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { xPercent: -100, duration: 0.7, ease: ease.inOut })
      .set(c, { autoAlpha: 0 }),
  });

  onPage(({ intro }) => {
    const cs = [heroIntro(intro), vapeur(), traces(), allumage(), rouleau(), sceaux(), horloge(), dateMinimum()];
    return () => cs.forEach((c) => c());
  });
}

/** Hero : la photo et le nom sont peints sous le rideau dès le premier rendu. À l'intro, la photo respire (scale
 *  1.06 → 1, transform seulement), le trait vertical se trace et le lien d'invitation apparaît. */
function heroIntro(intro: gsap.core.Timeline) {
  const photo = document.querySelector<HTMLElement>('[data-hero-photo]');
  if (!photo || reduced()) return noop;
  const tl = gsap.timeline({ paused: true });
  tl.fromTo(photo, { scale: 1.06 }, { scale: 1, duration: 1.8, ease: ease.out }, 0);
  const trace = document.querySelector<SVGPathElement>('[data-trace-hero]');
  if (trace) {
    const l = trace.getTotalLength();
    gsap.set(trace, { strokeDasharray: l, strokeDashoffset: l });
    tl.to(trace, { strokeDashoffset: 0, duration: 1.2, ease: ease.out }, 0.1);
  }
  const lien = document.querySelector<HTMLElement>('[data-hero-lien]');
  if (lien) {
    gsap.set(lien, { autoAlpha: 0, y: 12 });
    tl.to(lien, { autoAlpha: 1, y: 0, duration: 0.8, ease: ease.out }, 0.6);
  }
  intro.add(() => tl.play(), 0);
  return () => { tl.kill(); };
}

/** Idle : la vapeur du hero, dérive d'opacité du voile de ±3 % sur 6 s. */
function vapeur() {
  const voile = document.querySelector<HTMLElement>('[data-vapeur]');
  if (!voile || reduced()) return noop;
  const t = gsap.fromTo(voile, { opacity: 0.9 }, { opacity: 1, duration: 6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  return () => { t.kill(); };
}

/** Tracés (plan d'accès) : stroke-dashoffset à l'entrée, une fois, en cascade. */
function traces() {
  const paths = [...document.querySelectorAll<SVGPathElement>('[data-trace]')];
  if (!paths.length || reduced()) return noop;
  const groupes = new Map<Element, SVGPathElement[]>();
  paths.forEach((p) => {
    const svg = p.closest('svg') as Element;
    groupes.set(svg, [...(groupes.get(svg) || []), p]);
    const l = p.getTotalLength();
    gsap.set(p, { strokeDasharray: `${l} ${l}`, strokeDashoffset: l });
  });
  groupes.forEach((ps, svg) => {
    gsap.to(ps, { strokeDashoffset: 0, duration: 1.6, ease: ease.out, stagger: 0.12, scrollTrigger: { trigger: svg, start: 'top 80%', once: true } });
  });
  return noop;
}

/** Titres verticaux : les caractères s'allument (pierre → encre) au défilement, scrub. */
function allumage() {
  const titres = [...document.querySelectorAll<HTMLElement>('[data-allume]')];
  if (!titres.length || reduced()) return noop;
  const css = getComputedStyle(document.documentElement);
  const de = css.getPropertyValue('--c-muted').trim();
  const a = css.getPropertyValue('--c-fg').trim();
  titres.forEach((t) => {
    const chars = t.querySelectorAll<HTMLElement>('.titre-v__c');
    if (!chars.length) return;
    gsap.fromTo(chars, { color: de }, { color: a, ease: 'none', stagger: 0.08, scrollTrigger: { trigger: t, start: 'top 85%', end: 'top 40%', scrub: 0.6 } });
  });
  return noop;
}

/** Le Rouleau. Desktop + motion : section épinglée, la bande glisse au scrub, chaque plat se révèle sous son trait de
 *  pinceau quand il entre dans le champ (containerAnimation), le sceau se pose à la fin. Sinon : défilement natif
 *  horizontal (snap), traits déjà dessinés par le CSS, barre de progression qui suit le scrollLeft. */
function rouleau() {
  const root = document.querySelector<HTMLElement>('[data-rouleau]');
  if (!root) return noop;
  const piste = root.querySelector<HTMLElement>('[data-rouleau-piste]')!;
  const bande = root.querySelector<HTMLElement>('[data-rouleau-bande]')!;
  const progres = root.querySelector<HTMLElement>('[data-rouleau-progres]');
  const epingle = root.dataset.rouleau === 'epingle' && matchMedia('(min-width: 1024px)').matches && !reduced();
  const pas = () => Math.round(piste.clientWidth * 0.45);

  const clavier = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const d = (e.key === 'ArrowRight' ? 1 : -1) * pas();
    if (epingle) scrollToTarget(scrollState().y + d);
    else piste.scrollBy({ left: d, behavior: reduced() ? 'auto' : 'smooth' });
  };
  piste.addEventListener('keydown', clavier);

  if (!epingle) {
    const suivre = () => {
      const max = piste.scrollWidth - piste.clientWidth;
      if (progres) progres.style.transform = `scaleX(${max > 0 ? piste.scrollLeft / max : 1})`;
    };
    piste.addEventListener('scroll', suivre, { passive: true });
    suivre();
    return () => { piste.removeEventListener('keydown', clavier); piste.removeEventListener('scroll', suivre); };
  }

  root.classList.add('is-epingle');
  const scene = root.querySelector<HTMLElement>('[data-rouleau-scene]')!;
  const course = () => Math.max(0, bande.scrollWidth - piste.clientWidth);
  const glisse = gsap.to(bande, {
    x: () => -course(),
    ease: 'none',
    scrollTrigger: {
      trigger: root,
      start: 'top top',
      end: () => `+=${course()}`,
      pin: scene,
      scrub: 0.8,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (st) => { if (progres) progres.style.transform = `scaleX(${st.progress})`; },
    },
  });
  // Traits de pinceau : fermés au départ, tracés quand le plat entre (85 % de la largeur) dans la bande.
  root.querySelectorAll<HTMLElement>('[data-plat]').forEach((plat) => {
    const ps = [...plat.querySelectorAll<SVGPathElement>('[data-pinceau]')];
    if (!ps.length) return;
    ps.forEach((p) => { const l = p.getTotalLength(); gsap.set(p, { strokeDasharray: `${l} ${l}`, strokeDashoffset: l }); });
    ScrollTrigger.create({
      trigger: plat,
      containerAnimation: glisse,
      start: 'left 85%',
      once: true,
      onEnter: () => { gsap.to(ps, { strokeDashoffset: 0, duration: 1.2, ease: ease.out, stagger: 0.18 }); },
    });
  });
  // Le sceau se pose en fin de course (scale 1.3 → 1).
  const fin = root.querySelector<HTMLElement>('.plat--fin');
  const disque = fin?.querySelector<HTMLElement>('.sceau__disque');
  if (fin && disque) {
    gsap.set(disque, { scale: 1.3, autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: fin, containerAnimation: glisse, start: 'left 80%', once: true,
      onEnter: () => { gsap.to(disque, { scale: 1, autoAlpha: 1, duration: 0.6, ease: 'power3.out', clearProps: 'transform,opacity' }); },
    });
  }
  return () => { piste.removeEventListener('keydown', clavier); root.classList.remove('is-epingle'); };
}

/** Sceaux hors rouleau (pied de page) : se posent à l'entrée. */
function sceaux() {
  const disques = [...document.querySelectorAll<HTMLElement>('[data-sceau] .sceau__disque')].filter((d) => !d.closest('[data-rouleau]'));
  if (!disques.length || reduced()) return noop;
  disques.forEach((d) => {
    gsap.fromTo(d, { scale: 1.3, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.7, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: d, start: 'top 92%', once: true } });
  });
  return noop;
}

/** Heure locale dans l'en-tête, calculée côté client (jamais écrite en dur). */
function horloge() {
  const el = document.querySelector<HTMLElement>('[data-horloge]');
  if (!el) return noop;
  const fmt = new Intl.DateTimeFormat('fr-BE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Brussels' });
  const tick = () => { el.textContent = fmt.format(new Date()); };
  tick();
  const id = setInterval(tick, 20000);
  return () => clearInterval(id);
}

/** Formulaire : la date minimale est aujourd'hui (calculée). */
function dateMinimum() {
  const input = document.querySelector<HTMLInputElement>('input[type="date"][data-min-aujourdhui]');
  if (!input) return noop;
  const d = new Date();
  input.min = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  return noop;
}
