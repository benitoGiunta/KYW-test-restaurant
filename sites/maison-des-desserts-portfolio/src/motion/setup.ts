// Motion « Collage » : tout se colle. Loader (cases qui se collent), rideau latéral, intro du hero, logo-étiquette qui
// absorbe le nom de la section courante (ScrollTrigger onToggle), dérive idle de la tasse, menu mobile, formulaires de démo.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setLoaderFormat, setLoaderExit, setTransition, ease, onPage, prefersReducedMotion, isMobile } from '../engine';

gsap.registerPlugin(ScrollTrigger);
const COLLE = 'back.out(1.7)';

export function setupMotion() {
  const cases = [...document.querySelectorAll<HTMLElement>('#loader [data-loader-case]')];
  cases.forEach((c) => gsap.set(c, { autoAlpha: 0, scale: 1.15, rotate: -4 }));
  let posees = 0;
  setLoaderFormat((p) => {
    const n = Math.min(cases.length, Math.floor((p / 100) * cases.length) + (p >= 99 ? 1 : 0));
    while (posees < n) {
      gsap.to(cases[posees], { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.3, ease: COLLE });
      posees++;
    }
    return String(Math.round(p)).padStart(3, '0');
  });
  setLoaderExit((root) =>
    gsap.timeline()
      .to(root.querySelectorAll('[data-loader-out]'), { y: -16, autoAlpha: 0, duration: 0.25, ease: ease.inOut, stagger: 0.05 })
      .to(root, { xPercent: 100, duration: 0.55, ease: ease.inOut }, '-=0.1'),
  );
  setTransition({
    leave: (c) => gsap.timeline().set(c, { autoAlpha: 1 }).fromTo(c.querySelector('.curtain__panel'), { xPercent: -100 }, { xPercent: 0, duration: 0.55, ease: ease.inOut }),
    enter: (c) => gsap.timeline().to(c.querySelector('.curtain__panel'), { xPercent: 100, duration: 0.6, ease: ease.inOut }).set(c, { autoAlpha: 0 }),
  });

  onPage(({ intro }) => {
    const cleanups = [heroIntro(intro), logoSection(), derive(), menuMobile(), formulaires()];
    return () => cleanups.forEach((c) => c());
  });
}

/** Hero : peint au premier rendu ; les cases du h1 se collent une à une, l'étiquette et les boutons suivent. */
function heroIntro(intro: gsap.core.Timeline) {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero || prefersReducedMotion()) return () => {};
  const cases = hero.querySelectorAll('[data-hero-case]');
  const apres = hero.querySelectorAll('[data-hero-apres]');
  // État de départ posé tout de suite (sous le loader ou le rideau) : pas de clignotement avant l'intro.
  gsap.set(cases, { scale: 1.15, rotate: -4, autoAlpha: 0 });
  gsap.set(apres, { y: 12, autoAlpha: 0 });
  const tl = gsap.timeline({ paused: true });
  tl.to(cases, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.45, ease: COLLE, stagger: 0.14 }, 0);
  if (apres.length) tl.to(apres, { y: 0, autoAlpha: 1, duration: 0.5, ease: ease.out, stagger: 0.08 }, 0.5);
  intro.add(() => tl.play(), 0);
  return () => { tl.kill(); gsap.set([cases, apres], { clearProps: 'all' }); };
}

/** Logo-étiquette : à chaque section `[data-activite]`, la quatrième case se colle avec le nom de l'activité. */
function logoSection() {
  const caseEl = document.querySelector<HTMLElement>('[data-logo-section]');
  const sections = [...document.querySelectorAll<HTMLElement>('[data-activite]')];
  if (!caseEl || !sections.length) return () => {};
  const reduit = prefersReducedMotion();
  let courant = '';
  const poser = (nom: string, couleur: string) => {
    if (nom === courant) return;
    courant = nom;
    caseEl.textContent = nom;
    caseEl.dataset.couleur = couleur;
    if (nom && !reduit) gsap.fromTo(caseEl, { scale: 1.15, rotate: -4, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.3, ease: COLLE, overwrite: true });
  };
  const triggers = sections.map((s) =>
    ScrollTrigger.create({
      trigger: s, start: 'top 45%', end: 'bottom 45%',
      onToggle: (self) => {
        if (self.isActive) poser(s.dataset.activite || '', s.dataset.couleur || 'postit');
        else if (courant === s.dataset.activite) {
          const autre = sections.find((o) => o !== s && (o as any)._st?.isActive);
          if (!autre) poser('', 'postit');
        }
      },
    }),
  );
  sections.forEach((s, i) => ((s as any)._st = triggers[i]));
  // État initial : la première section active, s'il y en a une (page d'activité ouverte à mi-hauteur).
  const active = sections.find((s, i) => triggers[i].isActive);
  if (active) poser(active.dataset.activite || '', active.dataset.couleur || 'postit');
  return () => { triggers.forEach((t) => t.kill()); poser('', 'postit'); };
}

/** Idle : la tasse du brunch dérive de 4 px (motion seulement, un seul idle sur le site). */
function derive() {
  const tasse = document.querySelector<HTMLElement>('[data-derive]');
  if (!tasse || prefersReducedMotion() || isMobile()) return () => {};
  const tw = gsap.to(tasse, { y: -4, rotate: 2, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  return () => { tw.kill(); gsap.set(tasse, { clearProps: 'all' }); };
}

/** Menu mobile : overlay plein écran, focus piégé, fermeture par Escape. */
function menuMobile() {
  const ouvrir = document.querySelector<HTMLButtonElement>('[data-menu-ouvrir]');
  const overlay = document.querySelector<HTMLElement>('[data-menu]');
  if (!ouvrir || !overlay) return () => {};
  const fermerBtn = overlay.querySelector<HTMLButtonElement>('[data-menu-fermer]')!;
  const focusables = () => [...overlay.querySelectorAll<HTMLElement>('a, button')];
  const open = () => { overlay.hidden = false; overlay.dataset.open = ''; document.documentElement.dataset.menuOpen = ''; ouvrir.setAttribute('aria-expanded', 'true'); fermerBtn.focus(); };
  const close = () => { delete overlay.dataset.open; overlay.hidden = true; delete document.documentElement.dataset.menuOpen; ouvrir.setAttribute('aria-expanded', 'false'); ouvrir.focus(); };
  const key = (e: KeyboardEvent) => {
    if (overlay.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;
    const f = focusables(); const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  ouvrir.addEventListener('click', open);
  fermerBtn.addEventListener('click', close);
  document.addEventListener('keydown', key);
  return () => { ouvrir.removeEventListener('click', open); fermerBtn.removeEventListener('click', close); document.removeEventListener('keydown', key); if (!overlay.hidden) close(); };
}

/** Formulaires de démonstration : aucun envoi ; réservation → outil réel, privatisation → message de démo. */
function formulaires() {
  const forms = [...document.querySelectorAll<HTMLFormElement>('form[data-demo]')];
  if (!forms.length) return () => {};
  const hs = forms.map((form) => {
    const h = (e: SubmitEvent) => {
      e.preventDefault();
      if (form.dataset.demo === 'reservation') window.open(form.action, '_blank', 'noopener');
      else form.dataset.envoye = '';
    };
    form.addEventListener('submit', h);
    return () => form.removeEventListener('submit', h);
  });
  return () => hs.forEach((h) => h());
}
