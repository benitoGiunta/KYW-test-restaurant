// Module pilote « Du brut au feu » (patterns.md § 1). Une variable, le feu (0 = pièce crue en chambre bleue,
// 1 = braise), tirée de la progression dans la section des quatre gestes, distribuée à tout ce qui porte le concept :
// le fil des gestes (longueur et couleur), les rangs déjà passés. Le verbe « trancher » donne la signature :
// chaque photo s'ouvre par une coupe droite suivie d'une lame braise (une seule variable --coupe par photo).
// Entrées de repos : la photo du hero respire et suit un peu le pointeur, une lame la parcourt à vitesse constante.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, ease, prefersReducedMotion } from '../engine';
import { idle, startIdle } from './idle';

gsap.registerPlugin(ScrollTrigger);

const map = (p: number) => ({ feu: gsap.utils.clamp(0, 1, p), rang: Math.floor(gsap.utils.clamp(0, 1, p) * 4 + 0.15) });

let section: HTMLElement | null = null;
let gestes: HTMLElement[] = [];
let current = 0;

/** Applique l'état du feu : écrit une seule variable sur la section porteuse, jamais sur <html>. */
function apply(p: number) {
  if (!section) return;
  const s = map(p);
  section.style.setProperty('--feu', s.feu.toFixed(4));
  gestes.forEach((g, i) => g.classList.toggle('est-passe', i < s.rang));
}

/** La tranche : coupe droite de gauche à droite, lame braise au bord de la coupe. */
function initTranches() {
  document.querySelectorAll<HTMLElement>('[data-tranche]').forEach((el) => {
    el.classList.add('est-arme');
    gsap.set(el, { '--coupe': 0 });
    gsap.to(el, {
      '--coupe': 1,
      duration: 0.9,
      ease: ease.inOut,
      delay: parseFloat(el.dataset.delay || '0'),
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onComplete: () => el.classList.add('est-coupe'),
    });
  });
  return () => document.querySelectorAll<HTMLElement>('[data-tranche]').forEach((el) => el.classList.remove('est-arme', 'est-coupe'));
}

/** Intro du hero : la lame tranche la photo de haut en bas, la braise prend sur le S de « amiS ». Rien n'est caché. */
function introHero(intro: gsap.core.Timeline) {
  const hero = document.querySelector<HTMLElement>('.hero');
  if (!hero) return () => {};
  const media = hero.querySelector<HTMLElement>('.hero__media');
  const pic = media?.querySelector('picture');
  const img = media?.querySelector('img');
  const lame = media?.querySelector<HTMLElement>('.hero__lame');
  const lignes = hero.querySelectorAll('.hero__titre > span');
  const s = hero.querySelector('.hero__titre em');
  if (pic) intro.fromTo(pic, { scale: 1.08 }, { scale: 1, duration: 1.4, ease: ease.out }, 0);
  if (lignes.length) intro.from(lignes, { yPercent: 14, duration: 1.2, ease: ease.out, stagger: 0.08 }, 0);
  if (s) intro.fromTo(s, { color: '#efe6d8' }, { color: '#e8452c', duration: 0.6, ease: ease.inOut }, 0.55);
  if (lame) intro.fromTo(lame, { '--y': 0 }, { '--y': 1, duration: 0.9, ease: ease.inOut }, 0.1);

  // Repos : écoulement à vitesse constante de la lame (revient par le haut), pointeur ± 1,5 %.
  let visible = true;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
  io.observe(hero);
  const depart = idle.t;
  const tick = () => {
    if (!visible || !img || !lame) return;
    const t = idle.t - depart;
    if (t < 1.4) return; // l'intro garde la main
    gsap.set(img, { scale: 1.05, xPercent: idle.x * -3, yPercent: idle.y * -3 });
    lame.style.setProperty('--y', String(gsap.utils.wrap(0, 1, 1 + (t - 1.4) / 7)));
  };
  if (!prefersReducedMotion()) gsap.ticker.add(tick);
  return () => { gsap.ticker.remove(tick); io.disconnect(); };
}

/** Rubriques de la carte : la rubrique lue s'allume dans la bande (aria-current="location"). */
function initRubriques() {
  const nav = document.querySelector<HTMLElement>('.carte-nav ul');
  if (!nav) return;
  document.querySelectorAll<HTMLElement>('.cat[id]').forEach((cat) => {
    const a = nav.querySelector<HTMLAnchorElement>(`a[href="#${cat.id}"]`);
    if (!a) return;
    ScrollTrigger.create({
      trigger: cat, start: 'top 45%', end: 'bottom 45%',
      onToggle: (self) => {
        if (self.isActive) {
          nav.querySelectorAll('a[aria-current]').forEach((x) => x.removeAttribute('aria-current'));
          a.setAttribute('aria-current', 'location');
          if (nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: a.parentElement!.offsetLeft - 16, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
        } // hors rubrique (interlude), la dernière lue reste allumée
      },
    });
  });
}

/** Trait braise sous le titre des pages intérieures, tiré à l'entrée. */
function introPage(intro: gsap.core.Timeline) {
  const lame = document.querySelector('.page-tete__lame');
  if (lame) intro.fromTo(lame, { scaleX: 0 }, { scaleX: 1, transformOrigin: '0 50%', duration: 0.9, ease: ease.inOut }, 0.1);
}

export function startTranche() {
  startIdle();
  onPage(({ intro }) => {
    initRubriques();
    if (prefersReducedMotion()) return;
    section = document.querySelector<HTMLElement>('[data-feu]');
    gestes = section ? [...section.querySelectorAll<HTMLElement>('.geste')] : [];
    const off: (() => void)[] = [initTranches(), introHero(intro)];
    introPage(intro);
    if (section) {
      apply((current = 0));
      ScrollTrigger.create({ trigger: section.querySelector('.liste-gestes') || section, start: 'top 65%', end: 'bottom 65%', onUpdate: (self) => apply((current = self.progress)) });
    }
    return () => { off.forEach((f) => f()); section = null; gestes = []; };
  });
}
