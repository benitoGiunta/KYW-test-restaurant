// Motion « Verger » : loader branche, rideau qui pousse depuis le bas, intro du hero (mots depuis la ligne de base),
// roue des saisons (pin + scrub, mois réel en haut, contre-rotation par variable CSS), dérive idle, FAQ exclusive.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setLoaderFormat, setLoaderExit, setTransition, ease, onPage, prefersReducedMotion, isMobile, scrollToTarget } from '../engine';

gsap.registerPlugin(ScrollTrigger);
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

export function setupMotion() {
  // Loader : les feuilles se remplissent avec la progression ; le compteur (sr-only) garde le format du moteur.
  const feuilles = [...document.querySelectorAll<SVGPathElement>('#loader [data-feuille]')];
  setLoaderFormat((p) => {
    const n = Math.round((p / 100) * 12);
    feuilles.forEach((f, i) => f.classList.toggle('is-on', i < n));
    return String(Math.round(p)).padStart(3, '0');
  });
  setLoaderExit((root) =>
    gsap.timeline()
      .to(root.querySelectorAll('[data-loader-out], .loader__branche'), { y: -24, autoAlpha: 0, duration: 0.3, ease: ease.inOut, stagger: 0.04 })
      .to(root, { yPercent: -110, duration: 0.6, ease: ease.inOut }, '-=0.2'),
  );
  // Rideau : pousse depuis le bas, se replie vers le haut.
  setTransition({
    leave: (c) => gsap.timeline().set(c, { autoAlpha: 1 }).fromTo(c.querySelector('.curtain__panel'), { scaleY: 0, transformOrigin: 'bottom' }, { scaleY: 1, duration: 0.7, ease: ease.inOut }),
    enter: (c) => gsap.timeline().to(c.querySelector('.curtain__panel'), { scaleY: 0, transformOrigin: 'top', duration: 0.8, ease: ease.inOut }).set(c, { autoAlpha: 0 }),
  });

  onPage(({ intro }) => {
    const cleanups = [heroIntro(intro), roue(), faq()];
    return () => cleanups.forEach((c) => c());
  });
}

/** Hero : tout est peint au premier rendu ; les mots poussent depuis la ligne de base, la vignette se pose (desktop + motion). */
function heroIntro(intro: gsap.core.Timeline) {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero || prefersReducedMotion() || isMobile()) return () => {};
  const mots = hero.querySelectorAll('[data-mots] > span');
  const media = hero.querySelector('[data-hero-media]');
  const apres = hero.querySelectorAll('[data-hero-apres]');
  const tl = gsap.timeline({ paused: true });
  tl.fromTo(mots, { y: '0.5em', autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2, ease: ease.out, stagger: 0.09 }, 0);
  if (media) tl.fromTo(media, { scale: 0.94, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.3, ease: ease.out }, 0.3);
  if (apres.length) tl.fromTo(apres, { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: ease.out, stagger: 0.1 }, 0.7);
  intro.add(() => tl.play(), 0);
  return () => { tl.kill(); };
}

/** Roue des saisons : --rot tourne de 360° sur la section épinglée ; légende du mois en haut ; dérive idle ; boutons des mois. */
function roue() {
  const root = document.querySelector<HTMLElement>('[data-roue]');
  if (!root) return () => {};
  const stage = root.querySelector<HTMLElement>('[data-roue-stage]')!;
  const ingredients = JSON.parse(root.dataset.ingredients || '[]') as { n: string; m: number[] }[];
  const legMois = root.querySelector<HTMLElement>('[data-roue-legende-mois]');
  const legListe = root.querySelector<HTMLElement>('[data-roue-legende-liste]');
  const vigs = [...root.querySelectorAll<HTMLElement>('[data-vig]')];
  const boutons = [...root.querySelectorAll<HTMLButtonElement>('[data-mois-btn]')];
  const courant = parseInt(document.documentElement.dataset.mois || '1') || 1;
  const rot0 = -(courant - 1) * 30;
  const cleanups: (() => void)[] = [];
  let actif = courant;

  const montrer = (m: number) => {
    if (m === actif) return;
    actif = m;
    if (legMois) legMois.textContent = MOIS[m - 1];
    if (legListe) legListe.textContent = ' · ' + ingredients.filter((i) => i.m.includes(m)).map((i) => i.n).join(', ');
    vigs.forEach((v) => v.classList.toggle('is-top', (v.dataset.moisVig || '').split(',').map(Number).includes(m)));
    boutons.forEach((b) => b.setAttribute('aria-pressed', String(parseInt(b.dataset.moisBtn!) === m)));
  };
  boutons.forEach((b) => { if (parseInt(b.dataset.moisBtn!) === courant) b.dataset.courant = ''; });
  actif = 0; montrer(courant);

  const reduit = prefersReducedMotion();
  const vars = { rot: rot0, derive: 0 };
  // Révision 1 : un nom de mois qui passe dans la moitié basse du disque est retourné de 180° pour rester lisible.
  const textesMois = [...root.querySelectorAll<SVGTextElement>('[data-secteur-mois]')];
  const retournes = textesMois.map(() => false);
  const redresser = (r: number) => textesMois.forEach((t, i) => {
    const a0 = parseFloat(t.dataset.angle || '0');
    const abs = (((a0 + r) % 360) + 360) % 360;
    const f = abs > 90 && abs < 270;
    if (f === retournes[i]) return;
    retournes[i] = f;
    t.setAttribute('transform', `rotate(${a0 + (f ? 180 : 0)} ${t.getAttribute('x')} ${t.getAttribute('y')})`);
  });
  const peindre = () => {
    root.style.setProperty('--rot', `${vars.rot}deg`);
    root.style.setProperty('--derive', `${vars.derive}deg`);
    redresser(vars.rot + vars.derive);
    const enHaut = ((Math.round(-(vars.rot + vars.derive) / 30) % 12) + 12) % 12 + 1;
    montrer(enHaut);
  };
  let st: ScrollTrigger | undefined;
  let tick: ((t: number, dt: number) => void) | undefined;
  if (!reduit) {
    const tween = gsap.fromTo(vars, { rot: rot0 }, {
      rot: rot0 - 360, ease: 'none', onUpdate: peindre,
      scrollTrigger: { trigger: root, pin: stage, start: 'top top', end: isMobile() ? '+=200%' : '+=300%', scrub: 1, anticipatePin: 1,
        onToggle: (self) => { enVue = self.isActive; } },
    });
    st = tween.scrollTrigger;
    let enVue = false;
    // Idle : dérive de 0,2°/s tant que la section est visible (un seul idle sur le site).
    tick = (_t, dt) => { if (!enVue) return; vars.derive += (dt / 1000) * 0.2; peindre(); };
    gsap.ticker.add(tick);
  }
  peindre();

  // Boutons : au clavier et au clic, on amène le mois en haut (scroll dans la piste en motion, rotation directe sinon).
  boutons.forEach((b) => {
    const h = () => {
      const m = parseInt(b.dataset.moisBtn!);
      if (st) { const p = ((m - courant + 12) % 12) / 12; scrollToTarget(st.start + p * (st.end - st.start)); }
      else { vars.rot = -(m - 1) * 30; peindre(); }
    };
    b.addEventListener('click', h);
    cleanups.push(() => b.removeEventListener('click', h));
  });
  // Survol d'un secteur : la légende montre les produits de ce mois.
  root.querySelectorAll<SVGPathElement>('[data-secteur]').forEach((s) => {
    const h = () => montrer(parseInt(s.dataset.secteur!));
    const l = () => peindre();
    s.addEventListener('pointerenter', h); s.addEventListener('pointerleave', l);
    cleanups.push(() => { s.removeEventListener('pointerenter', h); s.removeEventListener('pointerleave', l); });
  });
  return () => { if (tick) gsap.ticker.remove(tick); cleanups.forEach((c) => c()); root.style.removeProperty('--rot'); root.style.removeProperty('--derive'); };
}

/** FAQ : une réponse ouverte à la fois (secours pour les navigateurs sans `details name`). */
function faq() {
  const faq = document.querySelector<HTMLElement>('[data-faq]');
  if (!faq) return () => {};
  const details = [...faq.querySelectorAll<HTMLDetailsElement>('details')];
  const h = (e: Event) => { const d = e.target as HTMLDetailsElement; if (d.open) details.forEach((o) => { if (o !== d) o.open = false; }); };
  details.forEach((d) => d.addEventListener('toggle', h));
  return () => details.forEach((d) => d.removeEventListener('toggle', h));
}
