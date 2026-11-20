// Module pilote « Quatorze services » (patterns.md § 1). Une variable : l'heure réelle à Bruxelles,
// convertie en position dans la semaine des 14 services. Elle est distribuée à tout ce qui porte le concept :
// la ligne d'état (accueil, réservation), la case du service en cours ou suivant (grille), son filet
// d'avancement, le jour courant des horaires, la trotteuse de l'horloge de service (repos).
// Influence du pointeur : au bureau, un filet rouge glisse vers la colonne du jour survolé, puis revient au jour courant.
// Signature : les 14 cases se posent une à une sur l'axe des jours (motion.md, reveal en cascade).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, ease, prefersReducedMotion, isTouch } from '../engine';
import { jours } from '../data/site';
import { idle, startIdle } from './idle';

type Service = { jour: number; s: 0 | 1; debut: number; fin: number };
const min = (h: string) => { const [a, b] = h.split(':'); return +a * 60 + +b; };
const services: Service[] = jours.flatMap((j, i) => [j.midi, j.soir].map((p, s) => {
  const [d, f] = p.split('-');
  return { jour: i, s: s as 0 | 1, debut: min(d), fin: min(f) };
}));
const NB = ' ';
const heure = (m: number) => { const h = Math.floor(m / 60), r = m % 60; return r ? `${h}${NB}h${NB}${String(r).padStart(2, '0')}` : `${h}${NB}h`; };
const nomService = (s: 0 | 1) => (s ? 'soir' : 'midi');

// Heure de Bruxelles (jamais celle du visiteur : lecons/construction.md).
const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Brussels', weekday: 'long', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' });
function maintenant() {
  const p = Object.fromEntries(fmt.formatToParts(new Date()).map((x) => [x.type, x.value]));
  const jour = jours.findIndex((j) => j.schema === p.weekday);
  return { jour, m: +p.hour * 60 + +p.minute, sec: +p.second };
}

export type Etat = { index: number; enCours: boolean; avance: number; jour: number; texte: string };
export function etat(): Etat {
  const { jour, m } = maintenant();
  const ici = services.findIndex((x) => x.jour === jour && m >= x.debut && m < x.fin);
  if (ici >= 0) {
    const x = services[ici];
    return { index: ici, enCours: true, avance: (m - x.debut) / (x.fin - x.debut), jour, texte: `Service du ${nomService(x.s)} en cours, jusqu’à ${heure(x.fin)}` };
  }
  let i = services.findIndex((x) => x.jour === jour && m < x.debut);
  const auj = i >= 0;
  if (!auj) i = (((jour + 1) % 7) * 2);
  const x = services[i];
  const quand = auj ? `ce ${nomService(x.s)}` : `demain ${nomService(x.s)}`;
  return { index: i, enCours: false, avance: 0, jour, texte: `Prochain service : ${quand}, dès ${heure(x.debut)}` };
}

let courant: Etat | null = null;
function appliquer() {
  const e = (courant = etat());
  document.querySelectorAll<HTMLElement>('[data-service-label]').forEach((el) => {
    if (el.textContent !== e.texte) el.textContent = e.texte;
    el.closest('.etat')?.classList.toggle('is-ouvert', e.enCours);
  });
  document.querySelectorAll<HTMLElement>('[data-service]').forEach((el) => {
    const moi = +el.dataset.service! === e.index;
    el.classList.toggle('is-courant', moi && e.enCours);
    el.classList.toggle('is-prochain', moi && !e.enCours);
    el.style.setProperty('--av', moi && e.enCours ? e.avance.toFixed(3) : '0');
  });
  document.querySelectorAll<HTMLElement>('[data-jour]').forEach((el) => el.classList.toggle('is-aujourdhui', +el.dataset.jour! === e.jour));
}

export function startServices() {
  startIdle();
  onPage(() => {
    appliquer();
    // L'état change à la minute : relu toutes les 30 s par l'horloge GSAP (une seule horloge, pas de minuterie).
    let lu = gsap.ticker.time;
    const minute = (t: number) => { if (t - lu > 30) { lu = t; appliquer(); } };
    gsap.ticker.add(minute);
    const reduit = prefersReducedMotion();
    const sem = document.querySelector<HTMLElement>('[data-sem]');
    const horloges = [...document.querySelectorAll<HTMLElement>('.horloge__aiguille')];
    const offs: (() => void)[] = [() => gsap.ticker.remove(minute)];

    // Repos : la trotteuse suit les secondes réelles, lissées par l'horloge GSAP ; en pause hors écran.
    if (!reduit && horloges.length) {
      let visible = true;
      const io = new IntersectionObserver((es) => { visible = es.some((x) => x.isIntersecting); });
      horloges.forEach((h) => io.observe(h));
      const tic = () => {
        if (!visible) return;
        const { sec } = maintenant();
        const frac = (Date.now() % 1000) / 1000;
        horloges.forEach((h) => gsap.set(h, { rotation: (sec + frac) * 6 + idle.x * 8 }));
      };
      gsap.ticker.add(tic);
      offs.push(() => { gsap.ticker.remove(tic); io.disconnect(); });
    }

    if (sem && !reduit) {
      // Signature : les cases se posent du haut, jour après jour (stagger 60 ms par jour, 30 ms midi/soir).
      const cases = [...sem.querySelectorAll<HTMLElement>('.sem__case')];
      const noms = [...sem.querySelectorAll<HTMLElement>('.sem__nom')];
      gsap.set(cases, { clipPath: 'inset(0% 0% 100% 0%)' });
      gsap.set(noms, { autoAlpha: 0, y: 12 });
      const tl = gsap.timeline({ paused: true });
      noms.forEach((n, i) => tl.to(n, { autoAlpha: 1, y: 0, duration: 0.6, ease: ease.out }, i * 0.06));
      cases.forEach((c, k) => tl.to(c, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: ease.out }, 0.12 + Math.floor(k / 2) * 0.06 + (k % 2) * 0.03));
      ScrollTrigger.create({ trigger: sem, start: 'top 80%', once: true, onEnter: () => tl.play() });

      // Pointeur : le filet glisse vers le jour survolé (bureau, grille à 7 colonnes), revient au jour courant.
      const filet = sem.querySelector<HTMLElement>('.sem__filet');
      if (filet && !isTouch()) {
        const x = gsap.quickTo(filet, 'xPercent', { duration: 0.5, ease: ease.soft });
        const repos = () => x((courant?.jour ?? 0) * 100);
        gsap.set(filet, { xPercent: (courant?.jour ?? 0) * 100 });
        const bouge = (ev: PointerEvent) => {
          const r = sem.getBoundingClientRect();
          x(gsap.utils.clamp(0, 6, Math.floor(((ev.clientX - r.left) / r.width) * 7)) * 100);
        };
        sem.addEventListener('pointermove', bouge);
        sem.addEventListener('pointerleave', repos);
        offs.push(() => { sem.removeEventListener('pointermove', bouge); sem.removeEventListener('pointerleave', repos); });
      }
    } else if (sem) {
      const filet = sem.querySelector<HTMLElement>('.sem__filet');
      if (filet) gsap.set(filet, { xPercent: (courant?.jour ?? 0) * 100 });
    }

    // Hero : la photo est peinte au premier rendu (LCP) et se pose par une échelle douce, jamais cachée.
    const img = document.querySelector<HTMLElement>('.hero__media img');
    if (img && !reduit) gsap.from(img, { scale: 1.12, duration: 1.6, ease: ease.out });

    return () => offs.forEach((f) => f());
  });
}
