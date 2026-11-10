// Module pilote « L'échelle ». Une seule variable porte le concept : le prix, de 0 à 40 €, lu au cran (1 €).
// - repos : le trait de lecture parcourt la règle du hero en 18 s, cran par cran (gsap.ticker, en pause hors écran) ;
// - pointeur : au-dessus de la règle, le trait se cale sur l'euro le plus proche du pointeur ;
// - curseur de budget : l'épingle rejoint la valeur en passant chaque cran, les lignes hors budget passent en retrait ;
// - carte : survoler un plat place le curseur de sa rubrique à son prix ;
// - entrée : la règle se trace par crans, les épingles tombent sur leur trait.
// Tout le code DOM tourne dans onPage() (nettoyage rendu) ; rien au niveau module.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, prefersReducedMotion, isTouch } from '../engine';
import { ECHELLE_MAX, eur, phraseBudget } from '../data/site';

const CRAN_IDLE = 18 / ECHELLE_MAX; // 18 s pour parcourir 0 à 40 €

/** Repos : le trait de lecture avance d'un euro toutes les 0,45 s ; le pointeur le reprend. */
function startIdle(regle: HTMLElement) {
  const trait = regle.querySelector<HTMLElement>('.echelle__lecture');
  const chiffre = trait?.querySelector('i');
  if (!trait || !chiffre) return () => {};
  let t = 0;
  let visible = true;
  let pointeur: number | null = null;
  let affiche = -1;
  const place = (euro: number) => {
    if (euro === affiche) return;
    affiche = euro;
    gsap.set(trait, { x: (regle.clientWidth * euro) / ECHELLE_MAX });
    chiffre.textContent = eur(euro);
    trait.classList.toggle('a-droite', euro > ECHELLE_MAX - 5);
  };
  const tick = (_time: number, dt: number) => {
    if (!visible) return;
    if (pointeur !== null) return place(pointeur);
    t += dt / 1000;
    place(Math.floor(t / CRAN_IDLE) % (ECHELLE_MAX + 1));
  };
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
  io.observe(regle);
  const zone = regle.closest<HTMLElement>('.hero__regle') ?? regle;
  const move = (e: PointerEvent) => {
    const r = regle.getBoundingClientRect();
    pointeur = Math.round(gsap.utils.clamp(0, 1, (e.clientX - r.left) / r.width) * ECHELLE_MAX);
  };
  const quitte = () => { if (pointeur !== null) t = pointeur * CRAN_IDLE; pointeur = null; };
  if (!isTouch()) { zone.addEventListener('pointermove', move); zone.addEventListener('pointerleave', quitte); }
  const resize = () => { affiche = -1; };
  addEventListener('resize', resize);
  trait.classList.add('est-actif');
  gsap.ticker.add(tick);
  return () => {
    gsap.ticker.remove(tick);
    io.disconnect();
    removeEventListener('resize', resize);
    zone.removeEventListener('pointermove', move);
    zone.removeEventListener('pointerleave', quitte);
  };
}

/** Curseur de budget : l'épingle passe chaque cran entre l'ancienne et la nouvelle valeur. */
function initBudget(box: HTMLElement, anime: boolean) {
  const input = box.querySelector<HTMLInputElement>('input[type=range]');
  const chiffre = box.querySelector<HTMLElement>('[data-budget-chiffre]');
  const phrase = box.querySelector<HTMLElement>('[data-budget-phrase]');
  if (!input || !chiffre || !phrase) return () => {};
  const cibles = [...document.querySelectorAll<HTMLElement>(box.dataset.cible || '.x')];
  const points = [...document.querySelectorAll<HTMLElement>('.echelle__point[data-prix]')];
  const etat = { v: Number(input.value) };
  let tween: gsap.core.Tween | null = null;
  let timer = 0;
  const ecrire = (v: number) => {
    box.style.setProperty('--prix', String(v));
    chiffre.textContent = eur(v);
  };
  const applique = () => {
    const b = Number(input.value);
    input.setAttribute('aria-valuetext', `${b} euros`);
    cibles.forEach((el) => el.classList.toggle('est-hors', Number(el.dataset.prix) > b));
    points.forEach((el) => el.classList.toggle('est-hors', Number(el.dataset.prix) > b));
    clearTimeout(timer);
    timer = window.setTimeout(() => { phrase.textContent = phraseBudget(b); }, 160); // une annonce par geste
    tween?.kill();
    const crans = Math.abs(b - Math.round(etat.v));
    if (!anime || crans === 0) { etat.v = b; return ecrire(b); }
    tween = gsap.to(etat, { v: b, duration: Math.min(0.45, 0.03 * crans + 0.08), ease: `steps(${crans})`, onUpdate: () => ecrire(Math.round(etat.v)) });
  };
  input.addEventListener('input', applique);
  applique();
  return () => { input.removeEventListener('input', applique); tween?.kill(); clearTimeout(timer); };
}

/** Carte : le curseur de la rubrique se place au prix du plat survolé. */
function initCurseurs(anime: boolean) {
  const offs: (() => void)[] = [];
  document.querySelectorAll<HTMLElement>('.bloc').forEach((bloc) => {
    const regle = bloc.querySelector<HTMLElement>('.bloc__regle');
    if (!regle) return;
    const curseur = document.createElement('span');
    curseur.className = 'echelle__curseur';
    regle.append(curseur);
    const p = { v: 0 };
    const va = (prix: number) => {
      curseur.classList.add('est-visible');
      const crans = Math.max(1, Math.round(Math.abs(prix - p.v)));
      gsap.to(p, { v: prix, duration: anime ? Math.min(0.4, 0.02 * crans + 0.1) : 0, ease: `steps(${crans})`, overwrite: true,
        onUpdate: () => curseur.style.setProperty('--p', String(p.v)) });
    };
    const over = (e: Event) => {
      const li = (e.target as HTMLElement).closest<HTMLElement>('.plat');
      if (li) va(Number(li.dataset.prix));
    };
    const out = () => curseur.classList.remove('est-visible');
    const liste = bloc.querySelector('.plats');
    liste?.addEventListener('pointerover', over);
    liste?.addEventListener('pointerleave', out);
    offs.push(() => { liste?.removeEventListener('pointerover', over); liste?.removeEventListener('pointerleave', out); curseur.remove(); });
  });
  return () => offs.forEach((f) => f());
}

/** Entrée : la règle se trace par crans, les épingles tombent ; les règles de section se tracent à l'entrée dans l'écran. */
function initTrace(intro: gsap.core.Timeline) {
  const hero = document.querySelector<HTMLElement>('.hero .echelle, .horsechelle .echelle');
  if (hero) {
    const traits = hero.querySelector('.echelle__traits');
    const pins = hero.querySelectorAll('.echelle__pin');
    intro.fromTo(traits, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: `steps(${ECHELLE_MAX})` }, 0.1);
    intro.fromTo(hero.querySelectorAll('.echelle__chiffres span'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, stagger: 0.16 }, 0.1);
    pins.forEach((pin, i) => {
      const b = pin.querySelector('b');
      intro.fromTo(pin, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.4, ease: 'steps(4)' }, 0.35 + i * 0.08);
      intro.fromTo(b, { y: -16 }, { y: 0, duration: 0.4, ease: 'steps(4)' }, 0.35 + i * 0.08);
    });
  }
  document.querySelectorAll<HTMLElement>('.rang__regle, .bloc__regle, .pied__regle, .budget__regle').forEach((r) => {
    const traits = r.querySelector('.echelle__traits');
    const remplis = r.querySelectorAll('.echelle__plage, .echelle__point');
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(traits, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'steps(20)' });
    if (remplis.length) tl.fromTo(remplis, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.3, ease: 'steps(3)', stagger: 0.04 }, 0.35);
    ScrollTrigger.create({ trigger: r, start: 'top 88%', once: true, onEnter: () => tl.play() });
  });
}

export function setupEchelle() {
  onPage(({ intro }) => {
    const anime = !prefersReducedMotion();
    const offs: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>('[data-budget]').forEach((b) => offs.push(initBudget(b, anime)));
    if (document.querySelector('.bloc')) offs.push(initCurseurs(anime));
    if (anime) {
      initTrace(intro);
      const regle = document.querySelector<HTMLElement>('.hero .echelle');
      if (regle) offs.push(startIdle(regle));
    }
    return () => offs.forEach((f) => f());
  });
}
