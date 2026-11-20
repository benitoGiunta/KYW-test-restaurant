// Motion « Collage » : tout se colle. Loader (cases qui se collent), rideau latéral, intro du hero, logo-étiquette qui
// absorbe le nom de la section courante (ScrollTrigger onToggle), dérive idle de la tasse, menu mobile, formulaires de démo.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setLoaderFormat, setLoaderExit, setTransition, ease, onPage, prefersReducedMotion, isMobile, scrollToTarget } from '../engine';

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
    const cleanups = [heroIntro(intro), logoSection(), cadresColles(), sommaire(), etatOuverture(), derive(), menuMobile(), formulaires()];
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
      trigger: s,
      // Un page-hero est plus court que la ligne à 45 % : il reste actif jusqu'à ce que son bas atteigne 15 % de l'écran.
      start: s.classList.contains('page-hero') ? 'top bottom' : 'top 45%',
      end: s.classList.contains('page-hero') ? 'bottom 15%' : 'bottom 45%',
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

/** Signature : chaque photo d'activité se pose de travers puis se colle (rotation et échelle liées au défilement). */
function cadresColles() {
  if (prefersReducedMotion()) return () => {};
  const cadres = [...document.querySelectorAll<HTMLElement>('.aplat .split .cadre')];
  const tweens = cadres.map((c, i) => {
    const sens = i % 2 ? -1 : 1;
    return gsap.fromTo(c, { rotate: 3 * sens, scale: 1.05 }, {
      rotate: -0.8 * sens, scale: 1, ease: 'none',
      scrollTrigger: { trigger: c, start: 'top 98%', end: 'top 45%', scrub: 0.5 },
    });
  });
  return () => tweens.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); gsap.set(t.targets(), { clearProps: 'transform' }); });
}

/** Sommaire de la carte : la rubrique visible allume sa pastille (aria-current) et la fait défiler dans la barre. */
function sommaire() {
  const barre = document.querySelector<HTMLElement>('[data-sommaire]');
  if (!barre) return () => {};
  const liens = [...barre.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
  const cibles = liens.map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter(Boolean) as HTMLElement[];
  const visibles = new Set<HTMLElement>();
  const allumer = () => {
    const premiere = cibles.find((c) => visibles.has(c));
    liens.forEach((a) => {
      const on = !!premiere && a.hash === `#${premiere.id}`;
      if (on) { if (a.getAttribute('aria-current') !== 'true') { a.setAttribute('aria-current', 'true'); const l = a.offsetLeft - (barre.clientWidth - a.offsetWidth) / 2; barre.scrollTo({ left: l, behavior: prefersReducedMotion() ? 'auto' : 'smooth' }); } }
      else a.removeAttribute('aria-current');
    });
  };
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => (e.isIntersecting ? visibles.add(e.target as HTMLElement) : visibles.delete(e.target as HTMLElement)));
    allumer();
  }, { rootMargin: '-25% 0px -60% 0px' });
  cibles.forEach((c) => io.observe(c));
  // Défilement par clic : décalé de la barre fixe et de la barre du sommaire ; le focus suit la cible.
  const clic = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    const cible = a && document.getElementById(decodeURIComponent(a.hash.slice(1)));
    if (!a || !cible) return;
    e.preventDefault();
    const haut = (document.querySelector('.header')?.getBoundingClientRect().height ?? 0) + barre.getBoundingClientRect().height + 12;
    const y = cible.getBoundingClientRect().top + window.scrollY - haut;
    if (prefersReducedMotion()) window.scrollTo({ top: y }); else scrollToTarget(y);
    history.replaceState(null, '', a.hash);
    cible.setAttribute('tabindex', '-1');
    cible.focus({ preventScroll: true });
  };
  barre.addEventListener('click', clic);
  return () => { io.disconnect(); barre.removeEventListener('click', clic); };
}

/** État d'ouverture calculé depuis les horaires de la page (Europe/Brussels), jamais depuis l'heure du visiteur. */
interface Jour { jour: string; creneaux: { ouverture: string; fermeture: string }[] }
/** Exception datée (jours de fêtes) : md = « MM-JJ » ; ferme = fermé toute la journée ; fermeture = heure de fermeture ce jour-là. */
interface Exception { md: string; ferme?: boolean; fermeture?: string }
const JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const hm = (t: string) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
const lisible = (t: string) => { const [h, m] = t.split(':'); return m === '00' ? `${Number(h)}h` : `${Number(h)}h${m}`; };
const fmt = (maintenant: Date) => {
  const f = new Intl.DateTimeFormat('fr-BE', { timeZone: 'Europe/Brussels', weekday: 'long', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  const p = Object.fromEntries(f.formatToParts(maintenant).map((x) => [x.type, x.value]));
  return { idx: JOURS.indexOf(String(p.weekday).toLowerCase()), md: `${p.month}-${p.day}`, min: Number(p.hour) * 60 + Number(p.minute) };
};
export function etatOuvertureTexte(horaires: Jour[], maintenant: Date, exceptions: Exception[] = []) {
  const { idx, md, min } = fmt(maintenant);
  const jour = (i: number) => horaires.find((h) => h.jour === JOURS[(i + 7) % 7]);
  const exc = (m: string) => exceptions.find((e) => e.md === m);
  // Créneaux d'un jour, exceptions comprises (null = jour exceptionnel ouvert sans horaires connus).
  const creneauxDe = (i: number, m: string) => {
    const e = exc(m);
    const base = jour(i)?.creneaux ?? [];
    if (e?.ferme) return [];
    if (e?.fermeture) return (base.length ? base : [{ ouverture: '08:00', fermeture: e.fermeture }]).map((c) => ({ ...c, fermeture: e.fermeture! }));
    if (e && !base.length) return null;
    return base;
  };
  const auj = creneauxDe(idx, md);
  if (auj === null) return { ouvert: true, texte: 'Ouvert aujourd\u2019hui (jour de fêtes)' };
  const en = auj.find((c) => min >= hm(c.ouverture) && min < hm(c.fermeture));
  if (en) return { ouvert: true, texte: `Ouvert jusqu\u2019à ${lisible(en.fermeture)}` };
  const plus = auj.find((c) => min < hm(c.ouverture));
  if (plus) return { ouvert: false, texte: `Fermé, ouvre à ${lisible(plus.ouverture)}` };
  for (let d = 1; d <= 14; d++) {
    const g = fmt(new Date(maintenant.getTime() + d * 86400000));
    const c = creneauxDe(g.idx, g.md);
    if (c === null) return { ouvert: false, texte: `Fermé, ouvre ${d === 1 ? 'demain' : JOURS[g.idx]}` };
    if (c.length) return { ouvert: false, texte: `Fermé, ouvre ${d === 1 ? 'demain' : JOURS[g.idx]} à ${lisible(c[0].ouverture)}` };
  }
  return null;
}
function etatOuverture() {
  const els = [...document.querySelectorAll<HTMLElement>('[data-ouvert]')];
  if (!els.length) return () => {};
  const maj = () => els.forEach((el) => {
    let h: Jour[] = [];
    try { h = JSON.parse(el.dataset.horaires || '[]'); } catch { /* données absentes : rien à afficher */ }
    let x: Exception[] = [];
    try { x = JSON.parse(el.dataset.exceptions || '[]'); } catch { /* sans exceptions */ }
    const e = etatOuvertureTexte(h, new Date(), x);
    el.textContent = e ? e.texte : '';
    el.dataset.etat = e ? (e.ouvert ? 'ouvert' : 'ferme') : '';
  });
  maj();
  const t = window.setInterval(maj, 60000);
  return () => window.clearInterval(t);
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
