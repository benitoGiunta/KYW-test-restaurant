// Pilote du concept « le cadran du service ». UNE variable : l'heure du service (9 h 30 à 15 h 30),
// tirée de la progression de scroll, distribuée à tout ce qui porte le concept :
//   en-tête (heure + règle des heures), disque du hero (heure, étalement au scroll, penchant vers le pointeur),
//   sol de chaque bande (le nouveau sol s'étale en clip-path: circle() depuis le haut, comme un jaune),
//   lettres gommées du mot-valise, barres de la semaine qui s'étalent.
// Repos : la trotteuse du disque tourne au rythme réel des secondes (gsap.ticker, en pause hors écran).
// Une seule horloge : onScroll de l'engine (Lenis sur gsap.ticker) et ScrollTrigger ; aucun listener scroll.
import { gsap } from 'gsap';
import { ease, isTouch, onPage, onScroll, prefersReducedMotion } from '../engine';

const OUVRE = 9 * 60 + 30;
const FERME = 15 * 60 + 30;
const nb = ' ';
export const fmt = (m: number) => `${Math.floor(m / 60)}${nb}h${nb}${String(m % 60).padStart(2, '0')}`;

export function initCadran() {
  onPage(({ intro }) => {
    const reduit = prefersReducedMotion();
    const nettoie: (() => void)[] = [];

    // 1. L'heure : en-tête, disque. Pas de 5 minutes ; la 404 épingle son heure (data-heure-fixe).
    const heures = [...document.querySelectorAll<HTMLElement>('[data-cadran-heure]')];
    const fil = document.querySelector<HTMLElement>('[data-cadran-fil]');
    const fixe = document.querySelector<HTMLElement>('[data-heure-fixe]');
    let derniere = -1;
    const poser = (p: number) => {
      const m = fixe ? Number(fixe.dataset.heureFixe) : Math.round((OUVRE + Math.min(1, Math.max(0, p)) * (FERME - OUVRE)) / 5) * 5;
      if (fil) gsap.set(fil, { scaleX: fixe ? 1 : p });
      if (m === derniere) return;
      derniere = m;
      const t = fmt(m);
      heures.forEach((h) => { h.textContent = t; });
    };
    poser(0);
    nettoie.push(onScroll((s) => poser(s.progress)) as () => void);

    // 2. Le disque du hero : s'étale à l'entrée, grossit quand on quitte le hero, penche vers le pointeur.
    const disque = document.querySelector<HTMLElement>('[data-cadran-disque]');
    const aiguille = document.querySelector<HTMLElement>('[data-aiguille]');
    if (disque && aiguille) {
      if (reduit) {
        gsap.set(aiguille, { rotation: 180 });
      } else {
        intro.fromTo(disque, { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(50% at 50% 50%)', duration: 1.4, ease: ease.out }, 0.05);
        intro.fromTo(aiguille, { rotation: -90 }, { rotation: () => ((Date.now() / 1000) % 60) * 6, duration: 1.4, ease: ease.out }, 0.05);
        gsap.to(disque, {
          scale: 1.2, ease: 'none',
          scrollTrigger: { trigger: disque.closest('section'), start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
        });
        if (!isTouch()) {
          const qx = gsap.quickTo(disque, 'x', { duration: 1.2, ease: ease.soft });
          const qy = gsap.quickTo(disque, 'y', { duration: 1.2, ease: ease.soft });
          const penche = (e: PointerEvent) => { qx((e.clientX / innerWidth - 0.5) * 28); qy((e.clientY / innerHeight - 0.5) * 20); };
          addEventListener('pointermove', penche, { passive: true });
          nettoie.push(() => removeEventListener('pointermove', penche));
        }
        // Repos : la trotteuse, à vitesse constante (jamais de point mort), en pause hors écran.
        let visible = true;
        let lance = false;
        const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
        io.observe(disque);
        intro.call(() => { lance = true; }, [], 1.45);
        const tick = () => { if (lance && visible) gsap.set(aiguille, { rotation: ((Date.now() / 1000) % 60) * 6 }); };
        gsap.ticker.add(tick);
        nettoie.push(() => { io.disconnect(); gsap.ticker.remove(tick); });
      }
    }

    if (reduit) return () => nettoie.forEach((f) => f());

    // 3. Le sol s'étale : chaque bande dont le sol change recouvre la précédente par un cercle depuis le haut.
    let avant = '';
    document.querySelectorAll<HTMLElement>('.band').forEach((b) => {
      const sol = getComputedStyle(b).backgroundColor;
      if (avant && sol !== avant && !b.classList.contains('band--fin')) {
        b.style.setProperty('--sol-avant', avant);
        b.classList.add('etale');
        gsap.fromTo(b, { '--etale': 0 }, {
          '--etale': 1, ease: 'none',
          scrollTrigger: {
            trigger: b, start: 'top bottom', end: 'top 30%', scrub: 0.6, invalidateOnRefresh: true,
            onUpdate: (st) => b.classList.toggle('is-plein', st.progress > 0.995),
          },
        });
        nettoie.push(() => { b.classList.remove('etale', 'is-plein'); b.style.removeProperty('--sol-avant'); });
      }
      avant = sol;
    });

    // 4. Mot-valise : les lettres en trop se gomment au fil du scroll (état final = état statique du CSS).
    const valise = document.querySelector<HTMLElement>('.valise');
    if (valise) {
      gsap.fromTo(valise.querySelectorAll('.gomme'), { color: '#21140d' }, {
        color: '#6b4a08', ease: 'none', stagger: 0.04,
        scrollTrigger: { trigger: valise, start: 'top 75%', end: 'center 45%', scrub: true },
      });
    }

    // 5. La semaine : les créneaux s'étalent de 8 h vers la fermeture.
    const semaine = document.querySelector<HTMLElement>('.semaine');
    if (semaine) {
      gsap.from(semaine.querySelectorAll('.semaine__barre'), {
        scaleX: 0, transformOrigin: 'left center', duration: 1.4, ease: ease.out, stagger: 0.06,
        scrollTrigger: { trigger: semaine, start: 'top 82%', once: true },
      });
    }

    return () => nettoie.forEach((f) => f());
  });
}
