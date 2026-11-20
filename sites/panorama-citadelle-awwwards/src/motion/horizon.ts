// Module pilote « Le tour d'horizon ». Une seule variable : l'heure, de 8 h à 23 h.
// Le défilement de la page fait avancer la journée (haut de page = 8 h, pied = 23 h) ; le pointeur
// (ou la vitesse de défilement au toucher) l'incline de moins d'une heure ; au repos, le soleil balaie
// lentement la règle à vitesse constante (startIdle). Tout ce qui porte le concept lit cette heure :
// soleils des règles [data-soleil], étiquette d'heure du hero. La vue du hero balaie l'horizon au défilement.
// Mouvement réduit : rien n'est lancé, les règles gardent leur dessin statique (marque).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll, scrollState, prefersReducedMotion, isTouch, ease } from '../engine';

gsap.registerPlugin(ScrollTrigger);

export const horizon = { heure: 8 };
export const idle = { t: 0, x: 0 };

const DEBUT = 8;
const FIN = 23;
const AMPLITUDE = 0.7; // heures balayées de part et d'autre au repos
const VITESSE = 0.25; // allers-retours par seconde (vitesse constante, pas de point mort sinusoïdal)

/** Entrée de repos : horloge GSAP + pointeur retardé (vitesse de défilement au toucher). */
export function startIdle() {
  if (prefersReducedMotion()) return;
  const touch = isTouch();
  let vise = 0;
  if (touch) onScroll(({ velocity }) => { vise = gsap.utils.clamp(-0.5, 0.5, velocity / 40); });
  else addEventListener('pointermove', (e) => { vise = e.clientX / innerWidth - 0.5; }, { passive: true });
  gsap.ticker.add((t) => {
    const r = gsap.ticker.deltaRatio();
    if (touch) vise *= Math.pow(0.9, r);
    idle.t = t;
    idle.x += (vise - idle.x) * (1 - Math.pow(0.95, r));
  });
}

const balayage = (t: number) => {
  const d = gsap.utils.wrap(0, 2, t * VITESSE);
  return (d < 1 ? d : 2 - d) - 0.5; // -0,5 à 0,5, aller-retour linéaire
};
const libelle = (h: number) => {
  let hh = Math.floor(h);
  let mm = Math.round((h - hh) * 6) * 10;
  if (mm === 60) { hh += 1; mm = 0; }
  return mm ? `${hh} h ${String(mm).padStart(2, '0')}` : `${hh} h`;
};

type Regle = {
  el: HTMLElement; piste: HTMLElement; etiquette: HTMLElement | null;
  debut: number; fin: number; marque: number; w: number; vu: boolean; txt: string;
  setX: (v: number) => void;
};

export function startHorizon() {
  if (prefersReducedMotion()) return;
  startIdle();

  onPage(({ intro }) => {
    // 1. Soleils pilotés : une heure, distribuée aux règles visibles seulement.
    const regles: Regle[] = [...document.querySelectorAll<HTMLElement>('[data-soleil]')].flatMap((el) => {
      const piste = el.querySelector<HTMLElement>('.regle__piste');
      const astre = el.querySelector<HTMLElement>('.regle__astre');
      if (!piste || !astre) return [];
      return [{
        el, piste, etiquette: el.querySelector<HTMLElement>('.regle__etiquette'),
        debut: Number(el.dataset.debut), fin: Number(el.dataset.fin), marque: Number(el.dataset.marque),
        w: piste.clientWidth, vu: false, txt: '', setX: gsap.quickSetter(astre, 'x', 'px') as (v: number) => void,
      }];
    });
    const mesurer = () => regles.forEach((r) => { r.w = r.piste.clientWidth; });
    ScrollTrigger.addEventListener('refresh', mesurer);

    const tick = () => {
      const H = DEBUT + (FIN - DEBUT) * scrollState().progress;
      horizon.heure = H;
      const decalage = balayage(idle.t) * 2 * AMPLITUDE + idle.x * 0.8;
      for (const r of regles) {
        if (!r.vu) continue;
        const base = gsap.utils.clamp(r.debut + AMPLITUDE, r.fin - AMPLITUDE, H);
        const h = gsap.utils.clamp(r.debut, r.fin, base + decalage);
        r.setX(((h - r.marque) / (r.fin - r.debut)) * r.w);
        if (r.etiquette) {
          const t = libelle(h);
          if (t !== r.txt) { r.txt = t; r.etiquette.textContent = t; }
        }
      }
    };
    let enMarche = false;
    const io = new IntersectionObserver((entrees) => {
      entrees.forEach((e) => { const r = regles.find((x) => x.el === e.target); if (r) r.vu = e.isIntersecting; });
      const actif = regles.some((r) => r.vu);
      if (actif && !enMarche) gsap.ticker.add(tick);
      if (!actif && enMarche) gsap.ticker.remove(tick);
      enMarche = actif;
    });
    regles.forEach((r) => io.observe(r.el));

    // 2. Intro du hero : la composition est peinte dès la première image (h1 et photo jamais masqués) ;
    //    la règle se trace de 8 h à 23 h, le soleil se lève, la vue se pose.
    const hero = document.querySelector<HTMLElement>('.hero');
    const vue = hero?.querySelector<HTMLElement>('.hero__vue picture');
    if (hero) {
      const tl = gsap.timeline();
      if (vue) {
        gsap.set(vue, { scale: 1.08 });
        tl.from(vue, { scale: 1.16, duration: 1.8, ease: ease.out }, 0);
      }
      tl.from(hero.querySelectorAll('.hero__titre > span'), { yPercent: 16, duration: 1.2, stagger: 0.07, ease: ease.out }, 0)
        .from(hero.querySelectorAll('.hero__baseline, .hero__infos, .hero__actions'), { y: 18, autoAlpha: 0, duration: 1, stagger: 0.07, ease: ease.out }, 0.15)
        .from(hero.querySelectorAll('.regle__cran'), { scaleY: 0, transformOrigin: '50% 100%', duration: 0.6, stagger: 0.03, ease: ease.out }, 0.25)
        .from(hero.querySelectorAll('.regle__h'), { autoAlpha: 0, duration: 0.5, stagger: 0.03, ease: ease.soft }, 0.35)
        .from(hero.querySelectorAll('.regle__soleil'), { autoAlpha: 0, yPercent: 60, duration: 0.9, ease: ease.out }, 0.7)
        .from(hero.querySelectorAll('.regle__etiquette'), { autoAlpha: 0, duration: 0.6, ease: ease.soft }, 0.9);
      intro.add(tl, 0);
    }
    // La vue balaie l'horizon pendant que le hero défile (scrub, transform seulement).
    if (vue) {
      gsap.fromTo(vue, { xPercent: 2 }, {
        xPercent: -2, ease: 'none',
        scrollTrigger: { trigger: vue.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.6, invalidateOnRefresh: true },
      });
    }

    // 3. Les autres règles se tracent cran par cran quand elles entrent (balayage gauche-droite).
    document.querySelectorAll<HTMLElement>('.regle').forEach((regle) => {
      if (hero?.contains(regle)) return;
      gsap.from(regle.querySelectorAll('.regle__cran'), {
        scaleY: 0, transformOrigin: '50% 100%', duration: 0.6, stagger: 0.025, ease: ease.out,
        scrollTrigger: { trigger: regle, start: 'top 92%', once: true },
      });
    });

    // 4. Images : révélées par un balayage latéral (verbe « balayer »), jamais celles du premier écran.
    const balayables = '.horizon__photo, .horizon__aerien picture, .lieu__vignette, .feu__img, .final__mur picture, .recit__photo, .equipe__photo, .cat__photo, .acces__photo';
    document.querySelectorAll<HTMLElement>(balayables).forEach((el) => {
      if (el.getBoundingClientRect().top < innerHeight) return;
      gsap.fromTo(el, { clipPath: 'inset(0% 100% 0% 0%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: ease.out,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });

    return () => {
      io.disconnect();
      if (enMarche) gsap.ticker.remove(tick);
      ScrollTrigger.removeEventListener('refresh', mesurer);
    };
  });
}

/** Index de la carte : la section lue est soulignée (vaut aussi en mouvement réduit, défilement natif). */
export function startCarte() {
  onPage(() => {
    const liens = new Map([...document.querySelectorAll<HTMLAnchorElement>('.carte__index a')].map((a) => [a.hash.slice(1), a]));
    if (!liens.size) return;
    document.querySelectorAll<HTMLElement>('.cat[id]').forEach((cat) => {
      const a = liens.get(cat.id);
      if (!a) return;
      ScrollTrigger.create({ trigger: cat, start: 'top 40%', end: 'bottom 40%', onToggle: (s) => a.classList.toggle('is-actif', s.isActive) });
    });
  });
}
