// Module pilote « Le trop-plein » (patterns.md § 1). Une variable, le niveau de débordement :
// progression du défilement de la page + pointeur + dérive lente (idle). Elle est distribuée à tout
// ce qui franchit la rue : le mot « Fleuri », les assiettes, le « 38 » du pied, la pastille du mardi.
// Les cibles du pilote ([data-deborde]) ne sont jamais animées par un tween : le pilote écrit la propriété
// individuelle `translate`, les tweens d'entrée vivent sur le parent.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll, ease, prefersReducedMotion } from '../engine';
import { idle } from './idle';

let niveau = 0; // 0 en haut de page, 1 en bas
type Cible = { el: HTMLElement; k: number; derive: boolean; phase: number; vu: boolean };
let cibles: Cible[] = [];

// Un mot (texte) ne dérive pas seul (pas de scintillement) : il suit le défilement et le pointeur.
// Une assiette (objet) dérive aussi au repos, deux fréquences pour ne jamais s'arrêter net.
function appliquer() {
  const vw = innerWidth / 100;
  for (const c of cibles) {
    if (!c.vu) continue;
    const t = idle.t + c.phase;
    const repos = c.derive ? 9 * Math.sin(t * 0.55) + 5 * Math.sin(t * 0.91 + 1.3) : 0;
    const x = c.k * (niveau * 2.4 * vw + idle.x * 2.2 * vw) + repos;
    const y = c.derive ? 4 * Math.cos(t * 0.47) + idle.y * 14 : 0;
    c.el.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`;
  }
}

export function startDebordement() {
  if (prefersReducedMotion()) return; // repli : tout reste à sa place dessinée
  onScroll(({ progress }) => { niveau = progress; });
  gsap.ticker.add(appliquer);

  onPage(({ intro }) => {
    cibles = [...document.querySelectorAll<HTMLElement>('[data-deborde]')].map((el, i) => ({
      el, k: parseFloat(el.dataset.deborde || '1'), derive: el.hasAttribute('data-derive'), phase: i * 2.1, vu: false,
    }));
    // En pause hors écran : seules les cibles visibles sont recalculées.
    const st = cibles.map((c) => ScrollTrigger.create({ trigger: c.el, start: 'top bottom', end: 'bottom top', onToggle: (s) => { c.vu = s.isActive; } }));

    // Signature d'accueil : « Fleuri » part aligné sous « Café », puis déborde par-dessus la rue en ressort ;
    // les deux assiettes se posent l'une après l'autre (le mixte).
    const l2 = document.querySelector<HTMLElement>('.hero__h1 .l2');
    if (l2) {
      const em = parseFloat(getComputedStyle(l2).fontSize);
      intro.fromTo(l2, { x: -1.8 * em * (innerWidth < 761 ? 0.94 : 1) }, { x: 0, duration: 1.25, ease: ease.spring, clearProps: 'transform' }, 0.25);
      intro.from('.hero .plate-pose', { yPercent: 40, scale: 0.6, autoAlpha: 0, duration: 1.1, ease: ease.spring, stagger: 0.08 }, 0.55);
      intro.from('.hero__lead', { y: 24, duration: 0.9, ease: ease.out, clearProps: 'transform' }, 0.7); // jamais caché : le CTA répond dès le premier frame
    }
    // Têtes de pages intérieures : l'assiette arrive par la gauche et franchit la rue.
    if (document.querySelector('.page-tete .plate-pose')) {
      intro.from('.page-tete .plate-pose', { xPercent: -60, scale: 0.7, autoAlpha: 0, duration: 1.2, ease: ease.spring, stagger: 0.08 }, 0.35);
    }

    // Le « 38 » du pied franchit la rue au défilement (scrub).
    const n38 = document.querySelector<HTMLElement>('.pied__38');
    if (n38) gsap.fromTo(n38, { xPercent: -18 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: '.pied', start: 'top bottom', end: 'top 25%', scrub: 0.6, invalidateOnRefresh: true } });

    // La pastille du mardi déborde sur la section suivante : elle se pose en ressort à l'entrée.
    const stamp = document.querySelector<HTMLElement>('.mardi__stamp');
    if (stamp) gsap.from(stamp, { scale: 0, rotate: -24, duration: 0.9, ease: ease.spring, scrollTrigger: { trigger: '.mardi', start: 'top 75%', once: true } });

    // Bande de mots : boucle lente, accélérée par la vitesse de défilement, en pause hors écran.
    const track = document.querySelector<HTMLElement>('[data-marquee] [data-track]');
    let off = () => {};
    if (track) {
      const loop = gsap.to(track, { xPercent: -50, ease: 'none', duration: 36, repeat: -1 });
      off = onScroll(({ velocity }) => {
        const dir = velocity < -0.5 ? -1 : 1;
        gsap.to(loop, { timeScale: dir * (1 + Math.min(Math.abs(velocity) / 8, 4)), duration: 0.5, overwrite: true });
      });
      st.push(ScrollTrigger.create({ trigger: track, start: 'top bottom', end: 'bottom top', onToggle: (s) => (s.isActive ? loop.play() : loop.pause()) }));
    }

    return () => {
      off(); st.forEach((s) => s.kill());
      cibles.forEach((c) => c.el.style.removeProperty('translate'));
      cibles = [];
    };
  });
}
