// Pilote du concept « Le retrait » (patterns.md § 1). Une variable : ce que la maison retire.
//  - signature : au défilement, la phrase noire se biffe mot à mot (scrub épinglé), puis « Il reste » apparaît ;
//  - repos : dans le hero, les mots retirés s'écoulent hors du cadre à vitesse constante (gsap.ticker),
//    accélérés par la vitesse de défilement, inclinés par le pointeur, en pause hors écran ;
//  - transition : un trait d'or biffe l'écran, le noir le recouvre, puis se retire vers la droite.
// Tout passe par gsap.ticker et onScroll de l'engine : aucun listener scroll ni rAF maison.
import { gsap } from 'gsap';
import { onPage, onScroll, ease, isTouch, setTransition } from '../engine';

const etat = { vitesse: 0, penche: 0 }; // vitesse de défilement lissée, influence du pointeur (-1 à 1)

function transition() {
  const panneaux = (c: HTMLElement) => [c.querySelector('.curtain__panel--a'), c.querySelector('.curtain__panel--b')] as HTMLElement[];
  setTransition({
    leave: (c) => {
      const [noir, trait] = panneaux(c);
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .set(noir, { scaleX: 1, scaleY: 0, transformOrigin: '50% 50%' })
        .set(trait, { autoAlpha: 1, scaleX: 0, transformOrigin: '0% 50%' })
        .to(trait, { scaleX: 1, duration: 0.35, ease: ease.inOut })
        .to(noir, { scaleY: 1, duration: 0.5, ease: ease.inOut }, 0.25)
        .set(trait, { autoAlpha: 0 });
    },
    enter: (c) => {
      const [noir] = panneaux(c);
      return gsap.timeline()
        .set(noir, { transformOrigin: '100% 50%' })
        .to(noir, { scaleX: 0, duration: 0.75, ease: ease.inOut })
        .set(c, { autoAlpha: 0 });
    },
  });
}

/** Signature : la phrase se biffe mot à mot. Repli statique (réduit, sans JS) : tout est déjà biffé. */
function signature() {
  const phrase = document.querySelector<HTMLElement>('[data-retrait]');
  const section = phrase?.closest<HTMLElement>('.retrait');
  if (!phrase || !section) return;
  const mots = [...phrase.querySelectorAll<HTMLElement>('.biffe')];
  const reste = phrase.querySelector<HTMLElement>('.retrait__reste');
  const doux = getComputedStyle(document.documentElement).getPropertyValue('--c-nuit-muted').trim();
  const clair = getComputedStyle(document.documentElement).getPropertyValue('--c-bg').trim();
  section.classList.add('is-scene');
  gsap.set(mots, { '--b': 0, color: clair });
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: section, start: 'top top', end: () => `+=${Math.round(innerHeight * 1.5)}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
  });
  mots.forEach((m, i) => tl.to(m, { '--b': 1, color: doux, duration: 1 }, i * 0.75));
  if (reste) tl.fromTo(reste, { autoAlpha: 0, yPercent: 40 }, { autoAlpha: 1, yPercent: 0, duration: 1.4, ease: ease.out }, mots.length * 0.75 + 0.3);
  tl.to({}, { duration: 0.8 }); // tenue : la phrase finale reste lisible avant de libérer l'épinglage
}

/** Repos (startIdle) : les mots retirés s'écoulent hors du cadre, à vitesse constante, et reviennent par l'autre bout. */
function startIdle() {
  const boite = document.querySelector<HTMLElement>('.defile');
  const piste = boite?.querySelector<HTMLElement>('.defile__piste');
  const seq = piste?.querySelector<HTMLElement>('.defile__seq');
  if (!boite || !piste || !seq) return;
  const largeur = seq.offsetWidth;
  const copies = Math.max(1, Math.ceil((boite.offsetWidth * 2) / Math.max(largeur, 1)));
  for (let i = 0; i < copies; i++) piste.appendChild(seq.cloneNode(true));
  const wrap = gsap.utils.wrap(-largeur, 0);
  let x = 0;
  let visible = true;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
  io.observe(boite);
  const pas = (_t: number, dt: number) => {
    if (!visible) return;
    const v = 32 * (1 + etat.penche * 0.45) + Math.min(Math.abs(etat.vitesse) * 6, 260);
    x = wrap(x - (v * dt) / 1000);
    gsap.set(piste, { x });
  };
  gsap.ticker.add(pas);
  gsap.fromTo(boite, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1, delay: 0.5, ease: ease.soft });
  return () => { gsap.ticker.remove(pas); io.disconnect(); };
}

/** Intro de l'accueil : le titre reste peint (LCP) ; la photo se pose, le lieu se lève (data-intro). */
function intro(tl: gsap.core.Timeline) {
  const img = document.querySelector<HTMLElement>('.hero__media img');
  if (img) tl.fromTo(img, { scale: 1.08 }, { scale: 1, duration: 1.8, ease: ease.out }, 0);
}

/** Plein cadre : la photo dérive lentement dans son cadre. */
function plein() {
  document.querySelectorAll<HTMLElement>('.plein img').forEach((img) => {
    gsap.fromTo(img, { yPercent: -6, scale: 1.14 }, {
      yPercent: 6, ease: 'none',
      scrollTrigger: { trigger: img.parentElement!.closest('.plein') || img, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
}

export function initRetrait() {
  transition();
  onScroll((s) => { etat.vitesse += ((s.velocity || 0) - etat.vitesse) * 0.2; });
  gsap.ticker.add(() => { etat.vitesse *= 0.92; }); // retour au repos quand le défilement s'arrête
  if (!isTouch()) addEventListener('pointermove', (e) => { etat.penche = (e.clientX / innerWidth) * 2 - 1; }, { passive: true });
  onPage(({ intro: tl }) => {
    if (!document.documentElement.classList.contains('motion')) return;
    const nettoyages: (() => void)[] = [];
    intro(tl);
    signature();
    plein();
    const d = startIdle();
    if (d) nettoyages.push(d);
    return () => nettoyages.forEach((n) => n());
  });
}
