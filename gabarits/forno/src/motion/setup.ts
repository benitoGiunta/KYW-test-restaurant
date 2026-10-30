// Motion « Forno » : loader four tracé, rideau porte de four, hero qui monte, levée (--p scrubée), marquee lié à la
// vélocité, compte à rebours calculé depuis les horaires réels, zones de thème pour l'en-tête, carrousel des gens.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setLoaderFormat, setLoaderExit, setTransition, ease, onPage, onScroll, prefersReducedMotion, isMobile } from '../engine';

gsap.registerPlugin(ScrollTrigger);
const JOURS = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];

export function setupMotion() {
  // Loader : les tracés du four se dessinent avec la progression ; le compteur sr-only garde le format du moteur.
  const traces = [...document.querySelectorAll<SVGPathElement>('#loader [data-trace]')];
  setLoaderFormat((p) => {
    traces.forEach((t, i) => { t.style.strokeDashoffset = String(1 - Math.max(0, Math.min(1, (p / 100 - i * 0.5) * (i ? 2 : 1.3)))); });
    return String(Math.round(p)).padStart(3, '0');
  });
  setLoaderExit((root) =>
    gsap.timeline()
      .to(root.querySelector('.loader__four'), { scale: 1.6, autoAlpha: 0, duration: 0.45, ease: ease.inOut }, 0)
      .to(root.querySelector('.loader__name'), { y: -20, autoAlpha: 0, duration: 0.3, ease: ease.inOut }, 0)
      .to(root, { yPercent: 100, duration: 0.55, ease: ease.inOut }, 0.2),
  );
  // Rideau : la porte du four descend, puis continue vers le bas.
  setTransition({
    leave: (c) => gsap.timeline().set(c, { autoAlpha: 1 }).fromTo(c.querySelector('.curtain__panel'), { yPercent: -100 }, { yPercent: 0, duration: 0.65, ease: ease.inOut }),
    enter: (c) => gsap.timeline().to(c.querySelector('.curtain__panel'), { yPercent: 100, duration: 0.75, ease: ease.inOut }).set(c, { autoAlpha: 0 }),
  });

  onPage(({ intro }) => {
    const cleanups = [heroIntro(intro), zones(), levee(), marquee(), compte(), gens(), fiches()];
    return () => cleanups.forEach((c) => c());
  });
}

/** Hero : tout est peint au premier rendu ; en desktop + motion, le nom monte et la photo se pose (transform/opacité). */
function heroIntro(intro: gsap.core.Timeline) {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero || prefersReducedMotion() || isMobile()) return () => {};
  const mots = hero.querySelectorAll('[data-hero-nom] > span');
  const cote = hero.querySelector('[data-hero-cote]');
  const photo = hero.querySelector('[data-hero-photo]');
  const tl = gsap.timeline({ paused: true });
  tl.fromTo(mots, { y: '0.35em', autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, ease: ease.out, stagger: 0.12 }, 0);
  if (cote) tl.fromTo(cote, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: ease.out }, 0.4);
  if (photo) tl.fromTo(photo, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2, ease: ease.out }, 0.2);
  intro.add(() => tl.play(), 0);
  return () => { tl.kill(); };
}

/** Zones de thème : l'en-tête prend la couleur de la zone sous lui (fonctionne aussi en reduced motion : simple attribut). */
function zones() {
  const html = document.documentElement;
  const zones = [...document.querySelectorAll<HTMLElement>('[data-theme-zone]')];
  if (!zones.length) return () => {};
  const defaut = html.dataset.theme || 'farine';
  let ts: ScrollTrigger[] = [];
  const sync = () => {
    const actives = ts.filter((t) => t.isActive);
    html.dataset.theme = actives.length ? (actives[actives.length - 1].trigger as HTMLElement).dataset.themeZone : defaut;
  };
  ts = zones.map((z) => ScrollTrigger.create({ trigger: z, start: 'top 48px', end: 'bottom 48px', onToggle: sync }));
  sync();
  return () => ts.forEach((t) => t.kill());
}

/** Levée : --p va de 0 (vignette) à 1 (plein écran) sur la hauteur de la section ; le CSS fait le reste. */
function levee() {
  const root = document.querySelector<HTMLElement>('[data-levee]');
  if (!root || prefersReducedMotion()) return () => {};
  const v = { p: 0 };
  const peindre = () => root.style.setProperty('--p', v.p.toFixed(4));
  const tween = gsap.fromTo(v, { p: 0 }, {
    p: 1, ease: 'none', onUpdate: peindre,
    scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 0.5 },
  });
  peindre();
  return () => { tween.scrollTrigger?.kill(); tween.kill(); root.style.removeProperty('--p'); };
}

/** Marquee : deux pistes en sens inverse, vitesse liée à la vélocité Lenis, pause au survol, idle lent. */
function marquee() {
  const root = document.querySelector<HTMLElement>('[data-marquee]');
  if (!root || prefersReducedMotion()) return () => {};
  const t1 = root.querySelector<HTMLElement>('[data-marquee-track="1"]');
  const t2 = root.querySelector<HTMLElement>('[data-marquee-track="2"]');
  const tl = gsap.timeline({ repeat: -1 });
  if (t1) tl.fromTo(t1, { xPercent: 0 }, { xPercent: -50, duration: 40, ease: 'none' }, 0);
  if (t2 && !isMobile()) tl.fromTo(t2, { xPercent: -50 }, { xPercent: 0, duration: 40, ease: 'none' }, 0);
  let hover = false;
  const vitesse = { v: 1 };
  const off = onScroll((s) => {
    if (hover) return;
    const cible = 1 + Math.min(Math.abs(s.velocity) / 6, 5);
    gsap.to(vitesse, { v: cible, duration: 0.4, overwrite: true, onUpdate: () => tl.timeScale(vitesse.v) });
  });
  const enter = () => { hover = true; gsap.to(vitesse, { v: 0, duration: 0.4, overwrite: true, onUpdate: () => tl.timeScale(vitesse.v) }); };
  const leave = () => { hover = false; gsap.to(vitesse, { v: 1, duration: 0.6, overwrite: true, onUpdate: () => tl.timeScale(vitesse.v) }); };
  root.addEventListener('pointerenter', enter);
  root.addEventListener('pointerleave', leave);
  return () => { off(); tl.kill(); root.removeEventListener('pointerenter', enter); root.removeEventListener('pointerleave', leave); };
}

/** Compte à rebours : prochain service calculé depuis site.horaires (data-horaires = créneaux par jour, lundi en premier).
 *  Pendant le service : « c'est ouvert ». Reduced motion : mise à jour à la minute, sans secondes. Aucune date en dur. */
function compte() {
  const el = document.querySelector<HTMLElement>('[data-compte]');
  if (!el) return () => {};
  const creneaux = JSON.parse(el.dataset.horaires || '[]') as { ouverture: string; fermeture: string }[][]; // index 0 = lundi
  const lib = el.querySelector<HTMLElement>('[data-compte-lib]');
  const texte = el.querySelector<HTMLElement>('[data-compte-texte]');
  const hover = el.querySelector<HTMLElement>('[data-compte-hover]');
  const cases = { j: el.querySelector('[data-c="j"]'), h: el.querySelector('[data-c="h"]'), m: el.querySelector('[data-c="m"]'), s: el.querySelector('[data-c="s"]') };
  const reduit = prefersReducedMotion();
  const h2m = (h: string) => { const [a, b] = h.split(':').map(Number); return a * 60 + b; };
  const dateA = (base: Date, jours: number, minutes: number) => { const d = new Date(base); d.setDate(d.getDate() + jours); d.setHours(0, minutes, 0, 0); return d; };

  const calcul = (now: Date) => {
    for (let k = 0; k < 8; k++) {
      const d = new Date(now); d.setDate(d.getDate() + k);
      const idx = (d.getDay() + 6) % 7; // lundi = 0
      for (const c of creneaux[idx] || []) {
        const ouv = dateA(now, k, h2m(c.ouverture));
        const fer = dateA(now, k, h2m(c.fermeture));
        if (now >= ouv && now < fer) return { ouvert: true, quand: fer, jour: JOURS[d.getDay()], heure: c.ouverture };
        if (ouv > now) return { ouvert: false, quand: ouv, jour: JOURS[d.getDay()], heure: c.ouverture };
      }
    }
    return null;
  };
  const deux = (n: number) => String(n).padStart(2, '0');
  const poser = (c: Element | null, v: string) => { if (c && c.firstChild) c.firstChild.textContent = v; };
  let dernier = '';
  const tick = () => {
    const now = new Date();
    const r = calcul(now);
    if (!r) { if (lib) lib.textContent = 'Horaires'; return; }
    const prochain = `${r.jour} ${r.heure}`;
    if (r.ouvert) {
      el.classList.add('is-ouvert');
      if (lib) lib.textContent = "C'est ouvert";
      const fin = r.quand.toTimeString().slice(0, 5);
      poser(cases.j, ''); poser(cases.h, `jusqu'à ${fin}`); poser(cases.m, ''); poser(cases.s, '');
      if (texte) texte.textContent = `Service en cours jusqu'à ${fin}. Réserver une table.`;
      if (hover) hover.textContent = 'Réserver une table';
    } else {
      el.classList.remove('is-ouvert');
      if (lib) lib.textContent = 'Prochain service';
      const diff = Math.max(0, Math.floor((r.quand.getTime() - now.getTime()) / 1000));
      const j = Math.floor(diff / 86400), h = Math.floor((diff % 86400) / 3600), m = Math.floor((diff % 3600) / 60), s = diff % 60;
      poser(cases.j, deux(j)); poser(cases.h, deux(h)); poser(cases.m, deux(m)); poser(cases.s, reduit ? '' : deux(s));
      const t = `Prochain service ${prochain}, dans ${j} jours ${h} heures ${m} minutes. Réserver une table.`;
      if (texte && t !== dernier) { texte.textContent = t; dernier = t; }
      if (hover) hover.textContent = `Prochain créneau : ${prochain}`;
    }
    el.classList.add('is-ready');
  };
  tick();
  const id = window.setInterval(tick, reduit ? 60000 : 1000);
  return () => { window.clearInterval(id); };
}

/** Carrousel des gens : les flèches rondes déplacent la piste d'une carte ; la piste reste défilable au doigt et au clavier. */
function gens() {
  const roots = [...document.querySelectorAll<HTMLElement>('[data-gens]')];
  const offs: (() => void)[] = [];
  roots.forEach((root) => {
    const piste = root.querySelector<HTMLElement>('[data-gens-piste]');
    if (!piste) return;
    const pas = () => (piste.firstElementChild as HTMLElement | null)?.offsetWidth ?? 300;
    const prev = () => piste.scrollBy({ left: -pas() - 24, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    const next = () => piste.scrollBy({ left: pas() + 24, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    const bp = root.querySelector('[data-gens-prev]'), bn = root.querySelector('[data-gens-next]');
    bp?.addEventListener('click', prev); bn?.addEventListener('click', next);
    offs.push(() => { bp?.removeEventListener('click', prev); bn?.removeEventListener('click', next); });
  });
  return () => offs.forEach((o) => o());
}

/** Fiches du catalogue : stagger de scale 0,96 → 1 à l'entrée dans l'écran (rien n'est caché sans motion). */
function fiches() {
  const items = [...document.querySelectorAll<HTMLElement>('[data-fiche]')];
  if (!items.length || prefersReducedMotion()) return () => {};
  gsap.set(items, { scale: 0.96, autoAlpha: 0 });
  const ts = ScrollTrigger.batch(items, {
    start: 'top 92%', once: true,
    onEnter: (b) => gsap.to(b, { scale: 1, autoAlpha: 1, duration: 0.9, stagger: 0.07, ease: ease.out, overwrite: true, clearProps: 'transform,opacity' }),
  });
  return () => { ts.forEach((t) => t.kill()); gsap.set(items, { clearProps: 'all' }); };
}
