// Pilote « tamis » : une seule variable, la part de la page déjà passée (défilement 0 à 1), lue comme
// un taux d'extraction de 65 à 80 %. Elle est distribuée à la jauge de l'en-tête (chiffre + filet), aux
// barreaux de l'échelle (scrub) et au filet du pied. Le pointeur écarte les grains de farine du hero ;
// startIdle() fait tomber ces grains quand le visiteur ne fait rien. Une horloge : gsap.ticker.
// Aucun code DOM au niveau module : tout passe par onPage() avec nettoyage.
import { gsap } from 'gsap';
import { onPage, onScroll, ease, prefersReducedMotion, stopScroll, startScroll } from '../engine';

const TAUX_MIN = 65;
const TAUX_MAX = 80;

let jaugeTaux: HTMLElement | null = null;
let jaugeBarre: HTMLElement | null = null;
let dernierTaux = -1;

function ecrireJauge(p: number) {
  if (!jaugeTaux) return;
  const q = Math.min(1, Math.max(0, p));
  if (jaugeBarre) gsap.set(jaugeBarre, { scaleX: q });
  const t = Math.round(TAUX_MIN + (TAUX_MAX - TAUX_MIN) * q);
  if (t !== dernierTaux) { jaugeTaux.textContent = String(t); dernierTaux = t; }
}

/** Repos : les grains de farine tombent à vitesse constante dans le chiffre du hero et reviennent par le haut. */
function startIdle(zone: HTMLElement): () => void {
  const grains = Array.from(zone.querySelectorAll<HTMLElement>('i'));
  if (!grains.length || prefersReducedMotion()) return () => {};
  const etat = grains.map((g, i) => ({
    g,
    y: (parseFloat(g.style.top) || 0) / 100, // part de la hauteur ; le décalage passe ensuite par y
    vitesse: 0.05 + ((i * 7) % 5) * 0.012, // part de la hauteur par seconde
    phase: i * 1.7,
    ecart: 0,
  }));
  gsap.set(grains, { top: 0 });
  let h = zone.clientHeight;
  let w = zone.clientWidth;
  let px = -9999;
  let actif = false;
  const wrap = gsap.utils.wrap(-0.08, 1.04);

  const tick = (_t: number, dt: number) => {
    const s = Math.min(dt, 64) / 1000;
    for (const e of etat) {
      e.y = wrap(e.y + e.vitesse * s);
      const gx = e.g.offsetLeft;
      const d = gx - px;
      const cible = Math.abs(d) < 90 ? Math.sign(d || 1) * (90 - Math.abs(d)) * 0.6 : 0;
      e.ecart += (cible - e.ecart) * 0.08;
      e.phase += s * 0.9;
      gsap.set(e.g, { y: e.y * h, x: Math.sin(e.phase) * 6 + e.ecart });
    }
  };
  const go = () => { if (!actif) { actif = true; gsap.ticker.add(tick); } };
  const stop = () => { if (actif) { actif = false; gsap.ticker.remove(tick); } };
  const io = new IntersectionObserver(([en]) => (en.isIntersecting ? go() : stop()));
  io.observe(zone);
  const mesurer = () => { h = zone.clientHeight; w = zone.clientWidth; };
  const pointeur = (ev: PointerEvent) => {
    const r = zone.getBoundingClientRect();
    px = ev.clientX - r.left;
    if (px < -90 || px > w + 90) px = -9999;
  };
  const hero = zone.closest('section') ?? zone;
  hero.addEventListener('pointermove', pointeur);
  hero.addEventListener('pointerleave', () => { px = -9999; });
  addEventListener('resize', mesurer);
  return () => {
    stop();
    io.disconnect();
    hero.removeEventListener('pointermove', pointeur);
    removeEventListener('resize', mesurer);
  };
}

/** Menu plein écran sous 40 rem : aria-expanded, focus piégé, Échap, focus rendu au bouton. */
function initMenu(): () => void {
  const btn = document.querySelector<HTMLButtonElement>('.menu-btn');
  const nav = document.getElementById('nav-principale');
  const entete = document.querySelector<HTMLElement>('.entete');
  if (!btn || !nav || !entete) return () => {};
  const html = document.documentElement;
  const liens = () => [btn, ...Array.from(nav.querySelectorAll<HTMLElement>('a'))];
  const ouvert = () => btn.getAttribute('aria-expanded') === 'true';
  const fermer = (rendreFocus = true) => {
    if (!ouvert()) return;
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = 'Menu';
    entete.classList.remove('is-open');
    html.classList.remove('menu-ouvert');
    startScroll();
    if (rendreFocus) btn.focus();
  };
  const ouvrir = () => {
    btn.setAttribute('aria-expanded', 'true');
    btn.textContent = 'Fermer';
    html.classList.remove('frame-away');
    html.classList.add('menu-ouvert');
    entete.classList.add('is-open');
    stopScroll();
    if (!prefersReducedMotion()) {
      gsap.fromTo(nav.querySelectorAll('a'), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: ease.out });
    }
    nav.querySelector<HTMLElement>('a')?.focus();
  };
  const clic = () => (ouvert() ? fermer() : ouvrir());
  const touche = (e: KeyboardEvent) => {
    if (!ouvert()) return;
    if (e.key === 'Escape') { e.preventDefault(); fermer(); return; }
    if (e.key !== 'Tab') return;
    const l = liens();
    const i = l.indexOf(document.activeElement as HTMLElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); l[l.length - 1].focus(); }
    else if (!e.shiftKey && i === l.length - 1) { e.preventDefault(); l[0].focus(); }
  };
  const lien = (e: Event) => { if ((e.target as HTMLElement).closest('a')) fermer(false); };
  const mq = matchMedia('(min-width: 40.0625rem)');
  const large = () => { if (mq.matches) fermer(false); };
  btn.addEventListener('click', clic);
  document.addEventListener('keydown', touche);
  nav.addEventListener('click', lien);
  mq.addEventListener('change', large);
  return () => {
    fermer(false);
    gsap.set(nav.querySelectorAll('a'), { clearProps: 'transform,opacity,visibility' });
    btn.removeEventListener('click', clic);
    document.removeEventListener('keydown', touche);
    nav.removeEventListener('click', lien);
    mq.removeEventListener('change', large);
  };
}

export function initTamis() {
  onScroll(({ progress }) => ecrireJauge(progress));

  onPage(({ intro }) => {
    jaugeTaux = document.querySelector('.jauge__taux');
    jaugeBarre = document.querySelector('.jauge__barre');
    dernierTaux = -1;
    ecrireJauge(0);
    const nettoyages: (() => void)[] = [initMenu()];
    const reduit = prefersReducedMotion();

    if (!reduit) {
      // Signature : chaque barreau se remplit jusqu'à son taux pendant que la ligne traverse l'écran.
      document.querySelectorAll<HTMLElement>('.barreau, .pied__barre').forEach((el) => {
        gsap.fromTo(el, { '--b': 0 }, {
          '--b': 1,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 92%', end: 'top 50%', scrub: 0.6, invalidateOnRefresh: true },
        });
      });

      // Intro du hero : la photo du four se pose (déjà peinte, simple échelle), les grains entrent.
      const img = document.querySelector('.hero__media img');
      if (img) intro.add(gsap.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.6, ease: ease.out }), 0);
      const grains = document.querySelector<HTMLElement>('.grains');
      if (grains) {
        intro.add(gsap.fromTo(grains, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.9, ease: ease.soft }), 0.4);
        nettoyages.push(startIdle(grains));
      }
    }
    return () => nettoyages.forEach((n) => n());
  });
}
