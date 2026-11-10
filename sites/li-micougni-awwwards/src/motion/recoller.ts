// Module pilote « Les demi-fous » (patterns.md § 1). Une variable, l'avancée de chaque titre vers la lecture,
// écrit --ecart (décalage de la moitié basse, en em) sur chaque titre coupé de #main et du pied :
//   ecart = 0,07 × (1 − avancée)  +  intro (ouverture du h1)  +  souffle (repos)  +  pointeur
// Un titre se recolle quand il arrive à hauteur de lecture ; le nom du pied se recolle en fin de page.
// Une seule horloge (gsap.ticker), en pause quand aucun titre n'est à l'écran ; rien en mouvement réduit.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, ease, prefersReducedMotion } from '../engine';
import { idle } from './idle';

const ECART = 0.07;          // em, état de repos statique (tokens.css)
const OUVERTURE = 0.32;      // em, écart ajouté au h1 au premier frame (0,39 em posé en CSS sous html.motion)
const sortie = gsap.parseEase(ease.out);

type Titre = { el: HTMLElement; p: number; intro: number; vu: boolean; v: number; phase: number };
let titres: Titre[] = [];
let actif = false;

function tick() {
  const r = gsap.ticker.deltaRatio();
  const k = 1 - Math.pow(0.84, r);              // jeu à l'arrivée : un léger retard, jamais d'élastique
  for (const t of titres) {
    if (!t.vu) continue;
    const libre = 1 - 0.75 * t.p;               // recollé, le titre bouge à peine
    const souffle = Math.sin(idle.t * 0.9 + t.phase) * 0.008 * libre;
    const pointeur = idle.x * 0.03 * libre;
    const cible = ECART * (1 - sortie(t.p)) + t.intro + souffle + pointeur;
    t.v += (cible - t.v) * k;
    t.el.style.setProperty('--ecart', `${t.v.toFixed(4)}em`);
  }
}

function majHorloge() {
  const besoin = titres.some((t) => t.vu);
  if (besoin && !actif) gsap.ticker.add(tick);
  if (!besoin && actif) gsap.ticker.remove(tick);
  actif = besoin;
}

export function startRecoller() {
  if (prefersReducedMotion()) return;          // repli statique : --ecart de tokens.css, rien ne bouge
  onPage(({ intro }) => {
    const parents = new Set<HTMLElement>();
    document.querySelectorAll<HTMLElement>('#main .demi, .pied .demi').forEach((d) => d.parentElement && parents.add(d.parentElement));
    titres = [...parents].map((el, i) => {
      const h1 = el.tagName === 'H1';
      const pied = !!el.closest('.pied');
      const t: Titre = { el, p: 0, intro: h1 ? OUVERTURE : 0, vu: false, v: h1 ? ECART + OUVERTURE : ECART, phase: i * 1.7 };
      const avance = (s: ScrollTrigger) => { t.p = s.progress; };
      // Le h1 est déjà en haut : il se recolle sur les premiers 55 % d'écran défilés.
      if (h1) ScrollTrigger.create({ start: 0, end: () => innerHeight * 0.55, onUpdate: avance, onRefresh: avance });
      else if (pied) ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'max', onUpdate: avance, onRefresh: avance });
      else ScrollTrigger.create({ trigger: el, start: 'top 88%', end: 'top 38%', onUpdate: avance, onRefresh: avance });
      ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onToggle: (s) => { t.vu = s.isActive; majHorloge(); }, onRefresh: (s) => { t.vu = s.isActive; majHorloge(); } });
      if (h1) intro.to(t, { intro: 0, duration: 1.1, ease: ease.out }, 0.1);
      return t;
    });
    majHorloge();
    return () => {
      gsap.ticker.remove(tick); actif = false;
      titres.forEach((t) => t.el.style.removeProperty('--ecart'));
      titres = [];
    };
  });
}
