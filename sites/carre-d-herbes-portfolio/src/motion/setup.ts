// Motion « Velours » : tout se dévoile comme un rideau. Loader = rideau baissé qui se lève ; transition de page = même
// rideau ; chaque chapitre = pan vert sapin levé une fois ; chiffre cuivre qui compte ; citation dont les mots s'allument
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
      .to(root.querySelector('[data-loader-bar]'), { scaleX: 0, transformOrigin: 'right', duration: 0.25, ease: ease.inOut })
      .to(root.querySelectorAll('[data-loader-out]'), { yPercent: -110, duration: 0.4, ease: ease.inOut, stagger: 0.04 }, '<')
      .to(root, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.75, ease: ease.inOut }, '-=0.2'),
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
    const cleanups = [heroIntro(intro), carre(intro), progres(), rideaux(), compteurs(), citation(), galerie(), copie(), onglets()];
    return () => cleanups.forEach((c) => c());
  });
}

/** Hero : les mots du nom montent dans leur masque en stagger, à la fin du loader (desktop). En mobile et en reduced
 *  motion le nom est peint au premier rendu : rien ne dépend du JS pour le lire. */
function heroIntro(intro: gsap.core.Timeline) {
  const mots = document.querySelectorAll<HTMLElement>('[data-hero-mot]');
  if (!mots.length || prefersReducedMotion() || isMobile()) return () => {};
  gsap.set(mots, { yPercent: 110 });
  const tl = gsap.timeline({ paused: true }).to(mots, { yPercent: 0, duration: 1.1, ease: ease.out, stagger: 0.08 });
  intro.add(() => tl.play(), 0.1);
  return () => { tl.kill(); gsap.set(mots, { clearProps: 'transform' }); };
}

/** Rideau : un pan vert sapin par section [data-rideau], levé une fois quand la section arrive au tiers de l'écran.
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

/** Onglets à barre : la barre cuivre de l'onglet actif se remplit en 6 s puis passe au suivant ; pause au survol ou au
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
  const pauseBtn = document.querySelector<HTMLButtonElement>('[data-onglets-pause]');
  let manuel = false;
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
  on(root, 'pointerleave', () => { if (!manuel) tween?.play(); });
  on(root, 'focusin', () => tween?.pause());
  on(root, 'focusout', () => { if (!manuel) tween?.play(); });
  if (pauseBtn && !reduced) {
    pauseBtn.hidden = false;
    on(pauseBtn, 'click', () => {
      manuel = !manuel;
      pauseBtn.setAttribute('aria-pressed', String(manuel));
      pauseBtn.textContent = manuel ? 'Reprendre le défilement des offres' : 'Suspendre le défilement des offres';
      if (manuel) tween?.pause(); else tween?.play();
    });
  }
  // La rotation ne tourne que quand le bloc est à l'écran (une horloge, en pause hors champ).
  const st = ScrollTrigger.create({ trigger: root, start: 'top bottom', end: 'bottom top', onEnter: () => { if (!manuel) tween?.play(); }, onEnterBack: () => { if (!manuel) tween?.play(); }, onLeave: () => tween?.pause(), onLeaveBack: () => tween?.pause() });
  lance();
  if (!st.isActive) tween?.pause();
  return () => { tween?.kill(); st.kill(); if (pauseBtn) pauseBtn.hidden = true; handlers.forEach(([t, ev, fn]) => t.removeEventListener(ev, fn)); };
}

/** Signature « carré d'herbes » : le carré du potager se trace autour du hero (filet cuivre, 1,6 s) puis ses quatre coins
 *  se plantent un à un ; le hero qui défile le fait respirer (la photo recule de 8 %). Statique en reduced motion et en
 *  mobile pour les coins ; le tracé est peint par défaut, l'état de départ ne vit que sous `.motion`. */
function carre(intro: gsap.core.Timeline) {
  const trait = document.querySelector<SVGRectElement>('[data-carre-trait]');
  const coins = document.querySelectorAll<HTMLElement>('[data-carre-coin]');
  const photo = document.querySelector<HTMLElement>('.hero__photo img');
  if (!trait || prefersReducedMotion()) return () => {};
  const tl = gsap.timeline({ paused: true })
    .fromTo(trait, { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 1.6, ease: ease.inOut }, 0)
    .fromTo(coins, { scale: 0 }, { scale: 1, duration: 0.6, ease: ease.out, stagger: 0.18 }, 0.5);
  if (photo) tl.fromTo(photo, { scale: 1.1 }, { scale: 1, duration: 2.2, ease: ease.out }, 0);
  intro.add(() => tl.play(), 0.2);
  const st = photo ? gsap.to(photo, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: true } }) : null;
  return () => { tl.kill(); st?.scrollTrigger?.kill(); st?.kill(); gsap.set([trait, ...coins, ...(photo ? [photo] : [])], { clearProps: 'all' }); };
}

/** Filet de progression de l'en-tête : `--progres` (0 à 1) suit le défilement de la page, rendu par `.header::after`. */
function progres() {
  if (prefersReducedMotion()) return () => {};
  const header = document.querySelector<HTMLElement>('.header');
  if (!header) return () => {};
  const st = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (self) => header.style.setProperty('--progres', self.progress.toFixed(4)) });
  return () => { st.kill(); header.style.removeProperty('--progres'); };
}

/** Galerie : glisser à la souris, clavier (flèches sur la bande focalisable), et sur écran tactile les photos se colorent
 *  quand elles passent au centre de la bande (pas de survol sur mobile). */
function galerie() {
  const bande = document.querySelector<HTMLElement>('[data-galerie]');
  if (!bande) return () => {};
  const items = [...bande.querySelectorAll<HTMLElement>('.galerie__item')];
  let io: IntersectionObserver | null = null;
  if (matchMedia('(hover: none)').matches) {
    io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('is-vu', e.isIntersecting)), { root: bande, rootMargin: '0px -30% 0px -30%', threshold: 0.2 });
    items.forEach((i) => io!.observe(i));
  }
  // Focalisable seulement quand elle défile (sinon un arrêt clavier inutile).
  const focalisable = () => { if (bande.scrollWidth > bande.clientWidth + 1) bande.tabIndex = 0; else bande.removeAttribute('tabindex'); };
  focalisable();
  const ro = new ResizeObserver(focalisable);
  ro.observe(bande);
  let x0 = 0, s0 = 0, drag = false;
  const down = (e: PointerEvent) => { if (e.pointerType !== 'mouse' || e.button !== 0) return; drag = true; x0 = e.clientX; s0 = bande.scrollLeft; };
  const move = (e: PointerEvent) => { if (!drag) return; const dx = e.clientX - x0; if (Math.abs(dx) > 4) bande.classList.add('is-drag'); bande.scrollLeft = s0 - dx; };
  const up = () => { drag = false; bande.classList.remove('is-drag'); };
  const key = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    bande.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * Math.min(bande.clientWidth * 0.6, 360), behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };
  bande.addEventListener('pointerdown', down);
  addEventListener('pointermove', move);
  addEventListener('pointerup', up);
  bande.addEventListener('keydown', key);
  bande.addEventListener('dragstart', (e) => e.preventDefault());
  return () => { io?.disconnect(); ro.disconnect(); bande.removeEventListener('pointerdown', down); removeEventListener('pointermove', move); removeEventListener('pointerup', up); bande.removeEventListener('keydown', key); };
}

/** Réservation : « Copier le numéro » (bouton montré seulement si le presse-papiers est disponible), annonce lue en direct. */
function copie() {
  const btn = document.querySelector<HTMLButtonElement>('[data-copie]');
  const etat = document.querySelector<HTMLElement>('[data-copie-etat]');
  if (!btn || !navigator.clipboard) return () => {};
  btn.hidden = false;
  let t = 0;
  const clic = async () => {
    try { await navigator.clipboard.writeText(btn.dataset.copie || ''); btn.textContent = 'Numéro copié'; if (etat) etat.textContent = 'Numéro copié dans le presse-papiers'; }
    catch { btn.textContent = 'Copie impossible, appelez-nous'; if (etat) etat.textContent = 'Copie impossible'; }
    clearTimeout(t); t = window.setTimeout(() => { btn.textContent = 'Copier le numéro'; if (etat) etat.textContent = ''; }, 2400);
  };
  btn.addEventListener('click', clic);
  return () => { btn.removeEventListener('click', clic); clearTimeout(t); };
}
