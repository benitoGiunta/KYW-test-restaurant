// Pilote « le déroulé » : une seule variable, la progression de lecture p (0 à 1), distribuée à tout
// ce qui porte le concept. Le rouleau du haut (en-tête) s'épaissit du papier lu, le rouleau du bas
// (#reste) s'amincit de ce qui reste à lire, le maki de la marque s'enroule, le titre du hero se roule
// (chasse 125 % vers 80 %) en quittant l'écran. Le pointeur déplace le reflet des rouleaux ; au repos,
// le reflet glisse seul (startIdle). Une horloge : gsap.ticker. Mouvement réduit : rien, repli CSS.
import { gsap } from 'gsap';
import { onPage, onScroll, scrollState, prefersReducedMotion, isTouch, ease } from '../engine';

const REPOS_MS = 2500;
let tete: HTMLElement | null = null;
let reste: HTMLElement | null = null;
let courte = false; // page qui ne défile pas : le rouleau est entièrement déroulé
let p = 0;
let reflet = 0.5;
let refletCible = 0.5;
let derniereAction = 0;
let repos = false;

function reveiller() {
  derniereAction = performance.now();
  repos = false;
}

/** Entrée de repos : le reflet glisse lentement le long des deux rouleaux. */
export function startIdle(t: number) {
  repos = true;
  refletCible = 0.5 + 0.46 * Math.sin((t - derniereAction - REPOS_MS) / 1700 - Math.PI / 2);
}

function tick() {
  const t = performance.now();
  const cible = courte ? 1 : scrollState().progress;
  const dp = cible - p;
  p = Math.abs(dp) < 0.0005 ? cible : p + dp * 0.16;
  if (t - derniereAction > REPOS_MS) startIdle(t);
  reflet += (refletCible - reflet) * (repos ? 0.05 : 0.09);
  const vp = p.toFixed(4);
  const vr = reflet.toFixed(4);
  for (const el of [tete, reste]) {
    if (!el) continue;
    el.style.setProperty('--p', vp);
    el.style.setProperty('--reflet', vr);
  }
}

export function setupDeroule() {
  if (prefersReducedMotion()) return;
  reste = document.getElementById('reste');
  derniereAction = performance.now();
  if (!isTouch()) {
    addEventListener('pointermove', (e) => { reveiller(); refletCible = e.clientX / innerWidth; }, { passive: true });
  }
  addEventListener('keydown', reveiller, { passive: true });
  onScroll(() => reveiller());
  gsap.ticker.add(tick);

  onPage(({ intro }) => {
    tete = document.querySelector<HTMLElement>('.rouleau-haut');
    reste = document.getElementById('reste');
    const mesurer = () => { courte = document.documentElement.scrollHeight <= innerHeight + 2; };
    mesurer();
    addEventListener('resize', mesurer, { passive: true });

    // Intro : le titre se déroule (chasse 62 % vers 125 %), il est peint dès le premier rendu.
    document.querySelectorAll<HTMLElement>('.hero__titre, .page-tete__titre, .perdu__titre').forEach((h) => {
      intro.fromTo(h, { '--chasse': 62 }, { '--chasse': 125, duration: 1.3, ease: ease.out }, 0.05);
    });
    // Le titre du hero se roule en quittant l'écran.
    const hero = document.querySelector<HTMLElement>('.hero');
    const titre = hero?.querySelector<HTMLElement>('.hero__titre');
    if (hero && titre) {
      gsap.fromTo(titre, { '--roule': 0 }, {
        '--roule': 1, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
      });
    }
    return () => removeEventListener('resize', mesurer);
  });
}
