// Module pilote (patterns.md § 1) : une variable, l'impression en cours (première, deuxième, dernière),
// tirée du défilement et distribuée à tout ce qui porte le concept :
//  - le repère vertical « Première impression » (marge droite, bureau) qui change de service au fil de la page (--imp = progression) ;
//  - la lueur ambrée des fenêtres sur la façade de nuit (hero), qui suit le pointeur et respire au repos (idle).
// Appelé une fois depuis setup.ts ; code de page dans onPage avec nettoyage ; une seule horloge (gsap.ticker).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll, scrollState, ease, prefersReducedMotion } from '../engine';
import { idle, startIdle } from './idle';

const NOMS = ['Première', 'Deuxième', 'Dernière'];
let chapitre = -1;

function calcul(y: number) {
  const pied = document.querySelector('.pied');
  if (pied && pied.getBoundingClientRect().top < innerHeight * 0.55) return 2;
  return y > innerHeight * 0.45 ? 1 : 0;
}

function poser(c: number) {
  if (c === chapitre) return;
  const premier = chapitre === -1;
  chapitre = c;
  const n = document.querySelector<HTMLElement>('.repere__n');
  const repere = document.querySelector<HTMLElement>('.repere');
  if (!n || !repere) return;
  repere.dataset.imp = String(c);
  if (premier || prefersReducedMotion()) { n.textContent = NOMS[c]; return; }
  gsap.timeline()
    .to(n, { xPercent: 110, duration: 0.3, ease: ease.soft })
    .add(() => { n.textContent = NOMS[c]; })
    .fromTo(n, { xPercent: -110, opacity: 0.2 }, { xPercent: 0, opacity: 1, duration: 0.5, ease: ease.soft });
}

export function startImpressions() {
  startIdle();
  onScroll(({ y, progress }) => {
    document.documentElement.style.setProperty('--imp', progress.toFixed(3));
    poser(calcul(y));
  });
  onPage(() => {
    chapitre = -1;
    poser(calcul(scrollState().y));
    const lueur = document.querySelector<HTMLElement>('[data-lueur]');
    if (!lueur || prefersReducedMotion()) return;
    // Écoulement à vitesse constante + pointeur retardé : la lumière des fenêtres ne s'arrête jamais tout à fait.
    const tick = () => {
      const t = idle.t;
      lueur.style.setProperty('--lx', `${(50 + idle.x * 40 + Math.sin(t * 0.55) * 14).toFixed(2)}%`);
      lueur.style.setProperty('--ly', `${(46 + idle.y * 26 + Math.cos(t * 0.41) * 9).toFixed(2)}%`);
      lueur.style.setProperty('--lo', (0.7 + Math.sin(t * 1.3) * 0.22).toFixed(3));
    };
    const st = ScrollTrigger.create({
      trigger: lueur, start: 'top bottom', end: 'bottom top',
      onToggle: (self) => (self.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
    });
    if (st.isActive) gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); st.kill(); };
  });
}
