// Module pilote du concept « à chaque plat son huile » (patterns.md § 1).
// Une variable : la progression de lecture de la page (0 à 1), plus l'huile du plat en vue.
// Elle est distribuée à tout ce qui porte le concept :
//   - le filet d'or dans la marge s'allonge (scaleY) et sa goutte descend avec la lecture ;
//   - --c-huile sur <html> prend la couleur de l'huile du plat en vue ([data-huile]) : filet, goutte,
//     goutte de la marque, panneau du rideau, goutte du pied ;
//   - le plat en vue reçoit .is-versee (sa goutte se remplit) ; le nom de l'huile s'écrit au bout du filet.
// Repos : la goutte gonfle pendant 6 s puis lâche une perle (entrée idle), et penche vers le pointeur.
// Une page peut épingler son état : [data-filet-etat="vide"] (404, le flacon est vide).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll, ease, prefersReducedMotion } from '../engine';
import { idle } from './idle';

const OR = '#e8a924';
const DEPART = 0.04; // le filet a déjà coulé un peu sous l'en-tête
let fil: HTMLElement | null = null;
let pointe: HTMLElement | null = null;
let souffle: HTMLElement | null = null;
let chute: HTMLElement | null = null;
let nom: HTMLElement | null = null;
let hauteur = 0;
let current = 0;
let vide = false;
let cycle = -1;

const map = (p: number) => DEPART + (1 - DEPART) * gsap.utils.clamp(0, 1, p);

function apply(p: number) {
  if (!fil || !pointe) return;
  const s = vide ? 0 : prefersReducedMotion() ? 1 : map(p); // réduit : filet entier, immobile
  gsap.set(fil, { scaleY: s });
  gsap.set(pointe, { y: s * hauteur });
}

function verser(el: HTMLElement | null) {
  const root = document.documentElement;
  const couleur = el ? getComputedStyle(el).getPropertyValue('--c-accent').trim() || OR : OR;
  document.querySelectorAll('.is-versee').forEach((x) => x !== el && x.classList.remove('is-versee'));
  el?.classList.add('is-versee');
  if (nom) {
    const txt = el?.dataset.huileNom ?? '';
    if (nom.textContent !== txt) {
      nom.textContent = txt;
      if (txt && !prefersReducedMotion()) gsap.fromTo(nom, { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: ease.soft });
    }
  }
  if (prefersReducedMotion()) root.style.setProperty('--c-huile', couleur);
  else gsap.to(root, { '--c-huile': couleur, duration: 0.6, ease: ease.soft, overwrite: 'auto' });
}

// Repos : la goutte gonfle 6 s puis retombe en lâchant une perle ; elle penche vers le pointeur.
function repos() {
  if (!souffle || vide) return;
  const phase = (idle.t % 6) / 6;
  const n = Math.floor(idle.t / 6);
  const gonfle = phase < 0.9 ? gsap.parseEase('sine.inOut')(phase / 0.9) : 1 - (phase - 0.9) / 0.1;
  gsap.set(souffle, { scale: 1 + 0.9 * gonfle, x: idle.x * 8, y: idle.y * 4 + gonfle * 6 });
  if (n !== cycle) {
    if (cycle >= 0 && chute) gsap.fromTo(chute, { y: 0, autoAlpha: 1, scale: 1 }, { y: 90, autoAlpha: 0, scale: 0.8, duration: 0.9, ease: ease.inOut });
    cycle = n;
  }
}

export function startFilet() {
  onScroll(({ progress }) => apply((current = progress)));
  onPage(() => {
    const root = document.querySelector<HTMLElement>('[data-filet]');
    fil = root?.querySelector('[data-filet-fil]') ?? null;
    pointe = root?.querySelector('[data-filet-pointe]') ?? null;
    souffle = root?.querySelector('[data-filet-souffle]') ?? null;
    chute = root?.querySelector('[data-filet-chute]') ?? null;
    nom = root?.querySelector('[data-filet-nom]') ?? null;
    vide = !!document.querySelector('[data-filet-etat="vide"]');
    root?.classList.toggle('is-vide', vide);
    const mesure = () => { hauteur = root?.clientHeight ?? innerHeight; apply(current); };
    mesure();
    apply((current = 0));
    verser(null);

    // L'huile du plat en vue : chaque [data-huile] croise la ligne des 55 %.
    const triggers = [...document.querySelectorAll<HTMLElement>('[data-huile]')].map((el) =>
      ScrollTrigger.create({
        trigger: el, start: 'top 55%', end: 'bottom 55%',
        onToggle: (st) => { if (st.isActive) verser(el); else if (el.classList.contains('is-versee')) verser(null); },
      }),
    );

    // Au pied, le filet s'efface et sa dernière goutte tombe au-dessus de « À table. ».
    const recoit = document.querySelector<HTMLElement>('[data-pied-goutte]');
    const pied = document.querySelector<HTMLElement>('.pied');
    let tl: gsap.core.Timeline | null = null;
    if (pied && root && !prefersReducedMotion()) {
      tl = gsap.timeline({ scrollTrigger: { trigger: pied, start: 'top bottom', end: 'top 35%', scrub: 0.6 } })
        .to(root, { autoAlpha: 0, ease: 'none' }, 0)
        .fromTo(recoit, { y: -120, scale: 0.4 }, { y: 0, scale: 1, ease: 'none' }, 0);
    }

    const tick = () => repos();
    if (!prefersReducedMotion()) gsap.ticker.add(tick);
    addEventListener('resize', mesure);
    return () => {
      gsap.ticker.remove(tick);
      removeEventListener('resize', mesure);
      triggers.forEach((t) => t.kill());
      tl?.scrollTrigger?.kill();
      tl?.kill();
      document.querySelectorAll('.is-versee').forEach((x) => x.classList.remove('is-versee'));
      fil = pointe = souffle = chute = nom = null;
    };
  });
}
