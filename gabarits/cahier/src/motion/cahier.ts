// Drivers du concept « Cahier » : menu mobile, menu du jour tracé + tampon, photos qui se posent, timbres qui
// s'empilent, carte postale qui se retourne, fiches d'équipe, lignes du sommaire. Tout tourne dans onPage()
// (contexte gsap du moteur, reverti à chaque changement de page) et respecte reduced motion.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, ease, prefersReducedMotion } from '../engine';

gsap.registerPlugin(ScrollTrigger);
const q = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) => [...root.querySelectorAll<T>(sel)];
const rotDe = (el: HTMLElement) => parseFloat(getComputedStyle(el).getPropertyValue('--rot')) || 0;
const once = (trigger: Element, start = 'top 85%') => ({ trigger, start, once: true });

export function initCahier() {
  onPage(menuMobile);
  onPage(couverture);
  onPage(menuDuJour);
  onPage(tampons);
  onPage(poses);
  onPage(timbres);
  onPage(postale);
  onPage(fiches);
  onPage(sommaire);
}

/* Menu mobile : cellules empilées sous l'en-tête, Escape ferme, défilement bloqué. */
function menuMobile() {
  const b = document.querySelector<HTMLButtonElement>('[data-burger]');
  const m = document.querySelector<HTMLElement>('[data-menu]');
  if (!b || !m) return;
  const set = (open: boolean) => {
    b.setAttribute('aria-expanded', String(open));
    b.textContent = open ? 'Fermer' : 'Menu';
    m.classList.toggle('is-open', open);
    document.documentElement.classList.toggle('lenis-stopped', open);
  };
  const toggle = () => set(b.getAttribute('aria-expanded') !== 'true');
  const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') set(false); };
  b.addEventListener('click', toggle);
  document.addEventListener('keydown', esc);
  return () => { b.removeEventListener('click', toggle); document.removeEventListener('keydown', esc); set(false); };
}

/* Couverture : l'étiquette se colle (scale 1.05 → 1) et la photo se pose, avec l'intro de la page. */
function couverture({ intro }: { intro: gsap.core.Timeline }) {
  const et = document.querySelector<HTMLElement>('[data-colle]');
  if (!et || prefersReducedMotion()) return;
  intro.fromTo(et, { scale: 1.05, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.8, ease: ease.out }, 0);
}

/* Signature : les lignes manuscrites se tracent (stroke-dashoffset) puis la date est tamponnée. */
function menuDuJour() {
  const blocs = q('[data-jour]');
  if (!blocs.length) return;
  blocs.forEach((bloc) => {
    const svgs = q<SVGSVGElement & HTMLElement>('[data-manuscrit]', bloc);
    const tampon = bloc.querySelector<HTMLElement>('[data-tampon]');
    if (prefersReducedMotion()) { if (tampon) gsap.set(tampon, { autoAlpha: 1 }); return; }
    const tl = gsap.timeline({ scrollTrigger: once(bloc, 'top 75%') });
    svgs.forEach((svg) => {
      const paths = q<SVGPathElement & HTMLElement>('path', svg);
      const longueurs = paths.map((p) => p.getTotalLength());
      const total = longueurs.reduce((a, b) => a + b, 0) || 1;
      paths.forEach((p, i) => {
        const L = longueurs[i];
        gsap.set(p, { strokeDasharray: L, strokeDashoffset: L, fillOpacity: 0 });
        tl.to(p, { strokeDashoffset: 0, duration: Math.max(0.03, (L / total) * 1.1), ease: 'none' })
          .to(p, { fillOpacity: 1, duration: 0.2 }, '<');
      });
      tl.to({}, { duration: 0.15 });
    });
    if (tampon) tl.add(claque(tampon), '+=0.05');
  });
}

/* Tampon posé avec un claquement : scale 1.4 → 1, rotation -14° → -6°, back.out, 0,25 s. */
function claque(el: HTMLElement) {
  return gsap.fromTo(el, { scale: 1.4, rotate: -14, autoAlpha: 0 }, { scale: 1, rotate: -6, autoAlpha: 1, duration: 0.25, ease: 'back.out(2.5)' });
}
function tampons() {
  const libres = q('[data-tampon]').filter((t) => !t.closest('[data-jour]'));
  if (!libres.length) return;
  if (prefersReducedMotion()) { gsap.set(libres, { autoAlpha: 1 }); return; }
  libres.forEach((t) => gsap.fromTo(t, { scale: 1.4, rotate: -14, autoAlpha: 0 }, { scale: 1, rotate: -6, autoAlpha: 1, duration: 0.25, ease: 'back.out(2.5)', scrollTrigger: once(t) }));
}

/* Photos collées : se posent avec une légère rotation vers leur angle final. */
function poses() {
  const els = q('[data-pose]');
  if (!els.length || prefersReducedMotion()) return;
  els.forEach((el) => {
    const rot = rotDe(el);
    const dansIntro = !!el.closest('[data-couverture]');
    gsap.fromTo(el, { autoAlpha: 0, scale: 1.04, rotate: rot - 4, y: 16 }, {
      autoAlpha: 1, scale: 1, rotate: rot, y: 0, duration: 0.9, ease: ease.out, delay: dansIntro ? 0.35 : 0,
      scrollTrigger: dansIntro ? undefined : once(el),
      onComplete: () => gsap.set(el, { clearProps: 'transform,opacity,visibility' }),
    });
  });
}

/* Timbres : s'empilent (y + rotation) en stagger dans chaque mur ; puis le CSS reprend la main pour le survol. */
function timbres() {
  const murs = q('[data-mur]');
  if (!murs.length || prefersReducedMotion()) return;
  murs.forEach((mur) => {
    const ts = q('[data-timbre]', mur);
    ts.forEach((t, i) => {
      const rot = rotDe(t);
      gsap.fromTo(t, { autoAlpha: 0, y: 56, rotate: rot + (i % 2 ? 6 : -6), scale: 1.06 }, {
        autoAlpha: 1, y: 0, rotate: rot, scale: 1, duration: 0.8, ease: ease.out, delay: i * 0.09,
        scrollTrigger: once(mur, 'top 80%'),
        onComplete: () => gsap.set(t, { clearProps: 'transform,opacity,visibility' }),
      });
    });
  });
}

/* Carte postale du chef : se retourne (rotateY 90 → 0). */
function postale() {
  const cartes = q('[data-postale]');
  if (!cartes.length) return;
  if (prefersReducedMotion()) { gsap.set(cartes, { autoAlpha: 1 }); return; }
  cartes.forEach((c) => gsap.fromTo(c, { autoAlpha: 0, rotateY: 90, transformOrigin: 'left center' }, { autoAlpha: 1, rotateY: 0, duration: 1, ease: ease.out, scrollTrigger: once(c, 'top 80%') }));
}

/* Fiches d'équipe : posées en stagger avec rotation vers l'angle final. */
function fiches() {
  const grilles = q('[data-equipe]');
  if (!grilles.length) return;
  grilles.forEach((g) => {
    const cartes = q('[data-fiche]', g);
    if (prefersReducedMotion()) { gsap.set(cartes, { autoAlpha: 1 }); return; }
    cartes.forEach((c, i) => {
      const rot = rotDe(c);
      gsap.fromTo(c, { autoAlpha: 0, y: 40, rotate: 0 }, {
        autoAlpha: 1, y: 0, rotate: rot, duration: 0.7, ease: ease.out, delay: i * 0.1, scrollTrigger: once(g, 'top 80%'),
        onComplete: () => gsap.set(c, { clearProps: 'transform,opacity,visibility' }),
      });
    });
  });
}

/* Lignes du sommaire : fondu-montée 6 px, stagger 0,05. */
function sommaire() {
  const listes = q('[data-sommaire]');
  if (!listes.length || prefersReducedMotion()) return;
  listes.forEach((l) => gsap.from(q('[data-ligne]', l), { autoAlpha: 0, y: 6, duration: 0.5, stagger: 0.05, ease: ease.out, scrollTrigger: once(l, 'top 88%') }));
}
