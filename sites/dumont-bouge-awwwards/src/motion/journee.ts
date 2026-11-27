// Module pilote « Sept à dix-huit ». Une variable : l'heure de la journée (7 h à 18 h), lue sur la progression
// du défilement et distribuée à tout ce qui porte le concept : la règle en marge (remplissage et heure affichée),
// le pinceau du hero (déroulé à l'intro, dérive de repos et influence du pointeur), les heures de l'index
// (trait déroulé quand la ligne arrive), les chiffres du comptoir (comptés une fois). Une seule horloge : gsap.ticker.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll, ease, prefersReducedMotion } from '../engine';
import { idle, startIdle } from './idle';

gsap.registerPlugin(ScrollTrigger);
const NB = ' ';
const DEBUT = 7 * 60, DUREE = 11 * 60;

/** 0..1 vers « 9 h 05 » (pas de 5 minutes). */
export function heure(p: number) {
  const min = DEBUT + Math.round((Math.min(1, Math.max(0, p)) * DUREE) / 5) * 5;
  const h = Math.floor(min / 60), m = min % 60;
  return `${h}${NB}h${m ? NB + String(m).padStart(2, '0') : ''}`;
}

const etat = { cible: 0, p: 0, fixe: null as number | null, libelle: null as string | null };

export function startJournee() {
  if (prefersReducedMotion()) return;
  startIdle();
  onScroll(({ progress }) => { etat.cible = progress; });

  let texte = '';
  gsap.ticker.add(() => {
    const regle = document.querySelector<HTMLElement>('.regle');
    if (!regle) return;
    const cible = etat.fixe ?? etat.cible;
    etat.p += (cible - etat.p) * (1 - Math.pow(0.88, gsap.ticker.deltaRatio()));
    if (Math.abs(cible - etat.p) < 0.0005) etat.p = cible;
    regle.style.setProperty('--p', etat.p.toFixed(4));
    const t = etat.libelle ?? heure(etat.p);
    if (t !== texte) { texte = t; regle.querySelector('.regle__h')!.textContent = t; }
  });

  onPage(({ intro }) => {
    // Pages courtes (404) : état épinglé par data-heure, Lenis y renvoie une progression sans objet.
    const pin = document.body.dataset.heure;
    etat.fixe = pin ? 1 : null;
    etat.libelle = pin || null;

    const cleanups: (() => void)[] = [];

    // Signature : « Bouge » et son pinceau se déroulent de gauche à droite à l'intro.
    const l2 = document.querySelector<HTMLElement>('.hero__l2');
    const pinceau = document.querySelector<HTMLElement>('.hero__pinceau');
    if (l2 && pinceau) {
      gsap.set(l2, { clipPath: 'inset(-20% 100% -20% -10%)' });
      intro.add(gsap.to(l2, { clipPath: 'inset(-20% -10% -20% -10%)', duration: 0.9, ease: ease.out, clearProps: 'clipPath' }), 0.2);
      // Repos : le pinceau glisse et s'incline sous le pointeur, en pause hors écran.
      let visible = true;
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
      io.observe(pinceau);
      const tick = () => {
        if (!visible) return;
        gsap.set(pinceau, { x: Math.sin(idle.t * 0.8) * 9 + idle.x * 26, y: idle.y * 8, skewX: idle.x * -5 });
      };
      gsap.ticker.add(tick);
      cleanups.push(() => { gsap.ticker.remove(tick); io.disconnect(); });
    }

    // Index de la journée : le trait rose se déroule sous chaque heure quand la ligne arrive.
    document.querySelectorAll<HTMLElement>('.jour__ligne').forEach((li) => {
      ScrollTrigger.create({ trigger: li, start: 'top 82%', once: true, onEnter: () => li.classList.add('is-lu') });
    });

    // Chiffres du comptoir : comptés une fois (copie aria-hidden, la vraie valeur reste en sr-only).
    document.querySelectorAll<HTMLElement>('[data-compte]').forEach((el) => {
      const n = parseInt(el.dataset.compte || '0', 10);
      const o = { v: 0 };
      el.textContent = '0';
      gsap.to(o, {
        v: n, duration: 1.4, ease: ease.out,
        onUpdate: () => { el.textContent = String(Math.round(o.v)); },
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });

    // Photos sous la flottaison : elles se déroulent de gauche à droite, comme le pinceau.
    document.querySelectorAll<HTMLElement>('[data-deroule]').forEach((el) => {
      gsap.fromTo(el, { clipPath: 'inset(0% 100% 0% 0%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: ease.out, delay: parseFloat(el.dataset.delay || '0'), clearProps: 'clipPath',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });

    return () => cleanups.forEach((c) => c());
  });
}
