// Module pilote « La ligne d'eau » (patterns.md § 1). Deux grandeurs, une seule source, le défilement :
//   niveau : progression dans la page (0 en haut, 1 en bas) ;
//   houle  : vitesse de défilement lissée, qui retombe au repos (startIdle de motion.md, version tactile et pointeur).
// Elles sont distribuées à tout ce qui porte le concept :
//   1. le reflet du titre et de la photo ondule (filtre SVG #houle : feTurbulence + feDisplacementMap),
//      lentement au repos, plus fort quand on défile ; ticker en pause hors écran (IntersectionObserver) ;
//   2. le reflet s'étire quand le quai quitte l'écran (--crue sur .quai, jamais sur <html>) ;
//   3. le repère de l'échelle de crue du pied monte avec le niveau (--niveau sur .pied__echelle) ;
//   4. le verbe « accoster » : [data-accoste] > * glissent de -24 px et se posent avec un tangage de 2 px.
// Mouvement réduit : rien ne bouge, le filtre reste à sa valeur de repos, le repère est posé à mi-hauteur (CSS).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, onScroll, ease, prefersReducedMotion, isTouch } from '../engine';

const etat = { niveau: 0, houle: 0, cible: 0, t: 0 };

export function startQuai() {
  if (prefersReducedMotion()) return;
  const tactile = isTouch();

  onScroll(({ velocity, progress }) => {
    etat.niveau = progress ?? 0;
    etat.cible = Math.min(1, Math.abs(velocity ?? 0) / (tactile ? 30 : 40));
  });
  if (!tactile) {
    // Le pointeur qui passe sur l'eau la trouble un peu (desktop seulement).
    addEventListener('pointermove', (e) => {
      if ((e.target as Element | null)?.closest?.('.quai__bas')) etat.cible = Math.max(etat.cible, 0.25);
    }, { passive: true });
  }

  // Ticker unique : lissage de la houle, puis application au filtre (si visible) et au repère de crue.
  let turb: SVGFETurbulenceElement | null = null;
  let disp: SVGFEDisplacementMapElement | null = null;
  let echelle: HTMLElement | null = null;
  let eauVisible = false;
  let derniere = 0;
  gsap.ticker.add((t) => {
    const r = gsap.ticker.deltaRatio();
    etat.houle += (etat.cible - etat.houle) * (1 - Math.pow(0.9, r));
    etat.cible *= Math.pow(0.92, r);
    etat.t = t;
    if (echelle) echelle.style.setProperty('--niveau', etat.niveau.toFixed(3));
    if (!eauVisible || !turb || !disp) return;
    if (t - derniere < 1 / 30) return; // 30 images par seconde suffisent à l'eau, le reste est pour le défilement
    derniere = t;
    const fy = 0.055 + Math.sin(t * 0.7) * 0.012 + etat.houle * 0.03;
    const fx = 0.004 + Math.cos(t * 0.45) * 0.0015;
    turb.setAttribute('baseFrequency', `${fx.toFixed(4)} ${fy.toFixed(4)}`);
    disp.setAttribute('scale', (7 + etat.houle * 26).toFixed(1));
  });

  onPage(() => {
    turb = document.querySelector('#houle feTurbulence');
    disp = document.querySelector('#houle feDisplacementMap');
    echelle = document.querySelector('.pied__echelle');
    const quai = document.querySelector<HTMLElement>('[data-quai]');
    const bas = quai?.querySelector<HTMLElement>('.quai__bas');
    eauVisible = false;

    const io = bas ? new IntersectionObserver(([e]) => { eauVisible = e.isIntersecting; }) : null;
    if (bas && io) io.observe(bas);

    // Le reflet s'étire quand le quai remonte hors de l'écran.
    const crue = quai ? ScrollTrigger.create({
      trigger: quai, start: 'top top', end: 'bottom top', scrub: true,
      onUpdate: (s) => quai.style.setProperty('--crue', s.progress.toFixed(3)),
    }) : null;

    // Entrée : la ligne de laiton se trace de gauche à droite, le reflet apparaît dessous, le texte accoste.
    // Le titre et la photo ne sont jamais cachés (LCP) ; seuls les éléments décoratifs partent de zéro.
    if (quai) {
      const tl = gsap.timeline({ delay: 0.15 });
      // Les fromTo posent tout de suite leur état de départ en ligne : la classe peut lever les décalages CSS
      // du premier rendu sans saut, et clearProps ne les réactive pas en fin d'entrée (lecons.md, cahier).
      quai.classList.add('quai--entre');
      tl.fromTo(quai.querySelector('.quai__ligne-eau'), { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: ease.inOut, transformOrigin: '0 50%' })
        .fromTo(quai.querySelectorAll('.quai__reflet-cadre, .quai__photo-reflet'), { autoAlpha: 0, yPercent: -12 }, { autoAlpha: 1, yPercent: 0, duration: 1.2, ease: ease.out, clearProps: 'transform' }, 0.45)
        .fromTo(quai.querySelectorAll('.quai__titre .quai__ligne'), { x: -24 }, { x: 0, duration: 1, ease: 'back.out(1.1)', stagger: 0.08, clearProps: 'transform' }, 0)
        .fromTo(quai.querySelectorAll('.quai__suite > *'), { x: -24 }, { x: 0, duration: 0.9, ease: 'back.out(1.1)', stagger: 0.07, clearProps: 'transform' }, 0.35);
    }

    // Accoster : par lots, une fois, jamais sur un bloc qui porte un lien (il resterait hors tabulation).
    const groupes = [...document.querySelectorAll<HTMLElement>('[data-accoste]')].filter((g) => !g.querySelector('a, button'));
    const triggers = groupes.map((g) => ScrollTrigger.create({
      trigger: g, start: 'top 92%', once: true,
      onEnter: () => {
        gsap.fromTo(g.children, { x: -24, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.95, ease: 'back.out(1.1)', stagger: 0.06,
          clearProps: 'transform', onComplete: () => g.classList.add('accoste'),
        });
      },
    }));
    // Un groupe déjà passé (retour arrière, ancre) se montre tout de suite.
    groupes.forEach((g) => { if (g.getBoundingClientRect().bottom < 0) { g.classList.add('accoste'); gsap.set(g.children, { opacity: 1 }); } });

    return () => { io?.disconnect(); crue?.kill(); triggers.forEach((t) => t.kill()); eauVisible = false; };
  });
}
