// Module pilote « Rue du Pont ». Une variable : l'avancée dans la rue (0 au n° 6, 1 au n° 15),
// lue sur le défilement. Elle porte le fil fixe (#fil : trace et passant), le ton du fond
// (#fond glisse du jour au carreau puis à la nuit, section par section) et, au repos,
// les pavés du fil qui s'écoulent vers le n° 15, plus vite quand le pointeur va à droite.
// Verbe « longer » : translations horizontales lentes et continues, jamais de rebond.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ease, isTouch, onPage, onScroll, prefersReducedMotion } from '../engine';

gsap.registerPlugin(ScrollTrigger);

const rue = { avance: 0, pointeur: 0, pas: 0 };
let premierePage = true;

const fondDe = (el: Element) => getComputedStyle(el).getPropertyValue('--c-bg').trim();

/** Le fil fixe : trace et passant suivent l'avancée, les pavés s'écoulent au repos. */
function filFixe() {
  const fil = document.getElementById('fil');
  if (!fil) return;
  const ligne = fil.querySelector<HTMLElement>('.fil__ligne')!;
  const trace = fil.querySelector<HTMLElement>('.fil__trace')!;
  const passant = fil.querySelector<HTMLElement>('.fil__passant')!;
  const paves = fil.querySelector<HTMLElement>('.fil__paves')!;
  let largeur = ligne.clientWidth;
  ScrollTrigger.addEventListener('refresh', () => { largeur = ligne.clientWidth; });
  const versX = gsap.quickTo(passant, 'x', { duration: 0.7, ease: ease.soft });
  const versTrace = gsap.quickTo(trace, 'scaleX', { duration: 0.7, ease: ease.soft });
  gsap.set(trace, { scaleX: 0, transformOrigin: '0 50%' });

  onScroll((s) => {
    rue.avance = Math.min(1, Math.max(0, s.progress || 0));
    versX(rue.avance * largeur);
    versTrace(rue.avance);
  });

  // Influence du pointeur : -1 (vers le n° 6) à 1 (vers le n° 15), lissée.
  if (!isTouch()) {
    const lisse = gsap.quickTo(rue, 'pointeur', { duration: 1.2, ease: ease.soft });
    addEventListener('pointermove', (e) => lisse((e.clientX / innerWidth) * 2 - 1), { passive: true });
  }

  startIdle(paves);
}

/** Repos : les pavés du fil s'écoulent à vitesse constante (8 px/s, soit un demi-pavé en 1,5 s ; 4 à 12 px/s selon le pointeur). */
function startIdle(paves: HTMLElement) {
  const periode = 24; // un pavé de 12 px et un joint de 12 px (voir site.css)
  const boucle = gsap.utils.wrap(-periode, 0);
  const setX = gsap.quickSetter(paves, 'x', 'px');
  gsap.ticker.add((_t, dt) => {
    rue.pas += (dt / 1000) * 8 * (1 + 0.5 * rue.pointeur);
    setX(boucle(rue.pas));
  });
}

/** Le ton du fond suit la section : jour, carreau, nuit, par glissement scrubbé. */
function tonDuFond() {
  const fond = document.getElementById('fond');
  if (!fond) return;
  const sections = [...document.querySelectorAll<HTMLElement>('main [class*="tone-"], .pied')]
    .filter((s) => !s.closest('[hidden]'));
  if (!sections.length) return;
  gsap.set(fond, { backgroundColor: fondDe(sections[0]) });
  document.documentElement.classList.add('fond-on');
  sections.forEach((s, i) => {
    if (!i) return;
    const de = fondDe(sections[i - 1]);
    const vers = fondDe(s);
    if (de === vers) return;
    gsap.fromTo(fond, { backgroundColor: de }, {
      backgroundColor: vers,
      ease: 'none',
      immediateRender: false,
      scrollTrigger: { trigger: s, start: 'top 62%', end: 'top 38%', scrub: true, invalidateOnRefresh: true },
    });
  });
}

/** Entrée : le fil se dessine du n° 6 au n° 15 (premier chargement seulement). */
function entreeDuFil(intro: gsap.core.Timeline) {
  if (!premierePage) return;
  premierePage = false;
  const ligne = document.querySelector('#fil .fil__ligne');
  const portes = document.querySelectorAll('#fil .fil__porte');
  if (!ligne) return;
  intro.fromTo(ligne, { scaleX: 0, transformOrigin: '0 50%' }, { scaleX: 1, duration: 1.4, ease: ease.out }, 0.2);
  intro.fromTo(portes, { autoAlpha: 0, x: -12 }, { autoAlpha: 1, x: 0, duration: 0.9, ease: ease.out, stagger: 0.06 }, 0.2);
}

export function initRue() {
  if (prefersReducedMotion()) return;
  filFixe();
  // La classe posée par le pilote est remplacée avec les attributs de <html> : la restaurer.
  document.addEventListener('astro:after-swap', () => document.documentElement.classList.add('fond-on'));
  onPage(({ intro }) => {
    tonDuFond();
    entreeDuFil(intro);
  });
}
